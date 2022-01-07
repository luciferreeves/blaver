/**
 *
 * @namespace blaver.vehicle
 */
const Vehicle = function (blaver) {
  const self = this;
  const fake = blaver.fake;

  /**
   * vehicle
   *
   * @method blaver.vehicle.vehicle
   */
  self.vehicle = function () {
    return fake("{{vehicle.manufacturer}} {{vehicle.model}}");
  };

  self.vehicle.schema = {
    description: "Generates a random vehicle.",
    sampleResults: ["BMW Explorer", "Ford Camry", "Lamborghini Ranchero"],
  };

  /**
   * manufacturer
   *
   * @method blaver.vehicle.manufacturer
   */
  self.manufacturer = function () {
    return blaver.random.arrayElement(
      blaver.definitions.vehicle.manufacturer
    );
  };

  self.manufacturer.schema = {
    description: "Generates a manufacturer name.",
    sampleResults: ["Ford", "Jeep", "Tesla"],
  };

  /**
   * model
   *
   * @method blaver.vehicle.model
   */
  self.model = function () {
    return blaver.random.arrayElement(
      blaver.definitions.vehicle.model
    );
  };

  self.model.schema = {
    description: "Generates a vehicle model.",
    sampleResults: ["Explorer", "Camry", "Ranchero"],
  };

  /**
   * type
   *
   * @method blaver.vehicle.type
   */
  self.type = function () {
    return blaver.random.arrayElement(
      blaver.definitions.vehicle.type
    );
  };

  self.type.schema = {
    description: "Generates a vehicle type.",
    sampleResults: ["Coupe", "Convertable", "Sedan", "SUV"],
  };

  /**
   * fuel
   *
   * @method blaver.vehicle.fuel
   */
  self.fuel = function () {
    return blaver.random.arrayElement(
      blaver.definitions.vehicle.fuel
    );
  };

  self.fuel.schema = {
    description: "Generates a fuel type.",
    sampleResults: ["Electric", "Gasoline", "Diesel"],
  };

  /**
   * vin
   *
   * @method blaver.vehicle.vin
   */
  self.vin = function () {
    const bannedChars = ["o", "i", "q"];
    return (
      blaver.random.alphaNumeric(10, { bannedChars: bannedChars }) +
      blaver.random.alpha({
        count: 1,
        upcase: true,
        bannedChars: bannedChars,
      }) +
      blaver.random.alphaNumeric(1, { bannedChars: bannedChars }) +
      blaver.datatype.number({ min: 10000, max: 100000 })
    ) // return five digit #
      .toUpperCase();
  };

  self.vin.schema = {
    description: "Generates a valid VIN number.",
    sampleResults: ["YV1MH682762184654", "3C7WRMBJ2EG208836"],
  };

  /**
   * color
   *
   * @method blaver.vehicle.color
   */
  self.color = function () {
    return fake("{{commerce.color}}");
  };

  self.color.schema = {
    description: "Generates a color",
    sampleResults: ["red", "white", "black"],
  };

  /**
   * vrm
   *
   * @method blaver.vehicle.vrm
   */
  self.vrm = function () {
    return (
      blaver.random.alpha({ count: 2, upcase: true }) +
      blaver.datatype.number({ min: 0, max: 9 }) +
      blaver.datatype.number({ min: 0, max: 9 }) +
      blaver.random.alpha({ count: 3, upcase: true })
    ).toUpperCase();
  };

  self.vrm.schema = {
    description: "Generates a vehicle vrm",
    sampleResults: ["MF56UPA", "GL19AAQ", "SF20TTA"],
  };

  /**
   * bicycle
   *
   * @method blaver.vehicle.bicycle
   */
  self.bicycle = function () {
    return blaver.random.arrayElement(
      blaver.definitions.vehicle.bicycle_type
    );
  };

  self.bicycle.schema = {
    description: "Generates a type of bicycle",
    sampleResults: [
      "Adventure Road Bicycle",
      "City Bicycle",
      "Recumbent Bicycle",
    ],
  };
};

module["exports"] = Vehicle;
