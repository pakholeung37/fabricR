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

function makeImageElement(attributes) {
  var element = {}
  element.getAttribute = function (x) {
    return element[x]
  }
  element.setAttribute = function (x, value) {
    element[x] = value
  }
  for (var prop in attributes) {
    element.setAttribute(prop, attributes[prop])
  }
  return element
}

var IMG_SRC = fabric.isLikelyNode
    ? `file://${isWin ? "/" : ""}${path.posix.join(
        __dirname.replace(/\\/g, "/"),
        "/../fixtures/test_image.gif"
      )}`
    : getAbsolutePath("../fixtures/test_image.gif"),
  IMG_SRC_REL = fabric.isLikelyNode
    ? `file://${isWin ? "/" : ""}${path.posix.join(
        __dirname.replace(/\\/g, "/"),
        "/../fixtures/test_image.gif"
      )}`
    : "../fixtures/test_image.gif",
  IMG_WIDTH = 276,
  IMG_HEIGHT = 110

var IMG_URL_NON_EXISTING = "http://www.google.com/non-existing"

var REFERENCE_IMG_OBJECT = {
  version: fabric.version,
  type: "image",
  originX: "left",
  originY: "top",
  left: 0,
  top: 0,
  width: IMG_WIDTH, // node-canvas doesn't seem to allow setting width/height on image objects
  height: IMG_HEIGHT, // or does it now?
  fill: "rgb(0,0,0)",
  stroke: null,
  strokeWidth: 0,
  strokeDashArray: null,
  strokeLineCap: "butt",
  strokeDashOffset: 0,
  strokeLineJoin: "miter",
  strokeMiterLimit: 4,
  scaleX: 1,
  scaleY: 1,
  angle: 0,
  flipX: false,
  flipY: false,
  opacity: 1,
  src: IMG_SRC,
  shadow: null,
  visible: true,
  backgroundColor: "",
  filters: [],
  fillRule: "nonzero",
  paintFirst: "fill",
  globalCompositeOperation: "source-over",
  skewX: 0,
  skewY: 0,
  crossOrigin: null,
  cropX: 0,
  cropY: 0
}

function _createImageElement() {
  return fabric.document.createElement("img")
}

function _createImageObject(width, height, callback, options, src) {
  options = options || {}
  src = src || IMG_SRC
  var elImage = _createImageElement()
  setSrc(elImage, src, function () {
    options.width = width
    options.height = height
    callback(new fabric.Image(elImage, options))
  })
}

function createImageObject(callback, options) {
  return _createImageObject(IMG_WIDTH, IMG_HEIGHT, callback, options)
}

function createSmallImageObject(callback, options) {
  return _createImageObject(IMG_WIDTH / 2, IMG_HEIGHT / 2, callback, options)
}

function createImageObjectWithSrc(callback, options, src) {
  return _createImageObject(IMG_WIDTH, IMG_HEIGHT, callback, options, src)
}

function setSrc(img, src, callback) {
  img.onload = function () {
    callback && callback()
  }
  img.src = src
}

describe("fabric.Image", () => {
  test("constructor", function (done) {
    expect(fabric.Image).toBeTruthy()

    createImageObject(function (image) {
      expect(image instanceof fabric.Image).toBeTruthy()
      expect(image instanceof fabric.Object).toBeTruthy()

      expect(image.get("type")).toBe("image")

      done()
    })
  })

  test("toObject", function (done) {
    createImageObject(function (image) {
      expect(typeof image.toObject === "function").toBeTruthy()
      var toObject = image.toObject()
      // workaround for node-canvas sometimes producing images with width/height and sometimes not
      if (toObject.width === 0) {
        toObject.width = IMG_WIDTH
      }
      if (toObject.height === 0) {
        toObject.height = IMG_HEIGHT
      }
      expect(toObject).toEqual(REFERENCE_IMG_OBJECT)
      done()
    })
  })

  test("setSrc", function (done) {
    createImageObject(function (image) {
      image.width = 100
      image.height = 100
      expect(typeof image.setSrc === "function").toBeTruthy()
      expect(image.width).toBe(100)
      expect(image.height).toBe(100)
      image.setSrc(IMG_SRC, function () {
        expect(image.width).toBe(IMG_WIDTH)
        expect(image.height).toBe(IMG_HEIGHT)
        done()
      })
    })
  })

  test("setSrc with crossOrigin", function (done) {
    createImageObject(function (image) {
      image.width = 100
      image.height = 100
      expect(typeof image.setSrc === "function").toBeTruthy()
      expect(image.width).toBe(100)
      expect(image.height).toBe(100)
      image.setSrc(
        IMG_SRC,
        function () {
          expect(image.width).toBe(IMG_WIDTH)
          expect(image.height).toBe(IMG_HEIGHT)
          expect(image.getCrossOrigin()).toBe("anonymous")
          done()
        },
        {
          crossOrigin: "anonymous"
        }
      )
    })
  })

  test("toObject with no element", function (done) {
    createImageObject(function (image) {
      expect(typeof image.toObject === "function").toBeTruthy()
      var toObject = image.toObject()
      // workaround for node-canvas sometimes producing images with width/height and sometimes not
      if (toObject.width === 0) {
        toObject.width = IMG_WIDTH
      }
      if (toObject.height === 0) {
        toObject.height = IMG_HEIGHT
      }
      expect(toObject).toEqual(REFERENCE_IMG_OBJECT)
      done()
    })
  })

  test("toObject with resize filter", function (done) {
    createImageObject(function (image) {
      expect(typeof image.toObject === "function").toBeTruthy()
      var filter = new fabric.Image.filters.Resize({
        resizeType: "bilinear",
        scaleX: 0.3,
        scaleY: 0.3
      })
      image.resizeFilter = filter
      expect(
        image.resizeFilter instanceof fabric.Image.filters.Resize
      ).toBeTruthy()
      var toObject = image.toObject()
      expect(toObject.resizeFilter).toEqual(filter.toObject())
      fabric.Image.fromObject(toObject, function (imageFromObject) {
        var filterFromObj = imageFromObject.resizeFilter
        expect(
          filterFromObj instanceof fabric.Image.filters.Resize
        ).toBeTruthy()
        expect(filterFromObj).toEqual(filter)
        expect(filterFromObj.scaleX).toBe(0.3)
        expect(filterFromObj.scaleY).toBe(0.3)
        expect(filterFromObj.resizeType).toBe("bilinear")
        done()
      })
    })
  })

  test("toObject with normal filter and resize filter", function (done) {
    createImageObject(function (image) {
      var filter = new fabric.Image.filters.Resize({ resizeType: "bilinear" })
      image.resizeFilter = filter
      var filterBg = new fabric.Image.filters.Brightness({ brightness: 0.8 })
      image.filters = [filterBg]
      image.scaleX = 0.3
      image.scaleY = 0.3
      var toObject = image.toObject()
      expect(toObject.resizeFilter).toEqual(filter.toObject())
      expect(toObject.filters[0]).toEqual(filterBg.toObject())
      fabric.Image.fromObject(toObject, function (imageFromObject) {
        var filterFromObj = imageFromObject.resizeFilter
        var brightnessFromObj = imageFromObject.filters[0]
        expect(
          filterFromObj instanceof fabric.Image.filters.Resize
        ).toBeTruthy()
        expect(
          brightnessFromObj instanceof fabric.Image.filters.Brightness
        ).toBeTruthy()
        done()
      })
    })
  })

  test("toObject with applied resize filter", function (done) {
    createImageObject(function (image) {
      expect(typeof image.toObject === "function").toBeTruthy()
      var filter = new fabric.Image.filters.Resize({
        resizeType: "bilinear",
        scaleX: 0.2,
        scaleY: 0.2
      })
      image.filters.push(filter)
      var width = image.width,
        height = image.height
      expect(
        image.filters[0] instanceof fabric.Image.filters.Resize
      ).toBeTruthy()
      image.applyFilters()
      expect(image.width).toBe(Math.floor(width))
      expect(image.height).toBe(Math.floor(height))
      expect(image._filterScalingX.toFixed(1)).toBe(0.2)
      expect(image._filterScalingY.toFixed(1)).toBe(0.2)
      var toObject = image.toObject()
      expect(toObject.filters[0]).toEqual(filter.toObject())
      expect(toObject.width).toBe(width)
      expect(toObject.height).toBe(height)
      fabric.Image.fromObject(toObject, function (_imageFromObject) {
        var filterFromObj = _imageFromObject.filters[0]
        expect(
          filterFromObj instanceof fabric.Image.filters.Resize
        ).toBeTruthy()
        expect(filterFromObj.scaleY).toBe(0.2)
        expect(filterFromObj.scaleX).toBe(0.2)
        done()
      })
    })
  })

  test("toString", function (done) {
    createImageObject(function (image) {
      expect(typeof image.toString === "function").toBeTruthy()
      expect(image.toString()).toBe(
        '#<fabric.Image: { src: "' + IMG_SRC + '" }>'
      )
      done()
    })
  })

  test("toSVG with crop", function (done) {
    createImageObject(function (image) {
      image.cropX = 1
      image.cropY = 1
      image.width -= 2
      image.height -= 2
      fabric.Object.__uid = 1
      var expectedSVG =
        '<g transform="matrix(1 0 0 1 137 54)"  >\n<clipPath id="imageCrop_1">\n\t<rect x="-137" y="-54" width="274" height="108" />\n</clipPath>\n\t<image style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"  xlink:href="' +
        IMG_SRC +
        '" x="-138" y="-55" width="276" height="110" clip-path="url(#imageCrop_1)" ></image>\n</g>\n'
      expect(image.toSVG()).toBe(expectedSVG)
      done()
    })
  })

  test("hasCrop", function (done) {
    createImageObject(function (image) {
      expect(typeof image.hasCrop === "function").toBeTruthy()
      expect(image.hasCrop()).toBe(false)
      image.cropX = 1
      expect(image.hasCrop()).toBe(true)
      image.cropX = 0
      image.cropY = 1
      expect(image.hasCrop()).toBe(true)
      image.width -= 1
      expect(image.hasCrop()).toBe(true)
      image.width += 1
      image.height -= 1
      expect(image.hasCrop()).toBe(true)
      done()
    })
  })

  test("toSVG", function (done) {
    createImageObject(function (image) {
      expect(typeof image.toSVG === "function").toBeTruthy()
      var expectedSVG =
        '<g transform="matrix(1 0 0 1 138 55)"  >\n\t<image style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"  xlink:href="' +
        IMG_SRC +
        '" x="-138" y="-55" width="276" height="110"></image>\n</g>\n'
      expect(image.toSVG()).toBe(expectedSVG)
      done()
    })
  })

  test("toSVG with imageSmoothing false", function (done) {
    createImageObject(function (image) {
      image.imageSmoothing = false
      expect(typeof image.toSVG === "function").toBeTruthy()
      var expectedSVG =
        '<g transform="matrix(1 0 0 1 138 55)"  >\n\t<image style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"  xlink:href="' +
        IMG_SRC +
        '" x="-138" y="-55" width="276" height="110" image-rendering="optimizeSpeed"></image>\n</g>\n'
      expect(image.toSVG()).toBe(expectedSVG)
      done()
    })
  })

  test("toSVG with missing element", function (done) {
    createImageObject(function (image) {
      delete image._element
      expect(typeof image.toSVG === "function").toBeTruthy()
      var expectedSVG = '<g transform="matrix(1 0 0 1 138 55)"  >\n</g>\n'
      expect(image.toSVG()).toBe(expectedSVG)
      done()
    })
  })

  test("getSrc", function (done) {
    createImageObject(function (image) {
      expect(typeof image.getSrc === "function").toBeTruthy()
      expect(image.getSrc()).toBe(IMG_SRC)
      done()
    })
  })

  test("getSrc with srcFromAttribute", function (done) {
    createImageObjectWithSrc(
      function (image) {
        expect(image.getSrc()).toBe(IMG_SRC_REL)
        done()
      },
      {
        srcFromAttribute: true
      },
      IMG_SRC_REL
    )
  })

  test("getElement", function () {
    var elImage = _createImageElement()
    var image = new fabric.Image(elImage)
    expect(typeof image.getElement === "function").toBeTruthy()
    expect(image.getElement()).toBe(elImage)
  })

  test("setElement", function (done) {
    createImageObject(function (image) {
      expect(typeof image.setElement === "function").toBeTruthy()

      var elImage = _createImageElement()
      expect(image.getElement()).not.toBe(elImage)
      expect(image.setElement(elImage)).toBe(image)
      expect(image.getElement()).toBe(elImage)
      expect(image._originalElement).toBe(elImage)
      done()
    })
  })

  test("setElement resets the webgl cache", function (done) {
    var fabricBackend = fabric.filterBackend
    createImageObject(function (image) {
      fabric.filterBackend = {
        textureCache: {},
        evictCachesForKey: function (key) {
          delete this.textureCache[key]
        }
      }
      var elImage = _createImageElement()
      fabric.filterBackend.textureCache[image.cacheKey] = "something"
      expect(image.setElement(elImage)).toBe(image)
      expect(fabric.filterBackend.textureCache[image.cacheKey]).toBe(undefined)
      fabric.filterBackend = fabricBackend
      done()
    })
  })

  test("crossOrigin", function (done) {
    createImageObject(function (image) {
      expect(image.getCrossOrigin()).toBe(null)

      var elImage = _createImageElement()
      elImage.crossOrigin = "anonymous"
      image = new fabric.Image(elImage)
      expect(image.getCrossOrigin()).toBe("anonymous")

      var objRepr = image.toObject()
      expect(objRepr.crossOrigin).toBe("anonymous")

      var elImage2 = _createImageElement()
      elImage2.crossOrigin = "use-credentials"
      image.setElement(elImage2)
      expect(elImage2.crossOrigin).toBe("use-credentials")

      // fromObject doesn't work on Node :/
      if (fabric.isLikelyNode) {
        done()
        return
      }
      console.log(objRepr)
      fabric.Image.fromObject(objRepr, function (img) {
        expect(img.getCrossOrigin()).toBe(null)
        done()
      })
    })
  })

  test("clone", function (done) {
    createImageObject(function (image) {
      expect(typeof image.clone === "function").toBeTruthy()
      image.clone(function (clone) {
        expect(clone instanceof fabric.Image).toBeTruthy()
        expect(clone.toObject()).toEqual(image.toObject())
        done()
      })
    })
  })

  test("cloneWidthHeight", function (done) {
    createSmallImageObject(function (image) {
      image.clone(function (clone) {
        expect(clone.width).toBe(IMG_WIDTH / 2)
        expect(clone.height).toBe(IMG_HEIGHT / 2)
        done()
      })
    })
  })

  test("fromObject", function (done) {
    expect(typeof fabric.Image.fromObject === "function").toBeTruthy()

    // should not throw error when no callback is given
    var obj = fabric.util.object.extend(
      fabric.util.object.clone(REFERENCE_IMG_OBJECT),
      {
        src: IMG_SRC
      }
    )
    fabric.Image.fromObject(obj, function (instance) {
      expect(instance instanceof fabric.Image).toBeTruthy()
      done()
    })
  })

  test("fromObject with clipPath", function (done) {
    // should not throw error when no callback is given
    var obj = fabric.util.object.extend(
      fabric.util.object.clone(REFERENCE_IMG_OBJECT),
      {
        src: IMG_SRC,
        clipPath: new fabric.Rect({ width: 100, height: 100 }).toObject()
      }
    )
    fabric.Image.fromObject(obj, function (instance) {
      expect(instance instanceof fabric.Image).toBeTruthy()
      expect(instance.clipPath instanceof fabric.Rect).toBeTruthy()
      done()
    })
  })

  test("fromObject does not mutate data", function (done) {
    expect(typeof fabric.Image.fromObject === "function").toBeTruthy()

    var obj = fabric.util.object.extend(
      fabric.util.object.clone(REFERENCE_IMG_OBJECT),
      {
        src: IMG_SRC
      }
    )
    var brightness = {
      type: "Brightness",
      brightness: 0.1
    }
    var contrast = {
      type: "Contrast",
      contrast: 0.1
    }
    obj.filters = [brightness]
    obj.resizeFilter = contrast
    var copyOfFilters = obj.filters
    var copyOfBrighteness = brightness
    var copyOfContrast = contrast
    var copyOfObject = obj
    fabric.Image.fromObject(obj, function () {
      expect(copyOfFilters === obj.filters).toBeTruthy()
      expect(copyOfBrighteness === copyOfFilters[0]).toBeTruthy()
      expect(copyOfBrighteness).toEqual(obj.filters[0])
      expect(copyOfFilters).toEqual(obj.filters)
      expect(copyOfContrast).toEqual(obj.resizeFilter)
      expect(copyOfObject).toEqual(obj)
      expect(copyOfContrast === obj.resizeFilter).toBeTruthy()
      done()
    })
  })

  test("fromURL", function (done) {
    expect(typeof fabric.Image.fromURL === "function").toBeTruthy()
    fabric.Image.fromURL(IMG_SRC, function (instance) {
      expect(instance instanceof fabric.Image).toBeTruthy()
      expect(REFERENCE_IMG_OBJECT).toEqual(instance.toObject())
      done()
    })
  })

  test("fromURL error", function (done) {
    expect(typeof fabric.Image.fromURL === "function").toBeTruthy()
    fabric.Image.fromURL(IMG_URL_NON_EXISTING, function (instance, isError) {
      expect(instance instanceof fabric.Image).toBeTruthy()
      expect(isError).toBe(true)
      done()
    })
  })

  test("fromElement", function (done) {
    var IMAGE_DATA_URL =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAARCAYAAADtyJ2fAAAACXBIWXMAAAsSAAALEgHS3X78AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVBJREFUeNqMU7tOBDEMtENuy614/QE/gZBOuvJK+Et6CiQ6JP6ExxWI7bhL1vgVExYKLPmsTTIzjieHd+MZZSBIAJwEyJU0EWaum+lNljRux3O6nl70Gx/GUwUeyYcDJWZNhMK1aEXYe95Mz4iP44kDTRUZSWSq1YEHri0/HZxXfGSFBN+qDEJTrNI+QXRBviZ7eWCQgjsg+IHiHYB30MhqUxwcmH1Arc2kFDwkBldeFGJLPqs/AbbF2dWgUym6Z2Tb6RVzYxG1wUnmaNcOonZiU0++l6C7FzoQY42g3+8jz+GZ+dWMr1rRH0OjAFhPO+VJFx/vWDqPmk8H97CGBUYUiqAGW0PVe1+aX8j2Ll0tgHtvLx6AK9Tu1ZTFTQ0ojChqGD4qkOzeAuzVfgzsaTym1ClS+IdwtQCFooQMBTumNun1H6Bfcc9/MUn4R3wJMAAZH6MmA4ht4gAAAABJRU5ErkJggg=="

    expect(typeof fabric.Image.fromElement === "function").toBeTruthy()

    var imageEl = makeImageElement({
      width: "14",
      height: "17",
      "xlink:href": IMAGE_DATA_URL
    })

    fabric.Image.fromElement(imageEl, function (imgObject) {
      expect(imgObject instanceof fabric.Image).toBeTruthy()
      expect(imgObject.get("width")).toEqual(14)
      expect(imgObject.get("height")).toEqual(17)
      expect(imgObject.getSrc()).toEqual(IMAGE_DATA_URL)
      done()
    })
  })

  test("fromElement imageSmoothing", function (done) {
    var IMAGE_DATA_URL =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAARCAYAAADtyJ2fAAAACXBIWXMAAAsSAAALEgHS3X78AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVBJREFUeNqMU7tOBDEMtENuy614/QE/gZBOuvJK+Et6CiQ6JP6ExxWI7bhL1vgVExYKLPmsTTIzjieHd+MZZSBIAJwEyJU0EWaum+lNljRux3O6nl70Gx/GUwUeyYcDJWZNhMK1aEXYe95Mz4iP44kDTRUZSWSq1YEHri0/HZxXfGSFBN+qDEJTrNI+QXRBviZ7eWCQgjsg+IHiHYB30MhqUxwcmH1Arc2kFDwkBldeFGJLPqs/AbbF2dWgUym6Z2Tb6RVzYxG1wUnmaNcOonZiU0++l6C7FzoQY42g3+8jz+GZ+dWMr1rRH0OjAFhPO+VJFx/vWDqPmk8H97CGBUYUiqAGW0PVe1+aX8j2Ll0tgHtvLx6AK9Tu1ZTFTQ0ojChqGD4qkOzeAuzVfgzsaTym1ClS+IdwtQCFooQMBTumNun1H6Bfcc9/MUn4R3wJMAAZH6MmA4ht4gAAAABJRU5ErkJggg=="

    expect(typeof fabric.Image.fromElement === "function").toBeTruthy()

    var imageEl = makeImageElement({
      width: "14",
      height: "17",
      "image-rendering": "optimizeSpeed",
      "xlink:href": IMAGE_DATA_URL
    })

    fabric.Image.fromElement(imageEl, function (imgObject) {
      expect(imgObject instanceof fabric.Image).toBeTruthy()
      expect(imgObject.get("imageSmoothing")).toEqual(false)
      done()
    })
  })

  test("fromElement with preserveAspectRatio", function (done) {
    var IMAGE_DATA_URL =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAARCAYAAADtyJ2fAAAACXBIWXMAAAsSAAALEgHS3X78AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVBJREFUeNqMU7tOBDEMtENuy614/QE/gZBOuvJK+Et6CiQ6JP6ExxWI7bhL1vgVExYKLPmsTTIzjieHd+MZZSBIAJwEyJU0EWaum+lNljRux3O6nl70Gx/GUwUeyYcDJWZNhMK1aEXYe95Mz4iP44kDTRUZSWSq1YEHri0/HZxXfGSFBN+qDEJTrNI+QXRBviZ7eWCQgjsg+IHiHYB30MhqUxwcmH1Arc2kFDwkBldeFGJLPqs/AbbF2dWgUym6Z2Tb6RVzYxG1wUnmaNcOonZiU0++l6C7FzoQY42g3+8jz+GZ+dWMr1rRH0OjAFhPO+VJFx/vWDqPmk8H97CGBUYUiqAGW0PVe1+aX8j2Ll0tgHtvLx6AK9Tu1ZTFTQ0ojChqGD4qkOzeAuzVfgzsaTym1ClS+IdwtQCFooQMBTumNun1H6Bfcc9/MUn4R3wJMAAZH6MmA4ht4gAAAABJRU5ErkJggg=="

    expect(typeof fabric.Image.fromElement === "function").toBeTruthy()

    var imageEl = makeImageElement({
      width: "140",
      height: "170",
      "xlink:href": IMAGE_DATA_URL
    })

    fabric.Image.fromElement(imageEl, function (imgObject) {
      imgObject._removeTransformMatrix(
        imgObject.parsePreserveAspectRatioAttribute()
      )
      expect(imgObject instanceof fabric.Image).toBeTruthy()
      expect(imgObject.get("width")).toEqual(14)
      expect(imgObject.get("height")).toEqual(17)
      expect(imgObject.get("scaleX")).toEqual(10)
      expect(imgObject.get("scaleY")).toEqual(10)
      expect(imgObject.getSrc()).toEqual(IMAGE_DATA_URL)
      done()
    })
  })

  test("fromElement with preserveAspectRatio and smaller bbox", function (done) {
    var IMAGE_DATA_URL =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAARCAYAAADtyJ2fAAAACXBIWXMAAAsSAAALEgHS3X78AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVBJREFUeNqMU7tOBDEMtENuy614/QE/gZBOuvJK+Et6CiQ6JP6ExxWI7bhL1vgVExYKLPmsTTIzjieHd+MZZSBIAJwEyJU0EWaum+lNljRux3O6nl70Gx/GUwUeyYcDJWZNhMK1aEXYe95Mz4iP44kDTRUZSWSq1YEHri0/HZxXfGSFBN+qDEJTrNI+QXRBviZ7eWCQgjsg+IHiHYB30MhqUxwcmH1Arc2kFDwkBldeFGJLPqs/AbbF2dWgUym6Z2Tb6RVzYxG1wUnmaNcOonZiU0++l6C7FzoQY42g3+8jz+GZ+dWMr1rRH0OjAFhPO+VJFx/vWDqPmk8H97CGBUYUiqAGW0PVe1+aX8j2Ll0tgHtvLx6AK9Tu1ZTFTQ0ojChqGD4qkOzeAuzVfgzsaTym1ClS+IdwtQCFooQMBTumNun1H6Bfcc9/MUn4R3wJMAAZH6MmA4ht4gAAAABJRU5ErkJggg=="

    expect(typeof fabric.Image.fromElement === "function").toBeTruthy()

    var imageEl = makeImageElement({
      x: "0",
      y: "0",
      width: "70",
      height: "170",
      preserveAspectRatio: "meet xMidYMid",
      "xlink:href": IMAGE_DATA_URL
    })

    fabric.Image.fromElement(imageEl, function (imgObject) {
      imgObject._removeTransformMatrix(
        imgObject.parsePreserveAspectRatioAttribute()
      )
      expect(imgObject.get("width")).toEqual(14)
      expect(imgObject.get("height")).toEqual(17)
      expect(imgObject.get("left")).toEqual(0)
      expect(imgObject.get("top")).toEqual(42.5)
      expect(imgObject.get("scaleX")).toEqual(5)
      expect(imgObject.get("scaleY")).toEqual(5)
      expect(imgObject.getSrc()).toEqual(IMAGE_DATA_URL)
      done()
    })
  })

  test("fromElement with preserveAspectRatio and smaller bbox xMidYmax", function (done) {
    var IMAGE_DATA_URL =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAARCAYAAADtyJ2fAAAACXBIWXMAAAsSAAALEgHS3X78AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVBJREFUeNqMU7tOBDEMtENuy614/QE/gZBOuvJK+Et6CiQ6JP6ExxWI7bhL1vgVExYKLPmsTTIzjieHd+MZZSBIAJwEyJU0EWaum+lNljRux3O6nl70Gx/GUwUeyYcDJWZNhMK1aEXYe95Mz4iP44kDTRUZSWSq1YEHri0/HZxXfGSFBN+qDEJTrNI+QXRBviZ7eWCQgjsg+IHiHYB30MhqUxwcmH1Arc2kFDwkBldeFGJLPqs/AbbF2dWgUym6Z2Tb6RVzYxG1wUnmaNcOonZiU0++l6C7FzoQY42g3+8jz+GZ+dWMr1rRH0OjAFhPO+VJFx/vWDqPmk8H97CGBUYUiqAGW0PVe1+aX8j2Ll0tgHtvLx6AK9Tu1ZTFTQ0ojChqGD4qkOzeAuzVfgzsaTym1ClS+IdwtQCFooQMBTumNun1H6Bfcc9/MUn4R3wJMAAZH6MmA4ht4gAAAABJRU5ErkJggg=="

    expect(typeof fabric.Image.fromElement === "function").toBeTruthy()

    var imageEl = makeImageElement({
      x: "0",
      y: "0",
      width: "70",
      height: "170",
      preserveAspectRatio: "meet xMidYMax",
      "xlink:href": IMAGE_DATA_URL
    })

    fabric.Image.fromElement(imageEl, function (imgObject) {
      imgObject._removeTransformMatrix(
        imgObject.parsePreserveAspectRatioAttribute()
      )
      expect(imgObject.get("width")).toEqual(14)
      expect(imgObject.get("height")).toEqual(17)
      expect(imgObject.get("left")).toEqual(0)
      expect(imgObject.get("top")).toEqual(85)
      expect(imgObject.get("scaleX")).toEqual(5)
      expect(imgObject.get("scaleY")).toEqual(5)
      expect(imgObject.getSrc()).toEqual(IMAGE_DATA_URL)
      done()
    })
  })

  test("fromElement with preserveAspectRatio and smaller bbox xMidYmin", function (done) {
    var IMAGE_DATA_URL =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAARCAYAAADtyJ2fAAAACXBIWXMAAAsSAAALEgHS3X78AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVBJREFUeNqMU7tOBDEMtENuy614/QE/gZBOuvJK+Et6CiQ6JP6ExxWI7bhL1vgVExYKLPmsTTIzjieHd+MZZSBIAJwEyJU0EWaum+lNljRux3O6nl70Gx/GUwUeyYcDJWZNhMK1aEXYe95Mz4iP44kDTRUZSWSq1YEHri0/HZxXfGSFBN+qDEJTrNI+QXRBviZ7eWCQgjsg+IHiHYB30MhqUxwcmH1Arc2kFDwkBldeFGJLPqs/AbbF2dWgUym6Z2Tb6RVzYxG1wUnmaNcOonZiU0++l6C7FzoQY42g3+8jz+GZ+dWMr1rRH0OjAFhPO+VJFx/vWDqPmk8H97CGBUYUiqAGW0PVe1+aX8j2Ll0tgHtvLx6AK9Tu1ZTFTQ0ojChqGD4qkOzeAuzVfgzsaTym1ClS+IdwtQCFooQMBTumNun1H6Bfcc9/MUn4R3wJMAAZH6MmA4ht4gAAAABJRU5ErkJggg=="

    expect(typeof fabric.Image.fromElement === "function").toBeTruthy()

    var imageEl = makeImageElement({
      x: "0",
      y: "0",
      width: "70",
      height: "170",
      preserveAspectRatio: "meet xMidYMin",
      "xlink:href": IMAGE_DATA_URL
    })

    fabric.Image.fromElement(imageEl, function (imgObject) {
      imgObject._removeTransformMatrix(
        imgObject.parsePreserveAspectRatioAttribute()
      )
      expect(imgObject.get("width")).toEqual(14)
      expect(imgObject.get("height")).toEqual(17)
      expect(imgObject.get("left")).toEqual(0)
      expect(imgObject.get("top")).toEqual(0)
      expect(imgObject.get("scaleX")).toEqual(5)
      expect(imgObject.get("scaleY")).toEqual(5)
      expect(imgObject.getSrc()).toEqual(IMAGE_DATA_URL)
      done()
    })
  })

  test("fromElement with preserveAspectRatio and smaller V bbox xMinYMin", function (done) {
    var IMAGE_DATA_URL =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAARCAYAAADtyJ2fAAAACXBIWXMAAAsSAAALEgHS3X78AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVBJREFUeNqMU7tOBDEMtENuy614/QE/gZBOuvJK+Et6CiQ6JP6ExxWI7bhL1vgVExYKLPmsTTIzjieHd+MZZSBIAJwEyJU0EWaum+lNljRux3O6nl70Gx/GUwUeyYcDJWZNhMK1aEXYe95Mz4iP44kDTRUZSWSq1YEHri0/HZxXfGSFBN+qDEJTrNI+QXRBviZ7eWCQgjsg+IHiHYB30MhqUxwcmH1Arc2kFDwkBldeFGJLPqs/AbbF2dWgUym6Z2Tb6RVzYxG1wUnmaNcOonZiU0++l6C7FzoQY42g3+8jz+GZ+dWMr1rRH0OjAFhPO+VJFx/vWDqPmk8H97CGBUYUiqAGW0PVe1+aX8j2Ll0tgHtvLx6AK9Tu1ZTFTQ0ojChqGD4qkOzeAuzVfgzsaTym1ClS+IdwtQCFooQMBTumNun1H6Bfcc9/MUn4R3wJMAAZH6MmA4ht4gAAAABJRU5ErkJggg=="

    expect(typeof fabric.Image.fromElement === "function").toBeTruthy()

    var imageEl = makeImageElement({
      x: "0",
      y: "0",
      width: "140",
      height: "85",
      preserveAspectRatio: "meet xMinYMin",
      "xlink:href": IMAGE_DATA_URL
    })

    fabric.Image.fromElement(imageEl, function (imgObject) {
      imgObject._removeTransformMatrix(
        imgObject.parsePreserveAspectRatioAttribute()
      )
      expect(imgObject.get("width")).toEqual(14)
      expect(imgObject.get("height")).toEqual(17)
      expect(imgObject.get("left")).toEqual(0)
      expect(imgObject.get("top")).toEqual(0)
      expect(imgObject.get("scaleX")).toEqual(5)
      expect(imgObject.get("scaleY")).toEqual(5)
      expect(imgObject.getSrc()).toEqual(IMAGE_DATA_URL)
      done()
    })
  })

  test("fromElement with preserveAspectRatio and smaller V bbox xMidYmin", function (done) {
    var IMAGE_DATA_URL =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAARCAYAAADtyJ2fAAAACXBIWXMAAAsSAAALEgHS3X78AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVBJREFUeNqMU7tOBDEMtENuy614/QE/gZBOuvJK+Et6CiQ6JP6ExxWI7bhL1vgVExYKLPmsTTIzjieHd+MZZSBIAJwEyJU0EWaum+lNljRux3O6nl70Gx/GUwUeyYcDJWZNhMK1aEXYe95Mz4iP44kDTRUZSWSq1YEHri0/HZxXfGSFBN+qDEJTrNI+QXRBviZ7eWCQgjsg+IHiHYB30MhqUxwcmH1Arc2kFDwkBldeFGJLPqs/AbbF2dWgUym6Z2Tb6RVzYxG1wUnmaNcOonZiU0++l6C7FzoQY42g3+8jz+GZ+dWMr1rRH0OjAFhPO+VJFx/vWDqPmk8H97CGBUYUiqAGW0PVe1+aX8j2Ll0tgHtvLx6AK9Tu1ZTFTQ0ojChqGD4qkOzeAuzVfgzsaTym1ClS+IdwtQCFooQMBTumNun1H6Bfcc9/MUn4R3wJMAAZH6MmA4ht4gAAAABJRU5ErkJggg=="

    expect(typeof fabric.Image.fromElement === "function").toBeTruthy()

    var imageEl = makeImageElement({
      x: "0",
      y: "0",
      width: "140",
      height: "85",
      preserveAspectRatio: "meet xMidYMin",
      "xlink:href": IMAGE_DATA_URL
    })

    fabric.Image.fromElement(imageEl, function (imgObject) {
      imgObject._removeTransformMatrix(
        imgObject.parsePreserveAspectRatioAttribute()
      )
      expect(imgObject.get("width")).toEqual(14)
      expect(imgObject.get("height")).toEqual(17)
      expect(imgObject.get("left")).toEqual(35)
      expect(imgObject.get("top")).toEqual(0)
      expect(imgObject.get("scaleX")).toEqual(5)
      expect(imgObject.get("scaleY")).toEqual(5)
      expect(imgObject.getSrc()).toEqual(IMAGE_DATA_URL)
      done()
    })
  })

  test("fromElement with preserveAspectRatio and smaller V bbox xMaxYMin", function (done) {
    var IMAGE_DATA_URL =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAARCAYAAADtyJ2fAAAACXBIWXMAAAsSAAALEgHS3X78AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVBJREFUeNqMU7tOBDEMtENuy614/QE/gZBOuvJK+Et6CiQ6JP6ExxWI7bhL1vgVExYKLPmsTTIzjieHd+MZZSBIAJwEyJU0EWaum+lNljRux3O6nl70Gx/GUwUeyYcDJWZNhMK1aEXYe95Mz4iP44kDTRUZSWSq1YEHri0/HZxXfGSFBN+qDEJTrNI+QXRBviZ7eWCQgjsg+IHiHYB30MhqUxwcmH1Arc2kFDwkBldeFGJLPqs/AbbF2dWgUym6Z2Tb6RVzYxG1wUnmaNcOonZiU0++l6C7FzoQY42g3+8jz+GZ+dWMr1rRH0OjAFhPO+VJFx/vWDqPmk8H97CGBUYUiqAGW0PVe1+aX8j2Ll0tgHtvLx6AK9Tu1ZTFTQ0ojChqGD4qkOzeAuzVfgzsaTym1ClS+IdwtQCFooQMBTumNun1H6Bfcc9/MUn4R3wJMAAZH6MmA4ht4gAAAABJRU5ErkJggg=="

    expect(typeof fabric.Image.fromElement === "function").toBeTruthy()

    var imageEl = makeImageElement({
      x: "0",
      y: "0",
      width: "140",
      height: "85",
      preserveAspectRatio: "meet xMaxYMin",
      "xlink:href": IMAGE_DATA_URL
    })

    fabric.Image.fromElement(imageEl, function (imgObject) {
      imgObject._removeTransformMatrix(
        imgObject.parsePreserveAspectRatioAttribute()
      )
      expect(imgObject.get("width")).toEqual(14)
      expect(imgObject.get("height")).toEqual(17)
      expect(imgObject.get("left")).toEqual(70)
      expect(imgObject.get("top")).toEqual(0)
      expect(imgObject.get("scaleX")).toEqual(5)
      expect(imgObject.get("scaleY")).toEqual(5)
      expect(imgObject.getSrc()).toEqual(IMAGE_DATA_URL)
      done()
    })
  })

  test("consecutive dataURLs give same result.", function (done) {
    createImageObject(function (image) {
      var data1 = image.toDataURL()
      var data2 = image.toDataURL()
      var data3 = image.toDataURL()
      expect(data1 === data2).toBeTruthy()
      expect(data1 === data3).toBeTruthy()
      done()
    })
  })

  test("apply filters run isNeutralState implementation of filters", function (done) {
    createImageObject(function (image) {
      var run = false
      image.dirty = false
      var filter = new fabric.Image.filters.Brightness()
      image.filters = [filter]
      filter.isNeutralState = function () {
        run = true
      }
      expect(run).toBe(false)
      image.applyFilters()
      expect(run).toBe(true)
      done()
    })
  })

  test("apply filters set the image dirty", function (done) {
    createImageObject(function (image) {
      image.dirty = false
      expect(image.dirty).toBe(false)
      image.applyFilters()
      expect(image.dirty).toBe(true)
      done()
    })
  })

  test("apply filters reset _element and _filteredEl", function (done) {
    createImageObject(function (image) {
      var contrast = new fabric.Image.filters.Contrast({ contrast: 0.5 })
      image.applyFilters()
      var element = image._element
      var filtered = image._filteredEl
      image.filters = [contrast]
      image.applyFilters()
      expect(image._element).not.toBe(element)
      expect(image._filteredEl).not.toBe(filtered)
      expect(image._element).toBe(image._filteredEl)
      done()
    })
  })

  test("apply filters and resize filter", function (done) {
    createImageObject(function (image) {
      var contrast = new fabric.Image.filters.Contrast({ contrast: 0.5 })
      var resizeFilter = new fabric.Image.filters.Resize()
      image.filters = [contrast]
      image.resizeFilter = resizeFilter
      var element = image._element
      var filtered = image._filteredEl
      image.scaleX = 0.4
      image.scaleY = 0.4
      image.applyFilters()
      expect(image._element).not.toBe(element)
      expect(image._filteredEl).not.toBe(filtered)
      expect(image._element).toBe(image._filteredEl)
      image.applyResizeFilters()
      expect(image._element).not.toBe(image._filteredEl)
      expect(image._lastScaleX.toFixed(2)).toBe(image.scaleX)
      expect(image._lastScaleY.toFixed(2)).toBe(image.scaleY)
      image.applyFilters()
      expect(image._element).toBe(image._filteredEl)
      expect(image._lastScaleX).toBe(1)
      expect(image._lastScaleY).toBe(1)
      expect(image._needsResize()).toBe(true)
      done()
    })
  })

  test("apply filters set the image dirty and also the group", function (done) {
    createImageObject(function (image) {
      var group = new fabric.Group([image])
      image.dirty = false
      group.dirty = false
      expect(image.dirty).toBe(false)
      expect(group.dirty).toBe(false)
      image.applyFilters()
      expect(image.dirty).toBe(true)
      expect(group.dirty).toBe(true)
      done()
    })
  })

  test("_renderFill respects source boundaries crop < 0 and width > elWidth", function () {
    fabric.Image.prototype._renderFill.call(
      {
        cropX: -1,
        cropY: -1,
        _filterScalingX: 1,
        _filterScalingY: 1,
        width: 300,
        height: 300,
        _element: {
          naturalWidth: 200,
          height: 200
        }
      },
      {
        drawImage: function (src, sX, sY, sW, sH) {
          expect(sX >= 0).toBeTruthy()
          expect(sY >= 0).toBeTruthy()
          expect(sW <= 200).toBeTruthy()
          expect(sH <= 200).toBeTruthy()
        }
      }
    )
  })

  test("_renderFill respects source boundaries crop < 0 and width > elWidth", function () {
    fabric.Image.prototype._renderFill.call(
      {
        cropX: 30,
        cropY: 30,
        _filterScalingX: 0.5,
        _filterScalingY: 0.5,
        width: 210,
        height: 210,
        _element: {
          naturalWidth: 200,
          height: 200
        }
      },
      {
        drawImage: function (src, sX, sY, sW, sH) {
          expect(sX === 15).toBeTruthy()
          expect(sY === 15).toBeTruthy()
          expect(sW === 105).toBeTruthy()
          expect(sH === 105).toBeTruthy()
        }
      }
    )
  })
})
