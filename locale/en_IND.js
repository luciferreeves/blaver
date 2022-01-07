const Blaver = require("../lib");
const blaver = new Blaver({ locale: "en_IND", localeFallback: "en" });
blaver.locales["en_IND"] = require("../lib/locales/en_IND");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
