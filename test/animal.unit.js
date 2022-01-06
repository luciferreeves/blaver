if (typeof module !== 'undefined') {
    var assert = require('assert');
    var sinon = require('sinon');
    var bluffmaster = require('../index');
  }
  
  describe("animal.js", function() {
  
    describe("dog()", function() {
      it("returns random value from dog array", function() {
        var dog = bluffmaster.animal.dog();
        assert.ok(bluffmaster.definitions.animal.dog.indexOf(dog) !== -1);
      });
    });
  }); 