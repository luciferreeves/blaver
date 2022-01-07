if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var blaver = require('../index');
}

describe("git.js", function() {
  describe("branch()", function() {
    beforeEach(function() {
      sinon.spy(blaver.hacker, 'noun');
      sinon.spy(blaver.hacker, 'verb');
    });

    afterEach(function() {
      blaver.hacker.noun.restore();
      blaver.hacker.verb.restore();
    });

    it("returns a branch with hacker noun and verb", function() {
      blaver.git.branch();

      assert.ok(blaver.hacker.noun.calledOnce);
      assert.ok(blaver.hacker.verb.calledOnce);
    });
  });

  describe("commitEntry()", function() {
    beforeEach(function() {
      sinon.spy(blaver.git, 'commitMessage');
      sinon.spy(blaver.git, 'commitSha');
      sinon.spy(blaver.internet, 'email');
      sinon.spy(blaver.name, 'firstName');
      sinon.spy(blaver.name, 'lastName');
      sinon.spy(blaver.datatype, 'number');
    });

    afterEach(function() {
      blaver.git.commitMessage.restore();
      blaver.git.commitSha.restore();
      blaver.internet.email.restore();
      blaver.name.firstName.restore();
      blaver.name.lastName.restore();
      blaver.datatype.number.restore();
    });

    it("returns merge entry at random", function() {
      blaver.git.commitEntry();

      assert.ok(blaver.datatype.number.called);
    });

    it("returns a commit entry with git commit message and sha", function() {
      blaver.git.commitEntry();

      assert.ok(blaver.git.commitMessage.calledOnce);
      assert.ok(blaver.git.commitSha.calledOnce);
    });

    it("returns a commit entry with internet email", function() {
      blaver.git.commitEntry();

      assert.ok(blaver.internet.email.calledOnce);
    });

    it("returns a commit entry with name first and last", function() {
      blaver.git.commitEntry();

      assert.ok(blaver.name.firstName.calledTwice);
      assert.ok(blaver.name.lastName.calledTwice);
    });

    context("with options['merge'] equal to true", function() {
      beforeEach(function() {
        sinon.spy(blaver.git, 'shortSha');
      });

      afterEach(function() {
        blaver.git.shortSha.restore();
      });

      it("returns a commit entry with merge details", function() {
        blaver.git.commitEntry({ merge: true });

        assert.ok(blaver.git.shortSha.calledTwice);
      });
    });
  });

  describe("commitMessage()", function() {
    beforeEach(function() {
      sinon.spy(blaver.hacker, 'verb');
      sinon.spy(blaver.hacker, 'adjective');
      sinon.spy(blaver.hacker, 'noun');
    });

    afterEach(function() {
      blaver.hacker.verb.restore();
      blaver.hacker.adjective.restore();
      blaver.hacker.noun.restore();
    });

    it("returns a commit message with hacker noun, adj and verb", function() {
      blaver.git.commitMessage();

      assert.ok(blaver.hacker.verb.calledOnce);
      assert.ok(blaver.hacker.adjective.calledOnce);
      assert.ok(blaver.hacker.noun.calledOnce);
    });
  });


  describe("commitSha()", function() {
    it("returns a random commit SHA", function() {
      var commitSha = blaver.git.commitSha();
      assert.ok(commitSha.match(/^[a-f0-9]{40}$/));
    });
  });

  describe("shortSha()", function() {
    it("returns a random short SHA", function() {
      var shortSha = blaver.git.shortSha();
      assert.ok(shortSha.match(/^[a-f0-9]{7}$/));
    });
  });
});