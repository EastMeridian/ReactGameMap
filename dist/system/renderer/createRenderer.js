"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Renderer = _interopRequireDefault(require("./Renderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createRenderer = function createRenderer(options) {
  return new _Renderer.default(options);
};

var _default = createRenderer;
exports.default = _default;