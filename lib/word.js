/**
 * @namespace bluffmaster.word
 */
var Word = function (bluffmaster) {
  var self = this;
  /**
   * Returns an adjective of random or optionally specified length.
   * If specified length is unresolvable, returns random adjective.
   *
   * @method bluffmaster.word.adjective
   * @param {number} [length] - optional length of word to return
   * @returns {string}          a random adjective
   */
  self.adjective = function (length) {
    var wordList = bluffmaster.definitions.word.adjective;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = bluffmaster.definitions.word.adjective.filter(function (word) {
        return word.length == length;
      });
    }
    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      bluffmaster.random.arrayElement(wordList) ||
      bluffmaster.random.arrayElement(bluffmaster.definitions.word.adjective)
    );
  };
  /**
   * Returns an adverb of random or optionally specified length.
   * If specified length is unresolvable, returns random adverb.
   *
   * @method bluffmaster.word.adverb
   * @param {number} [length] - optional length of word to return
   * @returns {string}          random adverb
   */
  self.adverb = function (length) {
    var wordList = bluffmaster.definitions.word.adverb;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = bluffmaster.definitions.word.adverb.filter(function (word) {
        return word.length == length;
      });
    }
    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      bluffmaster.random.arrayElement(wordList) ||
      bluffmaster.random.arrayElement(bluffmaster.definitions.word.adverb)
    );
  };
  /**
   * Returns a conjunction of random or optionally specified length.
   * If specified length is unresolvable, returns random conjunction.
   *
   * @method bluffmaster.word.conjunction
   * @param {number} [length] - optional length of word to return
   * @returns {string}          random conjunction
   */
  self.conjunction = function (length) {
    var wordList = bluffmaster.definitions.word.conjunction;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = bluffmaster.definitions.word.conjunction.filter(function (word) {
        return word.length == length;
      });
    }
    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      bluffmaster.random.arrayElement(wordList) ||
      bluffmaster.random.arrayElement(bluffmaster.definitions.word.conjunction)
    );
  };
  /**
   * Returns an interjection of random or optionally specified length.
   * If specified length is unresolvable, returns random interjection.
   *
   * @method bluffmaster.word.interjection
   * @param {number} [length] - optional length of word to return
   * @returns {string}          random interjection
   */
  self.interjection = function (length) {
    var wordList = bluffmaster.definitions.word.interjection;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = bluffmaster.definitions.word.interjection.filter(function (word) {
        return word.length == length;
      });
    }
    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      bluffmaster.random.arrayElement(wordList) ||
      bluffmaster.random.arrayElement(bluffmaster.definitions.word.interjection)
    );
  };
  /**
   * Returns a noun of random or optionally specified length.
   * If specified length is unresolvable, returns random noun.
   *
   * @method bluffmaster.word.noun
   * @param {number} [length] - optional length of word to return
   * @returns {string}          random noun
   */
  self.noun = function (length) {
    var wordList = bluffmaster.definitions.word.noun;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = bluffmaster.definitions.word.noun.filter(function (word) {
        return word.length == length;
      });
    }
    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      bluffmaster.random.arrayElement(wordList) ||
      bluffmaster.random.arrayElement(bluffmaster.definitions.word.noun)
    );
  };
  /**
   * Returns a preposition of random or optionally specified length.
   * If specified length is unresolvable, returns random preposition.
   *
   * @method bluffmaster.word.preposition
   * @param {number} [length] - optional length of word to return
   * @returns {string}          random preposition
   */
  self.preposition = function (length) {
    var wordList = bluffmaster.definitions.word.preposition;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = bluffmaster.definitions.word.preposition.filter(function (word) {
        return word.length == length;
      });
    }
    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      bluffmaster.random.arrayElement(wordList) ||
      bluffmaster.random.arrayElement(bluffmaster.definitions.word.preposition)
    );
  };
  /**
   * Returns a verb of random or optionally specified length.
   * If specified length is unresolvable, returns random verb.
   *
   * @method bluffmaster.word.verb
   * @param {number} [length] - optional length of word to return
   * @returns {string}          random verb
   */
  self.verb = function (length) {
    var wordList = bluffmaster.definitions.word.verb;
    if (length !== undefined) {
      length = parseInt(length);
      wordList = bluffmaster.definitions.word.verb.filter(function (word) {
        return word.length == length;
      });
    }
    // If result of filtered word list is undefined, return an element
    // from the unfiltered list.
    return (
      bluffmaster.random.arrayElement(wordList) ||
      bluffmaster.random.arrayElement(bluffmaster.definitions.word.verb)
    );
  };

  return self;
};

module["exports"] = Word;
