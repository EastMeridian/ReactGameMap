import View from './components/View';
import Map from './components/Map';
import createTestLoader from './utils/createTestMapLoader';
import {
  createChunks,
  generateChunks,
} from './utils/mapFactory';

import floor from './assets/Beautiful_World_A5b.png';
import items from './assets/Beautiful_World4.png';
import icons from './assets/botw.jpg';

const assets = [{
  key: 'floor',
  src: floor,
  tilesetWidth: 8,
}, {
  key: 'items',
  src: items,
  tilesetWidth: 16,
}, {
  key: 'icons',
  src: icons,
  tilesetWidth: 96,
}];

export {
  Map,
  View,
  assets,
  createTestLoader,
  createChunks,
  generateChunks,
};
