if (typeof module !== 'undefined') {
  var assert = require('assert');
  var blaver = require('../index');
}
  
describe("animal.js", function() {
  
  describe("dog()", function() {
    it("returns random value from dog array", function() {
      const dog = blaver.animal.dog();
      assert.ok(blaver.definitions.animal.dog.indexOf(dog) !== -1);
    });
  });
}); 