var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "hy", localeFallback: "en" });
bluffmaster.locales["hy"] = require("../lib/locales/hy");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
