if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var blaver = require('../index');
}

describe("phone_number.js", function () {
  describe("phoneNumber()", function () {
    it("returns a random phoneNumber with a random format", function () {
      sinon.spy(blaver.helpers, 'replaceSymbolWithNumber');
      const phone_number = blaver.phone.phoneNumber();

      assert.ok(phone_number.match(/\d/));
      assert.ok(blaver.helpers.replaceSymbolWithNumber.called);

      blaver.helpers.replaceSymbolWithNumber.restore();
    });
  });

  describe("phoneNumberFormat()", function () {
    it("returns phone number with requested format (Array index)", function () {
      blaver.locale = "en";
      for (let i = 0; i < 10; i++) {
        const phone_number = blaver.phone.phoneNumberFormat(1);
        assert.ok(phone_number.match(/\(\d\d\d\) \d\d\d-\d\d\d\d/));
      }
    });

    it("returns phone number with proper format US (Array index)", function () {
      blaver.locale = "en";
      for (let i = 0; i < 25; i++) {
        const phone_number = blaver.phone.phoneNumberFormat(1);
        console.log(phone_number)
        assert.ok(phone_number.match(/\([2-9]\d\d\) [2-9]\d\d-\d\d\d\d/));
      }
    });

    it("returns phone number with proper format CA (Array index)", function () {
      blaver.locale = "en_CA";
      for (let i = 0; i < 25; i++) {
        const phone_number = blaver.phone.phoneNumberFormat(1);
        assert.ok(phone_number.match(/\([2-9]\d\d\)[2-9]\d\d-\d\d\d\d/));
      }
    });

  });

});