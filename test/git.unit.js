if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var bluffmaster = require('../index');
}

describe("git.js", function() {
  describe("branch()", function() {
    beforeEach(function() {
      sinon.spy(bluffmaster.hacker, 'noun');
      sinon.spy(bluffmaster.hacker, 'verb');
    });

    afterEach(function() {
      bluffmaster.hacker.noun.restore();
      bluffmaster.hacker.verb.restore();
    });

    it("returns a branch with hacker noun and verb", function() {
      bluffmaster.git.branch();

      assert.ok(bluffmaster.hacker.noun.calledOnce);
      assert.ok(bluffmaster.hacker.verb.calledOnce);
    });
  });

  describe("commitEntry()", function() {
    beforeEach(function() {
      sinon.spy(bluffmaster.git, 'commitMessage');
      sinon.spy(bluffmaster.git, 'commitSha');
      sinon.spy(bluffmaster.internet, 'email');
      sinon.spy(bluffmaster.name, 'firstName');
      sinon.spy(bluffmaster.name, 'lastName');
      sinon.spy(bluffmaster.datatype, 'number');
    });

    afterEach(function() {
      bluffmaster.git.commitMessage.restore();
      bluffmaster.git.commitSha.restore();
      bluffmaster.internet.email.restore();
      bluffmaster.name.firstName.restore();
      bluffmaster.name.lastName.restore();
      bluffmaster.datatype.number.restore();
    });

    it("returns merge entry at random", function() {
      bluffmaster.git.commitEntry();

      assert.ok(bluffmaster.datatype.number.called);
    });

    it("returns a commit entry with git commit message and sha", function() {
      bluffmaster.git.commitEntry();

      assert.ok(bluffmaster.git.commitMessage.calledOnce);
      assert.ok(bluffmaster.git.commitSha.calledOnce);
    });

    it("returns a commit entry with internet email", function() {
      bluffmaster.git.commitEntry();

      assert.ok(bluffmaster.internet.email.calledOnce);
    });

    it("returns a commit entry with name first and last", function() {
      bluffmaster.git.commitEntry();

      assert.ok(bluffmaster.name.firstName.calledTwice);
      assert.ok(bluffmaster.name.lastName.calledTwice);
    });

    context("with options['merge'] equal to true", function() {
      beforeEach(function() {
        sinon.spy(bluffmaster.git, 'shortSha');
      });

      afterEach(function() {
        bluffmaster.git.shortSha.restore();
      });

      it("returns a commit entry with merge details", function() {
        bluffmaster.git.commitEntry({ merge: true });

        assert.ok(bluffmaster.git.shortSha.calledTwice);
      });
    });
  });

  describe("commitMessage()", function() {
    beforeEach(function() {
      sinon.spy(bluffmaster.hacker, 'verb');
      sinon.spy(bluffmaster.hacker, 'adjective');
      sinon.spy(bluffmaster.hacker, 'noun');
    });

    afterEach(function() {
      bluffmaster.hacker.verb.restore();
      bluffmaster.hacker.adjective.restore();
      bluffmaster.hacker.noun.restore();
    });

    it("returns a commit message with hacker noun, adj and verb", function() {
      bluffmaster.git.commitMessage();

      assert.ok(bluffmaster.hacker.verb.calledOnce);
      assert.ok(bluffmaster.hacker.adjective.calledOnce);
      assert.ok(bluffmaster.hacker.noun.calledOnce);
    });
  });


  describe("commitSha()", function() {
    it("returns a random commit SHA", function() {
      var commitSha = bluffmaster.git.commitSha();
      assert.ok(commitSha.match(/^[a-f0-9]{40}$/));
    });
  });

  describe("shortSha()", function() {
    it("returns a random short SHA", function() {
      var shortSha = bluffmaster.git.shortSha();
      assert.ok(shortSha.match(/^[a-f0-9]{7}$/));
    });
  });
});