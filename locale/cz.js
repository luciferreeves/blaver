const Blaver = require("../lib");
const blaver = new Blaver({ locale: "cz", localeFallback: "en" });
blaver.locales["cz"] = require("../lib/locales/cz");
blaver.locales["en"] = require("../lib/locales/en");
module.exports = blaver;
