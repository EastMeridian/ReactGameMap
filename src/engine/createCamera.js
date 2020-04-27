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
};

const createCamera = ({
  map,
  width,
  height,
}) => new Camera(map, width, height);

export default createCamera;
