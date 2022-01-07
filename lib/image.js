/**
 *
 * @namespace blaver.image
 * @property {object} lorempixel - blaver.image.lorempixel
 * @property {object} unsplash - blaver.image.unsplash
 * @property {object} unsplash - blaver.image.lorempicsum
 * @default Default provider is unsplash image provider
 */
const Image = function (blaver) {
  const self = this;
  const Lorempixel = require("./image_providers/lorempixel");
  const Unsplash = require("./image_providers/unsplash");
  const LoremPicsum = require("./image_providers/lorempicsum");

  /**
   * image
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.image
   */
  self.image = function (width, height, randomize) {
    const categories = [
      "abstract",
      "animals",
      "business",
      "cats",
      "city",
      "food",
      "nightlife",
      "fashion",
      "people",
      "nature",
      "sports",
      "technics",
      "transport",
    ];
    return self[blaver.random.arrayElement(categories)](
      width,
      height,
      randomize
    );
  };
  /**
   * avatar
   *
   * @method blaver.image.avatar
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
   * @method blaver.image.imageUrl
   */
  self.imageUrl = function (width, height, category, randomize, https) {
    const localWidth = width || 640;
    const localHeight = height || 480;
    const protocol = "http://";
    if (typeof https !== "undefined" && https === true) {
      protocol = "https://";
    }
    let url = protocol + "placeimg.com/" + localWidth + "/" + localHeight;
    if (typeof category !== "undefined") {
      url += "/" + category;
    }

    if (randomize) {
      url += "?" + blaver.datatype.number();
    }

    return url;
  };
  /**
   * abstract
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.abstract
   */
  self.abstract = function (width, height, randomize) {
    return blaver.image.imageUrl(width, height, "abstract", randomize);
  };
  /**
   * animals
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.animals
   */
  self.animals = function (width, height, randomize) {
    return blaver.image.imageUrl(width, height, "animals", randomize);
  };
  /**
   * business
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.business
   */
  self.business = function (width, height, randomize) {
    return blaver.image.imageUrl(width, height, "business", randomize);
  };
  /**
   * cats
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.cats
   */
  self.cats = function (width, height, randomize) {
    return blaver.image.imageUrl(width, height, "cats", randomize);
  };
  /**
   * city
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.city
   */
  self.city = function (width, height, randomize) {
    return blaver.image.imageUrl(width, height, "city", randomize);
  };
  /**
   * food
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.food
   */
  self.food = function (width, height, randomize) {
    return blaver.image.imageUrl(width, height, "food", randomize);
  };
  /**
   * nightlife
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.nightlife
   */
  self.nightlife = function (width, height, randomize) {
    return blaver.image.imageUrl(width, height, "nightlife", randomize);
  };
  /**
   * fashion
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.fashion
   */
  self.fashion = function (width, height, randomize) {
    return blaver.image.imageUrl(width, height, "fashion", randomize);
  };
  /**
   * people
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.people
   */
  self.people = function (width, height, randomize) {
    return blaver.image.imageUrl(width, height, "people", randomize);
  };
  /**
   * nature
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.nature
   */
  self.nature = function (width, height, randomize) {
    return blaver.image.imageUrl(width, height, "nature", randomize);
  };
  /**
   * sports
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.sports
   */
  self.sports = function (width, height, randomize) {
    return blaver.image.imageUrl(width, height, "sports", randomize);
  };
  /**
   * technics
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.technics
   */
  self.technics = function (width, height, randomize) {
    return blaver.image.imageUrl(width, height, "technics", randomize);
  };
  /**
   * transport
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method blaver.image.transport
   */
  self.transport = function (width, height, randomize) {
    return blaver.image.imageUrl(width, height, "transport", randomize);
  };
  /**
   * dataUri
   *
   * @param {number} width
   * @param {number} height
   * @param {string} color
   * @method blaver.image.dataUri
   */
  self.dataUri = function (width, height, color) {
    color = color || "grey";
    const svgString =
      '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width="' +
      width +
      '" height="' +
      height +
      '"><rect width="100%" height="100%" fill="' +
      color +
      '"/><text x="' +
      width / 2 +
      '" y="' +
      height / 2 +
      '" font-size="20" alignment-baseline="middle" text-anchor="middle" fill="white">' +
      width +
      "x" +
      height +
      "</text></svg>";
    const rawPrefix = "data:image/svg+xml;charset=UTF-8,";
    return rawPrefix + encodeURIComponent(svgString);
  };

  self.lorempixel = new Lorempixel(blaver);
  self.unsplash = new Unsplash(blaver);
  self.lorempicsum = new LoremPicsum(blaver);

  // Object.assign(self, self.unsplash);
  // How to set default as unsplash? should be image.default?
};

module.exports = Image;
