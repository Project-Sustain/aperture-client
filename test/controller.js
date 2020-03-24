var assert = require('assert');
var jsdom = require('jsdom-global')();

var controller = require('../src/controller')


describe('verifyCorrectMap()', function() {
    it('should return false if nothing has been changed beforehand, should return true if the correct variable is inputed', function() {
      assert.deepEqual(controller.verifyCorrectMap(1), false);

      controller.mouseDown(1);
      controller.initializeMap(1, true);
      assert.deepEqual(controller.verifyCorrectMap(1), true);
      controller.mouseUp();
  });
});


