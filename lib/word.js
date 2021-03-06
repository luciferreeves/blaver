/**
 * @namespace blaver.word
 */
var Word = function (blaver) {
  var self = this;
  /**
   * Returns an adjective of random or optionally specified length.
   * If specified length is unresolvable, returns random adjective.
   *
   * @method blaver.word.adjective
   * @param {number} [length] - optional length of word to return
   * @returns {string}          a random adjective
   */
  self.adjective = function (length) {
    var wordList = blaver.definitions.word.adjective;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = blaver.definitions.word.adjective.filter(function (word) {
        return word.length == length;
      });
    }
    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      blaver.random.arrayElement(wordList) ||
      blaver.random.arrayElement(blaver.definitions.word.adjective)
    );
  };
  /**
   * Returns an adverb of random or optionally specified length.
   * If specified length is unresolvable, returns random adverb.
   *
   * @method blaver.word.adverb
   * @param {number} [length] - optional length of word to return
   * @returns {string}          random adverb
   */
  self.adverb = function (length) {
    var wordList = blaver.definitions.word.adverb;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = blaver.definitions.word.adverb.filter(function (word) {
        return word.length == length;
      });
    }
    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      blaver.random.arrayElement(wordList) ||
      blaver.random.arrayElement(blaver.definitions.word.adverb)
    );
  };
  /**
   * Returns a conjunction of random or optionally specified length.
   * If specified length is unresolvable, returns random conjunction.
   *
   * @method blaver.word.conjunction
   * @param {number} [length] - optional length of word to return
   * @returns {string}          random conjunction
   */
  self.conjunction = function (length) {
    var wordList = blaver.definitions.word.conjunction;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = blaver.definitions.word.conjunction.filter(function (
        word
      ) {
        return word.length == length;
      });
    }
    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      blaver.random.arrayElement(wordList) ||
      blaver.random.arrayElement(blaver.definitions.word.conjunction)
    );
  };
  /**
   * Returns an interjection of random or optionally specified length.
   * If specified length is unresolvable, returns random interjection.
   *
   * @method blaver.word.interjection
   * @param {number} [length] - optional length of word to return
   * @returns {string}          random interjection
   */
  self.interjection = function (length) {
    var wordList = blaver.definitions.word.interjection;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = blaver.definitions.word.interjection.filter(function (
        word
      ) {
        return word.length == length;
      });
    }
    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      blaver.random.arrayElement(wordList) ||
      blaver.random.arrayElement(blaver.definitions.word.interjection)
    );
  };
  /**
   * Returns a noun of random or optionally specified length.
   * If specified length is unresolvable, returns random noun.
   *
   * @method blaver.word.noun
   * @param {number} [length] - optional length of word to return
   * @returns {string}          random noun
   */
  self.noun = function (length) {
    var wordList = blaver.definitions.word.noun;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = blaver.definitions.word.noun.filter(function (word) {
        return word.length == length;
      });
    }
    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      blaver.random.arrayElement(wordList) ||
      blaver.random.arrayElement(blaver.definitions.word.noun)
    );
  };
  /**
   * Returns a preposition of random or optionally specified length.
   * If specified length is unresolvable, returns random preposition.
   *
   * @method blaver.word.preposition
   * @param {number} [length] - optional length of word to return
   * @returns {string}          random preposition
   */
  self.preposition = function (length) {
    var wordList = blaver.definitions.word.preposition;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = blaver.definitions.word.preposition.filter(function (
        word
      ) {
        return word.length == length;
      });
    }
    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      blaver.random.arrayElement(wordList) ||
      blaver.random.arrayElement(blaver.definitions.word.preposition)
    );
  };
  /**
   * Returns a verb of random or optionally specified length.
   * If specified length is unresolvable, returns random verb.
   *
   * @method blaver.word.verb
   * @param {number} [length] - optional length of word to return
   * @returns {string}          random verb
   */
  self.verb = function (length) {
    var wordList = blaver.definitions.word.verb;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = blaver.definitions.word.verb.filter(function (word) {
        return word.length == length;
      });
    }
    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      blaver.random.arrayElement(wordList) ||
      blaver.random.arrayElement(blaver.definitions.word.verb)
    );
  };

  return self;
};

module["exports"] = Word;
