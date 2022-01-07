const Blaver = require("../lib");
const blaver = new Blaver({ locale: "de_CH", localeFallback: "en" });
blaver.locales["de_CH"] = require("../lib/locales/de_CH");
blaver.locales["en"] = require("../lib/locales/en");
module.exports = blaver;
