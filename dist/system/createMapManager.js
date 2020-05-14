"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mapFactory = require("../utils/mapFactory");

var WORLD_SIZE = 256;
var CHUNK_SIZE = 8;

var createMapManager = function createMapManager() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$tileSize = _ref.tileSize,
      tileSize = _ref$tileSize === void 0 ? 48 : _ref$tileSize,
      _ref$chunkSize = _ref.chunkSize,
      chunkSize = _ref$chunkSize === void 0 ? CHUNK_SIZE : _ref$chunkSize,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? WORLD_SIZE : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? WORLD_SIZE : _ref$height;

  return {
    tileSize: tileSize,
    width: width,
    height: height,
    chunks: (0, _mapFactory.createChunks)(WORLD_SIZE),
    chunkSize: chunkSize,
    getChunkPosition: function getChunkPosition(x, y) {
      return {
        x: Math.floor(x / chunkSize),
        y: Math.floor(y / chunkSize)
      };
    },
    getTilePosition: function getTilePosition(x, y) {
      return {
        x: x % chunkSize,
        y: y % chunkSize
      };
    },
    getChunk: function getChunk(x, y) {
      var _this$getChunkPositio = this.getChunkPosition(x, y),
          chunkX = _this$getChunkPositio.x,
          chunkY = _this$getChunkPositio.y;

      if (!this.chunks[chunkX]) return undefined;
      return this.chunks[chunkX][chunkY];
    },
    getTile: function getTile(x, y) {
      var _this$getTilePosition = this.getTilePosition(x, y),
          tileX = _this$getTilePosition.x,
          tileY = _this$getTilePosition.y;

      var chunk = this.getChunk(x, y);
      if (!chunk) return null;
      var tile = chunk.tiles[tileX][tileY];
      return tile;
    },
    sameChunk: function sameChunk(chunkA) {
      return function (chunkB) {
        return chunkA.x === chunkB.x && chunkA.y === chunkB.y;
      };
    }
  };
};

var _default = createMapManager;
exports.default = _default;