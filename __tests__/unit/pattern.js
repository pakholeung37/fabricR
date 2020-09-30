var IMG_SRC = fabric.isLikelyNode
  ? "file://" + __dirname + "/../fixtures/greyfloral.png"
  : "../fixtures/greyfloral.png"

function setSrc(img, src, callback) {
  img.onload = callback
  img.src = src
}

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

describe("fabric.Pattern", () => {
  test("constructor", function () {
    expect(fabric.Pattern).toBeTruthy()
    var pattern = createPattern()
    expect(pattern instanceof fabric.Pattern).toBeTruthy()
  })

  test("constructor with source string and with callback", function (done) {
    function callback(pattern) {
      expect(pattern.source.complete).toBe(true)
      done()
    }
    new fabric.Pattern(
      {
        source: IMG_SRC
      },
      callback
    )
  })

  test("properties", function () {
    var pattern = createPattern()
    expect(pattern.source).toBe(img)
    expect(pattern.repeat).toBe("repeat")
    expect(pattern.offsetX).toBe(0)
    expect(pattern.offsetY).toBe(0)
    expect(pattern.crossOrigin).toBe("")
  })

  test("toObject", function () {
    var pattern = createPattern()

    expect(typeof pattern.toObject === "function").toBeTruthy()

    var object = pattern.toObject()

    expect(object.source.indexOf("fixtures/greyfloral.png") > -1).toBeTruthy()
    expect(object.repeat).toBe("repeat")
    expect(object.offsetX).toBe(0)
    expect(object.offsetY).toBe(0)
    expect(object.patternTransform).toBe(null)
  })

  test("toObject with custom props", function () {
    var pattern = createPattern()
    pattern.patternTransform = [1, 0, 0, 2, 0, 0]
    pattern.id = "myId"
    var object = pattern.toObject(["id"])
    expect(object.id).toBe("myId")
    expect(object.patternTransform).toEqual(pattern.patternTransform)
  })

  test("toObject with custom props", function () {
    var pattern = createPattern()
    pattern.patternTransform = [1, 0, 0, 2, 0, 0]
    pattern.id = "myId"
    var object = pattern.toObject(["id"])
    expect(object.id).toBe("myId")
    expect(object.patternTransform).toEqual(pattern.patternTransform)
  })

  test("toObject with crossOrigin", function () {
    var pattern = new fabric.Pattern({
      source: IMG_SRC,
      crossOrigin: "anonymous"
    })
    var object = pattern.toObject()
    expect(object.crossOrigin).toBe("anonymous")
  })

  test("fromObject with crossOrigin", function () {
    var pattern = new fabric.Pattern({
      source: IMG_SRC,
      crossOrigin: "anonymous"
    })

    var object = pattern.toObject()
    var pattern2 = new fabric.Pattern(object)
    expect(pattern2.crossOrigin).toBe("anonymous")
  })

  test("toLive", function () {
    var pattern = createPattern()
    var canvas = new fabric.StaticCanvas(null, { enableRetinaScaling: false })
    var patternHTML = canvas.contextContainer.createPattern(img, "repeat")
    expect(typeof pattern.toLive === "function").toBeTruthy()

    var created = pattern.toLive(canvas.contextContainer)
    expect(created.toString()).toBe(patternHTML.toString())
  })

  test("pattern serialization / deserialization (image source)", function () {
    var pattern = createPattern()
    var obj = pattern.toObject()

    // node-canvas doesn't give <img> "src"
    var patternDeserialized = new fabric.Pattern(obj)
    expect(typeof patternDeserialized.source).toBe("object")
    expect(patternDeserialized.repeat).toBe("repeat")
  })

  test("toSVG", function () {
    fabric.Object.__uid = 0
    var pattern = createPattern()
    var rect = new fabric.Rect({ width: 500, height: 500 })
    var expectedSVG =
      '<pattern id="SVGID_0" x="0" y="0" width="0.3" height="0.248">\n<image x="0" y="0" width="150" height="124" xlink:href="' +
      img.src +
      '"></image>\n</pattern>\n'
    expect(typeof pattern.toSVG === "function").toBeTruthy()
    expect(pattern.toSVG(rect)).toBe(expectedSVG)
  })

  test("toSVG repeat-y", function () {
    fabric.Object.__uid = 0
    var pattern = createPattern()
    pattern.repeat = "repeat-y"
    var rect = new fabric.Rect({ width: 500, height: 500 })
    var expectedSVG =
      '<pattern id="SVGID_0" x="0" y="0" width="1" height="0.248">\n<image x="0" y="0" width="150" height="124" xlink:href="' +
      img.src +
      '"></image>\n</pattern>\n'
    expect(typeof pattern.toSVG === "function").toBeTruthy()
    expect(pattern.toSVG(rect)).toBe(expectedSVG)
  })

  test("toSVG repeat-x", function () {
    fabric.Object.__uid = 0
    var pattern = createPattern()
    pattern.repeat = "repeat-x"
    var rect = new fabric.Rect({ width: 500, height: 500 })
    var expectedSVG =
      '<pattern id="SVGID_0" x="0" y="0" width="0.3" height="1">\n<image x="0" y="0" width="150" height="124" xlink:href="' +
      img.src +
      '"></image>\n</pattern>\n'
    expect(typeof pattern.toSVG === "function").toBeTruthy()
    expect(pattern.toSVG(rect)).toBe(expectedSVG)
  })

  test("toSVG no-repeat", function () {
    fabric.Object.__uid = 0
    var pattern = createPattern()
    pattern.repeat = "no-repeat"
    var rect = new fabric.Rect({ width: 500, height: 500 })
    var expectedSVG =
      '<pattern id="SVGID_0" x="0" y="0" width="1" height="1">\n<image x="0" y="0" width="150" height="124" xlink:href="' +
      img.src +
      '"></image>\n</pattern>\n'
    expect(typeof pattern.toSVG === "function").toBeTruthy()
    expect(pattern.toSVG(rect)).toBe(expectedSVG)
  })

  test("toSVG no-repeat offsetX and offsetY", function () {
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
    expect(pattern.toSVG(rect)).toBe(expectedSVG)
  })

  test("initPattern from object", function () {
    var fillObj = {
      type: "pattern",
      source:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=="
    }
    var obj = new fabric.Object({ fill: fillObj })
    expect(obj.fill instanceof fabric.Pattern).toBeTruthy()
  })
})
