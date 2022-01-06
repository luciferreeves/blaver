if (typeof module !== "undefined") {
  var assert = require("assert");
  var sinon = require("sinon");
  var bluffmaster = require("../index");
}

describe("phone_number.js", function () {
  describe("phoneNumber()", function () {
    it("returns a random phoneNumber with a random format", function () {
      sinon.spy(bluffmaster.helpers, "replaceSymbolWithNumber");
      var phone_number = bluffmaster.phone.phoneNumber();

      assert.ok(phone_number.match(/\d/));
      assert.ok(bluffmaster.helpers.replaceSymbolWithNumber.called);

      bluffmaster.helpers.replaceSymbolWithNumber.restore();
    });
  });

  describe("phoneNumberFormat()", function () {
    it("returns phone number with requested format (Array index)", function () {
      bluffmaster.locale = "en";
      for (var i = 0; i < 10; i++) {
        var phone_number = bluffmaster.phone.phoneNumberFormat(1);
        assert.ok(phone_number.match(/\(\d\d\d\) \d\d\d-\d\d\d\d/));
      }
    });

    it("returns phone number with proper format US (Array index)", function () {
      bluffmaster.locale = "en";
      for (var i = 0; i < 25; i++) {
        var phone_number = bluffmaster.phone.phoneNumberFormat(1);
        console.log(phone_number);
        assert.ok(phone_number.match(/\([2-9]\d\d\) [2-9]\d\d-\d\d\d\d/));
      }
    });

    it("returns phone number with proper format CA (Array index)", function () {
      bluffmaster.locale = "en_CA";
      for (var i = 0; i < 25; i++) {
        var phone_number = bluffmaster.phone.phoneNumberFormat(1);
        assert.ok(phone_number.match(/\([2-9]\d\d\)[2-9]\d\d-\d\d\d\d/));
      }
    });
  });
});
