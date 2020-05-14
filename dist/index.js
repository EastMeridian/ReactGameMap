"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "View", {
  enumerable: true,
  get: function get() {
    return _View.default;
  }
});
Object.defineProperty(exports, "Map", {
  enumerable: true,
  get: function get() {
    return _Map.default;
  }
});
Object.defineProperty(exports, "createTestLoader", {
  enumerable: true,
  get: function get() {
    return _createTestMapLoader.default;
  }
});
Object.defineProperty(exports, "createChunks", {
  enumerable: true,
  get: function get() {
    return _mapFactory.createChunks;
  }
});
Object.defineProperty(exports, "generateChunks", {
  enumerable: true,
  get: function get() {
    return _mapFactory.generateChunks;
  }
});
exports.assets = void 0;

var _View = _interopRequireDefault(require("./components/View"));

var _Map = _interopRequireDefault(require("./components/Map"));

var _createTestMapLoader = _interopRequireDefault(require("./utils/createTestMapLoader"));

var _mapFactory = require("./utils/mapFactory");

var _Beautiful_World_A5b = _interopRequireDefault(require("./assets/Beautiful_World_A5b.png"));

var _Beautiful_World = _interopRequireDefault(require("./assets/Beautiful_World4.png"));

var _botw = _interopRequireDefault(require("./assets/botw.jpg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assets = [{
  key: 'floor',
  src: _Beautiful_World_A5b.default,
  tilesetWidth: 8
}, {
  key: 'items',
  src: _Beautiful_World.default,
  tilesetWidth: 16
}, {
  key: 'icons',
  src: _botw.default,
  tilesetWidth: 96
}];
exports.assets = assets;