"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var createTestMapLoader = function createTestMapLoader(_ref) {
  var chunks = _ref.chunks;
  return {
    getChunk: function getChunk(_ref2) {
      var x = _ref2.x,
          y = _ref2.y;
      return new Promise(function (resolve) {
        setTimeout(function () {
          return resolve(chunks[x][y]);
        }, 300);
      });
    }
  };
};

var _default = createTestMapLoader;
exports.default = _default;