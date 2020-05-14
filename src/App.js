import React, { useState } from 'react';
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
  position: 'relative',
};

const overCardStyle = {
  backgroundColor: '#00000050',
  borderRadius: 2,
  position: 'absolute',
  pointerEvents: 'none',
  width: 128,
};

const testMapLoader = createTestLoader({
  chunks: generateChunks(256),
});

function App() {
  const [over, setOver] = useState(null);

  return (
    <View style={containerStyle}>
      <View style={layoutStyle}>
        <Map
          width={1152}
          height={720}
          assets={assets}
          onInitialize={(renderer) => {
            renderer.camera.center(0, 0);
            renderer.update();
          }}
          onRequestChunks={testMapLoader.getChunk}
          onClick={(data) => console.log(data)}
          onOver={(data) => {
            // setOver(data);
            console.log('onOver', data);
          }}
        />
      </View>
      {over && (
        <View style={{ ...overCardStyle, left: over.mousePosition.x, top: over.mousePosition.y }}>
          {JSON.stringify(over)}
        </View>
      )}
    </View>
  );
}

export default App;
