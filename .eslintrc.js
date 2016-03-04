module.exports = {
  "rules": {
    "indent": [
      1,
      2 // number of space chars, or "tab"
    ],
    "quotes": [
      2,
      "double"
    ],
    "linebreak-style": [
      2,
      "unix"
    ],
    "semi": [
      2,
      "always"
    ],
    "no-console": 0,
    "no-unused-vars": 1
  },
  "env": {
    "es6": true,
    "browser": true
  },
  "ecmaFeatures": {
    modules: true
  },
  "extends": "eslint:recommended"
};
