if (typeof module !== "undefined") {
  var assert = require("assert");
  var sinon = require("sinon");
  var _ = require("lodash");
  var blaver = require("../index");
}

describe("datatype.js", function () {
  describe("number", function () {
    it("returns a random number given a maximum value as Number", function () {
      const max = 10;
      assert.ok(blaver.datatype.number(max) <= max);
    });

    it("returns a random number given a maximum value as Object", function () {
      const options = { max: 10 };
      assert.ok(blaver.datatype.number(options) <= options.max);
    });

    it("returns a random number given a maximum value of 0", function () {
      const options = { max: 0 };
      assert.ok(blaver.datatype.number(options) === 0);
    });

    it("returns a random number given a negative number minimum and maximum value of 0", function () {
      const options = { min: -100, max: 0 };
      assert.ok(blaver.datatype.number(options) <= options.max);
    });

    it("returns a random number between a range", function () {
      const options = { min: 22, max: 33 };
      for (let i = 0; i < 100; i++) {
        const randomNumber = blaver.datatype.number(options);
        assert.ok(randomNumber >= options.min);
        assert.ok(randomNumber <= options.max);
      }
    });

    it("provides numbers with a given precision", function () {
      const options = { min: 0, max: 1.5, precision: 0.5 };
      const results = _.chain(_.range(50))
        .map(function () {
          return blaver.datatype.number(options);
        })
        .uniq()
        .value()
        .sort();

      assert.ok(_.includes(results, 0.5));
      assert.ok(_.includes(results, 1.0));

      assert.strictEqual(results[0], 0);
      assert.strictEqual(_.last(results), 1.5);
    });

    it("provides numbers with a with exact precision", function () {
      const options = { min: 0.5, max: 0.99, precision: 0.01 };
      for (let i = 0; i < 100; i++) {
        const number = blaver.datatype.number(options);
        assert.strictEqual(number, Number(number.toFixed(2)));
      }
    });

    it("should not modify the input object", function () {
      const min = 1;
      const max = 2;
      const opts = {
        min: min,
        max: max,
      };

      blaver.datatype.number(opts);

      assert.strictEqual(opts.min, min);
      assert.strictEqual(opts.max, max);
    });
  });

  describe("float", function () {
    it("returns a random float with a default precision value (0.01)", function () {
      const number = blaver.datatype.float();
      assert.strictEqual(number, Number(number.toFixed(2)));
    });

    it("returns a random float given a precision value", function () {
      const number = blaver.datatype.float(0.001);
      assert.strictEqual(number, Number(number.toFixed(3)));
    });

    it("returns a random number given a maximum value as Object", function () {
      const options = { max: 10 };
      assert.ok(blaver.datatype.float(options) <= options.max);
    });

    it("returns a random number given a maximum value of 0", function () {
      const options = { max: 0 };
      assert.ok(blaver.datatype.float(options) === 0);
    });

    it("returns a random number given a negative number minimum and maximum value of 0", function () {
      const options = { min: -100, max: 0 };
      assert.ok(blaver.datatype.float(options) <= options.max);
    });

    it("returns a random number between a range", function () {
      const options = { min: 22, max: 33 };
      for (let i = 0; i < 5; i++) {
        const randomNumber = blaver.datatype.float(options);
        assert.ok(randomNumber >= options.min);
        assert.ok(randomNumber <= options.max);
      }
    });

    it("provides numbers with a given precision", function () {
      const options = { min: 0, max: 1.5, precision: 0.5 };
      const results = _.chain(_.range(50))
        .map(function () {
          return blaver.datatype.float(options);
        })
        .uniq()
        .value()
        .sort();

      assert.ok(_.includes(results, 0.5));
      assert.ok(_.includes(results, 1.0));

      assert.strictEqual(results[0], 0);
      assert.strictEqual(_.last(results), 1.5);
    });

    it("provides numbers with a with exact precision", function () {
      const options = { min: 0.5, max: 0.99, precision: 0.01 };
      for (let i = 0; i < 100; i++) {
        const number = blaver.datatype.float(options);
        assert.strictEqual(number, Number(number.toFixed(2)));
      }
    });

    it("should not modify the input object", function () {
      const min = 1;
      const max = 2;
      const opts = {
        min: min,
        max: max,
      };

      blaver.datatype.float(opts);

      assert.strictEqual(opts.min, min);
      assert.strictEqual(opts.max, max);
    });
  });

  describe("datetime", function () {
    it("check validity of date and if returned value is created by Date()", function () {
      const date = blaver.datatype.datetime();
      assert.strictEqual(typeof date, "object");
      assert.ok(!isNaN(date.getTime()));
      assert.strictEqual(Object.prototype.toString.call(date), "[object Date]");
    });
    it("basic test with stubbed value", function () {
      const today = new Date();
      sinon.stub(blaver.datatype, "number").returns(today);
      const date = blaver.datatype.datetime();
      assert.strictEqual(today.valueOf(), date.valueOf());
      blaver.datatype.number.restore();
    });

    //generating a datetime with seeding is currently not working
  });

  describe("string", function () {
    it("should generate a string value", function () {
      const generateString = blaver.datatype.string();
      assert.strictEqual(typeof generateString, "string");
      assert.strictEqual(generateString.length, 10);
    });

    it("should generate a string value, checks seeding", function () {
      blaver.seed(100);
      const generateString = blaver.datatype.string();
      assert.strictEqual(generateString, "S_:GHQo.!/");
    });

    it("returns empty string if negative length is passed", function () {
      const negativeValue = blaver.datatype.number({ min: -1000, max: -1 });
      const generateString = blaver.datatype.string(negativeValue);
      assert.strictEqual(generateString, "");
      assert.strictEqual(generateString.length, 0);
    });

    it("returns string with length of 2^20 if bigger length value is passed", function () {
      const overMaxValue = Math.pow(2, 28);
      const generateString = blaver.datatype.string(overMaxValue);
      assert.strictEqual(generateString.length, Math.pow(2, 20));
    });
  });

  describe("boolean", function () {
    it("generates a boolean value", function () {
      const bool = blaver.datatype.boolean();
      assert.strictEqual(typeof bool, "boolean");
    });
    it("generates a boolean value, checks seeding", function () {
      blaver.seed(1);
      const bool = blaver.datatype.boolean();
      assert.strictEqual(bool, false);
    });
  });

  describe("UUID", function () {
    it("generates a valid UUID", function () {
      const UUID = blaver.datatype.uuid();
      const RFC4122 =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
      assert.ok(RFC4122.test(UUID));
    });
  });

  describe("hexaDecimal", function () {
    const hexaDecimal = blaver.datatype.hexaDecimal;

    it("generates single hex character when no additional argument was provided", function () {
      const hex = hexaDecimal();
      assert.ok(hex.match(/^(0x)[0-9a-f]{1}$/i));
    });

    it("generates a random hex string", function () {
      const hex = hexaDecimal(5);
      assert.ok(hex.match(/^(0x)[0-9a-f]+$/i));
    });
  });

  describe("json", function () {
    it("generates a valid json object", function () {
      const jsonObject = blaver.datatype.json();
      assert.strictEqual(typeof jsonObject, "string");
      assert.ok(JSON.parse(jsonObject));
    });

    it("generates a valid json object, with seeding", function () {
      blaver.seed(10);
      const jsonObject = blaver.datatype.json();
      const parsedObject = JSON.parse(jsonObject);
      assert.strictEqual(typeof jsonObject, "string");
      assert.strictEqual(parsedObject.foo, '<"N[JfnOW5');
      assert.strictEqual(parsedObject.bar, 19806);
      assert.strictEqual(parsedObject.bike, "g909).``yl");
      assert.strictEqual(parsedObject.a, 33607);
      assert.strictEqual(parsedObject.b, "sl3Y#dr<dv");
      assert.strictEqual(parsedObject.name, "c-SG.iCW_1");
      assert.strictEqual(parsedObject.prop, 82608);
    });
  });

  describe("array", function () {
    it("generates an array", function () {
      const stubArray = [0, 1, 3, 4, 5, 6, 1, "a", "b", "c"];
      sinon.stub(blaver.datatype, "array").returns(stubArray);
      const generatedArray = blaver.datatype.array();
      assert.strictEqual(generatedArray.length, stubArray.length);
      assert.strictEqual(stubArray, generatedArray);
      blaver.datatype.array.restore();
    });

    it("generates an array with passed size", function () {
      const randomSize = blaver.datatype.number();
      const generatedArray = blaver.datatype.array(randomSize);
      assert.strictEqual(generatedArray.length, randomSize);
    });

    it("generates an array with 1 element, with seeding", function () {
      blaver.seed(10);
      const generatedArray = blaver.datatype.array(1);
      assert.strictEqual(generatedArray[0], '<"N[JfnOW5');
    });
  });

  describe("bigInt", function () {
    it("should generate a bigInt value", function () {
      const generateBigInt = blaver.datatype.bigInt();
      assert.strictEqual(typeof generateBigInt, "bigint");
    });

    // it("Generate and compare two numbers of data type BigInt, with seeding", function () {
    //   blaver.seed(123);
    //   const generateBigInt1 = blaver.datatype.bigInt();
    //   blaver.seed(123);
    //   const generateBigInt2 = blaver.datatype.bigInt();
    //   assert.strictEqual(generateBigInt1, generateBigInt2);
    // });

    it("summing with the Number datatype should be an error", function (done) {
      try {
        blaver.datatype.bigInt() + 10;
      } catch (error) {
        done();
      }
    });
  });
});
