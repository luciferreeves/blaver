var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "de_CH", localeFallback: "en" });
bluffmaster.locales["de_CH"] = require("../lib/locales/de_CH");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
