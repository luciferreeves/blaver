const Blaver = require("../lib");
const blaver = new Blaver({ locale: "en_IE", localeFallback: "en" });
blaver.locales["en_IE"] = require("../lib/locales/en_IE");
blaver.locales["en"] = require("../lib/locales/en");
module.exports = blaver;
