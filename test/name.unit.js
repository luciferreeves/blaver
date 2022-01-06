if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var bluffmaster = require('../index');

}

function assertInArray(value, array) {
  var idx = array.indexOf(value);
  assert.notEqual(idx, -1);
}

describe("name.js", function () {
  describe("firstName()", function () {
    it("returns a random name", function () {
      sinon.stub(bluffmaster.name, 'firstName').returns('foo');
      var first_name = bluffmaster.name.firstName();

      assert.strictEqual(first_name, 'foo');

      bluffmaster.name.firstName.restore();
    });
        
    it("returns a gender-specific name when passed a number", function () {
      for (var q = 0; q < 30; q++) {
        var gender = Math.floor(Math.random() * 2);
        var name = bluffmaster.name.firstName(gender);
        if (gender === 0) {assertInArray(name, bluffmaster.definitions.name.male_first_name);}
        else {assertInArray(name, bluffmaster.definitions.name.female_first_name);}
      }
    });
        
    it("returns a gender-specific name when passed a string", function () {
      for (var q = 0; q < 30; q++) {
        var gender = Math.floor(Math.random() * 2);
        var genderString = (gender === 0 ? 'male' : 'female');
        var name = bluffmaster.name.firstName(genderString);
        assertInArray(name, bluffmaster.definitions.name[genderString + '_first_name']);
      }
    });
  });

  describe("lastName()", function () {
    it("returns a random name", function () {
      sinon.stub(bluffmaster.name, 'lastName').returns('foo');

      var last_name = bluffmaster.name.lastName();

      assert.strictEqual(last_name, 'foo');

      bluffmaster.name.lastName.restore();
    });
  });

  describe("middleName()", function () {

    it("returns a random middle name", function () {
      sinon.stub(bluffmaster.name, 'middleName').returns('foo');

      var middle_name = bluffmaster.name.middleName();

      assert.strictEqual(middle_name, 'foo');

      bluffmaster.name.middleName.restore();
    });

    describe('when using a locale with gender specific middle names', function () {
      beforeEach(function(){
        this.oldLocale = bluffmaster.locale;
        bluffmaster.locale = 'TEST';

        bluffmaster.locales['TEST'] = {
          name: {
            male_middle_name: ['Genaddiesvich'],
            female_middle_name: ['Genaddievna']
          }
        };
      });

      afterEach(function () {
        bluffmaster.locale = this.oldLocale;
        delete bluffmaster.locale['TEST'];
      })

      it("returns male prefix", function () {
        var middle_name = bluffmaster.name.middleName(0);

        assert.strictEqual(middle_name, 'Genaddiesvich')
      });

      it("returns female prefix", function () {
        var middle_name = bluffmaster.name.middleName(1);

        assert.strictEqual(middle_name, 'Genaddievna');
      });
    });
  });


  describe("findName()", function () {
    it("usually returns a first name and last name", function () {
      sinon.stub(bluffmaster.datatype, 'number').returns(5);
      var name = bluffmaster.name.findName();
      assert.ok(name);
      var parts = name.split(' ');

      assert.strictEqual(parts.length, 2);

      bluffmaster.datatype.number.restore();
    });

    it("occasionally returns a first name and last name with a prefix", function () {
      sinon.stub(bluffmaster.datatype, 'number').returns(0);
      var name = bluffmaster.name.findName();
      var parts = name.split(' ');

      assert.ok(parts.length >= 3);

      bluffmaster.datatype.number.restore();
    });

    it("occasionally returns a male full name with a prefix", function () {
      sinon.stub(bluffmaster.datatype, 'number')
        .withArgs(8).returns(0) // with prefix
        .withArgs(1).returns(0); // gender male

      sinon.stub(bluffmaster.name, 'prefix').withArgs(0).returns('X');
      sinon.stub(bluffmaster.name, 'firstName').withArgs(0).returns('Y');
      sinon.stub(bluffmaster.name, 'lastName').withArgs(0).returns('Z');

      var name = bluffmaster.name.findName();

      assert.strictEqual(name, 'X Y Z');

      bluffmaster.datatype.number.restore();
      bluffmaster.name.prefix.restore();
      bluffmaster.name.firstName.restore();
      bluffmaster.name.lastName.restore();
    });

    it("occasionally returns a female full name with a prefix", function () {
      sinon.stub(bluffmaster.datatype, 'number')
        .withArgs(8).returns(0) // with prefix
        .withArgs(1).returns(1); // gender female

      sinon.stub(bluffmaster.name, 'prefix').withArgs(1).returns('J');
      sinon.stub(bluffmaster.name, 'firstName').withArgs(1).returns('K');
      sinon.stub(bluffmaster.name, 'lastName').withArgs(1).returns('L');

      var name = bluffmaster.name.findName();

      assert.strictEqual(name, 'J K L');

      bluffmaster.datatype.number.restore();
      bluffmaster.name.prefix.restore();
      bluffmaster.name.firstName.restore();
      bluffmaster.name.lastName.restore();
    });

    it("occasionally returns a first name and last name with a suffix", function () {
      sinon.stub(bluffmaster.datatype, 'number').returns(1);
      sinon.stub(bluffmaster.name, 'suffix').returns('Jr.');
      var name = bluffmaster.name.findName();
      var parts = name.split(' ');

      assert.ok(parts.length >= 3);
      assert.strictEqual(parts[parts.length-1], 'Jr.');

      bluffmaster.name.suffix.restore();
      bluffmaster.datatype.number.restore();
    });

    it("needs to work with specific locales and respect the fallbacks", function () {
      bluffmaster.locale = 'en_US';
      // this will throw if this is broken
      var name = bluffmaster.name.findName();
    });
  });

  describe("title()", function () {
    it("returns a random title", function () {
      sinon.stub(bluffmaster.name, 'title').returns('Lead Solutions Supervisor');

      var title = bluffmaster.name.title();

      assert.strictEqual(title, 'Lead Solutions Supervisor');

      bluffmaster.name.title.restore();
    });
  });

  describe("jobTitle()", function () {
    it("returns a job title consisting of a descriptor, area, and type", function () {
      sinon.spy(bluffmaster.random, 'arrayElement');
      sinon.spy(bluffmaster.name, 'jobDescriptor');
      sinon.spy(bluffmaster.name, 'jobArea');
      sinon.spy(bluffmaster.name, 'jobType');
      var jobTitle = bluffmaster.name.jobTitle();

      assert.ok(typeof jobTitle === 'string');
      assert.ok(bluffmaster.random.arrayElement.calledThrice);
      assert.ok(bluffmaster.name.jobDescriptor.calledOnce);
      assert.ok(bluffmaster.name.jobArea.calledOnce);
      assert.ok(bluffmaster.name.jobType.calledOnce);

      bluffmaster.random.arrayElement.restore();
      bluffmaster.name.jobDescriptor.restore();
      bluffmaster.name.jobArea.restore();
      bluffmaster.name.jobType.restore();
    });
  });

  describe("prefix()", function () {
    describe('when using a locale with gender specific name prefixes', function () {
      beforeEach(function(){
        this.oldLocale = bluffmaster.locale;
        bluffmaster.locale = 'TEST';

        bluffmaster.locales['TEST'] = {
          name: {
            male_prefix: ['Mp'],
            female_prefix: ['Fp']
          }
        };
      });

      afterEach(function () {
        bluffmaster.locale = this.oldLocale;
        delete bluffmaster.locale['TEST'];
      })

      it("returns male prefix", function () {
        var prefix = bluffmaster.name.prefix(0);
        assert.strictEqual(prefix, 'Mp')
      });

      it("returns female prefix", function () {
        var prefix = bluffmaster.name.prefix(1);

        assert.strictEqual(prefix, 'Fp');
      });

      it("returns either prefix", function () {
        var prefix = bluffmaster.name.prefix();
        assert(['Mp', 'Fp'].indexOf(prefix) >= 0)
      });

    });

    describe('when using a locale without gender specific name prefixes', function () {
      beforeEach(function(){
        this.oldLocale = bluffmaster.locale;
        bluffmaster.locale = 'TEST';

        bluffmaster.locales['TEST'] = {
          name: {
            prefix: ['P']
          }
        };
      });

      afterEach(function () {
        bluffmaster.locale = this.oldLocale;
        delete bluffmaster.locale['TEST'];
      })

      it("returns a prefix", function () {
        var prefix = bluffmaster.name.prefix();

        assert.strictEqual(prefix, 'P');
      });
    });
  });
});