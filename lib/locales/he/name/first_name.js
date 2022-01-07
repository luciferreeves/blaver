const maleNames = require('./male_first_name');
const femaleNames = require('./female_first_name');
const allNames = [];
maleNames.forEach(function (v) { allNames.push(v); });
femaleNames.forEach( function (v) { allNames.push(v); });

module.exports = allNames.sort();
