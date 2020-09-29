var canvas = new fabric.Canvas()
describe("fabric.BaseBrush", function () {
  afterEach(function () {
    canvas.cancelRequestedRender()
  })

  test("fabric brush constructor", function () {
    expect(fabric.BaseBrush).toBeTruthy()

    var brush = new fabric.BaseBrush()

    expect(brush instanceof fabric.BaseBrush).toBeTruthy()
    expect(brush.color).toEqual("rgb(0, 0, 0)")
    expect(brush.width).toEqual(1)
  })
  test("fabric pencil brush constructor", function () {
    expect(fabric.PencilBrush).toBeTruthy()
    var brush = new fabric.PencilBrush(canvas)
    expect(brush.canvas).toEqual(canvas)
    expect(brush._points).toEqual([])
  })
  ;[true, false].forEach(function (val) {
    describe(
      "fabric.BaseBrush with canvas.enableRetinaScaling = " + val,
      function () {
        beforeEach(function () {
          canvas.enableRetinaScaling = val
        })
        test("fabric pencil brush draw point", function () {
          var brush = new fabric.PencilBrush(canvas)
          var pointer = canvas.getPointer({ clientX: 10, clientY: 10 })
          brush.onMouseDown(pointer, { e: {} })
          var pathData = brush.convertPointsToSVGPath(brush._points).join("")
          expect(pathData).toEqual("M 9.999 10 L 10.001 10")
        })
        test("fabric pencil brush multiple points", function () {
          var brush = new fabric.PencilBrush(canvas)
          var pointer = canvas.getPointer({ clientX: 10, clientY: 10 })
          brush.onMouseDown(pointer, { e: {} })
          brush.onMouseMove(pointer, { e: {} })
          brush.onMouseMove(pointer, { e: {} })
          brush.onMouseMove(pointer, { e: {} })
          brush.onMouseMove(pointer, { e: {} })
          var pathData = brush.convertPointsToSVGPath(brush._points).join("")
          expect(pathData).toEqual("M 9.999 10 L 10.001 10")
          expect(brush._points.length).toEqual(2)
        })
        test("fabric pencil brush multiple points not discarded", function () {
          var brush = new fabric.PencilBrush(canvas)
          var pointer = canvas.getPointer({ clientX: 10, clientY: 10 })
          var pointer2 = canvas.getPointer({ clientX: 15, clientY: 15 })
          var pointer3 = canvas.getPointer({ clientX: 20, clientY: 20 })
          brush.onMouseDown(pointer, { e: {} })
          brush.onMouseMove(pointer2, { e: {} })
          brush.onMouseMove(pointer3, { e: {} })
          brush.onMouseMove(pointer2, { e: {} })
          brush.onMouseMove(pointer3, { e: {} })
          var pathData = brush.convertPointsToSVGPath(brush._points).join("")
          expect(pathData).toEqual(
            "M 9.999 9.999 Q 10 10 12.5 12.5 Q 15 15 17.5 17.5 Q 20 20 17.5 17.5 Q 15 15 17.5 17.5 L 20.001 20.001"
          )
          expect(brush._points.length).toEqual(6)
        })
        test("fabric pencil brush multiple points not discarded", function () {
          var fireBeforePathCreatedEvent = false
          var firePathCreatedEvent = false
          var added = null
          canvas.on("before:path:created", function () {
            fireBeforePathCreatedEvent = true
          })
          canvas.on("path:created", function (opt) {
            firePathCreatedEvent = true
            added = opt.path
          })
          var brush = new fabric.PencilBrush(canvas)
          var pointer = canvas.getPointer({ clientX: 10, clientY: 10 })
          var pointer2 = canvas.getPointer({ clientX: 15, clientY: 15 })
          var pointer3 = canvas.getPointer({ clientX: 20, clientY: 20 })
          brush.onMouseDown(pointer, { e: {} })
          brush.onMouseMove(pointer2, { e: {} })
          brush.onMouseMove(pointer3, { e: {} })
          brush.onMouseMove(pointer2, { e: {} })
          brush.onMouseMove(pointer3, { e: {} })
          brush.onMouseUp({ e: {} })
          expect(fireBeforePathCreatedEvent).toEqual(true)
          expect(firePathCreatedEvent).toEqual(true)
          expect(added instanceof fabric.Path).toBeTruthy()
          expect(added.path.length).toBeTruthy()
          canvas.off()
        })
      }
    )
  })
})
