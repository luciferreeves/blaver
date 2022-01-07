var blaver = require("../../index");

blaver.locale = "en";

console.log(
  blaver.fake("{{random.uuid}}, {{name.firstName}} {{name.suffix}}")
);

return;

console.log(blaver.fake("{{finance.currencyName}} - {{finance.amount}}"));

console.log(blaver.fake("{{name.firstName}} {{name.lastName}}"));
