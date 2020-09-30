var canvas = new fabric.Canvas(null, {
  enableRetinaScaling: false,
  width: 600,
  height: 600
})

function makeAsWith2Objects() {
  var rect1 = new fabric.Rect({
      top: 100,
      left: 100,
      width: 30,
      height: 10,
      strokeWidth: 0
    }),
    rect2 = new fabric.Rect({
      top: 120,
      left: 50,
      width: 10,
      height: 40,
      strokeWidth: 0
    })

  return new fabric.ActiveSelection([rect1, rect2], { strokeWidth: 0 })
}

function makeAsWith2ObjectsWithOpacity() {
  var rect1 = new fabric.Rect({
      top: 100,
      left: 100,
      width: 30,
      height: 10,
      strokeWidth: 0,
      opacity: 0.5
    }),
    rect2 = new fabric.Rect({
      top: 120,
      left: 50,
      width: 10,
      height: 40,
      strokeWidth: 0,
      opacity: 0.8
    })

  return new fabric.ActiveSelection([rect1, rect2], { strokeWidth: 0 })
}

function makeAsWith4Objects() {
  var rect1 = new fabric.Rect({ top: 100, left: 100, width: 30, height: 10 }),
    rect2 = new fabric.Rect({ top: 120, left: 50, width: 10, height: 40 }),
    rect3 = new fabric.Rect({ top: 40, left: 0, width: 20, height: 40 }),
    rect4 = new fabric.Rect({ top: 75, left: 75, width: 40, height: 40 })

  return new fabric.ActiveSelection([rect1, rect2, rect3, rect4])
}

describe("fabric.ActiveSelection", () => {
  afterEach(function () {
    canvas.clear()
    canvas.backgroundColor = fabric.Canvas.prototype.backgroundColor
    canvas.calcOffset()
  })
  test("constructor", function () {
    var group = makeAsWith2Objects()

    expect(group).toBeTruthy()
    expect(group instanceof fabric.ActiveSelection).toBeTruthy()
  })

  test("toString", function () {
    var group = makeAsWith2Objects()
    expect(group.toString()).toBe("#<fabric.ActiveSelection: (2)>")
  })

  test("toObject", function () {
    var group = makeAsWith2Objects()

    expect(typeof group.toObject === "function").toBeTruthy()

    var clone = group.toObject()

    var expectedObject = {
      version: fabric.version,
      type: "activeSelection",
      originX: "left",
      originY: "top",
      left: 50,
      top: 100,
      width: 80,
      height: 60,
      fill: "rgb(0,0,0)",
      stroke: null,
      strokeWidth: 0,
      strokeDashArray: null,
      strokeLineCap: "butt",
      strokeDashOffset: 0,
      strokeLineJoin: "miter",
      strokeMiterLimit: 4,
      scaleX: 1,
      scaleY: 1,
      shadow: null,
      visible: true,
      backgroundColor: "",
      angle: 0,
      flipX: false,
      flipY: false,
      opacity: 1,
      fillRule: "nonzero",
      paintFirst: "fill",
      globalCompositeOperation: "source-over",
      skewX: 0,
      skewY: 0,
      objects: clone.objects
    }

    expect(clone).toEqual(expectedObject)

    expect(group !== clone).toBeTruthy()
    expect(group.getObjects() !== clone.objects).toBeTruthy()
    expect(group.getObjects()[0] !== clone.objects[0]).toBeTruthy()
  })

  test("toObject without default values", function () {
    var group = makeAsWith2Objects()
    group.includeDefaultValues = false
    var clone = group.toObject()
    var objects = [
      {
        version: fabric.version,
        type: "rect",
        left: 10,
        top: -30,
        width: 30,
        height: 10,
        strokeWidth: 0
      },
      {
        version: fabric.version,
        type: "rect",
        left: -40,
        top: -10,
        width: 10,
        height: 40,
        strokeWidth: 0
      }
    ]
    var expectedObject = {
      version: fabric.version,
      type: "activeSelection",
      left: 50,
      top: 100,
      width: 80,
      height: 60,
      objects: objects
    }
    expect(clone).toEqual(expectedObject)
  })

  test("_renderControls", function () {
    expect(
      typeof fabric.ActiveSelection.prototype._renderControls === "function"
    ).toBeTruthy()
  })

  test("fromObject", function (done) {
    var group = makeAsWith2ObjectsWithOpacity()

    expect(typeof fabric.ActiveSelection.fromObject === "function").toBeTruthy()
    var groupObject = group.toObject()

    fabric.ActiveSelection.fromObject(groupObject, function (
      newGroupFromObject
    ) {
      var objectFromOldGroup = group.toObject()
      var objectFromNewGroup = newGroupFromObject.toObject()

      expect(newGroupFromObject instanceof fabric.ActiveSelection).toBeTruthy()

      expect(objectFromOldGroup.objects[0]).toEqual(
        objectFromNewGroup.objects[0]
      )
      expect(objectFromOldGroup.objects[1]).toEqual(
        objectFromNewGroup.objects[1]
      )

      // delete `objects` arrays, since `assertHashEqual` fails to compare them for equality
      delete objectFromOldGroup.objects
      delete objectFromNewGroup.objects

      expect(objectFromOldGroup).toEqual(objectFromNewGroup)

      done()
    })
  })

  test("get with locked objects", function () {
    var group = makeAsWith2Objects()

    expect(group.get("lockMovementX")).toBe(false)

    // TODO acitveGroup
    // group.getObjects()[0].lockMovementX = true;
    // .equal(group.get('lockMovementX'), true);
    //
    // group.getObjects()[0].lockMovementX = false;
    // .equal(group.get('lockMovementX'), false);

    group.set("lockMovementX", true)
    expect(group.get("lockMovementX")).toBe(true)

    // group.set('lockMovementX', false);
    // group.getObjects()[0].lockMovementY = true;
    // group.getObjects()[1].lockRotation = true;
    //
    // .equal(group.get('lockMovementY'), true);
    // .equal(group.get('lockRotation'), true);
  })

  test("insertAt", function () {
    var rect1 = new fabric.Rect(),
      rect2 = new fabric.Rect(),
      group = new fabric.Group()

    group.add(rect1, rect2)

    expect(typeof group.insertAt === "function").toBeTruthy()

    group.insertAt(rect1, 1)
    expect(group.item(1)).toBe(rect1)
    group.insertAt(rect2, 2)
    expect(group.item(2)).toBe(rect2)
    expect(group.insertAt(rect1, 2)).toBe(group)
  })

  test("group addWithUpdate", function () {
    var rect1 = new fabric.Rect({
        top: 1,
        left: 1,
        width: 2,
        height: 2,
        strokeWidth: 0,
        fill: "red",
        opacity: 1,
        objectCaching: false
      }),
      rect2 = new fabric.Rect({
        top: 5,
        left: 5,
        width: 2,
        height: 2,
        strokeWidth: 0,
        fill: "red",
        opacity: 1,
        objectCaching: false
      }),
      group = new fabric.Group([rect1])

    var coords = group.oCoords
    group.addWithUpdate(rect2)
    var newCoords = group.oCoords
    expect(coords).not.toBe(newCoords)
  })

  test("group removeWithUpdate", function () {
    var rect1 = new fabric.Rect({
        top: 1,
        left: 1,
        width: 2,
        height: 2,
        strokeWidth: 0,
        fill: "red",
        opacity: 1,
        objectCaching: false
      }),
      rect2 = new fabric.Rect({
        top: 5,
        left: 5,
        width: 2,
        height: 2,
        strokeWidth: 0,
        fill: "red",
        opacity: 1,
        objectCaching: false
      }),
      group = new fabric.Group([rect1, rect2])

    var coords = group.oCoords
    group.removeWithUpdate(rect2)
    var newCoords = group.oCoords
    expect(coords).not.toBe(newCoords)
  })

  test("ActiveSelection shouldCache", function () {
    var rect1 = new fabric.Rect({
        top: 1,
        left: 1,
        width: 2,
        height: 2,
        strokeWidth: 0,
        fill: "red",
        opacity: 1,
        objectCaching: true
      }),
      rect2 = new fabric.Rect({
        top: 5,
        left: 5,
        width: 2,
        height: 2,
        strokeWidth: 0,
        fill: "red",
        opacity: 1,
        objectCaching: true
      }),
      group = new fabric.ActiveSelection([rect1, rect2], {
        objectCaching: true
      })

    expect(group.shouldCache()).toBe(false)
  })

  test("canvas property propagation", function () {
    var g2 = makeAsWith4Objects()

    canvas.add(g2)
    expect(g2.canvas).toBe(canvas)
    expect(g2._objects[3].canvas).toBe(canvas)
  })

  test("moveTo on activeSelection", function () {
    var group = makeAsWith4Objects({ canvas: canvas }),
      groupEl1 = group.getObjects()[0],
      groupEl2 = group.getObjects()[1],
      groupEl3 = group.getObjects()[2],
      groupEl4 = group.getObjects()[3]
    canvas.add(groupEl1, groupEl2, groupEl3, groupEl4)
    canvas.setActiveObject(group)
    expect(typeof group.item(0).moveTo === "function").toBeTruthy()

    // [ 1, 2, 3, 4 ]
    expect(group.item(0)).toBe(groupEl1)
    expect(group.item(1)).toBe(groupEl2)
    expect(group.item(2)).toBe(groupEl3)
    expect(group.item(3)).toBe(groupEl4)
    expect(group.item(9999)).toBe(undefined)
    expect(canvas.item(0)).toBe(groupEl1)
    expect(canvas.item(1)).toBe(groupEl2)
    expect(canvas.item(2)).toBe(groupEl3)
    expect(canvas.item(3)).toBe(groupEl4)
    expect(canvas.item(9999)).toBe(undefined)

    group.item(0).moveTo(3)

    expect(group.item(0)).toBe(groupEl1)
    expect(group.item(1)).toBe(groupEl2)
    expect(group.item(2)).toBe(groupEl3)
    expect(group.item(3)).toBe(groupEl4)
    expect(group.item(9999)).toBe(undefined)
    // moved 1 to level 3 — [2, 3, 4, 1]
    expect(canvas.item(3)).toBe(groupEl1)
    expect(canvas.item(0)).toBe(groupEl2)
    expect(canvas.item(1)).toBe(groupEl3)
    expect(canvas.item(2)).toBe(groupEl4)
    expect(canvas.item(9999)).toBe(undefined)
  })
})
