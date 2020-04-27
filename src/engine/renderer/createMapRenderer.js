import { createChunks } from '../utils/mapFactory';
import Renderer from './Renderer';
import createCamera from '../createCamera';

const WORLD_SIZE = 256;
const CHUNK_SIZE = 8;

const createMapRenderer = ({
  context,
  assets,
  map = {
    tileSize: 48,
    width: WORLD_SIZE,
    height: WORLD_SIZE,
    chunks: createChunks(WORLD_SIZE),
    chunkSize: CHUNK_SIZE,
  },
  layers = [{
    index: 0,
    asset: 'tileset1',
    tilesetWidth: 8,
  }, {
    index: 1,
    asset: 'tileset2',
    tilesetWidth: 16,
  }, {
    index: 2,
    asset: 'tileset2',
    tilesetWidth: 16,
  }],
  onRequestChunks,
  size,
} = {}) => new Renderer({
  context,
  assets,
  map,
  layers,
  camera: createCamera({
    map,
    width: size,
    height: size,
  }),
  onRequestChunks,
});

export default createMapRenderer;
