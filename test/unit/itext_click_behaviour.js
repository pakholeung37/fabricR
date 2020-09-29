;(function () {
  var canvas
  describe("iText click interaction", function (hooks) {
    hooks.beforeEach(function () {
      canvas = new fabric.Canvas(null, {
        enableRetinaScaling: false
      })
    })
    hooks.afterEach(function () {
      canvas.clear()
      canvas.cancelRequestedRender()
    })
    test("doubleClickHandler", function (assert) {
      var iText = new fabric.IText("test need some word\nsecond line")
      iText.canvas = canvas
      var eventData = {
        which: 1,
        target: canvas.upperCanvasEl,
        clientX: 40,
        clientY: 10
      }
      iText.enterEditing()
      iText.doubleClickHandler({
        e: eventData
      })
      expect(iText.selectionStart).toEqual(0)
      expect(iText.selectionEnd).toEqual(4)
      var eventData = {
        which: 1,
        target: canvas.upperCanvasEl,
        clientX: 40,
        clientY: 60
      }
      iText.doubleClickHandler({
        e: eventData
      })
      expect(iText.selectionStart).toEqual(20)
      expect(iText.selectionEnd).toEqual(26)
      iText.exitEditing()
    })
    test("doubleClickHandler no editing", function (assert) {
      var iText = new fabric.IText("test need some word\nsecond line")
      iText.canvas = canvas
      var eventData = {
        which: 1,
        target: canvas.upperCanvasEl,
        clientX: 40,
        clientY: 10
      }
      iText.doubleClickHandler({
        e: eventData
      })
      expect(iText.selectionStart).toEqual(0)
      expect(iText.selectionEnd).toEqual(0)
    })
    test("tripleClickHandler", function (assert) {
      var iText = new fabric.IText("test need some word\nsecond line")
      iText.canvas = canvas
      var eventData = {
        which: 1,
        target: canvas.upperCanvasEl,
        clientX: 40,
        clientY: 10
      }
      iText.enterEditing()
      iText.tripleClickHandler({
        e: eventData
      })
      expect(iText.selectionStart).toEqual(0)
      expect(iText.selectionEnd).toEqual(19)
      var eventData = {
        which: 1,
        target: canvas.upperCanvasEl,
        clientX: 40,
        clientY: 60
      }
      iText.tripleClickHandler({
        e: eventData
      })
      expect(iText.selectionStart).toEqual(20)
      expect(iText.selectionEnd).toEqual(31)
      iText.exitEditing()
    })
    test("tripleClickHandler", function (assert) {
      var iText = new fabric.IText("test need some word\nsecond line")
      iText.canvas = canvas
      var eventData = {
        which: 1,
        target: canvas.upperCanvasEl,
        clientX: 40,
        clientY: 10
      }
      iText.tripleClickHandler({
        e: eventData
      })
      expect(iText.selectionStart).toEqual(0)
      expect(iText.selectionEnd).toEqual(0)
    })
    test("_getNewSelectionStartFromOffset end of line", function (
      assert
    ) {
      var iText = new fabric.IText("test need some word\nsecond line")
      var index = 10
      var jlen = 20
      var selection = iText._getNewSelectionStartFromOffset(
        { y: 1, x: 1000 },
        500,
        520,
        index,
        jlen
      )
      expect(selection).toEqual(index)
    })
    test("_getNewSelectionStartFromOffset middle of line", function (
      assert
    ) {
      var iText = new fabric.IText("test need some word\nsecond line")
      var index = 10
      var jlen = 20
      var selection = iText._getNewSelectionStartFromOffset(
        { y: 1, x: 519 },
        500,
        520,
        index,
        jlen
      )
      expect(selection).toEqual(index + 1)
    })
    test("_getNewSelectionStartFromOffset middle of line", function (
      assert
    ) {
      var iText = new fabric.IText("test need some word\nsecond line")
      var index = 10
      var jlen = 20
      var selection = iText._getNewSelectionStartFromOffset(
        { y: 1, x: 502 },
        500,
        520,
        index,
        jlen
      )
      expect(selection).toEqual(index)
    })
    test("_getNewSelectionStartFromOffset middle of line", function (
      assert
    ) {
      var iText = new fabric.IText("test need some word\nsecond line")
      var index = 10
      var jlen = 10
      var selection = iText._getNewSelectionStartFromOffset(
        { y: 1, x: 1000 },
        500,
        520,
        index,
        jlen
      )
      expect(selection).toEqual(index)
    })
    test("_mouseDownHandlerBefore set up selected property", function (
      assert
    ) {
      var iText = new fabric.IText("test need some word\nsecond line")
      expect(iText.selected).toEqual(undefined)
      canvas.setActiveObject(iText)
      iText.canvas = canvas
      iText._mouseDownHandlerBefore({ e: {} })
      expect(iText.selected).toEqual(true)
      expect(iText.__lastSelected).toEqual(undefined)
    })
    test("_mouseUpHandler set selected as true", function (assert) {
      var iText = new fabric.IText("test")
      iText.initDelayedCursor = function () {}
      iText.renderCursorOrSelection = function () {}
      expect(iText.selected).toEqual(undefined)
      expect(iText.__lastSelected).toEqual(undefined)
      canvas.setActiveObject(iText)
      iText.canvas = canvas
      iText.mouseUpHandler({ e: {} })
      expect(iText.selected).toEqual(true)
    })
    test("_mouseUpHandler on a selected object enter edit", function (
      assert
    ) {
      var iText = new fabric.IText("test")
      iText.initDelayedCursor = function () {}
      iText.renderCursorOrSelection = function () {}
      expect(iText.isEditing).toEqual(false)
      iText.canvas = canvas
      canvas._activeObject = null
      iText.selected = true
      iText.__lastSelected = true
      iText.mouseUpHandler({ e: {} })
      expect(iText.isEditing).toEqual(true)
      iText.exitEditing()
    })
    test(
      "_mouseUpHandler on a selected object does enter edit if there is an activeObject",
      function (assert) {
        var iText = new fabric.IText("test")
        iText.initDelayedCursor = function () {}
        iText.renderCursorOrSelection = function () {}
        expect(iText.isEditing).toEqual(false)
        iText.canvas = canvas
        canvas._activeObject = new fabric.IText("test2")
        iText.selected = true
        iText.__lastSelected = true
        iText.mouseUpHandler({ e: {} })
        expect(iText.isEditing).toEqual(false)
        iText.exitEditing()
      }
    )
    test(
      "_mouseUpHandler on a selected text in a group DOES NOT enter edit",
      function (assert) {
        var iText = new fabric.IText("test")
        iText.initDelayedCursor = function () {}
        iText.renderCursorOrSelection = function () {}
        expect(iText.isEditing).toEqual(false)
        iText.canvas = canvas
        iText.selected = true
        iText.__lastSelected = true
        iText.group = true
        iText.mouseUpHandler({ e: {} })
        expect(iText.isEditing).toEqual(false)
        iText.exitEditing()
      }
    )
    test(
      "_mouseUpHandler on a corner of selected text DOES NOT enter edit",
      function (assert) {
        var iText = new fabric.IText("test")
        iText.initDelayedCursor = function () {}
        iText.renderCursorOrSelection = function () {}
        expect(iText.isEditing).toEqual(false)
        iText.canvas = canvas
        iText.selected = true
        iText.__lastSelected = true
        iText.__corner = "mt"
        iText.mouseUpHandler({ e: {} })
        expect(iText.isEditing).toEqual(false)
        iText.exitEditing()
        canvas.renderAll()
      }
    )

    describe(
      "iText click interaction with canvas.enableRetinaScaling = false",
      function (hooks) {
        hooks.beforeEach(function () {
          canvas.enableRetinaScaling = false
        })
        test(
          "click on editing itext make selection:changed fire",
          function (assert) {
            var done = assert.async()
            var eventData = {
              which: 1,
              target: canvas.upperCanvasEl,
              clientX: 30,
              clientY: 10
            }
            var count = 0
            var countCanvas = 0
            var iText = new fabric.IText("test test")
            canvas.on("text:selection:changed", function () {
              countCanvas++
            })
            iText.on("selection:changed", function () {
              count++
            })
            canvas.add(iText)
            expect(canvas.getActiveObject()).toEqual(null)
            expect(count).toEqual(0)
            expect(countCanvas).toEqual(0)
            canvas._onMouseDown(eventData)
            canvas._onMouseUp(eventData)
            expect(canvas.getActiveObject()).toEqual(iText)
            expect(iText.isEditing).toEqual(false)
            expect(count).toEqual(0)
            expect(countCanvas).toEqual(0)
            expect(iText.selectionStart).toEqual(0)
            expect(iText.selectionEnd).toEqual(0)
            // make a little delay or it will act as double click and select everything
            setTimeout(function () {
              canvas._onMouseDown(eventData)
              canvas._onMouseUp(eventData)
              expect(iText.isEditing).toEqual(true)
              expect(iText.selectionStart).toEqual(2)
              expect(iText.selectionEnd).toEqual(2)
              expect(count).toEqual(1)
              expect(countCanvas).toEqual(1)
              done()
            }, 500)
          }
        )
      }
    )

    describe(
      "iText click interaction with canvas.enableRetinaScaling = true",
      function (hooks) {
        hooks.beforeEach(function () {
          fabric.devicePixelRatio = 2
          canvas = new fabric.Canvas(null, {
            enableRetinaScaling: true
          })
        })
        test(
          "click on editing itext make selection:changed fire",
          function (assert) {
            var done = assert.async()
            var eventData = {
              which: 1,
              target: canvas.upperCanvasEl,
              clientX: 60,
              clientY: 30
            }
            var count = 0
            var countCanvas = 0
            var iText = new fabric.IText("test test")
            canvas.on("text:selection:changed", function () {
              countCanvas++
            })
            iText.on("selection:changed", function () {
              count++
            })
            canvas.add(iText)
            expect(canvas.getActiveObject()).toEqual(null)
            expect(count).toEqual(0)
            expect(countCanvas).toEqual(0)
            canvas._onMouseDown(eventData)
            canvas._onMouseUp(eventData)
            expect(canvas.getActiveObject()).toEqual(iText)
            expect(iText.isEditing).toEqual(false)
            expect(count).toEqual(0)
            expect(countCanvas).toEqual(0)
            expect(iText.selectionStart).toEqual(0)
            expect(iText.selectionEnd).toEqual(0)
            // make a little delay or it will act as double click and select everything
            setTimeout(function () {
              canvas._onMouseDown(eventData)
              canvas._onMouseUp(eventData)
              expect(iText.isEditing).toEqual(true)
              expect(iText.selectionStart).toEqual(2)
              expect(iText.selectionEnd).toEqual(2)
              expect(count).toEqual(1)
              expect(countCanvas).toEqual(1)
              done()
            }, 500)
          }
        )
      }
    )
  })
})()
