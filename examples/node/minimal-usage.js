#!/usr/bin/env node

var blaver = require("../../index");
blaver.locale = "fi";

//console.log(blaver.lorem.sentences())

console.log(blaver.name.findName());
return;
//console.log(blaver.address)
console.log(blaver.internet.email());
console.log(blaver.date.recent());
console.log(blaver.helpers.contextualCard());

blaver.locale = "uk";

console.log(blaver.helpers.contextualCard());
