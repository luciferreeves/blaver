var bluffmaster = require("../../index");

var emails = {};
var conflicts = 0;
// emails estimated: 1,055,881
// full names estimated: 1,185,139
for (var i = 0; i < 100000; i++) {
  // call function with no arguments
  var email = bluffmaster.unique(bluffmaster.internet.email);

  // or with function arguments as argument array
  // var email = bluffmaster.unique(bluffmaster.internet.email, [null, null, 'marak.com']);

  // or with custom options for maxTime as milliseconds or maxRetries
  // var email = bluffmaster.unique(bluffmaster.internet.email, [null, null, 'marak.com'], { maxRetries: 1, maxTime: 50 });

  if (typeof emails[email] === "undefined") {
    // found a unique new item
    emails[email] = true;
  } else {
    // found a conflicting item ( should not happen using bluffmaster.unique() )
    conflicts++;
  }
}
console.log("total conflicts", conflicts); // should be zero using bluffmaster.unique()
console.log("total uniques generated", Object.keys(emails).length);

// console.log(emails);
