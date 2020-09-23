const pkg = require("./package.json")
const babel = require("rollup-plugin-babel")
const resolve = require("rollup-plugin-node-resolve")
const { terser } = require("rollup-plugin-terser")
const commonjs = require("rollup-plugin-commonjs")

module.exports = [
  // cjs
  // {
  //   input: "./src/index.js",
  //   plugins: [
  //     resolve(),
  //     commonjs({ include: "node_modules/**" }),
  //     babel({
  //       exclude: "node_modules/**" // 只编译我们的源代码
  //     })
  //   ],
  //   output: [
  //     {
  //       format: "cjs",
  //       file: pkg.main,
  //       sourcemap: true
  //     }
  //   ]
  // },
  // // esm
  // {
  //   input: "./src/index.js",
  //   plugins: [
  //     resolve(),
  //     commonjs({ include: "node_modules/**" }),
  //     babel({
  //       exclude: "node_modules/**" // 只编译我们的源代码
  //     })
  //   ],
  //   output: [
  //     {
  //       format: "es",
  //       file: pkg.module,
  //       sourcemap: true
  //     }
  //   ]
  // },
  // {
  //   input: "./src/index.js",
  //   plugins: [
  //     resolve({ borwser: true }),
  //     commonjs({ include: "node_modules/**" }),
  //     babel({
  //       exclude: "node_modules/**" // 只编译我们的源代码
  //     }),
  //     terser({})
  //   ],
  //   output: [
  //     {
  //       format: "umd",
  //       file: "dist/fabric.min.js"
  //     }
  //   ]
  // },
  // just rollup
  {
    input: "./src/index.js",
    plugins: [],
    output: [
      {
        format: "cjs",
        file: "dist/fabric.rollup.js",
        strict: false
      }
    ]
  }
]
