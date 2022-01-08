/**
 *
 * @namespace blaver.lorem
 */
const Lorem = function (blaver) {
  const self = this;
  const Helpers = blaver.helpers;

  /**
   * generates a word of a specified length
   *
   * @method blaver.lorem.word
   * @param {number} length length of the word that should be returned. Defaults to a random length
   */
  self.word = function (length) {
    const hasRightLength = function (word) {
      return word.length === length;
    };
    let properLengthWords;
    if (typeof length === "undefined") {
      properLengthWords = blaver.definitions.lorem.words;
    } else {
      properLengthWords =
        blaver.definitions.lorem.words.filter(hasRightLength);
    }
    return blaver.random.arrayElement(properLengthWords);
  };

  /**
   * generates a space separated list of words
   *
   * @method blaver.lorem.words
   * @param {number} num number of words, defaults to 3
   */
  self.words = function (num) {
    if (typeof num == "undefined") {
      num = 3;
    }
    const words = [];
    for (let i = 0; i < num; i++) {
      words.push(blaver.lorem.word());
    }
    return words.join(" ");
  };

  /**
   * sentence
   *
   * @method blaver.lorem.sentence
   * @param {number} wordCount defaults to a random number between 3 and 10
   */
  self.sentence = function (wordCount) {
    if (typeof wordCount == "undefined") {
      wordCount = blaver.datatype.number({ min: 3, max: 10 });
    }
    // if (typeof range == 'undefined') { range = 7; }

    // strange issue with the node_min_test failing for capitalize, please fix and add blaver.lorem.back
    //return  blaver.lorem.words(wordCount + Helpers.randomNumber(range)).join(' ').capitalize();

    const sentence = blaver.lorem.words(wordCount);
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
  };

  /**
   * slug
   *
   * @method blaver.lorem.slug
   * @param {number} wordCount number of words, defaults to 3
   */
  self.slug = function (wordCount) {
    const words = blaver.lorem.words(wordCount);
    return Helpers.slugify(words);
  };

  /**
   * sentences
   *
   * @method blaver.lorem.sentences
   * @param {number} sentenceCount defaults to a random number between 2 and 6
   * @param {string} separator defaults to `' '`
   */
  self.sentences = function (sentenceCount, separator) {
    if (typeof sentenceCount === "undefined") {
      sentenceCount = blaver.datatype.number({ min: 2, max: 6 });
    }
    if (typeof separator == "undefined") {
      separator = " ";
    }
    const sentences = [];
    for (sentenceCount; sentenceCount > 0; sentenceCount--) {
      sentences.push(blaver.lorem.sentence());
    }
    return sentences.join(separator);
  };

  /**
   * paragraph
   *
   * @method blaver.lorem.paragraph
   * @param {number} sentenceCount defaults to 3
   */
  self.paragraph = function (sentenceCount) {
    if (typeof sentenceCount == "undefined") {
      sentenceCount = 3;
    }
    return blaver.lorem.sentences(
      sentenceCount + blaver.datatype.number(3)
    );
  };

  /**
   * paragraphs
   *
   * @method blaver.lorem.paragraphs
   * @param {number} paragraphCount defaults to 3
   * @param {string} separator defaults to `'\n \r'`
   */
  self.paragraphs = function (paragraphCount, separator) {
    if (typeof separator === "undefined") {
      separator = "\n \r";
    }
    if (typeof paragraphCount == "undefined") {
      paragraphCount = 3;
    }
    const paragraphs = [];
    for (paragraphCount; paragraphCount > 0; paragraphCount--) {
      paragraphs.push(blaver.lorem.paragraph());
    }
    return paragraphs.join(separator);
  };

  /**
   * returns random text based on a random lorem method
   *
   * @method blaver.lorem.text
   */
  self.text = function loremText() {
    const loremMethods = [
      "lorem.word",
      "lorem.words",
      "lorem.sentence",
      "lorem.sentences",
      "lorem.paragraph",
      "lorem.paragraphs",
      "lorem.lines"
    ];
    const randomLoremMethod = blaver.random.arrayElement(loremMethods);
    return blaver.fake("{{" + randomLoremMethod + "}}");
  };

  /**
   * returns lines of lorem separated by `'\n'`
   *
   * @method blaver.lorem.lines
   * @param {number} lineCount defaults to a random number between 1 and 5
   */
  self.lines = function lines(lineCount) {
    if (typeof lineCount === "undefined") {
      lineCount = blaver.datatype.number({ min: 1, max: 5 });
    }
    return blaver.lorem.sentences(lineCount, "\n");
  };

  return self;
};

module.exports = Lorem;
