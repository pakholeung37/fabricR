;(function () {
  function getPoints() {
    return [
      { x: 10, y: 12 },
      { x: 20, y: 22 }
    ]
  }

  var REFERENCE_OBJECT = {
    version: fabric.version,
    type: "polyline",
    originX: "left",
    originY: "top",
    left: 9.5,
    top: 11.5,
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
    points: getPoints(),
    shadow: null,
    visible: true,
    backgroundColor: "",
    fillRule: "nonzero",
    paintFirst: "fill",
    globalCompositeOperation: "source-over",
    skewX: 0,
    skewY: 0
  }

  var REFERENCE_EMPTY_OBJECT = {
    points: [],
    width: 0,
    height: 0,
    top: 0,
    left: 0
  }

  describe("fabric.Polyline")

  test("constructor", function (assert) {
    expect(fabric.Polyline).toBeTruthy()

    var polyline = new fabric.Polyline(getPoints())

    expect(polyline instanceof fabric.Polyline).toBeTruthy()
    expect(polyline instanceof fabric.Object).toBeTruthy()

    expect(polyline.type).toEqual("polyline")
    expect(polyline.get("points")).toEqual([
      { x: 10, y: 12 },
      { x: 20, y: 22 }
    ])
  })

  test("complexity", function (assert) {
    var polyline = new fabric.Polyline(getPoints())
    expect(typeof polyline.complexity === "function").toBeTruthy()
  })

  test("toObject", function (assert) {
    var polyline = new fabric.Polyline(getPoints())
    expect(typeof polyline.toObject === "function").toBeTruthy()
    var objectWithOriginalPoints = fabric.util.object.extend(
      polyline.toObject(),
      {
        points: getPoints()
      }
    )

    expect(objectWithOriginalPoints).toEqual(REFERENCE_OBJECT)
  })

  test("toSVG", function (assert) {
    var polyline = new fabric.Polygon(getPoints(), {
      fill: "red",
      stroke: "blue"
    })
    expect(typeof polyline.toSVG === "function").toBeTruthy()
    var EXPECTED_SVG =
      '<g transform="matrix(1 0 0 1 15 17)"  >\n<polygon style="stroke: rgb(0,0,255); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,0,0); fill-rule: nonzero; opacity: 1;"  points="-5,-5 5,5 " />\n</g>\n'
    expect(polyline.toSVG()).toEqual(EXPECTED_SVG)
  })

  test("fromObject", function (assert) {
    var done = assert.async()
    expect(typeof fabric.Polyline.fromObject === "function").toBeTruthy()
    fabric.Polyline.fromObject(REFERENCE_OBJECT, function (polyline) {
      expect(polyline instanceof fabric.Polyline).toBeTruthy()
      expect(polyline.toObject()).toEqual(REFERENCE_OBJECT)
      done()
    })
  })

  test("fromElement without points", function (assert) {
    expect(typeof fabric.Polyline.fromElement === "function").toBeTruthy()
    var elPolylineWithoutPoints = fabric.document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polyline"
    )
    var empty_object = fabric.util.object.extend({}, REFERENCE_OBJECT)
    empty_object = fabric.util.object.extend(
      empty_object,
      REFERENCE_EMPTY_OBJECT
    )
    fabric.Polyline.fromElement(elPolylineWithoutPoints, function (polyline) {
      expect(polyline.toObject()).toEqual(empty_object)
    })
  })

  test("fromElement with empty points", function (assert) {
    var namespace = "http://www.w3.org/2000/svg"
    var elPolylineWithEmptyPoints = fabric.document.createElementNS(
      namespace,
      "polyline"
    )
    elPolylineWithEmptyPoints.setAttributeNS(namespace, "points", "")
    fabric.Polyline.fromElement(elPolylineWithEmptyPoints, function (polyline) {
      var empty_object = fabric.util.object.extend({}, REFERENCE_OBJECT)
      empty_object = fabric.util.object.extend(
        empty_object,
        REFERENCE_EMPTY_OBJECT
      )
      expect(polyline.toObject()).toEqual(empty_object)
    })
  })

  test("fromElement", function (assert) {
    var namespace = "http://www.w3.org/2000/svg"
    var elPolyline = fabric.document.createElementNS(namespace, "polyline")
    elPolyline.setAttributeNS(namespace, "points", "10,12 20,22")
    elPolyline.setAttributeNS(namespace, "stroke-width", 1)
    fabric.Polyline.fromElement(elPolyline, function (polyline) {
      expect(polyline instanceof fabric.Polyline).toBeTruthy()
      var obj = fabric.util.object.extend({}, REFERENCE_OBJECT)
      obj.top = 12
      obj.left = 10
      expect(polyline.toObject()).toEqual(obj)
    })
  })

  test("fromElement with custom attr", function (assert) {
    var namespace = "http://www.w3.org/2000/svg"
    var elPolylineWithAttrs = fabric.document.createElementNS(
      namespace,
      "polyline"
    )
    elPolylineWithAttrs.setAttributeNS(
      namespace,
      "points",
      "10,10 20,20 30,30 10,10"
    )
    elPolylineWithAttrs.setAttributeNS(namespace, "fill", "rgb(255,255,255)")
    elPolylineWithAttrs.setAttributeNS(namespace, "opacity", "0.34")
    elPolylineWithAttrs.setAttributeNS(namespace, "stroke-width", "3")
    elPolylineWithAttrs.setAttributeNS(namespace, "stroke", "blue")
    elPolylineWithAttrs.setAttributeNS(
      namespace,
      "transform",
      "translate(-10,-20) scale(2)"
    )
    elPolylineWithAttrs.setAttributeNS(namespace, "stroke-dasharray", "5, 2")
    elPolylineWithAttrs.setAttributeNS(namespace, "stroke-linecap", "round")
    elPolylineWithAttrs.setAttributeNS(namespace, "stroke-linejoin", "bevil")
    elPolylineWithAttrs.setAttributeNS(namespace, "stroke-miterlimit", "5")

    fabric.Polyline.fromElement(elPolylineWithAttrs, function (
      polylineWithAttrs
    ) {
      var expectedPoints = [
        { x: 10, y: 10 },
        { x: 20, y: 20 },
        { x: 30, y: 30 },
        { x: 10, y: 10 }
      ]
      expect(polylineWithAttrs.toObject()).toEqual(fabric.util.object.extend(REFERENCE_OBJECT, {
        width: 20,
        height: 20,
        fill: "rgb(255,255,255)",
        stroke: "blue",
        strokeWidth: 3,
        strokeDashArray: [5, 2],
        strokeLineCap: "round",
        strokeLineJoin: "bevil",
        strokeMiterLimit: 5,
        opacity: 0.34,
        points: expectedPoints,
        left: 10,
        top: 10
      }))
    })
  })

  test("fromElement with nothing", function (assert) {
    fabric.Polyline.fromElement(null, function (polyline) {
      expect(polyline).toEqual(null)
    })
  })
})()
