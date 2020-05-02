"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createChunks = exports.generateChunks = void 0;

var _uniqueId = _interopRequireDefault(require("lodash/uniqueId"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var biomes = {
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

var generateRandomLayer = function generateRandomLayer() {
  var random = Math.random();
  if (random > 0.96) return 'mountain';
  if (random > 0.94) return 'iron'; // if (random > 0.92) return 'hills';

  if (random > 0.86) return 'forest_little';
  if (random > 0.82) return 'forest_large';
  if (random > 0.78) return 'forest_left';
  if (random > 0.74) return 'forest_right';
  if (random < 0.04) return 'lake';
  return 'field';
};

var generateVillage = function generateVillage(type) {
  if (type === 'field') {
    var random = Math.random();

    if (random < 0.005) {
      return 'village';
    }
  }

  return 0;
};

var createTile = function createTile(x, y) {
  var biome = generateRandomLayer();
  var building = generateVillage(biome);
  return {
    id: (0, _uniqueId.default)(),
    x: x,
    y: y,
    biome: biome,
    layers: [1, biomes[biome], biomes[building]]
  };
};

var generateRandomMap = function generateRandomMap(size) {
  return Array(size).fill(null).map(function (_, x) {
    return Array(size).fill(null).map(function (__, y) {
      return createTile(x, y);
    });
  });
};

var createChunk = function createChunk(x, y, chunkSize) {
  return {
    x: x,
    y: y,
    tiles: generateRandomMap(chunkSize)
  };
};

var createChunks = function createChunks(size) {
  var chunkSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
  var onCreate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
    return null;
  };
  return Array(size / chunkSize).fill(null).map(function (_, x) {
    return Array(size / chunkSize).fill(null).map(function (__, y) {
      return onCreate(x, y, chunkSize);
    });
  });
};

exports.createChunks = createChunks;

var generateChunks = function generateChunks(size) {
  var chunkSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
  return createChunks(size, chunkSize, createChunk);
};

exports.generateChunks = generateChunks;