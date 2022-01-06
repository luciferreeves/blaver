/**
 *
 * @namespace lorempixel
 * @memberof bluffmaster.image
 */
var Lorempixel = function (bluffmaster) {

  var self = this;

  /**
   * image
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method bluffmaster.image.lorempixel.image
   */
  self.image = function (width, height, randomize) {
    var categories = ["abstract", "animals", "business", "cats", "city", "food", "nightlife", "fashion", "people", "nature", "sports", "technics", "transport"];
    return self[bluffmaster.random.arrayElement(categories)](width, height, randomize);
  };
  /**
   * avatar
   *
   * @method bluffmaster.image.lorempixel.avatar
   */
  self.avatar = function () {
    return bluffmaster.internet.avatar();
  };
  /**
   * imageUrl
   *
   * @param {number} width
   * @param {number} height
   * @param {string} category
   * @param {boolean} randomize
   * @method bluffmaster.image.lorempixel.imageUrl
   */
  self.imageUrl = function (width, height, category, randomize) {
      var width = width || 640;
      var height = height || 480;

      var url ='https://lorempixel.com/' + width + '/' + height;
      if (typeof category !== 'undefined') {
        url += '/' + category;
      }

      if (randomize) {
        url += '?' + bluffmaster.datatype.number()
      }

      return url;
  };
  /**
   * abstract
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method bluffmaster.image.lorempixel.abstract
   */
  self.abstract = function (width, height, randomize) {
    return bluffmaster.image.lorempixel.imageUrl(width, height, 'abstract', randomize);
  };
  /**
   * animals
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method bluffmaster.image.lorempixel.animals
   */
  self.animals = function (width, height, randomize) {
    return bluffmaster.image.lorempixel.imageUrl(width, height, 'animals', randomize);
  };
  /**
   * business
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method bluffmaster.image.lorempixel.business
   */
  self.business = function (width, height, randomize) {
    return bluffmaster.image.lorempixel.imageUrl(width, height, 'business', randomize);
  };
  /**
   * cats
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method bluffmaster.image.lorempixel.cats
   */
  self.cats = function (width, height, randomize) {
    return bluffmaster.image.lorempixel.imageUrl(width, height, 'cats', randomize);
  };
  /**
   * city
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method bluffmaster.image.lorempixel.city
   */
  self.city = function (width, height, randomize) {
    return bluffmaster.image.lorempixel.imageUrl(width, height, 'city', randomize);
  };
  /**
   * food
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method bluffmaster.image.lorempixel.food
   */
  self.food = function (width, height, randomize) {
    return bluffmaster.image.lorempixel.imageUrl(width, height, 'food', randomize);
  };
  /**
   * nightlife
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method bluffmaster.image.lorempixel.nightlife
   */
  self.nightlife = function (width, height, randomize) {
    return bluffmaster.image.lorempixel.imageUrl(width, height, 'nightlife', randomize);
  };
  /**
   * fashion
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method bluffmaster.image.lorempixel.fashion
   */
  self.fashion = function (width, height, randomize) {
    return bluffmaster.image.lorempixel.imageUrl(width, height, 'fashion', randomize);
  };
  /**
   * people
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method bluffmaster.image.lorempixel.people
   */
  self.people = function (width, height, randomize) {
    return bluffmaster.image.lorempixel.imageUrl(width, height, 'people', randomize);
  };
  /**
   * nature
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method bluffmaster.image.lorempixel.nature
   */
  self.nature = function (width, height, randomize) {
    return bluffmaster.image.lorempixel.imageUrl(width, height, 'nature', randomize);
  };
  /**
   * sports
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method bluffmaster.image.lorempixel.sports
   */
  self.sports = function (width, height, randomize) {
    return bluffmaster.image.lorempixel.imageUrl(width, height, 'sports', randomize);
  };
  /**
   * technics
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method bluffmaster.image.lorempixel.technics
   */
  self.technics = function (width, height, randomize) {
    return bluffmaster.image.lorempixel.imageUrl(width, height, 'technics', randomize);
  };
  /**
   * transport
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method bluffmaster.image.lorempixel.transport
   */
  self.transport = function (width, height, randomize) {
    return bluffmaster.image.lorempixel.imageUrl(width, height, 'transport', randomize);
  }
}

module["exports"] = Lorempixel;
