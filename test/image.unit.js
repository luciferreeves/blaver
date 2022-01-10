if (typeof module !== 'undefined') {
  var assert = require('assert');
  var blaver = require('../index');
}

describe("image.js", function () {
  describe("lorempicsum", function() {
    describe("imageUrl()", function () {
      it("returns a random image url from lorempixel", function () {
        const imageUrl = blaver.image.lorempicsum.imageUrl();
    
        assert.strictEqual(imageUrl, 'https://picsum.photos/640/480');
      });
      it("returns a random image url from lorem picsum with width and height", function () {
        const imageUrl = blaver.image.lorempicsum.imageUrl(100, 100);
    
        assert.strictEqual(imageUrl, 'https://picsum.photos/100/100');
      });
      it("returns a random image url grayscaled", function () {
        const imageUrl = blaver.image.lorempicsum.imageUrl(100, 100, true);
    
        assert.strictEqual(imageUrl, 'https://picsum.photos/100/100?grayscale');
      });

      it("returns a random image url grayscaled and blurred", function () {
        const imageUrl = blaver.image.lorempicsum.imageUrl(100, 100, true, 2);
    
        assert.strictEqual(imageUrl, 'https://picsum.photos/100/100?grayscale&blur=2');
      });

      it("returns a random image url blurred", function () {
        const imageUrl = blaver.image.lorempicsum.imageUrl(100, 100, undefined, 2);
    
        assert.strictEqual(imageUrl, 'https://picsum.photos/100/100?blur=2');
      });

      it("returns a random image url with seed", function () {
        const imageUrl = blaver.image.lorempicsum.imageUrl(100, 100, undefined, undefined, 'picsum');
    
        assert.strictEqual(imageUrl, 'https://picsum.photos/seed/picsum/100/100');
      });
    });
    describe("avatar()", function () {
      it("return a random avatar from Pravatar", function () {
        assert.notStrictEqual(-1, blaver.image.lorempicsum.avatar().indexOf('https://i.pravatar.cc'));
      });
    });

    describe("imageGrayscale()", function () {
      it("returns a random URL with grayscale image", function () {
        const imageUrl = blaver.image.lorempicsum.imageGrayscale(100, 100, true);
                
        assert.strictEqual(imageUrl, 'https://picsum.photos/100/100?grayscale');
      });
    });
    describe("imageBlurred()", function () {
      it("returns a random image url blurred", function () {
        const imageUrl = blaver.image.lorempicsum.imageBlurred(100, 100, 2);
    
        assert.strictEqual(imageUrl, 'https://picsum.photos/100/100?blur=2');
      });
    });
    describe("imageRandomSeeded()", function () {
      it("returns a random image url blurred", function () {
        const imageUrl = blaver.image.lorempicsum.imageRandomSeeded(100, 100, undefined, undefined, 'picsum');
    
        assert.strictEqual(imageUrl, 'https://picsum.photos/seed/picsum/100/100');
      });
    });
  });

  describe("lorempixel", function() {
    describe("imageUrl()", function () {
      it("returns a random image url from lorempixel", function () {
        const imageUrl = blaver.image.lorempixel.imageUrl();

        assert.strictEqual(imageUrl, 'https://lorempixel.com/640/480');
      });
      it("returns a random image url from lorempixel with width and height", function () {
        const imageUrl = blaver.image.lorempixel.imageUrl(100, 100);

        assert.strictEqual(imageUrl, 'https://lorempixel.com/100/100');
      });
      it("returns a random image url for a specified category", function () {
        const imageUrl = blaver.image.lorempixel.imageUrl(100, 100, 'abstract');

        assert.strictEqual(imageUrl, 'https://lorempixel.com/100/100/abstract');
      });
    });
    describe("avatar()", function () {
      it("return a random avatar from Pravatar", function () {
        assert.notStrictEqual(-1, blaver.image.lorempixel.avatar().indexOf('https://i.pravatar.cc'));
      });
    });
    describe("abstract()", function () {
      it("returns a random abstract image url", function () {
        const abstract = blaver.image.lorempixel.abstract();
        assert.strictEqual(abstract, 'https://lorempixel.com/640/480/abstract');
      });
    });
    describe("animals()", function () {
      it("returns a random animals image url", function () {
        const animals = blaver.image.lorempixel.animals();
        assert.strictEqual(animals, 'https://lorempixel.com/640/480/animals');
      });
    });
    describe("business()", function () {
      it("returns a random business image url", function () {
        const business = blaver.image.lorempixel.business();
        assert.strictEqual(business, 'https://lorempixel.com/640/480/business');
      });
    });
    describe("cats()", function () {
      it("returns a random cats image url", function () {
        const cats = blaver.image.lorempixel.cats();
        assert.strictEqual(cats, 'https://lorempixel.com/640/480/cats');
      });
    });
    describe("city()", function () {
      it("returns a random city image url", function () {
        const city = blaver.image.lorempixel.city();
        assert.strictEqual(city, 'https://lorempixel.com/640/480/city');
      });
    });
    describe("food()", function () {
      it("returns a random food image url", function () {
        const food = blaver.image.lorempixel.food();
        assert.strictEqual(food, 'https://lorempixel.com/640/480/food');
      });
    });
    describe("nightlife()", function () {
      it("returns a random nightlife image url", function () {
        const nightlife = blaver.image.lorempixel.nightlife();
        assert.strictEqual(nightlife, 'https://lorempixel.com/640/480/nightlife');
      });
    });
    describe("fashion()", function () {
      it("returns a random fashion image url", function () {
        const fashion = blaver.image.lorempixel.fashion();
        assert.strictEqual(fashion, 'https://lorempixel.com/640/480/fashion');
      });
    });
    describe("people()", function () {
      it("returns a random people image url", function () {
        const people = blaver.image.lorempixel.people();
        assert.strictEqual(people, 'https://lorempixel.com/640/480/people');
      });
    });
    describe("nature()", function () {
      it("returns a random nature image url", function () {
        const nature = blaver.image.lorempixel.nature();
        assert.strictEqual(nature, 'https://lorempixel.com/640/480/nature');
      });
    });
    describe("sports()", function () {
      it("returns a random sports image url", function () {
        const sports = blaver.image.lorempixel.sports();
        assert.strictEqual(sports, 'https://lorempixel.com/640/480/sports');
      });
    });
    describe("technics()", function () {
      it("returns a random technics image url", function () {
        const technics = blaver.image.lorempixel.technics();
        assert.strictEqual(technics, 'https://lorempixel.com/640/480/technics');
      });
    });
    describe("transport()", function () {
      it("returns a random transport image url", function () {
        const transport = blaver.image.lorempixel.transport();
        assert.strictEqual(transport, 'https://lorempixel.com/640/480/transport');
      });
    });
  });

  describe("unsplash", function() {
    describe("imageUrl()", function () {
      it("returns a random image url from unsplash", function () {
        const imageUrl = blaver.image.unsplash.imageUrl();

        assert.strictEqual(imageUrl, 'https://source.unsplash.com/640x480');
      });
      it("returns a random image url from unsplash with width and height", function () {
        const imageUrl = blaver.image.unsplash.imageUrl(100, 100);

        assert.strictEqual(imageUrl, 'https://source.unsplash.com/100x100');
      });
      it("returns a random image url for a specified category", function () {
        const imageUrl = blaver.image.unsplash.imageUrl(100, 100, 'food');

        assert.strictEqual(imageUrl, 'https://source.unsplash.com/category/food/100x100');
      });
      it("returns a random image url with correct keywords for a specified category", function () {
        const imageUrl = blaver.image.unsplash.imageUrl(100, 100, 'food', 'keyword1,keyword2');

        assert.strictEqual(imageUrl, 'https://source.unsplash.com/category/food/100x100?keyword1,keyword2');
      });
      it("returns a random image url without keyword which format is wrong for a specified category", function () {
        const imageUrl = blaver.image.unsplash.imageUrl(100, 100, 'food', 'keyword1,?ds)0123$*908932409');

        assert.strictEqual(imageUrl, 'https://source.unsplash.com/category/food/100x100');
      });
    });
    describe("image()", function() {
      it("returns a searching image url with keyword", function () {
        const food = blaver.image.unsplash.image(100, 200, 'keyword1,keyword2,keyword3');
        assert.strictEqual(food, 'https://source.unsplash.com/100x200?keyword1,keyword2,keyword3');
      });
    });
    describe("food()", function () {
      it("returns a random food image url", function () {
        const food = blaver.image.unsplash.food();
        assert.strictEqual(food, 'https://source.unsplash.com/category/food/640x480');
      });
    });
    describe("people()", function () {
      it("returns a random people image url", function () {
        const people = blaver.image.unsplash.people();
        assert.strictEqual(people, 'https://source.unsplash.com/category/people/640x480');
      });
    });
    describe("nature()", function () {
      it("returns a random nature image url", function () {
        const nature = blaver.image.unsplash.nature();
        assert.strictEqual(nature, 'https://source.unsplash.com/category/nature/640x480');
      });
    });
    describe("technology()", function () {
      it("returns a random technology image url", function () {
        const transport = blaver.image.unsplash.technology();
        assert.strictEqual(transport, 'https://source.unsplash.com/category/technology/640x480');
      });
    });
    describe("objects()", function () {
      it("returns a random objects image url", function () {
        const transport = blaver.image.unsplash.objects();
        assert.strictEqual(transport, 'https://source.unsplash.com/category/objects/640x480');
      });
    });
    describe("buildings()", function () {
      it("returns a random buildings image url", function () {
        const transport = blaver.image.unsplash.buildings();
        assert.strictEqual(transport, 'https://source.unsplash.com/category/buildings/640x480');
      });
    });
  });
  describe("dataUri", function () {
    it("returns a blank data", function () {
      const dataUri = blaver.image.dataUri(200,300);
      assert.strictEqual(dataUri, 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22200%22%20height%3D%22300%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22100%22%20y%3D%22150%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3E200x300%3C%2Ftext%3E%3C%2Fsvg%3E');
    });
    it("returns a customed background color data URI", function () {
      const dataUri = blaver.image.dataUri(200, 300, 'red');
      assert.strictEqual(dataUri, 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22200%22%20height%3D%22300%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22red%22%2F%3E%3Ctext%20x%3D%22100%22%20y%3D%22150%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3E200x300%3C%2Ftext%3E%3C%2Fsvg%3E');
    });
  });
});
