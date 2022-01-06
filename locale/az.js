var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "az", localeFallback: "en" });
bluffmaster.locales["az"] = require("../lib/locales/az");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
