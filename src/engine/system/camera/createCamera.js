import Camera from './Camera';

const createCamera = ({
  map,
  width,
  height,
}) => new Camera(map, width, height);

export default createCamera;
