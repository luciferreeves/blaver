/**
 *
 * @namespace blaver.music
 */
const Music = function (blaver) {
  const self = this;
  /**
   * genre
   *
   * @method blaver.music.genre
   */
  self.genre = function () {
    return blaver.random.arrayElement(blaver.definitions.music.genre);
  };

  self.genre.schema = {
    description: "Generates a genre.",
    sampleResults: ["Rock", "Metal", "Pop"],
  };
};

module.exports = Music;
