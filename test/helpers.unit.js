/* eslint-disable no-undef */
if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var blaver = require('../index');
}

describe("helpers.js", function () {
  describe("replaceSymbolWithNumber()", function () {
    context("when no symbol passed in", function () {
      it("uses '#' by default", function () {
        const num = blaver.helpers.replaceSymbolWithNumber('#AB');
        assert.ok(num.match(/\dAB/));
      });
    });

    context("when symbol passed in", function () {
      it("replaces that symbol with integers", function () {
        const num = blaver.helpers.replaceSymbolWithNumber('#AB', 'A');
        assert.ok(num.match(/#\dB/));
      });
    });
  });

  describe("replaceSymbols()", function () {
    context("when '*' passed", function () {
      it("replaces it with alphanumeric", function(){
        const num = blaver.helpers.replaceSymbols('*AB');
        assert.ok(num.match(/\wAB/));
      });
    });
  });

  describe("shuffle()", function () {
    it("the output is the same length as the input", function () {
      sinon.spy(blaver.datatype, 'number');
      const shuffled = blaver.helpers.shuffle(["a", "b"]);
      assert.ok(shuffled.length === 2);
      assert.ok(blaver.datatype.number.calledWith(1));
      blaver.datatype.number.restore();
    });

    it("empty array returns empty array", function () {
      const shuffled = blaver.helpers.shuffle([]);
      assert.ok(shuffled.length === 0);
    });

    it("mutates the input array in place", function () {
      const input = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
      const shuffled = blaver.helpers.shuffle(input);
      assert.deepStrictEqual(shuffled, input);
    });

    it("all items shuffled as expected when seeded", function () {
      const input = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
      blaver.seed(100);
      const shuffled = blaver.helpers.shuffle(input);
      assert.deepStrictEqual(shuffled, ["b", "e", "a", "d", "j", "i", "h", "c", "g", "f"]);
    });
  });

  describe("uniqueArray()", function () {
    it("custom array returns unique array", function () {
      const input = ["a", "a", "a", "a,", "a", "a", "a", "a", "b"];
      const length = 2;
      const unique = blaver.helpers.uniqueArray(input, length);
      assert.strictEqual(unique.length, length);
      assert.strictEqual(new Set(unique).size, length);
    });

    it("definition array returns unique array", function () {
      const length = blaver.datatype.number({ min: 1, max: 6 });
      const unique = blaver.helpers.uniqueArray(blaver.definitions.hacker.noun, length);
      assert.strictEqual(unique.length, length);
      assert.strictEqual(new Set(unique).size, length);
    });

    it("function returns unique array", function () {
      const length = blaver.datatype.number({ min: 1, max: 6 });
      const unique = blaver.helpers.uniqueArray(blaver.lorem.word, length);
      assert.strictEqual(unique.length, length);
      assert.strictEqual(new Set(unique).size, length);
    });

    it("empty array returns empty array", function () {
      const input = [];
      const length = blaver.datatype.number({ min: 1, max: 6 });
      const unique = blaver.helpers.uniqueArray(input, length);
      assert.strictEqual(unique.length, input.length);
      assert.strictEqual(new Set(unique).size, input.length);
    });

    it("length longer than source returns max length", function () {
      const input = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
      const length = input.length + 1;
      const unique = blaver.helpers.uniqueArray(input, length);
      assert.strictEqual(unique.length, input.length);
      assert.strictEqual(new Set(unique).size, input.length);
    });

    it("works as expected when seeded", function () {
      const input = ["a", "a", "a", "a", "a", "f", "g", "h", "i", "j"];
      const length = 5;
      blaver.seed(100);
      const unique = blaver.helpers.uniqueArray(input, length);
      assert.deepStrictEqual(unique, ["g", "a", "i", "f", "j"]);
    });
  });

  describe("slugify()", function () {
    it("removes unwanted characters from URI string", function () {
      assert.strictEqual(blaver.helpers.slugify("Aiden.Harªann"), "Aiden.Harann");
      assert.strictEqual(blaver.helpers.slugify("d'angelo.net"), "dangelo.net");
    });
  });

  describe("mustache()", function () {
    it("returns empty string with no arguments", function () {
      assert.strictEqual(blaver.helpers.mustache(), "");
    });
  });

  describe("repeatString()", function () {
    it("returns empty string with no arguments", function () {
      assert.strictEqual(blaver.helpers.repeatString(), "");
    });
  });

  describe("replaceSymbols()", function () {
    it("returns empty string with no arguments", function () {
      assert.strictEqual(blaver.helpers.replaceSymbols(), "");
    });
  });

  /*
    describe("replaceCreditCardSymbols()", function () {
        it("returns empty string with no arguments", function () {
            assert.equal(blaver.helpers.replaceCreditCardSymbols(), "");
        });
    });
    */

  describe("createCard()", function () {
    it("returns an object", function () {
      const card = blaver.helpers.createCard();
      assert.ok(typeof card === 'object');
    });
  });

  describe("contextualCard()", function () {
    it("returns an object", function () {
      const card = blaver.helpers.contextualCard();
      assert.ok(typeof card === 'object');
    });
  });

  describe("userCard()", function () {
    it("returns an object", function () {
      const card = blaver.helpers.userCard();
      assert.ok(typeof card === 'object');
    });
  });

  // Make sure we keep this function for backward-compatibility.
  describe("randomize()", function () {
    it("returns a random element from an array", function () {
      const arr = ['a', 'b', 'c'];
      const elem = blaver.helpers.randomize(arr);
      assert.ok(elem);
      assert.ok(arr.indexOf(elem) !== -1);
    });
  });

  describe("replaceCreditCardSymbols()", function () {
    const luhnCheck = require("./support/luhnCheck.js");
    it("returns a credit card number given a schema", function () {
      const number = blaver.helpers.replaceCreditCardSymbols("6453-####-####-####-###L");
      assert.ok(number.match(/^6453\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}$/));
      assert.ok(luhnCheck(number));
    });
    it("supports different symbols", function () {
      const number = blaver.helpers.replaceCreditCardSymbols("6453-****-****-****-***L","*");
      assert.ok(number.match(/^6453\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}$/));
      assert.ok(luhnCheck(number));
    });
    it("handles regexp style input", function () {
      let number = blaver.helpers.replaceCreditCardSymbols("6453-*{4}-*{4}-*{4}-*{3}L","*");
      assert.ok(number.match(/^6453\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}$/));
      assert.ok(luhnCheck(number));
      number = blaver.helpers.replaceCreditCardSymbols("645[5-9]-#{4,6}-#{1,2}-#{4,6}-#{3}L");
      assert.ok(number.match(/^645[5-9]\-([0-9]){4,6}\-([0-9]){1,2}\-([0-9]){4,6}\-([0-9]){4}$/));
      assert.ok(luhnCheck(number));
    });
  });

  describe("regexpStyleStringParse()", function () {
    it("returns an empty string when called without param", function () {
      assert.ok(blaver.helpers.regexpStyleStringParse() === "");
    });
    it("deals with range repeat", function () {
      const string = blaver.helpers.regexpStyleStringParse("#{5,10}");
      assert.ok(string.length <= 10 && string.length >= 5);
      assert.ok(string.match(/^\#{5,10}$/));
    });
    it("flips the range when min > max", function () {
      const string = blaver.helpers.regexpStyleStringParse("#{10,5}");
      assert.ok(string.length <= 10 && string.length >= 5);
      assert.ok(string.match(/^\#{5,10}$/));
    });
    it("repeats string {n} number of times", function () {
      assert.ok(blaver.helpers.regexpStyleStringParse("%{10}") === blaver.helpers.repeatString("%",10));
      assert.ok(blaver.helpers.regexpStyleStringParse("%{30}") === blaver.helpers.repeatString("%",30));
      assert.ok(blaver.helpers.regexpStyleStringParse("%{5}") === blaver.helpers.repeatString("%",5));
    });
    it("creates a numerical range", function () {
      const string = blaver.helpers.regexpStyleStringParse("Hello[0-9]");
      assert.ok(string.match(/^Hello[0-9]$/));
    });
    it("deals with multiple tokens in one string", function () {
      const string = blaver.helpers.regexpStyleStringParse("Test#{5}%{2,5}Testing**[1-5]**{10}END");
      assert.ok(string.match(/^Test\#{5}%{2,5}Testing\*\*[1-5]\*\*{10}END$/));
    });
  });

  describe("createTransaction()", function() {
    it("should create a random transaction", function() {
      const transaction = blaver.helpers.createTransaction();
      assert.ok(transaction);
      assert.ok(transaction.amount);
      assert.ok(transaction.date);
      assert.ok(transaction.business);
      assert.ok(transaction.name);
      assert.ok(transaction.type);
      assert.ok(transaction.account);
    });
  });
});
