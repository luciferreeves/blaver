const Blaver = require("../lib");
const blaver = new Blaver({ locale: "fr_CH", localeFallback: "en" });
blaver.locales["fr_CH"] = require("../lib/locales/fr_CH");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
