"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _renderer = require("./renderer");

var _camera = require("./camera");

var _createMapManager = _interopRequireDefault(require("./createMapManager"));

var _createChunkLoader = _interopRequireDefault(require("./createChunkLoader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Engine(_ref) {
  var width = _ref.width,
      height = _ref.height,
      assets = _ref.assets,
      context = _ref.context,
      onRequestChunks = _ref.onRequestChunks;
  this.map = (0, _createMapManager.default)();
  this.camera = (0, _camera.createCamera)({
    map: this.map,
    width: width,
    height: height
  });
  this.renderer = (0, _renderer.createRenderer)({
    camera: this.camera,
    map: this.map,
    context: context,
    assets: assets
  });
  this.chunkLoader = (0, _createChunkLoader.default)();
  this.onRequestChunks = onRequestChunks;
}

Engine.prototype.renderMap = function renderMap() {
  this.renderer.update(this.map);
};

Engine.prototype.requestChunks = function requestChunks() {
  var _this = this;

  var _this$camera$getEnlar = this.camera.getEnlargedBoundaries(),
      startCol = _this$camera$getEnlar.startCol,
      endCol = _this$camera$getEnlar.endCol,
      startRow = _this$camera$getEnlar.startRow,
      endRow = _this$camera$getEnlar.endRow;

  var wantedChunksPosition = [];

  for (var c = startCol - 1; c <= endCol + 1; c += 1) {
    for (var r = startRow - 1; r <= endRow + 1; r += 1) {
      if (this.map.getChunk(c, r) === null) {
        var chunkPosition = this.map.getChunkPosition(c, r);

        if (wantedChunksPosition.findIndex(this.map.sameChunk(chunkPosition)) === -1 && !this.chunkLoader.isLoading(chunkPosition)) {
          this.chunkLoader.subscribe(chunkPosition);
          wantedChunksPosition.push(chunkPosition);
        }
      }
    }
  }

  wantedChunksPosition.forEach(function (chunkPosition) {
    return _this.onRequestChunks(chunkPosition).then(function (chunk) {
      var chunks = _this.map.chunks;

      _this.chunkLoader.unsubscribe(chunkPosition);

      chunks[chunk.x][chunk.y] = chunk;
      requestAnimationFrame(_this.renderMap.bind(_this));
    });
  });
};

Engine.prototype.selectTile = function selectTile(x, y) {
  var tile = this.findTile(x, y);
  if (!tile) return null;
  this.renderer.selectTile(tile.id);
  this.renderMap();
  return tile;
};

Engine.prototype.resetSelectTile = function selectTile() {
  this.renderer.resetSelectTile();
  this.renderMap();
};

Engine.prototype.findTileByPosition = function findTileByPosition(x, y) {
  var _this$camera$getRende = this.camera.getRenderedBoundaries(),
      startCol = _this$camera$getRende.startCol,
      startRow = _this$camera$getRende.startRow,
      offsetX = _this$camera$getRende.offsetX,
      offsetY = _this$camera$getRende.offsetY;

  var clickX = Math.floor((x - offsetX) / this.map.tileSize);
  var clickY = Math.floor((y - offsetY) / this.map.tileSize);
  var tileX = startCol + clickX;
  var tileY = startRow + clickY;
  return {
    x: tileX,
    y: tileY
  };
};

Engine.prototype.findTile = function findTile(x, y) {
  var position = this.findTileByPosition(x, y);
  var tile = this.map.getTile(position.x, position.y, this.map);
  return tile;
};

Engine.prototype.update = function update() {
  this.requestChunks();
  this.renderMap();
};

var _default = Engine;
exports.default = _default;