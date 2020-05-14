import React, { useRef, useEffect, memo } from 'react';
import t from 'prop-types';
import createAssetsLoader from '../createAssetsLoader';
import { createEngine } from '../system';
import createMouseController from '../createMouseController';

const canvasStyle = {
  backgroundColor: '#120136',
  userSelect: 'none',
  WebKitUserSelect: 'none',
  MozUserSelect: 'none',
};

const assetsLoader = createAssetsLoader();

const loadAllAssetsAsync = async (assets) => Promise.all(
  assets.map((asset) => assetsLoader.loadImageAsync(asset)),
);

let engine = null;
let mouseController = null;

const initialize = ({
  width,
  height,
  onRequestChunks,
  onOver,
  canvas,
  scale,
}) => {
  const context = canvas.getContext('2d');
  context.scale(scale, scale);
  console.log('CONTEXT');
  engine = createEngine({
    assets: assetsLoader.getAssets(),
    context,
    width,
    height,
    onRequestChunks,
  });

  mouseController = createMouseController({
    canvas,
    scale,
    onDrag: (e) => {
      engine.camera.move(0.0038 / scale, -e.movementX, -e.movementY);
      engine.update();
    },
    onMouseUp: () => {
      const isDragging = mouseController.getIsDragging();

      if (!isDragging) {
        engine.resetSelectTile();
      }
    },
    onMouseStop: (mousePosition) => {
      const tile = engine.findTile(mousePosition.x, mousePosition.y);
      onOver({ tile, mousePosition });
    },
  });

  mouseController.initialize();
};

const GameMap = ({
  scale,
  assets,
  onClick = () => { },
  onInitialize = () => { },
  width,
  height,
  onRequestChunks,
  onOver = () => { },
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const { current: canvas } = canvasRef;
    loadAllAssetsAsync(assets).then(() => {
      initialize({
        width,
        height,
        onRequestChunks,
        onOver,
        canvas,
        scale,
      });
      onInitialize(engine);
      console.log(engine);
    });
  }, []);

  return (
    <canvas
      width={width}
      height={height}
      ref={canvasRef}
      id="canvas-id"
      style={canvasStyle}
      onMouseDown={() => {
        mouseController.setIsClicked(true);
      }}
      onClick={(e) => {
        const hasDragged = mouseController.getHasDragged();

        if (!hasDragged) {
          const mousePosition = mouseController.getMousePosition(e);
          console.log('mousePosition', mousePosition);
          const tile = engine.selectTile(mousePosition.x, mousePosition.y);
          onClick(tile);
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

GameMap.propTypes = {
  scale: t.number,
  width: t.number,
  height: t.number,
  assets: t.arrayOf(t.shape({})),
  onClick: t.func,
  onInitialize: t.func,
  onRequestChunks: t.func,
  onOver: t.func,
};

GameMap.defaultProps = {
  scale: 1.3,
  width: 720,
  height: 720,
  assets: [],
  onClick: () => { },
  onInitialize: () => { },
  onRequestChunks: () => { },
  onOver: () => { },
};

export default memo(GameMap, () => false);
