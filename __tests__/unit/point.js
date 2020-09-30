describe("fabric.Point", () => {
  test("constructor & properties", function () {
    expect(typeof fabric.Point === "function").toBeTruthy()

    var point = new fabric.Point()

    expect(point).toBeTruthy()
    expect(point instanceof fabric.Point).toBeTruthy()
    expect(point.constructor === fabric.Point).toBeTruthy()
    expect(typeof point.constructor === "function").toBeTruthy()
    expect(point.type).toBe("point")
    expect(point.x).toBe(undefined)
    expect(point.y).toBe(undefined)

    var x = 5,
      y = 6
    point = new fabric.Point(x, y)
    expect(point.x).toBe(x)
    expect(point.y).toBe(y)
  })

  test("point add", function () {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 5,
      point = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.add === "function").toBeTruthy()
    expect(point.x).toBe(x1)
    expect(point.y).toBe(y1)
    var returned = point.add(point2)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).not.toBe(point)
    expect(returned.x).toBe(x1 + x2)
    expect(returned.y).toBe(y1 + y2)
    expect(point.x).toBe(x1)
    expect(point.y).toBe(y1)
    expect(point2.x).toBe(x2)
    expect(point2.y).toBe(y2)
  })

  test("point addEquals", function () {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 5,
      point = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.addEquals === "function").toBeTruthy()
    expect(point.x).toBe(x1)
    expect(point.y).toBe(y1)
    var returned = point.addEquals(point2)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).toBe(point)
    expect(point.x).toBe(x1 + x2)
    expect(point.y).toBe(y1 + y2)
    expect(point2.x).toBe(x2)
    expect(point2.y).toBe(y2)
  })

  test("scalarAdd", function () {
    var x1 = 2,
      y1 = 3,
      scalar = 3,
      point = new fabric.Point(x1, y1)

    expect(typeof point.scalarAdd === "function").toBeTruthy()
    expect(point.x).toBe(x1)
    expect(point.y).toBe(y1)
    var returned = point.scalarAdd(scalar)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).not.toBe(point)
    expect(returned.x).toBe(x1 + scalar)
    expect(returned.y).toBe(y1 + scalar)
  })

  test("scalarAddEquals", function () {
    var x1 = 2,
      y1 = 3,
      scalar = 3,
      point = new fabric.Point(x1, y1)

    expect(typeof point.scalarAddEquals === "function").toBeTruthy()
    expect(point.x).toBe(x1)
    expect(point.y).toBe(y1)
    var returned = point.scalarAddEquals(scalar)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).toBe(point)
    expect(point.x).toBe(x1 + scalar)
    expect(point.y).toBe(y1 + scalar)
  })

  test("point subtract", function () {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 5,
      point = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.subtract === "function").toBeTruthy()
    expect(point.x).toBe(x1)
    expect(point.y).toBe(y1)
    var returned = point.subtract(point2)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).not.toBe(point)
    expect(returned.x).toBe(x1 - x2)
    expect(returned.y).toBe(y1 - y2)
    expect(point.x).toBe(x1)
    expect(point.y).toBe(y1)
    expect(point2.x).toBe(x2)
    expect(point2.y).toBe(y2)
  })

  test("point subtractEquals", function () {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 5,
      point = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.subtractEquals === "function").toBeTruthy()
    expect(point.x).toBe(x1)
    expect(point.y).toBe(y1)
    var returned = point.subtractEquals(point2)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).toBe(point)
    expect(point.x).toBe(x1 - x2)
    expect(point.y).toBe(y1 - y2)
    expect(point2.x).toBe(x2)
    expect(point2.y).toBe(y2)
  })

  test("scalarSubtract", function () {
    var x1 = 2,
      y1 = 3,
      scalar = 3,
      point = new fabric.Point(x1, y1)

    expect(typeof point.scalarSubtract === "function").toBeTruthy()
    expect(point.x).toBe(x1)
    expect(point.y).toBe(y1)
    var returned = point.scalarSubtract(scalar)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).not.toBe(point)
    expect(returned.x).toBe(x1 - scalar)
    expect(returned.y).toBe(y1 - scalar)
  })

  test("scalarSubtractEquals", function () {
    var x1 = 2,
      y1 = 3,
      scalar = 3,
      point = new fabric.Point(x1, y1)

    expect(typeof point.scalarSubtractEquals === "function").toBeTruthy()
    expect(point.x).toBe(x1)
    expect(point.y).toBe(y1)
    var returned = point.scalarSubtractEquals(scalar)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).toBe(point)
    expect(point.x).toBe(x1 - scalar)
    expect(point.y).toBe(y1 - scalar)
  })

  test("multiply", function () {
    var x1 = 2,
      y1 = 3,
      scalar = 3,
      point = new fabric.Point(x1, y1)

    expect(typeof point.multiply === "function").toBeTruthy()
    expect(point.x).toBe(x1)
    expect(point.y).toBe(y1)
    var returned = point.multiply(scalar)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).not.toBe(point)
    expect(returned.x).toBe(x1 * scalar)
    expect(returned.y).toBe(y1 * scalar)
  })

  test("multiplyEquals", function () {
    var x1 = 2,
      y1 = 3,
      scalar = 3,
      point = new fabric.Point(x1, y1)

    expect(typeof point.multiplyEquals === "function").toBeTruthy()
    expect(point.x).toBe(x1)
    expect(point.y).toBe(y1)
    var returned = point.multiplyEquals(scalar)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).toBe(point)
    expect(point.x).toBe(x1 * scalar)
    expect(point.y).toBe(y1 * scalar)
  })

  test("divide", function () {
    var x1 = 2,
      y1 = 3,
      scalar = 3,
      point = new fabric.Point(x1, y1)

    expect(typeof point.divide === "function").toBeTruthy()
    expect(point.x).toBe(x1)
    expect(point.y).toBe(y1)
    var returned = point.divide(scalar)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).not.toBe(point)
    expect(returned.x).toBe(x1 / scalar)
    expect(returned.y).toBe(y1 / scalar)
  })

  test("divideEquals", function () {
    var x1 = 2,
      y1 = 3,
      scalar = 3,
      point = new fabric.Point(x1, y1)

    expect(typeof point.divideEquals === "function").toBeTruthy()
    expect(point.x).toBe(x1)
    expect(point.y).toBe(y1)
    var returned = point.divideEquals(scalar)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).toBe(point)
    expect(point.x).toBe(x1 / scalar)
    expect(point.y).toBe(y1 / scalar)
  })

  test("point eq", function () {
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

  test("point lt", function () {
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

  test("point gt", function () {
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

  test("point lte", function () {
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

  test("point gte", function () {
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

  test("point lerp", function () {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 5,
      point = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.lerp === "function").toBeTruthy()
    var returned = point.lerp(point2)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).not.toBe(point)
    expect(returned.x).toBe(point.x + (point2.x - point.x) / 2)
    expect(returned.y).toBe(point.y + (point2.y - point.y) / 2)
    returned = point.lerp(point2, 0)
    expect(returned).toEqual(point)
    returned = point.lerp(point2, 1)
    expect(returned).toEqual(point2)
    returned = point.lerp(point2, -1)
    expect(returned).toEqual(point)
    returned = point.lerp(point2, 2)
    expect(returned).toEqual(point2)
  })

  test("point distance from", function () {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 5,
      point = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.distanceFrom === "function").toBeTruthy()
    var returned = point.distanceFrom(point2, 0.5)
    expect(typeof returned === "number").toBeTruthy()
    expect(returned).toBe(
      Math.sqrt(
        Math.pow(point2.x - point.x, 2) + Math.pow(point2.y - point.y, 2)
      )
    )
  })

  test("midPointFrom", function () {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 5,
      point = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.midPointFrom === "function").toBeTruthy()
    var returned = point.midPointFrom(point2)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).not.toBe(point)
    expect(returned.x).toBe(point.x + (point2.x - point.x) / 2)
    expect(returned.y).toBe(point.y + (point2.y - point.y) / 2)
  })

  test("min", function () {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 1,
      point = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.min === "function").toBeTruthy()
    var returned = point.min(point2)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).not.toBe(point)
    expect(returned.x).toBe(Math.min(point.x, point2.x))
    expect(returned.y).toBe(Math.min(point.y, point2.y))
  })

  test("max", function () {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 1,
      point = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.max === "function").toBeTruthy()
    var returned = point.max(point2)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).not.toBe(point)
    expect(returned.x).toBe(Math.max(point.x, point2.x))
    expect(returned.y).toBe(Math.max(point.y, point2.y))
  })

  test("toString", function () {
    var x1 = 2,
      y1 = 3,
      point = new fabric.Point(x1, y1)

    expect(typeof point.toString === "function").toBeTruthy()
    var returned = point.toString()
    expect(typeof returned === "string").toBeTruthy()
    expect(returned).toBe(point.x + "," + point.y)
  })

  test("setXY", function () {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 8,
      point = new fabric.Point(x1, y1)

    expect(typeof point.setXY === "function").toBeTruthy()
    var returned = point.setXY(x2, y2)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).toBe(point)
    expect(returned.x).toBe(x2)
    expect(returned.y).toBe(y2)
  })

  test("setX", function () {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      point = new fabric.Point(x1, y1)

    expect(typeof point.setX === "function").toBeTruthy()
    var returned = point.setX(x2)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).toBe(point)
    expect(returned.x).toBe(x2)
  })

  test("setY", function () {
    var x1 = 2,
      y1 = 3,
      y2 = 8,
      point = new fabric.Point(x1, y1)

    expect(typeof point.setY === "function").toBeTruthy()
    var returned = point.setY(y2)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).toBe(point)
    expect(returned.y).toBe(y2)
  })

  test("setFromPoint", function () {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 8,
      point = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.setFromPoint === "function").toBeTruthy()
    var returned = point.setFromPoint(point2)
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).toBe(point)
    expect(returned.x).toBe(point2.x)
    expect(returned.y).toBe(point2.y)
  })

  test("swap", function () {
    var x1 = 2,
      y1 = 3,
      x2 = 4,
      y2 = 8,
      point = new fabric.Point(x1, y1),
      point2 = new fabric.Point(x2, y2)

    expect(typeof point.swap === "function").toBeTruthy()
    var returned = point.swap(point2)
    expect(returned).toBe(undefined)
    expect(point.x).toBe(x2)
    expect(point.y).toBe(y2)
    expect(point2.x).toBe(x1)
    expect(point2.y).toBe(y1)
  })

  test("clone", function () {
    var x1 = 2,
      y1 = 3,
      point = new fabric.Point(x1, y1)

    expect(typeof point.clone === "function").toBeTruthy()
    var returned = point.clone()
    expect(returned instanceof fabric.Point).toBeTruthy()
    expect(returned).not.toBe(point)
    expect(returned.x).toBe(point.x)
    expect(returned.y).toBe(point.y)
  })
})
