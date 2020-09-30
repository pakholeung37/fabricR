describe("fabric.Intersection", () => {
  test("constructor & properties", function () {
    expect(typeof fabric.Intersection === "function").toBeTruthy()

    var intersection = new fabric.Intersection()

    expect(intersection).toBeTruthy()
    expect(intersection instanceof fabric.Intersection).toBeTruthy()
    expect(intersection.constructor === fabric.Intersection).toBeTruthy()
    expect(typeof intersection.constructor === "function").toBeTruthy()
    expect(intersection.points).toEqual([])
    expect("status" in intersection).toBeTruthy()
    expect(intersection.status).toBe(undefined)

    var status = "status"
    intersection = new fabric.Intersection(status)
    expect(intersection.status).toBe(status)
  })

  test("appendPoint", function () {
    var point = new fabric.Point(1, 1)
    var intersection = new fabric.Intersection()
    expect(typeof intersection.appendPoint === "function").toBeTruthy()
    var returned = intersection.appendPoint(point)
    expect(returned instanceof fabric.Intersection).toBeTruthy()
    expect(returned).toBe(intersection)
    expect(intersection.points.indexOf(point)).toBe(0)
  })

  test("appendPoints", function () {
    var point = new fabric.Point(1, 1)
    var intersection = new fabric.Intersection()
    expect(typeof intersection.appendPoints === "function").toBeTruthy()
    var returned = intersection.appendPoints([point, point])
    expect(returned instanceof fabric.Intersection).toBeTruthy()
    expect(returned).toBe(intersection)
    expect(intersection.points.indexOf(point)).toBe(0)
    expect(intersection.points.length).toBe(2)
  })

  test("intersectLineLine simple intersection", function () {
    var p1 = new fabric.Point(0, 0),
      p2 = new fabric.Point(10, 10),
      p3 = new fabric.Point(0, 10),
      p4 = new fabric.Point(10, 0),
      intersection = fabric.Intersection.intersectLineLine(p1, p2, p3, p4)
    expect(
      typeof fabric.Intersection.intersectLineLine === "function"
    ).toBeTruthy()
    expect(intersection instanceof fabric.Intersection).toBeTruthy()
    expect(intersection.status).toBe("Intersection")
    expect(intersection.points[0]).toEqual(new fabric.Point(5, 5))
  })

  test("intersectLineLine parallel", function () {
    var p1 = new fabric.Point(0, 0),
      p2 = new fabric.Point(0, 10),
      p3 = new fabric.Point(10, 0),
      p4 = new fabric.Point(10, 10),
      intersection = fabric.Intersection.intersectLineLine(p1, p2, p3, p4)
    expect(intersection instanceof fabric.Intersection).toBeTruthy()
    expect(intersection.status).toBe("Parallel")
    expect(intersection.points).toEqual([])
  })

  test("intersectLineLine coincident", function () {
    var p1 = new fabric.Point(0, 0),
      p2 = new fabric.Point(0, 10),
      p3 = new fabric.Point(0, 0),
      p4 = new fabric.Point(0, 10),
      intersection = fabric.Intersection.intersectLineLine(p1, p2, p3, p4)
    expect(intersection instanceof fabric.Intersection).toBeTruthy()
    expect(intersection.status).toBe("Coincident")
    expect(intersection.points).toEqual([])
  })

  test("intersectLineLine coincident but different", function () {
    var p1 = new fabric.Point(0, 0),
      p2 = new fabric.Point(0, 10),
      p3 = new fabric.Point(0, 1),
      p4 = new fabric.Point(0, 9),
      intersection = fabric.Intersection.intersectLineLine(p1, p2, p3, p4)
    expect(intersection instanceof fabric.Intersection).toBeTruthy()
    expect(intersection.status).toBe("Coincident")
    expect(intersection.points).toEqual([])
  })

  test("intersectLineLine no intersect", function () {
    var p1 = new fabric.Point(0, 0),
      p2 = new fabric.Point(0, 10),
      p3 = new fabric.Point(10, 0),
      p4 = new fabric.Point(1, 10),
      intersection = fabric.Intersection.intersectLineLine(p1, p2, p3, p4)
    expect(intersection instanceof fabric.Intersection).toBeTruthy()
    expect(intersection.status).toBe(undefined)
    expect(intersection.points).toEqual([])
  })

  test("intersectLinePolygon", function () {
    var p1 = new fabric.Point(0, 5),
      p2 = new fabric.Point(10, 5),
      p3 = new fabric.Point(5, 0),
      p4 = new fabric.Point(2, 10),
      p5 = new fabric.Point(8, 10),
      points = [p3, p4, p5],
      intersection = fabric.Intersection.intersectLinePolygon(p1, p2, points)
    expect(intersection instanceof fabric.Intersection).toBeTruthy()
    expect(
      typeof fabric.Intersection.intersectLinePolygon === "function"
    ).toBeTruthy()
    expect(intersection.status).toBe("Intersection")
    expect(intersection.points.length).toBe(2)
    expect(intersection.points[0]).toEqual(new fabric.Point(3.5, 5))
    expect(intersection.points[1]).toEqual(new fabric.Point(6.5, 5))
  })

  test("intersectLinePolygon in one point", function () {
    var p1 = new fabric.Point(0, 5),
      p2 = new fabric.Point(5, 5),
      p3 = new fabric.Point(5, 0),
      p4 = new fabric.Point(2, 10),
      p5 = new fabric.Point(8, 10),
      points = [p3, p4, p5],
      intersection = fabric.Intersection.intersectLinePolygon(p1, p2, points)
    expect(intersection instanceof fabric.Intersection).toBeTruthy()
    expect(intersection.status).toBe("Intersection")
    expect(intersection.points.length).toBe(1)
    expect(intersection.points[0]).toEqual(new fabric.Point(3.5, 5))
  })

  test("intersectLinePolygon in one point", function () {
    var p1 = new fabric.Point(0, 5),
      p2 = new fabric.Point(3, 5),
      p3 = new fabric.Point(5, 0),
      p4 = new fabric.Point(2, 10),
      p5 = new fabric.Point(8, 10),
      points = [p3, p4, p5],
      intersection = fabric.Intersection.intersectLinePolygon(p1, p2, points)
    expect(intersection instanceof fabric.Intersection).toBeTruthy()
    expect(intersection.status).toBe(undefined)
    expect(intersection.points.length).toBe(0)
  })

  test("intersectLinePolygon on a polygon segment", function () {
    //TODO: fix this. it should return coincident.
    var p1 = new fabric.Point(1, 10),
      p2 = new fabric.Point(9, 10),
      p3 = new fabric.Point(5, 0),
      p4 = new fabric.Point(2, 10),
      p5 = new fabric.Point(8, 10),
      points = [p3, p4, p5],
      intersection = fabric.Intersection.intersectLinePolygon(p1, p2, points)
    expect(intersection instanceof fabric.Intersection).toBeTruthy()
    expect(intersection.status).toBe("Intersection")
    expect(intersection.points.length).toBe(2)
    expect(intersection.points[0]).toEqual(new fabric.Point(2, 10))
    expect(intersection.points[1]).toEqual(new fabric.Point(8, 10))
  })

  test("intersectPolygonPolygon not intersecting", function () {
    var p3b = new fabric.Point(50, 0),
      p4b = new fabric.Point(20, 100),
      p5b = new fabric.Point(80, 100),
      pointsb = [p3b, p4b, p5b],
      p3 = new fabric.Point(5, 0),
      p4 = new fabric.Point(2, 10),
      p5 = new fabric.Point(8, 10),
      points = [p3, p4, p5],
      intersection = fabric.Intersection.intersectPolygonPolygon(
        pointsb,
        points
      )
    expect(
      typeof fabric.Intersection.intersectPolygonPolygon === "function"
    ).toBeTruthy()
    expect(intersection instanceof fabric.Intersection).toBeTruthy()
    expect(intersection.status).toBe(undefined)
    expect(intersection.points.length).toBe(0)
  })

  test("intersectPolygonPolygon intersecting", function () {
    var p3b = new fabric.Point(1, 1),
      p4b = new fabric.Point(3, 1),
      p5b = new fabric.Point(3, 3),
      p6b = new fabric.Point(1, 3),
      pointsb = [p3b, p4b, p5b, p6b],
      p3 = new fabric.Point(2, 2),
      p4 = new fabric.Point(4, 2),
      p5 = new fabric.Point(4, 4),
      p6 = new fabric.Point(2, 4),
      points = [p3, p4, p5, p6],
      intersection = fabric.Intersection.intersectPolygonPolygon(
        pointsb,
        points
      )
    expect(
      typeof fabric.Intersection.intersectPolygonPolygon === "function"
    ).toBeTruthy()
    expect(intersection instanceof fabric.Intersection).toBeTruthy()
    expect(intersection.status).toBe("Intersection")
    expect(intersection.points.length).toBe(2)
    expect(intersection.points[0]).toEqual(new fabric.Point(3, 2))
    expect(intersection.points[1]).toEqual(new fabric.Point(2, 3))
  })

  test("intersectPolygonRectangle intersecting", function () {
    var p3b = new fabric.Point(1, 1),
      p5b = new fabric.Point(3, 3),
      p3 = new fabric.Point(2, 2),
      p4 = new fabric.Point(4, 2),
      p5 = new fabric.Point(4, 4),
      p6 = new fabric.Point(2, 4),
      points = [p3, p4, p5, p6],
      intersection = fabric.Intersection.intersectPolygonRectangle(
        points,
        p3b,
        p5b
      )
    expect(
      typeof fabric.Intersection.intersectPolygonRectangle === "function"
    ).toBeTruthy()
    expect(intersection instanceof fabric.Intersection).toBeTruthy()
    expect(intersection.status).toBe("Intersection")
    expect(intersection.points.length).toBe(2)
    expect(intersection.points[0]).toEqual(new fabric.Point(3, 2))
    expect(intersection.points[1]).toEqual(new fabric.Point(2, 3))
  })

  test("intersectPolygonRectangle not intersecting", function () {
    var p3b = new fabric.Point(10, 10),
      p5b = new fabric.Point(30, 30),
      p3 = new fabric.Point(2, 2),
      p4 = new fabric.Point(4, 2),
      p5 = new fabric.Point(4, 4),
      p6 = new fabric.Point(2, 4),
      points = [p3, p4, p5, p6],
      intersection = fabric.Intersection.intersectPolygonRectangle(
        points,
        p3b,
        p5b
      )
    expect(
      typeof fabric.Intersection.intersectPolygonRectangle === "function"
    ).toBeTruthy()
    expect(intersection instanceof fabric.Intersection).toBeTruthy()
    expect(intersection.status).toBe(undefined)
    expect(intersection.points.length).toBe(0)
  })
})
