const Blaver = require("../lib");
const blaver = new Blaver({ locale: "ar", localeFallback: "en" });
blaver.locales["ar"] = require("../lib/locales/ar");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
