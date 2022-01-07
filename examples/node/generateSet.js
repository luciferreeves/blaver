const fs = require("fs");

const blaver = require("../../index");

// generate dataSet as example
fs.writeFile(
  __dirname + "/dataSet.json",
  JSON.stringify(blaver.helpers.userCard()),
  function () {
    console.log("dataSet generated successfully!");
  }
);
// generate bigDataSet as example
const bigSet = Array.from({length: 20}, () => blaver.helpers.userCard());

fs.writeFile(
  __dirname + "/bigDataSet.json",
  JSON.stringify(bigSet, null, 2),
  function () {
    console.log("bigDataSet generated successfully!");
  }
);
