/**
 *
 * @namespace bluffmaster.address
 */
function Address(bluffmaster) {
  var f = bluffmaster.fake,
    Helpers = bluffmaster.helpers;

  /**
   * Generates random zipcode from format. If format is not specified, the
   * locale's zip format is used.
   *
   * @method bluffmaster.address.zipCode
   * @param {String} format
   */
  this.zipCode = function (format) {
    // if zip format is not specified, use the zip format defined for the locale
    if (typeof format === "undefined") {
      var localeFormat = bluffmaster.definitions.address.postcode;
      if (typeof localeFormat === "string") {
        format = localeFormat;
      } else {
        format = bluffmaster.random.arrayElement(localeFormat);
      }
    }
    return Helpers.replaceSymbols(format);
  };

  /**
   * Generates random zipcode from state abbreviation. If state abbreviation is
   * not specified, a random zip code is generated according to the locale's zip format.
   * Only works for locales with postcode_by_state definition. If a locale does not
   * have a postcode_by_state definition, a random zip code is generated according
   * to the locale's zip format.
   *
   * @method bluffmaster.address.zipCodeByState
   * @param {String} state
   */
  this.zipCodeByState = function (state) {
    var zipRange = bluffmaster.definitions.address.postcode_by_state[state];
    if (zipRange) {
      return bluffmaster.datatype.number(zipRange);
    }
    return bluffmaster.address.zipCode();
  };

  /**
   * Generates a random localized city name. The format string can contain any
   * method provided by bluffmaster wrapped in `{{}}`, e.g. `{{name.firstName}}` in
   * order to build the city name.
   *
   * If no format string is provided one of the following is randomly used:
   *
   * * `{{address.cityPrefix}} {{name.firstName}}{{address.citySuffix}}`
   * * `{{address.cityPrefix}} {{name.firstName}}`
   * * `{{name.firstName}}{{address.citySuffix}}`
   * * `{{name.lastName}}{{address.citySuffix}}`
   * * `{{address.cityName}}` when city name is available
   *
   * @method bluffmaster.address.city
   * @param {String} format
   */
  this.city = function (format) {
    var formats = [
      "{{address.cityPrefix}} {{name.firstName}}{{address.citySuffix}}",
      "{{address.cityPrefix}} {{name.firstName}}",
      "{{name.firstName}}{{address.citySuffix}}",
      "{{name.lastName}}{{address.citySuffix}}",
    ];

    if (!format && bluffmaster.definitions.address.city_name) {
      formats.push("{{address.cityName}}");
    }

    if (typeof format !== "number") {
      format = bluffmaster.datatype.number(formats.length - 1);
    }

    return f(formats[format]);
  };

  /**
   * Return a random localized city prefix
   * @method bluffmaster.address.cityPrefix
   */
  this.cityPrefix = function () {
    return bluffmaster.random.arrayElement(
      bluffmaster.definitions.address.city_prefix
    );
  };

  /**
   * Return a random localized city suffix
   *
   * @method bluffmaster.address.citySuffix
   */
  this.citySuffix = function () {
    return bluffmaster.random.arrayElement(
      bluffmaster.definitions.address.city_suffix
    );
  };

  /**
   * Returns a random city name
   *
   * @method bluffmaster.address.cityName
   */
  this.cityName = function () {
    return bluffmaster.random.arrayElement(
      bluffmaster.definitions.address.city_name
    );
  };

  /**
   * Returns a random localized street name
   *
   * @method bluffmaster.address.streetName
   */
  this.streetName = function () {
    var result;
    var suffix = bluffmaster.address.streetSuffix();
    if (suffix !== "") {
      suffix = " " + suffix;
    }

    switch (bluffmaster.datatype.number(1)) {
      case 0:
        result = bluffmaster.name.lastName() + suffix;
        break;
      case 1:
        result = bluffmaster.name.firstName() + suffix;
        break;
    }
    return result;
  };

  //
  // TODO: change all these methods that accept a boolean to instead accept an options hash.
  //
  /**
   * Returns a random localized street address
   *
   * @method bluffmaster.address.streetAddress
   * @param {Boolean} useFullAddress
   */
  this.streetAddress = function (useFullAddress) {
    if (useFullAddress === undefined) {
      useFullAddress = false;
    }
    var address = "";
    switch (bluffmaster.datatype.number(2)) {
      case 0:
        address =
          Helpers.replaceSymbolWithNumber("#####") +
          " " +
          bluffmaster.address.streetName();
        break;
      case 1:
        address =
          Helpers.replaceSymbolWithNumber("####") +
          " " +
          bluffmaster.address.streetName();
        break;
      case 2:
        address =
          Helpers.replaceSymbolWithNumber("###") +
          " " +
          bluffmaster.address.streetName();
        break;
    }
    return useFullAddress
      ? address + " " + bluffmaster.address.secondaryAddress()
      : address;
  };

  /**
   * streetSuffix
   *
   * @method bluffmaster.address.streetSuffix
   */
  this.streetSuffix = function () {
    return bluffmaster.random.arrayElement(
      bluffmaster.definitions.address.street_suffix
    );
  };

  /**
   * streetPrefix
   *
   * @method bluffmaster.address.streetPrefix
   */
  this.streetPrefix = function () {
    return bluffmaster.random.arrayElement(
      bluffmaster.definitions.address.street_prefix
    );
  };

  /**
   * secondaryAddress
   *
   * @method bluffmaster.address.secondaryAddress
   */
  this.secondaryAddress = function () {
    return Helpers.replaceSymbolWithNumber(
      bluffmaster.random.arrayElement(["Apt. ###", "Suite ###"])
    );
  };

  /**
   * county
   *
   * @method bluffmaster.address.county
   */
  this.county = function () {
    return bluffmaster.random.arrayElement(
      bluffmaster.definitions.address.county
    );
  };

  /**
   * country
   *
   * @method bluffmaster.address.country
   */
  this.country = function () {
    return bluffmaster.random.arrayElement(
      bluffmaster.definitions.address.country
    );
  };

  /**
   * countryCode
   *
   * @method bluffmaster.address.countryCode
   * @param {string} alphaCode default alpha-2
   */
  this.countryCode = function (alphaCode) {
    if (typeof alphaCode === "undefined" || alphaCode === "alpha-2") {
      return bluffmaster.random.arrayElement(
        bluffmaster.definitions.address.country_code
      );
    }

    if (alphaCode === "alpha-3") {
      return bluffmaster.random.arrayElement(
        bluffmaster.definitions.address.country_code_alpha_3
      );
    }

    return bluffmaster.random.arrayElement(
      bluffmaster.definitions.address.country_code
    );
  };

  /**
   * state
   *
   * @method bluffmaster.address.state
   * @param {Boolean} useAbbr
   */
  this.state = function (useAbbr) {
    return bluffmaster.random.arrayElement(
      bluffmaster.definitions.address.state
    );
  };

  /**
   * stateAbbr
   *
   * @method bluffmaster.address.stateAbbr
   */
  this.stateAbbr = function () {
    return bluffmaster.random.arrayElement(
      bluffmaster.definitions.address.state_abbr
    );
  };

  /**
   * latitude
   *
   * @method bluffmaster.address.latitude
   * @param {Double} max default is 90
   * @param {Double} min default is -90
   * @param {number} precision default is 4
   */
  this.latitude = function (max, min, precision) {
    max = max || 90;
    min = min || -90;
    precision = precision || 4;

    return bluffmaster.datatype
      .number({
        max: max,
        min: min,
        precision: parseFloat((0.0).toPrecision(precision) + "1"),
      })
      .toFixed(precision);
  };

  /**
   * longitude
   *
   * @method bluffmaster.address.longitude
   * @param {Double} max default is 180
   * @param {Double} min default is -180
   * @param {number} precision default is 4
   */
  this.longitude = function (max, min, precision) {
    max = max || 180;
    min = min || -180;
    precision = precision || 4;

    return bluffmaster.datatype
      .number({
        max: max,
        min: min,
        precision: parseFloat((0.0).toPrecision(precision) + "1"),
      })
      .toFixed(precision);
  };

  /**
   *  direction
   *
   * @method bluffmaster.address.direction
   * @param {Boolean} useAbbr return direction abbreviation. defaults to false
   */
  this.direction = function (useAbbr) {
    if (typeof useAbbr === "undefined" || useAbbr === false) {
      return bluffmaster.random.arrayElement(
        bluffmaster.definitions.address.direction
      );
    }
    return bluffmaster.random.arrayElement(
      bluffmaster.definitions.address.direction_abbr
    );
  };

  this.direction.schema = {
    description:
      "Generates a direction. Use optional useAbbr bool to return abbreviation",
    sampleResults: ["Northwest", "South", "SW", "E"],
  };

  /**
   * cardinal direction
   *
   * @method bluffmaster.address.cardinalDirection
   * @param {Boolean} useAbbr return direction abbreviation. defaults to false
   */
  this.cardinalDirection = function (useAbbr) {
    if (typeof useAbbr === "undefined" || useAbbr === false) {
      return bluffmaster.random.arrayElement(
        bluffmaster.definitions.address.direction.slice(0, 4)
      );
    }
    return bluffmaster.random.arrayElement(
      bluffmaster.definitions.address.direction_abbr.slice(0, 4)
    );
  };

  this.cardinalDirection.schema = {
    description:
      "Generates a cardinal direction. Use optional useAbbr boolean to return abbreviation",
    sampleResults: ["North", "South", "E", "W"],
  };

  /**
   * ordinal direction
   *
   * @method bluffmaster.address.ordinalDirection
   * @param {Boolean} useAbbr return direction abbreviation. defaults to false
   */
  this.ordinalDirection = function (useAbbr) {
    if (typeof useAbbr === "undefined" || useAbbr === false) {
      return bluffmaster.random.arrayElement(
        bluffmaster.definitions.address.direction.slice(4, 8)
      );
    }
    return bluffmaster.random.arrayElement(
      bluffmaster.definitions.address.direction_abbr.slice(4, 8)
    );
  };

  this.ordinalDirection.schema = {
    description:
      "Generates an ordinal direction. Use optional useAbbr boolean to return abbreviation",
    sampleResults: ["Northwest", "Southeast", "SW", "NE"],
  };

  this.nearbyGPSCoordinate = function (coordinate, radius, isMetric) {
    function randomFloat(min, max) {
      return Math.random() * (max - min) + min;
    }
    function degreesToRadians(degrees) {
      return degrees * (Math.PI / 180.0);
    }
    function radiansToDegrees(radians) {
      return radians * (180.0 / Math.PI);
    }
    function kilometersToMiles(miles) {
      return miles * 0.621371;
    }
    function coordinateWithOffset(coordinate, bearing, distance, isMetric) {
      var R = 6378.137; // Radius of the Earth (http://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html)
      var d = isMetric ? distance : kilometersToMiles(distance); // Distance in km

      var lat1 = degreesToRadians(coordinate[0]); //Current lat point converted to radians
      var lon1 = degreesToRadians(coordinate[1]); //Current long point converted to radians

      var lat2 = Math.asin(
        Math.sin(lat1) * Math.cos(d / R) +
          Math.cos(lat1) * Math.sin(d / R) * Math.cos(bearing)
      );

      var lon2 =
        lon1 +
        Math.atan2(
          Math.sin(bearing) * Math.sin(d / R) * Math.cos(lat1),
          Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat2)
        );

      // Keep longitude in range [-180, 180]
      if (lon2 > degreesToRadians(180)) {
        lon2 = lon2 - degreesToRadians(360);
      } else if (lon2 < degreesToRadians(-180)) {
        lon2 = lon2 + degreesToRadians(360);
      }

      return [radiansToDegrees(lat2), radiansToDegrees(lon2)];
    }

    // If there is no coordinate, the best we can do is return a random GPS coordinate.
    if (coordinate === undefined) {
      return [bluffmaster.address.latitude(), bluffmaster.address.longitude()];
    }
    radius = radius || 10.0;
    isMetric = isMetric || false;

    // TODO: implement either a gaussian/uniform distribution of points in cicular region.
    // Possibly include param to function that allows user to choose between distributions.

    // This approach will likely result in a higher density of points near the center.
    var randomCoord = coordinateWithOffset(
      coordinate,
      degreesToRadians(Math.random() * 360.0),
      radius,
      isMetric
    );
    return [randomCoord[0].toFixed(4), randomCoord[1].toFixed(4)];
  };

  /**
   * Return a random time zone
   * @method bluffmaster.address.timeZone
   */
  this.timeZone = function () {
    return bluffmaster.random.arrayElement(
      bluffmaster.definitions.address.time_zone
    );
  };

  return this;
}

module.exports = Address;
