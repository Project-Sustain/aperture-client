
/**
 * @namespace Census_Visualizer
 * @file Responsible for querying census data and drawing it as polygons on a leaflet map
 * @author Kevin Bruhwiler, Daniel Reynolds
 * @dependencies turf.js
 */

const Census_Visualizer = {

  /**
    * Initializes the Census_Visualizer object
    *
    * @memberof Census_Visualizer
    * @method initialize
    */
  initialize: function () {
    this._grpcQuerier = grpc_querier();
    this._sustainQuerier = sustain_querier();
    this._percentageToColor = {
      0.0: [0, 0, 255],
      0.5: [0, 255, 0],
      1.0: [255, 0, 0]
    };
    this.markers = [];
    this.featureMap = {
      "Total Population": 0, "Avg. Household Income": 1,
      "Population by Age": 2, "Median Age": 3, "No. Below Poverty Line": 4, "Demographics": 5
    };
    this.propertyMap = {
      0: "2010_total_population", 1: "2010_median_household_income",
      2: "2010_population_by_age", 3: "2010_median_age", 4: "2010_poverty", 5: "2010_race"
    };
    this.ranges = { //this is temporary until we can get the dataset catalog queried
      0: [1, 10000],
      1: [10000, 200000],
      2: [0, 0], //this data doesnt work so no range yet
      3: [0, 0], //this data doesnt work so no range yet
      4: [0, 0], //this data doesnt work so no range yet
      5: [1, 10] //not sure how to use a range on this data
    }
    this.featureName = "";
    this.feature = -1;
    this.layers = [];
    this.heat_layers = [];

    this.svi_flood_highway_layers = [];
    this.svi_flood_highway_streams = [];

    this.aqi_age_hospital_layers = [];
    this.aqi_age_hospital_streams = []

    this.covid_streams = [];
    this.covid_layers = [];

    this.streams = [];
  },

  /**
    * Sets the current census feature being displayed
    *
    * @memberof Census_Visualizer
    * @method setFeature
    * @param {string} f 
    *        The name of the feature being displayed
    */
  setFeature: function (f) {
    this.feature = this.featureMap[f];
    this.featureName = f;
    RenderInfrastructure.removeSpecifiedLayersFromMap(this.layers);
  },

  clearAll: function () {
    this.clearHeat();
    this.clearSVIFloodHighway();
    this.clearAQIAgeHospital();
    this.clearCovid();
  },

  /**
    * Clears all census layers from the map
    *
    * @memberof Census_Visualizer
    * @method clearMap
    */
  clearHeat: function () {
    RenderInfrastructure.removeSpecifiedLayersFromMap(this.heat_layers);
  },

  clearSVIFloodHighway: function () {
    RenderInfrastructure.removeSpecifiedLayersFromMap(this.svi_flood_highway_layers);
    this.svi_flood_highway_layers = [];
    this.sviPolys = {};
    this.svi_flood_highway_streams.forEach(s => s.cancel());
    this.svi_flood_highway_streams = [];
  },

  clearAQIAgeHospital: function () {
    RenderInfrastructure.removeSpecifiedLayersFromMap(this.aqi_age_hospital_layers);
    this.aqi_age_hospital_layers = [];
    this.aqiPolys = {};
    this.aqi_age_hospital_streams.forEach(s => s.cancel());
    this.aqi_age_hospital_streams = [];

  },

  clearCovid: function () {
    console.log("clearing covid");
    RenderInfrastructure.removeSpecifiedLayersFromMap(this.covid_layers);
    this.covid_layers = [];
    this.covidPolys = {};
    this.covid_streams.forEach(s => s.cancel());
    this.covid_streams = [];
  },

  /**
    * Converts an array representing RGBA values into a string
    *
    * @memberof Census_Visualizer
    * @method _rgbaToString
    * @param {Array.<Number>} rgba 
    *        A length four array in RGBA order
    * @return {string} 
    *         An rgba string in CSS format
    */
  _rgbaToString: function (rgba) {
    return "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + rgba[3] + ")";
  },

  /**
    * Gets an R, G, or B color value based on the current _percentageToColor object
    *
    * @memberof Census_Visualizer
    * @method _getColorValue
    * @param {Array.<Number>} bounds 
    *        The lower and upper bounds for the color
    * @param {Array.<Number>} pcts 
    *        The lower and upper percentages for the color
    * @param {Number} idx 
    *        The index of the color being computed
    * @return {Number} 
    *         The value of the color
    */
  _getColorValue: function (bounds, pcts, idx) {
    return this._percentageToColor[bounds[0]][idx] * pcts[0] + this._percentageToColor[bounds[1]][idx] * pcts[1];
  },

  /**
    * Gets an RGBA CSS string for the given percentage and alpha value
    *
    * @memberof Census_Visualizer
    * @method _getColorForPercentage
    * @param {Number} pct 
    *        The percentage value being converted into a color
    * @param {Number} alpha 
    *        The alpha value for the RGBA string
    * @return {string} 
    *         An rgba string in CSS format
    */
  _getColorForPercentage: function (pct, alpha) {
    if (pct === 0) {
      pct += 0.00001;
    } else if (pct % 0.5 === 0) {
      pct -= 0.00001;
    }
    const lower = 0.5 * (Math.floor(Math.abs(pct / 0.5)));
    const upper = 0.5 * (Math.ceil(Math.abs(pct / 0.5)));
    const rangePct = (pct - lower) / (upper - lower);
    const pctLower = 1 - rangePct;
    const pctUpper = rangePct;
    const r = Math.floor(this._getColorValue([lower, upper], [pctLower, pctUpper], 0));
    const g = Math.floor(this._getColorValue([lower, upper], [pctLower, pctUpper], 1));
    const b = Math.floor(this._getColorValue([lower, upper], [pctLower, pctUpper], 2));
    return this._rgbaToString([r, g, b, alpha]);
  },

  /**
    * Converts a geojson polygon from lng/lat format to lat/lng format
    *
    * @memberof Census_Visualizer
    * @method _reverseLatLngPolgon
    * @param {Array.<Array.<Number>>} poly 
    *        The polygon being converted
    * @return {Array.<Array.<Number>>} 
    *         The reformatted polygon
    */
  _reverseLatLngPolgon: function (poly) {
    const out = [];
    for (p in poly[0][0]) {
      out.push([poly[0][0][p][1], poly[0][0][p][0]])
    }
    return out;
  },

  /**
    * Gets the minimum and maximum values from the returned gRPC query
    *
    * @memberof Census_Visualizer
    * @method _getMinAndMax
    * @param {Array.<Object>} responseList 
    *        The response returned by the gRPC query
    * @return {Array.<Number>} 
    *         An array of length two containing the minimum and maximum values in the response
    */
  _getMinAndMax: function (responseList) {
    let min = Number.MAX_VALUE;
    let max = 0;
    for (r in responseList) {
      try {
        const data = JSON.parse(responseList[r].getData());
        const num = data[this.propertyMap[this.feature]];
        min = Math.min(min, num)
        max = Math.max(max, num)
      } catch (err) {
        console.log(err)
      }
    }
    return [min, max];
  },

  /**
    * Normalizes a value between the given minimum and maximum values
    *
    * @memberof Census_Visualizer
    * @method _normalize
    * @param {Number} val 
    *        The value being normalized
    * @param {Number} max 
    *        The maximum value
    * @param {Number} min 
    *        The minimum value
    * @return {Number} 
    *         A value between 0 and 1
    */
  _normalize: function (val, max, min) {
    return (val - min) / (max - min);
  },

  sviPolys: {},

  updateSVIFloodzoneDist: function (map, constraintsUpdated) {
    if (!document.getElementById("svi_floodzone_highway")) {
      return;
    }
    if (!document.getElementById("svi_floodzone_highway").checked) {
      return;
    }

    if (constraintsUpdated) {
      this.clearSVIFloodHighway();
    }

    const b = map.wrapLatLngBounds(map.getBounds());
    const barray = [[b._southWest.lng, b._southWest.lat], [b._southWest.lng, b._northEast.lat],
    [b._northEast.lng, b._northEast.lat], [b._northEast.lng, b._southWest.lat],
    [b._southWest.lng, b._southWest.lat]];

    const q = [{ "$match": { geometry: { "$geoIntersects": { "$geometry": { type: "Polygon", coordinates: [barray] } } } } }];

    const stream = this._sustainQuerier.getStreamForQuery("lattice-46", 27017, "tract_geo", JSON.stringify(q));
    this.svi_flood_highway_streams.push(stream);
    let GISJOINS = [];
    let polys = {};

    stream.on('data', function (r) {
      const data = JSON.parse(r.getData());
      if (this.sviPolys[data.properties.GEOID10]) {
        return; //dont re-query!
      }
      else {
        this.sviPolys[data.properties.GEOID10] = "e";
      }
      GISJOINS.push(data.properties.GEOID10);
      polys[data.properties.GEOID10] = data;
      if (GISJOINS.length > 20) {
        this._querySVITracts(GISJOINS, polys);
        GISJOINS = [];
      }
    }.bind(this));

    stream.on('end', function (end) {
      this._querySVITracts(GISJOINS, polys);
      this.svi_flood_highway_streams.splice(this.svi_flood_highway_streams.indexOf(stream), 1);
    }.bind(this));
  },


  _querySVITracts: function (GISJOINS, polys) {
    const firstMatch = "FIPS"
    const firstQuery = {};
    firstQuery[firstMatch] = { "$in": GISJOINS };

    const secondMatch = "RPL_THEMES"
    const secondQuery = {};
    secondQuery[secondMatch] = { "$gte": Number(document.getElementById("svi_svi").noUiSlider.get()[0]), "$lt": Number(document.getElementById("svi_svi").noUiSlider.get()[1]) };

    const q = [
      { "$match": firstQuery },
      { "$match": secondQuery }
    ];
    //console.log(JSON.stringify(q));
    const stream = this._sustainQuerier.getStreamForQuery("lattice-46", 27017, "svi_tract", JSON.stringify(q));
    this.svi_flood_highway_streams.push(stream);

    let SVI_filtered_GISJOINS = [];
    stream.on('data', function (r) {
      const data = JSON.parse(r.getData());
      polys[data.FIPS].properties.svi_mean = data.RPL_THEMES;
      SVI_filtered_GISJOINS.push(data.FIPS);
    }.bind(this));
    stream.on('end', function (end) {
      this._queryFloodzones(SVI_filtered_GISJOINS, polys);
      this.svi_flood_highway_streams.splice(this.svi_flood_highway_streams.indexOf(stream), 1);
    }.bind(this));
  },

  _queryFloodzones: function (GISJOINS, polys) {
    let floodzonesGISJOINS = [];
    for (let i = 0; i < GISJOINS.length; i++) {
      const barray = polys[GISJOINS[i]]["geometry"]["coordinates"][0][0];
      const q = [{ "$match": { geometry: { "$geoIntersects": { "$geometry": { type: "Polygon", coordinates: [barray] } } } } }];

      const stream = this._sustainQuerier.getStreamForQuery("lattice-46", 27017, "flood_zones_geo", JSON.stringify(q));
      this.svi_flood_highway_streams.push(stream);

      stream.on('data', function (r) {
        try {
          let data = JSON.parse(r.getData());
          let poly1 = turf.polygon([barray]);
          let poly2 = turf.polygon(data["geometry"]["coordinates"]);
          let zone = turf.intersect(poly1, poly2);
          zone.properties.FIPS = GISJOINS[i];
          zone.properties.svi_mean = polys[GISJOINS[i]].properties.svi_mean;
          if (data.properties.FLD_ZONE === "AREA NOT INCLUDED" || data.properties.FLD_ZONE === "D")
            throw "bad flood zone"
          zone.properties.FLOOD_ZONE = data.properties.FLD_ZONE;
          zone.id = 'joint_fld_svi_' + Math.random().toString(36).substr(2, 9);
          //floodzones.push(zone);
          // if (floodzones.length > 20) {
          //   this._queryHighways(floodzones);
          //   floodzones = [];
          // }
          //this.gDraw(zone,this.svi_flood_highway_layers,"SVI + Floodzone");
          floodzonesGISJOINS.push(zone);
          if (floodzonesGISJOINS.length > 20) {
            this._queryHighways(floodzonesGISJOINS);
            floodzonesGISJOINS = [];
          }
        }
        catch { }
      }.bind(this));
      stream.on('end', function (end) {
        this.svi_flood_highway_streams.splice(this.svi_flood_highway_streams.indexOf(stream), 1);
        if (i === GISJOINS.length - 1) {
          this._queryHighways(floodzonesGISJOINS);
        }
        //this._queryHighways(floodzones);
      }.bind(this));
    }
  },

  _queryHighways: function (GISJOINS) {
    let filteredGISJOINS = [];
    for (let i = 0; i < GISJOINS.length; i++) {
      let pos = Util.getLatLngFromGeoJsonFeature(GISJOINS[i]);
      //console.log(pos);

      const q = [{
        "$match": {
          geometry: { "$geoWithin": { "$centerSphere": [[pos.lng, pos.lat], Number(document.getElementById("Highway_dist_Highway_dist").noUiSlider.get()) / 3963.2] } },
          "$or": [
            {
              "properties.highway": "motorway"
            },
            {
              "properties.highway": "trunk"
            },
            {
              "properties.highway": "primary"
            }
          ]
        }
      }, { "$project": { "_id": 1 } }];


      const stream = this._sustainQuerier.getStreamForQuery("lattice-46", 27017, "osm_lines_geo", JSON.stringify(q));
      this.svi_flood_highway_streams.push(stream);


      let flag = false;
      let runningCount = 0;
      stream.on('data', function (r) {
        //if(JSON.parse(r.getData()).properties.highway === "motorway"){
        //console.log(JSON.parse(r.getData()).properties);
        //}
        runningCount++;
        stream.cancel();
        if (!flag) {
          flag = true;
        }
      }.bind(this));
      stream.on('end', function (end) {
        this.svi_flood_highway_streams.splice(this.svi_flood_highway_streams.indexOf(stream), 1);
        if (runningCount === 0) {
          this.gDraw(GISJOINS[i], this.svi_flood_highway_layers, "SVI + Floodzone + Highway");
          //filteredGISJOINS.push(GISJOINS[i]);
          if (filteredGISJOINS.length > 20 || i === GISJOINS.length - 1) {

            //filteredGISJOINS = [];
          }
        }
        // if(runningCount === 0){
        //   console.log("render");
        //   let newLayers = RenderInfrastructure.renderGeoJson(polys[i], false, {
        //     "SVI_&_Floodzones": {
        //       "color": "#FF0000",
        //       "identityField": "GISJOIN"
        //     }
        //   });
        //   this.svi_flood_highway_layers = this.svi_flood_highway_layers.concat(newLayers);
        //}
        //this.svi_flood_highway_streams.splice(this.svi_flood_highway_streams.indexOf(stream), 1);
      }.bind(this));
    }
  },

  gDraw: function (poly, arrRef, name) {
    let newLayers = RenderInfrastructure.renderGeoJson(poly, false, {
      "SVI + Floodzone + Highway": {
        "color": "#FF0000",
        "identityField": "FIPS",
        "noBorder": true
      }
    });
    this.svi_flood_highway_layers = this.svi_flood_highway_layers.concat(newLayers);
    //console.log(this.svi_flood_highway_layers);
  },

  aqiPolys: {},

  updateAgeAQIDistanceToHospital: function (map, constraintsUpdated) {
    if (!document.getElementById("age_aqi_hospitals").checked) {
      return;
    }

    if (constraintsUpdated) {
      this.clearAQIAgeHospital();
    }

    const b = map.wrapLatLngBounds(map.getBounds());
    const barray = [[b._southWest.lng, b._southWest.lat], [b._southWest.lng, b._northEast.lat],
    [b._northEast.lng, b._northEast.lat], [b._northEast.lng, b._southWest.lat],
    [b._southWest.lng, b._southWest.lat]];

    const q = [{ "$match": { geometry: { "$geoIntersects": { "$geometry": { type: "Polygon", coordinates: [barray] } } } } }];

    const stream = this._sustainQuerier.getStreamForQuery("lattice-46", 27017, "tract_geo", JSON.stringify(q));
    this.aqi_age_hospital_streams.push(stream);

    let GISJOINS = [];
    let polys = {};

    stream.on('data', function (r) {
      const data = JSON.parse(r.getData());
      if (this.aqiPolys[data.properties.GISJOIN]) {
        return; //dont re-query!
      }
      else {
        this.aqiPolys[data.properties.GISJOIN] = "e";
      }
      GISJOINS.push(data.properties.GISJOIN);
      polys[data.properties.GISJOIN] = data;
      if (GISJOINS.length > 20) {
        this.queryAQI(GISJOINS, polys);
        GISJOINS = [];
      }
    }.bind(this));

    stream.on('end', function (end) {
      this.aqi_age_hospital_streams.splice(this.aqi_age_hospital_streams.indexOf(stream), 1);
      this.queryAQI(GISJOINS, polys);
    }.bind(this));
  },


  queryAge: function (GISJOINS, polys, nextFunc) {
    const q = [
      { "$match": { "GISJOIN": { "$in": GISJOINS } } },
      { "$match": { "median_age_total": { "$gte": Number(document.getElementById("average_age_average_age").noUiSlider.get()[0]), "$lt": Number(document.getElementById("average_age_average_age").noUiSlider.get()[1]) } } }
    ];

    const stream = this._sustainQuerier.getStreamForQuery("lattice-46", 27017, "tract_median_age", JSON.stringify(q));
    this.aqi_age_hospital_streams.push(stream);

    let filteredGISJOINS = [];
    let filteredPolys = {};

    stream.on('data', function (r) {
      const data = JSON.parse(r.getData());
      filteredGISJOINS.push(data.GISJOIN);
      filteredPolys[data.GISJOIN] = polys[data.GISJOIN];
      filteredPolys[data.GISJOIN].properties.average_age = data.median_age_total;

      if (filteredGISJOINS.length > 20) {
        this.queryHospitalDistance(filteredGISJOINS, filteredPolys);
        filteredGISJOINS = [];
      }
    }.bind(this));

    stream.on('end', function (end) {
      if (nextFunc) {
        nextFunc(filteredGISJOINS, filteredPolys);
      }
      else {
        this.queryHospitalDistance(filteredGISJOINS, filteredPolys);
      }
      this.aqi_age_hospital_streams.splice(this.aqi_age_hospital_streams.indexOf(stream), 1);
    }.bind(this));
  },

  queryAQI: function (GISJOINS, polys) {
    const q = [
      { "$match": { "_id": { "$in": GISJOINS } } },
      { "$match": { "avgAqi": { "$gte": Number(document.getElementById("aqi_aqi").noUiSlider.get()[0]), "$lt": Number(document.getElementById("aqi_aqi").noUiSlider.get()[1]) } } }
    ];

    const stream = this._sustainQuerier.getStreamForQuery("lattice-46", 27017, "air_quality_avg", JSON.stringify(q));
    this.aqi_age_hospital_streams.push(stream);

    let filteredGISJOINS = [];
    let countyTotals = {};


    stream.on('data', function (r) {
      const data = JSON.parse(r.getData());
      const countyID = data._id.substr(0, 8);
      console.log(countyID);
      if (!countyTotals[countyID]) {
        countyTotals[countyID] = { avg: data.avgAqi, count: 1 }; //new id
        filteredGISJOINS.push(countyID);
      }
      else { //average if more than one
        countyTotals[countyID].avg += data.avgAqi;
        countyTotals[countyID].count++;
      }
    }.bind(this));

    stream.on('end', function (end) {
      if (filteredGISJOINS.length > 0) {
        let avgs = {};
        for (county in countyTotals) {
          avgs[county] = countyTotals[county].avg / countyTotals[county].count; //compute average
        }
        this.queryCountys(filteredGISJOINS, avgs); //calls next in chain
      }
      this.aqi_age_hospital_streams.splice(this.aqi_age_hospital_streams.indexOf(stream), 1);
    }.bind(this));
  },

  queryCountys: function (GISJOINS, aqiInfo) {
    let countyFPArr = [];
    let stateFPArr = [];
    GISJOINS.forEach(JOIN => {
      stateFPArr.push(JOIN.substr(1, 2));
      countyFPArr.push(JOIN.substr(4, 3));
    });


    const q = [{ "$match": { "properties.COUNTYFP10": { "$in": countyFPArr } } }, { "$match": { "properties.STATEFP10": { "$in": stateFPArr } } }]
    const stream = this._sustainQuerier.getStreamForQuery("lattice-46", 27017, "tract_geo", JSON.stringify(q));

    let filteredGISJOINS = [];
    let polys = {};
    stream.on('data', function (r) {
      const data = JSON.parse(r.getData());
      data.properties = {
        GISJOIN: data.properties.GISJOIN,
        aqi: aqiInfo[data.properties.GISJOIN.substr(0, 8)]
      }
      filteredGISJOINS.push(data.properties.GISJOIN);
      polys[data.properties.GISJOIN] = data;
      if (filteredGISJOINS.length > 20) {
        this.queryAge(filteredGISJOINS, polys);
        filteredGISJOINS = [];
      }
    }.bind(this));

    stream.on('end', function (end) {
      this.queryAge(filteredGISJOINS, polys);
      this.aqi_age_hospital_streams.splice(this.aqi_age_hospital_streams.indexOf(stream), 1);
    }.bind(this));
  },

  queryHospitalDistance: function (GISJOINS, polys) {
    const q = [
      { "$match": { "GISJOIN": { "$in": GISJOINS } } }
    ];
    const stream = this._sustainQuerier.getStreamForQuery("lattice-46", 27017, "tract_proximity", JSON.stringify(q));
    this.aqi_age_hospital_streams.push(stream);

    stream.on('data', function (r) {
      const data = JSON.parse(r.getData());
      let flag = true;

      for (dist in data.nearest_hospitals) {
        if (data.nearest_hospitals[dist] / 1000 * 0.621371 < Number(document.getElementById("age_aqi_hospitals_hospital_dist").noUiSlider.get())) {
          flag = false;
        }
        break;
      }

      if (flag) {
        let minD = Infinity;
        for (dist in data.nearest_hospitals) {
          if (data.nearest_hospitals[dist] / 1000 * 0.621371 < minD) {
            minD = data.nearest_hospitals[dist] / 1000 * 0.621371;
          }
        }
        polys[data.GISJOIN].properties.min_distance_to_hospital = minD.toFixed(2) + " Miles";
        this.gDraw2(polys[data.GISJOIN], minD);
      }
    }.bind(this));

    stream.on('end', function (end) {
      this.aqi_age_hospital_streams.splice(this.aqi_age_hospital_streams.indexOf(stream), 1);
    }.bind(this));

  },

  gDraw2: function (poly, minDist) {
    let color = Census_Visualizer._normalize(minDist, Number(document.getElementById("age_aqi_hospitals_hospital_dist").noUiSlider.get()), 15);
    color = this.perc2color(color);
    let newLayers = RenderInfrastructure.renderGeoJson(poly, false, {
      "Age + AQI + Dist to Hospital": {
        "color": color,
        "identityField": "GISJOIN",
        "noBorder": true,
      }
    });
    this.aqi_age_hospital_layers = this.aqi_age_hospital_layers.concat(newLayers);
    //console.log(this.svi_flood_highway_layers);
  },

  perc2color: function (perc) {
    perc *= 100;
    if (perc > 100) {
      perc = 100;
    }
    if (perc < 0) {
      perc = 0;
    }
    var r, g, b = 0;
    if (perc < 50) {
      r = 255;
      g = Math.round(5.1 * perc);
    }
    else {
      g = 255;
      r = Math.round(510 - 5.10 * perc);
    }
    var h = r * 0x10000 + g * 0x100 + b * 0x1;
    return '#' + ('000000' + h.toString(16)).slice(-6);
  },

  covidPolys: {},

  updateCovidCounty(map, constraintsUpdated) {
    if (!document.getElementById("covid-19").checked) {
      return;
    }
    if (constraintsUpdated) {
      this.clearCovid();
    }
    //first get counties
    const b = map.wrapLatLngBounds(map.getBounds());
    const barray = [[b._southWest.lng, b._southWest.lat], [b._southWest.lng, b._northEast.lat],
    [b._northEast.lng, b._northEast.lat], [b._northEast.lng, b._southWest.lat],
    [b._southWest.lng, b._southWest.lat]];

    const q = [{ "$match": { geometry: { "$geoIntersects": { "$geometry": { type: "Polygon", coordinates: [barray] } } } } }];

    const stream = this._sustainQuerier.getStreamForQuery("lattice-46", 27017, "county_geo_simplified", JSON.stringify(q));
    this.covid_streams.push(stream);

    let FIPS = [];
    let polys = {};

    stream.on('data', function (r) {
      const data = JSON.parse(r.getData());
      if (this.covidPolys[data.properties.GEOID10]) {
        //console.log("repeat");
        return; //dont re-query!
      }
      else {
        this.covidPolys[data.properties.GEOID10] = "e";
      }
      FIPS.push(data.properties.GEOID10);
      polys[data.properties.GEOID10] = data;
      data.properties = {
        GEOID10: data.properties.GEOID10
      }
      if (FIPS.length > 20) {
        this.queryCovid(FIPS, polys);
        polys = {};
        FIPS = [];
      }
    }.bind(this));

    stream.on('end', function (end) {
      if (FIPS.length > 0) {
        this.queryCovid(FIPS, polys);
      }
      this.covid_streams.splice(this.aqi_age_hospital_streams.indexOf(stream), 1);
    }.bind(this));
  },

  queryCovid(FIPS, polys, nextFunc) {
    let dateStart = new Date(Number(document.getElementById("covid-19_dateRange").noUiSlider.get()[0])); //wtf am i doing
    let dateEnd = new Date(Number(document.getElementById("covid-19_dateRange").noUiSlider.get()[1]));

    const q = [{ "$project": { "stateAbbr": 1, "countyName": 1, "countyFipsCode": 1, "population": 1, "totalCaseCount": 1, "newCaseCount": 1, "totalDeathCount": 1, "newDeathCount": 1, "date": { "$dateToString": { "date": "$date" } } } }, { "$match": { "countyFipsCode": { "$in": FIPS }, "$or": [{ "date": dateStart }, { "date": dateEnd }] } }]

    const stream = this._sustainQuerier.getStreamForQuery("lattice-46", 27017, "covid_county", JSON.stringify(q));

    //console.log(JSON.stringify(q));
    this.covid_streams.push(stream);

    stream.on('data', function (r) {
      const data = JSON.parse(r.getData());
      //console.log(data.date + "   ---   " + JSON.stringify(dateStart));
      if ("\"" + data.date + "\"" === JSON.stringify(dateStart)) { //start
        //console.log("here");
        polys[data.countyFipsCode].properties.start_date = data.date.substr(0, 10);
        polys[data.countyFipsCode].properties.cases_start = data.totalCaseCount;
        polys[data.countyFipsCode].properties.cases_per_1000_pop_start = (data.totalCaseCount / (data.population / 1000)).toFixed(2);
      }
      else if ("\"" + data.date + "\"" === JSON.stringify(dateEnd)) {
        polys[data.countyFipsCode].properties.end_date = data.date.substr(0, 10);
        polys[data.countyFipsCode].properties.cases_end = data.totalCaseCount;
        polys[data.countyFipsCode].properties.cases_per_1000_pop_end = (data.totalCaseCount / (data.population / 1000)).toFixed(2);
      }
      if (polys[data.countyFipsCode].properties.cases_start !== null && polys[data.countyFipsCode].properties.cases_end !== null) {
        polys[data.countyFipsCode].properties.name = data.countyName + ", " + data.stateAbbr;
        polys[data.countyFipsCode].properties.increase_in_cases = polys[data.countyFipsCode].properties.cases_end - polys[data.countyFipsCode].properties.cases_start;
        polys[data.countyFipsCode].properties.increase_in_cases_per_1000_pop = (polys[data.countyFipsCode].properties.cases_per_1000_pop_end - polys[data.countyFipsCode].properties.cases_per_1000_pop_start).toFixed(2);
        let twoWeeksNum = ((Number(document.getElementById("covid-19_dateRange").noUiSlider.get()[1]) - Number(document.getElementById("covid-19_dateRange").noUiSlider.get()[0])) / (1000 * 60 * 60 * 24 * 14));
        polys[data.countyFipsCode].properties.increase_in_cases_per_1000_pop_per_2_weeks = ((polys[data.countyFipsCode].properties.cases_per_1000_pop_end - polys[data.countyFipsCode].properties.cases_per_1000_pop_start) / twoWeeksNum).toFixed(2);
        if(Number(polys[data.countyFipsCode].properties.increase_in_cases_per_1000_pop_per_2_weeks) < Number(document.getElementById("covid-19_increase_in_cases_per_1000").noUiSlider.get()[0]) || Number(polys[data.countyFipsCode].properties.increase_in_cases_per_1000_pop_per_2_weeks) > Number(document.getElementById("covid-19_increase_in_cases_per_1000").noUiSlider.get()[1])){
          console.log(polys[data.countyFipsCode].properties.increase_in_cases_per_1000_pop_per_2_weeks);
          console.log("rejecting, out of range");
          FIPS.splice(FIPS.indexOf(data.countyFipsCode),1);
          delete polys[data.countyFipsCode];
          //console.log(polys[data.countyFipsCode]);
          return;
        }
        polys[data.countyFipsCode].properties.increase_in_cases_pct = (((polys[data.countyFipsCode].properties.cases_end / polys[data.countyFipsCode].properties.cases_start) - 1) * 100).toFixed(2) + '%';
      }
    }.bind(this));

    stream.on('end', function (end) {
      if (!document.getElementById('average_age').checked) {
        for (x in polys) {
          this.covidDraw(polys[x]);
        }
      }
      else {
        this.queryCTracts(FIPS,polys);
      }
      this.covid_streams.splice(this.aqi_age_hospital_streams.indexOf(stream), 1);
    }.bind(this));
  },

  queryCTracts: function (GISJOINS, polys, nextFunc) {
    let countyFPArr = [];
    let stateFPArr = [];
    GISJOINS.forEach(JOIN => {
      stateFPArr.push(JOIN.substr(0, 2));
      countyFPArr.push(JOIN.substr(2, 3));
    });
    const q = [
      { "$match": { "properties.COUNTYFP10": { "$in": countyFPArr } } },
      { "$match": { "properties.STATEFP10": { "$in": stateFPArr } } },
    ];

    //console.log(JSON.stringify(q));

    const stream = this._sustainQuerier.getStreamForQuery("lattice-46", 27017, "tract_geo_simplified", JSON.stringify(q));
    this.covid_streams.push(stream);

    let filteredGISJOINS = [];
    let filteredPolys = {};

    stream.on('data', function (r) {
      const data = JSON.parse(r.getData());
      //console.log(data);
      filteredGISJOINS.push(data.properties.GISJOIN);
      filteredPolys[data.properties.GISJOIN] = data;
      //console.log(data.properties.STATEFP10+''+data.properties.COUNTYFP10);
     
      if(!polys[data.properties.STATEFP10+''+data.properties.COUNTYFP10]){
        return; //bug quick fix
      }
      filteredPolys[data.properties.GISJOIN].properties =
      {
        GISJOIN: filteredPolys[data.properties.GISJOIN].properties.GISJOIN,
        TRACTCE10: filteredPolys[data.properties.GISJOIN].properties.TRACTCE10,
        ...(polys[data.properties.STATEFP10+''+data.properties.COUNTYFP10].properties)
      };

      if (filteredGISJOINS.length > 20) {
        this.queryAge2(filteredGISJOINS,filteredPolys);
        filteredPolys = {};
        filteredGISJOINS = [];
      }
    }.bind(this));

    stream.on('end', function (end) {
      this.queryAge2(filteredGISJOINS,filteredPolys);
      this.covid_streams.splice(this.covid_streams.indexOf(stream), 1);
    }.bind(this));
  },

  queryAge2(GISJOINS,polys){
    const q = [
      { "$match": { "GISJOIN": { "$in": GISJOINS } } },
      { "$match": { "median_age_total": { "$gte": Number(document.getElementById("average_age_average_age").noUiSlider.get()[0]), "$lt": Number(document.getElementById("average_age_average_age").noUiSlider.get()[1]) } } }
    ];

    const stream = this._sustainQuerier.getStreamForQuery("lattice-46", 27017, "tract_median_age", JSON.stringify(q));
    this.covid_streams.push(stream);

    let filteredGISJOINS = [];
    let filteredPolys = {};

    stream.on('data', function (r) {
      const data = JSON.parse(r.getData());
      filteredGISJOINS.push(data.GISJOIN);
      filteredPolys[data.GISJOIN] = polys[data.GISJOIN];
      filteredPolys[data.GISJOIN].properties.average_age = data.median_age_total;

      if (filteredGISJOINS.length > 20) {
        if(!document.getElementById("distance_to_hospital").checked){
          for(x in filteredPolys){
            this.covidDraw(filteredPolys[x]);
          }
        }
        else{
          this.queryHospitalDistance2(filteredGISJOINS,filteredPolys);
        }
        filteredGISJOINS = [];
        filteredPolys = {};
      }

    }.bind(this));

    stream.on('end', function (end) {
      if(!document.getElementById("distance_to_hospital").checked){
        for(x in filteredPolys){
          this.covidDraw(filteredPolys[x]);
        }
      }
      else{
        this.queryHospitalDistance2(filteredGISJOINS,filteredPolys);
      }
      this.covid_streams.splice(this.covid_streams.indexOf(stream), 1);
    }.bind(this));
  },

  queryHospitalDistance2: function (GISJOINS, polys) {
    const q = [
      { "$match": { "GISJOIN": { "$in": GISJOINS } } }
    ];
    const stream = this._sustainQuerier.getStreamForQuery("lattice-46", 27017, "tract_proximity", JSON.stringify(q));
    this.covid_streams.push(stream);

    stream.on('data', function (r) {
      const data = JSON.parse(r.getData());
      let flag = true;

      for (dist in data.nearest_hospitals) {
        if (data.nearest_hospitals[dist] / 1000 * 0.621371 < Number(document.getElementById("distance_to_hospital_hospital_dist").noUiSlider.get())) {
          flag = false;
        }
        break;
      }

      if (flag) {
        let minD = Infinity;
        for (dist in data.nearest_hospitals) {
          if (data.nearest_hospitals[dist] / 1000 * 0.621371 < minD) {
            minD = data.nearest_hospitals[dist] / 1000 * 0.621371;
          }
        }
        polys[data.GISJOIN].properties.min_distance_to_hospital = minD.toFixed(2) + " Miles";
        this.covidDraw(polys[data.GISJOIN]);
      }
    }.bind(this));

    stream.on('end', function (end) {
      this.covid_streams.splice(this.aqi_age_hospital_streams.indexOf(stream), 1);
    }.bind(this));

  },

  convertHexToRGBA: function(hexCode, opacity) {
    let hex = hexCode.replace('#', '');
    
    if (hex.length === 3) {
        hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
    }    
    
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r},${g},${b},${opacity / 100})`;
},

  covidDraw: function (poly) {
    //console.log(poly.properties.increase_in_cases_per_1000_pop);
    //console.log(3 * ((Number(document.getElementById("covid-19_dateRange").noUiSlider.get()[1]) - Number(document.getElementById("covid-19_dateRange").noUiSlider.get()[0])) / (1000 * 60 * 60 * 24 * 14)));
    let color = Census_Visualizer._normalize(poly.properties.increase_in_cases_per_1000_pop, 0, 3 * ((Number(document.getElementById("covid-19_dateRange").noUiSlider.get()[1]) - Number(document.getElementById("covid-19_dateRange").noUiSlider.get()[0])) / (1000 * 60 * 60 * 24 * 14)));
    color = this.convertHexToRGBA(this.perc2color(color),75);
    //console.log(color);
    let extra = "<br>";
    if(poly.properties.average_age)
      extra += "<li>Average Age: @@average_age@@</li>";
    if(poly.properties.min_distance_to_hospital)
      extra += "<li>Nearest Hospital: @@min_distance_to_hospital@@</li>";

    let newLayers = RenderInfrastructure.renderGeoJson(poly, false, {
      "COVID-19": {
        "color": color,
        "identityField": "GEOID10",
        "noBorder": true,
        "popup": "<ul style='padding-inline-start:20px;margin-block-start:2.5px;'>" +
        "<li><b>County: @@name@@</b></li>" +
        "<li><b>Increase in Cases Raw: @@increase_in_cases@@</b></li>" +
        "<li><b>Increase in Cases Per 1000 People: @@increase_in_cases_per_1000_pop@@</b></li>" +
        "<li style='color:red'><b>Increase in Cases Per 1000 People, per 2 Weeks: @@increase_in_cases_per_1000_pop_per_2_weeks@@</b></li>" +
        "<li><b>Increase in Cases %: @@increase_in_cases_pct@@</b></li>" +
        "<br><li>Start Date: @@start_date@@</li>" +
        "<li>Raw Cases Start: @@cases_start@@</li>" +
        "<li>Cases Per 1000 People Start: @@cases_per_1000_pop_start@@</li>" +
        "<br><li>End Date: @@end_date@@</li>" +
        "<li>Raw Cases End: @@cases_end@@</li>" +
        "<li>Cases Per 1000 People End: @@cases_per_1000_pop_end@@</li>" +
        extra +
      "</ul>"
      }
    });
    this.covid_layers = this.covid_layers.concat(newLayers);
  },

  updateFutureHeat: function (map, constraintsUpdated) {
    if (!document.getElementById("Heat_Waves").checked) {
      return;
    }

    this.streams.forEach(s => s.cancel());

    if (this.heat_layers.length > 0 && constraintsUpdated) {
      this.clearHeat();
      this.heat_layers = [];
    }

    const b = map.wrapLatLngBounds(map.getBounds());
    const barray = [[b._southWest.lng, b._southWest.lat], [b._southWest.lng, b._northEast.lat],
    [b._northEast.lng, b._northEast.lat], [b._northEast.lng, b._southWest.lat],
    [b._southWest.lng, b._southWest.lat]];

    const q = [{ "$match": { geometry: { "$geoIntersects": { "$geometry": { type: "Polygon", coordinates: [barray] } } } } }];

    const stream = this._sustainQuerier.getStreamForQuery("lattice-46", 27017, "county_geo", JSON.stringify(q));

    this.streams.push(stream);

    const GISJOINS = [];
    const polys = {};

    stream.on('data', function (r) {
      const data = JSON.parse(r.getData());
      GISJOINS.push(data.properties.GISJOIN);
      polys[data.properties.GISJOIN] = data;
      if (GISJOINS.length > 20) {
        this._queryMatchingValues(GISJOINS, polys);
        GISJOINS.length = 0;
      }
    }.bind(this));

    stream.on('end', function (end) {
      this._queryMatchingValues(GISJOINS, polys);
    }.bind(this));
  },

  _queryMatchingValues: function (GISJOINS, polys) {
    const firstMatch = "GISJOIN"
    const firstQuery = {};
    firstQuery[firstMatch] = { "$in": GISJOINS };

    const secondMatch = "CDF." + Number(document.getElementById("Heat_Waves_length").noUiSlider.get())
    const secondQuery = {};
    secondQuery[secondMatch] = { "$exists": true };

    const thirdMatch = "temp"
    const thirdQuery = {};
    thirdQuery[thirdMatch] = { "$gte": Number(document.getElementById("Heat_Waves_temperature").noUiSlider.get()) };


    const fourthMatch = "year"
    const fourthQuery = {};
    fourthQuery[fourthMatch] = { "$gte": Number(document.getElementById("Heat_Waves_years").noUiSlider.get()[0]), "$lt": Number(document.getElementById("Heat_Waves_years").noUiSlider.get()[1]) };

    const q = [{ "$match": firstQuery },
    { "$match": secondQuery },
    { "$match": thirdQuery },
    { "$match": fourthQuery }
    ];

    const stream = this._sustainQuerier.getStreamForQuery("lattice-46", 27017, "future_heat", JSON.stringify(q));

    this.streams.push(stream);

    const properties = { "Heat Wave Length": document.getElementById("Heat_Waves_length").noUiSlider.get(), "Heat Wave Lower Bound": document.getElementById("Heat_Waves_temperature").noUiSlider.get() }

    stream.on('data', function (r) {
      const data = JSON.parse(r.getData());
      const poly = polys[data.GISJOIN];
      this.generalizedDraw({ ...data, ...poly });
    }.bind(this));
  },

  generalizedDraw: function (data, properties) {
    if (properties !== null)
      data["properties"] = { ...data["properties"], ...properties };

    if (!document.getElementById("Heat_Waves").checked)
      return;

    let newLayers = RenderInfrastructure.renderGeoJson(data, false, {
      "census": {
        "color": "#FF0000",
        "identityField": "GISJOIN"
      }
    });
    Census_Visualizer.heat_layers = Census_Visualizer.heat_layers.concat(newLayers);
  },

  /**
    * Updates the Census visualization with the current feature
    *
    * @memberof Census_Visualizer
    * @method updateViz
    * @param {Object} map 
    *        The leaflet map being updated
    */
  updateViz: function (map) {
    const draw = function (response) {
      let geo = JSON.parse(response.getResponsegeojson());
      const data = JSON.parse(response.getData());
      geo.properties = data;
      let newLayers = RenderInfrastructure.renderGeoJson(geo, false, {
        "census": {
          "color": Census_Visualizer._getColorForPercentage(Census_Visualizer._normalize(data[Census_Visualizer.propertyMap[Census_Visualizer.feature]], Census_Visualizer.ranges[Census_Visualizer.feature][0], Census_Visualizer.ranges[Census_Visualizer.feature][1]), 0.5),
          "identityField": "GISJOIN"
        }
      });
      Census_Visualizer.layers = Census_Visualizer.layers.concat(newLayers);
      // // const responseList = response.getSinglespatialresponseList();
      // // console.log(responseList);
      // // const vals = this._getMinAndMax(responseList);
      // // const min = vals[1];
      // // const max = vals[0];
      // var polygon = L.polygon(Census_Visualizer._reverseLatLngPolgon(geo.geometry.coordinates), {
      //   color: "red"
      //     //this._getColorForPercentage(this._normalize(data[this.propertyMap[this.feature]], min, max), 0.5)
      // }).addTo(map);
      // polygon.bindTooltip("2010 " +  Census_Visualizer.featureName + " of: " + data[Census_Visualizer.propertyMap[Census_Visualizer.feature]]);
      // polygon.GISJOIN = data.GISJOIN;
      // Census_Visualizer.markers.push(polygon);
    }

    if (this.featureName === "")
      return;
    const b = map.wrapLatLngBounds(map.getBounds());
    const stream = this._grpcQuerier.getCensusData(2, b._southWest, b._northEast, this.feature);
    stream.on('data', function (r) {
      //console.log(JSON.stringify(response));
      draw(r);
    });
    stream.on('status', function (status) {
      //console.log(status.code, status.details, status.metadata);
    });
    stream.on('end', function (end) {

    });
  },
};

/**
  * Returns a census_visualizer object
  *
  * @function census_visualizer
  * @return {Census_Visualizer} 
  *         A census_visualizer object
  */
census_visualizer = function () {
  const censusVisualizer = Census_Visualizer;
  censusVisualizer.initialize();
  return censusVisualizer;
};

try {
  module.exports = {
    census_visualizer: census_visualizer
  }
} catch (e) { }
