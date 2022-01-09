/**
 *
 * @namespace lorempicsum
 * @memberof blaver.image
 */
const LoremPicsum = function (blaver) {

  const self = this;

  /**
   * image
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} grayscale
   * @param {number} blur 1-10
   * @method blaver.image.lorempicsum.image
   * @description search image from unsplash
   */
  self.image = function (width, height, grayscale, blur) {
    return self.imageUrl(width, height, grayscale, blur);
  };
  /**
   * imageGrayscaled
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} grayscale
   * @method blaver.image.lorempicsum.imageGrayscaled
   * @description search grayscale image from unsplash
   */
  self.imageGrayscale = function (width, height, grayscale) {
    return self.imageUrl(width, height, grayscale);
  };
  /**
   * imageBlurred
   *
   * @param {number} width
   * @param {number} height
   * @param {number} blur 1-10
   * @method blaver.image.lorempicsum.imageBlurred
   * @description search blurred image from unsplash
   */
  self.imageBlurred = function (width, height, blur) {
    return self.imageUrl(width, height, undefined, blur);
  };
  /**
   * imageRandomSeeded
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} grayscale
   * @param {number} blur 1-10
   * @param {string} seed
   * @method blaver.image.lorempicsum.imageRandomSeeded
   * @description search same random image from unsplash, based on a seed
   */
  self.imageRandomSeeded = function (width, height, grayscale, blur, seed) {
    return self.imageUrl(width, height, grayscale, blur, seed);
  };
  /**
   * avatar
   *
   * @method blaver.image.lorempicsum.avatar
   */
  self.avatar = function () {
    return blaver.internet.avatar();
  };
  /**
   * imageUrl
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} grayscale
   * @param {number} blur 1-10
   * @param {string} seed
   * @method blaver.image.lorempicsum.imageUrl
   */
  self.imageUrl = function (width = 640, height = 480, grayscale, blur, seed) {
    let url = 'https://picsum.photos';
        
    if (seed) {
      url += '/seed/' + seed;
    }

    url += '/' + width + '/' + height;
      
    if (grayscale && blur) {
      return url + '?grayscale' + '&blur=' + blur;
    }

    if (grayscale) {
      return url + '?grayscale';
    }

    if (blur) {
      return url + '?blur=' + blur;
    }
  
    return url;
  };
};

module.exports = LoremPicsum;
