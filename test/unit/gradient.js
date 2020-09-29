;(function () {
  describe("fabric.Gradient")

  function createLinearGradient(units) {
    return new fabric.Gradient({
      type: "linear",
      gradientUnits: units || "pixels",
      coords: {
        x1: 0,
        y1: 10,
        x2: 100,
        y2: 200
      },
      colorStops: [
        { offset: 0, color: "red", opacity: 0 },
        { offset: 1, color: "green" }
      ]
    })
  }

  function createRadialGradient(units) {
    return new fabric.Gradient({
      type: "radial",
      gradientUnits: units || "pixels",
      coords: {
        x1: 0,
        y1: 10,
        x2: 100,
        y2: 200,
        r1: 0,
        r2: 50
      },
      colorStops: [
        { offset: 0, color: "red" },
        { offset: 1, color: "green", opacity: 0 }
      ]
    })
  }

  function createRadialGradientWithInternalRadius() {
    return new fabric.Gradient({
      type: "radial",
      coords: {
        x1: 0,
        y1: 10,
        x2: 100,
        y2: 200,
        r1: 10,
        r2: 50
      },
      colorStops: [
        { offset: 0, color: "red" },
        { offset: 1, color: "green", opacity: 0 }
      ]
    })
  }

  function createRadialGradientSwapped() {
    return new fabric.Gradient({
      type: "radial",
      coords: {
        x1: 0,
        y1: 10,
        x2: 100,
        y2: 200,
        r1: 50,
        r2: 10
      },
      colorStops: [
        { offset: 0, color: "red" },
        { offset: 1, color: "green", opacity: 0 }
      ]
    })
  }

  var SVG_LINEAR =
    '<linearGradient id="SVGID_0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 -50 -50)"  x1="0" y1="10" x2="100" y2="200">\n<stop offset="0%" style="stop-color:red;stop-opacity: 0"/>\n<stop offset="100%" style="stop-color:green;"/>\n</linearGradient>\n'
  var SVG_RADIAL =
    '<radialGradient id="SVGID_0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 -50 -50)"  cx="100" cy="200" r="50" fx="0" fy="10">\n<stop offset="0%" style="stop-color:red;"/>\n<stop offset="100%" style="stop-color:green;stop-opacity: 0"/>\n</radialGradient>\n'
  var SVG_INTERNALRADIUS =
    '<radialGradient id="SVGID_0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 -50 -50)"  cx="100" cy="200" r="50" fx="0" fy="10">\n<stop offset="20%" style="stop-color:red;"/>\n<stop offset="100%" style="stop-color:green;stop-opacity: 0"/>\n</radialGradient>\n'
  var SVG_SWAPPED =
    '<radialGradient id="SVGID_0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 -50 -50)"  cx="0" cy="10" r="50" fx="100" fy="200">\n<stop offset="20%" style="stop-color:green;stop-opacity: 0"/>\n<stop offset="100%" style="stop-color:red;"/>\n</radialGradient>\n'
  var SVG_LINEAR_PERCENTAGE =
    '<linearGradient id="SVGID_0" gradientUnits="objectBoundingBox" gradientTransform="matrix(1 0 0 1 0 0)"  x1="0" y1="10" x2="100" y2="200">\n<stop offset="0%" style="stop-color:red;stop-opacity: 0"/>\n<stop offset="100%" style="stop-color:green;"/>\n</linearGradient>\n'
  var SVG_RADIAL_PERCENTAGE =
    '<radialGradient id="SVGID_0" gradientUnits="objectBoundingBox" gradientTransform="matrix(1 0 0 1 0 0)"  cx="100" cy="200" r="50" fx="0" fy="10">\n<stop offset="0%" style="stop-color:red;"/>\n<stop offset="100%" style="stop-color:green;stop-opacity: 0"/>\n</radialGradient>\n'

  test("constructor linearGradient", function (assert) {
    expect(fabric.Gradient).toBeTruthy()

    var gradient = createLinearGradient()
    expect(gradient instanceof fabric.Gradient).toBeTruthy()
  })

  test("constructor radialGradient", function (assert) {
    expect(fabric.Gradient).toBeTruthy()

    var gradient = createRadialGradient()
    expect(gradient instanceof fabric.Gradient).toBeTruthy()
  })

  test("properties linearGradient", function (assert) {
    var gradient = createLinearGradient()

    expect(gradient.coords.x1).toEqual(0)
    expect(gradient.coords.y1).toEqual(10)
    expect(gradient.coords.x2).toEqual(100)
    expect(gradient.coords.y2).toEqual(200)

    expect(gradient.type).toEqual("linear")

    expect(gradient.colorStops[0].offset).toEqual(0)
    expect(gradient.colorStops[0].color).toEqual("red")
    expect(gradient.colorStops[0].opacity).toEqual(0)

    expect(gradient.colorStops[1].offset).toEqual(1)
    expect(gradient.colorStops[1].color).toEqual("green")
    expect(!("opacity" in gradient.colorStops[1])).toBeTruthy()
  })

  test("properties radialGradient", function (assert) {
    var gradient = createRadialGradient()

    expect(gradient.coords.x1).toEqual(0)
    expect(gradient.coords.y1).toEqual(10)
    expect(gradient.coords.x2).toEqual(100)
    expect(gradient.coords.y2).toEqual(200)
    expect(gradient.coords.r1).toEqual(0)
    expect(gradient.coords.r2).toEqual(50)

    expect(gradient.type).toEqual("radial")

    expect(gradient.colorStops[0].offset).toEqual(0)
    expect(gradient.colorStops[0].color).toEqual("red")
    expect(!("opacity" in gradient.colorStops[0])).toBeTruthy()

    expect(gradient.colorStops[1].offset).toEqual(1)
    expect(gradient.colorStops[1].color).toEqual("green")
    expect(gradient.colorStops[1].opacity).toEqual(0)
  })

  test("toObject linearGradient", function (assert) {
    var gradient = createLinearGradient()
    gradient.gradientTransform = [1, 0, 0, 1, 50, 50]
    expect(typeof gradient.toObject === "function").toBeTruthy()

    var object = gradient.toObject()

    expect(object.coords.x1).toEqual(gradient.coords.x1)
    expect(object.coords.x2).toEqual(gradient.coords.x2)
    expect(object.coords.y1).toEqual(gradient.coords.y1)
    expect(object.coords.y2).toEqual(gradient.coords.y2)
    expect(object.gradientUnits).toEqual(gradient.gradientUnits)
    expect(object.type).toEqual(gradient.type)
    expect(object.gradientTransform).toEqual(gradient.gradientTransform)
    expect(object.colorStops).toEqual(gradient.colorStops)
  })

  test("toObject with custom props", function (assert) {
    var gradient = createLinearGradient()
    gradient.id = "myId"
    var object = gradient.toObject(["id"])
    expect(object.id).toEqual("myId")
  })

  test("toObject radialGradient", function (assert) {
    var gradient = createRadialGradient()

    expect(typeof gradient.toObject === "function").toBeTruthy()

    var object = gradient.toObject()

    expect(object.coords.x1).toEqual(gradient.coords.x1)
    expect(object.coords.x2).toEqual(gradient.coords.x2)
    expect(object.coords.y1).toEqual(gradient.coords.y1)
    expect(object.coords.y2).toEqual(gradient.coords.y2)
    expect(object.coords.r1).toEqual(gradient.coords.r1)
    expect(object.coords.r2).toEqual(gradient.coords.r2)

    expect(object.type).toEqual(gradient.type)

    expect(object.colorStops).toEqual(gradient.colorStops)
  })

  test("toLive linearGradient", function (assert) {
    var canvas = new fabric.StaticCanvas(null, { enableRetinaScaling: false })
    var gradient = createLinearGradient()
    var gradientHTML = canvas.contextContainer.createLinearGradient(0, 0, 1, 1)
    expect(typeof gradient.toLive === "function").toBeTruthy()
    var gradientCtx = gradient.toLive(canvas.contextContainer)
    expect(gradientCtx.toString()).toEqual(gradientHTML.toString())
  })

  test("toLive radialGradient", function (assert) {
    var canvas = new fabric.StaticCanvas(null, { enableRetinaScaling: false })
    var gradient = createRadialGradient()
    var gradientHTML = canvas.contextContainer.createRadialGradient(
      0,
      0,
      1,
      1,
      2,
      2
    )
    expect(typeof gradient.toLive === "function").toBeTruthy()
    var gradientCtx = gradient.toLive(canvas.contextContainer)
    expect(gradientCtx.toString()).toEqual(gradientHTML.toString())
  })

  test("fromElement linearGradient", function (assert) {
    expect(typeof fabric.Gradient.fromElement === "function").toBeTruthy()

    var namespace = "http://www.w3.org/2000/svg"
    var element = fabric.document.createElementNS(namespace, "linearGradient")
    var stop1 = fabric.document.createElement("stop")
    var stop2 = fabric.document.createElement("stop")

    stop1.setAttributeNS(namespace, "offset", "0%")
    stop1.setAttributeNS(namespace, "stop-color", "white")

    stop2.setAttributeNS(namespace, "offset", "100%")
    stop2.setAttributeNS(namespace, "stop-color", "black")
    stop2.setAttributeNS(namespace, "stop-opacity", "0")

    element.appendChild(stop1)
    element.appendChild(stop2)

    var object = new fabric.Object({ width: 100, height: 100 })
    var gradient = fabric.Gradient.fromElement(element, object, "")

    expect(gradient instanceof fabric.Gradient).toBeTruthy()
    expect(gradient.type).toEqual("linear")
    expect(gradient.coords.x1).toEqual(0)
    expect(gradient.coords.y1).toEqual(0)
    expect(gradient.coords.x2).toEqual(1)
    expect(gradient.coords.y2).toEqual(0)
    expect(gradient.gradientUnits).toEqual("percentage")

    expect(gradient.colorStops[0].offset).toEqual(1)
    expect(gradient.colorStops[1].offset).toEqual(0)

    expect(gradient.colorStops[0].color).toEqual("rgb(0,0,0)")
    expect(gradient.colorStops[1].color).toEqual("rgb(255,255,255)")

    expect(gradient.colorStops[0].opacity).toEqual(0)
  })

  test(
    "fromElement linearGradient with floats percentage - objectBoundingBox",
    function (assert) {
      expect(typeof fabric.Gradient.fromElement === "function").toBeTruthy()

      var namespace = "http://www.w3.org/2000/svg"
      var element = fabric.document.createElementNS(namespace, "linearGradient")
      element.setAttributeNS(namespace, "gradientUnits", "objectBoundingBox")
      element.setAttributeNS(namespace, "x1", "10%")
      element.setAttributeNS(namespace, "y1", "0.2%")
      element.setAttributeNS(namespace, "x2", "200")
      element.setAttributeNS(namespace, "y2", "20%")
      var stop1 = fabric.document.createElement("stop")
      var stop2 = fabric.document.createElement("stop")

      stop1.setAttributeNS(namespace, "offset", "0%")
      stop1.setAttributeNS(namespace, "stop-color", "white")

      stop2.setAttributeNS(namespace, "offset", "100%")
      stop2.setAttributeNS(namespace, "stop-color", "black")
      stop2.setAttributeNS(namespace, "stop-opacity", "0")

      element.appendChild(stop1)
      element.appendChild(stop2)

      var object = new fabric.Object({ width: 200, height: 200 })
      var gradient = fabric.Gradient.fromElement(element, object, "")

      expect(gradient instanceof fabric.Gradient).toBeTruthy()

      expect(gradient.coords.x1).toEqual(0.1)
      expect(gradient.coords.y1).toEqual(0.002)
      expect(gradient.coords.x2).toEqual(200)
      expect(gradient.coords.y2).toEqual(0.2)
      expect(gradient.gradientUnits).toEqual("percentage")
    }
  )

  test(
    "fromElement linearGradient with floats percentage - userSpaceOnUse",
    function (assert) {
      expect(typeof fabric.Gradient.fromElement === "function").toBeTruthy()

      var namespace = "http://www.w3.org/2000/svg"
      var element = fabric.document.createElementNS(namespace, "linearGradient")
      element.setAttributeNS(namespace, "gradientUnits", "userSpaceOnUse")
      element.setAttributeNS(namespace, "x1", "10%")
      element.setAttributeNS(namespace, "y1", "0.2%")
      element.setAttributeNS(namespace, "x2", "200")
      element.setAttributeNS(namespace, "y2", "20%")
      var stop1 = fabric.document.createElement("stop")
      var stop2 = fabric.document.createElement("stop")

      stop1.setAttributeNS(namespace, "offset", "0%")
      stop1.setAttributeNS(namespace, "stop-color", "white")

      stop2.setAttributeNS(namespace, "offset", "100%")
      stop2.setAttributeNS(namespace, "stop-color", "black")
      stop2.setAttributeNS(namespace, "stop-opacity", "0")

      element.appendChild(stop1)
      element.appendChild(stop2)

      var object = new fabric.Object({
        left: 10,
        top: 15,
        width: 200,
        height: 200
      })
      var gradient = fabric.Gradient.fromElement(element, object, "", {
        viewBoxWidth: 400,
        viewBoxHeight: 300
      })

      expect(gradient instanceof fabric.Gradient).toBeTruthy()
      expect(gradient.gradientUnits).toEqual("pixels")
      expect(gradient.offsetX).toEqual(-10)
      expect(gradient.offsetY).toEqual(-15)
      expect(gradient.coords.x1).toEqual(40)
      expect(gradient.coords.y1).toEqual(0.6)
      expect(gradient.coords.x2).toEqual(200)
      expect(gradient.coords.y2).toEqual(60)
    }
  )

  test("fromElement linearGradient with Infinity", function (assert) {
    expect(typeof fabric.Gradient.fromElement === "function").toBeTruthy()

    var namespace = "http://www.w3.org/2000/svg"
    var element = fabric.document.createElementNS(namespace, "linearGradient")
    var stop1 = fabric.document.createElementNS(namespace, "stop")
    var stop2 = fabric.document.createElementNS(namespace, "stop")

    stop1.setAttributeNS(namespace, "offset", "0%")
    stop1.setAttributeNS(namespace, "stop-color", "white")

    stop2.setAttributeNS(namespace, "offset", "100%")
    stop2.setAttributeNS(namespace, "stop-color", "black")
    stop2.setAttributeNS(namespace, "stop-opacity", "0")

    element.setAttributeNS(namespace, "x1", "-Infinity")
    element.setAttributeNS(namespace, "x2", "Infinity")
    element.setAttributeNS(namespace, "y1", "Infinity")
    element.setAttributeNS(namespace, "y2", "-Infinity")
    element.appendChild(stop1)
    element.appendChild(stop2)

    var object = new fabric.Object({
      width: 100,
      height: 300,
      top: 20,
      left: 30
    })
    var gradient = fabric.Gradient.fromElement(element, object, "")

    expect(gradient instanceof fabric.Gradient).toBeTruthy()

    expect(gradient.coords.x1).toEqual(0)
    expect(gradient.coords.y1).toEqual(1)
    expect(gradient.coords.x2).toEqual(1)
    expect(gradient.coords.y2).toEqual(0)

    expect(gradient.colorStops[0].offset).toEqual(1)
    expect(gradient.colorStops[1].offset).toEqual(0)

    expect(gradient.colorStops[0].color).toEqual("rgb(0,0,0)")
    expect(gradient.colorStops[1].color).toEqual("rgb(255,255,255)")

    expect(gradient.colorStops[0].opacity).toEqual(0)
  })

  test("fromElement without stop", function (assert) {
    expect(typeof fabric.Gradient.fromElement === "function").toBeTruthy()

    var namespace = "http://www.w3.org/2000/svg"
    var element = fabric.document.createElementNS(namespace, "linearGradient")
    var stop1 = fabric.document.createElementNS(namespace, "stop")
    var stop2 = fabric.document.createElementNS(namespace, "stop")

    stop1.setAttributeNS(namespace, "stop-color", "white")

    stop2.setAttributeNS(namespace, "offset", "100%")
    stop2.setAttributeNS(namespace, "stop-color", "black")
    stop2.setAttributeNS(namespace, "stop-opacity", "0")

    element.appendChild(stop1)
    element.appendChild(stop2)

    var object = new fabric.Object({ width: 100, height: 100 })
    var gradient = fabric.Gradient.fromElement(element, object, "")

    expect(gradient instanceof fabric.Gradient).toBeTruthy()

    expect(gradient.colorStops[0].offset).toEqual(1)
    expect(gradient.colorStops[1].offset).toEqual(0)
  })

  test("fromElement with x1,x2,y1,2 linear", function (assert) {
    expect(typeof fabric.Gradient.fromElement === "function").toBeTruthy()

    var namespace = "http://www.w3.org/2000/svg"
    var element = fabric.document.createElementNS(namespace, "linearGradient")

    element.setAttributeNS(namespace, "x1", "30%")
    element.setAttributeNS(namespace, "x2", "20%")
    element.setAttributeNS(namespace, "y1", "0.1")
    element.setAttributeNS(namespace, "y2", "Infinity")

    var object = new fabric.Object({ width: 200, height: 200 })
    var gradient = fabric.Gradient.fromElement(element, object, "")
    expect(gradient.coords.x1).toEqual(0.3)
    expect(gradient.coords.y1).toEqual(0.1)
    expect(gradient.coords.x2).toEqual(0.2)
    expect(gradient.coords.y2).toEqual(1)
    object = new fabric.Object({ width: 200, height: 200, top: 50, left: 10 })
    gradient = fabric.Gradient.fromElement(element, object, "")
    expect(gradient.coords.x1).toEqual(0.3)
    expect(gradient.coords.y1).toEqual(0.1)
    expect(gradient.coords.x2).toEqual(0.2)
    expect(gradient.coords.y2).toEqual(1)
  })

  test("fromElement with x1,x2,y1,2 radial", function (assert) {
    expect(typeof fabric.Gradient.fromElement === "function").toBeTruthy()

    var namespace = "http://www.w3.org/2000/svg"
    var element = fabric.document.createElementNS(namespace, "radialGradient")

    element.setAttributeNS(namespace, "fx", "30%")
    element.setAttributeNS(namespace, "fy", "20%")
    element.setAttributeNS(namespace, "cx", "0.1")
    element.setAttributeNS(namespace, "cy", "1")
    element.setAttributeNS(namespace, "r", "100%")

    var object = new fabric.Object({ width: 200, height: 200 })
    var gradient = fabric.Gradient.fromElement(element, object, "")
    expect(gradient.coords.x1).toEqual(0.3)
    expect(gradient.coords.y1).toEqual(0.2)
    expect(gradient.coords.x2).toEqual(0.1)
    expect(gradient.coords.y2).toEqual(1)
    expect(gradient.coords.r1).toEqual(0)
    expect(gradient.coords.r2).toEqual(1)

    object = new fabric.Object({ width: 200, height: 200, top: 10, left: 10 })
    gradient = fabric.Gradient.fromElement(element, object, "")
    expect(gradient.coords.x1).toEqual(0.3)
    expect(gradient.coords.y1).toEqual(0.2)
    expect(gradient.coords.x2).toEqual(0.1)
    expect(gradient.coords.y2).toEqual(1)
    expect(gradient.coords.r1).toEqual(0)
    expect(gradient.coords.r2).toEqual(1)
  })

  test("fromElement with x1,x2,y1,2 radial userSpaceOnUse", function (
    assert
  ) {
    expect(typeof fabric.Gradient.fromElement === "function").toBeTruthy()

    var namespace = "http://www.w3.org/2000/svg"
    var element = fabric.document.createElementNS(namespace, "radialGradient")

    element.setAttributeNS(namespace, "fx", "30")
    element.setAttributeNS(namespace, "fy", "20")
    element.setAttributeNS(namespace, "cx", "15")
    element.setAttributeNS(namespace, "cy", "18")
    element.setAttributeNS(namespace, "r", "100")
    element.setAttributeNS(namespace, "gradientUnits", "userSpaceOnUse")

    var object = new fabric.Object({ width: 200, height: 200 })
    var gradient = fabric.Gradient.fromElement(element, object, "")
    expect(gradient.coords.x1).toEqual(30)
    expect(gradient.coords.y1).toEqual(20)
    expect(gradient.coords.x2).toEqual(15)
    expect(gradient.coords.y2).toEqual(18)
    expect(gradient.coords.r1).toEqual(0)
    expect(gradient.coords.r2).toEqual(100)

    object = new fabric.Object({ width: 200, height: 200, top: 50, left: 60 })
    gradient = fabric.Gradient.fromElement(element, object, "")
    expect(gradient.coords.x1).toEqual(30)
    expect(gradient.coords.y1).toEqual(20)
    expect(gradient.coords.x2).toEqual(15)
    expect(gradient.coords.y2).toEqual(18)
    expect(gradient.coords.r1).toEqual(0)
    expect(gradient.coords.r2).toEqual(100)
  })

  test("fromElement with x1,x2,y1,2 linear userSpaceOnUse", function (
    assert
  ) {
    expect(typeof fabric.Gradient.fromElement === "function").toBeTruthy()

    var namespace = "http://www.w3.org/2000/svg"
    var element = fabric.document.createElementNS(namespace, "linearGradient")

    element.setAttributeNS(namespace, "x1", "30")
    element.setAttributeNS(namespace, "y1", "20")
    element.setAttributeNS(namespace, "x2", "15")
    element.setAttributeNS(namespace, "y2", "18")
    element.setAttributeNS(namespace, "gradientUnits", "userSpaceOnUse")

    var object = new fabric.Object({ width: 200, height: 200 })
    var gradient = fabric.Gradient.fromElement(element, object, "")
    expect(gradient.coords.x1).toEqual(30)
    expect(gradient.coords.y1).toEqual(20)
    expect(gradient.coords.x2).toEqual(15)
    expect(gradient.coords.y2).toEqual(18)

    object = new fabric.Object({ width: 200, height: 200, top: 40, left: 40 })
    gradient = fabric.Gradient.fromElement(element, object, "")
    expect(gradient.coords.x1).toEqual(30)
    expect(gradient.coords.y1).toEqual(20)
    expect(gradient.coords.x2).toEqual(15)
    expect(gradient.coords.y2).toEqual(18)
  })

  test("fromElement radialGradient defaults", function (assert) {
    expect(typeof fabric.Gradient.fromElement === "function").toBeTruthy()

    var namespace = "http://www.w3.org/2000/svg"
    var element = fabric.document.createElementNS(namespace, "radialGradient")
    var stop1 = fabric.document.createElementNS(namespace, "stop")
    var stop2 = fabric.document.createElementNS(namespace, "stop")

    stop1.setAttributeNS(namespace, "offset", "0%")
    stop1.setAttributeNS(namespace, "stop-color", "white")

    stop2.setAttributeNS(namespace, "offset", "100%")
    stop2.setAttributeNS(namespace, "stop-color", "black")

    element.appendChild(stop1)
    element.appendChild(stop2)

    var object = new fabric.Object({ width: 100, height: 100 })
    var gradient = fabric.Gradient.fromElement(element, object, "", {})

    expect(gradient instanceof fabric.Gradient).toBeTruthy()

    expect(gradient.coords.x1).toEqual(0.5)
    expect(gradient.coords.y1).toEqual(0.5)
    expect(gradient.coords.x2).toEqual(0.5)
    expect(gradient.coords.y2).toEqual(0.5)
    expect(gradient.coords.r1).toEqual(0)
    expect(gradient.coords.r2).toEqual(0.5)

    expect(gradient.colorStops[0].offset).toEqual(1)
    expect(gradient.colorStops[1].offset).toEqual(0)

    expect(gradient.colorStops[0].color).toEqual("rgb(0,0,0)")
    expect(gradient.colorStops[1].color).toEqual("rgb(255,255,255)")
  })

  test("fromElement radialGradient with transform", function (assert) {
    expect(typeof fabric.Gradient.fromElement === "function").toBeTruthy()

    var namespace = "http://www.w3.org/2000/svg"
    var element = fabric.document.createElementNS(namespace, "radialGradient")
    var stop1 = fabric.document.createElementNS(namespace, "stop")
    var stop2 = fabric.document.createElementNS(namespace, "stop")

    stop1.setAttributeNS(namespace, "offset", "0%")
    stop1.setAttributeNS(namespace, "stop-color", "white")

    stop2.setAttributeNS(namespace, "offset", "100%")
    stop2.setAttributeNS(namespace, "stop-color", "black")

    element.appendChild(stop1)
    element.appendChild(stop2)
    element.setAttributeNS(
      namespace,
      "gradientTransform",
      "matrix(3.321 -0.6998 0.4077 1.9347 -440.9168 -408.0598)"
    )
    var object = new fabric.Object({ width: 100, height: 100 })
    var gradient = fabric.Gradient.fromElement(element, object, "", {})
    expect(gradient.gradientTransform).toEqual([
      3.321,
      -0.6998,
      0.4077,
      1.9347,
      -440.9168,
      -408.0598
    ])
  })

  test(
    "fromElement linearGradient colorStop attributes/styles",
    function (assert) {
      expect(typeof fabric.Gradient.fromElement === "function").toBeTruthy()

      var namespace = "http://www.w3.org/2000/svg"
      var element = fabric.document.createElementNS(namespace, "linearGradient")
      var stop1 = fabric.document.createElementNS(namespace, "stop")
      var stop2 = fabric.document.createElementNS(namespace, "stop")
      var stop3 = fabric.document.createElementNS(namespace, "stop")
      var stop4 = fabric.document.createElementNS(namespace, "stop")

      stop1.setAttributeNS(namespace, "offset", "0%")
      stop1.setAttributeNS(namespace, "stop-color", "")
      stop1.setAttributeNS(namespace, "stop-opacity", "")

      stop2.setAttributeNS(namespace, "offset", "0.5")
      stop2.setAttributeNS(
        namespace,
        "style",
        "stop-color: black; stop-opacity:;"
      )
      stop2.setAttributeNS(namespace, "stop-color", "white")

      stop3.setAttributeNS(namespace, "offset", "75%")
      stop3.setAttributeNS(namespace, "style", "stop-color:; stop-opacity:;")
      stop3.setAttributeNS(namespace, "stop-opacity", "0.9")
      stop3.setAttributeNS(namespace, "stop-color", "blue")

      stop4.setAttributeNS(namespace, "offset", "100%")
      stop4.setAttributeNS(
        namespace,
        "style",
        "stop-color: red; stop-opacity: 0.5;"
      )
      stop4.setAttributeNS(namespace, "stop-opacity", "0.9")

      element.appendChild(stop1)
      element.appendChild(stop2)
      element.appendChild(stop3)
      element.appendChild(stop4)

      var object = new fabric.Object({ width: 100, height: 100 })
      var gradient = fabric.Gradient.fromElement(element, object, "")

      expect(gradient instanceof fabric.Gradient).toBeTruthy()

      expect(gradient.coords.x1).toEqual(0)
      expect(gradient.coords.y1).toEqual(0)
      expect(gradient.coords.x2).toEqual(1)
      expect(gradient.coords.y2).toEqual(0)

      expect(gradient.colorStops[0].offset).toEqual(1)
      expect(gradient.colorStops[1].offset).toEqual(0.75)
      expect(gradient.colorStops[2].offset).toEqual(0.5)
      expect(gradient.colorStops[3].offset).toEqual(0)

      expect(gradient.colorStops[0].color).toEqual("rgb(255,0,0)")
      expect(gradient.colorStops[1].color).toEqual("rgb(0,0,255)")
      expect(gradient.colorStops[2].color).toEqual("rgb(0,0,0)")
      expect(gradient.colorStops[3].color).toEqual("rgb(0,0,0)")

      expect(gradient.colorStops[0].opacity).toEqual(0.5)
      expect(gradient.colorStops[1].opacity).toEqual(0.9)
      expect(gradient.colorStops[2].opacity).toEqual(1)
      expect(gradient.colorStops[3].opacity).toEqual(1)
    }
  )

  test(
    "fromElement radialGradient colorStop attributes/styles",
    function (assert) {
      expect(typeof fabric.Gradient.fromElement === "function").toBeTruthy()

      var namespace = "http://www.w3.org/2000/svg"
      var element = fabric.document.createElementNS(namespace, "radialGradient")
      var stop1 = fabric.document.createElementNS(namespace, "stop")
      var stop2 = fabric.document.createElementNS(namespace, "stop")
      var stop3 = fabric.document.createElementNS(namespace, "stop")
      var stop4 = fabric.document.createElementNS(namespace, "stop")

      stop1.setAttributeNS(namespace, "offset", "0%")
      stop1.setAttributeNS(namespace, "stop-color", "")
      stop1.setAttributeNS(namespace, "stop-opacity", "")

      stop2.setAttributeNS(namespace, "offset", "0.5")
      stop2.setAttributeNS(
        namespace,
        "style",
        "stop-color: black; stop-opacity:;"
      )
      stop2.setAttributeNS(namespace, "stop-color", "white")

      stop3.setAttributeNS(namespace, "offset", "75%")
      stop3.setAttributeNS(namespace, "style", "stop-color:; stop-opacity:;")
      stop3.setAttributeNS(namespace, "stop-opacity", "0.9")
      stop3.setAttributeNS(namespace, "stop-color", "blue")

      stop4.setAttributeNS(namespace, "offset", "100%")
      stop4.setAttributeNS(
        namespace,
        "style",
        "stop-color: red; stop-opacity: 0.5;"
      )
      stop4.setAttributeNS(namespace, "stop-opacity", "0.9")

      element.appendChild(stop1)
      element.appendChild(stop2)
      element.appendChild(stop3)
      element.appendChild(stop4)

      var object = new fabric.Object({ width: 100, height: 100 })
      var gradient = fabric.Gradient.fromElement(element, object, "")

      expect(gradient instanceof fabric.Gradient).toBeTruthy()

      expect(gradient.colorStops[0].offset).toEqual(1)
      expect(gradient.colorStops[1].offset).toEqual(0.75)
      expect(gradient.colorStops[2].offset).toEqual(0.5)
      expect(gradient.colorStops[3].offset).toEqual(0)

      expect(gradient.colorStops[0].color).toEqual("rgb(255,0,0)")
      expect(gradient.colorStops[1].color).toEqual("rgb(0,0,255)")
      expect(gradient.colorStops[2].color).toEqual("rgb(0,0,0)")
      expect(gradient.colorStops[3].color).toEqual("rgb(0,0,0)")

      expect(gradient.colorStops[0].opacity).toEqual(0.5)
      expect(gradient.colorStops[1].opacity).toEqual(0.9)
      expect(gradient.colorStops[2].opacity).toEqual(1)
      expect(gradient.colorStops[3].opacity).toEqual(1)
    }
  )

  test("toSVG", function (assert) {
    var gradient = createLinearGradient()
    expect(typeof gradient.toSVG === "function").toBeTruthy()
  })

  test("toSVG linear", function (assert) {
    fabric.Object.__uid = 0
    var gradient = createLinearGradient()
    var obj = new fabric.Object({ width: 100, height: 100 })
    expect(gradient.toSVG(obj)).toEqual(SVG_LINEAR)
  })

  test("toSVG radial", function (assert) {
    fabric.Object.__uid = 0
    var gradient = createRadialGradient()
    var obj = new fabric.Object({ width: 100, height: 100 })
    expect(gradient.toSVG(obj)).toEqual(SVG_RADIAL)
  })

  test("toSVG radial with r1 > 0", function (assert) {
    fabric.Object.__uid = 0
    var gradient = createRadialGradientWithInternalRadius()
    var obj = new fabric.Object({ width: 100, height: 100 })
    expect(gradient.toSVG(obj)).toEqual(SVG_INTERNALRADIUS)
  })

  test("toSVG radial with r1 > 0 swapped", function (assert) {
    fabric.Object.__uid = 0
    var gradient = createRadialGradientSwapped()
    var obj = new fabric.Object({ width: 100, height: 100 })
    expect(gradient.toSVG(obj)).toEqual(SVG_SWAPPED)
  })

  test("toSVG linear objectBoundingBox", function (assert) {
    fabric.Object.__uid = 0
    var gradient = createLinearGradient("percentage")
    var obj = new fabric.Object({ width: 100, height: 100 })
    expect(gradient.toSVG(obj)).toEqual(SVG_LINEAR_PERCENTAGE)
  })

  test("toSVG radial objectBoundingBox", function (assert) {
    fabric.Object.__uid = 0
    var gradient = createRadialGradient("percentage")
    var obj = new fabric.Object({ width: 100, height: 100 })
    expect(gradient.toSVG(obj)).toEqual(SVG_RADIAL_PERCENTAGE)
  })
})()
