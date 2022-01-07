const Blaver = require("../lib");
const blaver = new Blaver({ locale: "es_MX", localeFallback: "en" });
blaver.locales["es_MX"] = require("../lib/locales/es_MX");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
