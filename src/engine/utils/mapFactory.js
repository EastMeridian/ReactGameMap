import uniqueID from 'lodash/uniqueId';
import compose from 'lodash/fp/compose';

const biomes = {
  field: 0,
  forest_little: 147,
  forest_large: 148,
  forest_left: 163,
  forest_right: 164,
  lake: 5,
  mountain: 138,
  iron: 37,
  hills: 216,
  village: 119,
};

const resourcesMap = {
  field: [
    { rate: 0.05, type: 'corn', icon: 1118 },
  ],
  forest: [
    { rate: 0.06, type: 'wood', icon: 1238 },
    { rate: 0.005, type: 'meat', icon: 1129 },
  ],
  lake: [
    { rate: 0.05, type: 'fish', icon: 1090 },
  ],
  mountain: [
    { rate: 0.05, type: 'gold', icon: 1150 },
  ],
  iron: [
    { rate: 0.05, type: 'iron', icon: 1153 },
  ],
};

const generateTileResoures = (biome) => (resourcesMap[biome]
  ? resourcesMap[biome].filter((resource) => resource.rate > Math.random())
  : []);

const generateRandomBiome = () => {
  const random = Math.random();
  if (random > 0.96) return 'mountain';
  if (random > 0.94) return 'iron';
  if (random > 0.74) return 'forest';
  if (random < 0.04) return 'lake';
  return 'field';
};

const generateRandomLayer = (type) => {
  const random = Math.random();
  if (type === 'field') return [];
  if (type === 'forest') {
    if (random > 0.75) return [biomes.forest_little];
    if (random > 0.50) return [biomes.forest_large];
    if (random > 0.25) return [biomes.forest_left];
    return [biomes.forest_right];
  }

  return [biomes[type]];
};

const withGround = (layers) => [1, ...layers];

const withVillage = (layers) => {
  const random = Math.random();
  if (layers.length === 1 && random < 0.01) {
    return [...layers, biomes.village];
  }
  return layers;
};

const createTile = (x, y) => {
  const biome = generateRandomBiome();
  const layers = compose(
    withVillage,
    withGround,
    generateRandomLayer,
  )(biome);

  const resources = generateTileResoures(biome);
  // console.log('layers', layers);
  return {
    id: uniqueID(),
    x,
    y,
    biome,
    layers,
    resources,
  };
};

const generateRandomMap = (size) => Array(size).fill(null).map(
  (_, x) => Array(size).fill(null).map((__, y) => createTile(x, y)),
);

const createChunk = (x, y, chunkSize, tiles = null) => ({
  x,
  y,
  tiles,
  chunkSize,
});

const createRandomChunk = (x, y, chunkSize) => (
  createChunk(x, y, chunkSize, generateRandomMap(chunkSize))
);

const createChunks = (size, chunkSize = 8, onCreate = () => null) => (
  Array(size / chunkSize)
    .fill(null)
    .map((_, x) => Array(size / chunkSize)
      .fill(null)
      .map((__, y) => onCreate(x, y, chunkSize)))
);

const generateChunks = (size, chunkSize = 8) => createChunks(size, chunkSize, createRandomChunk);

export {
  generateChunks,
  createChunks,
};
