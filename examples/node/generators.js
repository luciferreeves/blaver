var bluffmaster = require("../../index");

bluffmaster.locale = "en";

console.log(
  bluffmaster.fake("{{random.uuid}}, {{name.firstName}} {{name.suffix}}")
);

return;

console.log(bluffmaster.fake("{{finance.currencyName}} - {{finance.amount}}"));

console.log(bluffmaster.fake("{{name.firstName}} {{name.lastName}}"));
