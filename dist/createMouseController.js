"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var createMouseController = function createMouseController(_ref) {
  var _ref$onDrag = _ref.onDrag,
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
  var hasMoved = false;
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
      clearTimeout(timer);
      timer = setTimeout(function () {
        onMouseStop(e);
      }, overTime);
    }
  };
};

var _default = createMouseController;
exports.default = _default;