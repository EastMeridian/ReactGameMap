"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Camera = _interopRequireDefault(require("./Camera"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createCamera = function createCamera(_ref) {
  var map = _ref.map,
      width = _ref.width,
      height = _ref.height;
  return new _Camera.default(map, width, height);
};

var _default = createCamera;
exports.default = _default;