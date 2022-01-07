/**
 *
 * @namespace blaver.phone
 */
var Phone = function (blaver) {
  var self = this;

  /**
   * phoneNumber
   *
   * @method blaver.phone.phoneNumber
   * @param {string} format
   * @memberOf blaver.phone
   */
  self.phoneNumber = function (format) {
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
  self.phoneNumberFormat = function (phoneFormatsArrayIndex) {
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
  self.phoneFormats = function () {
    return blaver.random.arrayElement(
      blaver.definitions.phone_number.formats
    );
  };

  return self;
};

module["exports"] = Phone;
