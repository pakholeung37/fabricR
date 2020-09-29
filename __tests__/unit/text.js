;(function () {
  describe("fabric.Text")

  function createTextObject(text) {
    return new fabric.Text(text || "x")
  }

  var CHAR_WIDTH = 20

  var REFERENCE_TEXT_OBJECT = {
    version: fabric.version,
    type: "text",
    originX: "left",
    originY: "top",
    left: 0,
    top: 0,
    width: CHAR_WIDTH,
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
    backgroundColor: "",
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
    textBackgroundColor: "",
    fillRule: "nonzero",
    paintFirst: "fill",
    globalCompositeOperation: "source-over",
    skewX: 0,
    skewY: 0,
    charSpacing: 0,
    styles: {}
  }

  test("constructor", function (assert) {
    expect(fabric.Text).toBeTruthy()
    var text = createTextObject()

    expect(text).toBeTruthy()
    expect(text instanceof fabric.Text).toBeTruthy()
    expect(text instanceof fabric.Object).toBeTruthy()

    expect(text.get("type")).toEqual("text")
    expect(text.get("text")).toEqual("x")
  })

  test("toString", function (assert) {
    var text = createTextObject()
    expect(typeof text.toString === "function").toBeTruthy()
    expect(text.toString()).toEqual('#<fabric.Text (1): { "text": "x", "fontFamily": "Times New Roman" }>')
  })

  test("_getFontDeclaration", function (assert) {
    var text = createTextObject()
    expect(typeof text._getFontDeclaration === "function").toBeTruthy()
    var fontDecl = text._getFontDeclaration()
    expect(typeof fontDecl === "string").toBeTruthy()
    expect(fontDecl).toEqual('normal normal 40px "Times New Roman"')
    text.fontFamily = '"Times New Roman"'
    fontDecl = text._getFontDeclaration()
    expect(fontDecl).toEqual('normal normal 40px "Times New Roman"')
    text.fontFamily = "'Times New Roman'"
    fontDecl = text._getFontDeclaration()
    expect(fontDecl).toEqual("normal normal 40px 'Times New Roman'")
  })

  test("_getFontDeclaration with coma", function (assert) {
    var text = createTextObject()
    text.fontFamily = "Arial, sans-serif"
    var fontDecl = text._getFontDeclaration()
    expect(fontDecl).toEqual("normal normal 40px Arial, sans-serif")
  })

  fabric.Text.genericFonts.forEach(function (fontName) {
    test("_getFontDeclaration with genericFonts", function (assert) {
      var text = createTextObject()
      text.fontFamily = fontName
      var fontDecl = text._getFontDeclaration()
      expect(fontDecl).toEqual("normal normal 40px " + fontName)
      text.fontFamily = fontName.toUpperCase()
      var fontDecl = text._getFontDeclaration()
      expect(fontDecl).toEqual("normal normal 40px " + fontName.toUpperCase())
    })
  })

  test("toObject", function (assert) {
    var text = createTextObject()
    expect(typeof text.toObject === "function").toBeTruthy()
    expect(text.toObject()).toEqual(REFERENCE_TEXT_OBJECT)
  })

  test("complexity", function (assert) {
    var text = createTextObject()
    expect(typeof text.complexity === "function").toBeTruthy()
    expect(text.complexity()).toEqual(1)
  })

  test("set", function (assert) {
    var text = createTextObject()
    expect(typeof text.set === "function").toBeTruthy()
    expect(text.set("text", "bar")).toEqual(text)

    text.set({ left: 1234, top: 2345, angle: 55 })

    expect(text.get("left")).toEqual(1234)
    expect(text.get("top")).toEqual(2345)
    expect(text.get("angle")).toEqual(55)
  })

  test("lineHeight with single line", function (assert) {
    var text = createTextObject()
    text.text = "text with one line"
    text.lineHeight = 2
    text.initDimensions()
    var height = text.height
    text.lineHeight = 0.5
    text.initDimensions()
    var heightNew = text.height
    expect(height).toEqual(heightNew)
  })

  test("lineHeight with multi line", function (assert) {
    var text = createTextObject()
    text.text = "text with\ntwo lines"
    text.lineHeight = 0.1
    text.initDimensions()
    var height = text.height,
      minimumHeight = text.fontSize * text._fontSizeMult
    expect(height > minimumHeight).toEqual(true)
  })

  test('set with "hash"', function (assert) {
    var text = createTextObject()

    text.set({ opacity: 0.123, fill: "red", fontFamily: "blah" })

    expect(text.opacity).toEqual(0.123)
    expect(text.fill).toEqual("red")
    expect(text.fontFamily).toEqual("blah")
  })

  test("get bounding rect after init", function (assert) {
    var string =
      "Some long text, the quick brown fox jumps over the lazy dog etc... blah blah blah"
    var text = new fabric.Text(string, {
      left: 30,
      top: 30,
      fill: "#ffffff",
      fontSize: 24,
      fontWeight: "normal",
      fontFamily: "Arial",
      originY: "bottom"
    })
    var br = text.getBoundingRect()
    text.setCoords()
    var br2 = text.getBoundingRect()
    expect(br).toEqual(br2)
  })

  test("fabric.Text.fromObject", function (assert) {
    var done = assert.async()
    expect(typeof fabric.Text.fromObject === "function").toBeTruthy()
    fabric.Text.fromObject(REFERENCE_TEXT_OBJECT, function (text) {
      expect(text.toObject()).toEqual(REFERENCE_TEXT_OBJECT)
      done()
    })
  })

  test("fabric.Text.fromElement", function (assert) {
    expect(typeof fabric.Text.fromElement === "function").toBeTruthy()

    var elText = fabric.document.createElement("text")
    elText.textContent = "x"

    fabric.Text.fromElement(elText, function (text) {
      expect(text instanceof fabric.Text).toBeTruthy()
      var expectedObject = fabric.util.object.extend(
        fabric.util.object.clone(REFERENCE_TEXT_OBJECT),
        {
          left: 0,
          top: -14.05,
          width: 8,
          height: 18.08,
          fontSize: 16,
          originX: "left"
        }
      )
      expect(text.toObject()).toEqual(expectedObject)
    })
  })

  test("fabric.Text.fromElement with custom attributes", function (
    assert
  ) {
    var namespace = "http://www.w3.org/2000/svg"
    var elTextWithAttrs = fabric.document.createElementNS(namespace, "text")
    elTextWithAttrs.textContent = "x"

    elTextWithAttrs.setAttributeNS(namespace, "x", 10)
    elTextWithAttrs.setAttributeNS(namespace, "y", 20)
    elTextWithAttrs.setAttributeNS(namespace, "fill", "rgb(255,255,255)")
    elTextWithAttrs.setAttributeNS(namespace, "opacity", 0.45)
    elTextWithAttrs.setAttributeNS(namespace, "stroke", "blue")
    elTextWithAttrs.setAttributeNS(namespace, "stroke-width", 3)
    elTextWithAttrs.setAttributeNS(namespace, "stroke-dasharray", "5, 2")
    elTextWithAttrs.setAttributeNS(namespace, "stroke-linecap", "round")
    elTextWithAttrs.setAttributeNS(namespace, "stroke-linejoin", "bevil")
    elTextWithAttrs.setAttributeNS(namespace, "stroke-miterlimit", 5)
    elTextWithAttrs.setAttributeNS(namespace, "font-family", "Monaco")
    elTextWithAttrs.setAttributeNS(namespace, "font-style", "italic")
    elTextWithAttrs.setAttributeNS(namespace, "font-weight", "bold")
    elTextWithAttrs.setAttributeNS(namespace, "font-size", "123")
    elTextWithAttrs.setAttributeNS(namespace, "letter-spacing", "1em")
    elTextWithAttrs.setAttributeNS(namespace, "text-decoration", "underline")
    elTextWithAttrs.setAttributeNS(namespace, "text-anchor", "middle")

    fabric.Text.fromElement(elTextWithAttrs, function (textWithAttrs) {
      // temp workaround for text objects not obtaining width under node
      textWithAttrs.width = CHAR_WIDTH

      expect(textWithAttrs instanceof fabric.Text).toBeTruthy()

      var expectedObject = fabric.util.object.extend(
        fabric.util.object.clone(REFERENCE_TEXT_OBJECT),
        {
          /* left varies slightly due to node-canvas rendering */
          left: fabric.util.toFixed(textWithAttrs.left + "", 2),
          top: -88.03,
          width: CHAR_WIDTH,
          height: 138.99,
          fill: "rgb(255,255,255)",
          opacity: 0.45,
          stroke: "blue",
          strokeWidth: 3,
          strokeDashArray: [5, 2],
          strokeLineCap: "round",
          strokeLineJoin: "bevil",
          strokeMiterLimit: 5,
          fontFamily: "Monaco",
          paintFirst: "fill",
          fontStyle: "italic",
          charSpacing: 1000,
          fontWeight: "bold",
          fontSize: 123,
          underline: true
        }
      )

      expect(textWithAttrs.toObject()).toEqual(expectedObject)
    })
  })

  test("empty fromElement", function (assert) {
    fabric.Text.fromElement(null, function (text) {
      expect(text).toEqual(null)
    })
  })

  test("dimensions after text change", function (assert) {
    var text = new fabric.Text("x")
    expect(text.width).toEqual(CHAR_WIDTH)

    text.set("text", "xx")
    expect(text.width).toEqual(CHAR_WIDTH * 2)
  })

  test("dimensions without text", function (assert) {
    var text = new fabric.Text("")
    expect(text.width).toEqual(2)
  })

  test("setting fontFamily", function (assert) {
    var text = new fabric.Text("x")
    text.path = "foobar.js"

    text.set("fontFamily", "foobar")
    expect(text.get("fontFamily")).toEqual("foobar")

    text.set("fontFamily", '"Arial Black", Arial')
    expect(text.get("fontFamily")).toEqual('"Arial Black", Arial')
  })

  test("text styleHas", function (assert) {
    var text = new fabric.Text("xxxxxx\nx y")
    text.styles = {}
    expect(typeof text.styleHas === "function").toBeTruthy()
    expect(text.styleHas("stroke")).toEqual(false)
    text.styles = { 1: { 0: { stroke: "red" } } }
    expect(text.styleHas("stroke")).toEqual(true)
  })

  test("text cleanStyle", function (assert) {
    var text = new fabric.Text("xxxxxx\nx y")
    text.styles = { 1: { 0: { stroke: "red" } } }
    text.stroke = "red"
    expect(typeof text.cleanStyle === "function").toBeTruthy()
    text.cleanStyle("stroke")
    expect(text.styles[1]).toEqual(undefined)
    text.styles = { 1: { 0: { stroke: "blue" } } }
    text.stroke = "red"
    text.cleanStyle("stroke")
    expect(text.styles[1][0].stroke).toEqual("blue")
  })

  test("text cleanStyle with different sub styles styles", function (
    assert
  ) {
    var text = new fabric.Text("xxxxxx\nx y")
    text.styles = {
      1: { 0: { fill: "red" }, 1: { stroke: "red" }, 2: { stroke: "blue" } }
    }
    text.stroke = "red"
    text.cleanStyle("stroke")
    expect(text.stroke).toEqual("red")
    expect(text.styles[1][0].fill).toEqual("red")
    expect(text.styles[1][0].stroke).toEqual(undefined)
    expect(text.styles[1][1]).toEqual(undefined)
    expect(text.styles[1][2].stroke).toEqual("blue")
  })

  test("text cleanStyle with undefined and set styles", function (
    assert
  ) {
    var text = new fabric.Text("xxxxxx\nx y")
    text.styles = { 1: { 1: { stroke: "red" }, 3: { stroke: "red" } } }
    text.stroke = "red"
    text.cleanStyle("stroke")
    expect(text.stroke).toEqual("red")
    expect(text.styles[1]).toEqual(undefined)
  })

  test("text cleanStyle with empty styles", function (assert) {
    var text = new fabric.Text("xxxxxx\nx y")
    text.styles = { 1: { 0: {}, 1: {} }, 2: {}, 3: { 4: {} } }
    text.cleanStyle("any")
    expect(text.styles[1]).toEqual(undefined)
    expect(text.styles[2]).toEqual(undefined)
    expect(text.styles[3]).toEqual(undefined)
  })

  test("text cleanStyle with full style", function (assert) {
    var text = new fabric.Text("xxx")
    text.styles = {
      0: { 0: { fill: "blue" }, 1: { fill: "blue" }, 2: { fill: "blue" } }
    }
    text.fill = "black"
    text.cleanStyle("fill")
    expect(text.fill).toEqual("blue")
    expect(text.styles[0]).toEqual(undefined)
  })

  test("text cleanStyle with no relevant style", function (assert) {
    var text = new fabric.Text("xxx")
    text.styles = {
      0: {
        0: { other: "value1" },
        1: { other: "value2" },
        2: { other: "value3" }
      }
    }
    text.fill = "black"
    text.cleanStyle("fill")
    expect(text.fill).toEqual("black")
    expect(text.styles[0][0].other).toEqual("value1")
    expect(text.styles[0][0].full).toEqual(undefined)
    expect(text.styles[0][1].other).toEqual("value2")
    expect(text.styles[0][1].full).toEqual(undefined)
    expect(text.styles[0][2].other).toEqual("value3")
    expect(text.styles[0][2].full).toEqual(undefined)
  })

  test("text removeStyle with some style", function (assert) {
    var text = new fabric.Text("xxx")
    text.styles = {
      0: {
        0: { stroke: "black", fill: "blue" },
        1: { fill: "blue" },
        2: { fill: "blue" }
      }
    }
    expect(typeof text.removeStyle === "function").toBeTruthy()
    text.fill = "red"
    text.removeStyle("fill")
    expect(text.fill).toEqual("red")
    expect(text.styles[0][0].stroke).toEqual("black")
    expect(text.styles[0][0].fill).toEqual(undefined)
    text.styles = {
      0: { 0: { fill: "blue" }, 1: { fill: "blue" }, 2: { fill: "blue" } }
    }
    text.removeStyle("fill")
    expect(text.styles[0]).toEqual(undefined)
  })

  test("getFontCache works with fontWeight numbers", function (assert) {
    var text = new fabric.Text("xxx", { fontWeight: 400 })
    text.initDimensions()
    var cache = fabric.charWidthsCache[text.fontFamily.toLowerCase()]
    var cacheProp = text.fontStyle + "_400"
    expect(cacheProp in cache).toEqual(true)
  })

  test("getFontCache is case insensitive", function (assert) {
    var text = new fabric.Text("xxx", {
      fontWeight: "BOld",
      fontStyle: "NormaL"
    })
    text.initDimensions()
    var text2 = new fabric.Text("xxx", {
      fontWeight: "bOLd",
      fontStyle: "nORMAl"
    })
    text2.initDimensions()
    var cache = text.getFontCache(text)
    var cache2 = text2.getFontCache(text2)
    expect(cache).toEqual(cache2)
  })
  // moved
  test("getSelectionStyles with no arguments", function (assert) {
    var iText = new fabric.Text("test foo bar-baz\nqux", {
      styles: {
        0: {
          0: { textDecoration: "underline" },
          2: { textDecoration: "overline" },
          4: { textBackgroundColor: "#ffc" }
        },
        1: {
          0: { fill: "red" },
          1: { fill: "green" },
          2: { fill: "blue" }
        }
      }
    })

    expect(typeof iText.getSelectionStyles).toEqual("function")

    expect(iText.getSelectionStyles()).toEqual([])
  })

  test("getSelectionStyles with 2 args", function (assert) {
    var iText = new fabric.Text("test foo bar-baz\nqux", {
      styles: {
        0: {
          0: { textDecoration: "underline" },
          2: { textDecoration: "overline" },
          4: { textBackgroundColor: "#ffc" }
        },
        1: {
          0: { fill: "red" },
          1: { fill: "green" },
          2: { fill: "blue" }
        }
      }
    })

    expect(iText.getSelectionStyles(0, 5)).toEqual([
      { textDecoration: "underline" },
      {},
      { textDecoration: "overline" },
      {},
      { textBackgroundColor: "#ffc" }
    ])

    expect(iText.getSelectionStyles(2, 2)).toEqual([])
  })

  test("setSelectionStyles", function (assert) {
    var iText = new fabric.Text("test foo bar-baz\nqux", {
      styles: {
        0: {
          0: { fill: "#112233" },
          2: { stroke: "#223344" }
        }
      }
    })

    expect(typeof iText.setSelectionStyles).toEqual("function")

    iText.setSelectionStyles({
      fill: "red",
      stroke: "yellow"
    })

    expect(iText.styles[0][0]).toEqual({
      fill: "#112233"
    })

    iText.setSelectionStyles(
      {
        fill: "red",
        stroke: "yellow"
      },
      0,
      1
    )

    expect(iText.styles[0][0]).toEqual({
      fill: "red",
      stroke: "yellow"
    })

    iText.setSelectionStyles(
      {
        fill: "#998877",
        stroke: "yellow"
      },
      2,
      3
    )

    expect(iText.styles[0][2]).toEqual({
      fill: "#998877",
      stroke: "yellow"
    })
  })

  test("getStyleAtPosition", function (assert) {
    var iText = new fabric.Text("test foo bar-baz\nqux", {
      styles: {
        0: {
          0: { textDecoration: "underline" },
          2: { textDecoration: "overline" },
          4: { textBackgroundColor: "#ffc" }
        },
        1: {
          0: { fill: "red" },
          1: { fill: "green" },
          2: { fill: "blue" }
        }
      }
    })

    expect(typeof iText.getStyleAtPosition).toEqual("function")

    expect(iText.getStyleAtPosition(2)).toEqual({
      textDecoration: "overline"
    })

    expect(iText.getStyleAtPosition(1)).toEqual({})

    expect(iText.getStyleAtPosition(18)).toEqual({ fill: "green" })
  })

  test("_splitText", function (assert) {
    var text = new fabric.Text("test foo bar-baz\nqux", {})
    var test = text._splitText()
    expect(test.lines[0]).toEqual("test foo bar-baz")
    expect(test.lines[1]).toEqual("qux")
    expect(test.graphemeLines[0]).toEqual([
      "t",
      "e",
      "s",
      "t",
      " ",
      "f",
      "o",
      "o",
      " ",
      "b",
      "a",
      "r",
      "-",
      "b",
      "a",
      "z"
    ])
    expect(test.graphemeLines[1]).toEqual(["q", "u", "x"])
  })

  test("getStyleAtPosition complete", function (assert) {
    var iText = new fabric.Text("test foo bar-baz\nqux", {
      styles: {
        0: {
          0: { underline: true },
          2: { overline: true },
          4: { textBackgroundColor: "#ffc" }
        },
        1: {
          0: { fill: "red" },
          1: { fill: "green" },
          2: { fill: "blue" }
        }
      }
    })

    var expectedStyle0 = {
      stroke: null,
      strokeWidth: 1,
      fill: "rgb(0,0,0)",
      fontFamily: "Times New Roman",
      fontSize: 40,
      fontWeight: "normal",
      fontStyle: "normal",
      underline: true,
      overline: false,
      linethrough: false,
      textBackgroundColor: "",
      deltaY: 0
    }

    var expectedStyle2 = {
      stroke: null,
      strokeWidth: 1,
      fill: "rgb(0,0,0)",
      fontFamily: "Times New Roman",
      fontSize: 40,
      fontWeight: "normal",
      fontStyle: "normal",
      underline: false,
      overline: true,
      linethrough: false,
      textBackgroundColor: "",
      deltaY: 0
    }

    expect(typeof iText.getStyleAtPosition).toEqual("function")

    expect(iText.getStyleAtPosition(0, true)).toEqual(expectedStyle0)

    expect(iText.getStyleAtPosition(2, true)).toEqual(expectedStyle2)
  })

  test("toSVG with NUM_FRACTION_DIGITS", function (assert) {
    var iText = new fabric.IText("test foo bar-baz", {
      // makes weird numbers
      styles: {
        0: {
          0: {
            fill: "red"
          },
          1: {
            fill: "blue"
          },
          2: {
            fill: "green"
          },
          3: {
            fill: "yellow"
          },
          4: {
            fill: "pink"
          }
        }
      }
    })
    fabric.Object.NUM_FRACTION_DIGITS = 1
    var SVG_1 = iText.toSVG()
    // var SVG_1_EXPECTED = '\t<g transform="translate(124.5 23.1)">\n\t\t<text xml:space="preserve" font-family="Times New Roman" font-size="40" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-124" y="12.6" style="fill: rgb(255,0,0); ">t</tspan><tspan x="-112.9" y="12.6" style="fill: rgb(0,0,255); ">e</tspan><tspan x="-95.1" y="12.6" style="fill: rgb(0,128,0); ">s</tspan><tspan x="-79.6" y="12.6" style="fill: rgb(255,255,0); ">t</tspan><tspan x="-68.4" y="12.6" style="fill: rgb(255,192,203); white-space: pre; "> </tspan><tspan x="-58.4" y="12.6" >foo bar-baz</tspan></text>\n\t</g>\n';
    //assert.equal(SVG_1, SVG_1_EXPECTED, 'numbers have max 1 decimal');
    fabric.Object.NUM_FRACTION_DIGITS = 3
    var SVG_2 = iText.toSVG()
    // var SVG_2_EXPECTED = '\t<g transform="translate(124.484 23.1)">\n\t\t<text xml:space="preserve" font-family="Times New Roman" font-size="40" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-123.984" y="12.566" style="fill: rgb(255,0,0); ">t</tspan><tspan x="-112.871" y="12.566" style="fill: rgb(0,0,255); ">e</tspan><tspan x="-95.117" y="12.566" style="fill: rgb(0,128,0); ">s</tspan><tspan x="-79.551" y="12.566" style="fill: rgb(255,255,0); ">t</tspan><tspan x="-68.438" y="12.566" style="fill: rgb(255,192,203); white-space: pre; "> </tspan><tspan x="-58.438" y="12.566" >foo bar-baz</tspan></text>\n\t</g>\n';
    //assert.equal(SVG_2, SVG_2_EXPECTED, 'numbers have max 3 decimal');
    expect(SVG_2.length > SVG_1.length).toBeTruthy()
    // put back to 2 or break all tests
    fabric.Object.NUM_FRACTION_DIGITS = 2
  })

  test("getSvgSpanStyles produces correct output", function (assert) {
    var iText = new fabric.IText("test foo bar-baz")
    var styleObject = {
      fill: "red",
      strokeWidth: 30,
      fontFamily: "Verdana",
      fontSize: 25
    }
    var styleString = iText.getSvgSpanStyles(styleObject)
    var expected =
      "stroke-width: 30; font-family: 'Verdana'; font-size: 25px; fill: rgb(255,0,0); "
    expect(styleString).toEqual(expected)
  })
  test(
    "getSvgSpanStyles produces correct output with useWhiteSpace",
    function (assert) {
      var iText = new fabric.IText("test foo bar-baz")
      var styleObject = {
        fill: "red",
        strokeWidth: 30,
        fontFamily: "Verdana",
        fontSize: 25
      }
      var styleString = iText.getSvgSpanStyles(styleObject, true)
      var expected =
        "stroke-width: 30; font-family: 'Verdana'; font-size: 25px; fill: rgb(255,0,0); white-space: pre; "
      expect(styleString).toEqual(expected)
    }
  )
  test(
    "getSvgTextDecoration with overline true produces correct output",
    function (assert) {
      var iText = new fabric.IText("test foo bar-baz")
      var styleObject = {
        overline: true
      }
      var styleString = iText.getSvgTextDecoration(styleObject)
      var expected = "overline"
      expect(styleString).toEqual(expected)
    }
  )
  test(
    "getSvgTextDecoration with overline underline true produces correct output",
    function (assert) {
      var iText = new fabric.IText("test foo bar-baz")
      var styleObject = {
        overline: true,
        underline: true
      }
      var styleString = iText.getSvgTextDecoration(styleObject)
      var expected = "overline underline"
      expect(styleString).toEqual(expected)
    }
  )
  test(
    "getSvgTextDecoration with overline underline true produces correct output",
    function (assert) {
      var iText = new fabric.IText("test foo bar-baz")
      var styleObject = {
        overline: true,
        underline: true,
        linethrough: true
      }
      var styleString = iText.getSvgTextDecoration(styleObject)
      var expected = "overline underline line-through"
      expect(styleString).toEqual(expected)
    }
  )

  test(
    "getSvgTextDecoration with overline underline true produces correct output",
    function (assert) {
      var iText = new fabric.IText("test foo bar-baz")
      var styleObject = {
        overline: true,
        underline: true,
        linethrough: true
      }
      var styleString = iText.getSvgTextDecoration(styleObject)
      var expected = "overline underline line-through"
      expect(styleString).toEqual(expected)
    }
  )

  test("text superscript", function (assert) {
    var text = new fabric.Text("xxx", {
      styles: {
        0: {
          0: { stroke: "black", fill: "blue" },
          1: { fill: "blue" },
          2: { fontSize: 4, deltaY: 20 }
        }
      }
    })
    expect(typeof text.setSuperscript === "function").toBeTruthy()

    var size = text.fontSize
    var schema = text.superscript
    var styleFontSize = text.styles[0][2].fontSize
    var styleDeltaY = text.styles[0][2].deltaY
    text.setSuperscript(1, 2).setSuperscript(2, 3)

    expect(text.styles[0][0].fontSize).toEqual(undefined)
    expect(text.styles[0][0].deltaY).toEqual(undefined)

    expect(text.styles[0][1].fontSize).toEqual(size * schema.size)
    expect(text.styles[0][1].deltaY).toEqual(size * schema.baseline)

    expect(text.styles[0][2].fontSize).toEqual(styleFontSize * schema.size)
    expect(text.styles[0][2].deltaY).toEqual(styleDeltaY + styleFontSize * schema.baseline)
  })

  test("text subscript", function (assert) {
    var text = new fabric.Text("xxx", {
      styles: {
        0: {
          0: { stroke: "black", fill: "blue" },
          1: { fill: "blue" },
          2: { fontSize: 4, deltaY: 20 }
        }
      }
    })
    expect(typeof text.setSubscript === "function").toBeTruthy()

    var size = text.fontSize
    var schema = text.subscript
    var styleFontSize = text.styles[0][2].fontSize
    var styleDeltaY = text.styles[0][2].deltaY
    text.setSubscript(1, 2).setSubscript(2, 3)

    expect(text.styles[0][0].fontSize).toEqual(undefined)
    expect(text.styles[0][0].deltaY).toEqual(undefined)

    expect(text.styles[0][1].fontSize).toEqual(size * schema.size)
    expect(text.styles[0][1].deltaY).toEqual(size * schema.baseline)

    expect(text.styles[0][2].fontSize).toEqual(styleFontSize * schema.size)
    expect(text.styles[0][2].deltaY).toEqual(styleDeltaY + styleFontSize * schema.baseline)
  })

  test("getHeightOfLine measures height of aline", function (assert) {
    var text = new fabric.Text("xxx\n")
    var height1 = text.getHeightOfLine(0)
    var height2 = text.getHeightOfLine(1)
    expect(Math.round(height1)).toEqual(52)
    expect(Math.round(height2)).toEqual(52)
    expect(height1).toEqual(height2)
  })

  test("_measureChar handles 0 width chars", function (assert) {
    fabric.charWidthsCache = {}
    var zwc = "\u200b"
    var text = new fabric.Text("")
    var style = text.getCompleteStyleDeclaration(0, 0)
    var box = text._measureChar("a", style, zwc, style)
    var box2 = text._measureChar("a", style, zwc, style)
    expect(fabric.charWidthsCache[text.fontFamily.toLowerCase()].normal_normal[zwc]).toEqual(0)
    expect(box.kernedWidth).toEqual(box2.kernedWidth)
  })

  test("_deleteStyleDeclaration", function (assert) {
    var text = new fabric.Text("aaa aaq ggg gg oee eee", {
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
    text._deleteStyleDeclaration(0, 10)
    expect(text.styles[0][10]).toEqual(undefined)
  })

  test("_setStyleDeclaration", function (assert) {
    var text = new fabric.Text("aaa aaq ggg gg oee eee", {
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
    expect(typeof text._setStyleDeclaration).toEqual("function")
    var newStyle = { fontSize: 10 }
    text._setStyleDeclaration(0, 10, newStyle)
    expect(text.styles[0][10]).toEqual(newStyle)
  })

  test("styleHas", function (assert) {
    var textbox = new fabric.Textbox("aaa\naaq ggg gg oee eee", {
      styles: {
        0: {
          0: { fontSize: 4 },
          1: { fontSize: 4 },
          2: { fontSize: 4 }
        },
        1: {
          0: { fontFamily: "Arial" },
          1: { fontFamily: "Arial" },
          2: { fontFamily: "Arial" }
        }
      },
      width: 5
    })
    expect(textbox.styleHas("fontSize")).toEqual(true)
    expect(textbox.styleHas("fontSize", 0)).toEqual(true)
    expect(textbox.styleHas("fontSize", 1)).toEqual(false)
    expect(textbox.styleHas("fontFamily")).toEqual(true)
    expect(textbox.styleHas("fontFamily", 0)).toEqual(false)
    expect(textbox.styleHas("fontFamily", 1)).toEqual(true)
  })
})()
