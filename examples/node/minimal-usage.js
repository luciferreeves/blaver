#!/usr/bin/env node

var bluffmaster = require('../../index');
bluffmaster.locale = "fi";

//console.log(bluffmaster.lorem.sentences())

console.log(bluffmaster.name.findName())
return;
//console.log(bluffmaster.address)
console.log(bluffmaster.internet.email())
console.log(bluffmaster.date.recent())
console.log(bluffmaster.helpers.contextualCard());

bluffmaster.locale = "uk";

console.log(bluffmaster.helpers.contextualCard());