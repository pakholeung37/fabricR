describe("fabric.util.animate", () => {
  test("animateColor", function (done) {
    function testing(val, changePerc) {
      if (changePerc !== 1) {
        expect(val).not.toEqual("rgba(0,0,255,1)")
      }
    }
    expect(typeof fabric.util.animateColor === "function").toBeTruthy()
    fabric.util.animateColor("red", "blue", 16, {
      onComplete: function (val, changePerc, timePerc) {
        // animate color need some fixing
        expect(val).toEqual("rgba(0,0,255,1)")
        expect(changePerc).toEqual(1)
        expect(timePerc).toEqual(1)
        done()
      },
      onChange: testing
    })
  })

  test("animate", function (done) {
    var object = new fabric.Object({
      left: 20,
      top: 30,
      width: 40,
      height: 50,
      angle: 43
    })

    expect(typeof object.animate === "function").toBeTruthy()

    object.animate("left", 40)
    expect(true).toBeTruthy()

    setTimeout(function () {
      expect(40).toEqual(Math.round(object.left))
      done()
    }, 1000)
  })

  test("animate with increment", function (done) {
    var object = new fabric.Object({
      left: 20,
      top: 30,
      width: 40,
      height: 50,
      angle: 43
    })

    object.animate("left", "+=40")
    expect(true).toBeTruthy()

    setTimeout(function () {
      expect(Math.round(object.left)).toEqual(60)
      done()
    }, 1000)
  })

  test("animate with keypath", function (done) {
    var object = new fabric.Object({
      left: 20,
      top: 30,
      width: 40,
      height: 50,
      angle: 43,
      shadow: { offsetX: 20 }
    })

    object.animate("shadow.offsetX", 100)
    expect(true).toBeTruthy()

    setTimeout(function () {
      expect(Math.round(object.shadow.offsetX)).toEqual(100)
      done()
    }, 1000)
  })

  test("animate with color", function (done) {
    const properties = fabric.Object.prototype.colorProperties,
      object = new fabric.Object()

    properties.forEach(function (prop, index) {
      object.set(prop, "red")
      object.animate(prop, "blue")
      expect(true).toBeTruthy()

      setTimeout(function () {
        expect(object[prop]).toEqual(new fabric.Color("blue").toRgba())
        if (index === properties.length - 1) {
          done()
        }
      }, 1000)
    })
  })

  test("animate with decrement", function (done) {
    var object = new fabric.Object({
      left: 20,
      top: 30,
      width: 40,
      height: 50,
      angle: 43
    })

    object.animate("left", "-=40")
    expect(true).toBeTruthy()

    setTimeout(function () {
      expect(Math.round(object.left)).toEqual(-20)
      done()
    }, 1000)
  })

  test("animate with object", function (done) {
    var object = new fabric.Object({
      left: 20,
      top: 30,
      width: 40,
      height: 50,
      angle: 43
    })

    expect(typeof object.animate === "function").toBeTruthy()

    object.animate({ left: 40 })
    expect(true).toBeTruthy()

    setTimeout(function () {
      expect(40).toEqual(Math.round(object.left))
      done()
    }, 1000)
  })

  test("animate multiple properties", function (done) {
    var object = new fabric.Object({ left: 123, top: 124 })
    object.animate({ left: 223, top: 224 })
    setTimeout(function () {
      expect(223).toEqual(Math.round(object.get("left")))
      expect(224).toEqual(Math.round(object.get("top")))
      done()
    }, 1000)
  })

  test("animate multiple properties with callback", function (done) {
    var object = new fabric.Object({ left: 0, top: 0 })

    var changedInvocations = 0
    var completeInvocations = 0

    object.animate(
      { left: 1, top: 1 },
      {
        duration: 1,
        onChange: function () {
          changedInvocations++
        },
        onComplete: function () {
          completeInvocations++
        }
      }
    )

    setTimeout(function () {
      expect(Math.round(object.get("left"))).toEqual(1)
      expect(Math.round(object.get("top"))).toEqual(1)

      expect(changedInvocations).toEqual(2)
      expect(completeInvocations).toEqual(1)

      done()
    }, 1000)
  })

  test("animate with abort", function (done) {
    var object = new fabric.Object({ left: 123, top: 124 })

    var context
    object.animate(
      { left: 223, top: 224 },
      {
        abort: function () {
          context = this
          return true
        }
      }
    )

    setTimeout(function () {
      expect(123).toEqual(Math.round(object.get("left")))
      expect(124).toEqual(Math.round(object.get("top")))
      expect(context).toEqual(object)
      done()
    }, 100)
  })

  test("animate easing easeInQuad", function (done) {
    expect(typeof fabric.util.ease.easeInQuad === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeInQuad
      }
    )
  })

  test("animate easing easeOutQuad", function (done) {
    expect(typeof fabric.util.ease.easeOutQuad === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeOutQuad
      }
    )
  })

  test("animate easing easeInOutQuad", function (done) {
    expect(typeof fabric.util.ease.easeInOutQuad === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeInOutQuad
      }
    )
  })

  test("animate easing easeInCubic", function (done) {
    expect(typeof fabric.util.ease.easeInCubic === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeInCubic
      }
    )
  })

  test("animate easing easeOutCubic", function (done) {
    expect(typeof fabric.util.ease.easeOutCubic === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeOutCubic
      }
    )
  })

  test("animate easing easeInOutCubic", function (done) {
    expect(typeof fabric.util.ease.easeInOutCubic === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeInOutCubic
      }
    )
  })

  test("animate easing easeInQuart", function (done) {
    expect(typeof fabric.util.ease.easeInQuart === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeInQuart
      }
    )
  })

  test("animate easing easeOutQuart", function (done) {
    expect(typeof fabric.util.ease.easeOutQuart === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeOutQuart
      }
    )
  })

  test("animate easing easeInOutQuart", function (done) {
    expect(typeof fabric.util.ease.easeInOutQuart === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeInOutQuart
      }
    )
  })

  test("animate easing easeInQuint", function (done) {
    expect(typeof fabric.util.ease.easeInQuint === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeInQuint
      }
    )
  })

  test("animate easing easeOutQuint", function (done) {
    expect(typeof fabric.util.ease.easeOutQuint === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeOutQuint
      }
    )
  })

  // easeInOutQuint: easeInOutQuint,
  test("animate easing easeInOutQuint", function (done) {
    expect(typeof fabric.util.ease.easeInOutQuint === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeInOutQuint
      }
    )
  })

  // easeInSine: easeInSine,
  test("animate easing easeInSine", function (done) {
    expect(typeof fabric.util.ease.easeInSine === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeInSine
      }
    )
  })

  // easeOutSine: easeOutSine,
  test("animate easing easeOutSine", function (done) {
    expect(typeof fabric.util.ease.easeOutSine === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeOutSine
      }
    )
  })

  // easeInOutSine: easeInOutSine,
  test("animate easing easeInOutSine", function (done) {
    expect(typeof fabric.util.ease.easeInOutSine === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeInOutSine
      }
    )
  })

  // easeInExpo: easeInExpo,
  test("animate easing easeInExpo", function (done) {
    expect(typeof fabric.util.ease.easeInExpo === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeInExpo
      }
    )
  })

  // easeOutExpo: easeOutExpo,
  test("animate easing easeOutExpo", function (done) {
    expect(typeof fabric.util.ease.easeOutExpo === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeOutExpo
      }
    )
  })

  // easeInOutExpo: easeInOutExpo,
  test("animate easing easeInOutExpo", function (done) {
    expect(typeof fabric.util.ease.easeInOutExpo === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeInOutExpo
      }
    )
  })

  // easeInCirc: easeInCirc,
  test("animate easing easeInCirc", function (done) {
    expect(typeof fabric.util.ease.easeInCirc === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeInCirc
      }
    )
  })

  // easeOutCirc: easeOutCirc,
  test("animate easing easeOutCirc", function (done) {
    expect(typeof fabric.util.ease.easeOutCirc === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeOutCirc
      }
    )
  })

  // easeInOutCirc: easeInOutCirc,
  test("animate easing easeInOutCirc", function (done) {
    expect(typeof fabric.util.ease.easeInOutCirc === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeInOutCirc
      }
    )
  })

  // easeInElastic: easeInElastic,
  test("animate easing easeInElastic", function (done) {
    expect(typeof fabric.util.ease.easeInElastic === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeInElastic
      }
    )
  })

  // easeOutElastic: easeOutElastic,
  test("animate easing easeOutElastic", function (done) {
    expect(typeof fabric.util.ease.easeOutElastic === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeOutElastic
      }
    )
  })

  // easeInOutElastic: easeInOutElastic,
  test("animate easing easeInOutElastic", function (done) {
    expect(typeof fabric.util.ease.easeInOutElastic === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeInOutElastic
      }
    )
  })

  // easeInBack: easeInBack,
  test("animate easing easeInBack", function (done) {
    expect(typeof fabric.util.ease.easeInBack === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeInBack
      }
    )
  })

  // easeOutBack: easeOutBack,
  test("animate easing easeOutBack", function (done) {
    expect(typeof fabric.util.ease.easeOutBack === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeOutBack
      }
    )
  })

  // easeInOutBack: easeInOutBack,
  test("animate easing easeInOutBack", function (done) {
    expect(typeof fabric.util.ease.easeInOutBack === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeInOutBack
      }
    )
  })

  // easeInBounce: easeInBounce,
  test("animate easing easeInBounce", function (done) {
    expect(typeof fabric.util.ease.easeInBounce === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeInBounce
      }
    )
  })

  // easeOutBounce: easeOutBounce,
  test("animate easing easeOutBounce", function (done) {
    expect(typeof fabric.util.ease.easeOutBounce === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeOutBounce
      }
    )
  })

  // easeInOutBounce: easeInOutBounce
  test("animate easing easeInOutBounce", function (done) {
    expect(typeof fabric.util.ease.easeInOutBounce === "function").toBeTruthy()
    var object = new fabric.Object({ left: 0 })
    object.animate(
      { left: 100 },
      {
        onComplete: function () {
          expect(Math.round(object.left)).toEqual(100)
          done()
        },
        duration: 160,
        easing: fabric.util.ease.easeInOutBounce
      }
    )
  })
})
