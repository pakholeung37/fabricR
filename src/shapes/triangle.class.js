import Object from "./object.class"
import { drawDashedLine, createClass } from "../util"

/**
 * Triangle class
 * @class fabric.Triangle
 * @extends fabric.Object
 * @return {fabric.Triangle} thisArg
 * @see {@link fabric.Triangle#initialize} for constructor definition
 */
const Triangle = createClass(
  Object,
  /** @lends Triangle.prototype */ {
    /**
     * Type of an object
     * @type String
     * @default
     */
    type: "triangle",

    /**
     * Width is set to 100 to compensate the old initialize code that was setting it to 100
     * @type Number
     * @default
     */
    width: 100,

    /**
     * Height is set to 100 to compensate the old initialize code that was setting it to 100
     * @type Number
     * @default
     */
    height: 100,

    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _render: function (ctx) {
      var widthBy2 = this.width / 2,
        heightBy2 = this.height / 2

      ctx.beginPath()
      ctx.moveTo(-widthBy2, heightBy2)
      ctx.lineTo(0, -heightBy2)
      ctx.lineTo(widthBy2, heightBy2)
      ctx.closePath()

      this._renderPaintInOrder(ctx)
    },

    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _renderDashedStroke: function (ctx) {
      var widthBy2 = this.width / 2,
        heightBy2 = this.height / 2

      ctx.beginPath()
      drawDashedLine(
        ctx,
        -widthBy2,
        heightBy2,
        0,
        -heightBy2,
        this.strokeDashArray
      )
      drawDashedLine(
        ctx,
        0,
        -heightBy2,
        widthBy2,
        heightBy2,
        this.strokeDashArray
      )
      drawDashedLine(
        ctx,
        widthBy2,
        heightBy2,
        -widthBy2,
        heightBy2,
        this.strokeDashArray
      )
      ctx.closePath()
    },

    /* _TO_SVG_START_ */
    /**
     * Returns svg representation of an instance
     * @return {Array} an array of strings with the specific svg representation
     * of the instance
     */
    _toSVG: function () {
      var widthBy2 = this.width / 2,
        heightBy2 = this.height / 2,
        points = [
          -widthBy2 + " " + heightBy2,
          "0 " + -heightBy2,
          widthBy2 + " " + heightBy2
        ].join(",")
      return ["<polygon ", "COMMON_PARTS", 'points="', points, '" />']
    }
    /* _TO_SVG_END_ */
  }
)

/**
 * Returns {@link Triangle} instance from an object representation
 * @static
 * @memberOf Triangle
 * @param {Object} object Object to create an instance from
 * @param {function} [callback] invoked with new instance as first argument
 */
Triangle.fromObject = function (object, callback) {
  return Object._fromObject("Triangle", object, callback)
}

getGlobalThis().fabric.Triangle = Triangle
export default Triangle
