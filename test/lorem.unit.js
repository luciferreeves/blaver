if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var blaver = require('../index');
}

describe("lorem.js", function () {
  describe("word()", function () {

    context("when no 'length' param passed in", function () {
      it("returns a word with a random length", function () {
        const str = blaver.lorem.word();
        assert.ok(typeof str === 'string');
      });
    });

    context("when 'length' param passed in", function () {
      it("returns a word with the requested length", function () {
        const str = blaver.lorem.word(5);
        assert.ok(typeof str === 'string');
        assert.strictEqual(str.length, 5);
      });
    });
  });
    
  describe("words()", function () {
    beforeEach(function () {
      sinon.spy(blaver.helpers, 'shuffle');
    });

    afterEach(function () {
      blaver.helpers.shuffle.restore();
    });

    context("when no 'num' param passed in", function () {
      it("returns three words", function () {
        const str = blaver.lorem.words();
        const words = str.split(' ');
        assert.ok(Array.isArray(words));
        assert.strictEqual(true, words.length >= 3);
        // assert.ok(blaver.helpers.shuffle.called);
      });
    });

    context("when 'num' param passed in", function () {
      it("returns requested number of words", function () {
        const str = blaver.lorem.words(7);
        const words = str.split(' ');
        assert.ok(Array.isArray(words));
        assert.strictEqual(words.length, 7);
      });
    });
  });

  describe("slug()", function () {
    beforeEach(function () {
      sinon.spy(blaver.helpers, 'shuffle');
    });

    afterEach(function () {
      blaver.helpers.shuffle.restore();
    });

    const validateSlug = function (wordCount, str) {
      assert.strictEqual(1, str.match(/^[a-z][a-z-]*[a-z]$/).length);
      assert.strictEqual(wordCount - 1, str.match(/-/g).length);
    };

    context("when no 'wordCount' param passed in", function () {
      it("returns a slug with three words", function () {
        const str = blaver.lorem.slug();
        validateSlug(3, str);
      });
    });

    context("when 'wordCount' param passed in", function () {
      it("returns a slug with requested number of words", function () {
        const str = blaver.lorem.slug(7);
        validateSlug(7, str);
      });
    });

  });

  /*
    describe("sentence()", function () {
        context("when no 'wordCount' or 'range' param passed in", function () {
            it("returns a string of at least three words", function () {
                sinon.spy(blaver.lorem, 'words');
                sinon.stub(blaver.random, 'number').returns(2);
                const sentence = blaver.lorem.sentence();
                assert.ok(typeof sentence === 'string');
                const parts = sentence.split(' ');
                assert.strictEqual(parts.length, 5); // default 3 plus stubbed 2.
                assert.ok(blaver.lorem.words.calledWith(5));

                blaver.lorem.words.restore();
                blaver.random.number.restore();
            });
        });

        context("when 'wordCount' param passed in", function () {
            it("returns a string of at least the requested number of words", function () {
                sinon.spy(blaver.lorem, 'words');
                sinon.stub(blaver.random, 'number').withArgs(7).returns(2);
                const sentence = blaver.lorem.sentence(10);

                assert.ok(typeof sentence === 'string');
                const parts = sentence.split(' ');
                assert.strictEqual(parts.length, 12); // requested 10 plus stubbed 2.
                assert.ok(blaver.lorem.words.calledWith(12));

                blaver.lorem.words.restore();
                blaver.random.number.restore();
            });
        });

        context("when 'wordCount' and 'range' params passed in", function () {
            it("returns a string of at least the requested number of words", function () {
                sinon.spy(blaver.lorem, 'words');
                sinon.stub(blaver.random, 'number').withArgs(4).returns(4);

                const sentence = blaver.lorem.sentence(10, 4);

                assert.ok(typeof sentence === 'string');
                const parts = sentence.split(' ');
                assert.strictEqual(parts.length, 14); // requested 10 plus stubbed 4.
                assert.ok(blaver.random.number.calledWith(4)); // random.number should be called with the 'range' we passed. 
                assert.ok(blaver.lorem.words.calledWith(14));

                blaver.lorem.words.restore();
                blaver.random.number.restore();
            });


        });
    });
    */
  /*
    describe("sentences()", function () {
        context("when no 'sentenceCount' param passed in", function () {
            it("returns newline-separated string of three sentences", function () {
                sinon.spy(blaver.lorem, 'sentence');
                const sentences = blaver.lorem.sentences();

                assert.ok(typeof sentences === 'string');
                const parts = sentences.split('\n');
                assert.strictEqual(parts.length, 3);
                assert.ok(blaver.lorem.sentence.calledThrice);

                blaver.lorem.sentence.restore();
            });
        });

        context("when 'sentenceCount' param passed in", function () {
            it("returns newline-separated string of requested number of sentences", function () {
                sinon.spy(blaver.lorem, 'sentence');
                const sentences = blaver.lorem.sentences(5);

                assert.ok(typeof sentences === 'string');
                const parts = sentences.split('\n');
                assert.strictEqual(parts.length, 5);

                blaver.lorem.sentence.restore();
            });
        });
    });
    */
  /*
    describe("paragraph()", function () {
        context("when no 'wordCount' param passed in", function () {
            it("returns a string of at least three sentences", function () {
                sinon.spy(blaver.lorem, 'sentences');
                sinon.stub(blaver.random, 'number').returns(2);
                const paragraph = blaver.lorem.paragraph();

                assert.ok(typeof paragraph === 'string');
                const parts = paragraph.split('\n');
                assert.strictEqual(parts.length, 5); // default 3 plus stubbed 2.
                assert.ok(blaver.lorem.sentences.calledWith(5));

                blaver.lorem.sentences.restore();
                blaver.random.number.restore();
            });
        });

        context("when 'wordCount' param passed in", function () {
            it("returns a string of at least the requested number of sentences", function () {
                sinon.spy(blaver.lorem, 'sentences');
                sinon.stub(blaver.random, 'number').returns(2);
                const paragraph = blaver.lorem.paragraph(10);

                assert.ok(typeof paragraph === 'string');
                const parts = paragraph.split('\n');
                assert.strictEqual(parts.length, 12); // requested 10 plus stubbed 2.
                assert.ok(blaver.lorem.sentences.calledWith(12));

                blaver.lorem.sentences.restore();
                blaver.random.number.restore();
            });
        });
    });
    */
    
  /*

    describe("paragraphs()", function () {
        context("when no 'paragraphCount' param passed in", function () {
            it("returns newline-separated string of three paragraphs", function () {
                sinon.spy(blaver.lorem, 'paragraph');
                const paragraphs = blaver.lorem.paragraphs();

                assert.ok(typeof paragraphs === 'string');
                const parts = paragraphs.split('\n \r');
                assert.strictEqual(parts.length, 3);
                assert.ok(blaver.lorem.paragraph.calledThrice);

                blaver.lorem.paragraph.restore();
            });
        });

        context("when 'paragraphCount' param passed in", function () {
            it("returns newline-separated string of requested number of paragraphs", function () {
                sinon.spy(blaver.lorem, 'paragraph');
                const paragraphs = blaver.lorem.paragraphs(5);

                assert.ok(typeof paragraphs === 'string');
                const parts = paragraphs.split('\n \r');
                assert.strictEqual(parts.length, 5);

                blaver.lorem.paragraph.restore();
            });
        });
    });
    */
});