/**
 * @namespace blaver.git
 */

const Git = function (blaver) {
  const self = this;
  const f = blaver.fake;

  const hexChars = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f"
  ];

  /**
   * branch
   *
   * @method blaver.git.branch
   */
  self.branch = function () {
    const noun = blaver.hacker.noun().replace(" ", "-");
    const verb = blaver.hacker.verb().replace(" ", "-");
    return noun + "-" + verb;
  };

  /**
   * commitEntry
   *
   * @method blaver.git.commitEntry
   * @param {object} options
   */
  self.commitEntry = function (options) {
    options = options || {};

    let entry = "commit {{git.commitSha}}\r\n";

    if (
      options.merge ||
      blaver.datatype.number({ min: 0, max: 4 }) === 0
    ) {
      entry += "Merge: {{git.shortSha}} {{git.shortSha}}\r\n";
    }

    entry +=
      "Author: {{name.firstName}} {{name.lastName}} <{{internet.email}}>\r\n";
    entry += "Date: " + blaver.date.recent().toString() + "\r\n";
    entry += "\r\n\xa0\xa0\xa0\xa0{{git.commitMessage}}\r\n";

    return f(entry);
  };

  /**
   * commitMessage
   *
   * @method blaver.git.commitMessage
   */
  self.commitMessage = function () {
    const format = "{{hacker.verb}} {{hacker.adjective}} {{hacker.noun}}";
    return f(format);
  };

  /**
   * commitSha
   *
   * @method blaver.git.commitSha
   */
  self.commitSha = function () {
    let commit = "";

    for (let i = 0; i < 40; i++) {
      commit += blaver.random.arrayElement(hexChars);
    }

    return commit;
  };

  /**
   * shortSha
   *
   * @method blaver.git.shortSha
   */
  self.shortSha = function () {
    let shortSha = "";

    for (let i = 0; i < 7; i++) {
      shortSha += blaver.random.arrayElement(hexChars);
    }

    return shortSha;
  };

  return self;
};

module.exports = Git;
