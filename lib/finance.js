/**
 * @namespace bluffmaster.finance
 */
var Finance = function (bluffmaster) {
  var ibanLib = require("./iban");
  var Helpers = bluffmaster.helpers,
      self = this;

  /**
   * account
   *
   * @method bluffmaster.finance.account
   * @param {number} length
   */
  self.account = function (length) {

      length = length || 8;

      var template = '';

      for (var i = 0; i < length; i++) {
          template = template + '#';
      }
      length = null;
      return Helpers.replaceSymbolWithNumber(template);
  };

  /**
   * accountName
   *
   * @method bluffmaster.finance.accountName
   */
  self.accountName = function () {

      return [Helpers.randomize(bluffmaster.definitions.finance.account_type), 'Account'].join(' ');
  };

  /**
   * routingNumber
   *
   * @method bluffmaster.finance.routingNumber
   */
  self.routingNumber = function () {

      var routingNumber = Helpers.replaceSymbolWithNumber('########');

      // Modules 10 straight summation.
      var sum = 0;

      for (var i = 0; i < routingNumber.length; i += 3) {
        sum += Number(routingNumber[i]) * 3;
        sum += Number(routingNumber[i + 1]) * 7;
        sum += Number(routingNumber[i + 2]) || 0;
      }

      return routingNumber + (Math.ceil(sum / 10) * 10 - sum);
  }

  /**
   * mask
   *
   * @method bluffmaster.finance.mask
   * @param {number} length
   * @param {boolean} parens
   * @param {boolean} ellipsis
   */
  self.mask = function (length, parens, ellipsis) {

      //set defaults
      length = (length == 0 || !length || typeof length == 'undefined') ? 4 : length;
      parens = (parens === null) ? true : parens;
      ellipsis = (ellipsis === null) ? true : ellipsis;

      //create a template for length
      var template = '';

      for (var i = 0; i < length; i++) {
          template = template + '#';
      }

      //prefix with ellipsis
      template = (ellipsis) ? ['...', template].join('') : template;

      template = (parens) ? ['(', template, ')'].join('') : template;

      //generate random numbers
      template = Helpers.replaceSymbolWithNumber(template);

      return template;
  };

  //min and max take in minimum and maximum amounts, dec is the decimal place you want rounded to, symbol is $, €, £, etc
  //NOTE: this returns a string representation of the value, if you want a number use parseFloat and no symbol

  /**
   * amount
   *
   * @method bluffmaster.finance.amount
   * @param {number} min
   * @param {number} max
   * @param {number} dec
   * @param {string} symbol
   *
   * @return {string}
   */
  self.amount = function (min, max, dec, symbol, autoFormat) {

      min = min || 0;
      max = max || 1000;
      dec = dec === undefined ? 2 : dec;
      symbol = symbol || '';
      const randValue = bluffmaster.datatype.number({ max: max, min: min, precision: Math.pow(10, -dec) });

      var formattedString;
      if(autoFormat) {
        formattedString = randValue.toLocaleString(undefined, {minimumFractionDigits: dec});
      }
      else {
        formattedString = randValue.toFixed(dec);
      }

      return symbol + formattedString;
  };

  /**
   * transactionType
   *
   * @method bluffmaster.finance.transactionType
   */
  self.transactionType = function () {
      return Helpers.randomize(bluffmaster.definitions.finance.transaction_type);
  };

  /**
   * currencyCode
   *
   * @method bluffmaster.finance.currencyCode
   */
  self.currencyCode = function () {
      return bluffmaster.random.objectElement(bluffmaster.definitions.finance.currency)['code'];
  };

  /**
   * currencyName
   *
   * @method bluffmaster.finance.currencyName
   */
  self.currencyName = function () {
      return bluffmaster.random.objectElement(bluffmaster.definitions.finance.currency, 'key');
  };

  /**
   * currencySymbol
   *
   * @method bluffmaster.finance.currencySymbol
   */
  self.currencySymbol = function () {
      var symbol;

      while (!symbol) {
          symbol = bluffmaster.random.objectElement(bluffmaster.definitions.finance.currency)['symbol'];
      }
      return symbol;
  };

  /**
   * bitcoinAddress
   *
   * @method  bluffmaster.finance.bitcoinAddress
   */
  self.bitcoinAddress = function () {
    var addressLength = bluffmaster.datatype.number({ min: 25, max: 34 });

    var address = bluffmaster.random.arrayElement(['1', '3']);

    for (var i = 0; i < addressLength - 1; i++)
      address += bluffmaster.random.arrayElement('123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'.split(''));

    return address;
  }

/**
 * litecoinAddress
 *
 * @method  bluffmaster.finance.litecoinAddress
 */
self.litecoinAddress = function () {
  var addressLength = bluffmaster.datatype.number({ min: 26, max: 33 });

  var address = bluffmaster.random.arrayElement(['L', 'M', '3']);

  for (var i = 0; i < addressLength - 1; i++)
    address += bluffmaster.random.arrayElement('123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'.split(''));

  return address;
}

  /**
   * Credit card number
   * @method bluffmaster.finance.creditCardNumber
   * @param {string} provider | scheme
  */
  self.creditCardNumber = function(provider){
    provider = provider || "";
    var format, formats;
    var localeFormat = bluffmaster.definitions.finance.credit_card;
    if (provider in localeFormat) {
      formats = localeFormat[provider]; // there chould be multiple formats
      if (typeof formats === "string") {
        format = formats;
      } else {
        format = bluffmaster.random.arrayElement(formats);
      }
    } else if (provider.match(/#/)) { // The user chose an optional scheme
      format = provider;
    } else { // Choose a random provider
      if (typeof localeFormat === 'string') {
        format = localeFormat;
      } else if( typeof localeFormat === "object") {
        // Credit cards are in a object structure
        formats = bluffmaster.random.objectElement(localeFormat, "value"); // There chould be multiple formats
        if (typeof formats === "string") {
          format = formats;
        } else {
          format = bluffmaster.random.arrayElement(formats);
        }
      }
    }
    format = format.replace(/\//g,"")
    return Helpers.replaceCreditCardSymbols(format);
  };
  /**
   * Credit card CVV
   * @method bluffmaster.finance.creditCardCVV
  */
  self.creditCardCVV = function() {
    var cvv = "";
    for (var i = 0; i < 3; i++) {
      cvv += bluffmaster.datatype.number({max:9}).toString();
    }
    return cvv;
  };

  /**
   * ethereumAddress
   *
   * @method  bluffmaster.finance.ethereumAddress
   */
  self.ethereumAddress = function () {
    var address = bluffmaster.datatype.hexaDecimal(40).toLowerCase();
    return address;
  };

  /**
   * iban
   *
   * @param {boolean} [formatted=false] - Return a formatted version of the generated IBAN.
   * @param {string} [countryCode] - The country code from which you want to generate an IBAN, if none is provided a random country will be used.
   * @throws Will throw an error if the passed country code is not supported.
   *
   * @method  bluffmaster.finance.iban
   */
  self.iban = function (formatted, countryCode) {
      var ibanFormat;
      if (countryCode) {
          var findFormat = function(currentFormat) { return currentFormat.country === countryCode; };
          ibanFormat = ibanLib.formats.find(findFormat);
      } else {
          ibanFormat = bluffmaster.random.arrayElement(ibanLib.formats);
      }

      if (!ibanFormat) {
          throw new Error('Country code ' + countryCode + ' not supported.');
      }

      var s = "";
      var count = 0;
      for (var b = 0; b < ibanFormat.bban.length; b++) {
          var bban = ibanFormat.bban[b];
          var c = bban.count;
          count += bban.count;
          while (c > 0) {
              if (bban.type == "a") {
                  s += bluffmaster.random.arrayElement(ibanLib.alpha);
              } else if (bban.type == "c") {
                  if (bluffmaster.datatype.number(100) < 80) {
                      s += bluffmaster.datatype.number(9);
                  } else {
                      s += bluffmaster.random.arrayElement(ibanLib.alpha);
                  }
              } else {
                  if (c >= 3 && bluffmaster.datatype.number(100) < 30) {
                      if (bluffmaster.datatype.boolean()) {
                          s += bluffmaster.random.arrayElement(ibanLib.pattern100);
                          c -= 2;
                      } else {
                          s += bluffmaster.random.arrayElement(ibanLib.pattern10);
                          c--;
                      }
                  } else {
                      s += bluffmaster.datatype.number(9);
                  }
              }
              c--;
          }
          s = s.substring(0, count);
      }
      var checksum = 98 - ibanLib.mod97(ibanLib.toDigitString(s + ibanFormat.country + "00"));
      if (checksum < 10) {
          checksum = "0" + checksum;
      }
      var iban = ibanFormat.country + checksum + s;
      return formatted ? iban.match(/.{1,4}/g).join(" ") : iban;
  };

  /**
   * bic
   *
   * @method  bluffmaster.finance.bic
   */
  self.bic = function () {
      var vowels = ["A", "E", "I", "O", "U"];
      var prob = bluffmaster.datatype.number(100);
      return Helpers.replaceSymbols("???") +
          bluffmaster.random.arrayElement(vowels) +
          bluffmaster.random.arrayElement(ibanLib.iso3166) +
          Helpers.replaceSymbols("?") + "1" +
          (prob < 10 ?
              Helpers.replaceSymbols("?" + bluffmaster.random.arrayElement(vowels) + "?") :
          prob < 40 ?
              Helpers.replaceSymbols("###") : "");
  };

  /**
   * description
   *
   * @method  bluffmaster.finance.transactionDescription
   */
  self.transactionDescription = function() {
    var transaction = Helpers.createTransaction();
    var account = transaction.account;
    var amount = transaction.amount;
    var transactionType = transaction.type;
    var company = transaction.business;
    var card = bluffmaster.finance.mask();
    var currency = bluffmaster.finance.currencyCode();
    return transactionType + " transaction at " + company + " using card ending with ***" + card + " for " + currency + " " + amount + " in account ***" + account
  };

};

module['exports'] = Finance;
