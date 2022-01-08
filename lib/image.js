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
  this.image = function (width, height, randomize) {
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
      "transport"
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
  this.avatar = function () {
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
  this.imageUrl = function (width, height, category, randomize, https) {
    const localWidth = width || 640;
    const localHeight = height || 480;
    let protocol = "http://";
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
  this.abstract = function (width, height, randomize) {
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
  this.animals = function (width, height, randomize) {
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
  this.business = function (width, height, randomize) {
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
  this.cats = function (width, height, randomize) {
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
  this.city = function (width, height, randomize) {
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
  this.food = function (width, height, randomize) {
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
  this.nightlife = function (width, height, randomize) {
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
  this.fashion = function (width, height, randomize) {
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
  this.people = function (width, height, randomize) {
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
  this.nature = function (width, height, randomize) {
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
  this.sports = function (width, height, randomize) {
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
  this.technics = function (width, height, randomize) {
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
  this.transport = function (width, height, randomize) {
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
  this.dataUri = function (width, height, color) {
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

  this.lorempixel = new Lorempixel(blaver);
  this.unsplash = new Unsplash(blaver);
  this.lorempicsum = new LoremPicsum(blaver);

  // Object.assign(self, this.unsplash);
  // How to set default as unsplash? should be image.default?
};

module.exports = Image;
