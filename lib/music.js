/**
 *
 * @namespace bluffmaster.music
 */
var Music = function (bluffmaster) {
  var self = this;
  /**
     * genre
     *
     * @method bluffmaster.music.genre
     */
  self.genre = function () {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.music.genre);
  };

  self.genre.schema = {
    "description": "Generates a genre.",
    "sampleResults": ["Rock", "Metal", "Pop"]
  };
};

module["exports"] = Music;
