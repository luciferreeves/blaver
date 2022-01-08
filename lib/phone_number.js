/**
 *
 * @namespace blaver.phone
 */
const Phone = function (blaver) {
  /**
   * phoneNumber
   *
   * @method blaver.phone.phoneNumber
   * @param {string} format
   * @memberOf blaver.phone
   */
  this.phoneNumber = function (format) {
    format = format || blaver.phone.phoneFormats();
    return blaver.helpers.replaceSymbolWithNumber(format);
  };

  // FIXME: this is strange passing in an array index.
  /**
   * phoneNumberFormat
   *
   * @method blaver.phone.phoneFormatsArrayIndex
   * @param phoneFormatsArrayIndex
   * @memberOf blaver.phone
   */
  this.phoneNumberFormat = function (phoneFormatsArrayIndex) {
    phoneFormatsArrayIndex = phoneFormatsArrayIndex || 0;
    return blaver.helpers.replaceSymbolWithNumber(
      blaver.definitions.phone_number.formats[phoneFormatsArrayIndex]
    );
  };

  /**
   * phoneFormats
   *
   * @method blaver.phone.phoneFormats
   */
  this.phoneFormats = function () {
    return blaver.random.arrayElement(
      blaver.definitions.phone_number.formats
    );
  };

  return this;
};

module.exports = Phone;
