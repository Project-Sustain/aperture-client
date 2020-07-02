Census_Visualizer = {
    initialize: function() {
        this._grpcQuerier = grpc_querier();
        this._percentageToColor = {
            0.0: [0, 0, 255],
            0.5: [0, 255, 0],
            1.0: [255, 0, 0]
        },
        this.markers = [];
        this.featureMap = {"Total Population": 0, "Avg. Household Income": 1,
          "Population by Age": 2, "Median Age": 3, "Poverty?": 4, "Race?": 5};
        this.propertyMap = {0: "2010_total_population", 1: "2010_median_household_income",
          2: "2010_population_by_age", 3: "2010_median_age", 4: "2010_poverty", 5: "2010_race"};
        this.featureName = "Avg. Household Income"
        this.feature = this.featureMap[this.featureName];
    },

    setFeature: function(f){
        this.feature = this.featureMap[f];
        this.featureName = f;
    },

    _rgbaToString: function(rgba){
        return "rgba("+rgba[0]+", "+rgba[1]+", "+rgba[2]+", "+rgba[3]+")";
    },

    _getColorValue: function(bounds, pcts, idx){
        return this._percentageToColor[bounds[0]][idx]*pcts[0] + this._percentageToColor[bounds[1]][idx]*pcts[1];
    },

    _getColorForPercentage: function(pct, alpha) {
        if(pct === 0) {
            pct += 0.00001;
        } else if (pct % 0.5 === 0) {
            pct -= 0.00001;
        }
        const lower = 0.5*(Math.floor(Math.abs(pct/0.5)));
        const upper = 0.5*(Math.ceil(Math.abs(pct/0.5)));
        const rangePct = (pct - lower) / (upper - lower);
        const pctLower = 1 - rangePct;
        const pctUpper = rangePct;
        const r = Math.floor(this._getColorValue([lower, upper], [pctLower, pctUpper], 0));
        const g = Math.floor(this._getColorValue([lower, upper], [pctLower, pctUpper], 1));
        const b = Math.floor(this._getColorValue([lower, upper], [pctLower, pctUpper], 2));
        return this._rgbaToString([r, g, b, alpha]);
    },

    _reverseLatLngPolgon: function(poly){
      const out = [];
      for (p in poly[0][0]){
          out.push([poly[0][0][p][1], poly[0][0][p][0]])
      }
      return out;
    },

    _getMinAndMax: function(responseList){
      let min = Number.MAX_VALUE;
      let max = 0;
      for (r in responseList){
        try{
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

    _normalize: function(val, max, min){
      return (val - min) / (max - min);
    },

    updateViz: function(map) {
        for(var i = 0; i < this.markers.length; i++){
          map.removeLayer(this.markers[i]);
        }
        this.markers = [];
        const callback = function(bounds, err, response) {
                              if (err) {
                                } else {
                                  const responseList = response.getSinglespatialresponseList();
                                  const vals = this._getMinAndMax(responseList);
                                  const min = vals[1];
                                  const max = vals[0];
                                  for (r in responseList){
                                    try{
                                      const geo = JSON.parse(responseList[r].getResponsegeojson());
                                      const data = JSON.parse(responseList[r].getData());
                                      var polygon = L.polygon(this._reverseLatLngPolgon(geo.geometry.coordinates), {color:
                                        this._getColorForPercentage(this._normalize(data[this.propertyMap[this.feature]], min, max), 0.5)}).addTo(map);
                                      polygon.bindTooltip("2010 " + this.featureName + " of: " + data[this.propertyMap[this.feature]]);
                                      this.markers.push(polygon);
                                    } catch (err) {
                                      console.log(err)
                                    }
                                  }
                                }
                              }.bind(this, map.getBounds());

        const query = this._grpcQuerier.getCensusData(2, map.getBounds()._southWest, map.getBounds()._northEast, callback, this.feature);
    },
};

census_visualizer = function() {
    const censusVisualizer = Census_Visualizer;
    censusVisualizer.initialize();
    return censusVisualizer;
};

try{
    module.exports = {
        census_visualizer: census_visualizer
    }
} catch(e) { }
