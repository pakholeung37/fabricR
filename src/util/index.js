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
import * as domMisc from "./dom_misc"
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

const util = {
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
  ...domMisc,
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
getGlobalThis().fabric.util = util

export * from "./anim_ease"
export * from "./misc"
export * from "./lang_array"
export * from "./lang_string"
export * from "./lang_object"
export * from "../mixins/observable.mixin"
export * from "./animate_color"
export * from "./animate"
export * from "./dom_event"
export * from "./dom_misc"
export * from "./dom_request"
export * from "./dom_style"
export * from "./lang_class"
export * from "./named_accessors.mixin"
export * from "./path"
