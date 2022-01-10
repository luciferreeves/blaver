if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var blaver = require('../index');
}

describe("company.js", function () {
  describe("companyName()", function () {

    it("sometimes returns three last names", function () {
      sinon.spy(blaver.name, 'lastName');
      sinon.stub(blaver.datatype, 'number').returns(2);
      const name = blaver.company.companyName();
      const parts = name.split(' ');

      assert.strictEqual(parts.length, 4); // account for word 'and'
      assert.ok(blaver.name.lastName.calledThrice);

      blaver.datatype.number.restore();
      blaver.name.lastName.restore();
    });

    it("sometimes returns two last names separated by a hyphen", function () {
      sinon.spy(blaver.name, 'lastName');
      sinon.stub(blaver.datatype, 'number').returns(1);
      const name = blaver.company.companyName();
      const parts = name.split('-');

      assert.ok(parts.length >= 2);
      assert.ok(blaver.name.lastName.calledTwice);

      blaver.datatype.number.restore();
      blaver.name.lastName.restore();
    });

    it("sometimes returns a last name with a company suffix", function () {
      sinon.spy(blaver.company, 'companySuffix');
      sinon.spy(blaver.name, 'lastName');
      sinon.stub(blaver.datatype, 'number').returns(0);
      const name = blaver.company.companyName();
      const parts = name.split(' ');

      assert.ok(parts.length >= 2);
      assert.ok(blaver.name.lastName.calledOnce);
      assert.ok(blaver.company.companySuffix.calledOnce);

      blaver.datatype.number.restore();
      blaver.name.lastName.restore();
      blaver.company.companySuffix.restore();
    });
  });

  describe("companySuffix()", function () {
    it("returns random value from company.suffixes array", function () {
      const suffix = blaver.company.companySuffix();
      assert.ok(blaver.company.suffixes().indexOf(suffix) !== -1);
    });
  });

  describe("catchPhrase()", function () {
    it("returns phrase comprising of a catch phrase adjective, descriptor, and noun", function () {
      sinon.spy(blaver.random, 'arrayElement');
      sinon.spy(blaver.company, 'catchPhraseAdjective');
      sinon.spy(blaver.company, 'catchPhraseDescriptor');
      sinon.spy(blaver.company, 'catchPhraseNoun');
      const phrase = blaver.company.catchPhrase();

      assert.ok(phrase.split(' ').length >= 3);
      assert.ok(blaver.random.arrayElement.calledThrice);
      assert.ok(blaver.company.catchPhraseAdjective.calledOnce);
      assert.ok(blaver.company.catchPhraseDescriptor.calledOnce);
      assert.ok(blaver.company.catchPhraseNoun.calledOnce);

      blaver.random.arrayElement.restore();
      blaver.company.catchPhraseAdjective.restore();
      blaver.company.catchPhraseDescriptor.restore();
      blaver.company.catchPhraseNoun.restore();
    });
  });

  describe("bs()", function () {
    it("returns phrase comprising of a BS buzz, adjective, and noun", function () {
      sinon.spy(blaver.random, 'arrayElement');
      sinon.spy(blaver.company, 'bsBuzz');
      sinon.spy(blaver.company, 'bsAdjective');
      sinon.spy(blaver.company, 'bsNoun');
      const bs = blaver.company.bs();

      assert.ok(typeof bs === 'string');
      assert.ok(blaver.random.arrayElement.calledThrice);
      assert.ok(blaver.company.bsBuzz.calledOnce);
      assert.ok(blaver.company.bsAdjective.calledOnce);
      assert.ok(blaver.company.bsNoun.calledOnce);

      blaver.random.arrayElement.restore();        
      blaver.company.bsBuzz.restore();
      blaver.company.bsAdjective.restore();
      blaver.company.bsNoun.restore();
    });
  });
});