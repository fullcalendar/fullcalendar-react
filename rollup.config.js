import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import postcss from 'rollup-plugin-postcss'
import sourcemaps from 'rollup-plugin-sourcemaps'
import pkgJson from './package.json'

export default [
  // cjs
  {
    input: 'dist/index.js', // the esm file
    output: {
      file: 'dist/index.cjs',
      format: 'cjs',
      exports: 'named',
    },
    external: buildDepRegexps(),
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

// ensures subpaths of packages are matched
function buildDepRegexps() {
  const pkgNames = Object.keys({
    ...pkgJson.dependencies,
    ...pkgJson.peerDependencies,
    ...pkgJson.optionalDependencies,
  })

  return pkgNames.map((pkgName) => {
    return RegExp(`^${escapeRegExp(pkgName)}($|/)`)
  })
}

// https://stackoverflow.com/a/6969486/96342
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
