;(function () {
  var canvas = fabric.document.createElement("canvas"),
    context = canvas.getContext("2d")

  function _createImageData(context) {
    var imageData = context.createImageData(3, 1)
    imageData.data[0] = 200
    imageData.data[1] = 100
    imageData.data[2] = 50
    imageData.data[3] = 1
    imageData.data[4] = 30
    imageData.data[5] = 255
    imageData.data[6] = 10
    imageData.data[7] = 1
    imageData.data[8] = 255
    imageData.data[9] = 255
    imageData.data[10] = 3
    imageData.data[11] = 1
    return imageData
  }

  describe("fabric.Image.filters.Brightness")

  test("constructor", function (assert) {
    expect(fabric.Image.filters.Brightness).toBeTruthy()

    var filter = new fabric.Image.filters.Brightness()
    expect(filter instanceof fabric.Image.filters.Brightness).toBeTruthy()
  })

  test("properties", function (assert) {
    var filter = new fabric.Image.filters.Brightness()

    expect(filter.type).toEqual("Brightness")
    expect(filter.brightness).toEqual(0)

    var filter2 = new fabric.Image.filters.Brightness({ brightness: 0.12 })
    expect(filter2.brightness).toEqual(0.12)
  })

  test("applyTo2d", function (assert) {
    var filter = new fabric.Image.filters.Brightness()
    expect(typeof filter.applyTo2d === "function").toBeTruthy()
  })

  test("applyTo2d values", function (assert) {
    var filter = new fabric.Image.filters.Brightness({ brightness: 0.2 })
    var options = { imageData: _createImageData(context) }
    filter.applyTo2d(options)
    var data = options.imageData.data
    var expected = [251, 151, 101, 1, 81, 255, 61, 1, 255, 255, 54, 1]
    for (var i = 0; i < 12; i++) {
      expect(data[i]).toEqual(expected[i])
    }
  })

  test("toObject", function (assert) {
    var filter = new fabric.Image.filters.Brightness()
    expect(typeof filter.toObject === "function").toBeTruthy()

    var object = filter.toObject()
    expect(JSON.stringify(object)).toEqual('{"type":"Brightness","brightness":0}')

    filter.brightness = 100

    object = filter.toObject()
    expect(JSON.stringify(object)).toEqual('{"type":"Brightness","brightness":100}')
  })

  test("toJSON", function (assert) {
    var filter = new fabric.Image.filters.Brightness()
    expect(typeof filter.toJSON === "function").toBeTruthy()

    var json = filter.toJSON()
    expect(JSON.stringify(json)).toEqual('{"type":"Brightness","brightness":0}')

    filter.brightness = 100

    json = filter.toJSON()
    expect(JSON.stringify(json)).toEqual('{"type":"Brightness","brightness":100}')
  })

  test("fromObject", function (assert) {
    var filter = new fabric.Image.filters.Brightness()

    var object = filter.toObject()

    expect(fabric.Image.filters.Brightness.fromObject(object)).toEqual(filter)
  })

  test("isNeutralState", function (assert) {
    var filter = new fabric.Image.filters.Brightness()

    expect(filter.isNeutralState()).toBeTruthy()
    filter.brightness = 0.15
    expect(filter.isNeutralState()).toBeFalsy()
  })

  describe("fabric.Image.filters.Composed")

  test("constructor", function (assert) {
    expect(fabric.Image.filters.Composed).toBeTruthy()

    var filter = new fabric.Image.filters.Composed()
    expect(filter instanceof fabric.Image.filters.Composed).toBeTruthy()
  })

  test("properties", function (assert) {
    var filter = new fabric.Image.filters.Composed()

    expect(filter.type).toEqual("Composed")
  })

  test("has not applyTo2d", function (assert) {
    var filter = new fabric.Image.filters.Composed()
    expect(typeof filter.applyTo2d === "undefined").toBeTruthy()
  })

  test("toObject", function (assert) {
    var filter = new fabric.Image.filters.Composed()
    expect(typeof filter.toObject === "function").toBeTruthy()

    var object = filter.toObject()
    expect(JSON.stringify(object)).toEqual('{"type":"Composed","subFilters":[]}')
  })

  test("toObject with subfilters", function (assert) {
    var filter = new fabric.Image.filters.Composed()
    var brightness = new fabric.Image.filters.Brightness()
    var contrast = new fabric.Image.filters.Contrast()
    filter.subFilters.push(brightness)
    filter.subFilters.push(contrast)
    var contrastObj = contrast.toObject()
    var brightnessObj = brightness.toObject()
    var object = filter.toObject()
    expect(object.subFilters.length).toEqual(2)
    expect(object.subFilters[0]).toEqual(brightnessObj)
    expect(object.subFilters[1]).toEqual(contrastObj)
  })

  test("toJSON", function (assert) {
    var filter2 = new fabric.Image.filters.Composed()
    expect(typeof filter2.toJSON === "function").toBeTruthy()

    var json = filter2.toJSON()
    expect(JSON.stringify(json)).toEqual('{"type":"Composed","subFilters":[]}')
  })

  test("fromObject", function (assert) {
    var filter = new fabric.Image.filters.Composed()

    var object = filter.toObject()

    expect(fabric.Image.filters.Composed.fromObject(object)).toEqual(filter)
  })

  test("fromObject with subfilters", function (assert) {
    var filter = new fabric.Image.filters.Composed()
    var brightness = new fabric.Image.filters.Brightness()
    var contrast = new fabric.Image.filters.Contrast()
    filter.subFilters.push(brightness)
    filter.subFilters.push(contrast)
    var toObject = filter.toObject()
    var newFilter = fabric.Image.filters.Composed.fromObject(toObject)
    expect(newFilter instanceof fabric.Image.filters.Composed).toBeTruthy()
    expect(newFilter.subFilters[0] instanceof fabric.Image.filters.Brightness).toBeTruthy()
    expect(newFilter.subFilters[1] instanceof fabric.Image.filters.Contrast).toBeTruthy()
  })

  test("isNeutralState", function (assert) {
    var filter = new fabric.Image.filters.Composed()
    var brightness = new fabric.Image.filters.Brightness()
    var contrast = new fabric.Image.filters.Contrast()
    filter.subFilters.push(brightness)
    filter.subFilters.push(contrast)

    expect(filter.isNeutralState()).toBeTruthy()
    filter.subFilters[0].brightness = 0.15
    expect(filter.isNeutralState()).toBeFalsy()
  })

  describe("fabric.Image.filters.ColorMatrix")

  test("constructor", function (assert) {
    expect(fabric.Image.filters.ColorMatrix).toBeTruthy()

    var filter = new fabric.Image.filters.ColorMatrix()
    expect(filter instanceof fabric.Image.filters.ColorMatrix).toBeTruthy()
  })

  test("properties", function (assert) {
    var filter = new fabric.Image.filters.ColorMatrix()

    expect(filter.type).toEqual("ColorMatrix")
    expect(filter.matrix).toEqual([
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ])

    var filter2 = new fabric.Image.filters.ColorMatrix({
      matrix: [0, 1, 0, 0, 0.2, 0, 0, 1, 0, 0.1, 1, 0, 0, 0, 0.3, 0, 0, 0, 1, 0]
    })
    expect(filter2.matrix).toEqual([
      0,
      1,
      0,
      0,
      0.2,
      0,
      0,
      1,
      0,
      0.1,
      1,
      0,
      0,
      0,
      0.3,
      0,
      0,
      0,
      1,
      0
    ])
  })

  test("applyTo2d", function (assert) {
    var filter = new fabric.Image.filters.ColorMatrix()
    expect(typeof filter.applyTo2d === "function").toBeTruthy()
  })

  test("applyTo2d values", function (assert) {
    var filter = new fabric.Image.filters.ColorMatrix({
      matrix: [0, 1, 0, 0, 0.2, 0, 0, 1, 0, 0.1, 1, 0, 0, 0, 0.3, 0, 0, 0, 1, 0]
    })
    var options = { imageData: _createImageData(context) }
    filter.applyTo2d(options)
    var data = options.imageData.data
    var expected = [151, 76, 255, 1, 255, 36, 106, 1, 255, 28, 255, 1]
    for (var i = 0; i < 12; i++) {
      expect(data[i]).toEqual(expected[i])
    }
  })

  test("toObject", function (assert) {
    var filter = new fabric.Image.filters.ColorMatrix()
    expect(typeof filter.toObject === "function").toBeTruthy()

    var object = filter.toObject()
    expect(JSON.stringify(object)).toEqual(
      '{"type":"ColorMatrix","matrix":[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0]}'
    )

    filter.matrix = [
      0,
      1,
      0,
      0,
      0.2,
      0,
      0,
      1,
      0,
      0.1,
      1,
      0,
      0,
      0,
      0.3,
      0,
      0,
      0,
      1,
      0
    ]

    object = filter.toObject()
    expect(JSON.stringify(object)).toEqual(
      '{"type":"ColorMatrix","matrix":[0,1,0,0,0.2,0,0,1,0,0.1,1,0,0,0,0.3,0,0,0,1,0]}'
    )
  })

  test("toJSON", function (assert) {
    var filter = new fabric.Image.filters.ColorMatrix()
    expect(typeof filter.toJSON === "function").toBeTruthy()

    var json = filter.toJSON()
    expect(JSON.stringify(json)).toEqual(
      '{"type":"ColorMatrix","matrix":[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0]}'
    )

    filter.matrix = [
      0,
      1,
      0,
      0,
      0.2,
      0,
      0,
      1,
      0,
      0.1,
      1,
      0,
      0,
      0,
      0.3,
      0,
      0,
      0,
      1,
      0
    ]

    json = filter.toJSON()
    expect(JSON.stringify(json)).toEqual(
      '{"type":"ColorMatrix","matrix":[0,1,0,0,0.2,0,0,1,0,0.1,1,0,0,0,0.3,0,0,0,1,0]}'
    )
  })

  test("fromObject", function (assert) {
    var filter = new fabric.Image.filters.ColorMatrix()

    var object = filter.toObject()

    expect(fabric.Image.filters.ColorMatrix.fromObject(object)).toEqual(filter)
  })

  test("isNeutralState", function (assert) {
    var filter = new fabric.Image.filters.ColorMatrix()

    expect(filter.isNeutralState()).toBeTruthy()
    filter.matrix = [
      0,
      1,
      0,
      0,
      0.2,
      0,
      0,
      1,
      0,
      0.1,
      1,
      0,
      0,
      0,
      0.3,
      0,
      0,
      0,
      1,
      0
    ]
    expect(filter.isNeutralState()).toBeFalsy()
  })

  describe("fabric.Image.filters.HueRotation")

  test("constructor", function (assert) {
    expect(fabric.Image.filters.HueRotation).toBeTruthy()

    var filter = new fabric.Image.filters.HueRotation()
    expect(filter instanceof fabric.Image.filters.ColorMatrix).toBeTruthy()
    expect(filter instanceof fabric.Image.filters.HueRotation).toBeTruthy()
  })

  test("properties", function (assert) {
    var filter = new fabric.Image.filters.HueRotation()

    expect(filter.type).toEqual("HueRotation")
    expect(filter.rotation).toEqual(0)

    var filter2 = new fabric.Image.filters.HueRotation({ rotation: 0.5 })
    expect(filter2.rotation).toEqual(0.5)
  })

  test("applyTo2d", function (assert) {
    var filter = new fabric.Image.filters.HueRotation()
    expect(typeof filter.applyTo2d === "function").toBeTruthy()
  })

  test("applyTo2d values", function (assert) {
    var filter = new fabric.Image.filters.HueRotation({ rotation: 0.5 })
    var options = { imageData: _createImageData(context) }
    filter.calculateMatrix()
    filter.applyTo2d(options)
    var data = options.imageData.data
    var expected = [88, 203, 59, 1, 0, 110, 228, 1, 26, 255, 171, 1]
    for (var i = 0; i < 12; i++) {
      expect(data[i]).toEqual(expected[i])
    }
  })

  test("toObject", function (assert) {
    var filter = new fabric.Image.filters.HueRotation()
    expect(typeof filter.toObject === "function").toBeTruthy()

    var object = filter.toObject()
    expect(JSON.stringify(object)).toEqual('{"type":"HueRotation","rotation":0}')

    filter.rotation = 0.6

    object = filter.toObject()
    expect(JSON.stringify(object)).toEqual('{"type":"HueRotation","rotation":0.6}')
  })

  test("toJSON", function (assert) {
    var filter = new fabric.Image.filters.HueRotation()
    expect(typeof filter.toJSON === "function").toBeTruthy()

    var json = filter.toJSON()
    expect(JSON.stringify(json)).toEqual('{"type":"HueRotation","rotation":0}')

    filter.rotation = 0.3

    json = filter.toJSON()
    expect(JSON.stringify(json)).toEqual('{"type":"HueRotation","rotation":0.3}')
  })

  test("fromObject", function (assert) {
    var filter = new fabric.Image.filters.HueRotation()

    var object = filter.toObject()

    expect(fabric.Image.filters.HueRotation.fromObject(object)).toEqual(filter)
  })

  test("isNeutralState", function (assert) {
    var filter = new fabric.Image.filters.HueRotation()

    expect(filter.isNeutralState()).toBeTruthy()
    filter.rotation = 0.6
    expect(filter.isNeutralState()).toBeFalsy()
  })

  describe("fabric.Image.filters.Contrast")

  test("constructor", function (assert) {
    expect(fabric.Image.filters.Contrast).toBeTruthy()

    var filter = new fabric.Image.filters.Contrast()
    expect(filter instanceof fabric.Image.filters.Contrast).toBeTruthy()
  })

  test("properties", function (assert) {
    var filter = new fabric.Image.filters.Contrast()

    expect(filter.type).toEqual("Contrast")
    expect(filter.contrast).toEqual(0)

    var filter2 = new fabric.Image.filters.Contrast({ contrast: 0.12 })
    expect(filter2.contrast).toEqual(0.12)
  })

  test("applyTo2d", function (assert) {
    var filter = new fabric.Image.filters.Contrast()
    expect(typeof filter.applyTo2d === "function").toBeTruthy()
  })

  test("applyTo2d values", function (assert) {
    var filter = new fabric.Image.filters.Contrast({ contrast: 0.2 })
    var options = { imageData: _createImageData(context) }
    filter.applyTo2d(options)
    var data = options.imageData.data
    var expected = [236, 86, 11, 1, 0, 255, 0, 1, 255, 255, 0, 1]
    for (var i = 0; i < 12; i++) {
      expect(data[i]).toEqual(expected[i])
    }
  })

  test("toObject", function (assert) {
    var filter = new fabric.Image.filters.Contrast()
    expect(typeof filter.toObject === "function").toBeTruthy()

    var object = filter.toObject()
    expect(JSON.stringify(object)).toEqual('{"type":"Contrast","contrast":0}')

    filter.contrast = 100

    object = filter.toObject()
    expect(JSON.stringify(object)).toEqual('{"type":"Contrast","contrast":100}')
  })

  test("toJSON", function (assert) {
    var filter = new fabric.Image.filters.Contrast()
    expect(typeof filter.toJSON === "function").toBeTruthy()

    var json = filter.toJSON()
    expect(JSON.stringify(json)).toEqual('{"type":"Contrast","contrast":0}')

    filter.contrast = 100

    json = filter.toJSON()
    expect(JSON.stringify(json)).toEqual('{"type":"Contrast","contrast":100}')
  })

  test("fromObject", function (assert) {
    var filter = new fabric.Image.filters.Contrast()

    var object = filter.toObject()

    expect(fabric.Image.filters.Contrast.fromObject(object)).toEqual(filter)
  })

  test("isNeutralState", function (assert) {
    var filter = new fabric.Image.filters.Contrast()

    expect(filter.isNeutralState()).toBeTruthy()
    filter.contrast = 0.6
    expect(filter.isNeutralState()).toBeFalsy()
  })

  describe("fabric.Image.filters.Saturation")

  test("constructor", function (assert) {
    expect(fabric.Image.filters.Saturation).toBeTruthy()

    var filter = new fabric.Image.filters.Saturation()
    expect(filter instanceof fabric.Image.filters.Saturation).toBeTruthy()
  })

  test("properties", function (assert) {
    var filter = new fabric.Image.filters.Saturation()

    expect(filter.type).toEqual("Saturation")
    expect(filter.saturation).toEqual(0)

    var filter2 = new fabric.Image.filters.Saturation({ saturation: 0.12 })
    expect(filter2.saturation).toEqual(0.12)
  })

  test("applyTo2d", function (assert) {
    var filter = new fabric.Image.filters.Saturation()
    expect(typeof filter.applyTo2d === "function").toBeTruthy()
  })

  test("applyTo2d values Saturation", function (assert) {
    var filter = new fabric.Image.filters.Saturation({ saturation: 0.2 })
    var options = { imageData: _createImageData(context) }
    filter.applyTo2d(options)
    var data = options.imageData.data
    var expected = [200, 80, 20, 1, 0, 255, 0, 1, 255, 255, 0, 1]
    for (var i = 0; i < 12; i++) {
      expect(data[i]).toEqual(expected[i])
    }
  })

  test("toObject", function (assert) {
    var filter = new fabric.Image.filters.Saturation()
    expect(typeof filter.toObject === "function").toBeTruthy()

    var object = filter.toObject()
    expect(JSON.stringify(object)).toEqual('{"type":"Saturation","saturation":0}')

    filter.saturation = 100

    object = filter.toObject()
    expect(JSON.stringify(object)).toEqual('{"type":"Saturation","saturation":100}')
  })

  test("toJSON", function (assert) {
    var filter = new fabric.Image.filters.Saturation()
    expect(typeof filter.toJSON === "function").toBeTruthy()

    var json = filter.toJSON()
    expect(JSON.stringify(json)).toEqual('{"type":"Saturation","saturation":0}')

    filter.saturation = 100

    json = filter.toJSON()
    expect(JSON.stringify(json)).toEqual('{"type":"Saturation","saturation":100}')
  })

  test("fromObject", function (assert) {
    var filter = new fabric.Image.filters.Saturation()

    var object = filter.toObject()

    expect(fabric.Image.filters.Saturation.fromObject(object)).toEqual(filter)
  })

  test("isNeutralState", function (assert) {
    var filter = new fabric.Image.filters.Saturation()

    expect(filter.isNeutralState()).toBeTruthy()
    filter.saturation = 0.6
    expect(filter.isNeutralState()).toBeFalsy()
  })

  describe("fabric.Image.filters.Gamma")

  test("constructor", function (assert) {
    expect(fabric.Image.filters.Gamma).toBeTruthy()

    var filter = new fabric.Image.filters.Gamma()
    expect(filter instanceof fabric.Image.filters.Gamma).toBeTruthy()
  })

  test("properties", function (assert) {
    var filter = new fabric.Image.filters.Gamma()

    expect(filter.type).toEqual("Gamma")
    expect(filter.gamma).toEqual([1, 1, 1])

    var filter2 = new fabric.Image.filters.Gamma({ gamma: [0.1, 0.5, 1.3] })
    expect(filter2.gamma).toEqual([0.1, 0.5, 1.3])
  })

  test("applyTo2d", function (assert) {
    var filter = new fabric.Image.filters.Gamma()
    expect(typeof filter.applyTo2d === "function").toBeTruthy()
  })

  test("applyTo2d values", function (assert) {
    var filter = new fabric.Image.filters.Gamma({ gamma: [0.1, 0.5, 1.3] })
    var options = { imageData: _createImageData(context) }
    filter.applyTo2d(options)
    var data = options.imageData.data
    var expected = [22, 39, 72, 1, 0, 255, 21, 1, 255, 255, 8, 1]
    for (var i = 0; i < 12; i++) {
      expect(data[i]).toEqual(expected[i])
    }
  })

  test("toObject", function (assert) {
    var filter = new fabric.Image.filters.Gamma()
    expect(typeof filter.toObject === "function").toBeTruthy()

    var object = filter.toObject()
    expect(JSON.stringify(object)).toEqual('{"type":"Gamma","gamma":[1,1,1]}')

    filter.gamma = [0.1, 0.5, 1.3]

    object = filter.toObject()
    expect(JSON.stringify(object)).toEqual('{"type":"Gamma","gamma":[0.1,0.5,1.3]}')
  })

  test("toJSON", function (assert) {
    var filter = new fabric.Image.filters.Gamma()
    expect(typeof filter.toJSON === "function").toBeTruthy()

    var json = filter.toJSON()
    expect(JSON.stringify(json)).toEqual('{"type":"Gamma","gamma":[1,1,1]}')

    filter.gamma = [1.5, 1.5, 1.5]

    json = filter.toJSON()
    expect(JSON.stringify(json)).toEqual('{"type":"Gamma","gamma":[1.5,1.5,1.5]}')
  })

  test("fromObject", function (assert) {
    var filter = new fabric.Image.filters.Gamma()

    var object = filter.toObject()

    expect(fabric.Image.filters.Gamma.fromObject(object)).toEqual(filter)
  })

  test("isNeutralState", function (assert) {
    var filter = new fabric.Image.filters.Gamma()

    expect(filter.isNeutralState()).toBeTruthy()
    filter.gamma = [1.5, 1.5, 1.5]
    expect(filter.isNeutralState()).toBeFalsy()
  })

  describe("fabric.Image.filters.Convolute")

  test("constructor", function (assert) {
    expect(fabric.Image.filters.Convolute).toBeTruthy()

    var filter = new fabric.Image.filters.Convolute()
    expect(filter instanceof fabric.Image.filters.Convolute).toBeTruthy()
  })

  test("properties", function (assert) {
    var filter = new fabric.Image.filters.Convolute()

    expect(filter.type).toEqual("Convolute")
    expect(filter.opaque).toEqual(false)
    expect(filter.matrix).toEqual([0, 0, 0, 0, 1, 0, 0, 0, 0])

    var filter2 = new fabric.Image.filters.Convolute({
      opaque: 0.5,
      matrix: [1, -1, 1, 0, 1, 0, 0, 0, 0]
    })
    expect(filter2.opaque).toEqual(0.5)
    expect(filter2.matrix).toEqual([1, -1, 1, 0, 1, 0, 0, 0, 0])
  })

  test("applyTo2d", function (assert) {
    var filter = new fabric.Image.filters.Convolute()
    expect(typeof filter.applyTo2d === "function").toBeTruthy()
  })

  test("toObject", function (assert) {
    var filter = new fabric.Image.filters.Convolute({ opaque: 1 })
    expect(typeof filter.toObject === "function").toBeTruthy()

    var object = filter.toObject()
    expect(JSON.stringify(object)).toEqual('{"type":"Convolute","opaque":1,"matrix":[0,0,0,0,1,0,0,0,0]}')
  })

  test("toJSON", function (assert) {
    var filter = new fabric.Image.filters.Convolute({ opaque: 1 })
    expect(typeof filter.toJSON === "function").toBeTruthy()

    var json = filter.toJSON()
    expect(JSON.stringify(json)).toEqual('{"type":"Convolute","opaque":1,"matrix":[0,0,0,0,1,0,0,0,0]}')
  })

  test("fromObject", function (assert) {
    var filter = new fabric.Image.filters.Convolute()

    var object = filter.toObject()

    expect(fabric.Image.filters.Convolute.fromObject(object)).toEqual(filter)
  })

  test("isNeutralState", function (assert) {
    var filter = new fabric.Image.filters.Convolute()
    expect(filter.isNeutralState()).toBeFalsy()
  })

  describe("fabric.Image.filters.Grayscale")

  test("constructor", function (assert) {
    expect(fabric.Image.filters.Grayscale).toBeTruthy()

    var filter = new fabric.Image.filters.Grayscale()
    expect(filter instanceof fabric.Image.filters.Grayscale).toBeTruthy()
  })

  test("properties", function (assert) {
    var filter = new fabric.Image.filters.Grayscale()

    expect(filter.type).toEqual("Grayscale")
  })

  test("applyTo2d", function (assert) {
    var filter = new fabric.Image.filters.Grayscale()
    expect(typeof filter.applyTo2d === "function").toBeTruthy()
  })

  test("applyTo2d values Grayscale average", function (assert) {
    var filter = new fabric.Image.filters.Grayscale({ mode: "average" })
    var options = { imageData: _createImageData(context) }
    filter.applyTo2d(options)
    var data = options.imageData.data
    var expected = [117, 117, 117, 1, 98, 98, 98, 1, 171, 171, 171, 1]
    for (var i = 0; i < 12; i++) {
      expect(data[i]).toEqual(expected[i])
    }
  })

  test("applyTo2d values Grayscale lightness", function (assert) {
    var filter = new fabric.Image.filters.Grayscale({ mode: "lightness" })
    var options = { imageData: _createImageData(context) }
    filter.applyTo2d(options)
    var data = options.imageData.data
    var expected = [125, 125, 125, 1, 132, 132, 132, 1, 129, 129, 129, 1]
    for (var i = 0; i < 12; i++) {
      expect(data[i]).toEqual(expected[i])
    }
  })

  test("applyTo2d values Grayscale luminosity", function (assert) {
    var filter = new fabric.Image.filters.Grayscale({ mode: "luminosity" })
    var options = { imageData: _createImageData(context) }
    filter.applyTo2d(options)
    var data = options.imageData.data
    var expected = [118, 118, 118, 1, 191, 191, 191, 1, 237, 237, 237, 1]
    for (var i = 0; i < 12; i++) {
      expect(data[i]).toEqual(expected[i])
    }
  })

  test("toObject", function (assert) {
    var filter = new fabric.Image.filters.Grayscale({ mode: "lightness" })
    expect(typeof filter.toObject === "function").toBeTruthy()
    var object = filter.toObject()
    expect(JSON.stringify(object)).toEqual('{"type":"Grayscale","mode":"lightness"}')
  })

  test("toJSON", function (assert) {
    var filter = new fabric.Image.filters.Grayscale()
    expect(typeof filter.toJSON === "function").toBeTruthy()

    var json = filter.toJSON()
    expect(JSON.stringify(json)).toEqual('{"type":"Grayscale","mode":"average"}')
  })

  test("fromObject", function (assert) {
    var filter = new fabric.Image.filters.Grayscale()

    var object = filter.toObject()

    expect(fabric.Image.filters.Grayscale.fromObject(object)).toEqual(filter)
  })

  test("isNeutralState", function (assert) {
    var filter = new fabric.Image.filters.Grayscale()
    expect(filter.isNeutralState()).toBeFalsy()
  })

  describe("fabric.Image.filters.Invert")

  test("constructor", function (assert) {
    expect(fabric.Image.filters.Invert).toBeTruthy()

    var filter = new fabric.Image.filters.Invert()
    expect(filter instanceof fabric.Image.filters.Invert).toBeTruthy()
  })

  test("properties", function (assert) {
    var filter = new fabric.Image.filters.Invert()

    expect(filter.type).toEqual("Invert")
  })

  test("applyTo2d", function (assert) {
    var filter = new fabric.Image.filters.Invert()
    expect(typeof filter.applyTo2d === "function").toBeTruthy()
  })

  test("applyTo2d values Invert", function (assert) {
    var filter = new fabric.Image.filters.Invert()
    var options = { imageData: _createImageData(context) }
    filter.applyTo2d(options)
    var data = options.imageData.data
    var expected = [55, 155, 205, 1, 225, 0, 245, 1, 0, 0, 252, 1]
    for (var i = 0; i < 12; i++) {
      expect(data[i]).toEqual(expected[i])
    }
  })

  test("toObject", function (assert) {
    var filter = new fabric.Image.filters.Invert()
    expect(typeof filter.toObject === "function").toBeTruthy()

    var object = filter.toObject()
    expect(JSON.stringify(object)).toEqual('{"type":"Invert","invert":true}')
  })

  test("toJSON", function (assert) {
    var filter = new fabric.Image.filters.Invert()
    expect(typeof filter.toJSON === "function").toBeTruthy()

    var json = filter.toJSON()
    expect(JSON.stringify(json)).toEqual('{"type":"Invert","invert":true}')
  })

  test("fromObject", function (assert) {
    var filter = new fabric.Image.filters.Invert()

    var object = filter.toObject()

    expect(fabric.Image.filters.Invert.fromObject(object)).toEqual(filter)
  })

  test("isNeutralState", function (assert) {
    var filter = new fabric.Image.filters.Invert()
    expect(filter.isNeutralState()).toBeFalsy()
    filter.invert = false
    expect(filter.isNeutralState()).toBeTruthy()
  })

  describe("fabric.Image.filters.Noise")

  test("constructor", function (assert) {
    expect(fabric.Image.filters.Noise).toBeTruthy()

    var filter = new fabric.Image.filters.Noise()
    expect(filter instanceof fabric.Image.filters.Noise).toBeTruthy()
  })

  test("properties", function (assert) {
    var filter = new fabric.Image.filters.Noise()

    expect(filter.type).toEqual("Noise")
    expect(filter.noise).toEqual(0)

    var filter2 = new fabric.Image.filters.Noise({ noise: 200 })
    expect(filter2.noise).toEqual(200)
  })

  test("applyTo2d", function (assert) {
    var filter = new fabric.Image.filters.Noise()
    expect(typeof filter.applyTo2d === "function").toBeTruthy()
  })

  test("toObject", function (assert) {
    var filter = new fabric.Image.filters.Noise()
    expect(typeof filter.toObject === "function").toBeTruthy()

    var object = filter.toObject()
    expect(JSON.stringify(object)).toEqual('{"type":"Noise","noise":0}')

    filter.noise = 100

    object = filter.toObject()
    expect(JSON.stringify(object)).toEqual('{"type":"Noise","noise":100}')
  })

  test("toJSON", function (assert) {
    var filter = new fabric.Image.filters.Noise()
    expect(typeof filter.toJSON === "function").toBeTruthy()

    var json = filter.toJSON()
    expect(JSON.stringify(json)).toEqual('{"type":"Noise","noise":0}')

    filter.noise = 100

    json = filter.toJSON()
    expect(JSON.stringify(json)).toEqual('{"type":"Noise","noise":100}')
  })

  test("fromObject", function (assert) {
    var filter = new fabric.Image.filters.Noise()

    var object = filter.toObject()

    expect(fabric.Image.filters.Noise.fromObject(object)).toEqual(filter)
  })

  test("isNeutralState", function (assert) {
    var filter = new fabric.Image.filters.Noise()
    expect(filter.isNeutralState()).toBeTruthy()
    filter.noise = 1
    expect(filter.isNeutralState()).toBeFalsy()
  })

  describe("fabric.Image.filters.Pixelate")

  test("constructor", function (assert) {
    expect(fabric.Image.filters.Pixelate).toBeTruthy()

    var filter = new fabric.Image.filters.Pixelate()
    expect(filter instanceof fabric.Image.filters.Pixelate).toBeTruthy()
  })

  test("properties", function (assert) {
    var filter = new fabric.Image.filters.Pixelate()

    expect(filter.type).toEqual("Pixelate")
    expect(filter.blocksize).toEqual(4)

    var filter2 = new fabric.Image.filters.Pixelate({ blocksize: 8 })
    expect(filter2.blocksize).toEqual(8)
  })

  test("applyTo2d", function (assert) {
    var filter = new fabric.Image.filters.Pixelate()
    expect(typeof filter.applyTo2d === "function").toBeTruthy()
  })

  test("applyTo2d values Pixelate", function (assert) {
    var filter = new fabric.Image.filters.Pixelate({ blocksize: 2 })
    var options = { imageData: _createImageData(context) }
    filter.applyTo2d(options)
    var data = options.imageData.data
    var expected = [200, 100, 50, 1, 200, 100, 50, 1, 255, 255, 3, 1]
    for (var i = 0; i < 12; i++) {
      expect(data[i]).toEqual(expected[i])
    }
  })

  test("toObject", function (assert) {
    var filter = new fabric.Image.filters.Pixelate()
    expect(typeof filter.toObject === "function").toBeTruthy()

    var object = filter.toObject()
    expect(JSON.stringify(object)).toEqual('{"type":"Pixelate","blocksize":4}')
  })

  test("toJSON", function (assert) {
    var filter = new fabric.Image.filters.Pixelate()
    expect(typeof filter.toJSON === "function").toBeTruthy()

    var json = filter.toJSON()
    expect(JSON.stringify(json)).toEqual('{"type":"Pixelate","blocksize":4}')
  })

  test("fromObject", function (assert) {
    var filter = new fabric.Image.filters.Pixelate()

    var object = filter.toObject()

    expect(fabric.Image.filters.Pixelate.fromObject(object)).toEqual(filter)
  })

  test("isNeutralState", function (assert) {
    var filter = new fabric.Image.filters.Pixelate()
    filter.blocksize = 1
    expect(filter.isNeutralState()).toBeTruthy()
    filter.blocksize = 4
    expect(filter.isNeutralState()).toBeFalsy()
  })

  describe("fabric.Image.filters.RemoveColor")

  test("constructor", function (assert) {
    expect(fabric.Image.filters.RemoveColor).toBeTruthy()

    var filter = new fabric.Image.filters.RemoveColor()
    expect(filter instanceof fabric.Image.filters.RemoveColor).toBeTruthy()
  })

  test("properties", function (assert) {
    var filter = new fabric.Image.filters.RemoveColor()

    expect(filter.type).toEqual("RemoveColor")
    expect(filter.distance).toEqual(0.02)
    expect(filter.color).toEqual("#FFFFFF")

    var filter2 = new fabric.Image.filters.RemoveColor({
      distance: 0.6,
      color: "#FF0000"
    })
    expect(filter2.distance).toEqual(0.6)
    expect(filter2.color).toEqual("#FF0000")
  })

  test("applyTo2d", function (assert) {
    var filter = new fabric.Image.filters.RemoveColor()
    expect(typeof filter.applyTo2d === "function").toBeTruthy()
  })

  test("applyTo2d", function (assert) {
    var filter = new fabric.Image.filters.RemoveColor({ color: "#C86432" })
    expect(typeof filter.applyTo2d === "function").toBeTruthy()
    var options = { imageData: _createImageData(context) }
    filter.applyTo2d(options)
    var data = options.imageData.data
    var expected = [200, 100, 50, 0, 30, 255, 10, 1, 255, 255, 3, 1]
    for (var i = 0; i < 12; i++) {
      expect(data[i]).toEqual(expected[i])
    }
  })

  test("toObject", function (assert) {
    var filter = new fabric.Image.filters.RemoveColor()
    expect(typeof filter.toObject === "function").toBeTruthy()

    var object = filter.toObject()
    expect(JSON.stringify(object)).toEqual('{"type":"RemoveColor","color":"#FFFFFF","distance":0.02}')
  })

  test("toJSON", function (assert) {
    var filter = new fabric.Image.filters.RemoveColor({ color: "blue" })
    expect(typeof filter.toJSON === "function").toBeTruthy()

    var json = filter.toJSON()
    expect(JSON.stringify(json)).toEqual('{"type":"RemoveColor","color":"blue","distance":0.02}')
  })

  test("fromObject", function (assert) {
    var filter = new fabric.Image.filters.RemoveColor()

    var object = filter.toObject()

    expect(fabric.Image.filters.RemoveColor.fromObject(object)).toEqual(filter)
  })

  test("isNeutralState", function (assert) {
    var filter = new fabric.Image.filters.RemoveColor()
    expect(filter.isNeutralState()).toBeFalsy()
  })

  describe("fabric.Image.filters.Sepia")

  test("constructor", function (assert) {
    expect(fabric.Image.filters.Sepia).toBeTruthy()

    var filter = new fabric.Image.filters.Sepia()
    expect(filter instanceof fabric.Image.filters.Sepia).toBeTruthy()
    expect(filter instanceof fabric.Image.filters.ColorMatrix).toBeTruthy()
  })

  test("properties", function (assert) {
    var filter = new fabric.Image.filters.Sepia()
    expect(filter.type).toEqual("Sepia")
  })

  test("applyTo2d", function (assert) {
    var filter = new fabric.Image.filters.Sepia()
    expect(typeof filter.applyTo2d === "function").toBeTruthy()
  })

  test("toObject", function (assert) {
    var filter = new fabric.Image.filters.Sepia()
    expect(typeof filter.toObject === "function").toBeTruthy()

    var object = filter.toObject()
    expect(JSON.stringify(object)).toEqual('{"type":"Sepia"}')
  })

  test("toJSON", function (assert) {
    var filter = new fabric.Image.filters.Sepia()
    expect(typeof filter.toJSON === "function").toBeTruthy()

    var json = filter.toJSON()
    expect(JSON.stringify(json)).toEqual('{"type":"Sepia"}')
  })

  test("fromObject", function (assert) {
    var filter = new fabric.Image.filters.Sepia()

    var object = filter.toObject()

    expect(fabric.Image.filters.Sepia.fromObject(object)).toEqual(filter)
  })

  test("isNeutralState", function (assert) {
    var filter = new fabric.Image.filters.Sepia()
    expect(filter.isNeutralState()).toBeFalsy()
  })

  describe("fabric.Image.filters.Resize")

  test("constructor", function (assert) {
    expect(fabric.Image.filters.Resize).toBeTruthy()

    var filter = new fabric.Image.filters.Resize()
    expect(filter instanceof fabric.Image.filters.Resize).toBeTruthy()
  })

  test("properties", function (assert) {
    var filter = new fabric.Image.filters.Resize()

    expect(filter.type).toEqual("Resize")

    expect(filter.resizeType).toEqual("hermite")
    expect(filter.lanczosLobes).toEqual(3)
    expect(filter.scaleX).toEqual(1)
    expect(filter.scaleY).toEqual(1)

    var filter2 = new fabric.Image.filters.Resize({
      resizeType: "bilinear",
      scaleX: 0.3,
      scaleY: 0.3
    })
    expect(filter2.resizeType).toEqual("bilinear")
    expect(filter2.scaleX).toEqual(0.3)
    expect(filter2.scaleY).toEqual(0.3)
  })

  test("applyTo2d", function (assert) {
    var filter = new fabric.Image.filters.Resize()
    expect(typeof filter.applyTo2d === "function").toBeTruthy()
  })

  test("toObject", function (assert) {
    var filter = new fabric.Image.filters.Resize()
    expect(typeof filter.toObject === "function").toBeTruthy()

    var object = filter.toObject()
    expect(JSON.stringify(object)).toEqual(
      '{"type":"Resize","scaleX":1,"scaleY":1,"resizeType":"hermite","lanczosLobes":3}'
    )

    filter.resizeType = "bilinear"
    object = filter.toObject()
    expect(JSON.stringify(object)).toEqual(
      '{"type":"Resize","scaleX":1,"scaleY":1,"resizeType":"bilinear","lanczosLobes":3}'
    )
  })

  test("fromObject", function (assert) {
    var filter = new fabric.Image.filters.Resize()

    var object = filter.toObject()
    var fromObject = fabric.Image.filters.Resize.fromObject(object)
    expect(fromObject).toEqual(filter)
    expect(fromObject instanceof fabric.Image.filters.Resize).toBeTruthy()
    filter.resizeType = "bilinear"
    filter.scaleX = 0.8
    filter.scaleY = 0.8
    expect(fabric.Image.filters.Resize.fromObject(filter.toObject())).toEqual(filter)
  })

  test("isNeutralState", function (assert) {
    var filter = new fabric.Image.filters.Resize()
    expect(filter.isNeutralState()).toBeTruthy()
    filter.scaleX = 1.4
    expect(filter.isNeutralState()).toBeFalsy()
  })

  describe("fabric.Image.filters.Blur")

  test("isNeutralState", function (assert) {
    var filter = new fabric.Image.filters.Blur()
    expect(filter.isNeutralState()).toBeTruthy()
    filter.blur = 0.3
    expect(filter.isNeutralState()).toBeFalsy()
  })
})()
