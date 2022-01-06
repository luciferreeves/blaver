/**
 *
 * @namespace bluffmaster.commerce
 */
var Commerce = function (bluffmaster) {
  var self = this;

  /**
   * color
   *
   * @method bluffmaster.commerce.color
   */
  self.color = function() {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.commerce.color);
  };

  /**
   * department
   *
   * @method bluffmaster.commerce.department
   */
  self.department = function() {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.commerce.department);
  };

  /**
   * productName
   *
   * @method bluffmaster.commerce.productName
   */
  self.productName = function() {
    return bluffmaster.commerce.productAdjective() + " " +
              bluffmaster.commerce.productMaterial() + " " +
              bluffmaster.commerce.product();
  };

  /**
   * price
   *
   * @method bluffmaster.commerce.price
   * @param {number} min
   * @param {number} max
   * @param {number} dec
   * @param {string} symbol
   *
   * @return {string}
   */
  self.price = function(min, max, dec, symbol) {
    min = min || 1;
    max = max || 1000;
    dec = dec === undefined ? 2 : dec;
    symbol = symbol || '';

    if (min < 0 || max < 0) {
      return symbol + 0.00;
    }

    var randValue = bluffmaster.datatype.number({ max: max, min: min });

    return symbol + (Math.round(randValue * Math.pow(10, dec)) / Math.pow(10, dec)).toFixed(dec);
  };

  /*
  self.categories = function(num) {
      var categories = [];

      do {
          var category = bluffmaster.random.arrayElement(bluffmaster.definitions.commerce.department);
          if(categories.indexOf(category) === -1) {
              categories.push(category);
          }
      } while(categories.length < num);

      return categories;
  };

  */
  /*
  self.mergeCategories = function(categories) {
      var separator = bluffmaster.definitions.separator || " &";
      // TODO: find undefined here
      categories = categories || bluffmaster.definitions.commerce.categories;
      var commaSeparated = categories.slice(0, -1).join(', ');

      return [commaSeparated, categories[categories.length - 1]].join(separator + " ");
  };
  */

  /**
   * productAdjective
   *
   * @method bluffmaster.commerce.productAdjective
   */
  self.productAdjective = function() {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.commerce.product_name.adjective);
  };

  /**
   * productMaterial
   *
   * @method bluffmaster.commerce.productMaterial
   */
  self.productMaterial = function() {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.commerce.product_name.material);
  };

  /**
   * product
   *
   * @method bluffmaster.commerce.product
   */
  self.product = function() {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.commerce.product_name.product);
  };

  /**
   * productDescription
   *
   * @method bluffmaster.commerce.productDescription
   */
  self.productDescription = function() {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.commerce.product_description);
  };

  return self;
};

module['exports'] = Commerce;
