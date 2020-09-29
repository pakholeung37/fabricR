import Object from "./object.class"
import Polyline from "./polyline.class"
import {
  toFixed,
  extend,
  createClass,
  getBoundsOfCurve,
  makePathSimpler,
  min,
  max,
  parsePath,
  isArray
} from "../util"
import { parseAttributes, loadSVGFromURL } from "../parser"
/**
 * Path class
 * @class Path
 * @extends Object
 * @tutorial {@link http://fabricjs.com/fabric-intro-part-1#path_and_pathgroup}
 * @see {@link Path#initialize} for constructor definition
 */
const Path = createClass(
  Object,
  /** @lends Path.prototype */ {
    /**
     * Type of an object
     * @type String
     * @default
     */
    type: "path",

    /**
     * Array of path points
     * @type Array
     * @default
     */
    path: null,

    cacheProperties: Object.prototype.cacheProperties.concat(
      "path",
      "fillRule"
    ),

    stateProperties: Object.prototype.stateProperties.concat("path"),

    /**
     * Constructor
     * @param {Array|String} path Path data (sequence of coordinates and corresponding "command" tokens)
     * @param {Object} [options] Options object
     * @return {Path} thisArg
     */
    initialize: function (path, options) {
      options = options || {}
      this.callSuper("initialize", options)
      if (!path) {
        path = []
      }

      var fromArray = isArray(path)

      this.path = fromArray
        ? makePathSimpler(path)
        : makePathSimpler(parsePath(path))

      if (!this.path) {
        return
      }
      Polyline.prototype._setPositionDimensions.call(this, options)
    },

    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx context to render path on
     */
    _renderPathCommands: function (ctx) {
      var current, // current instruction
        subpathStartX = 0,
        subpathStartY = 0,
        x = 0, // current x
        y = 0, // current y
        controlX = 0, // current control point x
        controlY = 0, // current control point y
        l = -this.pathOffset.x,
        t = -this.pathOffset.y

      ctx.beginPath()

      for (var i = 0, len = this.path.length; i < len; ++i) {
        current = this.path[i]

        switch (
          current[0] // first letter
        ) {
          case "L": // lineto, absolute
            x = current[1]
            y = current[2]
            ctx.lineTo(x + l, y + t)
            break

          case "M": // moveTo, absolute
            x = current[1]
            y = current[2]
            subpathStartX = x
            subpathStartY = y
            ctx.moveTo(x + l, y + t)
            break

          case "C": // bezierCurveTo, absolute
            x = current[5]
            y = current[6]
            controlX = current[3]
            controlY = current[4]
            ctx.bezierCurveTo(
              current[1] + l,
              current[2] + t,
              controlX + l,
              controlY + t,
              x + l,
              y + t
            )
            break

          case "Q": // quadraticCurveTo, absolute
            ctx.quadraticCurveTo(
              current[1] + l,
              current[2] + t,
              current[3] + l,
              current[4] + t
            )
            x = current[3]
            y = current[4]
            controlX = current[1]
            controlY = current[2]
            break

          case "z":
          case "Z":
            x = subpathStartX
            y = subpathStartY
            ctx.closePath()
            break
        }
      }
    },

    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx context to render path on
     */
    _render: function (ctx) {
      this._renderPathCommands(ctx)
      this._renderPaintInOrder(ctx)
    },

    /**
     * Returns string representation of an instance
     * @return {String} string representation of an instance
     */
    toString: function () {
      return (
        "#<fabric.Path (" +
        this.complexity() +
        '): { "top": ' +
        this.top +
        ', "left": ' +
        this.left +
        " }>"
      )
    },

    /**
     * Returns object representation of an instance
     * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
     * @return {Object} object representation of an instance
     */
    toObject: function (propertiesToInclude) {
      return extend(this.callSuper("toObject", propertiesToInclude), {
        path: this.path.map(function (item) {
          return item.slice()
        })
      })
    },

    /**
     * Returns dataless object representation of an instance
     * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
     * @return {Object} object representation of an instance
     */
    toDatalessObject: function (propertiesToInclude) {
      var o = this.toObject(["sourcePath"].concat(propertiesToInclude))
      if (o.sourcePath) {
        delete o.path
      }
      return o
    },

    /* _TO_SVG_START_ */
    /**
     * Returns svg representation of an instance
     * @return {Array} an array of strings with the specific svg representation
     * of the instance
     */
    _toSVG: function () {
      var path = this.path
        .map(function (path) {
          return path.join(" ")
        })
        .join(" ")
      return [
        "<path ",
        "COMMON_PARTS",
        'd="',
        path,
        '" stroke-linecap="round" ',
        "/>\n"
      ]
    },

    _getOffsetTransform: function () {
      var digits = Object.NUM_FRACTION_DIGITS
      return (
        " translate(" +
        toFixed(-this.pathOffset.x, digits) +
        ", " +
        toFixed(-this.pathOffset.y, digits) +
        ")"
      )
    },

    /**
     * Returns svg clipPath representation of an instance
     * @param {Function} [reviver] Method for further parsing of svg representation.
     * @return {String} svg representation of an instance
     */
    toClipPathSVG: function (reviver) {
      var additionalTransform = this._getOffsetTransform()
      return (
        "\t" +
        this._createBaseClipPathSVGMarkup(this._toSVG(), {
          reviver: reviver,
          additionalTransform: additionalTransform
        })
      )
    },

    /**
     * Returns svg representation of an instance
     * @param {Function} [reviver] Method for further parsing of svg representation.
     * @return {String} svg representation of an instance
     */
    toSVG: function (reviver) {
      var additionalTransform = this._getOffsetTransform()
      return this._createBaseSVGMarkup(this._toSVG(), {
        reviver: reviver,
        additionalTransform: additionalTransform
      })
    },
    /* _TO_SVG_END_ */

    /**
     * Returns number representation of an instance complexity
     * @return {Number} complexity of this instance
     */
    complexity: function () {
      return this.path.length
    },

    /**
     * @private
     */
    _calcDimensions: function () {
      var aX = [],
        aY = [],
        current, // current instruction
        subpathStartX = 0,
        subpathStartY = 0,
        x = 0, // current x
        y = 0, // current y
        bounds

      for (var i = 0, len = this.path.length; i < len; ++i) {
        current = this.path[i]

        switch (
          current[0] // first letter
        ) {
          case "L": // lineto, absolute
            x = current[1]
            y = current[2]
            bounds = []
            break

          case "M": // moveTo, absolute
            x = current[1]
            y = current[2]
            subpathStartX = x
            subpathStartY = y
            bounds = []
            break

          case "C": // bezierCurveTo, absolute
            bounds = getBoundsOfCurve(
              x,
              y,
              current[1],
              current[2],
              current[3],
              current[4],
              current[5],
              current[6]
            )
            x = current[5]
            y = current[6]
            break

          case "Q": // quadraticCurveTo, absolute
            bounds = getBoundsOfCurve(
              x,
              y,
              current[1],
              current[2],
              current[1],
              current[2],
              current[3],
              current[4]
            )
            x = current[3]
            y = current[4]
            break

          case "z":
          case "Z":
            x = subpathStartX
            y = subpathStartY
            break
        }
        bounds.forEach(function (point) {
          aX.push(point.x)
          aY.push(point.y)
        })
        aX.push(x)
        aY.push(y)
      }

      var minX = min(aX) || 0,
        minY = min(aY) || 0,
        maxX = max(aX) || 0,
        maxY = max(aY) || 0,
        deltaX = maxX - minX,
        deltaY = maxY - minY

      return {
        left: minX,
        top: minY,
        width: deltaX,
        height: deltaY
      }
    }
  }
)

/**
 * Creates an instance of Path from an object
 * @static
 * @memberOf Path
 * @param {Object} object
 * @param {Function} [callback] Callback to invoke when an Path instance is created
 */
Path.fromObject = function (object, callback) {
  if (typeof object.sourcePath === "string") {
    var pathUrl = object.sourcePath
    loadSVGFromURL(pathUrl, function (elements) {
      var path = elements[0]
      path.setOptions(object)
      callback && callback(path)
    })
  } else {
    Object._fromObject("Path", object, callback, "path")
  }
}

/* _FROM_SVG_START_ */
/**
 * List of attribute names to account for when parsing SVG element (used by `Path.fromElement`)
 * @static
 * @memberOf Path
 * @see http://www.w3.org/TR/SVG/paths.html#PathElement
 */
Path.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat(["d"])

/**
 * Creates an instance of Path from an SVG <path> element
 * @static
 * @memberOf Path
 * @param {SVGElement} element to parse
 * @param {Function} callback Callback to invoke when an Path instance is created
 * @param {Object} [options] Options object
 * @param {Function} [callback] Options callback invoked after parsing is finished
 */
Path.fromElement = function (element, callback, options) {
  var parsedAttributes = parseAttributes(element, Path.ATTRIBUTE_NAMES)
  parsedAttributes.fromSVG = true
  callback(new Path(parsedAttributes.d, extend(parsedAttributes, options)))
}
/* _FROM_SVG_END_ */
getGlobalThis().fabric.Path = Path
export default Path
