;(function () {
  var canvas = (this.canvas = new fabric.StaticCanvas(null, {
    enableRetinaScaling: false
  }))

  describe("fabric.Object", {
    afterEach: function () {
      fabric.perfLimitSizeTotal = 2097152
      fabric.maxCacheSideLimit = 4096
      fabric.minCacheSideLimit = 256
      fabric.devicePixelRatio = 1
      canvas.enableRetinaScaling = false
      canvas.setZoom(1)
      canvas.clear()
      canvas.backgroundColor = fabric.Canvas.prototype.backgroundColor
      canvas.calcOffset()
    }
  })

  test("constructor & properties", function (assert) {
    expect(typeof fabric.Object === "function").toBeTruthy()

    var cObj = new fabric.Object()

    expect(cObj).toBeTruthy()
    expect(cObj instanceof fabric.Object).toBeTruthy()
    expect(cObj.constructor === fabric.Object).toBeTruthy()

    expect(cObj.type).toEqual("object")
    expect(cObj.includeDefaultValues).toEqual(true)
    expect(cObj.selectable).toEqual(true)
  })

  test("get", function (assert) {
    var cObj = new fabric.Object({
      left: 11,
      top: 22,
      width: 50,
      height: 60,
      opacity: 0.7
    })

    expect(cObj.get("left")).toEqual(11)
    expect(cObj.get("top")).toEqual(22)
    expect(cObj.get("width")).toEqual(50)
    expect(cObj.get("height")).toEqual(60)
    expect(cObj.get("opacity")).toEqual(0.7)
  })

  test("set", function (assert) {
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

    expect(cObj.get("left")).toEqual(12)
    expect(cObj.get("top")).toEqual(23)
    expect(cObj.get("width")).toEqual(51)
    expect(cObj.get("height")).toEqual(61)
    expect(cObj.get("opacity")).toEqual(0.5)

    expect(cObj.set("opacity", 0.5)).toEqual(cObj)
  })

  test("set with object of prop/values", function (assert) {
    var cObj = new fabric.Object({})

    expect(cObj).toEqual(cObj.set({ width: 99, height: 88, fill: "red" }))

    expect("red").toEqual(cObj.get("fill"))
    expect(99).toEqual(cObj.get("width"))
    expect(88).toEqual(cObj.get("height"))
  })

  // test('Dinamically generated accessors', function(assert) {
  //   var cObj = new fabric.Object({ });
  //
  //   assert.equal('function', typeof cObj.getWidth);
  //   assert.equal('function', typeof cObj.setWidth);
  //
  //   assert.equal('function', typeof cObj.getFill);
  //   assert.equal('function', typeof cObj.setFill);
  //
  //   assert.equal(cObj, cObj.setFill('red'), 'chainable');
  //   assert.equal('red', cObj.getFill());
  //
  //   cObj.setScaleX(2.3);
  //   assert.equal(2.3, cObj.getScaleX());
  //
  //   cObj.setOpacity(0.123);
  //   assert.equal(0.123, cObj.getOpacity());
  // });

  test("stateProperties", function (assert) {
    var cObj = new fabric.Object()
    expect(cObj.stateProperties).toBeTruthy()
    expect(cObj.stateProperties.length > 0).toBeTruthy()
  })

  test("transform", function (assert) {
    var cObj = new fabric.Object()
    expect(typeof cObj.transform === "function").toBeTruthy()
  })

  test("toJSON", function (assert) {
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
    expect(JSON.stringify(cObj.toJSON())).toEqual(emptyObjectJSON)

    cObj
      .set("opacity", 0.88)
      .set("scaleX", 1.3)
      .set("width", 122)
      .set("flipY", true)
      .set("strokeDashArray", [5, 2])
      .set("strokeLineCap", "round")
      .set("strokeLineJoin", "bevil")
      .set("strokeMiterLimit", 5)

    expect(JSON.stringify(cObj.toJSON())).toEqual(augmentedJSON)
  })

  test("toObject", function (assert) {
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
        expect(cObj.toObject()[property]).toEqual(expectedValue)
      }, this)

      fabric.Object.NUM_FRACTION_DIGITS = fractionDigitsDefault
    }

    testFractionDigits.call(this, 2, 166.67)
    testFractionDigits.call(this, 3, 166.667)
    testFractionDigits.call(this, 0, 167)
  })

  test("toObject without default values", function (assert) {
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
    expect(augmentedObjectRepr.strokeDashArray).not.toEqual(toObjectObj.strokeDashArray)
    expect(augmentedObjectRepr.strokeDashArray).toEqual(toObjectObj.strokeDashArray)
  })

  test("toDatalessObject", function (assert) {
    var cObj = new fabric.Object()
    expect(typeof cObj.toDatalessObject === "function").toBeTruthy()
    expect(cObj.toObject()).toEqual(cObj.toDatalessObject())
  })

  test("toString", function (assert) {
    var cObj = new fabric.Object()
    expect(cObj.toString()).toEqual("#<fabric.Object>")
    cObj.type = "moo"
    expect(cObj.toString()).toEqual("#<fabric.Moo>")
  })

  test("render", function (assert) {
    var cObj = new fabric.Object()
    expect(typeof cObj.render === "function").toBeTruthy()
  })

  test("rotate", function (assert) {
    var cObj = new fabric.Object()
    expect(typeof cObj.rotate === "function").toBeTruthy()
    expect(cObj.get("angle")).toEqual(0)
    expect(cObj.rotate(45)).toEqual(cObj)
    expect(cObj.get("angle")).toEqual(45)
  })

  test("scale", function (assert) {
    var cObj = new fabric.Object()
    expect(typeof cObj.scale === "function").toBeTruthy()
    expect(cObj.get("scaleX")).toEqual(1)
    expect(cObj.get("scaleY")).toEqual(1)
    cObj.scale(1.5)
    expect(cObj.get("scaleX")).toEqual(1.5)
    expect(cObj.get("scaleY")).toEqual(1.5)
    expect(cObj.scale(2)).toEqual(cObj)
  })

  test("setOpacity", function (assert) {
    var cObj = new fabric.Object()
    expect(cObj.get("opacity")).toEqual(1)
    cObj.set("opacity", 0.68)
    expect(cObj.get("opacity")).toEqual(0.68)
    expect(cObj.set("opacity", 1)).toEqual(cObj)
  })

  test("getAngle", function (assert) {
    var cObj = new fabric.Object()
    expect(cObj.get("angle")).toEqual(0)
    cObj.rotate(45)
    expect(cObj.get("angle")).toEqual(45)
  })

  test("rotate", function (assert) {
    var cObj = new fabric.Object()
    expect(cObj.get("angle")).toEqual(0)
    expect(cObj.set("angle", 45)).toEqual(cObj)
    expect(cObj.get("angle")).toEqual(45)
  })

  test("drawBorders", function (assert) {
    var cObj = new fabric.Object(),
      canvas = fabric.document.createElement("canvas")

    var dummyContext = canvas.getContext("2d")

    expect(typeof cObj.drawBorders === "function").toBeTruthy()
    expect(cObj.drawBorders(dummyContext)).toEqual(cObj)
  })

  test("drawControls", function (assert) {
    var cObj = new fabric.Object(),
      _canvas = fabric.document.createElement("canvas")
    cObj.canvas = canvas
    var dummyContext = _canvas.getContext("2d")
    expect(typeof cObj.drawControls === "function").toBeTruthy()
    expect(cObj.drawControls(dummyContext)).toEqual(cObj)
  })

  test("clone", function (assert) {
    var cObj = new fabric.Object({ left: 123, top: 456, opacity: 0.66 })
    expect(typeof cObj.clone === "function").toBeTruthy()
    cObj.clone(function (clone) {
      expect(clone.get("left")).toEqual(123)
      expect(clone.get("top")).toEqual(456)
      expect(clone.get("opacity")).toEqual(0.66)

      // augmenting clone properties should not affect original instance
      clone.set("left", 12).set("scaleX", 2.5).rotate(33)

      expect(cObj.get("left")).toEqual(123)
      expect(cObj.get("scaleX")).toEqual(1)
      expect(cObj.get("angle")).toEqual(0)
    })
  })

  test("cloneAsImage", function (assert) {
    var done = assert.async()
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
      expect(image.width).toEqual(100)
      done()
    })
  })

  test("cloneAsImage with retina scaling enabled", function (assert) {
    var done = assert.async()
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
        expect(image.width).toEqual(200)
        fabric.devicePixelRatio = 1
        done()
      },
      { enableRetinaScaling: true }
    )
  })

  test("toCanvasElement", function (assert) {
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

  test("toCanvasElement activeSelection", function (assert) {
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

    expect(cObj.canvas).toEqual(canvas)

    activeSel.toCanvasElement()

    expect(cObj.canvas).toEqual(canvas)

    activeSel.destroy()

    expect(cObj.canvas).toEqual(canvas)
  })

  test(
    "toCanvasElement does not modify oCoords on zoomed canvas",
    function (assert) {
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
    }
  )

  test("toDataURL", function (assert) {
    var cObj = new fabric.Rect({
      width: 100,
      height: 100,
      fill: "red",
      strokeWidth: 0
    })

    expect(typeof cObj.toDataURL === "function").toBeTruthy()

    var dataURL = cObj.toDataURL()
    expect(typeof dataURL).toEqual("string")
    expect(dataURL.substring(0, 21)).toEqual("data:image/png;base64")

    try {
      dataURL = cObj.toDataURL({ format: "jpeg" })
      expect(dataURL.substring(0, 22)).toEqual("data:image/jpeg;base64")
    } catch (err) {
      fabric.log("jpeg toDataURL not supported")
    }
  })

  test("toDataURL & reference to canvas", function (assert) {
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

    expect(objCanvas).toEqual(cObj.canvas)
  })

  test("isType", function (assert) {
    var cObj = new fabric.Object()
    expect(typeof cObj.isType === "function").toBeTruthy()
    expect(cObj.isType("object")).toBeTruthy()
    expect(!cObj.isType("rect")).toBeTruthy()
    cObj = new fabric.Rect()
    expect(cObj.isType("rect")).toBeTruthy()
    expect(!cObj.isType("object")).toBeTruthy()
  })

  test("toggle", function (assert) {
    var object = new fabric.Object({
      left: 100,
      top: 124,
      width: 210,
      height: 66
    })
    expect(typeof object.toggle === "function").toBeTruthy()

    object.set("flipX", false)
    expect(object.toggle("flipX")).toEqual(object)
    expect(object.get("flipX")).toEqual(true)
    object.toggle("flipX")
    expect(object.get("flipX")).toEqual(false)

    object.set("left", 112.45)
    object.toggle("left")
    expect(object.get("left")).toEqual(112.45)
  })

  test("_setLineDash", function (assert) {
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
    expect(object.strokeDashArray.length).toEqual(3)
    object._setLineDash(canvas.contextContainer, object.strokeDashArray, null)
    expect(object.strokeDashArray.length).toEqual(6)

    expect(canvas.contextContainer.getLineDash().length).toEqual(6)
    object._setLineDash(canvas.contextContainer, [], null)
    expect(canvas.contextContainer.getLineDash().length).toEqual(6)
  })

  test("straighten", function (assert) {
    var object = new fabric.Object({
      left: 100,
      top: 124,
      width: 210,
      height: 66
    })
    expect(typeof object.straighten === "function").toBeTruthy()

    object.rotate(123.456)
    object.straighten()
    expect(object.get("angle")).toEqual(90)

    object.rotate(97.111)
    object.straighten()
    expect(object.get("angle")).toEqual(90)

    object.rotate(3.45)
    object.straighten()
    expect(object.get("angle")).toEqual(0)

    object.rotate(-157)
    object.straighten()
    expect(object.get("angle")).toEqual(-180)

    object.rotate(159)
    object.straighten()
    expect(object.get("angle")).toEqual(180)

    object.rotate(999)
    object.straighten()
    expect(object.get("angle")).toEqual(270)
  })

  test("fxStraighten", function (assert) {
    var done = assert.async()
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
    expect(object.fxStraighten(callbacks)).toEqual(object)
    expect(fabric.util.toFixed(object.get("angle"), 0)).toEqual(43)
    setTimeout(function () {
      expect(onCompleteFired).toBeTruthy()
      expect(onChangeFired).toBeTruthy()
      expect(object.get("angle")).toEqual(0)
      expect(object.fxStraighten()).toEqual(object)
      done()
    }, 1000)
  })

  test("on off fire are chainable", function (assert) {
    var object = new fabric.Object({
      left: 20,
      top: 30,
      width: 40,
      height: 50,
      angle: 43
    })
    var ret
    ret = object.fire("")
    expect(ret).toEqual(object)
    ret = object.on("hi", function () {})
    expect(ret).toEqual(object)
    ret = object.fire("bye")
    expect(ret).toEqual(object)
    ret = object.fire("hi")
    expect(ret).toEqual(object)
    ret = object.off("hi")
    expect(ret).toEqual(object)
  })

  test("observable", function (assert) {
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

    expect("abrakadabra").toEqual(firedOptions.param1)
    expect(3.1415).toEqual(firedOptions.param2)
  })

  test("object:added", function (assert) {
    var object = new fabric.Object()
    var addedEventFired = false

    object.on("added", function () {
      addedEventFired = true
    })
    canvas.add(object)

    expect(addedEventFired).toBeTruthy()
  })

  test("canvas reference", function (assert) {
    var object = new fabric.Object()
    var object2 = new fabric.Object()

    canvas.add(object)
    canvas.insertAt(object2, 0)

    expect(object.canvas === canvas).toBeTruthy()
    expect(object2.canvas === canvas).toBeTruthy()
  })

  test("object:removed", function (assert) {
    var object = new fabric.Object()
    var removedEventFired = false

    canvas.add(object)

    object.on("removed", function () {
      removedEventFired = true
    })
    canvas.remove(object)

    expect(removedEventFired).toBeTruthy()
  })

  test("center", function (assert) {
    var object = new fabric.Object()
    object.strokeWidth = 0
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
    expect(typeof object.center === "function").toBeTruthy()

    canvas.add(object)
    expect(object.center()).toEqual(object)

    expect(object.getCenterPoint().x).toEqual(canvas.getWidth() / 2)
    expect(object.getCenterPoint().y).toEqual(canvas.getHeight() / 2)

    canvas.setZoom(2)
    object.center()
    expect(object.getCenterPoint().x).toEqual(canvas.getWidth() / 2)
    expect(object.getCenterPoint().y).toEqual(canvas.getHeight() / 2)
  })

  test("centerH", function (assert) {
    var object = new fabric.Object()
    object.strokeWidth = 0
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
    expect(typeof object.centerH === "function").toBeTruthy()
    var oldY = object.top

    canvas.add(object)
    expect(object.centerH()).toEqual(object)

    expect(object.getCenterPoint().x).toEqual(canvas.getWidth() / 2)
    expect(object.top).toEqual(oldY)
    canvas.setZoom(2)
    object.centerH()
    expect(object.getCenterPoint().x).toEqual(canvas.getWidth() / 2)
  })

  test("centerV", function (assert) {
    var object = new fabric.Object()
    object.strokeWidth = 0
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
    expect(typeof object.centerV === "function").toBeTruthy()
    var oldX = object.left

    canvas.add(object)
    expect(object.centerV()).toEqual(object)
    expect(object.left).toEqual(oldX)
    expect(object.getCenterPoint().y).toEqual(canvas.getHeight() / 2)

    canvas.setZoom(2)
    object.centerV()
    expect(object.getCenterPoint().y).toEqual(canvas.getHeight() / 2)
  })

  test("viewportCenter", function (assert) {
    var object = new fabric.Object()
    object.strokeWidth = 0
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
    expect(typeof object.viewportCenter === "function").toBeTruthy()

    canvas.add(object)
    expect(object.viewportCenter()).toEqual(object)

    expect(object.getCenterPoint().x).toEqual(canvas.getWidth() / 2)
    expect(object.getCenterPoint().y).toEqual(canvas.getHeight() / 2)

    canvas.setZoom(2)
    object.viewportCenter()
    expect(object.getCenterPoint().x).toEqual(canvas.getWidth() / (2 * canvas.getZoom()))
    expect(object.getCenterPoint().y).toEqual(canvas.getHeight() / (2 * canvas.getZoom()))
  })

  test("viewportCenterH", function (assert) {
    var object = new fabric.Object()
    object.strokeWidth = 0
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
    expect(typeof object.viewportCenterH === "function").toBeTruthy()

    var oldY = object.top
    canvas.add(object)
    expect(object.viewportCenterH()).toEqual(object)
    expect(object.getCenterPoint().x).toEqual(canvas.getWidth() / 2)
    expect(object.top).toEqual(oldY)
    canvas.setZoom(2)
    object.viewportCenterH()
    expect(object.getCenterPoint().x).toEqual(canvas.getWidth() / (2 * canvas.getZoom()))
    expect(object.top).toEqual(oldY)
  })

  test("viewportCenterV", function (assert) {
    var object = new fabric.Object()
    object.strokeWidth = 0
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
    expect(typeof object.viewportCenterV === "function").toBeTruthy()

    var oldX = object.left

    canvas.add(object)
    expect(object.viewportCenterV()).toEqual(object)
    expect(object.getCenterPoint().y).toEqual(canvas.getHeight() / 2)
    expect(object.left).toEqual(oldX)
    canvas.setZoom(2)
    object.viewportCenterV()
    expect(object.getCenterPoint().y).toEqual(canvas.getHeight() / (2 * canvas.getZoom()))
    expect(object.left).toEqual(oldX)
  })

  test("sendToBack", function (assert) {
    var object = new fabric.Object()

    expect(typeof object.sendToBack === "function").toBeTruthy()

    canvas.add(object)
    expect(object.sendToBack()).toEqual(object)
  })

  test("bringToFront", function (assert) {
    var object = new fabric.Object()

    expect(typeof object.bringToFront === "function").toBeTruthy()

    canvas.add(object)
    expect(object.bringToFront()).toEqual(object)
  })

  test("sendBackwards", function (assert) {
    var object = new fabric.Object()

    expect(typeof object.sendBackwards === "function").toBeTruthy()

    canvas.add(object)
    expect(object.sendBackwards()).toEqual(object)
  })

  test("bringForward", function (assert) {
    var object = new fabric.Object()

    expect(typeof object.bringForward === "function").toBeTruthy()

    canvas.add(object)
    expect(object.bringForward()).toEqual(object)
  })

  test("moveTo", function (assert) {
    var object = new fabric.Object()

    expect(typeof object.moveTo === "function").toBeTruthy()

    canvas.add(object)
    expect(object.moveTo()).toEqual(object)
  })

  test("getTotalObjectScaling with zoom", function (assert) {
    var object = new fabric.Object({ scaleX: 3, scaleY: 2 })
    canvas.setZoom(3)
    canvas.add(object)
    var objectScale = object.getTotalObjectScaling()
    expect(objectScale).toEqual({
      scaleX: object.scaleX * 3,
      scaleY: object.scaleY * 3
    })
  })

  test("getTotalObjectScaling with retina", function (assert) {
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

  test("getObjectScaling", function (assert) {
    var object = new fabric.Object({ scaleX: 3, scaleY: 2 })
    var objectScale = object.getObjectScaling()
    expect(objectScale).toEqual({
      scaleX: object.scaleX,
      scaleY: object.scaleY
    })
  })

  test("getObjectScaling in group", function (assert) {
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

  test("getObjectScaling in group with object rotated", function (
    assert
  ) {
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

  test("dirty flag on set property", function (assert) {
    var object = new fabric.Object({ scaleX: 3, scaleY: 2 })
    object.cacheProperties = ["propA", "propB"]
    object.dirty = false
    expect(object.dirty).toEqual(false)
    object.set("propC", "3")
    expect(object.dirty).toEqual(false)
    object.set("propA", "2")
    expect(object.dirty).toEqual(true)
  })

  test("_createCacheCanvas sets object as dirty", function (assert) {
    var object = new fabric.Object({
      scaleX: 3,
      scaleY: 2,
      width: 1,
      height: 2
    })
    expect(object.dirty).toEqual(true)
    object.dirty = false
    expect(object.dirty).toEqual(false)
    object._createCacheCanvas()
    expect(object.dirty).toEqual(true)
  })

  test("isCacheDirty statefullCache disabled", function (assert) {
    var object = new fabric.Object({
      scaleX: 3,
      scaleY: 2,
      width: 1,
      height: 2
    })
    expect(object.dirty).toEqual(true)
    object.cacheProperties = ["propA", "propB"]
    object.dirty = false
    object.statefullCache = false
    expect(object.isCacheDirty()).toEqual(false)
    object.dirty = true
    expect(object.isCacheDirty()).toEqual(true)
  })

  test("isCacheDirty statefullCache enabled", function (assert) {
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
    expect(object.isCacheDirty()).toEqual(false)
    object.propA = "B"
    expect(object.isCacheDirty()).toEqual(true)
  })

  test(
    "_getCacheCanvasDimensions returns dimensions and zoom for cache canvas",
    function (assert) {
      var object = new fabric.Object({ width: 10, height: 10, strokeWidth: 0 })
      var dims = object._getCacheCanvasDimensions()
      expect(dims).toEqual({ width: 12, height: 12, zoomX: 1, zoomY: 1, x: 10, y: 10 })
      object.strokeWidth = 2
      dims = object._getCacheCanvasDimensions()
      expect(dims).toEqual({ width: 14, height: 14, zoomX: 1, zoomY: 1, x: 12, y: 12 })
      object.scaleX = 2
      object.scaleY = 3
      dims = object._getCacheCanvasDimensions()
      expect(dims).toEqual({ width: 26, height: 38, zoomX: 2, zoomY: 3, x: 24, y: 36 })
    }
  )

  test("_getCacheCanvasDimensions and strokeUniform", function (assert) {
    var object = new fabric.Object({ width: 10, height: 10, strokeWidth: 2 })
    var dims = object._getCacheCanvasDimensions()
    expect(dims).toEqual({ width: 14, height: 14, zoomX: 1, zoomY: 1, x: 12, y: 12 })
    object.strokeUniform = true
    var dims = object._getCacheCanvasDimensions()
    expect(dims).toEqual({ width: 14, height: 14, zoomX: 1, zoomY: 1, x: 12, y: 12 })
    object.scaleX = 2
    object.scaleY = 3
    dims = object._getCacheCanvasDimensions()
    expect(dims).toEqual({ width: 24, height: 34, zoomX: 2, zoomY: 3, x: 22, y: 32 })
  })

  test(
    "_updateCacheCanvas check if cache canvas should be updated",
    function (assert) {
      fabric.perfLimitSizeTotal = 10000
      fabric.maxCacheSideLimit = 4096
      fabric.minCacheSideLimit = 1
      var object = new fabric.Object({ width: 10, height: 10, strokeWidth: 0 })
      object._createCacheCanvas()
      expect(object.cacheWidth).toEqual(12)
      expect(object.cacheHeight).toEqual(12)
      expect(object._updateCacheCanvas()).toEqual(false)
      object.scaleX = 2
      expect(object._updateCacheCanvas()).toEqual(true)
      expect(object.cacheWidth).toEqual(22)
      expect(object.zoomX).toEqual(2)
      object.width = 2
      expect(object._updateCacheCanvas()).toEqual(true)
      expect(object.cacheWidth).toEqual(6)
      object.strokeWidth = 2
      expect(object._updateCacheCanvas()).toEqual(true)
    }
  )

  test("_limitCacheSize limit min to 256", function (assert) {
    fabric.perfLimitSizeTotal = 50000
    fabric.maxCacheSideLimit = 4096
    fabric.minCacheSideLimit = 256
    var object = new fabric.Object({ width: 200, height: 200, strokeWidth: 0 })
    var dims = object._getCacheCanvasDimensions()
    var zoomX = dims.zoomX
    var zoomY = dims.zoomY
    var limitedDims = object._limitCacheSize(dims)
    expect(dims).toEqual(limitedDims)
    expect(dims.width).toEqual(256)
    expect(dims.height).toEqual(256)
    expect(zoomX).toEqual(dims.zoomX)
    expect(zoomY).toEqual(dims.zoomY)
  })

  test("_limitCacheSize does not limit if not necessary", function (
    assert
  ) {
    fabric.perfLimitSizeTotal = 1000000
    fabric.maxCacheSideLimit = 4096
    fabric.minCacheSideLimit = 256
    var object = new fabric.Object({ width: 400, height: 400, strokeWidth: 0 })
    var dims = object._getCacheCanvasDimensions()
    var zoomX = dims.zoomX
    var zoomY = dims.zoomY
    var limitedDims = object._limitCacheSize(dims)
    expect(dims).toEqual(limitedDims)
    expect(dims.width).toEqual(402)
    expect(dims.height).toEqual(402)
    expect(zoomX).toEqual(dims.zoomX)
    expect(zoomY).toEqual(dims.zoomY)
  })

  test("_limitCacheSize does cap up minCacheSideLimit", function (
    assert
  ) {
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
    expect(dims).toEqual(limitedDims)
    expect(dims.width).toEqual(256)
    expect(dims.height).toEqual(256)
    expect((zoomX * dims.width) / width).toEqual(dims.zoomX)
    expect((zoomY * dims.height) / height).toEqual(dims.zoomY)
  })

  test("_limitCacheSize does cap up if necessary", function (assert) {
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
    expect(dims).toEqual(limitedDims)
    expect(dims.width).toEqual(1000)
    expect(dims.height).toEqual(1000)
    expect((zoomX * dims.width) / width).toEqual(dims.zoomX)
    expect((zoomY * dims.height) / height).toEqual(dims.zoomY)
  })

  test(
    "_limitCacheSize does cap up if necessary to maxCacheSideLimit",
    function (assert) {
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
      expect(dims).toEqual(limitedDims)
      expect(dims.width).toEqual(fabric.maxCacheSideLimit)
      expect(dims.height).toEqual(fabric.maxCacheSideLimit)
      expect(dims.zoomX).toEqual((zoomX * 4096) / 8194)
      expect(dims.zoomY).toEqual((zoomY * 4096) / 8194)
    }
  )

  test(
    "_limitCacheSize does cap up if necessary to maxCacheSideLimit, different AR",
    function (assert) {
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
      expect(dims).toEqual(limitedDims)
      expect(dims.width).toEqual(fabric.maxCacheSideLimit)
      expect(dims.height).toEqual(fabric.maxCacheSideLimit)
      expect(dims.zoomX).toEqual((zoomX * fabric.maxCacheSideLimit) / width)
      expect(dims.zoomY).toEqual((zoomY * fabric.maxCacheSideLimit) / height)
    }
  )

  test("_setShadow", function (assert) {
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
    expect(context.shadowOffsetX).toEqual(object.shadow.offsetX)
    expect(context.shadowOffsetY).toEqual(object.shadow.offsetY)
    expect(context.shadowBlur).toEqual(object.shadow.blur)
    fabric.browserShadowBlurConstant = 1.5
    object._setShadow(context)
    expect(context.shadowOffsetX).toEqual(object.shadow.offsetX)
    expect(context.shadowOffsetY).toEqual(object.shadow.offsetY)
    expect(context.shadowBlur).toEqual(object.shadow.blur * 1.5)
    fabric.browserShadowBlurConstant = 1
    object.scaleX = 2
    object.scaleY = 3
    object._setShadow(context)
    expect(context.shadowOffsetX).toEqual(object.shadow.offsetX * object.scaleX)
    expect(context.shadowOffsetY).toEqual(object.shadow.offsetY * object.scaleY)
    expect(context.shadowBlur).toEqual((object.shadow.blur * (object.scaleX + object.scaleY)) / 2)
    object.group = group
    object._setShadow(context)
    expect(context.shadowOffsetX).toEqual(object.shadow.offsetX * object.scaleX * group.scaleX)
    expect(context.shadowOffsetY).toEqual(object.shadow.offsetY * object.scaleY * group.scaleY)
    expect(context.shadowBlur).toEqual((object.shadow.blur *
      (object.scaleX * group.scaleX + object.scaleY * group.scaleY)) /
      2)
  })

  test("willDrawShadow", function (assert) {
    var object = new fabric.Object({ shadow: { offsetX: 0, offsetY: 0 } })
    expect(object.willDrawShadow()).toEqual(false)
    object.shadow.offsetX = 1
    expect(object.willDrawShadow()).toEqual(true)
  })

  test("_set  change a property", function (assert) {
    var object = new fabric.Object({ fill: "blue" })
    object._set("fill", "red")
    expect(object.fill).toEqual("red")
  })
  test("_set can rise the dirty flag", function (assert) {
    var object = new fabric.Object({ fill: "blue" })
    object.dirty = false
    object._set("fill", "red")
    expect(object.dirty).toEqual(true)
  })
  test("_set rise dirty flag only if value changed", function (assert) {
    var object = new fabric.Object({ fill: "blue" })
    object.dirty = false
    object._set("fill", "blue")
    expect(object.dirty).toEqual(false)
  })
  test("isNotVisible", function (assert) {
    var object = new fabric.Object({ fill: "blue", width: 100, height: 100 })
    expect(object.isNotVisible()).toEqual(false)
    object = new fabric.Object({
      fill: "blue",
      width: 0,
      height: 0,
      strokeWidth: 1
    })
    expect(object.isNotVisible()).toEqual(false)
    object = new fabric.Object({ opacity: 0, fill: "blue" })
    expect(object.isNotVisible()).toEqual(true)
    object = new fabric.Object({ fill: "blue", visible: false })
    expect(object.isNotVisible()).toEqual(true)
    object = new fabric.Object({
      fill: "blue",
      width: 0,
      height: 0,
      strokeWidth: 0
    })
    expect(object.isNotVisible()).toEqual(true)
  })
  test("shouldCache", function (assert) {
    var object = new fabric.Object()
    object.objectCaching = false
    expect(object.shouldCache()).toEqual(false)
    object.objectCaching = true
    expect(object.shouldCache()).toEqual(true)
    object.objectCaching = false
    object.needsItsOwnCache = function () {
      return true
    }
    expect(object.shouldCache()).toEqual(true)

    object.needsItsOwnCache = function () {
      return false
    }

    object.objectCaching = true
    object.group = {
      isOnACache: function () {
        return true
      }
    }
    expect(object.shouldCache()).toEqual(false)

    object.objectCaching = true
    object.group = {
      isOnACache: function () {
        return false
      }
    }
    expect(object.shouldCache()).toEqual(true)

    object.objectCaching = false
    object.group = {
      isOnACache: function () {
        return false
      }
    }
    expect(object.shouldCache()).toEqual(false)

    object.objectCaching = false
    object.group = {
      isOnACache: function () {
        return true
      }
    }
    expect(object.shouldCache()).toEqual(false)

    object.needsItsOwnCache = function () {
      return true
    }

    object.objectCaching = false
    object.group = {
      isOnACache: function () {
        return true
      }
    }
    expect(object.shouldCache()).toEqual(true)

    object.objectCaching = false
    object.group = {
      isOnACache: function () {
        return false
      }
    }
    expect(object.shouldCache()).toEqual(true)
  })
  test("needsItsOwnCache", function (assert) {
    var object = new fabric.Object()
    expect(object.needsItsOwnCache()).toEqual(false)
    object.clipPath = {}
    expect(object.needsItsOwnCache()).toEqual(true)
    delete object.clipPath

    object.paintFirst = "stroke"
    object.stroke = "black"
    object.shadow = {}
    expect(object.needsItsOwnCache()).toEqual(true)

    object.paintFirst = "stroke"
    object.stroke = "black"
    object.shadow = null
    expect(object.needsItsOwnCache()).toEqual(true)

    object.paintFirst = "stroke"
    object.stroke = ""
    object.shadow = {}
    expect(object.needsItsOwnCache()).toEqual(false)

    object.paintFirst = "stroke"
    object.stroke = "black"
    object.fill = ""
    object.shadow = {}
    expect(object.needsItsOwnCache()).toEqual(false)
  })
  test("hasStroke", function (assert) {
    var object = new fabric.Object({
      fill: "blue",
      width: 100,
      height: 100,
      strokeWidth: 3,
      stroke: "black"
    })
    expect(object.hasStroke()).toEqual(true)
    object.stroke = ""
    expect(object.hasStroke()).toEqual(false)
    object.stroke = "transparent"
    expect(object.hasStroke()).toEqual(false)
    object.stroke = "black"
    object.strokeWidth = 0
    expect(object.hasStroke()).toEqual(false)
  })
  test("hasFill", function (assert) {
    var object = new fabric.Object({ fill: "blue", width: 100, height: 100 })
    expect(object.hasFill()).toEqual(true)
    object.fill = ""
    expect(object.hasFill()).toEqual(false)
    object.fill = "transparent"
    expect(object.hasFill()).toEqual(false)
  })
})()
