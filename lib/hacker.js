/**
 *
 * @namespace blaver.hacker
 */
const Hacker = function (blaver) {
  const self = this;

  /**
   * abbreviation
   *
   * @method blaver.hacker.abbreviation
   */
  self.abbreviation = function () {
    return blaver.random.arrayElement(
      blaver.definitions.hacker.abbreviation
    );
  };

  /**
   * adjective
   *
   * @method blaver.hacker.adjective
   */
  self.adjective = function () {
    return blaver.random.arrayElement(
      blaver.definitions.hacker.adjective
    );
  };

  /**
   * noun
   *
   * @method blaver.hacker.noun
   */
  self.noun = function () {
    return blaver.random.arrayElement(blaver.definitions.hacker.noun);
  };

  /**
   * verb
   *
   * @method blaver.hacker.verb
   */
  self.verb = function () {
    return blaver.random.arrayElement(blaver.definitions.hacker.verb);
  };

  /**
   * ingverb
   *
   * @method blaver.hacker.ingverb
   */
  self.ingverb = function () {
    return blaver.random.arrayElement(
      blaver.definitions.hacker.ingverb
    );
  };

  /**
   * phrase
   *
   * @method blaver.hacker.phrase
   */
  self.phrase = function () {
    const data = {
      abbreviation: self.abbreviation,
      adjective: self.adjective,
      ingverb: self.ingverb,
      noun: self.noun,
      verb: self.verb
    };

    const phrase = blaver.random.arrayElement(
      blaver.definitions.hacker.phrase
    );
    return blaver.helpers.mustache(phrase, data);
  };

  return self;
};

module.exports = Hacker;
