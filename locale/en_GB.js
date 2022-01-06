var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "en_GB", localeFallback: "en" });
bluffmaster.locales["en_GB"] = require("../lib/locales/en_GB");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
