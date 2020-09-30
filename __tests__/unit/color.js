describe("fabric.Color", () => {
  test("constructor", function () {
    var oColor = new fabric.Color("ff5555")
    expect(oColor).toBeTruthy()
    expect(oColor instanceof fabric.Color).toBeTruthy()
    expect(oColor.toHex()).toBe("FF5555")

    oColor = new fabric.Color("rgb(100,100,100)")
    expect(oColor).toBeTruthy()
    expect(oColor instanceof fabric.Color).toBeTruthy()
    expect(oColor.toRgb()).toBe("rgb(100,100,100)")

    oColor = new fabric.Color("rgba(100,100,100, 0.5)")
    expect(oColor).toBeTruthy()
    expect(oColor instanceof fabric.Color).toBeTruthy()
    expect(oColor.toRgba()).toBe("rgba(100,100,100,0.5)")

    oColor = new fabric.Color("hsl(262,80%,12%)")
    expect(oColor).toBeTruthy()
    expect(oColor instanceof fabric.Color).toBeTruthy()
    expect(oColor.toHsl()).toBe("hsl(262,80%,12%)")
  })

  test("empty args", function () {
    var oColor = new fabric.Color()
    expect(oColor).toBeTruthy()
    expect(oColor instanceof fabric.Color).toBeTruthy()
    expect(oColor.toHex()).toBe("000000")
  })

  test("getSource", function () {
    var oColor = new fabric.Color("ffffff")
    expect(typeof oColor.getSource === "function").toBeTruthy()
    expect(oColor.getSource()).toEqual([255, 255, 255, 1])
  })

  test("setSource", function () {
    var oColor = new fabric.Color("ffffff")
    expect(typeof oColor.setSource === "function").toBeTruthy()
    oColor.setSource([0, 0, 0, 1])
    expect(oColor.getSource()).toEqual([0, 0, 0, 1])
  })

  test("toRgb", function () {
    var oColor = new fabric.Color("ffffff")
    expect(typeof oColor.toRgb === "function").toBeTruthy()
    expect(oColor.toRgb()).toBe("rgb(255,255,255)")
    oColor.setSource([0, 0, 0, 0.5])
    expect(oColor.toRgb()).toBe("rgb(0,0,0)")
  })

  test("toRgba", function () {
    var oColor = new fabric.Color("ffffff")
    expect(typeof oColor.toRgba === "function").toBeTruthy()
    expect(oColor.toRgba()).toBe("rgba(255,255,255,1)")
    oColor.setSource([0, 0, 0, 0.5])
    expect(oColor.toRgba()).toBe("rgba(0,0,0,0.5)")
  })

  test("toHsl", function () {
    var oColor = new fabric.Color("ffffff")
    expect(typeof oColor.toHsl === "function").toBeTruthy()
    expect(oColor.toHsl()).toBe("hsl(0,0%,100%)")
    oColor.setSource([0, 0, 0, 0.5])
    expect(oColor.toHsl()).toBe("hsl(0,0%,0%)")
  })

  test("toHsla", function () {
    var oColor = new fabric.Color("ffffff")
    expect(typeof oColor.toHsla === "function").toBeTruthy()
    expect(oColor.toHsla()).toBe("hsla(0,0%,100%,1)")
    oColor.setSource([0, 0, 0, 0.5])
    expect(oColor.toHsla()).toBe("hsla(0,0%,0%,0.5)")
  })

  test("toHex", function () {
    var oColor = new fabric.Color("ffffff")
    expect(typeof oColor.toHex === "function").toBeTruthy()
    expect(oColor.toHex()).toBe("FFFFFF")
    oColor.setSource([0, 0, 0, 0.5])
    expect(oColor.toHex()).toBe("000000")
  })

  test("toHexa", function () {
    var oColor = new fabric.Color("ffffffff")
    expect(typeof oColor.toHexa === "function").toBeTruthy()
    expect(oColor.toHexa()).toBe("FFFFFFFF")
    oColor.setSource([255, 255, 255, 0.1])
    expect(oColor.toHexa()).toBe("FFFFFF1A")
  })

  test("getAlpha", function () {
    var oColor = new fabric.Color("ffffff")
    expect(typeof oColor.getAlpha === "function").toBeTruthy()
    expect(oColor.getAlpha()).toBe(1)
    oColor.setSource([10, 20, 30, 0.456])
    expect(oColor.getAlpha()).toBe(0.456)
    oColor = new fabric.Color("ffffffcc")
    expect(oColor.getAlpha()).toBe(0.8)
  })

  test("setAlpha", function () {
    var oColor = new fabric.Color("ffffff")
    expect(typeof oColor.setAlpha === "function").toBeTruthy()
    oColor.setAlpha(0.1234)
    expect(oColor.getAlpha()).toBe(0.1234)
    expect(oColor.setAlpha(0)).toBe(oColor)
  })

  test("toGrayscale", function () {
    var oColor = new fabric.Color("ff5555")
    expect(typeof oColor.toGrayscale === "function").toBeTruthy()
    oColor.toGrayscale()
    expect(oColor.toHex()).toBe("888888")
    oColor.setSource([10, 20, 30, 1])
    expect(oColor.toGrayscale()).toBe(oColor)
    expect(oColor.toHex()).toBe("121212")
  })

  test("toBlackWhite", function () {
    var oColor = new fabric.Color("333333")
    expect(typeof oColor.toBlackWhite === "function").toBeTruthy()
    oColor.toBlackWhite()
    expect(oColor.toHex()).toBe("000000")
    oColor.setSource([200, 200, 200, 1])
    expect(oColor.toBlackWhite()).toBe(oColor)
    expect(oColor.toHex()).toBe("FFFFFF")
    oColor.setSource([127, 127, 127, 1])
    oColor.toBlackWhite(200)
    expect(oColor.toHex()).toBe("000000")
  })

  test("fromRgb", function () {
    expect(typeof fabric.Color.fromRgb === "function").toBeTruthy()
    var originalRgb = "rgb(255,255,255)"
    var oColor = fabric.Color.fromRgb(originalRgb)
    expect(oColor).toBeTruthy()
    expect(oColor instanceof fabric.Color).toBeTruthy()
    expect(oColor.toRgb()).toBe(originalRgb)
    expect(oColor.toHex()).toBe("FFFFFF")
  })

  test("fromRgb (with whitespaces)", function () {
    expect(typeof fabric.Color.fromRgb === "function").toBeTruthy()
    var originalRgb = "rgb( 255 , 255 , 255 )"
    var oColor = fabric.Color.fromRgb(originalRgb)
    expect(oColor).toBeTruthy()
    expect(oColor instanceof fabric.Color).toBeTruthy()
    expect(oColor.toRgb()).toBe("rgb(255,255,255)")
    expect(oColor.toHex()).toBe("FFFFFF")
  })

  test("fromRgb (percentage values)", function () {
    expect(typeof fabric.Color.fromRgb === "function").toBeTruthy()
    var originalRgb = "rgb(100%,100%,100%)"
    var oColor = fabric.Color.fromRgb(originalRgb)
    expect(oColor).toBeTruthy()
    expect(oColor instanceof fabric.Color).toBeTruthy()
    expect(oColor.toRgb()).toBe("rgb(255,255,255)")
    expect(oColor.toHex()).toBe("FFFFFF")
  })

  test("fromRgb (percentage values with whitespaces)", function () {
    expect(typeof fabric.Color.fromRgb === "function").toBeTruthy()
    var originalRgb = "rgb( 100% , 100% , 100% )"
    var oColor = fabric.Color.fromRgb(originalRgb)
    expect(oColor).toBeTruthy()
    expect(oColor instanceof fabric.Color).toBeTruthy()
    expect(oColor.toRgb()).toBe("rgb(255,255,255)")
    expect(oColor.toHex()).toBe("FFFFFF")
  })

  test("fromRgb (uppercase)", function () {
    expect(typeof fabric.Color.fromRgb === "function").toBeTruthy()
    var originalRgb = "RGB(255,255,255)"
    var oColor = fabric.Color.fromRgb(originalRgb)
    expect(oColor).toBeTruthy()
    expect(oColor instanceof fabric.Color).toBeTruthy()
    expect(oColor.toHex()).toBe("FFFFFF")
  })

  test("fromRgba (uppercase)", function () {
    expect(typeof fabric.Color.fromRgba === "function").toBeTruthy()
    var originalRgba = "RGBA(255,255,255,0.5)"
    var oColor = fabric.Color.fromRgba(originalRgba)
    expect(oColor).toBeTruthy()
    expect(oColor instanceof fabric.Color).toBeTruthy()
    expect(oColor.toHex()).toBe("FFFFFF")
    expect(oColor.getAlpha()).toBe(0.5)
  })

  test("fromRgba", function () {
    expect(typeof fabric.Color.fromRgba === "function").toBeTruthy()
    var originalRgba = "rgba(255,255,255,0.5)"
    var oColor = fabric.Color.fromRgba(originalRgba)
    expect(oColor).toBeTruthy()
    expect(oColor instanceof fabric.Color).toBeTruthy()
    expect(oColor.toRgba()).toBe(originalRgba)
    expect(oColor.toHex()).toBe("FFFFFF")
    expect(oColor.getAlpha()).toBe(0.5)
  })

  test("fromRgba (with missing 0)", function () {
    var originalRgba = "rgba( 255 , 255 , 255 , .3 )"
    var oColor = fabric.Color.fromRgba(originalRgba)
    expect(oColor.toRgba()).toBe("rgba(255,255,255,0.3)")
    expect(oColor.toHex()).toBe("FFFFFF")
    expect(oColor.getAlpha()).toBe(0.3)
  })

  test("fromRgba (with whitespaces)", function () {
    var originalRgba = "rgba( 255 , 255 , 255 , 0.5 )"
    var oColor = fabric.Color.fromRgba(originalRgba)
    expect(oColor).toBeTruthy()
    expect(oColor instanceof fabric.Color).toBeTruthy()
    expect(oColor.toRgba()).toBe("rgba(255,255,255,0.5)")
    expect(oColor.toHex()).toBe("FFFFFF")
    expect(oColor.getAlpha()).toBe(0.5)
  })

  test("fromRgba (percentage values)", function () {
    var originalRgba = "rgba(100%,100%,100%,0.5)"
    var oColor = fabric.Color.fromRgba(originalRgba)
    expect(oColor).toBeTruthy()
    expect(oColor instanceof fabric.Color).toBeTruthy()
    expect(oColor.toRgba()).toBe("rgba(255,255,255,0.5)")
    expect(oColor.toHex()).toBe("FFFFFF")
    expect(oColor.getAlpha()).toBe(0.5)
  })

  test("fromRgba (percentage values with whitespaces)", function () {
    var originalRgba = "rgba( 100% , 100% , 100% , 0.5 )"
    var oColor = fabric.Color.fromRgba(originalRgba)
    expect(oColor).toBeTruthy()
    expect(oColor instanceof fabric.Color).toBeTruthy()
    expect(oColor.toRgba()).toBe("rgba(255,255,255,0.5)")
    expect(oColor.toHex()).toBe("FFFFFF")
    expect(oColor.getAlpha()).toBe(0.5)
  })

  test("fromRgba (percentage values with decimals)", function () {
    var originalRgba = "rgba( 100.00%, 100.00%, 100.00% , 0.5 )"
    var oColor = fabric.Color.fromRgba(originalRgba)
    expect(oColor).toBeTruthy()
    expect(oColor instanceof fabric.Color).toBeTruthy()
    expect(oColor.toRgba()).toBe("rgba(255,255,255,0.5)")
    expect(oColor.toHex()).toBe("FFFFFF")
    expect(oColor.getAlpha()).toBe(0.5)
  })

  test("fromHsl", function () {
    expect(typeof fabric.Color.fromHsl === "function").toBeTruthy()
    var originalHsl = "hsl(262,80%,12%)"
    var oColor = fabric.Color.fromHsl(originalHsl)
    expect(oColor).toBeTruthy()
    expect(oColor instanceof fabric.Color).toBeTruthy()
    expect(oColor.toHsl()).toBe(originalHsl)
    expect(oColor.toHex()).toBe("180637")
  })

  test("fromHsl (with whitespaces)", function () {
    expect(typeof fabric.Color.fromHsl === "function").toBeTruthy()
    var originalHsl = "hsl( 262 , 80% , 12% )"
    var oColor = fabric.Color.fromHsl(originalHsl)
    expect(oColor).toBeTruthy()
    expect(oColor instanceof fabric.Color).toBeTruthy()
    expect(oColor.toHsl()).toBe("hsl(262,80%,12%)")
    expect(oColor.toHex()).toBe("180637")
  })

  test("fromHsl (uppercase)", function () {
    expect(typeof fabric.Color.fromHsl === "function").toBeTruthy()
    var originalHsl = "HSL(270,50%,40%)"
    var oColor = fabric.Color.fromHsl(originalHsl)
    expect(oColor).toBeTruthy()
    expect(oColor instanceof fabric.Color).toBeTruthy()
    expect(oColor.toHex()).toBe("663399")
    expect(oColor.toRgba()).toBe("rgba(102,51,153,1)")
  })

  test("fromHsla (uppercase)", function () {
    expect(typeof fabric.Color.fromHsla === "function").toBeTruthy()
    var originalHsla = "HSLA(108,50%,50%,0.7)"
    var oColor = fabric.Color.fromHsla(originalHsla)
    expect(oColor).toBeTruthy()
    expect(oColor instanceof fabric.Color).toBeTruthy()
    expect(oColor.toHex()).toBe("59BF40")
    expect(oColor.toRgba()).toBe("rgba(89,191,64,0.7)")
    expect(oColor.getAlpha()).toBe(0.7)
  })

  test("fromHsla", function () {
    expect(typeof fabric.Color.fromHsla === "function").toBeTruthy()
    var originalHsla = "hsla(262,80%,12%,0.2)"
    var oColor = fabric.Color.fromHsla(originalHsla)
    expect(oColor).toBeTruthy()
    expect(oColor instanceof fabric.Color).toBeTruthy()
    expect(oColor.toHsla()).toBe(originalHsla)
    expect(oColor.toHex()).toBe("180637")
    expect(oColor.getAlpha()).toBe(0.2)
  })

  test("fromHsla (with whitespaces)", function () {
    expect(typeof fabric.Color.fromHsla === "function").toBeTruthy()
    var originalHsla = "hsla( 262 , 80% , 12% , 0.2 )"
    var oColor = fabric.Color.fromHsla(originalHsla)
    expect(oColor).toBeTruthy()
    expect(oColor instanceof fabric.Color).toBeTruthy()
    expect(oColor.toHsla()).toBe("hsla(262,80%,12%,0.2)")
    expect(oColor.toHex()).toBe("180637")
    expect(oColor.getAlpha()).toBe(0.2)
  })

  test("fromHex", function () {
    expect(typeof fabric.Color.fromHex === "function").toBeTruthy()
    var originalHex = "FF5555"
    var oColor = fabric.Color.fromHex(originalHex)
    expect(oColor).toBeTruthy()
    expect(oColor instanceof fabric.Color).toBeTruthy()
    expect(oColor.toHex()).toBe(originalHex)
    expect(oColor.toRgb()).toBe("rgb(255,85,85)")
  })

  test("sourceFromRgb", function () {
    expect(typeof fabric.Color.sourceFromRgb === "function").toBeTruthy()
    expect(fabric.Color.sourceFromRgb("rgb(255,255,255)")).toEqual([
      255,
      255,
      255,
      1
    ])
    expect(fabric.Color.sourceFromRgb("rgb(100,150,200)")).toEqual([
      100,
      150,
      200,
      1
    ])
  })

  test("sourceFromHsl", function () {
    expect(typeof fabric.Color.sourceFromHsl === "function").toBeTruthy()
    expect(fabric.Color.sourceFromHsl("hsl(360,100%,100%)")).toEqual([
      255,
      255,
      255,
      1
    ])
    expect(fabric.Color.sourceFromHsl("hsl(180,50%,40%)")).toEqual([
      51,
      153,
      153,
      1
    ])
  })

  test("sourceFromHex", function () {
    expect(typeof fabric.Color.sourceFromHex === "function").toBeTruthy()

    // uppercase
    expect(fabric.Color.sourceFromHex("#FFFFFF00")).toEqual([255, 255, 255, 0])
    expect(fabric.Color.sourceFromHex("#FFFFFFCC")).toEqual([
      255,
      255,
      255,
      0.8
    ])
    expect(fabric.Color.sourceFromHex("#FFFFFFFF")).toEqual([255, 255, 255, 1])
    expect(fabric.Color.sourceFromHex("#FFFFFF00")).toEqual([255, 255, 255, 0])
    expect(fabric.Color.sourceFromHex("#FFFFFF")).toEqual([255, 255, 255, 1])
    expect(fabric.Color.sourceFromHex("#FFFF")).toEqual([255, 255, 255, 1])
    expect(fabric.Color.sourceFromHex("#FFFC")).toEqual([255, 255, 255, 0.8])
    expect(fabric.Color.sourceFromHex("#FFF0")).toEqual([255, 255, 255, 0])
    expect(fabric.Color.sourceFromHex("#FFF")).toEqual([255, 255, 255, 1])
    expect(fabric.Color.sourceFromHex("FFFFFF00")).toEqual([255, 255, 255, 0])
    expect(fabric.Color.sourceFromHex("FFFFFFCC")).toEqual([255, 255, 255, 0.8])
    expect(fabric.Color.sourceFromHex("FFFFFFFF")).toEqual([255, 255, 255, 1])
    expect(fabric.Color.sourceFromHex("FFFFFF00")).toEqual([255, 255, 255, 0])
    expect(fabric.Color.sourceFromHex("FFFFFF")).toEqual([255, 255, 255, 1])
    expect(fabric.Color.sourceFromHex("FFFF")).toEqual([255, 255, 255, 1])
    expect(fabric.Color.sourceFromHex("FFFC")).toEqual([255, 255, 255, 0.8])
    expect(fabric.Color.sourceFromHex("FFF0")).toEqual([255, 255, 255, 0])
    expect(fabric.Color.sourceFromHex("FFF")).toEqual([255, 255, 255, 1])

    // lowercase
    expect(fabric.Color.sourceFromHex("#ffffff00")).toEqual([255, 255, 255, 0])
    expect(fabric.Color.sourceFromHex("#ffffffcc")).toEqual([
      255,
      255,
      255,
      0.8
    ])
    expect(fabric.Color.sourceFromHex("#ffffffff")).toEqual([255, 255, 255, 1])
    expect(fabric.Color.sourceFromHex("#ffffff00")).toEqual([255, 255, 255, 0])
    expect(fabric.Color.sourceFromHex("#ffffff")).toEqual([255, 255, 255, 1])
    expect(fabric.Color.sourceFromHex("#ffff")).toEqual([255, 255, 255, 1])
    expect(fabric.Color.sourceFromHex("#fffc")).toEqual([255, 255, 255, 0.8])
    expect(fabric.Color.sourceFromHex("#fff0")).toEqual([255, 255, 255, 0])
    expect(fabric.Color.sourceFromHex("#fff")).toEqual([255, 255, 255, 1])
    expect(fabric.Color.sourceFromHex("ffffff00")).toEqual([255, 255, 255, 0])
    expect(fabric.Color.sourceFromHex("ffffffcc")).toEqual([255, 255, 255, 0.8])
    expect(fabric.Color.sourceFromHex("ffffffff")).toEqual([255, 255, 255, 1])
    expect(fabric.Color.sourceFromHex("ffffff00")).toEqual([255, 255, 255, 0])
    expect(fabric.Color.sourceFromHex("ffffff")).toEqual([255, 255, 255, 1])
    expect(fabric.Color.sourceFromHex("ffff")).toEqual([255, 255, 255, 1])
    expect(fabric.Color.sourceFromHex("fffc")).toEqual([255, 255, 255, 0.8])
    expect(fabric.Color.sourceFromHex("fff0")).toEqual([255, 255, 255, 0])
    expect(fabric.Color.sourceFromHex("fff")).toEqual([255, 255, 255, 1])
  })

  test("fromSource", function () {
    expect(typeof fabric.Color.fromSource === "function").toBeTruthy()
    var oColor = fabric.Color.fromSource([255, 255, 255, 0.37])

    expect(oColor).toBeTruthy()
    expect(oColor instanceof fabric.Color).toBeTruthy()
    expect(oColor.toRgba()).toBe("rgba(255,255,255,0.37)")
    expect(oColor.toHex()).toBe("FFFFFF")
    expect(oColor.getAlpha()).toBe(0.37)
  })

  test("overlayWith", function () {
    var oColor = new fabric.Color("FF0000")
    expect(typeof oColor.overlayWith === "function").toBeTruthy()
    oColor.overlayWith("FFFFFF")
    expect(oColor.toHex()).toBe("FF8080")

    oColor = new fabric.Color("FFFFFF")
    oColor.overlayWith("FFFFFF")
    expect(oColor.toHex()).toBe("FFFFFF")

    oColor = new fabric.Color("rgb(255,255,255)")
    oColor.overlayWith("rgb(0,0,0)")
    expect(oColor.toRgb()).toBe("rgb(128,128,128)")

    oColor = new fabric.Color("rgb(255,255,255)")
    oColor.overlayWith(new fabric.Color("rgb(0,0,0)"))
    expect(oColor.toRgb()).toBe("rgb(128,128,128)")
  })

  test("transparent", function () {
    expect(new fabric.Color("transparent").getSource()).toEqual([
      255,
      255,
      255,
      0
    ])
  })
})
