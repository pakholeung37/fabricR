;(function () {
  describe("fabric.Shadow")

  var REFERENCE_SHADOW_OBJECT = {
    color: "rgb(0,255,0)",
    blur: 10,
    offsetX: 20,
    offsetY: 5
  }

  test("constructor", function (assert) {
    expect(fabric.Shadow).toBeTruthy()

    var shadow = new fabric.Shadow()
    expect(shadow instanceof fabric.Shadow).toBeTruthy()
  })

  test("initializing with object", function (assert) {
    expect(fabric.Shadow).toBeTruthy()

    var shadow = new fabric.Shadow(REFERENCE_SHADOW_OBJECT)
    expect(shadow.color).toEqual("rgb(0,255,0)")
    expect(shadow.offsetX).toEqual(20)
    expect(shadow.offsetY).toEqual(5)
    expect(shadow.blur).toEqual(10)
  })

  test("initializing with string", function (assert) {
    expect(fabric.Shadow).toBeTruthy()

    // old text-shadow definition - color offsetX offsetY blur
    var shadow1 = new fabric.Shadow("rgba(0,0,255,0.5) 10px 20px 5px")

    expect(shadow1.color).toEqual("rgba(0,0,255,0.5)")
    expect(shadow1.offsetX).toEqual(10)
    expect(shadow1.offsetY).toEqual(20)
    expect(shadow1.blur).toEqual(5)

    var shadow2 = new fabric.Shadow("rgb(0,0,255) 10px 20px ")

    expect(shadow2.color).toEqual("rgb(0,0,255)")
    expect(shadow2.offsetX).toEqual(10)
    expect(shadow2.offsetY).toEqual(20)
    expect(shadow2.blur).toEqual(0)

    var shadow3 = new fabric.Shadow("#00FF00 30 10 ")

    expect(shadow3.color).toEqual("#00FF00")
    expect(shadow3.offsetX).toEqual(30)
    expect(shadow3.offsetY).toEqual(10)
    expect(shadow3.blur).toEqual(0)

    var shadow4 = new fabric.Shadow(" #FF0000 10px")

    expect(shadow4.color).toEqual("#FF0000")
    expect(shadow4.offsetX).toEqual(10)
    expect(shadow4.offsetY).toEqual(0)
    expect(shadow4.blur).toEqual(0)

    var shadow5 = new fabric.Shadow("#000000")

    expect(shadow5.color).toEqual("#000000")
    expect(shadow5.offsetX).toEqual(0)
    expect(shadow5.offsetY).toEqual(0)
    expect(shadow5.blur).toEqual(0)

    // new text-shadow definition - offsetX offsetY blur color
    var shadow6 = new fabric.Shadow("10px 20px 5px rgba(0,0,255,0.5)")

    expect(shadow6.color).toEqual("rgba(0,0,255,0.5)")
    expect(shadow6.offsetX).toEqual(10)
    expect(shadow6.offsetY).toEqual(20)
    expect(shadow6.blur).toEqual(5)

    var shadow7 = new fabric.Shadow("10 20 5px #00FF00")

    expect(shadow7.color).toEqual("#00FF00")
    expect(shadow7.offsetX).toEqual(10)
    expect(shadow7.offsetY).toEqual(20)
    expect(shadow7.blur).toEqual(5)

    var shadow8 = new fabric.Shadow("10px 20px rgb(0,0,255)")

    expect(shadow8.color).toEqual("rgb(0,0,255)")
    expect(shadow8.offsetX).toEqual(10)
    expect(shadow8.offsetY).toEqual(20)
    expect(shadow8.blur).toEqual(0)

    var shadow9 = new fabric.Shadow(" 10px #FF0000 ")

    expect(shadow9.color).toEqual("#FF0000")
    expect(shadow9.offsetX).toEqual(10)
    expect(shadow9.offsetY).toEqual(0)
    expect(shadow9.blur).toEqual(0)

    var shadow10 = new fabric.Shadow("  #FF0000 ")

    expect(shadow10.color).toEqual("#FF0000")
    expect(shadow10.offsetX).toEqual(0)
    expect(shadow10.offsetY).toEqual(0)
    expect(shadow10.blur).toEqual(0)

    var shadow11 = new fabric.Shadow("")

    expect(shadow11.color).toEqual("rgb(0,0,0)")
    expect(shadow11.offsetX).toEqual(0)
    expect(shadow11.offsetY).toEqual(0)
    expect(shadow11.blur).toEqual(0)
  })

  test("properties", function (assert) {
    var shadow = new fabric.Shadow()

    expect(shadow.blur).toEqual(0)
    expect(shadow.color).toEqual("rgb(0,0,0)")
    expect(shadow.offsetX).toEqual(0)
    expect(shadow.offsetY).toEqual(0)
  })

  test("toString", function (assert) {
    var shadow = new fabric.Shadow()
    expect(typeof shadow.toString === "function").toBeTruthy()

    expect(shadow.toString()).toEqual("0px 0px 0px rgb(0,0,0)")
  })

  test("toObject", function (assert) {
    var shadow = new fabric.Shadow()
    expect(typeof shadow.toObject === "function").toBeTruthy()

    var object = shadow.toObject()
    expect(JSON.stringify(object)).toEqual(
      '{"color":"rgb(0,0,0)","blur":0,"offsetX":0,"offsetY":0,"affectStroke":false,"nonScaling":false}'
    )
  })

  test("clone with affectStroke", function (assert) {
    var shadow = new fabric.Shadow({ affectStroke: true, blur: 5 })
    expect(typeof shadow.toObject === "function").toBeTruthy()
    var object = shadow.toObject(),
      shadow2 = new fabric.Shadow(object),
      object2 = shadow2.toObject()
    expect(shadow.affectStroke).toEqual(shadow2.affectStroke)
    expect(object).toEqual(object2)
  })

  test("toObject without default value", function (assert) {
    var shadow = new fabric.Shadow()
    shadow.includeDefaultValues = false

    expect(JSON.stringify(shadow.toObject())).toEqual("{}")

    shadow.color = "red"
    expect(JSON.stringify(shadow.toObject())).toEqual('{"color":"red"}')

    shadow.offsetX = 15
    expect(JSON.stringify(shadow.toObject())).toEqual('{"color":"red","offsetX":15}')
  })

  test("toSVG", function (assert) {
    // reset uid
    fabric.Object.__uid = 0

    var shadow = new fabric.Shadow({
      color: "#FF0000",
      offsetX: 10,
      offsetY: -10,
      blur: 2
    })
    var object = new fabric.Object({ fill: "#FF0000" })

    expect(shadow.toSVG(object)).toEqual(
      '<filter id="SVGID_0" y="-40%" height="180%" x="-40%" width="180%" >\n\t<feGaussianBlur in="SourceAlpha" stdDeviation="1"></feGaussianBlur>\n\t<feOffset dx="10" dy="-10" result="oBlur" ></feOffset>\n\t<feFlood flood-color="rgb(255,0,0)" flood-opacity="1"/>\n\t<feComposite in2="oBlur" operator="in" />\n\t<feMerge>\n\t\t<feMergeNode></feMergeNode>\n\t\t<feMergeNode in="SourceGraphic"></feMergeNode>\n\t</feMerge>\n</filter>\n'
    )

    shadow.color = "rgba(255,0,0,0.5)"
    expect(shadow.toSVG(object)).toEqual(
      '<filter id="SVGID_0" y="-40%" height="180%" x="-40%" width="180%" >\n\t<feGaussianBlur in="SourceAlpha" stdDeviation="1"></feGaussianBlur>\n\t<feOffset dx="10" dy="-10" result="oBlur" ></feOffset>\n\t<feFlood flood-color="rgb(255,0,0)" flood-opacity="0.5"/>\n\t<feComposite in2="oBlur" operator="in" />\n\t<feMerge>\n\t\t<feMergeNode></feMergeNode>\n\t\t<feMergeNode in="SourceGraphic"></feMergeNode>\n\t</feMerge>\n</filter>\n'
    )

    shadow.color = "#000000"
    expect(shadow.toSVG(object)).toEqual(
      '<filter id="SVGID_0" y="-40%" height="180%" x="-40%" width="180%" >\n\t<feGaussianBlur in="SourceAlpha" stdDeviation="1"></feGaussianBlur>\n\t<feOffset dx="10" dy="-10" result="oBlur" ></feOffset>\n\t<feFlood flood-color="rgb(0,0,0)" flood-opacity="1"/>\n\t<feComposite in2="oBlur" operator="in" />\n\t<feMerge>\n\t\t<feMergeNode></feMergeNode>\n\t\t<feMergeNode in="SourceGraphic"></feMergeNode>\n\t</feMerge>\n</filter>\n'
    )
  })

  test("toSVG with flipped object", function (assert) {
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

    expect(shadow.toSVG(object)).toEqual(
      '<filter id="SVGID_0" y="-40%" height="180%" x="-40%" width="180%" >\n\t<feGaussianBlur in="SourceAlpha" stdDeviation="1"></feGaussianBlur>\n\t<feOffset dx="-10" dy="10" result="oBlur" ></feOffset>\n\t<feFlood flood-color="rgb(255,0,0)" flood-opacity="1"/>\n\t<feComposite in2="oBlur" operator="in" />\n\t<feMerge>\n\t\t<feMergeNode></feMergeNode>\n\t\t<feMergeNode in="SourceGraphic"></feMergeNode>\n\t</feMerge>\n</filter>\n'
    )
  })

  test("toSVG with rotated object", function (assert) {
    // reset uid
    fabric.Object.__uid = 0

    var shadow = new fabric.Shadow({
      color: "#FF0000",
      offsetX: 10,
      offsetY: 10,
      blur: 2
    })
    var object = new fabric.Object({ fill: "#FF0000", angle: 45 })

    expect(shadow.toSVG(object)).toEqual(
      '<filter id="SVGID_0" y="-40%" height="180%" x="-40%" width="180%" >\n\t<feGaussianBlur in="SourceAlpha" stdDeviation="1"></feGaussianBlur>\n\t<feOffset dx="14.14" dy="0" result="oBlur" ></feOffset>\n\t<feFlood flood-color="rgb(255,0,0)" flood-opacity="1"/>\n\t<feComposite in2="oBlur" operator="in" />\n\t<feMerge>\n\t\t<feMergeNode></feMergeNode>\n\t\t<feMergeNode in="SourceGraphic"></feMergeNode>\n\t</feMerge>\n</filter>\n'
    )
  })

  test("toSVG with rotated flipped object", function (assert) {
    // reset uid
    fabric.Object.__uid = 0

    var shadow = new fabric.Shadow({
      color: "#FF0000",
      offsetX: 10,
      offsetY: 10,
      blur: 2
    })
    var object = new fabric.Object({ fill: "#FF0000", angle: 45, flipX: true })

    expect(shadow.toSVG(object)).toEqual(
      '<filter id="SVGID_0" y="-40%" height="180%" x="-40%" width="180%" >\n\t<feGaussianBlur in="SourceAlpha" stdDeviation="1"></feGaussianBlur>\n\t<feOffset dx="-14.14" dy="0" result="oBlur" ></feOffset>\n\t<feFlood flood-color="rgb(255,0,0)" flood-opacity="1"/>\n\t<feComposite in2="oBlur" operator="in" />\n\t<feMerge>\n\t\t<feMergeNode></feMergeNode>\n\t\t<feMergeNode in="SourceGraphic"></feMergeNode>\n\t</feMerge>\n</filter>\n'
    )
  })
})()
