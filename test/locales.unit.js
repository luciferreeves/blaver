if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var blaver = require('../index');
}

// TODO: make some tests for getting / setting locales

// Remark: actual use of locales functionality is currently tested in all.functional.js test

describe("locale", function () {
  describe("setLocale()", function () {
    it("setLocale() changes blaver.locale", function () {
      for(var locale in blaver.locales) {
        blaver.setLocale(locale)
        assert.strictEqual(blaver.locale, locale);
      }
    });
  });
});