'use strict';

L.VoronoiLayer = (L.Layer ? L.Layer : L.Class).extend({

    // options: {
    //     minOpacity: 0.05,
    //     maxZoom: 18,
    //     radius: 25,
    //     blur: 15,
    //     max: 1.0
    // },

    percentColors: [
        { pct: 0.0, color: { r: 0x00, g: 0x00, b: 0xff } },
        { pct: 0.5, color: { r: 0x00, g: 0xff, b: 0x00 } },
        { pct: 1.0, color: { r: 0xff, g: 0x00, b: 0x00 } }
    ],

    initialize: function (latlngs, options) {
        this._latlngs = latlngs;
	this._delaunay = d3.Delaunay.from(latlngs)
        L.setOptions(this, options);
    },

    setLatLngs: function (latlngs, options) {
        this._latlngs = latlngs;
	L.setOptions(this, options);
	this._delaunay = d3.Delaunay.from(latlngs)
        return this.redraw();
    },

    addLatLng: function (latlng) {
        this._latlngs.push(latlng);
	this._delaunay = d3.Delaunay.from(latlngs)
        return this.redraw();
    },

    setOptions: function (options) {
        L.setOptions(this, options);
        return this.redraw();
    },

    redraw: function () {
        if (this._voronoi && !this._frame && this._map && !this._map._animating) {
            this._frame = L.Util.requestAnimFrame(this._redraw, this);
        }
        return this;
    },

    onAdd: function (map) {
        this._map = map;

        if (!this._canvas) {
            this._initCanvas();
        }

        if (this.options.pane) {
            this.getPane().appendChild(this._canvas);
        }else{
            map._panes.overlayPane.appendChild(this._canvas);
        }

        map.on('moveend', this._reset, this);

        if (map.options.zoomAnimation && L.Browser.any3d) {
            map.on('zoomanim', this._animateZoom, this);
        }

        this._reset();
    },

    onRemove: function (map) {
     //   if (this.options.pane) {
     //       this.getPane().removeChild(this._canvas);
     //  }else{
     //       map.getPanes().overlayPane.removeChild(this._canvas);
     //   }

        map.off('moveend', this._reset, this);

        if (map.options.zoomAnimation) {
            map.off('zoomanim', this._animateZoom, this);
        }
    },

    _polygonArea: function (corners) {
        var n = corners.length
        var area = 0.0
        for (var i = 0; i < n; i++){
            var j = (i + 1) % n
            area += corners[i][0] * corners[j][1]
            area -= corners[j][0] * corners[i][1]
	}
        area = Math.abs(area) / 2.0
        return area
    },

    _polygonPerimeter: function (corners) {
        var n = corners.length
        var length = 0.0
        for (var i = 0; i < n; i++){
            var j = (i + 1) % n
            length += Math.hypot(corners[j][0]-corners[i][0], corners[j][1]-corners[i][1])
	}
        return length
    },

    addTo: function (map) {
        map.addLayer(this);
        return this;
    },

    _initCanvas: function () {
        var canvas = this._canvas = L.DomUtil.create('canvas', 'leaflet-voronoi-layer leaflet-layer');

        var originProp = L.DomUtil.testProp(['transformOrigin', 'WebkitTransformOrigin', 'msTransformOrigin']);
        canvas.style[originProp] = '50% 50%';

        var size = this._map.getSize();
        canvas.width  = size.x;
        canvas.height = size.y;

        var animated = this._map.options.zoomAnimation && L.Browser.any3d;
        L.DomUtil.addClass(canvas, 'leaflet-zoom-' + (animated ? 'animated' : 'hide'));

        this._voronoi = simplevoronoi(canvas);
    },

    _reset: function () {
        var topLeft = this._map.containerPointToLayerPoint([0, 0]);
        L.DomUtil.setPosition(this._canvas, topLeft);

        var size = this._map.getSize();

        if (this._voronoi._width !== size.x) {
            this._canvas.width = this._voronoi._width  = size.x;
        }
        if (this._voronoi._height !== size.y) {
            this._canvas.height = this._voronoi._height = size.y;
        }

        this._redraw();
    },

    _getColorForPercentage: function(pct) {
        for (var i = 1; i < this.percentColors.length - 1; i++) {
            if (pct < this.percentColors[i].pct) {
                break;
            }
        }
        var lower = this.percentColors[i - 1];
        var upper = this.percentColors[i];
        var range = upper.pct - lower.pct;
        var rangePct = (pct - lower.pct) / range;
        var pctLower = 1 - rangePct;
        var pctUpper = rangePct;
        var color = {
            r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
            g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
            b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
        };
        return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
        // or output as hex if preferred
    },  

    _redraw: function () {
        if (!this._map) {
            return;
        }
	var data = []
        var bounds = mymap.getBounds(),
		topLeftLL = bounds.getNorthWest(),
		bottomRightLL = bounds.getSouthEast(),
        	topLeft = mymap.latLngToLayerPoint(topLeftLL),
        	bottomRight = mymap.latLngToLayerPoint(bottomRightLL),
		drawLimit = bounds.pad(0.4);

	// console.time('process');
	var voronoi = this._delaunay.voronoi([drawLimit._southWest.lat, drawLimit._southWest.lng, drawLimit._northEast.lat, drawLimit._northEast.lng]);

	var dataCount = 0
	for (var i = 0; i < this._latlngs.length; i++) {
	    var latlng = new L.LatLng(this._latlngs[i][0], this._latlngs[i][1]);
  	    if (drawLimit.contains(latlng)) {
		var color = this._getColorForPercentage((points[i][2] - this.options.dataMin) / (this.options.dataMax - this.options.dataMin))
		var newPolygon = []
		var polygon = voronoi.cellPolygon(i)
		if (this._polygonPerimeter(polygon) > 0.9){
		    continue
		}
		var valid = true
		for (var j = 0; j < polygon.length; j++){
		    var point = L.latLng(polygon[j])
		    if (point.lat <= this.options.bounds['se'][0] || point.lat >= this.options.bounds['nw'][0] || 
	      			point.lng  >= this.options.bounds['se'][1] || point.lng <= this.options.bounds['nw'][1]) {
		        valid = false
		        break 
	  	    }
	  	    var pPoint = mymap.latLngToLayerPoint(point)
		    newPolygon.push([pPoint.x- topLeft.x, pPoint.y- topLeft.y])
		}
		if (valid){
		    data.push([newPolygon,color])
		    dataCount += 1
		}
	    }
	}
	console.log("Number of data points displayed: "+ dataCount)
        // console.timeEnd('process');

        // console.time('draw ' + data.length);
        this._voronoi.data(data).draw(this.options.minOpacity);
        // console.timeEnd('draw ' + data.length);

        this._frame = null;
    },

    _animateZoom: function (e) {
        var scale = this._map.getZoomScale(e.zoom),
            offset = this._map._getCenterOffset(e.center)._multiplyBy(-scale).subtract(this._map._getMapPanePos());

        if (L.DomUtil.setTransform) {
            L.DomUtil.setTransform(this._canvas, offset, scale);

        } else {
            this._canvas.style[L.DomUtil.TRANSFORM] = L.DomUtil.getTranslateString(offset) + ' scale(' + scale + ')';
        }
    }
});

L.voronoiLayer = function (latlngs, options) {
    return new L.VoronoiLayer(latlngs, options);
};