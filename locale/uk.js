var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "uk", localeFallback: "en" });
bluffmaster.locales["uk"] = require("../lib/locales/uk");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
