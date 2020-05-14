"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mapFactory = require("../utils/mapFactory");

var _Renderer = _interopRequireDefault(require("../system/Renderer"));

var _createCamera = _interopRequireDefault(require("../system/camera/createCamera"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WORLD_SIZE = 256;
var CHUNK_SIZE = 8;

var createMapRenderer = function createMapRenderer() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      context = _ref.context,
      assets = _ref.assets,
      _ref$map = _ref.map,
      map = _ref$map === void 0 ? {
    tileSize: 48,
    width: WORLD_SIZE,
    height: WORLD_SIZE,
    chunks: (0, _mapFactory.createChunks)(WORLD_SIZE),
    chunkSize: CHUNK_SIZE
  } : _ref$map,
      _ref$layers = _ref.layers,
      layers = _ref$layers === void 0 ? [{
    index: 0,
    asset: 'tileset1',
    tilesetWidth: 8
  }, {
    index: 1,
    asset: 'tileset2',
    tilesetWidth: 16
  }, {
    index: 2,
    asset: 'tileset2',
    tilesetWidth: 16
  }] : _ref$layers,
      onRequestChunks = _ref.onRequestChunks,
      size = _ref.size;

  return new _Renderer.default({
    size: size,
    context: context,
    assets: assets,
    map: map,
    layers: layers,
    camera: (0, _createCamera.default)({
      map: map,
      width: size,
      height: size
    }),
    onRequestChunks: onRequestChunks
  });
};

var _default = createMapRenderer;
exports.default = _default;