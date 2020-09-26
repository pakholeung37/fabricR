import { createClass } from "../util"
import Object from "./object.class"

var piBy2 = Math.PI * 2

/**
 * Ellipse class
 * @class Ellipse
 * @extends fabric.Object
 * @return {Ellipse} thisArg
 * @see {@link Ellipse#initialize} for constructor definition
 */
const Ellipse = createClass(
  Object,
  /** @lends Ellipse.prototype */ {
    /**
     * Type of an object
     * @type String
     * @default
     */
    type: "ellipse",

    /**
     * Horizontal radius
     * @type Number
     * @default
     */
    rx: 0,

    /**
     * Vertical radius
     * @type Number
     * @default
     */
    ry: 0,

    cacheProperties: Object.prototype.cacheProperties.concat("rx", "ry"),

    /**
     * Constructor
     * @param {Object} [options] Options object
     * @return {Ellipse} thisArg
     */
    initialize: function (options) {
      this.callSuper("initialize", options)
      this.set("rx", (options && options.rx) || 0)
      this.set("ry", (options && options.ry) || 0)
    },

    /**
     * @private
     * @param {String} key
     * @param {*} value
     * @return {Ellipse} thisArg
     */
    _set: function (key, value) {
      this.callSuper("_set", key, value)
      switch (key) {
        case "rx":
          this.rx = value
          this.set("width", value * 2)
          break

        case "ry":
          this.ry = value
          this.set("height", value * 2)
          break
      }
      return this
    },

    /**
     * Returns horizontal radius of an object (according to how an object is scaled)
     * @return {Number}
     */
    getRx: function () {
      return this.get("rx") * this.get("scaleX")
    },

    /**
     * Returns Vertical radius of an object (according to how an object is scaled)
     * @return {Number}
     */
    getRy: function () {
      return this.get("ry") * this.get("scaleY")
    },

    /**
     * Returns object representation of an instance
     * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
     * @return {Object} object representation of an instance
     */
    toObject: function (propertiesToInclude) {
      return this.callSuper(
        "toObject",
        ["rx", "ry"].concat(propertiesToInclude)
      )
    },

    /* _TO_SVG_START_ */
    /**
     * Returns svg representation of an instance
     * @return {Array} an array of strings with the specific svg representation
     * of the instance
     */
    _toSVG: function () {
      return [
        "<ellipse ",
        "COMMON_PARTS",
        'cx="0" cy="0" ',
        'rx="',
        this.rx,
        '" ry="',
        this.ry,
        '" />\n'
      ]
    },
    /* _TO_SVG_END_ */

    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx context to render on
     */
    _render: function (ctx) {
      ctx.beginPath()
      ctx.save()
      ctx.transform(1, 0, 0, this.ry / this.rx, 0, 0)
      ctx.arc(0, 0, this.rx, 0, piBy2, false)
      ctx.restore()
      this._renderPaintInOrder(ctx)
    }
  }
)

/* _FROM_SVG_START_ */
/**
 * List of attribute names to account for when parsing SVG element (used by {@link Ellipse.fromElement})
 * @static
 * @memberOf Ellipse
 * @see http://www.w3.org/TR/SVG/shapes.html#EllipseElement
 */
Ellipse.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat("cx cy rx ry".split(" "))

/**
 * Returns {@link Ellipse} instance from an SVG element
 * @static
 * @memberOf Ellipse
 * @param {SVGElement} element Element to parse
 * @param {Function} [callback] Options callback invoked after parsing is finished
 * @return {Ellipse}
 */
Ellipse.fromElement = function (element, callback) {
  var parsedAttributes = fabric.parseAttributes(
    element,
    Ellipse.ATTRIBUTE_NAMES
  )

  parsedAttributes.left = (parsedAttributes.left || 0) - parsedAttributes.rx
  parsedAttributes.top = (parsedAttributes.top || 0) - parsedAttributes.ry
  callback(new Ellipse(parsedAttributes))
}
/* _FROM_SVG_END_ */

/**
 * Returns {@link Ellipse} instance from an object representation
 * @static
 * @memberOf Ellipse
 * @param {Object} object Object to create an instance from
 * @param {function} [callback] invoked with new instance as first argument
 * @return {Ellipse}
 */
Ellipse.fromObject = function (object, callback) {
  return Object._fromObject("Ellipse", object, callback)
}

getGlobalThis().fabric.Ellipse = Ellipse
export default Ellipse
