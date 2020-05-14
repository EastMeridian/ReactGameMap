"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var createMouseController = function createMouseController(_ref) {
  var canvas = _ref.canvas,
      _ref$onDrag = _ref.onDrag,
      onDrag = _ref$onDrag === void 0 ? function () {} : _ref$onDrag,
      _ref$onMouseUp = _ref.onMouseUp,
      onMouseUp = _ref$onMouseUp === void 0 ? function () {} : _ref$onMouseUp,
      _ref$onMouseStop = _ref.onMouseStop,
      onMouseStop = _ref$onMouseStop === void 0 ? function () {} : _ref$onMouseStop,
      _ref$overTime = _ref.overTime,
      overTime = _ref$overTime === void 0 ? 400 : _ref$overTime;
  var isDragging = false;
  var isClicked = false;
  var hasDragged = false;
  var timer = null;
  return {
    initialize: function initialize() {
      var _this = this;

      document.onmousemove = function (e) {
        if (isClicked) {
          if (!isDragging) _this.setIsDragging(true);
          onDrag(e);
        }
      };

      document.onmouseup = function () {
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
    },
    onMouseMove: function onMouseMove(e) {
      var _this2 = this;

      clearTimeout(timer);
      timer = setTimeout(function () {
        onMouseStop(_this2.getMousePosition(e));
      }, overTime);
    },
    getMousePosition: function getMousePosition(evt) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
    }
  };
};

var _default = createMouseController;
exports.default = _default;