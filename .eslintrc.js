const DOMGlobals = ["window", "document"]

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  },
  rules: {
    "no-redeclare": "off",
    "no-prototype-builtins": "off",
    "no-restricted-globals": ["error", ...DOMGlobals]
  },
  globals: {
    // fabric: "readonly",
    // eventjs: "readonly"
  }
}
