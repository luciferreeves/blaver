if (typeof module !== "undefined") {
  var assert = require("assert");
  var sinon = require("sinon");
  var bluffmaster = require("../index");
}

describe("vehicle.js", function () {
  describe("vehicle()", function () {
    it("returns a random vehicle", function () {
      sinon.stub(bluffmaster.vehicle, "vehicle").returns("Ford Explorer");
      var vehicle = bluffmaster.vehicle.vehicle();

      assert.equal(vehicle, "Ford Explorer");
      bluffmaster.vehicle.vehicle.restore();
    });
  });

  describe("manufacturer()", function () {
    it("returns random manufacturer", function () {
      sinon.stub(bluffmaster.vehicle, "manufacturer").returns("Porsche");
      var manufacturer = bluffmaster.vehicle.manufacturer();

      assert.equal(manufacturer, "Porsche");
      bluffmaster.vehicle.manufacturer.restore();
    });
  });

  describe("type()", function () {
    it("returns random vehicle type", function () {
      sinon.stub(bluffmaster.vehicle, "type").returns("Minivan");
      var type = bluffmaster.vehicle.type();

      assert.equal(type, "Minivan");
      bluffmaster.vehicle.type.restore();
    });
  });

  describe("fuel()", function () {
    it("returns a fuel type", function () {
      sinon.stub(bluffmaster.vehicle, "fuel").returns("Hybrid");
      var fuel = bluffmaster.vehicle.fuel();

      assert.equal(fuel, "Hybrid");
      bluffmaster.vehicle.fuel.restore();
    });
  });

  describe("vin()", function () {
    it("returns valid vin number", function () {
      var vin = bluffmaster.vehicle.vin();
      assert.ok(vin.match(/^[A-Z0-9]{10}[A-Z]{1}[A-Z0-9]{1}\d{5}$/));
    });
  });

  describe("color()", function () {
    it("returns a random color", function () {
      sinon.stub(bluffmaster.vehicle, "color").returns("black");
      var color = bluffmaster.vehicle.color();

      assert.equal(color, "black");
      bluffmaster.vehicle.color.restore();
    });
  });
});
