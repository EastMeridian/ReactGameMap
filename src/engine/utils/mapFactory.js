const biomes = {
  0: 0,
  field: 0,
  forest_little: 147,
  forest_large: 148,
  forest_left: 163,
  forest_right: 164,
  lake: 5,
  mountain: 138,
  iron: 37,
  hills: 216,
  village: 119
};

const generateRandomLayer = () => {
  const random = Math.random();
  if (random > 0.96) return 'mountain';
  if (random > 0.94) return 'iron'; // if (random > 0.92) return 'hills';

  if (random > 0.86) return 'forest_little';
  if (random > 0.82) return 'forest_large';
  if (random > 0.78) return 'forest_left';
  if (random > 0.74) return 'forest_right';
  if (random < 0.04) return 'lake';
  return 'field';
};

const generateVillage = type => {
  if (type === 'field') {
    const random = Math.random();

    if (random < 0.005) {
      return 'village';
    }
  }

  return 0;
};

const createTile = (x, y) => {
  const biome = generateRandomLayer();
  const building = generateVillage(biome);
  return {
    id: lodash_uniqueId__WEBPACK_IMPORTED_MODULE_0___default()(),
    x,
    y,
    biome,
    layers: [1, biomes[biome], biomes[building]]
  };
};

const generateRandomMap = size => Array(size).fill(null).map((_, x) => Array(size).fill(null).map((__, y) => createTile(x, y)));

const createChunk = (x, y, chunkSize) => ({
  x,
  y,
  tiles: generateRandomMap(chunkSize)
});

const createChunks = (size, chunkSize = 8, onCreate = () => null) => Array(size / chunkSize).fill(null).map((_, x) => Array(size / chunkSize).fill(null).map((__, y) => onCreate(x, y, chunkSize)));
const generateChunks = (size, chunkSize = 8) => createChunks(size, chunkSize, createChunk);