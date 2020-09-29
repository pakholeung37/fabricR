;(function () {
  var canvas = (this.canvas = new fabric.Canvas())
  describe("fabric.Textbox", {
    afterEach: function () {
      canvas.clear()
    }
  })

  var TEXTBOX_OBJECT = {
    version: fabric.version,
    type: "textbox",
    originX: "left",
    originY: "top",
    left: 0,
    top: 0,
    width: 20,
    height: 45.2,
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
    text: "x",
    fontSize: 40,
    fontWeight: "normal",
    fontFamily: "Times New Roman",
    fontStyle: "normal",
    lineHeight: 1.16,
    underline: false,
    overline: false,
    linethrough: false,
    textAlign: "left",
    backgroundColor: "",
    textBackgroundColor: "",
    fillRule: "nonzero",
    paintFirst: "fill",
    globalCompositeOperation: "source-over",
    skewX: 0,
    skewY: 0,
    charSpacing: 0,
    styles: {},
    minWidth: 20,
    splitByGrapheme: false
  }

  test("constructor", function (assert) {
    var textbox = new fabric.Textbox("test")
    expect(textbox instanceof fabric.Textbox).toBeTruthy()
    expect(textbox instanceof fabric.IText).toBeTruthy()
    expect(textbox instanceof fabric.Text).toBeTruthy()
  })

  test("constructor with width", function (assert) {
    var textbox = new fabric.Textbox("test", { width: 400 })
    expect(textbox.width).toEqual(400)
  })

  test("constructor with width too small", function (assert) {
    var textbox = new fabric.Textbox("test", { width: 5 })
    expect(Math.round(textbox.width)).toEqual(56)
  })

  test("initial properties", function (assert) {
    var textbox = new fabric.Textbox("test")
    expect(textbox.text).toEqual("test")
    expect(textbox.type).toEqual("textbox")
    expect(textbox.styles).toEqual({})
    expect(textbox.cacheProperties.indexOf("width") > -1).toBeTruthy()
  })

  test("toObject", function (assert) {
    var textbox = new fabric.Textbox("x")
    var obj = textbox.toObject()
    expect(obj).toEqual(TEXTBOX_OBJECT)
  })

  test("fromObject", function (assert) {
    var done = assert.async()
    fabric.Textbox.fromObject(TEXTBOX_OBJECT, function (textbox) {
      expect(textbox.text).toEqual("x")
      expect(textbox instanceof fabric.Textbox).toBeTruthy()
      done()
    })
  })

  test("isEndOfWrapping", function (assert) {
    var textbox = new fabric.Textbox("a q o m s g\np q r s t w", {
      width: 70
    })
    expect(textbox.isEndOfWrapping(0)).toEqual(false)
    expect(textbox.isEndOfWrapping(1)).toEqual(false)
    expect(textbox.isEndOfWrapping(2)).toEqual(true)
    expect(textbox.isEndOfWrapping(3)).toEqual(false)
    expect(textbox.isEndOfWrapping(4)).toEqual(false)
    expect(textbox.isEndOfWrapping(5)).toEqual(true)
  })

  test("_removeExtraneousStyles", function (assert) {
    var textbox = new fabric.Textbox("a q o m s g\np q r s t w", {
      width: 40,
      styles: {
        0: { 0: { fontSize: 4 } },
        1: { 0: { fontSize: 4 } },
        2: { 0: { fontSize: 4 } },
        3: { 0: { fontSize: 4 } },
        4: { 0: { fontSize: 4 } },
        5: { 0: { fontSize: 4 } }
      }
    })
    expect(textbox.styles[3]).toEqual({ 0: { fontSize: 4 } })
    expect(textbox.styles[4]).toEqual({ 0: { fontSize: 4 } })
    expect(textbox.styles[5]).toEqual({ 0: { fontSize: 4 } })
    textbox._removeExtraneousStyles()
    expect(textbox.styles[2]).toEqual(undefined)
    expect(textbox.styles[3]).toEqual(undefined)
    expect(textbox.styles[4]).toEqual(undefined)
    expect(textbox.styles[5]).toEqual(undefined)
  })

  test("isEmptyStyles", function (assert) {
    var textbox = new fabric.Textbox("x x", {
      width: 5,
      styles: { 0: { 0: { fill: "red" } } }
    })
    expect(textbox._textLines.length).toEqual(2)
    expect(textbox._unwrappedTextLines.length).toEqual(1)
    expect(textbox.isEmptyStyles()).toEqual(false)
    expect(textbox.isEmptyStyles(0)).toEqual(false)
    expect(textbox.isEmptyStyles(1)).toEqual(true)
  })

  test("isEmptyStyles does not crash on null styles", function (assert) {
    var textbox = new fabric.Textbox("x x", { width: 5 })
    textbox.styles = null
    expect(textbox._textLines.length).toEqual(2)
    expect(textbox._unwrappedTextLines.length).toEqual(1)
    expect(textbox.isEmptyStyles(1)).toEqual(true)
  })

  test("isEmptyStyles alternate lines", function (assert) {
    var textbox = new fabric.Textbox("xa xb xc xd xe\nya yb", {
      width: 5,
      styles: {
        0: {
          0: { fill: "red" },
          1: { fill: "blue" },
          9: { fill: "red" },
          10: { fill: "blue" }
        },
        1: { 3: { fill: "red" }, 4: { fill: "blue" } }
      }
    })
    expect(textbox._textLines.length).toEqual(7)
    expect(textbox._unwrappedTextLines.length).toEqual(2)
    expect(textbox.isEmptyStyles()).toEqual(false)
    expect(textbox.isEmptyStyles(0)).toEqual(false)
    expect(textbox.isEmptyStyles(1)).toEqual(true)
    expect(textbox.isEmptyStyles(2)).toEqual(true)
    expect(textbox.isEmptyStyles(3)).toEqual(false)
    expect(textbox.isEmptyStyles(4)).toEqual(true)
    expect(textbox.isEmptyStyles(5)).toEqual(true)
    expect(textbox.isEmptyStyles(6)).toEqual(false)
  })
  test("wrapping with charspacing", function (assert) {
    var textbox = new fabric.Textbox("xa xb xc xd xe ya yb id", {
      width: 190
    })
    expect(textbox.textLines[0]).toEqual("xa xb xc xd")
    textbox.charSpacing = 100
    textbox.initDimensions()
    expect(textbox.textLines[0]).toEqual("xa xb xc")
    textbox.charSpacing = 300
    textbox.initDimensions()
    expect(textbox.textLines[0]).toEqual("xa xb")
    textbox.charSpacing = 800
    textbox.initDimensions()
    expect(textbox.textLines[0]).toEqual("xa")
  })
  test(
    "wrapping with charspacing and splitByGrapheme positive",
    function (assert) {
      var textbox = new fabric.Textbox("xaxbxcxdeyaybid", {
        width: 190,
        splitByGrapheme: true,
        charSpacing: 400
      })
      expect(textbox.textLines).toEqual(["xaxbx", "cxdey", "aybid"])
    }
  )
  test(
    "wrapping with charspacing and splitByGrapheme negative",
    function (assert) {
      var textbox = new fabric.Textbox("xaxbxcxdeyaybid", {
        width: 190,
        splitByGrapheme: true,
        charSpacing: -100
      })
      expect(textbox.textLines).toEqual(["xaxbxcxdeyay", "bid"])
    }
  )
  test("wrapping with different things", function (assert) {
    var textbox = new fabric.Textbox("xa xb\txc\rxd xe ya yb id", {
      width: 16
    })
    expect(textbox.textLines[0]).toEqual("xa")
    expect(textbox.textLines[1]).toEqual("xb")
    expect(textbox.textLines[2]).toEqual("xc")
    expect(textbox.textLines[3]).toEqual("xd")
    expect(textbox.textLines[4]).toEqual("xe")
    expect(textbox.textLines[5]).toEqual("ya")
    expect(textbox.textLines[6]).toEqual("yb")
  })
  test("wrapping with splitByGrapheme", function (assert) {
    var textbox = new fabric.Textbox("xaxbxcxdxeyaybid", {
      width: 1,
      splitByGrapheme: true
    })
    expect(textbox.textLines[0]).toEqual("x")
    expect(textbox.textLines[1]).toEqual("a")
    expect(textbox.textLines[2]).toEqual("x")
    expect(textbox.textLines[3]).toEqual("b")
    expect(textbox.textLines[4]).toEqual("x")
    expect(textbox.textLines[5]).toEqual("c")
  })
  test("wrapping with custom space", function (assert) {
    var textbox = new fabric.Textbox("xa xb xc xd xe ya yb id", {
      width: 2000
    })
    var line1 = textbox._wrapLine("xa xb xc xd xe ya yb id", 0, 100, 0)
    var expected1 = [
      ["x", "a", " ", "x", "b"],
      ["x", "c", " ", "x", "d"],
      ["x", "e", " ", "y", "a"],
      ["y", "b", " ", "i", "d"]
    ]
    expect(line1).toEqual(expected1)
    expect(textbox.dynamicMinWidth).toEqual(40)
    var line2 = textbox._wrapLine("xa xb xc xd xe ya yb id", 0, 100, 50)
    var expected2 = [
      ["x", "a"],
      ["x", "b"],
      ["x", "c"],
      ["x", "d"],
      ["x", "e"],
      ["y", "a"],
      ["y", "b"],
      ["i", "d"]
    ]
    expect(line2).toEqual(expected2)
    expect(textbox.dynamicMinWidth).toEqual(90)
  })
  test("wrapping an empty line", function (assert) {
    var textbox = new fabric.Textbox("", {
      width: 10
    })
    var line1 = textbox._wrapLine("", 0, 100, 0)
    expect(line1).toEqual([[]])
    textbox.splitByGrapheme = true
    var line2 = textbox._wrapLine("", 0, 100, 0)
    expect(line2).toEqual([[]])
  })
  test("texbox will change width from the mr corner", function (assert) {
    var text = new fabric.Textbox("xa xb xc xd xe ya yb id", { strokeWidth: 0 })
    canvas.add(text)
    canvas.setActiveObject(text)
    var canvasEl = canvas.getElement(),
      canvasOffset = fabric.util.getElementOffset(canvasEl)
    var eventStub = {
      clientX: canvasOffset.left + text.width,
      clientY: canvasOffset.top + text.oCoords.mr.corner.tl.y + 1,
      type: "mousedown"
    }
    var originalWidth = text.width
    canvas.__onMouseDown(eventStub)
    canvas.__onMouseMove({
      clientX: eventStub.clientX + 20,
      clientY: eventStub.clientY,
      type: "mousemove"
    })
    canvas.__onMouseUp({
      clientX: eventStub.clientX + 20,
      clientY: eventStub.clientY,
      type: "mouseup"
    })
    expect(text.width).toEqual(originalWidth + 20)
  })
  test("texbox will change width from the ml corner", function (assert) {
    var text = new fabric.Textbox("xa xb xc xd xe ya yb id", {
      strokeWidth: 0,
      left: 40
    })
    canvas.add(text)
    canvas.setActiveObject(text)
    var canvasEl = canvas.getElement(),
      canvasOffset = fabric.util.getElementOffset(canvasEl)
    var eventStub = {
      clientX: canvasOffset.left + text.left,
      clientY: canvasOffset.top + text.oCoords.ml.corner.tl.y + 2,
      type: "mousedown"
    }
    var originalWidth = text.width
    canvas.__onMouseDown(eventStub)
    canvas.__onMouseMove({
      clientX: eventStub.clientX - 20,
      clientY: eventStub.clientY,
      type: "mousemove"
    })
    canvas.__onMouseUp({
      clientX: eventStub.clientX + 20,
      clientY: eventStub.clientY,
      type: "mouseup"
    })
    expect(text.width).toEqual(originalWidth + 20)
  })
  test("_removeExtraneousStyles", function (assert) {
    var iText = new fabric.Textbox("a\nqqo", {
      styles: {
        0: { 0: { fontSize: 4 } },
        1: { 0: { fontSize: 4 } },
        2: { 0: { fontSize: 4 } },
        3: { 0: { fontSize: 4 } },
        4: { 0: { fontSize: 4 } }
      }
    })
    expect(iText.styles[3]).toEqual({ 0: { fontSize: 4 } })
    expect(iText.styles[4]).toEqual({ 0: { fontSize: 4 } })
    iText._removeExtraneousStyles()
    expect(iText.styles[3]).toEqual(undefined)
    expect(iText.styles[4]).toEqual(undefined)
  })

  test("get2DCursorLocation with splitByGrapheme", function (assert) {
    var iText = new fabric.Textbox("aaaaaaaaaaaaaaaaaaaaaaaa", {
      width: 60,
      splitByGrapheme: true
    })
    var loc = iText.get2DCursorLocation()

    // [ [ '由', '石', '墨' ],
    //   [ '分', '裂', '的' ],
    //   [ '石', '墨', '分' ],
    //   [ '裂', '由', '石' ],
    //   [ '墨', '分', '裂' ],
    //   [ '由', '石', '墨' ],
    //   [ '分', '裂', '的' ],
    //   [ '石', '墨', '分' ],
    //   [ '裂' ] ]

    expect(loc.lineIndex).toEqual(0)
    expect(loc.charIndex).toEqual(0)

    // '由石墨|分裂的石墨分裂由石墨分裂由石墨分裂的石墨分裂'
    iText.selectionStart = iText.selectionEnd = 4
    loc = iText.get2DCursorLocation()

    expect(loc.lineIndex).toEqual(1)
    expect(loc.charIndex).toEqual(1)

    iText.selectionStart = iText.selectionEnd = 7
    loc = iText.get2DCursorLocation()

    expect(loc.lineIndex).toEqual(2)
    expect(loc.charIndex).toEqual(1)

    iText.selectionStart = iText.selectionEnd = 14
    loc = iText.get2DCursorLocation()

    expect(loc.lineIndex).toEqual(4)
    expect(loc.charIndex).toEqual(2)
  })

  test("missingNewlineOffset with splitByGrapheme", function (assert) {
    var textbox = new fabric.Textbox("aaa\naaaaaa\na\naaaaaaaaaaaa\naaa", {
      width: 80,
      splitByGrapheme: true
    })

    // [ [ 'a', 'a', 'a' ],
    //   [ 'a', 'a', 'a', 'a' ],
    //   [ 'a', 'a' ],
    //   [ 'a' ],
    //   [ 'a', 'a', 'a', 'a' ],
    //   [ 'a', 'a', 'a', 'a' ],
    //   [ 'a', 'a', 'a', 'a' ],
    //   [ 'a', 'a', 'a' ] ]

    var offset = textbox.missingNewlineOffset(0)
    expect(offset).toEqual(1)

    offset = textbox.missingNewlineOffset(1)
    expect(offset).toEqual(0)
  })

  test("missingNewlineOffset with normal split", function (assert) {
    var texbox = new fabric.Textbox("aaa\naaaaaa\na\naaaaaaaaaaaa\naaa", {
      width: 160
    })

    var offset = texbox.missingNewlineOffset(0)
    expect(offset).toEqual(1)
    var offset = texbox.missingNewlineOffset(1)
    expect(offset).toEqual(1)
    var offset = texbox.missingNewlineOffset(2)
    expect(offset).toEqual(1)
  })

  test("_getLineStyle", function (assert) {
    var textbox = new fabric.Textbox("aaa aaq ggg gg\noee eee", {
      styles: {
        1: { 0: { fontSize: 4 } }
      },
      width: 80
    })

    expect(textbox._getLineStyle(0)).toEqual(false)
    expect(textbox._getLineStyle(1)).toEqual(false)
    expect(textbox._getLineStyle(4)).toEqual(true)
  })

  test("_setLineStyle", function (assert) {
    var textbox = new fabric.Textbox("aaa aaq ggg gg\noee eee", {
      styles: {
        1: { 0: { fontSize: 4 } }
      },
      width: 80
    })

    expect(textbox._getLineStyle(0)).toEqual(false)
    expect(textbox._getLineStyle(1)).toEqual(false)
    expect(textbox._getLineStyle(2)).toEqual(false)
    expect(textbox._getLineStyle(3)).toEqual(false)

    expect(textbox.styles[0]).toEqual(undefined)
    textbox._setLineStyle(0)

    expect(textbox._getLineStyle(0)).toEqual(true)
    expect(textbox._getLineStyle(1)).toEqual(true)
    expect(textbox._getLineStyle(2)).toEqual(true)
    expect(textbox._getLineStyle(3)).toEqual(true)

    expect(textbox.styles[0]).toEqual({})
  })

  test("_deleteStyleDeclaration", function (assert) {
    var textbox = new fabric.Textbox("aaa aaq ggg gg oee eee", {
      styles: {
        0: {
          0: { fontSize: 4 },
          1: { fontSize: 4 },
          2: { fontSize: 4 },
          3: { fontSize: 4 },
          4: { fontSize: 4 },
          5: { fontSize: 4 },
          6: { fontSize: 4 },
          7: { fontSize: 4 },
          8: { fontSize: 4 },
          9: { fontSize: 4 },
          10: { fontSize: 4 },
          11: { fontSize: 4 },
          12: { fontSize: 4 },
          13: { fontSize: 4 },
          14: { fontSize: 4 },
          15: { fontSize: 4 },
          16: { fontSize: 4 }
        }
      },
      width: 5
    })
    textbox._deleteStyleDeclaration(2, 2)
    expect(textbox.styles[0][10]).toEqual(undefined)
  })

  test("_setStyleDeclaration", function (assert) {
    var textbox = new fabric.Textbox("aaa aaq ggg gg oee eee", {
      styles: {
        0: {
          0: { fontSize: 4 },
          1: { fontSize: 4 },
          2: { fontSize: 4 },
          3: { fontSize: 4 },
          4: { fontSize: 4 },
          5: { fontSize: 4 },
          6: { fontSize: 4 },
          7: { fontSize: 4 },
          8: { fontSize: 4 },
          9: { fontSize: 4 },
          10: { fontSize: 4 },
          11: { fontSize: 4 },
          12: { fontSize: 4 },
          13: { fontSize: 4 },
          14: { fontSize: 4 },
          15: { fontSize: 4 },
          16: { fontSize: 4 }
        }
      },
      width: 5
    })
    expect(typeof textbox._setStyleDeclaration).toEqual("function")
    var newStyle = { fontSize: 10 }
    textbox._setStyleDeclaration(2, 2, newStyle)
    expect(textbox.styles[0][10]).toEqual(newStyle)
  })

  test("styleHas", function (assert) {
    var textbox = new fabric.Textbox("aaa aaq ggg gg oee eee", {
      styles: {
        0: {
          0: { fontSize: 4 },
          1: { fontSize: 4 },
          2: { fontSize: 4 },
          4: { fontFamily: "Arial" },
          5: { fontFamily: "Arial" },
          6: { fontFamily: "Arial" }
        }
      },
      width: 5
    })
    expect(textbox.styleHas("fontSize")).toEqual(true)
    expect(textbox.styleHas("fontSize", 0)).toEqual(true)
    // assert.equal(textbox.styleHas('fontSize', 1), false, 'style does not have fontSize on line 1');
    expect(textbox.styleHas("fontFamily")).toEqual(true)
    // assert.equal(textbox.styleHas('fontFamily', 0), false, 'style does not have fontFamily on line 0');
    expect(textbox.styleHas("fontFamily", 1)).toEqual(true)
  })
})()
