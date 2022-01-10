const Blaver = require("../lib");
const blaver = new Blaver({ locale: "af_ZA", localeFallback: "en" });
blaver.locales["af_ZA"] = require("../lib/locales/af_ZA");
blaver.locales["en"] = require("../lib/locales/en");
module.exports = blaver;
