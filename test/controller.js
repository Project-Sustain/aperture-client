var assert = require('assert');
var jsdom = require('jsdom-global')();

var controller = require('../src/controller')


describe('verifyCorrectMap()', function() {
    it('should return false if nothing has been changed beforehand, should return true if the correct variavle is inputed', function() {
      assert.deepEqual(controller.verifyCorrectMap(1), false);

      controller.map1IsBeingMoved = true;
      assert.deepEqual(controller.verifyCorrectMap(1), true);
      controller.map1IsBeingMoved = false;

      controller.map2IsBeingMoved = true;
      assert.deepEqual(controller.verifyCorrectMap(2), true);
      controller.map2IsBeingMoved = false;

      controller.map3IsBeingMoved = true;
      assert.deepEqual(controller.verifyCorrectMap(3), true);
      controller.map3IsBeingMoved = false;

      controller.map4IsBeingMoved = true;
      assert.deepEqual(controller.verifyCorrectMap(4), true);
      controller.map4IsBeingMoved = false;
  });
});


