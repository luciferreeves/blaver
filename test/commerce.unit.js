if (typeof module !== "undefined") {
  var assert = require("assert"),
    sinon = require("sinon"),
    bluffmaster = require("../index");
}

describe("commerce.js", function () {
  describe("color()", function () {
    it("returns random value from commerce.color array", function () {
      var color = bluffmaster.commerce.color();
      assert.ok(bluffmaster.definitions.commerce.color.indexOf(color) !== -1);
    });
  });

  describe("department(max, fixedValue)", function () {
    it("should use the default amounts when not passing arguments", function () {
      var department = bluffmaster.commerce.department();
      assert.ok(department.split(" ").length === 1);
    });

    /*

    it("should return only one value if we specify a maximum of one", function() {
        sinon.spy(bluffmaster.random, 'arrayElement');

        var department = bluffmaster.commerce.department(1);

        assert.strictEqual(department.split(" ").length, 1);
        assert.ok(bluffmaster.random.arrayElement.calledOnce);

        bluffmaster.random.arrayElement.restore();
    });

    it("should return the maximum value if we specify the fixed value", function() {
        sinon.spy(bluffmaster.random, 'arrayElement');

        var department = bluffmaster.commerce.department(5, true);

        console.log(department);

        // account for the separator
        assert.strictEqual(department.split(" ").length, 6);
        // Sometimes it will generate duplicates that aren't used in the final string,
        // so we check if arrayElement has been called exactly or more than 5 times
        assert.ok(bluffmaster.random.arrayElement.callCount >= 5);

        bluffmaster.random.arrayElement.restore();
    });
    */
  });

  describe("productName()", function () {
    it("returns name comprising of an adjective, material and product", function () {
      sinon.spy(bluffmaster.random, "arrayElement");
      sinon.spy(bluffmaster.commerce, "productAdjective");
      sinon.spy(bluffmaster.commerce, "productMaterial");
      sinon.spy(bluffmaster.commerce, "product");
      var name = bluffmaster.commerce.productName();

      assert.ok(name.split(" ").length >= 3);
      assert.ok(bluffmaster.random.arrayElement.calledThrice);
      assert.ok(bluffmaster.commerce.productAdjective.calledOnce);
      assert.ok(bluffmaster.commerce.productMaterial.calledOnce);
      assert.ok(bluffmaster.commerce.product.calledOnce);

      bluffmaster.random.arrayElement.restore();
      bluffmaster.commerce.productAdjective.restore();
      bluffmaster.commerce.productMaterial.restore();
      bluffmaster.commerce.product.restore();
    });
  });

  describe("price(min, max, dec, symbol)", function () {
    it("should use the default amounts when not passing arguments", function () {
      var price = bluffmaster.commerce.price();

      assert.ok(price);
      assert.equal(price > 0, true, "the amount should be greater than 0");
      assert.equal(price < 1001, true, "the amount should be less than 1000");
    });

    it("should use the default decimal location when not passing arguments", function () {
      var price = bluffmaster.commerce.price();

      var decimal = ".";
      var expected = price.length - 3;
      var actual = price.indexOf(decimal);

      assert.equal(
        actual,
        expected,
        "The expected location of the decimal is " +
          expected +
          " but it was " +
          actual +
          " amount " +
          price
      );
    });

    it("should not include a currency symbol by default", function () {
      var amount = bluffmaster.commerce.price();

      var regexp = new RegExp(/[0-9.]/);

      var expected = true;
      var actual = regexp.test(amount);

      assert.equal(
        actual,
        expected,
        "The expected match should not include a currency symbol"
      );
    });

    it("it should handle negative amounts, but return 0", function () {
      var amount = bluffmaster.commerce.price(-200, -1);

      assert.ok(amount);
      assert.equal(amount == 0.0, true, "the amount should equal 0");
    });

    it("it should handle argument dec", function () {
      var price = bluffmaster.commerce.price(100, 100, 1);

      assert.ok(price);
      assert.strictEqual(price, "100.0", "the price should be equal 100.0");
    });

    it("it should handle argument dec = 0", function () {
      var price = bluffmaster.commerce.price(100, 100, 0);

      assert.ok(price);
      assert.strictEqual(price, "100", "the price should be equal 100");
    });
  });

  describe("productDescription()", function () {
    it("returns a random product description", function () {
      sinon.spy(bluffmaster.commerce, "productDescription");
      var description = bluffmaster.commerce.productDescription();

      assert.ok(typeof description === "string");
      assert.ok(bluffmaster.commerce.productDescription.calledOnce);

      bluffmaster.commerce.productDescription.restore();
    });
  });
});
