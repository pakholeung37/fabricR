var EMPTY_JSON = '{"version":"' + fabric.version + '","objects":[]}'

// var emptyImageCanvasData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAH7ElEQVR4nO3VMQ0AMAzAsPInvYHoMS2yEeTLHADge/M6AADYM3QACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIMHQACDB0AAgwdAAIuMjH4b7osLFBAAAAAElFTkSuQmCC";

var PATH_JSON =
  '{"version":"' +
  fabric.version +
  '","objects": [{"version":"' +
  fabric.version +
  '","type": "path", "originX": "left", "originY": "top", "left": 268, "top": 266, "width": 51, "height": 49,' +
  ' "fill": "rgb(0,0,0)", "stroke": null, "strokeWidth": 1, "scaleX": 1, "scaleY": 1, ' +
  '"angle": 0, "flipX": false, "flipY": false, "opacity": 1, "path": [["M", 18.511, 13.99],' +
  ' ["c", 0, 0, -2.269, -4.487, -12.643, 4.411], ["c", 0, 0, 4.824, -14.161, 19.222, -9.059],' +
  ' ["l", 0.379, -2.1], ["c", -0.759, -0.405, -1.375, -1.139, -1.645, -2.117], ["c", -0.531, ' +
  '-1.864, 0.371, -3.854, 1.999, -4.453], ["c", 0.312, -0.118, 0.633, -0.169, 0.953, -0.169], ' +
  '["c", 1.299, 0, 2.514, 0.953, 2.936, 2.455], ["c", 0.522, 1.864, -0.372, 3.854, -1.999, ' +
  '4.453], ["c", -0.229, 0.084, -0.464, 0.127, -0.692, 0.152], ["l", -0.379, 2.37], ["c", ' +
  '1.146, 0.625, 2.024, 1.569, 2.674, 2.758], ["c", 3.213, 2.514, 8.561, 4.184, 11.774, -8.232],' +
  ' ["c", 0, 0, 0.86, 16.059, -12.424, 14.533], ["c", 0.008, 2.859, 0.615, 5.364, -0.076, 8.224],' +
  ' ["c", 8.679, 3.146, 15.376, 14.389, 17.897, 18.168], ["l", 2.497, -2.151], ["l", 1.206, 1.839],' +
  ' ["l", -3.889, 3.458], ["C", 46.286, 48.503, 31.036, 32.225, 22.72, 35.81], ["c", -1.307, 2.851,' +
  ' -3.56, 6.891, -7.481, 8.848], ["c", -4.689, 2.336, -9.084, -0.802, -11.277, -2.868], ["l",' +
  ' -1.948, 3.104], ["l", -1.628, -1.333], ["l", 3.138, -4.689], ["c", 0.025, 0, 9, 1.932, 9, 1.932], ' +
  '["c", 0.877, -9.979, 2.893, -12.905, 4.942, -15.621], ["C", 17.878, 21.775, 18.713, 17.397, 18.511, ' +
  '13.99], ["z", null]]}], "background": "#ff5555","overlay": "rgba(0,0,0,0.2)"}'

var PATH_WITHOUT_DEFAULTS_JSON =
  '{"version":"' +
  fabric.version +
  '","objects": [{"version":"' +
  fabric.version +
  '","type": "path", "left": 268, "top": 266, "width": 51, "height": 49, "path": [["M", 18.511, 13.99],' +
  ' ["c", 0, 0, -2.269, -4.487, -12.643, 4.411], ["c", 0, 0, 4.824, -14.161, 19.222, -9.059],' +
  ' ["l", 0.379, -2.1], ["c", -0.759, -0.405, -1.375, -1.139, -1.645, -2.117], ["c", -0.531, ' +
  '-1.864, 0.371, -3.854, 1.999, -4.453], ["c", 0.312, -0.118, 0.633, -0.169, 0.953, -0.169], ' +
  '["c", 1.299, 0, 2.514, 0.953, 2.936, 2.455], ["c", 0.522, 1.864, -0.372, 3.854, -1.999, ' +
  '4.453], ["c", -0.229, 0.084, -0.464, 0.127, -0.692, 0.152], ["l", -0.379, 2.37], ["c", ' +
  '1.146, 0.625, 2.024, 1.569, 2.674, 2.758], ["c", 3.213, 2.514, 8.561, 4.184, 11.774, -8.232],' +
  ' ["c", 0, 0, 0.86, 16.059, -12.424, 14.533], ["c", 0.008, 2.859, 0.615, 5.364, -0.076, 8.224],' +
  ' ["c", 8.679, 3.146, 15.376, 14.389, 17.897, 18.168], ["l", 2.497, -2.151], ["l", 1.206, 1.839],' +
  ' ["l", -3.889, 3.458], ["C", 46.286, 48.503, 31.036, 32.225, 22.72, 35.81], ["c", -1.307, 2.851,' +
  ' -3.56, 6.891, -7.481, 8.848], ["c", -4.689, 2.336, -9.084, -0.802, -11.277, -2.868], ["l",' +
  ' -1.948, 3.104], ["l", -1.628, -1.333], ["l", 3.138, -4.689], ["c", 0.025, 0, 9, 1.932, 9, 1.932], ' +
  '["c", 0.877, -9.979, 2.893, -12.905, 4.942, -15.621], ["C", 17.878, 21.775, 18.713, 17.397, 18.511, ' +
  '13.99], ["z", null]]}], "background": "#ff5555","overlay": "rgba(0,0,0,0.2)"}'

var PATH_OBJ_JSON =
  '{"version":"' +
  fabric.version +
  '","type": "path", "originX": "left", "originY": "top", "left": 268, "top": 266, "width": 51, "height": 49,' +
  ' "fill": "rgb(0,0,0)", "stroke": null, "strokeWidth": 1, "scaleX": 1, "scaleY": 1, ' +
  '"angle": 0, "flipX": false, "flipY": false, "opacity": 1, "path": [["M", 18.511, 13.99],' +
  ' ["c", 0, 0, -2.269, -4.487, -12.643, 4.411], ["c", 0, 0, 4.824, -14.161, 19.222, -9.059],' +
  ' ["l", 0.379, -2.1], ["c", -0.759, -0.405, -1.375, -1.139, -1.645, -2.117], ["c", -0.531, ' +
  '-1.864, 0.371, -3.854, 1.999, -4.453], ["c", 0.312, -0.118, 0.633, -0.169, 0.953, -0.169], ' +
  '["c", 1.299, 0, 2.514, 0.953, 2.936, 2.455], ["c", 0.522, 1.864, -0.372, 3.854, -1.999, ' +
  '4.453], ["c", -0.229, 0.084, -0.464, 0.127, -0.692, 0.152], ["l", -0.379, 2.37], ["c", ' +
  '1.146, 0.625, 2.024, 1.569, 2.674, 2.758], ["c", 3.213, 2.514, 8.561, 4.184, 11.774, -8.232],' +
  ' ["c", 0, 0, 0.86, 16.059, -12.424, 14.533], ["c", 0.008, 2.859, 0.615, 5.364, -0.076, 8.224],' +
  ' ["c", 8.679, 3.146, 15.376, 14.389, 17.897, 18.168], ["l", 2.497, -2.151], ["l", 1.206, 1.839],' +
  ' ["l", -3.889, 3.458], ["C", 46.286, 48.503, 31.036, 32.225, 22.72, 35.81], ["c", -1.307, 2.851,' +
  ' -3.56, 6.891, -7.481, 8.848], ["c", -4.689, 2.336, -9.084, -0.802, -11.277, -2.868], ["l",' +
  ' -1.948, 3.104], ["l", -1.628, -1.333], ["l", 3.138, -4.689], ["c", 0.025, 0, 9, 1.932, 9, 1.932], ' +
  '["c", 0.877, -9.979, 2.893, -12.905, 4.942, -15.621], ["C", 17.878, 21.775, 18.713, 17.397, 18.511, ' +
  '13.99], ["z", null]]}'

var PATH_DATALESS_JSON =
  '{"version":"' +
  fabric.version +
  '","objects":[{"type":"path","version":"' +
  fabric.version +
  '","originX":"left","originY":"top","left":99.5,"top":99.5,"width":200,"height":200,"fill":"rgb(0,0,0)",' +
  '"stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,' +
  '"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,' +
  '"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"sourcePath":"http://example.com/"}]}'

var RECT_JSON =
  '{"version":"' +
  fabric.version +
  '","objects":[{"type":"rect","version":"' +
  fabric.version +
  '","originX":"left","originY":"top","left":0,"top":0,"width":10,"height":10,"fill":"rgb(0,0,0)",' +
  '"stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,' +
  '"shadow":null,' +
  '"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"rx":0,"ry":0}],"background":"#ff5555","overlay":"rgba(0,0,0,0.2)"}'

function _createImageElement() {
  return fabric.document.createElement("img")
}

function getAbsolutePath(path) {
  var isAbsolute = /^https?:/.test(path)
  if (isAbsolute) {
    return path
  }
  var imgEl = _createImageElement()
  imgEl.src = path
  var src = imgEl.src
  imgEl = null
  return src
}

var IMG_SRC = fabric.isLikelyNode
  ? `file://${isWin ? "/" : ""}${path.posix.join(
      __dirname.replace(/\\/g, "/"),
      "/../fixtures/test_image.gif"
    )}`
  : getAbsolutePath("../fixtures/test_image.gif")

var canvas = new fabric.Canvas(null, {
  enableRetinaScaling: false,
  width: 600,
  height: 600
})
var upperCanvasEl = canvas.upperCanvasEl
var lowerCanvasEl = canvas.lowerCanvasEl

function makeRect(options) {
  var defaultOptions = { width: 10, height: 10 }
  return new fabric.Rect(
    fabric.util.object.extend(defaultOptions, options || {})
  )
}

function makeTriangle(options) {
  var defaultOptions = { width: 30, height: 30 }
  return new fabric.Triangle(
    fabric.util.object.extend(defaultOptions, options || {})
  )
}

describe("fabric.Canvas", () => {
  beforeEach(function () {
    upperCanvasEl.style.display = ""
    canvas.controlsAboveOverlay = fabric.Canvas.prototype.controlsAboveOverlay
    canvas.preserveObjectStacking =
      fabric.Canvas.prototype.preserveObjectStacking
  })
  afterEach(function () {
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
    canvas.clear()
    canvas.cancelRequestedRender()
    canvas.backgroundColor = fabric.Canvas.prototype.backgroundColor
    canvas.overlayColor = fabric.Canvas.prototype.overlayColor
    canvas._collectObjects = fabric.Canvas.prototype._collectObjects
    canvas.off()
    canvas.calcOffset()
    canvas.cancelRequestedRender()
    upperCanvasEl.style.display = "none"
  })
  test("initialProperties", function () {
    expect("backgroundColor" in canvas).toBeTruthy()
    expect(canvas.includeDefaultValues).toBe(true)
  })

  test("getObjects", function () {
    expect(typeof canvas.getObjects === "function").toBeTruthy()
    expect([]).toEqual(canvas.getObjects())
    expect(canvas.getObjects().length).toBe(0)
  })

  test("getElement", function () {
    expect(typeof canvas.getElement === "function").toBeTruthy()
    expect(canvas.getElement()).toBe(lowerCanvasEl)
  })

  test("item", function () {
    var rect = makeRect()

    expect(typeof canvas.item === "function").toBeTruthy()
    canvas.add(rect)
    expect(canvas.item(0)).toBe(rect)
  })

  test("preserveObjectStacking", function () {
    expect(typeof canvas.preserveObjectStacking === "boolean").toBeTruthy()
    expect(!canvas.preserveObjectStacking).toBeTruthy()
  })

  test("uniformScaling", function () {
    expect(typeof canvas.uniformScaling === "boolean").toBeTruthy()
    expect(canvas.uniformScaling).toBeTruthy()
  })

  test("uniScaleKey", function () {
    expect(typeof canvas.uniScaleKey === "string").toBeTruthy()
    expect(canvas.uniScaleKey).toBe("shiftKey")
  })

  test("centeredScaling", function () {
    expect(typeof canvas.centeredScaling === "boolean").toBeTruthy()
    expect(!canvas.centeredScaling).toBeTruthy()
  })

  test("centeredRotation", function () {
    expect(typeof canvas.centeredRotation === "boolean").toBeTruthy()
    expect(!canvas.centeredRotation).toBeTruthy()
  })

  test("centeredKey", function () {
    expect(typeof canvas.centeredKey === "string").toBeTruthy()
    expect(canvas.centeredKey).toBe("altKey")
  })

  test("altActionKey", function () {
    expect(typeof canvas.altActionKey === "string").toBeTruthy()
    expect(canvas.altActionKey).toBe("shiftKey")
  })

  test("interactive", function () {
    expect(typeof canvas.interactive == "boolean").toBeTruthy()
    expect(canvas.interactive).toBeTruthy()
  })

  test("selection", function () {
    expect(typeof canvas.selection == "boolean").toBeTruthy()
    expect(canvas.selection).toBeTruthy()
  })

  test("_initInteractive", function () {
    expect(typeof canvas._initInteractive === "function").toBeTruthy()
  })

  test("renderTop", function () {
    expect(typeof canvas.renderTop === "function").toBeTruthy()
    expect(canvas).toBe(canvas.renderTop())
  })

  test("_chooseObjectsToRender", function () {
    expect(typeof canvas._chooseObjectsToRender === "function").toBeTruthy()
    var rect = makeRect(),
      rect2 = makeRect(),
      rect3 = makeRect()
    canvas.add(rect)
    canvas.add(rect2)
    canvas.add(rect3)
    var objs = canvas._chooseObjectsToRender()
    expect(objs[0]).toBe(rect)
    expect(objs[1]).toBe(rect2)
    expect(objs[2]).toBe(rect3)
    canvas.setActiveObject(rect)
    objs = canvas._chooseObjectsToRender()
    expect(objs[0]).toBe(rect2)
    expect(objs[1]).toBe(rect3)
    expect(objs[2]).toBe(rect)
    canvas.setActiveObject(rect2)
    canvas.preserveObjectStacking = true
    objs = canvas._chooseObjectsToRender()
    expect(objs[0]).toBe(rect)
    expect(objs[1]).toBe(rect2)
    expect(objs[2]).toBe(rect3)
  })

  test("calcOffset", function () {
    expect(typeof canvas.calcOffset === "function").toBeTruthy()
    expect(canvas.calcOffset()).toBe(canvas)
  })

  test("add", function () {
    var rect1 = makeRect(),
      rect2 = makeRect(),
      rect3 = makeRect(),
      rect4 = makeRect()

    expect(typeof canvas.add === "function").toBeTruthy()
    expect(canvas.add(rect1)).toBe(canvas)
    expect(canvas.item(0)).toBe(rect1)

    canvas.add(rect2, rect3, rect4)
    expect(canvas.getObjects().length).toBe(4)

    expect(canvas.item(1)).toBe(rect2)
    expect(canvas.item(2)).toBe(rect3)
    expect(canvas.item(3)).toBe(rect4)
  })

  test("insertAt", function () {
    var rect1 = makeRect(),
      rect2 = makeRect()

    canvas.add(rect1, rect2)

    expect(typeof canvas.insertAt === "function").toBeTruthy()

    var rect = makeRect()
    canvas.insertAt(rect, 1)
    expect(canvas.item(1)).toBe(rect)
    canvas.insertAt(rect, 2)
    expect(canvas.item(2)).toBe(rect)
    expect(canvas.insertAt(rect, 2)).toBe(canvas)
  })

  test("remove", function () {
    var rect1 = makeRect(),
      rect2 = makeRect(),
      rect3 = makeRect(),
      rect4 = makeRect()

    canvas.add(rect1, rect2, rect3, rect4)

    expect(typeof canvas.remove === "function").toBeTruthy()
    expect(canvas.remove(rect1)).toBe(canvas)
    expect(canvas.item(0)).toBe(rect2)

    canvas.remove(rect2, rect3)
    expect(canvas.item(0)).toBe(rect4)

    canvas.remove(rect4)
    expect(canvas.isEmpty()).toBe(true)
  })

  test("remove actual hovered target", function () {
    var rect1 = makeRect()
    canvas.add(rect1)
    canvas._hoveredTarget = rect1
    canvas.remove(rect1)
    expect(canvas._hoveredTarget).toBe(null)
  })

  test("before:selection:cleared", function () {
    var isFired = false
    canvas.on("before:selection:cleared", function () {
      isFired = true
    })

    canvas.add(new fabric.Rect())
    canvas.remove(canvas.item(0))

    expect(isFired).toBe(false)

    canvas.add(new fabric.Rect())
    canvas.setActiveObject(canvas.item(0))
    canvas.remove(canvas.item(0))

    expect(isFired).toBe(true)
  })

  test("before:selection:cleared gets target the active object", function () {
    var passedTarget
    canvas.on("before:selection:cleared", function (options) {
      passedTarget = options.target
    })
    var rect = new fabric.Rect()
    canvas.add(rect)
    canvas.setActiveObject(rect)
    canvas.discardActiveObject()
    expect(passedTarget).toBe(rect)
    var rect1 = new fabric.Rect()
    var rect2 = new fabric.Rect()
    canvas.add(rect1, rect2)
    var activeSelection = new fabric.ActiveSelection([rect1, rect2], {
      canvas: canvas
    })
    canvas.setActiveObject(activeSelection)
    canvas.discardActiveObject()
    expect(passedTarget).toBe(activeSelection)
  })

  test("selection:cleared", function () {
    var isFired = false
    canvas.on("selection:cleared", function () {
      isFired = true
    })

    canvas.add(new fabric.Rect())
    canvas.remove(canvas.item(0))

    expect(isFired).toBe(false)

    canvas.add(new fabric.Rect())
    canvas.setActiveObject(canvas.item(0))
    canvas.remove(canvas.item(0))

    expect(isFired).toBe(true)
    canvas.off("selection:cleared")
  })

  test("create active selection fires selection:created", function () {
    var isFired = false
    var rect1 = new fabric.Rect()
    var rect2 = new fabric.Rect()
    canvas.on("selection:created", function () {
      isFired = true
    })
    canvas.setActiveObject(rect1)
    canvas._createActiveSelection(rect2, {})
    expect(canvas._hoveredTarget).toBe(canvas.getActiveObject())
    expect(isFired).toBe(true)
    canvas.off("selection:created")
  })

  test("create active selection fires selected on new object", function () {
    var isFired = false
    var rect1 = new fabric.Rect()
    var rect2 = new fabric.Rect()
    rect2.on("selected", function () {
      isFired = true
    })
    canvas.setActiveObject(rect1)
    canvas._createActiveSelection(rect2, {})
    expect(isFired).toBe(true)
  })

  test("update active selection selection:updated", function () {
    var isFired = false
    var rect1 = new fabric.Rect()
    var rect2 = new fabric.Rect()
    var rect3 = new fabric.Rect()
    canvas.on("selection:updated", function () {
      isFired = true
    })
    canvas.setActiveObject(new fabric.ActiveSelection([rect1, rect2]))
    canvas._updateActiveSelection(rect3, {})
    expect(isFired).toBe(true)
    expect(canvas._hoveredTarget).toBe(canvas.getActiveObject())
    canvas.off("selection:updated")
  })

  test("update active selection fires deselected on an object", function () {
    var isFired = false
    var rect1 = new fabric.Rect()
    var rect2 = new fabric.Rect()
    rect2.on("deselected", function () {
      isFired = true
    })
    canvas.setActiveObject(new fabric.ActiveSelection([rect1, rect2]))
    canvas._updateActiveSelection(rect2, {})
    expect(isFired).toBe(true)
  })

  test("update active selection fires selected on an object", function () {
    var isFired = false
    var rect1 = new fabric.Rect()
    var rect2 = new fabric.Rect()
    var rect3 = new fabric.Rect()
    rect3.on("selected", function () {
      isFired = true
    })
    canvas.setActiveObject(new fabric.ActiveSelection([rect1, rect2]))
    canvas._updateActiveSelection(rect3, {})
    expect(isFired).toBe(true)
  })

  test("setActiveObject fires deselected", function () {
    var isFired = false
    var rect1 = new fabric.Rect()
    var rect2 = new fabric.Rect()
    rect1.on("deselected", function () {
      isFired = true
    })

    canvas.setActiveObject(rect1)
    canvas.setActiveObject(rect2)
    expect(isFired).toBe(true)
  })

  test("_createGroup respect order of objects", function () {
    var rect1 = new fabric.Rect()
    var rect2 = new fabric.Rect()
    canvas.add(rect1)
    canvas.add(rect2)
    canvas.setActiveObject(rect1)
    var selection = canvas._createGroup(rect2)
    expect(selection.getObjects().indexOf(rect1)).toBe(0)
    expect(selection.getObjects().indexOf(rect2)).toBe(1)
  })

  test("_createGroup respect order of objects (inverted)", function () {
    var rect1 = new fabric.Rect()
    var rect2 = new fabric.Rect()
    canvas.add(rect1)
    canvas.add(rect2)
    canvas.setActiveObject(rect2)
    var selection = canvas._createGroup(rect1)
    expect(selection.getObjects().indexOf(rect1)).toBe(0)
    expect(selection.getObjects().indexOf(rect2)).toBe(1)
  })

  test("_groupSelectedObjects fires selected for objects", function () {
    var fired = 0
    var rect1 = new fabric.Rect()
    var rect2 = new fabric.Rect()
    var rect3 = new fabric.Rect()
    canvas._collectObjects = function () {
      return [rect1, rect2, rect3]
    }
    rect1.on("selected", function () {
      fired++
    })
    rect2.on("selected", function () {
      fired++
    })
    rect3.on("selected", function () {
      fired++
    })
    canvas._groupSelectedObjects({})
    expect(fired).toBe(3)
    canvas._collectObjects = fabric.Canvas.prototype._collectObjects
  })

  test("_groupSelectedObjects fires selection:created if more than one object is returned", function () {
    var isFired = false
    var rect1 = new fabric.Rect()
    var rect2 = new fabric.Rect()
    var rect3 = new fabric.Rect()
    canvas._collectObjects = function () {
      return [rect1, rect2, rect3]
    }
    canvas.on("selection:created", function () {
      isFired = true
    })
    canvas._groupSelectedObjects({})
    expect(isFired).toBe(true)
    expect(canvas.getActiveObject().type).toBe("activeSelection")
    expect(canvas.getActiveObjects()[2]).toBe(rect1)
    expect(canvas.getActiveObjects()[1]).toBe(rect2)
    expect(canvas.getActiveObjects()[0]).toBe(rect3)
    expect(canvas.getActiveObjects().length).toBe(3)
    canvas._collectObjects = fabric.Canvas.prototype._collectObjects
  })

  test("_groupSelectedObjects fires selection:created if one only object is returned", function () {
    var isFired = false
    var rect1 = new fabric.Rect()
    canvas._collectObjects = function () {
      return [rect1]
    }
    canvas.on("selection:created", function () {
      isFired = true
    })
    canvas._groupSelectedObjects({})
    expect(isFired).toBe(true)
    expect(canvas.getActiveObject()).toBe(rect1)
  })

  test("_collectObjects collects object contained in area", function () {
    var rect1 = new fabric.Rect({ width: 10, height: 10, top: 0, left: 0 })
    var rect2 = new fabric.Rect({ width: 10, height: 10, top: 0, left: 10 })
    var rect3 = new fabric.Rect({ width: 10, height: 10, top: 10, left: 0 })
    var rect4 = new fabric.Rect({ width: 10, height: 10, top: 10, left: 10 })
    canvas.add(rect1, rect2, rect3, rect4)
    canvas._groupSelector = {
      top: 15,
      left: 15,
      ex: 1,
      ey: 1
    }
    var collected = canvas._collectObjects()
    expect(collected.length).toBe(4)
    expect(collected[3]).toBe(rect1)
    expect(collected[2]).toBe(rect2)
    expect(collected[1]).toBe(rect3)
    expect(collected[0]).toBe(rect4)
  })

  test("_collectObjects do not collects object if area is outside", function () {
    var rect1 = new fabric.Rect({ width: 10, height: 10, top: 0, left: 0 })
    var rect2 = new fabric.Rect({ width: 10, height: 10, top: 0, left: 10 })
    var rect3 = new fabric.Rect({ width: 10, height: 10, top: 10, left: 0 })
    var rect4 = new fabric.Rect({ width: 10, height: 10, top: 10, left: 10 })
    canvas.add(rect1, rect2, rect3, rect4)
    canvas._groupSelector = {
      top: 1,
      left: 1,
      ex: 24,
      ey: 24
    }
    var collected = canvas._collectObjects()
    expect(collected.length).toBe(0)
  })

  test("_collectObjects collect included objects that are not touched by the selection sides", function () {
    var rect1 = new fabric.Rect({ width: 10, height: 10, top: 5, left: 5 })
    canvas.add(rect1)
    canvas._groupSelector = {
      top: 20,
      left: 20,
      ex: 1,
      ey: 1
    }
    var collected = canvas._collectObjects()
    expect(collected.length).toBe(1)
    expect(collected[0]).toBe(rect1)
  })

  test("_collectObjects collect topmost object if no dragging occurs", function () {
    var rect1 = new fabric.Rect({ width: 10, height: 10, top: 0, left: 0 })
    var rect2 = new fabric.Rect({ width: 10, height: 10, top: 0, left: 0 })
    var rect3 = new fabric.Rect({ width: 10, height: 10, top: 0, left: 0 })
    canvas.add(rect1, rect2, rect3)
    canvas._groupSelector = {
      top: 0,
      left: 0,
      ex: 1,
      ey: 1
    }
    var collected = canvas._collectObjects()
    expect(collected.length).toBe(1)
    expect(collected[0]).toBe(rect3)
  })

  test("_collectObjects collect objects if the drag is inside the object", function () {
    var rect1 = new fabric.Rect({ width: 10, height: 10, top: 0, left: 0 })
    var rect2 = new fabric.Rect({ width: 10, height: 10, top: 0, left: 0 })
    var rect3 = new fabric.Rect({ width: 10, height: 10, top: 0, left: 0 })
    canvas.add(rect1, rect2, rect3)
    canvas._groupSelector = {
      top: 2,
      left: 2,
      ex: 1,
      ey: 1
    }
    var collected = canvas._collectObjects()
    expect(collected.length).toBe(3)
    expect(collected[0]).toBe(rect3)
    expect(collected[1]).toBe(rect2)
    expect(collected[2]).toBe(rect1)
  })

  test("_collectObjects collects object fully contained in area", function () {
    canvas.selectionFullyContained = true
    var rect1 = new fabric.Rect({ width: 10, height: 10, top: 0, left: 0 })
    var rect2 = new fabric.Rect({ width: 10, height: 10, top: 0, left: 10 })
    var rect3 = new fabric.Rect({ width: 10, height: 10, top: 10, left: 0 })
    var rect4 = new fabric.Rect({ width: 10, height: 10, top: 10, left: 10 })
    canvas.add(rect1, rect2, rect3, rect4)
    canvas._groupSelector = {
      top: 30,
      left: 30,
      ex: -1,
      ey: -1
    }
    var collected = canvas._collectObjects()
    expect(collected.length).toBe(4)
    expect(collected[3]).toBe(rect1)
    expect(collected[2]).toBe(rect2)
    expect(collected[1]).toBe(rect3)
    expect(collected[0]).toBe(rect4)
    canvas.selectionFullyContained = false
  })

  test("_collectObjects does not collect objects not fully contained", function () {
    canvas.selectionFullyContained = true
    var rect1 = new fabric.Rect({ width: 10, height: 10, top: 0, left: 0 })
    var rect2 = new fabric.Rect({ width: 10, height: 10, top: 0, left: 10 })
    var rect3 = new fabric.Rect({ width: 10, height: 10, top: 10, left: 0 })
    var rect4 = new fabric.Rect({ width: 10, height: 10, top: 10, left: 10 })
    canvas.add(rect1, rect2, rect3, rect4)
    canvas._groupSelector = {
      top: 20,
      left: 20,
      ex: 5,
      ey: 5
    }
    var collected = canvas._collectObjects()
    expect(collected.length).toBe(1)
    expect(collected[0]).toBe(rect4)
    canvas.selectionFullyContained = false
  })

  test("_collectObjects does not collect objects that have onSelect returning true", function () {
    canvas.selectionFullyContained = false
    var rect1 = new fabric.Rect({ width: 10, height: 10, top: 2, left: 2 })
    rect1.onSelect = function () {
      return true
    }
    var rect2 = new fabric.Rect({ width: 10, height: 10, top: 2, left: 2 })
    canvas.add(rect1, rect2)
    canvas._groupSelector = {
      top: 20,
      left: 20,
      ex: 1,
      ey: 1
    }
    var collected = canvas._collectObjects()
    expect(collected.length).toBe(1)
    expect(collected[0]).toBe(rect2)
  })

  test("_collectObjects does not call onSelect on objects that are not intersected", function () {
    canvas.selectionFullyContained = false
    var rect1 = new fabric.Rect({ width: 10, height: 10, top: 0, left: 0 })
    var rect2 = new fabric.Rect({ width: 10, height: 10, top: 0, left: 10 })
    var onSelectRect1CallCount = 0
    var onSelectRect2CallCount = 0
    rect1.onSelect = function () {
      onSelectRect1CallCount++
      return false
    }
    rect2.onSelect = function () {
      onSelectRect2CallCount++
      return false
    }
    canvas.add(rect1, rect2)
    // Intersects none
    canvas._groupSelector = {
      top: 1,
      left: 1,
      ex: 25,
      ey: 25
    }
    canvas._collectObjects()
    var onSelectCalls = onSelectRect1CallCount + onSelectRect2CallCount
    expect(onSelectCalls).toBe(0)
    // Intersects one
    canvas._groupSelector = {
      top: 5,
      left: 5,
      ex: 0,
      ey: 0
    }
    canvas._collectObjects()
    expect(onSelectRect1CallCount).toBe(0)
    expect(onSelectRect2CallCount).toBe(0)
    // Intersects both
    canvas._groupSelector = {
      top: 5,
      left: 15,
      ex: 0,
      ey: 0
    }
    canvas._collectObjects()
    expect(onSelectRect1CallCount).toBe(1)
    expect(onSelectRect2CallCount).toBe(1)
  })

  test("_shouldGroup return false if onSelect return true", function () {
    var rect = new fabric.Rect()
    var rect2 = new fabric.Rect()
    rect.onSelect = function () {
      return true
    }
    canvas._activeObject = rect2
    var selectionKey = canvas.selectionKey
    var event = {}
    event[selectionKey] = true
    var returned = canvas._shouldGroup(event, rect)
    expect(returned).toBe(false)
  })

  test("_shouldGroup return true if onSelect return false and selectionKey is true", function () {
    var rect = new fabric.Rect()
    var rect2 = new fabric.Rect()
    rect.onSelect = function () {
      return false
    }
    canvas._activeObject = rect2
    var selectionKey = canvas.selectionKey
    var event = {}
    event[selectionKey] = true
    var returned = canvas._shouldGroup(event, rect)
    expect(returned).toBe(true)
  })

  test("_shouldGroup return false if selectionKey is false", function () {
    var rect = new fabric.Rect()
    var rect2 = new fabric.Rect()
    rect.onSelect = function () {
      return false
    }
    canvas._activeObject = rect2
    var selectionKey = canvas.selectionKey
    var event = {}
    event[selectionKey] = false
    var returned = canvas._shouldGroup(event, rect)
    expect(returned).toBe(false)
  })

  test("_fireSelectionEvents fires multiple things", function () {
    var rect1Deselected = false
    var rect3Selected = false
    var rect1 = new fabric.Rect()
    var rect2 = new fabric.Rect()
    var rect3 = new fabric.Rect()
    var activeSelection = new fabric.ActiveSelection([rect1, rect2])
    canvas.setActiveObject(activeSelection)
    rect1.on("deselected", function () {
      rect1Deselected = true
    })
    rect3.on("selected", function () {
      rect3Selected = true
    })
    var currentObjects = canvas.getActiveObjects()
    activeSelection.removeWithUpdate(rect1)
    activeSelection.addWithUpdate(rect3)
    canvas._fireSelectionEvents(currentObjects, {})
    expect(rect3Selected).toBeTruthy()
    expect(rect1Deselected).toBeTruthy()
  })

  test("getContext", function () {
    expect(typeof canvas.getContext === "function").toBeTruthy()
  })

  test("clearContext", function () {
    expect(typeof canvas.clearContext === "function").toBeTruthy()
    expect(canvas.clearContext(canvas.getContext())).toBe(canvas)
  })

  test("clear", function () {
    expect(typeof canvas.clear === "function").toBeTruthy()

    expect(canvas.clear()).toBe(canvas)
    expect(canvas.getObjects().length).toBe(0)
  })

  test("renderAll", function () {
    expect(typeof canvas.renderAll === "function").toBeTruthy()
    expect(canvas).toBe(canvas.renderAll())
  })

  test("_drawSelection", function () {
    expect(typeof canvas._drawSelection === "function").toBeTruthy()
  })

  test("findTarget", function () {
    expect(typeof canvas.findTarget === "function").toBeTruthy()
    var rect = makeRect({ left: 0, top: 0 }),
      target
    canvas.add(rect)
    target = canvas.findTarget({
      clientX: 5,
      clientY: 5
    })
    expect(target).toBe(rect)
    target = canvas.findTarget({
      clientX: 30,
      clientY: 30
    })
    // origin null
    expect(target).toBe(undefined)
    canvas.remove(rect)
  })

  test("findTarget preserveObjectStacking false", function () {
    canvas.preserveObjectStacking = false
    var rect = makeRect({ left: 0, top: 0 }),
      rectOver = makeRect({ left: 0, top: 0 }),
      target,
      pointer = { clientX: 5, clientY: 5 }
    canvas.add(rect)
    canvas.add(rectOver)
    canvas.setActiveObject(rect)
    canvas.renderAll()
    target = canvas.findTarget(pointer)
    expect(target).toBe(rect)
  })

  test("findTarget preserveObjectStacking true", function () {
    expect(typeof canvas.findTarget === "function").toBeTruthy()
    canvas.preserveObjectStacking = true
    var rect = makeRect({ left: 0, top: 0, width: 30, height: 30 }),
      rectOver = makeRect({ left: 0, top: 0, width: 30, height: 30 }),
      target,
      pointer = { clientX: 15, clientY: 15, shiftKey: true },
      pointer2 = { clientX: 4, clientY: 4 }
    canvas.add(rect)
    canvas.add(rectOver)
    target = canvas.findTarget(pointer)
    expect(target).toBe(rectOver)
    canvas.setActiveObject(rect)
    target = canvas.findTarget(pointer)
    expect(target).toBe(rectOver)
    target = canvas.findTarget(pointer2)
    expect(target).toBe(rect)
    canvas.altSelectionKey = "shiftKey"
    target = canvas.findTarget(pointer)
    expect(target).toBe(rect)
    canvas.preserveObjectStacking = false
  })

  test("findTarget with subTargetCheck", function () {
    var rect = makeRect({ left: 0, top: 0 }),
      rect2 = makeRect({ left: 30, top: 30 }),
      target,
      group = new fabric.Group([rect, rect2])

    canvas.add(group)
    target = canvas.findTarget(
      {
        clientX: 5,
        clientY: 5
      },
      true
    )
    expect(target).toBe(group)
    expect(canvas.targets[0]).toBe(undefined)
    target = canvas.findTarget({
      clientX: 30,
      clientY: 30
    })
    expect(target).toBe(group)
    group.subTargetCheck = true
    target = canvas.findTarget({
      clientX: 5,
      clientY: 5
    })
    expect(target).toBe(group)
    expect(canvas.targets[0]).toBe(rect)
    target = canvas.findTarget({
      clientX: 15,
      clientY: 15
    })
    expect(target).toBe(group)
    expect(canvas.targets[0]).toBe(undefined)
    target = canvas.findTarget({
      clientX: 32,
      clientY: 32
    })
    expect(target).toBe(group)
    expect(canvas.targets[0]).toBe(rect2)
    canvas.remove(group)
  })

  test("findTarget with subTargetCheck and canvas zoom", function () {
    var rect3 = new fabric.Rect({
      width: 100,
      height: 100,
      fill: "yellow"
    })
    var rect4 = new fabric.Rect({
      width: 100,
      height: 100,
      left: 100,
      top: 100,
      fill: "purple"
    })
    var group3 = new fabric.Group([rect3, rect4], {
      scaleX: 0.5,
      scaleY: 0.5,
      top: 100,
      left: 0
    })
    group3.subTargetCheck = true

    var rect1 = new fabric.Rect({
      width: 100,
      height: 100,
      fill: "red"
    })
    var rect2 = new fabric.Rect({
      width: 100,
      height: 100,
      left: 100,
      top: 100,
      fill: "blue"
    })
    var g = new fabric.Group([rect1, rect2, group3], { top: -150, left: -50 })
    g.subTargetCheck = true
    canvas.viewportTransform = [0.1, 0, 0, 0.1, 100, 200]
    canvas.add(g)

    var target = canvas.findTarget(
      {
        clientX: 96,
        clientY: 186
      },
      true
    )
    expect(target).toBe(g)
    expect(canvas.targets[0]).toBe(rect1)
    canvas.targets = []

    target = canvas.findTarget(
      {
        clientX: 98,
        clientY: 188
      },
      true
    )
    expect(target).toBe(g)
    expect(canvas.targets[0]).toBe(rect1)
    canvas.targets = []

    target = canvas.findTarget(
      {
        clientX: 100,
        clientY: 190
      },
      true
    )
    expect(target).toBe(g)
    expect(canvas.targets[0]).toBe(rect1)
    canvas.targets = []

    target = canvas.findTarget(
      {
        clientX: 102,
        clientY: 192
      },
      true
    )
    expect(target).toBe(g)
    expect(canvas.targets[0]).toBe(rect1)
    canvas.targets = []

    target = canvas.findTarget(
      {
        clientX: 104,
        clientY: 194
      },
      true
    )
    expect(target).toBe(g)
    expect(canvas.targets[0]).toBe(rect1)
    canvas.targets = []

    target = canvas.findTarget(
      {
        clientX: 106,
        clientY: 196
      },
      true
    )
    expect(target).toBe(g)
    expect(canvas.targets[0]).toBe(rect2)
    canvas.targets = []
  })

  test("findTarget with subTargetCheck on activeObject", function () {
    var rect = makeRect({ left: 0, top: 0 }),
      rect2 = makeRect({ left: 30, top: 30 }),
      target,
      group = new fabric.Group([rect, rect2])

    canvas.add(group)
    canvas.setActiveObject(group)
    group.subTargetCheck = true
    target = canvas.findTarget({
      clientX: 9,
      clientY: 9
    })
    expect(target).toBe(group)
    expect(canvas.targets[0]).toBe(rect)

    target = canvas.findTarget({
      clientX: 9,
      clientY: 9
    })

    target = canvas.findTarget({
      clientX: 9,
      clientY: 9
    })

    target = canvas.findTarget({
      clientX: 9,
      clientY: 9
    })

    expect(canvas.targets.length).toBe(1)

    canvas.remove(group)
  })

  test("findTarget with subTargetCheck on activeObject and preserveObjectStacking true", function () {
    var rect = makeRect({ left: 0, top: 0 }),
      rect2 = makeRect({ left: 30, top: 30 }),
      target,
      group = new fabric.Group([rect, rect2])
    canvas.preserveObjectStacking = true
    canvas.add(group)
    canvas.setActiveObject(group)
    group.subTargetCheck = true
    target = canvas.findTarget({
      clientX: 9,
      clientY: 9
    })
    expect(target).toBe(group)
    expect(canvas.targets[0]).toBe(rect)

    target = canvas.findTarget({
      clientX: 9,
      clientY: 9
    })

    target = canvas.findTarget({
      clientX: 9,
      clientY: 9
    })

    target = canvas.findTarget({
      clientX: 9,
      clientY: 9
    })

    expect(canvas.targets.length).toBe(1)

    canvas.remove(group)
  })

  test("findTarget with perPixelTargetFind", function () {
    expect(typeof canvas.findTarget === "function").toBeTruthy()
    var triangle = makeTriangle({ left: 0, top: 0 }),
      target
    canvas.add(triangle)
    target = canvas.findTarget({
      clientX: 5,
      clientY: 5
    })
    expect(target).toBe(triangle)
    //TODO find out why this stops the tests
    canvas.perPixelTargetFind = true
    target = canvas.findTarget({
      clientX: 5,
      clientY: 5
    })
    // origin null
    expect(target).toBe(undefined)
    target = canvas.findTarget({
      clientX: 15,
      clientY: 15
    })
    expect(target).toBe(triangle)
    canvas.perPixelTargetFind = false
    canvas.remove(triangle)
  })

  test("findTarget with perPixelTargetFind in nested group", function () {
    expect(typeof canvas.findTarget === "function").toBeTruthy()
    var triangle = makeTriangle({
        left: 0,
        top: 0,
        width: 30,
        height: 30,
        fill: "yellow"
      }),
      triangle2 = makeTriangle({
        left: 100,
        top: 120,
        width: 30,
        height: 30,
        angle: 100,
        fill: "pink"
      }),
      circle = new fabric.Circle({
        radius: 30,
        top: 0,
        left: 30,
        fill: "blue"
      }),
      circle2 = new fabric.Circle({
        scaleX: 2,
        scaleY: 2,
        radius: 10,
        top: 120,
        left: -20,
        fill: "purple"
      }),
      rect = new fabric.Rect({
        width: 100,
        height: 80,
        top: 50,
        left: 60,
        fill: "green"
      }),
      rect2 = new fabric.Rect({
        width: 50,
        height: 30,
        top: 10,
        left: 110,
        fill: "red",
        skewX: 40,
        skewY: 20
      }),
      group1 = new fabric.Group([triangle, circle, rect2], {
        subTargetCheck: true
      }),
      group2 = new fabric.Group([group1, circle2, rect, triangle2], {
        subTargetCheck: true
      }),
      group3 = new fabric.Group([group2], { subTargetCheck: true }),
      target

    canvas.add(group3)
    canvas.perPixelTargetFind = true
    target = canvas.findTarget({
      clientX: 5,
      clientY: 5
    })
    // origin null
    expect(target).toBe(undefined)
    target = canvas.findTarget({
      clientX: 21,
      clientY: 9
    })
    // origin null
    expect(target).toBe(undefined)
    target = canvas.findTarget({
      clientX: 37,
      clientY: 7
    })
    // origin null
    expect(target).toBe(undefined)
    target = canvas.findTarget({
      clientX: 89,
      clientY: 47
    })
    // origin null
    expect(target).toBe(undefined)
    target = canvas.findTarget({
      clientX: 16,
      clientY: 122
    })
    // origin null
    expect(target).toBe(undefined)
    target = canvas.findTarget({
      clientX: 127,
      clientY: 37
    })
    // origin null
    expect(target).toBe(undefined)
    target = canvas.findTarget({
      clientX: 87,
      clientY: 139
    })
    // origin null
    expect(target).toBe(undefined)
    target = canvas.findTarget({
      clientX: 15,
      clientY: 15
    })
    expect(target).toBe(group3)
    expect(canvas.targets.length).toBe(3)
    expect(canvas.targets[0]).toBe(triangle)
    target = canvas.findTarget({
      clientX: 50,
      clientY: 20
    })
    expect(target).toBe(group3)
    expect(canvas.targets.length).toBe(3)
    expect(canvas.targets[0]).toBe(circle)
    target = canvas.findTarget({
      clientX: 117,
      clientY: 16
    })
    expect(target).toBe(group3)
    expect(canvas.targets.length).toBe(3)
    expect(canvas.targets[0]).toBe(rect2)
    target = canvas.findTarget({
      clientX: 100,
      clientY: 90
    })
    expect(target).toBe(group3)
    expect(canvas.targets.length).toBe(2)
    expect(canvas.targets[0]).toBe(rect)
    target = canvas.findTarget({
      clientX: 9,
      clientY: 145
    })
    expect(target).toBe(group3)
    expect(canvas.targets.length).toBe(2)
    expect(canvas.targets[0]).toBe(circle2)
    target = canvas.findTarget({
      clientX: 66,
      clientY: 143
    })
    expect(target).toBe(group3)
    expect(canvas.targets.length).toBe(2)
    expect(canvas.targets[0]).toBe(triangle2)
    canvas.perPixelTargetFind = false
    canvas.remove(group3)
  })

  test("findTarget on activegroup", function () {
    var rect1 = makeRect({ left: 0, top: 0 }),
      target
    var rect2 = makeRect({ left: 20, top: 20 })
    var rect3 = makeRect({ left: 20, top: 0 })
    canvas.add(rect1)
    canvas.add(rect2)
    canvas.add(rect3)
    var group = new fabric.ActiveSelection([rect1, rect2])
    canvas.setActiveObject(group)
    target = canvas.findTarget({
      clientX: 5,
      clientY: 5
    })
    expect(target).toBe(group)
    target = canvas.findTarget({
      clientX: 40,
      clientY: 15
    })
    // origin null
    expect(target).toBe(undefined)
    target = canvas.findTarget(
      {
        clientX: 5,
        clientY: 5
      },
      true
    )
    expect(target).toBe(rect1)
    target = canvas.findTarget({
      clientX: 25,
      clientY: 5
    })
    expect(target).toBe(group)
    target = canvas.findTarget(
      {
        clientX: 25,
        clientY: 5
      },
      true
    )
    expect(target).toBe(rect3)
  })

  test("findTarget on activegroup with perPixelTargetFind", function () {
    var rect1 = makeRect({ left: 0, top: 0 }),
      target
    var rect2 = makeRect({ left: 20, top: 20 })
    canvas.perPixelTargetFind = true
    canvas.preserveObjectStacking = true
    canvas.add(rect1)
    canvas.add(rect2)
    var group = new fabric.ActiveSelection([rect1, rect2], { canvas: canvas })
    canvas.setActiveObject(group)
    target = canvas.findTarget({
      clientX: 8,
      clientY: 8
    })
    expect(target).toBe(group)

    target = canvas.findTarget({
      clientX: 15,
      clientY: 15
    })
    // origin null
    expect(target).toBe(undefined)
    canvas.perPixelTargetFind = false
    canvas.preserveObjectStacking = false
  })

  test("ActiveSelection sendToBack", function () {
    var rect1 = makeRect(),
      rect2 = makeRect(),
      rect3 = makeRect(),
      rect4 = makeRect()

    canvas.add(rect1, rect2, rect3, rect4)

    var activeSel = new fabric.ActiveSelection([rect3, rect4])
    canvas.setActiveObject(activeSel)
    expect(canvas._objects[0]).toBe(rect1)
    expect(canvas._objects[1]).toBe(rect2)
    canvas.sendToBack(activeSel)
    expect(canvas._objects[0]).toBe(rect3)
    expect(canvas._objects[1]).toBe(rect4)
    expect(canvas._objects[2]).toBe(rect1)
    expect(canvas._objects[3]).toBe(rect2)
  })

  test("activeGroup bringToFront", function () {
    var rect1 = makeRect(),
      rect2 = makeRect(),
      rect3 = makeRect(),
      rect4 = makeRect()

    canvas.add(rect1, rect2, rect3, rect4)

    var activeSel = new fabric.ActiveSelection([rect1, rect2])
    canvas.setActiveObject(activeSel)
    expect(canvas._objects[0]).toBe(rect1)
    expect(canvas._objects[1]).toBe(rect2)
    canvas.bringToFront(activeSel)
    expect(canvas._objects[0]).toBe(rect3)
    expect(canvas._objects[1]).toBe(rect4)
    expect(canvas._objects[2]).toBe(rect1)
    expect(canvas._objects[3]).toBe(rect2)
  })

  test("activeGroup bringForward", function () {
    var rect1 = makeRect(),
      rect2 = makeRect(),
      rect3 = makeRect(),
      rect4 = makeRect()

    canvas.add(rect1, rect2, rect3, rect4)

    var activeSel = new fabric.ActiveSelection([rect1, rect2])
    canvas.setActiveObject(activeSel)
    expect(canvas._objects[0]).toBe(rect1)
    expect(canvas._objects[1]).toBe(rect2)
    canvas.bringForward(activeSel)
    expect(canvas._objects[0]).toBe(rect3)
    expect(canvas._objects[1]).toBe(rect1)
    expect(canvas._objects[2]).toBe(rect2)
    expect(canvas._objects[3]).toBe(rect4)
    canvas.bringForward(activeSel)
    expect(canvas._objects[0]).toBe(rect3)
    expect(canvas._objects[1]).toBe(rect4)
    expect(canvas._objects[2]).toBe(rect1)
    expect(canvas._objects[3]).toBe(rect2)
    canvas.bringForward(activeSel)
    canvas.bringForward(activeSel)
    expect(canvas._objects[0]).toBe(rect3)
    expect(canvas._objects[1]).toBe(rect4)
    expect(canvas._objects[2]).toBe(rect1)
    expect(canvas._objects[3]).toBe(rect2)
  })

  test("activeGroup sendBackwards", function () {
    var rect1 = makeRect(),
      rect2 = makeRect(),
      rect3 = makeRect(),
      rect4 = makeRect()

    canvas.add(rect1, rect2, rect3, rect4)

    var activeSel = new fabric.ActiveSelection([rect3, rect4])
    canvas.setActiveObject(activeSel)
    expect(canvas._objects[0]).toBe(rect1)
    expect(canvas._objects[1]).toBe(rect2)
    canvas.sendBackwards(activeSel)
    expect(canvas._objects[0]).toBe(rect1)
    expect(canvas._objects[1]).toBe(rect3)
    expect(canvas._objects[2]).toBe(rect4)
    expect(canvas._objects[3]).toBe(rect2)
    canvas.sendBackwards(activeSel)
    expect(canvas._objects[0]).toBe(rect3)
    expect(canvas._objects[1]).toBe(rect4)
    expect(canvas._objects[2]).toBe(rect1)
    expect(canvas._objects[3]).toBe(rect2)
    canvas.sendBackwards(activeSel)
    canvas.sendBackwards(activeSel)
    expect(canvas._objects[0]).toBe(rect3)
    expect(canvas._objects[1]).toBe(rect4)
    expect(canvas._objects[2]).toBe(rect1)
    expect(canvas._objects[3]).toBe(rect2)
  })

  test("toDataURL", function () {
    expect(typeof canvas.toDataURL === "function").toBeTruthy()
    var dataURL = canvas.toDataURL()
    // don't compare actual data url, as it is often browser-dependent
    // this.Identical(emptyImageCanvasData, canvas.toDataURL('png'));
    expect(typeof dataURL).toBe("string")
    expect(dataURL.substring(0, 21)).toBe("data:image/png;base64")
  })

  //  test('getPointer', function() {
  //    var done = .async();
  //    .ok(typeof canvas.getPointer === 'function');
  //
  //    fabric.util.addListener(upperCanvasEl, 'click', function(e) {
  //       canvas.calcOffset();
  //       var pointer = canvas.getPointer(e);
  //       .equal(pointer.x, 101, 'pointer.x should be correct');
  //       .equal(pointer.y, 102, 'pointer.y should be correct');
  //
  //       done();
  //   });

  //     setTimeout(function() {
  //       simulateEvent(upperCanvasEl, 'click', {
  //         pointerX: 101, pointerY: 102
  //       });
  //     }, 100);
  // });

  test("getCenter", function () {
    expect(typeof canvas.getCenter === "function").toBeTruthy()
    var center = canvas.getCenter()
    expect(center.left).toBe(upperCanvasEl.width / 2)
    expect(center.top).toBe(upperCanvasEl.height / 2)
  })

  test("centerObjectH", function () {
    expect(typeof canvas.centerObjectH === "function").toBeTruthy()
    var rect = makeRect({ left: 102, top: 202 })
    canvas.add(rect)
    expect(canvas.centerObjectH(rect)).toBe(canvas)
    expect(rect.getCenterPoint().x).toBe(upperCanvasEl.width / 2)
  })

  test("centerObjectV", function () {
    expect(typeof canvas.centerObjectV === "function").toBeTruthy()
    var rect = makeRect({ left: 102, top: 202 })
    canvas.add(rect)
    expect(canvas.centerObjectV(rect)).toBe(canvas)
    expect(rect.getCenterPoint().y).toBe(upperCanvasEl.height / 2)
  })

  test("centerObject", function () {
    expect(typeof canvas.centerObject === "function").toBeTruthy()
    var rect = makeRect({ left: 102, top: 202 })
    canvas.add(rect)
    expect(canvas.centerObject(rect)).toBe(canvas)

    expect(rect.getCenterPoint().y).toBe(upperCanvasEl.height / 2)
    expect(rect.getCenterPoint().x).toBe(upperCanvasEl.width / 2)
  })

  test("straightenObject", function () {
    expect(typeof canvas.straightenObject === "function").toBeTruthy()
    var rect = makeRect({ angle: 10 })
    canvas.add(rect)
    expect(canvas.straightenObject(rect)).toBe(canvas)
    expect(rect.get("angle")).toBe(0)

    rect.rotate("60")
    canvas.straightenObject(rect)
    expect(rect.get("angle")).toBe(90)

    rect.rotate("100")
    canvas.straightenObject(rect)
    expect(rect.get("angle")).toBe(90)
  })

  test("toJSON", function () {
    expect(typeof canvas.toJSON === "function").toBeTruthy()
    expect(JSON.stringify(canvas.toJSON())).toBe(EMPTY_JSON)
    canvas.backgroundColor = "#ff5555"
    canvas.overlayColor = "rgba(0,0,0,0.2)"
    expect(JSON.stringify(canvas.toJSON())).toBe(
      '{"version":"' +
        fabric.version +
        '","objects":[],"background":"#ff5555","overlay":"rgba(0,0,0,0.2)"}'
    )
    canvas.add(makeRect())
    expect(JSON.stringify(canvas.toJSON())).toEqual(RECT_JSON)
  })

  test("toJSON with active group", function () {
    var rect = new fabric.Rect({ width: 50, height: 50, left: 100, top: 100 })
    var circle = new fabric.Circle({ radius: 50, left: 50, top: 50 })
    canvas.add(rect, circle)
    var json = JSON.stringify(canvas)

    canvas.setActiveObject(
      new fabric.ActiveSelection([rect, circle], { canvas: canvas })
    )
    var jsonWithActiveGroup = JSON.stringify(canvas)

    expect(json).toBe(jsonWithActiveGroup)
  })

  test("toDatalessJSON", function () {
    var path = new fabric.Path("M 100 100 L 300 100 L 200 300 z", {
      sourcePath: "http://example.com/"
    })
    canvas.add(path)
    expect(JSON.stringify(canvas.toDatalessJSON())).toBe(PATH_DATALESS_JSON)
  })

  test("toObject", function () {
    expect(typeof canvas.toObject === "function").toBeTruthy()
    var expectedObject = {
      version: fabric.version,
      objects: canvas.getObjects()
    }
    expect(expectedObject).toEqual(canvas.toObject())

    var rect = makeRect()
    canvas.add(rect)

    expect(canvas.toObject().objects[0].type).toBe(rect.type)
  })

  test("toObject with clipPath", function () {
    var clipPath = makeRect()
    var canvasWithClipPath = new fabric.Canvas(null, { clipPath: clipPath })
    var expectedObject = {
      version: fabric.version,
      objects: canvasWithClipPath.getObjects(),
      clipPath: {
        type: "rect",
        version: fabric.version,
        originX: "left",
        originY: "top",
        left: 0,
        top: 0,
        width: 10,
        height: 10,
        fill: "rgb(0,0,0)",
        stroke: null,
        strokeWidth: 1,
        strokeDashArray: null,
        strokeLineCap: "butt",
        strokeDashOffset: 0,
        strokeLineJoin: "miter",
        strokeMiterLimit: 4,
        scaleX: 1,
        scaleY: 1,
        angle: 0,
        flipX: false,
        flipY: false,
        opacity: 1,
        shadow: null,
        visible: true,
        backgroundColor: "",
        fillRule: "nonzero",
        paintFirst: "fill",
        globalCompositeOperation: "source-over",
        skewX: 0,
        skewY: 0,
        rx: 0,
        ry: 0
      }
    }

    expect(typeof canvasWithClipPath.toObject === "function").toBeTruthy()
    expect(expectedObject).toEqual(canvasWithClipPath.toObject())

    var rect = makeRect()
    canvasWithClipPath.add(rect)

    expect(canvasWithClipPath.toObject().objects[0].type).toBe(rect.type)
  })

  test("toDatalessObject", function () {
    expect(typeof canvas.toDatalessObject === "function").toBeTruthy()
    var expectedObject = {
      version: fabric.version,
      objects: canvas.getObjects()
    }

    expect(expectedObject).toEqual(canvas.toDatalessObject())

    var rect = makeRect()
    canvas.add(rect)

    expect(canvas.toObject().objects[0].type).toBe(rect.type)
    // TODO (kangax): need to test this method with fabric.Path to ensure that path is not populated
  })

  test("isEmpty", function () {
    expect(typeof canvas.isEmpty === "function").toBeTruthy()
    expect(canvas.isEmpty()).toBeTruthy()
    canvas.add(makeRect())
    expect(!canvas.isEmpty()).toBeTruthy()
  })

  test("loadFromJSON with json string Canvas", function (done) {
    expect(typeof canvas.loadFromJSON === "function").toBeTruthy()
    canvas.loadFromJSON(PATH_JSON, function () {
      var obj = canvas.item(0)

      expect(!canvas.isEmpty()).toBeTruthy()
      expect(obj.type).toBe("path")
      expect(canvas.backgroundColor).toBe("#ff5555")
      expect(canvas.overlayColor).toBe("rgba(0,0,0,0.2)")

      expect(obj.get("left")).toBe(268)
      expect(obj.get("top")).toBe(266)
      expect(obj.get("width")).toBe(49.803999999999995)
      expect(obj.get("height")).toBe(48.027)
      expect(obj.get("fill")).toBe("rgb(0,0,0)")
      expect(obj.get("stroke")).toBe(null)
      expect(obj.get("strokeWidth")).toBe(1)
      expect(obj.get("scaleX")).toBe(1)
      expect(obj.get("scaleY")).toBe(1)
      expect(obj.get("angle")).toBe(0)
      expect(obj.get("flipX")).toBe(false)
      expect(obj.get("flipY")).toBe(false)
      expect(obj.get("opacity")).toBe(1)
      expect(obj.get("path").length > 0).toBeTruthy()
      done()
    })
  })

  test("loadFromJSON with json object", function (done) {
    canvas.loadFromJSON(JSON.parse(PATH_JSON), function () {
      var obj = canvas.item(0)

      expect(!canvas.isEmpty()).toBeTruthy()
      expect(obj.type).toBe("path")
      expect(canvas.backgroundColor).toBe("#ff5555")
      expect(canvas.overlayColor).toBe("rgba(0,0,0,0.2)")

      expect(obj.get("left")).toBe(268)
      expect(obj.get("top")).toBe(266)
      expect(obj.get("width")).toBe(49.803999999999995)
      expect(obj.get("height")).toBe(48.027)
      expect(obj.get("fill")).toBe("rgb(0,0,0)")
      expect(obj.get("stroke")).toBe(null)
      expect(obj.get("strokeWidth")).toBe(1)
      expect(obj.get("scaleX")).toBe(1)
      expect(obj.get("scaleY")).toBe(1)
      expect(obj.get("angle")).toBe(0)
      expect(obj.get("flipX")).toBe(false)
      expect(obj.get("flipY")).toBe(false)
      expect(obj.get("opacity")).toBe(1)
      expect(obj.get("path").length > 0).toBeTruthy()
      done()
    })
  })

  test("loadFromJSON with json object without default values", function (done) {
    canvas.loadFromJSON(JSON.parse(PATH_WITHOUT_DEFAULTS_JSON), function () {
      var obj = canvas.item(0)

      expect(!canvas.isEmpty()).toBeTruthy()
      expect(obj.type).toBe("path")
      expect(canvas.backgroundColor).toBe("#ff5555")
      expect(canvas.overlayColor).toBe("rgba(0,0,0,0.2)")

      expect(obj.get("originX")).toBe("left")
      expect(obj.get("originY")).toBe("top")
      expect(obj.get("left")).toBe(268)
      expect(obj.get("top")).toBe(266)
      expect(obj.get("width")).toBe(49.803999999999995)
      expect(obj.get("height")).toBe(48.027)
      expect(obj.get("fill")).toBe("rgb(0,0,0)")
      expect(obj.get("stroke")).toBe(null)
      expect(obj.get("strokeWidth")).toBe(1)
      expect(obj.get("scaleX")).toBe(1)
      expect(obj.get("scaleY")).toBe(1)
      expect(obj.get("angle")).toBe(0)
      expect(obj.get("flipX")).toBe(false)
      expect(obj.get("flipY")).toBe(false)
      expect(obj.get("opacity")).toBe(1)
      expect(obj.get("path").length > 0).toBeTruthy()
      done()
    })
  })

  test("loadFromJSON with reviver function", function (done) {
    function reviver(obj, instance) {
      expect(obj).toEqual(JSON.parse(PATH_OBJ_JSON))

      if (instance.type === "path") {
        instance.customID = "fabric_1"
      }
    }

    canvas.loadFromJSON(
      JSON.parse(PATH_JSON),
      function () {
        var obj = canvas.item(0)

        expect(!canvas.isEmpty()).toBeTruthy()
        expect(obj.type).toBe("path")
        expect(canvas.backgroundColor).toBe("#ff5555")
        expect(canvas.overlayColor).toBe("rgba(0,0,0,0.2)")

        expect(obj.get("left")).toBe(268)
        expect(obj.get("top")).toBe(266)
        expect(obj.get("width")).toBe(49.803999999999995)
        expect(obj.get("height")).toBe(48.027)
        expect(obj.get("fill")).toBe("rgb(0,0,0)")
        expect(obj.get("stroke")).toBe(null)
        expect(obj.get("strokeWidth")).toBe(1)
        expect(obj.get("scaleX")).toBe(1)
        expect(obj.get("scaleY")).toBe(1)
        expect(obj.get("angle")).toBe(0)
        expect(obj.get("flipX")).toBe(false)
        expect(obj.get("flipY")).toBe(false)
        expect(obj.get("opacity")).toBe(1)
        expect(obj.get("customID")).toBe("fabric_1")
        expect(obj.get("path").length > 0).toBeTruthy()
        done()
      },
      reviver
    )
  })

  test("loadFromJSON with no objects", function (done) {
    var canvas1 = fabric.document.createElement("canvas"),
      canvas2 = fabric.document.createElement("canvas"),
      c1 = new fabric.Canvas(canvas1, {
        backgroundColor: "green",
        overlayColor: "yellow"
      }),
      c2 = new fabric.Canvas(canvas2, {
        backgroundColor: "red",
        overlayColor: "orange"
      })

    var json = c1.toJSON()
    var fired = false
    c2.loadFromJSON(json, function () {
      fired = true

      expect(fired).toBeTruthy()
      expect(c2.backgroundColor).toBe("green")
      expect(c2.overlayColor).toBe("yellow")
      done()
    })
  })

  test('loadFromJSON without "objects" property', function (done) {
    var canvas1 = fabric.document.createElement("canvas"),
      canvas2 = fabric.document.createElement("canvas"),
      c1 = new fabric.Canvas(canvas1, {
        backgroundColor: "green",
        overlayColor: "yellow"
      }),
      c2 = new fabric.Canvas(canvas2, {
        backgroundColor: "red",
        overlayColor: "orange"
      })

    var json = c1.toJSON()
    var fired = false

    delete json.objects

    c2.loadFromJSON(json, function () {
      fired = true

      expect(fired).toBeTruthy()
      expect(c2.backgroundColor).toBe("green")
      expect(c2.overlayColor).toBe("yellow")
      done()
    })
  })

  test("loadFromJSON with empty fabric.Group", function (done) {
    var canvas1 = fabric.document.createElement("canvas"),
      canvas2 = fabric.document.createElement("canvas"),
      c1 = new fabric.Canvas(canvas1),
      c2 = new fabric.Canvas(canvas2),
      group = new fabric.Group()

    c1.add(group)
    expect(!c1.isEmpty()).toBeTruthy()

    var json = c1.toJSON()
    var fired = false
    c2.loadFromJSON(json, function () {
      fired = true

      expect(fired).toBeTruthy()
      done()
    })
  })

  test("loadFromJSON with async content", function (done) {
    var group = new fabric.Group([
      new fabric.Rect({ width: 10, height: 20 }),
      new fabric.Circle({ radius: 10 })
    ])
    var rect = new fabric.Rect({ width: 20, height: 10 })
    var circle = new fabric.Circle({ radius: 25 })

    canvas.add(group, rect, circle)
    var json = JSON.stringify(canvas)
    canvas.clear()

    expect(0).toBe(canvas.getObjects().length)

    canvas.loadFromJSON(json, function () {
      expect(3).toBe(canvas.getObjects().length)

      done()
    })
  })

  test("loadFromJSON with custom properties on Canvas with no async object", function (done) {
    var serialized = JSON.parse(PATH_JSON)
    serialized.controlsAboveOverlay = true
    serialized.preserveObjectStacking = true
    expect(canvas.controlsAboveOverlay).toBe(
      fabric.Canvas.prototype.controlsAboveOverlay
    )
    expect(canvas.preserveObjectStacking).toBe(
      fabric.Canvas.prototype.preserveObjectStacking
    )
    canvas.loadFromJSON(serialized, function () {
      expect(!canvas.isEmpty()).toBeTruthy()
      expect(canvas.controlsAboveOverlay).toBe(true)
      expect(canvas.preserveObjectStacking).toBe(true)
      done()
    })
  })

  test("loadFromJSON with custom properties on Canvas with image", function (done) {
    var JSON_STRING =
      '{"objects":[{"type":"image","originX":"left","originY":"top","left":13.6,"top":-1.4,"width":3000,"height":3351,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.05,"scaleY":0.05,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"src":' +
      JSON.stringify(IMG_SRC) +
      ',"filters":[],"crossOrigin":""}],' +
      '"background":"green"}'
    var serialized = JSON.parse(JSON_STRING)
    serialized.controlsAboveOverlay = true
    serialized.preserveObjectStacking = true
    expect(canvas.controlsAboveOverlay).toBe(
      fabric.Canvas.prototype.controlsAboveOverlay
    )
    expect(canvas.preserveObjectStacking).toBe(
      fabric.Canvas.prototype.preserveObjectStacking
    )
    canvas.loadFromJSON(serialized, function () {
      expect(!canvas.isEmpty()).toBeTruthy()
      expect(canvas.controlsAboveOverlay).toBe(true)
      expect(canvas.preserveObjectStacking).toBe(true)
      done()
    })
    // before callback the properties are still false.
    expect(canvas.controlsAboveOverlay).toBe(false)
    expect(canvas.preserveObjectStacking).toBe(false)
  })

  test("normalize pointer", function () {
    expect(typeof canvas._normalizePointer === "function").toBeTruthy()
    var pointer = { x: 10, y: 20 },
      object = makeRect({
        top: 10,
        left: 10,
        width: 50,
        height: 50,
        strokeWidth: 0
      }),
      normalizedPointer = canvas._normalizePointer(object, pointer)
    expect(normalizedPointer.x).toBe(-25)
    expect(normalizedPointer.y).toBe(-15)
    object.angle = 90
    normalizedPointer = canvas._normalizePointer(object, pointer)
    expect(normalizedPointer.x).toBe(-15)
    expect(normalizedPointer.y).toBe(-25)
    object.angle = 0
    object.scaleX = 2
    object.scaleY = 2
    normalizedPointer = canvas._normalizePointer(object, pointer)
    expect(normalizedPointer.x).toBe(-25)
    expect(normalizedPointer.y).toBe(-20)
    object.skewX = 60
    normalizedPointer = canvas._normalizePointer(object, pointer)
    // orgin -33.66, but toFixed returns String
    expect(normalizedPointer.x.toFixed(2)).toBe("-33.66")
    expect(normalizedPointer.y).toBe(-20)
  })

  test("restorePointerVpt", function () {
    expect(typeof canvas.restorePointerVpt === "function").toBeTruthy()
    var pointer = { x: 10, y: 20 },
      restoredPointer = canvas.restorePointerVpt(pointer)
    expect(restoredPointer.x).toBe(pointer.x)
    expect(restoredPointer.y).toBe(pointer.y)
    canvas.viewportTransform = [2, 0, 0, 2, 50, -60]
    restoredPointer = canvas.restorePointerVpt(pointer)
    expect(restoredPointer.x).toBe(-20)
    expect(restoredPointer.y).toBe(40)
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
  })

  // test('loadFromJSON with backgroundImage', function() {
  //   var done = .async();
  //   canvas.setBackgroundImage('../../assets/pug.jpg');
  //   var anotherCanvas = new fabric.Canvas();

  //   setTimeout(function() {

  //     var json = JSON.stringify(canvas);
  //     anotherCanvas.loadFromJSON(json);

  //     setTimeout(function() {

  //       .equal(JSON.stringify(anotherCanvas), json, 'backgrondImage and properties are initialized correctly');
  //       done();

  //     }, 1000);
  //   }, 1000);
  // });

  test("sendToBack", function () {
    expect(typeof canvas.sendToBack === "function").toBeTruthy()

    var rect1 = makeRect(),
      rect2 = makeRect(),
      rect3 = makeRect()

    canvas.add(rect1, rect2, rect3)

    canvas.sendToBack(rect3)
    expect(canvas.item(0)).toBe(rect3)

    canvas.sendToBack(rect2)
    expect(canvas.item(0)).toBe(rect2)

    canvas.sendToBack(rect2)
    expect(canvas.item(0)).toBe(rect2)
  })

  test("bringToFront", function () {
    expect(typeof canvas.bringToFront === "function").toBeTruthy()

    var rect1 = makeRect(),
      rect2 = makeRect(),
      rect3 = makeRect()

    canvas.add(rect1, rect2, rect3)

    canvas.bringToFront(rect1)
    expect(canvas.item(2)).toBe(rect1)

    canvas.bringToFront(rect2)
    expect(canvas.item(2)).toBe(rect2)

    canvas.bringToFront(rect2)
    expect(canvas.item(2)).toBe(rect2)
  })

  test("sendBackwards", function () {
    expect(typeof canvas.sendBackwards === "function").toBeTruthy()

    var rect1 = makeRect(),
      rect2 = makeRect(),
      rect3 = makeRect()

    canvas.add(rect1, rect2, rect3)

    // [ 1, 2, 3 ]
    expect(canvas.item(0)).toBe(rect1)
    expect(canvas.item(1)).toBe(rect2)
    expect(canvas.item(2)).toBe(rect3)

    canvas.sendBackwards(rect3)

    // moved 3 one level back — [1, 3, 2]
    expect(canvas.item(0)).toBe(rect1)
    expect(canvas.item(2)).toBe(rect2)
    expect(canvas.item(1)).toBe(rect3)

    canvas.sendBackwards(rect3)

    // moved 3 one level back — [3, 1, 2]
    expect(canvas.item(1)).toBe(rect1)
    expect(canvas.item(2)).toBe(rect2)
    expect(canvas.item(0)).toBe(rect3)

    canvas.sendBackwards(rect3)

    // 3 stays at the deepEqual position — [2, 3, 1]
    expect(canvas.item(1)).toBe(rect1)
    expect(canvas.item(2)).toBe(rect2)
    expect(canvas.item(0)).toBe(rect3)

    canvas.sendBackwards(rect2)

    expect(canvas.item(2)).toBe(rect1)
    expect(canvas.item(1)).toBe(rect2)
    expect(canvas.item(0)).toBe(rect3)

    canvas.sendBackwards(rect2)

    expect(canvas.item(2)).toBe(rect1)
    expect(canvas.item(0)).toBe(rect2)
    expect(canvas.item(1)).toBe(rect3)
  })

  test("bringForward", function () {
    expect(typeof canvas.bringForward === "function").toBeTruthy()

    var rect1 = makeRect(),
      rect2 = makeRect(),
      rect3 = makeRect()

    canvas.add(rect1, rect2, rect3)

    // initial position — [ 1, 2, 3 ]
    expect(canvas.item(0)).toBe(rect1)
    expect(canvas.item(1)).toBe(rect2)
    expect(canvas.item(2)).toBe(rect3)

    canvas.bringForward(rect1)

    // 1 moves one way up — [ 2, 1, 3 ]
    expect(canvas.item(1)).toBe(rect1)
    expect(canvas.item(0)).toBe(rect2)
    expect(canvas.item(2)).toBe(rect3)

    canvas.bringForward(rect1)

    // 1 moves one way up again — [ 2, 3, 1 ]
    expect(canvas.item(2)).toBe(rect1)
    expect(canvas.item(0)).toBe(rect2)
    expect(canvas.item(1)).toBe(rect3)

    canvas.bringForward(rect1)

    // 1 is already all the way on top and so doesn't change position — [ 2, 3, 1 ]
    expect(canvas.item(2)).toBe(rect1)
    expect(canvas.item(0)).toBe(rect2)
    expect(canvas.item(1)).toBe(rect3)

    canvas.bringForward(rect3)

    // 1 is already all the way on top and so doesn't change position — [ 2, 1, 3 ]
    expect(canvas.item(1)).toBe(rect1)
    expect(canvas.item(0)).toBe(rect2)
    expect(canvas.item(2)).toBe(rect3)
  })

  test("setActiveObject", function () {
    expect(typeof canvas.setActiveObject === "function").toBeTruthy()

    var rect1 = makeRect(),
      rect2 = makeRect()

    canvas.add(rect1, rect2)

    canvas.setActiveObject(rect1)
    expect(rect1 === canvas._activeObject).toBeTruthy()

    canvas.setActiveObject(rect2)
    expect(rect2 === canvas._activeObject).toBeTruthy()
  })

  test("getActiveObject", function () {
    expect(typeof canvas.getActiveObject === "function").toBeTruthy()
    expect(canvas.getActiveObject()).toBe(null)
    var rect1 = makeRect(),
      rect2 = makeRect()

    canvas.add(rect1, rect2)

    canvas.setActiveObject(rect1)
    expect(canvas.getActiveObject()).toBe(rect1)

    canvas.setActiveObject(rect2)
    expect(canvas.getActiveObject()).toBe(rect2)
  })

  test("getsetActiveObject", function () {
    expect(canvas.getActiveObject()).toBe(null)

    var group = new fabric.Group([
      makeRect({ left: 10, top: 10 }),
      makeRect({ left: 20, top: 20 })
    ])

    expect(canvas.setActiveObject(group)).toBe(canvas)
    expect(canvas.getActiveObject()).toBe(group)
  })

  test("item", function () {
    expect(typeof canvas.item === "function").toBeTruthy()

    var rect1 = makeRect(),
      rect2 = makeRect()

    canvas.add(rect1, rect2)

    expect(canvas.item(0)).toBe(rect1)
    expect(canvas.item(1)).toBe(rect2)

    canvas.remove(canvas.item(0))

    expect(canvas.item(0)).toBe(rect2)
  })

  test("discardActiveObject on ActiveSelection", function () {
    var group = new fabric.ActiveSelection([makeRect(), makeRect()])
    canvas.setActiveObject(group)
    expect(canvas.discardActiveObject()).toBe(canvas)
    expect(canvas.getActiveObject()).toBe(null)
  })

  test("_discardActiveObject", function () {
    canvas.add(makeRect())
    canvas.setActiveObject(canvas.item(0))

    canvas._discardActiveObject()
    expect(!canvas.item(0).active).toBeTruthy()
    expect(canvas.getActiveObject()).toBe(null)
  })

  test("discardActiveObject", function () {
    expect(typeof canvas.discardActiveObject === "function").toBeTruthy()

    canvas.add(makeRect())
    canvas.setActiveObject(canvas.item(0))

    var group = new fabric.Group([
      makeRect({ left: 10, top: 10 }),
      makeRect({ left: 20, top: 20 })
    ])

    canvas.setActiveObject(group)

    var eventsFired = {
      selectionCleared: false
    }

    canvas.on("selection:cleared", function () {
      eventsFired.selectionCleared = true
    })

    canvas.discardActiveObject()
    expect(!canvas.item(0).active).toBeTruthy()
    expect(canvas.getActiveObject()).toBe(null)
    expect(canvas.getActiveObject()).toBe(null)

    for (var prop in eventsFired) {
      expect(eventsFired[prop]).toBeTruthy()
    }
  })

  test("complexity", function () {
    expect(typeof canvas.complexity === "function").toBeTruthy()
    expect(canvas.complexity()).toBe(0)

    canvas.add(makeRect())
    expect(canvas.complexity()).toBe(1)

    canvas.add(makeRect(), makeRect())
    expect(canvas.complexity()).toBe(3)
  })

  test("toString", function () {
    expect(typeof canvas.toString === "function").toBeTruthy()

    expect(canvas.toString()).toBe("#<fabric.Canvas (0): { objects: 0 }>")

    canvas.add(makeRect())
    expect(canvas.toString()).toBe("#<fabric.Canvas (1): { objects: 1 }>")
  })

  test("toSVG with active group", function () {
    var rect = new fabric.Rect({ width: 50, height: 50, left: 100, top: 100 })
    var circle = new fabric.Circle({ radius: 50, left: 50, top: 50 })
    canvas.add(rect, circle)
    var svg = canvas.toSVG()

    canvas.setActiveObject(new fabric.ActiveSelection([rect, circle]))
    var svgWithActiveGroup = canvas.toSVG()

    expect(svg).toBe(svgWithActiveGroup)
  })

  test("active group objects reordering", function () {
    var rect1 = new fabric.Rect({ width: 30, height: 30, left: 130, top: 130 })
    var rect2 = new fabric.Rect({ width: 50, height: 50, left: 100, top: 100 })
    var circle1 = new fabric.Circle({ radius: 10, left: 60, top: 60 })
    var circle2 = new fabric.Circle({ radius: 50, left: 50, top: 50 })
    canvas.add(rect1, rect2, circle1, circle2)
    expect(canvas._objects[0]).toBe(rect1)
    expect(canvas._objects[1]).toBe(rect2)
    expect(canvas._objects[2]).toBe(circle1)
    expect(canvas._objects[3]).toBe(circle2)
    var aGroup = new fabric.ActiveSelection([rect2, circle2, rect1, circle1], {
      canvas: canvas
    })
    // before rendering objects are ordered in insert order
    expect(aGroup._objects[0]).toBe(rect2)
    expect(aGroup._objects[1]).toBe(circle2)
    expect(aGroup._objects[2]).toBe(rect1)
    expect(aGroup._objects[3]).toBe(circle1)
    canvas.setActiveObject(aGroup).renderAll()
    // after rendering objects are ordered in canvas stack order
    expect(aGroup._objects[0]).toBe(rect1)
    expect(aGroup._objects[1]).toBe(rect2)
    expect(aGroup._objects[2]).toBe(circle1)
    expect(aGroup._objects[3]).toBe(circle2)
  })

  test("dispose", function () {
    //made local vars to do not dispose the external canvas
    var el = fabric.document.createElement("canvas"),
      parentEl = fabric.document.createElement("div"),
      wrapperEl,
      lowerCanvasEl,
      upperCanvasEl
    el.width = 200
    el.height = 200
    parentEl.className = "rootNode"
    parentEl.appendChild(el)

    expect(parentEl.firstChild).toBe(el)
    expect(parentEl.childNodes.length).toBe(1)

    var canvas = new fabric.Canvas(el, {
      enableRetinaScaling: false,
      renderOnAddRemove: false
    })
    wrapperEl = canvas.wrapperEl
    lowerCanvasEl = canvas.lowerCanvasEl
    upperCanvasEl = canvas.upperCanvasEl
    expect(parentEl.childNodes.length).toBe(1)
    expect(wrapperEl.childNodes.length).toBe(2)
    expect(wrapperEl.tagName).toBe("DIV")
    expect(wrapperEl.className).toBe(canvas.containerClass)
    expect(wrapperEl.childNodes[0]).toBe(lowerCanvasEl)
    expect(wrapperEl.childNodes[1]).toBe(upperCanvasEl)
    if (!fabric.isLikelyNode) {
      expect(parentEl.childNodes[0]).toBe(wrapperEl)
    }
    //looks like i cannot use parentNode
    //equal(wrapperEl, lowerCanvasEl.parentNode, 'lowerCanvas is appended to wrapperEl');
    //equal(wrapperEl, upperCanvasEl.parentNode, 'upperCanvas is appended to wrapperEl');
    //equal(parentEl, wrapperEl.parentNode, 'wrapperEl is appendend to rootNode');
    expect(parentEl.childNodes.length).toBe(1)
    expect(parentEl.firstChild).not.toBe(canvas.getElement())
    expect(typeof canvas.dispose === "function").toBeTruthy()
    canvas.add(makeRect(), makeRect(), makeRect())
    canvas.dispose()
    canvas.cancelRequestedRender()
    expect(canvas.getObjects().length).toBe(0)
    expect(parentEl.childNodes.length).toBe(1)
    if (!fabric.isLikelyNode) {
      expect(parentEl.childNodes[0]).toBe(lowerCanvasEl)
    }
    // origin null
    expect(canvas.wrapperEl).toBe(undefined)
    // origin null
    expect(canvas.upperCanvasEl).toBe(undefined)
    // origin null
    expect(canvas.cacheCanvasEl).toBe(undefined)
    expect(canvas.contextTop).toBe(null)
    expect(canvas.contextCache).toBe(null)
  })

  // test('dispose', function() {
  //   function invokeEventsOnCanvas() {
  //     // nextSibling because we need to invoke events on upper canvas
  //     simulateEvent(canvas.getElement().nextSibling, 'mousedown');
  //     simulateEvent(canvas.getElement().nextSibling, 'mouseup');
  //     simulateEvent(canvas.getElement().nextSibling, 'mousemove');
  //   }
  //   var InvocationsCount = function() {
  //     var message = 'event handler should not be invoked after `dispose`';
  //     .equal(handlerInvocationCounts.__onMouseDown, 1);
  //     .equal(handlerInvocationCounts.__onMouseUp, 1);
  //     .equal(handlerInvocationCounts.__onMouseMove, 1);
  //   };

  //   .ok(typeof canvas.dispose === 'function');
  //   canvas.add(makeRect(), makeRect(), makeRect());

  //   var handlerInvocationCounts = {
  //     __onMouseDown: 0, __onMouseUp: 0, __onMouseMove: 0
  //   };

  //   // hijack event handlers
  //   canvas.__onMouseDown = function() {
  //     handlerInvocationCounts.__onMouseDown++;
  //   };
  //   canvas.__onMouseUp = function() {
  //     handlerInvocationCounts.__onMouseUp++;
  //   };
  //   canvas.__onMouseMove = function() {
  //     handlerInvocationCounts.__onMouseMove++;
  //   };

  //   invokeEventsOnCanvas();
  //   InvocationsCount();

  //   canvas.dispose();
  //   .equal(canvas.getObjects().length, 0, 'dispose should clear canvas');

  //   invokeEventsOnCanvas();
  //   InvocationsCount();
  // });

  test("clone", function (done) {
    expect(typeof canvas.clone === "function").toBeTruthy()

    canvas.add(
      new fabric.Rect({
        width: 100,
        height: 110,
        top: 120,
        left: 130,
        fill: "rgba(0,1,2,0.3)"
      })
    )
    var canvasData = JSON.stringify(canvas)

    canvas.clone(function (clone) {
      expect(clone instanceof fabric.Canvas).toBeTruthy()

      // alert(JSON.stringify(clone));
      expect(canvasData).toBe(JSON.stringify(clone))

      expect(canvas.getWidth()).toBe(clone.getWidth())
      expect(canvas.getHeight()).toBe(clone.getHeight())
      clone.renderAll()
      done()
    })
  })

  test("cloneWithoutData", function (done) {
    expect(typeof canvas.cloneWithoutData === "function").toBeTruthy()

    canvas.add(
      new fabric.Rect({
        width: 100,
        height: 110,
        top: 120,
        left: 130,
        fill: "rgba(0,1,2,0.3)"
      })
    )

    canvas.cloneWithoutData(function (clone) {
      expect(clone instanceof fabric.Canvas).toBeTruthy()

      expect(JSON.stringify(clone)).toBe(EMPTY_JSON)

      expect(canvas.getWidth()).toBe(clone.getWidth())
      expect(canvas.getHeight()).toBe(clone.getHeight())
      clone.renderAll()
      done()
    })
  })

  test("getSetWidth", function () {
    expect(typeof canvas.getWidth === "function").toBeTruthy()
    expect(canvas.getWidth()).toBe(600)
    expect(canvas.setWidth(444)).toBe(canvas)
    expect(canvas.getWidth()).toBe(444)
    expect(canvas.lowerCanvasEl.style.width).toBe(444 + "px")
  })

  test("getSetHeight", function () {
    expect(typeof canvas.getHeight === "function").toBeTruthy()
    expect(canvas.getHeight()).toBe(600)
    expect(canvas.setHeight(765)).toBe(canvas)
    expect(canvas.getHeight()).toBe(765)
    expect(canvas.lowerCanvasEl.style.height).toBe(765 + "px")
  })

  test("setWidth css only", function () {
    canvas.setWidth(123)
    canvas.setWidth("100%", { cssOnly: true })

    expect(canvas.lowerCanvasEl.style.width).toBe("100%")
    expect(canvas.upperCanvasEl.style.width).toBe("100%")
    expect(canvas.wrapperEl.style.width).toBe("100%")
    expect(canvas.getWidth()).toBe(123)
  })

  test("setHeight css only", function () {
    canvas.setHeight(123)
    canvas.setHeight("100%", { cssOnly: true })

    expect(canvas.lowerCanvasEl.style.height).toBe("100%")
    expect(canvas.upperCanvasEl.style.height).toBe("100%")
    expect(canvas.wrapperEl.style.height).toBe("100%")
    expect(canvas.getWidth()).toBe(123)
  })

  test("setWidth backstore only", function () {
    canvas.setWidth(123)
    canvas.setWidth(500, { backstoreOnly: true })

    expect(canvas.lowerCanvasEl.style.width).toBe(123 + "px")
    expect(canvas.upperCanvasEl.style.width).toBe(123 + "px")
    expect(canvas.wrapperEl.style.width).toBe(123 + "px")
    expect(canvas.getWidth()).toBe(500)
  })

  test("setHeight backstore only", function () {
    canvas.setHeight(123)
    canvas.setHeight(500, { backstoreOnly: true })

    expect(canvas.lowerCanvasEl.style.height).toBe(123 + "px")
    expect(canvas.upperCanvasEl.style.height).toBe(123 + "px")
    expect(canvas.wrapperEl.style.height).toBe(123 + "px")
    expect(canvas.getHeight()).toBe(500)
  })

  test("setupCurrentTransform", function () {
    expect(typeof canvas._setupCurrentTransform === "function").toBeTruthy()

    var rect = new fabric.Rect({ left: 75, top: 75, width: 50, height: 50 })
    canvas.add(rect)
    var canvasEl = canvas.getElement(),
      canvasOffset = fabric.util.getElementOffset(canvasEl)
    var eventStub = {
      clientX: canvasOffset.left + 100,
      clientY: canvasOffset.top + 100,
      target: rect
    }
    canvas.setActiveObject(rect)
    rect.__corner = rect._findTargetCorner(canvas.getPointer(eventStub, true))
    canvas._setupCurrentTransform(eventStub, rect)
    var t = canvas._currentTransform
    expect(t.target).toBe(rect)
    expect(t.action).toBe("drag")
    // according to sourcecode comment it should return string or boolean
    expect(t.corner).toBe(false)
    expect(t.originX).toBe(rect.originX)
    expect(t.originY).toBe(rect.originY)

    eventStub = {
      clientX: canvasOffset.left + rect.oCoords.tl.corner.tl.x + 1,
      clientY: canvasOffset.top + rect.oCoords.tl.corner.tl.y + 1,
      target: rect
    }
    rect.__corner = rect._findTargetCorner(canvas.getPointer(eventStub, true))
    canvas._setupCurrentTransform(eventStub, rect, false)
    t = canvas._currentTransform
    expect(t.target).toBe(rect)
    expect(t.action).toBe("drag")
    expect(t.corner).toBe("tl")
    expect(t.shiftKey).toBe(undefined)

    var alreadySelected = true
    rect.__corner = rect._findTargetCorner(canvas.getPointer(eventStub, true))
    canvas._setupCurrentTransform(eventStub, rect, alreadySelected)
    t = canvas._currentTransform
    expect(t.target).toBe(rect)
    expect(t.action).toBe("scale")
    expect(t.corner).toBe("tl")
    expect(t.originX).toBe("right")
    expect(t.originY).toBe("bottom")
    expect(t.shiftKey).toBe(undefined)

    eventStub = {
      clientX: canvasOffset.left + rect.left - 2,
      clientY: canvasOffset.top + rect.top + rect.height / 2,
      target: rect,
      shiftKey: true
    }
    rect.__corner = rect._findTargetCorner(canvas.getPointer(eventStub, true))
    canvas._setupCurrentTransform(eventStub, rect, alreadySelected)
    t = canvas._currentTransform
    expect(t.target).toBe(rect)
    expect(t.action).toBe("skewY")
    expect(t.shiftKey).toBe(true)
    expect(t.corner).toBe("ml")
    expect(t.originX).toBe("right")

    // to be replaced with new api test
    // eventStub = {
    //   clientX: canvasOffset.left + rect.oCoords.mtr.x,
    //   clientY: canvasOffset.top + rect.oCoords.mtr.y,
    //   target: rect,
    // };
    // canvas._setupCurrentTransform(eventStub, rect, alreadySelected);
    // t = canvas._currentTransform;
    // .equal(t.target, rect, 'should have rect as a target');
    // .equal(t.action, 'mtr', 'should target a corner and setup rotate');
    // .equal(t.corner, 'mtr', 'mtr selected');
    // .equal(t.originX, 'center', 'origin in center');
    // .equal(t.originY, 'center', 'origin in center');
    // canvas._currentTransform = false;
  })

  // test('_rotateObject', function() {
  //   .ok(typeof canvas._rotateObject === 'function');
  //   var rect = new fabric.Rect({ left: 75, top: 75, width: 50, height: 50 });
  //   canvas.add(rect);
  //   var canvasEl = canvas.getElement(),
  //       canvasOffset = fabric.util.getElementOffset(canvasEl);
  //   var eventStub = {
  //     clientX: canvasOffset.left + rect.oCoords.mtr.x,
  //     clientY: canvasOffset.top + rect.oCoords.mtr.y,
  //     target: rect,
  //   };
  //   canvas._setupCurrentTransform(eventStub, rect);
  //   var rotated = canvas._rotateObject(30, 30, 'equally');
  //   .equal(rotated, true, 'return true if a rotation happened');
  //   rotated = canvas._rotateObject(30, 30);
  //   .equal(rotated, false, 'return true if no rotation happened');
  // });
  //
  // test('_rotateObject do not change origins', function() {
  //   .ok(typeof canvas._rotateObject === 'function');
  //   var rect = new fabric.Rect({ left: 75, top: 75, width: 50, height: 50, originX: 'right', originY: 'bottom' });
  //   canvas.add(rect);
  //   var canvasEl = canvas.getElement(),
  //       canvasOffset = fabric.util.getElementOffset(canvasEl);
  //   var eventStub = {
  //     clientX: canvasOffset.left + rect.oCoords.mtr.x,
  //     clientY: canvasOffset.top + rect.oCoords.mtr.y,
  //     target: rect,
  //   };
  //   canvas._setupCurrentTransform(eventStub, rect);
  //   .equal(rect.originX, 'right');
  //   .equal(rect.originY, 'bottom');
  // });

  test("fxRemove", function (done) {
    expect(typeof canvas.fxRemove === "function").toBeTruthy()

    var rect = new fabric.Rect()
    canvas.add(rect)

    var callbackFired = false
    function onComplete() {
      callbackFired = true
    }

    expect(canvas.item(0)).toBe(rect)
    expect(canvas.fxRemove(rect, { onComplete: onComplete })).toBe(canvas)

    setTimeout(function () {
      expect(canvas.item(0)).toBe(undefined)
      expect(callbackFired).toBeTruthy()
      done()
    }, 1000)
  })

  // test('backgroundImage', function() {
  //   var done = .async();
  //   .deepEqual('', canvas.backgroundImage);
  //   canvas.setBackgroundImage('../../assets/pug.jpg');

  //   setTimeout(function() {

  //     .ok(typeof canvas.backgroundImage == 'object');
  //     .ok(/pug\.jpg$/.test(canvas.backgroundImage.src));

  //     .deepEqual(canvas.toJSON(), {
  //       "objects": [],
  //       "background": "rgba(0, 0, 0, 0)",
  //       "backgroundImage": (fabric.document.location.protocol +
  //                           '//' +
  //                           fabric.document.location.hostname +
  //                           ((fabric.document.location.port === '' || parseInt(fabric.document.location.port, 10) === 80)
  //                               ? ''
  //                               : (':' + fabric.document.location.port)) +
  //                           '/assets/pug.jpg'),
  //       "backgroundImageOpacity": 1,
  //       "backgroundImageStretch": true
  //     });

  //     done();
  //   }, 1000);
  // });

  test("isTargetTransparent", function () {
    var rect = new fabric.Rect({
      width: 10,
      height: 10,
      strokeWidth: 4,
      stroke: "red",
      fill: "",
      top: 0,
      left: 0,
      objectCaching: true
    })
    canvas.add(rect)
    expect(canvas.isTargetTransparent(rect, 0, 0)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 1, 1)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 2, 2)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 3, 3)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 4, 4)).toBe(true)
    expect(canvas.isTargetTransparent(rect, 5, 5)).toBe(true)
    expect(canvas.isTargetTransparent(rect, 6, 6)).toBe(true)
    expect(canvas.isTargetTransparent(rect, 7, 7)).toBe(true)
    expect(canvas.isTargetTransparent(rect, 8, 8)).toBe(true)
    expect(canvas.isTargetTransparent(rect, 9, 9)).toBe(true)
    expect(canvas.isTargetTransparent(rect, 10, 10)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 11, 11)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 12, 12)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 13, 13)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 14, 14)).toBe(true)
  })

  test("isTargetTransparent without objectCaching", function () {
    var rect = new fabric.Rect({
      width: 10,
      height: 10,
      strokeWidth: 4,
      stroke: "red",
      fill: "",
      top: 0,
      left: 0,
      objectCaching: false
    })
    canvas.add(rect)
    expect(canvas.isTargetTransparent(rect, 0, 0)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 1, 1)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 2, 2)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 3, 3)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 4, 4)).toBe(true)
    expect(canvas.isTargetTransparent(rect, 5, 5)).toBe(true)
    expect(canvas.isTargetTransparent(rect, 6, 6)).toBe(true)
    expect(canvas.isTargetTransparent(rect, 7, 7)).toBe(true)
    expect(canvas.isTargetTransparent(rect, 8, 8)).toBe(true)
    expect(canvas.isTargetTransparent(rect, 9, 9)).toBe(true)
    expect(canvas.isTargetTransparent(rect, 10, 10)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 11, 11)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 12, 12)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 13, 13)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 14, 14)).toBe(true)
  })

  test("isTargetTransparent as active object", function () {
    var rect = new fabric.Rect({
      width: 20,
      height: 20,
      strokeWidth: 4,
      stroke: "red",
      fill: "",
      top: 0,
      left: 0,
      objectCaching: true
    })
    canvas.add(rect)
    canvas.setActiveObject(rect)
    expect(canvas.isTargetTransparent(rect, 0, 0)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 1, 1)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 2, 2)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 3, 3)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 4, 4)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 5, 5)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 6, 6)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 7, 7)).toBe(true)
    expect(canvas.isTargetTransparent(rect, 8, 8)).toBe(true)
    expect(canvas.isTargetTransparent(rect, 9, 9)).toBe(true)
    expect(canvas.isTargetTransparent(rect, 10, 10)).toBe(true)
    expect(canvas.isTargetTransparent(rect, 11, 11)).toBe(true)
    expect(canvas.isTargetTransparent(rect, 12, 12)).toBe(true)
    expect(canvas.isTargetTransparent(rect, 13, 13)).toBe(true)
    expect(canvas.isTargetTransparent(rect, 14, 14)).toBe(true)
    expect(canvas.isTargetTransparent(rect, 15, 15)).toBe(true)
    expect(canvas.isTargetTransparent(rect, 16, 16)).toBe(true)
    expect(canvas.isTargetTransparent(rect, 17, 17)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 18, 18)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 19, 19)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 20, 20)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 21, 21)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 22, 22)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 23, 23)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 24, 24)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 25, 25)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 26, 26)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 27, 27)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 28, 28)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 29, 29)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 30, 30)).toBe(false)
    expect(canvas.isTargetTransparent(rect, 31, 31)).toBe(true)
  })

  test("canvas inheritance", function () {
    // this should not error out
    var InheritedCanvasClass = fabric.util.createClass(fabric.Canvas, {
      initialize: function () {}
    })

    expect(typeof InheritedCanvasClass === "function").toBeTruthy()
  })

  test("_shouldCenterTransform", function () {
    expect(canvas._shouldCenterTransform({}, "someAction", false)).toBe(false)
    expect(canvas._shouldCenterTransform({}, "someAction", true)).toBe(true)
    canvas.centeredScaling = true
    ;["scale", "scaleX", "scaleY", "resizing"].forEach(function (action) {
      expect(canvas._shouldCenterTransform({}, action, false)).toBe(true)
    })
    ;["scale", "scaleX", "scaleY", "resizing"].forEach(function (action) {
      expect(canvas._shouldCenterTransform({}, action, true)).toBe(false)
    })
    expect(canvas._shouldCenterTransform({}, "rotate", false)).toBe(false)
    canvas.centeredRotation = true
    expect(canvas._shouldCenterTransform({}, "rotate", false)).toBe(true)
  })
})
