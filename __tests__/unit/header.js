describe("fabric header.js", () => {
  test("default values", function () {
    expect(typeof fabric.document !== "undefined").toBeTruthy()
    expect(typeof fabric.window !== "undefined").toBeTruthy()
    expect(typeof fabric.isTouchSupported !== "undefined").toBeTruthy()
    expect(typeof fabric.isLikelyNode !== "undefined").toBeTruthy()
    expect(fabric.SHARED_ATTRIBUTES.length).toBe(19)
  })

  test("initFilterBackend", function () {
    expect(typeof fabric.initFilterBackend === "function").toBeTruthy()
    expect(typeof fabric.maxTextureSize === "undefined").toBeTruthy()
    fabric.initFilterBackend()
  })
})
