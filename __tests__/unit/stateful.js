;(function () {
  describe("fabric.stateful")
  test("hasStateChanged", function (assert) {
    var cObj = new fabric.Object()
    expect(typeof cObj.hasStateChanged === "function").toBeTruthy()
    cObj.setupState()
    expect(!cObj.hasStateChanged()).toBeTruthy()
    cObj.saveState()
    cObj.set("left", 123).set("top", 456)
    expect(cObj.hasStateChanged()).toBeTruthy()
  })

  test("saveState", function (assert) {
    var cObj = new fabric.Object()
    expect(typeof cObj.saveState === "function").toBeTruthy()
    cObj.setupState()
    expect(cObj.saveState()).toEqual(cObj)
    cObj.set("left", 123).set("top", 456)
    cObj.saveState()
    cObj.set("left", 223).set("top", 556)
    expect(cObj._stateProperties.left).toEqual(123)
    expect(cObj._stateProperties.top).toEqual(456)
  })

  test("saveState with extra props", function (assert) {
    var cObj = new fabric.Object()
    cObj.prop1 = "a"
    cObj.prop2 = "b"
    cObj.left = 123
    var extraProps = ["prop1", "prop2"]
    var options = { stateProperties: extraProps }
    cObj.setupState(options)
    expect(cObj._stateProperties.prop1).toEqual("a")
    expect(cObj._stateProperties.prop2).toEqual("b")
    cObj.prop1 = "c"
    expect(cObj.hasStateChanged()).toBeTruthy()
    expect(cObj._stateProperties.left).toEqual(123)
  })

  test("saveState with array", function (assert) {
    var cObj = new fabric.Text("Hello")
    cObj.set("strokeDashArray", [0, 4])
    cObj.setupState()
    //eqaul(cObj.underline, cObj._stateProperties.underline, 'textDecoration in state is deepEqual');
    //notEqual(cObj.textDecoration, cObj._stateProperties.textDecoration, 'textDecoration in not same Object');
    cObj.strokeDashArray[0] = 2
    expect(cObj.hasStateChanged()).toBeTruthy()

    cObj.saveState()
    cObj.strokeDashArray[2] = 2
    expect(cObj.hasStateChanged()).toBeTruthy()
  })

  test("saveState with array to null", function (assert) {
    var cObj = new fabric.Text("Hello")
    cObj.set("strokeDashArray", [0, 4])
    cObj.setupState()
    //eqaul(cObj.underline, cObj._stateProperties.underline, 'textDecoration in state is deepEqual');
    //notEqual(cObj.textDecoration, cObj._stateProperties.textDecoration, 'textDecoration in not same Object');
    cObj.strokeDashArray = null
    expect(cObj.hasStateChanged()).toBeTruthy()

    cObj.saveState()
    cObj.strokeDashArray = [2, 3]
    expect(cObj.hasStateChanged()).toBeTruthy()
  })

  test("saveState with fabric class gradient", function (assert) {
    var cObj = new fabric.Object()
    var gradient = new fabric.Gradient({
      type: "linear",
      coords: {
        x1: 0,
        y1: 10,
        x2: 100,
        y2: 200
      },
      colorStops: [
        { offset: 0, color: "red", opacity: 0 },
        { offset: 1, color: "green" }
      ]
    })

    cObj.set("fill", "#FF0000")
    cObj.setupState()
    cObj.set("fill", gradient)
    expect(cObj.hasStateChanged()).toBeTruthy()
    cObj.saveState()
    gradient.type = "radial"
    expect(cObj.hasStateChanged()).toBeTruthy()
    cObj.saveState()
    gradient.coords.x1 = 3
    expect(cObj.hasStateChanged()).toBeTruthy()
    cObj.saveState()
    gradient.colorStops[0].color = "blue"
    expect(cObj.hasStateChanged()).toBeTruthy()
  })

  test("saveState with fabric class gradient to other types", function (
    assert
  ) {
    var cObj = new fabric.Object()
    var gradient = new fabric.Gradient({
      type: "linear",
      coords: {
        x1: 0,
        y1: 10,
        x2: 100,
        y2: 200
      },
      colorStops: [
        { offset: 0, color: "red", opacity: 0 },
        { offset: 1, color: "green" }
      ]
    })

    cObj.set("fill", gradient)
    cObj.setupState()
    cObj.set("fill", "red")
    expect(cObj.hasStateChanged()).toBeTruthy()
    cObj.saveState()
    cObj.set("fill", gradient)
    expect(cObj.hasStateChanged()).toBeTruthy()
    cObj.saveState()
    cObj.set("fill", null)
    expect(cObj.hasStateChanged()).toBeTruthy()
  })

  test("savestate with custom property set", function (assert) {
    var cObj = new fabric.Object()
    cObj.myProperties = ["a", "b"]
    cObj.a = 1
    cObj.b = 3
    cObj.setupState()
    expect(!cObj._myProperties).toBeTruthy()
    cObj.setupState({ propertySet: "myProperties" })
    expect(cObj._myProperties.a).toBeTruthy()
    cObj.left = 33
    expect(cObj.hasStateChanged()).toBeTruthy()
    expect(!cObj.hasStateChanged("myProperties")).toBeTruthy()
    cObj.a = 2
    expect(cObj.hasStateChanged("myProperties")).toBeTruthy()
  })
})()
