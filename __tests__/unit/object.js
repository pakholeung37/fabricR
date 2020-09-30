var canvas = new fabric.StaticCanvas(null, {
  enableRetinaScaling: false
})

describe("fabric.Object", () => {
  afterEach(function () {
    fabric.perfLimitSizeTotal = 2097152
    fabric.maxCacheSideLimit = 4096
    fabric.minCacheSideLimit = 256
    fabric.devicePixelRatio = 1
    canvas.enableRetinaScaling = false
    canvas.setZoom(1)
    canvas.clear()
    canvas.backgroundColor = fabric.Canvas.prototype.backgroundColor
    canvas.calcOffset()
  })
  test("constructor & properties", function () {
    expect(typeof fabric.Object === "function").toBeTruthy()

    var cObj = new fabric.Object()

    expect(cObj).toBeTruthy()
    expect(cObj instanceof fabric.Object).toBeTruthy()
    expect(cObj.constructor === fabric.Object).toBeTruthy()

    expect(cObj.type).toBe("object")
    expect(cObj.includeDefaultValues).toBe(true)
    expect(cObj.selectable).toBe(true)
  })

  test("get", function () {
    var cObj = new fabric.Object({
      left: 11,
      top: 22,
      width: 50,
      height: 60,
      opacity: 0.7
    })

    expect(cObj.get("left")).toBe(11)
    expect(cObj.get("top")).toBe(22)
    expect(cObj.get("width")).toBe(50)
    expect(cObj.get("height")).toBe(60)
    expect(cObj.get("opacity")).toBe(0.7)
  })

  test("set", function () {
    var cObj = new fabric.Object({
      left: 11,
      top: 22,
      width: 50,
      height: 60,
      opacity: 0.7
    })

    cObj.set("left", 12)
    cObj.set("top", 23)
    cObj.set("width", 51)
    cObj.set("height", 61)
    cObj.set("opacity", 0.5)

    expect(cObj.get("left")).toBe(12)
    expect(cObj.get("top")).toBe(23)
    expect(cObj.get("width")).toBe(51)
    expect(cObj.get("height")).toBe(61)
    expect(cObj.get("opacity")).toBe(0.5)

    expect(cObj.set("opacity", 0.5)).toBe(cObj)
  })

  test("set with object of prop/values", function () {
    var cObj = new fabric.Object({})

    expect(cObj).toBe(cObj.set({ width: 99, height: 88, fill: "red" }))

    expect("red").toBe(cObj.get("fill"))
    expect(99).toBe(cObj.get("width"))
    expect(88).toBe(cObj.get("height"))
  })

  // test('Dinamically generated accessors', function() {
  //   var cObj = new fabric.Object({ });
  //
  //   .equal('function', typeof cObj.getWidth);
  //   .equal('function', typeof cObj.setWidth);
  //
  //   .equal('function', typeof cObj.getFill);
  //   .equal('function', typeof cObj.setFill);
  //
  //   .equal(cObj, cObj.setFill('red'), 'chainable');
  //   .equal('red', cObj.getFill());
  //
  //   cObj.setScaleX(2.3);
  //   .equal(2.3, cObj.getScaleX());
  //
  //   cObj.setOpacity(0.123);
  //   .equal(0.123, cObj.getOpacity());
  // });

  test("stateProperties", function () {
    var cObj = new fabric.Object()
    expect(cObj.stateProperties).toBeTruthy()
    expect(cObj.stateProperties.length > 0).toBeTruthy()
  })

  test("transform", function () {
    var cObj = new fabric.Object()
    expect(typeof cObj.transform === "function").toBeTruthy()
  })

  test("toJSON", function () {
    var emptyObjectJSON =
      '{"type":"object","version":"' +
      fabric.version +
      '","originX":"left","originY":"top","left":0,"top":0,"width":0,"height":0,"fill":"rgb(0,0,0)",' +
      '"stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,' +
      '"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,' +
      '"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over",' +
      '"skewX":0,"skewY":0}'

    var augmentedJSON =
      '{"type":"object","version":"' +
      fabric.version +
      '","originX":"left","originY":"top","left":0,"top":0,"width":122,"height":0,"fill":"rgb(0,0,0)",' +
      '"stroke":null,"strokeWidth":1,"strokeDashArray":[5,2],"strokeLineCap":"round","strokeDashOffset":0,"strokeLineJoin":"bevil","strokeMiterLimit":5,' +
      '"scaleX":1.3,"scaleY":1,"angle":0,"flipX":false,"flipY":true,"opacity":0.88,' +
      '"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over",' +
      '"skewX":0,"skewY":0}'

    var cObj = new fabric.Object()
    expect(typeof cObj.toJSON === "function").toBeTruthy()
    expect(JSON.stringify(cObj.toJSON())).toBe(emptyObjectJSON)

    cObj
      .set("opacity", 0.88)
      .set("scaleX", 1.3)
      .set("width", 122)
      .set("flipY", true)
      .set("strokeDashArray", [5, 2])
      .set("strokeLineCap", "round")
      .set("strokeLineJoin", "bevil")
      .set("strokeMiterLimit", 5)

    expect(JSON.stringify(cObj.toJSON())).toBe(augmentedJSON)
  })

  test("toObject", function () {
    var emptyObjectRepr = {
      version: fabric.version,
      type: "object",
      originX: "left",
      originY: "top",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
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
      skewY: 0
    }

    var augmentedObjectRepr = {
      version: fabric.version,
      type: "object",
      originX: "left",
      originY: "top",
      left: 10,
      top: 20,
      width: 30,
      height: 40,
      fill: "rgb(0,0,0)",
      stroke: null,
      strokeWidth: 1,
      strokeDashArray: [5, 2],
      strokeLineCap: "round",
      strokeDashOffset: 0,
      strokeLineJoin: "bevil",
      strokeMiterLimit: 5,
      scaleX: 1,
      scaleY: 1,
      angle: 0,
      flipX: true,
      flipY: false,
      opacity: 0.13,
      shadow: null,
      visible: true,
      backgroundColor: "",
      fillRule: "nonzero",
      paintFirst: "fill",
      globalCompositeOperation: "source-over",
      skewX: 0,
      skewY: 0
    }

    var cObj = new fabric.Object()
    expect(emptyObjectRepr).toEqual(cObj.toObject())

    cObj
      .set("left", 10)
      .set("top", 20)
      .set("width", 30)
      .set("height", 40)
      .set("flipX", true)
      .set("opacity", 0.13)
      .set("strokeDashArray", [5, 2])
      .set("strokeLineCap", "round")
      .set("strokeLineJoin", "bevil")
      .set("strokeMiterLimit", 5)

    expect(augmentedObjectRepr).toEqual(cObj.toObject())

    var fractionalValue = 166.66666666666666,
      testedProperties = "left top width height".split(" "),
      fractionDigitsDefault = 2

    function testFractionDigits(fractionDigits, expectedValue) {
      fabric.Object.NUM_FRACTION_DIGITS = fractionDigits

      testedProperties.forEach(function (property) {
        cObj.set(property, fractionalValue)
        expect(cObj.toObject()[property]).toBe(expectedValue)
      }, this)

      fabric.Object.NUM_FRACTION_DIGITS = fractionDigitsDefault
    }

    testFractionDigits.call(this, 2, 166.67)
    testFractionDigits.call(this, 3, 166.667)
    testFractionDigits.call(this, 0, 167)
  })

  test("toObject without default values", function () {
    var emptyObjectRepr = {
      version: fabric.version,
      type: "object",
      top: 0,
      left: 0
    }

    var augmentedObjectRepr = {
      version: fabric.version,
      type: "object",
      left: 10,
      top: 20,
      width: 30,
      height: 40,
      strokeDashArray: [5, 2],
      strokeLineCap: "round",
      strokeLineJoin: "bevil",
      strokeMiterLimit: 5,
      flipX: true,
      opacity: 0.13
    }

    var cObj = new fabric.Object(),
      toObjectObj
    cObj.includeDefaultValues = false
    expect(emptyObjectRepr).toEqual(cObj.toObject())

    cObj
      .set("left", 10)
      .set("top", 20)
      .set("width", 30)
      .set("height", 40)
      .set("flipX", true)
      .set("opacity", 0.13)
      .set("strokeDashArray", [5, 2])
      .set("strokeLineCap", "round")
      .set("strokeLineJoin", "bevil")
      .set("strokeMiterLimit", 5)
    toObjectObj = cObj.toObject()
    expect(augmentedObjectRepr).toEqual(toObjectObj)
    expect(augmentedObjectRepr.strokeDashArray).not.toBe(
      toObjectObj.strokeDashArray
    )
    expect(augmentedObjectRepr.strokeDashArray).toEqual(
      toObjectObj.strokeDashArray
    )
  })

  test("toDatalessObject", function () {
    var cObj = new fabric.Object()
    expect(typeof cObj.toDatalessObject === "function").toBeTruthy()
    expect(cObj.toObject()).toEqual(cObj.toDatalessObject())
  })

  test("toString", function () {
    var cObj = new fabric.Object()
    expect(cObj.toString()).toBe("#<fabric.Object>")
    cObj.type = "moo"
    expect(cObj.toString()).toBe("#<fabric.Moo>")
  })

  test("render", function () {
    var cObj = new fabric.Object()
    expect(typeof cObj.render === "function").toBeTruthy()
  })

  test("rotate", function () {
    var cObj = new fabric.Object()
    expect(typeof cObj.rotate === "function").toBeTruthy()
    expect(cObj.get("angle")).toBe(0)
    expect(cObj.rotate(45)).toBe(cObj)
    expect(cObj.get("angle")).toBe(45)
  })

  test("scale", function () {
    var cObj = new fabric.Object()
    expect(typeof cObj.scale === "function").toBeTruthy()
    expect(cObj.get("scaleX")).toBe(1)
    expect(cObj.get("scaleY")).toBe(1)
    cObj.scale(1.5)
    expect(cObj.get("scaleX")).toBe(1.5)
    expect(cObj.get("scaleY")).toBe(1.5)
    expect(cObj.scale(2)).toBe(cObj)
  })

  test("setOpacity", function () {
    var cObj = new fabric.Object()
    expect(cObj.get("opacity")).toBe(1)
    cObj.set("opacity", 0.68)
    expect(cObj.get("opacity")).toBe(0.68)
    expect(cObj.set("opacity", 1)).toBe(cObj)
  })

  test("getAngle", function () {
    var cObj = new fabric.Object()
    expect(cObj.get("angle")).toBe(0)
    cObj.rotate(45)
    expect(cObj.get("angle")).toBe(45)
  })

  test("rotate", function () {
    var cObj = new fabric.Object()
    expect(cObj.get("angle")).toBe(0)
    expect(cObj.set("angle", 45)).toBe(cObj)
    expect(cObj.get("angle")).toBe(45)
  })

  test("drawBorders", function () {
    var cObj = new fabric.Object(),
      canvas = fabric.document.createElement("canvas")

    var dummyContext = canvas.getContext("2d")

    expect(typeof cObj.drawBorders === "function").toBeTruthy()
    expect(cObj.drawBorders(dummyContext)).toBe(cObj)
  })

  test("drawControls", function () {
    var cObj = new fabric.Object(),
      _canvas = fabric.document.createElement("canvas")
    cObj.canvas = canvas
    var dummyContext = _canvas.getContext("2d")
    expect(typeof cObj.drawControls === "function").toBeTruthy()
    expect(cObj.drawControls(dummyContext)).toBe(cObj)
  })

  test("clone", function () {
    var cObj = new fabric.Object({ left: 123, top: 456, opacity: 0.66 })
    expect(typeof cObj.clone === "function").toBeTruthy()
    cObj.clone(function (clone) {
      expect(clone.get("left")).toBe(123)
      expect(clone.get("top")).toBe(456)
      expect(clone.get("opacity")).toBe(0.66)

      // augmenting clone properties should not affect original instance
      clone.set("left", 12).set("scaleX", 2.5).rotate(33)

      expect(cObj.get("left")).toBe(123)
      expect(cObj.get("scaleX")).toBe(1)
      expect(cObj.get("angle")).toBe(0)
    })
  })

  test("cloneAsImage", function (done) {
    var cObj = new fabric.Rect({
      width: 100,
      height: 100,
      fill: "red",
      strokeWidth: 0
    })
    expect(typeof cObj.cloneAsImage === "function").toBeTruthy()
    cObj.cloneAsImage(function (image) {
      expect(image).toBeTruthy()
      expect(image instanceof fabric.Image).toBeTruthy()
      expect(image.width).toBe(100)
      done()
    })
  })

  test("cloneAsImage with retina scaling enabled", function (done) {
    var cObj = new fabric.Rect({
      width: 100,
      height: 100,
      fill: "red",
      strokeWidth: 0
    })
    fabric.devicePixelRatio = 2
    cObj.cloneAsImage(
      function (image) {
        expect(image).toBeTruthy()
        expect(image instanceof fabric.Image).toBeTruthy()
        expect(image.width).toBe(200)
        fabric.devicePixelRatio = 1
        done()
      },
      { enableRetinaScaling: true }
    )
  })

  test("toCanvasElement", function () {
    var cObj = new fabric.Rect({
      width: 100,
      height: 100,
      fill: "red",
      strokeWidth: 0
    })

    expect(typeof cObj.toCanvasElement === "function").toBeTruthy()

    var canvasEl = cObj.toCanvasElement()

    expect(typeof canvasEl.getContext === "function").toBeTruthy()
  })

  test("toCanvasElement activeSelection", function () {
    var cObj = new fabric.Rect({
      width: 100,
      height: 100,
      fill: "red",
      strokeWidth: 0
    })

    var cObj2 = new fabric.Rect({
      width: 100,
      height: 100,
      fill: "red",
      strokeWidth: 0
    })

    canvas.add(cObj, cObj2)

    var activeSel = new fabric.ActiveSelection([cObj, cObj2], {
      canvas: canvas
    })

    expect(cObj.canvas).toBe(canvas)

    activeSel.toCanvasElement()

    expect(cObj.canvas).toBe(canvas)

    activeSel.destroy()

    expect(cObj.canvas).toBe(canvas)
  })

  test("toCanvasElement does not modify oCoords on zoomed canvas", function () {
    var cObj = new fabric.Rect({
      width: 100,
      height: 100,
      fill: "red",
      strokeWidth: 0
    })
    canvas.setZoom(2)
    canvas.add(cObj)
    var originaloCoords = cObj.oCoords
    var originalaCoords = cObj.aCoords
    cObj.toCanvasElement()
    expect(cObj.oCoords).toEqual(originaloCoords)
    expect(cObj.aCoords).toEqual(originalaCoords)
  })

  test("toDataURL", function () {
    var cObj = new fabric.Rect({
      width: 100,
      height: 100,
      fill: "red",
      strokeWidth: 0
    })

    expect(typeof cObj.toDataURL === "function").toBeTruthy()

    var dataURL = cObj.toDataURL()
    expect(typeof dataURL).toBe("string")
    expect(dataURL.substring(0, 21)).toBe("data:image/png;base64")

    try {
      dataURL = cObj.toDataURL({ format: "jpeg" })
      expect(dataURL.substring(0, 22)).toBe("data:image/jpeg;base64")
    } catch (err) {
      fabric.log("jpeg toDataURL not supported")
    }
  })

  test("toDataURL & reference to canvas", function () {
    // var data =
    //   'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQA'+
    //   'AABkCAYAAABw4pVUAAAA+UlEQVR4nO3RoRHAQBDEsOu/6YR+B2s'+
    //   'gIO4Z3919pMwDMCRtHoAhafMADEmbB2BI2jwAQ9LmARiSNg/AkLR5AI'+
    //   'akzQMwJG0egCFp8wAMSZsHYEjaPABD0uYBGJI2D8CQtHkAhqTNAzAkbR'+
    //   '6AIWnzAAxJmwdgSNo8AEPS5gEYkjYPwJC0eQCGpM0DMCRtHoAhafMADEm'+
    //   'bB2BI2jwAQ9LmARiSNg/AkLR5AIakzQMwJG0egCFp8wAMSZsHYEjaPABD0'+
    //   'uYBGJI2D8CQtHkAhqTNAzAkbR6AIWnzAAxJmwdgSNo8AEPS5gEYkjYPw'+
    //   'JC0eQCGpM0DMCRtHsDjB5K06yueJFXJAAAAAElFTkSuQmCC';

    var cObj = new fabric.Rect({
      width: 100,
      height: 100,
      fill: "red"
    })
    canvas.add(cObj)
    var objCanvas = cObj.canvas
    cObj.toDataURL()

    expect(objCanvas).toBe(cObj.canvas)
  })

  test("isType", function () {
    var cObj = new fabric.Object()
    expect(typeof cObj.isType === "function").toBeTruthy()
    expect(cObj.isType("object")).toBeTruthy()
    expect(!cObj.isType("rect")).toBeTruthy()
    cObj = new fabric.Rect()
    expect(cObj.isType("rect")).toBeTruthy()
    expect(!cObj.isType("object")).toBeTruthy()
  })

  test("toggle", function () {
    var object = new fabric.Object({
      left: 100,
      top: 124,
      width: 210,
      height: 66
    })
    expect(typeof object.toggle === "function").toBeTruthy()

    object.set("flipX", false)
    expect(object.toggle("flipX")).toBe(object)
    expect(object.get("flipX")).toBe(true)
    object.toggle("flipX")
    expect(object.get("flipX")).toBe(false)

    object.set("left", 112.45)
    object.toggle("left")
    expect(object.get("left")).toBe(112.45)
  })

  test("_setLineDash", function () {
    var object = new fabric.Rect({
      left: 100,
      top: 124,
      width: 210,
      height: 66,
      stroke: "black",
      strokeWidth: 2
    })
    expect(typeof object._setLineDash === "function").toBeTruthy()
    object.strokeDashArray = [3, 2, 1]
    expect(object.strokeDashArray.length).toBe(3)
    object._setLineDash(canvas.contextContainer, object.strokeDashArray, null)
    expect(object.strokeDashArray.length).toBe(6)

    expect(canvas.contextContainer.getLineDash().length).toBe(6)
    object._setLineDash(canvas.contextContainer, [], null)
    expect(canvas.contextContainer.getLineDash().length).toBe(6)
  })

  test("straighten", function () {
    var object = new fabric.Object({
      left: 100,
      top: 124,
      width: 210,
      height: 66
    })
    expect(typeof object.straighten === "function").toBeTruthy()

    object.rotate(123.456)
    object.straighten()
    expect(object.get("angle")).toBe(90)

    object.rotate(97.111)
    object.straighten()
    expect(object.get("angle")).toBe(90)

    object.rotate(3.45)
    object.straighten()
    expect(object.get("angle")).toBe(0)

    object.rotate(-157)
    object.straighten()
    expect(object.get("angle")).toBe(-180)

    object.rotate(159)
    object.straighten()
    expect(object.get("angle")).toBe(180)

    object.rotate(999)
    object.straighten()
    expect(object.get("angle")).toBe(270)
  })

  test("fxStraighten", function (done) {
    var object = new fabric.Object({
      left: 20,
      top: 30,
      width: 40,
      height: 50,
      angle: 43
    })

    var onCompleteFired = false
    var onComplete = function () {
      onCompleteFired = true
    }

    var onChangeFired = false
    var onChange = function () {
      onChangeFired = true
    }

    var callbacks = { onComplete: onComplete, onChange: onChange }
    expect(typeof object.fxStraighten === "function").toBeTruthy()
    expect(object.fxStraighten(callbacks)).toBe(object)
    expect(fabric.util.toFixed(object.get("angle"), 0)).toBe(43)
    setTimeout(function () {
      expect(onCompleteFired).toBeTruthy()
      expect(onChangeFired).toBeTruthy()
      expect(object.get("angle")).toBe(0)
      expect(object.fxStraighten()).toBe(object)
      done()
    }, 1000)
  })

  test("on off fire are chainable", function () {
    var object = new fabric.Object({
      left: 20,
      top: 30,
      width: 40,
      height: 50,
      angle: 43
    })
    var ret
    ret = object.fire("")
    expect(ret).toBe(object)
    ret = object.on("hi", function () {})
    expect(ret).toBe(object)
    ret = object.fire("bye")
    expect(ret).toBe(object)
    ret = object.fire("hi")
    expect(ret).toBe(object)
    ret = object.off("hi")
    expect(ret).toBe(object)
  })

  test("observable", function () {
    var object = new fabric.Object({
      left: 20,
      top: 30,
      width: 40,
      height: 50,
      angle: 43
    })

    var fooFired = false,
      barFired = false

    object.on("foo", function () {
      fooFired = true
    })
    object.on("bar", function () {
      barFired = true
    })

    object.fire("foo")
    expect(fooFired).toBeTruthy()
    expect(!barFired).toBeTruthy()

    object.fire("bar")
    expect(fooFired).toBeTruthy()
    expect(barFired).toBeTruthy()

    var firedOptions
    object.on("baz", function (options) {
      firedOptions = options
    })
    object.fire("baz", { param1: "abrakadabra", param2: 3.1415 })

    expect("abrakadabra").toBe(firedOptions.param1)
    expect(3.1415).toBe(firedOptions.param2)
  })

  test("object:added", function () {
    var object = new fabric.Object()
    var addedEventFired = false

    object.on("added", function () {
      addedEventFired = true
    })
    canvas.add(object)

    expect(addedEventFired).toBeTruthy()
  })

  test("canvas reference", function () {
    var object = new fabric.Object()
    var object2 = new fabric.Object()

    canvas.add(object)
    canvas.insertAt(object2, 0)

    expect(object.canvas === canvas).toBeTruthy()
    expect(object2.canvas === canvas).toBeTruthy()
  })

  test("object:removed", function () {
    var object = new fabric.Object()
    var removedEventFired = false

    canvas.add(object)

    object.on("removed", function () {
      removedEventFired = true
    })
    canvas.remove(object)

    expect(removedEventFired).toBeTruthy()
  })

  test("center", function () {
    var object = new fabric.Object()
    object.strokeWidth = 0
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
    expect(typeof object.center === "function").toBeTruthy()

    canvas.add(object)
    expect(object.center()).toBe(object)

    expect(object.getCenterPoint().x).toBe(canvas.getWidth() / 2)
    expect(object.getCenterPoint().y).toBe(canvas.getHeight() / 2)

    canvas.setZoom(2)
    object.center()
    expect(object.getCenterPoint().x).toBe(canvas.getWidth() / 2)
    expect(object.getCenterPoint().y).toBe(canvas.getHeight() / 2)
  })

  test("centerH", function () {
    var object = new fabric.Object()
    object.strokeWidth = 0
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
    expect(typeof object.centerH === "function").toBeTruthy()
    var oldY = object.top

    canvas.add(object)
    expect(object.centerH()).toBe(object)

    expect(object.getCenterPoint().x).toBe(canvas.getWidth() / 2)
    expect(object.top).toBe(oldY)
    canvas.setZoom(2)
    object.centerH()
    expect(object.getCenterPoint().x).toBe(canvas.getWidth() / 2)
  })

  test("centerV", function () {
    var object = new fabric.Object()
    object.strokeWidth = 0
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
    expect(typeof object.centerV === "function").toBeTruthy()
    var oldX = object.left

    canvas.add(object)
    expect(object.centerV()).toBe(object)
    expect(object.left).toBe(oldX)
    expect(object.getCenterPoint().y).toBe(canvas.getHeight() / 2)

    canvas.setZoom(2)
    object.centerV()
    expect(object.getCenterPoint().y).toBe(canvas.getHeight() / 2)
  })

  test("viewportCenter", function () {
    var object = new fabric.Object()
    object.strokeWidth = 0
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
    expect(typeof object.viewportCenter === "function").toBeTruthy()

    canvas.add(object)
    expect(object.viewportCenter()).toBe(object)

    expect(object.getCenterPoint().x).toBe(canvas.getWidth() / 2)
    expect(object.getCenterPoint().y).toBe(canvas.getHeight() / 2)

    canvas.setZoom(2)
    object.viewportCenter()
    expect(object.getCenterPoint().x).toBe(
      canvas.getWidth() / (2 * canvas.getZoom())
    )
    expect(object.getCenterPoint().y).toBe(
      canvas.getHeight() / (2 * canvas.getZoom())
    )
  })

  test("viewportCenterH", function () {
    var object = new fabric.Object()
    object.strokeWidth = 0
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
    expect(typeof object.viewportCenterH === "function").toBeTruthy()

    var oldY = object.top
    canvas.add(object)
    expect(object.viewportCenterH()).toBe(object)
    expect(object.getCenterPoint().x).toBe(canvas.getWidth() / 2)
    expect(object.top).toBe(oldY)
    canvas.setZoom(2)
    object.viewportCenterH()
    expect(object.getCenterPoint().x).toBe(
      canvas.getWidth() / (2 * canvas.getZoom())
    )
    expect(object.top).toBe(oldY)
  })

  test("viewportCenterV", function () {
    var object = new fabric.Object()
    object.strokeWidth = 0
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
    expect(typeof object.viewportCenterV === "function").toBeTruthy()

    var oldX = object.left

    canvas.add(object)
    expect(object.viewportCenterV()).toBe(object)
    expect(object.getCenterPoint().y).toBe(canvas.getHeight() / 2)
    expect(object.left).toBe(oldX)
    canvas.setZoom(2)
    object.viewportCenterV()
    expect(object.getCenterPoint().y).toBe(
      canvas.getHeight() / (2 * canvas.getZoom())
    )
    expect(object.left).toBe(oldX)
  })

  test("sendToBack", function () {
    var object = new fabric.Object()

    expect(typeof object.sendToBack === "function").toBeTruthy()

    canvas.add(object)
    expect(object.sendToBack()).toBe(object)
  })

  test("bringToFront", function () {
    var object = new fabric.Object()

    expect(typeof object.bringToFront === "function").toBeTruthy()

    canvas.add(object)
    expect(object.bringToFront()).toBe(object)
  })

  test("sendBackwards", function () {
    var object = new fabric.Object()

    expect(typeof object.sendBackwards === "function").toBeTruthy()

    canvas.add(object)
    expect(object.sendBackwards()).toBe(object)
  })

  test("bringForward", function () {
    var object = new fabric.Object()

    expect(typeof object.bringForward === "function").toBeTruthy()

    canvas.add(object)
    expect(object.bringForward()).toBe(object)
  })

  test("moveTo", function () {
    var object = new fabric.Object()

    expect(typeof object.moveTo === "function").toBeTruthy()

    canvas.add(object)
    expect(object.moveTo()).toBe(object)
  })

  test("getTotalObjectScaling with zoom", function () {
    var object = new fabric.Object({ scaleX: 3, scaleY: 2 })
    canvas.setZoom(3)
    canvas.add(object)
    var objectScale = object.getTotalObjectScaling()
    expect(objectScale).toEqual({
      scaleX: object.scaleX * 3,
      scaleY: object.scaleY * 3
    })
  })

  test("getTotalObjectScaling with retina", function () {
    var object = new fabric.Object({ scaleX: 3, scaleY: 2 })
    canvas.enableRetinaScaling = true
    fabric.devicePixelRatio = 4
    canvas.add(object)
    var objectScale = object.getTotalObjectScaling()
    expect(objectScale).toEqual({
      scaleX: object.scaleX * 4,
      scaleY: object.scaleY * 4
    })
  })

  test("getObjectScaling", function () {
    var object = new fabric.Object({ scaleX: 3, scaleY: 2 })
    var objectScale = object.getObjectScaling()
    expect(objectScale).toEqual({
      scaleX: object.scaleX,
      scaleY: object.scaleY
    })
  })

  test("getObjectScaling in group", function () {
    var object = new fabric.Object({ scaleX: 3, scaleY: 2 })
    var group = new fabric.Group()
    group.scaleX = 2
    group.scaleY = 2
    object.group = group
    var objectScale = object.getObjectScaling()
    expect(objectScale).toEqual({
      scaleX: object.scaleX * group.scaleX,
      scaleY: object.scaleY * group.scaleY
    })
  })

  test("getObjectScaling in group with object rotated", function () {
    var object = new fabric.Object({ scaleX: 3, scaleY: 2, angle: 45 })
    var group = new fabric.Group()
    group.scaleX = 2
    group.scaleY = 3
    object.group = group
    var objectScale = object.getObjectScaling()
    objectScale.scaleX = objectScale.scaleX.toFixed(3)
    objectScale.scaleY = objectScale.scaleY.toFixed(3)
    expect(objectScale).toEqual({
      scaleX: "7.649",
      scaleY: "4.707"
    })
  })

  test("dirty flag on set property", function () {
    var object = new fabric.Object({ scaleX: 3, scaleY: 2 })
    object.cacheProperties = ["propA", "propB"]
    object.dirty = false
    expect(object.dirty).toBe(false)
    object.set("propC", "3")
    expect(object.dirty).toBe(false)
    object.set("propA", "2")
    expect(object.dirty).toBe(true)
  })

  test("_createCacheCanvas sets object as dirty", function () {
    var object = new fabric.Object({
      scaleX: 3,
      scaleY: 2,
      width: 1,
      height: 2
    })
    expect(object.dirty).toBe(true)
    object.dirty = false
    expect(object.dirty).toBe(false)
    object._createCacheCanvas()
    expect(object.dirty).toBe(true)
  })

  test("isCacheDirty statefullCache disabled", function () {
    var object = new fabric.Object({
      scaleX: 3,
      scaleY: 2,
      width: 1,
      height: 2
    })
    expect(object.dirty).toBe(true)
    object.cacheProperties = ["propA", "propB"]
    object.dirty = false
    object.statefullCache = false
    expect(object.isCacheDirty()).toBe(false)
    object.dirty = true
    expect(object.isCacheDirty()).toBe(true)
  })

  test("isCacheDirty statefullCache enabled", function () {
    var object = new fabric.Object({
      scaleX: 3,
      scaleY: 2,
      width: 1,
      height: 2
    })
    object.cacheProperties = ["propA", "propB"]
    object.dirty = false
    object.statefullCache = true
    object.propA = "A"
    object.setupState({ propertySet: "cacheProperties" })
    expect(object.isCacheDirty()).toBe(false)
    object.propA = "B"
    expect(object.isCacheDirty()).toBe(true)
  })

  test("_getCacheCanvasDimensions returns dimensions and zoom for cache canvas", function () {
    var object = new fabric.Object({ width: 10, height: 10, strokeWidth: 0 })
    var dims = object._getCacheCanvasDimensions()
    expect(dims).toEqual({
      width: 12,
      height: 12,
      zoomX: 1,
      zoomY: 1,
      x: 10,
      y: 10
    })
    object.strokeWidth = 2
    dims = object._getCacheCanvasDimensions()
    expect(dims).toEqual({
      width: 14,
      height: 14,
      zoomX: 1,
      zoomY: 1,
      x: 12,
      y: 12
    })
    object.scaleX = 2
    object.scaleY = 3
    dims = object._getCacheCanvasDimensions()
    expect(dims).toEqual({
      width: 26,
      height: 38,
      zoomX: 2,
      zoomY: 3,
      x: 24,
      y: 36
    })
  })

  test("_getCacheCanvasDimensions and strokeUniform", function () {
    var object = new fabric.Object({ width: 10, height: 10, strokeWidth: 2 })
    var dims = object._getCacheCanvasDimensions()
    expect(dims).toEqual({
      width: 14,
      height: 14,
      zoomX: 1,
      zoomY: 1,
      x: 12,
      y: 12
    })
    object.strokeUniform = true
    var dims = object._getCacheCanvasDimensions()
    expect(dims).toEqual({
      width: 14,
      height: 14,
      zoomX: 1,
      zoomY: 1,
      x: 12,
      y: 12
    })
    object.scaleX = 2
    object.scaleY = 3
    dims = object._getCacheCanvasDimensions()
    expect(dims).toEqual({
      width: 24,
      height: 34,
      zoomX: 2,
      zoomY: 3,
      x: 22,
      y: 32
    })
  })

  test("_updateCacheCanvas check if cache canvas should be updated", function () {
    fabric.perfLimitSizeTotal = 10000
    fabric.maxCacheSideLimit = 4096
    fabric.minCacheSideLimit = 1
    var object = new fabric.Object({ width: 10, height: 10, strokeWidth: 0 })
    object._createCacheCanvas()
    expect(object.cacheWidth).toBe(12)
    expect(object.cacheHeight).toBe(12)
    expect(object._updateCacheCanvas()).toBe(false)
    object.scaleX = 2
    expect(object._updateCacheCanvas()).toBe(true)
    expect(object.cacheWidth).toBe(22)
    expect(object.zoomX).toBe(2)
    object.width = 2
    expect(object._updateCacheCanvas()).toBe(true)
    expect(object.cacheWidth).toBe(6)
    object.strokeWidth = 2
    expect(object._updateCacheCanvas()).toBe(true)
  })

  test("_limitCacheSize limit min to 256", function () {
    fabric.perfLimitSizeTotal = 50000
    fabric.maxCacheSideLimit = 4096
    fabric.minCacheSideLimit = 256
    var object = new fabric.Object({ width: 200, height: 200, strokeWidth: 0 })
    var dims = object._getCacheCanvasDimensions()
    var zoomX = dims.zoomX
    var zoomY = dims.zoomY
    var limitedDims = object._limitCacheSize(dims)
    expect(dims).toBe(limitedDims)
    expect(dims.width).toBe(256)
    expect(dims.height).toBe(256)
    expect(zoomX).toBe(dims.zoomX)
    expect(zoomY).toBe(dims.zoomY)
  })

  test("_limitCacheSize does not limit if not necessary", function () {
    fabric.perfLimitSizeTotal = 1000000
    fabric.maxCacheSideLimit = 4096
    fabric.minCacheSideLimit = 256
    var object = new fabric.Object({ width: 400, height: 400, strokeWidth: 0 })
    var dims = object._getCacheCanvasDimensions()
    var zoomX = dims.zoomX
    var zoomY = dims.zoomY
    var limitedDims = object._limitCacheSize(dims)
    expect(dims).toBe(limitedDims)
    expect(dims.width).toBe(402)
    expect(dims.height).toBe(402)
    expect(zoomX).toBe(dims.zoomX)
    expect(zoomY).toBe(dims.zoomY)
  })

  test("_limitCacheSize does cap up minCacheSideLimit", function () {
    fabric.perfLimitSizeTotal = 10000
    fabric.maxCacheSideLimit = 4096
    fabric.minCacheSideLimit = 256
    var object = new fabric.Object({ width: 400, height: 400, strokeWidth: 0 })
    var dims = object._getCacheCanvasDimensions()
    var width = dims.width
    var height = dims.height
    var zoomX = dims.zoomX
    var zoomY = dims.zoomY
    var limitedDims = object._limitCacheSize(dims)
    expect(dims).toBe(limitedDims)
    expect(dims.width).toBe(256)
    expect(dims.height).toBe(256)
    expect((zoomX * dims.width) / width).toBe(dims.zoomX)
    expect((zoomY * dims.height) / height).toBe(dims.zoomY)
  })

  test("_limitCacheSize does cap up if necessary", function () {
    fabric.perfLimitSizeTotal = 1000000
    fabric.maxCacheSideLimit = 4096
    fabric.minCacheSideLimit = 256
    var object = new fabric.Object({
      width: 2046,
      height: 2046,
      strokeWidth: 0
    })
    var dims = object._getCacheCanvasDimensions()
    var width = dims.width
    var height = dims.height
    var zoomX = dims.zoomX
    var zoomY = dims.zoomY
    var limitedDims = object._limitCacheSize(dims)
    expect(dims).toBe(limitedDims)
    expect(dims.width).toBe(1000)
    expect(dims.height).toBe(1000)
    expect((zoomX * dims.width) / width).toBe(dims.zoomX)
    expect((zoomY * dims.height) / height).toBe(dims.zoomY)
  })

  test("_limitCacheSize does cap up if necessary to maxCacheSideLimit", function () {
    fabric.perfLimitSizeTotal = 100000000
    fabric.maxCacheSideLimit = 4096
    fabric.minCacheSideLimit = 256
    var object = new fabric.Object({
      width: 8192,
      height: 8192,
      strokeWidth: 0
    })
    var dims = object._getCacheCanvasDimensions()
    var zoomX = dims.zoomX
    var zoomY = dims.zoomY
    var limitedDims = object._limitCacheSize(dims)
    expect(dims).toBe(limitedDims)
    expect(dims.width).toBe(fabric.maxCacheSideLimit)
    expect(dims.height).toBe(fabric.maxCacheSideLimit)
    expect(dims.zoomX).toBe((zoomX * 4096) / 8194)
    expect(dims.zoomY).toBe((zoomY * 4096) / 8194)
  })

  test("_limitCacheSize does cap up if necessary to maxCacheSideLimit, different AR", function () {
    fabric.perfLimitSizeTotal = 100000000
    fabric.maxCacheSideLimit = 4096
    fabric.minCacheSideLimit = 256
    var object = new fabric.Object({
      width: 16384,
      height: 8192,
      strokeWidth: 0
    })
    var dims = object._getCacheCanvasDimensions()
    var width = dims.width
    var height = dims.height
    var zoomX = dims.zoomX
    var zoomY = dims.zoomY
    var limitedDims = object._limitCacheSize(dims)
    expect(dims).toBe(limitedDims)
    expect(dims.width).toBe(fabric.maxCacheSideLimit)
    expect(dims.height).toBe(fabric.maxCacheSideLimit)
    expect(dims.zoomX).toBe((zoomX * fabric.maxCacheSideLimit) / width)
    expect(dims.zoomY).toBe((zoomY * fabric.maxCacheSideLimit) / height)
  })

  test("_setShadow", function () {
    var canvas = new fabric.StaticCanvas(null, {
      enableRetinaScaling: false,
      width: 600,
      height: 600
    })
    var context = canvas.contextContainer
    var object = new fabric.Object({ scaleX: 1, scaleY: 1 })
    var group = new fabric.Group()
    group.scaleX = 2
    group.scaleY = 2
    object.shadow = new fabric.Shadow({
      color: "red",
      blur: 10,
      offsetX: 5,
      offsetY: 15
    })
    object._setShadow(context)
    expect(context.shadowOffsetX).toBe(object.shadow.offsetX)
    expect(context.shadowOffsetY).toBe(object.shadow.offsetY)
    expect(context.shadowBlur).toBe(object.shadow.blur)
    fabric.browserShadowBlurConstant = 1.5
    object._setShadow(context)
    expect(context.shadowOffsetX).toBe(object.shadow.offsetX)
    expect(context.shadowOffsetY).toBe(object.shadow.offsetY)
    expect(context.shadowBlur).toBe(object.shadow.blur * 1.5)
    fabric.browserShadowBlurConstant = 1
    object.scaleX = 2
    object.scaleY = 3
    object._setShadow(context)
    expect(context.shadowOffsetX).toBe(object.shadow.offsetX * object.scaleX)
    expect(context.shadowOffsetY).toBe(object.shadow.offsetY * object.scaleY)
    expect(context.shadowBlur).toBe(
      (object.shadow.blur * (object.scaleX + object.scaleY)) / 2
    )
    object.group = group
    object._setShadow(context)
    expect(context.shadowOffsetX).toBe(
      object.shadow.offsetX * object.scaleX * group.scaleX
    )
    expect(context.shadowOffsetY).toBe(
      object.shadow.offsetY * object.scaleY * group.scaleY
    )
    expect(context.shadowBlur).toBe(
      (object.shadow.blur *
        (object.scaleX * group.scaleX + object.scaleY * group.scaleY)) /
        2
    )
  })

  test("willDrawShadow", function () {
    var object = new fabric.Object({ shadow: { offsetX: 0, offsetY: 0 } })
    expect(object.willDrawShadow()).toBe(false)
    object.shadow.offsetX = 1
    expect(object.willDrawShadow()).toBe(true)
  })

  test("_set  change a property", function () {
    var object = new fabric.Object({ fill: "blue" })
    object._set("fill", "red")
    expect(object.fill).toBe("red")
  })
  test("_set can rise the dirty flag", function () {
    var object = new fabric.Object({ fill: "blue" })
    object.dirty = false
    object._set("fill", "red")
    expect(object.dirty).toBe(true)
  })
  test("_set rise dirty flag only if value changed", function () {
    var object = new fabric.Object({ fill: "blue" })
    object.dirty = false
    object._set("fill", "blue")
    expect(object.dirty).toBe(false)
  })
  test("isNotVisible", function () {
    var object = new fabric.Object({ fill: "blue", width: 100, height: 100 })
    expect(object.isNotVisible()).toBe(false)
    object = new fabric.Object({
      fill: "blue",
      width: 0,
      height: 0,
      strokeWidth: 1
    })
    expect(object.isNotVisible()).toBe(false)
    object = new fabric.Object({ opacity: 0, fill: "blue" })
    expect(object.isNotVisible()).toBe(true)
    object = new fabric.Object({ fill: "blue", visible: false })
    expect(object.isNotVisible()).toBe(true)
    object = new fabric.Object({
      fill: "blue",
      width: 0,
      height: 0,
      strokeWidth: 0
    })
    expect(object.isNotVisible()).toBe(true)
  })
  test("shouldCache", function () {
    var object = new fabric.Object()
    object.objectCaching = false
    expect(object.shouldCache()).toBe(false)
    object.objectCaching = true
    expect(object.shouldCache()).toBe(true)
    object.objectCaching = false
    object.needsItsOwnCache = function () {
      return true
    }
    expect(object.shouldCache()).toBe(true)

    object.needsItsOwnCache = function () {
      return false
    }

    object.objectCaching = true
    object.group = {
      isOnACache: function () {
        return true
      }
    }
    expect(object.shouldCache()).toBe(false)

    object.objectCaching = true
    object.group = {
      isOnACache: function () {
        return false
      }
    }
    expect(object.shouldCache()).toBe(true)

    object.objectCaching = false
    object.group = {
      isOnACache: function () {
        return false
      }
    }
    expect(object.shouldCache()).toBe(false)

    object.objectCaching = false
    object.group = {
      isOnACache: function () {
        return true
      }
    }
    expect(object.shouldCache()).toBe(false)

    object.needsItsOwnCache = function () {
      return true
    }

    object.objectCaching = false
    object.group = {
      isOnACache: function () {
        return true
      }
    }
    expect(object.shouldCache()).toBe(true)

    object.objectCaching = false
    object.group = {
      isOnACache: function () {
        return false
      }
    }
    expect(object.shouldCache()).toBe(true)
  })
  test("needsItsOwnCache", function () {
    var object = new fabric.Object()
    expect(object.needsItsOwnCache()).toBe(false)
    object.clipPath = {}
    expect(object.needsItsOwnCache()).toBe(true)
    delete object.clipPath

    object.paintFirst = "stroke"
    object.stroke = "black"
    object.shadow = {}
    expect(object.needsItsOwnCache()).toBe(true)

    object.paintFirst = "stroke"
    object.stroke = "black"
    object.shadow = null
    expect(object.needsItsOwnCache()).toBe(true)

    object.paintFirst = "stroke"
    object.stroke = ""
    object.shadow = {}
    expect(object.needsItsOwnCache()).toBe(false)

    object.paintFirst = "stroke"
    object.stroke = "black"
    object.fill = ""
    object.shadow = {}
    expect(object.needsItsOwnCache()).toBe(false)
  })
  test("hasStroke", function () {
    var object = new fabric.Object({
      fill: "blue",
      width: 100,
      height: 100,
      strokeWidth: 3,
      stroke: "black"
    })
    expect(object.hasStroke()).toBe(true)
    object.stroke = ""
    expect(object.hasStroke()).toBe(false)
    object.stroke = "transparent"
    expect(object.hasStroke()).toBe(false)
    object.stroke = "black"
    object.strokeWidth = 0
    expect(object.hasStroke()).toBe(false)
  })
  test("hasFill", function () {
    var object = new fabric.Object({ fill: "blue", width: 100, height: 100 })
    expect(object.hasFill()).toBe(true)
    object.fill = ""
    expect(object.hasFill()).toBe(false)
    object.fill = "transparent"
    expect(object.hasFill()).toBe(false)
  })
})
