var simulateEvent
if (fabric.isLikelyNode) {
  simulateEvent = global.simulateEvent
} else {
  simulateEvent = window.simulateEvent
}

var SUB_TARGETS_JSON =
  '{"version":"' +
  fabric.version +
  '","objects":[{"type":"activeSelection","left":-152,"top":656.25,"width":356.5,"height":356.5,"scaleX":0.45,"scaleY":0.45,"objects":[]},{"type":"group","left":11,"top":6,"width":511.5,"height":511.5,"objects":[{"type":"rect","left":-255.75,"top":-255.75,"width":50,"height":50,"fill":"#6ce798","scaleX":10.03,"scaleY":10.03,"opacity":0.8},{"type":"group","left":-179.75,"top":22,"width":356.5,"height":356.5,"scaleX":0.54,"scaleY":0.54,"objects":[{"type":"rect","left":-178.25,"top":-178.25,"width":50,"height":50,"fill":"#4862cc","scaleX":6.99,"scaleY":6.99,"opacity":0.8},{"type":"group","left":-163.25,"top":-161.25,"width":177.5,"height":177.5,"objects":[{"type":"rect","left":-88.75,"top":-88.75,"width":50,"height":50,"fill":"#5fe909","scaleX":3.48,"scaleY":3.48,"opacity":0.8},{"type":"rect","left":-59.75,"top":-68.75,"width":50,"height":50,"fill":"#f3529c","opacity":0.8},{"type":"triangle","left":36.03,"top":-38.12,"width":50,"height":50,"fill":"#c1124e","angle":39.07,"opacity":0.8},{"type":"rect","left":-65.75,"top":17.25,"width":50,"height":50,"fill":"#9c5120","opacity":0.8}]},{"type":"group","left":-34.25,"top":-31.25,"width":177.5,"height":177.5,"scaleX":1.08,"scaleY":1.08,"objects":[{"type":"rect","left":-88.75,"top":-88.75,"width":50,"height":50,"fill":"#5fe909","scaleX":3.48,"scaleY":3.48,"opacity":0.8},{"type":"rect","left":-59.75,"top":-68.75,"width":50,"height":50,"fill":"#f3529c","opacity":0.8},{"type":"triangle","left":36.03,"top":-38.12,"width":50,"height":50,"fill":"#c1124e","angle":39.07,"opacity":0.8},{"type":"rect","left":-65.75,"top":17.25,"width":50,"height":50,"fill":"#9c5120","opacity":0.8}]}]},{"type":"group","left":-202.75,"top":-228.5,"width":356.5,"height":356.5,"scaleX":0.61,"scaleY":0.61,"objects":[{"type":"rect","left":-178.25,"top":-178.25,"width":50,"height":50,"fill":"#4862cc","scaleX":6.99,"scaleY":6.99,"opacity":0.8},{"type":"group","left":-163.25,"top":-161.25,"width":177.5,"height":177.5,"objects":[{"type":"rect","left":-88.75,"top":-88.75,"width":50,"height":50,"fill":"#5fe909","scaleX":3.48,"scaleY":3.48,"opacity":0.8},{"type":"rect","left":-59.75,"top":-68.75,"width":50,"height":50,"fill":"#f3529c","opacity":0.8},{"type":"triangle","left":36.03,"top":-38.12,"width":50,"height":50,"fill":"#c1124e","angle":39.07,"opacity":0.8},{"type":"rect","left":-65.75,"top":17.25,"width":50,"height":50,"fill":"#9c5120","opacity":0.8}]},{"type":"group","left":-34.25,"top":-31.25,"width":177.5,"height":177.5,"scaleX":1.08,"scaleY":1.08,"objects":[{"type":"rect","left":-88.75,"top":-88.75,"width":50,"height":50,"fill":"#5fe909","scaleX":3.48,"scaleY":3.48,"opacity":0.8},{"type":"rect","left":-59.75,"top":-68.75,"width":50,"height":50,"fill":"#f3529c","opacity":0.8},{"type":"triangle","left":36.03,"top":-38.12,"width":50,"height":50,"fill":"#c1124e","angle":39.07,"opacity":0.8},{"type":"rect","left":-65.75,"top":17.25,"width":50,"height":50,"fill":"#9c5120","opacity":0.8}]}]},{"type":"group","left":138.3,"top":-90.22,"width":356.5,"height":356.5,"scaleX":0.42,"scaleY":0.42,"angle":62.73,"objects":[{"type":"rect","left":-178.25,"top":-178.25,"width":50,"height":50,"fill":"#4862cc","scaleX":6.99,"scaleY":6.99,"opacity":0.8},{"type":"group","left":-163.25,"top":-161.25,"width":177.5,"height":177.5,"objects":[{"type":"rect","left":-88.75,"top":-88.75,"width":50,"height":50,"fill":"#5fe909","scaleX":3.48,"scaleY":3.48,"opacity":0.8},{"type":"rect","left":-59.75,"top":-68.75,"width":50,"height":50,"fill":"#f3529c","opacity":0.8},{"type":"triangle","left":36.03,"top":-38.12,"width":50,"height":50,"fill":"#c1124e","angle":39.07,"opacity":0.8},{"type":"rect","left":-65.75,"top":17.25,"width":50,"height":50,"fill":"#9c5120","opacity":0.8}]},{"type":"group","left":-34.25,"top":-31.25,"width":177.5,"height":177.5,"scaleX":1.08,"scaleY":1.08,"objects":[{"type":"rect","left":-88.75,"top":-88.75,"width":50,"height":50,"fill":"#5fe909","scaleX":3.48,"scaleY":3.48,"opacity":0.8},{"type":"rect","left":-59.75,"top":-68.75,"width":50,"height":50,"fill":"#f3529c","opacity":0.8},{"type":"triangle","left":36.03,"top":-38.12,"width":50,"height":50,"fill":"#c1124e","angle":39.07,"opacity":0.8},{"type":"rect","left":-65.75,"top":17.25,"width":50,"height":50,"fill":"#9c5120","opacity":0.8}]}]}]}]}'

var canvas = new fabric.Canvas(null, {
  enableRetinaScaling: false,
  width: 600,
  height: 600
})
var upperCanvasEl = canvas.upperCanvasEl

describe("fabric.Canvas events mixin", () => {
  beforeEach(function () {
    canvas.cancelRequestedRender()
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
    upperCanvasEl.style.display = ""
    canvas.controlsAboveOverlay = fabric.Canvas.prototype.controlsAboveOverlay
    canvas.preserveObjectStacking =
      fabric.Canvas.prototype.preserveObjectStacking
  })
  afterEach(function () {
    canvas.clear()
    canvas.backgroundColor = fabric.Canvas.prototype.backgroundColor
    canvas.overlayColor = fabric.Canvas.prototype.overlayColor
    canvas._collectObjects = fabric.Canvas.prototype._collectObjects
    canvas.off()
    canvas.calcOffset()
    upperCanvasEl.style.display = "none"
    canvas.cancelRequestedRender()
  })
  test("_beforeTransform", function () {
    expect(typeof canvas._beforeTransform === "function").toBeTruthy()

    var canvasEl = canvas.getElement(),
      canvasOffset = fabric.util.getElementOffset(canvasEl)

    var rect = new fabric.Rect({ left: 50, top: 50, width: 50, height: 50 })
    canvas.add(rect)
    canvas.setActiveObject(rect)

    var t,
      counter = 0
    canvas.on("before:transform", function (options) {
      t = options.transform.target
      counter++
    })

    var corners = ["tl", "mt", "tr", "mr", "br", "mb", "bl", "ml", "mtr"]
    for (var i = 0; i < corners.length; i++) {
      var co = rect.oCoords[corners[i]].corner
      var e = {
        clientX: canvasOffset.left + (co.tl.x + co.tr.x) / 2,
        clientY: canvasOffset.top + (co.tl.y + co.bl.y) / 2,
        which: 1
      }
      canvas._setupCurrentTransform(e, rect)
    }
    expect(counter).toEqual(corners.length)
    expect(t).toEqual(rect)

    canvas.zoomToPoint({ x: 25, y: 25 }, 2)

    t = null
    counter = 0
    for (var i = 0; i < corners.length; i++) {
      var c = corners[i]
      var co = rect.oCoords[c].corner
      var e = {
        clientX: canvasOffset.left + (co.tl.x + co.tr.x) / 2,
        clientY: canvasOffset.top + (co.tl.y + co.bl.y) / 2,
        which: 1
      }
      canvas._beforeTransform(e, rect)
    }
    expect(counter).toEqual(corners.length)
    expect(t).toEqual(rect)

    canvas.zoomToPoint({ x: 0, y: 0 }, 1)
  })

  test("cache and reset event properties", function () {
    var e = { clientX: 30, clientY: 30, which: 1, target: canvas.upperCanvasEl }
    var rect = new fabric.Rect({ width: 60, height: 60 })
    canvas._currentTransform = null
    canvas.add(rect)
    // origin null
    expect(canvas._pointer).toEqual(undefined)
    // origin null
    expect(canvas._absolutePointer).toEqual(undefined)
    // origin null
    expect(canvas._target).toEqual(undefined)
    canvas.viewportTransform = [2, 0, 0, 2, 0, 0]
    canvas._cacheTransformEventData(e)
    expect(canvas._pointer).toEqual({ x: 30, y: 30 })
    expect(canvas._absolutePointer).toEqual(new fabric.Point(15, 15))
    expect(canvas._target === rect).toBeTruthy()
    canvas._resetTransformEventData()
    expect(canvas._pointer).toEqual(null)
    expect(canvas._absolutePointer).toEqual(null)
    expect(canvas._target).toEqual(null)
  })

  test("mouse:down with different buttons", function () {
    var clickCount = 0
    function mouseHandler() {
      clickCount++
    }
    canvas.on("mouse:down", mouseHandler)
    canvas.fireMiddleClick = false
    canvas.fireRightClick = false
    canvas._currentTransform = false
    canvas.isDrawingMode = false
    canvas.__onMouseDown({ button: 0, target: canvas.upperCanvasEl })
    expect(clickCount).toEqual(1)
    clickCount = 0
    canvas.__onMouseDown({ button: 2, target: canvas.upperCanvasEl })
    expect(clickCount).toEqual(0)
    canvas.fireRightClick = true
    canvas.__onMouseDown({ button: 2, target: canvas.upperCanvasEl })
    expect(clickCount).toEqual(1)
    clickCount = 0
    canvas.__onMouseDown({ button: 1, target: canvas.upperCanvasEl })
    expect(clickCount).toEqual(0)
    canvas.fireMiddleClick = true
    canvas.__onMouseDown({ button: 1, target: canvas.upperCanvasEl })
    expect(clickCount).toEqual(1)
  })

  test("mouse:down:before with different buttons", function () {
    var clickCount = 0
    function mouseHandler() {
      clickCount++
    }
    canvas.on("mouse:down:before", mouseHandler)
    canvas.fireMiddleClick = false
    canvas.fireRightClick = false
    canvas._currentTransform = false
    canvas.isDrawingMode = false
    canvas.__onMouseDown({ which: 1, target: canvas.upperCanvasEl })
    expect(clickCount).toEqual(1)
    clickCount = 0
    canvas.__onMouseDown({ which: 3, target: canvas.upperCanvasEl })
    expect(clickCount).toEqual(1)
    canvas.fireRightClick = true
    canvas.__onMouseDown({ which: 3, target: canvas.upperCanvasEl })
    expect(clickCount).toEqual(2)
    clickCount = 0
    canvas.__onMouseDown({ which: 2, target: canvas.upperCanvasEl })
    expect(clickCount).toEqual(1)
    canvas.fireMiddleClick = true
    canvas.__onMouseDown({ which: 2, target: canvas.upperCanvasEl })
    expect(clickCount).toEqual(2)
  })

  test("mouse:down and group selector", function () {
    var e = { clientX: 30, clientY: 30, which: 1, target: canvas.upperCanvasEl }
    var rect = new fabric.Rect({ width: 60, height: 60 })
    var expectedGroupSelector = { ex: 30, ey: 30, top: 0, left: 0 }
    canvas.__onMouseDown(e)
    expect(canvas._groupSelector).toEqual(expectedGroupSelector)
    canvas.add(rect)
    canvas.__onMouseUp(e)
    canvas.__onMouseDown(e)
    expect(canvas._groupSelector).toEqual(null)
    rect.selectable = false
    canvas.__onMouseUp(e)
    canvas.__onMouseDown(e)
    expect(canvas._groupSelector).toEqual(null)
    canvas.__onMouseUp(e)
    canvas.discardActiveObject()
    rect.isEditing = true
    canvas.__onMouseDown(e)
    expect(canvas._groupSelector).toEqual(null)
    canvas.__onMouseUp(e)
    canvas.discardActiveObject()
    rect.isEditing = false
    canvas.__onMouseDown(e)
    expect(canvas._groupSelector).toEqual(expectedGroupSelector)
    canvas.__onMouseUp(e)
  })

  test("specific bug #5317 for shift+click and active selection", function () {
    var greenRect = new fabric.Rect({
      width: 300,
      height: 300,
      left: 0,
      top: 0,
      fill: "green",
      selectable: false
    })
    canvas.add(greenRect)

    // add green, half-transparent circle
    var redCircle = new fabric.Circle({
      radius: 40,
      left: 200,
      top: 100,
      fill: "red",
      opacity: 0.5
    })
    canvas.add(redCircle)

    // add green, half-transparent circle
    var blueCircle = new fabric.Circle({
      radius: 40,
      left: 0,
      top: 0,
      fill: "blue",
      opacity: 0.5
    })
    canvas.add(blueCircle)
    var e = {
      clientX: 40,
      clientY: 40,
      which: 1,
      target: canvas.upperCanvasEl
    }
    canvas.__onMouseDown(e)
    expect(canvas._activeObject).toEqual(blueCircle)
    canvas.__onMouseUp(e)
    var e2 = {
      clientX: 240,
      clientY: 140,
      which: 1,
      target: canvas.upperCanvasEl,
      shiftKey: true
    }
    canvas.__onMouseDown(e2)
    var selection = canvas.getActiveObjects()
    expect(selection[1]).toEqual(blueCircle)
    expect(selection[0]).toEqual(redCircle)
    canvas.__onMouseUp(e2)
    var e3 = {
      clientX: 140,
      clientY: 90,
      which: 1,
      target: canvas.upperCanvasEl,
      shiftKey: true
    }
    canvas.__onMouseDown(e3)
    var selection = canvas.getActiveObjects()
    canvas.on("mouse:down", function (options) {
      expect(options.target).toEqual(greenRect)
    })
    expect(selection[1]).toEqual(blueCircle)
    expect(selection[0]).toEqual(redCircle)
    expect(selection.length).toEqual(2)
    canvas.__onMouseUp(e3)
    var e4 = {
      clientX: 290,
      clientY: 290,
      which: 1,
      target: canvas.upperCanvasEl
    }
    canvas.__onMouseDown(e4)
    var selection = canvas.getActiveObjects()
    canvas.on("mouse:down", function (options) {
      expect(options.target).toEqual(greenRect)
    })
    expect(selection.length).toEqual(0)
    canvas.__onMouseUp(e4)
  })

  test("specific bug #6314 for partial intersection with drag", function () {
    var canvas = (this.canvas = new fabric.Canvas(null, {
      enableRetinaScaling: false,
      width: 600,
      height: 600
    }))
    var renderRequested = false
    var greenRect = new fabric.Rect({
      width: 300,
      height: 300,
      left: 50,
      top: 0,
      fill: "green"
    })
    canvas.add(greenRect)
    canvas._onMouseDown({
      clientX: 25,
      clientY: 25,
      which: 1,
      target: canvas.upperCanvasEl
    })
    canvas._onMouseMove({
      clientX: 30,
      clientY: 30,
      which: 1,
      target: canvas.upperCanvasEl
    })
    canvas._onMouseMove({
      clientX: 100,
      clientY: 50,
      which: 1,
      target: canvas.upperCanvasEl
    })
    canvas.requestRenderAll = function () {
      renderRequested = true
    }
    canvas._onMouseUp({
      clientX: 100,
      clientY: 50,
      which: 1,
      target: canvas.upperCanvasEl
    })
    expect(renderRequested).toEqual(true)
  })

  test("mouse:up isClick = true", function () {
    var e = { clientX: 30, clientY: 30, which: 1, target: canvas.upperCanvasEl }
    var isClick = false
    canvas.on("mouse:up", function (opt) {
      isClick = opt.isClick
    })
    canvas.__onMouseDown(e)
    canvas.__onMouseUp(e)
    expect(isClick).toEqual(true)
  })

  test("setDimensions and active brush", function () {
    var prepareFor = false
    var rendered = false
    var canva = new fabric.Canvas(null, { width: 500, height: 500 })
    var brush = new fabric.PencilBrush({ color: "red", width: 4 })
    canva.isDrawingMode = true
    canva.freeDrawingBrush = brush
    canva._isCurrentlyDrawing = true
    brush._render = function () {
      rendered = true
    }
    brush._setBrushStyles = function () {
      prepareFor = true
    }
    canva.setDimensions({ width: 200, height: 200 })
    canva.renderAll()
    expect(rendered).toEqual(true)
    expect(prepareFor).toEqual(true)
  })

  test("mouse:up isClick = false", function () {
    var e = { clientX: 30, clientY: 30, which: 1 }
    var e2 = { clientX: 31, clientY: 31, which: 1 }
    var isClick = true
    canvas.on("mouse:up", function (opt) {
      isClick = opt.isClick
    })
    canvas.__onMouseDown(e)
    canvas.__onMouseMove(e2)
    canvas.__onMouseUp(e2)
    expect(isClick).toEqual(false)
  })

  test("mouse:up should return target and currentTarget", function () {
    var e1 = { clientX: 30, clientY: 30, which: 1 }
    var e2 = { clientX: 100, clientY: 100, which: 1 }
    var rect1 = new fabric.Rect({
      left: 0,
      top: 0,
      width: 50,
      height: 50,
      lockMovementX: true,
      lockMovementY: true
    })
    var rect2 = new fabric.Rect({ left: 75, top: 75, width: 50, height: 50 })
    canvas.add(rect1)
    canvas.add(rect2)
    var opt
    canvas.on("mouse:up", function (_opt) {
      opt = _opt
    })
    canvas.__onMouseDown(e1)
    canvas.__onMouseMove(e2)
    canvas.__onMouseUp(e2)
    expect(opt.target).toEqual(rect1)
    expect(opt.currentTarget).toEqual(rect2)
  })

  test("fires object:modified and object:moved", function () {
    var e = { clientX: 30, clientY: 30, which: 1 }
    var e2 = { clientX: 31, clientY: 31, which: 1 }
    var rect = new fabric.Rect({ left: 0, top: 0, width: 50, height: 50 })
    canvas.add(rect)
    var count = 0
    var count2 = 0
    var opt
    canvas.on("object:modified", function (_opt) {
      count++
      opt = _opt
    })
    canvas.on("object:moved", function (_opt) {
      count2++
      opt = _opt
    })
    canvas.__onMouseDown(e)
    canvas.__onMouseMove(e2)
    canvas.__onMouseUp(e2)
    expect(count).toEqual(1)
    expect(opt.e).toEqual(e2)
    expect(opt.target).toEqual(rect)
    expect(opt.transform.action).toEqual("drag")
    expect(count2).toEqual(1)
  })

  test("drag small object when mousemove + drag, not active", function () {
    var e = { clientX: 2, clientY: 2, which: 1 }
    var e1 = { clientX: 4, clientY: 4, which: 1 }
    var e2 = { clientX: 6, clientY: 6, which: 1 }
    var rect = new fabric.Rect({
      left: 0,
      top: 0,
      width: 3,
      height: 3,
      strokeWidth: 0
    })
    canvas.add(rect)
    canvas.__onMouseDown(e)
    canvas.__onMouseMove(e1)
    canvas.__onMouseMove(e2)
    canvas.__onMouseUp(e2)
    expect(rect.top).toEqual(4)
    expect(rect.left).toEqual(4)
    expect(rect.scaleX).toEqual(1)
    expect(rect.scaleY).toEqual(1)
  })

  test("scale small object when mousemove + drag, active", function () {
    var e = { clientX: 3, clientY: 3, which: 1 }
    var e1 = { clientX: 6, clientY: 6, which: 1 }
    var e2 = { clientX: 9, clientY: 9, which: 1 }
    var rect = new fabric.Rect({
      left: 0,
      top: 0,
      width: 3,
      height: 3,
      strokeWidth: 0
    })
    expect(rect.scaleX).toEqual(1)
    expect(rect.scaleY).toEqual(1)
    canvas.add(rect)
    canvas.setActiveObject(rect)
    canvas.__onMouseDown(e)
    canvas.__onMouseMove(e1)
    canvas.__onMouseMove(e2)
    canvas.__onMouseUp(e2)
    expect(rect.scaleX).toEqual(3)
    expect(rect.scaleY).toEqual(3)
  })

  test("avoid multiple bindings", function () {
    var c = new fabric.Canvas()
    var eventsArray = [
      c._onMouseDown,
      c._onMouseMove,
      c._onMouseUp,
      c._onResize,
      c._onGesture,
      c._onDrag,
      c._onShake,
      c._onLongPress,
      c._onOrientationChange,
      c._onMouseWheel,
      c._onMouseOut,
      c._onMouseEnter,
      c._onContextMenu,
      c._onDragOver,
      c._onDragEnter,
      c._onDragLeave,
      c._onDrop
    ]
    // initialize canvas more than once
    c.initialize()
    c.initialize()
    var eventsArray2 = [
      c._onMouseDown,
      c._onMouseMove,
      c._onMouseUp,
      c._onResize,
      c._onGesture,
      c._onDrag,
      c._onShake,
      c._onLongPress,
      c._onOrientationChange,
      c._onMouseWheel,
      c._onMouseOut,
      c._onMouseEnter,
      c._onContextMenu,
      c._onDragOver,
      c._onDragEnter,
      c._onDragLeave,
      c._onDrop
    ]
    expect(eventsArray).toEqual(eventsArray2)
  })
  ;["DragEnter", "DragLeave", "DragOver", "Drop"].forEach(function (eventType) {
    test("avoid multiple registration - " + eventType, function () {
      var funcName = "_on" + eventType
      var eventName = eventType.toLowerCase()
      var counter = 0
      var c = new fabric.Canvas()
      c[funcName] = function () {
        counter++
      }
      // initialize canvas more than once
      c.initialize(c.lowerCanvasEl)
      c.initialize(c.lowerCanvasEl)
      var event = fabric.document.createEvent("HTMLEvents")
      event.initEvent(eventName, true, true)
      c.upperCanvasEl.dispatchEvent(event)
      expect(counter).toEqual(1)
    })
  })
  ;["DragEnter", "DragLeave", "DragOver", "Drop"].forEach(function (eventType) {
    test("Fabric event fired - " + eventType, function () {
      var eventName = eventType.toLowerCase()
      var counter = 0
      var c = new fabric.Canvas()
      c.on(eventName, function () {
        counter++
      })
      var event = fabric.document.createEvent("HTMLEvents")
      event.initEvent(eventName, true, true)
      c.upperCanvasEl.dispatchEvent(event)
      expect(counter).toEqual(1)
    })
  })
  ;["DragEnter", "DragLeave", "DragOver", "Drop"].forEach(function (eventType) {
    test(
      "_simpleEventHandler fires on object and canvas" + eventType,
      function () {
        var eventName = eventType.toLowerCase()
        var counter = 0
        var target
        var c = new fabric.Canvas()
        var rect = new fabric.Rect({ width: 10, height: 10 })
        c.add(rect)
        rect.on(eventName, function () {
          counter++
        })
        c.on(eventName, function (opt) {
          target = opt.target
        })
        var event = fabric.document.createEvent("HTMLEvents")
        event.initEvent(eventName, true, true)
        event.clientX = 5
        event.clientY = 5
        c.upperCanvasEl.dispatchEvent(event)
        expect(counter).toEqual(1)
        expect(target).toEqual(rect)
      }
    )
  })
  ;["mousedown", "mousemove", "wheel", "dblclick"].forEach(function (
    eventType
  ) {
    test("Fabric event fired - " + eventType, function () {
      var eventname = eventType.slice(0, 5) + ":" + eventType.slice(5)
      if (eventType === "wheel" || eventType === "dblclick") {
        eventname = "mouse:" + eventType
      }
      var target
      if (eventType === "mouseenter") {
        eventname = "mouse:over"
      }
      var counter = 0
      var c = new fabric.Canvas()
      var rect = new fabric.Rect({ top: -4, left: -4, width: 12, height: 12 })
      c.add(rect)
      c.on(eventname, function (opt) {
        counter++
        target = opt.target
      })
      var event = fabric.document.createEvent("HTMLEvents")
      event.initEvent(eventType, true, true)
      event.clientX = 5
      event.clientY = 5
      c.upperCanvasEl.dispatchEvent(event)
      expect(counter).toEqual(1)
      expect(target).toEqual(rect)
    })
  })
  ;["mouseout", "mouseenter"].forEach(function (eventType) {
    test("Fabric event fired - " + eventType, function () {
      var eventname = eventType.slice(0, 5) + ":" + eventType.slice(5)
      if (eventType === "mouseenter") {
        eventname = "mouse:over"
      }
      var counter = 0
      var c = new fabric.Canvas()
      c.on(eventname, function () {
        counter++
      })
      var event = fabric.document.createEvent("HTMLEvents")
      event.initEvent(eventType, true, true)
      c.upperCanvasEl.dispatchEvent(event)
      expect(counter).toEqual(1)
    })
  })

  test("mouseover and mouseout with subtarget check", function () {
    var rect1 = new fabric.Rect({
      width: 5,
      height: 5,
      left: 5,
      top: 0,
      strokeWidth: 0,
      name: "rect1"
    })
    var rect2 = new fabric.Rect({
      width: 5,
      height: 5,
      left: 5,
      top: 5,
      strokeWidth: 0,
      name: "rect2"
    })
    var rect3 = new fabric.Rect({
      width: 5,
      height: 5,
      left: 0,
      top: 5,
      strokeWidth: 0,
      name: "rect3"
    })
    var rect4 = new fabric.Rect({
      width: 5,
      height: 5,
      left: 0,
      top: 0,
      strokeWidth: 0,
      name: "rect4"
    })
    var rect5 = new fabric.Rect({
      width: 5,
      height: 5,
      left: 2.5,
      top: 2.5,
      strokeWidth: 0,
      name: "rect5"
    })
    var group1 = new fabric.Group([rect1, rect2], {
      subTargetCheck: true,
      name: "group1"
    })
    var group2 = new fabric.Group([rect3, rect4], {
      subTargetCheck: true,
      name: "group2"
    })
    // a group with 2 groups, with 2 rects each, one group left one group right
    // each with 2 rects vertically aligned
    var group = new fabric.Group([group1, group2], {
      subTargetCheck: true,
      name: "group"
    })
    var c = new fabric.Canvas()
    var targetArray = []
    var targetOutArray = []
    ;[rect1, rect2, rect3, rect4, rect5, group1, group2, group].forEach(
      function (t) {
        t.on("mouseover", function (opt) {
          targetArray.push(opt.target)
        })
        t.on("mouseout", function (opt) {
          targetOutArray.push(opt.target)
        })
      }
    )
    c.add(group, rect5)
    simulateEvent(c.upperCanvasEl, "mousemove", {
      pointerX: 1,
      pointerY: 1
    })
    expect(targetArray[0]).toEqual(group)
    expect(targetArray[2]).toEqual(group2)
    expect(targetArray[1]).toEqual(rect4)
    expect(targetOutArray.length).toEqual(0)

    targetArray = []
    targetOutArray = []
    simulateEvent(c.upperCanvasEl, "mousemove", {
      pointerX: 5,
      pointerY: 5
    })
    expect(targetArray[0]).toEqual(rect5)
    expect(targetArray.length).toEqual(1)
    expect(targetOutArray[0]).toEqual(group)
    expect(targetOutArray[2]).toEqual(group2)
    expect(targetOutArray[1]).toEqual(rect4)

    targetArray = []
    targetOutArray = []
    simulateEvent(c.upperCanvasEl, "mousemove", {
      pointerX: 9,
      pointerY: 9
    })
    expect(targetArray[0]).toEqual(group)
    expect(targetArray[2]).toEqual(group1)
    expect(targetArray[1]).toEqual(rect2)
    expect(targetOutArray.length).toEqual(1)
    expect(targetOutArray[0]).toEqual(rect5)

    targetArray = []
    targetOutArray = []
    simulateEvent(c.upperCanvasEl, "mousemove", {
      pointerX: 9,
      pointerY: 1
    })
    expect(targetArray[0]).toEqual(rect1)
    expect(targetArray.length).toEqual(1)
    expect(targetOutArray.length).toEqual(1)
    expect(targetOutArray[0]).toEqual(rect2)
  })

  test("Fabric mouseover, mouseout events fire for subTargets when subTargetCheck is enabled", function () {
    var counterOver = 0,
      counterOut = 0,
      canvas = new fabric.Canvas()
    function setSubTargetCheckRecursive(obj) {
      if (obj._objects) {
        obj._objects.forEach(setSubTargetCheckRecursive)
      }
      obj.subTargetCheck = true
      obj.on("mouseover", function () {
        counterOver++
      })
      obj.on("mouseout", function () {
        counterOut++
      })
    }
    canvas.loadFromJSON(SUB_TARGETS_JSON, function () {
      var activeSelection = new fabric.ActiveSelection(canvas.getObjects(), {
        canvas: canvas
      })
      canvas.setActiveObject(activeSelection)
      setSubTargetCheckRecursive(activeSelection)

      // perform MouseOver event on a deeply nested subTarget
      var moveEvent = fabric.document.createEvent("HTMLEvents")
      moveEvent.initEvent("mousemove", true, true)
      var target = canvas.item(1)
      canvas.targets = [
        target.item(1),
        target.item(1).item(1),
        target.item(1).item(1).item(1)
      ]
      canvas._fireOverOutEvents(target, moveEvent)
      expect(counterOver).toEqual(4)
      expect(canvas._hoveredTarget).toEqual(target)
      expect(canvas._hoveredTargets.length).toEqual(3)

      // perform MouseOut even on all hoveredTargets
      canvas.targets = []
      canvas._fireOverOutEvents(null, moveEvent)
      expect(counterOut).toEqual(4)
      expect(canvas._hoveredTarget).toEqual(null)
      expect(canvas._hoveredTargets.length).toEqual(0)
    })
  })

  // TODO: test('mousemove: subTargetCheck: setCursorFromEvent considers subTargets')
  // TODO: test('mousemove: subTargetCheck: setCursorFromEvent considers subTargets in reverse order, so the top-most subTarget's .hoverCursor takes precedence')
  ;[
    "MouseDown",
    "MouseMove",
    "MouseOut",
    "MouseEnter",
    "MouseWheel",
    "DoubleClick"
  ].forEach(function (eventType) {
    test("avoid multiple registration - " + eventType, function () {
      var funcName = "_on" + eventType
      var eventName = eventType.toLowerCase()
      if (eventType === "DoubleClick") {
        eventName = "dblclick"
      }
      if (eventType === "MouseWheel") {
        eventName = "wheel"
      }
      var counter = 0
      var c = new fabric.Canvas()
      c[funcName] = function () {
        counter++
      }
      // initialize canvas more than once
      c.initialize(c.lowerCanvasEl)
      c.initialize(c.lowerCanvasEl)
      var event = fabric.document.createEvent("MouseEvent")
      event.initEvent(eventName, true, true)
      c.upperCanvasEl.dispatchEvent(event)
      expect(counter).toEqual(1)
    })
  })

  test("avoid multiple registration - mouseup", function (done) {
    var originalMouseUp = fabric.Canvas.prototype._onMouseUp
    var counter = 0
    fabric.Canvas.prototype._onMouseUp = function () {
      counter++
    }
    var c = new fabric.Canvas()
    // initialize canvas more than once
    c.initialize(c.lowerCanvasEl)
    c.initialize(c.lowerCanvasEl)

    // a mouse down is necessary to register mouse up.
    var _event = fabric.document.createEvent("MouseEvent")
    _event.initEvent("mousedown", true, true)
    c.upperCanvasEl.dispatchEvent(_event)
    setTimeout(function () {
      var event = fabric.document.createEvent("MouseEvent")
      event.initEvent("mouseup", true, true)
      fabric.document.dispatchEvent(event)
      expect(counter).toEqual(1)
      fabric.Canvas.prototype._onMouseUp = originalMouseUp
      c.cancelRequestedRender()
      done()
    }, 200)
  })

  test("mouseEnter removes _hoveredTarget", function () {
    var event = fabric.document.createEvent("MouseEvent")
    event.initEvent("mouseenter", true, true)
    var c = new fabric.Canvas()
    c._hoveredTarget = new fabric.Object()
    c.upperCanvasEl.dispatchEvent(event)
    expect(c._hoveredTarget).toEqual(null)
  })

  test("mouseEnter does not remove _hoveredTarget if a transform is happening", function () {
    var event = fabric.document.createEvent("MouseEvent")
    event.initEvent("mouseenter", true, true)
    var c = new fabric.Canvas()
    var obj = new fabric.Object()
    c._hoveredTarget = obj
    c.currentTransform = {}
    c.upperCanvasEl.dispatchEvent(event)
    expect(c._hoveredTarget).toEqual(obj)
  })

  test("mouseEnter removes __corner", function () {
    var event = fabric.document.createEvent("MouseEvent")
    event.initEvent("mouseenter", true, true)
    var c = new fabric.Canvas()
    var obj = new fabric.Object({ top: 100, left: 100 })
    c.add(obj)
    c.setActiveObject(obj)
    obj.__corner = "test"
    c.upperCanvasEl.dispatchEvent(event)
    expect(obj.__corner).toEqual(0)
  })

  test("mouseEnter does not removes __corner if there is a transform", function () {
    var event = fabric.document.createEvent("MouseEvent")
    event.initEvent("mouseenter", true, true)
    var c = new fabric.Canvas()
    var obj = new fabric.Object()
    c.currentTransform = {}
    c.setActiveObject(obj)
    obj.__corner = "test"
    c.upperCanvasEl.dispatchEvent(event)
    expect(obj.__corner).toEqual("test")
  })

  test("avoid multiple events on window", function () {
    var originalResize = fabric.Canvas.prototype._onResize
    var counter = 0
    fabric.Canvas.prototype._onResize = function () {
      counter++
    }
    var c = new fabric.Canvas()
    // initialize canvas more than once
    c.initialize(c.lowerCanvasEl)
    c.initialize(c.lowerCanvasEl)
    var event = fabric.document.createEvent("UIEvents")
    event.initUIEvent("resize", true, false, fabric.window, 0)
    fabric.window.dispatchEvent(event)
    expect(counter).toEqual(1)
    fabric.Canvas.prototype._onResize = originalResize
  })

  // this test is important. As today we do not havenymore a unique function that give us the
  // status of the action. that logic is replicated in style handler and action handler.
  // this is a cleanup of the current work that we need to do.
  // this wasn't a user facing feature, although the method was public and documented in JSDOCS
  // test('actionIsDisabled ', function() {
  //   .ok(typeof fabric.Canvas.prototype.actionIsDisabled === 'function', 'actionIsDisabled is a function');
  //   var key = canvas.altActionKey;
  //   var target = new fabric.Object();
  //   var e = { };
  //   e[key] = false;
  //   .equal(!!canvas.actionIsDisabled('mt', target, e), false, 'action is not disabled');
  //   .equal(!!canvas.actionIsDisabled('mb', target, e), false, 'action is not disabled');
  //   .equal(!!canvas.actionIsDisabled('ml', target, e), false, 'action is not disabled');
  //   .equal(!!canvas.actionIsDisabled('mr', target, e), false, 'action is not disabled');
  //   .equal(!!canvas.actionIsDisabled('tl', target, e), false, 'action is not disabled');
  //   .equal(!!canvas.actionIsDisabled('tr', target, e), false, 'action is not disabled');
  //   .equal(!!canvas.actionIsDisabled('bl', target, e), false, 'action is not disabled');
  //   .equal(!!canvas.actionIsDisabled('br', target, e), false, 'action is not disabled');
  //   .equal(!!canvas.actionIsDisabled('mtr', target, e), false, 'action is not disabled');
  //   target = new fabric.Object();
  //   target.lockScalingX = true;
  //
  //   .equal(!!canvas.actionIsDisabled('mt', target, e), false, 'mt action is not disabled lockScalingX');
  //   .equal(!!canvas.actionIsDisabled('mb', target, e), false, 'mb action is not disabled lockScalingX');
  //   .equal(!!canvas.actionIsDisabled('ml', target, e), true, 'ml action is disabled lockScalingX');
  //   .equal(!!canvas.actionIsDisabled('mr', target, e), true, 'mr action is disabled lockScalingX');
  //   .equal(!!canvas.actionIsDisabled('tl', target, e), true, 'tl action is disabled lockScalingX');
  //   .equal(!!canvas.actionIsDisabled('tr', target, e), true, 'tr action is disabled lockScalingX');
  //   .equal(!!canvas.actionIsDisabled('bl', target, e), true, 'bl action is disabled lockScalingX');
  //   .equal(!!canvas.actionIsDisabled('br', target, e), true, 'br action is disabled lockScalingX');
  //   .equal(!!canvas.actionIsDisabled('mtr', target, e), false, 'mtr action is not disabled lockScalingX');
  //   target = new fabric.Object();
  //   target.lockScalingY = true;
  //   .equal(!!canvas.actionIsDisabled('mt', target, e), true, 'mt action is disabled lockScalingY');
  //   .equal(!!canvas.actionIsDisabled('mb', target, e), true, 'mb action is disabled lockScalingY');
  //   .equal(!!canvas.actionIsDisabled('ml', target, e), false, 'ml action is not disabled lockScalingY');
  //   .equal(!!canvas.actionIsDisabled('mr', target, e), false, 'mr action is not disabled lockScalingY');
  //   .equal(!!canvas.actionIsDisabled('tl', target, e), true, 'tl action is not disabled lockScalingY');
  //   .equal(!!canvas.actionIsDisabled('tr', target, e), true, 'tr action is not disabled lockScalingY');
  //   .equal(!!canvas.actionIsDisabled('bl', target, e), true, 'bl action is not disabled lockScalingY');
  //   .equal(!!canvas.actionIsDisabled('br', target, e), true, 'br action is not disabled lockScalingY');
  //   .equal(!!canvas.actionIsDisabled('mtr', target, e), false, 'mtr action is not disabledlockScalingY');
  //   target = new fabric.Object();
  //   target.lockScalingY = true;
  //   target.lockScalingX = true;
  //   .equal(!!canvas.actionIsDisabled('mt', target, e), true, 'mt action is disabled scaling locked');
  //   .equal(!!canvas.actionIsDisabled('mb', target, e), true, 'mb action is disabled scaling locked');
  //   .equal(!!canvas.actionIsDisabled('ml', target, e), true, 'ml action is disabled scaling locked');
  //   .equal(!!canvas.actionIsDisabled('mr', target, e), true, 'mr action is disabled scaling locked');
  //   .equal(!!canvas.actionIsDisabled('tl', target, e), true, 'tl action is disabled scaling locked');
  //   .equal(!!canvas.actionIsDisabled('tr', target, e), true, 'tr action is disabled scaling locked');
  //   .equal(!!canvas.actionIsDisabled('bl', target, e), true, 'bl action is disabled scaling locked');
  //   .equal(!!canvas.actionIsDisabled('br', target, e), true, 'br action is disabled scaling locked');
  //   .equal(!!canvas.actionIsDisabled('mtr', target, e), false, 'mtr action is not disabled scaling locked');
  //   target = new fabric.Object();
  //   target.lockRotation = true;
  //   .equal(!!canvas.actionIsDisabled('mt', target, e), false, 'mt action is not disabled lockRotation');
  //   .equal(!!canvas.actionIsDisabled('mb', target, e), false, 'mb action is not disabled lockRotation');
  //   .equal(!!canvas.actionIsDisabled('ml', target, e), false, 'ml action is not disabled lockRotation');
  //   .equal(!!canvas.actionIsDisabled('mr', target, e), false, 'mr action is not disabled lockRotation');
  //   .equal(!!canvas.actionIsDisabled('tl', target, e), false, 'tl action is not disabled lockRotation');
  //   .equal(!!canvas.actionIsDisabled('tr', target, e), false, 'tr action is not disabled lockRotation');
  //   .equal(!!canvas.actionIsDisabled('bl', target, e), false, 'bl action is not disabled lockRotation');
  //   .equal(!!canvas.actionIsDisabled('br', target, e), false, 'br action is not disabled lockRotation');
  //   .equal(!!canvas.actionIsDisabled('mtr', target, e), true, 'mtr action is disabled lockRotation');
  //   target = new fabric.Object();
  //   target.lockSkewingX = true;
  //   target.lockSkewingY = true;
  //   .equal(!!canvas.actionIsDisabled('mt', target, e), false, 'mt action is not disabled lockSkewing');
  //   .equal(!!canvas.actionIsDisabled('mb', target, e), false, 'mb action is not disabled lockSkewing');
  //   .equal(!!canvas.actionIsDisabled('ml', target, e), false, 'ml action is not disabled lockSkewing');
  //   .equal(!!canvas.actionIsDisabled('mr', target, e), false, 'mr action is not disabled lockSkewing');
  //   .equal(!!canvas.actionIsDisabled('tl', target, e), false, 'tl action is not disabled lockSkewing');
  //   .equal(!!canvas.actionIsDisabled('tr', target, e), false, 'tr action is not disabled lockSkewing');
  //   .equal(!!canvas.actionIsDisabled('bl', target, e), false, 'bl action is not disabled lockSkewing');
  //   .equal(!!canvas.actionIsDisabled('br', target, e), false, 'br action is not disabled lockSkewing');
  //   .equal(!!canvas.actionIsDisabled('mtr', target, e), false, 'mtr action is not disabled lockSkewing');
  //   e[key] = true;
  //   target = new fabric.Object();
  //   target.lockSkewingY = true;
  //   .equal(!!canvas.actionIsDisabled('mt', target, e), false, 'mt action is not disabled lockSkewingY');
  //   .equal(!!canvas.actionIsDisabled('mb', target, e), false, 'mb action is not disabled lockSkewingY');
  //   .equal(!!canvas.actionIsDisabled('ml', target, e), true, 'ml action is disabled lockSkewingY');
  //   .equal(!!canvas.actionIsDisabled('mr', target, e), true, 'mr action is disabled lockSkewingY');
  //   .equal(!!canvas.actionIsDisabled('tl', target, e), false, 'tl action is not disabled lockSkewingY');
  //   .equal(!!canvas.actionIsDisabled('tr', target, e), false, 'tr action is not disabled lockSkewingY');
  //   .equal(!!canvas.actionIsDisabled('bl', target, e), false, 'bl action is not disabled lockSkewingY');
  //   .equal(!!canvas.actionIsDisabled('br', target, e), false, 'br action is not disabled lockSkewingY');
  //   .equal(!!canvas.actionIsDisabled('mtr', target, e), false, 'mtr action is not disabled lockSkewingY');
  //
  //   e[key] = true;
  //   target = new fabric.Object();
  //   target.lockSkewingX = true;
  //   .equal(!!canvas.actionIsDisabled('mt', target, e), true, 'mt action is disabled lockSkewingX');
  //   .equal(!!canvas.actionIsDisabled('mb', target, e), true, 'mb action is disabled lockSkewingX');
  //   .equal(!!canvas.actionIsDisabled('ml', target, e), false, 'ml action is not disabled lockSkewingX');
  //   .equal(!!canvas.actionIsDisabled('mr', target, e), false, 'mr action is not disabled lockSkewingX');
  //   .equal(!!canvas.actionIsDisabled('tl', target, e), false, 'tl action is not disabled lockSkewingX');
  //   .equal(!!canvas.actionIsDisabled('tr', target, e), false, 'tr action is not disabled lockSkewingX');
  //   .equal(!!canvas.actionIsDisabled('bl', target, e), false, 'bl action is not disabled lockSkewingX');
  //   .equal(!!canvas.actionIsDisabled('br', target, e), false, 'br action is not disabled lockSkewingX');
  //   .equal(!!canvas.actionIsDisabled('mtr', target, e), false, 'mtr action is not disabled lockSkewingX');
  // });

  test("getCornerCursor ", function () {
    expect(
      typeof fabric.Canvas.prototype.getCornerCursor === "function"
    ).toBeTruthy()
    var key = canvas.altActionKey
    var key2 = canvas.uniScaleKey
    var target = new fabric.Object({ canvas: canvas })
    var e = {}
    e[key] = false
    expect(canvas.getCornerCursor("mt", target, e)).toEqual("n-resize")
    expect(canvas.getCornerCursor("mb", target, e)).toEqual("s-resize")
    expect(canvas.getCornerCursor("ml", target, e)).toEqual("w-resize")
    expect(canvas.getCornerCursor("mr", target, e)).toEqual("e-resize")
    expect(canvas.getCornerCursor("tl", target, e)).toEqual("nw-resize")
    expect(canvas.getCornerCursor("tr", target, e)).toEqual("ne-resize")
    expect(canvas.getCornerCursor("bl", target, e)).toEqual("sw-resize")
    expect(canvas.getCornerCursor("br", target, e)).toEqual("se-resize")
    expect(canvas.getCornerCursor("mtr", target, e)).toEqual("crosshair")

    target = new fabric.Object({ canvas: canvas })
    target.lockScalingX = true
    expect(canvas.getCornerCursor("mt", target, e)).toEqual("n-resize")
    expect(canvas.getCornerCursor("mb", target, e)).toEqual("s-resize")
    expect(canvas.getCornerCursor("ml", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("mr", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("tl", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("tr", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("bl", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("br", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("mtr", target, e)).toEqual("crosshair")
    e[key2] = true
    expect(canvas.getCornerCursor("tl", target, e)).toEqual("nw-resize")
    expect(canvas.getCornerCursor("tr", target, e)).toEqual("ne-resize")
    expect(canvas.getCornerCursor("bl", target, e)).toEqual("sw-resize")
    expect(canvas.getCornerCursor("br", target, e)).toEqual("se-resize")

    var e = {}
    target = new fabric.Object({ canvas: canvas })
    target.lockScalingY = true
    expect(canvas.getCornerCursor("mt", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("mb", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("ml", target, e)).toEqual("w-resize")
    expect(canvas.getCornerCursor("mr", target, e)).toEqual("e-resize")
    expect(canvas.getCornerCursor("tl", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("tr", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("bl", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("br", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("mtr", target, e)).toEqual("crosshair")
    e[key2] = true
    expect(canvas.getCornerCursor("tl", target, e)).toEqual("nw-resize")
    expect(canvas.getCornerCursor("tr", target, e)).toEqual("ne-resize")
    expect(canvas.getCornerCursor("bl", target, e)).toEqual("sw-resize")
    expect(canvas.getCornerCursor("br", target, e)).toEqual("se-resize")

    var e = {}
    target = new fabric.Object({ canvas: canvas })
    target.lockScalingY = true
    target.lockScalingX = true
    expect(canvas.getCornerCursor("mt", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("mb", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("ml", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("mr", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("tl", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("tr", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("bl", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("br", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("mtr", target, e)).toEqual("crosshair")
    e[key2] = true
    expect(canvas.getCornerCursor("tl", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("tr", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("bl", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("br", target, e)).toEqual("not-allowed")

    var e = {}
    target = new fabric.Object({ canvas: canvas })
    target.lockRotation = true
    expect(canvas.getCornerCursor("mt", target, e)).toEqual("n-resize")
    expect(canvas.getCornerCursor("mb", target, e)).toEqual("s-resize")
    expect(canvas.getCornerCursor("ml", target, e)).toEqual("w-resize")
    expect(canvas.getCornerCursor("mr", target, e)).toEqual("e-resize")
    expect(canvas.getCornerCursor("tl", target, e)).toEqual("nw-resize")
    expect(canvas.getCornerCursor("tr", target, e)).toEqual("ne-resize")
    expect(canvas.getCornerCursor("bl", target, e)).toEqual("sw-resize")
    expect(canvas.getCornerCursor("br", target, e)).toEqual("se-resize")
    expect(canvas.getCornerCursor("mtr", target, e)).toEqual("not-allowed")

    target = new fabric.Object({ canvas: canvas })
    target.lockSkewingX = true
    target.lockSkewingY = true
    expect(canvas.getCornerCursor("mt", target, e)).toEqual("n-resize")
    expect(canvas.getCornerCursor("mb", target, e)).toEqual("s-resize")
    expect(canvas.getCornerCursor("ml", target, e)).toEqual("w-resize")
    expect(canvas.getCornerCursor("mr", target, e)).toEqual("e-resize")
    expect(canvas.getCornerCursor("tl", target, e)).toEqual("nw-resize")
    expect(canvas.getCornerCursor("tr", target, e)).toEqual("ne-resize")
    expect(canvas.getCornerCursor("bl", target, e)).toEqual("sw-resize")
    expect(canvas.getCornerCursor("br", target, e)).toEqual("se-resize")
    expect(canvas.getCornerCursor("mtr", target, e)).toEqual("crosshair")

    e[key] = true
    target = new fabric.Object({ canvas: canvas })
    target.lockSkewingY = true
    expect(canvas.getCornerCursor("mt", target, e)).toEqual("ew-resize")
    expect(canvas.getCornerCursor("mb", target, e)).toEqual("ew-resize")
    expect(canvas.getCornerCursor("ml", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("mr", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("tl", target, e)).toEqual("nw-resize")
    expect(canvas.getCornerCursor("tr", target, e)).toEqual("ne-resize")
    expect(canvas.getCornerCursor("bl", target, e)).toEqual("sw-resize")
    expect(canvas.getCornerCursor("br", target, e)).toEqual("se-resize")
    expect(canvas.getCornerCursor("mtr", target, e)).toEqual("crosshair")

    e[key] = true
    target = new fabric.Object({ canvas: canvas })
    target.lockSkewingX = true
    expect(canvas.getCornerCursor("mt", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("mb", target, e)).toEqual("not-allowed")
    expect(canvas.getCornerCursor("ml", target, e)).toEqual("ns-resize")
    expect(canvas.getCornerCursor("mr", target, e)).toEqual("ns-resize")
    expect(canvas.getCornerCursor("tl", target, e)).toEqual("nw-resize")
    expect(canvas.getCornerCursor("tr", target, e)).toEqual("ne-resize")
    expect(canvas.getCornerCursor("bl", target, e)).toEqual("sw-resize")
    expect(canvas.getCornerCursor("br", target, e)).toEqual("se-resize")
    expect(canvas.getCornerCursor("mtr", target, e)).toEqual("crosshair")
  })
  test("_addEventOptions return the correct event name", function () {
    var opt = {}
    expect(canvas._addEventOptions(opt, { action: "scaleX" })).toEqual("scaled")
    expect(opt.by).toEqual("x")
    expect(canvas._addEventOptions(opt, { action: "scaleY" })).toEqual("scaled")
    expect(opt.by).toEqual("y")
    expect(canvas._addEventOptions(opt, { action: "scale" })).toEqual("scaled")
    expect(opt.by).toEqual("equally")
    expect(canvas._addEventOptions(opt, { action: "skewX" })).toEqual("skewed")
    expect(opt.by).toEqual("x")
    expect(canvas._addEventOptions(opt, { action: "skewY" })).toEqual("skewed")
    expect(opt.by).toEqual("y")
    expect(canvas._addEventOptions(opt, { action: "rotate" })).toEqual(
      "rotated"
    )
    expect(opt.by).toEqual(undefined)
    expect(canvas._addEventOptions(opt, { action: "drag" })).toEqual("moved")
    expect(opt.by).toEqual(undefined)
  })
})
