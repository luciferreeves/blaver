const Blaver = require("../lib");
const blaver = new Blaver({ locale: "hr", localeFallback: "en" });
blaver.locales["hr"] = require("../lib/locales/hr");
blaver.locales["en"] = require("../lib/locales/en");
module.exports = blaver;
