module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2020,
    sourceType: "module"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-redeclare": "off",
    "no-prototype-builtins": "off"
  },
  globals: {
    fabric: "readonly",
    eventjs: "readonly"
  }
}
