var assert = require('assert');
var jsdom = require('jsdom-global')();

var controller = require('../src/controller')


describe('verifyCorrectMap()', function() {
    it('should return false if nothing has been changed beforehand, should return true if the correct variable is inputed', function() {
      controller.mouseUp();
      assert.deepEqual(controller.verifyCorrectMap(1), false);

      controller.mouseDown(1);
      controller.initializeMap(1, true);
      assert.deepEqual(controller.verifyCorrectMap(1), true);
      controller.mouseUp();

      controller.mouseDown(2);
      controller.initializeMap(2, true);
      assert.deepEqual(controller.verifyCorrectMap(2), true);
      controller.mouseUp();

      controller.mouseDown(3);
      controller.initializeMap(3, true);
      assert.deepEqual(controller.verifyCorrectMap(3), true);
      controller.mouseUp();

      controller.mouseDown(4);
      controller.initializeMap(4, true);
      assert.deepEqual(controller.verifyCorrectMap(4), true);
      controller.mouseUp();
  });
});


describe('checkIfAnyCanMove()', function() {
    it('should return true if no maps are being moved, false if any are moving', function() {
      controller.mouseUp(); //sets all to not moving
      assert.deepEqual(controller.checkIfAnyCanMove(), true);
      controller.mouseDown(1);
      controller.initializeMap(1, true);
      assert.deepEqual(controller.checkIfAnyCanMove(), false);
    });
});


