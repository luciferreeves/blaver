var fs = require("fs");

var blaver = require("../../index");

// generate dataSet as example
fs.writeFile(
  __dirname + "/dataSet.json",
  JSON.stringify(blaver.helpers.userCard()),
  function () {
    console.log("dataSet generated successfully!");
  }
);
// generate bigDataSet as example
var bigSet = [];

for (var i = 20; i >= 0; i--) {
  bigSet.push(blaver.helpers.userCard());
}

fs.writeFile(
  __dirname + "/bigDataSet.json",
  JSON.stringify(bigSet),
  function () {
    console.log("bigDataSet generated successfully!");
  }
);
