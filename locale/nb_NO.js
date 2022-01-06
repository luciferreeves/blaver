var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "nb_NO", localeFallback: "en" });
bluffmaster.locales["nb_NO"] = require("../lib/locales/nb_NO");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
