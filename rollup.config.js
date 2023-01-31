import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import postcss from 'rollup-plugin-postcss'
import sourcemaps from 'rollup-plugin-sourcemaps'
import pkgJson from './package.json'

const [ourPkgNames, otherPkgNames] = getDepNames()

export default [
  // CJS
  {
    input: './dist/index.js', // the esm file
    output: {
      file: './dist/index.cjs',
      format: 'cjs',
      exports: 'named',
    },
    plugins: [
      externalizePkgsPlugin(ourPkgNames, '.cjs'),
      externalizePkgsPlugin(otherPkgNames),
    ],
  },

  // Tests
  {
    input: './tests/index.jsx',
    output: {
      format: 'iife',
      file: './tests/dist/index.js',
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

// plugins & utils
// -------------------------------------------------------------------------------------------------

function getDepNames() {
  const pkgNames = Object.keys({
    ...pkgJson.dependencies,
    ...pkgJson.peerDependencies,
    ...pkgJson.optionalDependencies,
  })
  const ourPkgNames = []
  const otherPkgNames = []

  for (const pkgName of pkgNames) {
    if (pkgName.match(/^@fullcalendar\//)) {
      ourPkgNames.push(pkgName)
    } else {
      otherPkgNames.push(pkgName)
    }
  }

  return [ourPkgNames, otherPkgNames]
}

function externalizePkgsPlugin(pkgNames, forceExtension) {
  return {
    name: 'externalize-pkgs',
    resolveId(importId) {
      if (!isImportRelative(importId)) {
        for (const pkgName of pkgNames) {
          if (importId === pkgName || importId.startsWith(pkgName + '/')) {
            if (forceExtension) {
              if (importId === pkgName) {
                importId += '/index' + forceExtension
              } else {
                importId += forceExtension
              }
            }
            return { id: importId, external: true }
          }
        }
      }
    },
  }
}

function isImportRelative(importId) {
  return importId.startsWith('./') || importId.startsWith('../')
}
