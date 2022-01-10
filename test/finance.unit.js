if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var blaver = require('../index');
}

blaver.seed(1234);

describe('finance.js', function () {
  describe('account( length )', function () {

    it('should supply a default length if no length is passed', function () {

      const account = blaver.finance.account();

      const expected = 8;
      const actual = account.length;

      assert.strictEqual(actual, expected, 'The expected default account length is ' + expected + ' but it was ' + actual);

    });

    it('should supply a length if a length is passed', function () {

      const expected = 9;

      const account = blaver.finance.account(expected);

      const actual = account.length;

      assert.strictEqual(actual, expected, 'The expected default account length is ' + expected + ' but it was ' + actual);

    });

    it('should supply a default length if a zero is passed', function () {

      const expected = 8;

      const account = blaver.finance.account(0);

      const actual = account.length;

      assert.strictEqual(actual, expected, 'The expected default account length is ' + expected + ' but it was ' + actual);

    });

  });

  describe('accountName()', function () {

    it("should return an account name", function () {

      const actual = blaver.finance.accountName();

      assert.ok(actual);

    });

  });

  describe('routingNumber()', function () {

    it("should return a routing number", function () {

      const actual = blaver.finance.routingNumber();

      assert.ok(actual);

    });

  });

  describe('mask( length, parens, ellipsis )', function () {
    it("should set a default length", function () {

      const expected = 4; //default account mask length

      const mask = blaver.finance.mask(null, false, false);

      const actual = mask.length;

      assert.strictEqual(actual, expected, 'The expected default mask length is ' + expected + ' but it was ' + actual);

    });

    it("should set a specified length", function () {

      let expected = blaver.datatype.number(20);

      expected = (expected == 0 || !expected || typeof expected == 'undefined') ? 4 : expected;

      const mask = blaver.finance.mask(expected, false, false);

      const actual = mask.length; //picks 4 if the random number generator picks 0

      assert.strictEqual(actual, expected, 'The expected default mask length is ' + expected + ' but it was ' + actual);

    });

    it("should set a default length of 4 for a zero value", function () {

      const expected = 4;

      blaver.finance.mask(0, false, false);

      const actual = 4; //picks 4 if the random number generator picks 0

      assert.strictEqual(actual, expected, 'The expected default mask length is ' + expected + ' but it was ' + actual);

    });


    it("should by default include parentheses around a partial account number", function () {

      const expected = true;

      const mask = blaver.finance.mask(null, null, false);

      const regexp = new RegExp(/(\(\d{4}?\))/);
      const actual = regexp.test(mask);

      assert.strictEqual(actual, expected, 'The expected match for parentheses is ' + expected + ' but it was ' + actual);

    });

    it("should by default include an ellipsis", function () {

      const expected = true;

      const mask = blaver.finance.mask(null, false, null);

      const regexp = new RegExp(/(\.\.\.\d{4})/);
      const actual = regexp.test(mask);

      assert.strictEqual(actual, expected, 'The expected match for parentheses is ' + expected + ' but it was ' + actual);

    });

    it("should work when random constiables are passed into the arguments", function () {

      const length = blaver.datatype.number(20);
      const ellipsis = (length % 2 === 0) ? true : false;
      const parens = !ellipsis;

      const mask = blaver.finance.mask(length, ellipsis, parens);
      assert.ok(mask);

    });


  });

  describe('amount(min, max, dec, symbol)', function () {

    it("should use the default amounts when not passing arguments", function () {
      const amount = blaver.finance.amount();

      assert.ok(amount);
      assert.strictEqual((amount > 0), true, "the amount should be greater than 0");
      assert.strictEqual((amount < 1001), true, "the amount should be greater than 0");

    });

    it("should use the default decimal location when not passing arguments", function () {

      let amount = blaver.finance.amount();
      amount = blaver.finance.amount(100, 100, 1);

      assert.ok(amount);
      assert.strictEqual(amount , '100.0', "the amount should be equal 100.0");
    });

    //TODO: add support for more currency and decimal options
    it("should not include a currency symbol by default", function () {

      const amount = blaver.finance.amount();

      const regexp = new RegExp(/[0-9.]/);

      const expected = true;
      const actual = regexp.test(amount);

      assert.strictEqual(actual, expected, 'The expected match should not include a currency symbol');
    });


    it("it should handle negative amounts", function () {

      const amount = blaver.finance.amount(-200, -1);

      assert.ok(amount);
      assert.strictEqual((amount < 0), true, "the amount should be greater than 0");
      assert.strictEqual((amount > -201), true, "the amount should be greater than 0");
    });


    it("it should handle argument dec", function () {

      const amount = blaver.finance.amount(100, 100, 1);

      assert.ok(amount);
      assert.strictEqual(amount , "100.0", "the amount should be equal 100.0");
    });

    it("it should handle argument dec = 0", function () {

      const amount = blaver.finance.amount(100, 100, 0);

      assert.ok(amount);
      assert.strictEqual(amount , '100', "the amount should be equal 100");
    });

    it("it should return a string", function() {

      const amount = blaver.finance.amount(100, 100, 0);

      const typeOfAmount = typeof amount;

      assert.ok(amount);
      assert.strictEqual(typeOfAmount , "string", "the amount type should be number");
    });

    [false, undefined].forEach(function (autoFormat){
      it(`should return unformatted if autoformat is ${autoFormat}`, function() {

        const number = 6000;
        const amount = blaver.finance.amount(number, number, 0, undefined, autoFormat);

        assert.strictEqual(amount, number.toString());
      });
    });

    it("should return the number formatted on the current locale", function() {

      const number = 6000, decimalPlaces = 2;
      const expected = number.toLocaleString(undefined, {minimumFractionDigits: decimalPlaces});

      const amount = blaver.finance.amount(number, number, decimalPlaces, undefined, true);

      assert.strictEqual(amount, expected);
    });

  });

  describe('transactionType()', function () {

    it("should return a random transaction type", function () {
      const transactionType = blaver.finance.transactionType();

      assert.ok(transactionType);
    });
  });

  describe("currencyCode()", function () {
    it("returns a random currency code with a format", function () {
      const currencyCode = blaver.finance.currencyCode();

      assert.ok(currencyCode.match(/^[A-Z]{3}$/));
    });
  });

  describe("bitcoinAddress()", function(){
    it("returns a random bitcoin address", function(){
      const bitcoinAddress = blaver.finance.bitcoinAddress();
      /**
           *  Note: Although the total length of a Bitcoin address can be 25-33 characters, regex quantifiers only check the preceding token
           *  Therefore we take one from the total length of the address not including the first character ([13])
           */

      assert.ok(bitcoinAddress.match(/^[A-Z0-9.]{27,34}$/));
    });
  });

  describe("litecoinAddress()", function(){
    it("returns a random litecoin address", function(){
      const litecoinAddress = blaver.finance.litecoinAddress();

      assert.ok(litecoinAddress.match(/^[LM3][1-9a-km-zA-HJ-NP-Z]{25,32}$/));
    });
  });

  describe("ethereumAddress()", function(){
    it("returns a random ethereum address", function(){
      const ethereumAddress = blaver.finance.ethereumAddress();
      assert.ok(ethereumAddress.match(/^(0x)[0-9a-f]{40}$/));
    });
  });

  describe("creditCardNumber()", function(){
    const luhnFormula = require("./support/luhnCheck.js");

    it("returns a random credit card number", function(){
      let number = blaver.finance.creditCardNumber();
      number = number.replace(/\D/g,""); // remove formating
      console.log("version:", process.version, number, number.length);
      assert.ok(number.length >= 13 && number.length <= 20);
      assert.ok(number.match(/^[0-9]{13,20}$/));
      assert.ok(luhnFormula(number));
    });

    it("returns a valid credit card number", function(){
      assert.ok(luhnFormula(blaver.finance.creditCardNumber("")));
      assert.ok(luhnFormula(blaver.finance.creditCardNumber()));
      assert.ok(luhnFormula(blaver.finance.creditCardNumber()));
      assert.ok(luhnFormula(blaver.finance.creditCardNumber("visa")));
      assert.ok(luhnFormula(blaver.finance.creditCardNumber("mastercard")));
      assert.ok(luhnFormula(blaver.finance.creditCardNumber("discover")));
      assert.ok(luhnFormula(blaver.finance.creditCardNumber()));
      assert.ok(luhnFormula(blaver.finance.creditCardNumber()));
    });
    it("returns a correct credit card number when issuer provided", function(){
      //TODO: implement checks for each format with regexp
      const visa = blaver.finance.creditCardNumber("visa");
      assert.ok(visa.match(/^4(([0-9]){12}|([0-9]){3}(\-([0-9]){4}){3})$/));
      assert.ok(luhnFormula(visa));


      const mastercard = blaver.finance.creditCardNumber("mastercard");
      assert.ok(mastercard.match(/^(5[1-5]\d{2}|6771)(\-\d{4}){3}$/));
      assert.ok(luhnFormula(mastercard));

      const discover = blaver.finance.creditCardNumber("discover");

      assert.ok(luhnFormula(discover));

      const american_express = blaver.finance.creditCardNumber("american_express");
      assert.ok(luhnFormula(american_express));
      const diners_club = blaver.finance.creditCardNumber("diners_club");
      assert.ok(luhnFormula(diners_club));
      const jcb = blaver.finance.creditCardNumber("jcb");
      assert.ok(luhnFormula(jcb));
      const switchC = blaver.finance.creditCardNumber("mastercard");
      assert.ok(luhnFormula(switchC));
      const solo = blaver.finance.creditCardNumber("solo");
      assert.ok(luhnFormula(solo));
      const maestro = blaver.finance.creditCardNumber("maestro");
      assert.ok(luhnFormula(maestro));
      const laser = blaver.finance.creditCardNumber("laser");
      assert.ok(luhnFormula(laser));
      const instapayment = blaver.finance.creditCardNumber("instapayment");
      assert.ok(luhnFormula(instapayment));
    });
    it("returns custom formated strings",function(){
      let number = blaver.finance.creditCardNumber("###-###-##L");
      assert.ok(number.match(/^\d{3}\-\d{3}\-\d{3}$/));
      assert.ok(luhnFormula(number));
      number =blaver.finance.creditCardNumber("234[5-9]#{999}L");
      assert.ok(number.match(/^234[5-9]\d{1000}$/));
      assert.ok(luhnFormula(number));
    });
  });

  describe("creditCardCVV()", function(){
    it("returns a random credit card CVV", function(){
      const cvv = blaver.finance.creditCardCVV();
      assert.ok(cvv.length === 3);
      assert.ok(cvv.match(/^[0-9]{3}$/));
    });
  });


  describe("iban()", function () {
    const ibanLib = require('../lib/iban');
    it("returns a random yet formally correct IBAN number", function () {
      const iban = blaver.finance.iban();
      const bban = iban.substring(4) + iban.substring(0, 4);

      assert.strictEqual(ibanLib.mod97(ibanLib.toDigitString(bban)), 1, "the result should be equal to 1");
    });
    it("returns a specific and formally correct IBAN number", function () {
      const iban = blaver.finance.iban(false, "DE");
      const bban = iban.substring(4) + iban.substring(0, 4);
      const countryCode = iban.substring(0, 2);

      assert.equal(countryCode, "DE");
      assert.equal(ibanLib.mod97(ibanLib.toDigitString(bban)), 1, "the result should be equal to 1");
    });
    it("throws an error if the passed country code is not supported", function () {
      assert.throws(function() { blaver.finance.iban(false, 'AA');}, /Country code AA not supported/);
    });
  });

  describe("bic()", function () {
    const ibanLib = require('../lib/iban');
    it("returns a random yet formally correct BIC number", function () {
      const bic = blaver.finance.bic();
      const expr = new RegExp("^[A-Z]{4}(" + ibanLib.iso3166.join("|") + ")[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3})?$", "i");

      assert.ok(bic.match(expr));
    });
  });

  describe("transactionDescription()", function() {
    beforeEach(function () {
      sinon.spy(blaver.helpers, 'createTransaction');
    });

    afterEach(function () {
      blaver.helpers.createTransaction.restore();
    });

    it("returns a random transaction description", function() {
      const transactionDescription = blaver.finance.transactionDescription();

      assert.ok(transactionDescription);
      assert.ok(blaver.helpers.createTransaction.calledOnce);
    });
  });
});