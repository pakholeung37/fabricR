import * as ease from "./anim_ease"
import * as misc from "./misc"
import * as array from "./lang_array"
import * as string from "./lang_string"
import * as object from "./lang_object"
import * as Observable from "../mixins/observable.mixin"
import { animateColor } from "./animate_color"
import { animate, requestAnimFrame, cancelAnimFrame } from "./animate"
import {
  addListener,
  removeListener,
  getPointer,
  isTouchEvent
} from "./dom_event"
import {
  setImageSmoothing,
  getById,
  addClass,
  makeElement,
  getScrollLeftTop,
  getElementOffset,
  toArray,
  getNodeCanvas,
  cleanUpJsdomNode,
  makeElementSelectable,
  makeElementUnselectable
} from "./dom_misc"
import { request } from "./dom_request"
import { setStyle } from "./dom_style"
import { createClass } from "./lang_class"
import { createAccessors } from "./named_accessors.mixin"
import {
  parsePath,
  makePathSimpler,
  getPathSegmentsInfo,
  fromArcToBeizers,
  getBoundsOfArc,
  getBoundsOfCurve,
  getPointOnPath,
  drawArc
} from "./path"

export default {
  ...misc,
  ...Observable,
  array,
  string,
  object,
  ease,
  animateColor,
  animate,
  requestAnimFrame,
  cancelAnimFrame,
  addListener,
  removeListener,
  getPointer,
  isTouchEvent,
  setImageSmoothing,
  getById,
  toArray,
  addClass,
  makeElement,
  getScrollLeftTop,
  getElementOffset,
  getNodeCanvas,
  cleanUpJsdomNode,
  makeElementUnselectable,
  makeElementSelectable,
  request,
  setStyle,
  createClass,
  createAccessors,
  parsePath,
  makePathSimpler,
  getPathSegmentsInfo,
  fromArcToBeizers,
  getBoundsOfArc,
  getBoundsOfCurve,
  getPointOnPath,
  drawArc
}
