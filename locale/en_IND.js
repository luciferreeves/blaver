var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "en_IND", localeFallback: "en" });
bluffmaster.locales["en_IND"] = require("../lib/locales/en_IND");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
