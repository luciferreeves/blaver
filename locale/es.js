const Blaver = require("../lib");
const blaver = new Blaver({ locale: "es", localeFallback: "en" });
blaver.locales["es"] = require("../lib/locales/es");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
