const Blaver = require("../lib");
const blaver = new Blaver({ locale: "ro", localeFallback: "en" });
blaver.locales["ro"] = require("../lib/locales/ro");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
