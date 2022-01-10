if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var blaver = require('../index');
}

describe("unique.js", function () {
  describe("unique()", function () {

    it("is able to call a function with no arguments and return a result", function () {
      const result = blaver.unique(blaver.internet.email);
      assert.strictEqual(typeof result, 'string');
    });

    it("is able to call a function with arguments and return a result", function () {
      const result = blaver.unique(blaver.internet.email, ['a', 'b', 'c']); // third argument is provider, or domain for email
      assert.ok(result.match(/\@c/));
    });

    it("is able to call same function with arguments and return a result", function () {
      const result = blaver.unique(blaver.internet.email, ['a', 'b', 'c']); // third argument is provider, or domain for email
      assert.ok(result.match(/\@c/));
    });

    it("is able to exclude results as array", function () {
      const result = blaver.unique(blaver.internet.protocol, [], { exclude: ['https'] });
      assert.strictEqual(result, 'http');
    });

    it("is able to limit unique call by maxTime in ms", function () {
      let result;
      try {
        result = blaver.unique(blaver.internet.protocol, [], { maxTime: 1, maxRetries: 9999, exclude: ['https', 'http'] });
      } catch (err) {
        assert.strictEqual(err.message.substr(0, 16), 'Exceeded maxTime');
      }
    });

    it("is able to limit unique call by maxRetries", function () {
      let result;
      try {
        result = blaver.unique(blaver.internet.protocol, [], { maxTime: 5000, maxRetries: 5, exclude: ['https', 'http'] });
      } catch (err) {
        assert.strictEqual(err.message.substr(0, 19), 'Exceeded maxRetries');
      }
    });

    it("is able to call last function with arguments and return a result", function () {
      const result = blaver.unique(blaver.internet.email, ['a', 'b', 'c']); // third argument is provider, or domain for email
      assert.ok(result.match(/\@c/));
    });

  });
});