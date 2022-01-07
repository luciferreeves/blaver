/**
 *
 * @namespace blaver.commerce
 */
var Commerce = function (blaver) {
  var self = this;

  /**
   * color
   *
   * @method blaver.commerce.color
   */
  self.color = function () {
    return blaver.random.arrayElement(
      blaver.definitions.commerce.color
    );
  };

  /**
   * department
   *
   * @method blaver.commerce.department
   */
  self.department = function () {
    return blaver.random.arrayElement(
      blaver.definitions.commerce.department
    );
  };

  /**
   * productName
   *
   * @method blaver.commerce.productName
   */
  self.productName = function () {
    return (
      blaver.commerce.productAdjective() +
      " " +
      blaver.commerce.productMaterial() +
      " " +
      blaver.commerce.product()
    );
  };

  /**
   * price
   *
   * @method blaver.commerce.price
   * @param {number} min
   * @param {number} max
   * @param {number} dec
   * @param {string} symbol
   *
   * @return {string}
   */
  self.price = function (min, max, dec, symbol) {
    min = min || 1;
    max = max || 1000;
    dec = dec === undefined ? 2 : dec;
    symbol = symbol || "";

    if (min < 0 || max < 0) {
      return symbol + 0.0;
    }

    var randValue = blaver.datatype.number({ max: max, min: min });

    return (
      symbol +
      (Math.round(randValue * Math.pow(10, dec)) / Math.pow(10, dec)).toFixed(
        dec
      )
    );
  };

  /*
  self.categories = function(num) {
      var categories = [];

      do {
          var category = blaver.random.arrayElement(blaver.definitions.commerce.department);
          if(categories.indexOf(category) === -1) {
              categories.push(category);
          }
      } while(categories.length < num);

      return categories;
  };

  */
  /*
  self.mergeCategories = function(categories) {
      var separator = blaver.definitions.separator || " &";
      // TODO: find undefined here
      categories = categories || blaver.definitions.commerce.categories;
      var commaSeparated = categories.slice(0, -1).join(', ');

      return [commaSeparated, categories[categories.length - 1]].join(separator + " ");
  };
  */

  /**
   * productAdjective
   *
   * @method blaver.commerce.productAdjective
   */
  self.productAdjective = function () {
    return blaver.random.arrayElement(
      blaver.definitions.commerce.product_name.adjective
    );
  };

  /**
   * productMaterial
   *
   * @method blaver.commerce.productMaterial
   */
  self.productMaterial = function () {
    return blaver.random.arrayElement(
      blaver.definitions.commerce.product_name.material
    );
  };

  /**
   * product
   *
   * @method blaver.commerce.product
   */
  self.product = function () {
    return blaver.random.arrayElement(
      blaver.definitions.commerce.product_name.product
    );
  };

  /**
   * productDescription
   *
   * @method blaver.commerce.productDescription
   */
  self.productDescription = function () {
    return blaver.random.arrayElement(
      blaver.definitions.commerce.product_description
    );
  };

  return self;
};

module["exports"] = Commerce;
