var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "ja", localeFallback: "en" });
bluffmaster.locales["ja"] = require("../lib/locales/ja");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
