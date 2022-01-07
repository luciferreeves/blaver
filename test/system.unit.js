if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var blaver = require('../index');
}

describe("system.js", function () {
  describe("directoryPath()", function () {
    it("returns unix fs directory full path", function () {
      sinon.stub(blaver.random, 'words').returns('24/7');
      const directoryPath = blaver.system.directoryPath();
      assert.strictEqual(directoryPath.indexOf('/'), 0, 'generated directoryPath should start with /');
    
      blaver.random.words.restore();
    });
  });

  describe("filePath()", function () {
    it("returns unix fs file full path", function () {
      sinon.stub(blaver.random, 'words').returns('24/7');
      const filePath = blaver.system.filePath();
      assert.strictEqual(filePath.indexOf('/'), 0, 'generated filePath should start with /');
    
      blaver.random.words.restore();
    });
  });
    
  describe("fileName()", function () {
    it("returns filenames without system path separators", function () {
      sinon.stub(blaver.random, 'words').returns('24/7');
      const fileName = blaver.system.fileName();
      assert.strictEqual(fileName.indexOf('/'), -1, 'generated fileNames should not have path separators');

      blaver.random.words.restore();
    });
  });

  describe("commonFileName()", function () {
    it("returns filenames without system path separators", function () {
      sinon.stub(blaver.random, 'words').returns('24/7');
      const fileName = blaver.system.commonFileName();
      assert.strictEqual(fileName.indexOf('/'), -1, 'generated commonFileNames should not have path separators');

      blaver.random.words.restore();
    });
  });
});