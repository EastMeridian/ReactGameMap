"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var createAssetsLoader = function createAssetsLoader() {
  var assets = {};
  return {
    loadImageAsync: function loadImageAsync(key, src) {
      return new Promise(function (resolve, reject) {
        var image = new Image();

        image.onload = function () {
          assets[key] = image;
          console.log("Image ".concat(key, " successfuly loaded."));
          resolve(image);
        };

        image.onerror = function () {
          console.log("Could not load image: ".concat(src));
          reject(new Error("Could not load image: ".concat(src)));
        };

        image.src = src;
      });
    },
    getAsset: function getAsset(key) {
      return assets[key];
    }
  };
};

var _default = createAssetsLoader;
exports.default = _default;