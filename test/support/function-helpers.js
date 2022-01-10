if (typeof module !== 'undefined') {
  var blaver = require('../../index');
}

const functionHelpers = {};

module.exports = functionHelpers;


const IGNORED_MODULES = ['locales', 'locale', 'localeFallback', 'definitions', 'fake', 'helpers', 'mersenne'];
const IGNORED_METHODS = {
  system: ['directoryPath', 'filePath'] // these are TODOs
};

function isTestableModule(mod) {
  return IGNORED_MODULES.indexOf(mod) === -1;
}

function isMethodOf(mod) {
  return function(meth) {
    return typeof blaver[mod][meth] === 'function';
  };
}

function isTestableMethod(mod) {
  return function(meth) {
    return !(mod in IGNORED_METHODS && IGNORED_METHODS[mod].indexOf(meth) >= 0);
  };
}

function both(pred1, pred2) {
  return function(value) {
    return pred1(value) && pred2(value);
  };
}

// Basic smoke tests to make sure each method is at least implemented and returns a value.

functionHelpers.modulesList = function modulesList () {
  const modules = Object.keys(blaver)
    .filter(isTestableModule)
    .reduce(function(result, mod) {
      result[mod] = Object.keys(blaver[mod]).filter(both(isMethodOf(mod), isTestableMethod(mod)));
      return result;
    }, {});
      
  return modules;
}