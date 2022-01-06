if (typeof module !== "undefined") {
  var assert = require("assert");
  var sinon = require("sinon");
  var bluffmaster = require("../index");
}

describe("address.js", function () {
  describe("city()", function () {
    beforeEach(function () {
      sinon.spy(bluffmaster.address, "cityPrefix");
      sinon.spy(bluffmaster.name, "firstName");
      sinon.spy(bluffmaster.name, "lastName");
      sinon.spy(bluffmaster.address, "citySuffix");
    });

    afterEach(function () {
      bluffmaster.random.number.restore();
      bluffmaster.address.cityPrefix.restore();
      bluffmaster.name.firstName.restore();
      bluffmaster.name.lastName.restore();
      bluffmaster.address.citySuffix.restore();
    });

    it("occasionally returns prefix + first name + suffix", function () {
      sinon.stub(bluffmaster.random, "number").returns(0);

      var city = bluffmaster.address.city();
      assert.ok(city);

      assert.ok(bluffmaster.address.cityPrefix.calledOnce);
      assert.ok(bluffmaster.name.firstName.calledOnce);
      assert.ok(bluffmaster.address.citySuffix.calledOnce);
    });

    it("occasionally returns prefix + first name", function () {
      sinon.stub(bluffmaster.random, "number").returns(1);

      var city = bluffmaster.address.city();
      assert.ok(city);

      assert.ok(bluffmaster.address.cityPrefix.calledOnce);
      assert.ok(bluffmaster.name.firstName.calledOnce);
    });

    it("occasionally returns first name + suffix", function () {
      sinon.stub(bluffmaster.random, "number").returns(2);

      var city = bluffmaster.address.city();
      assert.ok(city);

      assert.ok(bluffmaster.address.citySuffix.calledOnce);
    });

    it("occasionally returns last name + suffix", function () {
      sinon.stub(bluffmaster.random, "number").returns(3);

      var city = bluffmaster.address.city();
      assert.ok(city);

      assert.ok(!bluffmaster.address.cityPrefix.called);
      assert.ok(!bluffmaster.name.firstName.called);
      assert.ok(bluffmaster.name.lastName.calledOnce);
      assert.ok(bluffmaster.address.citySuffix.calledOnce);
    });
  });

  describe("streetName()", function () {
    beforeEach(function () {
      sinon.spy(bluffmaster.name, "firstName");
      sinon.spy(bluffmaster.name, "lastName");
      sinon.spy(bluffmaster.address, "streetSuffix");
    });

    afterEach(function () {
      bluffmaster.name.firstName.restore();
      bluffmaster.name.lastName.restore();
      bluffmaster.address.streetSuffix.restore();
    });

    it("occasionally returns last name + suffix", function () {
      sinon.stub(bluffmaster.random, "number").returns(0);

      var street_name = bluffmaster.address.streetName();
      assert.ok(street_name);
      assert.ok(!bluffmaster.name.firstName.called);
      assert.ok(bluffmaster.name.lastName.calledOnce);
      assert.ok(bluffmaster.address.streetSuffix.calledOnce);

      bluffmaster.random.number.restore();
    });

    it("occasionally returns first name + suffix", function () {
      sinon.stub(bluffmaster.random, "number").returns(1);

      var street_name = bluffmaster.address.streetName();
      assert.ok(street_name);

      assert.ok(bluffmaster.name.firstName.calledOnce);
      assert.ok(!bluffmaster.name.lastName.called);
      assert.ok(bluffmaster.address.streetSuffix.calledOnce);

      bluffmaster.random.number.restore();
    });

    it("trims trailing whitespace from the name", function () {
      bluffmaster.address.streetSuffix.restore();

      sinon.stub(bluffmaster.address, "streetSuffix").returns("");
      var street_name = bluffmaster.address.streetName();
      assert.ok(!street_name.match(/ $/));
    });
  });

  describe("streetAddress()", function () {
    beforeEach(function () {
      sinon.spy(bluffmaster.address, "streetName");
      sinon.spy(bluffmaster.address, "secondaryAddress");
    });

    afterEach(function () {
      bluffmaster.address.streetName.restore();
      bluffmaster.address.secondaryAddress.restore();
    });

    it("occasionally returns a 5-digit street number", function () {
      sinon.stub(bluffmaster.random, "number").returns(0);
      var address = bluffmaster.address.streetAddress();
      var parts = address.split(" ");

      assert.equal(parts[0].length, 5);
      assert.ok(bluffmaster.address.streetName.called);

      bluffmaster.random.number.restore();
    });

    it("occasionally returns a 4-digit street number", function () {
      sinon.stub(bluffmaster.random, "number").returns(1);
      var address = bluffmaster.address.streetAddress();
      var parts = address.split(" ");

      assert.equal(parts[0].length, 4);
      assert.ok(bluffmaster.address.streetName.called);

      bluffmaster.random.number.restore();
    });

    it("occasionally returns a 3-digit street number", function () {
      sinon.stub(bluffmaster.random, "number").returns(2);
      var address = bluffmaster.address.streetAddress();
      var parts = address.split(" ");

      assert.equal(parts[0].length, 3);
      assert.ok(bluffmaster.address.streetName.called);
      assert.ok(!bluffmaster.address.secondaryAddress.called);

      bluffmaster.random.number.restore();
    });

    context("when useFulladdress is true", function () {
      it("adds a secondary address to the result", function () {
        var address = bluffmaster.address.streetAddress(true);
        var parts = address.split(" ");

        assert.ok(bluffmaster.address.secondaryAddress.called);
      });
    });
  });

  describe("secondaryAddress()", function () {
    it("randomly chooses an Apt or Suite number", function () {
      sinon.spy(bluffmaster.random, "arrayElement");

      var address = bluffmaster.address.secondaryAddress();

      var expected_array = ["Apt. ###", "Suite ###"];

      assert.ok(address);
      assert.ok(bluffmaster.random.arrayElement.calledWith(expected_array));
      bluffmaster.random.arrayElement.restore();
    });
  });

  describe("county()", function () {
    it("returns random county", function () {
      sinon.spy(bluffmaster.address, "county");
      var county = bluffmaster.address.county();
      assert.ok(county);
      assert.ok(bluffmaster.address.county.called);
      bluffmaster.address.county.restore();
    });
  });

  describe("country()", function () {
    it("returns random country", function () {
      sinon.spy(bluffmaster.address, "country");
      var country = bluffmaster.address.country();
      assert.ok(country);
      assert.ok(bluffmaster.address.country.called);
      bluffmaster.address.country.restore();
    });
  });

  describe("countryCode()", function () {
    it("returns random countryCode", function () {
      sinon.spy(bluffmaster.address, "countryCode");
      var countryCode = bluffmaster.address.countryCode();
      assert.ok(countryCode);
      assert.ok(bluffmaster.address.countryCode.called);
      bluffmaster.address.countryCode.restore();
    });

    it("returns random alpha-3 countryCode", function () {
      sinon.spy(bluffmaster.address, "countryCode");
      var countryCode = bluffmaster.address.countryCode("alpha-3");
      assert.ok(countryCode);
      assert.ok(bluffmaster.address.countryCode.called);
      assert.equal(countryCode.length, 3);
      bluffmaster.address.countryCode.restore();
    });
  });

  describe("state()", function () {
    it("returns random state", function () {
      sinon.spy(bluffmaster.address, "state");
      var state = bluffmaster.address.state();
      assert.ok(state);
      assert.ok(bluffmaster.address.state.called);
      bluffmaster.address.state.restore();
    });
  });

  describe("zipCode()", function () {
    it("returns random zipCode", function () {
      sinon.spy(bluffmaster.address, "zipCode");
      var zipCode = bluffmaster.address.zipCode();
      assert.ok(zipCode);
      assert.ok(bluffmaster.address.zipCode.called);
      bluffmaster.address.zipCode.restore();
    });

    it("returns random zipCode - user specified format", function () {
      var zipCode = bluffmaster.address.zipCode("?#? #?#");
      assert.ok(zipCode.match(/^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/));
      // try another format
      zipCode = bluffmaster.address.zipCode("###-###");
      assert.ok(zipCode.match(/^\d{3}-\d{3}$/));
    });

    it("returns zipCode with proper locale format", function () {
      // we'll use the en_CA locale..
      bluffmaster.locale = "en_CA";
      var zipCode = bluffmaster.address.zipCode();
      assert.ok(zipCode.match(/^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/));
    });
  });

  describe("zipCodeByState()", function () {
    it("returns zipCode valid for specified State", function () {
      bluffmaster.locale = "en_US";
      var states = ["IL", "GA", "WA"];

      var zipCode1 = bluffmaster.address.zipCodeByState(states[0]);
      assert.ok(zipCode1 >= 60001);
      assert.ok(zipCode1 <= 62999);
      var zipCode2 = bluffmaster.address.zipCodeByState(states[1]);
      assert.ok(zipCode2 >= 30001);
      assert.ok(zipCode2 <= 31999);
      var zipCode3 = bluffmaster.address.zipCodeByState(states[2]);
      assert.ok(zipCode3 >= 98001);
      assert.ok(zipCode3 <= 99403);
    });

    it("returns undefined if state is invalid", function () {
      var state = "XX";
      sinon.spy(bluffmaster.address, "zipCode");
      var zipCode = bluffmaster.address.zipCodeByState(state);
      assert.ok(bluffmaster.address.zipCode.called);
      bluffmaster.address.zipCode.restore();
    });

    it("returns undefined if state is valid but localeis invalid", function () {
      bluffmaster.locale = "zh_CN";
      var state = "IL";
      sinon.spy(bluffmaster.address, "zipCode");
      var zipCode = bluffmaster.address.zipCodeByState(state);
      assert.ok(bluffmaster.address.zipCode.called);
      bluffmaster.address.zipCode.restore();
    });
  });

  describe("latitude()", function () {
    it("returns random latitude", function () {
      for (var i = 0; i < 100; i++) {
        sinon.spy(bluffmaster.random, "number");
        var latitude = bluffmaster.address.latitude();
        assert.ok(typeof latitude === "string");
        var latitude_float = parseFloat(latitude);
        assert.ok(latitude_float >= -90.0);
        assert.ok(latitude_float <= 90.0);
        assert.ok(bluffmaster.random.number.called);
        bluffmaster.random.number.restore();
      }
    });

    it("returns latitude with min and max and default precision", function () {
      for (var i = 0; i < 100; i++) {
        sinon.spy(bluffmaster.random, "number");
        var latitude = bluffmaster.address.latitude(-5, 5);
        assert.ok(typeof latitude === "string");
        assert.equal(latitude.split(".")[1].length, 4);
        var latitude_float = parseFloat(latitude);
        assert.ok(latitude_float >= -5);
        assert.ok(latitude_float <= 5);
        assert.ok(bluffmaster.random.number.called);
        bluffmaster.random.number.restore();
      }
    });

    it("returns random latitude with custom precision", function () {
      for (var i = 0; i < 100; i++) {
        sinon.spy(bluffmaster.random, "number");
        var latitude = bluffmaster.address.latitude(undefined, undefined, 7);
        assert.ok(typeof latitude === "string");
        assert.equal(latitude.split(".")[1].length, 7);
        var latitude_float = parseFloat(latitude);
        assert.ok(latitude_float >= -180);
        assert.ok(latitude_float <= 180);
        assert.ok(bluffmaster.random.number.called);
        bluffmaster.random.number.restore();
      }
    });
  });

  describe("longitude()", function () {
    it("returns random longitude", function () {
      for (var i = 0; i < 100; i++) {
        sinon.spy(bluffmaster.random, "number");
        var longitude = bluffmaster.address.longitude();
        assert.ok(typeof longitude === "string");
        var longitude_float = parseFloat(longitude);
        assert.ok(longitude_float >= -180.0);
        assert.ok(longitude_float <= 180.0);
        assert.ok(bluffmaster.random.number.called);
        bluffmaster.random.number.restore();
      }
    });

    it("returns random longitude with min and max and default precision", function () {
      for (var i = 0; i < 100; i++) {
        sinon.spy(bluffmaster.random, "number");
        var longitude = bluffmaster.address.longitude(100, -30);
        assert.ok(typeof longitude === "string");
        assert.equal(longitude.split(".")[1].length, 4);
        var longitude_float = parseFloat(longitude);
        assert.ok(longitude_float >= -30);
        assert.ok(longitude_float <= 100);
        assert.ok(bluffmaster.random.number.called);
        bluffmaster.random.number.restore();
      }
    });

    it("returns random longitude with custom precision", function () {
      for (var i = 0; i < 100; i++) {
        sinon.spy(bluffmaster.random, "number");
        var longitude = bluffmaster.address.longitude(undefined, undefined, 7);
        assert.ok(typeof longitude === "string");
        assert.equal(longitude.split(".")[1].length, 7);
        var longitude_float = parseFloat(longitude);
        assert.ok(longitude_float >= -180);
        assert.ok(longitude_float <= 180);
        assert.ok(bluffmaster.random.number.called);
        bluffmaster.random.number.restore();
      }
    });
  });

  describe("direction()", function () {
    it("returns random direction", function () {
      sinon.stub(bluffmaster.address, "direction").returns("North");
      var direction = bluffmaster.address.direction();

      assert.equal(direction, "North");
      bluffmaster.address.direction.restore();
    });

    it("returns abbreviation when useAbbr is false", function () {
      sinon.stub(bluffmaster.address, "direction").returns("N");
      var direction = bluffmaster.address.direction(false);
      assert.equal(direction, "N");
      bluffmaster.address.direction.restore();
    });

    it("returns abbreviation when useAbbr is true", function () {
      var direction = bluffmaster.address.direction(true);
      assert.equal(typeof direction, "string");
      assert.equal(direction.length <= 2, true);
    });

    it("returns abbreviation when useAbbr is true", function () {
      sinon.stub(bluffmaster.address, "direction").returns("N");
      var direction = bluffmaster.address.direction(true);
      assert.equal(direction, "N");
      bluffmaster.address.direction.restore();
    });
  });

  describe("ordinalDirection()", function () {
    it("returns random ordinal direction", function () {
      sinon.stub(bluffmaster.address, "ordinalDirection").returns("West");
      var ordinalDirection = bluffmaster.address.ordinalDirection();

      assert.equal(ordinalDirection, "West");
      bluffmaster.address.ordinalDirection.restore();
    });

    it("returns abbreviation when useAbbr is true", function () {
      sinon.stub(bluffmaster.address, "ordinalDirection").returns("W");
      var ordinalDirection = bluffmaster.address.ordinalDirection(true);

      assert.equal(ordinalDirection, "W");
      bluffmaster.address.ordinalDirection.restore();
    });

    it("returns abbreviation when useAbbr is true", function () {
      var ordinalDirection = bluffmaster.address.ordinalDirection(true);
      assert.equal(typeof ordinalDirection, "string");
      assert.equal(ordinalDirection.length <= 2, true);
    });
  });

  describe("cardinalDirection()", function () {
    it("returns random cardinal direction", function () {
      sinon.stub(bluffmaster.address, "cardinalDirection").returns("Northwest");
      var cardinalDirection = bluffmaster.address.cardinalDirection();

      assert.equal(cardinalDirection, "Northwest");
      bluffmaster.address.cardinalDirection.restore();
    });

    it("returns abbreviation when useAbbr is true", function () {
      sinon.stub(bluffmaster.address, "cardinalDirection").returns("NW");
      var cardinalDirection = bluffmaster.address.cardinalDirection(true);

      assert.equal(cardinalDirection, "NW");
      bluffmaster.address.cardinalDirection.restore();
    });

    it("returns abbreviation when useAbbr is true", function () {
      var cardinalDirection = bluffmaster.address.cardinalDirection(true);
      assert.equal(typeof cardinalDirection, "string");
      assert.equal(cardinalDirection.length <= 2, true);
    });
  });

  describe("nearbyGPSCoordinate()", function () {
    it("returns random gps coordinate within a distance of another one", function () {
      function haversine(lat1, lon1, lat2, lon2, isMetric) {
        function degreesToRadians(degrees) {
          return degrees * (Math.PI / 180.0);
        }
        function kilometersToMiles(miles) {
          return miles * 0.621371;
        }
        var R = 6378.137;
        var dLat = degreesToRadians(lat2 - lat1);
        var dLon = degreesToRadians(lon2 - lon1);
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(degreesToRadians(lat1)) *
            Math.cos(degreesToRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        var distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return isMetric ? distance : kilometersToMiles(distance);
      }
      for (var i = 0; i < 10000; i++) {
        var latFloat1 = parseFloat(bluffmaster.address.latitude());
        var lonFloat1 = parseFloat(bluffmaster.address.longitude());
        var radius = Math.random() * 99 + 1; // range of [1, 100)
        var isMetric = Math.round(Math.random()) == 1;

        var coordinate = bluffmaster.address.nearbyGPSCoordinate(
          [latFloat1, lonFloat1],
          radius,
          isMetric
        );
        assert.ok(coordinate.length === 2);
        assert.ok(typeof coordinate[0] === "string");
        assert.ok(typeof coordinate[1] === "string");

        var latFloat2 = parseFloat(coordinate[0]);
        assert.ok(latFloat2 >= -90.0);
        assert.ok(latFloat2 <= 90.0);

        var lonFloat2 = parseFloat(coordinate[1]);
        assert.ok(lonFloat2 >= -180.0);
        assert.ok(lonFloat2 <= 180.0);

        // Due to floating point math, and constants that are not extremely precise,
        // returned points will not be strictly within the given radius of the input
        // coordinate. Using a error of 1.0 to compensate.
        var error = 1.0;
        var actualDistance = haversine(
          latFloat1,
          lonFloat1,
          latFloat2,
          lonFloat2,
          isMetric
        );
        assert.ok(actualDistance <= radius + error);
      }

      // test once with undefined radius
      var coordinate = bluffmaster.address.nearbyGPSCoordinate(
        [latFloat1, lonFloat1],
        undefined,
        isMetric
      );
      assert.ok(coordinate.length === 2);
      assert.ok(typeof coordinate[0] === "string");
      assert.ok(typeof coordinate[1] === "string");
    });
  });

  describe("timeZone()", function () {
    it("returns random timeZone", function () {
      sinon.spy(bluffmaster.address, "timeZone");
      var timeZone = bluffmaster.address.timeZone();
      assert.ok(timeZone);
      assert.ok(bluffmaster.address.timeZone.called);
      bluffmaster.address.timeZone.restore();
    });
  });
});
