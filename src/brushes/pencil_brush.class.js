import { createClass } from "../util"
import BaseBrush from "./base_brush.class"
import Point from "../point.class"
import Shadow from "../shadow.class"
import Path from "../shapes/path.class"
/**
 * PencilBrush class
 * @class fabric.PencilBrush
 * @extends fabric.BaseBrush
 */
const PencilBrush = createClass(
  BaseBrush,
  /** @lends fabric.PencilBrush.prototype */ {
    /**
     * Discard points that are less than `decimate` pixel distant from each other
     * @type Number
     * @default 0.4
     */
    decimate: 0.4,

    /**
     * Constructor
     * @param {fabric.Canvas} canvas
     * @return {fabric.PencilBrush} Instance of a pencil brush
     */
    initialize: function (canvas) {
      this.canvas = canvas
      this._points = []
    },

    /**
     * Invoked inside on mouse down and mouse move
     * @param {Object} pointer
     */
    _drawSegment: function (ctx, p1, p2) {
      var midPoint = p1.midPointFrom(p2)
      ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y)
      return midPoint
    },

    /**
     * Inovoked on mouse down
     * @param {Object} pointer
     */
    onMouseDown: function (pointer, options) {
      if (!this.canvas._isMainEvent(options.e)) {
        return
      }
      this._prepareForDrawing(pointer)
      // capture coordinates immediately
      // this allows to draw dots (when movement never occurs)
      this._captureDrawingPath(pointer)
      this._render()
    },

    /**
     * Inovoked on mouse move
     * @param {Object} pointer
     */
    onMouseMove: function (pointer, options) {
      if (!this.canvas._isMainEvent(options.e)) {
        return
      }
      if (this._captureDrawingPath(pointer) && this._points.length > 1) {
        if (this.needsFullRender()) {
          // redraw curve
          // clear top canvas
          this.canvas.clearContext(this.canvas.contextTop)
          this._render()
        } else {
          var points = this._points,
            length = points.length,
            ctx = this.canvas.contextTop
          // draw the curve update
          this._saveAndTransform(ctx)
          if (this.oldEnd) {
            ctx.beginPath()
            ctx.moveTo(this.oldEnd.x, this.oldEnd.y)
          }
          this.oldEnd = this._drawSegment(
            ctx,
            points[length - 2],
            points[length - 1],
            true
          )
          ctx.stroke()
          ctx.restore()
        }
      }
    },

    /**
     * Invoked on mouse up
     */
    onMouseUp: function (options) {
      if (!this.canvas._isMainEvent(options.e)) {
        return true
      }
      this.oldEnd = undefined
      this._finalizeAndAddPath()
      return false
    },

    /**
     * @private
     * @param {Object} pointer Actual mouse position related to the canvas.
     */
    _prepareForDrawing: function (pointer) {
      var p = new Point(pointer.x, pointer.y)

      this._reset()
      this._addPoint(p)
      this.canvas.contextTop.moveTo(p.x, p.y)
    },

    /**
     * @private
     * @param {Point} point Point to be added to points array
     */
    _addPoint: function (point) {
      if (
        this._points.length > 1 &&
        point.eq(this._points[this._points.length - 1])
      ) {
        return false
      }
      this._points.push(point)
      return true
    },

    /**
     * Clear points array and set contextTop canvas style.
     * @private
     */
    _reset: function () {
      this._points = []
      this._setBrushStyles()
      this._setShadow()
    },

    /**
     * @private
     * @param {Object} pointer Actual mouse position related to the canvas.
     */
    _captureDrawingPath: function (pointer) {
      var pointerPoint = new Point(pointer.x, pointer.y)
      return this._addPoint(pointerPoint)
    },

    /**
     * Draw a smooth path on the topCanvas using quadraticCurveTo
     * @private
     */
    _render: function () {
      var ctx = this.canvas.contextTop,
        i,
        len,
        p1 = this._points[0],
        p2 = this._points[1]

      this._saveAndTransform(ctx)
      ctx.beginPath()
      //if we only have 2 points in the path and they are the same
      //it means that the user only clicked the canvas without moving the mouse
      //then we should be drawing a dot. A path isn't drawn between two identical dots
      //that's why we set them apart a bit
      if (this._points.length === 2 && p1.x === p2.x && p1.y === p2.y) {
        var width = this.width / 1000
        p1 = new Point(p1.x, p1.y)
        p2 = new Point(p2.x, p2.y)
        p1.x -= width
        p2.x += width
      }
      ctx.moveTo(p1.x, p1.y)

      for (i = 1, len = this._points.length; i < len; i++) {
        // we pick the point between pi + 1 & pi + 2 as the
        // end point and p1 as our control point.
        this._drawSegment(ctx, p1, p2)
        p1 = this._points[i]
        p2 = this._points[i + 1]
      }
      // Draw last line as a straight line while
      // we wait for the next point to be able to calculate
      // the bezier control point
      ctx.lineTo(p1.x, p1.y)
      ctx.stroke()
      ctx.restore()
    },

    /**
     * Converts points to SVG path
     * @param {Array} points Array of points
     * @return {String} SVG path
     */
    convertPointsToSVGPath: function (points) {
      var path = [],
        i,
        width = this.width / 1000,
        p1 = new Point(points[0].x, points[0].y),
        p2 = new Point(points[1].x, points[1].y),
        len = points.length,
        multSignX = 1,
        multSignY = 0,
        manyPoints = len > 2

      if (manyPoints) {
        multSignX = points[2].x < p2.x ? -1 : points[2].x === p2.x ? 0 : 1
        multSignY = points[2].y < p2.y ? -1 : points[2].y === p2.y ? 0 : 1
      }
      path.push(
        "M ",
        p1.x - multSignX * width,
        " ",
        p1.y - multSignY * width,
        " "
      )
      for (i = 1; i < len; i++) {
        if (!p1.eq(p2)) {
          var midPoint = p1.midPointFrom(p2)
          // p1 is our bezier control point
          // midpoint is our endpoint
          // start point is p(i-1) value.
          path.push(
            "Q ",
            p1.x,
            " ",
            p1.y,
            " ",
            midPoint.x,
            " ",
            midPoint.y,
            " "
          )
        }
        p1 = points[i]
        if (i + 1 < points.length) {
          p2 = points[i + 1]
        }
      }
      if (manyPoints) {
        multSignX =
          p1.x > points[i - 2].x ? 1 : p1.x === points[i - 2].x ? 0 : -1
        multSignY =
          p1.y > points[i - 2].y ? 1 : p1.y === points[i - 2].y ? 0 : -1
      }
      path.push("L ", p1.x + multSignX * width, " ", p1.y + multSignY * width)
      return path
    },

    /**
     * Creates Path object to add on canvas
     * @param {String} pathData Path data
     * @return {Path} Path to add on canvas
     */
    createPath: function (pathData) {
      var path = new Path(pathData, {
        fill: null,
        stroke: this.color,
        strokeWidth: this.width,
        strokeLineCap: this.strokeLineCap,
        strokeMiterLimit: this.strokeMiterLimit,
        strokeLineJoin: this.strokeLineJoin,
        strokeDashArray: this.strokeDashArray
      })
      if (this.shadow) {
        this.shadow.affectStroke = true
        path.shadow = new Shadow(this.shadow)
      }

      return path
    },

    /**
     * Decimate poins array with the decimate value
     */
    decimatePoints: function (points, distance) {
      if (points.length <= 2) {
        return points
      }
      var zoom = this.canvas.getZoom(),
        adjustedDistance = Math.pow(distance / zoom, 2),
        i,
        l = points.length - 1,
        lastPoint = points[0],
        newPoints = [lastPoint],
        cDistance
      for (i = 1; i < l; i++) {
        cDistance =
          Math.pow(lastPoint.x - points[i].x, 2) +
          Math.pow(lastPoint.y - points[i].y, 2)
        if (cDistance >= adjustedDistance) {
          lastPoint = points[i]
          newPoints.push(lastPoint)
        }
      }
      if (newPoints.length === 1) {
        newPoints.push(new Point(newPoints[0].x, newPoints[0].y))
      }
      return newPoints
    },

    /**
     * On mouseup after drawing the path on contextTop canvas
     * we use the points captured to create an new fabric path object
     * and add it to the fabric canvas.
     */
    _finalizeAndAddPath: function () {
      var ctx = this.canvas.contextTop
      ctx.closePath()
      if (this.decimate) {
        this._points = this.decimatePoints(this._points, this.decimate)
      }
      var pathData = this.convertPointsToSVGPath(this._points).join("")
      if (pathData === "M 0 0 Q 0 0 0 0 L 0 0") {
        // do not create 0 width/height paths, as they are
        // rendered inconsistently across browsers
        // Firefox 4, for example, renders a dot,
        // whereas Chrome 10 renders nothing
        this.canvas.requestRenderAll()
        return
      }

      var path = this.createPath(pathData)
      this.canvas.clearContext(this.canvas.contextTop)
      this.canvas.fire("before:path:created", { path: path })
      this.canvas.add(path)
      this.canvas.requestRenderAll()
      path.setCoords()
      this._resetShadow()

      // fire event 'path' created
      this.canvas.fire("path:created", { path: path })
    }
  }
)

export default PencilBrush
