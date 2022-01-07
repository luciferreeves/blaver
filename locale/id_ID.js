var Blaver = require("../lib");
var blaver = new Blaver({ locale: "id_ID", localeFallback: "en" });
blaver.locales["id_ID"] = require("../lib/locales/id_ID");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
