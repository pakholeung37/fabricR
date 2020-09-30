describe("fabric.Circle", () => {
  test("constructor", function () {
    expect(fabric.Circle).toBeTruthy()

    var circle = new fabric.Circle()

    expect(circle instanceof fabric.Circle).toBeTruthy()
    expect(circle instanceof fabric.Object).toBeTruthy()

    expect(circle.type).toEqual("circle")
  })

  test("constructor with radius", function () {
    expect(fabric.Circle).toBeTruthy()
    var circle = new fabric.Circle({ radius: 20 })
    expect(circle.width).toEqual(40)
    expect(circle.height).toEqual(40)
  })

  test("getRadiusX, getRadiusY", function () {
    var circle = new fabric.Circle({ radius: 10 })

    expect(typeof circle.getRadiusX === "function").toBeTruthy()
    expect(typeof circle.getRadiusY === "function").toBeTruthy()

    expect(circle.getRadiusX()).toEqual(10)
    expect(circle.getRadiusY()).toEqual(10)

    circle.scale(2)

    expect(circle.getRadiusX()).toEqual(20)
    expect(circle.getRadiusY()).toEqual(20)

    circle.set("scaleX", 3)

    expect(circle.getRadiusX()).toEqual(30)
    expect(circle.getRadiusY()).toEqual(20)

    circle.set("scaleY", 4)

    expect(circle.getRadiusX()).toEqual(30)
    expect(circle.getRadiusY()).toEqual(40)
  })

  test("setRadius", function () {
    var circle = new fabric.Circle({ radius: 10, strokeWidth: 0 })

    expect(typeof circle.setRadius === "function").toBeTruthy()

    expect(circle.getRadiusX()).toEqual(10)
    expect(circle.getRadiusY()).toEqual(10)

    expect(circle.width).toEqual(20)
    expect(circle.height).toEqual(20)

    expect(circle).toEqual(circle.setRadius(20))

    expect(circle.getRadiusX()).toEqual(20)
    expect(circle.getRadiusY()).toEqual(20)

    expect(circle.width).toEqual(40)
    expect(circle.height).toEqual(40)
  })

  test("set radius", function () {
    var circle = new fabric.Circle({ strokeWidth: 0 })

    circle.set("radius", 20)

    expect(circle.getRadiusX()).toEqual(20)
    expect(circle.getRadiusY()).toEqual(20)

    expect(circle.width).toEqual(40)
    expect(circle.height).toEqual(40)
  })

  test("complexity", function () {
    var circle = new fabric.Circle()
    expect(typeof circle.complexity === "function").toBeTruthy()
    expect(circle.complexity()).toEqual(1)
  })

  test("toObject", function () {
    var circle = new fabric.Circle()
    var defaultProperties = {
      version: fabric.version,
      type: "circle",
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
      radius: 0,
      startAngle: 0,
      endAngle: 2 * Math.PI,
      skewX: 0,
      skewY: 0
    }
    expect(typeof circle.toObject === "function").toBeTruthy()
    expect(circle.toObject()).toEqual(defaultProperties)

    circle.set("left", 100).set("top", 200).set("radius", 15)

    var augmentedProperties = fabric.util.object.extend(
      fabric.util.object.clone(defaultProperties),
      {
        left: 100,
        top: 200,
        width: 30,
        height: 30,
        radius: 15
      }
    )

    expect(circle.toObject()).toEqual(augmentedProperties)
  })

  test("toSVG with full circle", function () {
    var circle = new fabric.Circle({ width: 100, height: 100, radius: 10 })
    var svg = circle.toSVG()
    var svgClipPath = circle.toClipPathSVG()
    expect(svg).toEqual(
      '<g transform="matrix(1 0 0 1 10.5 10.5)"  >\n<circle style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"  cx="0" cy="0" r="10" />\n</g>\n'
    )
    expect(svgClipPath).toEqual(
      '\t<circle transform="matrix(1 0 0 1 10.5 10.5)" cx="0" cy="0" r="10" />\n'
    )
  })

  test("toSVG with half circle", function () {
    var circle = new fabric.Circle({
      width: 100,
      height: 100,
      radius: 10,
      endAngle: Math.PI
    })
    var svg = circle.toSVG()
    var svgClipPath = circle.toClipPathSVG()
    expect(svg).toEqual(
      '<g transform="matrix(1 0 0 1 10.5 10.5)"  >\n<path d="M 10 0 A 10 10 0 0 1 -10 0" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"   />\n</g>\n'
    )
    expect(svgClipPath).toEqual(
      '\t<path d="M 10 0 A 10 10 0 0 1 -10 0" transform="matrix(1 0 0 1 10.5 10.5)"  />\n'
    )
  })

  test("fromElement", function () {
    expect(typeof fabric.Circle.fromElement === "function").toBeTruthy()

    var namespace = "http://www.w3.org/2000/svg"
    var elCircle = fabric.document.createElementNS(namespace, "circle"),
      radius = 10,
      left = 12,
      top = 15,
      fill = "ff5555",
      opacity = 0.5,
      strokeWidth = 2,
      strokeDashArray = [5, 2],
      strokeLineCap = "round",
      strokeLineJoin = "bevil",
      strokeMiterLimit = 5

    elCircle.setAttributeNS(namespace, "r", radius)
    elCircle.setAttributeNS(namespace, "cx", left)
    elCircle.setAttributeNS(namespace, "cy", top)
    elCircle.setAttributeNS(namespace, "fill", fill)
    elCircle.setAttributeNS(namespace, "opacity", opacity)
    elCircle.setAttributeNS(namespace, "stroke-width", strokeWidth)
    elCircle.setAttributeNS(namespace, "stroke-dasharray", "5, 2")
    elCircle.setAttributeNS(namespace, "stroke-linecap", strokeLineCap)
    elCircle.setAttributeNS(namespace, "stroke-linejoin", strokeLineJoin)
    elCircle.setAttributeNS(namespace, "stroke-miterlimit", strokeMiterLimit)

    fabric.Circle.fromElement(elCircle, function (oCircle) {
      expect(oCircle instanceof fabric.Circle).toBeTruthy()
      expect(oCircle.get("radius")).toEqual(radius)
      expect(oCircle.get("left")).toEqual(left - radius)
      expect(oCircle.get("top")).toEqual(top - radius)
      expect(oCircle.get("fill")).toEqual(fill)
      expect(oCircle.get("opacity")).toEqual(opacity)
      expect(oCircle.get("strokeWidth")).toEqual(strokeWidth)
      expect(oCircle.get("strokeDashArray")).toEqual(strokeDashArray)
      expect(oCircle.get("strokeLineCap")).toEqual(strokeLineCap)
      expect(oCircle.get("strokeLineJoin")).toEqual(strokeLineJoin)
      expect(oCircle.get("strokeMiterLimit")).toEqual(strokeMiterLimit)

      var elFaultyCircle = fabric.document.createElementNS(namespace, "circle")
      elFaultyCircle.setAttributeNS(namespace, "r", "-10")

      var error
      try {
        fabric.Circle.fromElement(elFaultyCircle)
      } catch (err) {
        error = err
      }
      expect(error).toBeTruthy()

      elFaultyCircle.removeAttribute("r")

      error = void 0
      try {
        fabric.Circle.fromElement(elFaultyCircle)
      } catch (err) {
        error = err
      }

      expect(error).toBeTruthy()
    })
  })

  test("fromObject", function (done) {
    expect(typeof fabric.Circle.fromObject === "function").toBeTruthy()

    var left = 112,
      top = 234,
      radius = 13.45,
      fill = "ff5555"

    fabric.Circle.fromObject(
      {
        left: left,
        top: top,
        radius: radius,
        fill: fill
      },
      function (circle) {
        expect(circle instanceof fabric.Circle).toBeTruthy()

        expect(circle.get("left")).toEqual(left)
        expect(circle.get("top")).toEqual(top)
        expect(circle.get("radius")).toEqual(radius)
        expect(circle.get("fill")).toEqual(fill)

        var expected = circle.toObject()
        fabric.Circle.fromObject(expected, function (actual) {
          expect(actual.toObject()).toEqual(expected)
          done()
        })
      }
    )
  })

  test("cloning and radius, width, height", function () {
    var circle = new fabric.Circle({ radius: 10, strokeWidth: 0 })
    circle.scale(2)

    circle.clone(function (clone) {
      expect(clone.width).toEqual(20)
      expect(clone.getScaledWidth()).toEqual(40)
      expect(clone.height).toEqual(20)
      expect(clone.getScaledHeight()).toEqual(40)
      expect(clone.radius).toEqual(10)
    })
  })
})
