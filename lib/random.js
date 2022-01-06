/**
 * Method to reduce array of characters
 * @param arr existing array of characters
 * @param values array of characters which should be removed
 * @return {*} new array without banned characters
 */
var arrayRemove = function (arr, values) {
  values.forEach(function (value) {
    arr = arr.filter(function (ele) {
      return ele !== value;
    });
  });
  return arr;
};

/**
 *
 * @namespace bluffmaster.random
 */
function Random(bluffmaster, seed) {
  // Use a user provided seed if it is an array or number
  if (Array.isArray(seed) && seed.length) {
    bluffmaster.mersenne.seed_array(seed);
  } else if (!isNaN(seed)) {
    bluffmaster.mersenne.seed(seed);
  }

  /**
   * @Deprecated
   * returns a single random number based on a max number or range
   *
   * @method bluffmaster.random.number
   * @param {mixed} options {min, max, precision}
   */
  this.number = function (options) {
    console.log(
      "Deprecation Warning: bluffmaster.random.number is now located in bluffmaster.datatype.number"
    );
    return bluffmaster.datatype.number(options);
  };

  /**
   * @Deprecated
   * returns a single random floating-point number based on a max number or range
   *
   * @method bluffmaster.random.float
   * @param {mixed} options
   */
  this.float = function (options) {
    console.log(
      "Deprecation Warning: bluffmaster.random.float is now located in bluffmaster.datatype.float"
    );
    return bluffmaster.datatype.float(options);
  };

  /**
   * takes an array and returns a random element of the array
   *
   * @method bluffmaster.random.arrayElement
   * @param {array} array
   */
  this.arrayElement = function (array) {
    array = array || ["a", "b", "c"];
    var r = bluffmaster.datatype.number({ max: array.length - 1 });
    return array[r];
  };

  /**
   * takes an array and returns a subset with random elements of the array
   *
   * @method bluffmaster.random.arrayElements
   * @param {array} array
   * @param {number} count number of elements to pick
   */
  this.arrayElements = function (array, count) {
    array = array || ["a", "b", "c"];

    if (typeof count !== "number") {
      count = bluffmaster.datatype.number({ min: 1, max: array.length });
    } else if (count > array.length) {
      count = array.length;
    } else if (count < 0) {
      count = 0;
    }

    var arrayCopy = array.slice(0);
    var i = array.length;
    var min = i - count;
    var temp;
    var index;

    while (i-- > min) {
      index = Math.floor(
        (i + 1) * bluffmaster.datatype.float({ min: 0, max: 0.99 })
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
   * @method bluffmaster.random.objectElement
   * @param {object} object
   * @param {mixed} field
   */
  this.objectElement = function (object, field) {
    object = object || { foo: "bar", too: "car" };
    var array = Object.keys(object);
    var key = bluffmaster.random.arrayElement(array);

    return field === "key" ? key : object[key];
  };

  /**
   * @Deprecated
   * uuid
   *
   * @method bluffmaster.random.uuid
   */
  this.uuid = function () {
    console.log(
      "Deprecation Warning: bluffmaster.random.uuid is now located in bluffmaster.datatype.uuid"
    );
    return bluffmaster.datatype.uuid();
  };

  /**
   * boolean
   *
   * @method bluffmaster.random.boolean
   */
  this.boolean = function () {
    console.log(
      "Deprecation Warning: bluffmaster.random.boolean is now located in bluffmaster.datatype.boolean"
    );
    return bluffmaster.datatype.boolean();
  };

  // TODO: have ability to return specific type of word? As in: noun, adjective, verb, etc
  /**
   * word
   *
   * @method bluffmaster.random.word
   * @param {string} type
   */
  this.word = function randomWord(type) {
    var wordMethods = [
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

    // randomly pick from the many bluffmaster methods that can generate words
    var randomWordMethod = bluffmaster.random.arrayElement(wordMethods);
    var result = bluffmaster.fake("{{" + randomWordMethod + "}}");
    return bluffmaster.random.arrayElement(result.split(" "));
  };

  /**
   * randomWords
   *
   * @method bluffmaster.random.words
   * @param {number} count defaults to a random value between 1 and 3
   */
  this.words = function randomWords(count) {
    var words = [];
    if (typeof count === "undefined") {
      count = bluffmaster.datatype.number({ min: 1, max: 3 });
    }
    for (var i = 0; i < count; i++) {
      words.push(bluffmaster.random.word());
    }
    return words.join(" ");
  };

  /**
   * locale
   *
   * @method bluffmaster.random.image
   */
  this.image = function randomImage() {
    return bluffmaster.image.image();
  };

  /**
   * locale
   *
   * @method bluffmaster.random.locale
   */
  this.locale = function randomLocale() {
    return bluffmaster.random.arrayElement(Object.keys(bluffmaster.locales));
  };

  /**
   * alpha. returns lower/upper alpha characters based count and upcase options
   *
   * @method bluffmaster.random.alpha
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

    var wholeString = "";
    var charsArray = [
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
    for (var i = 0; i < options.count; i++) {
      wholeString += bluffmaster.random.arrayElement(charsArray);
    }

    return options.upcase ? wholeString.toUpperCase() : wholeString;
  };

  /**
   * alphaNumeric
   *
   * @method bluffmaster.random.alphaNumeric
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

    var wholeString = "";
    var charsArray = [
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
    for (var i = 0; i < count; i++) {
      wholeString += bluffmaster.random.arrayElement(charsArray);
    }

    return wholeString;
  };

  /**
   * @Deprecated
   * hexaDecimal
   *
   * @method bluffmaster.random.hexaDecimal
   * @param {number} count defaults to 1
   */
  this.hexaDecimal = function hexaDecimal(count) {
    console.log(
      "Deprecation Warning: bluffmaster.random.hexaDecimal is now located in bluffmaster.datatype.hexaDecimal"
    );
    return bluffmaster.datatype.hexaDecimal(count);
  };

  return this;
}

module["exports"] = Random;
