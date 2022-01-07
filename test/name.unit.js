if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var blaver = require('../index');

}

function assertInArray(value, array) {
  var idx = array.indexOf(value);
  assert.notEqual(idx, -1);
}

describe("name.js", function () {
  describe("firstName()", function () {
    it("returns a random name", function () {
      sinon.stub(blaver.name, 'firstName').returns('foo');
      var first_name = blaver.name.firstName();

      assert.strictEqual(first_name, 'foo');

      blaver.name.firstName.restore();
    });
        
    it("returns a gender-specific name when passed a number", function () {
      for (var q = 0; q < 30; q++) {
        var gender = Math.floor(Math.random() * 2);
        var name = blaver.name.firstName(gender);
        if (gender === 0) {assertInArray(name, blaver.definitions.name.male_first_name);}
        else {assertInArray(name, blaver.definitions.name.female_first_name);}
      }
    });
        
    it("returns a gender-specific name when passed a string", function () {
      for (var q = 0; q < 30; q++) {
        var gender = Math.floor(Math.random() * 2);
        var genderString = (gender === 0 ? 'male' : 'female');
        var name = blaver.name.firstName(genderString);
        assertInArray(name, blaver.definitions.name[genderString + '_first_name']);
      }
    });
  });

  describe("lastName()", function () {
    it("returns a random name", function () {
      sinon.stub(blaver.name, 'lastName').returns('foo');

      var last_name = blaver.name.lastName();

      assert.strictEqual(last_name, 'foo');

      blaver.name.lastName.restore();
    });
  });

  describe("middleName()", function () {

    it("returns a random middle name", function () {
      sinon.stub(blaver.name, 'middleName').returns('foo');

      var middle_name = blaver.name.middleName();

      assert.strictEqual(middle_name, 'foo');

      blaver.name.middleName.restore();
    });

    describe('when using a locale with gender specific middle names', function () {
      beforeEach(function(){
        this.oldLocale = blaver.locale;
        blaver.locale = 'TEST';

        blaver.locales['TEST'] = {
          name: {
            male_middle_name: ['Genaddiesvich'],
            female_middle_name: ['Genaddievna']
          }
        };
      });

      afterEach(function () {
        blaver.locale = this.oldLocale;
        delete blaver.locale['TEST'];
      })

      it("returns male prefix", function () {
        var middle_name = blaver.name.middleName(0);

        assert.strictEqual(middle_name, 'Genaddiesvich')
      });

      it("returns female prefix", function () {
        var middle_name = blaver.name.middleName(1);

        assert.strictEqual(middle_name, 'Genaddievna');
      });
    });
  });


  describe("findName()", function () {
    it("usually returns a first name and last name", function () {
      sinon.stub(blaver.datatype, 'number').returns(5);
      var name = blaver.name.findName();
      assert.ok(name);
      var parts = name.split(' ');

      assert.strictEqual(parts.length, 2);

      blaver.datatype.number.restore();
    });

    it("occasionally returns a first name and last name with a prefix", function () {
      sinon.stub(blaver.datatype, 'number').returns(0);
      var name = blaver.name.findName();
      var parts = name.split(' ');

      assert.ok(parts.length >= 3);

      blaver.datatype.number.restore();
    });

    it("occasionally returns a male full name with a prefix", function () {
      sinon.stub(blaver.datatype, 'number')
        .withArgs(8).returns(0) // with prefix
        .withArgs(1).returns(0); // gender male

      sinon.stub(blaver.name, 'prefix').withArgs(0).returns('X');
      sinon.stub(blaver.name, 'firstName').withArgs(0).returns('Y');
      sinon.stub(blaver.name, 'lastName').withArgs(0).returns('Z');

      var name = blaver.name.findName();

      assert.strictEqual(name, 'X Y Z');

      blaver.datatype.number.restore();
      blaver.name.prefix.restore();
      blaver.name.firstName.restore();
      blaver.name.lastName.restore();
    });

    it("occasionally returns a female full name with a prefix", function () {
      sinon.stub(blaver.datatype, 'number')
        .withArgs(8).returns(0) // with prefix
        .withArgs(1).returns(1); // gender female

      sinon.stub(blaver.name, 'prefix').withArgs(1).returns('J');
      sinon.stub(blaver.name, 'firstName').withArgs(1).returns('K');
      sinon.stub(blaver.name, 'lastName').withArgs(1).returns('L');

      var name = blaver.name.findName();

      assert.strictEqual(name, 'J K L');

      blaver.datatype.number.restore();
      blaver.name.prefix.restore();
      blaver.name.firstName.restore();
      blaver.name.lastName.restore();
    });

    it("occasionally returns a first name and last name with a suffix", function () {
      sinon.stub(blaver.datatype, 'number').returns(1);
      sinon.stub(blaver.name, 'suffix').returns('Jr.');
      var name = blaver.name.findName();
      var parts = name.split(' ');

      assert.ok(parts.length >= 3);
      assert.strictEqual(parts[parts.length-1], 'Jr.');

      blaver.name.suffix.restore();
      blaver.datatype.number.restore();
    });

    it("needs to work with specific locales and respect the fallbacks", function () {
      blaver.locale = 'en_US';
      // this will throw if this is broken
      var name = blaver.name.findName();
    });
  });

  describe("title()", function () {
    it("returns a random title", function () {
      sinon.stub(blaver.name, 'title').returns('Lead Solutions Supervisor');

      var title = blaver.name.title();

      assert.strictEqual(title, 'Lead Solutions Supervisor');

      blaver.name.title.restore();
    });
  });

  describe("jobTitle()", function () {
    it("returns a job title consisting of a descriptor, area, and type", function () {
      sinon.spy(blaver.random, 'arrayElement');
      sinon.spy(blaver.name, 'jobDescriptor');
      sinon.spy(blaver.name, 'jobArea');
      sinon.spy(blaver.name, 'jobType');
      var jobTitle = blaver.name.jobTitle();

      assert.ok(typeof jobTitle === 'string');
      assert.ok(blaver.random.arrayElement.calledThrice);
      assert.ok(blaver.name.jobDescriptor.calledOnce);
      assert.ok(blaver.name.jobArea.calledOnce);
      assert.ok(blaver.name.jobType.calledOnce);

      blaver.random.arrayElement.restore();
      blaver.name.jobDescriptor.restore();
      blaver.name.jobArea.restore();
      blaver.name.jobType.restore();
    });
  });

  describe("prefix()", function () {
    describe('when using a locale with gender specific name prefixes', function () {
      beforeEach(function(){
        this.oldLocale = blaver.locale;
        blaver.locale = 'TEST';

        blaver.locales['TEST'] = {
          name: {
            male_prefix: ['Mp'],
            female_prefix: ['Fp']
          }
        };
      });

      afterEach(function () {
        blaver.locale = this.oldLocale;
        delete blaver.locale['TEST'];
      })

      it("returns male prefix", function () {
        var prefix = blaver.name.prefix(0);
        assert.strictEqual(prefix, 'Mp')
      });

      it("returns female prefix", function () {
        var prefix = blaver.name.prefix(1);

        assert.strictEqual(prefix, 'Fp');
      });

      it("returns either prefix", function () {
        var prefix = blaver.name.prefix();
        assert(['Mp', 'Fp'].indexOf(prefix) >= 0)
      });

    });

    describe('when using a locale without gender specific name prefixes', function () {
      beforeEach(function(){
        this.oldLocale = blaver.locale;
        blaver.locale = 'TEST';

        blaver.locales['TEST'] = {
          name: {
            prefix: ['P']
          }
        };
      });

      afterEach(function () {
        blaver.locale = this.oldLocale;
        delete blaver.locale['TEST'];
      })

      it("returns a prefix", function () {
        var prefix = blaver.name.prefix();

        assert.strictEqual(prefix, 'P');
      });
    });
  });
});