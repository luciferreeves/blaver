var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "fi", localeFallback: "en" });
bluffmaster.locales["fi"] = require("../lib/locales/fi");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
