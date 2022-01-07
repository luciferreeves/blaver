const Blaver = require("../lib");
const blaver = new Blaver({ locale: "ge", localeFallback: "en" });
blaver.locales["ge"] = require("../lib/locales/ge");
blaver.locales["en"] = require("../lib/locales/en");
module.exports = blaver;
