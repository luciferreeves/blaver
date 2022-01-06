var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "fa", localeFallback: "en" });
bluffmaster.locales["fa"] = require("../lib/locales/fa");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
