import {
  scaleSkewCursorStyleHandler as scaleSkewStyleHandler,
  scaleCursorStyleHandler as scaleStyleHandler,
  scalingEqually,
  scalingYOrSkewingX,
  scalingXOrSkewingY,
  scaleOrSkewActionName,
  rotationStyleHandler,
  rotationWithSnapping,
  changeWidth
} from "../controls.actions"
import Control from "../control.class"
import FaObject from "../shapes/object.class"
import Textbox from "../shapes/textbox.class"

var objectControls = FaObject.prototype.controls

objectControls.ml = new Control({
  x: -0.5,
  y: 0,
  cursorStyleHandler: scaleSkewStyleHandler,
  actionHandler: scalingXOrSkewingY,
  getActionName: scaleOrSkewActionName
})

objectControls.mr = new Control({
  x: 0.5,
  y: 0,
  cursorStyleHandler: scaleSkewStyleHandler,
  actionHandler: scalingXOrSkewingY,
  getActionName: scaleOrSkewActionName
})

objectControls.mb = new Control({
  x: 0,
  y: 0.5,
  cursorStyleHandler: scaleSkewStyleHandler,
  actionHandler: scalingYOrSkewingX,
  getActionName: scaleOrSkewActionName
})

objectControls.mt = new Control({
  x: 0,
  y: -0.5,
  cursorStyleHandler: scaleSkewStyleHandler,
  actionHandler: scalingYOrSkewingX,
  getActionName: scaleOrSkewActionName
})

objectControls.tl = new Control({
  x: -0.5,
  y: -0.5,
  cursorStyleHandler: scaleStyleHandler,
  actionHandler: scalingEqually
})

objectControls.tr = new Control({
  x: 0.5,
  y: -0.5,
  cursorStyleHandler: scaleStyleHandler,
  actionHandler: scalingEqually
})

objectControls.bl = new Control({
  x: -0.5,
  y: 0.5,
  cursorStyleHandler: scaleStyleHandler,
  actionHandler: scalingEqually
})

objectControls.br = new Control({
  x: 0.5,
  y: 0.5,
  cursorStyleHandler: scaleStyleHandler,
  actionHandler: scalingEqually
})

objectControls.mtr = new Control({
  x: 0,
  y: -0.5,
  actionHandler: rotationWithSnapping,
  cursorStyleHandler: rotationStyleHandler,
  offsetY: -40,
  withConnection: true,
  actionName: "rotate"
})

if (Textbox) {
  // this is breaking the prototype inheritance, no time / ideas to fix it.
  // is important to document that if you want to have all objects to have a
  // specific custom control, you have to add it to Object prototype and to Textbox
  // prototype. The controls are shared as references. So changes to control `tr`
  // can still apply to all objects if needed.
  var textBoxControls = (Textbox.prototype.controls = {})

  textBoxControls.mtr = objectControls.mtr
  textBoxControls.tr = objectControls.tr
  textBoxControls.br = objectControls.br
  textBoxControls.tl = objectControls.tl
  textBoxControls.bl = objectControls.bl
  textBoxControls.mt = objectControls.mt
  textBoxControls.mb = objectControls.mb

  textBoxControls.mr = new Control({
    x: 0.5,
    y: 0,
    actionHandler: changeWidth,
    cursorStyleHandler: scaleSkewStyleHandler,
    actionName: "resizing"
  })

  textBoxControls.ml = new Control({
    x: -0.5,
    y: 0,
    actionHandler: changeWidth,
    cursorStyleHandler: scaleSkewStyleHandler,
    actionName: "resizing"
  })
}
