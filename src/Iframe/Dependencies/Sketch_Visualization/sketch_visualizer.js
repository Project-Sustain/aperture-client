Sketch_Visualizer = {
    initialize: function(percentageToColor) {
        this._grpcQuerier = grpc_querier();
        this._percentageToColor = percentageToColor;
        this._zoomToPixelSize = {
            3: 2,
            4: 3,
            5: 5,
            6: 8,
            7: 16,
            8: 35
        };
    },

    _drawStrand: function(strand, ctx, map) {
        const lat_lng = decode_geohash(strand.getGeohash());
        lat_lng.lon += 360;

        const center = map.latLngToContainerPoint(lat_lng);
        ctx.fillStyle = this._rgbaToString(this._getColorForPercentage((strand.getMeanList()[0] - 250) / (330 - 250), 0.5));

        const pixelSize = this._zoomToPixelSize[map.getZoom()];
        ctx.clearRect(center.x, center.y, pixelSize, pixelSize);
        ctx.fillRect(center.x, center.y, pixelSize, pixelSize);
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
        return [r, g, b, alpha];
    },

    queryTime: function(startTime, endTime, ctx, map) {
        const stream = this._grpcQuerier.getStreamForQuery("noaa_2015_jan", ["",], startTime, endTime);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        stream.on('data', function (response) {
            for (const strand of response.getStrandsList()) {
                this._drawStrand(strand, ctx, map);
            }
        }.bind(this));
        stream.on('status', function (status) {
            console.log(status.code, status.details, status.metadata);
        });
        stream.on('end', function (end) {
        }.bind(this));
    },
};

sketch_visualizer = function(percentageToColor) {
    const sketchVisualizer = Sketch_Visualizer;
    sketchVisualizer.initialize(percentageToColor);
    return sketchVisualizer;
};

try{
    module.exports = {
        sketch_visualizer: sketch_visualizer
    }
} catch(e) { }