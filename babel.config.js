
module.exports = {
  presets: [
    ['@babel/preset-env', {
      // compile to match the env that jest is executing in, to avoid/include certain polyfills
      targets: { node: 'current' }
    }],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-throw-expressions'
  ]
}
