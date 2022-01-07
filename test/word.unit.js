if (typeof module !== "undefined") {
  var assert = require("assert");
  var blaver = require("../index");
}
  
describe("word.js", function () {
  const methods = [
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
        const word = blaver.word[method]();
        assert.ok(blaver.definitions.word[method].includes(word));
      });
      it("optional length parameter returns expected result", function () {
        const wordLength = 5;
        const word = blaver.word[method](wordLength);
        assert.ok(blaver.definitions.word[method].includes(word));
        assert.ok(word.length == wordLength);
      });
      it("unresolvable optional length returns random " + method, function () {
        const wordLength = 1000;
        const word = blaver.word[method](wordLength);
        assert.ok(blaver.definitions.word[method].includes(word));
      });
    });
  });
});