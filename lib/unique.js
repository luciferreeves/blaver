const uniqueExec = require("../vendor/unique");
/**
 * @namespace blaver.unique
 */
function Unique() {
  // initialize unique module class variables

  // maximum time unique.exec will attempt to run before aborting
  const maxTime = 10;

  // maximum retries unique.exec will recurse before aborting ( max loop depth )
  const maxRetries = 10;

  // time the script started
  // const startTime = 0;

  /**
   * unique
   *
   * @method unique
   */
  this.unique = function unique(method, args, opts = {}) {
    let localOpts = opts;

    localOpts.startTime = new Date().getTime();
    if (typeof localOpts.maxTime !== "number") {
      localOpts.maxTime = maxTime;
    }
    if (typeof localOpts.maxRetries !== "number") {
      localOpts.maxRetries = maxRetries;
    }
    localOpts.currentIterations = 0;
    
    return uniqueExec.exec(method, args, localOpts);
  };
}

module.exports = Unique;
