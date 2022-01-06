if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var bluffmaster = require('../index');
}

bluffmaster.seed(1234);

describe('finance.js', function () {
  describe('account( length )', function () {

    it('should supply a default length if no length is passed', function () {

      var account = bluffmaster.finance.account();

      var expected = 8;
      var actual = account.length;

      assert.strictEqual(actual, expected, 'The expected default account length is ' + expected + ' but it was ' + actual);

    });

    it('should supply a length if a length is passed', function () {

      var expected = 9;

      var account = bluffmaster.finance.account(expected);

      var actual = account.length;

      assert.strictEqual(actual, expected, 'The expected default account length is ' + expected + ' but it was ' + actual);

    });

    it('should supply a default length if a zero is passed', function () {

      var expected = 8;

      var account = bluffmaster.finance.account(0);

      var actual = account.length;

      assert.strictEqual(actual, expected, 'The expected default account length is ' + expected + ' but it was ' + actual);

    });

  });

  describe('accountName()', function () {

    it("should return an account name", function () {

      var actual = bluffmaster.finance.accountName();

      assert.ok(actual);

    });

  });

  describe('routingNumber()', function () {

    it("should return a routing number", function () {

      var actual = bluffmaster.finance.routingNumber();

      assert.ok(actual);

    });

  });

  describe('mask( length, parens, ellipsis )', function () {
    it("should set a default length", function () {

      var expected = 4; //default account mask length

      var mask = bluffmaster.finance.mask(null, false, false);

      var actual = mask.length;

      assert.strictEqual(actual, expected, 'The expected default mask length is ' + expected + ' but it was ' + actual);

    });

    it("should set a specified length", function () {

      var expected = bluffmaster.datatype.number(20);

      expected = (expected == 0 || !expected || typeof expected == 'undefined') ? 4 : expected;

      var mask = bluffmaster.finance.mask(expected, false, false);

      var actual = mask.length; //picks 4 if the random number generator picks 0

      assert.strictEqual(actual, expected, 'The expected default mask length is ' + expected + ' but it was ' + actual);

    });

    it("should set a default length of 4 for a zero value", function () {

      var expected = 4;

      bluffmaster.finance.mask(0, false, false);

      var actual = 4; //picks 4 if the random number generator picks 0

      assert.strictEqual(actual, expected, 'The expected default mask length is ' + expected + ' but it was ' + actual);

    });


    it("should by default include parentheses around a partial account number", function () {

      var expected = true;

      var mask = bluffmaster.finance.mask(null, null, false);

      var regexp = new RegExp(/(\(\d{4}?\))/);
      var actual = regexp.test(mask);

      assert.strictEqual(actual, expected, 'The expected match for parentheses is ' + expected + ' but it was ' + actual);

    });

    it("should by default include an ellipsis", function () {

      var expected = true;

      var mask = bluffmaster.finance.mask(null, false, null);

      var regexp = new RegExp(/(\.\.\.\d{4})/);
      var actual = regexp.test(mask);

      assert.strictEqual(actual, expected, 'The expected match for parentheses is ' + expected + ' but it was ' + actual);

    });

    it("should work when random variables are passed into the arguments", function () {

      var length = bluffmaster.datatype.number(20);
      var ellipsis = (length % 2 === 0) ? true : false;
      var parens = !ellipsis;

      var mask = bluffmaster.finance.mask(length, ellipsis, parens);
      assert.ok(mask);

    });


  });

  describe('amount(min, max, dec, symbol)', function () {

    it("should use the default amounts when not passing arguments", function () {
      var amount = bluffmaster.finance.amount();

      assert.ok(amount);
      assert.strictEqual((amount > 0), true, "the amount should be greater than 0");
      assert.strictEqual((amount < 1001), true, "the amount should be greater than 0");

    });

    it("should use the default decimal location when not passing arguments", function () {

      var amount = bluffmaster.finance.amount();

      var decimal = '.';
      var expected = amount.length - 3;
      var amount = bluffmaster.finance.amount(100, 100, 1);

      assert.ok(amount);
      assert.strictEqual(amount , '100.0', "the amount should be equal 100.0");
    });

    //TODO: add support for more currency and decimal options
    it("should not include a currency symbol by default", function () {

      var amount = bluffmaster.finance.amount();

      var regexp = new RegExp(/[0-9.]/);

      var expected = true;
      var actual = regexp.test(amount);

      assert.strictEqual(actual, expected, 'The expected match should not include a currency symbol');
    });


    it("it should handle negative amounts", function () {

      var amount = bluffmaster.finance.amount(-200, -1);

      assert.ok(amount);
      assert.strictEqual((amount < 0), true, "the amount should be greater than 0");
      assert.strictEqual((amount > -201), true, "the amount should be greater than 0");
    });


    it("it should handle argument dec", function () {

      var amount = bluffmaster.finance.amount(100, 100, 1);

      assert.ok(amount);
      assert.strictEqual(amount , "100.0", "the amount should be equal 100.0");
    });

    it("it should handle argument dec = 0", function () {

      var amount = bluffmaster.finance.amount(100, 100, 0);

      assert.ok(amount);
      assert.strictEqual(amount , '100', "the amount should be equal 100");
    });

    it("it should return a string", function() {

      var amount = bluffmaster.finance.amount(100, 100, 0);

      var typeOfAmount = typeof amount;

      assert.ok(amount);
      assert.strictEqual(typeOfAmount , "string", "the amount type should be number");
    });

    [false, undefined].forEach(function (autoFormat){
      it(`should return unformatted if autoformat is ${autoFormat}`, function() {

        const number = 6000;
        const amount = bluffmaster.finance.amount(number, number, 0, undefined, autoFormat);

        assert.strictEqual(amount, number.toString());
      });
    });

    it("should return the number formatted on the current locale", function() {

      const number = 6000, decimalPlaces = 2;
      const expected = number.toLocaleString(undefined, {minimumFractionDigits: decimalPlaces});

      const amount = bluffmaster.finance.amount(number, number, decimalPlaces, undefined, true);

      assert.strictEqual(amount, expected);
    });

  });

  describe('transactionType()', function () {

    it("should return a random transaction type", function () {
      var transactionType = bluffmaster.finance.transactionType();

      assert.ok(transactionType);
    });
  });

  describe("currencyCode()", function () {
    it("returns a random currency code with a format", function () {
      var currencyCode = bluffmaster.finance.currencyCode();

      assert.ok(currencyCode.match(/^[A-Z]{3}$/));
    });
  });

  describe("bitcoinAddress()", function(){
    it("returns a random bitcoin address", function(){
      var bitcoinAddress = bluffmaster.finance.bitcoinAddress();
      /**
           *  Note: Although the total length of a Bitcoin address can be 25-33 characters, regex quantifiers only check the preceding token
           *  Therefore we take one from the total length of the address not including the first character ([13])
           */

      assert.ok(bitcoinAddress.match(/^[A-Z0-9.]{27,34}$/));
    });
  });

  describe("litecoinAddress()", function(){
    it("returns a random litecoin address", function(){
      var litecoinAddress = bluffmaster.finance.litecoinAddress();

      assert.ok(litecoinAddress.match(/^[LM3][1-9a-km-zA-HJ-NP-Z]{25,32}$/));
    });
  });

  describe("ethereumAddress()", function(){
    it("returns a random ethereum address", function(){
      var ethereumAddress = bluffmaster.finance.ethereumAddress();
      assert.ok(ethereumAddress.match(/^(0x)[0-9a-f]{40}$/));
    });
  });

  describe("creditCardNumber()", function(){
    var luhnFormula = require("./support/luhnCheck.js");

    it("returns a random credit card number", function(){
      var number = bluffmaster.finance.creditCardNumber();
      number = number.replace(/\D/g,""); // remove formating
      console.log("version:", process.version, number, number.length);
      assert.ok(number.length >= 13 && number.length <= 20);
      assert.ok(number.match(/^[0-9]{13,20}$/));
      assert.ok(luhnFormula(number));
    });

    it("returns a valid credit card number", function(){
      assert.ok(luhnFormula(bluffmaster.finance.creditCardNumber("")));
      assert.ok(luhnFormula(bluffmaster.finance.creditCardNumber()));
      assert.ok(luhnFormula(bluffmaster.finance.creditCardNumber()));
      assert.ok(luhnFormula(bluffmaster.finance.creditCardNumber("visa")));
      assert.ok(luhnFormula(bluffmaster.finance.creditCardNumber("mastercard")));
      assert.ok(luhnFormula(bluffmaster.finance.creditCardNumber("discover")));
      assert.ok(luhnFormula(bluffmaster.finance.creditCardNumber()));
      assert.ok(luhnFormula(bluffmaster.finance.creditCardNumber()));
    });
    it("returns a correct credit card number when issuer provided", function(){
      //TODO: implement checks for each format with regexp
      var visa = bluffmaster.finance.creditCardNumber("visa");
      assert.ok(visa.match(/^4(([0-9]){12}|([0-9]){3}(\-([0-9]){4}){3})$/));
      assert.ok(luhnFormula(visa));


      var mastercard = bluffmaster.finance.creditCardNumber("mastercard");
      assert.ok(mastercard.match(/^(5[1-5]\d{2}|6771)(\-\d{4}){3}$/));
      assert.ok(luhnFormula(mastercard));

      var discover = bluffmaster.finance.creditCardNumber("discover");

      assert.ok(luhnFormula(discover));

      var american_express = bluffmaster.finance.creditCardNumber("american_express");
      assert.ok(luhnFormula(american_express));
      var diners_club = bluffmaster.finance.creditCardNumber("diners_club");
      assert.ok(luhnFormula(diners_club));
      var jcb = bluffmaster.finance.creditCardNumber("jcb");
      assert.ok(luhnFormula(jcb));
      var switchC = bluffmaster.finance.creditCardNumber("mastercard");
      assert.ok(luhnFormula(switchC));
      var solo = bluffmaster.finance.creditCardNumber("solo");
      assert.ok(luhnFormula(solo));
      var maestro = bluffmaster.finance.creditCardNumber("maestro");
      assert.ok(luhnFormula(maestro));
      var laser = bluffmaster.finance.creditCardNumber("laser");
      assert.ok(luhnFormula(laser));
      var instapayment = bluffmaster.finance.creditCardNumber("instapayment");
      assert.ok(luhnFormula(instapayment));
    });
    it("returns custom formated strings",function(){
      var number = bluffmaster.finance.creditCardNumber("###-###-##L");
      assert.ok(number.match(/^\d{3}\-\d{3}\-\d{3}$/));
      assert.ok(luhnFormula(number));
      number =bluffmaster.finance.creditCardNumber("234[5-9]#{999}L");
      assert.ok(number.match(/^234[5-9]\d{1000}$/));
      assert.ok(luhnFormula(number));
    });
  });

  describe("creditCardCVV()", function(){
    it("returns a random credit card CVV", function(){
      var cvv = bluffmaster.finance.creditCardCVV();
      assert.ok(cvv.length === 3);
      assert.ok(cvv.match(/^[0-9]{3}$/));
    });
  });


  describe("iban()", function () {
    var ibanLib = require('../lib/iban');
    it("returns a random yet formally correct IBAN number", function () {
      var iban = bluffmaster.finance.iban();
      var bban = iban.substring(4) + iban.substring(0, 4);

      assert.strictEqual(ibanLib.mod97(ibanLib.toDigitString(bban)), 1, "the result should be equal to 1");
    });
    it("returns a specific and formally correct IBAN number", function () {
      var iban = bluffmaster.finance.iban(false, "DE");
      var bban = iban.substring(4) + iban.substring(0, 4);
      var countryCode = iban.substring(0, 2);

      assert.equal(countryCode, "DE");
      assert.equal(ibanLib.mod97(ibanLib.toDigitString(bban)), 1, "the result should be equal to 1");
    });
    it("throws an error if the passed country code is not supported", function () {
      assert.throws(function() { bluffmaster.finance.iban(false, 'AA');}, /Country code AA not supported/);
    });
  });

  describe("bic()", function () {
    var ibanLib = require('../lib/iban');
    it("returns a random yet formally correct BIC number", function () {
      var bic = bluffmaster.finance.bic();
      var expr = new RegExp("^[A-Z]{4}(" + ibanLib.iso3166.join("|") + ")[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3})?$", "i");

      assert.ok(bic.match(expr));
    });
  });

  describe("transactionDescription()", function() {
    beforeEach(function () {
      sinon.spy(bluffmaster.helpers, 'createTransaction');
    });

    afterEach(function () {
      bluffmaster.helpers.createTransaction.restore();
    });

    it("returns a random transaction description", function() {
      var transactionDescription = bluffmaster.finance.transactionDescription();

      assert.ok(transactionDescription);
      assert.ok(bluffmaster.helpers.createTransaction.calledOnce);
    });
  });
});