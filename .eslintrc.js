module.exports = {
  "settings": {
    "react": {
      "version": "16.10"
    },
  },
  "parser": "babel-eslint",
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
    "indent": [2, 4],
    "react/jsx-indent": ["error", 4],
    "react/jsx-indent-props": ["error", 4],
    "handle-callback-err": "warn"
  }
};