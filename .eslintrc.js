module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [ "standard" ],
  "overrides": [
    {
      "files": [ "spec/**" ],
      "plugins": ["jest"],
      "extends": [
        "plugin:jest/recommended",
        "plugin:jest/style"
      ]
    },
    {
      "files": [ "spec/g/**" ],
      "globals": {
        "client": "readonly",
        "context": "readonly",
        "load": "readonly",
        "unload": "readonly"
      }
    }
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": "es2015"
  },
  "plugins": [
    "@typescript-eslint",
  ],
  "globals": {
    "g": "readonly"
  },
  "ignorePatterns": [
    "**/*.js"
  ],
  "rules": {}
}
