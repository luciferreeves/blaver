/**
 *
 * @namespace bluffmaster.company
 */
var Company = function (bluffmaster) {
  var self = this;
  var f = bluffmaster.fake;

  /**
   * suffixes
   *
   * @method bluffmaster.company.suffixes
   */
  this.suffixes = function () {
    // Don't want the source array exposed to modification, so return a copy
    return bluffmaster.definitions.company.suffix.slice(0);
  };

  /**
   * companyName
   *
   * @method bluffmaster.company.companyName
   * @param {string} format
   */
  this.companyName = function (format) {
    var formats = [
      "{{name.lastName}} {{company.companySuffix}}",
      "{{name.lastName}} - {{name.lastName}}",
      "{{name.lastName}}, {{name.lastName}} and {{name.lastName}}",
    ];

    if (typeof format !== "number") {
      format = bluffmaster.datatype.number(formats.length - 1);
    }

    return f(formats[format]);
  };

  /**
   * companySuffix
   *
   * @method bluffmaster.company.companySuffix
   */
  this.companySuffix = function () {
    return bluffmaster.random.arrayElement(bluffmaster.company.suffixes());
  };

  /**
   * catchPhrase
   *
   * @method bluffmaster.company.catchPhrase
   */
  this.catchPhrase = function () {
    return f(
      "{{company.catchPhraseAdjective}} {{company.catchPhraseDescriptor}} {{company.catchPhraseNoun}}"
    );
  };

  /**
   * bs
   *
   * @method bluffmaster.company.bs
   */
  this.bs = function () {
    return f("{{company.bsBuzz}} {{company.bsAdjective}} {{company.bsNoun}}");
  };

  /**
   * catchPhraseAdjective
   *
   * @method bluffmaster.company.catchPhraseAdjective
   */
  this.catchPhraseAdjective = function () {
    return bluffmaster.random.arrayElement(
      bluffmaster.definitions.company.adjective
    );
  };

  /**
   * catchPhraseDescriptor
   *
   * @method bluffmaster.company.catchPhraseDescriptor
   */
  this.catchPhraseDescriptor = function () {
    return bluffmaster.random.arrayElement(
      bluffmaster.definitions.company.descriptor
    );
  };

  /**
   * catchPhraseNoun
   *
   * @method bluffmaster.company.catchPhraseNoun
   */
  this.catchPhraseNoun = function () {
    return bluffmaster.random.arrayElement(
      bluffmaster.definitions.company.noun
    );
  };

  /**
   * bsAdjective
   *
   * @method bluffmaster.company.bsAdjective
   */
  this.bsAdjective = function () {
    return bluffmaster.random.arrayElement(
      bluffmaster.definitions.company.bs_adjective
    );
  };

  /**
   * bsBuzz
   *
   * @method bluffmaster.company.bsBuzz
   */
  this.bsBuzz = function () {
    return bluffmaster.random.arrayElement(
      bluffmaster.definitions.company.bs_verb
    );
  };

  /**
   * bsNoun
   *
   * @method bluffmaster.company.bsNoun
   */
  this.bsNoun = function () {
    return bluffmaster.random.arrayElement(
      bluffmaster.definitions.company.bs_noun
    );
  };
};

module["exports"] = Company;
