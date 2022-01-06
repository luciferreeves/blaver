var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "en_BORK", localeFallback: "en" });
bluffmaster.locales["en_BORK"] = require("../lib/locales/en_BORK");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
