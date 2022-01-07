const Blaver = require("../lib");
const blaver = new Blaver({ locale: "sv", localeFallback: "en" });
blaver.locales["sv"] = require("../lib/locales/sv");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
