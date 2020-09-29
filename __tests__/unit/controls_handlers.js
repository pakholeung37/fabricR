;(function () {
  describe("fabric.controlsUtils", function (hooks) {
    var eventData, transform
    var canvas = new fabric.Canvas(null)
    hooks.beforeEach(function () {
      var target = new fabric.Rect({ width: 100, height: 100 })
      canvas.add(target)
      eventData = {}
      transform = {
        originX: "left",
        originY: "top",
        target: target,
        corner: "mr",
        signX: 1,
        signY: 1
      }
    })
    hooks.afterEach(function () {
      canvas.clear()
    })
    test("changeWidth changes the width", function (assert) {
      expect(transform.target.width).toEqual(100)
      fabric.controlsUtils.changeWidth(eventData, transform, 200, 300)
      expect(transform.target.width).toEqual(199)
      expect(transform.target.left).toEqual(0)
      expect(transform.target.top).toEqual(0)
    })
    test(
      "changeWidth changes the width with centered transform",
      function (assert) {
        transform.originX = "center"
        transform.originY = "center"
        expect(transform.target.width).toEqual(100)
        fabric.controlsUtils.changeWidth(eventData, transform, 200, 300)
        expect(transform.target.width).toEqual(298)
        expect(transform.target.left).toEqual(-99)
        expect(transform.target.top).toEqual(0)
      }
    )
    test("changeWidth changes the width with big strokeWidth", function (
      assert
    ) {
      transform.target.strokeWidth = 15
      fabric.controlsUtils.changeWidth(eventData, transform, 200, 300)
      expect(transform.target.width).toEqual(185)
    })
    test(
      "changeWidth changes the width with big strokeWidth and strokeUniform",
      function (assert) {
        transform.target.strokeWidth = 15
        transform.target.strokeUniform = true
        fabric.controlsUtils.changeWidth(eventData, transform, 200, 300)
        expect(transform.target.width).toEqual(185)
      }
    )
    test(
      "changeWidth changes the width with big strokeWidth and strokeUniform + scaling",
      function (assert) {
        transform.target.strokeWidth = 15
        transform.target.strokeUniform = true
        transform.target.scaleX = 3
        fabric.controlsUtils.changeWidth(eventData, transform, 200, 300)
        expect(Math.floor(transform.target.width)).toEqual(61)
      }
    )
    test(
      "changeWidth changes the width with big strokeWidth + scaling",
      function (assert) {
        transform.target.strokeWidth = 15
        transform.target.scaleX = 3
        fabric.controlsUtils.changeWidth(eventData, transform, 200, 300)
        expect(Math.floor(transform.target.width)).toEqual(51)
      }
    )
    test("scalingXOrSkewingY changes scaleX", function (assert) {
      transform.target.scaleX = 1
      transform.target.strokeWidth = 0
      fabric.controlsUtils.scalingXOrSkewingY(eventData, transform, 200, 300)
      expect(Math.round(transform.target.scaleX)).toEqual(2)
    })
    test("scalingXOrSkewingY changes scaleX to flip", function (assert) {
      transform.target.scaleX = 1
      transform.target.strokeWidth = 0
      var returned = fabric.controlsUtils.scalingXOrSkewingY(
        eventData,
        transform,
        -50,
        300
      )
      expect(transform.target.scaleX).toEqual(0.5)
      expect(transform.target.flipX).toEqual(true)
      expect(returned).toEqual(true)
    })
    test("scalingXOrSkewingY blocks scaleX to flip", function (assert) {
      transform.target.scaleX = 1
      transform.target.strokeWidth = 0
      transform.target.lockScalingFlip = true
      var returned = fabric.controlsUtils.scalingXOrSkewingY(
        eventData,
        transform,
        -50,
        300
      )
      expect(transform.target.scaleX).toEqual(1)
      expect(transform.target.flipX).toEqual(false)
      expect(returned).toEqual(false)
    })
    test("scalingYOrSkewingX changes scaleY", function (assert) {
      transform.target.scaleY = 1
      transform.target.strokeWidth = 0
      fabric.controlsUtils.scalingYOrSkewingX(eventData, transform, 200, 300)
      expect(Math.round(transform.target.scaleY)).toEqual(3)
    })
    test("scalingYOrSkewingX changes scaleY to flip", function (assert) {
      transform.target.scaleY = 1
      transform.target.strokeWidth = 0
      var returned = fabric.controlsUtils.scalingYOrSkewingX(
        eventData,
        transform,
        200,
        -80
      )
      expect(transform.target.scaleY).toEqual(0.8)
      expect(transform.target.flipY).toEqual(true)
      expect(returned).toEqual(true)
    })
    test("scalingYOrSkewingX blocks scaleX to flip", function (assert) {
      transform.target.scaley = 1
      transform.target.strokeWidth = 0
      transform.target.lockScalingFlip = true
      var returned = fabric.controlsUtils.scalingYOrSkewingX(
        eventData,
        transform,
        200,
        -80
      )
      expect(transform.target.scaleY).toEqual(1)
      expect(transform.target.flipY).toEqual(false)
      expect(returned).toEqual(false)
    })
    test("scalingXOrSkewingY changes skewY if shift pressed", function (
      assert
    ) {
      transform.target.scaleX = 1
      transform.target.skewY = 0
      transform.target.strokeWidth = 0
      eventData.shiftKey = true
      fabric.controlsUtils.scalingXOrSkewingY(eventData, transform, 200, 300)
      expect(Math.round(transform.target.skewY)).toEqual(79)
      expect(Math.round(transform.target.scaleX)).toEqual(1)
    })
    test("scalingYOrSkewingX changes skewX if shift pressed", function (
      assert
    ) {
      transform.target.scaleY = 1
      transform.target.skewX = 0
      transform.target.strokeWidth = 0
      eventData.shiftKey = true
      fabric.controlsUtils.scalingYOrSkewingX(eventData, transform, 200, 300)
      expect(Math.round(transform.target.skewX)).toEqual(72)
      expect(Math.round(transform.target.scaleY)).toEqual(1)
    })
    test(
      "scalingXOrSkewingY will fire events on canvas and target",
      function (assert) {
        var done = assert.async()
        transform.target.scaleX = 1
        transform.target.canvas.on("object:scaling", function (options) {
          expect(options.target).toEqual(transform.target)
        })
        transform.target.on("scaling", function (options) {
          expect(options).toEqual({
            e: eventData,
            transform: transform,
            pointer: {
              x: 200,
              y: 300
            }
          })
          done()
        })
        fabric.controlsUtils.scalingXOrSkewingY(eventData, transform, 200, 300)
      }
    )
    test("wrapWithFixedAnchor", function (assert) {
      var target = transform.target
      transform.originX = "center"
      transform.originY = "center"
      target.strokeWidth = 0
      var actionHandler = function (eventData, transform) {
        var target = transform.target
        target.scaleX = 5
        target.scaleY = 5
      }
      var center = target.getCenterPoint()
      expect(center.x).toEqual(50)
      expect(center.y).toEqual(50)
      actionHandler({}, transform)
      var center2 = target.getCenterPoint()
      expect(center2.x).toEqual(250)
      expect(center2.y).toEqual(250)
      target.top = 0
      target.left = 0
      target.scaleX = 1
      target.scaleY = 1
      var center3 = target.getCenterPoint()
      expect(center3.x).toEqual(50)
      expect(center3.y).toEqual(50)
      fabric.controlsUtils.wrapWithFixedAnchor(actionHandler)({}, transform)
      var center4 = target.getCenterPoint()
      expect(target.scaleX).toEqual(5)
      expect(target.scaleY).toEqual(5)
      expect(center4.x).toEqual(50)
      expect(center4.y).toEqual(50)
    })
  })
})()
