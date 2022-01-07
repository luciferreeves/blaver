var Blaver = require("../lib");
var blaver = new Blavercale({ locale: "ge", localeFallback: "en" });
blaver.locales["ge"] = require("../lib/locales/ge");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
