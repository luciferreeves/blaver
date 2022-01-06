if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var bluffmaster = require('../index');
}

describe("internet.js", function () {
  describe("email()", function () {
    it("returns an email", function () {
      sinon.stub(bluffmaster.internet, 'userName').returns('Aiden.Harann55');
      var email = bluffmaster.internet.email("Aiden.Harann55");
      var res = email.split("@");
      res = res[0];
      assert.strictEqual(res, 'Aiden.Harann55');
      bluffmaster.internet.userName.restore();
    });

    it("returns an email with japanese characters", function () {
      sinon.stub(bluffmaster.internet, 'userName').returns('思源_唐3');
      var email = bluffmaster.internet.email("思源_唐3");
      var res = email.split("@");
      res = res[0];
      assert.equal(res, '思源_唐3');
      bluffmaster.internet.userName.restore();
    });
  });

  describe("exampleEmail", function () {
    it("returns an email with the correct name", function () {
      sinon.stub(bluffmaster.internet, 'userName').returns('Aiden.Harann55');
      var email = bluffmaster.internet.email("Aiden.Harann55");
      var res = email.split("@");
      res = res[0];
      assert.strictEqual(res, 'Aiden.Harann55');
      bluffmaster.internet.userName.restore();
    });

    it("uses the example.[org|com|net] host", function () {
      var email = bluffmaster.internet.exampleEmail();
      assert.ok(email.match(/@example\.(org|com|net)$/));
    });
  });

  describe("userName()", function () {
    it("occasionally returns a single firstName", function () {
      sinon.stub(bluffmaster.datatype, 'number').returns(0);
      sinon.spy(bluffmaster.name, 'firstName');
      var username = bluffmaster.internet.userName();

      assert.ok(username);
      assert.ok(bluffmaster.name.firstName.called);

      bluffmaster.datatype.number.restore();
      bluffmaster.name.firstName.restore();
    });

    it("occasionally returns a firstName with a period or hyphen and a lastName", function () {
      sinon.stub(bluffmaster.datatype, 'number').returns(1);
      sinon.spy(bluffmaster.name, 'firstName');
      sinon.spy(bluffmaster.name, 'lastName');
      sinon.spy(bluffmaster.random, 'arrayElement');
      var username = bluffmaster.internet.userName();

      assert.ok(username);
      assert.ok(bluffmaster.name.firstName.called);
      assert.ok(bluffmaster.name.lastName.called);
      assert.ok(bluffmaster.random.arrayElement.calledWith(['.', '_']));

      bluffmaster.datatype.number.restore();
      bluffmaster.name.firstName.restore();
      bluffmaster.name.lastName.restore();
      bluffmaster.random.arrayElement.restore();
    });
  });

  describe("domainName()", function () {
    it("returns a domainWord plus a random suffix", function () {
      sinon.stub(bluffmaster.internet, 'domainWord').returns('bar');
      sinon.stub(bluffmaster.internet, 'domainSuffix').returns('net');

      var domain_name = bluffmaster.internet.domainName();

      assert.strictEqual(domain_name, 'bar.net');

      bluffmaster.internet.domainWord.restore();
      bluffmaster.internet.domainSuffix.restore();
    });
  });

  describe("domainWord()", function () {
    it("returns a lower-case adjective + noun", function () {
      sinon.stub(bluffmaster.word, 'adjective').returns('RANDOM');
      sinon.stub(bluffmaster.word, 'noun').returns('WORD');
      var domain_word = bluffmaster.internet.domainWord();

      assert.ok(domain_word);
      assert.strictEqual(domain_word, 'random-word');

      bluffmaster.word.adjective.restore();
      bluffmaster.word.noun.restore();
    });
    describe("when the firstName used contains a apostrophe", function () {
      sinon.stub(bluffmaster.word, 'adjective').returns('an\'other');
      sinon.stub(bluffmaster.word, 'noun').returns('no\'un');
      var domain_word = bluffmaster.internet.domainWord();

      it("should remove the apostrophe", function () {
        assert.strictEqual(domain_word, 'another-noun');
      });

      bluffmaster.word.adjective.restore();
      bluffmaster.word.noun.restore();
    });
  });

  describe('protocol()', function () {
    it('returns a valid protocol', function () {
      var protocol = bluffmaster.internet.protocol();
      assert.ok(protocol);
    });

    it('should occasionally return http', function () {
      sinon.stub(bluffmaster.datatype, 'number').returns(0);
      var protocol = bluffmaster.internet.protocol();
      assert.ok(protocol);
      assert.strictEqual(protocol, 'http');

      bluffmaster.datatype.number.restore();
    });

    it('should occasionally return https', function () {
      sinon.stub(bluffmaster.datatype, 'number').returns(1);
      var protocol = bluffmaster.internet.protocol();
      assert.ok(protocol);
      assert.strictEqual(protocol, 'https');

      bluffmaster.datatype.number.restore();
    });
  });

  describe('httpMethod()', function () {
    it('returns a valid http method', function () {
      var httpMethods = ['GET','POST', 'PUT', 'DELETE', 'PATCH'];
      var method = bluffmaster.internet.httpMethod();
      assert.ok(httpMethods.includes(method));
    });
  });

  describe('url()', function () {
    it('returns a valid url', function () {
      sinon.stub(bluffmaster.internet,'protocol').returns('http');
      sinon.stub(bluffmaster.internet, 'domainWord').returns('bar');
      sinon.stub(bluffmaster.internet, 'domainSuffix').returns('net');

      var url = bluffmaster.internet.url();

      assert.ok(url);
      assert.strictEqual(url,'http://bar.net');
    });
  });

  describe("ip()", function () {
    it("returns a random IP address with four parts", function () {
      var ip = bluffmaster.internet.ip();
      var parts = ip.split('.');
      assert.strictEqual(parts.length, 4);
    });
  });

  describe("ipv6()", function () {
    it("returns a random IPv6 address with eight parts", function () {
      var ip = bluffmaster.internet.ipv6();
      var parts = ip.split(':');
      assert.strictEqual(parts.length, 8);
    });
  });

  describe("port()", function () {
    it("returns a random port number", function () {
      var port = bluffmaster.internet.port();
      assert.ok(Number.isInteger(port));
      assert.ok(0 <= port && port <= 65535);
    });
  });

  describe("userAgent()", function () {
    it("returns a valid user-agent", function () {
      var ua = bluffmaster.internet.userAgent();
      assert.ok(ua);
    });

    it('is deterministic', function () {
      bluffmaster.seed(1);
      var ua1 = bluffmaster.internet.userAgent();
      bluffmaster.seed(1);
      var ua2 = bluffmaster.internet.userAgent();
      assert.strictEqual(ua1, ua2);
    });
  });

  describe("color()", function () {
    it("returns a valid hex value (like #ffffff)", function () {
      var color = bluffmaster.internet.color(100, 100, 100);
      assert.ok(color.match(/^#[a-f0-9]{6}$/));
    });
  });

  describe("mac()", function () {
    it("returns a random MAC address with 6 hexadecimal digits", function () {
      var mac = bluffmaster.internet.mac();
      assert.ok(mac.match(/^([a-f0-9]{2}:){5}[a-f0-9]{2}$/));
    });

    it("uses the dash separator if we pass it in as our separator", function () {
      var mac = bluffmaster.internet.mac('-');
      assert.ok(mac.match(/^([a-f0-9]{2}-){5}[a-f0-9]{2}$/));
    });

    it("uses no separator if we pass in an empty string", function() {
      var mac = bluffmaster.internet.mac('');
      assert.ok(mac.match(/^[a-f0-9]{12}$/));
    });

    it("uses the default colon (:) if we provide an unacceptable separator", function() {
      var mac = bluffmaster.internet.mac('!');
      assert.ok(mac.match(/^([a-f0-9]{2}:){5}[a-f0-9]{2}$/));

      mac = bluffmaster.internet.mac('&');
      assert.ok(mac.match(/^([a-f0-9]{2}:){5}[a-f0-9]{2}$/));
    });
  });
});