import View from './components/View';
import Map from './components/Map';
import createTestLoader from './utils/createTestMapLoader';
import {
  createChunks,
  generateChunks,
} from './utils/mapFactory';

import tileset1 from './assets/Beautiful_World_A5b.png';
import tileset2 from './assets/Beautiful_World4.png';

const assets = [{
  key: 'tileset1',
  src: tileset1,
}, {
  key: 'tileset2',
  src: tileset2,
}];

export {
  Map,
  View,
  assets,
  createTestLoader,
  createChunks,
  generateChunks,
};
