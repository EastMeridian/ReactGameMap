"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Renderer(_ref) {
  var context = _ref.context,
      assets = _ref.assets,
      layers = _ref.layers,
      map = _ref.map,
      camera = _ref.camera,
      onRequestChunks = _ref.onRequestChunks;
  this.context = context;
  this.assets = assets;
  this.layers = layers;
  this.map = map;
  this.camera = camera;
  this.selectedTile = null;
  this.onRequestChunks = onRequestChunks;
}

Renderer.prototype.getTileSource = function (tile, tilesetWidth, tileSize) {
  var formatedTile = tile - 1;
  return {
    x: formatedTile % tilesetWidth * tileSize,
    y: Math.floor(formatedTile / tilesetWidth) * tileSize
  };
};

Renderer.prototype.getRenderedBoundaries = function getRenderedBoundaries() {
  var tileSize = this.map.tileSize;
  var startCol = Math.floor(this.camera.x / tileSize);
  var endCol = startCol + this.camera.width / tileSize;
  var startRow = Math.floor(this.camera.y / tileSize);
  var endRow = startRow + this.camera.height / tileSize;
  var offsetX = -this.camera.x + startCol * tileSize;
  var offsetY = -this.camera.y + startRow * tileSize;
  return {
    startCol: startCol,
    endCol: endCol,
    startRow: startRow,
    endRow: endRow,
    offsetX: offsetX,
    offsetY: offsetY
  };
};

Renderer.prototype.getEnlargedBoundaries = function getEnlargedBoundaries() {
  var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  var _this$getRenderedBoun = this.getRenderedBoundaries(),
      startCol = _this$getRenderedBoun.startCol,
      endCol = _this$getRenderedBoun.endCol,
      startRow = _this$getRenderedBoun.startRow,
      endRow = _this$getRenderedBoun.endRow;

  var _this$map = this.map,
      width = _this$map.width,
      height = _this$map.height;
  var minCol = startCol - offset < 0 ? 0 : startCol - offset;
  var maxCol = endCol + offset > width - offset ? width - offset : endCol + offset;
  var minRow = startRow - offset < 0 ? 0 : startRow - offset;
  var maxRow = endRow + offset > height - offset ? height - offset : endRow + offset;
  return {
    minCol: minCol,
    maxCol: maxCol,
    minRow: minRow,
    maxRow: maxRow
  };
};

Renderer.prototype.renderTile = function renderTile(tile, boundaries, layer, image, c, r) {
  var startCol = boundaries.startCol,
      startRow = boundaries.startRow,
      offsetX = boundaries.offsetX,
      offsetY = boundaries.offsetY;
  var index = layer.index,
      tilesetWidth = layer.tilesetWidth;
  var tileSize = this.map.tileSize;
  var tileLayer = tile.layers[index];

  if (tileLayer !== 0) {
    // 0 => empty tile
    var x = (c - startCol) * tileSize + offsetX;
    var y = (r - startRow) * tileSize + offsetY;

    var _this$getTileSource = this.getTileSource(tileLayer, tilesetWidth, tileSize),
        sX = _this$getTileSource.x,
        sY = _this$getTileSource.y;

    this.context.drawImage(image, // image
    sX, // source x
    sY, // source y
    tileSize, // source width
    tileSize, // source height
    Math.round(x), // target x
    Math.round(y), // target y
    tileSize, // target width
    tileSize // target height
    );

    if (this.selectedTile && this.selectedTile === tile.id) {
      this.context.fillStyle = '#8ED6FF50';
      this.context.fillRect(Math.round(x) - 4, Math.round(y) - 4, tileSize + 8, tileSize + 8);
    }
  }
};

Renderer.prototype.renderLayer = function renderLayer(layer) {
  var asset = layer.asset;

  var _this$getRenderedBoun2 = this.getRenderedBoundaries(),
      startCol = _this$getRenderedBoun2.startCol,
      endCol = _this$getRenderedBoun2.endCol,
      startRow = _this$getRenderedBoun2.startRow,
      endRow = _this$getRenderedBoun2.endRow,
      other = _objectWithoutProperties(_this$getRenderedBoun2, ["startCol", "endCol", "startRow", "endRow"]);

  var image = this.assets.getAsset(asset);

  for (var c = startCol; c <= endCol; c += 1) {
    for (var r = startRow; r <= endRow; r += 1) {
      var tile = this.getTile(c, r, this.map);

      if (tile) {
        var boundaries = _objectSpread({
          startCol: startCol,
          endCol: endCol,
          startRow: startRow,
          endRow: endRow
        }, other);

        this.renderTile(tile, boundaries, layer, image, c, r);
      }
    }
  }
};

Renderer.prototype.getChunkPosition = function (x, y, chunkSize) {
  return {
    x: Math.floor(x / chunkSize),
    y: Math.floor(y / chunkSize)
  };
};

Renderer.prototype.getTilePosition = function (x, y, chunkSize) {
  return {
    x: x % chunkSize,
    y: y % chunkSize
  };
};

Renderer.prototype.getChunk = function getChunk(x, y, _ref2) {
  var chunks = _ref2.chunks,
      chunkSize = _ref2.chunkSize;

  var _this$getChunkPositio = this.getChunkPosition(x, y, chunkSize),
      chunkX = _this$getChunkPositio.x,
      chunkY = _this$getChunkPositio.y;

  if (!chunks[chunkX]) return undefined;
  return chunks[chunkX][chunkY];
};

Renderer.prototype.getTile = function getTile(x, y, _ref3) {
  var chunks = _ref3.chunks,
      chunkSize = _ref3.chunkSize;

  var _this$getTilePosition = this.getTilePosition(x, y, chunkSize),
      tileX = _this$getTilePosition.x,
      tileY = _this$getTilePosition.y;

  var chunk = this.getChunk(x, y, {
    chunks: chunks,
    chunkSize: chunkSize
  });
  if (!chunk) return null;
  var tile = chunk.tiles[tileX][tileY];
  return tile;
};

Renderer.prototype.renderMap = function renderMap() {
  this.context.clearRect(0, 0, this.camera.width, this.camera.height);
  this.layers.forEach(this.renderLayer.bind(this));
};

Renderer.prototype.findTileByPosition = function findTileByPosition(x, y) {
  var tileSize = this.map.tileSize;

  var _this$getRenderedBoun3 = this.getRenderedBoundaries(),
      startCol = _this$getRenderedBoun3.startCol,
      startRow = _this$getRenderedBoun3.startRow,
      offsetX = _this$getRenderedBoun3.offsetX,
      offsetY = _this$getRenderedBoun3.offsetY;

  var clickX = Math.floor((x - offsetX) / tileSize);
  var clickY = Math.floor((y - offsetY) / tileSize);
  var tileX = startCol + clickX;
  var tileY = startRow + clickY;
  return {
    x: tileX,
    y: tileY
  };
};

Renderer.prototype.selectTile = function selectTile(x, y) {
  var position = this.findTileByPosition(x, y);
  var tile = this.getTile(position.x, position.y, this.map);
  this.selectedTile = tile.id;
  this.renderMap();
  return tile;
};

Renderer.prototype.resetSelectTile = function selectTile() {
  this.selectedTile = null;
  this.renderMap();
};

Renderer.prototype.sameChunk = function (chunkA) {
  return function (chunkB) {
    return chunkA.x === chunkB.x && chunkA.y === chunkB.y;
  };
};

Renderer.prototype.requestChunks = /*#__PURE__*/function () {
  var _requestChunks = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var _this = this;

    var _this$getEnlargedBoun, minCol, maxCol, minRow, maxRow, _this$map2, chunks, chunkSize, wantedChunksPosition, c, r, chunkPosition;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _this$getEnlargedBoun = this.getEnlargedBoundaries(8), minCol = _this$getEnlargedBoun.minCol, maxCol = _this$getEnlargedBoun.maxCol, minRow = _this$getEnlargedBoun.minRow, maxRow = _this$getEnlargedBoun.maxRow;
            _this$map2 = this.map, chunks = _this$map2.chunks, chunkSize = _this$map2.chunkSize;
            wantedChunksPosition = [];

            for (c = minCol - 1; c <= maxCol + 1; c += 1) {
              for (r = minRow - 1; r <= maxRow + 1; r += 1) {
                if (this.getChunk(c, r, {
                  chunks: chunks,
                  chunkSize: chunkSize
                }) === null) {
                  chunkPosition = this.getChunkPosition(c, r, chunkSize);

                  if (wantedChunksPosition.findIndex(this.sameChunk(chunkPosition)) === -1) {
                    wantedChunksPosition.push(chunkPosition);
                  }
                }
              }
            }

            wantedChunksPosition.forEach(function (chunkPosition) {
              return _this.onRequestChunks(chunkPosition).then(function (chunk) {
                chunks[chunk.x][chunk.y] = chunk;
                requestAnimationFrame(_this.renderMap.bind(_this));
              });
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function requestChunks() {
    return _requestChunks.apply(this, arguments);
  }

  return requestChunks;
}();

var _default = Renderer;
exports.default = _default;