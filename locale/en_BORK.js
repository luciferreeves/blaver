const Blaver = require("../lib");
const blaver = new Blaver({ locale: "en_BORK", localeFallback: "en" });
blaver.locales["en_BORK"] = require("../lib/locales/en_BORK");
blaver.locales["en"] = require("../lib/locales/en");
module.exports = blaver;
