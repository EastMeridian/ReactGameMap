const createAssetsLoader = () => {
  const assets = {};
  return {
    loadImageAsync: (key, src) => new Promise((resolve, reject) => {
      const image = new Image();

      image.onload = () => {
        assets[key] = image;
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
  };
};

export default createAssetsLoader;
