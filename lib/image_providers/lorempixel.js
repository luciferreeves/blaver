/**
 *
 * @namespace lorempixel
 * @memberof blaver.image
 */
var Lorempixel = function (blaver) {

  var self = this;

  /**
   * image
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.lorempixel.image
   */
  self.image = function (width, height, randomize) {
    var categories = ["abstract", "animals", "business", "cats", "city", "food", "nightlife", "fashion", "people", "nature", "sports", "technics", "transport"];
    return self[blaver.random.arrayElement(categories)](width, height, randomize);
  };
  /**
   * avatar
   *
   * @method blaver.image.lorempixel.avatar
   */
  self.avatar = function () {
    return blaver.internet.avatar();
  };
  /**
   * imageUrl
   *
   * @param {number} width
   * @param {number} height
   * @param {string} category
   * @param {boolean} randomize
   * @method blaver.image.lorempixel.imageUrl
   */
  self.imageUrl = function (width, height, category, randomize) {
    var width = width || 640;
    var height = height || 480;

    var url ='https://lorempixel.com/' + width + '/' + height;
    if (typeof category !== 'undefined') {
      url += '/' + category;
    }

    if (randomize) {
      url += '?' + blaver.datatype.number()
    }

    return url;
  };
  /**
   * abstract
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.lorempixel.abstract
   */
  self.abstract = function (width, height, randomize) {
    return blaver.image.lorempixel.imageUrl(width, height, 'abstract', randomize);
  };
  /**
   * animals
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.lorempixel.animals
   */
  self.animals = function (width, height, randomize) {
    return blaver.image.lorempixel.imageUrl(width, height, 'animals', randomize);
  };
  /**
   * business
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.lorempixel.business
   */
  self.business = function (width, height, randomize) {
    return blaver.image.lorempixel.imageUrl(width, height, 'business', randomize);
  };
  /**
   * cats
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.lorempixel.cats
   */
  self.cats = function (width, height, randomize) {
    return blaver.image.lorempixel.imageUrl(width, height, 'cats', randomize);
  };
  /**
   * city
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.lorempixel.city
   */
  self.city = function (width, height, randomize) {
    return blaver.image.lorempixel.imageUrl(width, height, 'city', randomize);
  };
  /**
   * food
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.lorempixel.food
   */
  self.food = function (width, height, randomize) {
    return blaver.image.lorempixel.imageUrl(width, height, 'food', randomize);
  };
  /**
   * nightlife
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.lorempixel.nightlife
   */
  self.nightlife = function (width, height, randomize) {
    return blaver.image.lorempixel.imageUrl(width, height, 'nightlife', randomize);
  };
  /**
   * fashion
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.lorempixel.fashion
   */
  self.fashion = function (width, height, randomize) {
    return blaver.image.lorempixel.imageUrl(width, height, 'fashion', randomize);
  };
  /**
   * people
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.lorempixel.people
   */
  self.people = function (width, height, randomize) {
    return blaver.image.lorempixel.imageUrl(width, height, 'people', randomize);
  };
  /**
   * nature
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.lorempixel.nature
   */
  self.nature = function (width, height, randomize) {
    return blaver.image.lorempixel.imageUrl(width, height, 'nature', randomize);
  };
  /**
   * sports
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.lorempixel.sports
   */
  self.sports = function (width, height, randomize) {
    return blaver.image.lorempixel.imageUrl(width, height, 'sports', randomize);
  };
  /**
   * technics
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.lorempixel.technics
   */
  self.technics = function (width, height, randomize) {
    return blaver.image.lorempixel.imageUrl(width, height, 'technics', randomize);
  };
  /**
   * transport
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.lorempixel.transport
   */
  self.transport = function (width, height, randomize) {
    return blaver.image.lorempixel.imageUrl(width, height, 'transport', randomize);
  }
}

module["exports"] = Lorempixel;
