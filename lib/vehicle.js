/**
 *
 * @namespace blaver.vehicle
 */
const Vehicle = function (blaver) {
  const fake = blaver.fake;

  /**
   * vehicle
   *
   * @method blaver.vehicle.vehicle
   */
  this.vehicle = function () {
    return fake("{{vehicle.manufacturer}} {{vehicle.model}}");
  };

  this.vehicle.schema = {
    description: "Generates a random vehicle.",
    sampleResults: ["BMW Explorer", "Ford Camry", "Lamborghini Ranchero"]
  };

  /**
   * manufacturer
   *
   * @method blaver.vehicle.manufacturer
   */
  this.manufacturer = function () {
    return blaver.random.arrayElement(
      blaver.definitions.vehicle.manufacturer
    );
  };

  this.manufacturer.schema = {
    description: "Generates a manufacturer name.",
    sampleResults: ["Ford", "Jeep", "Tesla"]
  };

  /**
   * model
   *
   * @method blaver.vehicle.model
   */
  this.model = function () {
    return blaver.random.arrayElement(
      blaver.definitions.vehicle.model
    );
  };

  this.model.schema = {
    description: "Generates a vehicle model.",
    sampleResults: ["Explorer", "Camry", "Ranchero"]
  };

  /**
   * type
   *
   * @method blaver.vehicle.type
   */
  this.type = function () {
    return blaver.random.arrayElement(
      blaver.definitions.vehicle.type
    );
  };

  this.type.schema = {
    description: "Generates a vehicle type.",
    sampleResults: ["Coupe", "Convertable", "Sedan", "SUV"]
  };

  /**
   * fuel
   *
   * @method blaver.vehicle.fuel
   */
  this.fuel = function () {
    return blaver.random.arrayElement(blaver.definitions.vehicle.fuel);
  };

  this.fuel.schema = {
    description: "Generates a fuel type.",
    sampleResults: ["Electric", "Gasoline", "Diesel"]
  };

  /**
   * vin
   *
   * @method blaver.vehicle.vin
   */
  this.vin = function () {
    const bannedChars = ["o", "i", "q"];
    
    return (
      blaver.random.alphaNumeric(10, { bannedChars: bannedChars }) +
      blaver.random.alpha({
        count: 1,
        upcase: true,
        bannedChars: bannedChars
      }) +
      blaver.random.alphaNumeric(1, { bannedChars: bannedChars }) +
      blaver.datatype.number({ min: 10000, max: 100000 })
    ) // return five digit #
      .toUpperCase();
  };

  this.vin.schema = {
    description: "Generates a valid VIN number.",
    sampleResults: ["YV1MH682762184654", "3C7WRMBJ2EG208836"]
  };

  /**
   * color
   *
   * @method blaver.vehicle.color
   */
  this.color = function () {
    return fake("{{commerce.color}}");
  };

  this.color.schema = {
    description: "Generates a color",
    sampleResults: ["red", "white", "black"]
  };

  /**
   * vrm
   *
   * @method blaver.vehicle.vrm
   */
  this.vrm = function () {
    return (
      blaver.random.alpha({ count: 2, upcase: true }) +
      blaver.datatype.number({ min: 0, max: 9 }) +
      blaver.datatype.number({ min: 0, max: 9 }) +
      blaver.random.alpha({ count: 3, upcase: true })
    ).toUpperCase();
  };

  this.vrm.schema = {
    description: "Generates a vehicle vrm",
    sampleResults: ["MF56UPA", "GL19AAQ", "SF20TTA"]
  };

  /**
   * bicycle
   *
   * @method blaver.vehicle.bicycle
   */
  this.bicycle = function () {
    return blaver.random.arrayElement(blaver.definitions.vehicle.bicycle_type);
  };

  this.bicycle.schema = {
    description: "Generates a type of bicycle",
    sampleResults: [
      "Adventure Road Bicycle",
      "City Bicycle",
      "Recumbent Bicycle"
    ]
  };
};

module.exports = Vehicle;
