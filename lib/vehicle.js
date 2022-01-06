/**
 *
 * @namespace bluffmaster.vehicle
 */
var Vehicle = function (bluffmaster) {
  var self = this;
  var fake = bluffmaster.fake;

  /**
   * vehicle
   *
   * @method bluffmaster.vehicle.vehicle
   */
  self.vehicle = function () {
    return fake('{{vehicle.manufacturer}} {{vehicle.model}}');
  };

  self.vehicle.schema = {
    "description": "Generates a random vehicle.",
    "sampleResults": ["BMW Explorer", "Ford Camry", "Lamborghini Ranchero"]
  };

  /**
   * manufacturer
   *
   * @method bluffmaster.vehicle.manufacturer
   */
  self.manufacturer = function () {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.vehicle.manufacturer);
  };

  self.manufacturer.schema = {
    "description": "Generates a manufacturer name.",
    "sampleResults": ["Ford", "Jeep", "Tesla"]
  };


  /**
   * model
   *
   * @method bluffmaster.vehicle.model
   */
  self.model = function () {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.vehicle.model);
  };

  self.model.schema = {
    "description": "Generates a vehicle model.",
    "sampleResults": ["Explorer", "Camry", "Ranchero"]
  };

  /**
   * type
   *
   * @method bluffmaster.vehicle.type
   */
  self.type = function () {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.vehicle.type);
  };

  self.type.schema = {
    "description": "Generates a vehicle type.",
    "sampleResults": ["Coupe", "Convertable", "Sedan", "SUV"]
  };

  /**
   * fuel
   *
   * @method bluffmaster.vehicle.fuel
   */
  self.fuel = function () {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.vehicle.fuel);
  };

  self.fuel.schema = {
    "description": "Generates a fuel type.",
    "sampleResults": ["Electric", "Gasoline", "Diesel"]
  };

  /**
   * vin
   *
   * @method bluffmaster.vehicle.vin
   */
  self.vin = function () {
    var bannedChars=['o','i','q'];
    return (
      bluffmaster.random.alphaNumeric(10, {bannedChars:bannedChars}) +
      bluffmaster.random.alpha({ count: 1, upcase: true ,bannedChars:bannedChars}) +
      bluffmaster.random.alphaNumeric(1, {bannedChars:bannedChars}) +
      bluffmaster.datatype.number({ min: 10000, max: 100000}) // return five digit #
    ).toUpperCase();
  };

  self.vin.schema = {
    "description": "Generates a valid VIN number.",
    "sampleResults": ["YV1MH682762184654", "3C7WRMBJ2EG208836"]
  };

  /**
   * color
   *
   * @method bluffmaster.vehicle.color
   */
  self.color = function () {
    return fake('{{commerce.color}}');
  };

  self.color.schema = {
    "description": "Generates a color",
    "sampleResults": ["red", "white", "black"]
  };

  /**
     * vrm
     *
     * @method bluffmaster.vehicle.vrm
     */
  self.vrm = function () {
    return (
      bluffmaster.random.alpha({ count: 2, upcase: true }) +
            bluffmaster.datatype.number({ min: 0, max: 9 }) +
            bluffmaster.datatype.number({ min: 0, max: 9 }) +
            bluffmaster.random.alpha({ count: 3, upcase: true })
    ).toUpperCase();
  };

  self.vrm.schema = {
    "description": "Generates a vehicle vrm",
    "sampleResults": ["MF56UPA", "GL19AAQ", "SF20TTA"]
  };

  /**
  * bicycle
  *
  * @method bluffmaster.vehicle.bicycle
  */
  self.bicycle = function () {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.vehicle.bicycle_type);
  };

  self.bicycle.schema = {
    "description": "Generates a type of bicycle",
    "sampleResults": ["Adventure Road Bicycle", "City Bicycle", "Recumbent Bicycle"]
  };
};

module["exports"] = Vehicle;
