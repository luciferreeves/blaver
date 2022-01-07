const Blaver = require("../lib");
const blaver = new Blaver({ locale: "en", localeFallback: "en" });
blaver.locales["en"] = require("../lib/locales/en");
module.exports = blaver;
