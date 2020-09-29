;(function () {
  // var canvas = this.canvas = new fabric.StaticCanvas(null, {enableRetinaScaling: false});

  describe("fabric.Object - clipPath", {
    afterEach: function () {
      // canvas.clear();
      // canvas.calcOffset();
    }
  })

  test("constructor & properties", function (assert) {
    var cObj = new fabric.Object()
    expect(cObj.clipPath).toEqual(undefined)
  })

  test("toObject with clipPath", function (assert) {
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

    var cObj = new fabric.Object()
    expect(emptyObjectRepr).toEqual(cObj.toObject())

    cObj.clipPath = new fabric.Object()
    var expected = fabric.util.object.clone(emptyObjectRepr)
    var expectedClipPath = fabric.util.object.clone(emptyObjectRepr)
    expectedClipPath = fabric.util.object.extend(expectedClipPath, {
      inverted: cObj.clipPath.inverted,
      absolutePositioned: cObj.clipPath.absolutePositioned
    })
    expected.clipPath = expectedClipPath
    expect(expected).toEqual(cObj.toObject())
  })

  test("from object with clipPath", function (assert) {
    var done = assert.async()
    var rect = new fabric.Rect({ width: 100, height: 100 })
    rect.clipPath = new fabric.Circle({ radius: 50 })
    var toObject = rect.toObject()
    fabric.Rect.fromObject(toObject, function (rect) {
      expect(rect.clipPath instanceof fabric.Circle).toBeTruthy()
      expect(rect.clipPath.radius).toEqual(50)
      done()
    })
  })

  test(
    "from object with clipPath inverted, absolutePositioned",
    function (assert) {
      var done = assert.async()
      var rect = new fabric.Rect({ width: 100, height: 100 })
      rect.clipPath = new fabric.Circle({
        radius: 50,
        inverted: true,
        absolutePositioned: true
      })
      var toObject = rect.toObject()
      fabric.Rect.fromObject(toObject, function (rect) {
        expect(rect.clipPath instanceof fabric.Circle).toBeTruthy()
        expect(rect.clipPath.radius).toEqual(50)
        expect(rect.clipPath.inverted).toEqual(true)
        expect(rect.clipPath.absolutePositioned).toEqual(true)
        done()
      })
    }
  )

  test("from object with clipPath, nested", function (assert) {
    var done = assert.async()
    var rect = new fabric.Rect({ width: 100, height: 100 })
    rect.clipPath = new fabric.Circle({ radius: 50 })
    rect.clipPath.clipPath = new fabric.Text("clipPath")
    var toObject = rect.toObject()
    fabric.Rect.fromObject(toObject, function (rect) {
      expect(rect.clipPath instanceof fabric.Circle).toBeTruthy()
      expect(rect.clipPath.radius).toEqual(50)
      expect(rect.clipPath.clipPath instanceof fabric.Text).toBeTruthy()
      expect(rect.clipPath.clipPath.text).toEqual("clipPath")
      done()
    })
  })

  test(
    "from object with clipPath, nested inverted, absolutePositioned",
    function (assert) {
      var done = assert.async()
      var rect = new fabric.Rect({ width: 100, height: 100 })
      rect.clipPath = new fabric.Circle({ radius: 50 })
      rect.clipPath.clipPath = new fabric.Text("clipPath", {
        inverted: true,
        absolutePositioned: true
      })
      var toObject = rect.toObject()
      fabric.Rect.fromObject(toObject, function (rect) {
        expect(rect.clipPath instanceof fabric.Circle).toBeTruthy()
        expect(rect.clipPath.radius).toEqual(50)
        expect(rect.clipPath.clipPath instanceof fabric.Text).toBeTruthy()
        expect(rect.clipPath.clipPath.text).toEqual("clipPath")
        expect(rect.clipPath.clipPath.inverted).toEqual(true)
        expect(rect.clipPath.clipPath.absolutePositioned).toEqual(true)
        done()
      })
    }
  )

  test("_setClippingProperties fix the context props", function (assert) {
    var canvas = new fabric.Canvas()
    var rect = new fabric.Rect({ width: 100, height: 100 })
    canvas.contextContainer.fillStyle = "red"
    canvas.contextContainer.strokeStyle = "blue"
    canvas.contextContainer.globalAlpha = 0.3
    rect._setClippingProperties(canvas.contextContainer)
    expect(canvas.contextContainer.fillStyle).toEqual("#000000")
    expect(new fabric.Color(canvas.contextContainer.strokeStyle).getAlpha()).toEqual(0)
    expect(canvas.contextContainer.globalAlpha).toEqual(1)
  })

  test("clipPath caching detection", function (assert) {
    var cObj = new fabric.Object()
    var clipPath = new fabric.Object()
    cObj.statefullCache = true
    cObj.saveState({ propertySet: "cacheProperties" })
    var change = cObj.hasStateChanged("cacheProperties")
    expect(change).toEqual(false)

    cObj.clipPath = clipPath
    change = cObj.hasStateChanged("cacheProperties")
    expect(change).toEqual(true)

    cObj.saveState({ propertySet: "cacheProperties" })

    change = cObj.hasStateChanged("cacheProperties")
    expect(change).toEqual(false)

    cObj.clipPath.fill = "red"
    change = cObj.hasStateChanged("cacheProperties")
    expect(change).toEqual(true)
  })

  test("clipPath caching detection with canvas object", function (
    assert
  ) {
    var canvas = new fabric.StaticCanvas(null, { renderOnAddRemove: false })
    var cObj = new fabric.Rect()
    var clipPath = new fabric.Rect()
    canvas.add(cObj)
    clipPath.canvas = canvas
    cObj.statefullCache = true
    cObj.saveState({ propertySet: "cacheProperties" })
    var change = cObj.hasStateChanged("cacheProperties")
    expect(change).toEqual(false)

    cObj.clipPath = clipPath
    change = cObj.hasStateChanged("cacheProperties")
    expect(change).toEqual(true)

    cObj.saveState({ propertySet: "cacheProperties" })

    change = cObj.hasStateChanged("cacheProperties")
    expect(change).toEqual(false)

    cObj.clipPath.fill = "red"
    change = cObj.hasStateChanged("cacheProperties")
    expect(change).toEqual(true)
  })
})()
