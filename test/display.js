var assert = require('assert');
var jsdom = require('jsdom-global')();

var display = require('../src/display')


describe('decode_geohash()', function() {
    it('should return a {lat, lng} pair corresponding to the center of the geohash', function() {
      assert.deepEqual(display.decode_geohash("9xj"), {lat:40.1, lon:-104.8});
  });
});

describe('encode_geohash()', function() {
    it('should return a geohash string of precision length corresponding to the provided coordinates', function() {
      assert.deepEqual(display.encode_geohash(40.69, -74, 4), "dr5r");
  });
});

describe('geohash_bounds()', function() {
    it('should return a bounding box with the lat/lon values of the SW and NE corners', function() {
      assert.deepEqual(display.geohash_bounds("dr5r"), {sw: {lat: 40.60546875, lon: -74.1796875}, ne: {lat: 40.78125, lon: -73.828125}});
  });
});

describe('geohash_adjacent()', function() {
    it('should return the geohash in the provided direction', function() {
      assert.deepEqual(display.geohash_adjacent("dr5r", "w"), "dr5p");
  });
});
