var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "nl", localeFallback: "en" });
bluffmaster.locales["nl"] = require("../lib/locales/nl");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
