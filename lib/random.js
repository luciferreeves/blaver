/**
 * Method to reduce array of characters
 * @param arr existing array of characters
 * @param values array of characters which should be removed
 * @return {*} new array without banned characters
 */
const arrayRemove = function (arr, values) {
  values.forEach(function (value) {
    arr = arr.filter(function (ele) {
      return ele !== value;
    });
  });
  return arr;
};

/**
 *
 * @namespace blaver.random
 */
function Random(blaver, seed) {
  // Use a user provided seed if it is an array or number
  if (Array.isArray(seed) && seed.length) {
    blaver.mersenne.seed_array(seed);
  } else if (!isNaN(seed)) {
    blaver.mersenne.seed(seed);
  }

  /**
   * @Deprecated
   * returns a single random number based on a max number or range
   *
   * @method blaver.random.number
   * @param {mixed} options {min, max, precision}
   */
  this.number = function (options) {
    console.log(
      "Deprecation Warning: blaver.random.number is now located in blaver.datatype.number"
    );
    return blaver.datatype.number(options);
  };

  /**
   * @Deprecated
   * returns a single random floating-point number based on a max number or range
   *
   * @method blaver.random.float
   * @param {mixed} options
   */
  this.float = function (options) {
    console.log(
      "Deprecation Warning: blaver.random.float is now located in blaver.datatype.float"
    );
    return blaver.datatype.float(options);
  };

  /**
   * takes an array and returns a random element of the array
   *
   * @method blaver.random.arrayElement
   * @param {array} array
   */
  this.arrayElement = function (array) {
    array = array || ["a", "b", "c"];
    const r = blaver.datatype.number({ max: array.length - 1 });
    return array[r];
  };

  /**
   * takes an array and returns a subset with random elements of the array
   *
   * @method blaver.random.arrayElements
   * @param {array} array
   * @param {number} count number of elements to pick
   */
  this.arrayElements = function (array, count) {
    array = array || ["a", "b", "c"];

    if (typeof count !== "number") {
      count = blaver.datatype.number({ min: 1, max: array.length });
    } else if (count > array.length) {
      count = array.length;
    } else if (count < 0) {
      count = 0;
    }

    const arrayCopy = array.slice(0);
    let i = array.length;
    const min = i - count;
    let temp;
    let index;

    while (i-- > min) {
      index = Math.floor(
        (i + 1) * blaver.datatype.float({ min: 0, max: 0.99 })
      );
      temp = arrayCopy[index];
      arrayCopy[index] = arrayCopy[i];
      arrayCopy[i] = temp;
    }

    return arrayCopy.slice(min);
  };

  /**
   * takes an object and returns a random key or value
   *
   * @method blaver.random.objectElement
   * @param {object} object
   * @param {mixed} field
   */
  this.objectElement = function (object, field) {
    object = object || { foo: "bar", too: "car" };
    const array = Object.keys(object);
    const key = blaver.random.arrayElement(array);

    return field === "key" ? key : object[key];
  };

  /**
   * @Deprecated
   * uuid
   *
   * @method blaver.random.uuid
   */
  this.uuid = function () {
    console.log(
      "Deprecation Warning: blaver.random.uuid is now located in blaver.datatype.uuid"
    );
    return blaver.datatype.uuid();
  };

  /**
   * boolean
   *
   * @method blaver.random.boolean
   */
  this.boolean = function () {
    console.log(
      "Deprecation Warning: blaver.random.boolean is now located in blaver.datatype.boolean"
    );
    return blaver.datatype.boolean();
  };

  // TODO: have ability to return specific type of word? As in: noun, adjective, verb, etc
  /**
   * word
   *
   * @method blaver.random.word
   * @param {string} type
   */
  this.word = function randomWord(type) {
    const wordMethods = [
      "commerce.department",
      "commerce.productName",
      "commerce.productAdjective",
      "commerce.productMaterial",
      "commerce.product",
      "commerce.color",

      "company.catchPhraseAdjective",
      "company.catchPhraseDescriptor",
      "company.catchPhraseNoun",
      "company.bsAdjective",
      "company.bsBuzz",
      "company.bsNoun",
      "address.streetSuffix",
      "address.county",
      "address.country",
      "address.state",

      "finance.accountName",
      "finance.transactionType",
      "finance.currencyName",

      "hacker.noun",
      "hacker.verb",
      "hacker.adjective",
      "hacker.ingverb",
      "hacker.abbreviation",

      "name.jobDescriptor",
      "name.jobArea",
      "name.jobType",
    ];

    // randomly pick from the many blaver methods that can generate words
    const randomWordMethod = blaver.random.arrayElement(wordMethods);
    const result = blaver.fake("{{" + randomWordMethod + "}}");
    return blaver.random.arrayElement(result.split(" "));
  };

  /**
   * randomWords
   *
   * @method blaver.random.words
   * @param {number} count defaults to a random value between 1 and 3
   */
  this.words = function randomWords(count) {
    const words = [];
    if (typeof count === "undefined") {
      count = blaver.datatype.number({ min: 1, max: 3 });
    }
    for (let i = 0; i < count; i++) {
      words.push(blaver.random.word());
    }
    return words.join(" ");
  };

  /**
   * locale
   *
   * @method blaver.random.image
   */
  this.image = function randomImage() {
    return blaver.image.image();
  };

  /**
   * locale
   *
   * @method blaver.random.locale
   */
  this.locale = function randomLocale() {
    return blaver.random.arrayElement(Object.keys(blaver.locales));
  };

  /**
   * alpha. returns lower/upper alpha characters based count and upcase options
   *
   * @method blaver.random.alpha
   * @param {mixed} options // defaults to { count: 1, upcase: false, bannedChars: [] }
   */
  this.alpha = function alpha(options) {
    if (typeof options === "undefined") {
      options = {
        count: 1,
      };
    } else if (typeof options === "number") {
      options = {
        count: options,
      };
    } else if (typeof options.count === "undefined") {
      options.count = 1;
    }

    if (typeof options.upcase === "undefined") {
      options.upcase = false;
    }
    if (typeof options.bannedChars === "undefined") {
      options.bannedChars = [];
    }

    let wholeString = "";
    let charsArray = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    if (options.bannedChars) {
      charsArray = arrayRemove(charsArray, options.bannedChars);
    }
    for (let i = 0; i < options.count; i++) {
      wholeString += blaver.random.arrayElement(charsArray);
    }

    return options.upcase ? wholeString.toUpperCase() : wholeString;
  };

  /**
   * alphaNumeric
   *
   * @method blaver.random.alphaNumeric
   * @param {number} count defaults to 1
   * {mixed} options // defaults to { bannedChars: [] }
   * options.bannedChars - array of characters which should be banned in new string
   */
  this.alphaNumeric = function alphaNumeric(count, options) {
    if (typeof count === "undefined") {
      count = 1;
    }
    if (typeof options === "undefined") {
      options = {};
    }
    if (typeof options.bannedChars === "undefined") {
      options.bannedChars = [];
    }

    let wholeString = "";
    let charsArray = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    if (options) {
      if (options.bannedChars) {
        charsArray = arrayRemove(charsArray, options.bannedChars);
      }
    }
    for (let i = 0; i < count; i++) {
      wholeString += blaver.random.arrayElement(charsArray);
    }

    return wholeString;
  };

  /**
   * @Deprecated
   * hexaDecimal
   *
   * @method blaver.random.hexaDecimal
   * @param {number} count defaults to 1
   */
  this.hexaDecimal = function hexaDecimal(count) {
    console.log(
      "Deprecation Warning: blaver.random.hexaDecimal is now located in blaver.datatype.hexaDecimal"
    );
    return blaver.datatype.hexaDecimal(count);
  };

  return this;
}

module["exports"] = Random;
