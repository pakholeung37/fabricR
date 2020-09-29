;(function () {
  describe("fabric header.js")

  test("default values", function (assert) {
    expect(typeof fabric.document !== "undefined").toBeTruthy()
    expect(typeof fabric.window !== "undefined").toBeTruthy()
    expect(typeof fabric.isTouchSupported !== "undefined").toBeTruthy()
    expect(typeof fabric.isLikelyNode !== "undefined").toBeTruthy()
    expect(fabric.SHARED_ATTRIBUTES.length).toEqual(19)
  })

  test("initFilterBackend", function (assert) {
    expect(typeof fabric.initFilterBackend === "function").toBeTruthy()
    expect(typeof fabric.maxTextureSize === "undefined").toBeTruthy()
    fabric.initFilterBackend()
  })
})()
