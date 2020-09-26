import Object from "./object.class"
import Polyline from "./polyline.class"
import { createClass } from "../util"

/**
 * Polygon class
 * @class Polygon
 * @extends Polyline
 * @see {@link Polygon#initialize} for constructor definition
 */
const Polygon = createClass(
  Polyline,
  /** @lends Polygon.prototype */ {
    /**
     * Type of an object
     * @type String
     * @default
     */
    type: "polygon",

    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _render: function (ctx) {
      if (!this.commonRender(ctx)) {
        return
      }
      ctx.closePath()
      this._renderPaintInOrder(ctx)
    },

    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _renderDashedStroke: function (ctx) {
      this.callSuper("_renderDashedStroke", ctx)
      ctx.closePath()
    }
  }
)

/* _FROM_SVG_START_ */
/**
 * List of attribute names to account for when parsing SVG element (used by `Polygon.fromElement`)
 * @static
 * @memberOf Polygon
 * @see: http://www.w3.org/TR/SVG/shapes.html#PolygonElement
 */
Polygon.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat()

/**
 * Returns {@link Polygon} instance from an SVG element
 * @static
 * @memberOf Polygon
 * @param {SVGElement} element Element to parse
 * @param {Function} callback callback function invoked after parsing
 * @param {Object} [options] Options object
 */
Polygon.fromElement = Polyline.fromElementGenerator("Polygon")
/* _FROM_SVG_END_ */

/**
 * Returns Polygon instance from an object representation
 * @static
 * @memberOf Polygon
 * @param {Object} object Object to create an instance from
 * @param {Function} [callback] Callback to invoke when an Path instance is created
 */
Polygon.fromObject = function (object, callback) {
  return Object._fromObject("Polygon", object, callback, "points")
}

getGlobalThis().fabric.Polygon = Polygon
export default Polygon
