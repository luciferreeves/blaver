const Blaver = require("../lib");
const blaver = new Blaver({ locale: "pt_PT", localeFallback: "en" });
blaver.locales["pt_PT"] = require("../lib/locales/pt_PT");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
