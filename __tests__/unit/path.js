;(function () {
  var REFERENCE_PATH_OBJECT = {
    version: fabric.version,
    type: "path",
    originX: "left",
    originY: "top",
    left: 100,
    top: 100,
    width: 200,
    height: 200,
    fill: "red",
    stroke: "blue",
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
    path: [["M", 100, 100], ["L", 300, 100], ["L", 200, 300], ["z"]],
    shadow: null,
    visible: true,
    backgroundColor: "",
    fillRule: "nonzero",
    paintFirst: "fill",
    globalCompositeOperation: "source-over",
    skewX: 0,
    skewY: 0
  }

  function getPathElement(path) {
    var namespace = "http://www.w3.org/2000/svg"
    var el = fabric.document.createElementNS(namespace, "path")
    el.setAttributeNS(namespace, "d", path)
    el.setAttributeNS(namespace, "fill", "red")
    el.setAttributeNS(namespace, "stroke", "blue")
    el.setAttributeNS(namespace, "stroke-width", 1)
    el.setAttributeNS(namespace, "stroke-linecap", "butt")
    el.setAttributeNS(namespace, "stroke-linejoin", "miter")
    el.setAttributeNS(namespace, "stroke-miterlimit", 4)
    return el
  }

  function getPathObject(path, callback) {
    fabric.Path.fromElement(getPathElement(path), callback)
  }

  function makePathObject(callback) {
    getPathObject("M 100 100 L 300 100 L 200 300 z", callback)
  }

  describe("fabric.Path", {
    beforeEach: function () {
      fabric.Object.__uid = 0
    }
  })

  test("constructor", function (assert) {
    var done = assert.async()
    expect(fabric.Path).toBeTruthy()

    makePathObject(function (path) {
      expect(path instanceof fabric.Path).toBeTruthy()
      expect(path instanceof fabric.Object).toBeTruthy()

      expect(path.get("type")).toEqual("path")

      var error
      try {
        new fabric.Path()
      } catch (err) {
        error = err
      }

      expect(typeof error === "undefined").toBeTruthy()
      done()
    })
  })

  test("initialize", function (assert) {
    var done = assert.async()
    var path = new fabric.Path("M 100 100 L 200 100 L 170 200 z", {
      top: 0,
      strokeWidth: 0
    })

    expect(path.left).toEqual(100)
    expect(path.top).toEqual(0)
    done()
  })

  test("initialize with strokeWidth", function (assert) {
    var done = assert.async()
    var path = new fabric.Path("M 100 100 L 200 100 L 170 200 z", {
      strokeWidth: 50
    })

    expect(path.left).toEqual(75)
    expect(path.top).toEqual(75)
    done()
  })

  test("initialize with strokeWidth with originX and originY", function (
    assert
  ) {
    var done = assert.async()
    var path = new fabric.Path("M 100 100 L 200 100 L 170 200 z", {
      strokeWidth: 0,
      originX: "center",
      originY: "center"
    })

    expect(path.left).toEqual(150)
    expect(path.top).toEqual(150)
    done()
  })

  test("toString", function (assert) {
    var done = assert.async()
    makePathObject(function (path) {
      expect(typeof path.toString === "function").toBeTruthy()
      expect(path.toString()).toEqual('#<fabric.Path (4): { "top": 100, "left": 100 }>')
      done()
    })
  })

  test("toObject", function (assert) {
    var done = assert.async()
    makePathObject(function (path) {
      expect(typeof path.toObject === "function").toBeTruthy()
      expect(path.toObject()).toEqual(REFERENCE_PATH_OBJECT)
      done()
    })
  })

  test("toObject", function (assert) {
    var done = assert.async()
    makePathObject(function (path) {
      path.top = fabric.Object.prototype.top
      path.left = fabric.Object.prototype.left
      path.includeDefaultValues = false
      var obj = path.toObject()
      expect(obj.top).toEqual(fabric.Object.prototype.top)
      expect(obj.left).toEqual(fabric.Object.prototype.left)
      done()
    })
  })

  test("toSVG", function (assert) {
    var done = assert.async()
    makePathObject(function (path) {
      expect(typeof path.toSVG === "function").toBeTruthy()
      expect(path.toSVG()).toEqual(
        '<g transform="matrix(1 0 0 1 200.5 200.5)"  >\n<path style="stroke: rgb(0,0,255); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,0,0); fill-rule: nonzero; opacity: 1;"  transform=" translate(-200, -200)" d="M 100 100 L 300 100 L 200 300 z" stroke-linecap="round" />\n</g>\n'
      )
      done()
    })
  })

  test("toSVG with a clipPath path", function (assert) {
    var done = assert.async()
    makePathObject(function (path) {
      makePathObject(function (path2) {
        path.clipPath = path2
        expect(path.toSVG()).toEqual(
          '<g transform="matrix(1 0 0 1 200.5 200.5)" clip-path="url(#CLIPPATH_0)"  >\n<clipPath id="CLIPPATH_0" >\n\t<path transform="matrix(1 0 0 1 200.5 200.5) translate(-200, -200)" d="M 100 100 L 300 100 L 200 300 z" stroke-linecap="round" />\n</clipPath>\n<path style="stroke: rgb(0,0,255); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,0,0); fill-rule: nonzero; opacity: 1;"  transform=" translate(-200, -200)" d="M 100 100 L 300 100 L 200 300 z" stroke-linecap="round" />\n</g>\n'
        )
        done()
      })
    })
  })

  test("toSVG with a clipPath path absolutePositioned", function (
    assert
  ) {
    var done = assert.async()
    makePathObject(function (path) {
      makePathObject(function (path2) {
        path.clipPath = path2
        path.clipPath.absolutePositioned = true
        expect(path.toSVG()).toEqual(
          '<g clip-path="url(#CLIPPATH_0)"  >\n<g transform="matrix(1 0 0 1 200.5 200.5)"  >\n<clipPath id="CLIPPATH_0" >\n\t<path transform="matrix(1 0 0 1 200.5 200.5) translate(-200, -200)" d="M 100 100 L 300 100 L 200 300 z" stroke-linecap="round" />\n</clipPath>\n<path style="stroke: rgb(0,0,255); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,0,0); fill-rule: nonzero; opacity: 1;"  transform=" translate(-200, -200)" d="M 100 100 L 300 100 L 200 300 z" stroke-linecap="round" />\n</g>\n</g>\n'
        )
        done()
      })
    })
  })

  test("path array not shared when cloned", function (assert) {
    var done = assert.async()
    makePathObject(function (originalPath) {
      originalPath.clone(function (clonedPath) {
        clonedPath.path[0][1] = 200
        expect(originalPath.path[0][1]).toEqual(100)
        done()
      })
    })
  })

  test("toDatalessObject", function (assert) {
    var done = assert.async()
    makePathObject(function (path) {
      expect(typeof path.toDatalessObject === "function").toBeTruthy()
      expect(path.toDatalessObject()).toEqual(REFERENCE_PATH_OBJECT)
      done()
    })
  })

  test("toDatalessObject with sourcePath", function (assert) {
    var done = assert.async()
    makePathObject(function (path) {
      var src = "http://example.com/"
      path.sourcePath = src
      var clonedRef = fabric.util.object.clone(REFERENCE_PATH_OBJECT)
      clonedRef.sourcePath = src
      delete clonedRef.path
      expect(path.toDatalessObject()).toEqual(clonedRef)
      done()
    })
  })

  test("complexity", function (assert) {
    var done = assert.async()
    makePathObject(function (path) {
      expect(typeof path.complexity === "function").toBeTruthy()
      done()
    })
  })

  test("fromObject", function (assert) {
    var done = assert.async()
    expect(typeof fabric.Path.fromObject === "function").toBeTruthy()
    fabric.Path.fromObject(REFERENCE_PATH_OBJECT, function (path) {
      expect(path instanceof fabric.Path).toBeTruthy()
      expect(path.toObject()).toEqual(REFERENCE_PATH_OBJECT)
      done()
    })
  })

  test("fromObject with sourcePath", function (assert) {
    var done = assert.async()
    expect(typeof fabric.Path.fromObject === "function").toBeTruthy()
    fabric.Path.fromObject(REFERENCE_PATH_OBJECT, function (path) {
      expect(path instanceof fabric.Path).toBeTruthy()
      expect(path.toObject()).toEqual(REFERENCE_PATH_OBJECT)
      done()
    })
  })

  test("fromElement", function (assert) {
    var done = assert.async()
    expect(typeof fabric.Path.fromElement === "function").toBeTruthy()
    var namespace = "http://www.w3.org/2000/svg"
    var elPath = fabric.document.createElementNS(namespace, "path")

    elPath.setAttributeNS(namespace, "d", "M 100 100 L 300 100 L 200 300 z")
    elPath.setAttributeNS(namespace, "fill", "red")
    elPath.setAttributeNS(namespace, "opacity", "1")
    elPath.setAttributeNS(namespace, "stroke", "blue")
    elPath.setAttributeNS(namespace, "stroke-width", "1")
    elPath.setAttributeNS(namespace, "stroke-dasharray", "5, 2")
    elPath.setAttributeNS(namespace, "stroke-linecap", "round")
    elPath.setAttributeNS(namespace, "stroke-linejoin", "bevil")
    elPath.setAttributeNS(namespace, "stroke-miterlimit", "5")

    // TODO (kangax): to support multiple transformation keywords, we need to do proper matrix multiplication
    //elPath.setAttribute('transform', 'scale(2) translate(10, -20)');
    elPath.setAttributeNS(namespace, "transform", "scale(2)")

    fabric.Path.fromElement(elPath, function (path) {
      expect(path instanceof fabric.Path).toBeTruthy()

      expect(path.toObject()).toEqual(fabric.util.object.extend(REFERENCE_PATH_OBJECT, {
        strokeDashArray: [5, 2],
        strokeLineCap: "round",
        strokeLineJoin: "bevil",
        strokeMiterLimit: 5
      }))

      var ANGLE_DEG = 90
      elPath.setAttributeNS(namespace, "transform", "rotate(" + ANGLE_DEG + ")")
      fabric.Path.fromElement(elPath, function (path) {
        expect(path.get("transformMatrix")).toEqual([0, 1, -1, 0, 0, 0])
        done()
      })
    })
  })

  test("numbers with leading decimal point", function (assert) {
    var done = assert.async()
    expect(typeof fabric.Path.fromElement === "function").toBeTruthy()
    var namespace = "http://www.w3.org/2000/svg"
    var elPath = fabric.document.createElementNS(namespace, "path")

    elPath.setAttributeNS(namespace, "d", "M 100 100 L 300 100 L 200 300 z")
    elPath.setAttributeNS(namespace, "transform", "scale(.2)")

    fabric.Path.fromElement(elPath, function (path) {
      expect(path instanceof fabric.Path).toBeTruthy()
      expect(path.transformMatrix).toEqual([0.2, 0, 0, 0.2, 0, 0])
      done()
    })
  })

  test("multiple sequences in path commands", function (assert) {
    var done = assert.async()
    var el = getPathElement("M100 100 l 200 200 300 300 400 -50 z")
    fabric.Path.fromElement(el, function (obj) {
      expect(obj.path[0]).toEqual(["M", 100, 100])
      expect(obj.path[1]).toEqual(["L", 300, 300])
      expect(obj.path[2]).toEqual(["L", 600, 600])
      expect(obj.path[3]).toEqual(["L", 1000, 550])

      el = getPathElement(
        "c 0,-53.25604 43.17254,-96.42858 96.42857,-96.42857 53.25603,0 96.42857,43.17254 96.42857,96.42857"
      )
      fabric.Path.fromElement(el, function (obj) {
        expect(obj.path[0]).toEqual([
          "C",
          0,
          -53.25604,
          43.17254,
          -96.42858,
          96.42857,
          -96.42857
        ])
        expect(obj.path[1]).toEqual([
          "C",
          149.6846,
          -96.42857,
          192.85714,
          -53.256029999999996,
          192.85714,
          0
        ])
        done()
      })
    })
  })

  test("multiple M/m coordinates converted all L", function (assert) {
    var done = assert.async()
    var el = getPathElement("M100 100 200 200 150 50 m 300 300 400 -50 50 100")
    fabric.Path.fromElement(el, function (obj) {
      expect(obj.path[0]).toEqual(["M", 100, 100])
      expect(obj.path[1]).toEqual(["L", 200, 200])
      expect(obj.path[2]).toEqual(["L", 150, 50])
      expect(obj.path[3]).toEqual(["M", 450, 350])
      expect(obj.path[4]).toEqual(["L", 850, 300])
      expect(obj.path[5]).toEqual(["L", 900, 400])
      done()
    })
  })

  test("multiple M/m commands converted all as M commands", function (
    assert
  ) {
    var done = assert.async()
    var el = getPathElement(
      "M100 100 M 200 200 M150 50 m 300 300 m 400 -50 m 50 100"
    )
    fabric.Path.fromElement(el, function (obj) {
      expect(obj.path[0]).toEqual(["M", 100, 100])
      expect(obj.path[1]).toEqual(["M", 200, 200])
      expect(obj.path[2]).toEqual(["M", 150, 50])
      expect(obj.path[3]).toEqual(["M", 450, 350])
      expect(obj.path[4]).toEqual(["M", 850, 300])
      expect(obj.path[5]).toEqual(["M", 900, 400])
      done()
    })
  })

  test("compressed path commands", function (assert) {
    var done = assert.async()
    var el = getPathElement(
      "M56.224 84.12C-.047.132-.138.221-.322.215.046-.131.137-.221.322-.215z"
    )
    fabric.Path.fromElement(el, function (obj) {
      expect(obj.path[0]).toEqual(["M", 56.224, 84.12])
      expect(obj.path[1]).toEqual([
        "C",
        -0.047,
        0.132,
        -0.138,
        0.221,
        -0.322,
        0.215
      ])
      expect(obj.path[2]).toEqual([
        "C",
        0.046,
        -0.131,
        0.137,
        -0.221,
        0.322,
        -0.215
      ])
      expect(obj.path[3]).toEqual(["z"])
      done()
    })
  })

  test("compressed path commands with e^x", function (assert) {
    var done = assert.async()
    var el = getPathElement(
      "M56.224e2 84.12E-2C-.047.132-.138.221-.322.215.046-.131.137-.221.322-.215m-.050 -20.100z"
    )
    fabric.Path.fromElement(el, function (obj) {
      expect(obj.path[0]).toEqual(["M", 5622.4, 0.8412])
      expect(obj.path[1]).toEqual([
        "C",
        -0.047,
        0.132,
        -0.138,
        0.221,
        -0.322,
        0.215
      ])
      expect(obj.path[2]).toEqual([
        "C",
        0.046,
        -0.131,
        0.137,
        -0.221,
        0.322,
        -0.215
      ])
      expect(obj.path[3]).toEqual(["M", 0.272, -20.315])
      expect(obj.path[4]).toEqual(["z"])
      done()
    })
  })
})()
