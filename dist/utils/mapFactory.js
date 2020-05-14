"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createChunks = exports.generateChunks = void 0;

var _uniqueId = _interopRequireDefault(require("lodash/uniqueId"));

var _compose = _interopRequireDefault(require("lodash/fp/compose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var biomes = {
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
var resourcesMap = {
  field: [{
    rate: 0.05,
    type: 'corn',
    icon: 1118
  }],
  forest: [{
    rate: 0.05,
    type: 'wood',
    icon: 1238
  }, {
    rate: 0.005,
    type: 'meat',
    icon: 1129
  }],
  lake: [{
    rate: 0.05,
    type: 'fish',
    icon: 1090
  }],
  mountain: [{
    rate: 0.05,
    type: 'gold',
    icon: 1150
  }],
  iron: [{
    rate: 0.05,
    type: 'iron',
    icon: 1153
  }]
};

var generateTileResoures = function generateTileResoures(biome) {
  return resourcesMap[biome] ? resourcesMap[biome].filter(function (resource) {
    return resource.rate > Math.random();
  }) : [];
};

var generateRandomBiome = function generateRandomBiome() {
  var random = Math.random();
  if (random > 0.96) return 'mountain';
  if (random > 0.94) return 'iron';
  if (random > 0.74) return 'forest';
  if (random < 0.04) return 'lake';
  return 'field';
};

var generateRandomLayer = function generateRandomLayer(type) {
  var random = Math.random();

  if (type === 'forest') {
    if (random > 0.75) return [biomes.forest_little];
    if (random > 0.50) return [biomes.forest_large];
    if (random > 0.25) return [biomes.forest_left];
    return [biomes.forest_right];
  }

  return [biomes[type]];
};

var withGround = function withGround(layers) {
  return [1].concat(_toConsumableArray(layers));
};

var createTile = function createTile(x, y) {
  var biome = generateRandomBiome();
  var layers = withGround(generateRandomLayer(biome));
  var resources = generateTileResoures(biome);
  return {
    id: (0, _uniqueId.default)(),
    x: x,
    y: y,
    biome: biome,
    layers: layers,
    resources: resources
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
  var tiles = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  return {
    x: x,
    y: y,
    tiles: tiles,
    chunkSize: chunkSize
  };
};

var createRandomChunk = function createRandomChunk(x, y, chunkSize) {
  return createChunk(x, y, chunkSize, generateRandomMap(chunkSize));
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
  return createChunks(size, chunkSize, createRandomChunk);
};

exports.generateChunks = generateChunks;