const assert = require('assert');
const {sketch_visualizer} = require('../../../../src/Iframe/Dependencies/Sketch_Visualization/sketch_visualizer');

const ptc = {
    0.0: [0, 0, 255],
    0.5: [0, 255, 0],
    1.0: [255, 0, 0]
};
const sv = sketch_visualizer(ptc);

describe('sketch_visualizer()', function() {
    it('should initialize the sketch_visualizer with the given percentage', function() {
        assert.notDeepEqual(sv, undefined);
        assert.deepEqual(sv._percentageToColor, ptc);
        assert.deepEqual(sv._zoomToPixelSize, {
            3: 2,
            4: 3,
            5: 5,
            6: 8,
            7: 16,
            8: 35
        });
    });
});

describe('sketch_visualizer._rgbaToString()', function() {
    it('should correctly convert an array of RGBA values to a string', function() {
        assert.deepEqual(sv._rgbaToString([0, 1, 2, 3]), "rgba(0, 1, 2, 3)");
    });
});

describe('sketch_visualizer._getColorForPercentage()', function() {
    it('should correctly convert a float to an rgba value', function() {
        assert.deepEqual(sv._getColorForPercentage(0, 0), [0, 0, 254, 0]);
        assert.deepEqual(sv._getColorForPercentage(0.25, 0.25), [0, 127, 127, 0.25]);
        assert.deepEqual(sv._getColorForPercentage(0.5, 0.5), [0, 254, 0, 0.5]);
        assert.deepEqual(sv._getColorForPercentage(0.75, 0.75), [127, 127, 0, 0.75]);
        assert.deepEqual(sv._getColorForPercentage(1, 1), [254, 0, 0, 1]);
    });
});