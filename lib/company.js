/**
 *
 * @namespace blaver.company
 */
const Company = function (blaver) {
  const f = blaver.fake;

  /**
   * suffixes
   *
   * @method blaver.company.suffixes
   */
  this.suffixes = function () {
    // Don't want the source array exposed to modification, so return a copy
    return blaver.definitions.company.suffix.slice(0);
  };

  /**
   * companyName
   *
   * @method blaver.company.companyName
   * @param {string} format
   */
  this.companyName = function (format) {
    const formats = [
      "{{name.lastName}} {{company.companySuffix}}",
      "{{name.lastName}} - {{name.lastName}}",
      "{{name.lastName}}, {{name.lastName}} and {{name.lastName}}"
    ];

    if (typeof format !== "number") {
      format = blaver.datatype.number(formats.length - 1);
    }

    return f(formats[format]);
  };

  /**
   * companySuffix
   *
   * @method blaver.company.companySuffix
   */
  this.companySuffix = function () {
    return blaver.random.arrayElement(blaver.company.suffixes());
  };

  /**
   * catchPhrase
   *
   * @method blaver.company.catchPhrase
   */
  this.catchPhrase = function () {
    return f(
      "{{company.catchPhraseAdjective}} {{company.catchPhraseDescriptor}} {{company.catchPhraseNoun}}"
    );
  };

  /**
   * bs
   *
   * @method blaver.company.bs
   */
  this.bs = function () {
    return f("{{company.bsBuzz}} {{company.bsAdjective}} {{company.bsNoun}}");
  };

  /**
   * catchPhraseAdjective
   *
   * @method blaver.company.catchPhraseAdjective
   */
  this.catchPhraseAdjective = function () {
    return blaver.random.arrayElement(
      blaver.definitions.company.adjective
    );
  };

  /**
   * catchPhraseDescriptor
   *
   * @method blaver.company.catchPhraseDescriptor
   */
  this.catchPhraseDescriptor = function () {
    return blaver.random.arrayElement(
      blaver.definitions.company.descriptor
    );
  };

  /**
   * catchPhraseNoun
   *
   * @method blaver.company.catchPhraseNoun
   */
  this.catchPhraseNoun = function () {
    return blaver.random.arrayElement(
      blaver.definitions.company.noun
    );
  };

  /**
   * bsAdjective
   *
   * @method blaver.company.bsAdjective
   */
  this.bsAdjective = function () {
    return blaver.random.arrayElement(
      blaver.definitions.company.bs_adjective
    );
  };

  /**
   * bsBuzz
   *
   * @method blaver.company.bsBuzz
   */
  this.bsBuzz = function () {
    return blaver.random.arrayElement(
      blaver.definitions.company.bs_verb
    );
  };

  /**
   * bsNoun
   *
   * @method blaver.company.bsNoun
   */
  this.bsNoun = function () {
    return blaver.random.arrayElement(
      blaver.definitions.company.bs_noun
    );
  };
};

module.exports = Company;
