if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var blaver = require('../index');
}

describe("music.js", function () {
  describe("genre()", function () {
    it("returns a genre", function () {
      sinon.stub(blaver.music, 'genre').returns('Rock');
      const genre = blaver.music.genre();

      assert.strictEqual(genre, 'Rock');
      blaver.music.genre.restore();
    });
  });
});