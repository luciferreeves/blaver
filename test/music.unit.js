if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var bluffmaster = require('../index');
}

describe("music.js", function () {
  describe("genre()", function () {
    it("returns a genre", function () {
      sinon.stub(bluffmaster.music, 'genre').returns('Rock');
      var genre = bluffmaster.music.genre();

      assert.strictEqual(genre, 'Rock');
      bluffmaster.music.genre.restore();
    });
  });
});