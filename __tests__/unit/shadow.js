var REFERENCE_SHADOW_OBJECT = {
  color: "rgb(0,255,0)",
  blur: 10,
  offsetX: 20,
  offsetY: 5
}
describe("fabric.Shadow", () => {
  test("constructor", function () {
    expect(fabric.Shadow).toBeTruthy()

    var shadow = new fabric.Shadow()
    expect(shadow instanceof fabric.Shadow).toBeTruthy()
  })

  test("initializing with object", function () {
    expect(fabric.Shadow).toBeTruthy()

    var shadow = new fabric.Shadow(REFERENCE_SHADOW_OBJECT)
    expect(shadow.color).toBe("rgb(0,255,0)")
    expect(shadow.offsetX).toBe(20)
    expect(shadow.offsetY).toBe(5)
    expect(shadow.blur).toBe(10)
  })

  test("initializing with string", function () {
    expect(fabric.Shadow).toBeTruthy()

    // old text-shadow definition - color offsetX offsetY blur
    var shadow1 = new fabric.Shadow("rgba(0,0,255,0.5) 10px 20px 5px")

    expect(shadow1.color).toBe("rgba(0,0,255,0.5)")
    expect(shadow1.offsetX).toBe(10)
    expect(shadow1.offsetY).toBe(20)
    expect(shadow1.blur).toBe(5)

    var shadow2 = new fabric.Shadow("rgb(0,0,255) 10px 20px ")

    expect(shadow2.color).toBe("rgb(0,0,255)")
    expect(shadow2.offsetX).toBe(10)
    expect(shadow2.offsetY).toBe(20)
    expect(shadow2.blur).toBe(0)

    var shadow3 = new fabric.Shadow("#00FF00 30 10 ")

    expect(shadow3.color).toBe("#00FF00")
    expect(shadow3.offsetX).toBe(30)
    expect(shadow3.offsetY).toBe(10)
    expect(shadow3.blur).toBe(0)

    var shadow4 = new fabric.Shadow(" #FF0000 10px")

    expect(shadow4.color).toBe("#FF0000")
    expect(shadow4.offsetX).toBe(10)
    expect(shadow4.offsetY).toBe(0)
    expect(shadow4.blur).toBe(0)

    var shadow5 = new fabric.Shadow("#000000")

    expect(shadow5.color).toBe("#000000")
    expect(shadow5.offsetX).toBe(0)
    expect(shadow5.offsetY).toBe(0)
    expect(shadow5.blur).toBe(0)

    // new text-shadow definition - offsetX offsetY blur color
    var shadow6 = new fabric.Shadow("10px 20px 5px rgba(0,0,255,0.5)")

    expect(shadow6.color).toBe("rgba(0,0,255,0.5)")
    expect(shadow6.offsetX).toBe(10)
    expect(shadow6.offsetY).toBe(20)
    expect(shadow6.blur).toBe(5)

    var shadow7 = new fabric.Shadow("10 20 5px #00FF00")

    expect(shadow7.color).toBe("#00FF00")
    expect(shadow7.offsetX).toBe(10)
    expect(shadow7.offsetY).toBe(20)
    expect(shadow7.blur).toBe(5)

    var shadow8 = new fabric.Shadow("10px 20px rgb(0,0,255)")

    expect(shadow8.color).toBe("rgb(0,0,255)")
    expect(shadow8.offsetX).toBe(10)
    expect(shadow8.offsetY).toBe(20)
    expect(shadow8.blur).toBe(0)

    var shadow9 = new fabric.Shadow(" 10px #FF0000 ")

    expect(shadow9.color).toBe("#FF0000")
    expect(shadow9.offsetX).toBe(10)
    expect(shadow9.offsetY).toBe(0)
    expect(shadow9.blur).toBe(0)

    var shadow10 = new fabric.Shadow("  #FF0000 ")

    expect(shadow10.color).toBe("#FF0000")
    expect(shadow10.offsetX).toBe(0)
    expect(shadow10.offsetY).toBe(0)
    expect(shadow10.blur).toBe(0)

    var shadow11 = new fabric.Shadow("")

    expect(shadow11.color).toBe("rgb(0,0,0)")
    expect(shadow11.offsetX).toBe(0)
    expect(shadow11.offsetY).toBe(0)
    expect(shadow11.blur).toBe(0)
  })

  test("properties", function () {
    var shadow = new fabric.Shadow()

    expect(shadow.blur).toBe(0)
    expect(shadow.color).toBe("rgb(0,0,0)")
    expect(shadow.offsetX).toBe(0)
    expect(shadow.offsetY).toBe(0)
  })

  test("toString", function () {
    var shadow = new fabric.Shadow()
    expect(typeof shadow.toString === "function").toBeTruthy()

    expect(shadow.toString()).toBe("0px 0px 0px rgb(0,0,0)")
  })

  test("toObject", function () {
    var shadow = new fabric.Shadow()
    expect(typeof shadow.toObject === "function").toBeTruthy()

    var object = shadow.toObject()
    expect(JSON.stringify(object)).toBe(
      '{"color":"rgb(0,0,0)","blur":0,"offsetX":0,"offsetY":0,"affectStroke":false,"nonScaling":false}'
    )
  })

  test("clone with affectStroke", function () {
    var shadow = new fabric.Shadow({ affectStroke: true, blur: 5 })
    expect(typeof shadow.toObject === "function").toBeTruthy()
    var object = shadow.toObject(),
      shadow2 = new fabric.Shadow(object),
      object2 = shadow2.toObject()
    expect(shadow.affectStroke).toBe(shadow2.affectStroke)
    expect(object).toEqual(object2)
  })

  test("toObject without default value", function () {
    var shadow = new fabric.Shadow()
    shadow.includeDefaultValues = false

    expect(JSON.stringify(shadow.toObject())).toBe("{}")

    shadow.color = "red"
    expect(JSON.stringify(shadow.toObject())).toBe('{"color":"red"}')

    shadow.offsetX = 15
    expect(JSON.stringify(shadow.toObject())).toBe(
      '{"color":"red","offsetX":15}'
    )
  })

  test("toSVG", function () {
    // reset uid
    fabric.Object.__uid = 0

    var shadow = new fabric.Shadow({
      color: "#FF0000",
      offsetX: 10,
      offsetY: -10,
      blur: 2
    })
    var object = new fabric.Object({ fill: "#FF0000" })

    expect(shadow.toSVG(object)).toBe(
      '<filter id="SVGID_0" y="-40%" height="180%" x="-40%" width="180%" >\n\t<feGaussianBlur in="SourceAlpha" stdDeviation="1"></feGaussianBlur>\n\t<feOffset dx="10" dy="-10" result="oBlur" ></feOffset>\n\t<feFlood flood-color="rgb(255,0,0)" flood-opacity="1"/>\n\t<feComposite in2="oBlur" operator="in" />\n\t<feMerge>\n\t\t<feMergeNode></feMergeNode>\n\t\t<feMergeNode in="SourceGraphic"></feMergeNode>\n\t</feMerge>\n</filter>\n'
    )

    shadow.color = "rgba(255,0,0,0.5)"
    expect(shadow.toSVG(object)).toBe(
      '<filter id="SVGID_0" y="-40%" height="180%" x="-40%" width="180%" >\n\t<feGaussianBlur in="SourceAlpha" stdDeviation="1"></feGaussianBlur>\n\t<feOffset dx="10" dy="-10" result="oBlur" ></feOffset>\n\t<feFlood flood-color="rgb(255,0,0)" flood-opacity="0.5"/>\n\t<feComposite in2="oBlur" operator="in" />\n\t<feMerge>\n\t\t<feMergeNode></feMergeNode>\n\t\t<feMergeNode in="SourceGraphic"></feMergeNode>\n\t</feMerge>\n</filter>\n'
    )

    shadow.color = "#000000"
    expect(shadow.toSVG(object)).toBe(
      '<filter id="SVGID_0" y="-40%" height="180%" x="-40%" width="180%" >\n\t<feGaussianBlur in="SourceAlpha" stdDeviation="1"></feGaussianBlur>\n\t<feOffset dx="10" dy="-10" result="oBlur" ></feOffset>\n\t<feFlood flood-color="rgb(0,0,0)" flood-opacity="1"/>\n\t<feComposite in2="oBlur" operator="in" />\n\t<feMerge>\n\t\t<feMergeNode></feMergeNode>\n\t\t<feMergeNode in="SourceGraphic"></feMergeNode>\n\t</feMerge>\n</filter>\n'
    )
  })

  test("toSVG with flipped object", function () {
    // reset uid
    fabric.Object.__uid = 0

    var shadow = new fabric.Shadow({
      color: "#FF0000",
      offsetX: 10,
      offsetY: -10,
      blur: 2
    })
    var object = new fabric.Object({
      fill: "#FF0000",
      flipX: true,
      flipY: true
    })

    expect(shadow.toSVG(object)).toBe(
      '<filter id="SVGID_0" y="-40%" height="180%" x="-40%" width="180%" >\n\t<feGaussianBlur in="SourceAlpha" stdDeviation="1"></feGaussianBlur>\n\t<feOffset dx="-10" dy="10" result="oBlur" ></feOffset>\n\t<feFlood flood-color="rgb(255,0,0)" flood-opacity="1"/>\n\t<feComposite in2="oBlur" operator="in" />\n\t<feMerge>\n\t\t<feMergeNode></feMergeNode>\n\t\t<feMergeNode in="SourceGraphic"></feMergeNode>\n\t</feMerge>\n</filter>\n'
    )
  })

  test("toSVG with rotated object", function () {
    // reset uid
    fabric.Object.__uid = 0

    var shadow = new fabric.Shadow({
      color: "#FF0000",
      offsetX: 10,
      offsetY: 10,
      blur: 2
    })
    var object = new fabric.Object({ fill: "#FF0000", angle: 45 })

    expect(shadow.toSVG(object)).toBe(
      '<filter id="SVGID_0" y="-40%" height="180%" x="-40%" width="180%" >\n\t<feGaussianBlur in="SourceAlpha" stdDeviation="1"></feGaussianBlur>\n\t<feOffset dx="14.14" dy="0" result="oBlur" ></feOffset>\n\t<feFlood flood-color="rgb(255,0,0)" flood-opacity="1"/>\n\t<feComposite in2="oBlur" operator="in" />\n\t<feMerge>\n\t\t<feMergeNode></feMergeNode>\n\t\t<feMergeNode in="SourceGraphic"></feMergeNode>\n\t</feMerge>\n</filter>\n'
    )
  })

  test("toSVG with rotated flipped object", function () {
    // reset uid
    fabric.Object.__uid = 0

    var shadow = new fabric.Shadow({
      color: "#FF0000",
      offsetX: 10,
      offsetY: 10,
      blur: 2
    })
    var object = new fabric.Object({ fill: "#FF0000", angle: 45, flipX: true })

    expect(shadow.toSVG(object)).toBe(
      '<filter id="SVGID_0" y="-40%" height="180%" x="-40%" width="180%" >\n\t<feGaussianBlur in="SourceAlpha" stdDeviation="1"></feGaussianBlur>\n\t<feOffset dx="-14.14" dy="0" result="oBlur" ></feOffset>\n\t<feFlood flood-color="rgb(255,0,0)" flood-opacity="1"/>\n\t<feComposite in2="oBlur" operator="in" />\n\t<feMerge>\n\t\t<feMergeNode></feMergeNode>\n\t\t<feMergeNode in="SourceGraphic"></feMergeNode>\n\t</feMerge>\n</filter>\n'
    )
  })
})
