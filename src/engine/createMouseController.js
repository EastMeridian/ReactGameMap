const createMouseController = ({
  onDrag = () => {},
  onMouseUp = () => {},
}) => {
  let isDragging = false;
  let isClicked = false;
  let hasDragged = false;
  return {
    initialize() {
      document.onmousemove = (e) => {
        if (isClicked) {
          if (!isDragging) this.setIsDragging(true); // console.log('onMove', e.movementX, e.movementY, isDragging);

          onDrag(e);
        }
      };

      document.onmouseup = () => {
        // console.log('onmouseup', isDragging);
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
  };
};

export default createMouseController;
