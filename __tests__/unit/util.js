;(function () {
  describe("fabric.util")

  function _createImageElement() {
    return fabric.document.createElement("img")
  }

  function getAbsolutePath(path) {
    var isAbsolute = /^https?:/.test(path)
    if (isAbsolute) {
      return path
    }
    var imgEl = _createImageElement()
    imgEl.src = path
    var src = imgEl.src
    imgEl = null
    return src
  }

  var IMG_URL = fabric.isLikelyNode
    ? `file://${isWin ? "/" : ""}${require("path").posix.join(
        __dirname.replace(/\\/g, "/"),
        "../fixtures/",
        "very_large_image.jpg"
      )}`
    : getAbsolutePath("../fixtures/very_large_image.jpg")

  var IMG_URL_NON_EXISTING = "http://www.google.com/non-existing"

  test("fabric.util.toFixed", function (assert) {
    expect(typeof fabric.util.toFixed === "function").toBeTruthy()

    function test(what) {
      expect(fabric.util.toFixed(what, 2)).toEqual(166.67)
      expect(fabric.util.toFixed(what, 5)).toEqual(166.66667)
      expect(fabric.util.toFixed(what, 0)).toEqual(167)

      var fractionless =
        typeof what == "number"
          ? parseInt(what)
          : what.substring(0, what.indexOf("."))

      expect(fabric.util.toFixed(fractionless, 2)).toEqual(166)
    }

    test.call(this, "166.66666666666666666666") // string
    test.call(this, 166.66666666666666666666) // number
  })

  test("fabric.util.removeFromArray", function (assert) {
    var testArray = [1, 2, 3, 4, 5]

    expect(typeof fabric.util.removeFromArray === "function").toBeTruthy()

    fabric.util.removeFromArray(testArray, 2)
    expect([1, 3, 4, 5]).toEqual(testArray)
    expect(fabric.util.removeFromArray(testArray, 1)).toEqual(testArray)

    testArray = [1, 2, 3, 1]
    fabric.util.removeFromArray(testArray, 1)
    expect([2, 3, 1]).toEqual(testArray)

    testArray = [1, 2, 3]
    fabric.util.removeFromArray(testArray, 12)
    expect([1, 2, 3]).toEqual(testArray)

    testArray = []
    fabric.util.removeFromArray(testArray, 1)
    expect([]).toEqual(testArray)

    testArray = ["0"]
    fabric.util.removeFromArray(testArray, 0)
    expect(["0"]).toEqual(testArray)
  })

  test("fabric.util.degreesToRadians", function (assert) {
    expect(typeof fabric.util.degreesToRadians === "function").toBeTruthy()
    expect(fabric.util.degreesToRadians(0)).toEqual(0)
    expect(fabric.util.degreesToRadians(90)).toEqual(Math.PI / 2)
    expect(fabric.util.degreesToRadians(180)).toEqual(Math.PI)

    expect(fabric.util.degreesToRadians()).toEqual(NaN)
  })

  test("fabric.util.radiansToDegrees", function (assert) {
    expect(typeof fabric.util.radiansToDegrees === "function").toBeTruthy()

    expect(fabric.util.radiansToDegrees(0)).toEqual(0)
    expect(fabric.util.radiansToDegrees(Math.PI / 2)).toEqual(90)
    expect(fabric.util.radiansToDegrees(Math.PI)).toEqual(180)

    expect(fabric.util.radiansToDegrees()).toEqual(NaN)
  })

  test("fabric.util.getRandomInt", function (assert) {
    expect(typeof fabric.util.getRandomInt === "function").toBeTruthy()

    var randomInts = []
    for (var i = 100; i--; ) {
      var randomInt = fabric.util.getRandomInt(100, 200)
      randomInts.push(randomInt)
      expect(randomInt >= 100 && randomInt <= 200).toBeTruthy()
    }

    var areAllTheSame = randomInts.every(function (value) {
      return value === randomInts[0]
    })

    expect(!areAllTheSame).toBeTruthy()
  })

  test("fabric.util.falseFunction", function (assert) {
    expect(typeof fabric.util.falseFunction === "function").toBeTruthy()
    expect(fabric.util.falseFunction()).toEqual(false)
  })

  test("String.prototype.trim", function (assert) {
    expect(typeof String.prototype.trim === "function").toBeTruthy()
    expect("\t\n   foo bar \n    \xA0  ".trim()).toEqual("foo bar")
  })

  test("fabric.util.string.camelize", function (assert) {
    var camelize = fabric.util.string.camelize

    expect(typeof camelize === "function").toBeTruthy()

    expect(camelize("foo")).toEqual("foo")
    expect(camelize("foo-bar")).toEqual("fooBar")
    expect(camelize("Foo-bar-Baz")).toEqual("FooBarBaz")
    expect(camelize("FooBarBaz")).toEqual("FooBarBaz")
    expect(camelize("-bar")).toEqual("Bar")
    expect(camelize("")).toEqual("")
    expect(camelize("and_something_with_underscores")).toEqual("and_something_with_underscores")
    expect(camelize("underscores_and-dashes")).toEqual("underscores_andDashes")
    expect(camelize("--double")).toEqual("Double")
  })

  test("fabric.util.string.graphemeSplit", function (assert) {
    var gSplit = fabric.util.string.graphemeSplit

    expect(typeof gSplit === "function").toBeTruthy()

    expect(gSplit("foo")).toEqual(["f", "o", "o"])
    expect(gSplit("f🙂o")).toEqual(["f", "🙂", "o"])
  })

  test("fabric.util.string.escapeXml", function (assert) {
    var escapeXml = fabric.util.string.escapeXml

    expect(typeof escapeXml === "function").toBeTruthy()

    // borrowed from Prototype.js
    expect("foo bar").toEqual(escapeXml("foo bar"))
    expect("foo &lt;span&gt;bar&lt;/span&gt;").toEqual(escapeXml("foo <span>bar</span>"))
    //equal('foo ß bar', escapeXml('foo ß bar'));

    //equal('ウィメンズ2007\nクルーズコレクション', escapeXml('ウィメンズ2007\nクルーズコレクション'));

    expect(
      "a&lt;a href=&quot;blah&quot;&gt;blub&lt;/a&gt;b&lt;span&gt;&lt;div&gt;&lt;/div&gt;&lt;/span&gt;cdef&lt;strong&gt;!!!!&lt;/strong&gt;g"
    ).toEqual(escapeXml(
      'a<a href="blah">blub</a>b<span><div></div></span>cdef<strong>!!!!</strong>g'
    ))

    expect("1\n2").toEqual(escapeXml("1\n2"))
  })

  test("fabric.util.string.capitalize", function (assert) {
    var capitalize = fabric.util.string.capitalize

    expect(typeof capitalize === "function").toBeTruthy()

    expect(capitalize("foo")).toEqual("Foo")
    expect(capitalize("")).toEqual("")
    expect(capitalize("Foo")).toEqual("Foo")
    expect(capitalize("foo-bar-baz")).toEqual("Foo-bar-baz")
    expect(capitalize("FOO")).toEqual("Foo")
    expect(capitalize("FoobaR")).toEqual("Foobar")
    expect(capitalize("2foo")).toEqual("2foo")
  })

  test("fabric.util.object.extend", function (assert) {
    var extend = fabric.util.object.extend

    expect(typeof extend === "function").toBeTruthy()

    var destination = { x: 1 },
      source = { y: 2 }

    extend(destination, source)

    expect(destination.x).toEqual(1)
    expect(destination.y).toEqual(2)
    expect(source.x).toEqual(undefined)
    expect(source.y).toEqual(2)

    destination = { x: 1 }
    source = { x: 2 }

    extend(destination, source)

    expect(destination.x).toEqual(2)
    expect(source.x).toEqual(2)
  })

  test("fabric.util.object.extend deep", function (assert) {
    var extend = fabric.util.object.extend
    var d = function () {}
    var destination = { x: 1 },
      source = { y: 2, a: { b: 1, c: [1, 2, 3, d] } }

    extend(destination, source, true)

    expect(destination.x).toEqual(1)
    expect(destination.y).toEqual(2)
    expect(destination.a).toEqual(source.a)
    expect(destination.a).not.toEqual(source.a)
    expect(typeof source.a.c[3] === "function").toBeTruthy()
    expect(destination.a.c[3]).toEqual(source.a.c[3])
  })

  test("fabric.util.object.clone", function (assert) {
    var clone = fabric.util.object.clone

    expect(typeof clone === "function").toBeTruthy()

    var obj = { x: 1, y: [1, 2, 3] },
      _clone = clone(obj)

    expect(_clone.x).toEqual(1)
    expect(obj).not.toEqual(_clone)
    expect(_clone.y).toEqual(obj.y)
  })

  test("Function.prototype.bind", function (assert) {
    expect(typeof Function.prototype.bind === "function").toBeTruthy()

    var obj = {}
    function fn() {
      return [this, arguments[0], arguments[1]]
    }

    var bound = fn.bind(obj)
    expect([obj, undefined, undefined]).toEqual(bound())
    expect([obj, 1, undefined]).toEqual(bound(1))
    expect([obj, 1, null]).toEqual(bound(1, null))

    bound = fn.bind(obj, 1)
    expect([obj, 1, undefined]).toEqual(bound())
    expect([obj, 1, 2]).toEqual(bound(2))

    function Point(x, y) {
      this.x = x
      this.y = y
    }

    obj = {}
    var YAxisPoint = Point.bind(obj, 0)
    var axisPoint = new YAxisPoint(5)

    expect(0).toEqual(axisPoint.x)
    expect(5).toEqual(axisPoint.y)

    expect(axisPoint instanceof Point).toBeTruthy()
    // assert.ok(axisPoint instanceof YAxisPoint); <-- fails
  })

  test("fabric.util.getById", function (assert) {
    expect(typeof fabric.util.getById === "function").toBeTruthy()

    var el = fabric.document.createElement("div")
    el.id = "foobarbaz"
    fabric.document.body.appendChild(el)

    expect(el).toEqual(fabric.util.getById(el))
    expect(el).toEqual(fabric.util.getById("foobarbaz"))
    expect(null).toEqual(fabric.util.getById("likely-non-existent-id"))
  })

  test("fabric.util.toArray", function (assert) {
    expect(typeof fabric.util.toArray === "function").toBeTruthy()

    expect(["x", "y"]).toEqual(fabric.util.toArray({ 0: "x", 1: "y", length: 2 }))
    expect([1, 3]).toEqual(fabric.util.toArray(
      (function () {
        return arguments
      })(1, 3)
    ))

    var nodelist = fabric.document.getElementsByTagName("div"),
      converted = fabric.util.toArray(nodelist)

    expect(converted instanceof Array).toBeTruthy()
    expect(nodelist.length).toEqual(converted.length)
    expect(nodelist[0]).toEqual(converted[0])
    expect(nodelist[1]).toEqual(converted[1])
  })

  test("fabric.util.makeElement", function (assert) {
    var makeElement = fabric.util.makeElement
    expect(typeof makeElement === "function").toBeTruthy()

    var el = makeElement("div")

    expect(el.tagName.toLowerCase()).toEqual("div")
    expect(el.nodeType).toEqual(1)

    el = makeElement("p", {
      class: "blah",
      for: "boo_hoo",
      "some_random-attribute": "woot"
    })

    expect(el.tagName.toLowerCase()).toEqual("p")
    expect(el.nodeType).toEqual(1)
    expect(el.className).toEqual("blah")
    expect(el.htmlFor).toEqual("boo_hoo")
    expect(el.getAttribute("some_random-attribute")).toEqual("woot")
  })

  test("fabric.util.addClass", function (assert) {
    var addClass = fabric.util.addClass
    expect(typeof addClass === "function").toBeTruthy()

    var el = fabric.document.createElement("div")
    addClass(el, "foo")
    expect(el.className).toEqual("foo")

    addClass(el, "bar")
    expect(el.className).toEqual("foo bar")

    addClass(el, "baz qux")
    expect(el.className).toEqual("foo bar baz qux")

    addClass(el, "foo")
    expect(el.className).toEqual("foo bar baz qux")
  })

  test("fabric.util.wrapElement", function (assert) {
    var wrapElement = fabric.util.wrapElement
    expect(typeof wrapElement === "function").toBeTruthy()

    var el = fabric.document.createElement("p")
    var wrapper = wrapElement(el, "div")

    expect(wrapper.tagName.toLowerCase()).toEqual("div")
    expect(wrapper.firstChild).toEqual(el)

    el = fabric.document.createElement("p")
    wrapper = wrapElement(el, "div", { class: "foo" })

    expect(wrapper.tagName.toLowerCase()).toEqual("div")
    expect(wrapper.firstChild).toEqual(el)
    expect(wrapper.className).toEqual("foo")

    var childEl = fabric.document.createElement("span")
    var parentEl = fabric.document.createElement("p")

    parentEl.appendChild(childEl)

    wrapper = wrapElement(childEl, "strong")

    // wrapper is now in between parent and child
    expect(wrapper.parentNode).toEqual(parentEl)
    expect(wrapper.firstChild).toEqual(childEl)
  })

  test("fabric.util.makeElementUnselectable", function (assert) {
    var makeElementUnselectable = fabric.util.makeElementUnselectable

    expect(typeof makeElementUnselectable === "function").toBeTruthy()

    var el = fabric.document.createElement("p")
    el.appendChild(fabric.document.createTextNode("foo"))

    expect(el).toEqual(makeElementUnselectable(el))
    if (typeof el.onselectstart !== "undefined") {
      expect(el.onselectstart).toEqual(fabric.util.falseFunction)
    }

    // not sure if it's a good idea to test implementation details here
    // functional test would probably make more sense
    if (typeof el.unselectable === "string") {
      expect("on").toEqual(el.unselectable)
    } else if (typeof el.userSelect !== "undefined") {
      expect("none").toEqual(el.userSelect)
    }
  })

  test("fabric.util.makeElementSelectable", function (assert) {
    var makeElementSelectable = fabric.util.makeElementSelectable,
      makeElementUnselectable = fabric.util.makeElementUnselectable

    expect(typeof makeElementSelectable === "function").toBeTruthy()

    var el = fabric.document.createElement("p")
    el.appendChild(fabric.document.createTextNode("foo"))

    makeElementUnselectable(el)
    makeElementSelectable(el)

    if (typeof el.onselectstart !== "undefined") {
      expect(el.onselectstart).toEqual(null)
    }
    if (typeof el.unselectable === "string") {
      expect("").toEqual(el.unselectable)
    } else if (typeof el.userSelect !== "undefined") {
      expect("").toEqual(el.userSelect)
    }
  })

  test("fabric.loadSVGFromURL", function (assert) {
    expect("function").toEqual(typeof fabric.loadSVGFromURL)
  })

  var SVG_DOC_AS_STRING =
    '<?xml version="1.0"?>\
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\
      <polygon fill="red" stroke="blue" stroke-width="10" points="350, 75 379,161 469,161\
        397,215 423,301 350,250 277,301 303,215 231,161 321,161" />\
    </svg>'

  test("fabric.loadSVGFromString", function (assert) {
    var done = assert.async()
    expect("function").toEqual(typeof fabric.loadSVGFromString)

    fabric.loadSVGFromString(SVG_DOC_AS_STRING, function (loadedObjects) {
      expect(loadedObjects[0] instanceof fabric.Polygon).toBeTruthy()
      expect("red").toEqual(loadedObjects[0].fill)
      setTimeout(done, 1000)
    })
  })

  test("fabric.loadSVGFromString with surrounding whitespace", function (
    assert
  ) {
    var done = assert.async()
    var loadedObjects = []
    fabric.loadSVGFromString("   \n\n  " + SVG_DOC_AS_STRING + "  ", function (
      objects
    ) {
      loadedObjects = objects
    })

    setTimeout(function () {
      expect(loadedObjects[0] instanceof fabric.Polygon).toBeTruthy()
      expect("red").toEqual(loadedObjects[0] && loadedObjects[0].fill)
      done()
    }, 1000)
  })

  test("fabric.util.loadImage", function (assert) {
    var done = assert.async()
    expect(typeof fabric.util.loadImage === "function").toBeTruthy()

    if (IMG_URL.indexOf("/home/travis") === 0) {
      // image can not be accessed on travis so we're returning early
      done()
      return
    }

    fabric.util.loadImage(IMG_URL, function (obj, isError) {
      if (obj) {
        var oImg = new fabric.Image(obj)
        expect(/fixtures\/very_large_image\.jpg$/.test(oImg.getSrc())).toBeTruthy()
        expect(!isError).toBeTruthy()
      }
      done()
    })
  })

  test("fabric.util.loadImage with no args", function (assert) {
    var done = assert.async()
    if (IMG_URL.indexOf("/home/travis") === 0) {
      // image can not be accessed on travis so we're returning early
      assert.expect(0)
      done()
      return
    }

    fabric.util.loadImage("", function () {
      expect(1).toBeTruthy()
      done()
    })
  })

  test("fabric.util.loadImage with crossOrigin", function (assert) {
    var done = assert.async()
    if (IMG_URL.indexOf("/home/travis") === 0) {
      // image can not be accessed on travis so we're returning early
      assert.expect(0)
      done()
      return
    }
    try {
      fabric.util.loadImage(
        IMG_URL,
        function (img, isError) {
          expect(img.src).toEqual(IMG_URL)
          expect(img.crossOrigin).toEqual("anonymous")
          expect(!isError).toBeTruthy()
          done()
        },
        null,
        "anonymous"
      )
    } catch (e) {
      console.log(e)
    }
  })

  test(
    "fabric.util.loadImage with url for a non exsiting image",
    function (assert) {
      var done = assert.async()
      try {
        fabric.util.loadImage(
          IMG_URL_NON_EXISTING,
          function (img, error) {
            expect(error).toEqual(true)
            done()
          },
          this
        )
      } catch (e) {}
    }
  )

  var SVG_WITH_1_ELEMENT =
    '<?xml version="1.0"?>\
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\
      <polygon fill="red" stroke="blue" stroke-width="10" points="350, 75 379,161 469,161\
        397,215 423,301 350,250 277,301 303,215 231,161 321,161" />\
    </svg>'

  var SVG_WITH_2_ELEMENTS =
    '<?xml version="1.0"?>\
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\
      <polygon fill="red" stroke="blue" stroke-width="10" points="350, 75 379,161 469,161\
        397,215 423,301 350,250 277,301 303,215 231,161 321,161" />\
      <polygon fill="red" stroke="blue" stroke-width="10" points="350, 75 379,161 469,161\
        397,215 423,301 350,250 277,301 303,215 231,161 321,161" />\
    </svg>'

  test("fabric.util.groupSVGElements", function (assert) {
    var done = assert.async()
    expect(typeof fabric.util.groupSVGElements === "function").toBeTruthy()

    var group1
    fabric.loadSVGFromString(SVG_WITH_1_ELEMENT, function (objects, options) {
      group1 = fabric.util.groupSVGElements(objects, options)
      expect(group1 instanceof fabric.Polygon).toBeTruthy()
      done()
    })
  })

  test("fabric.util.groupSVGElements #2", function (assert) {
    var done = assert.async()
    var group2
    fabric.loadSVGFromString(SVG_WITH_2_ELEMENTS, function (objects, options) {
      group2 = fabric.util.groupSVGElements(objects, options)
      expect(group2 instanceof fabric.Group).toBeTruthy()
      done()
    })
  })

  test("fabric.util.createClass", function (assert) {
    var Klass = fabric.util.createClass()

    expect(typeof Klass === "function").toBeTruthy()
    expect(typeof new Klass() === "object").toBeTruthy()

    var Person = fabric.util.createClass({
      initialize: function (firstName, lastName) {
        this.firstName = firstName
        this.lastName = lastName
      },
      toString: function () {
        return "My name is " + this.firstName + " " + this.lastName
      }
    })

    expect(typeof Person === "function").toBeTruthy()
    expect(typeof new Person() === "object").toBeTruthy()

    var john = new Person("John", "Meadows")
    expect(john instanceof Person).toBeTruthy()

    expect(john.firstName).toEqual("John")
    expect(john.lastName).toEqual("Meadows")
    expect(john + "").toEqual("My name is John Meadows")

    var WebDeveloper = fabric.util.createClass(Person, {
      initialize: function (firstName, lastName, skills) {
        this.callSuper("initialize", firstName, lastName)
        this.skills = skills
      },
      toString: function () {
        return (
          this.callSuper("toString") +
          " and my skills are " +
          this.skills.join(", ")
        )
      }
    })

    expect(typeof WebDeveloper === "function").toBeTruthy()
    var dan = new WebDeveloper("Dan", "Trink", ["HTML", "CSS", "Javascript"])
    expect(dan instanceof Person).toBeTruthy()
    expect(dan instanceof WebDeveloper).toBeTruthy()

    expect(dan.firstName).toEqual("Dan")
    expect(dan.lastName).toEqual("Trink")
    expect(dan.skills).toEqual(["HTML", "CSS", "Javascript"])

    expect(dan + "").toEqual("My name is Dan Trink and my skills are HTML, CSS, Javascript")
  })

  // element doesn't seem to have style on node
  if (!fabric.isLikelyNode) {
    test("fabric.util.setStyle", function (assert) {
      expect(typeof fabric.util.setStyle === "function").toBeTruthy()

      var el = fabric.document.createElement("div")

      fabric.util.setStyle(el, "color:red")
      expect(el.style.color).toEqual("red")
    })
  }

  test("fabric.util.addListener", function (assert) {
    expect(typeof fabric.util.addListener === "function").toBeTruthy()
    fabric.util.addListener(null, "mouseup")
    expect(true).toBeTruthy()
  })

  test("fabric.util.removeListener", function (assert) {
    expect(typeof fabric.util.removeListener === "function").toBeTruthy()
    fabric.util.removeListener(null, "mouseup")
    expect(true).toBeTruthy()
  })

  test("fabric.util.drawDashedLine", function (assert) {
    expect(typeof fabric.util.drawDashedLine === "function").toBeTruthy()

    var canvas = new fabric.StaticCanvas(null, { enableRetinaScaling: false })

    var ctx = canvas.getContext("2d")

    fabric.util.drawDashedLine(ctx, 0, 0, 100, 100, [5, 5])
  })

  test("fabric.util.array.invoke", function (assert) {
    expect(typeof fabric.util.array.invoke === "function").toBeTruthy()

    var obj1 = {
      toString: function () {
        return "obj1"
      }
    }
    var obj2 = {
      toString: function () {
        return "obj2"
      }
    }
    var obj3 = {
      toString: function () {
        return "obj3"
      }
    }

    expect(["obj1", "obj2", "obj3"]).toEqual(fabric.util.array.invoke([obj1, obj2, obj3], "toString"))

    expect(["f", "b", "b"]).toEqual(fabric.util.array.invoke(["foo", "bar", "baz"], "charAt", 0))

    expect(["o", "a", "a"]).toEqual(fabric.util.array.invoke(["foo", "bar", "baz"], "charAt", 1))
  })

  test("fabric.util.array.min", function (assert) {
    expect(typeof fabric.util.array.min === "function").toBeTruthy()

    expect(1).toEqual(fabric.util.array.min([1, 3, 2]))
    expect(-1).toEqual(fabric.util.array.min([3, 1, "f", 3, -1, 3]))
    expect(-3).toEqual(fabric.util.array.min([-1, -2, -3]))
    expect("a").toEqual(fabric.util.array.min(["a", "c", "b"]))

    var obj1 = {
      valueOf: function () {
        return 1
      }
    }
    var obj2 = {
      valueOf: function () {
        return 2
      }
    }
    var obj3 = {
      valueOf: function () {
        return 3
      }
    }

    expect(obj1).toEqual(fabric.util.array.min([obj1, obj3, obj2]))
  })

  test("fabric.util.array.max", function (assert) {
    expect(typeof fabric.util.array.max === "function").toBeTruthy()

    expect(3).toEqual(fabric.util.array.max([1, 3, 2]))
    expect(3).toEqual(fabric.util.array.max([3, 1, "f", 3, -1, 3]))
    expect(-1).toEqual(fabric.util.array.max([-1, -2, -3]))
    expect("c").toEqual(fabric.util.array.max(["a", "c", "b"]))

    var obj1 = {
      valueOf: function () {
        return 1
      }
    }
    var obj2 = {
      valueOf: function () {
        return 2
      }
    }
    var obj3 = {
      valueOf: function () {
        return 3
      }
    }

    expect(obj3).toEqual(fabric.util.array.max([obj1, obj3, obj2]))
  })

  test("fabric.util.populateWithProperties", function (assert) {
    expect(typeof fabric.util.populateWithProperties === "function").toBeTruthy()

    var source = {
        foo: "bar",
        baz: 123,
        qux: function () {}
      },
      destination = {}

    fabric.util.populateWithProperties(source, destination)
    expect(typeof destination.foo === "undefined").toBeTruthy()
    expect(typeof destination.baz === "undefined").toBeTruthy()
    expect(typeof destination.qux === "undefined").toBeTruthy()

    fabric.util.populateWithProperties(source, destination, ["foo"])
    expect(destination.foo).toEqual("bar")
    expect(typeof destination.baz === "undefined").toBeTruthy()
    expect(typeof destination.qux === "undefined").toBeTruthy()

    fabric.util.populateWithProperties(source, destination, [
      "foo",
      "baz",
      "ffffffffff"
    ])
    expect(destination.foo).toEqual("bar")
    expect(destination.baz).toEqual(123)
    expect(typeof destination.qux === "undefined").toBeTruthy()
    expect(typeof destination.ffffffffff === "undefined").toBeTruthy()
  })

  test("getKlass", function (assert) {
    expect(fabric.util.getKlass("circle")).toEqual(fabric.Circle)
    expect(fabric.util.getKlass("rect")).toEqual(fabric.Rect)
    expect(fabric.util.getKlass("RemoveWhite", "fabric.Image.filters")).toEqual(fabric.Image.filters.RemoveWhite)
    expect(fabric.util.getKlass("Sepia2", "fabric.Image.filters")).toEqual(fabric.Image.filters.Sepia2)
  })

  test("resolveNamespace", function (assert) {
    expect(fabric.util.resolveNamespace("fabric")).toEqual(fabric)
    expect(fabric.util.resolveNamespace("fabric.Image")).toEqual(fabric.Image)
    expect(fabric.util.resolveNamespace("fabric.Image.filters")).toEqual(fabric.Image.filters)
  })

  test("clearFabricFontCache", function (assert) {
    expect(typeof fabric.util.clearFabricFontCache === "function").toBeTruthy()
    fabric.charWidthsCache = {
      arial: { some: "cache" },
      helvetica: { some: "cache" }
    }
    fabric.util.clearFabricFontCache("arial")
    expect(fabric.charWidthsCache.arial).toEqual(undefined)
    expect(fabric.charWidthsCache.helvetica.some).toEqual("cache")
    fabric.util.clearFabricFontCache()
    expect(fabric.charWidthsCache).toEqual({})
  })

  test("clearFabricFontCache wrong case", function (assert) {
    fabric.charWidthsCache = {
      arial: { some: "cache" },
      helvetica: { some: "cache" }
    }
    fabric.util.clearFabricFontCache("ARIAL")
    expect(fabric.charWidthsCache.arial).toEqual(undefined)
    expect(fabric.charWidthsCache.helvetica.some).toEqual("cache")
  })

  test("parsePreserveAspectRatioAttribute", function (assert) {
    expect(typeof fabric.util.parsePreserveAspectRatioAttribute === "function").toBeTruthy()
    var parsed
    parsed = fabric.util.parsePreserveAspectRatioAttribute("none")
    expect(parsed.meetOrSlice).toEqual("meet")
    expect(parsed.alignX).toEqual("none")
    expect(parsed.alignY).toEqual("none")
    parsed = fabric.util.parsePreserveAspectRatioAttribute("none slice")
    expect(parsed.meetOrSlice).toEqual("slice")
    expect(parsed.alignX).toEqual("none")
    expect(parsed.alignY).toEqual("none")
    parsed = fabric.util.parsePreserveAspectRatioAttribute("XmidYmax meet")
    expect(parsed.meetOrSlice).toEqual("meet")
    expect(parsed.alignX).toEqual("mid")
    expect(parsed.alignY).toEqual("max")
  })

  test("multiplyTransformMatrices", function (assert) {
    expect(typeof fabric.util.multiplyTransformMatrices === "function").toBeTruthy()
    var m1 = [1, 1, 1, 1, 1, 1],
      m2 = [1, 1, 1, 1, 1, 1],
      m3
    m3 = fabric.util.multiplyTransformMatrices(m1, m2)
    expect(m3).toEqual([2, 2, 2, 2, 3, 3])
    m3 = fabric.util.multiplyTransformMatrices(m1, m2, true)
    expect(m3).toEqual([2, 2, 2, 2, 0, 0])
  })

  test("resetObjectTransform", function (assert) {
    expect(typeof fabric.util.resetObjectTransform === "function").toBeTruthy()
    var rect = new fabric.Rect({
      top: 1,
      width: 100,
      height: 100,
      angle: 30,
      scaleX: 2,
      scaleY: 1,
      flipX: true,
      flipY: true,
      skewX: 30,
      skewY: 30
    })
    expect(rect.skewX).toEqual(30)
    expect(rect.skewY).toEqual(30)
    expect(rect.scaleX).toEqual(2)
    expect(rect.scaleY).toEqual(1)
    expect(rect.flipX).toEqual(true)
    expect(rect.flipY).toEqual(true)
    expect(rect.angle).toEqual(30)
    fabric.util.resetObjectTransform(rect)
    expect(rect.skewX).toEqual(0)
    expect(rect.skewY).toEqual(0)
    expect(rect.scaleX).toEqual(1)
    expect(rect.scaleY).toEqual(1)
    expect(rect.flipX).toEqual(false)
    expect(rect.flipY).toEqual(false)
    expect(rect.angle).toEqual(0)
  })

  test("saveObjectTransform", function (assert) {
    expect(typeof fabric.util.saveObjectTransform === "function").toBeTruthy()
    var rect = new fabric.Rect({
      top: 1,
      width: 100,
      height: 100,
      angle: 30,
      scaleX: 2,
      scaleY: 1,
      flipX: true,
      flipY: true,
      skewX: 30,
      skewY: 30
    })
    var transform = fabric.util.saveObjectTransform(rect)
    expect(transform.skewX).toEqual(30)
    expect(transform.skewY).toEqual(30)
    expect(transform.scaleX).toEqual(2)
    expect(transform.scaleY).toEqual(1)
    expect(transform.flipX).toEqual(true)
    expect(transform.flipY).toEqual(true)
    expect(transform.angle).toEqual(30)
  })

  test("invertTransform", function (assert) {
    expect(typeof fabric.util.invertTransform === "function").toBeTruthy()
    var m1 = [1, 2, 3, 4, 5, 6],
      m3
    m3 = fabric.util.invertTransform(m1)
    expect(m3).toEqual([-2, 1, 1.5, -0.5, 1, -2])
  })

  test("fabric.util.request", function (assert) {
    expect(typeof fabric.util.request === "function").toBeTruthy()
  })

  test("fabric.util.getPointer", function (assert) {
    expect(typeof fabric.util.getPointer === "function").toBeTruthy()
  })

  test("rotateVector", function (assert) {
    expect(typeof fabric.util.rotateVector === "function").toBeTruthy()
  })

  test("rotatePoint", function (assert) {
    expect(typeof fabric.util.rotatePoint === "function").toBeTruthy()
    var origin = new fabric.Point(3, 0)
    var point = new fabric.Point(4, 0)
    var rotated = fabric.util.rotatePoint(point, origin, Math.PI)
    expect(Math.round(rotated.x)).toEqual(2)
    expect(Math.round(rotated.y)).toEqual(0)
    var rotated = fabric.util.rotatePoint(point, origin, Math.PI / 2)
    expect(Math.round(rotated.x)).toEqual(3)
    expect(Math.round(rotated.y)).toEqual(-2)
  })

  test("transformPoint", function (assert) {
    expect(typeof fabric.util.transformPoint === "function").toBeTruthy()
    var point = new fabric.Point(2, 2)
    var matrix = [3, 0, 0, 2, 10, 4]
    var tp = fabric.util.transformPoint(point, matrix)
    expect(Math.round(tp.x)).toEqual(16)
    expect(Math.round(tp.y)).toEqual(8)
  })

  test("makeBoundingBoxFromPoints", function (assert) {
    expect(typeof fabric.util.makeBoundingBoxFromPoints === "function").toBeTruthy()
  })

  test("parseUnit", function (assert) {
    expect(typeof fabric.util.parseUnit === "function").toBeTruthy()
    expect(Math.round(fabric.util.parseUnit("30mm"), 0)).toEqual(113)
    expect(Math.round(fabric.util.parseUnit("30cm"), 0)).toEqual(1134)
    expect(Math.round(fabric.util.parseUnit("30in"), 0)).toEqual(2880)
    expect(Math.round(fabric.util.parseUnit("30pt"), 0)).toEqual(40)
    expect(Math.round(fabric.util.parseUnit("30pc"), 0)).toEqual(480)
  })

  test("createCanvasElement", function (assert) {
    expect(typeof fabric.util.createCanvasElement === "function").toBeTruthy()
    var element = fabric.util.createCanvasElement()
    expect(element.getContext).toBeTruthy()
  })

  test("createImage", function (assert) {
    expect(typeof fabric.util.createImage === "function").toBeTruthy()
    var element = fabric.util.createImage()
    expect(element.naturalHeight).toEqual(0)
    expect(element.naturalWidth).toEqual(0)
  })

  // test('createAccessors', function(assert) {
  //   assert.ok(typeof fabric.util.createAccessors === 'function');
  // });

  test("qrDecompose with identity matrix", function (assert) {
    expect(typeof fabric.util.qrDecompose === "function").toBeTruthy()
    var options = fabric.util.qrDecompose(fabric.iMatrix)
    expect(options.scaleX).toEqual(1)
    expect(options.scaleY).toEqual(1)
    expect(options.skewX).toEqual(0)
    expect(options.skewY).toEqual(0)
    expect(options.angle).toEqual(0)
    expect(options.translateX).toEqual(0)
    expect(options.translateY).toEqual(0)
  })

  test("qrDecompose with matrix", function (assert) {
    expect(typeof fabric.util.qrDecompose === "function").toBeTruthy()
    var options = fabric.util.qrDecompose([2, 0.4, 0.5, 3, 100, 200])
    expect(Math.round(options.scaleX, 4)).toEqual(2)
    expect(Math.round(options.scaleY, 4)).toEqual(3)
    expect(Math.round(options.skewX, 4)).toEqual(28)
    expect(options.skewY).toEqual(0)
    expect(Math.round(options.angle, 4)).toEqual(11)
    expect(options.translateX).toEqual(100)
    expect(options.translateY).toEqual(200)
  })

  test("composeMatrix with defaults", function (assert) {
    expect(typeof fabric.util.composeMatrix === "function").toBeTruthy()
    var matrix = fabric.util
      .composeMatrix({
        scaleX: 2,
        scaleY: 3,
        skewX: 28,
        angle: 11,
        translateX: 100,
        translateY: 200
      })
      .map(function (val) {
        return fabric.util.toFixed(val, 2)
      })
    expect(matrix).toEqual([1.96, 0.38, 0.47, 3.15, 100, 200])
  })

  test("composeMatrix with options", function (assert) {
    expect(typeof fabric.util.composeMatrix === "function").toBeTruthy()
    var matrix = fabric.util.composeMatrix({})
    expect(matrix).toEqual(fabric.iMatrix)
  })

  test("drawArc", function (assert) {
    expect(typeof fabric.util.drawArc === "function").toBeTruthy()
    var canvas = (this.canvas = new fabric.StaticCanvas(null, {
      enableRetinaScaling: false,
      width: 600,
      height: 600
    }))
    var ctx = canvas.contextContainer
    fabric.util.drawArc(ctx, 0, 0, [50, 30, 0, 1, 1, 100, 100])
    fabric.util.drawArc(ctx, 0, 0, [50, 30, 0, 1, 1, 100, 100])
  })

  test("get bounds of arc", function (assert) {
    expect(typeof fabric.util.getBoundsOfArc === "function").toBeTruthy()
    var bounds = fabric.util.getBoundsOfArc(0, 0, 50, 30, 0, 1, 1, 100, 100)
    var expectedBounds = [
      { x: 0, y: -8.318331151877368 },
      { x: 133.33333333333331, y: 19.99999999999999 },
      { x: 100.00000000000003, y: 19.99999999999999 },
      { x: 147.19721858646224, y: 100 }
    ]
    expect(bounds).toEqual(expectedBounds)
  })

  test("fabric.util.limitDimsByArea", function (assert) {
    expect(typeof fabric.util.limitDimsByArea === "function").toBeTruthy()
    var dims = fabric.util.limitDimsByArea(1, 10000)
    expect(dims.x).toEqual(100)
    expect(dims.y).toEqual(100)
  })

  test("fabric.util.limitDimsByArea ar > 1", function (assert) {
    var dims = fabric.util.limitDimsByArea(3, 10000)
    expect(dims.x).toEqual(173)
    expect(dims.y).toEqual(57)
  })

  test("fabric.util.limitDimsByArea ar < 1", function (assert) {
    var dims = fabric.util.limitDimsByArea(1 / 3, 10000)
    expect(dims.x).toEqual(57)
    expect(dims.y).toEqual(173)
  })

  test("fabric.util.capValue ar < 1", function (assert) {
    expect(typeof fabric.util.capValue === "function").toBeTruthy()
    var val = fabric.util.capValue(3, 10, 70)
    expect(val).toEqual(10)
  })

  test("fabric.util.capValue ar < 1", function (assert) {
    expect(typeof fabric.util.capValue === "function").toBeTruthy()
    var val = fabric.util.capValue(3, 1, 70)
    expect(val).toEqual(3)
  })

  test("fabric.util.capValue ar < 1", function (assert) {
    expect(typeof fabric.util.capValue === "function").toBeTruthy()
    var val = fabric.util.capValue(3, 80, 70)
    expect(val).toEqual(70)
  })

  test("fabric.util.cos", function (assert) {
    expect(typeof fabric.util.cos === "function").toBeTruthy()
    expect(fabric.util.cos(0)).toEqual(1)
    expect(fabric.util.cos(Math.PI / 2)).toEqual(0)
    expect(fabric.util.cos(Math.PI)).toEqual(-1)
    expect(fabric.util.cos((3 * Math.PI) / 2)).toEqual(0)
  })

  test("fabric.util.getSvgAttributes", function (assert) {
    expect(typeof fabric.util.getSvgAttributes === "function").toBeTruthy()
    expect(fabric.util.getSvgAttributes("")).toEqual(["instantiated_by_use", "style", "id", "class"])
    expect(fabric.util.getSvgAttributes("linearGradient")).toEqual([
      "instantiated_by_use",
      "style",
      "id",
      "class",
      "x1",
      "y1",
      "x2",
      "y2",
      "gradientUnits",
      "gradientTransform"
    ])
    expect(fabric.util.getSvgAttributes("radialGradient")).toEqual([
      "instantiated_by_use",
      "style",
      "id",
      "class",
      "gradientUnits",
      "gradientTransform",
      "cx",
      "cy",
      "r",
      "fx",
      "fy",
      "fr"
    ])
    expect(fabric.util.getSvgAttributes("stop")).toEqual([
      "instantiated_by_use",
      "style",
      "id",
      "class",
      "offset",
      "stop-color",
      "stop-opacity"
    ])
  })

  test("fabric.util.enlivenPatterns", function (assert) {
    expect(typeof fabric.util.enlivenPatterns === "function").toBeTruthy()
    fabric.util.enlivenPatterns([], function () {
      expect(true).toBeTruthy()
    })
  })

  test("fabric.util.copyCanvasElement", function (assert) {
    expect(typeof fabric.util.copyCanvasElement === "function").toBeTruthy()
    var c = fabric.util.createCanvasElement()
    c.width = 10
    c.height = 20
    c.getContext("2d").fillStyle = "red"
    c.getContext("2d").fillRect(0, 0, 10, 10)
    var b = fabric.util.copyCanvasElement(c)
    expect(b.width).toEqual(10)
    expect(b.height).toEqual(20)
    var data = b.getContext("2d").getImageData(1, 1, 1, 1).data
    expect(data[0]).toEqual(255)
    expect(data[1]).toEqual(0)
    expect(data[2]).toEqual(0)
    expect(data[3]).toEqual(255)
  })

  test("fabric.util.findScaleToCover", function (assert) {
    expect(typeof fabric.util.findScaleToCover === "function").toBeTruthy()
    var scale = fabric.util.findScaleToCover(
      {
        width: 100,
        height: 200
      },
      {
        width: 50,
        height: 50
      }
    )
    expect(scale).toEqual(0.5)
    var scale = fabric.util.findScaleToCover(
      {
        width: 10,
        height: 25
      },
      {
        width: 50,
        height: 50
      }
    )
    expect(scale).toEqual(5)
  })

  test("fabric.util.findScaleToFit", function (assert) {
    expect(typeof fabric.util.findScaleToFit === "function").toBeTruthy()
    var scale = fabric.util.findScaleToFit(
      {
        width: 100,
        height: 200
      },
      {
        width: 50,
        height: 50
      }
    )
    expect(scale).toEqual(0.25)
    var scale = fabric.util.findScaleToFit(
      {
        width: 10,
        height: 25
      },
      {
        width: 50,
        height: 50
      }
    )
    expect(scale).toEqual(2)
  })

  test("fabric.util.isTouchEvent", function (assert) {
    expect(typeof fabric.util.isTouchEvent === "function").toBeTruthy()
    expect(fabric.util.isTouchEvent({ type: "touchstart" })).toBeTruthy()
    expect(fabric.util.isTouchEvent({ type: "touchend" })).toBeTruthy()
    expect(fabric.util.isTouchEvent({ type: "touchmove" })).toBeTruthy()
    expect(fabric.util.isTouchEvent({ pointerType: "touch" })).toBeTruthy()
    expect(fabric.util.isTouchEvent({ type: "mousedown" })).toBeFalsy()
    expect(fabric.util.isTouchEvent({ pointerType: "mouse" })).toBeFalsy()
  })
})()
