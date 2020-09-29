/**
 * Point class
 * @class Point
 * @memberOf fabric
 * @constructor
 * @param {Number} x
 * @param {Number} y
 * @return {Point} thisArg
 */
export default function Point(x, y) {
  this.x = x
  this.y = y
}

Point.prototype = /** @lends Point.prototype */ {
  type: "point",
  constructor: Point,

  /**
   * Adds another point to this one and returns another one
   * @param {Point} that
   * @return {Point} new Point instance with added values
   */
  add: function (that) {
    return new Point(this.x + that.x, this.y + that.y)
  },

  /**
   * Adds another point to this one
   * @param {Point} that
   * @return {Point} thisArg
   * @chainable
   */
  addEquals: function (that) {
    this.x += that.x
    this.y += that.y
    return this
  },

  /**
   * Adds value to this point and returns a new one
   * @param {Number} scalar
   * @return {Point} new Point with added value
   */
  scalarAdd: function (scalar) {
    return new Point(this.x + scalar, this.y + scalar)
  },

  /**
   * Adds value to this point
   * @param {Number} scalar
   * @return {Point} thisArg
   * @chainable
   */
  scalarAddEquals: function (scalar) {
    this.x += scalar
    this.y += scalar
    return this
  },

  /**
   * Subtracts another point from this point and returns a new one
   * @param {Point} that
   * @return {Point} new Point object with subtracted values
   */
  subtract: function (that) {
    return new Point(this.x - that.x, this.y - that.y)
  },

  /**
   * Subtracts another point from this point
   * @param {Point} that
   * @return {Point} thisArg
   * @chainable
   */
  subtractEquals: function (that) {
    this.x -= that.x
    this.y -= that.y
    return this
  },

  /**
   * Subtracts value from this point and returns a new one
   * @param {Number} scalar
   * @return {Point}
   */
  scalarSubtract: function (scalar) {
    return new Point(this.x - scalar, this.y - scalar)
  },

  /**
   * Subtracts value from this point
   * @param {Number} scalar
   * @return {Point} thisArg
   * @chainable
   */
  scalarSubtractEquals: function (scalar) {
    this.x -= scalar
    this.y -= scalar
    return this
  },

  /**
   * Multiplies this point by a value and returns a new one
   * TODO: rename in scalarMultiply in 2.0
   * @param {Number} scalar
   * @return {Point}
   */
  multiply: function (scalar) {
    return new Point(this.x * scalar, this.y * scalar)
  },

  /**
   * Multiplies this point by a value
   * TODO: rename in scalarMultiplyEquals in 2.0
   * @param {Number} scalar
   * @return {Point} thisArg
   * @chainable
   */
  multiplyEquals: function (scalar) {
    this.x *= scalar
    this.y *= scalar
    return this
  },

  /**
   * Divides this point by a value and returns a new one
   * TODO: rename in scalarDivide in 2.0
   * @param {Number} scalar
   * @return {Point}
   */
  divide: function (scalar) {
    return new Point(this.x / scalar, this.y / scalar)
  },

  /**
   * Divides this point by a value
   * TODO: rename in scalarDivideEquals in 2.0
   * @param {Number} scalar
   * @return {Point} thisArg
   * @chainable
   */
  divideEquals: function (scalar) {
    this.x /= scalar
    this.y /= scalar
    return this
  },

  /**
   * Returns true if this point is equal to another one
   * @param {Point} that
   * @return {Boolean}
   */
  eq: function (that) {
    return this.x === that.x && this.y === that.y
  },

  /**
   * Returns true if this point is less than another one
   * @param {Point} that
   * @return {Boolean}
   */
  lt: function (that) {
    return this.x < that.x && this.y < that.y
  },

  /**
   * Returns true if this point is less than or equal to another one
   * @param {Point} that
   * @return {Boolean}
   */
  lte: function (that) {
    return this.x <= that.x && this.y <= that.y
  },

  /**

     * Returns true if this point is greater another one
     * @param {Point} that
     * @return {Boolean}
     */
  gt: function (that) {
    return this.x > that.x && this.y > that.y
  },

  /**
   * Returns true if this point is greater than or equal to another one
   * @param {Point} that
   * @return {Boolean}
   */
  gte: function (that) {
    return this.x >= that.x && this.y >= that.y
  },

  /**
   * Returns new point which is the result of linear interpolation with this one and another one
   * @param {Point} that
   * @param {Number} t , position of interpolation, between 0 and 1 default 0.5
   * @return {Point}
   */
  lerp: function (that, t) {
    if (typeof t === "undefined") {
      t = 0.5
    }
    t = Math.max(Math.min(1, t), 0)
    return new Point(
      this.x + (that.x - this.x) * t,
      this.y + (that.y - this.y) * t
    )
  },

  /**
   * Returns distance from this point and another one
   * @param {Point} that
   * @return {Number}
   */
  distanceFrom: function (that) {
    var dx = this.x - that.x,
      dy = this.y - that.y
    return Math.sqrt(dx * dx + dy * dy)
  },

  /**
   * Returns the point between this point and another one
   * @param {Point} that
   * @return {Point}
   */
  midPointFrom: function (that) {
    return this.lerp(that)
  },

  /**
   * Returns a new point which is the min of this and another one
   * @param {Point} that
   * @return {Point}
   */
  min: function (that) {
    return new Point(Math.min(this.x, that.x), Math.min(this.y, that.y))
  },

  /**
   * Returns a new point which is the max of this and another one
   * @param {Point} that
   * @return {Point}
   */
  max: function (that) {
    return new Point(Math.max(this.x, that.x), Math.max(this.y, that.y))
  },

  /**
   * Returns string representation of this point
   * @return {String}
   */
  toString: function () {
    return this.x + "," + this.y
  },

  /**
   * Sets x/y of this point
   * @param {Number} x
   * @param {Number} y
   * @chainable
   */
  setXY: function (x, y) {
    this.x = x
    this.y = y
    return this
  },

  /**
   * Sets x of this point
   * @param {Number} x
   * @chainable
   */
  setX: function (x) {
    this.x = x
    return this
  },

  /**
   * Sets y of this point
   * @param {Number} y
   * @chainable
   */
  setY: function (y) {
    this.y = y
    return this
  },

  /**
   * Sets x/y of this point from another point
   * @param {Point} that
   * @chainable
   */
  setFromPoint: function (that) {
    this.x = that.x
    this.y = that.y
    return this
  },

  /**
   * Swaps x/y of this point and another point
   * @param {Point} that
   */
  swap: function (that) {
    var x = this.x,
      y = this.y
    this.x = that.x
    this.y = that.y
    that.x = x
    that.y = y
  },

  /**
   * return a cloned instance of the point
   * @return {Point}
   */
  clone: function () {
    return new Point(this.x, this.y)
  }
}

getGlobalThis().fabric.Point = Point
