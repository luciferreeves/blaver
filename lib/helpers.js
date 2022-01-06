/**
 *
 * @namespace bluffmaster.helpers
 */
var Helpers = function (bluffmaster) {

  var self = this;

  /**
   * backward-compatibility
   *
   * @method bluffmaster.helpers.randomize
   * @param {array} array
   */
  self.randomize = function (array) {
      array = array || ["a", "b", "c"];
      return bluffmaster.random.arrayElement(array);
  };

  /**
   * slugifies string
   *
   * @method bluffmaster.helpers.slugify
   * @param {string} string
   */
  self.slugify = function (string) {
      string = string || "";
      return string.replace(/ /g, '-').replace(/[^\一-龠\ぁ-ゔ\ァ-ヴー\w\.\-]+/g, '');
  };

  /**
   * parses string for a symbol and replace it with a random number from 1-10
   *
   * @method bluffmaster.helpers.replaceSymbolWithNumber
   * @param {string} string
   * @param {string} symbol defaults to `"#"`
   */
  self.replaceSymbolWithNumber = function (string, symbol) {
      string = string || "";
      // default symbol is '#'
      if (symbol === undefined) {
          symbol = '#';
      }

      var str = '';
      for (var i = 0; i < string.length; i++) {
          if (string.charAt(i) == symbol) {
              str += bluffmaster.datatype.number(9);
          } else if (string.charAt(i) == "!"){
              str += bluffmaster.datatype.number({min: 2, max: 9});
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
   * @method bluffmaster.helpers.replaceSymbols
   * @param {string} string
   */
  self.replaceSymbols = function (string) {
      string = string || "";
      var alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
      var str = '';

      for (var i = 0; i < string.length; i++) {
          if (string.charAt(i) == "#") {
              str += bluffmaster.datatype.number(9);
          } else if (string.charAt(i) == "?") {
              str += bluffmaster.random.arrayElement(alpha);
          } else if (string.charAt(i) == "*") {
            str += bluffmaster.datatype.boolean() ? bluffmaster.random.arrayElement(alpha) : bluffmaster.datatype.number(9);
          } else {
              str += string.charAt(i);
          }
      }
      return str;
  };

  /**
   * replace symbols in a credit card schems including Luhn checksum
   *
   * @method bluffmaster.helpers.replaceCreditCardSymbols
   * @param {string} string
   * @param {string} symbol
   */

   self.replaceCreditCardSymbols = function(string, symbol) {

     // default values required for calling method without arguments
     string = string || "6453-####-####-####-###L";
     symbol = symbol || "#";

     // Function calculating the Luhn checksum of a number string
     var getCheckBit = function(number) {
       number.reverse();
       number = number.map(function(num, index){
         if (index%2 === 0) {
           num *= 2;
           if(num>9) {
             num -= 9;
           }
         }
         return num;
       });
       var sum = number.reduce(function(prev,curr){return prev + curr;});
       return sum % 10;
     };

     string = bluffmaster.helpers.regexpStyleStringParse(string); // replace [4-9] with a random number in range etc...
     string = bluffmaster.helpers.replaceSymbolWithNumber(string, symbol); // replace ### with random numbers

     var numberList = string.replace(/\D/g,"").split("").map(function(num){return parseInt(num);});
     var checkNum = getCheckBit(numberList);
     return string.replace("L",checkNum);
   };

   /** string repeat helper, alternative to String.prototype.repeat.... See PR #382
   *
   * @method bluffmaster.helpers.repeatString
   * @param {string} string
   * @param {number} num
   */
   self.repeatString = function(string, num) {
     if(typeof num ==="undefined") {
       num = 0;
     }
     var text = "";
     for(var i = 0; i < num; i++){
       text += string.toString();
     }
     return text;
   };

   /**
    * parse string patterns in a similar way to RegExp
    *
    * e.g. "#{3}test[1-5]" -> "###test4"
    *
    * @method bluffmaster.helpers.regexpStyleStringParse
    * @param {string} string
    */
   self.regexpStyleStringParse = function(string){
     string = string || "";
     // Deal with range repeat `{min,max}`
     var RANGE_REP_REG = /(.)\{(\d+)\,(\d+)\}/;
     var REP_REG = /(.)\{(\d+)\}/;
     var RANGE_REG = /\[(\d+)\-(\d+)\]/;
     var min, max, tmp, repetitions;
     var token = string.match(RANGE_REP_REG);
     while(token !== null){
       min = parseInt(token[2]);
       max =  parseInt(token[3]);
       // switch min and max
       if(min>max) {
         tmp = max;
         max = min;
         min = tmp;
       }
       repetitions = bluffmaster.datatype.number({min:min,max:max});
       string = string.slice(0,token.index) + bluffmaster.helpers.repeatString(token[1], repetitions) + string.slice(token.index+token[0].length);
       token = string.match(RANGE_REP_REG);
     }
     // Deal with repeat `{num}`
     token = string.match(REP_REG);
     while(token !== null){
       repetitions = parseInt(token[2]);
       string = string.slice(0,token.index)+ bluffmaster.helpers.repeatString(token[1], repetitions) + string.slice(token.index+token[0].length);
       token = string.match(REP_REG);
     }
     // Deal with range `[min-max]` (only works with numbers for now)
     //TODO: implement for letters e.g. [0-9a-zA-Z] etc.

     token = string.match(RANGE_REG);
     while(token !== null){
       min = parseInt(token[1]); // This time we are not capturing the char before `[]`
       max =  parseInt(token[2]);
       // switch min and max
       if(min>max) {
         tmp = max;
         max = min;
         min = tmp;
       }
        string = string.slice(0,token.index) +
          bluffmaster.datatype.number({min:min, max:max}).toString() +
          string.slice(token.index+token[0].length);
        token = string.match(RANGE_REG);
     }
     return string;
   };

  /**
   * takes an array and randomizes it in place then returns it
   * 
   * uses the modern version of the Fisher–Yates algorithm
   *
   * @method bluffmaster.helpers.shuffle
   * @param {array} o
   */
  self.shuffle = function (o) {
      if (typeof o === 'undefined' || o.length === 0) {
        return o || [];
      }
      o = o || ["a", "b", "c"];
      for (var x, j, i = o.length - 1; i > 0; --i) {
        j = bluffmaster.datatype.number(i);
        x = o[i];
        o[i] = o[j];
        o[j] = x;
      }
      return o;
  };

  /**
   * mustache
   *
   * @method bluffmaster.helpers.mustache
   * @param {string} str
   * @param {object} data
   */
  self.mustache = function (str, data) {
    if (typeof str === 'undefined') {
      return '';
    }
    for(var p in data) {
      var re = new RegExp('{{' + p + '}}', 'g')
      str = str.replace(re, data[p]);
    }
    return str;
  };

  /**
   * createCard
   *
   * @method bluffmaster.helpers.createCard
   */
  self.createCard = function () {
      return {
          "name": bluffmaster.name.findName(),
          "username": bluffmaster.internet.userName(),
          "email": bluffmaster.internet.email(),
          "address": {
              "streetA": bluffmaster.address.streetName(),
              "streetB": bluffmaster.address.streetAddress(),
              "streetC": bluffmaster.address.streetAddress(true),
              "streetD": bluffmaster.address.secondaryAddress(),
              "city": bluffmaster.address.city(),
              "state": bluffmaster.address.state(),
              "country": bluffmaster.address.country(),
              "zipcode": bluffmaster.address.zipCode(),
              "geo": {
                  "lat": bluffmaster.address.latitude(),
                  "lng": bluffmaster.address.longitude()
              }
          },
          "phone": bluffmaster.phone.phoneNumber(),
          "website": bluffmaster.internet.domainName(),
          "company": {
              "name": bluffmaster.company.companyName(),
              "catchPhrase": bluffmaster.company.catchPhrase(),
              "bs": bluffmaster.company.bs()
          },
          "posts": [
              {
                  "words": bluffmaster.lorem.words(),
                  "sentence": bluffmaster.lorem.sentence(),
                  "sentences": bluffmaster.lorem.sentences(),
                  "paragraph": bluffmaster.lorem.paragraph()
              },
              {
                  "words": bluffmaster.lorem.words(),
                  "sentence": bluffmaster.lorem.sentence(),
                  "sentences": bluffmaster.lorem.sentences(),
                  "paragraph": bluffmaster.lorem.paragraph()
              },
              {
                  "words": bluffmaster.lorem.words(),
                  "sentence": bluffmaster.lorem.sentence(),
                  "sentences": bluffmaster.lorem.sentences(),
                  "paragraph": bluffmaster.lorem.paragraph()
              }
          ],
          "accountHistory": [bluffmaster.helpers.createTransaction(), bluffmaster.helpers.createTransaction(), bluffmaster.helpers.createTransaction()]
      };
  };

  /**
   * contextualCard
   *
   * @method bluffmaster.helpers.contextualCard
   */
  self.contextualCard = function () {
    var name = bluffmaster.name.firstName(),
        userName = bluffmaster.internet.userName(name);
    return {
        "name": name,
        "username": userName,
        "avatar": bluffmaster.internet.avatar(),
        "email": bluffmaster.internet.email(userName),
        "dob": bluffmaster.date.past(50, new Date("Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)")),
        "phone": bluffmaster.phone.phoneNumber(),
        "address": {
            "street": bluffmaster.address.streetName(true),
            "suite": bluffmaster.address.secondaryAddress(),
            "city": bluffmaster.address.city(),
            "zipcode": bluffmaster.address.zipCode(),
            "geo": {
                "lat": bluffmaster.address.latitude(),
                "lng": bluffmaster.address.longitude()
            }
        },
        "website": bluffmaster.internet.domainName(),
        "company": {
            "name": bluffmaster.company.companyName(),
            "catchPhrase": bluffmaster.company.catchPhrase(),
            "bs": bluffmaster.company.bs()
        }
    };
  };


  /**
   * userCard
   *
   * @method bluffmaster.helpers.userCard
   */
  self.userCard = function () {
      return {
          "name": bluffmaster.name.findName(),
          "username": bluffmaster.internet.userName(),
          "email": bluffmaster.internet.email(),
          "address": {
              "street": bluffmaster.address.streetName(true),
              "suite": bluffmaster.address.secondaryAddress(),
              "city": bluffmaster.address.city(),
              "zipcode": bluffmaster.address.zipCode(),
              "geo": {
                  "lat": bluffmaster.address.latitude(),
                  "lng": bluffmaster.address.longitude()
              }
          },
          "phone": bluffmaster.phone.phoneNumber(),
          "website": bluffmaster.internet.domainName(),
          "company": {
              "name": bluffmaster.company.companyName(),
              "catchPhrase": bluffmaster.company.catchPhrase(),
              "bs": bluffmaster.company.bs()
          }
      };
  };

  /**
   * createTransaction
   *
   * @method bluffmaster.helpers.createTransaction
   */
  self.createTransaction = function(){
    return {
      "amount" : bluffmaster.finance.amount(),
      "date" : new Date(2012, 1, 2),  //TODO: add a ranged date method
      "business": bluffmaster.company.companyName(),
      "name": [bluffmaster.finance.accountName(), bluffmaster.finance.mask()].join(' '),
      "type" : self.randomize(bluffmaster.definitions.finance.transaction_type),
      "account" : bluffmaster.finance.account()
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

module['exports'] = Helpers;
