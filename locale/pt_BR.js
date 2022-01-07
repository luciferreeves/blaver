const Blaver = require("../lib");
const blaver = new Blaver({ locale: "pt_BR", localeFallback: "en" });
blaver.locales["pt_BR"] = require("../lib/locales/pt_BR");
blaver.locales["en"] = require("../lib/locales/en");
module.exports = blaver;
