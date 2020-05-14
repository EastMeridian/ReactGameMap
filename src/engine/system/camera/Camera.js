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
  const cols = this.width / this.tileSize;
  const rows = this.height / this.tileSize;
  const left = Math.ceil(x - cols / 2);
  const top = Math.ceil(y - rows / 2);
  this.x = left * this.tileSize;
  this.y = top * this.tileSize;
  this.x = Math.max(0, Math.min(this.x, this.maxX));
  this.y = Math.max(0, Math.min(this.y, this.maxY));
};

Camera.prototype.getRenderedBoundaries = function getRenderedBoundaries() {
  const startCol = Math.floor(this.x / this.tileSize);
  const endCol = startCol + this.width / this.tileSize;
  const startRow = Math.floor(this.y / this.tileSize);
  const endRow = startRow + this.height / this.tileSize;
  const offsetX = -this.x + startCol * this.tileSize;
  const offsetY = -this.y + startRow * this.tileSize;
  return {
    startCol,
    endCol,
    startRow,
    endRow,
    offsetX,
    offsetY,
    width: this.width,
    height: this.height,
  };
};

Camera.prototype.getEnlargedBoundaries = function getEnlargedBoundaries(offset = 1) {
  const {
    startCol,
    endCol,
    startRow,
    endRow,
  } = this.getRenderedBoundaries();
  const minCol = startCol - offset < 0 ? 0 : startCol - offset;
  const maxCol = endCol + offset > this.maxX - offset ? this.maxX - offset : endCol + offset;
  const minRow = startRow - offset < 0 ? 0 : startRow - offset;
  const maxRow = endRow + offset > this.maxY - offset ? this.maxY - offset : endRow + offset;
  return {
    startCol: minCol,
    endCol: maxCol,
    startRow: minRow,
    endRow: maxRow,
  };
};

export default Camera;
