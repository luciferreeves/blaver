const Blaver = require("../lib");
const blaver = new Blaver({ locale: "fa", localeFallback: "en" });
blaver.locales["fa"] = require("../lib/locales/fa");
blaver.locales["en"] = require("../lib/locales/en");
module.exports = blaver;
