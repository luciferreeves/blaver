const Blaver = require("../lib");
const blaver = new Blaver({ locale: "tr", localeFallback: "en" });
blaver.locales["tr"] = require("../lib/locales/tr");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
