/**
 *
 * @namespace blaver.helpers
 */
const Helpers = function (blaver) {
  const self = this;

  /**
   * backward-compatibility
   *
   * @method blaver.helpers.randomize
   * @param {array} array
   */
  self.randomize = function (array) {
    array = array || ["a", "b", "c"];
    return blaver.random.arrayElement(array);
  };

  /**
   * slugifies string
   *
   * @method blaver.helpers.slugify
   * @param {string} string
   */
  self.slugify = function (string) {
    string = string || "";
    return string
      .replace(/ /g, "-")
      .replace(/[^\一-龠\ぁ-ゔ\ァ-ヴー\w\.\-]+/g, "");
  };

  /**
   * parses string for a symbol and replace it with a random number from 1-10
   *
   * @method blaver.helpers.replaceSymbolWithNumber
   * @param {string} string
   * @param {string} symbol defaults to `"#"`
   */
  self.replaceSymbolWithNumber = function (string, symbol) {
    string = string || "";
    // default symbol is '#'
    if (symbol === undefined) {
      symbol = "#";
    }

    let str = "";
    
    for (let i = 0; i < string.length; i++) {
      if (string.charAt(i) == symbol) {
        str += blaver.datatype.number(9);
      } else if (string.charAt(i) == "!") {
        str += blaver.datatype.number({ min: 2, max: 9 });
      } else {
        str += string.charAt(i);
      }
    }
    return str;
  };

  /**
   * parses string for symbols (numbers or letters) and replaces them appropriately (# will be replaced with number,
   * ? with letter and * will be replaced with number or letter)
   *
   * @method blaver.helpers.replaceSymbols
   * @param {string} string
   */
  self.replaceSymbols = function (string) {
    string = string || "";
    const alpha = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    let str = "";

    for (let i = 0; i < string.length; i++) {
      if (string.charAt(i) == "#") {
        str += blaver.datatype.number(9);
      } else if (string.charAt(i) == "?") {
        str += blaver.random.arrayElement(alpha);
      } else if (string.charAt(i) == "*") {
        str += blaver.datatype.boolean()
          ? blaver.random.arrayElement(alpha)
          : blaver.datatype.number(9);
      } else {
        str += string.charAt(i);
      }
    }
    return str;
  };

  /**
   * replace symbols in a credit card schems including Luhn checksum
   *
   * @method blaver.helpers.replaceCreditCardSymbols
   * @param {string} string
   * @param {string} symbol
   */

  self.replaceCreditCardSymbols = function (string, symbol) {
    // default values required for calling method without arguments
    string = string || "6453-####-####-####-###L";
    symbol = symbol || "#";

    // Function calculating the Luhn checksum of a number string
    const getCheckBit = function (number) {
      number.reverse();
      number = number.map(function (num, index) {
        if (index % 2 === 0) {
          num *= 2;
          if (num > 9) {
            num -= 9;
          }
        }
        return num;
      });
      const sum = number.reduce(function (prev, curr) {
        return prev + curr;
      });
      return sum % 10;
    };

    string = blaver.helpers.regexpStyleStringParse(string); // replace [4-9] with a random number in range etc...
    string = blaver.helpers.replaceSymbolWithNumber(string, symbol); // replace ### with random numbers

    const numberList = string
      .replace(/\D/g, "")
      .split("")
      .map(function (num) {
        return parseInt(num);
      });
    const checkNum = getCheckBit(numberList);
    return string.replace("L", checkNum);
  };

  /** string repeat helper, alternative to String.prototype.repeat.... See PR #382
   *
   * @method blaver.helpers.repeatString
   * @param {string} string
   * @param {number} num
   */
  self.repeatString = function (string, num) {
    if (typeof num === "undefined") {
      num = 0;
    }
    let text = "";
    for (let i = 0; i < num; i++) {
      text += string.toString();
    }
    return text;
  };

  /**
   * parse string patterns in a similar way to RegExp
   *
   * e.g. "#{3}test[1-5]" -> "###test4"
   *
   * @method blaver.helpers.regexpStyleStringParse
   * @param {string} string
   */
  self.regexpStyleStringParse = function (string) {
    string = string || "";
    // Deal with range repeat `{min,max}`
    const RANGE_REP_REG = /(.)\{(\d+)\,(\d+)\}/;
    const REP_REG = /(.)\{(\d+)\}/;
    const RANGE_REG = /\[(\d+)\-(\d+)\]/;
    let min, max, tmp, repetitions;
    let token = string.match(RANGE_REP_REG);
    while (token !== null) {
      min = parseInt(token[2]);
      max = parseInt(token[3]);
      // switch min and max
      if (min > max) {
        tmp = max;
        max = min;
        min = tmp;
      }
      repetitions = blaver.datatype.number({ min: min, max: max });
      string =
        string.slice(0, token.index) +
        blaver.helpers.repeatString(token[1], repetitions) +
        string.slice(token.index + token[0].length);
      token = string.match(RANGE_REP_REG);
    }
    // Deal with repeat `{num}`
    token = string.match(REP_REG);
    while (token !== null) {
      repetitions = parseInt(token[2]);
      string =
        string.slice(0, token.index) +
        blaver.helpers.repeatString(token[1], repetitions) +
        string.slice(token.index + token[0].length);
      token = string.match(REP_REG);
    }
    // Deal with range `[min-max]` (only works with numbers for now)
    //TODO: implement for letters e.g. [0-9a-zA-Z] etc.

    token = string.match(RANGE_REG);
    while (token !== null) {
      min = parseInt(token[1]); // This time we are not capturing the char before `[]`
      max = parseInt(token[2]);
      // switch min and max
      if (min > max) {
        tmp = max;
        max = min;
        min = tmp;
      }
      string =
        string.slice(0, token.index) +
        blaver.datatype.number({ min: min, max: max }).toString() +
        string.slice(token.index + token[0].length);
      token = string.match(RANGE_REG);
    }
    return string;
  };

  /**
   * takes an array and randomizes it in place then returns it
   *
   * uses the modern version of the Fisher–Yates algorithm
   *
   * @method blaver.helpers.shuffle
   * @param {array} o
   */
  self.shuffle = function (o) {
    if (typeof o === "undefined" || o.length === 0) {
      return o || [];
    }
    o = o || ["a", "b", "c"];
    for (let x, j, i = o.length - 1; i > 0; --i) {
      j = blaver.datatype.number(i);
      x = o[i];
      o[i] = o[j];
      o[j] = x;
    }
    return o;
  };

  /**
   * takes an array of strings or function that returns a string
   * and outputs a unique array of strings based on that source
   * @example uniqueArray(blaver.random.word, 50)
   * @example uniqueArray(blaver.definitions.name.first_name, 6)
   * @example uniqueArray(["Hello", "World", "Goodbye"], 2)
   * @method blaver.helpers.uniqueArray
   * @param {string[]} source
   * @param {number} length
   * @returns {string[]}
  */
   self.uniqueArray = function(source, length) {
    if (Array.isArray(source)) {
      const set = new Set(source);
      const array = Array.from(set);
      return blaver.helpers.shuffle(array).splice(0, length);
    }
    const set = new Set();
    try {
      if (typeof source === "function") {
        while (set.size < length) {
          set.add(source());
        }
      }
    } finally {
      return Array.from(set);
    }
  };

  /**
   * mustache
   *
   * @method blaver.helpers.mustache
   * @param {string} str
   * @param {object} data
   */
  self.mustache = function (str, data) {
    if (typeof str === "undefined") {
      return "";
    }
    for (const p in data) {
      const re = new RegExp("{{" + p + "}}", "g");
      str = str.replace(re, data[p]);
    }
    return str;
  };

  /**
   * createCard
   *
   * @method blaver.helpers.createCard
   */
  self.createCard = function () {
    return {
      name: blaver.name.findName(),
      username: blaver.internet.userName(),
      email: blaver.internet.email(),
      address: {
        streetA: blaver.address.streetName(),
        streetB: blaver.address.streetAddress(),
        streetC: blaver.address.streetAddress(true),
        streetD: blaver.address.secondaryAddress(),
        city: blaver.address.city(),
        state: blaver.address.state(),
        country: blaver.address.country(),
        zipcode: blaver.address.zipCode(),
        geo: {
          lat: blaver.address.latitude(),
          lng: blaver.address.longitude(),
        },
      },
      phone: blaver.phone.phoneNumber(),
      website: blaver.internet.domainName(),
      company: {
        name: blaver.company.companyName(),
        catchPhrase: blaver.company.catchPhrase(),
        bs: blaver.company.bs(),
      },
      posts: [
        {
          words: blaver.lorem.words(),
          sentence: blaver.lorem.sentence(),
          sentences: blaver.lorem.sentences(),
          paragraph: blaver.lorem.paragraph(),
        },
        {
          words: blaver.lorem.words(),
          sentence: blaver.lorem.sentence(),
          sentences: blaver.lorem.sentences(),
          paragraph: blaver.lorem.paragraph(),
        },
        {
          words: blaver.lorem.words(),
          sentence: blaver.lorem.sentence(),
          sentences: blaver.lorem.sentences(),
          paragraph: blaver.lorem.paragraph(),
        },
      ],
      accountHistory: [
        blaver.helpers.createTransaction(),
        blaver.helpers.createTransaction(),
        blaver.helpers.createTransaction(),
      ],
    };
  };

  /**
   * contextualCard
   *
   * @method blaver.helpers.contextualCard
   */
  self.contextualCard = function () {
    const name = blaver.name.firstName(),
      userName = blaver.internet.userName(name);
    return {
      name: name,
      username: userName,
      avatar: blaver.internet.avatar(),
      email: blaver.internet.email(userName),
      dob: blaver.date.past(
        50,
        new Date("Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)")
      ),
      phone: blaver.phone.phoneNumber(),
      address: {
        street: blaver.address.streetName(true),
        suite: blaver.address.secondaryAddress(),
        city: blaver.address.city(),
        zipcode: blaver.address.zipCode(),
        geo: {
          lat: blaver.address.latitude(),
          lng: blaver.address.longitude(),
        },
      },
      website: blaver.internet.domainName(),
      company: {
        name: blaver.company.companyName(),
        catchPhrase: blaver.company.catchPhrase(),
        bs: blaver.company.bs(),
      },
    };
  };

  /**
   * userCard
   *
   * @method blaver.helpers.userCard
   */
  self.userCard = function () {
    return {
      name: blaver.name.findName(),
      username: blaver.internet.userName(),
      email: blaver.internet.email(),
      address: {
        street: blaver.address.streetName(true),
        suite: blaver.address.secondaryAddress(),
        city: blaver.address.city(),
        zipcode: blaver.address.zipCode(),
        geo: {
          lat: blaver.address.latitude(),
          lng: blaver.address.longitude(),
        },
      },
      phone: blaver.phone.phoneNumber(),
      website: blaver.internet.domainName(),
      company: {
        name: blaver.company.companyName(),
        catchPhrase: blaver.company.catchPhrase(),
        bs: blaver.company.bs(),
      },
    };
  };

  /**
   * createTransaction
   *
   * @method blaver.helpers.createTransaction
   */
  self.createTransaction = function () {
    return {
      amount: blaver.finance.amount(),
      date: new Date(2012, 1, 2), //TODO: add a ranged date method
      business: blaver.company.companyName(),
      name: [
        blaver.finance.accountName(),
        blaver.finance.mask(),
      ].join(" "),
      type: self.randomize(blaver.definitions.finance.transaction_type),
      account: blaver.finance.account(),
    };
  };

  return self;
};

/*
String.prototype.capitalize = function () { //v1.0
    return this.replace(/\w+/g, function (a) {
        return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
    });
};
*/

module["exports"] = Helpers;
