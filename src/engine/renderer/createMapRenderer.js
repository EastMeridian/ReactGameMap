const WORLD_SIZE = 256;
  const CHUNK_SIZE = 8;
  
  const createMapRenderer = ({
    context,
    assets,
    map = {
      tileSize: 48,
      width: WORLD_SIZE,
      height: WORLD_SIZE,
      chunks: Object(_utils_mapFactories__WEBPACK_IMPORTED_MODULE_2__["createChunks"])(WORLD_SIZE),
      chunkSize: CHUNK_SIZE
    },
    layers = [{
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
    }],
    onRequestChunks,
    size
  } = {}) => new _Renderer__WEBPACK_IMPORTED_MODULE_0__["default"]({
    context,
    assets,
    map,
    layers,
    camera: Object(_createCamera__WEBPACK_IMPORTED_MODULE_1__["default"])({
      map,
      width: size,
      height: size
    }),
    onRequestChunks
  });