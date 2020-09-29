;(function () {
  var REFERENCE_RECT = {
    version: fabric.version,
    type: "rect",
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
    rx: 0,
    ry: 0,
    skewX: 0,
    skewY: 0
  }

  describe("fabric.Rect")

  test("constructor", function (assert) {
    expect(fabric.Rect).toBeTruthy()

    var rect = new fabric.Rect()

    expect(rect instanceof fabric.Rect).toBeTruthy()
    expect(rect instanceof fabric.Object).toBeTruthy()

    expect(rect.get("type")).toEqual("rect")
  })

  test("complexity", function (assert) {
    var rect = new fabric.Rect()

    expect(typeof rect.complexity === "function").toBeTruthy()
  })

  test("cache properties", function (assert) {
    var rect = new fabric.Rect()

    expect(rect.cacheProperties.indexOf("rx") > -1).toBeTruthy()
    expect(rect.cacheProperties.indexOf("ry") > -1).toBeTruthy()
  })

  test("toObject", function (assert) {
    var rect = new fabric.Rect()
    expect(typeof rect.toObject === "function").toBeTruthy()

    var object = rect.toObject()
    expect(object).toEqual(REFERENCE_RECT)
  })

  test("fabric.Rect.fromObject", function (assert) {
    var done = assert.async()
    expect(typeof fabric.Rect.fromObject === "function").toBeTruthy()

    fabric.Rect.fromObject(REFERENCE_RECT, function (rect) {
      expect(rect instanceof fabric.Rect).toBeTruthy()
      expect(rect.toObject()).toEqual(REFERENCE_RECT)

      var expectedObject = fabric.util.object.extend({}, REFERENCE_RECT)
      expectedObject.fill = {
        type: "linear",
        coords: { x1: 0, y1: 0, x2: 200, y2: 0 },
        colorStops: [
          { offset: "0", color: "rgb(255,0,0)", opacity: 1 },
          { offset: "1", color: "rgb(0,0,255)", opacity: 1 }
        ],
        offsetX: 0,
        offsetY: 0
      }
      expectedObject.stroke = {
        type: "linear",
        coords: { x1: 0, y1: 0, x2: 200, y2: 0 },
        colorStops: [
          { offset: "0", color: "rgb(255,0,0)", opacity: 1 },
          { offset: "1", color: "rgb(0,0,255)", opacity: 1 }
        ],
        offsetX: 0,
        offsetY: 0
      }
      fabric.Rect.fromObject(expectedObject, function (rect2) {
        expect(rect2.fill instanceof fabric.Gradient).toBeTruthy()
        expect(rect2.stroke instanceof fabric.Gradient).toBeTruthy()
        done()
      })
    })
  })

  test("fabric.Rect.fromObject with pattern fill", function (assert) {
    var done = assert.async()
    var fillObj = {
      type: "pattern",
      source:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=="
    }
    fabric.Rect.fromObject({ fill: fillObj }, function (rect) {
      expect(rect.fill instanceof fabric.Pattern).toBeTruthy()
      done()
    })
  })

  test("fabric.Rect.fromElement", function (assert) {
    expect(typeof fabric.Rect.fromElement === "function").toBeTruthy()

    var elRect = fabric.document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    )
    fabric.Rect.fromElement(elRect, function (rect) {
      var expectedObject = fabric.util.object.extend({}, REFERENCE_RECT)
      expectedObject.visible = false
      expect(rect instanceof fabric.Rect).toBeTruthy()
      expect(rect.toObject()).toEqual(expectedObject)
    })
  })

  test("fabric.Rect.fromElement with custom attributes", function (
    assert
  ) {
    var namespace = "http://www.w3.org/2000/svg"
    var elRectWithAttrs = fabric.document.createElementNS(namespace, "rect")

    elRectWithAttrs.setAttributeNS(namespace, "x", 10)
    elRectWithAttrs.setAttributeNS(namespace, "y", 20)
    elRectWithAttrs.setAttributeNS(namespace, "width", 222)
    elRectWithAttrs.setAttributeNS(namespace, "height", 333)
    elRectWithAttrs.setAttributeNS(namespace, "rx", 11)
    elRectWithAttrs.setAttributeNS(namespace, "ry", 12)
    elRectWithAttrs.setAttributeNS(namespace, "fill", "rgb(255,255,255)")
    elRectWithAttrs.setAttributeNS(namespace, "opacity", 0.45)
    elRectWithAttrs.setAttributeNS(namespace, "stroke", "blue")
    elRectWithAttrs.setAttributeNS(namespace, "stroke-width", 3)
    elRectWithAttrs.setAttributeNS(namespace, "stroke-dasharray", "5, 2")
    elRectWithAttrs.setAttributeNS(namespace, "stroke-linecap", "round")
    elRectWithAttrs.setAttributeNS(namespace, "stroke-linejoin", "bevil")
    elRectWithAttrs.setAttributeNS(namespace, "stroke-miterlimit", 5)
    elRectWithAttrs.setAttributeNS(
      namespace,
      "vector-effect",
      "non-scaling-stroke"
    )
    //elRectWithAttrs.setAttributeNS(namespace, 'transform', 'translate(-10,-20) scale(2) rotate(45) translate(5,10)');
    fabric.Rect.fromElement(elRectWithAttrs, function (rectWithAttrs) {
      expect(rectWithAttrs instanceof fabric.Rect).toBeTruthy()
      expect(rectWithAttrs.strokeUniform).toEqual(true)
      var expectedObject = fabric.util.object.extend(REFERENCE_RECT, {
        left: 10,
        top: 20,
        width: 222,
        height: 333,
        fill: "rgb(255,255,255)",
        opacity: 0.45,
        stroke: "blue",
        strokeWidth: 3,
        strokeDashArray: [5, 2],
        strokeLineCap: "round",
        strokeLineJoin: "bevil",
        strokeMiterLimit: 5,
        rx: 11,
        ry: 12
        // strokeUniform:    true
      })
      expect(rectWithAttrs.toObject()).toEqual(expectedObject)
    })
  })

  test("empty fromElement", function (assert) {
    fabric.Rect.fromElement(null, function (rect) {
      expect(rect).toEqual(null)
    })
  })

  test("clone with rounded corners", function (assert) {
    var rect = new fabric.Rect({ width: 100, height: 100, rx: 20, ry: 30 })
    rect.clone(function (clone) {
      expect(clone.get("rx")).toEqual(rect.get("rx"))
      expect(clone.get("ry")).toEqual(rect.get("ry"))
    })
  })

  test("toSVG with rounded corners", function (assert) {
    var rect = new fabric.Rect({
      width: 100,
      height: 100,
      rx: 20,
      ry: 30,
      strokeWidth: 0
    })
    var svg = rect.toSVG()

    expect(svg).toEqual(
      '<g transform="matrix(1 0 0 1 50 50)"  >\n<rect style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"  x="-50" y="-50" rx="20" ry="30" width="100" height="100" />\n</g>\n'
    )
  })

  test("toSVG with alpha colors fill", function (assert) {
    var rect = new fabric.Rect({
      width: 100,
      height: 100,
      strokeWidth: 0,
      fill: "rgba(255, 0, 0, 0.5)"
    })
    var svg = rect.toSVG()
    expect(svg).toEqual(
      '<g transform="matrix(1 0 0 1 50 50)"  >\n<rect style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,0,0); fill-opacity: 0.5; fill-rule: nonzero; opacity: 1;"  x="-50" y="-50" rx="0" ry="0" width="100" height="100" />\n</g>\n'
    )
  })

  test("toSVG with id", function (assert) {
    var rect = new fabric.Rect({
      id: "myRect",
      width: 100,
      height: 100,
      strokeWidth: 0,
      fill: "rgba(255, 0, 0, 0.5)"
    })
    var svg = rect.toSVG()
    expect(svg).toEqual(
      '<g transform="matrix(1 0 0 1 50 50)" id="myRect"  >\n<rect style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,0,0); fill-opacity: 0.5; fill-rule: nonzero; opacity: 1;"  x="-50" y="-50" rx="0" ry="0" width="100" height="100" />\n</g>\n'
    )
  })

  test("toSVG with alpha colors stroke", function (assert) {
    var rect = new fabric.Rect({
      width: 100,
      height: 100,
      strokeWidth: 0,
      fill: "",
      stroke: "rgba(255, 0, 0, 0.5)"
    })
    var svg = rect.toSVG()
    expect(svg).toEqual(
      '<g transform="matrix(1 0 0 1 50 50)"  >\n<rect style="stroke: rgb(255,0,0); stroke-opacity: 0.5; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;"  x="-50" y="-50" rx="0" ry="0" width="100" height="100" />\n</g>\n'
    )
  })

  test("toSVG with paintFirst set to stroke", function (assert) {
    var rect = new fabric.Rect({
      width: 100,
      height: 100,
      paintFirst: "stroke"
    })
    var svg = rect.toSVG()
    expect(svg).toEqual(
      '<g transform="matrix(1 0 0 1 50.5 50.5)"  >\n<rect style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"  paint-order="stroke"  x="-50" y="-50" rx="0" ry="0" width="100" height="100" />\n</g>\n'
    )
  })

  test("toObject without default values", function (assert) {
    var options = {
      type: "rect",
      width: 69,
      height: 50,
      left: 10,
      top: 20,
      version: fabric.version
    }
    var rect = new fabric.Rect(options)
    rect.includeDefaultValues = false
    expect(rect.toObject()).toEqual(options)
  })

  test("paintFirst life cycle", function (assert) {
    var done = assert.async()
    var svg =
      '<svg><rect x="10" y="10" height="50" width="55" fill="red" stroke="blue" paint-order="stroke" /></svg>'
    fabric.loadSVGFromString(svg, function (envlivedObjects) {
      var rect = envlivedObjects[0]
      var rectObject = rect.toObject()
      var rectSvg = rect.toSVG()
      expect(rect.paintFirst).toEqual("stroke")
      expect(rectObject.paintFirst).toEqual("stroke")
      expect(rectSvg.indexOf('paint-order="stroke"') > -1).toBeTruthy()
      done()
    })
  })
})()
