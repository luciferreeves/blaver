if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var bluffmaster = require('../index');
}

describe("vehicle.js", function () {
  describe("vehicle()", function () {
    it("returns a random vehicle", function () {
      sinon.stub(bluffmaster.vehicle, 'vehicle').returns('Ford Explorer');
      var vehicle = bluffmaster.vehicle.vehicle();

      assert.strictEqual(vehicle, 'Ford Explorer');
      bluffmaster.vehicle.vehicle.restore();
    });
  });

  describe("manufacturer()", function () {
    it("returns random manufacturer", function () {
      sinon.stub(bluffmaster.vehicle, 'manufacturer').returns('Porsche');
      var manufacturer = bluffmaster.vehicle.manufacturer();

      assert.strictEqual(manufacturer, 'Porsche');
      bluffmaster.vehicle.manufacturer.restore();
    });
  });

  describe("type()", function () {
    it("returns random vehicle type", function () {
      sinon.stub(bluffmaster.vehicle, 'type').returns('Minivan');
      var type = bluffmaster.vehicle.type();

      assert.strictEqual(type, 'Minivan');
      bluffmaster.vehicle.type.restore();
    });
  });

  describe("fuel()", function () {
    it("returns a fuel type", function () {
      sinon.stub(bluffmaster.vehicle, 'fuel').returns('Hybrid');
      var fuel = bluffmaster.vehicle.fuel();

      assert.strictEqual(fuel, 'Hybrid');
      bluffmaster.vehicle.fuel.restore();
    });
  });

  describe("vin()", function () {
    it("returns valid vin number", function () {
      var vin = bluffmaster.vehicle.vin();
      assert.ok(vin.match(/^([A-HJ-NPR-Z0-9]{10}[A-HJ-NPR-Z0-9]{1}[A-HJ-NPR-Z0-9]{1}\d{5})$/));
    });
  });

  describe("color()", function () {
    it("returns a random color", function () {
      sinon.stub(bluffmaster.vehicle, 'color').returns('black');
      var color = bluffmaster.vehicle.color();

      assert.strictEqual(color, 'black');
      bluffmaster.vehicle.color.restore();
    });
  });

  describe("vrm()", function () {
    it("returns a random vrm", function () {
      sinon.stub(bluffmaster.vehicle, 'vrm').returns('MF59EEW');
      var vrm = bluffmaster.vehicle.vrm();

      assert.equal(vrm, 'MF59EEW');
      bluffmaster.vehicle.vrm.restore();
    });
  });

  describe("bicycle()", function () {
    it("returns a random type of bicycle", function () {
      sinon.stub(bluffmaster.vehicle, 'bicycle').returns('Adventure Road Bicycle');
      var bicycle = bluffmaster.vehicle.bicycle();

      assert.equal(bicycle, 'Adventure Road Bicycle');
      bluffmaster.vehicle.bicycle.restore();
    });
  });
});