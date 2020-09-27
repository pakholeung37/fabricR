import Image from "../shapes/image.class"
import BaseFilter from "./base_filter.class"
import { createClass } from "../util"
/**
 * Contrast filter class
 * @class Contrast
 * @memberOf fabric.Image.filters
 * @extends BaseFilter
 * @see {@link Contrast#initialize} for constructor definition
 * @see {@link http://fabricjs.com/image-filters|ImageFilters demo}
 * @example
 * var filter = new Contrast({
 *   contrast: 0.25
 * });
 * object.filters.push(filter);
 * object.applyFilters();
 */
const Contrast = createClass(
  BaseFilter,
  /** @lends Contrast.prototype */ {
    /**
     * Filter type
     * @param {String} type
     * @default
     */
    type: "Contrast",

    fragmentSource:
      "precision highp float;\n" +
      "uniform sampler2D uTexture;\n" +
      "uniform float uContrast;\n" +
      "varying vec2 vTexCoord;\n" +
      "void main() {\n" +
      "vec4 color = texture2D(uTexture, vTexCoord);\n" +
      "float contrastF = 1.015 * (uContrast + 1.0) / (1.0 * (1.015 - uContrast));\n" +
      "color.rgb = contrastF * (color.rgb - 0.5) + 0.5;\n" +
      "gl_FragColor = color;\n" +
      "}",

    /**
     * contrast value, range from -1 to 1.
     * @param {Number} contrast
     * @default 0
     */
    contrast: 0,

    mainParameter: "contrast",

    /**
     * Constructor
     * @memberOf Contrast.prototype
     * @param {Object} [options] Options object
     * @param {Number} [options.contrast=0] Value to contrast the image up (-1...1)
     */

    /**
     * Apply the Contrast operation to a Uint8Array representing the pixels of an image.
     *
     * @param {Object} options
     * @param {ImageData} options.imageData The Uint8Array to be filtered.
     */
    applyTo2d: function (options) {
      if (this.contrast === 0) {
        return
      }
      var imageData = options.imageData,
        i,
        len,
        data = imageData.data,
        len = data.length,
        contrast = Math.floor(this.contrast * 255),
        contrastF = (259 * (contrast + 255)) / (255 * (259 - contrast))

      for (i = 0; i < len; i += 4) {
        data[i] = contrastF * (data[i] - 128) + 128
        data[i + 1] = contrastF * (data[i + 1] - 128) + 128
        data[i + 2] = contrastF * (data[i + 2] - 128) + 128
      }
    },

    /**
     * Return WebGL uniform locations for this filter's shader.
     *
     * @param {WebGLRenderingContext} gl The GL canvas context used to compile this filter's shader.
     * @param {WebGLShaderProgram} program This filter's compiled shader program.
     */
    getUniformLocations: function (gl, program) {
      return {
        uContrast: gl.getUniformLocation(program, "uContrast")
      }
    },

    /**
     * Send data from this filter to its shader program's uniforms.
     *
     * @param {WebGLRenderingContext} gl The GL canvas context used to compile this filter's shader.
     * @param {Object} uniformLocations A map of string uniform names to WebGLUniformLocation objects
     */
    sendUniformData: function (gl, uniformLocations) {
      gl.uniform1f(uniformLocations.uContrast, this.contrast)
    }
  }
)

/**
 * Returns filter instance from an object representation
 * @static
 * @param {Object} object Object to create an instance from
 * @param {function} [callback] to be invoked after filter creation
 * @return {Contrast} Instance of Contrast
 */
Contrast.fromObject = BaseFilter.fromObject

export default Contrast
export function setup() {
  Image.filters.Contrast = Contrast
}

// TODO remove
setup()
