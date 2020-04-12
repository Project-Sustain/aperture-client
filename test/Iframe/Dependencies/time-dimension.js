var assert = require('assert');
var jsdom = require('jsdom-global');
require("canvas");
global.L = require('leaflet');
require("leaflet-timedimension");

var fs = require('fs');
eval(fs.readFileSync('src/Iframe/Dependencies/time-dimension.js')+'');

const elem = document.createElement('div');
elem.style.cssText = 'width: "100%", height: "800px" ';
elem.id = 'dummyMap';
document.body.appendChild(elem);

const dummyMap = L.map('dummyMap', {renderer: L.canvas(), minZoom: 3,
		fullscreenControl: true,
		timeDimension: true,
		timeDimensionOptions: {
			timeInterval: "2015-01-02T06:00/2015-01-31T00:00",
			transitionTime: 0.1,
			period: "PT6H",
			currentTime: new Date("2015-01-02T06:00")},
	}
);


describe('CustomTimeDimension.initialize()', function() {
    it('should return a CustomTimeDimension object with correct constants', function() {
		const ctd = L.timeDimension.layer.CustomTimeDimension({}, {});
		assert.notDeepEqual(ctd, undefined);
		assert.equal(ctd._currentLoadedTime, 0);
  });
});

describe('CustomTimeDimension.addTo()', function() {
    it('should add the leaflet map reference and initialize the canvas and player', function() {
		const ctd = L.timeDimension.layer.CustomTimeDimension({});
        ctd.addTo(dummyMap);
		assert.equal(ctd._mapToAdd, dummyMap);
  });
});

describe('CustomTimeDimension.addControlReference()', function() {
    it('should add a given object as the TimeDimensionController', function() {
		const ctd = L.timeDimension.layer.CustomTimeDimension({});
		const dummyController = {"id": "dummy"};
		ctd.addControlReference(dummyController);
		assert.deepEqual(ctd._ctrl, dummyController);
		assert.equal(ctd._ctrl, dummyController)
  });

describe('CustomTimeDimension.isReady()', function() {
	it('should return true if the given time matches the currently loaded time', function() {
		const ctd = L.timeDimension.layer.CustomTimeDimension({});
		ctd._currentLoadedTime = 1;
		assert(ctd.isReady(1));
	});
});
});
