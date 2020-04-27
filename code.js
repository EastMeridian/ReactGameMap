(this["webpackJsonpreact-game-map"] = this["webpackJsonpreact-game-map"] || []).push([["main"],{

  /***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/index.css":
  /*!**************************************************************************************************************************!*\
    !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!./node_modules/postcss-loader/src??postcss!./src/index.css ***!
    \**************************************************************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  // Imports
  var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
  exports = ___CSS_LOADER_API_IMPORT___(false);
  // Module
  exports.push([module.i, "body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\ncode {\n  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\n    monospace;\n}\n", ""]);
  // Exports
  module.exports = exports;
  
  
  /***/ }),
  
  /***/ "./src/App.js":
  /*!********************!*\
    !*** ./src/App.js ***!
    \********************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib */ "./src/lib/index.js");
  /* harmony import */ var _lib_utils_mapFactories__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/utils/mapFactories */ "./src/lib/utils/mapFactories.js");
  /* harmony import */ var _lib_utils_createTestMapLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/utils/createTestMapLoader */ "./src/lib/utils/createTestMapLoader.js");
  var _jsxFileName = "C:\\Users\\Guilh\\Desktop\\react-game-map\\src\\App.js";
  
  
  
  
  const containerStyle = {
    height: '100vh',
    width: '100vw',
    alignItems: 'center',
    justifyContent: 'center'
  };
  const layoutStyle = {
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    width: '720px',
    height: '720px'
  };
  const dataContainerStyle = {
    position: 'absolute',
    left: 16,
    top: 16,
    height: '16em',
    width: '16em',
    border: 'dotted 1px grey'
  };
  const chunks = Object(_lib_utils_mapFactories__WEBPACK_IMPORTED_MODULE_2__["generateChunks"])(256);
  const testMapLoader = Object(_lib_utils_createTestMapLoader__WEBPACK_IMPORTED_MODULE_3__["default"])({
    chunks
  });
  
  function App() {
    const [data, setData] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_lib__WEBPACK_IMPORTED_MODULE_1__["View"], {
      style: containerStyle,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41,
        columnNumber: 5
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_lib__WEBPACK_IMPORTED_MODULE_1__["View"], {
      style: dataContainerStyle,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42,
        columnNumber: 7
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("pre", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 43,
        columnNumber: 9
      }
    }, JSON.stringify(data, null, 2))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: layoutStyle,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 47,
        columnNumber: 7
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_lib__WEBPACK_IMPORTED_MODULE_1__["GameMap"], {
      assets: _lib__WEBPACK_IMPORTED_MODULE_1__["assets"],
      onInitialize: renderer => {
        renderer.camera.center(50, 50);
        renderer.renderMap();
        renderer.requestChunks();
      },
      onDataDisplay: setData,
      onRequestChunks: testMapLoader.getChunk,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 48,
        columnNumber: 9
      }
    })));
  }
  
  /* harmony default export */ __webpack_exports__["default"] = (App);
  
  /***/ }),
  
  /***/ "./src/index.css":
  /*!***********************!*\
    !*** ./src/index.css ***!
    \***********************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  
  var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./index.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/index.css");
  
  if(typeof content === 'string') content = [[module.i, content, '']];
  
  var transform;
  var insertInto;
  
  
  
  var options = {"hmr":true}
  
  options.transform = transform
  options.insertInto = undefined;
  
  var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
  
  if(content.locals) module.exports = content.locals;
  
  if(true) {
    module.hot.accept(/*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./index.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/index.css", function() {
      var newContent = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./index.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/index.css");
  
      if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
  
      var locals = (function(a, b) {
        var key, idx = 0;
  
        for(key in a) {
          if(!b || a[key] !== b[key]) return false;
          idx++;
        }
  
        for(key in b) idx--;
  
        return idx === 0;
      }(content.locals, newContent.locals));
  
      if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');
  
      update(newContent);
    });
  
    module.hot.dispose(function() { update(); });
  }
  
  /***/ }),
  
  /***/ "./src/index.js":
  /*!**********************!*\
    !*** ./src/index.js ***!
    \**********************/
  /*! no exports provided */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
  /* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
  /* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.css */ "./src/index.css");
  /* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_2__);
  /* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./App */ "./src/App.js");
  /* harmony import */ var _serviceWorker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./serviceWorker */ "./src/serviceWorker.js");
  var _jsxFileName = "C:\\Users\\Guilh\\Desktop\\react-game-map\\src\\index.js";
  
  
  
  
  
  react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.StrictMode, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 3
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 5
    }
  })), document.getElementById('root')); // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  
  _serviceWorker__WEBPACK_IMPORTED_MODULE_4__["unregister"]();
  
  /***/ }),
  
  /***/ "./src/lib/assets/Beautiful_World4.png":
  /*!*********************************************!*\
    !*** ./src/lib/assets/Beautiful_World4.png ***!
    \*********************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  module.exports = __webpack_require__.p + "static/media/Beautiful_World4.335e8a0b.png";
  
  /***/ }),
  
  /***/ "./src/lib/assets/Beautiful_World_A5b.png":
  /*!************************************************!*\
    !*** ./src/lib/assets/Beautiful_World_A5b.png ***!
    \************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  module.exports = __webpack_require__.p + "static/media/Beautiful_World_A5b.65282479.png";
  
  /***/ }),
  
  /***/ "./src/lib/components/GameMap.js":
  /*!***************************************!*\
    !*** ./src/lib/components/GameMap.js ***!
    \***************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
  /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
  /* harmony import */ var _game_createAssetsLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../game/createAssetsLoader */ "./src/lib/game/createAssetsLoader.js");
  /* harmony import */ var _game_createMapRenderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../game/createMapRenderer */ "./src/lib/game/createMapRenderer.js");
  /* harmony import */ var _game_createMouseController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../game/createMouseController */ "./src/lib/game/createMouseController.js");
  var _jsxFileName = "C:\\Users\\Guilh\\Desktop\\react-game-map\\src\\lib\\components\\GameMap.js";
  
  /* eslint-disable jsx-a11y/mouse-events-have-key-events */
  
  
  
  
  
  const canvasStyle = {
    backgroundColor: 'black'
  };
  
  function getMousePosition(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
  
  const initializeContext = (current, scale) => {
    const canvas = current; // Get the device pixel ratio, falling back to 1.
  
    /*   const dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const heightRatio = 1;
    canvas.height = canvas.width * heightRatio; */
  
    const context = canvas.getContext('2d'); // context.scale(dpr, dpr);
  
    return context;
  };
  
  const assetsLoader = Object(_game_createAssetsLoader__WEBPACK_IMPORTED_MODULE_2__["default"])();
  
  const loadAllAssetsAsync = async assets => Promise.all(assets.map(asset => assetsLoader.loadImageAsync(asset.key, asset.src)));
  
  let mapRenderer = null;
  let mouseController = null;
  
  const GameMap = ({
    scale = 1,
    assets,
    onDataDisplay,
    onInitialize = () => {},
    size = 720,
    onRequestChunks
  }) => {
    const canvasRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
      const {
        current
      } = canvasRef;
      const context = initializeContext(current, scale);
      loadAllAssetsAsync(assets).then(() => {
        mapRenderer = Object(_game_createMapRenderer__WEBPACK_IMPORTED_MODULE_3__["default"])({
          assets: assetsLoader,
          context,
          size,
          onRequestChunks
        });
        mouseController = Object(_game_createMouseController__WEBPACK_IMPORTED_MODULE_4__["default"])({
          onDrag: e => {
            mapRenderer.camera.move(0.005, -e.movementX, -e.movementY);
            mapRenderer.requestChunks();
            mapRenderer.renderMap();
          },
          onMouseUp: () => {
            const isDragging = mouseController.getIsDragging(); // console.log('onMouseUp', isDragging);
  
            if (!isDragging) {
              mapRenderer.resetSelectTile();
            }
          }
        });
        mouseController.initialize();
        onInitialize(mapRenderer);
      });
    }, []);
    console.log('gamemap');
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("canvas", {
      width: size,
      height: size,
      ref: canvasRef,
      id: "canvas-id",
      style: canvasStyle,
      onMouseDown: () => {
        mouseController.setIsClicked(true);
      },
      onClick: e => {
        const hasDragged = mouseController.getHasDragged();
  
        if (!hasDragged) {
          const mousePosition = getMousePosition(canvasRef.current, e);
          const tile = mapRenderer.selectTile(mousePosition.x, mousePosition.y);
          onDataDisplay(tile);
        }
      },
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 91,
        columnNumber: 5
      }
    });
  };
  
  /* harmony default export */ __webpack_exports__["default"] = (Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(GameMap, () => true));
  
  /***/ }),
  
  /***/ "./src/lib/components/View.js":
  /*!************************************!*\
    !*** ./src/lib/components/View.js ***!
    \************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
  /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
  /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
  var _jsxFileName = "C:\\Users\\Guilh\\Desktop\\react-game-map\\src\\lib\\components\\View.js";
  
  
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column'
  };
  
  const View = ({
    children,
    style
  }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: { ...containerStyle,
      ...style
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 3
    }
  }, children);
  
  View.propTypes = {
    children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node,
    style: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({})
  };
  View.defaultProps = {
    children: null,
    style: {}
  };
  /* harmony default export */ __webpack_exports__["default"] = (View);
  
  /***/ }),
  
  /***/ "./src/lib/game/Renderer.js":
  /*!**********************************!*\
    !*** ./src/lib/game/Renderer.js ***!
    \**********************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  
  
  /* harmony default export */ __webpack_exports__["default"] = (Renderer);
  
  /***/ }),
  
  /***/ "./src/lib/game/createAssetsLoader.js":
  /*!********************************************!*\
    !*** ./src/lib/game/createAssetsLoader.js ***!
    \********************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);

  
  /* harmony default export */ __webpack_exports__["default"] = (createAssetsLoader);
  
  /***/ }),
  
  /***/ "./src/lib/game/createCamera.js":
  /*!**************************************!*\
    !*** ./src/lib/game/createCamera.js ***!
    \**************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);

  
  /* harmony default export */ __webpack_exports__["default"] = (createCamera);
  
  /***/ }),
  
  /***/ "./src/lib/game/createMapRenderer.js":
  /*!*******************************************!*\
    !*** ./src/lib/game/createMapRenderer.js ***!
    \*******************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _Renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Renderer */ "./src/lib/game/Renderer.js");
  /* harmony import */ var _createCamera__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createCamera */ "./src/lib/game/createCamera.js");
  /* harmony import */ var _utils_mapFactories__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/mapFactories */ "./src/lib/utils/mapFactories.js");
  
  
  
  
  
  /* harmony default export */ __webpack_exports__["default"] = (createMapRenderer);
  
  /***/ }),
  
  /***/ "./src/lib/game/createMouseController.js":
  /*!***********************************************!*\
    !*** ./src/lib/game/createMouseController.js ***!
    \***********************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);

  
  /* harmony default export */ __webpack_exports__["default"] = (createMouseController);
  
  /***/ }),
  
  /***/ "./src/lib/index.js":
  /*!**************************!*\
    !*** ./src/lib/index.js ***!
    \**************************/
  /*! exports provided: View, GameMap, assets */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assets", function() { return assets; });
  /* harmony import */ var _components_View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/View */ "./src/lib/components/View.js");
  /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "View", function() { return _components_View__WEBPACK_IMPORTED_MODULE_0__["default"]; });
  
  /* harmony import */ var _components_GameMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/GameMap */ "./src/lib/components/GameMap.js");
  /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GameMap", function() { return _components_GameMap__WEBPACK_IMPORTED_MODULE_1__["default"]; });
  
  /* harmony import */ var _assets_Beautiful_World_A5b_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/Beautiful_World_A5b.png */ "./src/lib/assets/Beautiful_World_A5b.png");
  /* harmony import */ var _assets_Beautiful_World_A5b_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_Beautiful_World_A5b_png__WEBPACK_IMPORTED_MODULE_2__);
  /* harmony import */ var _assets_Beautiful_World4_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/Beautiful_World4.png */ "./src/lib/assets/Beautiful_World4.png");
  /* harmony import */ var _assets_Beautiful_World4_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_Beautiful_World4_png__WEBPACK_IMPORTED_MODULE_3__);
  
  
  
  
  const assets = [{
    key: 'tileset1',
    src: _assets_Beautiful_World_A5b_png__WEBPACK_IMPORTED_MODULE_2___default.a
  }, {
    key: 'tileset2',
    src: _assets_Beautiful_World4_png__WEBPACK_IMPORTED_MODULE_3___default.a
  }];
  
  
  /***/ }),
  
  /***/ "./src/lib/utils/createTestMapLoader.js":
  /*!**********************************************!*\
    !*** ./src/lib/utils/createTestMapLoader.js ***!
    \**********************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);

  
  /* harmony default export */ __webpack_exports__["default"] = (createTestMapLoader);
  
  /***/ }),
  
  /***/ "./src/lib/utils/mapFactories.js":
  /*!***************************************!*\
    !*** ./src/lib/utils/mapFactories.js ***!
    \***************************************/
  /*! exports provided: createChunks, generateChunks */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createChunks", function() { return createChunks; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateChunks", function() { return generateChunks; });
  /* harmony import */ var lodash_uniqueId__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/uniqueId */ "./node_modules/lodash/uniqueId.js");
  /* harmony import */ var lodash_uniqueId__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_uniqueId__WEBPACK_IMPORTED_MODULE_0__);
  
 
  
  /***/ }),
  
  /***/ "./src/serviceWorker.js":
  /*!******************************!*\
    !*** ./src/serviceWorker.js ***!
    \******************************/
  /*! exports provided: register, unregister */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unregister", function() { return unregister; });
  // This optional code is used to register a service worker.
  // register() is not called by default.
  // This lets the app load faster on subsequent visits in production, and gives
  // it offline capabilities. However, it also means that developers (and users)
  // will only see deployed updates on subsequent visits to a page, after all the
  // existing tabs open on the page have been closed, since previously cached
  // resources are updated in the background.
  // To learn more about the benefits of this model and instructions on how to
  // opt-in, read https://bit.ly/CRA-PWA
  const isLocalhost = Boolean(window.location.hostname === 'localhost' || // [::1] is the IPv6 localhost address.
  window.location.hostname === '[::1]' || // 127.0.0.0/8 are considered localhost for IPv4.
  window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
  function register(config) {
    if (false) {}
  }
  
  function registerValidSW(swUrl, config) {
    navigator.serviceWorker.register(swUrl).then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
  
        if (installingWorker == null) {
          return;
        }
  
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log('New content is available and will be used when all ' + 'tabs for this page are closed. See https://bit.ly/CRA-PWA.'); // Execute callback
  
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.'); // Execute callback
  
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    }).catch(error => {
      console.error('Error during service worker registration:', error);
    });
  }
  
  function checkValidServiceWorker(swUrl, config) {
    // Check if the service worker can be found. If it can't reload the page.
    fetch(swUrl, {
      headers: {
        'Service-Worker': 'script'
      }
    }).then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
  
      if (response.status === 404 || contentType != null && contentType.indexOf('javascript') === -1) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    }).catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
  }
  
  function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.unregister();
      }).catch(error => {
        console.error(error.message);
      });
    }
  }
  
  /***/ }),
  
  /***/ 1:
  /*!**************************************************************************************************************!*\
    !*** multi (webpack)/hot/dev-server.js ./node_modules/react-dev-utils/webpackHotDevClient.js ./src/index.js ***!
    \**************************************************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  __webpack_require__(/*! C:\Users\Guilh\Desktop\react-game-map\node_modules\webpack\hot\dev-server.js */"./node_modules/webpack/hot/dev-server.js");
  __webpack_require__(/*! C:\Users\Guilh\Desktop\react-game-map\node_modules\react-dev-utils\webpackHotDevClient.js */"./node_modules/react-dev-utils/webpackHotDevClient.js");
  module.exports = __webpack_require__(/*! C:\Users\Guilh\Desktop\react-game-map\src\index.js */"./src/index.js");
  
  
  /***/ })
  
  },[[1,"runtime-main",0]]]);
  //# sourceMappingURL=main.chunk.js.map