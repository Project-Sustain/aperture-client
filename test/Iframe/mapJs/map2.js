var assert = require('assert');
var jsdom = require('jsdom-global')();

var map2 = require('../../../src/Iframe/mapJs/map2')

describe('mapObjectGetter()', function() {
    it('should return a layer with id OverPassLayer', function() {
      assert.deepEqual(map2.mapObjectGetter('drinking_water').options.id, 'OverPassLayer');
  });
});


