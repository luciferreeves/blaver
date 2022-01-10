if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var blaver = require('../index');
}

describe("address.js", function () {
  describe("city()", function () {
    beforeEach(function () {
      sinon.spy(blaver.address, 'cityPrefix');
      sinon.spy(blaver.name, 'firstName');
      sinon.spy(blaver.name, 'lastName');
      sinon.spy(blaver.address, 'citySuffix');
    });

    afterEach(function () {
      blaver.datatype.number.restore();
      blaver.address.cityPrefix.restore();
      blaver.name.firstName.restore();
      blaver.name.lastName.restore();
      blaver.address.citySuffix.restore();
    });

    it("occasionally returns prefix + first name + suffix", function () {
      sinon.stub(blaver.datatype, 'number').returns(0);

      const city = blaver.address.city();
      assert.ok(city);

      assert.ok(blaver.address.cityPrefix.calledOnce);
      assert.ok(blaver.name.firstName.calledOnce);
      assert.ok(blaver.address.citySuffix.calledOnce);
    });

    it("occasionally returns prefix + first name", function () {
      sinon.stub(blaver.datatype, 'number').returns(1);

      const city = blaver.address.city();
      assert.ok(city);

      assert.ok(blaver.address.cityPrefix.calledOnce);
      assert.ok(blaver.name.firstName.calledOnce);
    });

    it("occasionally returns first name + suffix", function () {
      sinon.stub(blaver.datatype, 'number').returns(2);

      const city = blaver.address.city();
      assert.ok(city);

      assert.ok(blaver.address.citySuffix.calledOnce);
    });

    it("occasionally returns last name + suffix", function () {
      sinon.stub(blaver.datatype, 'number').returns(3);

      const city = blaver.address.city();
      assert.ok(city);

      assert.ok(!blaver.address.cityPrefix.called);
      assert.ok(!blaver.name.firstName.called);
      assert.ok(blaver.name.lastName.calledOnce);
      assert.ok(blaver.address.citySuffix.calledOnce);
    });
  });

  describe("streetName()", function () {
    beforeEach(function () {
      sinon.spy(blaver.name, 'firstName');
      sinon.spy(blaver.name, 'lastName');
      sinon.spy(blaver.address, 'streetSuffix');
    });

    afterEach(function () {
      blaver.name.firstName.restore();
      blaver.name.lastName.restore();
      blaver.address.streetSuffix.restore();
    });

    it("occasionally returns last name + suffix", function () {
      sinon.stub(blaver.datatype, 'number').returns(0);

      const street_name = blaver.address.streetName();
      assert.ok(street_name);
      assert.ok(!blaver.name.firstName.called);
      assert.ok(blaver.name.lastName.calledOnce);
      assert.ok(blaver.address.streetSuffix.calledOnce);

      blaver.datatype.number.restore();
    });

    it("occasionally returns first name + suffix", function () {
      sinon.stub(blaver.datatype, 'number').returns(1);

      const street_name = blaver.address.streetName();
      assert.ok(street_name);

      assert.ok(blaver.name.firstName.calledOnce);
      assert.ok(!blaver.name.lastName.called);
      assert.ok(blaver.address.streetSuffix.calledOnce);

      blaver.datatype.number.restore();
    });

    it("trims trailing whitespace from the name", function() {
      blaver.address.streetSuffix.restore();

      sinon.stub(blaver.address, 'streetSuffix').returns("");
      const street_name = blaver.address.streetName();
      assert.ok(!street_name.match(/ $/));
    });
  });

  describe("streetAddress()", function () {

    const errorExpectDigits = function(expected){
      return "The street number should be had " + expected + " digits";
    };

    beforeEach(function () {
      sinon.spy(blaver.address, 'streetName');
      sinon.spy(blaver.address, 'secondaryAddress');
    });

    afterEach(function () {
      blaver.address.streetName.restore();
      blaver.address.secondaryAddress.restore();
    });

    it("occasionally returns a 5-digit street number", function () {
      sinon.stub(blaver.datatype, 'number').returns(0);
      const address = blaver.address.streetAddress();
      const expected = 5;
      const parts = address.split(' ');

      assert.strictEqual(parts[0].length, expected, errorExpectDigits(expected));
      assert.ok(blaver.address.streetName.called);

      blaver.datatype.number.restore();
    });

    it("occasionally returns a 4-digit street number", function () {
      sinon.stub(blaver.datatype, 'number').returns(1);
      const address = blaver.address.streetAddress();
      const parts = address.split(' ');
      const expected = 4;

      assert.strictEqual(parts[0].length, expected, errorExpectDigits(expected));
      assert.ok(blaver.address.streetName.called);

      blaver.datatype.number.restore();
    });

    it("occasionally returns a 3-digit street number", function () {
      sinon.stub(blaver.datatype, 'number').returns(2);
      const address = blaver.address.streetAddress();
      const parts = address.split(' ');
      const expected = 3;

      assert.strictEqual(parts[0].length, expected, errorExpectDigits(expected));
      assert.ok(blaver.address.streetName.called);
      assert.ok(!blaver.address.secondaryAddress.called);

      blaver.datatype.number.restore();
    });

    context("when useFulladdress is true", function () {
      it("adds a secondary address to the result", function () {
        blaver.address.streetAddress(true);
        
        assert.ok(blaver.address.secondaryAddress.called);
      });
    });
  });

  describe("secondaryAddress()", function () {
    it("randomly chooses an Apt or Suite number", function () {
      sinon.spy(blaver.random, 'arrayElement');

      const address = blaver.address.secondaryAddress();

      const expected_array = [
        'Apt. ###',
        'Suite ###'
      ];

      assert.ok(address);
      assert.ok(blaver.random.arrayElement.calledWith(expected_array));
      blaver.random.arrayElement.restore();
    });
  });

  describe("county()", function () {
    it("returns random county", function () {
      sinon.spy(blaver.address, 'county');
      const county = blaver.address.county();
      assert.ok(county);
      assert.ok(blaver.address.county.called);
      blaver.address.county.restore();
    });
  });

  describe("country()", function () {
    it("returns random country", function () {
      sinon.spy(blaver.address, 'country');
      const country = blaver.address.country();
      assert.ok(country);
      assert.ok(blaver.address.country.called);
      blaver.address.country.restore();
    });
  });

  describe("countryCode()", function () {

    it("returns random countryCode", function () {
      sinon.spy(blaver.address, 'countryCode');
      const countryCode = blaver.address.countryCode();
      assert.ok(countryCode);
      assert.ok(blaver.address.countryCode.called);
      blaver.address.countryCode.restore();
    });

    it("returns random countryCode with argument passed", function () {
      sinon.spy(blaver.address, 'countryCode');
      const countryCode = blaver.address.countryCode("alpha-1");
      assert.ok(countryCode);
      assert.ok(blaver.address.countryCode.called);
      assert.strictEqual(countryCode.length, 2, "The countryCode should be had 3 characters");
      blaver.address.countryCode.restore();
    });

    it("returns random alpha-3 countryCode", function () {
      sinon.spy(blaver.address, 'countryCode');
      const countryCode = blaver.address.countryCode("alpha-3");
      assert.ok(countryCode);
      assert.ok(blaver.address.countryCode.called);
      assert.strictEqual(countryCode.length, 3, "The countryCode should be had 3 characters");
      blaver.address.countryCode.restore();
    });
        
  });

  describe("state()", function () {
    it("returns random state", function () {
      sinon.spy(blaver.address, 'state');
      const state = blaver.address.state();
      assert.ok(state);
      assert.ok(blaver.address.state.called);
      blaver.address.state.restore();
    });
  });

  describe("zipCode()", function () {
    it("returns random zipCode", function () {
      sinon.spy(blaver.address, 'zipCode');
      const zipCode = blaver.address.zipCode();
      assert.ok(zipCode);
      assert.ok(blaver.address.zipCode.called);
      blaver.address.zipCode.restore();
    });

    it("returns random zipCode - user specified format", function () {
      let zipCode = blaver.address.zipCode("?#? #?#");
      assert.ok(zipCode.match(/^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/));
      // try another format
      zipCode = blaver.address.zipCode("###-###");
      assert.ok(zipCode.match(/^\d{3}-\d{3}$/));
    });

    it("returns zipCode with proper locale format", function () {
      // we'll use the en_CA locale..
      blaver.locale = "en_CA";
      const zipCode = blaver.address.zipCode();
      assert.ok(zipCode.match(/^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/));
    });
  });

  describe("zipCodeByState()", function () {
    it("returns zipCode valid for specified State", function () {
      blaver.locale = "en_US";
      const states = ["IL", "GA", "WA"];

      const zipCode1 = blaver.address.zipCodeByState(states[0]);
      assert.ok(zipCode1 >= 60001);
      assert.ok(zipCode1 <= 62999);
      const zipCode2 = blaver.address.zipCodeByState(states[1]);
      assert.ok(zipCode2 >= 30001);
      assert.ok(zipCode2 <= 31999);
      const zipCode3 = blaver.address.zipCodeByState(states[2]);
      assert.ok(zipCode3 >= 98001);
      assert.ok(zipCode3 <= 99403);
    });

    it("returns undefined if state is invalid", function () {
      const state = "XX";
      sinon.spy(blaver.address, 'zipCode');
      blaver.address.zipCodeByState(state);
      assert.ok(blaver.address.zipCode.called);
      blaver.address.zipCode.restore();
    });

    it("returns undefined if state is valid but localeis invalid", function () {
      blaver.locale = "zh_CN";
      const state = "IL";
      sinon.spy(blaver.address, 'zipCode');
      blaver.address.zipCodeByState(state);
      assert.ok(blaver.address.zipCode.called);
      blaver.address.zipCode.restore();
    });
  });

  describe("latitude()", function () {
    it("returns random latitude", function () {
      for (let i = 0; i < 100; i++) {
        sinon.spy(blaver.datatype, 'number');
        const latitude = blaver.address.latitude();
        assert.ok(typeof latitude === 'string');
        const latitude_float = parseFloat(latitude);
        assert.ok(latitude_float >= -90.0);
        assert.ok(latitude_float <= 90.0);
        assert.ok(blaver.datatype.number.called);
        blaver.datatype.number.restore();
      }
    });

    it("returns latitude with min and max and default precision", function () {
      for (let i = 0; i < 100; i++) {
        sinon.spy(blaver.datatype, 'number');
        const latitude = blaver.address.latitude(-5, 5);
        assert.ok(typeof latitude === 'string');
        assert.strictEqual(latitude.split('.')[1].length, 4, "The precision of latitude should be had of 4 digits");
        const latitude_float = parseFloat(latitude);
        assert.ok(latitude_float >= -5);
        assert.ok(latitude_float <= 5);
        assert.ok(blaver.datatype.number.called);
        blaver.datatype.number.restore();
      }
    });

    it("returns random latitude with custom precision", function () {
      for (let i = 0; i < 100; i++) {
        sinon.spy(blaver.datatype, 'number');
        const latitude = blaver.address.latitude(undefined, undefined, 7);
        assert.ok(typeof latitude === 'string');
        assert.strictEqual(latitude.split('.')[1].length, 7, "The precision of latitude should be had of 7 digits");
        const latitude_float = parseFloat(latitude);
        assert.ok(latitude_float >= -180);
        assert.ok(latitude_float <= 180);
        assert.ok(blaver.datatype.number.called);
        blaver.datatype.number.restore();
      }
    });
  });

  describe("longitude()", function () {
    it("returns random longitude", function () {
      for (let i = 0; i < 100; i++) {
        sinon.spy(blaver.datatype, 'number');
        const longitude = blaver.address.longitude();
        assert.ok(typeof longitude === 'string');
        const longitude_float = parseFloat(longitude);
        assert.ok(longitude_float >= -180.0);
        assert.ok(longitude_float <= 180.0);
        assert.ok(blaver.datatype.number.called);
        blaver.datatype.number.restore();
      }
    });

    it("returns random longitude with min and max and default precision", function () {
      for (let i = 0; i < 100; i++) {
        sinon.spy(blaver.datatype, 'number');
        const longitude = blaver.address.longitude(100, -30);
        assert.ok(typeof longitude === 'string');
        assert.strictEqual(longitude.split('.')[1].length, 4, "The precision of longitude should be had of 4 digits");
        const longitude_float = parseFloat(longitude);
        assert.ok(longitude_float >= -30);
        assert.ok(longitude_float <= 100);
        assert.ok(blaver.datatype.number.called);
        blaver.datatype.number.restore();
      }
    });

    it("returns random longitude with custom precision", function () {
      for (let i = 0; i < 100; i++) {
        sinon.spy(blaver.datatype, 'number');
        const longitude = blaver.address.longitude(undefined, undefined, 7);
        assert.ok(typeof longitude === 'string');
        assert.strictEqual(longitude.split('.')[1].length, 7, "The precision of longitude should be had of 7 digits");
        const longitude_float = parseFloat(longitude);
        assert.ok(longitude_float >= -180);
        assert.ok(longitude_float <= 180);
        assert.ok(blaver.datatype.number.called);
        blaver.datatype.number.restore();
      }
    });
  });

  describe("direction()", function () {
    it("returns random direction", function () {
      sinon.stub(blaver.address, 'direction').returns('North');
      const direction = blaver.address.direction();
      const expected = 'North';

      assert.strictEqual(direction, expected, "The random direction should be equals " + expected);
      blaver.address.direction.restore();
    });

    it("returns abbreviation when useAbbr is false", function () {
      sinon.stub(blaver.address, 'direction').returns('N');
      const direction = blaver.address.direction(false);
      const expected = 'N';
      assert.strictEqual(direction, expected, "The abbreviation of direction when useAbbr is false should be equals " + expected+ ". Current is " + direction);
      blaver.address.direction.restore();
    });

    it("returns abbreviation when useAbbr is true", function () {
      const direction = blaver.address.direction(true);
      const expectedType = 'string';
      const lengthDirection = direction.length;
      const prefixErrorMessage = "The abbreviation of direction when useAbbr is true should";
      assert.strictEqual(typeof direction, expectedType, prefixErrorMessage + " be typeof string. Current is" + typeof direction);
      assert.strictEqual(lengthDirection <= 2, true, prefixErrorMessage + " have a length less or equals 2. Current is " + lengthDirection);
    });

    it("returns abbreviation when useAbbr is true", function () {
      sinon.stub(blaver.address, 'direction').returns('N');
      const direction = blaver.address.direction(true);
      const expected = 'N';
      assert.strictEqual(direction, expected, "The abbreviation of direction when useAbbr is true should be equals " + expected + ". Current is " + direction);
      blaver.address.direction.restore();
    });

  });

  describe("ordinalDirection()", function () {
    it("returns random ordinal direction", function () {
      sinon.stub(blaver.address, 'ordinalDirection').returns('West');
      const ordinalDirection = blaver.address.ordinalDirection();
      const expected = 'West';

      assert.strictEqual(ordinalDirection, expected, "The ransom ordinal direction should be equals " + expected + ". Current is " + ordinalDirection);
      blaver.address.ordinalDirection.restore();
    });

    it("returns abbreviation when useAbbr is true", function () {
      sinon.stub(blaver.address, 'ordinalDirection').returns('W');
      const ordinalDirection = blaver.address.ordinalDirection(true);
      const expected = 'W';

      assert.strictEqual(ordinalDirection, expected, "The ordinal direction when useAbbr is true should be equals " + expected + ". Current is " + ordinalDirection);
      blaver.address.ordinalDirection.restore();
    });

    it("returns abbreviation when useAbbr is true", function () {
      const ordinalDirection = blaver.address.ordinalDirection(true);
      const expectedType = 'string';
      const ordinalDirectionLength = ordinalDirection.length;
      const prefixErrorMessage = "The ordinal direction when useAbbr is true should";

      assert.strictEqual(typeof ordinalDirection, expectedType, prefixErrorMessage + " be had typeof equals " + expectedType + ".Current is " + typeof ordinalDirection);
      assert.strictEqual(ordinalDirectionLength <= 2, true, prefixErrorMessage + " have a length less or equals 2. Current is " + ordinalDirectionLength);
    });


  });

  describe("cardinalDirection()", function () {
    it("returns random cardinal direction", function () {
      sinon.stub(blaver.address, 'cardinalDirection').returns('Northwest');
      const cardinalDirection = blaver.address.cardinalDirection();
      const expected = 'Northwest';

      assert.strictEqual(cardinalDirection, expected, "The random cardinal direction should be equals " + expected + ". Current is " + cardinalDirection);
      blaver.address.cardinalDirection.restore();
    });

    it("returns abbreviation when useAbbr is true", function () {
      sinon.stub(blaver.address, 'cardinalDirection').returns('NW');
      const cardinalDirection = blaver.address.cardinalDirection(true);
      const expected = 'NW';

      assert.strictEqual(cardinalDirection, expected, "The cardinal direction when useAbbr is true should be equals " + expected + ". Current is " + cardinalDirection);
      blaver.address.cardinalDirection.restore();
    });

    it("returns abbreviation when useAbbr is true", function () {
      const cardinalDirection = blaver.address.cardinalDirection(true);
      const expectedType = 'string';
      const cardinalDirectionLength = cardinalDirection.length;
      const prefixErrorMessage = "The cardinal direction when useAbbr is true should";

      assert.strictEqual(typeof cardinalDirection, expectedType, prefixErrorMessage + " be had typeof equals " + expectedType + ".Current is " + typeof ordinalDirection);
      assert.strictEqual(cardinalDirectionLength <= 2, true, prefixErrorMessage + " have a length less or equals 2. Current is " + cardinalDirectionLength);
    });

  });

  describe("nearbyGPSCoordinate()", function () {
    it("returns random gps coordinate within a distance of another one", function () {
      function haversine(lat1, lon1, lat2, lon2, isMetric) {
        function degreesToRadians(degrees) {
          return degrees * (Math.PI/180.0);
        }
        function kilometersToMiles(miles) {
          return miles * 0.621371;
        }
        const R = 6378.137;
        const dLat = degreesToRadians(lat2-lat1);
        const dLon = degreesToRadians(lon2-lon1);
        const a = Math.sin(dLat/2) * Math.sin(dLat/2)
                    + Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2))
                    * Math.sin(dLon/2) * Math.sin(dLon/2);
        const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return isMetric ? distance : kilometersToMiles(distance);
      }
      for (let i = 0; i < 10000; i++) {
        var latFloat1 = parseFloat(blaver.address.latitude());
        var lonFloat1 = parseFloat(blaver.address.longitude());
        var isMetric = (Math.round(Math.random()) == 1);
        const radius = (Math.random() * 99) + 1; // range of [1, 100)

        const coordinate = blaver.address.nearbyGPSCoordinate([latFloat1, lonFloat1], radius, isMetric);
        assert.ok(coordinate.length === 2);
        assert.ok(typeof coordinate[0] === 'string');
        assert.ok(typeof coordinate[1] === 'string');

        const latFloat2 = parseFloat(coordinate[0]);
        assert.ok(latFloat2 >= -90.0);
        assert.ok(latFloat2 <= 90.0);

        const lonFloat2 = parseFloat(coordinate[1]);
        assert.ok(lonFloat2 >= -180.0);
        assert.ok(lonFloat2 <= 180.0);

        // Due to floating point math, and constants that are not extremely precise,
        // returned points will not be strictly within the given radius of the input
        // coordinate. Using a error of 1.0 to compensate.
        const error = 1.0;
        const actualDistance = haversine(latFloat1, lonFloat1, latFloat2, lonFloat2, isMetric);
        assert.ok(actualDistance <= (radius + error));
      }

      // test once with undefined radius
      const coordinate = blaver.address.nearbyGPSCoordinate([latFloat1, lonFloat1], undefined, isMetric);
      assert.ok(coordinate.length === 2);
      assert.ok(typeof coordinate[0] === 'string');
      assert.ok(typeof coordinate[1] === 'string');

    });
  });

  describe("timeZone()", function () {
    it("returns random timeZone", function () {
      sinon.spy(blaver.address, 'timeZone');
      const timeZone = blaver.address.timeZone();
      assert.ok(timeZone);
      assert.ok(blaver.address.timeZone.called);
      blaver.address.timeZone.restore();
    });
  });

});
