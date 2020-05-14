"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _createAssetsLoader = _interopRequireDefault(require("../createAssetsLoader"));

var _system = require("../system");

var _createMouseController = _interopRequireDefault(require("../createMouseController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var canvasStyle = {
  backgroundColor: '#120136',
  userSelect: 'none',
  WebKitUserSelect: 'none',
  MozUserSelect: 'none'
};
var assetsLoader = (0, _createAssetsLoader.default)();

var loadAllAssetsAsync = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(assets) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", Promise.all(assets.map(function (asset) {
              return assetsLoader.loadImageAsync(asset);
            })));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function loadAllAssetsAsync(_x) {
    return _ref.apply(this, arguments);
  };
}();

var engine = null;
var mouseController = null;

var initialize = function initialize(_ref2) {
  var width = _ref2.width,
      height = _ref2.height,
      onRequestChunks = _ref2.onRequestChunks,
      onOver = _ref2.onOver,
      canvas = _ref2.canvas;
  var context = canvas.getContext('2d');
  console.log('CONTEXT');
  engine = (0, _system.createEngine)({
    assets: assetsLoader.getAssets(),
    context: context,
    width: width,
    height: height,
    onRequestChunks: onRequestChunks
  });
  mouseController = (0, _createMouseController.default)({
    canvas: canvas,
    onDrag: function onDrag(e) {
      engine.camera.move(0.0048, -e.movementX, -e.movementY);
      engine.update();
    },
    onMouseUp: function onMouseUp() {
      var isDragging = mouseController.getIsDragging();

      if (!isDragging) {
        engine.resetSelectTile();
      }
    },
    onMouseStop: function onMouseStop(mousePosition) {
      var tile = engine.findTile(mousePosition.x, mousePosition.y);
      onOver({
        tile: tile,
        mousePosition: mousePosition
      });
    }
  });
  mouseController.initialize();
};

var GameMap = function GameMap(_ref3) {
  var _ref3$scale = _ref3.scale,
      scale = _ref3$scale === void 0 ? 1 : _ref3$scale,
      assets = _ref3.assets,
      _ref3$onClick = _ref3.onClick,
      _onClick = _ref3$onClick === void 0 ? function () {} : _ref3$onClick,
      _ref3$onInitialize = _ref3.onInitialize,
      onInitialize = _ref3$onInitialize === void 0 ? function () {} : _ref3$onInitialize,
      width = _ref3.width,
      height = _ref3.height,
      onRequestChunks = _ref3.onRequestChunks,
      _ref3$onOver = _ref3.onOver,
      onOver = _ref3$onOver === void 0 ? function () {} : _ref3$onOver;

  var canvasRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var canvas = canvasRef.current;
    loadAllAssetsAsync(assets).then(function () {
      initialize({
        width: width,
        height: height,
        onRequestChunks: onRequestChunks,
        onOver: onOver,
        canvas: canvas
      });
      onInitialize(engine);
      console.log(engine);
    });
  }, []);
  return /*#__PURE__*/_react.default.createElement("canvas", {
    width: width,
    height: height,
    ref: canvasRef,
    id: "canvas-id",
    style: canvasStyle,
    onMouseDown: function onMouseDown() {
      mouseController.setIsClicked(true);
    },
    onClick: function onClick(e) {
      var hasDragged = mouseController.getHasDragged();

      if (!hasDragged) {
        var mousePosition = mouseController.getMousePosition(e);
        var tile = engine.selectTile(mousePosition.x, mousePosition.y);

        _onClick(tile);
      }
    },
    onMouseMove: function onMouseMove(e) {
      if (mouseController) {
        e.persist();
        mouseController.onMouseMove(e);
      }
    }
  });
};

GameMap.propTypes = {
  scale: _propTypes.default.number,
  width: _propTypes.default.number,
  height: _propTypes.default.number,
  assets: _propTypes.default.arrayOf(_propTypes.default.shape({})),
  onClick: _propTypes.default.func,
  onInitialize: _propTypes.default.func,
  onRequestChunks: _propTypes.default.func,
  onOver: _propTypes.default.func
};
GameMap.defaultProps = {
  scale: 1,
  width: 720,
  height: 720,
  assets: [],
  onClick: function onClick() {},
  onInitialize: function onInitialize() {},
  onRequestChunks: function onRequestChunks() {},
  onOver: function onOver() {}
};

var _default = (0, _react.memo)(GameMap, function () {
  return false;
});

exports.default = _default;