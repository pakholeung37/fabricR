import Object from "./object.class"
import { cos, sin, createClass } from "../util"
import { parseAttributes } from "../parser"
var pi = Math.PI

/**
 * Circle class
 * @class fabric.Circle
 * @extends fabric.Object
 * @see {@link fabric.Circle#initialize} for constructor definition
 */
const Circle = createClass(
  Object,
  /** @lends Circle.prototype */ {
    /**
     * Type of an object
     * @type String
     * @default
     */
    type: "circle",

    /**
     * Radius of this circle
     * @type Number
     * @default
     */
    radius: 0,

    /**
     * Start angle of the circle, moving clockwise
     * deprectated type, this should be in degree, this was an oversight.
     * probably will change to degrees in next major version
     * @type Number
     * @default 0
     */
    startAngle: 0,

    /**
     * End angle of the circle
     * deprectated type, this should be in degree, this was an oversight.
     * probably will change to degrees in next major version
     * @type Number
     * @default 2Pi
     */
    endAngle: pi * 2,

    cacheProperties: Object.prototype.cacheProperties.concat(
      "radius",
      "startAngle",
      "endAngle"
    ),

    /**
     * @private
     * @param {String} key
     * @param {*} value
     * @return {Circle} thisArg
     */
    _set: function (key, value) {
      this.callSuper("_set", key, value)

      if (key === "radius") {
        this.setRadius(value)
      }

      return this
    },

    /**
     * Returns object representation of an instance
     * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
     * @return {Object} object representation of an instance
     */
    toObject: function (propertiesToInclude) {
      return this.callSuper(
        "toObject",
        ["radius", "startAngle", "endAngle"].concat(propertiesToInclude)
      )
    },

    /* _TO_SVG_START_ */

    /**
     * Returns svg representation of an instance
     * @return {Array} an array of strings with the specific svg representation
     * of the instance
     */
    _toSVG: function () {
      var svgString,
        x = 0,
        y = 0,
        angle = (this.endAngle - this.startAngle) % (2 * pi)

      if (angle === 0) {
        svgString = [
          "<circle ",
          "COMMON_PARTS",
          'cx="' + x + '" cy="' + y + '" ',
          'r="',
          this.radius,
          '" />\n'
        ]
      } else {
        var startX = cos(this.startAngle) * this.radius,
          startY = sin(this.startAngle) * this.radius,
          endX = cos(this.endAngle) * this.radius,
          endY = sin(this.endAngle) * this.radius,
          largeFlag = angle > pi ? "1" : "0"
        svgString = [
          '<path d="M ' + startX + " " + startY,
          " A " + this.radius + " " + this.radius,
          " 0 ",
          +largeFlag + " 1",
          " " + endX + " " + endY,
          '" ',
          "COMMON_PARTS",
          " />\n"
        ]
      }
      return svgString
    },
    /* _TO_SVG_END_ */

    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx context to render on
     */
    _render: function (ctx) {
      ctx.beginPath()
      ctx.arc(0, 0, this.radius, this.startAngle, this.endAngle, false)
      this._renderPaintInOrder(ctx)
    },

    /**
     * Returns horizontal radius of an object (according to how an object is scaled)
     * @return {Number}
     */
    getRadiusX: function () {
      return this.get("radius") * this.get("scaleX")
    },

    /**
     * Returns vertical radius of an object (according to how an object is scaled)
     * @return {Number}
     */
    getRadiusY: function () {
      return this.get("radius") * this.get("scaleY")
    },

    /**
     * Sets radius of an object (and updates width accordingly)
     * @return {Circle} thisArg
     */
    setRadius: function (value) {
      this.radius = value
      return this.set("width", value * 2).set("height", value * 2)
    }
  }
)

/* _FROM_SVG_START_ */
/**
 * List of attribute names to account for when parsing SVG element (used by {@link Circle.fromElement})
 * @static
 * @memberOf Circle
 * @see: http://www.w3.org/TR/SVG/shapes.html#CircleElement
 */
Circle.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat("cx cy r".split(" "))

/**
 * Returns {@link Circle} instance from an SVG element
 * @static
 * @memberOf Circle
 * @param {SVGElement} element Element to parse
 * @param {Function} [callback] Options callback invoked after parsing is finished
 * @param {Object} [options] Options object
 * @throws {Error} If value of `r` attribute is missing or invalid
 */
Circle.fromElement = function (element, callback) {
  var parsedAttributes = parseAttributes(element, Circle.ATTRIBUTE_NAMES)

  if (!isValidRadius(parsedAttributes)) {
    throw new Error(
      "value of `r` attribute is required and can not be negative"
    )
  }

  parsedAttributes.left = (parsedAttributes.left || 0) - parsedAttributes.radius
  parsedAttributes.top = (parsedAttributes.top || 0) - parsedAttributes.radius
  callback(new Circle(parsedAttributes))
}

/**
 * @private
 */
function isValidRadius(attributes) {
  return "radius" in attributes && attributes.radius >= 0
}
/* _FROM_SVG_END_ */

/**
 * Returns {@link Circle} instance from an object representation
 * @static
 * @memberOf Circle
 * @param {Object} object Object to create an instance from
 * @param {function} [callback] invoked with new instance as first argument
 * @return {Object} Instance of Circle
 */
Circle.fromObject = function (object, callback) {
  return Object._fromObject("Circle", object, callback)
}

export default Circle

getGlobalThis().fabric.Circle = Circle
