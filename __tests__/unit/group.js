var canvas = new fabric.StaticCanvas(null, {
  enableRetinaScaling: false,
  width: 600,
  height: 600
})

function makeGroupWith2Objects() {
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

  return new fabric.Group([rect1, rect2], { strokeWidth: 0 })
}

function makeGroupWith2ObjectsWithOpacity() {
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

  return new fabric.Group([rect1, rect2], { strokeWidth: 0 })
}

function makeGroupWith4Objects() {
  var rect1 = new fabric.Rect({ top: 100, left: 100, width: 30, height: 10 }),
    rect2 = new fabric.Rect({ top: 120, left: 50, width: 10, height: 40 }),
    rect3 = new fabric.Rect({ top: 40, left: 0, width: 20, height: 40 }),
    rect4 = new fabric.Rect({ top: 75, left: 75, width: 40, height: 40 })

  return new fabric.Group([rect1, rect2, rect3, rect4])
}

describe("fabric.Group", () => {
  afterEach(function () {
    fabric.Object.__uid = 0
    canvas.clear()
    canvas.backgroundColor = fabric.Canvas.prototype.backgroundColor
    canvas.calcOffset()
  })
  test("constructor", function () {
    var group = makeGroupWith2Objects()

    expect(group).toBeTruthy()
    expect(group instanceof fabric.Group).toBeTruthy()
  })

  test("toString", function () {
    var group = makeGroupWith2Objects()
    expect(group.toString()).toBe("#<fabric.Group: (2)>")
  })

  test("getObjects", function () {
    var rect1 = new fabric.Rect(),
      rect2 = new fabric.Rect()

    var group = new fabric.Group([rect1, rect2])

    expect(typeof group.getObjects === "function").toBeTruthy()
    expect(
      Object.prototype.toString.call(group.getObjects()) == "[object Array]"
    ).toBeTruthy()
    expect(group.getObjects().length).toBe(2)
    expect(group.getObjects()).toEqual([rect1, rect2])
  })

  test("getObjects with type", function () {
    var rect = new fabric.Rect({ width: 10, height: 20 }),
      circle = new fabric.Circle({ radius: 30 })

    var group = new fabric.Group([rect, circle])

    expect(group.size()).toBe(2)

    expect(group.getObjects("rect")).toEqual([rect])
    expect(group.getObjects("circle")).toEqual([circle])
  })

  test("add", function () {
    var group = makeGroupWith2Objects()
    var rect1 = new fabric.Rect(),
      rect2 = new fabric.Rect(),
      rect3 = new fabric.Rect()

    expect(typeof group.add === "function").toBeTruthy()
    expect(group.add(rect1)).toBe(group)
    expect(group.item(group.size() - 1)).toBe(rect1)
    expect(group.getObjects().length).toBe(3)

    group.add(rect2, rect3)
    expect(group.item(group.size() - 1)).toBe(rect3)
    expect(group.size()).toBe(5)
  })

  test("remove", function () {
    var rect1 = new fabric.Rect(),
      rect2 = new fabric.Rect(),
      rect3 = new fabric.Rect(),
      group = new fabric.Group([rect1, rect2, rect3])

    expect(typeof group.remove === "function").toBeTruthy()
    expect(group.remove(rect2)).toBe(group)
    expect(group.getObjects()).toEqual([rect1, rect3])

    group.remove(rect1, rect3)
    expect(group.isEmpty()).toBe(true)
  })

  test("size", function () {
    var group = makeGroupWith2Objects()

    expect(typeof group.size === "function").toBeTruthy()
    expect(group.size()).toBe(2)
    group.add(new fabric.Rect())
    expect(group.size()).toBe(3)
    group.remove(group.getObjects()[0])
    group.remove(group.getObjects()[0])
    expect(group.size()).toBe(1)
  })

  test("set", function () {
    var group = makeGroupWith2Objects(),
      firstObject = group.getObjects()[0]

    expect(typeof group.set === "function").toBeTruthy()

    expect(group.set("opacity", 0.12345)).toBe(group)
    expect(group.get("opacity")).toBe(0.12345)
    expect(firstObject.get("opacity")).toBe(1)

    group.set("left", 1234)
    expect(group.get("left")).toBe(1234)
    expect(firstObject.get("left") !== 1234).toBeTruthy()

    group.set({ left: 888, top: 999 })
    expect(group.get("left")).toBe(888)
    expect(group.get("top")).toBe(999)
  })

  test("contains", function () {
    var rect1 = new fabric.Rect(),
      rect2 = new fabric.Rect(),
      notIncludedRect = new fabric.Rect(),
      group = new fabric.Group([rect1, rect2])

    expect(typeof group.contains === "function").toBeTruthy()

    expect(group.contains(rect1)).toBeTruthy()
    expect(group.contains(rect2)).toBeTruthy()

    expect(!group.contains(notIncludedRect)).toBeTruthy()
  })

  test("toObject", function () {
    var group = makeGroupWith2Objects()

    expect(typeof group.toObject === "function").toBeTruthy()

    var clone = group.toObject()

    var expectedObject = {
      version: fabric.version,
      type: "group",
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
    var group = makeGroupWith2Objects()
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
      type: "group",
      left: 50,
      top: 100,
      width: 80,
      height: 60,
      objects: objects
    }
    expect(clone).toEqual(expectedObject)
  })

  test("render", function () {
    var group = makeGroupWith2Objects()
    expect(typeof group.render === "function").toBeTruthy()
  })

  test("item", function () {
    var group = makeGroupWith2Objects()

    expect(typeof group.item === "function").toBeTruthy()
    expect(group.item(0)).toBe(group.getObjects()[0])
    expect(group.item(1)).toBe(group.getObjects()[1])
    expect(group.item(9999)).toBe(undefined)
  })

  test("moveTo", function () {
    var group = makeGroupWith4Objects(),
      groupEl1 = group.getObjects()[0],
      groupEl2 = group.getObjects()[1],
      groupEl3 = group.getObjects()[2],
      groupEl4 = group.getObjects()[3]

    expect(typeof group.item(0).moveTo === "function").toBeTruthy()

    // [ 1, 2, 3, 4 ]
    expect(group.item(0)).toBe(groupEl1)
    expect(group.item(1)).toBe(groupEl2)
    expect(group.item(2)).toBe(groupEl3)
    expect(group.item(3)).toBe(groupEl4)
    expect(group.item(9999)).toBe(undefined)

    group.item(0).moveTo(3)

    // moved 1 to level 3 — [2, 3, 4, 1]
    expect(group.item(3)).toBe(groupEl1)
    expect(group.item(0)).toBe(groupEl2)
    expect(group.item(1)).toBe(groupEl3)
    expect(group.item(2)).toBe(groupEl4)
    expect(group.item(9999)).toBe(undefined)

    group.item(0).moveTo(2)

    // moved 2 to level 2 — [3, 4, 2, 1]
    expect(group.item(3)).toBe(groupEl1)
    expect(group.item(2)).toBe(groupEl2)
    expect(group.item(0)).toBe(groupEl3)
    expect(group.item(1)).toBe(groupEl4)
    expect(group.item(9999)).toBe(undefined)
  })

  test("complexity", function () {
    var group = makeGroupWith2Objects()

    expect(typeof group.complexity === "function").toBeTruthy()
    expect(group.complexity()).toBe(2)
  })

  test("destroy", function () {
    var group = makeGroupWith2Objects(),
      firstObject = group.item(0),
      initialLeftValue = 100,
      initialTopValue = 100

    expect(typeof group.destroy === "function").toBeTruthy()

    expect(initialLeftValue !== firstObject.get("left")).toBeTruthy()
    expect(initialTopValue !== firstObject.get("top")).toBeTruthy()

    group.destroy()
    expect(firstObject.get("left")).toBe(initialLeftValue)
    expect(firstObject.get("top")).toBe(initialTopValue)
  })

  test("setObjectCoords", function () {
    var group = makeGroupWith2Objects()

    expect(typeof group.setObjectsCoords === "function").toBeTruthy()

    var invokedObjects = []
    group.forEachObject(function (groupObject) {
      groupObject.setCoords = function () {
        invokedObjects.push(this)
      }
    }, this)

    expect(group.setObjectsCoords()).toBe(group)
    // this.EnumEqualUnordered(invokedObjects, group.getObjects(), 'setObjectsCoords should call setCoords on all objects');
  })

  test("containsPoint", function () {
    var group = makeGroupWith2Objects()
    group.set({ originX: "center", originY: "center" }).setCoords()

    //  Rect #1     top: 100, left: 100, width: 30, height: 10
    //  Rect #2     top: 120, left: 50, width: 10, height: 40

    expect(typeof group.containsPoint === "function").toBeTruthy()

    expect(!group.containsPoint({ x: 0, y: 0 })).toBeTruthy()

    group.scale(2)
    expect(group.containsPoint({ x: 50, y: 120 })).toBeTruthy()
    expect(group.containsPoint({ x: 100, y: 160 })).toBeTruthy()
    expect(!group.containsPoint({ x: 0, y: 0 })).toBeTruthy()

    group.scale(1)
    group.padding = 30
    group.setCoords()
    expect(group.containsPoint({ x: 50, y: 120 })).toBeTruthy()
    expect(!group.containsPoint({ x: 100, y: 170 })).toBeTruthy()
    expect(!group.containsPoint({ x: 0, y: 0 })).toBeTruthy()
  })

  test("forEachObject", function () {
    var group = makeGroupWith2Objects()

    expect(typeof group.forEachObject === "function").toBeTruthy()
    expect(group.forEachObject(function () {})).toBe(group)

    var iteratedObjects = []
    group.forEachObject(function (groupObject) {
      iteratedObjects.push(groupObject)
    })

    expect(iteratedObjects[0]).toBe(group.getObjects()[0])
    expect(iteratedObjects[1]).toBe(group.getObjects()[1])
  })

  test("fromObject", function (done) {
    var group = makeGroupWith2ObjectsWithOpacity()

    expect(typeof fabric.Group.fromObject === "function").toBeTruthy()
    var groupObject = group.toObject()

    fabric.Group.fromObject(groupObject, function (newGroupFromObject) {
      var objectFromOldGroup = group.toObject()
      var objectFromNewGroup = newGroupFromObject.toObject()

      expect(newGroupFromObject instanceof fabric.Group).toBeTruthy()

      expect(objectFromOldGroup.objects[0]).toEqual(
        objectFromNewGroup.objects[0]
      )
      expect(objectFromOldGroup.objects[1]).toEqual(
        objectFromNewGroup.objects[1]
      )

      // delete `objects` arrays, since `HashEqual` fails to compare them for equality
      delete objectFromOldGroup.objects
      delete objectFromNewGroup.objects

      expect(objectFromOldGroup).toEqual(objectFromNewGroup)

      done()
    })
  })

  test("fromObject with clipPath", function (done) {
    var clipPath = new fabric.Rect({
      width: 500,
      height: 250,
      top: 0,
      left: 0,
      absolutePositioned: true
    })

    var groupObject = new fabric.Group([
      new fabric.Rect({ width: 100, height: 100, fill: "red" }),
      new fabric.Rect({ width: 100, height: 100, fill: "yellow", left: 100 }),
      new fabric.Rect({ width: 100, height: 100, fill: "blue", top: 100 }),
      new fabric.Rect({
        width: 100,
        height: 100,
        fill: "green",
        left: 100,
        top: 100
      })
    ])
    groupObject.clipPath = clipPath

    var groupToObject = groupObject.toObject()

    fabric.Group.fromObject(groupToObject, function (newGroupFromObject) {
      var objectFromNewGroup = newGroupFromObject.toObject()

      expect(newGroupFromObject instanceof fabric.Group).toBeTruthy()
      expect(newGroupFromObject.clipPath instanceof fabric.Rect).toBeTruthy()
      expect(objectFromNewGroup).toEqual(groupToObject)

      done()
    })
  })

  test("fromObject restores oCoords", function (done) {
    var group = makeGroupWith2ObjectsWithOpacity()

    var groupObject = group.toObject()

    fabric.Group.fromObject(groupObject, function (newGroupFromObject) {
      expect(newGroupFromObject._objects[0].lineCoords.tl).toBeTruthy()
      expect(newGroupFromObject._objects[1].lineCoords.tl).toBeTruthy()

      done()
    })
  })

  test("fromObject does not delete objects from source", function (done) {
    var group = makeGroupWith2ObjectsWithOpacity()
    var groupObject = group.toObject()

    fabric.Group.fromObject(groupObject, function (newGroupFromObject) {
      expect(newGroupFromObject.objects).toBe(undefined)
      expect(groupObject.objects).not.toBe(undefined)
      done()
    })
  })

  test("fromObject with svg url", function (done) {
    var url =
      'data:image/svg+xml,%3csvg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="612px" height="502.174px" viewBox="0 65.326 612 502.174" enable-background="new 0 65.326 612 502.174" xml:space="preserve"%3e %3cellipse fill="%23C6C6C6" cx="283.5" cy="487.5" rx="259" ry="80"/%3e %3cpath id="bird" d="M210.333%2c65.331C104.367%2c66.105-12.349%2c150.637%2c1.056%2c276.449c4.303%2c40.393%2c18.533%2c63.704%2c52.171%2c79.03 c36.307%2c16.544%2c57.022%2c54.556%2c50.406%2c112.954c-9.935%2c4.88-17.405%2c11.031-19.132%2c20.015c7.531-0.17%2c14.943-0.312%2c22.59%2c4.341 c20.333%2c12.375%2c31.296%2c27.363%2c42.979%2c51.72c1.714%2c3.572%2c8.192%2c2.849%2c8.312-3.078c0.17-8.467-1.856-17.454-5.226-26.933 c-2.955-8.313%2c3.059-7.985%2c6.917-6.106c6.399%2c3.115%2c16.334%2c9.43%2c30.39%2c13.098c5.392%2c1.407%2c5.995-3.877%2c5.224-6.991 c-1.864-7.522-11.009-10.862-24.519-19.229c-4.82-2.984-0.927-9.736%2c5.168-8.351l20.234%2c2.415c3.359%2c0.763%2c4.555-6.114%2c0.882-7.875 c-14.198-6.804-28.897-10.098-53.864-7.799c-11.617-29.265-29.811-61.617-15.674-81.681c12.639-17.938%2c31.216-20.74%2c39.147%2c43.489 c-5.002%2c3.107-11.215%2c5.031-11.332%2c13.024c7.201-2.845%2c11.207-1.399%2c14.791%2c0c17.912%2c6.998%2c35.462%2c21.826%2c52.982%2c37.309 c3.739%2c3.303%2c8.413-1.718%2c6.991-6.034c-2.138-6.494-8.053-10.659-14.791-20.016c-3.239-4.495%2c5.03-7.045%2c10.886-6.876 c13.849%2c0.396%2c22.886%2c8.268%2c35.177%2c11.218c4.483%2c1.076%2c9.741-1.964%2c6.917-6.917c-3.472-6.085-13.015-9.124-19.18-13.413 c-4.357-3.029-3.025-7.132%2c2.697-6.602c3.905%2c0.361%2c8.478%2c2.271%2c13.908%2c1.767c9.946-0.925%2c7.717-7.169-0.883-9.566 c-19.036-5.304-39.891-6.311-61.665-5.225c-43.837-8.358-31.554-84.887%2c0-90.363c29.571-5.132%2c62.966-13.339%2c99.928-32.156 c32.668-5.429%2c64.835-12.446%2c92.939-33.85c48.106-14.469%2c111.903%2c16.113%2c204.241%2c149.695c3.926%2c5.681%2c15.819%2c9.94%2c9.524-6.351 c-15.893-41.125-68.176-93.328-92.13-132.085c-24.581-39.774-14.34-61.243-39.957-91.247 c-21.326-24.978-47.502-25.803-77.339-17.365c-23.461%2c6.634-39.234-7.117-52.98-31.273C318.42%2c87.525%2c265.838%2c64.927%2c210.333%2c65.331 z M445.731%2c203.01c6.12%2c0%2c11.112%2c4.919%2c11.112%2c11.038c0%2c6.119-4.994%2c11.111-11.112%2c11.111s-11.038-4.994-11.038-11.111 C434.693%2c207.929%2c439.613%2c203.01%2c445.731%2c203.01z"/%3e %3c/svg%3e'
    var groupObject = {
      left: 10,
      top: 10,
      objects: url
    }
    fabric.Group.fromObject(groupObject, function (newGroupFromObject) {
      expect(newGroupFromObject.sourcePath).toBe(url)
      expect(newGroupFromObject._objects.length).toBe(2)
      done()
    })
  })

  test("toSVG", function () {
    var group = makeGroupWith2Objects()
    expect(typeof group.toSVG === "function").toBeTruthy()
    var expectedSVG =
      '<g transform="matrix(1 0 0 1 90 130)"  >\n<g style=""   >\n\t\t<g transform="matrix(1 0 0 1 25 -25)"  >\n<rect style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"  x="-15" y="-5" rx="0" ry="0" width="30" height="10" />\n</g>\n\t\t<g transform="matrix(1 0 0 1 -35 10)"  >\n<rect style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"  x="-5" y="-20" rx="0" ry="0" width="10" height="40" />\n</g>\n</g>\n</g>\n'
    expect(group.toSVG()).toBe(expectedSVG)
  })

  test("toSVG with a clipPath", function () {
    var group = makeGroupWith2Objects()
    group.clipPath = new fabric.Rect({ width: 100, height: 100 })
    var expectedSVG =
      '<g transform="matrix(1 0 0 1 90 130)" clip-path="url(#CLIPPATH_0)"  >\n<clipPath id="CLIPPATH_0" >\n\t<rect transform="matrix(1 0 0 1 50.5 50.5)" x="-50" y="-50" rx="0" ry="0" width="100" height="100" />\n</clipPath>\n<g style=""   >\n\t\t<g transform="matrix(1 0 0 1 25 -25)"  >\n<rect style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"  x="-15" y="-5" rx="0" ry="0" width="30" height="10" />\n</g>\n\t\t<g transform="matrix(1 0 0 1 -35 10)"  >\n<rect style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"  x="-5" y="-20" rx="0" ry="0" width="10" height="40" />\n</g>\n</g>\n</g>\n'
    expect(group.toSVG()).toBe(expectedSVG)
  })

  test("toSVG with a clipPath absolutePositioned", function () {
    var group = makeGroupWith2Objects()
    group.clipPath = new fabric.Rect({ width: 100, height: 100 })
    group.clipPath.absolutePositioned = true
    var expectedSVG =
      '<g clip-path="url(#CLIPPATH_0)"  >\n<g transform="matrix(1 0 0 1 90 130)"  >\n<clipPath id="CLIPPATH_0" >\n\t<rect transform="matrix(1 0 0 1 50.5 50.5)" x="-50" y="-50" rx="0" ry="0" width="100" height="100" />\n</clipPath>\n<g style=""   >\n\t\t<g transform="matrix(1 0 0 1 25 -25)"  >\n<rect style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"  x="-15" y="-5" rx="0" ry="0" width="30" height="10" />\n</g>\n\t\t<g transform="matrix(1 0 0 1 -35 10)"  >\n<rect style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"  x="-5" y="-20" rx="0" ry="0" width="10" height="40" />\n</g>\n</g>\n</g>\n</g>\n'
    expect(group.toSVG()).toBe(expectedSVG)
  })

  test("toSVG with a group as a clipPath", function () {
    var group = makeGroupWith2Objects()
    group.clipPath = makeGroupWith2Objects()
    var expectedSVG =
      '<g transform="matrix(1 0 0 1 90 130)" clip-path="url(#CLIPPATH_0)"  >\n<clipPath id="CLIPPATH_0" >\n\t\t<rect transform="matrix(1 0 0 1 115 105)" x="-15" y="-5" rx="0" ry="0" width="30" height="10" />\n\t\t<rect transform="matrix(1 0 0 1 55 140)" x="-5" y="-20" rx="0" ry="0" width="10" height="40" />\n</clipPath>\n<g style=""   >\n\t\t<g transform="matrix(1 0 0 1 25 -25)"  >\n<rect style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"  x="-15" y="-5" rx="0" ry="0" width="30" height="10" />\n</g>\n\t\t<g transform="matrix(1 0 0 1 -35 10)"  >\n<rect style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"  x="-5" y="-20" rx="0" ry="0" width="10" height="40" />\n</g>\n</g>\n</g>\n'
    expect(group.toSVG()).toBe(expectedSVG)
  })

  test("clonining group with 2 objects", function (done) {
    var group = makeGroupWith2Objects()
    group.clone(function (clone) {
      expect(clone !== group).toBeTruthy()
      expect(clone.toObject()).toEqual(group.toObject())

      done()
    })
  })

  test("get with locked objects", function () {
    var group = makeGroupWith2Objects()

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

  test("z-index methods with group objects", function () {
    var textBg = new fabric.Rect({
      fill: "#abc",
      width: 100,
      height: 100
    })

    var text = new fabric.Text("text")
    var group = new fabric.Group([textBg, text])

    canvas.add(group)

    expect(group.getObjects()[0] === textBg).toBeTruthy()
    expect(group.getObjects()[1] === text).toBeTruthy()

    textBg.bringToFront()

    expect(group.getObjects()[0] === text).toBeTruthy()
    expect(group.getObjects()[1] === textBg).toBeTruthy()

    textBg.sendToBack()

    expect(group.getObjects()[0] === textBg).toBeTruthy()
    expect(group.getObjects()[1] === text).toBeTruthy()
  })

  test("group reference on an object", function () {
    var group = makeGroupWith2Objects()
    var firstObjInGroup = group.getObjects()[0]
    var secondObjInGroup = group.getObjects()[1]

    expect(firstObjInGroup.group).toBe(group)
    expect(secondObjInGroup.group).toBe(group)

    group.remove(firstObjInGroup)
    expect(typeof firstObjInGroup.group === "undefined").toBeTruthy()
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

  test("dirty flag propagation from children up", function () {
    var g1 = makeGroupWith4Objects()
    var obj = g1.item(0)
    g1.dirty = false
    obj.dirty = false
    g1.ownCaching = true
    expect(g1.dirty).toBe(false)
    obj.set("fill", "red")
    expect(obj.dirty).toBe(true)
    expect(g1.dirty).toBe(true)
  })

  test("dirty flag propagation from children up is stopped if group is not caching", function () {
    var g1 = makeGroupWith4Objects()
    var obj = g1.item(0)
    g1.dirty = false
    obj.dirty = false
    g1.ownCaching = false
    expect(g1.dirty).toBe(false)
    obj.set("fill", "red")
    expect(obj.dirty).toBe(true)
    expect(g1.dirty).toBe(false)
  })

  test("dirty flag propagation from children up does not happen if value does not change really", function () {
    var g1 = makeGroupWith4Objects()
    var obj = g1.item(0)
    obj.fill = "red"
    g1.dirty = false
    obj.dirty = false
    g1.ownCaching = true
    expect(obj.dirty).toBe(false)
    expect(g1.dirty).toBe(false)
    obj.set("fill", "red")
    expect(obj.dirty).toBe(false)
    expect(g1.dirty).toBe(false)
  })

  test("dirty flag propagation from children up with", function () {
    var g1 = makeGroupWith4Objects()
    var obj = g1.item(0)
    g1.dirty = false
    obj.dirty = false
    // specify that the group is caching or the test will fail under node since the
    // object caching is disabled by default
    g1.ownCaching = true
    expect(g1.dirty).toBe(false)
    obj.set("angle", 5)
    expect(obj.dirty).toBe(false)
    expect(g1.dirty).toBe(true)
  })

  test("_getCacheCanvasDimensions returns dimensions and zoom for cache canvas are influenced by group", function () {
    var g1 = makeGroupWith4Objects()
    var obj = g1.item(0)
    var dims = obj._getCacheCanvasDimensions()
    g1.scaleX = 2
    var dims2 = obj._getCacheCanvasDimensions()
    expect(dims2.width - 2).toBe((dims.width - 2) * g1.scaleX)
  })

  test("test group - pixels.", function () {
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
      group = new fabric.Group([rect1, rect2], {
        opacity: 1,
        fill: "blue",
        strokeWidth: 0,
        objectCaching: false
      }),
      isTransparent = fabric.util.isTransparent,
      ctx = canvas.contextContainer
    canvas.add(group)
    canvas.renderAll()
    expect(canvas.enableRetinaScaling).toBe(false)
    expect(isTransparent(ctx, 0, 0, 0)).toBe(true)
    expect(isTransparent(ctx, 1, 1, 0)).toBe(false)
    expect(isTransparent(ctx, 2, 2, 0)).toBe(false)
    expect(isTransparent(ctx, 3, 3, 0)).toBe(true)
    expect(isTransparent(ctx, 4, 4, 0)).toBe(true)
    expect(isTransparent(ctx, 5, 5, 0)).toBe(false)
    expect(isTransparent(ctx, 6, 6, 0)).toBe(false)
    expect(isTransparent(ctx, 7, 7, 0)).toBe(true)
  })

  test("group toDatalessObject", function () {
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
      pathGroup = new fabric.Group([rect1, rect2], {
        sourcePath: "sourcePath"
      }),
      group = new fabric.Group([pathGroup]),
      dataless = group.toDatalessObject()

    expect(dataless.objects[0].objects).toBe("sourcePath")
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

  test("group willDrawShadow", function () {
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
      rect3 = new fabric.Rect({
        top: 5,
        left: 5,
        width: 2,
        height: 2,
        strokeWidth: 0,
        fill: "red",
        opacity: 1,
        objectCaching: false
      }),
      rect4 = new fabric.Rect({
        top: 5,
        left: 5,
        width: 2,
        height: 2,
        strokeWidth: 0,
        fill: "red",
        opacity: 1,
        objectCaching: false
      }),
      group = new fabric.Group([rect1, rect2]),
      group2 = new fabric.Group([rect3, rect4]),
      group3 = new fabric.Group([group, group2])

    expect(group3.willDrawShadow()).toBe(false)
    group3.shadow = { offsetX: 1, offsetY: 2 }
    expect(group3.willDrawShadow()).toBe(true)
    delete group3.shadow
    group2.shadow = { offsetX: 1, offsetY: 2 }
    expect(group3.willDrawShadow()).toBe(true)
    delete group2.shadow
    rect1.shadow = { offsetX: 1, offsetY: 2 }
    expect(group3.willDrawShadow()).toBe(true)
    expect(group.willDrawShadow()).toBe(true)
    expect(group2.willDrawShadow()).toBe(false)
  })

  test("group willDrawShadow with no offsets", function () {
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
      rect3 = new fabric.Rect({
        top: 5,
        left: 5,
        width: 2,
        height: 2,
        strokeWidth: 0,
        fill: "red",
        opacity: 1,
        objectCaching: false
      }),
      rect4 = new fabric.Rect({
        top: 5,
        left: 5,
        width: 2,
        height: 2,
        strokeWidth: 0,
        fill: "red",
        opacity: 1,
        objectCaching: false
      }),
      group = new fabric.Group([rect1, rect2]),
      group2 = new fabric.Group([rect3, rect4]),
      group3 = new fabric.Group([group, group2])

    expect(group3.willDrawShadow()).toBe(false)
    group3.shadow = { offsetX: 0, offsetY: 0 }
    expect(group3.willDrawShadow()).toBe(false)
    group3.shadow = { offsetX: 2, offsetY: 0 }
    expect(group3.willDrawShadow()).toBe(true)
    group3.shadow = { offsetX: 0, offsetY: 2 }
    expect(group3.willDrawShadow()).toBe(true)
    group3.shadow = { offsetX: -2, offsetY: 0 }
    expect(group3.willDrawShadow()).toBe(true)
    group3.shadow = { offsetX: 0, offsetY: -2 }
    expect(group3.willDrawShadow()).toBe(true)
    rect1.shadow = { offsetX: 1, offsetY: 2 }
    group3.shadow = { offsetX: 0, offsetY: 0 }
    expect(group3.willDrawShadow()).toBe(true)
  })

  test("group shouldCache", function () {
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
      rect3 = new fabric.Rect({
        top: 5,
        left: 5,
        width: 2,
        height: 2,
        strokeWidth: 0,
        fill: "red",
        opacity: 1,
        objectCaching: true
      }),
      rect4 = new fabric.Rect({
        top: 5,
        left: 5,
        width: 2,
        height: 2,
        strokeWidth: 0,
        fill: "red",
        opacity: 1,
        objectCaching: true
      }),
      group = new fabric.Group([rect1, rect2], { objectCaching: true }),
      group2 = new fabric.Group([rect3, rect4], { objectCaching: true }),
      group3 = new fabric.Group([group, group2], { objectCaching: true })

    expect(group3.shouldCache()).toBe(true)
    expect(group2.shouldCache()).toBe(false)
    expect(rect3.shouldCache()).toBe(false)

    group2.shadow = { offsetX: 2, offsetY: 0 }
    rect1.shadow = { offsetX: 0, offsetY: 2 }

    expect(group3.shouldCache()).toBe(false)
    expect(group2.shouldCache()).toBe(true)
    expect(group.shouldCache()).toBe(false)

    expect(rect1.shouldCache()).toBe(true)
    expect(rect3.shouldCache()).toBe(false)
  })

  test("useSetOnGroup", function () {
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
      group = new fabric.Group([rect1, rect2])

    var count = 0
    var inspectKey = ""
    var inspectValue = ""
    rect1.setOnGroup = function (key, value) {
      count++
      inspectKey = key
      inspectValue = value
    }

    group.set("fill", "red")
    expect(count).toBe(0)
    expect(inspectKey).toBe("")
    expect(inspectValue).toBe("")
    group.useSetOnGroup = true
    group.set("fill", "red")
    expect(count).toBe(1)
    expect(inspectKey).toBe("fill")
    expect(inspectValue).toBe("red")
  })

  test("canvas prop propagation with set", function () {
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
      group = new fabric.Group([rect1, rect2])

    group.set("canvas", "a-canvas")
    expect(group.canvas).toBe("a-canvas")
    expect(group._objects[0].canvas).toBe("a-canvas")
    expect(group._objects[1].canvas).toBe("a-canvas")
  })

  test("canvas prop propagation with add", function () {
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
      group = new fabric.Group([rect1, rect2])

    canvas.add(group)
    expect(group.canvas).toBe(canvas)
    expect(group._objects[0].canvas).toBe(canvas)
    expect(group._objects[1].canvas).toBe(canvas)
  })

  test("canvas prop propagation with add to group", function () {
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
      group = new fabric.Group()

    canvas.add(group)
    expect(group.canvas).toBe(canvas)
    group.add(rect1)
    expect(group._objects[0].canvas).toBe(canvas)
    group.addWithUpdate(rect2)
    expect(group._objects[1].canvas).toBe(canvas)
  })

  // test('cloning group with image', function() {
  //   var done = .async();
  //   var rect = new fabric.Rect({ top: 100, left: 100, width: 30, height: 10 }),
  //       img = new fabric.Image(_createImageElement()),
  //       group = new fabric.Group([ rect, img ]);

  //   img.src = 'foo.png';

  //   group.clone(function(clone) {
  //     .ok(clone !== group);
  //     .deepEqual(clone.toObject(), group.toObject());

  //     done();
  //   });
  // });
})
