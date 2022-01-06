// since we are requiring the top level of bluffmaster, load all locales by default
var BluffMaster = require('./lib');
var bluffmaster = new BluffMaster({ locales: require('./lib/locales') });
module['exports'] = bluffmaster;