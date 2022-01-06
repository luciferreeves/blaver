var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "ko", localeFallback: "en" });
bluffmaster.locales["ko"] = require("../lib/locales/ko");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
