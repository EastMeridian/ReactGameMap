function Renderer({
  context,
  assets,
  layers,
  map,
  camera,
  onRequestChunks,
}) {
  this.context = context;
  this.assets = assets;
  this.layers = layers;
  this.map = map;
  this.camera = camera;
  this.selectedTile = null;
  this.onRequestChunks = onRequestChunks;
}

Renderer.prototype.getTileSource = (tile, tilesetWidth, tileSize) => {
  const formatedTile = tile - 1;
  return {
    x: formatedTile % (tilesetWidth * tileSize),
    y: Math.floor(formatedTile / tilesetWidth) * tileSize,
  };
};

Renderer.prototype.getRenderedBoundaries = function getRenderedBoundaries() {
  const {
    tileSize,
  } = this.map;
  const startCol = Math.floor(this.camera.x / tileSize);
  const endCol = startCol + this.camera.width / tileSize;
  const startRow = Math.floor(this.camera.y / tileSize);
  const endRow = startRow + this.camera.height / tileSize;
  const offsetX = -this.camera.x + startCol * tileSize;
  const offsetY = -this.camera.y + startRow * tileSize;
  return {
    startCol,
    endCol,
    startRow,
    endRow,
    offsetX,
    offsetY,
  };
};

Renderer.prototype.getEnlargedBoundaries = function getEnlargedBoundaries(offset = 1) {
  const {
    startCol,
    endCol,
    startRow,
    endRow,
  } = this.getRenderedBoundaries();
  const {
    width,
    height,
  } = this.map;
  const minCol = startCol - offset < 0 ? 0 : startCol - offset;
  const maxCol = endCol + offset > width - offset ? width - offset : endCol + offset;
  const minRow = startRow - offset < 0 ? 0 : startRow - offset;
  const maxRow = endRow + offset > height - offset ? height - offset : endRow + offset;
  return {
    minCol,
    maxCol,
    minRow,
    maxRow,
  };
};

Renderer.prototype.renderTile = function renderTile(tile, boundaries, layer, image, c, r) {
  const {
    startCol,
    startRow,
    offsetX,
    offsetY,
  } = boundaries;
  const {
    index,
    tilesetWidth,
  } = layer;
  const {
    tileSize,
  } = this.map;
  const tileLayer = tile.layers[index];

  if (tileLayer !== 0) {
    // 0 => empty tile
    const x = (c - startCol) * tileSize + offsetX;
    const y = (r - startRow) * tileSize + offsetY;
    const {
      x: sX,
      y: sY,
    } = this.getTileSource(tileLayer, tilesetWidth, tileSize);
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

    if (this.selectedTile && this.selectedTile === tile.id) {
      this.context.fillStyle = '#8ED6FF50';
      this.context.fillRect(Math.round(x) - 4, Math.round(y) - 4, tileSize + 8, tileSize + 8);
    }
  }
};

Renderer.prototype.renderLayer = function renderLayer(layer) {
  const {
    asset,
  } = layer;
  const {
    startCol,
    endCol,
    startRow,
    endRow,
    ...other
  } = this.getRenderedBoundaries();
  const image = this.assets.getAsset(asset);

  for (let c = startCol; c <= endCol; c += 1) {
    for (let r = startRow; r <= endRow; r += 1) {
      const tile = this.getTile(c, r, this.map);

      if (tile) {
        const boundaries = {
          startCol,
          endCol,
          startRow,
          endRow,
          ...other,
        };
        this.renderTile(tile, boundaries, layer, image, c, r);
      }
    }
  }
};

Renderer.prototype.getChunkPosition = (x, y, chunkSize) => ({
  x: Math.floor(x / chunkSize),
  y: Math.floor(y / chunkSize),
});

Renderer.prototype.getTilePosition = (x, y, chunkSize) => ({
  x: x % chunkSize,
  y: y % chunkSize,
});

Renderer.prototype.getChunk = function getChunk(x, y, {
  chunks,
  chunkSize,
}) {
  const {
    x: chunkX,
    y: chunkY,
  } = this.getChunkPosition(x, y, chunkSize);
  if (!chunks[chunkX]) return undefined;
  return chunks[chunkX][chunkY];
};

Renderer.prototype.getTile = function getTile(x, y, {
  chunks,
  chunkSize,
}) {
  const {
    x: tileX,
    y: tileY,
  } = this.getTilePosition(x, y, chunkSize);
  const chunk = this.getChunk(x, y, {
    chunks,
    chunkSize,
  });
  if (!chunk) return null;
  const tile = chunk.tiles[tileX][tileY];
  return tile;
};

Renderer.prototype.renderMap = function renderMap() {
  this.context.clearRect(0, 0, this.camera.width, this.camera.height);
  this.layers.forEach(this.renderLayer.bind(this));
};

Renderer.prototype.findTileByPosition = function findTileByPosition(x, y) {
  const {
    tileSize,
  } = this.map;
  const {
    startCol,
    startRow,
    offsetX,
    offsetY,
  } = this.getRenderedBoundaries();
  const clickX = Math.floor((x - offsetX) / tileSize);
  const clickY = Math.floor((y - offsetY) / tileSize);
  const tileX = startCol + clickX;
  const tileY = startRow + clickY;
  return {
    x: tileX,
    y: tileY,
  };
};

Renderer.prototype.selectTile = function selectTile(x, y) {
  const position = this.findTileByPosition(x, y);
  const tile = this.getTile(position.x, position.y, this.map);
  this.selectedTile = tile.id;
  this.renderMap();
  return tile;
};

Renderer.prototype.resetSelectTile = function selectTile() {
  this.selectedTile = null;
  this.renderMap();
};

Renderer.prototype.sameChunk = (chunkA) => (chunkB) => (
  chunkA.x === chunkB.x && chunkA.y === chunkB.y
);

Renderer.prototype.requestChunks = async function requestChunks() {
  const {
    minCol,
    maxCol,
    minRow,
    maxRow,
  } = this.getEnlargedBoundaries(8);
  const {
    chunks,
    chunkSize,
  } = this.map;
  const wantedChunksPosition = [];

  for (let c = minCol - 1; c <= maxCol + 1; c += 1) {
    for (let r = minRow - 1; r <= maxRow + 1; r += 1) {
      if (this.getChunk(c, r, { chunks, chunkSize }) === null) {
        const chunkPosition = this.getChunkPosition(c, r, chunkSize);
        if (wantedChunksPosition.findIndex(this.sameChunk(chunkPosition)) === -1) {
          wantedChunksPosition.push(chunkPosition);
        }
      }
    }
  }

  wantedChunksPosition.forEach((chunkPosition) => (
    this.onRequestChunks(chunkPosition).then((chunk) => {
      chunks[chunk.x][chunk.y] = chunk;
      requestAnimationFrame(this.renderMap.bind(this));
    })));
};

export default Renderer;
