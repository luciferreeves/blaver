var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "ru", localeFallback: "en" });
bluffmaster.locales["ru"] = require("../lib/locales/ru");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
