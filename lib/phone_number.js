/**
 *
 * @namespace bluffmaster.phone
 */
var Phone = function (bluffmaster) {
  var self = this;

  /**
   * phoneNumber
   *
   * @method bluffmaster.phone.phoneNumber
   * @param {string} format
   * @memberOf bluffmaster.phone
   */
  self.phoneNumber = function (format) {
    format = format || bluffmaster.phone.phoneFormats();
    return bluffmaster.helpers.replaceSymbolWithNumber(format);
  };

  // FIXME: this is strange passing in an array index.
  /**
   * phoneNumberFormat
   *
   * @method bluffmaster.phone.phoneFormatsArrayIndex
   * @param phoneFormatsArrayIndex
   * @memberOf bluffmaster.phone
   */
  self.phoneNumberFormat = function (phoneFormatsArrayIndex) {
    phoneFormatsArrayIndex = phoneFormatsArrayIndex || 0;
    return bluffmaster.helpers.replaceSymbolWithNumber(
      bluffmaster.definitions.phone_number.formats[phoneFormatsArrayIndex]
    );
  };

  /**
   * phoneFormats
   *
   * @method bluffmaster.phone.phoneFormats
   */
  self.phoneFormats = function () {
    return bluffmaster.random.arrayElement(
      bluffmaster.definitions.phone_number.formats
    );
  };

  return self;
};

module["exports"] = Phone;
