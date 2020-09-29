describe("fabric.Observable")

test("fabric.Observable exists", function (assert) {
  expect(fabric.Observable).toBeTruthy()
  expect(fabric.Observable.fire).toBeTruthy()
  expect(fabric.Observable.on).toBeTruthy()
  expect(fabric.Observable.off).toBeTruthy()
})

test("fire + on", function (assert) {
  var foo = {}
  fabric.util.object.extend(foo, fabric.Observable)

  var eventFired = false
  foo.on("bar:baz", function () {
    eventFired = true
  })

  foo.fire("bar:baz")
  expect(eventFired).toEqual(true)
})

test("off", function (assert) {
  var foo = {}
  fabric.util.object.extend(foo, fabric.Observable)

  var eventFired = false
  var handler = function () {
    eventFired = true
  }
  foo.on("bar:baz", handler)
  foo.off("bar:baz", handler)

  foo.fire("bar:baz")
  expect(eventFired).toEqual(false)
})

test("off without handler", function (assert) {
  var foo = {}
  fabric.util.object.extend(foo, fabric.Observable)

  var eventFired = false,
    event2Fired = false

  var handler = function () {
    eventFired = true
  }
  var handler2 = function () {
    event2Fired = true
  }
  foo.on("bar:baz", handler)
  foo.on("bar:baz", handler2)

  foo.off("bar:baz")

  foo.fire("bar:baz")
  expect(eventFired).toEqual(false)
  expect(event2Fired).toEqual(false)

  foo.on("bar:baz", handler)
  foo.on("bar:baz", handler2)

  foo.off({ "bar:baz": null })

  foo.fire("bar:baz")
  expect(eventFired).toEqual(false)
  expect(event2Fired).toEqual(false)
})

test("off multiple handlers", function (assert) {
  var foo = {}
  fabric.util.object.extend(foo, fabric.Observable)

  var eventFired = false,
    event2Fired = false

  var handler = function () {
    eventFired = true
  }
  var handler2 = function () {
    event2Fired = true
  }
  foo.on({ "bar:baz": handler, "blah:blah": handler2 })

  foo.off({ "bar:baz": handler, "blah:blah": handler2 })

  foo.fire("bar:baz")
  expect(eventFired).toEqual(false)
  foo.fire("blah:blah")
  expect(event2Fired).toEqual(false)
})

test("off all events", function (assert) {
  var foo = {}
  fabric.util.object.extend(foo, fabric.Observable)

  var eventFired = false,
    event2Fired = false

  var handler = function () {
    eventFired = true
  }
  var handler2 = function () {
    event2Fired = true
  }
  foo.on({ "bar:baz": handler, "blah:blah": handler2 })

  foo.off()

  foo.fire("bar:baz")
  expect(eventFired).toEqual(false)
  foo.fire("blah:blah")
  expect(event2Fired).toEqual(false)
})

test("on multiple handlers", function (assert) {
  var foo = {}
  fabric.util.object.extend(foo, fabric.Observable)

  var barBazFired = false
  var blahBlahFired = false
  var mooFired = false

  foo.on({
    "bar:baz": function () {
      barBazFired = true
    },
    "blah:blah": function () {
      blahBlahFired = true
    },
    moo: function () {
      mooFired = true
    }
  })

  foo.fire("bar:baz")
  foo.fire("blah:blah")
  foo.fire("moo")

  expect(barBazFired).toEqual(true)
  expect(blahBlahFired).toEqual(true)
  expect(mooFired).toEqual(true)
})

test("event options", function (assert) {
  var foo = {}
  fabric.util.object.extend(foo, fabric.Observable)

  var someValue
  foo.on("foo:bar", function (e) {
    someValue = e.value
  })

  foo.fire("foo:bar", { value: "sekret" })

  expect(someValue).toEqual("sekret")
})

test("fire", function (assert) {
  var foo = {}
  fabric.util.object.extend(foo, fabric.Observable)

  var eventFired = false
  var context
  foo.on("bar:baz", function () {
    context = this
    eventFired = true
  })

  foo.fire("bar:baz")
  expect(eventFired).toEqual(true)
  expect(context).toEqual(foo)
})

test("removal of past events", function (assert) {
  var foo = {},
    event1Fired = false,
    event2Fired = false,
    event3Fired = false,
    event4Fired = false,
    handler1 = function () {
      event1Fired = true
      foo.off("bar:baz", handler1)
    },
    handler2 = function () {
      event2Fired = true
    },
    handler3 = function () {
      event3Fired = true
    },
    handler4 = function () {
      event4Fired = true
    }

  fabric.util.object.extend(foo, fabric.Observable)
  foo.on("bar:baz", handler1)
  foo.on("bar:baz", handler2)
  foo.on("bar:baz", handler3)
  foo.on("bar:baz", handler4)
  expect(foo.__eventListeners["bar:baz"].length).toEqual(4)
  foo.fire("bar:baz")
  expect(foo.__eventListeners["bar:baz"].length).toEqual(3)
  expect(event1Fired).toEqual(true)
  expect(event2Fired).toEqual(true)
  expect(event3Fired).toEqual(true)
  expect(event4Fired).toEqual(true)
})

test("removal of past events inner loop", function (assert) {
  var foo = {},
    event1Fired = 0,
    event2Fired = 0,
    event3Fired = 0,
    event4Fired = 0,
    handler1 = function () {
      event1Fired++
      foo.off("bar:baz", handler1)
      expect(foo.__eventListeners["bar:baz"].length).toEqual(4)
      expect(event1Fired).toEqual(1)
      expect(event2Fired).toEqual(0)
      expect(event3Fired).toEqual(0)
      expect(event4Fired).toEqual(0)
      foo.fire("bar:baz")
      expect(foo.__eventListeners["bar:baz"].length).toEqual(3)
    },
    handler2 = function () {
      event2Fired++
    },
    handler3 = function () {
      event3Fired++
    },
    handler4 = function () {
      event4Fired++
    }

  fabric.util.object.extend(foo, fabric.Observable)
  foo.on("bar:baz", handler1)
  foo.on("bar:baz", handler2)
  foo.on("bar:baz", handler3)
  foo.on("bar:baz", handler4)
  foo.fire("bar:baz")
  expect(event1Fired).toEqual(1)
  expect(event2Fired).toEqual(2)
  expect(event3Fired).toEqual(2)
  expect(event4Fired).toEqual(2)
})

test("adding events", function (assert) {
  var foo = {},
    event1Fired = false,
    event2Fired = false,
    event3Fired = false,
    event4Fired = false,
    handler1 = function () {
      event1Fired = true
      foo.off("bar:baz", handler1)
      foo.on("bar:baz", handler3)
      foo.on("bar:baz", handler4)
    },
    handler2 = function () {
      event2Fired = true
    },
    handler3 = function () {
      event3Fired = true
    },
    handler4 = function () {
      event4Fired = true
    }

  fabric.util.object.extend(foo, fabric.Observable)
  foo.on("bar:baz", handler1)
  foo.on("bar:baz", handler2)
  foo.fire("bar:baz")
  expect(event1Fired).toEqual(true)
  expect(event2Fired).toEqual(true)
  expect(event3Fired).toEqual(false)
  expect(event4Fired).toEqual(false)
  foo.fire("bar:baz")
  expect(event3Fired).toEqual(true)
  expect(event4Fired).toEqual(true)
})

test("chaining", function (assert) {
  var foo = {}
  fabric.util.object.extend(foo, fabric.Observable)

  var event1Fired = false,
    event2Fired = false
  foo
    .on("event1", function () {
      event1Fired = true
    })
    .on("event2", function () {
      event2Fired = true
    })

  foo.fire("event2").fire("event1")

  expect(event1Fired).toEqual(true)
  expect(event2Fired).toEqual(true)

  event1Fired = false
  event2Fired = false

  foo.off("event1").off("event2")
  foo.fire("event2").fire("event1")

  expect(event1Fired).toEqual(false)
  expect(event2Fired).toEqual(false)
})
