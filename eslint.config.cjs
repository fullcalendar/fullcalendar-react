
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module' // allows for the use of imports
  },
  plugins: [
    '@typescript-eslint',
    'react'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  rules: {
    'no-unused-vars': 0, // disable so that doesn't complain about unnused ts type imports
    'no-undef': 0, // because tsc already checks this. hard to make work with tests globals
    'prefer-const': 0,
    'space-before-function-paren': 0,
    'no-multiple-empty-lines': 0,
  }
}
