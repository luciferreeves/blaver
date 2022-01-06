var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "fr", localeFallback: "en" });
bluffmaster.locales["fr"] = require("../lib/locales/fr");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
