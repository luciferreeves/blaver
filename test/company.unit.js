if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var bluffmaster = require('../index');
}

describe("company.js", function () {
  describe("companyName()", function () {

    it("sometimes returns three last names", function () {
      sinon.spy(bluffmaster.name, 'lastName');
      sinon.stub(bluffmaster.datatype, 'number').returns(2);
      var name = bluffmaster.company.companyName();
      var parts = name.split(' ');

      assert.strictEqual(parts.length, 4); // account for word 'and'
      assert.ok(bluffmaster.name.lastName.calledThrice);

      bluffmaster.datatype.number.restore();
      bluffmaster.name.lastName.restore();
    });

    it("sometimes returns two last names separated by a hyphen", function () {
      sinon.spy(bluffmaster.name, 'lastName');
      sinon.stub(bluffmaster.datatype, 'number').returns(1);
      var name = bluffmaster.company.companyName();
      var parts = name.split('-');

      assert.ok(parts.length >= 2);
      assert.ok(bluffmaster.name.lastName.calledTwice);

      bluffmaster.datatype.number.restore();
      bluffmaster.name.lastName.restore();
    });

    it("sometimes returns a last name with a company suffix", function () {
      sinon.spy(bluffmaster.company, 'companySuffix');
      sinon.spy(bluffmaster.name, 'lastName');
      sinon.stub(bluffmaster.datatype, 'number').returns(0);
      var name = bluffmaster.company.companyName();
      var parts = name.split(' ');

      assert.ok(parts.length >= 2);
      assert.ok(bluffmaster.name.lastName.calledOnce);
      assert.ok(bluffmaster.company.companySuffix.calledOnce);

      bluffmaster.datatype.number.restore();
      bluffmaster.name.lastName.restore();
      bluffmaster.company.companySuffix.restore();
    });
  });

  describe("companySuffix()", function () {
    it("returns random value from company.suffixes array", function () {
      var suffix = bluffmaster.company.companySuffix();
      assert.ok(bluffmaster.company.suffixes().indexOf(suffix) !== -1);
    });
  });

  describe("catchPhrase()", function () {
    it("returns phrase comprising of a catch phrase adjective, descriptor, and noun", function () {
      sinon.spy(bluffmaster.random, 'arrayElement');
      sinon.spy(bluffmaster.company, 'catchPhraseAdjective');
      sinon.spy(bluffmaster.company, 'catchPhraseDescriptor');
      sinon.spy(bluffmaster.company, 'catchPhraseNoun');
      var phrase = bluffmaster.company.catchPhrase();

      assert.ok(phrase.split(' ').length >= 3);
      assert.ok(bluffmaster.random.arrayElement.calledThrice);
      assert.ok(bluffmaster.company.catchPhraseAdjective.calledOnce);
      assert.ok(bluffmaster.company.catchPhraseDescriptor.calledOnce);
      assert.ok(bluffmaster.company.catchPhraseNoun.calledOnce);

      bluffmaster.random.arrayElement.restore();
      bluffmaster.company.catchPhraseAdjective.restore();
      bluffmaster.company.catchPhraseDescriptor.restore();
      bluffmaster.company.catchPhraseNoun.restore();
    });
  });

  describe("bs()", function () {
    it("returns phrase comprising of a BS buzz, adjective, and noun", function () {
      sinon.spy(bluffmaster.random, 'arrayElement');
      sinon.spy(bluffmaster.company, 'bsBuzz');
      sinon.spy(bluffmaster.company, 'bsAdjective');
      sinon.spy(bluffmaster.company, 'bsNoun');
      var bs = bluffmaster.company.bs();

      assert.ok(typeof bs === 'string');
      assert.ok(bluffmaster.random.arrayElement.calledThrice);
      assert.ok(bluffmaster.company.bsBuzz.calledOnce);
      assert.ok(bluffmaster.company.bsAdjective.calledOnce);
      assert.ok(bluffmaster.company.bsNoun.calledOnce);

      bluffmaster.random.arrayElement.restore();        
      bluffmaster.company.bsBuzz.restore();
      bluffmaster.company.bsAdjective.restore();
      bluffmaster.company.bsNoun.restore();
    });
  });
});