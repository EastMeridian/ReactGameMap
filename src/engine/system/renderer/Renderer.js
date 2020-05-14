const assetMap = {
  0: 'floor',
  1: 'items',
};

function Renderer({
  context,
  assets,
  map,
  camera,
  shouldDrawGrid = true,
  shouldDrawResources = true,
}) {
  this.context = context;
  this.assets = assets;
  this.map = map;
  this.camera = camera;
  this.selectedTile = null;
  this.shouldDrawGrid = shouldDrawGrid;
  this.shouldDrawResources = shouldDrawResources;
  this.boundaries = camera.getRenderedBoundaries();
}

Renderer.prototype.getTileSource = (tile, tilesetWidth, tileSize) => {
  const formatedTile = tile - 1;
  return {
    x: (formatedTile % tilesetWidth) * tileSize,
    y: Math.floor(formatedTile / tilesetWidth) * tileSize,
  };
};

Renderer.prototype.drawTile = function drawTile(tile, boundaries, c, r) {
  const {
    startCol,
    startRow,
    offsetX,
    offsetY,
  } = boundaries;
  const { tileSize } = this.map;
  tile.layers.forEach((layer, index) => {
    const { image, tilesetWidth } = this.assets[assetMap[index]];
    const x = (c - startCol) * tileSize + offsetX;
    const y = (r - startRow) * tileSize + offsetY;

    const {
      x: sX,
      y: sY,
    } = this.getTileSource(layer, tilesetWidth, tileSize);

    this.context.drawImage(
      image, // image
      sX, // source x
      sY, // source y
      tileSize, // source width
      tileSize, // source height
      Math.round(x), // target x
      Math.round(y), // target y
      tileSize, // target width
      tileSize, // target height
    );

    if (this.shouldDrawResources) this.drawResourceIcons(x, y, tile);

    if (this.selectedTile && this.selectedTile === tile.id) {
      this.context.fillStyle = '#8ED6FF45';
      this.context.fillRect(Math.round(x), Math.round(y), tileSize, tileSize);
    }
  });
};

Renderer.prototype.drawGrid = function drawGrid() {
  const {
    startCol,
    endCol,
    startRow,
    endRow,
  } = this.boundaries;
  const {
    width,
    height,
    tileSize,
  } = this.camera;

  let x;
  let y;

  this.context.strokeStyle = '#f8f8f850';
  for (let r = startRow; r < endRow; r += 1) {
    x = -this.camera.x;
    y = r * tileSize - this.camera.y;
    this.context.beginPath();
    this.context.moveTo(x, y);
    this.context.lineTo(width, y);
    this.context.stroke();
  }
  for (let c = startCol; c < endCol; c += 1) {
    x = c * tileSize - this.camera.x;
    y = -this.camera.y;
    this.context.beginPath();
    this.context.moveTo(x, y);
    this.context.lineTo(x, height);
    this.context.stroke();
  }
};

Renderer.prototype.drawMap = function drawMap() {
  const {
    startCol,
    endCol,
    startRow,
    endRow,
  } = this.boundaries;

  for (let c = startCol; c <= endCol; c += 1) {
    for (let r = startRow; r <= endRow; r += 1) {
      const tile = this.map.getTile(c, r);
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
  const { image } = this.assets.icons;

  if (tile && tile.resources.length > 0) {
    const [resource] = tile.resources;
    const {
      x: sX,
      y: sY,
    } = this.getTileSource(resource.icon || 1100, 39, 96);
    this.context.save();
    this.context.globalAlpha = 0.7;

    this.context.beginPath();
    this.context.arc(x + 12, y + 12, 10, 0, 2 * Math.PI);
    this.context.strokeStyle = '#BEBEBE';
    this.context.lineWidth = 6;
    this.context.stroke();
    this.context.closePath();

    this.context.clip();
    this.context.drawImage(
      image, // image
      sX, // source x
      sY, // source y
      96, // source width
      96, // source height
      Math.round(x + 1), // target x
      Math.round(y + 1), // target y
      24, // target width
      24, // target height
    );
    this.context.restore();


    // console.log('I DRAW RESOURCES', c, r);
  }
};

export default Renderer;
