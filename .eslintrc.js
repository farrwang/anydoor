module.exports = {
  "extends": "eslint:recommended",
  "rules": {
      // enable additional rules
      "indent": ["error", 4],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "double"],
      "semi": ["error", "always"],

      // override default options for rules from base configurations
      "comma-dangle": ["error", "always"],
      "no-cond-assign": ["error", "always"],

      // disable rules from base configurations
      "no-console": ["error",{
        "allow":["warn","error","info","log"]
      }],
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "script"
},
"env":{
  "browser":false,
  "node":true,
  "es6":true,
  "mocha":true

},
"globals": {
  "window":false
}

}
