var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "fr_CH", localeFallback: "en" });
bluffmaster.locales["fr_CH"] = require("../lib/locales/fr_CH");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
