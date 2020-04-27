const createTestMapLoader = ({
  chunks,
}) => ({
  getChunk: ({
    x,
    y,
  }) => new Promise((resolve) => {
    setTimeout(() => resolve(chunks[x][y]), 300);
  }),
});

export default createTestMapLoader;
