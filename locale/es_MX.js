var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "es_MX", localeFallback: "en" });
bluffmaster.locales["es_MX"] = require("../lib/locales/es_MX");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
