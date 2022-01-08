/**
 * @namespace blaver.music
 */
const Music = function (blaver) {
  /**
   * genre
   *
   * @method blaver.music.genre
   */
  this.genre = function () {
    return blaver.random.arrayElement(blaver.definitions.music.genre);
  };

  this.genre.schema = {
    description: "Generates a genre.",
    sampleResults: ["Rock", "Metal", "Pop"]
  };
};

module.exports = Music;
