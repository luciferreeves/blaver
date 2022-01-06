var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "en", localeFallback: "en" });
bluffmaster.locales["en"] = require("../lib/locales/en");

module["exports"] = bluffmaster;
