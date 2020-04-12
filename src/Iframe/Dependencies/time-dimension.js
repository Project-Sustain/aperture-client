'use strict';

L.TimeDimension.Layer.CustomTimeDimension = L.TimeDimension.Layer.extend({

    initialize: function(options, dataLoader) {
        L.TimeDimension.Layer.prototype.initialize.call(this, options);
        this._dataLoader = dataLoader;
        this._lastQueryTime = 0;
        this._currentLoadedTime = 0;
    },
    
    onAdd: function(map) {
		this._map = map;
        L.TimeDimension.Layer.prototype.onAdd.call(this, map);

        this._initCanvas();

        if (this.options.pane) {
            this.getPane().appendChild(this._canvas);
        }else{
            map._panes.overlayPane.appendChild(this._canvas);
        }

		this._getDataForTime(this._timeDimension.getCurrentTime());
        map.on('moveend', this._reset, this);
	},

    addTo: function (map) {
        map.addLayer(this);
        return this;
    },

	addControlReference: function(ctrl) {
		this._ctrl = ctrl;
	},
	
    _initCanvas: function () {
        const canvas = this._canvas = L.DomUtil.create('canvas', 'leaflet-time-dimension-layer leaflet-layer');
		this._ctx = canvas.getContext("2d");
		this._ctx.globalCompositeOperation = "lighter";

        const originProp = L.DomUtil.testProp(['transformOrigin', 'WebkitTransformOrigin', 'msTransformOrigin']);
        canvas.style[originProp] = '50% 50%';

        this._updateBounds();

        const animated = this._map.options.zoomAnimation && L.Browser.any3d;
        L.DomUtil.addClass(canvas, 'leaflet-zoom-' + (animated ? 'animated' : 'hide'));
        this._reset();
    },

    _updateBounds: function() {
        const size = this._map.getSize();
        this._canvas.width  = size.x;
        this._canvas.height = size.y;
        const bounds = this._map.getBounds();
        this._topLeft = {lat: bounds._northEast.lat, lng:bounds._southWest.lng};
        this._bottomRight = {lat: bounds._southWest.lat, lng:bounds._northEast.lng};
        this._bottomRight.lng -= 360;
    },

    _reset: function () {
        const topLeft = this._map.latLngToLayerPoint(this._topLeft);
        const bottomRight = this._map.latLngToLayerPoint(this._bottomRight);
        this._canvas.style.width = ""+bottomRight.x - topLeft.x+"px";
        this._canvas.style.height = ""+bottomRight.y - topLeft.y+"px";
        L.DomUtil.setPosition(this._canvas, topLeft);
    },

    _onNewTimeLoading: function(ev) {
		this._getDataForTime(ev.time);
    },

    isReady: function(time) {
        return (this._currentLoadedTime === time);
    },

	_getDataForTime: function(time) {
        if(Math.abs(this._lastQueryTime - new Date().getTime()) < 1000)
            return;
        this._lastQueryTime = new Date().getTime();

        this._updateBounds();
        this._reset();
        const endTime = time + moment.duration(this._timeDimension.options.period).asMilliseconds();
    	this._dataLoader.queryTime(time, endTime, this._ctx, this._map);

        this._currentLoadedTime = time;
        this.fire('timeload', {
            time: time
        });
    }
});

L.timeDimension.layer.CustomTimeDimension = function(options, dataLoader) {
    return new L.TimeDimension.Layer.CustomTimeDimension(options, dataLoader);
};
