import { createChunks } from '../utils/mapFactory';

const WORLD_SIZE = 256;
const CHUNK_SIZE = 8;

const createMapManager = ({
  tileSize = 48,
  chunkSize = CHUNK_SIZE,
  width = WORLD_SIZE,
  height = WORLD_SIZE,
} = {}) => ({
  tileSize,
  width,
  height,
  chunks: createChunks(WORLD_SIZE),
  chunkSize,

  getChunkPosition: (x, y) => ({
    x: Math.floor(x / chunkSize),
    y: Math.floor(y / chunkSize),
  }),

  getTilePosition: (x, y) => ({
    x: x % chunkSize,
    y: y % chunkSize,
  }),

  getChunk(x, y) {
    const {
      x: chunkX,
      y: chunkY,
    } = this.getChunkPosition(x, y);
    if (!this.chunks[chunkX]) return undefined;
    return this.chunks[chunkX][chunkY];
  },

  getTile(x, y) {
    const {
      x: tileX,
      y: tileY,
    } = this.getTilePosition(x, y);
    const chunk = this.getChunk(x, y);
    if (!chunk) return null;
    const tile = chunk.tiles[tileX][tileY];
    return tile;
  },

  sameChunk: (chunkA) => (chunkB) => (
    chunkA.x === chunkB.x && chunkA.y === chunkB.y
  ),
});

export default createMapManager;
