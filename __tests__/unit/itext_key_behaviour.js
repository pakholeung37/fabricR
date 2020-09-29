;(function () {
  var canvas = fabric.document.createElement("canvas"),
    ctx = canvas.getContext("2d")

  test("event selection:changed firing", function (assert) {
    var iText = new fabric.IText("test neei some word\nsecond line"),
      selection = 0
    iText.ctx = ctx
    function countSelectionChange() {
      selection++
    }

    iText.on("selection:changed", countSelectionChange)

    iText.enterEditing()
    expect(selection).toEqual(1)
    selection = 0

    iText.selectAll()
    expect(selection).toEqual(1)
    expect(iText.selectionStart).toEqual(0)
    expect(iText.selectionEnd).toEqual(31)
    selection = 0

    iText.selectionStart = 2
    iText.selectionEnd = 2
    iText.selectWord()
    expect(selection).toEqual(1)
    expect(iText.selectionStart).toEqual(0)
    expect(iText.selectionEnd).toEqual(4)
    selection = 0

    iText.selectionStart = 2
    iText.selectionEnd = 2
    iText.selectLine()
    expect(selection).toEqual(1)
    expect(iText.selectionStart).toEqual(0)
    expect(iText.selectionEnd).toEqual(19)
    selection = 0

    iText.selectionStart = 2
    iText.selectionEnd = 2
    iText.moveCursorLeft({ shiftKey: false })
    expect(selection).toEqual(1)
    expect(iText.selectionStart).toEqual(1)
    expect(iText.selectionEnd).toEqual(1)
    selection = 0

    iText.selectionStart = 2
    iText.selectionEnd = 2
    iText.moveCursorRight({ shiftKey: false })
    expect(selection).toEqual(1)
    expect(iText.selectionStart).toEqual(3)
    expect(iText.selectionEnd).toEqual(3)
    selection = 0

    iText.selectionStart = 2
    iText.selectionEnd = 2
    iText.moveCursorDown({ shiftKey: false })
    expect(selection).toEqual(1)
    expect(iText.selectionStart).toEqual(22)
    expect(iText.selectionEnd).toEqual(22)
    iText.moveCursorDown({ shiftKey: false })
    expect(selection).toEqual(2)
    expect(iText.selectionStart).toEqual(31)
    expect(iText.selectionEnd).toEqual(31)
    selection = 0

    iText.selectionStart = 22
    iText.selectionEnd = 22
    iText.moveCursorUp({ shiftKey: false })
    expect(selection).toEqual(1)
    expect(iText.selectionStart).toEqual(2)
    expect(iText.selectionEnd).toEqual(2)
    iText.moveCursorUp({ shiftKey: false })
    expect(selection).toEqual(2)
    expect(iText.selectionStart).toEqual(0)
    expect(iText.selectionEnd).toEqual(0)
    selection = 0

    iText.selectionStart = 0
    iText.selectionEnd = 0
    iText.moveCursorLeft({ shiftKey: false })
    expect(selection).toEqual(0)
    expect(iText.selectionStart).toEqual(0)
    expect(iText.selectionEnd).toEqual(0)
    iText.moveCursorUp({ shiftKey: false })
    expect(selection).toEqual(0)
    expect(iText.selectionStart).toEqual(0)
    expect(iText.selectionEnd).toEqual(0)
    selection = 0

    iText.selectionStart = 31
    iText.selectionEnd = 31
    iText.moveCursorRight({ shiftKey: false })
    expect(selection).toEqual(0)
    expect(iText.selectionStart).toEqual(31)
    expect(iText.selectionEnd).toEqual(31)
    iText.moveCursorDown({ shiftKey: false })
    expect(selection).toEqual(0)
    expect(iText.selectionStart).toEqual(31)
    expect(iText.selectionEnd).toEqual(31)
    selection = 0

    iText.selectionStart = 28
    iText.selectionEnd = 31
    iText.moveCursorUp({ shiftKey: false })
    expect(selection).toEqual(1)
    expect(iText.selectionStart).toEqual(9)
    expect(iText.selectionEnd).toEqual(9)
    selection = 0

    iText.selectionStart = 1
    iText.selectionEnd = 4
    iText.moveCursorDown({ shiftKey: false })
    expect(selection).toEqual(1)
    expect(iText.selectionStart).toEqual(24)
    expect(iText.selectionEnd).toEqual(24)
    selection = 0

    iText.selectionStart = 28
    iText.selectionEnd = 31
    iText.moveCursorLeft({ shiftKey: false })
    expect(selection).toEqual(1)
    expect(iText.selectionStart).toEqual(28)
    expect(iText.selectionEnd).toEqual(28)
    selection = 0
    // needed or test hangs
    iText.abortCursorAnimation()
    // TODO verify and dp
    // iText.selectionStart = 0;
    // iText.selectionEnd = 0;
    // iText.insertChars('hello');
    // assert.equal(selection, 1, 'should fire once on insert multiple chars');
    // assert.equal(iText.selectionStart, 5, 'should be at end of text inserted');
    // assert.equal(iText.selectionEnd, 5, 'should be at end of text inserted');
  })

  test("moving cursor with shift", function (assert) {
    var iText = new fabric.IText("test need some word\nsecond line"),
      selection = 0
    iText.ctx = ctx
    function countSelectionChange() {
      selection++
    }

    iText.on("selection:changed", countSelectionChange)

    iText.enterEditing()
    expect(selection).toEqual(1)
    selection = 0

    iText.selectAll()
    expect(selection).toEqual(1)
    expect(iText.selectionStart).toEqual(0)
    expect(iText.selectionEnd).toEqual(31)
    selection = 0

    iText.selectionStart = 2
    iText.selectionEnd = 2
    iText.selectWord()
    expect(selection).toEqual(1)
    expect(iText.selectionStart).toEqual(0)
    expect(iText.selectionEnd).toEqual(4)
    selection = 0

    iText.selectionStart = 2
    iText.selectionEnd = 2
    iText.selectLine()
    expect(selection).toEqual(1)
    expect(iText.selectionStart).toEqual(0)
    expect(iText.selectionEnd).toEqual(19)
    selection = 0

    iText.selectionStart = 2
    iText.selectionEnd = 2
    iText.moveCursorLeft({ shiftKey: false })
    expect(selection).toEqual(1)
    expect(iText.selectionStart).toEqual(1)
    expect(iText.selectionEnd).toEqual(1)
    selection = 0

    iText.selectionStart = 2
    iText.selectionEnd = 2
    iText.moveCursorRight({ shiftKey: false })
    expect(selection).toEqual(1)
    expect(iText.selectionStart).toEqual(3)
    expect(iText.selectionEnd).toEqual(3)
    selection = 0

    iText.selectionStart = 2
    iText.selectionEnd = 2
    iText.moveCursorDown({ shiftKey: false })
    expect(selection).toEqual(1)
    expect(iText.selectionStart).toEqual(22)
    expect(iText.selectionEnd).toEqual(22)
    iText.moveCursorDown({ shiftKey: false })
    expect(selection).toEqual(2)
    expect(iText.selectionStart).toEqual(31)
    expect(iText.selectionEnd).toEqual(31)
    selection = 0

    iText.selectionStart = 22
    iText.selectionEnd = 22
    iText.moveCursorUp({ shiftKey: false })
    expect(selection).toEqual(1)
    expect(iText.selectionStart).toEqual(2)
    expect(iText.selectionEnd).toEqual(2)
    iText.moveCursorUp({ shiftKey: false })
    expect(selection).toEqual(2)
    expect(iText.selectionStart).toEqual(0)
    expect(iText.selectionEnd).toEqual(0)
    selection = 0

    iText.selectionStart = 0
    iText.selectionEnd = 1
    iText._selectionDirection = "left"
    iText.moveCursorLeft({ shiftKey: true })
    expect(selection).toEqual(0)
    expect(iText.selectionStart).toEqual(0)
    expect(iText.selectionEnd).toEqual(1)
    iText.moveCursorUp({ shiftKey: true })
    expect(selection).toEqual(0)
    expect(iText.selectionStart).toEqual(0)
    expect(iText.selectionEnd).toEqual(1)
    selection = 0

    iText.selectionStart = 30
    iText.selectionEnd = 31
    iText._selectionDirection = "right"
    iText.moveCursorRight({ shiftKey: true })
    expect(selection).toEqual(0)
    expect(iText.selectionStart).toEqual(30)
    expect(iText.selectionEnd).toEqual(31)
    iText.moveCursorDown({ shiftKey: true })
    expect(selection).toEqual(0)
    expect(iText.selectionStart).toEqual(30)
    expect(iText.selectionEnd).toEqual(31)
    selection = 0
    // needed or test hangs
    iText.abortCursorAnimation()
  })
  // test('copy and paste', function(assert) {
  //   var event = { stopPropagation: function(){}, preventDefault: function(){} };
  //   var iText = new fabric.IText('test', { styles: { 0: { 0: { fill: 'red' }, 1: { fill: 'blue' }}}});
  //   iText.enterEditing();
  //   iText.selectionStart = 0;
  //   iText.selectionEnd = 2;
  //   iText.hiddenTextarea.selectionStart = 0
  //   iText.hiddenTextarea.selectionEnd = 2
  //   iText.copy(event);
  //   assert.equal(fabric.copiedText, 'te', 'it copied first 2 characters');
  //   assert.equal(fabric.copiedTextStyle[0], iText.styles[0][0], 'style is referenced');
  //   assert.equal(fabric.copiedTextStyle[1], iText.styles[0][1], 'style is referenced');
  //   iText.selectionStart = 2;
  //   iText.selectionEnd = 2;
  //   iText.hiddenTextarea.value = 'tetest';
  //   iText.paste(event);
  //   assert.equal(iText.text, 'tetest', 'text has been copied');
  //   assert.notEqual(iText.styles[0][0], iText.styles[0][2], 'style is not referenced');
  //   assert.notEqual(iText.styles[0][1], iText.styles[0][3], 'style is not referenced');
  //   assert.deepEqual(iText.styles[0][0], iText.styles[0][2], 'style is copied');
  //   assert.deepEqual(iText.styles[0][1], iText.styles[0][3], 'style is copied');
  // });
  test("copy", function (assert) {
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
    expect(fabric.copiedText).toEqual("te")
    expect(fabric.copiedTextStyle[0].fill).toEqual(iText.styles[0][0].fill)
    expect(fabric.copiedTextStyle[1].fill).toEqual(iText.styles[0][1].fill)
    expect(iText.styles[0][1].fontSize).toEqual(undefined)
    expect(fabric.copiedTextStyle[1].fontSize).toEqual(25)
  })

  test("copy with fabric.disableStyleCopyPaste", function (assert) {
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
    expect(fabric.copiedText).toEqual("te")
    expect(fabric.copiedTextStyle).toEqual(null)
    fabric.disableStyleCopyPaste = false
  })

  test("removeChars", function (assert) {
    var iText = new fabric.IText("test", {
      fontSize: 25,
      styles: { 0: { 0: { fill: "red" }, 1: { fill: "blue" } } }
    })
    expect(typeof iText.removeChars === "function").toBeTruthy()
    iText.removeChars(1, 3)
    expect(iText.text).toEqual("tt")
    expect(iText._text).toEqual(["t", "t"])
    expect(iText.styles[0][1]).toEqual(undefined)
  })

  test("insertChars", function (assert) {
    var iText = new fabric.IText("test")
    expect(typeof iText.insertChars === "function").toBeTruthy()
    iText.insertChars("ab", null, 1)
    expect(iText.text).toEqual("tabest")
    expect(iText._text.join("")).toEqual("tabest")
  })

  test("insertChars can remove chars", function (assert) {
    var iText = new fabric.IText("test")
    iText.insertChars("ab", null, 1, 2)
    expect(iText.text).toEqual("tabst")
    expect(iText._text.join("")).toEqual("tabst")
    var iText = new fabric.IText("test")
    iText.insertChars("ab", null, 1, 4)
    expect(iText.text).toEqual("tab")
    expect(iText._text.join("")).toEqual("tab")
  })

  test(
    "insertChars pick up the style of the character behind and replicates it",
    function (assert) {
      var iText = new fabric.IText("test", {
        fontSize: 25,
        styles: { 0: { 0: { fill: "red" }, 1: { fill: "blue" } } }
      })
      iText.insertChars("ab", null, 1)
      expect(iText.styles[0][0].fill).toEqual("red")
      expect(iText.styles[0][1].fill).toEqual("red")
      expect(iText.styles[0][2].fill).toEqual("red")
      expect(iText.styles[0][3].fill).toEqual("blue")
    }
  )

  test("insertChars removes style from the removed text", function (
    assert
  ) {
    var iText = new fabric.IText("test", {
      fontSize: 25,
      styles: { 0: { 0: { fill: "red" }, 1: { fill: "blue" } } }
    })
    iText.insertChars("ab", null, 1, 2)
    expect(iText.styles[0][0].fill).toEqual("red")
    expect(iText.styles[0][1].fill).toEqual("red")
    expect(iText.styles[0][2].fill).toEqual("red")
    expect(iText.styles[0][3]).toEqual(undefined)
  })

  test("insertChars handles new lines correctly", function (assert) {
    var iText = new fabric.IText("test", {
      fontSize: 25,
      styles: { 0: { 0: { fill: "red" }, 1: { fill: "blue" } } }
    })
    iText.insertChars("ab\n\n", null, 1)
    expect(iText.styles[0][0].fill).toEqual("red")
    expect(iText.styles[0][1].fill).toEqual("red")
    expect(iText.styles[0][2].fill).toEqual("red")
    expect(iText.styles[2][0].fill).toEqual("blue")
  })

  test("insertChars can accept some style for the new text", function (
    assert
  ) {
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
    expect(iText.styles[0][0].fill).toEqual("red")
    expect(iText.styles[0][1].fill).toEqual("col1")
    expect(iText.styles[0][2].fill).toEqual("col2")
    expect(iText.styles[1][0].fill).toEqual("col4")
    expect(iText.styles[2][0].fill).toEqual("col5")
    expect(iText.styles[2][1].fill).toEqual("blue")
  })

  test("missingNewlineOffset", function (assert) {
    var iText = new fabric.IText(
      "由石墨\n分裂的石墨分\n裂\n由石墨分裂由石墨分裂的石\n墨分裂"
    )

    var offset = iText.missingNewlineOffset(0)
    expect(offset).toEqual(1)
  })
})()
