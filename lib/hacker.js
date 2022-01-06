/**
 *
 * @namespace bluffmaster.hacker
 */
var Hacker = function (bluffmaster) {
  var self = this;

  /**
   * abbreviation
   *
   * @method bluffmaster.hacker.abbreviation
   */
  self.abbreviation = function () {
    return bluffmaster.random.arrayElement(
      bluffmaster.definitions.hacker.abbreviation
    );
  };

  /**
   * adjective
   *
   * @method bluffmaster.hacker.adjective
   */
  self.adjective = function () {
    return bluffmaster.random.arrayElement(
      bluffmaster.definitions.hacker.adjective
    );
  };

  /**
   * noun
   *
   * @method bluffmaster.hacker.noun
   */
  self.noun = function () {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.hacker.noun);
  };

  /**
   * verb
   *
   * @method bluffmaster.hacker.verb
   */
  self.verb = function () {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.hacker.verb);
  };

  /**
   * ingverb
   *
   * @method bluffmaster.hacker.ingverb
   */
  self.ingverb = function () {
    return bluffmaster.random.arrayElement(
      bluffmaster.definitions.hacker.ingverb
    );
  };

  /**
   * phrase
   *
   * @method bluffmaster.hacker.phrase
   */
  self.phrase = function () {
    var data = {
      abbreviation: self.abbreviation,
      adjective: self.adjective,
      ingverb: self.ingverb,
      noun: self.noun,
      verb: self.verb,
    };

    var phrase = bluffmaster.random.arrayElement(
      bluffmaster.definitions.hacker.phrase
    );
    return bluffmaster.helpers.mustache(phrase, data);
  };

  return self;
};

module["exports"] = Hacker;
