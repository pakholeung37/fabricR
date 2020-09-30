;(function () {
  var canvas = (this.canvas = new fabric.Canvas())

  var ITEXT_OBJECT = {
    version: fabric.version,
    type: "text",
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
    lineHeight: 1.3,
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
    styles: {}
  }

  describe("fabric.IText", function (hooks) {
    hooks.afterEach(function () {
      canvas.clear()
      canvas.cancelRequestedRender()
    })

    test("constructor", function (assert) {
      var iText = new fabric.IText("test")

      expect(iText instanceof fabric.IText).toBeTruthy()
      expect(iText instanceof fabric.Text).toBeTruthy()
    })

    test("initial properties", function (assert) {
      var iText = new fabric.IText("test")
      expect(iText instanceof fabric.IText).toBeTruthy()

      expect(iText.text).toEqual("test")
      expect(iText.type).toEqual("i-text")
      expect(iText.styles).toEqual({})
    })

    test("instances", function (assert) {
      var iText = new fabric.IText("test")

      // Not on a sketchpad; storing it in instances array already would leak it forever.
      var instances = canvas._iTextInstances && canvas._iTextInstances
      var lastInstance = instances && instances[instances.length - 1]
      expect(lastInstance).toEqual(undefined)

      canvas.add(iText)
      instances = canvas._iTextInstances && canvas._iTextInstances
      lastInstance = instances && instances[instances.length - 1]
      expect(lastInstance).toEqual(iText)

      canvas.remove(iText)
      instances = canvas._iTextInstances && canvas._iTextInstances
      lastInstance = instances && instances[instances.length - 1]
      expect(lastInstance).toEqual(undefined)

      // Should survive being added again after removal.
      canvas.add(iText)
      lastInstance =
        canvas._iTextInstances &&
        canvas._iTextInstances[canvas._iTextInstances.length - 1]
      expect(lastInstance).toEqual(iText)
    })

    test("fromObject", function (assert) {
      var done = assert.async()
      expect(typeof fabric.IText.fromObject === "function").toBeTruthy()
      fabric.IText.fromObject(ITEXT_OBJECT, function (iText) {
        expect(iText instanceof fabric.IText).toBeTruthy()
        expect(ITEXT_OBJECT).toEqual(iText.toObject())
        done()
      })
    })

    test("lineHeight with single line", function (assert) {
      var text = new fabric.IText("text with one line")
      text.lineHeight = 2
      text.initDimensions()
      var height = text.height
      text.lineHeight = 0.5
      text.initDimensions()
      var heightNew = text.height
      expect(height).toEqual(heightNew)
    })

    test("lineHeight with multi line", function (assert) {
      var text = new fabric.IText("text with\ntwo lines")
      text.lineHeight = 0.1
      text.initDimensions()
      var height = text.height,
        minimumHeight = text.fontSize * text._fontSizeMult
      expect(height > minimumHeight).toEqual(true)
    })

    test("toObject", function (assert) {
      var styles = {
        0: {
          0: { fill: "red" },
          1: { textDecoration: "underline" }
        }
      }
      var iText = new fabric.IText("test", {
        styles: styles
      })
      expect(typeof iText.toObject).toEqual("function")
      var obj = iText.toObject()
      expect(obj.styles).toEqual(styles)
      expect(obj.styles[0]).not.toEqual(styles[0])
      expect(obj.styles[0][1]).not.toEqual(styles[0][1])
      expect(obj.styles[0]).toEqual(styles[0])
      expect(obj.styles[0][1]).toEqual(styles[0][1])
    })

    test("setSelectionStart", function (assert) {
      var iText = new fabric.IText("test")

      expect(typeof iText.setSelectionStart).toEqual("function")

      expect(iText.selectionStart).toEqual(0)

      iText.setSelectionStart(3)
      expect(iText.selectionStart).toEqual(3)
      expect(iText.selectionEnd).toEqual(0)
    })

    test("empty itext", function (assert) {
      var iText = new fabric.IText("")
      expect(iText.width).toEqual(iText.cursorWidth)
    })

    test("setSelectionEnd", function (assert) {
      var iText = new fabric.IText("test")

      expect(typeof iText.setSelectionEnd).toEqual("function")

      expect(iText.selectionEnd).toEqual(0)

      iText.setSelectionEnd(3)
      expect(iText.selectionEnd).toEqual(3)
      expect(iText.selectionStart).toEqual(0)
    })

    test("get2DCursorLocation", function (assert) {
      var iText = new fabric.IText("test\nfoo\nbarbaz")
      var loc = iText.get2DCursorLocation()

      expect(loc.lineIndex).toEqual(0)
      expect(loc.charIndex).toEqual(0)

      // 'tes|t'
      iText.selectionStart = iText.selectionEnd = 3
      loc = iText.get2DCursorLocation()

      expect(loc.lineIndex).toEqual(0)
      expect(loc.charIndex).toEqual(3)

      // test
      // fo|o
      iText.selectionStart = iText.selectionEnd = 7
      loc = iText.get2DCursorLocation()

      expect(loc.lineIndex).toEqual(1)
      expect(loc.charIndex).toEqual(2)

      // test
      // foo
      // barba|z
      iText.selectionStart = iText.selectionEnd = 14
      loc = iText.get2DCursorLocation()

      expect(loc.lineIndex).toEqual(2)
      expect(loc.charIndex).toEqual(5)
    })

    test("isEmptyStyles", function (assert) {
      var iText = new fabric.IText("test")
      expect(iText.isEmptyStyles()).toBeTruthy()

      iText = new fabric.IText("test", {
        styles: {
          0: {
            0: {}
          },
          1: {
            0: {},
            1: {}
          }
        }
      })
      expect(iText.isEmptyStyles()).toBeTruthy()

      iText = new fabric.IText("test", {
        styles: {
          0: {
            0: {}
          },
          1: {
            0: { fill: "red" },
            1: {}
          }
        }
      })
      expect(!iText.isEmptyStyles()).toBeTruthy()
    })

    test("selectAll", function (assert) {
      var iText = new fabric.IText("test")

      iText.selectAll()
      expect(iText.selectionStart).toEqual(0)
      expect(iText.selectionEnd).toEqual(4)

      iText.selectionStart = 1
      iText.selectionEnd = 2

      iText.selectAll()
      expect(iText.selectionStart).toEqual(0)
      expect(iText.selectionEnd).toEqual(4)

      expect(iText.selectAll()).toEqual(iText)
    })

    test("getSelectedText", function (assert) {
      var iText = new fabric.IText("test\nfoobarbaz")
      iText.selectionStart = 1
      iText.selectionEnd = 10
      expect(iText.getSelectedText()).toEqual("est\nfooba")

      iText.selectionStart = iText.selectionEnd = 3
      expect(iText.getSelectedText()).toEqual("")
    })

    test("enterEditing, exitEditing", function (assert) {
      var iText = new fabric.IText("test")

      expect(typeof iText.enterEditing).toEqual("function")
      expect(typeof iText.exitEditing).toEqual("function")

      expect(!iText.isEditing).toBeTruthy()

      iText.enterEditing()
      expect(iText.isEditing).toBeTruthy()

      iText.exitEditing()
      expect(!iText.isEditing).toBeTruthy()
      iText.abortCursorAnimation()
    })

    test("enterEditing, exitEditing and saved props", function (assert) {
      var iText = new fabric.IText("test")

      var _savedProps = {
        hasControls: iText.hasControls,
        borderColor: iText.borderColor,
        lockMovementX: iText.lockMovementX,
        lockMovementY: iText.lockMovementY,
        hoverCursor: iText.hoverCursor,
        selectable: iText.selectable,
        defaultCursor: iText.canvas && iText.canvas.defaultCursor,
        moveCursor: iText.canvas && iText.canvas.moveCursor
      }
      iText.enterEditing()
      expect(_savedProps).toEqual(iText._savedProps)
      expect(iText.selectable).toEqual(false)
      expect(iText.hasControls).toEqual(false)
      iText.exitEditing()
      iText.abortCursorAnimation()
      expect(iText.selectable).toEqual(true)
      expect(iText.hasControls).toEqual(true)
      iText.selectable = false
      iText.enterEditing()
      iText.exitEditing()
      expect(iText.selectable).toEqual(false)
      iText.abortCursorAnimation()
    })

    test("event firing", function (assert) {
      var iText = new fabric.IText("test"),
        enter = 0,
        exit = 0,
        modify = 0

      function countEnter() {
        enter++
      }

      function countExit() {
        exit++
      }

      function countModify() {
        modify++
      }

      iText.on("editing:entered", countEnter)
      iText.on("editing:exited", countExit)
      iText.on("modified", countModify)

      expect(typeof iText.enterEditing).toEqual("function")
      expect(typeof iText.exitEditing).toEqual("function")

      iText.enterEditing()
      expect(enter).toEqual(1)
      expect(exit).toEqual(0)
      expect(modify).toEqual(0)

      iText.exitEditing()
      expect(enter).toEqual(1)
      expect(exit).toEqual(1)
      expect(modify).toEqual(0)

      iText.enterEditing()
      expect(enter).toEqual(2)
      expect(exit).toEqual(1)
      expect(modify).toEqual(0)

      iText.text = "Test+"
      iText.exitEditing()
      expect(enter).toEqual(2)
      expect(exit).toEqual(2)
      expect(modify).toEqual(1)
      iText.abortCursorAnimation()
    })

    test("insertNewlineStyleObject", function (assert) {
      var iText = new fabric.IText("test\n2")

      expect(typeof iText.insertNewlineStyleObject).toEqual("function")

      iText.insertNewlineStyleObject(0, 4, 1)
      expect(iText.styles).toEqual({})
      iText.styles = { 1: { 0: { fill: "blue" } } }
      iText.insertNewlineStyleObject(0, 4, 1)
      expect(iText.styles).toEqual({ 2: { 0: { fill: "blue" } } })
    })

    test("insertNewlineStyleObject with existing style", function (
      assert
    ) {
      var iText = new fabric.IText("test\n2")

      iText.styles = { 0: { 3: { fill: "red" } }, 1: { 0: { fill: "blue" } } }
      iText.insertNewlineStyleObject(0, 4, 3)
      expect(iText.styles[4]).toEqual({ 0: { fill: "blue" } })
      expect(iText.styles[3]).toEqual({ 0: { fill: "red" } })
      expect(iText.styles[2]).toEqual({ 0: { fill: "red" } })
      expect(iText.styles[1]).toEqual({ 0: { fill: "red" } })
    })

    test("shiftLineStyles", function (assert) {
      var iText = new fabric.IText("test\ntest\ntest", {
        styles: {
          1: {
            0: { fill: "red" },
            1: { fill: "red" },
            2: { fill: "red" },
            3: { fill: "red" }
          }
        }
      })

      expect(typeof iText.shiftLineStyles).toEqual("function")

      iText.shiftLineStyles(0, +1)
      expect(iText.styles).toEqual({
        2: {
          0: { fill: "red" },
          1: { fill: "red" },
          2: { fill: "red" },
          3: { fill: "red" }
        }
      })

      iText.shiftLineStyles(0, -1)
      expect(iText.styles).toEqual({
        1: {
          0: { fill: "red" },
          1: { fill: "red" },
          2: { fill: "red" },
          3: { fill: "red" }
        }
      })
    })

    test("selectWord", function (assert) {
      var iText = new fabric.IText("test foo bar-baz\nqux")

      expect(typeof iText.selectWord).toEqual("function")

      iText.selectWord(1)
      expect(iText.selectionStart).toEqual(0) // |test|
      expect(iText.selectionEnd).toEqual(4)

      iText.selectWord(7)
      expect(iText.selectionStart).toEqual(5) // |foo|
      expect(iText.selectionEnd).toEqual(8)
    })

    test("selectLine", function (assert) {
      var iText = new fabric.IText("test foo bar-baz\nqux")

      expect(typeof iText.selectLine).toEqual("function")

      iText.selectLine(6)
      expect(iText.selectionStart).toEqual(0) // |test foo bar-baz|
      expect(iText.selectionEnd).toEqual(16)

      iText.selectLine(18)
      expect(iText.selectionStart).toEqual(17) // |qux|
      expect(iText.selectionEnd).toEqual(20)

      expect(iText.selectLine(0)).toEqual(iText)
    })

    test("findWordBoundaryLeft", function (assert) {
      var iText = new fabric.IText("test foo bar-baz\nqux")

      expect(typeof iText.findWordBoundaryLeft).toEqual("function")

      expect(iText.findWordBoundaryLeft(3)).toEqual(0) // 'tes|t'
      expect(iText.findWordBoundaryLeft(20)).toEqual(17) // 'qux|'
      expect(iText.findWordBoundaryLeft(6)).toEqual(5) // 'f|oo'
      expect(iText.findWordBoundaryLeft(11)).toEqual(9) // 'ba|r-baz'
    })

    test("findWordBoundaryRight", function (assert) {
      var iText = new fabric.IText("test foo bar-baz\nqux")

      expect(typeof iText.findWordBoundaryRight).toEqual("function")

      expect(iText.findWordBoundaryRight(3)).toEqual(4) // 'tes|t'
      expect(iText.findWordBoundaryRight(17)).toEqual(20) // '|qux'
      expect(iText.findWordBoundaryRight(6)).toEqual(8) // 'f|oo'
      expect(iText.findWordBoundaryRight(11)).toEqual(16) // 'ba|r-baz'
    })

    test("findLineBoundaryLeft", function (assert) {
      var iText = new fabric.IText("test foo bar-baz\nqux")

      expect(typeof iText.findLineBoundaryLeft).toEqual("function")

      expect(iText.findLineBoundaryLeft(3)).toEqual(0) // 'tes|t'
      expect(iText.findLineBoundaryLeft(20)).toEqual(17) // 'qux|'
    })

    test("findLineBoundaryRight", function (assert) {
      var iText = new fabric.IText("test foo bar-baz\nqux")

      expect(typeof iText.findLineBoundaryRight).toEqual("function")

      expect(iText.findLineBoundaryRight(3)).toEqual(16) // 'tes|t'
      expect(iText.findLineBoundaryRight(17)).toEqual(20) // '|qux'
    })

    test("getSelectionStyles with no arguments", function (assert) {
      var iText = new fabric.IText("test foo bar-baz\nqux", {
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

      iText.selectionStart = 0
      iText.selectionEnd = 0

      expect(iText.getSelectionStyles()).toEqual([])

      iText.selectionStart = 2
      iText.selectionEnd = 3

      expect(iText.getSelectionStyles()).toEqual([
        {
          textDecoration: "overline"
        }
      ])

      iText.selectionStart = 17
      iText.selectionEnd = 18

      expect(iText.getSelectionStyles()).toEqual([
        {
          fill: "red"
        }
      ])
    })

    test("getSelectionStyles with 2 args", function (assert) {
      var iText = new fabric.IText("test foo bar-baz\nqux", {
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

      expect(iText.getSelectionStyles(0, 2)).toEqual([
        { textDecoration: "underline" },
        {}
      ])
    })

    test("setSelectionStyles", function (assert) {
      var iText = new fabric.IText("test foo bar-baz\nqux", {
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

      iText.selectionEnd = 0
      iText.selectionEnd = 1
      iText.setSelectionStyles({
        fill: "red",
        stroke: "yellow"
      })

      expect(iText.styles[0][0]).toEqual({
        fill: "red",
        stroke: "yellow"
      })

      iText.selectionStart = 2
      iText.selectionEnd = 3

      iText.setSelectionStyles({
        fill: "#998877",
        stroke: "yellow"
      })

      expect(iText.styles[0][2]).toEqual({
        fill: "#998877",
        stroke: "yellow"
      })
    })

    test("getCurrentCharFontSize", function (assert) {
      var iText = new fabric.IText("test foo bar-baz\nqux", {
        styles: {
          0: {
            0: { fontSize: 20 },
            1: { fontSize: 60 }
          }
        }
      })

      expect(typeof iText.getCurrentCharFontSize).toEqual("function")
      iText.selectionStart = 0
      expect(iText.getCurrentCharFontSize()).toEqual(20)
      iText.selectionStart = 1
      expect(iText.getCurrentCharFontSize()).toEqual(20)
      iText.selectionStart = 2
      expect(iText.getCurrentCharFontSize()).toEqual(60)
      iText.selectionStart = 3
      expect(iText.getCurrentCharFontSize()).toEqual(40)
    })

    test("object removal from canvas", function (assert) {
      canvas.clear()
      canvas._iTextInstances = null
      var text1 = new fabric.IText("Text Will be here")
      var text2 = new fabric.IText("Text Will be here")
      expect(!canvas._iTextInstances).toBeTruthy()
      expect(!canvas._hasITextHandlers).toBeTruthy()

      canvas.add(text1)
      expect(canvas._iTextInstances).toEqual([text1])
      expect(canvas._hasITextHandlers).toBeTruthy()
      expect(canvas._iTextInstances.length).toEqual(1)

      canvas.add(text2)
      expect(canvas._iTextInstances).toEqual([text1, text2])
      expect(canvas._hasITextHandlers).toBeTruthy()
      expect(canvas._iTextInstances.length).toEqual(2)

      canvas.remove(text1)
      expect(canvas._iTextInstances).toEqual([text2])
      expect(canvas._hasITextHandlers).toBeTruthy()
      expect(canvas._iTextInstances.length).toEqual(1)

      canvas.remove(text2)
      expect(canvas._iTextInstances).toEqual([])
      expect(!canvas._hasITextHandlers).toBeTruthy()
    })

    test("getCurrentCharColor", function (assert) {
      var iText = new fabric.IText("test foo bar-baz\nqux", {
        styles: {
          0: {
            0: { fill: "red" },
            1: { fill: "green" }
          }
        },
        fill: "#333"
      })

      expect(typeof iText.getCurrentCharColor).toEqual("function")
      iText.selectionStart = 0
      expect(iText.getCurrentCharColor()).toEqual("red")
      iText.selectionStart = 1
      expect(iText.getCurrentCharColor()).toEqual("red")
      iText.selectionStart = 2
      expect(iText.getCurrentCharColor()).toEqual("green")
      iText.selectionStart = 3
      expect(iText.getCurrentCharColor()).toEqual("#333")
    })

    test("toSVGWithFonts", function (assert) {
      var iText = new fabric.IText("test foo bar-baz\nqux", {
        styles: {
          0: {
            0: { fill: "#112233" },
            2: { stroke: "#223344", fontFamily: "Engagement" },
            3: { backgroundColor: "#00FF00" }
          }
        },
        fontFamily: "Plaster"
      })
      fabric.fontPaths = {
        Engagement: "path-to-engagement-font-file",
        Plaster: "path-to-plaster-font-file"
      }
      canvas.add(iText)
      expect(typeof iText.toSVG).toEqual("function")
      var parser
      if (fabric.isLikelyNode) {
        var XmlDomParser = require("xmldom").DOMParser
        parser = new XmlDomParser()
      } else {
        parser = new fabric.window.DOMParser()
      }
      var svgString = canvas.toSVG(),
        doc = parser.parseFromString(svgString, "image/svg+xml"),
        style = doc.getElementsByTagName("style")[0].firstChild.data
      expect(style).toEqual(
        "\n\t\t@font-face {\n\t\t\tfont-family: 'Plaster';\n\t\t\tsrc: url('path-to-plaster-font-file');\n\t\t}\n\t\t@font-face {\n\t\t\tfont-family: 'Engagement';\n\t\t\tsrc: url('path-to-engagement-font-file');\n\t\t}\n"
      )
    })

    test("toSVGWithFontsInGroups", function (assert) {
      var iText1 = new fabric.IText("test foo bar-baz\nqux", {
        styles: {
          0: {
            0: { fill: "#112233" },
            2: { stroke: "#223344", fontFamily: "Lacquer" },
            3: { backgroundColor: "#00FF00" }
          }
        },
        fontFamily: "Plaster"
      })
      var iText2 = new fabric.IText("test foo bar-baz\nqux\n2", {
        styles: {
          0: {
            0: { fill: "#112233", fontFamily: "Engagement" },
            2: { stroke: "#223344" },
            3: { backgroundColor: "#00FF00" }
          }
        },
        fontFamily: "Poppins"
      })
      fabric.fontPaths = {
        Engagement: "path-to-engagement-font-file",
        Plaster: "path-to-plaster-font-file",
        Poppins: "path-to-poppins-font-file",
        Lacquer: "path-to-lacquer-font-file"
      }
      var subGroup = new fabric.Group([iText1])
      var group = new fabric.Group([subGroup, iText2])
      canvas.add(group)
      expect(typeof iText1.toSVG).toEqual("function")
      expect(typeof iText2.toSVG).toEqual("function")
      var parser = new fabric.window.DOMParser()
      var svgString = canvas.toSVG(),
        doc = parser.parseFromString(svgString, "image/svg+xml"),
        style = doc.getElementsByTagName("style")[0].firstChild.data
      expect(style).toEqual(
        "\n\t\t@font-face {\n\t\t\tfont-family: 'Plaster';\n\t\t\tsrc: url('path-to-plaster-font-file');\n\t\t}\n\t\t@font-face {\n\t\t\tfont-family: 'Lacquer';\n\t\t\tsrc: url('path-to-lacquer-font-file');\n\t\t}\n\t\t@font-face {\n\t\t\tfont-family: 'Poppins';\n\t\t\tsrc: url('path-to-poppins-font-file');\n\t\t}\n\t\t@font-face {\n\t\t\tfont-family: 'Engagement';\n\t\t\tsrc: url('path-to-engagement-font-file');\n\t\t}\n"
      )
    })

    test("space wrap attribute", function (assert) {
      var iText = new fabric.IText("test foo bar-baz\nqux")
      iText.enterEditing()
      expect(iText.hiddenTextarea.wrap).toEqual("off")
      iText.abortCursorAnimation()
    })

    test("_removeExtraneousStyles", function (assert) {
      var iText = new fabric.IText("a\nqqo", {
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

    describe(
      "fabric.IText with canvas.enableRetinaScaling = false",
      function () {
        test("hiddenTextarea does not move DOM", function (assert) {
          var iText = new fabric.IText("a", { fill: "#ffffff", fontSize: 50 })
          var canvas2 = new fabric.Canvas(null, {
            width: 800,
            height: 800,
            renderOnAddRemove: false,
            enableRetinaScaling: false
          })
          canvas2.setDimensions({ width: 100, height: 100 }, { cssOnly: true })
          canvas2.cancelRequestedRender()
          iText.set({
            top: 400,
            left: 400
          })
          canvas2.add(iText)
          Object.defineProperty(canvas2.upperCanvasEl, "clientWidth", {
            get: function () {
              return this._clientWidth
            },
            set: function (value) {
              return (this._clientWidth = value)
            }
          })
          Object.defineProperty(canvas2.upperCanvasEl, "clientHeight", {
            get: function () {
              return this._clientHeight
            },
            set: function (value) {
              return (this._clientHeight = value)
            }
          })
          canvas2.upperCanvasEl._clientWidth = 100
          canvas2.upperCanvasEl._clientHeight = 100
          iText.enterEditing()
          canvas2.cancelRequestedRender()
          expect(Math.round(parseInt(iText.hiddenTextarea.style.top))).toEqual(57)
          expect(Math.round(parseInt(iText.hiddenTextarea.style.left))).toEqual(50)
          iText.exitEditing()
          canvas2.cancelRequestedRender()
          canvas2.upperCanvasEl._clientWidth = 200
          canvas2.upperCanvasEl._clientHeight = 200
          iText.enterEditing()
          canvas2.cancelRequestedRender()
          expect(Math.round(parseInt(iText.hiddenTextarea.style.top))).toEqual(114)
          expect(Math.round(parseInt(iText.hiddenTextarea.style.left))).toEqual(100)
          iText.exitEditing()
          canvas2.cancelRequestedRender()
        })
      }
    )

    describe(
      "fabric.IText with canvas.enableRetinaScaling = true",
      function () {
        test("hiddenTextarea does not move DOM", function (assert) {
          fabric.devicePixelRatio = 2
          var iText = new fabric.IText("a", { fill: "#ffffff", fontSize: 50 })
          var canvas2 = new fabric.Canvas(null, {
            width: 800,
            height: 800,
            renderOnAddRemove: false,
            enableRetinaScaling: true
          })
          canvas2.setDimensions({ width: 100, height: 100 }, { cssOnly: true })
          canvas2.cancelRequestedRender()
          iText.set({
            top: 400,
            left: 400
          })
          canvas2.add(iText)
          Object.defineProperty(canvas2.upperCanvasEl, "clientWidth", {
            get: function () {
              return this._clientWidth
            },
            set: function (value) {
              return (this._clientWidth = value)
            }
          })
          Object.defineProperty(canvas2.upperCanvasEl, "clientHeight", {
            get: function () {
              return this._clientHeight
            },
            set: function (value) {
              return (this._clientHeight = value)
            }
          })
          canvas2.upperCanvasEl._clientWidth = 100
          canvas2.upperCanvasEl._clientHeight = 100
          iText.enterEditing()
          canvas2.cancelRequestedRender()
          expect(Math.round(parseInt(iText.hiddenTextarea.style.top))).toEqual(57)
          expect(Math.round(parseInt(iText.hiddenTextarea.style.left))).toEqual(50)
          iText.exitEditing()
          canvas2.cancelRequestedRender()
          canvas2.upperCanvasEl._clientWidth = 200
          canvas2.upperCanvasEl._clientHeight = 200
          iText.enterEditing()
          canvas2.cancelRequestedRender()
          expect(Math.round(parseInt(iText.hiddenTextarea.style.top))).toEqual(114)
          expect(Math.round(parseInt(iText.hiddenTextarea.style.left))).toEqual(100)
          iText.exitEditing()
          canvas2.cancelRequestedRender()
          fabric.devicePixelRatio = 1
        })
      }
    )
  })
})()
