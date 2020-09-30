describe("fabric.Ellipse", () => {
  beforeEach(function () {
    fabric.Object.__uid = 0
  })
  test("constructor", function () {
    expect(fabric.Ellipse).toBeTruthy()

    var ellipse = new fabric.Ellipse()

    expect(ellipse instanceof fabric.Ellipse).toBeTruthy()
    expect(ellipse instanceof fabric.Object).toBeTruthy()

    expect(ellipse.type).toBe("ellipse")
  })

  test("complexity", function () {
    var ellipse = new fabric.Ellipse()
    expect(typeof ellipse.complexity === "function").toBeTruthy()
    expect(ellipse.complexity()).toBe(1)
  })

  test("toObject", function () {
    var ellipse = new fabric.Ellipse()
    var defaultProperties = {
      version: fabric.version,
      type: "ellipse",
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
      skewX: 0,
      skewY: 0,
      rx: 0,
      ry: 0,
      shadow: null,
      visible: true,
      backgroundColor: "",
      fillRule: "nonzero",
      paintFirst: "fill",
      globalCompositeOperation: "source-over"
    }
    expect(typeof ellipse.toObject === "function").toBeTruthy()
    expect(ellipse.toObject()).toEqual(defaultProperties)

    ellipse.set("left", 100).set("top", 200).set("rx", 15).set("ry", 25)

    var augmentedProperties = fabric.util.object.extend(
      fabric.util.object.clone(defaultProperties),
      {
        left: 100,
        top: 200,
        rx: 15,
        ry: 25,
        width: 30,
        height: 50
      }
    )

    expect(ellipse.toObject()).toEqual(augmentedProperties)

    ellipse.set("rx", 30)
    expect(ellipse.width).toEqual(ellipse.rx * 2)

    ellipse.set("scaleX", 2)
    expect(ellipse.getRx()).toEqual(ellipse.rx * ellipse.scaleX)
  })

  test("isNotVisible", function () {
    var ellipse = new fabric.Ellipse()
    ellipse.set("rx", 0).set("ry", 0)

    expect(ellipse.isNotVisible()).toBe(false)

    ellipse.set("strokeWidth", 0)

    expect(ellipse.isNotVisible()).toBe(true)
  })

  test("toSVG", function () {
    var ellipse = new fabric.Ellipse({
      rx: 100,
      ry: 12,
      fill: "red",
      stroke: "blue"
    })
    expect(ellipse.toSVG()).toBe(
      '<g transform="matrix(1 0 0 1 100.5 12.5)"  >\n<ellipse style="stroke: rgb(0,0,255); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,0,0); fill-rule: nonzero; opacity: 1;"  cx="0" cy="0" rx="100" ry="12" />\n</g>\n'
    )
    expect(ellipse.toClipPathSVG()).toBe(
      '\t<ellipse transform="matrix(1 0 0 1 100.5 12.5)" cx="0" cy="0" rx="100" ry="12" />\n'
    )
  })

  test("toSVG with a clipPath", function () {
    var ellipse = new fabric.Ellipse({
      rx: 100,
      ry: 12,
      fill: "red",
      stroke: "blue"
    })
    ellipse.clipPath = new fabric.Ellipse({
      rx: 12,
      ry: 100,
      left: 60,
      top: -50
    })
    expect(ellipse.toSVG()).toBe(
      '<g transform="matrix(1 0 0 1 100.5 12.5)" clip-path="url(#CLIPPATH_0)"  >\n<clipPath id="CLIPPATH_0" >\n\t<ellipse transform="matrix(1 0 0 1 72.5 50.5)" cx="0" cy="0" rx="12" ry="100" />\n</clipPath>\n<ellipse style="stroke: rgb(0,0,255); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,0,0); fill-rule: nonzero; opacity: 1;"  cx="0" cy="0" rx="100" ry="12" />\n</g>\n'
    )
  })

  test("toSVG with a clipPath absolute positioned", function () {
    var ellipse = new fabric.Ellipse({
      rx: 100,
      ry: 12,
      fill: "red",
      stroke: "blue"
    })
    ellipse.clipPath = new fabric.Ellipse({
      rx: 12,
      ry: 100,
      left: 60,
      top: -50
    })
    ellipse.clipPath.absolutePositioned = true
    expect(ellipse.toSVG()).toBe(
      '<g clip-path="url(#CLIPPATH_0)"  >\n<g transform="matrix(1 0 0 1 100.5 12.5)"  >\n<clipPath id="CLIPPATH_0" >\n\t<ellipse transform="matrix(1 0 0 1 72.5 50.5)" cx="0" cy="0" rx="12" ry="100" />\n</clipPath>\n<ellipse style="stroke: rgb(0,0,255); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,0,0); fill-rule: nonzero; opacity: 1;"  cx="0" cy="0" rx="100" ry="12" />\n</g>\n</g>\n'
    )
  })

  test("fromElement", function () {
    expect(typeof fabric.Ellipse.fromElement === "function").toBeTruthy()

    var namespace = "http://www.w3.org/2000/svg"
    var elEllipse = fabric.document.createElementNS(namespace, "ellipse"),
      rx = 5,
      ry = 7,
      left = 12,
      top = 15,
      fill = "ff5555",
      opacity = 0.5,
      strokeWidth = 2,
      strokeDashArray = [5, 2],
      strokeLineCap = "round",
      strokeLineJoin = "bevil",
      strokeMiterLimit = 5

    elEllipse.setAttributeNS(namespace, "rx", rx)
    elEllipse.setAttributeNS(namespace, "ry", ry)
    elEllipse.setAttributeNS(namespace, "cx", left)
    elEllipse.setAttributeNS(namespace, "cy", top)
    elEllipse.setAttributeNS(namespace, "fill", fill)
    elEllipse.setAttributeNS(namespace, "opacity", opacity)
    elEllipse.setAttributeNS(namespace, "stroke-width", strokeWidth)
    elEllipse.setAttributeNS(namespace, "stroke-dasharray", "5, 2")
    elEllipse.setAttributeNS(namespace, "stroke-linecap", strokeLineCap)
    elEllipse.setAttributeNS(namespace, "stroke-linejoin", strokeLineJoin)
    elEllipse.setAttributeNS(namespace, "stroke-miterlimit", strokeMiterLimit)

    fabric.Ellipse.fromElement(elEllipse, function (oEllipse) {
      expect(oEllipse instanceof fabric.Ellipse).toBeTruthy()
      expect(oEllipse.get("rx")).toBe(rx)
      expect(oEllipse.get("ry")).toBe(ry)
      expect(oEllipse.get("left")).toBe(left - rx)
      expect(oEllipse.get("top")).toBe(top - ry)
      expect(oEllipse.get("fill")).toBe(fill)
      expect(oEllipse.get("opacity")).toBe(opacity)
      expect(oEllipse.get("strokeWidth")).toBe(strokeWidth)
      expect(oEllipse.get("strokeDashArray")).toEqual(strokeDashArray)
      expect(oEllipse.get("strokeLineCap")).toBe(strokeLineCap)
      expect(oEllipse.get("strokeLineJoin")).toBe(strokeLineJoin)
      expect(oEllipse.get("strokeMiterLimit")).toBe(strokeMiterLimit)
    })
  })

  test("fromObject", function (done) {
    expect(typeof fabric.Ellipse === "function").toBeTruthy()

    var left = 112,
      top = 234,
      rx = 13.45,
      ry = 14.78,
      fill = "ff5555"

    fabric.Ellipse.fromObject(
      {
        left: left,
        top: top,
        rx: rx,
        ry: ry,
        fill: fill
      },
      function (ellipse) {
        expect(ellipse instanceof fabric.Ellipse).toBeTruthy()

        expect(ellipse.get("left")).toBe(left)
        expect(ellipse.get("top")).toBe(top)
        expect(ellipse.get("rx")).toBe(rx)
        expect(ellipse.get("ry")).toBe(ry)
        expect(ellipse.get("fill")).toBe(fill)

        var expected = ellipse.toObject()
        fabric.Ellipse.fromObject(expected, function (actual) {
          expect(actual.toObject()).toEqual(expected)
          done()
        })
      }
    )
  })
})
