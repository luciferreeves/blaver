var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "ne", localeFallback: "en" });
bluffmaster.locales["ne"] = require("../lib/locales/ne");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
