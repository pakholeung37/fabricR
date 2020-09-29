;(function () {
  describe("fabric.ObjectInteractivity")

  test("isControlVisible", function (assert) {
    expect(fabric.Object).toBeTruthy()

    var cObj = new fabric.Object({})
    expect(typeof cObj.isControlVisible === "function").toBeTruthy()

    expect(cObj.isControlVisible("tl")).toEqual(true)
    expect(cObj.isControlVisible("tr")).toEqual(true)
    expect(cObj.isControlVisible("br")).toEqual(true)
    expect(cObj.isControlVisible("bl")).toEqual(true)
    expect(cObj.isControlVisible("ml")).toEqual(true)
    expect(cObj.isControlVisible("mt")).toEqual(true)
    expect(cObj.isControlVisible("mr")).toEqual(true)
    expect(cObj.isControlVisible("mb")).toEqual(true)
    expect(cObj.isControlVisible("mtr")).toEqual(true)
  })

  test("setControlVisible", function (assert) {
    expect(fabric.Object).toBeTruthy()

    var cObj = new fabric.Object({})
    expect(typeof cObj.setControlVisible === "function").toBeTruthy()
    expect(cObj.setControlVisible("tl")).toEqual(cObj)

    cObj.setControlVisible("tl", false)
    expect(cObj.isControlVisible("tl")).toEqual(false)
    cObj.setControlVisible("tl", true)
    expect(cObj.isControlVisible("tl")).toEqual(true)
  })

  test("setControlVisible is per object", function (assert) {
    expect(fabric.Object).toBeTruthy()

    var cObj = new fabric.Object({})
    var cObj2 = new fabric.Object({})

    cObj.setControlVisible("tl", false)
    expect(cObj.isControlVisible("tl")).toEqual(false)
    expect(cObj2.isControlVisible("tl")).toEqual(true)
    cObj.controls.tl.setVisibility(false)
    expect(cObj2.isControlVisible("tl")).toEqual(false)
    cObj.setControlVisible("tl", true)
    expect(cObj.isControlVisible("tl")).toEqual(true)
    // restore original visibility
    cObj.controls.tl.setVisibility(true)
  })

  test("setControlsVisibility", function (assert) {
    expect(fabric.Object).toBeTruthy()

    var cObj = new fabric.Object({})
    expect(typeof cObj.setControlsVisibility === "function").toBeTruthy()
    expect(cObj.setControlsVisibility()).toEqual(cObj)

    cObj.setControlsVisibility({
      bl: false,
      br: false,
      mb: false,
      ml: false,
      mr: false,
      mt: false,
      tl: false,
      tr: false,
      mtr: false
    })

    expect(cObj.isControlVisible("tl")).toEqual(false)
    expect(cObj.isControlVisible("tr")).toEqual(false)
    expect(cObj.isControlVisible("br")).toEqual(false)
    expect(cObj.isControlVisible("bl")).toEqual(false)
    expect(cObj.isControlVisible("ml")).toEqual(false)
    expect(cObj.isControlVisible("mt")).toEqual(false)
    expect(cObj.isControlVisible("mr")).toEqual(false)
    expect(cObj.isControlVisible("mb")).toEqual(false)
    expect(cObj.isControlVisible("mtr")).toEqual(false)

    cObj.setControlsVisibility({
      bl: true,
      br: true,
      mb: true,
      ml: true,
      mr: true,
      mt: true,
      tl: true,
      tr: true,
      mtr: true
    })

    expect(cObj.isControlVisible("tl")).toEqual(true)
    expect(cObj.isControlVisible("tr")).toEqual(true)
    expect(cObj.isControlVisible("br")).toEqual(true)
    expect(cObj.isControlVisible("bl")).toEqual(true)
    expect(cObj.isControlVisible("ml")).toEqual(true)
    expect(cObj.isControlVisible("mt")).toEqual(true)
    expect(cObj.isControlVisible("mr")).toEqual(true)
    expect(cObj.isControlVisible("mb")).toEqual(true)
    expect(cObj.isControlVisible("mtr")).toEqual(true)
  })

  test("_setCornerCoords", function (assert) {
    var cObj = new fabric.Object({
      top: 10,
      left: 10,
      width: 10,
      height: 10,
      strokeWidth: 0
    })
    expect(typeof cObj._setCornerCoords === "function").toBeTruthy()
    cObj.setCoords()

    expect(cObj.oCoords.tl.corner.tl.x.toFixed(2)).toEqual(3.5)
    expect(cObj.oCoords.tl.corner.tl.y.toFixed(2)).toEqual(3.5)
    expect(cObj.oCoords.tl.corner.tr.x.toFixed(2)).toEqual(16.5)
    expect(cObj.oCoords.tl.corner.tr.y.toFixed(2)).toEqual(3.5)
    expect(cObj.oCoords.tl.corner.bl.x.toFixed(2)).toEqual(3.5)
    expect(cObj.oCoords.tl.corner.bl.y.toFixed(2)).toEqual(16.5)
    expect(cObj.oCoords.tl.corner.br.x.toFixed(2)).toEqual(16.5)
    expect(cObj.oCoords.tl.corner.br.y.toFixed(2)).toEqual(16.5)
    expect(cObj.oCoords.bl.corner.tl.x.toFixed(2)).toEqual(3.5)
    expect(cObj.oCoords.bl.corner.tl.y.toFixed(2)).toEqual(13.5)
    expect(cObj.oCoords.bl.corner.tr.x.toFixed(2)).toEqual(16.5)
    expect(cObj.oCoords.bl.corner.tr.y.toFixed(2)).toEqual(13.5)
    expect(cObj.oCoords.bl.corner.bl.x.toFixed(2)).toEqual(3.5)
    expect(cObj.oCoords.bl.corner.bl.y.toFixed(2)).toEqual(26.5)
    expect(cObj.oCoords.bl.corner.br.x.toFixed(2)).toEqual(16.5)
    expect(cObj.oCoords.bl.corner.br.y.toFixed(2)).toEqual(26.5)
    expect(cObj.oCoords.tr.corner.tl.x.toFixed(2)).toEqual(13.5)
    expect(cObj.oCoords.tr.corner.tl.y.toFixed(2)).toEqual(3.5)
    expect(cObj.oCoords.tr.corner.tr.x.toFixed(2)).toEqual(26.5)
    expect(cObj.oCoords.tr.corner.tr.y.toFixed(2)).toEqual(3.5)
    expect(cObj.oCoords.tr.corner.bl.x.toFixed(2)).toEqual(13.5)
    expect(cObj.oCoords.tr.corner.bl.y.toFixed(2)).toEqual(16.5)
    expect(cObj.oCoords.tr.corner.br.x.toFixed(2)).toEqual(26.5)
    expect(cObj.oCoords.tr.corner.br.y.toFixed(2)).toEqual(16.5)
    expect(cObj.oCoords.br.corner.tl.x.toFixed(2)).toEqual(13.5)
    expect(cObj.oCoords.br.corner.tl.y.toFixed(2)).toEqual(13.5)
    expect(cObj.oCoords.br.corner.tr.x.toFixed(2)).toEqual(26.5)
    expect(cObj.oCoords.br.corner.tr.y.toFixed(2)).toEqual(13.5)
    expect(cObj.oCoords.br.corner.bl.x.toFixed(2)).toEqual(13.5)
    expect(cObj.oCoords.br.corner.bl.y.toFixed(2)).toEqual(26.5)
    expect(cObj.oCoords.br.corner.br.x.toFixed(2)).toEqual(26.5)
    expect(cObj.oCoords.br.corner.br.y.toFixed(2)).toEqual(26.5)
    expect(cObj.oCoords.mtr.corner.tl.x.toFixed(2)).toEqual(8.5)
    expect(cObj.oCoords.mtr.corner.tl.y.toFixed(2)).toEqual(-36.5)
    expect(cObj.oCoords.mtr.corner.tr.x.toFixed(2)).toEqual(21.5)
    expect(cObj.oCoords.mtr.corner.tr.y.toFixed(2)).toEqual(-36.5)
    expect(cObj.oCoords.mtr.corner.bl.x.toFixed(2)).toEqual(8.5)
    expect(cObj.oCoords.mtr.corner.bl.y.toFixed(2)).toEqual(-23.5)
    expect(cObj.oCoords.mtr.corner.br.x.toFixed(2)).toEqual(21.5)
    expect(cObj.oCoords.mtr.corner.br.y.toFixed(2)).toEqual(-23.5)
  })

  test("_findTargetCorner", function (assert) {
    var cObj = new fabric.Object({
      top: 10,
      left: 10,
      width: 30,
      height: 30,
      strokeWidth: 0
    })
    expect(typeof cObj._findTargetCorner === "function").toBeTruthy()
    cObj.setCoords()
    cObj.canvas = {
      _activeObject: cObj
    }
    expect(cObj._findTargetCorner(cObj.oCoords.br)).toEqual("br")
    expect(cObj._findTargetCorner(cObj.oCoords.tl)).toEqual("tl")
    expect(cObj._findTargetCorner(cObj.oCoords.tr)).toEqual("tr")
    expect(cObj._findTargetCorner(cObj.oCoords.bl)).toEqual("bl")
    expect(cObj._findTargetCorner(cObj.oCoords.mr)).toEqual("mr")
    expect(cObj._findTargetCorner(cObj.oCoords.ml)).toEqual("ml")
    expect(cObj._findTargetCorner(cObj.oCoords.mt)).toEqual("mt")
    expect(cObj._findTargetCorner(cObj.oCoords.mb)).toEqual("mb")
    expect(cObj._findTargetCorner(cObj.oCoords.mtr)).toEqual("mtr")
    expect(cObj._findTargetCorner({ x: 0, y: 0 })).toEqual(false)
  })

  test("_findTargetCorner for touches", function (assert) {
    var cObj = new fabric.Object({
      top: 10,
      left: 10,
      width: 30,
      height: 30,
      strokeWidth: 0
    })
    cObj.setCoords()
    cObj.canvas = {
      _activeObject: cObj
    }
    var pointNearBr = {
      x: cObj.oCoords.br.x + cObj.cornerSize / 3,
      y: cObj.oCoords.br.y + cObj.cornerSize / 3
    }
    expect(cObj._findTargetCorner(pointNearBr)).toEqual("br")
    expect(cObj._findTargetCorner(pointNearBr, true)).toEqual("br")
    pointNearBr = {
      x: cObj.oCoords.br.x + cObj.touchCornerSize / 3,
      y: cObj.oCoords.br.y + cObj.touchCornerSize / 3
    }
    expect(cObj._findTargetCorner(pointNearBr, true)).toEqual("br")
    expect(cObj._findTargetCorner(pointNearBr, false)).toEqual(false)
  })

  test("_calculateCurrentDimensions", function (assert) {
    var cObj = new fabric.Object({ width: 10, height: 15, strokeWidth: 0 }),
      dim
    expect(typeof cObj._calculateCurrentDimensions === "function").toBeTruthy()

    dim = cObj._calculateCurrentDimensions()
    expect(dim.x).toEqual(10)
    expect(dim.y).toEqual(15)

    cObj.strokeWidth = 2
    dim = cObj._calculateCurrentDimensions()
    expect(dim.x).toEqual(12)
    expect(dim.y).toEqual(17)

    cObj.scaleX = 2
    dim = cObj._calculateCurrentDimensions()
    expect(dim.x).toEqual(24)
    expect(dim.y).toEqual(17)

    cObj.scaleY = 2
    dim = cObj._calculateCurrentDimensions()
    expect(dim.x).toEqual(24)
    expect(dim.y).toEqual(34)

    cObj.angle = 45
    dim = cObj._calculateCurrentDimensions()
    expect(dim.x).toEqual(24)
    expect(dim.y).toEqual(34)

    cObj.skewX = 45
    dim = cObj._calculateCurrentDimensions()
    expect(dim.x.toFixed(0)).toEqual(58)
    expect(dim.y.toFixed(0)).toEqual(34)

    cObj.skewY = 45
    dim = cObj._calculateCurrentDimensions()
    expect(dim.x.toFixed(0)).toEqual(82)
    expect(dim.y.toFixed(0)).toEqual(58)

    cObj.padding = 10
    dim = cObj._calculateCurrentDimensions()
    expect(dim.x.toFixed(0)).toEqual(102)
    expect(dim.y.toFixed(0)).toEqual(78)
  })

  test("_getTransformedDimensions", function (assert) {
    var cObj = new fabric.Object({ width: 10, height: 15, strokeWidth: 0 }),
      dim
    expect(typeof cObj._getTransformedDimensions === "function").toBeTruthy()

    dim = cObj._getTransformedDimensions()
    expect(dim.x).toEqual(10)
    expect(dim.y).toEqual(15)

    cObj.strokeWidth = 2
    dim = cObj._getTransformedDimensions()
    expect(dim.x).toEqual(12)
    expect(dim.y).toEqual(17)

    cObj.scaleX = 2
    dim = cObj._getTransformedDimensions()
    expect(dim.x).toEqual(24)
    expect(dim.y).toEqual(17)

    cObj.scaleY = 2
    dim = cObj._getTransformedDimensions()
    expect(dim.x).toEqual(24)
    expect(dim.y).toEqual(34)

    cObj.angle = 45
    dim = cObj._getTransformedDimensions()
    expect(dim.x).toEqual(24)
    expect(dim.y).toEqual(34)

    cObj.skewX = 45
    dim = cObj._getTransformedDimensions()
    expect(dim.x.toFixed(0)).toEqual(58)
    expect(dim.y.toFixed(0)).toEqual(34)

    cObj.skewY = 45
    dim = cObj._getTransformedDimensions()
    expect(dim.x.toFixed(0)).toEqual(82)
    expect(dim.y.toFixed(0)).toEqual(58)

    cObj.padding = 10
    dim = cObj._getTransformedDimensions()
    expect(dim.x.toFixed(0)).toEqual(82)
    expect(dim.y.toFixed(0)).toEqual(58)
  })

  test("_getNonTransformedDimensions", function (assert) {
    var cObj = new fabric.Object({ width: 10, height: 15, strokeWidth: 0 }),
      dim
    expect(typeof cObj._getNonTransformedDimensions === "function").toBeTruthy()

    dim = cObj._getNonTransformedDimensions()
    expect(dim.x).toEqual(10)
    expect(dim.y).toEqual(15)

    cObj.strokeWidth = 2
    dim = cObj._getNonTransformedDimensions()
    expect(dim.x).toEqual(12)
    expect(dim.y).toEqual(17)

    cObj.scaleX = 2
    dim = cObj._getNonTransformedDimensions()
    expect(dim.x).toEqual(12)
    expect(dim.y).toEqual(17)

    cObj.scaleY = 2
    dim = cObj._getNonTransformedDimensions()
    expect(dim.x).toEqual(12)
    expect(dim.y).toEqual(17)

    cObj.angle = 45
    dim = cObj._getNonTransformedDimensions()
    expect(dim.x).toEqual(12)
    expect(dim.y).toEqual(17)

    cObj.skewX = 45
    dim = cObj._getNonTransformedDimensions()
    expect(dim.x).toEqual(12)
    expect(dim.y).toEqual(17)

    cObj.skewY = 45
    dim = cObj._getNonTransformedDimensions()
    expect(dim.x).toEqual(12)
    expect(dim.y).toEqual(17)

    cObj.padding = 10
    dim = cObj._getNonTransformedDimensions()
    expect(dim.x).toEqual(12)
    expect(dim.y).toEqual(17)
  })
})()
