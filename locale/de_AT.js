var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "de_AT", localeFallback: "en" });
bluffmaster.locales["de_AT"] = require("../lib/locales/de_AT");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
