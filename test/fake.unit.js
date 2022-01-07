if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var blaver = require('../index');
}

describe("fake.js", function () {
  describe("fake()", function () {
    it("replaces a token with a random value for a method with no parameters", function () {
      const name = blaver.fake('{{phone.phoneNumber}}');
      assert.ok(name.match(/\d/));
    });

    it("replaces multiple tokens with random values for methods with no parameters", function () {
      const name = blaver.fake('{{helpers.randomize}}{{helpers.randomize}}{{helpers.randomize}}');
      assert.ok(name.match(/[abc]{3}/));
    });

    it("replaces a token with a random value for a methods with a simple parameter", function () {
      const arr = ["one", "two", "three"];
      const random = blaver.fake('{{helpers.slugify("Will This Work")}}');
      assert.ok(random === "Will-This-Work");
    });

    it("replaces a token with a random value for a method with an array parameter", function () {
      const arr = ["one", "two", "three"];
      const random = blaver.fake('{{helpers.randomize(["one", "two", "three"])}}');
      assert.ok(arr.indexOf(random) > -1);
    });

    it("does not allow undefined parameters", function () {
      assert.throws(function () {
        blaver.fake()
      }, Error);
    });

    it("does not allow invalid module name", function () {
      assert.throws(function () {
        blaver.fake('{{foo.bar}}')
      }, Error);
    });

    it("does not allow invalid method name", function () {
      assert.throws(function () {
        blaver.fake('{{address.foo}}')
      }, Error);
    });


  });
});