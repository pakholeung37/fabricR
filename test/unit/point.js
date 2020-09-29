;(function () {
  describe("fabric.Point")

  test("constructor & properties", function (assert) {
    expect(typeof fabric.Point === "function").toBeTruthy()

    var point = new fabric.Point()

    expect(point).toBeTruthy()
    expect(point instanceof fabric.Point).toBeTruthy()
    expect(point.constructor === fabric.Point).toBeTruthy()
    expect(typeof point.constructor === "function").toBeTruthy()
    expect(point.type).toEqual("point")
    expect(point.x).toEqual(undefined)
    expect(point.y).toEqual(undefined)

    var x = 5,
      y = 6
    point = new fabric.Point(x, y)
    expect(point.x).toEqual(x)
    expect(point.y).toEqual(y)
  })

  test("point add", function (assert) {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 5,
      point = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.add === "function").toBeTruthy()
    expect(point.x).toEqual(x1)
    expect(point.y).toEqual(y1)
    var returned = point.add(point2)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).not.toEqual(point)
    expect(returned.x).toEqual(x1 + x2)
    expect(returned.y).toEqual(y1 + y2)
    expect(point.x).toEqual(x1)
    expect(point.y).toEqual(y1)
    expect(point2.x).toEqual(x2)
    expect(point2.y).toEqual(y2)
  })

  test("point addEquals", function (assert) {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 5,
      point = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.addEquals === "function").toBeTruthy()
    expect(point.x).toEqual(x1)
    expect(point.y).toEqual(y1)
    var returned = point.addEquals(point2)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).toEqual(point)
    expect(point.x).toEqual(x1 + x2)
    expect(point.y).toEqual(y1 + y2)
    expect(point2.x).toEqual(x2)
    expect(point2.y).toEqual(y2)
  })

  test("scalarAdd", function (assert) {
    var x1 = 2,
      y1 = 3,
      scalar = 3,
      point = new fabric.Point(x1, y1)

    expect(typeof point.scalarAdd === "function").toBeTruthy()
    expect(point.x).toEqual(x1)
    expect(point.y).toEqual(y1)
    var returned = point.scalarAdd(scalar)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).not.toEqual(point)
    expect(returned.x).toEqual(x1 + scalar)
    expect(returned.y).toEqual(y1 + scalar)
  })

  test("scalarAddEquals", function (assert) {
    var x1 = 2,
      y1 = 3,
      scalar = 3,
      point = new fabric.Point(x1, y1)

    expect(typeof point.scalarAddEquals === "function").toBeTruthy()
    expect(point.x).toEqual(x1)
    expect(point.y).toEqual(y1)
    var returned = point.scalarAddEquals(scalar)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).toEqual(point)
    expect(point.x).toEqual(x1 + scalar)
    expect(point.y).toEqual(y1 + scalar)
  })

  test("point subtract", function (assert) {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 5,
      point = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.subtract === "function").toBeTruthy()
    expect(point.x).toEqual(x1)
    expect(point.y).toEqual(y1)
    var returned = point.subtract(point2)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).not.toEqual(point)
    expect(returned.x).toEqual(x1 - x2)
    expect(returned.y).toEqual(y1 - y2)
    expect(point.x).toEqual(x1)
    expect(point.y).toEqual(y1)
    expect(point2.x).toEqual(x2)
    expect(point2.y).toEqual(y2)
  })

  test("point subtractEquals", function (assert) {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 5,
      point = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.subtractEquals === "function").toBeTruthy()
    expect(point.x).toEqual(x1)
    expect(point.y).toEqual(y1)
    var returned = point.subtractEquals(point2)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).toEqual(point)
    expect(point.x).toEqual(x1 - x2)
    expect(point.y).toEqual(y1 - y2)
    expect(point2.x).toEqual(x2)
    expect(point2.y).toEqual(y2)
  })

  test("scalarSubtract", function (assert) {
    var x1 = 2,
      y1 = 3,
      scalar = 3,
      point = new fabric.Point(x1, y1)

    expect(typeof point.scalarSubtract === "function").toBeTruthy()
    expect(point.x).toEqual(x1)
    expect(point.y).toEqual(y1)
    var returned = point.scalarSubtract(scalar)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).not.toEqual(point)
    expect(returned.x).toEqual(x1 - scalar)
    expect(returned.y).toEqual(y1 - scalar)
  })

  test("scalarSubtractEquals", function (assert) {
    var x1 = 2,
      y1 = 3,
      scalar = 3,
      point = new fabric.Point(x1, y1)

    expect(typeof point.scalarSubtractEquals === "function").toBeTruthy()
    expect(point.x).toEqual(x1)
    expect(point.y).toEqual(y1)
    var returned = point.scalarSubtractEquals(scalar)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).toEqual(point)
    expect(point.x).toEqual(x1 - scalar)
    expect(point.y).toEqual(y1 - scalar)
  })

  test("multiply", function (assert) {
    var x1 = 2,
      y1 = 3,
      scalar = 3,
      point = new fabric.Point(x1, y1)

    expect(typeof point.multiply === "function").toBeTruthy()
    expect(point.x).toEqual(x1)
    expect(point.y).toEqual(y1)
    var returned = point.multiply(scalar)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).not.toEqual(point)
    expect(returned.x).toEqual(x1 * scalar)
    expect(returned.y).toEqual(y1 * scalar)
  })

  test("multiplyEquals", function (assert) {
    var x1 = 2,
      y1 = 3,
      scalar = 3,
      point = new fabric.Point(x1, y1)

    expect(typeof point.multiplyEquals === "function").toBeTruthy()
    expect(point.x).toEqual(x1)
    expect(point.y).toEqual(y1)
    var returned = point.multiplyEquals(scalar)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).toEqual(point)
    expect(point.x).toEqual(x1 * scalar)
    expect(point.y).toEqual(y1 * scalar)
  })

  test("divide", function (assert) {
    var x1 = 2,
      y1 = 3,
      scalar = 3,
      point = new fabric.Point(x1, y1)

    expect(typeof point.divide === "function").toBeTruthy()
    expect(point.x).toEqual(x1)
    expect(point.y).toEqual(y1)
    var returned = point.divide(scalar)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).not.toEqual(point)
    expect(returned.x).toEqual(x1 / scalar)
    expect(returned.y).toEqual(y1 / scalar)
  })

  test("divideEquals", function (assert) {
    var x1 = 2,
      y1 = 3,
      scalar = 3,
      point = new fabric.Point(x1, y1)

    expect(typeof point.divideEquals === "function").toBeTruthy()
    expect(point.x).toEqual(x1)
    expect(point.y).toEqual(y1)
    var returned = point.divideEquals(scalar)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).toEqual(point)
    expect(point.x).toEqual(x1 / scalar)
    expect(point.y).toEqual(y1 / scalar)
  })

  test("point eq", function (assert) {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 5,
      point = new fabric.Point(x1, y1),
      point3 = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.eq === "function").toBeTruthy()
    expect(!point.eq(point2)).toBeTruthy()
    expect(point.eq(point)).toBeTruthy()
    expect(point.eq(point3)).toBeTruthy()
  })

  test("point lt", function (assert) {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 5,
      point = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.lt === "function").toBeTruthy()
    expect(point.x < point2.x).toBeTruthy()
    expect(point.y < point2.y).toBeTruthy()
    expect(point.lt(point2)).toBeTruthy()
  })

  test("point gt", function (assert) {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 5,
      point = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.gt === "function").toBeTruthy()
    expect(point2.x > point.x).toBeTruthy()
    expect(point2.y > point.y).toBeTruthy()
    expect(point2.gt(point)).toBeTruthy()
  })

  test("point lte", function (assert) {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 5,
      point = new fabric.Point(x1, y1),
      point3 = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.lte === "function").toBeTruthy()
    expect(point.x <= point2.x).toBeTruthy()
    expect(point.y <= point2.y).toBeTruthy()
    expect(point.lte(point2)).toBeTruthy()
    expect(point.x <= point3.x).toBeTruthy()
    expect(point.y <= point3.y).toBeTruthy()
    expect(point.eq(point3) && point.lte(point3)).toBeTruthy()
    expect(point.lte(point)).toBeTruthy()
  })

  test("point gte", function (assert) {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 5,
      point = new fabric.Point(x1, y1),
      point3 = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.gte === "function").toBeTruthy()
    expect(point2.x >= point.x).toBeTruthy()
    expect(point2.y >= point.y).toBeTruthy()
    expect(point2.gte(point)).toBeTruthy()
    expect(point3.x >= point.x).toBeTruthy()
    expect(point3.y >= point.y).toBeTruthy()
    expect(point3.eq(point) && point3.gte(point)).toBeTruthy()
    expect(point.gte(point)).toBeTruthy()
  })

  test("point lerp", function (assert) {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 5,
      point = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.lerp === "function").toBeTruthy()
    var returned = point.lerp(point2)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).not.toEqual(point)
    expect(returned.x).toEqual(point.x + (point2.x - point.x) / 2)
    expect(returned.y).toEqual(point.y + (point2.y - point.y) / 2)
    returned = point.lerp(point2, 0)
    expect(returned).toEqual(point)
    returned = point.lerp(point2, 1)
    expect(returned).toEqual(point2)
    returned = point.lerp(point2, -1)
    expect(returned).toEqual(point)
    returned = point.lerp(point2, 2)
    expect(returned).toEqual(point2)
  })

  test("point distance from", function (assert) {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 5,
      point = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.distanceFrom === "function").toBeTruthy()
    var returned = point.distanceFrom(point2, 0.5)
    expect(typeof returned === "number").toBeTruthy()
    expect(returned).toEqual(Math.sqrt(
      Math.pow(point2.x - point.x, 2) + Math.pow(point2.y - point.y, 2)
    ))
  })

  test("midPointFrom", function (assert) {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 5,
      point = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.midPointFrom === "function").toBeTruthy()
    var returned = point.midPointFrom(point2)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).not.toEqual(point)
    expect(returned.x).toEqual(point.x + (point2.x - point.x) / 2)
    expect(returned.y).toEqual(point.y + (point2.y - point.y) / 2)
  })

  test("min", function (assert) {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 1,
      point = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.min === "function").toBeTruthy()
    var returned = point.min(point2)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).not.toEqual(point)
    expect(returned.x).toEqual(Math.min(point.x, point2.x))
    expect(returned.y).toEqual(Math.min(point.y, point2.y))
  })

  test("max", function (assert) {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 1,
      point = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.max === "function").toBeTruthy()
    var returned = point.max(point2)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).not.toEqual(point)
    expect(returned.x).toEqual(Math.max(point.x, point2.x))
    expect(returned.y).toEqual(Math.max(point.y, point2.y))
  })

  test("toString", function (assert) {
    var x1 = 2,
      y1 = 3,
      point = new fabric.Point(x1, y1)

    expect(typeof point.toString === "function").toBeTruthy()
    var returned = point.toString()
    expect(typeof returned === "string").toBeTruthy()
    expect(returned).toEqual(point.x + "," + point.y)
  })

  test("setXY", function (assert) {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 8,
      point = new fabric.Point(x1, y1)

    expect(typeof point.setXY === "function").toBeTruthy()
    var returned = point.setXY(x2, y2)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).toEqual(point)
    expect(returned.x).toEqual(x2)
    expect(returned.y).toEqual(y2)
  })

  test("setX", function (assert) {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      point = new fabric.Point(x1, y1)

    expect(typeof point.setX === "function").toBeTruthy()
    var returned = point.setX(x2)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).toEqual(point)
    expect(returned.x).toEqual(x2)
  })

  test("setY", function (assert) {
    var x1 = 2,
      y1 = 3,
      y2 = 8,
      point = new fabric.Point(x1, y1)

    expect(typeof point.setY === "function").toBeTruthy()
    var returned = point.setY(y2)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).toEqual(point)
    expect(returned.y).toEqual(y2)
  })

  test("setFromPoint", function (assert) {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 8,
      point = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.setFromPoint === "function").toBeTruthy()
    var returned = point.setFromPoint(point2)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).toEqual(point)
    expect(returned.x).toEqual(point2.x)
    expect(returned.y).toEqual(point2.y)
  })

  test("swap", function (assert) {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 8,
      point = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.swap === "function").toBeTruthy()
    var returned = point.swap(point2)
    expect(returned).toEqual(undefined)
    expect(point.x).toEqual(x2)
    expect(point.y).toEqual(y2)
    expect(point2.x).toEqual(x1)
    expect(point2.y).toEqual(y1)
  })

  test("clone", function (assert) {
    var x1 = 2,
      y1 = 3,
      point = new fabric.Point(x1, y1)

    expect(typeof point.clone === "function").toBeTruthy()
    var returned = point.clone()
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).not.toEqual(point)
    expect(returned.x).toEqual(point.x)
    expect(returned.y).toEqual(point.y)
  })
})()
