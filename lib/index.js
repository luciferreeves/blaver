/*

   this index.js file is used for including the blaver library as a CommonJS module, instead of a bundle

   you can include the blaver library into your existing node.js application by requiring the entire /blaver directory

    const blaver = require(./blaver);
    const randomName = blaver.name.findName();

   you can also simply include the "blaver.js" file which is the auto-generated bundled version of the blaver library

    const blaver = require(./customAppPath/blaver);
    const randomName = blaver.name.findName();


  if you plan on modifying the blaver library you should be performing your changes in the /lib/ directory

*/

/**
 *
 * @namespace blaver
 */
function Blaver(opts) {
  const self = this;

  opts = opts || {};

  // assign options
  const locales = self.locales || opts.locales || {};
  const locale = self.locale || opts.locale || "en";
  const localeFallback = self.localeFallback || opts.localeFallback || "en";

  self.locales = locales;
  self.locale = locale;
  self.localeFallback = localeFallback;

  self.definitions = {};

  const _definitions = {
    name: [
      "first_name",
      "last_name",
      "prefix",
      "suffix",
      "binary_gender",
      "gender",
      "title",
      "male_prefix",
      "female_prefix",
      "male_first_name",
      "female_first_name",
      "male_middle_name",
      "female_middle_name",
      "male_last_name",
      "female_last_name",
    ],
    address: [
      "city_name",
      "city_prefix",
      "city_suffix",
      "street_suffix",
      "county",
      "country",
      "country_code",
      "country_code_alpha_3",
      "state",
      "state_abbr",
      "street_prefix",
      "postcode",
      "postcode_by_state",
      "direction",
      "direction_abbr",
      "time_zone",
    ],
    animal: [
      "dog",
      "cat",
      "snake",
      "bear",
      "lion",
      "cetacean",
      "insect",
      "crocodilia",
      "cow",
      "bird",
      "fish",
      "rabbit",
      "horse",
      "type",
    ],
    company: [
      "adjective",
      "noun",
      "descriptor",
      "bs_adjective",
      "bs_noun",
      "bs_verb",
      "suffix",
    ],
    lorem: ["words"],
    hacker: ["abbreviation", "adjective", "noun", "verb", "ingverb", "phrase"],
    phone_number: ["formats"],
    finance: [
      "account_type",
      "transaction_type",
      "currency",
      "iban",
      "credit_card",
    ],
    internet: [
      "avatar_uri",
      "domain_suffix",
      "free_email",
      "example_email",
      "password",
    ],
    commerce: [
      "color",
      "department",
      "product_name",
      "price",
      "categories",
      "product_description",
    ],
    database: ["collation", "column", "engine", "type"],
    system: ["mimeTypes", "directoryPaths"],
    date: ["month", "weekday"],
    vehicle: [
      "vehicle",
      "manufacturer",
      "model",
      "type",
      "fuel",
      "vin",
      "color",
    ],
    music: ["genre"],
    word: [
      "adjective",
      "adverb",
      "conjunction",
      "interjection",
      "noun",
      "preposition",
      "verb",
    ],
    title: "",
    separator: "",
  };

  // Create a Getter for all definitions.foo.bar properties
  Object.keys(_definitions).forEach(function (d) {
    if (typeof self.definitions[d] === "undefined") {
      self.definitions[d] = {};
    }

    if (typeof _definitions[d] === "string") {
      self.definitions[d] = _definitions[d];
      return;
    }

    _definitions[d].forEach(function (p) {
      Object.defineProperty(self.definitions[d], p, {
        get: function () {
          if (
            typeof self.locales[self.locale][d] === "undefined" ||
            typeof self.locales[self.locale][d][p] === "undefined"
          ) {
            // certain localization sets contain less data then others.
            // in the case of a missing definition, use the default localeFallback to substitute the missing set data
            // throw new Error('unknown property ' + d + p)
            return self.locales[localeFallback][d][p];
          } else {
            // return localized data
            return self.locales[self.locale][d][p];
          }
        },
      });
    });
  });

  const Fake = require("./fake");
  self.fake = new Fake(self).fake;

  const Unique = require("./unique");
  self.unique = new Unique(self).unique;

  const Mersenne = require("./mersenne");
  self.mersenne = new Mersenne();

  const Random = require("./random");
  self.random = new Random(self);

  const Helpers = require("./helpers");
  self.helpers = new Helpers(self);

  const Name = require("./name");
  self.name = new Name(self);

  const Address = require("./address");
  self.address = new Address(self);

  const Animal = require("./animal");
  self.animal = new Animal(self);

  const Company = require("./company");
  self.company = new Company(self);

  const Finance = require("./finance");
  self.finance = new Finance(self);

  const Image = require("./image");
  self.image = new Image(self);

  const Lorem = require("./lorem");
  self.lorem = new Lorem(self);

  const Hacker = require("./hacker");
  self.hacker = new Hacker(self);

  const Internet = require("./internet");
  self.internet = new Internet(self);

  const Database = require("./database");
  self.database = new Database(self);

  const Phone = require("./phone_number");
  self.phone = new Phone(self);

  const _Date = require("./date");
  self.date = new _Date(self);

  const _Time = require("./time");
  self.time = new _Time(self);

  const Commerce = require("./commerce");
  self.commerce = new Commerce(self);

  const System = require("./system");
  self.system = new System(self);

  const Git = require("./git");
  self.git = new Git(self);

  const Vehicle = require("./vehicle");
  self.vehicle = new Vehicle(self);

  const Music = require("./music");
  self.music = new Music(self);

  const Datatype = require("./datatype");
  self.datatype = new Datatype(self);

  const Word = require("./word");
  self.word = new Word(self);
}

Blaver.prototype.setLocale = function (locale) {
  this.locale = locale;
};

Blaver.prototype.seed = function (value) {
  const Random = require("./random");
  const Datatype = require("./datatype");
  this.seedValue = value;
  this.random = new Random(this, this.seedValue);
  this.datatype = new Datatype(this, this.seedValue);
};
module.exports = Blaver
