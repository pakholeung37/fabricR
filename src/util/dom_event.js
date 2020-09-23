import { getScrollLeftTop } from "./dom_misc"

// since ie11 can use addEventListener but they do not support options, i need to check
var couldUseAttachEvent = !!fabric.document.createElement("div").attachEvent,
  touchEvents = ["touchstart", "touchmove", "touchend"]
/**
 * Adds an event listener to an element
 * @function
 * @memberOf fabric.util
 * @param {HTMLElement} element
 * @param {String} eventName
 * @param {Function} handler
 */
export function addListener(element, eventName, handler, options) {
  element &&
    element.addEventListener(
      eventName,
      handler,
      couldUseAttachEvent ? false : options
    )
}

/**
 * Removes an event listener from an element
 * @function
 * @memberOf fabric.util
 * @param {HTMLElement} element
 * @param {String} eventName
 * @param {Function} handler
 */
export function removeListener(element, eventName, handler, options) {
  element &&
    element.removeEventListener(
      eventName,
      handler,
      couldUseAttachEvent ? false : options
    )
}

function getTouchInfo(event) {
  var touchProp = event.changedTouches
  if (touchProp && touchProp[0]) {
    return touchProp[0]
  }
  return event
}

export function getPointer(event) {
  var element = event.target,
    scroll = getScrollLeftTop(element),
    _evt = getTouchInfo(event)
  return {
    x: _evt.clientX + scroll.left,
    y: _evt.clientY + scroll.top
  }
}

export function isTouchEvent(event) {
  return touchEvents.indexOf(event.type) > -1 || event.pointerType === "touch"
}
