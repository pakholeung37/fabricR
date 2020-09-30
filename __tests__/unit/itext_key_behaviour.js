var canvas = fabric.document.createElement("canvas"),
  ctx = canvas.getContext("2d")

describe("iText key behaviour", function () {
  test("event selection:changed firing", function () {
    var iText = new fabric.IText("test neei some word\nsecond line"),
      selection = 0
    iText.ctx = ctx
    function countSelectionChange() {
      selection++
    }

    iText.on("selection:changed", countSelectionChange)

    iText.enterEditing()
    expect(selection).toBe(1)
    selection = 0

    iText.selectAll()
    expect(selection).toBe(1)
    expect(iText.selectionStart).toBe(0)
    expect(iText.selectionEnd).toBe(31)
    selection = 0

    iText.selectionStart = 2
    iText.selectionEnd = 2
    iText.selectWord()
    expect(selection).toBe(1)
    expect(iText.selectionStart).toBe(0)
    expect(iText.selectionEnd).toBe(4)
    selection = 0

    iText.selectionStart = 2
    iText.selectionEnd = 2
    iText.selectLine()
    expect(selection).toBe(1)
    expect(iText.selectionStart).toBe(0)
    expect(iText.selectionEnd).toBe(19)
    selection = 0

    iText.selectionStart = 2
    iText.selectionEnd = 2
    iText.moveCursorLeft({ shiftKey: false })
    expect(selection).toBe(1)
    expect(iText.selectionStart).toBe(1)
    expect(iText.selectionEnd).toBe(1)
    selection = 0

    iText.selectionStart = 2
    iText.selectionEnd = 2
    iText.moveCursorRight({ shiftKey: false })
    expect(selection).toBe(1)
    expect(iText.selectionStart).toBe(3)
    expect(iText.selectionEnd).toBe(3)
    selection = 0

    iText.selectionStart = 2
    iText.selectionEnd = 2
    iText.moveCursorDown({ shiftKey: false })
    expect(selection).toBe(1)
    expect(iText.selectionStart).toBe(22)
    expect(iText.selectionEnd).toBe(22)
    iText.moveCursorDown({ shiftKey: false })
    expect(selection).toBe(2)
    expect(iText.selectionStart).toBe(31)
    expect(iText.selectionEnd).toBe(31)
    selection = 0

    iText.selectionStart = 22
    iText.selectionEnd = 22
    iText.moveCursorUp({ shiftKey: false })
    expect(selection).toBe(1)
    expect(iText.selectionStart).toBe(2)
    expect(iText.selectionEnd).toBe(2)
    iText.moveCursorUp({ shiftKey: false })
    expect(selection).toBe(2)
    expect(iText.selectionStart).toBe(0)
    expect(iText.selectionEnd).toBe(0)
    selection = 0

    iText.selectionStart = 0
    iText.selectionEnd = 0
    iText.moveCursorLeft({ shiftKey: false })
    expect(selection).toBe(0)
    expect(iText.selectionStart).toBe(0)
    expect(iText.selectionEnd).toBe(0)
    iText.moveCursorUp({ shiftKey: false })
    expect(selection).toBe(0)
    expect(iText.selectionStart).toBe(0)
    expect(iText.selectionEnd).toBe(0)
    selection = 0

    iText.selectionStart = 31
    iText.selectionEnd = 31
    iText.moveCursorRight({ shiftKey: false })
    expect(selection).toBe(0)
    expect(iText.selectionStart).toBe(31)
    expect(iText.selectionEnd).toBe(31)
    iText.moveCursorDown({ shiftKey: false })
    expect(selection).toBe(0)
    expect(iText.selectionStart).toBe(31)
    expect(iText.selectionEnd).toBe(31)
    selection = 0

    iText.selectionStart = 28
    iText.selectionEnd = 31
    iText.moveCursorUp({ shiftKey: false })
    expect(selection).toBe(1)
    expect(iText.selectionStart).toBe(9)
    expect(iText.selectionEnd).toBe(9)
    selection = 0

    iText.selectionStart = 1
    iText.selectionEnd = 4
    iText.moveCursorDown({ shiftKey: false })
    expect(selection).toBe(1)
    expect(iText.selectionStart).toBe(24)
    expect(iText.selectionEnd).toBe(24)
    selection = 0

    iText.selectionStart = 28
    iText.selectionEnd = 31
    iText.moveCursorLeft({ shiftKey: false })
    expect(selection).toBe(1)
    expect(iText.selectionStart).toBe(28)
    expect(iText.selectionEnd).toBe(28)
    selection = 0
    // needed or test hangs
    iText.abortCursorAnimation()
    // TODO verify and dp
    // iText.selectionStart = 0;
    // iText.selectionEnd = 0;
    // iText.insertChars('hello');
    // .equal(selection, 1, 'should fire once on insert multiple chars');
    // .equal(iText.selectionStart, 5, 'should be at end of text inserted');
    // .equal(iText.selectionEnd, 5, 'should be at end of text inserted');
  })

  test("moving cursor with shift", function () {
    var iText = new fabric.IText("test need some word\nsecond line"),
      selection = 0
    iText.ctx = ctx
    function countSelectionChange() {
      selection++
    }

    iText.on("selection:changed", countSelectionChange)

    iText.enterEditing()
    expect(selection).toBe(1)
    selection = 0

    iText.selectAll()
    expect(selection).toBe(1)
    expect(iText.selectionStart).toBe(0)
    expect(iText.selectionEnd).toBe(31)
    selection = 0

    iText.selectionStart = 2
    iText.selectionEnd = 2
    iText.selectWord()
    expect(selection).toBe(1)
    expect(iText.selectionStart).toBe(0)
    expect(iText.selectionEnd).toBe(4)
    selection = 0

    iText.selectionStart = 2
    iText.selectionEnd = 2
    iText.selectLine()
    expect(selection).toBe(1)
    expect(iText.selectionStart).toBe(0)
    expect(iText.selectionEnd).toBe(19)
    selection = 0

    iText.selectionStart = 2
    iText.selectionEnd = 2
    iText.moveCursorLeft({ shiftKey: false })
    expect(selection).toBe(1)
    expect(iText.selectionStart).toBe(1)
    expect(iText.selectionEnd).toBe(1)
    selection = 0

    iText.selectionStart = 2
    iText.selectionEnd = 2
    iText.moveCursorRight({ shiftKey: false })
    expect(selection).toBe(1)
    expect(iText.selectionStart).toBe(3)
    expect(iText.selectionEnd).toBe(3)
    selection = 0

    iText.selectionStart = 2
    iText.selectionEnd = 2
    iText.moveCursorDown({ shiftKey: false })
    expect(selection).toBe(1)
    expect(iText.selectionStart).toBe(22)
    expect(iText.selectionEnd).toBe(22)
    iText.moveCursorDown({ shiftKey: false })
    expect(selection).toBe(2)
    expect(iText.selectionStart).toBe(31)
    expect(iText.selectionEnd).toBe(31)
    selection = 0

    iText.selectionStart = 22
    iText.selectionEnd = 22
    iText.moveCursorUp({ shiftKey: false })
    expect(selection).toBe(1)
    expect(iText.selectionStart).toBe(2)
    expect(iText.selectionEnd).toBe(2)
    iText.moveCursorUp({ shiftKey: false })
    expect(selection).toBe(2)
    expect(iText.selectionStart).toBe(0)
    expect(iText.selectionEnd).toBe(0)
    selection = 0

    iText.selectionStart = 0
    iText.selectionEnd = 1
    iText._selectionDirection = "left"
    iText.moveCursorLeft({ shiftKey: true })
    expect(selection).toBe(0)
    expect(iText.selectionStart).toBe(0)
    expect(iText.selectionEnd).toBe(1)
    iText.moveCursorUp({ shiftKey: true })
    expect(selection).toBe(0)
    expect(iText.selectionStart).toBe(0)
    expect(iText.selectionEnd).toBe(1)
    selection = 0

    iText.selectionStart = 30
    iText.selectionEnd = 31
    iText._selectionDirection = "right"
    iText.moveCursorRight({ shiftKey: true })
    expect(selection).toBe(0)
    expect(iText.selectionStart).toBe(30)
    expect(iText.selectionEnd).toBe(31)
    iText.moveCursorDown({ shiftKey: true })
    expect(selection).toBe(0)
    expect(iText.selectionStart).toBe(30)
    expect(iText.selectionEnd).toBe(31)
    selection = 0
    // needed or test hangs
    iText.abortCursorAnimation()
  })
  // test('copy and paste', function() {
  //   var event = { stopPropagation: function(){}, preventDefault: function(){} };
  //   var iText = new fabric.IText('test', { styles: { 0: { 0: { fill: 'red' }, 1: { fill: 'blue' }}}});
  //   iText.enterEditing();
  //   iText.selectionStart = 0;
  //   iText.selectionEnd = 2;
  //   iText.hiddenTextarea.selectionStart = 0
  //   iText.hiddenTextarea.selectionEnd = 2
  //   iText.copy(event);
  //   .equal(fabric.copiedText, 'te', 'it copied first 2 characters');
  //   .equal(fabric.copiedTextStyle[0], iText.styles[0][0], 'style is referenced');
  //   .equal(fabric.copiedTextStyle[1], iText.styles[0][1], 'style is referenced');
  //   iText.selectionStart = 2;
  //   iText.selectionEnd = 2;
  //   iText.hiddenTextarea.value = 'tetest';
  //   iText.paste(event);
  //   .equal(iText.text, 'tetest', 'text has been copied');
  //   .notEqual(iText.styles[0][0], iText.styles[0][2], 'style is not referenced');
  //   .notEqual(iText.styles[0][1], iText.styles[0][3], 'style is not referenced');
  //   .deepEqual(iText.styles[0][0], iText.styles[0][2], 'style is copied');
  //   .deepEqual(iText.styles[0][1], iText.styles[0][3], 'style is copied');
  // });
  test("copy", function () {
    var event = {
      stopPropagation: function () {},
      preventDefault: function () {}
    }
    var iText = new fabric.IText("test", {
      fontSize: 25,
      styles: { 0: { 0: { fill: "red" }, 1: { fill: "blue" } } }
    })
    iText.selectionStart = 0
    iText.selectionEnd = 2
    iText.copy(event)
    expect(fabric.copiedText).toBe("te")
    expect(fabric.copiedTextStyle[0].fill).toBe(iText.styles[0][0].fill)
    expect(fabric.copiedTextStyle[1].fill).toBe(iText.styles[0][1].fill)
    expect(iText.styles[0][1].fontSize).toBe(undefined)
    expect(fabric.copiedTextStyle[1].fontSize).toBe(25)
  })

  test("copy with fabric.disableStyleCopyPaste", function () {
    var event = {
      stopPropagation: function () {},
      preventDefault: function () {}
    }
    var iText = new fabric.IText("test", {
      fontSize: 25,
      styles: { 0: { 0: { fill: "red" }, 1: { fill: "blue" } } }
    })
    iText.selectionStart = 0
    iText.selectionEnd = 2
    fabric.disableStyleCopyPaste = true
    iText.copy(event)
    expect(fabric.copiedText).toBe("te")
    expect(fabric.copiedTextStyle).toBe(null)
    fabric.disableStyleCopyPaste = false
  })

  test("removeChars", function () {
    var iText = new fabric.IText("test", {
      fontSize: 25,
      styles: { 0: { 0: { fill: "red" }, 1: { fill: "blue" } } }
    })
    expect(typeof iText.removeChars === "function").toBeTruthy()
    iText.removeChars(1, 3)
    expect(iText.text).toBe("tt")
    expect(iText._text).toEqual(["t", "t"])
    expect(iText.styles[0][1]).toBe(undefined)
  })

  test("insertChars", function () {
    var iText = new fabric.IText("test")
    expect(typeof iText.insertChars === "function").toBeTruthy()
    iText.insertChars("ab", null, 1)
    expect(iText.text).toBe("tabest")
    expect(iText._text.join("")).toEqual("tabest")
  })

  test("insertChars can remove chars", function () {
    var iText = new fabric.IText("test")
    iText.insertChars("ab", null, 1, 2)
    expect(iText.text).toBe("tabst")
    expect(iText._text.join("")).toEqual("tabst")
    var iText = new fabric.IText("test")
    iText.insertChars("ab", null, 1, 4)
    expect(iText.text).toBe("tab")
    expect(iText._text.join("")).toEqual("tab")
  })

  test("insertChars pick up the style of the character behind and replicates it", function () {
    var iText = new fabric.IText("test", {
      fontSize: 25,
      styles: { 0: { 0: { fill: "red" }, 1: { fill: "blue" } } }
    })
    iText.insertChars("ab", null, 1)
    expect(iText.styles[0][0].fill).toBe("red")
    expect(iText.styles[0][1].fill).toBe("red")
    expect(iText.styles[0][2].fill).toBe("red")
    expect(iText.styles[0][3].fill).toBe("blue")
  })

  test("insertChars removes style from the removed text", function () {
    var iText = new fabric.IText("test", {
      fontSize: 25,
      styles: { 0: { 0: { fill: "red" }, 1: { fill: "blue" } } }
    })
    iText.insertChars("ab", null, 1, 2)
    expect(iText.styles[0][0].fill).toBe("red")
    expect(iText.styles[0][1].fill).toBe("red")
    expect(iText.styles[0][2].fill).toBe("red")
    expect(iText.styles[0][3]).toBe(undefined)
  })

  test("insertChars handles new lines correctly", function () {
    var iText = new fabric.IText("test", {
      fontSize: 25,
      styles: { 0: { 0: { fill: "red" }, 1: { fill: "blue" } } }
    })
    iText.insertChars("ab\n\n", null, 1)
    expect(iText.styles[0][0].fill).toBe("red")
    expect(iText.styles[0][1].fill).toBe("red")
    expect(iText.styles[0][2].fill).toBe("red")
    expect(iText.styles[2][0].fill).toBe("blue")
  })

  test("insertChars can accept some style for the new text", function () {
    var iText = new fabric.IText("test", {
      fontSize: 25,
      styles: { 0: { 0: { fill: "red" }, 1: { fill: "blue" } } }
    })
    iText.insertChars(
      "ab\n\na",
      [
        { fill: "col1" },
        { fill: "col2" },
        { fill: "col3" },
        { fill: "col4" },
        { fill: "col5" }
      ],
      1
    )
    expect(iText.styles[0][0].fill).toBe("red")
    expect(iText.styles[0][1].fill).toBe("col1")
    expect(iText.styles[0][2].fill).toBe("col2")
    expect(iText.styles[1][0].fill).toBe("col4")
    expect(iText.styles[2][0].fill).toBe("col5")
    expect(iText.styles[2][1].fill).toBe("blue")
  })

  test("missingNewlineOffset", function () {
    var iText = new fabric.IText(
      "由石墨\n分裂的石墨分\n裂\n由石墨分裂由石墨分裂的石\n墨分裂"
    )

    var offset = iText.missingNewlineOffset(0)
    expect(offset).toBe(1)
  })
})
