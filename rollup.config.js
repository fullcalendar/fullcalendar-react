import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import react from 'react'
import reactDom from 'react-dom'

export default [
  {
    input: 'tests/main.jsx',
    output: {
      format: 'iife',
      file: 'tmp/tests.js',
      sourcemap: 'inline'
    },
    plugins: [
      nodeResolve(),
      commonjs({ // for importing commonjs modules
        namedExports: {
          'react': Object.keys(react),
          'react-dom': Object.keys(reactDom)
        }
      }),
      babel(), // will automatically use babel.config.js
      postcss()
    ]
  }
]
