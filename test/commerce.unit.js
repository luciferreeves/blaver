if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var blaver = require('../index');
}

describe("commerce.js", function() {

  describe("color()", function() {
    it("returns random value from commerce.color array", function() {
      const color = blaver.commerce.color();
      assert.ok(blaver.definitions.commerce.color.indexOf(color) !== -1);
    });
  });

  describe("department(max, fixedValue)", function() {

    it("should use the default amounts when not passing arguments", function() {
      const department = blaver.commerce.department();
      assert.ok(department.split(" ").length === 1);
    });

    /*

    it("should return only one value if we specify a maximum of one", function() {
        sinon.spy(blaver.random, 'arrayElement');

        const department = blaver.commerce.department(1);

        assert.strictEqual(department.split(" ").length, 1);
        assert.ok(blaver.random.arrayElement.calledOnce);

        blaver.random.arrayElement.restore();
    });

    it("should return the maximum value if we specify the fixed value", function() {
        sinon.spy(blaver.random, 'arrayElement');

        const department = blaver.commerce.department(5, true);

        console.log(department);

        // account for the separator
        assert.strictEqual(department.split(" ").length, 6);
        // Sometimes it will generate duplicates that aren't used in the final string,
        // so we check if arrayElement has been called exactly or more than 5 times
        assert.ok(blaver.random.arrayElement.callCount >= 5);

        blaver.random.arrayElement.restore();
    });
    */
  });

  describe("productName()", function() {
    it("returns name comprising of an adjective, material and product", function() {
      sinon.spy(blaver.random, 'arrayElement');
      sinon.spy(blaver.commerce, 'productAdjective');
      sinon.spy(blaver.commerce, 'productMaterial');
      sinon.spy(blaver.commerce, 'product');
      const name = blaver.commerce.productName();

      assert.ok(name.split(' ').length >= 3);
      assert.ok(blaver.random.arrayElement.calledThrice);
      assert.ok(blaver.commerce.productAdjective.calledOnce);
      assert.ok(blaver.commerce.productMaterial.calledOnce);
      assert.ok(blaver.commerce.product.calledOnce);

      blaver.random.arrayElement.restore();
      blaver.commerce.productAdjective.restore();
      blaver.commerce.productMaterial.restore();
      blaver.commerce.product.restore();
    });
  });

  describe("price(min, max, dec, symbol)", function() {
    it("should use the default amounts when not passing arguments", function() {
      const price = blaver.commerce.price();

      assert.ok(price);
      assert.strictEqual((price > 0), true, "the amount should be greater than 0");
      assert.strictEqual((price < 1001), true, "the amount should be less than 1000");
    });

    it("should use the default decimal location when not passing arguments", function() {
      const price = blaver.commerce.price();

      const decimal = ".";
      const expected = price.length - 3;
      const actual = price.indexOf(decimal);

      assert.strictEqual(actual, expected, "The expected location of the decimal is " + expected + " but it was " + actual + " amount " + price);
    });

    it("should not include a currency symbol by default", function () {

      const amount = blaver.commerce.price();

      const regexp = new RegExp(/[0-9.]/);

      const expected = true;
      const actual = regexp.test(amount);

      assert.strictEqual(actual, expected, 'The expected match should not include a currency symbol');
    });

    it("it should handle negative amounts, but return 0", function () {

      const amount = blaver.commerce.price(-200, -1);

      assert.ok(amount);
      assert.strictEqual((amount == 0.00), true, "the amount should equal 0");
    });

    it("it should handle argument dec", function () {

      const price = blaver.commerce.price(100, 100, 1);

      assert.ok(price);
      assert.strictEqual(price , '100.0', "the price should be equal 100.0");
    });

    it("it should handle argument dec = 0", function () {

      const price = blaver.commerce.price(100, 100, 0);

      assert.ok(price);
      assert.strictEqual(price , '100', "the price should be equal 100");
    });

  });

  describe("productDescription()", function() {
    it("returns a random product description", function() {
      sinon.spy(blaver.commerce, 'productDescription');
      const description = blaver.commerce.productDescription();

      assert.ok(typeof description === 'string');
      assert.ok(blaver.commerce.productDescription.calledOnce);

      blaver.commerce.productDescription.restore();
    });
  });

});