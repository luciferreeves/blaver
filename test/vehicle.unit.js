if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var blaver = require('../index');
}

describe("vehicle.js", function () {
  describe("vehicle()", function () {
    it("returns a random vehicle", function () {
      sinon.stub(blaver.vehicle, 'vehicle').returns('Ford Explorer');
      const vehicle = blaver.vehicle.vehicle();

      assert.strictEqual(vehicle, 'Ford Explorer');
      blaver.vehicle.vehicle.restore();
    });
  });

  describe("manufacturer()", function () {
    it("returns random manufacturer", function () {
      sinon.stub(blaver.vehicle, 'manufacturer').returns('Porsche');
      const manufacturer = blaver.vehicle.manufacturer();

      assert.strictEqual(manufacturer, 'Porsche');
      blaver.vehicle.manufacturer.restore();
    });
  });

  describe("type()", function () {
    it("returns random vehicle type", function () {
      sinon.stub(blaver.vehicle, 'type').returns('Minivan');
      const type = blaver.vehicle.type();

      assert.strictEqual(type, 'Minivan');
      blaver.vehicle.type.restore();
    });
  });

  describe("fuel()", function () {
    it("returns a fuel type", function () {
      sinon.stub(blaver.vehicle, 'fuel').returns('Hybrid');
      const fuel = blaver.vehicle.fuel();

      assert.strictEqual(fuel, 'Hybrid');
      blaver.vehicle.fuel.restore();
    });
  });

  describe("vin()", function () {
    it("returns valid vin number", function () {
      const vin = blaver.vehicle.vin();
      assert.ok(vin.match(/^([A-HJ-NPR-Z0-9]{10}[A-HJ-NPR-Z0-9]{1}[A-HJ-NPR-Z0-9]{1}\d{5})$/));
    });
  });

  describe("color()", function () {
    it("returns a random color", function () {
      sinon.stub(blaver.vehicle, 'color').returns('black');
      const color = blaver.vehicle.color();

      assert.strictEqual(color, 'black');
      blaver.vehicle.color.restore();
    });
  });

  describe("vrm()", function () {
    it("returns a random vrm", function () {
      sinon.stub(blaver.vehicle, 'vrm').returns('MF59EEW');
      const vrm = blaver.vehicle.vrm();

      assert.equal(vrm, 'MF59EEW');
      blaver.vehicle.vrm.restore();
    });
  });

  describe("bicycle()", function () {
    it("returns a random type of bicycle", function () {
      sinon.stub(blaver.vehicle, 'bicycle').returns('Adventure Road Bicycle');
      const bicycle = blaver.vehicle.bicycle();

      assert.equal(bicycle, 'Adventure Road Bicycle');
      blaver.vehicle.bicycle.restore();
    });
  });
});