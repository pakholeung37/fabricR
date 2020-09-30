describe("fabric.ObjectInteractivity", () => {
  test("isControlVisible", function () {
    expect(fabric.Object).toBeTruthy()

    var cObj = new fabric.Object({})
    expect(typeof cObj.isControlVisible === "function").toBeTruthy()

    expect(cObj.isControlVisible("tl")).toBe(true)
    expect(cObj.isControlVisible("tr")).toBe(true)
    expect(cObj.isControlVisible("br")).toBe(true)
    expect(cObj.isControlVisible("bl")).toBe(true)
    expect(cObj.isControlVisible("ml")).toBe(true)
    expect(cObj.isControlVisible("mt")).toBe(true)
    expect(cObj.isControlVisible("mr")).toBe(true)
    expect(cObj.isControlVisible("mb")).toBe(true)
    expect(cObj.isControlVisible("mtr")).toBe(true)
  })

  test("setControlVisible", function () {
    expect(fabric.Object).toBeTruthy()

    var cObj = new fabric.Object({})
    expect(typeof cObj.setControlVisible === "function").toBeTruthy()
    expect(cObj.setControlVisible("tl")).toBe(cObj)

    cObj.setControlVisible("tl", false)
    expect(cObj.isControlVisible("tl")).toBe(false)
    cObj.setControlVisible("tl", true)
    expect(cObj.isControlVisible("tl")).toBe(true)
  })

  test("setControlVisible is per object", function () {
    expect(fabric.Object).toBeTruthy()

    var cObj = new fabric.Object({})
    var cObj2 = new fabric.Object({})

    cObj.setControlVisible("tl", false)
    expect(cObj.isControlVisible("tl")).toBe(false)
    expect(cObj2.isControlVisible("tl")).toBe(true)
    cObj.controls.tl.setVisibility(false)
    expect(cObj2.isControlVisible("tl")).toBe(false)
    cObj.setControlVisible("tl", true)
    expect(cObj.isControlVisible("tl")).toBe(true)
    // restore original visibility
    cObj.controls.tl.setVisibility(true)
  })

  test("setControlsVisibility", function () {
    expect(fabric.Object).toBeTruthy()

    var cObj = new fabric.Object({})
    expect(typeof cObj.setControlsVisibility === "function").toBeTruthy()
    expect(cObj.setControlsVisibility()).toBe(cObj)

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

    expect(cObj.isControlVisible("tl")).toBe(false)
    expect(cObj.isControlVisible("tr")).toBe(false)
    expect(cObj.isControlVisible("br")).toBe(false)
    expect(cObj.isControlVisible("bl")).toBe(false)
    expect(cObj.isControlVisible("ml")).toBe(false)
    expect(cObj.isControlVisible("mt")).toBe(false)
    expect(cObj.isControlVisible("mr")).toBe(false)
    expect(cObj.isControlVisible("mb")).toBe(false)
    expect(cObj.isControlVisible("mtr")).toBe(false)

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

    expect(cObj.isControlVisible("tl")).toBe(true)
    expect(cObj.isControlVisible("tr")).toBe(true)
    expect(cObj.isControlVisible("br")).toBe(true)
    expect(cObj.isControlVisible("bl")).toBe(true)
    expect(cObj.isControlVisible("ml")).toBe(true)
    expect(cObj.isControlVisible("mt")).toBe(true)
    expect(cObj.isControlVisible("mr")).toBe(true)
    expect(cObj.isControlVisible("mb")).toBe(true)
    expect(cObj.isControlVisible("mtr")).toBe(true)
  })

  test("_setCornerCoords", function () {
    var cObj = new fabric.Object({
      top: 10,
      left: 10,
      width: 10,
      height: 10,
      strokeWidth: 0
    })
    expect(typeof cObj._setCornerCoords === "function").toBeTruthy()
    cObj.setCoords()

    expect(cObj.oCoords.tl.corner.tl.x.toFixed(2)).toBe("3.50")
    expect(cObj.oCoords.tl.corner.tl.y.toFixed(2)).toBe("3.50")
    expect(cObj.oCoords.tl.corner.tr.x.toFixed(2)).toBe("16.50")
    expect(cObj.oCoords.tl.corner.tr.y.toFixed(2)).toBe("3.50")
    expect(cObj.oCoords.tl.corner.bl.x.toFixed(2)).toBe("3.50")
    expect(cObj.oCoords.tl.corner.bl.y.toFixed(2)).toBe("16.50")
    expect(cObj.oCoords.tl.corner.br.x.toFixed(2)).toBe("16.50")
    expect(cObj.oCoords.tl.corner.br.y.toFixed(2)).toBe("16.50")
    expect(cObj.oCoords.bl.corner.tl.x.toFixed(2)).toBe("3.50")
    expect(cObj.oCoords.bl.corner.tl.y.toFixed(2)).toBe("13.50")
    expect(cObj.oCoords.bl.corner.tr.x.toFixed(2)).toBe("16.50")
    expect(cObj.oCoords.bl.corner.tr.y.toFixed(2)).toBe("13.50")
    expect(cObj.oCoords.bl.corner.bl.x.toFixed(2)).toBe("3.50")
    expect(cObj.oCoords.bl.corner.bl.y.toFixed(2)).toBe("26.50")
    expect(cObj.oCoords.bl.corner.br.x.toFixed(2)).toBe("16.50")
    expect(cObj.oCoords.bl.corner.br.y.toFixed(2)).toBe("26.50")
    expect(cObj.oCoords.tr.corner.tl.x.toFixed(2)).toBe("13.50")
    expect(cObj.oCoords.tr.corner.tl.y.toFixed(2)).toBe("3.50")
    expect(cObj.oCoords.tr.corner.tr.x.toFixed(2)).toBe("26.50")
    expect(cObj.oCoords.tr.corner.tr.y.toFixed(2)).toBe("3.50")
    expect(cObj.oCoords.tr.corner.bl.x.toFixed(2)).toBe("13.50")
    expect(cObj.oCoords.tr.corner.bl.y.toFixed(2)).toBe("16.50")
    expect(cObj.oCoords.tr.corner.br.x.toFixed(2)).toBe("26.50")
    expect(cObj.oCoords.tr.corner.br.y.toFixed(2)).toBe("16.50")
    expect(cObj.oCoords.br.corner.tl.x.toFixed(2)).toBe("13.50")
    expect(cObj.oCoords.br.corner.tl.y.toFixed(2)).toBe("13.50")
    expect(cObj.oCoords.br.corner.tr.x.toFixed(2)).toBe("26.50")
    expect(cObj.oCoords.br.corner.tr.y.toFixed(2)).toBe("13.50")
    expect(cObj.oCoords.br.corner.bl.x.toFixed(2)).toBe("13.50")
    expect(cObj.oCoords.br.corner.bl.y.toFixed(2)).toBe("26.50")
    expect(cObj.oCoords.br.corner.br.x.toFixed(2)).toBe("26.50")
    expect(cObj.oCoords.br.corner.br.y.toFixed(2)).toBe("26.50")
    expect(cObj.oCoords.mtr.corner.tl.x.toFixed(2)).toBe("8.50")
    expect(cObj.oCoords.mtr.corner.tl.y.toFixed(2)).toBe("-36.50")
    expect(cObj.oCoords.mtr.corner.tr.x.toFixed(2)).toBe("21.50")
    expect(cObj.oCoords.mtr.corner.tr.y.toFixed(2)).toBe("-36.50")
    expect(cObj.oCoords.mtr.corner.bl.x.toFixed(2)).toBe("8.50")
    expect(cObj.oCoords.mtr.corner.bl.y.toFixed(2)).toBe("-23.50")
    expect(cObj.oCoords.mtr.corner.br.x.toFixed(2)).toBe("21.50")
    expect(cObj.oCoords.mtr.corner.br.y.toFixed(2)).toBe("-23.50")
  })

  test("_findTargetCorner", function () {
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
    expect(cObj._findTargetCorner(cObj.oCoords.br)).toBe("br")
    expect(cObj._findTargetCorner(cObj.oCoords.tl)).toBe("tl")
    expect(cObj._findTargetCorner(cObj.oCoords.tr)).toBe("tr")
    expect(cObj._findTargetCorner(cObj.oCoords.bl)).toBe("bl")
    expect(cObj._findTargetCorner(cObj.oCoords.mr)).toBe("mr")
    expect(cObj._findTargetCorner(cObj.oCoords.ml)).toBe("ml")
    expect(cObj._findTargetCorner(cObj.oCoords.mt)).toBe("mt")
    expect(cObj._findTargetCorner(cObj.oCoords.mb)).toBe("mb")
    expect(cObj._findTargetCorner(cObj.oCoords.mtr)).toBe("mtr")
    expect(cObj._findTargetCorner({ x: 0, y: 0 })).toBe(false)
  })

  test("_findTargetCorner for touches", function () {
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
    expect(cObj._findTargetCorner(pointNearBr)).toBe("br")
    expect(cObj._findTargetCorner(pointNearBr, true)).toBe("br")
    pointNearBr = {
      x: cObj.oCoords.br.x + cObj.touchCornerSize / 3,
      y: cObj.oCoords.br.y + cObj.touchCornerSize / 3
    }
    expect(cObj._findTargetCorner(pointNearBr, true)).toBe("br")
    expect(cObj._findTargetCorner(pointNearBr, false)).toBe(false)
  })

  test("_calculateCurrentDimensions", function () {
    var cObj = new fabric.Object({ width: 10, height: 15, strokeWidth: 0 }),
      dim
    expect(typeof cObj._calculateCurrentDimensions === "function").toBeTruthy()

    dim = cObj._calculateCurrentDimensions()
    expect(dim.x).toBe(10)
    expect(dim.y).toBe(15)

    cObj.strokeWidth = 2
    dim = cObj._calculateCurrentDimensions()
    expect(dim.x).toBe(12)
    expect(dim.y).toBe(17)

    cObj.scaleX = 2
    dim = cObj._calculateCurrentDimensions()
    expect(dim.x).toBe(24)
    expect(dim.y).toBe(17)

    cObj.scaleY = 2
    dim = cObj._calculateCurrentDimensions()
    expect(dim.x).toBe(24)
    expect(dim.y).toBe(34)

    cObj.angle = 45
    dim = cObj._calculateCurrentDimensions()
    expect(dim.x).toBe(24)
    expect(dim.y).toBe(34)

    cObj.skewX = 45
    dim = cObj._calculateCurrentDimensions()
    expect(dim.x.toFixed(0)).toBe("58")
    expect(dim.y.toFixed(0)).toBe("34")

    cObj.skewY = 45
    dim = cObj._calculateCurrentDimensions()
    expect(dim.x.toFixed(0)).toBe("82")
    expect(dim.y.toFixed(0)).toBe("58")

    cObj.padding = 10
    dim = cObj._calculateCurrentDimensions()
    expect(dim.x.toFixed(0)).toBe("102")
    expect(dim.y.toFixed(0)).toBe("78")
  })

  test("_getTransformedDimensions", function () {
    var cObj = new fabric.Object({ width: 10, height: 15, strokeWidth: 0 }),
      dim
    expect(typeof cObj._getTransformedDimensions === "function").toBeTruthy()

    dim = cObj._getTransformedDimensions()
    expect(dim.x).toBe(10)
    expect(dim.y).toBe(15)

    cObj.strokeWidth = 2
    dim = cObj._getTransformedDimensions()
    expect(dim.x).toBe(12)
    expect(dim.y).toBe(17)

    cObj.scaleX = 2
    dim = cObj._getTransformedDimensions()
    expect(dim.x).toBe(24)
    expect(dim.y).toBe(17)

    cObj.scaleY = 2
    dim = cObj._getTransformedDimensions()
    expect(dim.x).toBe(24)
    expect(dim.y).toBe(34)

    cObj.angle = 45
    dim = cObj._getTransformedDimensions()
    expect(dim.x).toBe(24)
    expect(dim.y).toBe(34)

    cObj.skewX = 45
    dim = cObj._getTransformedDimensions()
    expect(dim.x.toFixed(0)).toBe("58")
    expect(dim.y.toFixed(0)).toBe("34")

    cObj.skewY = 45
    dim = cObj._getTransformedDimensions()
    expect(dim.x.toFixed(0)).toBe("82")
    expect(dim.y.toFixed(0)).toBe("58")

    cObj.padding = 10
    dim = cObj._getTransformedDimensions()
    expect(dim.x.toFixed(0)).toBe("82")
    expect(dim.y.toFixed(0)).toBe("58")
  })

  test("_getNonTransformedDimensions", function () {
    var cObj = new fabric.Object({ width: 10, height: 15, strokeWidth: 0 }),
      dim
    expect(typeof cObj._getNonTransformedDimensions === "function").toBeTruthy()

    dim = cObj._getNonTransformedDimensions()
    expect(dim.x).toBe(10)
    expect(dim.y).toBe(15)

    cObj.strokeWidth = 2
    dim = cObj._getNonTransformedDimensions()
    expect(dim.x).toBe(12)
    expect(dim.y).toBe(17)

    cObj.scaleX = 2
    dim = cObj._getNonTransformedDimensions()
    expect(dim.x).toBe(12)
    expect(dim.y).toBe(17)

    cObj.scaleY = 2
    dim = cObj._getNonTransformedDimensions()
    expect(dim.x).toBe(12)
    expect(dim.y).toBe(17)

    cObj.angle = 45
    dim = cObj._getNonTransformedDimensions()
    expect(dim.x).toBe(12)
    expect(dim.y).toBe(17)

    cObj.skewX = 45
    dim = cObj._getNonTransformedDimensions()
    expect(dim.x).toBe(12)
    expect(dim.y).toBe(17)

    cObj.skewY = 45
    dim = cObj._getNonTransformedDimensions()
    expect(dim.x).toBe(12)
    expect(dim.y).toBe(17)

    cObj.padding = 10
    dim = cObj._getNonTransformedDimensions()
    expect(dim.x).toBe(12)
    expect(dim.y).toBe(17)
  })
})
