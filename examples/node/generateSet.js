var fs = require('fs');

var bluffmaster = require('../../index');


// generate dataSet as example
fs.writeFile(__dirname + '/dataSet.json',  JSON.stringify(bluffmaster.helpers.userCard()), function() {
  console.log("dataSet generated successfully!");
});
// generate bigDataSet as example
var bigSet = [];

for(var i = 20; i >= 0; i--){
  bigSet.push(bluffmaster.helpers.userCard());
};

fs.writeFile(__dirname + '/bigDataSet.json',  JSON.stringify(bigSet), function() {
  console.log("bigDataSet generated successfully!");
});
