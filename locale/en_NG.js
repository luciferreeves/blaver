const Blaver = require("../lib");
const blaver = new Blaver({ locale: "en_NG", localeFallback: "en" });
blaver.locales["en_NG"] = require("../lib/locales/en_NG");
blaver.locales["en"] = require("../lib/locales/en");
module.exports = blaver;
