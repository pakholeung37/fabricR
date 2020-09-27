import Image from "../shapes/image.class"
import BaseFilter from "./base_filter.class"
import { createClass, extend } from "../util"
/**
 * A container class that knows how to apply a sequence of filters to an input image.
 */
const Composed = createClass(
  BaseFilter,
  /** @lends Composed.prototype */ {
    type: "Composed",

    /**
     * A non sparse array of filters to apply
     */
    subFilters: [],

    /**
     * Constructor
     * @param {Object} [options] Options object
     */
    initialize: function (options) {
      this.callSuper("initialize", options)
      // create a new array instead mutating the prototype with push
      this.subFilters = this.subFilters.slice(0)
    },

    /**
     * Apply this container's filters to the input image provided.
     *
     * @param {Object} options
     * @param {Number} options.passes The number of filters remaining to be applied.
     */
    applyTo: function (options) {
      options.passes += this.subFilters.length - 1
      this.subFilters.forEach(function (filter) {
        filter.applyTo(options)
      })
    },

    /**
     * Serialize this filter into JSON.
     *
     * @returns {Object} A JSON representation of this filter.
     */
    toObject: function () {
      return extend(this.callSuper("toObject"), {
        subFilters: this.subFilters.map(function (filter) {
          return filter.toObject()
        })
      })
    },

    isNeutralState: function () {
      return !this.subFilters.some(function (filter) {
        return !filter.isNeutralState()
      })
    }
  }
)

/**
 * Deserialize a JSON definition of a ComposedFilter into a concrete instance.
 */
Composed.fromObject = function (object, callback) {
  var filters = object.subFilters || [],
    subFilters = filters.map(function (filter) {
      return new Image.filters[filter.type](filter)
    }),
    instance = new Composed({ subFilters: subFilters })
  callback && callback(instance)
  return instance
}

export default Composed
export function setup() {
  Image.filters.Composed = Composed
}

// TODO remove
setup()
