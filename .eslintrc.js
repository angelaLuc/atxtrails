module.exports = {
  "settings": {
    "react": {
      "version": "16.10"
    },
  },
  "parser": "@babel/eslint-parser",
  // "parserOptions": {
  //   "ecmaVersion": 6,
  //   "sourceType": "module",
  //   "ecmaFeatures": {
  //     "jsx": true
  //   }
  // },
  "env": {
    "jest/globals": true
  },
  "plugins": ["jest"],
  "rules": {
    "semi": 0,
    "handle-callback-err": "warn"
  }
};
