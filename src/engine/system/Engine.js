import { createRenderer } from './renderer';
import { createCamera } from './camera';
import createMapManager from './createMapManager';
import createChunkLoader from './createChunkLoader';

function Engine({
  width,
  height,
  assets,
  context,
  onRequestChunks,
}) {
  this.map = createMapManager();

  this.camera = createCamera({
    map: this.map,
    width,
    height,
  });

  this.renderer = createRenderer({
    camera: this.camera,
    map: this.map,
    context,
    assets,
  });

  this.chunkLoader = createChunkLoader();

  this.onRequestChunks = onRequestChunks;
}

Engine.prototype.renderMap = function renderMap() {
  this.renderer.update(this.map);
};

Engine.prototype.requestChunks = function requestChunks() {
  const {
    startCol,
    endCol,
    startRow,
    endRow,
  } = this.camera.getEnlargedBoundaries();

  const wantedChunksPosition = [];

  for (let c = startCol - 1; c <= endCol + 1; c += 1) {
    for (let r = startRow - 1; r <= endRow + 1; r += 1) {
      if (this.map.getChunk(c, r) === null) {
        const chunkPosition = this.map.getChunkPosition(c, r);

        if (wantedChunksPosition.findIndex(this.map.sameChunk(chunkPosition)) === -1
          && !this.chunkLoader.isLoading(chunkPosition)) {
          this.chunkLoader.subscribe(chunkPosition);
          wantedChunksPosition.push(chunkPosition);
        }
      }
    }
  }

  wantedChunksPosition.forEach((chunkPosition) => this.onRequestChunks(chunkPosition).then(
    (chunk) => {
      const {
        chunks,
      } = this.map;
      this.chunkLoader.unsubscribe(chunkPosition);
      chunks[chunk.x][chunk.y] = chunk;
      requestAnimationFrame(this.renderMap.bind(this));
    },
  ));
};


Engine.prototype.selectTile = function selectTile(x, y) {
  const tile = this.findTile(x, y);
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
  const {
    startCol,
    startRow,
    offsetX,
    offsetY,
  } = this.camera.getRenderedBoundaries();
  const clickX = Math.floor((x - offsetX) / this.map.tileSize);
  const clickY = Math.floor((y - offsetY) / this.map.tileSize);
  const tileX = startCol + clickX;
  const tileY = startRow + clickY;
  return {
    x: tileX,
    y: tileY,
  };
};

Engine.prototype.findTile = function findTile(x, y) {
  const position = this.findTileByPosition(x, y);
  const tile = this.map.getTile(position.x, position.y, this.map);
  return tile;
};

Engine.prototype.update = function update() {
  this.requestChunks();
  this.renderMap();
};

export default Engine;
