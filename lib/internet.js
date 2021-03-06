var random_ua = require("../vendor/user-agent");

/**
 *
 * @namespace blaver.internet
 */
var Internet = function (blaver) {
  var self = this;
  /**
   * avatar
   *
   * @method blaver.internet.avatar
   */
  self.avatar = function () {
    return (
      "https://i.pravatar.cc/?u=" +
      blaver.random.arrayElement(
        blaver.definitions.internet.avatar_uri
      )
    );
  };

  self.avatar.schema = {
    description: "Generates a URL for an avatar.",
    sampleResults: ["https://i.pravatar.cc/?u=sydlawrence_128.jpg"],
  };

  /**
   * email
   *
   * @method blaver.internet.email
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} provider
   */
  self.email = function (firstName, lastName, provider) {
    provider =
      provider ||
      blaver.random.arrayElement(
        blaver.definitions.internet.free_email
      );
    return (
      blaver.helpers.slugify(
        blaver.internet.userName(firstName, lastName)
      ) +
      "@" +
      provider
    );
  };

  self.email.schema = {
    description:
      "Generates a valid email address based on optional input criteria",
    sampleResults: ["foo.bar@gmail.com"],
    properties: {
      firstName: {
        type: "string",
        required: false,
        description: "The first name of the user",
      },
      lastName: {
        type: "string",
        required: false,
        description: "The last name of the user",
      },
      provider: {
        type: "string",
        required: false,
        description: "The domain of the user",
      },
    },
  };
  /**
   * exampleEmail
   *
   * @method blaver.internet.exampleEmail
   * @param {string} firstName
   * @param {string} lastName
   */
  self.exampleEmail = function (firstName, lastName) {
    var provider = blaver.random.arrayElement(
      blaver.definitions.internet.example_email
    );
    return self.email(firstName, lastName, provider);
  };

  /**
   * userName
   *
   * @method blaver.internet.userName
   * @param {string} firstName
   * @param {string} lastName
   */
  self.userName = function (firstName, lastName) {
    var result;
    firstName = firstName || blaver.name.firstName();
    lastName = lastName || blaver.name.lastName();
    switch (blaver.datatype.number(2)) {
      case 0:
        result = firstName + blaver.datatype.number(99);
        break;
      case 1:
        result =
          firstName + blaver.random.arrayElement([".", "_"]) + lastName;
        break;
      case 2:
        result =
          firstName +
          blaver.random.arrayElement([".", "_"]) +
          lastName +
          blaver.datatype.number(99);
        break;
    }
    result = result.toString().replace(/'/g, "");
    result = result.replace(/ /g, "");
    return result;
  };

  self.userName.schema = {
    description:
      "Generates a username based on one of several patterns. The pattern is chosen randomly.",
    sampleResults: [
      "Kirstin39",
      "Kirstin.Smith",
      "Kirstin.Smith39",
      "KirstinSmith",
      "KirstinSmith39",
    ],
    properties: {
      firstName: {
        type: "string",
        required: false,
        description: "The first name of the user",
      },
      lastName: {
        type: "string",
        required: false,
        description: "The last name of the user",
      },
    },
  };

  /**
   * protocol
   *
   * @method blaver.internet.protocol
   */
  self.protocol = function () {
    var protocols = ["http", "https"];
    return blaver.random.arrayElement(protocols);
  };

  self.protocol.schema = {
    description: "Randomly generates http or https",
    sampleResults: ["https", "http"],
  };

  /**
   * method
   *
   * @method blaver.internet.httpMethod
   */
  self.httpMethod = function () {
    var httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
    return blaver.random.arrayElement(httpMethods);
  };

  self.httpMethod.schema = {
    description:
      "Randomly generates HTTP Methods (GET, POST, PUT, DELETE, PATCH)",
    sampleResults: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  };

  /**
   * url
   *
   * @method blaver.internet.url
   */
  self.url = function () {
    return (
      blaver.internet.protocol() +
      "://" +
      blaver.internet.domainName()
    );
  };

  self.url.schema = {
    description: "Generates a random URL. The URL could be secure or insecure.",
    sampleResults: ["http://rashawn.name", "https://rashawn.name"],
  };

  /**
   * domainName
   *
   * @method blaver.internet.domainName
   */
  self.domainName = function () {
    return (
      blaver.internet.domainWord() +
      "." +
      blaver.internet.domainSuffix()
    );
  };

  self.domainName.schema = {
    description: "Generates a random domain name.",
    sampleResults: ["marvin.org"],
  };

  /**
   * domainSuffix
   *
   * @method blaver.internet.domainSuffix
   */
  self.domainSuffix = function () {
    return blaver.random.arrayElement(
      blaver.definitions.internet.domain_suffix
    );
  };

  self.domainSuffix.schema = {
    description: "Generates a random domain suffix.",
    sampleResults: ["net"],
  };

  /**
   * domainWord
   *
   * @method blaver.internet.domainWord
   */
  self.domainWord = function () {
    return (blaver.word.adjective() + "-" + blaver.word.noun())
      .replace(/([\\~#&*{}/:<>?|\"'])/gi, "")
      .toLowerCase();
  };

  self.domainWord.schema = {
    description: "Generates a random domain word.",
    sampleResults: ["alyce"],
  };

  /**
   * ip
   *
   * @method blaver.internet.ip
   */
  self.ip = function () {
    var randNum = function () {
      return blaver.datatype.number(255).toFixed(0);
    };

    var result = [];
    for (var i = 0; i < 4; i++) {
      result[i] = randNum();
    }

    return result.join(".");
  };

  self.ip.schema = {
    description: "Generates a random IP.",
    sampleResults: ["97.238.241.11"],
  };

  /**
   * ipv6
   *
   * @method blaver.internet.ipv6
   */
  self.ipv6 = function () {
    var randHash = function () {
      var result = "";
      for (var i = 0; i < 4; i++) {
        result += blaver.random.arrayElement([
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
        ]);
      }
      return result;
    };

    var result = [];
    for (var i = 0; i < 8; i++) {
      result[i] = randHash();
    }
    return result.join(":");
  };

  self.ipv6.schema = {
    description: "Generates a random IPv6 address.",
    sampleResults: ["2001:0db8:6276:b1a7:5213:22f1:25df:c8a0"],
  };

  /**
   * port
   *
   * @method blaver.internet.port
   */
  self.port = function () {
    return blaver.datatype.number({ min: 0, max: 65535 });
  };

  self.port.schema = {
    description: "Generates a random port number.",
    sampleResults: ["4422"],
  };

  /**
   * userAgent
   *
   * @method blaver.internet.userAgent
   */
  self.userAgent = function () {
    return random_ua.generate(blaver);
  };

  self.userAgent.schema = {
    description: "Generates a random user agent.",
    sampleResults: [
      "Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_7_5 rv:6.0; SL) AppleWebKit/532.0.1 (KHTML, like Gecko) Version/7.1.6 Safari/532.0.1",
    ],
  };

  /**
   * color
   *
   * @method blaver.internet.color
   * @param {number} baseRed255
   * @param {number} baseGreen255
   * @param {number} baseBlue255
   */
  self.color = function (baseRed255, baseGreen255, baseBlue255) {
    baseRed255 = baseRed255 || 0;
    baseGreen255 = baseGreen255 || 0;
    baseBlue255 = baseBlue255 || 0;
    // based on awesome response : http://stackoverflow.com/questions/43044/algorithm-to-randomly-generate-an-aesthetically-pleasing-color-palette
    var red = Math.floor((blaver.datatype.number(256) + baseRed255) / 2);
    var green = Math.floor(
      (blaver.datatype.number(256) + baseGreen255) / 2
    );
    var blue = Math.floor((blaver.datatype.number(256) + baseBlue255) / 2);
    var redStr = red.toString(16);
    var greenStr = green.toString(16);
    var blueStr = blue.toString(16);
    return (
      "#" +
      (redStr.length === 1 ? "0" : "") +
      redStr +
      (greenStr.length === 1 ? "0" : "") +
      greenStr +
      (blueStr.length === 1 ? "0" : "") +
      blueStr
    );
  };

  self.color.schema = {
    description: "Generates a random hexadecimal color.",
    sampleResults: ["#06267f"],
    properties: {
      baseRed255: {
        type: "number",
        required: false,
        description: "The red value. Valid values are 0 - 255.",
      },
      baseGreen255: {
        type: "number",
        required: false,
        description: "The green value. Valid values are 0 - 255.",
      },
      baseBlue255: {
        type: "number",
        required: false,
        description: "The blue value. Valid values are 0 - 255.",
      },
    },
  };

  /**
   * mac
   *
   * @method blaver.internet.mac
   * @param {string} sep
   */
  self.mac = function (sep) {
    var i,
      mac = "",
      validSep = ":";

    // if the client passed in a different separator than `:`,
    // we will use it if it is in the list of acceptable separators (dash or no separator)
    if (["-", ""].indexOf(sep) !== -1) {
      validSep = sep;
    }

    for (i = 0; i < 12; i++) {
      mac += blaver.datatype.number(15).toString(16);
      if (i % 2 == 1 && i != 11) {
        mac += validSep;
      }
    }
    return mac;
  };

  self.mac.schema = {
    description: "Generates a random mac address.",
    sampleResults: ["78:06:cc:ae:b3:81"],
  };

  /**
   * password
   *
   * @method blaver.internet.password
   * @param {number} len
   * @param {boolean} memorable
   * @param {string} pattern
   * @param {string} prefix
   */
  self.password = function (len, memorable, pattern, prefix) {
    len = len || 15;
    if (typeof memorable === "undefined") {
      memorable = false;
    }
    /*
     * password-generator ( function )
     * Copyright(c) 2011-2013 Bermi Ferrer <bermi@bermilabs.com>
     * MIT Licensed
     */
    var consonant, letter, vowel;
    letter = /[a-zA-Z]$/;
    vowel = /[aeiouAEIOU]$/;
    consonant = /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]$/;
    var _password = function (length, memorable, pattern, prefix) {
      var char, n;
      if (length == null) {
        length = 10;
      }
      if (memorable == null) {
        memorable = true;
      }
      if (pattern == null) {
        pattern = /\w/;
      }
      if (prefix == null) {
        prefix = "";
      }
      if (prefix.length >= length) {
        return prefix;
      }
      if (memorable) {
        if (prefix.match(consonant)) {
          pattern = vowel;
        } else {
          pattern = consonant;
        }
      }
      n = blaver.datatype.number(94) + 33;
      char = String.fromCharCode(n);
      if (memorable) {
        char = char.toLowerCase();
      }
      if (!char.match(pattern)) {
        return _password(length, memorable, pattern, prefix);
      }
      return _password(length, memorable, pattern, "" + prefix + char);
    };
    return _password(len, memorable, pattern, prefix);
  };

  self.password.schema = {
    description: "Generates a random password.",
    sampleResults: ["AM7zl6Mg", "susejofe"],
    properties: {
      length: {
        type: "number",
        required: false,
        description: "The number of characters in the password.",
      },
      memorable: {
        type: "boolean",
        required: false,
        description: "Whether a password should be easy to remember.",
      },
      pattern: {
        type: "regex",
        required: false,
        description:
          "A regex to match each character of the password against. This parameter will be negated if the memorable setting is turned on.",
      },
      prefix: {
        type: "string",
        required: false,
        description:
          "A value to prepend to the generated password. The prefix counts towards the length of the password.",
      },
    },
  };
};

module["exports"] = Internet;
