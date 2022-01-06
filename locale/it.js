var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "it", localeFallback: "en" });
bluffmaster.locales["it"] = require("../lib/locales/it");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
