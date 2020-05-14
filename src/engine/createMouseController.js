const createMouseController = ({
  canvas,
  onDrag = () => { },
  onMouseUp = () => { },
  onMouseStop = () => { },
  overTime = 400,
  scale,
}) => {
  let isDragging = false;
  let isClicked = false;
  let hasDragged = false;
  let timer = null;
  return {
    initialize() {
      document.onmousemove = (e) => {
        if (isClicked) {
          if (!isDragging) this.setIsDragging(true);
          onDrag(e);
        }
      };

      document.onmouseup = () => {
        onMouseUp();
        this.setHasDragged(isDragging);
        this.setIsClicked(false);
        this.setIsDragging(false);
      };
    },

    setIsDragging: (bool) => {
      isDragging = bool;
    },
    setHasDragged: (bool) => {
      hasDragged = bool;
    },
    setIsClicked: (bool) => {
      isClicked = bool;
    },
    getHasDragged: () => hasDragged,
    getIsDragging: () => isDragging,
    onMouseMove(e) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        onMouseStop(this.getMousePosition(e));
      }, overTime);
    },

    getMousePosition: (evt) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: (evt.clientX - rect.left) / scale,
        y: (evt.clientY - rect.top) / scale,
      };
    },
  };
};

export default createMouseController;
