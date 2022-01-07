const Blaver = require("../lib");
const blaver = new Blaver({ locale: "el", localeFallback: "en" });
blaver.locales["el"] = require("../lib/locales/el");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
