"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function Camera(map, width, height) {
  this.x = 0;
  this.y = 0;
  this.width = width;
  this.height = height;
  this.maxX = map.width * map.tileSize - width;
  this.maxY = map.height * map.tileSize - height;
  this.tileSize = map.tileSize;
}

Camera.SPEED = 256; // pixels per second

Camera.prototype.move = function move(delta, dirx, diry) {
  // move camera
  this.x += dirx * Camera.SPEED * delta;
  this.y += diry * Camera.SPEED * delta; // clamp values

  this.x = Math.max(0, Math.min(this.x, this.maxX));
  this.y = Math.max(0, Math.min(this.y, this.maxY));
};

Camera.prototype.center = function center(x, y) {
  var cols = this.width / this.tileSize;
  var rows = this.height / this.tileSize;
  var left = Math.ceil(x - cols / 2);
  var top = Math.ceil(y - rows / 2);
  this.x = left * this.tileSize;
  this.y = top * this.tileSize;
};

Camera.prototype.getRenderedBoundaries = function getRenderedBoundaries() {
  var startCol = Math.floor(this.x / this.tileSize);
  var endCol = startCol + this.width / this.tileSize;
  var startRow = Math.floor(this.y / this.tileSize);
  var endRow = startRow + this.height / this.tileSize;
  var offsetX = -this.x + startCol * this.tileSize;
  var offsetY = -this.y + startRow * this.tileSize;
  return {
    startCol: startCol,
    endCol: endCol,
    startRow: startRow,
    endRow: endRow,
    offsetX: offsetX,
    offsetY: offsetY,
    width: this.width,
    height: this.height
  };
};

Camera.prototype.getEnlargedBoundaries = function getEnlargedBoundaries() {
  var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  var _this$getRenderedBoun = this.getRenderedBoundaries(),
      startCol = _this$getRenderedBoun.startCol,
      endCol = _this$getRenderedBoun.endCol,
      startRow = _this$getRenderedBoun.startRow,
      endRow = _this$getRenderedBoun.endRow;

  var minCol = startCol - offset < 0 ? 0 : startCol - offset;
  var maxCol = endCol + offset > this.maxX - offset ? this.maxX - offset : endCol + offset;
  var minRow = startRow - offset < 0 ? 0 : startRow - offset;
  var maxRow = endRow + offset > this.maxY - offset ? this.maxY - offset : endRow + offset;
  return {
    startCol: minCol,
    endCol: maxCol,
    startRow: minRow,
    endRow: maxRow
  };
};

var _default = Camera;
exports.default = _default;