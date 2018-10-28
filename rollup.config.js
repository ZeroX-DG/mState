const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const { uglify } = require("rollup-plugin-uglify");
const babel = require("rollup-plugin-babel");

export default [
  {
    input: "lib/index.js",
    output: {
      name: "mState",
      file: "dist/mState.umd.js",
      format: "umd"
    },
    plugins: [
      babel({
        exclude: "node_modules/**"
      }),
      resolve(),
      commonjs(),
      uglify()
    ]
  }
];
