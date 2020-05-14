"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var createChunkLoader = function createChunkLoader() {
  var loadingChunks = {};
  return {
    subscribe: function subscribe(_ref) {
      var x = _ref.x,
          y = _ref.y;
      loadingChunks["".concat(x, "/").concat(y)] = true;
    },
    unsubscribe: function unsubscribe(_ref2) {
      var x = _ref2.x,
          y = _ref2.y;
      delete loadingChunks["".concat(x, "/").concat(y)];
    },
    isLoading: function isLoading(_ref3) {
      var x = _ref3.x,
          y = _ref3.y;
      return loadingChunks["".concat(x, "/").concat(y)] === true;
    }
  };
};

var _default = createChunkLoader;
exports.default = _default;