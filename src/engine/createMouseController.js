const createMouseController = ({
  onDrag = () => { },
  onMouseUp = () => { },
  onMouseStop = () => { },
  overTime = 400,
}) => {
  let isDragging = false;
  let isClicked = false;
  let hasDragged = false;
  const hasMoved = false;
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
    onMouseMove: (e) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        onMouseStop(e);
      }, overTime);
    },
  };
};

export default createMouseController;
