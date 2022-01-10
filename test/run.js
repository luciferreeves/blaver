#!/usr/bin/env node
process.env.NODE_ENV = 'test';

const fs = require('fs');
const Mocha = require('mocha');
const optimist = require('optimist');
const walk_dir = require('./support/walk_dir');

const argv = optimist
  .usage("Usage: $0 -t [types] --reporter [reporter] --timeout [timeout]")
  .default({types: 'unit,functional', reporter: 'spec', timeout: 6000})
  .describe('types', 'The types of tests to run, separated by commas. E.g., unit,functional,acceptance')
  .describe('reporter', 'The mocha test reporter to use.')
  .describe('timeout', 'The mocha timeout to use per test (ms).')
  .boolean('help')
  .alias('types', 'T')
  .alias('timeout', 't')
  .alias('reporter', 'R')
  .alias('help', 'h')
  .argv;

const mocha = new Mocha({timeout: argv.timeout, reporter: argv.reporter, ui: 'bdd'});

const valid_test_types = ['unit', 'functional', 'acceptance', 'integration'];
const requested_types = argv.types.split(',');
const types_to_use = [];

valid_test_types.forEach(function (valid_test_type) {
  if (requested_types.indexOf(valid_test_type) !== -1) {
    types_to_use.push(valid_test_type);
  }
});

if (argv.help || types_to_use.length === 0) {
  console.log('\n' + optimist.help());
  process.exit();
}

const is_valid_file = function (file) {
  for (let i = 0; i < types_to_use.length; i++) {
    const test_type = types_to_use[i];
    const ext = test_type + ".js";

    if (file.indexOf(ext) !== -1) {
      return true;
    }
  }

  return false;
};

function run(cb) {
  walk_dir.walk('test', is_valid_file, function (err, files) {
    if (err) { return cb(err); }

    files.forEach(function (file) {
      mocha.addFile(file);
    });

    cb();
  });
}

run(function (err) {
  mocha.run(function (failures) {
    process.exit(failures);
  });
});