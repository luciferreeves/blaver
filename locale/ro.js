var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "ro", localeFallback: "en" });
bluffmaster.locales["ro"] = require("../lib/locales/ro");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
