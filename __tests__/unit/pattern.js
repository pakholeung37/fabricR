;(function () {
  var IMG_SRC = fabric.isLikelyNode
    ? "file://" + __dirname + "/../fixtures/greyfloral.png"
    : "../fixtures/greyfloral.png"

  function setSrc(img, src, callback) {
    img.onload = callback
    img.src = src
  }

  describe("fabric.Pattern")

  var img = fabric.document.createElement("img")
  setSrc(img, IMG_SRC)

  function createPattern(callback) {
    return new fabric.Pattern(
      {
        source: img
      },
      callback
    )
  }

  test("constructor", function (assert) {
    expect(fabric.Pattern).toBeTruthy()
    var pattern = createPattern()
    expect(pattern instanceof fabric.Pattern).toBeTruthy()
  })

  test("constructor with source string and with callback", function (
    assert
  ) {
    var done = assert.async()
    function callback(pattern) {
      expect(pattern.source.complete).toEqual(true)
      done()
    }
    new fabric.Pattern(
      {
        source: IMG_SRC
      },
      callback
    )
  })

  test("properties", function (assert) {
    var pattern = createPattern()
    expect(pattern.source).toEqual(img)
    expect(pattern.repeat).toEqual("repeat")
    expect(pattern.offsetX).toEqual(0)
    expect(pattern.offsetY).toEqual(0)
    expect(pattern.crossOrigin).toEqual("")
  })

  test("toObject", function (assert) {
    var pattern = createPattern()

    expect(typeof pattern.toObject === "function").toBeTruthy()

    var object = pattern.toObject()

    expect(object.source.indexOf("fixtures/greyfloral.png") > -1).toBeTruthy()
    expect(object.repeat).toEqual("repeat")
    expect(object.offsetX).toEqual(0)
    expect(object.offsetY).toEqual(0)
    expect(object.patternTransform).toEqual(null)
  })

  test("toObject with custom props", function (assert) {
    var pattern = createPattern()
    pattern.patternTransform = [1, 0, 0, 2, 0, 0]
    pattern.id = "myId"
    var object = pattern.toObject(["id"])
    expect(object.id).toEqual("myId")
    expect(object.patternTransform).toEqual(pattern.patternTransform)
  })

  test("toObject with custom props", function (assert) {
    var pattern = createPattern()
    pattern.patternTransform = [1, 0, 0, 2, 0, 0]
    pattern.id = "myId"
    var object = pattern.toObject(["id"])
    expect(object.id).toEqual("myId")
    expect(object.patternTransform).toEqual(pattern.patternTransform)
  })

  test("toObject with crossOrigin", function (assert) {
    var pattern = new fabric.Pattern({
      source: IMG_SRC,
      crossOrigin: "anonymous"
    })
    var object = pattern.toObject()
    expect(object.crossOrigin).toEqual("anonymous")
  })

  test("fromObject with crossOrigin", function (assert) {
    var pattern = new fabric.Pattern({
      source: IMG_SRC,
      crossOrigin: "anonymous"
    })

    var object = pattern.toObject()
    var pattern2 = new fabric.Pattern(object)
    expect(pattern2.crossOrigin).toEqual("anonymous")
  })

  test("toLive", function (assert) {
    var pattern = createPattern()
    var canvas = new fabric.StaticCanvas(null, { enableRetinaScaling: false })
    var patternHTML = canvas.contextContainer.createPattern(img, "repeat")
    expect(typeof pattern.toLive === "function").toBeTruthy()

    var created = pattern.toLive(canvas.contextContainer)
    expect(created.toString()).toEqual(patternHTML.toString())
  })

  test(
    "pattern serialization / deserialization (image source)",
    function (assert) {
      var pattern = createPattern()
      var obj = pattern.toObject()

      // node-canvas doesn't give <img> "src"
      var patternDeserialized = new fabric.Pattern(obj)
      expect(typeof patternDeserialized.source).toEqual("object")
      expect(patternDeserialized.repeat).toEqual("repeat")
    }
  )

  test("toSVG", function (assert) {
    fabric.Object.__uid = 0
    var pattern = createPattern()
    var rect = new fabric.Rect({ width: 500, height: 500 })
    var expectedSVG =
      '<pattern id="SVGID_0" x="0" y="0" width="0.3" height="0.248">\n<image x="0" y="0" width="150" height="124" xlink:href="' +
      img.src +
      '"></image>\n</pattern>\n'
    expect(typeof pattern.toSVG === "function").toBeTruthy()
    expect(pattern.toSVG(rect)).toEqual(expectedSVG)
  })

  test("toSVG repeat-y", function (assert) {
    fabric.Object.__uid = 0
    var pattern = createPattern()
    pattern.repeat = "repeat-y"
    var rect = new fabric.Rect({ width: 500, height: 500 })
    var expectedSVG =
      '<pattern id="SVGID_0" x="0" y="0" width="1" height="0.248">\n<image x="0" y="0" width="150" height="124" xlink:href="' +
      img.src +
      '"></image>\n</pattern>\n'
    expect(typeof pattern.toSVG === "function").toBeTruthy()
    expect(pattern.toSVG(rect)).toEqual(expectedSVG)
  })

  test("toSVG repeat-x", function (assert) {
    fabric.Object.__uid = 0
    var pattern = createPattern()
    pattern.repeat = "repeat-x"
    var rect = new fabric.Rect({ width: 500, height: 500 })
    var expectedSVG =
      '<pattern id="SVGID_0" x="0" y="0" width="0.3" height="1">\n<image x="0" y="0" width="150" height="124" xlink:href="' +
      img.src +
      '"></image>\n</pattern>\n'
    expect(typeof pattern.toSVG === "function").toBeTruthy()
    expect(pattern.toSVG(rect)).toEqual(expectedSVG)
  })

  test("toSVG no-repeat", function (assert) {
    fabric.Object.__uid = 0
    var pattern = createPattern()
    pattern.repeat = "no-repeat"
    var rect = new fabric.Rect({ width: 500, height: 500 })
    var expectedSVG =
      '<pattern id="SVGID_0" x="0" y="0" width="1" height="1">\n<image x="0" y="0" width="150" height="124" xlink:href="' +
      img.src +
      '"></image>\n</pattern>\n'
    expect(typeof pattern.toSVG === "function").toBeTruthy()
    expect(pattern.toSVG(rect)).toEqual(expectedSVG)
  })

  test("toSVG no-repeat offsetX and offsetY", function (assert) {
    fabric.Object.__uid = 0
    var pattern = createPattern()
    pattern.repeat = "no-repeat"
    pattern.offsetX = 50
    pattern.offsetY = -50
    var rect = new fabric.Rect({ width: 500, height: 500 })
    var expectedSVG =
      '<pattern id="SVGID_0" x="0.1" y="-0.1" width="1.1" height="1.1">\n<image x="0" y="0" width="150" height="124" xlink:href="' +
      img.src +
      '"></image>\n</pattern>\n'
    expect(typeof pattern.toSVG === "function").toBeTruthy()
    expect(pattern.toSVG(rect)).toEqual(expectedSVG)
  })

  test("initPattern from object", function (assert) {
    var fillObj = {
      type: "pattern",
      source:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=="
    }
    var obj = new fabric.Object({ fill: fillObj })
    expect(obj.fill instanceof fabric.Pattern).toBeTruthy()
  })
})()
