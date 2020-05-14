import { createCamera } from '../camera';


describe('createCamera', () => {
  const camera = createCamera({
    width: 100,
    height: 100,
    map: {
      tileSize: 10,
      width: 100,
      height: 100,
    },
  });
  it('should have correct construction values', () => {
    expect(camera.x).toBe(0);
    expect(camera.y).toBe(0);
    expect(camera.width).toBe(100);
    expect(camera.height).toBe(100);
    expect(camera.tileSize).toBe(10);
    expect(camera.maxX).toBe(900);
    expect(camera.maxY).toBe(900);
  });

  it('should move correctly', () => {
    camera.move(0.01, 10, 10);
    expect(camera.x).toBe(25.6);
    expect(camera.y).toBe(25.6);
    camera.move(0.01, -100, -100);
    expect(camera.x).toBe(0);
    expect(camera.y).toBe(0);
    camera.move(0.01, 1000, 1000);
    expect(camera.x).toBe(900);
    expect(camera.y).toBe(900);
  });

  it('should center correctly', () => {
    camera.center(20, 20);
    expect(camera.x).toBe(150);
    expect(camera.y).toBe(150);
  });

  it('should give right boundaries', () => {
    const boundaries = camera.getRenderedBoundaries();
    expect(boundaries).toStrictEqual({
      startCol: 15,
      endCol: 25,
      startRow: 15,
      endRow: 25,
      offsetX: 0,
      offsetY: 0,
    });
  });

  it('should give right enlarged boundaries', () => {
    const boundaries = camera.getEnlargedBoundaries();
    expect(boundaries).toStrictEqual({
      startCol: 14,
      endCol: 26,
      startRow: 14,
      endRow: 26,
    });
  });
});
