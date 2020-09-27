import FaObject from "./shapes/object.class"
import Color from "./color.class"
import { createClass, toFixed, rotateVector, degreesToRadians } from "./util"
/**
 * Shadow class
 * @class Shadow
 * @see {@link http://fabricjs.com/shadows|Shadow demo}
 * @see {@link Shadow#initialize} for constructor definition
 */
const Shadow = createClass(
  /** @lends Shadow.prototype */ {
    /**
     * Shadow color
     * @type String
     * @default
     */
    color: "rgb(0,0,0)",

    /**
     * Shadow blur
     * @type Number
     */
    blur: 0,

    /**
     * Shadow horizontal offset
     * @type Number
     * @default
     */
    offsetX: 0,

    /**
     * Shadow vertical offset
     * @type Number
     * @default
     */
    offsetY: 0,

    /**
     * Whether the shadow should affect stroke operations
     * @type Boolean
     * @default
     */
    affectStroke: false,

    /**
     * Indicates whether toObject should include default values
     * @type Boolean
     * @default
     */
    includeDefaultValues: true,

    /**
     * When `false`, the shadow will scale with the object.
     * When `true`, the shadow's offsetX, offsetY, and blur will not be affected by the object's scale.
     * default to false
     * @type Boolean
     * @default
     */
    nonScaling: false,

    /**
     * Constructor
     * @param {Object|String} [options] Options object with any of color, blur, offsetX, offsetY properties or string (e.g. "rgba(0,0,0,0.2) 2px 2px 10px")
     * @return {Shadow} thisArg
     */
    initialize: function (options) {
      if (typeof options === "string") {
        options = this._parseShadow(options)
      }

      for (var prop in options) {
        this[prop] = options[prop]
      }

      this.id = FaObject.__uid++
    },

    /**
     * @private
     * @param {String} shadow Shadow value to parse
     * @return {Object} Shadow object with color, offsetX, offsetY and blur
     */
    _parseShadow: function (shadow) {
      var shadowStr = shadow.trim(),
        offsetsAndBlur = Shadow.reOffsetsAndBlur.exec(shadowStr) || [],
        color = shadowStr.replace(Shadow.reOffsetsAndBlur, "") || "rgb(0,0,0)"

      return {
        color: color.trim(),
        offsetX: parseInt(offsetsAndBlur[1], 10) || 0,
        offsetY: parseInt(offsetsAndBlur[2], 10) || 0,
        blur: parseInt(offsetsAndBlur[3], 10) || 0
      }
    },

    /**
     * Returns a string representation of an instance
     * @see http://www.w3.org/TR/css-text-decor-3/#text-shadow
     * @return {String} Returns CSS3 text-shadow declaration
     */
    toString: function () {
      return [this.offsetX, this.offsetY, this.blur, this.color].join("px ")
    },

    /* _TO_SVG_START_ */
    /**
     * Returns SVG representation of a shadow
     * @param {fabric.Object} object
     * @return {String} SVG representation of a shadow
     */
    toSVG: function (object) {
      var fBoxX = 40,
        fBoxY = 40,
        NUM_FRACTION_DIGITS = FaObject.NUM_FRACTION_DIGITS,
        offset = rotateVector(
          { x: this.offsetX, y: this.offsetY },
          degreesToRadians(-object.angle)
        ),
        BLUR_BOX = 20,
        color = new Color(this.color)

      if (object.width && object.height) {
        //http://www.w3.org/TR/SVG/filters.html#FilterEffectsRegion
        // we add some extra space to filter box to contain the blur ( 20 )
        fBoxX =
          toFixed(
            (Math.abs(offset.x) + this.blur) / object.width,
            NUM_FRACTION_DIGITS
          ) *
            100 +
          BLUR_BOX
        fBoxY =
          toFixed(
            (Math.abs(offset.y) + this.blur) / object.height,
            NUM_FRACTION_DIGITS
          ) *
            100 +
          BLUR_BOX
      }
      if (object.flipX) {
        offset.x *= -1
      }
      if (object.flipY) {
        offset.y *= -1
      }

      return (
        '<filter id="SVGID_' +
        this.id +
        '" y="-' +
        fBoxY +
        '%" height="' +
        (100 + 2 * fBoxY) +
        '%" ' +
        'x="-' +
        fBoxX +
        '%" width="' +
        (100 + 2 * fBoxX) +
        '%" ' +
        ">\n" +
        '\t<feGaussianBlur in="SourceAlpha" stdDeviation="' +
        toFixed(this.blur ? this.blur / 2 : 0, NUM_FRACTION_DIGITS) +
        '"></feGaussianBlur>\n' +
        '\t<feOffset dx="' +
        toFixed(offset.x, NUM_FRACTION_DIGITS) +
        '" dy="' +
        toFixed(offset.y, NUM_FRACTION_DIGITS) +
        '" result="oBlur" ></feOffset>\n' +
        '\t<feFlood flood-color="' +
        color.toRgb() +
        '" flood-opacity="' +
        color.getAlpha() +
        '"/>\n' +
        '\t<feComposite in2="oBlur" operator="in" />\n' +
        "\t<feMerge>\n" +
        "\t\t<feMergeNode></feMergeNode>\n" +
        '\t\t<feMergeNode in="SourceGraphic"></feMergeNode>\n' +
        "\t</feMerge>\n" +
        "</filter>\n"
      )
    },
    /* _TO_SVG_END_ */

    /**
     * Returns object representation of a shadow
     * @return {Object} Object representation of a shadow instance
     */
    toObject: function () {
      if (this.includeDefaultValues) {
        return {
          color: this.color,
          blur: this.blur,
          offsetX: this.offsetX,
          offsetY: this.offsetY,
          affectStroke: this.affectStroke,
          nonScaling: this.nonScaling
        }
      }
      var obj = {},
        proto = Shadow.prototype

      ;[
        "color",
        "blur",
        "offsetX",
        "offsetY",
        "affectStroke",
        "nonScaling"
      ].forEach(function (prop) {
        if (this[prop] !== proto[prop]) {
          obj[prop] = this[prop]
        }
      }, this)

      return obj
    }
  }
)

/**
 * Regex matching shadow offsetX, offsetY and blur (ex: "2px 2px 10px rgba(0,0,0,0.2)", "rgb(0,255,0) 2px 2px")
 * @static
 * @field
 * @memberOf Shadow
 */
Shadow.reOffsetsAndBlur = /(?:\s|^)(-?\d+(?:px)?(?:\s?|$))?(-?\d+(?:px)?(?:\s?|$))?(\d+(?:px)?)?(?:\s?|$)(?:$|\s)/

export default Shadow

getGlobalThis().fabric.Shadow = Shadow
