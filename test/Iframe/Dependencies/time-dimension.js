var assert = require('assert');
var jsdom = require('jsdom-global');
require("canvas")
global.L = require('leaflet');
require("leaflet-timedimension")

var fs = require('fs');
eval(fs.readFileSync('src/Iframe/Dependencies/time-dimension.js')+'');


describe('CustomTimeDimension.initialize()', function() {
    it('should return a CustomTimeDimension object with correct constants', function() {
		ctd = L.timeDimension.layer.CustomTimeDimension({loadingTimeout: 1000000})
		assert.notDeepEqual(ctd, undefined)
		assert.deepEqual(ctd._NE, {x:65.0000, y:-165.0000})
		assert.deepEqual(ctd._SW, {x:3.0000, y:-40.0000})
		assert.equal(ctd._currentLoadedTime, 0)
  });
});

describe('CustomTimeDimension.onAdd()', function() {
    it('should add the leaflet map reference and initialize the canvas and player', function() {
		ctd = L.timeDimension.layer.CustomTimeDimension({})
		
		var elem = document.createElement('div');
		elem.style.cssText = 'width: "100%", height: "800px" ';
		elem.id = 'dummyMap';
		document.body.appendChild(elem);

		var dummyMap = L.map('dummyMap', {renderer: L.canvas(), minZoom: 3, 
            fullscreenControl: true,
            timeDimension: true,
			timeDimensionOptions: {
        		    timeInterval: "2015-01-02T06:00/2015-01-31T00:00",
        		    transitionTime: 0.1,
        		    period: "PT6H",
                    currentTime: new Date("2015-01-02T06:00")},
			}
        );
        ctd.addTo(dummyMap)
		assert.equal(ctd._mapToAdd, dummyMap)
  });
});

describe('CustomTimeDimension.addControlReference()', function() {
    it('should add a given object as the TimeDimensionController', function() {
		ctd = L.timeDimension.layer.CustomTimeDimension({})
		var dummyController = {"id": "dummy"}
		ctd.addControlReference(dummyController)
		assert.deepEqual(ctd._ctrl, dummyController)
		assert.equal(ctd._ctrl, dummyController)
  });
});
