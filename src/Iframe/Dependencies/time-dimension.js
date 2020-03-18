'use strict';

L.TimeDimension.Layer.CustomTimeDimension = L.TimeDimension.Layer.extend({

    initialize: function(options) {
		var me = this
        L.TimeDimension.Layer.prototype.initialize.call(this, options);
        this._currentLoadedTime = 0;
        this._NE = {x:65.0000, y:-165.0000};
		this._SW = {x:3.0000, y:-40.0000};
    },
    
    onAdd: function(map) {
		this._map = map
        L.TimeDimension.Layer.prototype.onAdd.call(this, map);
        this._initCanvas()
        this._player = new L.TimeDimension.Player({}, map.timeDimension);
	},

	addControlReference: function(ctrl) {
		this._ctrl = ctrl
	},
	
    _initCanvas: function () {
        var canvas = this._canvas = L.DomUtil.create('canvas', 'leaflet-voronoi-layer leaflet-layer');
		this._ctx = canvas.getContext("2d")
		this._ctx.globalCompositeOperation = "lighter"

        var originProp = L.DomUtil.testProp(['transformOrigin', 'WebkitTransformOrigin', 'msTransformOrigin']);
        canvas.style[originProp] = '50% 50%';

        canvas.width  = 1000;
        canvas.height = 500;

        var animated = this._map.options.zoomAnimation && L.Browser.any3d;
        L.DomUtil.addClass(canvas, 'leaflet-zoom-' + (animated ? 'animated' : 'hide'));
    },


    _onNewTimeLoading: function(ev) {
		if (this._ctrl._player._waitingForBuffer) {
			if (ev.time - moment.duration(mymap.timeDimension.options.period) != this._timeDimension.getCurrentTime()){
				return false
			}
		} else {
			if (ev.time - moment.duration(mymap.timeDimension.options.period) == this._timeDimension.getCurrentTime()){
				return false
			}
		}
		//this._getDataForTime(ev.time);
        return;
    },

    isReady: function(time) {
        return (this._currentLoadedTime == time);
    },
    
    _updateTime: function(data) {
		var currTime = parseFloat(this._timeDimension.getCurrentTime())
		if ((this._timeDimension && (parseFloat(queryData["time"]) == currTime) && !this._ctrl._player._waitingForBuffer) ||
			(this._timeDimension && (parseFloat(queryData["time"]) != currTime) && this._ctrl._player._waitingForBuffer)) {
			if("raster" in data){
				var id = new ImageData(new Uint8ClampedArray(data["raster"]), 1000, 500);
				this._ctx.putImageData(id, 0, 0)
			}
			this._currentLoadedTime = currTime;
			this.fire('timeload', {
				time: currTime,
			});	
		}
	},
});

L.timeDimension.layer.VoronoiLayer = function(options) {
    return new L.TimeDimension.Layer.VoronoiLayer(options);
};
