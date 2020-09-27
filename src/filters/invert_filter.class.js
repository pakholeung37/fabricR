import Image from "../shapes/image.class"
import BaseFilter from "./base_filter.class"
import { createClass } from "../util"
/**
 * Invert filter class
 * @class Invert
 * @memberOf fabric.Image.filters
 * @extends BaseFilter
 * @see {@link http://fabricjs.com/image-filters|ImageFilters demo}
 * @example
 * var filter = new Invert();
 * object.filters.push(filter);
 * object.applyFilters(canvas.renderAll.bind(canvas));
 */
const Invert = createClass(
  BaseFilter,
  /** @lends Invert.prototype */ {
    /**
     * Filter type
     * @param {String} type
     * @default
     */
    type: "Invert",

    fragmentSource:
      "precision highp float;\n" +
      "uniform sampler2D uTexture;\n" +
      "uniform int uInvert;\n" +
      "varying vec2 vTexCoord;\n" +
      "void main() {\n" +
      "vec4 color = texture2D(uTexture, vTexCoord);\n" +
      "if (uInvert == 1) {\n" +
      "gl_FragColor = vec4(1.0 - color.r,1.0 -color.g,1.0 -color.b,color.a);\n" +
      "} else {\n" +
      "gl_FragColor = color;\n" +
      "}\n" +
      "}",

    /**
     * Filter invert. if false, does nothing
     * @param {Boolean} invert
     * @default
     */
    invert: true,

    mainParameter: "invert",

    /**
     * Apply the Invert operation to a Uint8Array representing the pixels of an image.
     *
     * @param {Object} options
     * @param {ImageData} options.imageData The Uint8Array to be filtered.
     */
    applyTo2d: function (options) {
      var imageData = options.imageData,
        data = imageData.data,
        i,
        len = data.length
      for (i = 0; i < len; i += 4) {
        data[i] = 255 - data[i]
        data[i + 1] = 255 - data[i + 1]
        data[i + 2] = 255 - data[i + 2]
      }
    },

    /**
     * Invert filter isNeutralState implementation
     * Used only in image applyFilters to discard filters that will not have an effect
     * on the image
     * @param {Object} options
     **/
    isNeutralState: function () {
      return !this.invert
    },

    /**
     * Return WebGL uniform locations for this filter's shader.
     *
     * @param {WebGLRenderingContext} gl The GL canvas context used to compile this filter's shader.
     * @param {WebGLShaderProgram} program This filter's compiled shader program.
     */
    getUniformLocations: function (gl, program) {
      return {
        uInvert: gl.getUniformLocation(program, "uInvert")
      }
    },

    /**
     * Send data from this filter to its shader program's uniforms.
     *
     * @param {WebGLRenderingContext} gl The GL canvas context used to compile this filter's shader.
     * @param {Object} uniformLocations A map of string uniform names to WebGLUniformLocation objects
     */
    sendUniformData: function (gl, uniformLocations) {
      gl.uniform1i(uniformLocations.uInvert, this.invert)
    }
  }
)

/**
 * Returns filter instance from an object representation
 * @static
 * @param {Object} object Object to create an instance from
 * @param {function} [callback] to be invoked after filter creation
 * @return {Invert} Instance of Invert
 */
Invert.fromObject = BaseFilter.fromObject

export default Invert
export function setup() {
  Image.filters.Invert = Invert
}

// TODO remove
setup()
