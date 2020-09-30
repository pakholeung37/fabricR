var collection = fabric.Collection
collection.requestRenderAll = function () {
  this.rendered++
}
describe("fabric.Collection", () => {
  beforeEach(function () {
    collection.rendered = 0
    collection._objects = []
    delete collection.renderOnAddRemove
    delete collection._onObjectAdded
    delete collection._onObjectRemoved
  })

  test("add", function () {
    var obj = { prop: 4 },
      fired = 0
    expect(typeof collection.add === "function").toBeTruthy()
    expect(collection._objects).toEqual([])
    var returned = collection.add(obj)
    expect(returned).toBe(collection)
    expect(collection._objects[0]).toBe(obj)
    expect(fired).toBe(0)

    collection._onObjectAdded = function () {
      fired++
    }
    collection.add(obj)
    expect(collection._objects[1]).toBe(obj)
    expect(fired).toBe(1)
    collection.renderOnAddRemove = true
    expect(collection.rendered).toBe(0)
    collection.add(obj)
    expect(collection.rendered).toBe(1)
    expect(collection._objects.length).toBe(3)
    fired = 0
    collection.add(obj, obj, obj, obj)
    expect(fired).toBe(4)
    expect(collection._objects.length).toBe(7)
    expect(collection.rendered).toBe(2)
  })

  test("insertAt", function () {
    var obj = { prop: 4 },
      fired = 0,
      index = 1,
      nonSplicing = false
    collection._objects = [{ prop: 0 }, { prop: 1 }]
    expect(typeof collection.insertAt === "function").toBeTruthy()
    var previousObject = collection._objects[index]
    var previousLenght = collection._objects.length
    collection.insertAt(obj, index, nonSplicing)
    expect(collection._objects[index]).toBe(obj)
    expect(collection._objects[index + 1]).toBe(previousObject)
    expect(collection._objects.length).toBe(previousLenght + 1)

    nonSplicing = true
    previousLenght = collection._objects.length
    var newObject = { prop: 5 }
    previousObject = collection._objects[index]
    var returned = collection.insertAt(newObject, index, nonSplicing)
    expect(returned).toBe(collection)
    expect(collection._objects[index]).toBe(newObject)
    expect(collection._objects[index + 1]).not.toBe(previousObject)
    expect(collection._objects.indexOf(previousObject)).toBe(-1)
    expect(collection._objects.length).toBe(previousLenght)
    expect(typeof collection._onObjectAdded === "undefined").toBeTruthy()
    expect(fired).toBe(0)
    collection._onObjectAdded = function () {
      fired++
    }
    collection.insertAt(obj, 1)
    expect(fired).toBe(1)
    collection.renderOnAddRemove = true
    collection.insertAt(obj, 1)
    expect(collection.rendered).toBe(1)
  })

  test("remove", function () {
    var obj = { prop: 4 },
      obj2 = { prop: 2 },
      obj3 = { prop: 3 },
      fired = 0
    collection.add({ prop: 0 }, { prop: 1 }, obj2, obj, obj3)
    var previousLenght = collection._objects.length
    expect(typeof collection.remove === "function").toBeTruthy()
    var returned = collection.remove(obj)
    expect(returned).toBe(collection)
    expect(collection._objects.indexOf(obj)).toBe(-1)
    expect(collection._objects.length).toBe(previousLenght - 1)
    expect(fired).toBe(0)
    collection._onObjectRemoved = function () {
      fired++
    }
    collection.remove(obj2)
    expect(fired).toBe(1)
    collection.remove(obj2)
    expect(fired).toBe(1)

    collection.add(obj2)
    collection.add(obj)
    collection.renderOnAddRemove = true
    expect(collection.rendered).toBe(0)
    collection.remove(obj2)
    expect(collection.rendered).toBe(1)
    previousLenght = collection._objects.length
    fired = 0
    collection.remove(obj, obj3)
    expect(collection._objects.length).toBe(previousLenght - 2)
    expect(fired).toBe(2)
    expect(collection.rendered).toBe(2)
  })

  test("forEachObject", function () {
    var obj = { prop: false },
      obj2 = { prop: false },
      obj3 = { prop: false },
      fired = 0
    collection.add(obj2, obj, obj3)
    expect(typeof collection.forEachObject === "function").toBeTruthy()
    var callback = function (_obj) {
      _obj.prop = true
      fired++
    }
    var returned = collection.forEachObject(callback)
    expect(returned).toBe(collection)
    expect(fired).toBe(collection._objects.length)
    expect(obj.prop).toBe(true)
    expect(obj2.prop).toBe(true)
    expect(obj3.prop).toBe(true)
  })

  test("getObjects", function () {
    var obj = { type: "a" },
      obj2 = { type: "b" }
    collection.add(obj2, obj)
    expect(typeof collection.getObjects === "function").toBeTruthy()
    var returned = collection.getObjects()
    expect(returned).not.toBe(collection._objects)
    returned = collection.getObjects("a")
    expect(returned).not.toBe(collection._objects)
    expect(returned.indexOf(obj2)).toBe(-1)
    expect(returned.indexOf(obj)).toBe(0)
  })

  test("item", function () {
    var obj = { type: "a" },
      obj2 = { type: "b" },
      index = 1
    collection.add(obj2, obj)
    expect(typeof collection.item === "function").toBeTruthy()
    var returned = collection.item(index)
    expect(returned).toBe(collection._objects[index])
  })

  test("isEmpty", function () {
    var obj = { type: "a" },
      obj2 = { type: "b" }
    expect(typeof collection.isEmpty === "function").toBeTruthy()
    var returned = collection.isEmpty()
    expect(returned).toBe(true)
    collection.add(obj2, obj)
    returned = collection.isEmpty()
    expect(returned).toBe(false)
  })

  test("size", function () {
    var obj = { type: "a" },
      obj2 = { type: "b" }
    expect(typeof collection.size === "function").toBeTruthy()
    var returned = collection.size()
    expect(typeof returned === "number").toBeTruthy()
    expect(returned).toBe(0)
    collection.add(obj2, obj)
    returned = collection.size()
    expect(returned).toBe(2)
  })

  test("contains", function () {
    var obj = { type: "a" }
    expect(typeof collection.contains === "function").toBeTruthy()
    var returned = collection.contains(obj)
    expect(typeof returned === "boolean").toBeTruthy()
    expect(returned).toBe(false)
    collection.add(obj)
    returned = collection.contains(obj)
    expect(returned).toBe(true)
  })

  test("complexity", function () {
    var obj = { type: "a" },
      obj2 = { type: "b" }
    expect(typeof collection.complexity === "function").toBeTruthy()
    var returned = collection.complexity()
    expect(typeof returned === "number").toBeTruthy()
    expect(returned).toBe(0)
    collection.add(obj2, obj)
    returned = collection.complexity()
    expect(returned).toBe(0)
    var complexObject = {
      complexity: function () {
        return 9
      }
    }
    var complexObject2 = {
      complexity: function () {
        return 10
      }
    }
    collection.add(complexObject, complexObject2)
    returned = collection.complexity()
    expect(returned).toBe(19)
  })
})
