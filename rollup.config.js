import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import postcss from 'rollup-plugin-postcss'
import sourcemaps from 'rollup-plugin-sourcemaps'

export default [
  // cjs
  {
    input: {
      main: 'dist/index.js'
    },
    output: {
      format: 'cjs',
      dir: 'dist',
      entryFileNames: '[name].cjs',
      exports: 'named'
    },
    // TODO: more robust way of doing this
    external: [
      '@fullcalendar/core',
      '@fullcalendar/core/internal',
      'tslib',
      'react',
      'react-dom',
    ]
  },

  // tests
  {
    input: 'tests/index.jsx',
    output: {
      format: 'iife',
      file: 'tmp/tests.js',
      sourcemap: 'inline',
    },
    plugins: [
      sourcemaps(), // read sourcemaps from input files
      replace({ // important it goes first
        preventAssignment: true,
        values: {
          'process.env.NODE_ENV': '"development"' // needed for @testing-library/react
        }
      }),
      nodeResolve({
        browser: true // needed for @testing-library/react
      }),
      commonjs(), // for importing commonjs modules
      babel({ // will automatically use babel.config.cjs
        babelHelpers: 'bundled',
        inputSourceMap: false, // only way sourcemaps plugin will work
      }),
      postcss({
        config: false // don't look in current and parent dirs for a config
      })
    ]
  },
]
