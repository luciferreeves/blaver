const Blaver = require("../lib");
const blaver = new Blaver({ locale: "fi", localeFallback: "en" });
blaver.locales["fi"] = require("../lib/locales/fi");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
