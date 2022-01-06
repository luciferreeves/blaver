if (typeof module !== 'undefined') {
    var assert = require('assert');
    var sinon = require('sinon');
    var _ = require('lodash');
    var bluffmaster = require('../index');
    var mersenne = require('../vendor/mersenne');
}


describe("random.js", function () {
  describe("number", function() {

    it("returns a random number given a maximum value as Number", function() {
      var max = 10;
      assert.ok(bluffmaster.random.number(max) <= max);
    });

    it("returns a random number given a maximum value as Object", function() {
      var options = { max: 10 };
      assert.ok(bluffmaster.random.number(options) <= options.max);
    });

    it("returns a random number given a maximum value of 0", function() {
      var options = { max: 0 };
      assert.ok(bluffmaster.random.number(options) === 0);
    });

    it("returns a random number given a negative number minimum and maximum value of 0", function() {
      var options = { min: -100, max: 0 };
      assert.ok(bluffmaster.random.number(options) <= options.max);
    });

    it("returns a random number between a range", function() {
      var options = { min: 22, max: 33 };
      for(var i = 0; i < 100; i++) {
        var randomNumber = bluffmaster.random.number(options);
        assert.ok(randomNumber >= options.min);
        assert.ok(randomNumber <= options.max);
      }
    });

    it("provides numbers with a given precision", function() {
      var options = { min: 0, max: 1.5, precision: 0.5 };
      var results = _.chain(_.range(50))
        .map(function() {
          return bluffmaster.random.number(options);
        })
        .uniq()
        .value()
        .sort();

      assert.ok(_.includes(results, 0.5));
      assert.ok(_.includes(results, 1.0));

      assert.equal(results[0], 0);
      assert.equal(_.last(results), 1.5);

    });

    it("provides numbers with a with exact precision", function() {
      var options = { min: 0.5, max: 0.99, precision: 0.01 };
      for(var i = 0; i < 100; i++) {
        var number = bluffmaster.random.number(options);
        assert.equal(number, Number(number.toFixed(2)));
      }
    });

    it("should not modify the input object", function() {
      var min = 1;
      var max = 2;
      var opts = {
        min: min,
        max: max
      };

      bluffmaster.random.number(opts);

      assert.equal(opts.min, min);
      assert.equal(opts.max, max);
    });

    it('should return deterministic results when seeded with integer', function() {
      bluffmaster.seed(100);
      var name = bluffmaster.name.findName();
      assert.equal(name, 'Eva Jenkins');
    })

    it('should return deterministic results when seeded with array - one element', function() {
      bluffmaster.seed([10]);
      var name = bluffmaster.name.findName();
      assert.equal(name, 'Duane Kub');
    })

    it('should return deterministic results when seeded with array - multiple elements', function() {
      bluffmaster.seed([10, 100, 1000]);
      var name = bluffmaster.name.findName();
      assert.equal(name, 'Alma Shanahan');
    })

  });

  describe("float", function() {

    it("returns a random float with a default precision value (0.01)", function() {
      var number = bluffmaster.random.float();
      assert.equal(number, Number(number.toFixed(2)));
    });

    it("returns a random float given a precision value", function() {
      var number = bluffmaster.random.float(0.001);
      assert.equal(number, Number(number.toFixed(3)));
    });

    it("returns a random number given a maximum value as Object", function() {
      var options = { max: 10 };
      assert.ok(bluffmaster.random.float(options) <= options.max);
    });

    it("returns a random number given a maximum value of 0", function() {
      var options = { max: 0 };
      assert.ok(bluffmaster.random.float(options) === 0);
    });

    it("returns a random number given a negative number minimum and maximum value of 0", function() {
      var options = { min: -100, max: 0 };
      assert.ok(bluffmaster.random.float(options) <= options.max);
    });

    it("returns a random number between a range", function() {
      var options = { min: 22, max: 33 };
      for(var i = 0; i < 5; i++) {
        var randomNumber = bluffmaster.random.float(options);
        assert.ok(randomNumber >= options.min);
        assert.ok(randomNumber <= options.max);
      }
    });

    it("provides numbers with a given precision", function() {
      var options = { min: 0, max: 1.5, precision: 0.5 };
      var results = _.chain(_.range(50))
        .map(function() {
          return bluffmaster.random.float(options);
        })
        .uniq()
        .value()
        .sort();

      assert.ok(_.includes(results, 0.5));
      assert.ok(_.includes(results, 1.0));

      assert.equal(results[0], 0);
      assert.equal(_.last(results), 1.5);

    });

    it("provides numbers with a with exact precision", function() {
      var options = { min: 0.5, max: 0.99, precision: 0.01 };
      for(var i = 0; i < 100; i++) {
        var number = bluffmaster.random.float(options);
        assert.equal(number, Number(number.toFixed(2)));
      }
    });

    it("should not modify the input object", function() {
      var min = 1;
      var max = 2;
      var opts = {
        min: min,
        max: max
      };

      bluffmaster.random.float(opts);

      assert.equal(opts.min, min);
      assert.equal(opts.max, max);
    });
  });

  describe('arrayElement', function() {
    it('returns a random element in the array', function() {
      var testArray = ['hello', 'to', 'you', 'my', 'friend'];
      assert.ok(testArray.indexOf(bluffmaster.random.arrayElement(testArray)) > -1);
    });

    it('returns a random element in the array when there is only 1', function() {
      var testArray = ['hello'];
      assert.ok(testArray.indexOf(bluffmaster.random.arrayElement(testArray)) > -1);
    });
  });

  describe('arrayElements', function() {
    it('returns a subset with random elements in the array', function() {
      var testArray = ['hello', 'to', 'you', 'my', 'friend'];
      var subset = bluffmaster.random.arrayElements(testArray);

      // Check length
      assert.ok(subset.length >= 1 && subset.length <= testArray.length);

      // Check elements
      subset.forEach(function(element) {
        assert.ok(testArray.indexOf(element) > -1);
      });

      // Check uniqueness
      subset.forEach(function(element) {
        assert.ok(!this.hasOwnProperty(element));
        this[element] = true;
      }, {});
    });

    it('returns a subset of fixed length with random elements in the array', function() {
      var testArray = ['hello', 'to', 'you', 'my', 'friend'];
      var subset = bluffmaster.random.arrayElements(testArray, 3);

      // Check length
      assert.ok(subset.length === 3);

      // Check elements
      subset.forEach(function(element) {
        assert.ok(testArray.indexOf(element) > -1);
      });

      // Check uniqueness
      subset.forEach(function(element) {
        assert.ok(!this.hasOwnProperty(element));
        this[element] = true;
      }, {});
    });
  });

  describe('UUID', function() {
    it('should generate a valid UUID', function() {
      var UUID = bluffmaster.random.uuid();
      var RFC4122 = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
      assert.ok(RFC4122.test(UUID));
    })
  })

  describe('boolean', function() {
    it('should generate a boolean value', function() {
      var bool = bluffmaster.random.boolean();
      assert.ok(typeof bool == 'boolean');
    });
  });

  describe('semver', function() {
    var semver = bluffmaster.system.semver();

    it('should generate a string', function() {
      assert.ok(typeof semver === 'string');
    });

    it('should generate a valid semver', function() {
      assert.ok(/^\d+\.\d+\.\d+$/.test(semver));
    });
  });

  describe('alpha', function() {
    var alpha = bluffmaster.random.alpha;

    it('should return single letter when no count provided', function() {
      assert.ok(alpha().length === 1);
    })

    it('should return lowercase letter when no upcase option provided', function() {
      assert.ok(alpha().match(/[a-z]/));
    })

    it('should return uppercase when upcase option is true', function() {
      assert.ok(alpha({ upcase: true }).match(/[A-Z]/));
    })

    it('should generate many random letters', function() {
      assert.ok(alpha(5).length === 5);
    })
  })

  describe('alphaNumeric', function() {
    var alphaNumeric = bluffmaster.random.alphaNumeric;

    it('should generate single character when no additional argument was provided', function() {
      assert.ok(alphaNumeric().length === 1);
    })

    it('should generate many random characters', function() {
      assert.ok(alphaNumeric(5).length === 5);
    })
  })

  describe('hexaDecimal', function() {
    var hexaDecimal = bluffmaster.random.hexaDecimal;

    it('should generate single hex character when no additional argument was provided', function() {
      var hex = hexaDecimal();
      assert.ok(hex.match(/^(0x)[0-9a-f]{1}$/i));
    })

    it('should generate a random hex string', function() {
      var hex = hexaDecimal(5);
      assert.ok(hex.match(/^(0x)[0-9a-f]+$/i));
    })
  })

  describe("mersenne twister", function() {
    it("returns a random number without given min / max arguments", function() {
      var max = 10;
      var randomNumber = mersenne.rand();
      assert.ok(typeof randomNumber === 'number');
    });

    it("throws an error when attempting to seed() a non-integer", function() {
      assert.throws(function () {
        mersenne.seed('abc');
      }, Error);
    });

    it("throws an error when attempting to seed() a non-integer", function() {
      assert.throws(function () {
        mersenne.seed_array('abc');
      }, Error);
    });
  })

});
