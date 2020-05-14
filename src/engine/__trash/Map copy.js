import React, { useRef, useEffect } from 'react';
import t from 'prop-types';
import createAssetsLoader from '../createAssetsLoader';
import { createEngine } from '../engine';
import createMouseController from '../createMouseController';

const canvasStyle = {
  backgroundColor: '#120136',
  userSelect: 'none',
  WebKitUserSelect: 'none',
  MozUserSelect: 'none',
};

function getMousePosition(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

const initializeContext = (current, scale) => {
  const canvas = current; // Get the device pixel ratio, falling back to 1.

  /*   const dpr = window.devicePixelRatio || 1;
  // Get the size of the canvas in CSS pixels.
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const heightRatio = 1;
  canvas.height = canvas.width * heightRatio; */

  const context = canvas.getContext('2d'); //
  // context.scale(scale, scale);

  return context;
};

const assetsLoader = createAssetsLoader();

const loadAllAssetsAsync = async (assets) => Promise.all(
  assets.map((asset) => assetsLoader.loadImageAsync(asset)),
);

let engine = null;
let mouseController = null;

const GameMap = ({
  scale = 1,
  assets,
  onDataDisplay = () => { },
  onInitialize = () => { },
  size = 720,
  onRequestChunks,
  onOver = () => { },
}) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const {
      current,
    } = canvasRef;
    const context = initializeContext(current, size / 720);
    loadAllAssetsAsync(assets).then(() => {
      engine = createEngine({
        assets: assetsLoader,
        context,
        screenSize: size,
        onRequestChunks,
      });
      mouseController = createMouseController({
        onDrag: (e) => {
          engine.camera.move(0.005, -e.movementX, -e.movementY);
          engine.requestChunks();
          engine.renderMap();
        },
        onMouseUp: () => {
          const isDragging = mouseController.getIsDragging();

          if (!isDragging) {
            engine.resetSelectTile();
          }
        },
        onMouseStop: (e) => {
          const mousePosition = getMousePosition(canvasRef.current, e);
          const tile = engine.findTile(mousePosition.x, mousePosition.y);
          onOver({ tile, mousePosition });
        },
      });
      mouseController.initialize();
      onInitialize(engine);
    });
  }, [assets, onInitialize, onRequestChunks, scale, size]);

  return (
    <canvas
      width={size}
      height={size}
      ref={canvasRef}
      id="canvas-id"
      style={canvasStyle}
      onMouseDown={() => {
        mouseController.setIsClicked(true);
      }}
      onClick={(e) => {
        const hasDragged = mouseController.getHasDragged();

        if (!hasDragged) {
          const mousePosition = getMousePosition(canvasRef.current, e);
          const tile = engine.selectTile(mousePosition.x, mousePosition.y);
          onDataDisplay(tile);
        }
      }}
      onMouseMove={(e) => {
        if (mouseController) {
          e.persist();
          mouseController.onMouseMove(e);
        }
      }}
    />
  );
};

export default GameMap;
