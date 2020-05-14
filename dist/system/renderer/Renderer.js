"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var assetMap = {
  0: 'floor',
  1: 'items'
};

function Renderer(_ref) {
  var context = _ref.context,
      assets = _ref.assets,
      map = _ref.map,
      camera = _ref.camera,
      _ref$shouldDrawGrid = _ref.shouldDrawGrid,
      shouldDrawGrid = _ref$shouldDrawGrid === void 0 ? true : _ref$shouldDrawGrid,
      _ref$shouldDrawResour = _ref.shouldDrawResources,
      shouldDrawResources = _ref$shouldDrawResour === void 0 ? true : _ref$shouldDrawResour;
  this.context = context;
  this.assets = assets;
  this.map = map;
  this.camera = camera;
  this.selectedTile = null;
  this.shouldDrawGrid = shouldDrawGrid;
  this.shouldDrawResources = shouldDrawResources;
  this.boundaries = camera.getRenderedBoundaries();
}

Renderer.prototype.getTileSource = function (tile, tilesetWidth, tileSize) {
  var formatedTile = tile - 1;
  return {
    x: formatedTile % tilesetWidth * tileSize,
    y: Math.floor(formatedTile / tilesetWidth) * tileSize
  };
};

Renderer.prototype.drawTile = function drawTile(tile, boundaries, c, r) {
  var _this = this;

  var startCol = boundaries.startCol,
      startRow = boundaries.startRow,
      offsetX = boundaries.offsetX,
      offsetY = boundaries.offsetY;
  var tileSize = this.map.tileSize;
  tile.layers.forEach(function (layer, index) {
    var _this$assets$assetMap = _this.assets[assetMap[index]],
        image = _this$assets$assetMap.image,
        tilesetWidth = _this$assets$assetMap.tilesetWidth;
    var x = (c - startCol) * tileSize + offsetX;
    var y = (r - startRow) * tileSize + offsetY;

    var _this$getTileSource = _this.getTileSource(layer, tilesetWidth, tileSize),
        sX = _this$getTileSource.x,
        sY = _this$getTileSource.y;

    _this.context.drawImage(image, // image
    sX, // source x
    sY, // source y
    tileSize, // source width
    tileSize, // source height
    Math.round(x), // target x
    Math.round(y), // target y
    tileSize, // target width
    tileSize // target height
    );

    if (_this.shouldDrawResources) _this.drawResourceIcons(x, y, tile);

    if (_this.selectedTile && _this.selectedTile === tile.id) {
      _this.context.fillStyle = '#8ED6FF45';

      _this.context.fillRect(Math.round(x), Math.round(y), tileSize, tileSize);
    }
  });
};

Renderer.prototype.drawGrid = function drawGrid() {
  var _this$boundaries = this.boundaries,
      startCol = _this$boundaries.startCol,
      endCol = _this$boundaries.endCol,
      startRow = _this$boundaries.startRow,
      endRow = _this$boundaries.endRow;
  var _this$camera = this.camera,
      width = _this$camera.width,
      height = _this$camera.height,
      tileSize = _this$camera.tileSize;
  var x;
  var y;
  this.context.strokeStyle = '#f8f8f850';

  for (var r = startRow; r < endRow; r += 1) {
    x = -this.camera.x;
    y = r * tileSize - this.camera.y;
    this.context.beginPath();
    this.context.moveTo(x, y);
    this.context.lineTo(width, y);
    this.context.stroke();
  }

  for (var c = startCol; c < endCol; c += 1) {
    x = c * tileSize - this.camera.x;
    y = -this.camera.y;
    this.context.beginPath();
    this.context.moveTo(x, y);
    this.context.lineTo(x, height);
    this.context.stroke();
  }
};

Renderer.prototype.drawMap = function drawMap() {
  var _this$boundaries2 = this.boundaries,
      startCol = _this$boundaries2.startCol,
      endCol = _this$boundaries2.endCol,
      startRow = _this$boundaries2.startRow,
      endRow = _this$boundaries2.endRow;

  for (var c = startCol; c <= endCol; c += 1) {
    for (var r = startRow; r <= endRow; r += 1) {
      var tile = this.map.getTile(c, r);
      if (tile) this.drawTile(tile, this.boundaries, c, r);
    }
  }
};

Renderer.prototype.update = function update() {
  this.boundaries = this.camera.getRenderedBoundaries();
  this.context.clearRect(0, 0, this.camera.width, this.camera.height);
  this.drawMap();
  if (this.shouldDrawGrid) this.drawGrid();
};

Renderer.prototype.selectTile = function selectTile(id) {
  this.selectedTile = id;
  this.drawMap();
};

Renderer.prototype.resetSelectTile = function selectTile() {
  this.selectedTile = null;
  this.drawMap();
};

Renderer.prototype.drawResourceIcons = function drawResourceIcons(x, y, tile) {
  var image = this.assets.icons.image;

  if (tile && tile.resources.length > 0) {
    var _tile$resources = _slicedToArray(tile.resources, 1),
        resource = _tile$resources[0];

    var _this$getTileSource2 = this.getTileSource(resource.icon || 1100, 39, 96),
        sX = _this$getTileSource2.x,
        sY = _this$getTileSource2.y;

    this.context.save();
    this.context.globalAlpha = 0.7;
    this.context.beginPath();
    this.context.arc(x + 18, y + 18, 14, 0, 2 * Math.PI);
    this.context.strokeStyle = '#BEBEBE';
    this.context.lineWidth = 6;
    this.context.stroke();
    this.context.closePath();
    this.context.clip();
    this.context.drawImage(image, // image
    sX, // source x
    sY, // source y
    96, // source width
    96, // source height
    Math.round(x + 4), // target x
    Math.round(y + 4), // target y
    28, // target width
    28 // target height
    );
    this.context.restore(); // console.log('I DRAW RESOURCES', c, r);
  }
};

var _default = Renderer;
exports.default = _default;