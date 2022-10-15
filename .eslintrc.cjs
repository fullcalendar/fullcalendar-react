
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  plugins: [
    '@typescript-eslint',
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    es2022: true,
  },
  rules: {
    'no-undef': 'off', // typescript will check types
    'prefer-const': 'off',
    quotes: ['error', 'single'],
  },
  overrides: [
    {
      files: [
        './*.{js,cjs}',
        './scripts/**/*.{js,cjs}',
      ],
      env: {
        node: true
      }
    },
    {
      files: [
        './{src,tests}/**/*.{js,jsx,ts,tsx}',
      ],
      env: {
        browser: true,
      }
    },
  ]
}
