"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var createMouseController = function createMouseController(_ref) {
  var _ref$onDrag = _ref.onDrag,
      onDrag = _ref$onDrag === void 0 ? function () {} : _ref$onDrag,
      _ref$onMouseUp = _ref.onMouseUp,
      onMouseUp = _ref$onMouseUp === void 0 ? function () {} : _ref$onMouseUp;
  var isDragging = false;
  var isClicked = false;
  var hasDragged = false;
  return {
    initialize: function initialize() {
      var _this = this;

      document.onmousemove = function (e) {
        if (isClicked) {
          if (!isDragging) _this.setIsDragging(true); // console.log('onMove', e.movementX, e.movementY, isDragging);

          onDrag(e);
        }
      };

      document.onmouseup = function () {
        // console.log('onmouseup', isDragging);
        onMouseUp();

        _this.setHasDragged(isDragging);

        _this.setIsClicked(false);

        _this.setIsDragging(false);
      };
    },
    setIsDragging: function setIsDragging(bool) {
      isDragging = bool;
    },
    setHasDragged: function setHasDragged(bool) {
      hasDragged = bool;
    },
    setIsClicked: function setIsClicked(bool) {
      isClicked = bool;
    },
    getHasDragged: function getHasDragged() {
      return hasDragged;
    },
    getIsDragging: function getIsDragging() {
      return isDragging;
    }
  };
};

var _default = createMouseController;
exports.default = _default;