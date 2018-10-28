const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const { uglify } = require("rollup-plugin-uglify");
const babel = require("rollup-plugin-babel");

export default [
  {
    external: ["mithril"],
    input: "lib/index.js",
    output: {
      name: "mState",
      file: "dist/mState.umd.js",
      format: "umd",
      globals: {
        mithril: "m"
      }
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
