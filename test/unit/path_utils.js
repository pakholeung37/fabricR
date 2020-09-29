;(function () {
  describe("fabric.util - path.js")
  // eslint-disable-next-line max-len
  var path =
    "M 2 5 l 2 -2 L 4 4 h 3 H 9 C 8 3 10 3 10 3 c 1 -1 2 0 1 1 S 8 5 9 7 v 1 s 2 -1 1 2 Q 9 10 10 11 T 12 11 t -1 -1 v 2 T 10 12 S 9 12 7 11 c 0 -1 0 -1 -2 -2 z m 0 2 l 1 0 l 0 1 l -1 0 z M 1 1 a 1 1 30 1 0 2 2 A 2 2 30 1 0 6 6"
  // eslint-disable-next-line
  var expectedParse = [
    ["M", 2, 5],
    ["l", 2, -2],
    ["L", 4, 4],
    ["h", 3],
    ["H", 9],
    ["C", 8, 3, 10, 3, 10, 3],
    ["c", 1, -1, 2, 0, 1, 1],
    ["S", 8, 5, 9, 7],
    ["v", 1],
    ["s", 2, -1, 1, 2],
    ["Q", 9, 10, 10, 11],
    ["T", 12, 11],
    ["t", -1, -1],
    ["v", 2],
    ["T", 10, 12],
    ["S", 9, 12, 7, 11],
    ["c", 0, -1, 0, -1, -2, -2],
    ["z"],
    ["m", 0, 2],
    ["l", 1, 0],
    ["l", 0, 1],
    ["l", -1, 0],
    ["z"],
    ["M", 1, 1],
    ["a", 1, 1, 30, 1, 0, 2, 2],
    ["A", 2, 2, 30, 1, 0, 6, 6]
  ]
  // eslint-disable-next-line
  var expectedSimplified = [
    ["M", 2, 5],
    ["L", 4, 3],
    ["L", 4, 4],
    ["L", 7, 4],
    ["L", 9, 4],
    ["C", 8, 3, 10, 3, 10, 3],
    ["C", 11, 2, 12, 3, 11, 4],
    ["C", 10, 5, 8, 5, 9, 7],
    ["L", 9, 8],
    ["C", 9, 8, 11, 7, 10, 10],
    ["Q", 9, 10, 10, 11],
    ["Q", 11, 12, 12, 11],
    ["Q", 13, 10, 11, 10],
    ["L", 11, 12],
    ["Q", 11, 12, 10, 12],
    ["C", 10, 12, 9, 12, 7, 11],
    ["C", 7, 10, 7, 10, 5, 9],
    ["z"],
    ["M", 2, 7],
    ["L", 3, 7],
    ["L", 3, 8],
    ["L", 2, 8],
    ["z"],
    ["M", 1, 1],
    [
      "C",
      1.5522847498307932,
      0.4477152501692063,
      2.4477152501692068,
      0.44771525016920666,
      3,
      1
    ],
    [
      "C",
      3.5522847498307932,
      1.5522847498307937,
      3.5522847498307932,
      2.4477152501692063,
      3,
      3
    ],
    [
      "C",
      3.82842712474619,
      2.1715728752538093,
      5.17157287525381,
      2.1715728752538097,
      6,
      3
    ],
    [
      "C",
      6.82842712474619,
      3.82842712474619,
      6.828427124746191,
      5.17157287525381,
      6,
      6
    ]
  ]
  test("fabric.util.parsePath", function (assert) {
    expect(typeof fabric.util.parsePath === "function").toBeTruthy()
    expect(typeof fabric.util.makePathSimpler === "function").toBeTruthy()
    var parsed = fabric.util.parsePath(path)
    parsed.forEach(function (command, index) {
      expect(command).toEqual(expectedParse[index])
    })
    var simplified = fabric.util.makePathSimpler(parsed)
    simplified.forEach(function (command, index) {
      if (index > 23) {
        // because firefox i have no idea.
        return
      }
      expect(command).toEqual(expectedSimplified[index])
    })
  })
  test(
    "fabric.util.parsePath can parse arcs correctly when no spaces between flags",
    function (assert) {
      // eslint-disable-next-line max-len
      var pathWithWeirdArc = "a10.56 10.56 0 00-1.484-.133"
      var expected = ["a", 10.56, 10.56, 0, 0, 0, -1.484, -0.133]
      var parsed = fabric.util.parsePath(pathWithWeirdArc)
      var command = parsed[0]
      expect(command).toEqual(expected)
    }
  )
  test("fabric.util.getPathSegmentsInfo", function (assert) {
    expect(typeof fabric.util.getPathSegmentsInfo === "function").toBeTruthy()
    var parsed = fabric.util.makePathSimpler(fabric.util.parsePath(path))
    var infos = fabric.util.getPathSegmentsInfo(parsed)
    expect(infos[0].length).toEqual(0)
    expect(infos[1].length).toEqual(2.8284271247461903)
    expect(infos[2].length).toEqual(1)
    expect(infos[3].length).toEqual(3)
    expect(infos[4].length).toEqual(2)
    expect(infos[5].length).toEqual(2.061820497903685)
    expect(infos[6].length).toEqual(2.786311794934689)
    expect(infos[7].length).toEqual(4.123555017527272)
    expect(infos[8].length).toEqual(1)
    expect(infos[9].length).toEqual(3.1338167707969693)
    expect(infos[10].length).toEqual(1.512191042774622)
    expect(infos[11].length).toEqual(2.2674203737413428)
  })

  test("fabric.util.getPathSegmentsInfo test Z command", function (
    assert
  ) {
    expect(typeof fabric.util.getPathSegmentsInfo === "function").toBeTruthy()
    var parsed = fabric.util.makePathSimpler(
      fabric.util.parsePath("M 0 0 h 20, v 20 L 0, 20 Z")
    )
    var infos = fabric.util.getPathSegmentsInfo(parsed)
    expect(infos[0].length).toEqual(0)
    expect(infos[1].length).toEqual(20)
    expect(infos[2].length).toEqual(20)
    expect(infos[3].length).toEqual(20)
    expect(infos[4].length).toEqual(20)
  })
})()
