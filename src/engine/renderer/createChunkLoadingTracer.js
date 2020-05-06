const createChunkLoadingTracer = () => {
  const loadingChunks = {};

  return ({
    subscribe: ({ x, y }) => {
      loadingChunks[`${x}/${y}`] = true;
    },
    unsubscribe: ({ x, y }) => {
      delete loadingChunks[`${x}/${y}`];
    },
    isLoading: ({ x, y }) => loadingChunks[`${x}/${y}`] === true,
  });
};

export default createChunkLoadingTracer;
