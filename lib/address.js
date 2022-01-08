/**
 *
 * @namespace blaver.address
 */
function Address(blaver) {
  const f = blaver.fake,
    Helpers = blaver.helpers;

  /**
   * Generates random zipcode from format. If format is not specified, the
   * locale's zip format is used.
   *
   * @method blaver.address.zipCode
   * @param {String} format
   */
  this.zipCode = function (format) {
    // if zip format is not specified, use the zip format defined for the locale
    if (typeof format === "undefined") {
      const localeFormat = blaver.definitions.address.postcode;
      if (typeof localeFormat === "string") {
        return Helpers.replaceSymbols(localeFormat);

      } else {
        return Helpers.replaceSymbols(blaver.random.arrayElement(localeFormat));
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
   * @method blaver.address.zipCodeByState
   * @param {String} state
   */
  this.zipCodeByState = function (state) {
    const zipRange = blaver.definitions.address.postcode_by_state[state];
    if (zipRange) {
      return blaver.datatype.number(zipRange);
    }

    return blaver.address.zipCode();
  };

  /**
   * Generates a random localized city name. The format string can contain any
   * method provided by blaver wrapped in `{{}}`, e.g. `{{name.firstName}}` in
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
   * @method blaver.address.city
   * @param {String} format
   */
  this.city = function (format) {
    let localFormat = format;
    const formats = [
      "{{address.cityPrefix}} {{name.firstName}}{{address.citySuffix}}",
      "{{address.cityPrefix}} {{name.firstName}}",
      "{{name.firstName}}{{address.citySuffix}}",
      "{{name.lastName}}{{address.citySuffix}}"
    ];

    if (!format && blaver.definitions.address.city_name) {
      formats.push("{{address.cityName}}");
    }

    if (typeof format !== "number") {
      localFormat = blaver.datatype.number(formats.length - 1);
    }

    return f(formats[localFormat]);
  };

  /**
   * Return a random localized city prefix
   * @method blaver.address.cityPrefix
   */
  this.cityPrefix = function () {
    return blaver.random.arrayElement(
      blaver.definitions.address.city_prefix
    );
  };

  /**
   * Return a random localized city suffix
   *
   * @method blaver.address.citySuffix
   */
  this.citySuffix = function () {
    return blaver.random.arrayElement(
      blaver.definitions.address.city_suffix
    );
  };

  /**
   * Returns a random city name
   *
   * @method blaver.address.cityName
   */
  this.cityName = function () {
    return blaver.random.arrayElement(
      blaver.definitions.address.city_name
    );
  };

  /**
   * Returns a random localized street name
   *
   * @method blaver.address.streetName
   */
  this.streetName = function () {
    let result;
    let suffix = blaver.address.streetSuffix();
    if (suffix !== "") {
      suffix = " " + suffix;
    }

    switch (blaver.datatype.number(1)) {
      case 0:
        result = blaver.name.lastName() + suffix;
        break;
      case 1:
        result = blaver.name.firstName() + suffix;
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
   * @method blaver.address.streetAddress
   * @param {Boolean} useFullAddress
   */
  this.streetAddress = function (useFullAddress) {
    let localUseFullAddress = useFullAddress;

    if (useFullAddress === undefined) {
      localUseFullAddress = false;
    }
    let address = "";
    switch (blaver.datatype.number(2)) {
      case 0:
        address = `${Helpers.replaceSymbolWithNumber("#####")} ${blaver.address.streetName()}`;
        break;
      case 1:
        address = `${Helpers.replaceSymbolWithNumber("####")} ${blaver.address.streetName()}`;
        break;
      case 2:
        address = `${Helpers.replaceSymbolWithNumber("###")} ${blaver.address.streetName()}`;
        break;
    }

    return localUseFullAddress ?
      `${address} ${blaver.address.secondaryAddress()}` :
      address;
  };

  /**
   * streetSuffix
   *
   * @method blaver.address.streetSuffix
   */
  this.streetSuffix = function () {
    return blaver.random.arrayElement(
      blaver.definitions.address.street_suffix
    );
  };

  /**
   * streetPrefix
   *
   * @method blaver.address.streetPrefix
   */
  this.streetPrefix = function () {
    return blaver.random.arrayElement(
      blaver.definitions.address.street_prefix
    );
  };

  /**
   * secondaryAddress
   *
   * @method blaver.address.secondaryAddress
   */
  this.secondaryAddress = function () {
    return Helpers.replaceSymbolWithNumber(
      blaver.random.arrayElement(["Apt. ###", "Suite ###"])
    );
  };

  /**
   * county
   *
   * @method blaver.address.county
   */
  this.county = function () {
    return blaver.random.arrayElement(
      blaver.definitions.address.county
    );
  };

  /**
   * country
   *
   * @method blaver.address.country
   */
  this.country = function () {
    return blaver.random.arrayElement(
      blaver.definitions.address.country
    );
  };

  /**
   * countryCode
   *
   * @method blaver.address.countryCode
   * @param {string} alphaCode default alpha-2
   */
  this.countryCode = function (alphaCode) {
    if (typeof alphaCode === "undefined" || alphaCode === "alpha-2") {
      return blaver.random.arrayElement(
        blaver.definitions.address.country_code
      );
    }

    if (alphaCode === "alpha-3") {
      return blaver.random.arrayElement(
        blaver.definitions.address.country_code_alpha_3
      );
    }

    return blaver.random.arrayElement(
      blaver.definitions.address.country_code
    );
  };

  /**
   * state
   *
   * @method blaver.address.state
   */
  this.state = function () {
    return blaver.random.arrayElement(
      blaver.definitions.address.state
    );
  };

  /**
   * stateAbbr
   *
   * @method blaver.address.stateAbbr
   */
  this.stateAbbr = function () {
    return blaver.random.arrayElement(
      blaver.definitions.address.state_abbr
    );
  };

  /**
   * latitude
   *
   * @method blaver.address.latitude
   * @param {Double} max default is 90
   * @param {Double} min default is -90
   * @param {number} precision default is 4
   */
  this.latitude = function (max = 90, min = -90, precision = 4) {
    return blaver.datatype
      .number({
        max: max,
        min: min,
        precision: parseFloat((0.0).toPrecision(precision) + "1")
      }).toFixed(precision);
  };

  /**
   * longitude
   *
   * @method blaver.address.longitude
   * @param {Double} max default is 180
   * @param {Double} min default is -180
   * @param {number} precision default is 4
   */
  this.longitude = function (max = 180, min = -180, precision = 4) {
    return blaver.datatype
      .number({
        max: max,
        min: min,
        precision: parseFloat((0.0).toPrecision(precision) + "1")
      }).toFixed(precision);
  };

  /**
   *  direction
   *
   * @method blaver.address.direction
   * @param {Boolean} useAbbr return direction abbreviation. defaults to false
   */
  this.direction = function (useAbbr) {
    if (typeof useAbbr === "undefined" || useAbbr === false) {
      return blaver.random.arrayElement(
        blaver.definitions.address.direction
      );
    }

    return blaver.random.arrayElement(
      blaver.definitions.address.direction_abbr
    );
  };

  this.direction.schema = {
    description: "Generates a direction. Use optional useAbbr bool to return abbreviation",
    sampleResults: ["Northwest", "South", "SW", "E"]
  };

  /**
   * cardinal direction
   *
   * @method blaver.address.cardinalDirection
   * @param {Boolean} useAbbr return direction abbreviation. defaults to false
   */
  this.cardinalDirection = function (useAbbr) {
    if (typeof useAbbr === "undefined" || useAbbr === false) {
      return blaver.random.arrayElement(
        blaver.definitions.address.direction.slice(0, 4)
      );
    }

    return blaver.random.arrayElement(
      blaver.definitions.address.direction_abbr.slice(0, 4)
    );
  };

  this.cardinalDirection.schema = {
    description: "Generates a cardinal direction. Use optional useAbbr boolean to return abbreviation",
    sampleResults: ["North", "South", "E", "W"]
  };

  /**
   * ordinal direction
   *
   * @method blaver.address.ordinalDirection
   * @param {Boolean} useAbbr return direction abbreviation. defaults to false
   */
  this.ordinalDirection = function (useAbbr) {
    if (typeof useAbbr === "undefined" || useAbbr === false) {
      return blaver.random.arrayElement(
        blaver.definitions.address.direction.slice(4, 8)
      );
    }

    return blaver.random.arrayElement(
      blaver.definitions.address.direction_abbr.slice(4, 8)
    );
  };

  this.ordinalDirection.schema = {
    description: "Generates an ordinal direction. Use optional useAbbr boolean to return abbreviation",
    sampleResults: ["Northwest", "Southeast", "SW", "NE"]
  };

  this.nearbyGPSCoordinate = function (coordinate, radius = 10.0, isMetric = false) {
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
      const R = 6378.137; // Radius of the Earth (http://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html)
      const d = isMetric ? distance : kilometersToMiles(distance); // Distance in km

      const lat1 = degreesToRadians(coordinate[0]); //Current lat point converted to radians
      const lon1 = degreesToRadians(coordinate[1]); //Current long point converted to radians

      const lat2 = Math.asin(
        Math.sin(lat1) * Math.cos(d / R) +
        Math.cos(lat1) * Math.sin(d / R) * Math.cos(bearing)
      );

      let lon2 =
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
      return [blaver.address.latitude(), blaver.address.longitude()];
    }

    // TODO: implement either a gaussian/uniform distribution of points in circular region.
    // Possibly include param to function that allows user to choose between distributions.

    // This approach will likely result in a higher density of points near the center.
    const randomCoord = coordinateWithOffset(
      coordinate,
      degreesToRadians(Math.random() * 360.0),
      radius,
      isMetric
    );

    return [randomCoord[0].toFixed(4), randomCoord[1].toFixed(4)];
  };

  /**
   * Return a random time zone
   * @method blaver.address.timeZone
   */
  this.timeZone = function () {
    return blaver.random.arrayElement(
      blaver.definitions.address.time_zone
    );
  };

  return this;
}

module.exports = Address;
