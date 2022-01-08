/**
 *
 * @namespace blaver.commerce
 */
const Commerce = function (blaver) {
  /**
   * color
   *
   * @method blaver.commerce.color
   */
  this.color = function () {
    return blaver.random.arrayElement(
      blaver.definitions.commerce.color
    );
  };

  /**
   * department
   *
   * @method blaver.commerce.department
   */
  this.department = function () {
    return blaver.random.arrayElement(
      blaver.definitions.commerce.department
    );
  };

  /**
   * productName
   *
   * @method blaver.commerce.productName
   */
  this.productName = function () {
    return `${blaver.commerce.productAdjective()} ${blaver.commerce.productMaterial()} ${blaver.commerce.product()}`;
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
  this.price = function (min = 1, max = 1000, dec = 2, symbol = "") {
    if (min < 0 || max < 0) {
      return symbol + 0.0;
    }

    const randValue = blaver.datatype.number({ max: max, min: min });

    return (
      symbol + (
        Math.round(randValue * Math.pow(10, dec)) / Math.pow(10, dec)
      ).toFixed(dec)
    );
  };

  /**
   * productAdjective
   *
   * @method blaver.commerce.productAdjective
   */
  this.productAdjective = function () {
    return blaver.random.arrayElement(
      blaver.definitions.commerce.product_name.adjective
    );
  };

  /**
   * productMaterial
   *
   * @method blaver.commerce.productMaterial
   */
  this.productMaterial = function () {
    return blaver.random.arrayElement(
      blaver.definitions.commerce.product_name.material
    );
  };

  /**
   * product
   *
   * @method blaver.commerce.product
   */
  this.product = function () {
    return blaver.random.arrayElement(
      blaver.definitions.commerce.product_name.product
    );
  };

  /**
   * productDescription
   *
   * @method blaver.commerce.productDescription
   */
  this.productDescription = function () {
    return blaver.random.arrayElement(
      blaver.definitions.commerce.product_description
    );
  };

  return this;
};

module.exports = Commerce;
