;(function () {
  var canvas = (this.canvas = new fabric.StaticCanvas(null, {
    enableRetinaScaling: false
  }))
  describe("fabric.ObjectGeometry")

  test("intersectsWithRectangle", function (assert) {
    var cObj = new fabric.Object({ left: 50, top: 50, width: 100, height: 100 })
    cObj.setCoords()
    expect(typeof cObj.intersectsWithRect === "function").toBeTruthy()

    var point1 = new fabric.Point(110, 100),
      point2 = new fabric.Point(210, 200),
      point3 = new fabric.Point(0, 0),
      point4 = new fabric.Point(10, 10)

    expect(cObj.intersectsWithRect(point1, point2)).toBeTruthy()
    expect(!cObj.intersectsWithRect(point3, point4)).toBeTruthy()
  })

  test("intersectsWithRectangle absolute", function (assert) {
    var cObj = new fabric.Rect({ left: 10, top: 10, width: 20, height: 20 })
    var absolute = true
    canvas.add(cObj)
    canvas.viewportTransform = [2, 0, 0, 2, 0, 0]
    cObj.setCoords()
    canvas.calcViewportBoundaries()

    var point1 = new fabric.Point(5, 5),
      point2 = new fabric.Point(15, 15),
      point3 = new fabric.Point(25, 25),
      point4 = new fabric.Point(35, 35)

    expect(!cObj.intersectsWithRect(point1, point2)).toBeTruthy()
    expect(!cObj.intersectsWithRect(point3, point4)).toBeTruthy()
    expect(cObj.intersectsWithRect(point1, point2, absolute)).toBeTruthy()
    expect(cObj.intersectsWithRect(point3, point4, absolute)).toBeTruthy()
  })

  test("intersectsWithObject", function (assert) {
    var cObj = new fabric.Object({ left: 50, top: 50, width: 100, height: 100 })
    cObj.setCoords()
    expect(typeof cObj.intersectsWithObject === "function").toBeTruthy()

    var cObj2 = new fabric.Object({
      left: -150,
      top: -150,
      width: 200,
      height: 200
    })
    cObj2.setCoords()
    expect(cObj.intersectsWithObject(cObj2)).toBeTruthy()
    expect(cObj2.intersectsWithObject(cObj)).toBeTruthy()

    var cObj3 = new fabric.Object({
      left: 392.5,
      top: 339.5,
      width: 13,
      height: 33
    })
    cObj3.setCoords()
    expect(!cObj.intersectsWithObject(cObj3)).toBeTruthy()
    expect(!cObj3.intersectsWithObject(cObj)).toBeTruthy()

    var cObj4 = new fabric.Object({ left: 0, top: 0, width: 200, height: 200 })
    cObj4.setCoords()
    expect(cObj4.intersectsWithObject(cObj)).toBeTruthy()
    expect(cObj.intersectsWithObject(cObj4)).toBeTruthy()
  })

  test("isContainedWithinRect", function (assert) {
    var cObj = new fabric.Object({ left: 20, top: 20, width: 10, height: 10 })
    cObj.setCoords()
    expect(typeof cObj.isContainedWithinRect === "function").toBeTruthy()

    // fully contained
    expect(cObj.isContainedWithinRect(
      new fabric.Point(10, 10),
      new fabric.Point(100, 100)
    )).toBeTruthy()
    // only intersects
    expect(!cObj.isContainedWithinRect(
      new fabric.Point(10, 10),
      new fabric.Point(25, 25)
    )).toBeTruthy()
    // doesn't intersect
    expect(!cObj.isContainedWithinRect(
      new fabric.Point(100, 100),
      new fabric.Point(110, 110)
    )).toBeTruthy()
  })

  test("isContainedWithinRect absolute", function (assert) {
    var cObj = new fabric.Rect({ left: 20, top: 20, width: 10, height: 10 })
    var absolute = true
    canvas.add(cObj)
    canvas.viewportTransform = [2, 0, 0, 2, 0, 0]
    cObj.setCoords()
    canvas.calcViewportBoundaries()
    expect(typeof cObj.isContainedWithinRect === "function").toBeTruthy()

    // fully contained
    expect(cObj.isContainedWithinRect(
      new fabric.Point(10, 10),
      new fabric.Point(100, 100),
      absolute
    )).toBeTruthy()
    // only intersects
    expect(!cObj.isContainedWithinRect(
      new fabric.Point(10, 10),
      new fabric.Point(25, 25),
      absolute
    )).toBeTruthy()
    // doesn't intersect
    expect(!cObj.isContainedWithinRect(
      new fabric.Point(100, 100),
      new fabric.Point(110, 110),
      absolute
    )).toBeTruthy()
  })

  test("intersectsWithRect", function (assert) {
    var object = new fabric.Object({
        left: 0,
        top: 0,
        width: 40,
        height: 50,
        angle: 160
      }),
      point1 = new fabric.Point(-10, -10),
      point2 = new fabric.Point(20, 30),
      point3 = new fabric.Point(10, 15),
      point4 = new fabric.Point(30, 35),
      point5 = new fabric.Point(50, 60),
      point6 = new fabric.Point(70, 80)

    object.setCoords()

    // object and area intersects
    expect(object.intersectsWithRect(point1, point2)).toEqual(true)
    // area is contained in object (no intersection)
    expect(object.intersectsWithRect(point3, point4)).toEqual(false)
    // area is outside of object (no intersection)
    expect(object.intersectsWithRect(point5, point6)).toEqual(false)
  })

  test("intersectsWithObject", function (assert) {
    var object = new fabric.Object({
        left: 20,
        top: 30,
        width: 40,
        height: 50,
        angle: 230,
        strokeWidth: 0
      }),
      object1 = new fabric.Object({
        left: 20,
        top: 30,
        width: 60,
        height: 30,
        angle: 10,
        strokeWidth: 0
      }),
      object2 = new fabric.Object({
        left: 25,
        top: 35,
        width: 20,
        height: 20,
        angle: 50,
        strokeWidth: 0
      }),
      object3 = new fabric.Object({
        left: 50,
        top: 50,
        width: 20,
        height: 20,
        angle: 0,
        strokeWidth: 0
      })

    object.set({ originX: "center", originY: "center" }).setCoords()
    object1.set({ originX: "center", originY: "center" }).setCoords()
    object2.set({ originX: "center", originY: "center" }).setCoords()
    object3.set({ originX: "center", originY: "center" }).setCoords()

    expect(object.intersectsWithObject(object1)).toEqual(true)
    expect(object.intersectsWithObject(object2)).toEqual(true)
    expect(object.intersectsWithObject(object3)).toEqual(false)
  })

  test("isContainedWithinObject", function (assert) {
    var object = new fabric.Object({
        left: 0,
        top: 0,
        width: 40,
        height: 40,
        angle: 0
      }),
      object1 = new fabric.Object({
        left: 1,
        top: 1,
        width: 38,
        height: 38,
        angle: 0
      }),
      object2 = new fabric.Object({
        left: 20,
        top: 20,
        width: 40,
        height: 40,
        angle: 0
      }),
      object3 = new fabric.Object({
        left: 50,
        top: 50,
        width: 40,
        height: 40,
        angle: 0
      })

    object.setCoords()
    object1.setCoords()
    object2.setCoords()
    object3.setCoords()

    expect(object1.isContainedWithinObject(object)).toEqual(true)
    expect(object2.isContainedWithinObject(object)).toEqual(false)
    expect(object3.isContainedWithinObject(object)).toEqual(false)
    object1.angle = 45
    object1.setCoords()
    expect(object1.isContainedWithinObject(object)).toEqual(false)

    var rect1 = new fabric.Rect({
      width: 50,
      height: 50,
      left: 50,
      top: 50
    })

    var rect2 = new fabric.Rect({
      width: 100,
      height: 100,
      left: 100,
      top: 0,
      angle: 45
    })
    rect1.setCoords()
    rect2.setCoords()
    expect(rect1.isContainedWithinObject(rect2)).toEqual(false)
  })

  test("isContainedWithinRect", function (assert) {
    var object = new fabric.Object({
        left: 40,
        top: 40,
        width: 40,
        height: 50,
        angle: 160
      }),
      point1 = new fabric.Point(0, 0),
      point2 = new fabric.Point(80, 80),
      point3 = new fabric.Point(0, 0),
      point4 = new fabric.Point(80, 60),
      point5 = new fabric.Point(80, 80),
      point6 = new fabric.Point(90, 90)

    object.set({ originX: "center", originY: "center" }).setCoords()

    // area is contained in object (no intersection)
    expect(object.isContainedWithinRect(point1, point2)).toEqual(true)
    // object and area intersects
    expect(object.isContainedWithinRect(point3, point4)).toEqual(false)
    // area is outside of object (no intersection)
    expect(object.isContainedWithinRect(point5, point6)).toEqual(false)
  })

  test("isContainedWithinRect", function (assert) {
    var object = new fabric.Object({
        left: 40,
        top: 40,
        width: 40,
        height: 50,
        angle: 160
      }),
      point1 = new fabric.Point(0, 0),
      point2 = new fabric.Point(80, 80),
      point3 = new fabric.Point(0, 0),
      point4 = new fabric.Point(80, 60),
      point5 = new fabric.Point(80, 80),
      point6 = new fabric.Point(90, 90)

    object.set({ originX: "center", originY: "center" }).setCoords()

    // area is contained in object (no intersection)
    expect(object.isContainedWithinRect(point1, point2)).toEqual(true)
    // object and area intersects
    expect(object.isContainedWithinRect(point3, point4)).toEqual(false)
    // area is outside of object (no intersection)
    expect(object.isContainedWithinRect(point5, point6)).toEqual(false)
  })

  test("containsPoint", function (assert) {
    var object = new fabric.Object({
        left: 40,
        top: 40,
        width: 40,
        height: 50,
        angle: 160,
        strokeWidth: 0
      }),
      point1 = new fabric.Point(30, 30),
      point2 = new fabric.Point(60, 30),
      point3 = new fabric.Point(45, 65),
      point4 = new fabric.Point(15, 40),
      point5 = new fabric.Point(30, 15)

    object.set({ originX: "center", originY: "center" }).setCoords()

    // point1 is contained in object
    expect(object.containsPoint(point1)).toEqual(true)
    // point2 is outside of object (right)
    expect(object.containsPoint(point2)).toEqual(false)
    // point3 is outside of object (bottom)
    expect(object.containsPoint(point3)).toEqual(false)
    // point4 is outside of object (left)
    expect(object.containsPoint(point4)).toEqual(false)
    // point5 is outside of object (top)
    expect(object.containsPoint(point5)).toEqual(false)
  })

  test("containsPoint with padding", function (assert) {
    var object = new fabric.Object({
        left: 40,
        top: 40,
        width: 40,
        height: 50,
        angle: 160,
        padding: 5
      }),
      point1 = new fabric.Point(30, 30),
      point2 = new fabric.Point(10, 20),
      point3 = new fabric.Point(65, 30),
      point4 = new fabric.Point(45, 75),
      point5 = new fabric.Point(10, 40),
      point6 = new fabric.Point(30, 5)

    object.set({ originX: "center", originY: "center" }).setCoords()

    // point1 is contained in object
    expect(object.containsPoint(point1)).toEqual(true)
    // point2 is contained in object (padding area)
    expect(object.containsPoint(point2)).toEqual(true)
    // point2 is outside of object (right)
    expect(object.containsPoint(point3)).toEqual(false)
    // point3 is outside of object (bottom)
    expect(object.containsPoint(point4)).toEqual(false)
    // point4 is outside of object (left)
    expect(object.containsPoint(point5)).toEqual(false)
    // point5 is outside of object (top)
    expect(object.containsPoint(point6)).toEqual(false)
  })

  test("setCoords", function (assert) {
    var cObj = new fabric.Object({
      left: 150,
      top: 150,
      width: 100,
      height: 100,
      strokeWidth: 0
    })
    expect(typeof cObj.setCoords === "function").toBeTruthy()
    expect(cObj.setCoords()).toEqual(cObj)

    expect(cObj.oCoords.tl.x).toEqual(150)
    expect(cObj.oCoords.tl.y).toEqual(150)
    expect(cObj.oCoords.tr.x).toEqual(250)
    expect(cObj.oCoords.tr.y).toEqual(150)
    expect(cObj.oCoords.bl.x).toEqual(150)
    expect(cObj.oCoords.bl.y).toEqual(250)
    expect(cObj.oCoords.br.x).toEqual(250)
    expect(cObj.oCoords.br.y).toEqual(250)
    expect(cObj.oCoords.mtr.x).toEqual(200)
    expect(cObj.oCoords.mtr.y).toEqual(110)

    cObj.set("left", 250).set("top", 250)

    // coords should still correspond to initial one, even after invoking `set`
    expect(cObj.oCoords.tl.x).toEqual(150)
    expect(cObj.oCoords.tl.y).toEqual(150)
    expect(cObj.oCoords.tr.x).toEqual(250)
    expect(cObj.oCoords.tr.y).toEqual(150)
    expect(cObj.oCoords.bl.x).toEqual(150)
    expect(cObj.oCoords.bl.y).toEqual(250)
    expect(cObj.oCoords.br.x).toEqual(250)
    expect(cObj.oCoords.br.y).toEqual(250)
    expect(cObj.oCoords.mtr.x).toEqual(200)
    expect(cObj.oCoords.mtr.y).toEqual(110)

    // recalculate coords
    cObj.setCoords()

    // check that coords are now updated
    expect(cObj.oCoords.tl.x).toEqual(250)
    expect(cObj.oCoords.tl.y).toEqual(250)
    expect(cObj.oCoords.tr.x).toEqual(350)
    expect(cObj.oCoords.tr.y).toEqual(250)
    expect(cObj.oCoords.bl.x).toEqual(250)
    expect(cObj.oCoords.bl.y).toEqual(350)
    expect(cObj.oCoords.br.x).toEqual(350)
    expect(cObj.oCoords.br.y).toEqual(350)
    expect(cObj.oCoords.mtr.x).toEqual(300)
    expect(cObj.oCoords.mtr.y).toEqual(210)

    cObj.set("padding", 25)
    cObj.setCoords()
    // coords should still correspond to initial one, even after invoking `set`
    expect(cObj.oCoords.tl.x).toEqual(225)
    expect(cObj.oCoords.tl.y).toEqual(225)
    expect(cObj.oCoords.tr.x).toEqual(375)
    expect(cObj.oCoords.tr.y).toEqual(225)
    expect(cObj.oCoords.bl.x).toEqual(225)
    expect(cObj.oCoords.bl.y).toEqual(375)
    expect(cObj.oCoords.br.x).toEqual(375)
    expect(cObj.oCoords.br.y).toEqual(375)
    expect(cObj.oCoords.mtr.x).toEqual(300)
    expect(cObj.oCoords.mtr.y).toEqual(185)
  })

  test("setCoords and aCoords", function (assert) {
    var cObj = new fabric.Object({
      left: 150,
      top: 150,
      width: 100,
      height: 100,
      strokeWidth: 0
    })
    cObj.canvas = {
      viewportTransform: [2, 0, 0, 2, 0, 0]
    }
    cObj.setCoords()

    expect(cObj.oCoords.tl.x).toEqual(300)
    expect(cObj.oCoords.tl.y).toEqual(300)
    expect(cObj.oCoords.tr.x).toEqual(500)
    expect(cObj.oCoords.tr.y).toEqual(300)
    expect(cObj.oCoords.bl.x).toEqual(300)
    expect(cObj.oCoords.bl.y).toEqual(500)
    expect(cObj.oCoords.br.x).toEqual(500)
    expect(cObj.oCoords.br.y).toEqual(500)
    expect(cObj.oCoords.mtr.x).toEqual(400)
    expect(cObj.oCoords.mtr.y).toEqual(260)

    expect(cObj.aCoords.tl.x).toEqual(150)
    expect(cObj.aCoords.tl.y).toEqual(150)
    expect(cObj.aCoords.tr.x).toEqual(250)
    expect(cObj.aCoords.tr.y).toEqual(150)
    expect(cObj.aCoords.bl.x).toEqual(150)
    expect(cObj.aCoords.bl.y).toEqual(250)
    expect(cObj.aCoords.br.x).toEqual(250)
    expect(cObj.aCoords.br.y).toEqual(250)
  })

  test("isOnScreen", function (assert) {
    var cObj = new fabric.Object({
      left: 50,
      top: 50,
      width: 100,
      height: 100,
      strokeWidth: 0
    })
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
    cObj.canvas = canvas
    cObj.setCoords()
    expect(cObj.isOnScreen()).toBeTruthy()
    cObj.top = 1000
    expect(cObj.isOnScreen()).toBeTruthy()
    expect(!cObj.isOnScreen(true)).toBeTruthy()
    cObj.setCoords()
    expect(!cObj.isOnScreen()).toBeTruthy()
    canvas.setZoom(0.1)
    cObj.setCoords()
    expect(cObj.isOnScreen()).toBeTruthy()
  })

  test("transformMatrixKey depends from properties", function (assert) {
    var cObj = new fabric.Object({
      left: -10,
      top: -10,
      width: 30,
      height: 40,
      strokeWidth: 0
    })
    var key1 = cObj.transformMatrixKey()
    cObj.left = 5
    var key2 = cObj.transformMatrixKey()
    cObj.left = -10
    var key3 = cObj.transformMatrixKey()
    cObj.width = 5
    var key4 = cObj.transformMatrixKey()
    expect(key1).not.toEqual(key2)
    expect(key1).toEqual(key3)
    expect(key4).not.toEqual(key2)
    expect(key4).not.toEqual(key1)
    expect(key4).not.toEqual(key3)
  })

  test("transformMatrixKey depends from originX/originY", function (
    assert
  ) {
    var cObj = new fabric.Object({
      left: -10,
      top: -10,
      width: 30,
      height: 40,
      strokeWidth: 0,
      originX: "left",
      originY: "top"
    })
    var key1 = cObj.transformMatrixKey()
    cObj.originX = "center"
    var key2 = cObj.transformMatrixKey()
    cObj.originY = "center"
    var key3 = cObj.transformMatrixKey()
    expect(key1).not.toEqual(key2)
    expect(key1).not.toEqual(key3)
    expect(key2).not.toEqual(key3)
  })

  test("isOnScreen with object that include canvas", function (assert) {
    var cObj = new fabric.Object({
      left: -10,
      top: -10,
      width: canvas.getWidth() + 100,
      height: canvas.getHeight(),
      strokeWidth: 0
    })
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
    cObj.canvas = canvas
    cObj.setCoords()
    expect(cObj.isOnScreen()).toEqual(true)
    cObj.top = -1000
    cObj.left = -1000
    cObj.setCoords()
    expect(cObj.isOnScreen()).toEqual(false)
  })

  test(
    "isOnScreen with object that is in top left corner of canvas",
    function (assert) {
      var cObj = new fabric.Rect({
        left: -46.56,
        top: -9.23,
        width: 50,
        height: 50,
        angle: 314.57
      })
      canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
      cObj.canvas = canvas
      cObj.setCoords()
      expect(cObj.isOnScreen()).toBeTruthy()
      cObj.top -= 20
      cObj.left -= 20
      cObj.setCoords()
      expect(!cObj.isOnScreen()).toBeTruthy()
    }
  )

  test("calcTransformMatrix with no group", function (assert) {
    var cObj = new fabric.Object({ width: 10, height: 15, strokeWidth: 0 })
    expect(typeof cObj.calcTransformMatrix === "function").toBeTruthy()
    cObj.top = 0
    cObj.left = 0
    cObj.scaleX = 2
    cObj.scaleY = 3
    expect(cObj.calcTransformMatrix()).toEqual(cObj.calcOwnMatrix())
  })

  test("calcOwnMatrix", function (assert) {
    var cObj = new fabric.Object({ width: 10, height: 15, strokeWidth: 0 })
    expect(typeof cObj.calcOwnMatrix === "function").toBeTruthy()
    cObj.top = 0
    cObj.left = 0
    expect(cObj.calcOwnMatrix()).toEqual([1, 0, 0, 1, 5, 7.5])
    cObj.scaleX = 2
    cObj.scaleY = 3
    expect(cObj.calcOwnMatrix()).toEqual([2, 0, 0, 3, 10, 22.5])
    cObj.skewX = 45
    expect(cObj.calcOwnMatrix()).toEqual([2, 0, 1.9999999999999998, 3, 25, 22.5])
    cObj.skewY = 30
    expect(cObj.calcOwnMatrix()).toEqual([
      3.1547005383792515,
      1.7320508075688772,
      1.9999999999999998,
      3,
      30.773502691896255,
      31.160254037844386
    ])
    cObj.angle = 38
    expect(cObj.calcOwnMatrix()).toEqual([
      1.4195809931249126,
      3.3071022498267006,
      -0.2709629187635314,
      3.595355211471482,
      5.065683074898075,
      43.50067533516962
    ])
    cObj.flipX = true
    expect(cObj.calcOwnMatrix()).toEqual([
      -3.552294904178618,
      -0.5773529255117364,
      -3.4230059331904186,
      1.1327093101688495,
      5.065683074898075,
      43.50067533516962
    ])
    cObj.flipY = true
    expect(cObj.calcOwnMatrix()).toEqual([
      -1.4195809931249126,
      -3.3071022498267006,
      0.2709629187635314,
      -3.595355211471482,
      5.065683074898075,
      43.50067533516962
    ])
  })

  test("_calcDimensionsTransformMatrix", function (assert) {
    var cObj = new fabric.Object({
      width: 10,
      height: 15,
      strokeWidth: 0,
      scaleX: 2,
      scaleY: 3,
      skewY: 10
    })
    expect(typeof cObj._calcDimensionsTransformMatrix === "function").toBeTruthy()
    var matrix = cObj._calcDimensionsTransformMatrix()
    var expected = [2, 0, 0, 3, 0, 0]
    expect(matrix).toEqual(expected)
  })

  test("_calcDimensionsTransformMatrix with flipping", function (assert) {
    var cObj = new fabric.Object({
      width: 10,
      height: 15,
      strokeWidth: 0,
      scaleX: 2,
      scaleY: 3,
      skewY: 10,
      flipX: true
    })
    expect(typeof cObj._calcDimensionsTransformMatrix === "function").toBeTruthy()
    var matrix = cObj._calcDimensionsTransformMatrix(0, 0, false)
    var expected = [2, 0, 0, 3, 0, 0]
    expect(matrix).toEqual(expected)
    var matrix2 = cObj._calcDimensionsTransformMatrix(0, 0, true)
    var expected = [-2, 0, 0, 3, 0, 0]
    expect(matrix2).toEqual(expected)
  })

  test("_calcRotateMatrix", function (assert) {
    var cObj = new fabric.Object({
      width: 10,
      height: 15,
      strokeWidth: 0,
      angle: 90
    })
    expect(typeof cObj._calcRotateMatrix === "function").toBeTruthy()
    var matrix = cObj._calcRotateMatrix()
    var expected = [0, 1, -1, 0, 0, 0]
    expect(matrix).toEqual(expected)
  })

  test("_calcTranslateMatrix", function (assert) {
    var cObj = new fabric.Object({
      top: 5,
      width: 10,
      height: 15,
      strokeWidth: 0,
      angle: 90
    })
    expect(typeof cObj._calcTranslateMatrix === "function").toBeTruthy()
    var matrix = cObj._calcTranslateMatrix()
    var expected = [1, 0, 0, 1, -7.5, 10]
    expect(matrix).toEqual(expected)
  })

  test("scaleToWidth", function (assert) {
    var cObj = new fabric.Object({ width: 560, strokeWidth: 0 })
    expect(typeof cObj.scaleToWidth === "function").toBeTruthy()
    expect(cObj.scaleToWidth(100)).toEqual(cObj)
    expect(cObj.getScaledWidth()).toEqual(100)
    expect(cObj.get("scaleX")).toEqual(100 / 560)
  })

  test("scaleToWidth with zoom", function (assert) {
    var cObj = new fabric.Object({ width: 560, strokeWidth: 0 })
    cObj.canvas = {
      viewportTransform: [2, 0, 0, 2, 0, 0]
    }
    expect(cObj.scaleToWidth(100, true)).toEqual(cObj)
    expect(cObj.getScaledWidth()).toEqual(100)
    expect(cObj.get("scaleX")).toEqual(100 / 560)
    expect(cObj.scaleToWidth(100)).toEqual(cObj)
    expect(cObj.getScaledWidth()).toEqual(50)
    expect(cObj.get("scaleX")).toEqual(100 / 560 / 2)
  })

  test("scaleToHeight", function (assert) {
    var cObj = new fabric.Object({ height: 560, strokeWidth: 0 })
    expect(typeof cObj.scaleToHeight === "function").toBeTruthy()
    expect(cObj.scaleToHeight(100)).toEqual(cObj)
    expect(cObj.getScaledHeight()).toEqual(100)
    expect(cObj.get("scaleY")).toEqual(100 / 560)
  })

  test("scaleToHeight with zoom", function (assert) {
    var cObj = new fabric.Object({ height: 560, strokeWidth: 0 })
    cObj.canvas = {
      viewportTransform: [2, 0, 0, 2, 0, 0]
    }
    expect(cObj.scaleToHeight(100, true)).toEqual(cObj)
    expect(cObj.getScaledHeight()).toEqual(100)
    expect(cObj.get("scaleY")).toEqual(100 / 560)
    expect(cObj.scaleToHeight(100)).toEqual(cObj)
    expect(cObj.getScaledHeight()).toEqual(50)
    expect(cObj.get("scaleY")).toEqual(100 / 560 / 2)
  })

  test("scaleToWidth on rotated object", function (assert) {
    var obj = new fabric.Object({ height: 100, width: 100, strokeWidth: 0 })
    obj.rotate(45)
    obj.scaleToWidth(200)
    expect(Math.round(obj.getBoundingRect().width)).toEqual(200)
  })

  test("scaleToHeight on rotated object", function (assert) {
    var obj = new fabric.Object({ height: 100, width: 100, strokeWidth: 0 })
    obj.rotate(45)
    obj.scaleToHeight(300)
    expect(Math.round(obj.getBoundingRect().height)).toEqual(300)
  })

  test("getBoundingRect with absolute coords", function (assert) {
    var cObj = new fabric.Object({
        strokeWidth: 0,
        width: 10,
        height: 10,
        top: 6,
        left: 5
      }),
      boundingRect

    cObj.setCoords()
    boundingRect = cObj.getBoundingRect()
    expect(boundingRect.left).toEqual(5)
    expect(boundingRect.width).toEqual(10)
    expect(boundingRect.height).toEqual(10)
    cObj.canvas = {
      viewportTransform: [2, 0, 0, 2, 0, 0]
    }
    cObj.setCoords()
    boundingRect = cObj.getBoundingRect()
    expect(boundingRect.left).toEqual(10)
    expect(boundingRect.width).toEqual(20)
    expect(boundingRect.height).toEqual(20)
    boundingRect = cObj.getBoundingRect(true)
    expect(boundingRect.left).toEqual(5)
    expect(boundingRect.width).toEqual(10)
    expect(boundingRect.height).toEqual(10)
  })

  test("getBoundingRect", function (assert) {
    var cObj = new fabric.Object({ strokeWidth: 0 }),
      boundingRect
    expect(typeof cObj.getBoundingRect === "function").toBeTruthy()

    cObj.setCoords()
    boundingRect = cObj.getBoundingRect()
    expect(boundingRect.left).toEqual(0)
    expect(boundingRect.top).toEqual(0)
    expect(boundingRect.width).toEqual(0)
    expect(boundingRect.height).toEqual(0)
    cObj.set("width", 123).setCoords()
    boundingRect = cObj.getBoundingRect()
    expect(boundingRect.left).toEqual(0)
    expect(boundingRect.top).toEqual(0)
    expect(boundingRect.width).toEqual(123)
    expect(boundingRect.height).toEqual(0)

    cObj.set("height", 167).setCoords()
    boundingRect = cObj.getBoundingRect()
    expect(boundingRect.left).toEqual(0)
    expect(Math.abs(boundingRect.top).toFixed(13)).toEqual(0)
    expect(boundingRect.width).toEqual(123)
    expect(boundingRect.height).toEqual(167)

    cObj.scale(2).setCoords()
    boundingRect = cObj.getBoundingRect()
    expect(boundingRect.left).toEqual(0)
    expect(Math.abs(boundingRect.top).toFixed(13)).toEqual(0)
    expect(boundingRect.width).toEqual(246)
    expect(boundingRect.height).toEqual(334)
  })

  test("getBoundingRectWithStroke", function (assert) {
    var cObj = new fabric.Object(),
      boundingRect
    expect(typeof cObj.getBoundingRect === "function").toBeTruthy()

    cObj.setCoords()
    boundingRect = cObj.getBoundingRect()
    expect(boundingRect.left.toFixed(2)).toEqual(0)
    expect(boundingRect.top.toFixed(2)).toEqual(0)
    expect(boundingRect.width.toFixed(2)).toEqual(1)
    expect(boundingRect.height.toFixed(2)).toEqual(1)

    cObj.set("width", 123).setCoords()
    boundingRect = cObj.getBoundingRect()
    expect(boundingRect.left.toFixed(2)).toEqual(0)
    expect(boundingRect.top.toFixed(2)).toEqual(0)
    expect(boundingRect.width.toFixed(2)).toEqual(124)
    expect(boundingRect.height.toFixed(2)).toEqual(1)

    cObj.set("height", 167).setCoords()
    boundingRect = cObj.getBoundingRect()
    expect(boundingRect.left.toFixed(2)).toEqual(0)
    expect(boundingRect.top.toFixed(2)).toEqual(0)
    expect(boundingRect.width.toFixed(2)).toEqual(124)
    expect(boundingRect.height.toFixed(2)).toEqual(168)

    cObj.scale(2).setCoords()
    boundingRect = cObj.getBoundingRect()
    expect(boundingRect.left.toFixed(2)).toEqual(0)
    expect(boundingRect.top.toFixed(2)).toEqual(0)
    expect(boundingRect.width.toFixed(2)).toEqual(248)
    expect(boundingRect.height.toFixed(2)).toEqual(336)
  })

  test("getScaledWidth", function (assert) {
    var cObj = new fabric.Object()
    expect(typeof cObj.getScaledWidth === "function").toBeTruthy()
    expect(cObj.getScaledWidth()).toEqual(0 + cObj.strokeWidth)
    cObj.set("width", 123)
    expect(cObj.getScaledWidth()).toEqual(123 + cObj.strokeWidth)
    cObj.set("scaleX", 2)
    expect(cObj.getScaledWidth()).toEqual(246 + cObj.strokeWidth * 2)
  })

  test("getScaledHeight", function (assert) {
    var cObj = new fabric.Object({ strokeWidth: 0 })
    //  assert.ok(typeof cObj.getHeight === 'function');
    expect(cObj.getScaledHeight()).toEqual(0)
    cObj.set("height", 123)
    expect(cObj.getScaledHeight()).toEqual(123)
    cObj.set("scaleY", 2)
    expect(cObj.getScaledHeight()).toEqual(246)
  })

  test("scale", function (assert) {
    var cObj = new fabric.Object({ width: 10, height: 15, strokeWidth: 0 })
    expect(typeof cObj.scale === "function").toBeTruthy()
  })

  test("_constrainScale", function (assert) {
    var cObj = new fabric.Object({ width: 10, height: 15, strokeWidth: 0 })
    expect(typeof cObj._constrainScale === "function").toBeTruthy()
    cObj.set("scaleX", 0)
    expect(cObj.scaleX).toEqual(0.0001)
    cObj.set("scaleY", 0)
    expect(cObj.scaleY).toEqual(0.0001)
    cObj.minScaleLimit = 3
    cObj.set("scaleY", 0)
    expect(cObj.scaleY).toEqual(3)
  })

  test(
    "getCoords return coordinate of object in canvas coordinate.",
    function (assert) {
      var cObj = new fabric.Object({
        width: 10,
        height: 15,
        strokeWidth: 2,
        top: 30,
        left: 40
      })
      var coords = cObj.getCoords()
      expect(coords[0]).toEqual(new fabric.Point(40, 30))
      expect(coords[1]).toEqual(new fabric.Point(52, 30))
      expect(coords[2]).toEqual(new fabric.Point(52, 47))
      expect(coords[3]).toEqual(new fabric.Point(40, 47))

      cObj.left += 5
      coords = cObj.getCoords()
      expect(coords[0]).toEqual(new fabric.Point(40, 30))
      expect(coords[1]).toEqual(new fabric.Point(52, 30))
      expect(coords[2]).toEqual(new fabric.Point(52, 47))
      expect(coords[3]).toEqual(new fabric.Point(40, 47))

      coords = cObj.getCoords(false, true)
      expect(coords[0]).toEqual(new fabric.Point(45, 30))
      expect(coords[1]).toEqual(new fabric.Point(57, 30))
      expect(coords[2]).toEqual(new fabric.Point(57, 47))
      expect(coords[3]).toEqual(new fabric.Point(45, 47))
    }
  )

  test(
    "getCoords return coordinate of object in zoomed canvas coordinate.",
    function (assert) {
      var cObj = new fabric.Object({
        width: 10,
        height: 15,
        strokeWidth: 2,
        top: 30,
        left: 40
      })
      cObj.canvas = {
        viewportTransform: [2, 0, 0, 2, 35, 35]
      }
      var coords = cObj.getCoords()
      expect(coords[0]).toEqual(new fabric.Point(115, 95))
      expect(coords[1]).toEqual(new fabric.Point(139, 95))
      expect(coords[2]).toEqual(new fabric.Point(139, 129))
      expect(coords[3]).toEqual(new fabric.Point(115, 129))
    }
  )

  test(
    "getCoords return coordinate of object in absolute coordinates and ignore canvas zoom",
    function (assert) {
      var cObj = new fabric.Object({
        width: 10,
        height: 15,
        strokeWidth: 2,
        top: 30,
        left: 40
      })
      cObj.canvas = {
        viewportTransform: [2, 0, 0, 2, 35, 35]
      }
      var coords = cObj.getCoords(true)
      expect(coords[0]).toEqual(new fabric.Point(40, 30))
      expect(coords[1]).toEqual(new fabric.Point(52, 30))
      expect(coords[2]).toEqual(new fabric.Point(52, 47))
      expect(coords[3]).toEqual(new fabric.Point(40, 47))
    }
  )

  test("getCoords absolute with angle", function (assert) {
    var cObj = new fabric.Object({
      width: 10,
      height: 15,
      strokeWidth: 2,
      top: 30,
      left: 40,
      angle: 20
    })
    cObj.canvas = {
      viewportTransform: [2, 0, 0, 2, 35, 25]
    }
    var coords = cObj.getCoords(true)
    expect(coords[0].x).toEqual(40)
    expect(coords[1].x).toEqual(51.2763114494309)
    expect(coords[2].x).toEqual(45.46196901289453)
    expect(coords[3].x).toEqual(34.18565756346363)
    expect(coords[0].y).toEqual(30)
    expect(coords[1].y).toEqual(34.104241719908025)
    expect(coords[2].y).toEqual(50.079016273268465)
    expect(coords[3].y).toEqual(45.97477455336044)
  })

  test("getCoords with angle", function (assert) {
    var cObj = new fabric.Object({
      width: 10,
      height: 15,
      strokeWidth: 2,
      top: 30,
      left: 40,
      angle: 20
    })
    cObj.canvas = {
      viewportTransform: [2, 0, 0, 2, 35, 25]
    }
    var coords = cObj.getCoords()
    expect(coords[0].x).toEqual(115)
    expect(coords[1].x).toEqual(137.55262289886178)
    expect(coords[2].x).toEqual(125.92393802578906)
    expect(coords[3].x).toEqual(103.37131512692726)
    expect(coords[0].y).toEqual(85)
    expect(coords[1].y).toEqual(93.20848343981605)
    expect(coords[2].y).toEqual(125.15803254653693)
    expect(coords[3].y).toEqual(116.94954910672088)
  })

  test("getCoords absolute with skewX", function (assert) {
    var cObj = new fabric.Object({
      width: 10,
      height: 15,
      strokeWidth: 2,
      top: 30,
      left: 40,
      skewX: 45
    })
    cObj.canvas = {
      viewportTransform: [2, 0, 0, 2, 35, 25]
    }
    var coords = cObj.getCoords(true)
    expect(coords[0].x).toEqual(40)
    expect(coords[1].x).toEqual(69)
    expect(coords[2].x).toEqual(69)
    expect(coords[3].x).toEqual(40)
    expect(coords[0].y).toEqual(30)
    expect(coords[1].y).toEqual(30)
    expect(coords[2].y).toEqual(47)
    expect(coords[3].y).toEqual(47)
  })

  test("getCoords with skewX", function (assert) {
    var cObj = new fabric.Object({
      width: 10,
      height: 15,
      strokeWidth: 2,
      top: 30,
      left: 40,
      skewX: 45
    })
    cObj.canvas = {
      viewportTransform: [2, 0, 0, 2, 35, 25]
    }
    var coords = cObj.getCoords()
    expect(coords[0].x).toEqual(115)
    expect(coords[1].x).toEqual(173)
    expect(coords[2].x).toEqual(173)
    expect(coords[3].x).toEqual(115)
    expect(coords[0].y).toEqual(85)
    expect(coords[1].y).toEqual(85)
    expect(coords[2].y).toEqual(119)
    expect(coords[3].y).toEqual(119)
  })

  test("getCoords absolute with skewY", function (assert) {
    var cObj = new fabric.Object({
      width: 10,
      height: 15,
      strokeWidth: 2,
      top: 30,
      left: 40,
      skewY: 45
    })
    cObj.canvas = {
      viewportTransform: [2, 0, 0, 2, 35, 25]
    }
    var coords = cObj.getCoords(true)
    expect(coords[0].x).toEqual(40)
    expect(coords[1].x).toEqual(52)
    expect(coords[2].x).toEqual(52)
    expect(coords[3].x).toEqual(40)
    expect(coords[0].y).toEqual(30)
    expect(coords[1].y).toEqual(30)
    expect(coords[2].y).toEqual(59)
    expect(coords[3].y).toEqual(59)
  })

  test("getCoords with skewY", function (assert) {
    var cObj = new fabric.Object({
      width: 10,
      height: 15,
      strokeWidth: 2,
      top: 30,
      left: 40,
      skewY: 45
    })
    cObj.canvas = {
      viewportTransform: [2, 0, 0, 2, 35, 25]
    }
    var coords = cObj.getCoords()
    expect(coords[0].x).toEqual(115)
    expect(coords[1].x).toEqual(139)
    expect(coords[2].x).toEqual(139)
    expect(coords[3].x).toEqual(115)
    expect(coords[0].y).toEqual(85)
    expect(coords[1].y).toEqual(85)
    expect(coords[2].y).toEqual(143)
    expect(coords[3].y).toEqual(143)
  })

  test("getCoords absolute with skewY skewX angle", function (assert) {
    var cObj = new fabric.Object({
      width: 10,
      height: 15,
      strokeWidth: 2,
      top: 30,
      left: 40,
      skewY: 45,
      skewX: 30,
      angle: 90
    })
    cObj.canvas = {
      viewportTransform: [2, 0, 0, 2, 35, 25]
    }
    var coords = cObj.getCoords(true)
    expect(coords[0].x).toEqual(40)
    expect(coords[1].x).toEqual(40)
    expect(coords[2].x).toEqual(11)
    expect(coords[3].x).toEqual(11)
    expect(coords[0].y).toEqual(30)
    expect(coords[1].y).toEqual(58.74315780649914)
    expect(coords[2].y).toEqual(58.74315780649914)
    expect(coords[3].y).toEqual(30)
  })

  test("getCoords with skewY skewX angle", function (assert) {
    var cObj = new fabric.Object({
      width: 10,
      height: 15,
      strokeWidth: 2,
      top: 30,
      left: 40,
      skewY: 45,
      skewX: 30,
      angle: 90
    })
    cObj.canvas = {
      viewportTransform: [2, 0, 0, 2, 35, 25]
    }
    var coords = cObj.getCoords()
    expect(coords[0].x).toEqual(115)
    expect(coords[1].x).toEqual(115)
    expect(coords[2].x).toEqual(57)
    expect(coords[3].x).toEqual(57)
    expect(coords[0].y).toEqual(85)
    expect(coords[1].y).toEqual(142.48631561299828)
    expect(coords[2].y).toEqual(142.48631561299828)
    expect(coords[3].y).toEqual(85)
  })

  test("isPartiallyOnScreen", function (assert) {
    var cObj = new fabric.Object({
      left: 50,
      top: 50,
      width: 100,
      height: 100,
      strokeWidth: 0
    })
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
    cObj.canvas = canvas
    cObj.left = -60
    cObj.top = -60
    cObj.setCoords()
    expect(cObj.isPartiallyOnScreen(true)).toEqual(true)
    cObj.left = -110
    cObj.top = -110
    cObj.setCoords()
    expect(cObj.isPartiallyOnScreen(true)).toEqual(false)
    cObj.left = 50
    cObj.top = 50
    cObj.setCoords()
    expect(cObj.isPartiallyOnScreen(true)).toEqual(false)
    canvas.setZoom(2)
    expect(cObj.isPartiallyOnScreen(true)).toEqual(true)
  })

  test(
    "isPartiallyOnScreen with object inside and outside of canvas",
    function (assert) {
      var cObj = new fabric.Object({
        left: 5,
        top: 5,
        width: 100,
        height: 100,
        strokeWidth: 0
      })
      cObj.canvas = new fabric.StaticCanvas(null, {
        width: 120,
        height: 120,
        enableRetinaScaling: false
      })
      cObj.canvas.calcViewportBoundaries()
      expect(cObj.isPartiallyOnScreen(true)).toEqual(false)
      cObj.left = -20
      cObj.top = -20
      cObj.scaleX = 2
      cObj.scaleY = 2
      cObj.setCoords()
      expect(cObj.isPartiallyOnScreen(true)).toEqual(true)
    }
  )
})()
