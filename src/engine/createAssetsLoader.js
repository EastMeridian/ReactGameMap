const createAssetsLoader = () => {
  const assets = {};
  return {
    loadImageAsync: ({ key, src, ...rest }) => new Promise((resolve, reject) => {
      const image = new Image();
      console.log(key, src, rest);
      image.onload = () => {
        assets[key] = { image, ...rest };
        console.log(`Image ${key} successfuly loaded.`);
        resolve(image);
      };

      image.onerror = () => {
        console.log(`Could not load image: ${src}`);
        reject(new Error(`Could not load image: ${src}`));
      };

      image.src = src;
    }),
    getAsset: (key) => assets[key],
    getAssets: () => assets,
  };
};

export default createAssetsLoader;
