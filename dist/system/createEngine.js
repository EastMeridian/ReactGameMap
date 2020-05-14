"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Engine = _interopRequireDefault(require("./Engine"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createEngine = function createEngine(options) {
  return new _Engine.default(options);
};

var _default = createEngine;
exports.default = _default;