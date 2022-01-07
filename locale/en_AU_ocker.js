const Blaver = require("../lib");
const blaver = new Blaver({
  locale: "en_AU_ocker",
  localeFallback: "en",
});
blaver.locales["en_AU_ocker"] = require("../lib/locales/en_AU_ocker");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
