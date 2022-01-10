const Blaver = require("../lib");
const blaver = new Blaver({ locale: "en_AU", localeFallback: "en" });
blaver.locales["en_AU"] = require("../lib/locales/en_AU");
blaver.locales["en"] = require("../lib/locales/en");
module.exports = blaver;
