"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _createAssetsLoader = _interopRequireDefault(require("../createAssetsLoader"));

var _renderer = _interopRequireDefault(require("../renderer"));

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

function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

var initializeContext = function initializeContext(current, scale) {
  var canvas = current; // Get the device pixel ratio, falling back to 1.

  /*   const dpr = window.devicePixelRatio || 1;
  // Get the size of the canvas in CSS pixels.
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const heightRatio = 1;
  canvas.height = canvas.width * heightRatio; */

  var context = canvas.getContext('2d'); // context.scale(dpr, dpr);

  return context;
};

var assetsLoader = (0, _createAssetsLoader.default)();

var loadAllAssetsAsync = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(assets) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", Promise.all(assets.map(function (asset) {
              return assetsLoader.loadImageAsync(asset.key, asset.src);
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

var mapRenderer = null;
var mouseController = null;

var GameMap = function GameMap(_ref2) {
  var _ref2$scale = _ref2.scale,
      scale = _ref2$scale === void 0 ? 1 : _ref2$scale,
      assets = _ref2.assets,
      _ref2$onDataDisplay = _ref2.onDataDisplay,
      onDataDisplay = _ref2$onDataDisplay === void 0 ? function () {} : _ref2$onDataDisplay,
      _ref2$onInitialize = _ref2.onInitialize,
      onInitialize = _ref2$onInitialize === void 0 ? function () {} : _ref2$onInitialize,
      _ref2$size = _ref2.size,
      size = _ref2$size === void 0 ? 720 : _ref2$size,
      onRequestChunks = _ref2.onRequestChunks,
      _ref2$onOver = _ref2.onOver,
      onOver = _ref2$onOver === void 0 ? function () {} : _ref2$onOver;
  var canvasRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var current = canvasRef.current;
    var context = initializeContext(current, scale);
    loadAllAssetsAsync(assets).then(function () {
      mapRenderer = (0, _renderer.default)({
        assets: assetsLoader,
        context: context,
        size: size,
        onRequestChunks: onRequestChunks
      });
      mouseController = (0, _createMouseController.default)({
        onDrag: function onDrag(e) {
          mapRenderer.camera.move(0.005, -e.movementX, -e.movementY);
          mapRenderer.requestChunks();
          mapRenderer.renderMap();
        },
        onMouseUp: function onMouseUp() {
          var isDragging = mouseController.getIsDragging();

          if (!isDragging) {
            mapRenderer.resetSelectTile();
          }
        },
        onMouseStop: function onMouseStop(e) {
          var mousePosition = getMousePosition(canvasRef.current, e);
          var tile = mapRenderer.findTile(mousePosition.x, mousePosition.y);
          onOver(tile);
        }
      });
      mouseController.initialize();
      onInitialize(mapRenderer);
    });
  }, [assets, onInitialize, onRequestChunks, scale, size]);
  return /*#__PURE__*/_react.default.createElement("canvas", {
    width: size,
    height: size,
    ref: canvasRef,
    id: "canvas-id",
    style: canvasStyle,
    onMouseDown: function onMouseDown() {
      mouseController.setIsClicked(true);
    },
    onClick: function onClick(e) {
      var hasDragged = mouseController.getHasDragged();

      if (!hasDragged) {
        var mousePosition = getMousePosition(canvasRef.current, e);
        var tile = mapRenderer.selectTile(mousePosition.x, mousePosition.y);
        onDataDisplay(tile);
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

var _default = GameMap;
exports.default = _default;