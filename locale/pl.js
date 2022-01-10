const Blaver = require("../lib");
const blaver = new Blaver({ locale: "pl", localeFallback: "en" });
blaver.locales["pl"] = require("../lib/locales/pl");
blaver.locales["en"] = require("../lib/locales/en");
module.exports = blaver;
