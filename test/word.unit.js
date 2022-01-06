if (typeof module !== "undefined") {
  var assert = require("assert");
  var bluffmaster = require("../index");
}
  
describe("word.js", function () {
  var methods = [
    "adjective",
    "adverb",
    "conjunction",
    "interjection",
    "noun",
    "preposition",
    "verb",
  ];
    // Perform the same three tests for each method.
  methods.forEach(function (method) {
    describe(method + "()", function () {
      it("returns random value from " + method + " array", function () {
        var word = bluffmaster.word[method]();
        assert.ok(bluffmaster.definitions.word[method].includes(word));
      });
      it("optional length parameter returns expected result", function () {
        var wordLength = 5;
        var word = bluffmaster.word[method](wordLength);
        assert.ok(bluffmaster.definitions.word[method].includes(word));
        assert.ok(word.length == wordLength);
      });
      it("unresolvable optional length returns random " + method, function () {
        var wordLength = 1000;
        var word = bluffmaster.word[method](wordLength);
        assert.ok(bluffmaster.definitions.word[method].includes(word));
      });
    });
  });
});