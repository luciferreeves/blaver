if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var _ = require('lodash');
  var blaver = require('../index');
  var mersenne = new (require('../lib/mersenne'));
}


describe("random.js", function () {
  describe("number", function() {
    it("random.number() uses datatype module and prints deprecation warning", function() {
      sinon.spy(console, 'log');
      sinon.spy(blaver.datatype, 'number');
      blaver.random.number();
      assert.ok(blaver.datatype.number.called);
      assert.ok(console.log.calledWith('Deprecation Warning: blaver.random.number is now located in blaver.datatype.number'));
      blaver.datatype.number.restore();
      console.log.restore();
    });

    it('should return deterministic results when seeded with integer', function() {
      blaver.seed(100);
      var name = blaver.name.findName();
      assert.strictEqual(name, 'Eva Jenkins');
    });

    it('should return deterministic results when seeded with 0', function() {
      blaver.seed(0);
      var name = blaver.name.findName();
      assert.strictEqual(name, 'Lola Sporer');
    });

    it('should return deterministic results when seeded with array - one element', function() {
      blaver.seed([10]);
      var name = blaver.name.findName();
      assert.strictEqual(name, 'Duane Kshlerin');
    });

    it('should return deterministic results when seeded with array - multiple elements', function() {
      blaver.seed([10, 100, 1000]);
      var name = blaver.name.findName();
      assert.strictEqual(name, 'Alma Shanahan');
    });
  });

  describe("float", function() {
    it("random.float() uses datatype module and prints deprecation warning", function() {
      sinon.spy(console, 'log');
      sinon.spy(blaver.datatype, 'float');
      blaver.random.float();
      assert.ok(blaver.datatype.float.called);
      assert.ok(console.log.calledWith('Deprecation Warning: blaver.random.float is now located in blaver.datatype.float'));
      blaver.datatype.float.restore();
      console.log.restore();
    });
  });

  describe('arrayElement', function() {
    it('returns a random element in the array', function() {
      var testArray = ['hello', 'to', 'you', 'my', 'friend'];
      assert.ok(testArray.indexOf(blaver.random.arrayElement(testArray)) > -1);
    });

    it('returns a random element in the array when there is only 1', function() {
      var testArray = ['hello'];
      assert.ok(testArray.indexOf(blaver.random.arrayElement(testArray)) > -1);
    });
  });

  describe('arrayElements', function() {
    it('returns a subset with random elements in the array', function() {
      var testArray = ['hello', 'to', 'you', 'my', 'friend'];
      var subset = blaver.random.arrayElements(testArray);

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
      var subset = blaver.random.arrayElements(testArray, 3);

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
    it("random.uuid() uses datatype module and prints deprecation warning", function() {
      sinon.spy(console, 'log');
      sinon.spy(blaver.datatype, 'uuid');
      blaver.random.uuid();
      assert.ok(blaver.datatype.uuid.called);
      assert.ok(console.log.calledWith('Deprecation Warning: blaver.random.uuid is now located in blaver.datatype.uuid'));
      blaver.datatype.uuid.restore();
      console.log.restore();
    });
  });

  describe('boolean', function() {
    it("random.boolean() uses datatype module and prints deprecation warning", function() {
      sinon.spy(console, 'log');
      sinon.spy(blaver.datatype, 'boolean');
      blaver.random.boolean();
      assert.ok(blaver.datatype.boolean.called);
      assert.ok(console.log.calledWith('Deprecation Warning: blaver.random.boolean is now located in blaver.datatype.boolean'));
      blaver.datatype.boolean.restore();
      console.log.restore();
    });
  });

  describe('semver', function() {
    var semver = blaver.system.semver();

    it('should generate a string', function() {
      assert.ok(typeof semver === 'string');
    });

    it('should generate a valid semver', function() {
      assert.ok(/^\d+\.\d+\.\d+$/.test(semver));
    });
  });

  describe('alpha', function() {
    var alpha = blaver.random.alpha;

    it('should return single letter when no count provided', function() {
      assert.ok(alpha().length === 1);
    });

    it('should return lowercase letter when no upcase option provided', function() {
      assert.ok(alpha().match(/[a-z]/));
    });

    it('should return uppercase when upcase option is true', function() {
      assert.ok(alpha({ upcase: true }).match(/[A-Z]/));
    });

    it('should generate many random letters', function() {
      assert.ok(alpha(5).length === 5);
    });

    it('should be able to ban some characters', function() {
      var alphaText = alpha(5,{bannedChars:['a', 'p']});
      assert.ok(alphaText.length === 5);
      assert.ok(alphaText.match(/[b-oq-z]/));
    });
    it('should be able handle mistake in banned characters array', function() {
      var alphaText = alpha(5,{bannedChars:['a', 'a', 'p']});
      assert.ok(alphaText.length === 5);
      assert.ok(alphaText.match(/[b-oq-z]/));
    });
  });

  describe('alphaNumeric', function() {
    var alphaNumeric = blaver.random.alphaNumeric;

    it('should generate single character when no additional argument was provided', function() {
      assert.ok(alphaNumeric().length === 1);
    });

    it('should generate many random characters', function() {
      assert.ok(alphaNumeric(5).length === 5);
    });

    it('should be able to ban some characters', function() {
      var alphaText = alphaNumeric(5,{bannedChars:['a','p']});
      assert.ok(alphaText.length === 5);
      assert.ok(alphaText.match(/[b-oq-z]/));
    });
    it('should be able handle mistake in banned characters array', function() {
      var alphaText = alphaNumeric(5,{bannedChars:['a','p','a']});
      assert.ok(alphaText.length === 5);
      assert.ok(alphaText.match(/[b-oq-z]/));
    });
  });

  describe('hexaDecimal', function() {
    it("random.hexaDecimal() uses datatype module and prints deprecation warning", function() {
      sinon.spy(console, 'log');
      sinon.spy(blaver.datatype, 'hexaDecimal');
      blaver.random.hexaDecimal();
      assert.ok(blaver.datatype.hexaDecimal.called);
      assert.ok(console.log.calledWith('Deprecation Warning: blaver.random.hexaDecimal is now located in blaver.datatype.hexaDecimal'));
      blaver.datatype.hexaDecimal.restore();
      console.log.restore();
    });
  });

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
  });

});