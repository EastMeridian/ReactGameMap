import React from 'react';
import {
  View,
  Map,
  assets,
  createTestLoader,
  generateChunks,
} from './engine';


const containerStyle = {
  height: '100vh',
  width: '100vw',
  alignItems: 'center',
  justifyContent: 'center',
};
const layoutStyle = {
  boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  width: '720px',
  height: '720px',
};

const testMapLoader = createTestLoader({
  chunks: generateChunks(256),
});

function App() {
  return (
    <View style={containerStyle}>
      <View style={layoutStyle}>
        <Map
          assets={assets}
          onInitialize={(renderer) => {
            renderer.camera.center(50, 50);
            renderer.renderMap();
            renderer.requestChunks();
          }}
          onRequestChunks={testMapLoader.getChunk}
        />
      </View>
    </View>
  );
}

export default App;
