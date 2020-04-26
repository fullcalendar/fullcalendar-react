import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourcemaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript'
import packageConfig from './package.json'

let isDev
if (!/^(development|production)$/.test(process.env.BUILD)) {
  console.warn('BUILD environment not specified. Assuming \'development\'')
  isDev = true
} else {
  isDev = process.env.BUILD === 'development'
}

let sourcemap = isDev ? 'inline' : false

const BROWSER_GLOBAL = 'FullCalendarReact'
const EXTERNAL_BROWSER_GLOBALS = {
  'react': 'React',
  'react-dom': 'ReactDOM',
  '@fullcalendar/preact': 'FullCalendar'
}
const ESM_EXTERNALS = [
  // put module names here that we DON'T want to bundle in the ES build
]
const OUTPUT_SETTINGS = {
  umd: {
    format: 'umd',
    file: 'dist/main.umd.js',
    exports: 'named',
    name: BROWSER_GLOBAL,
    globals: EXTERNAL_BROWSER_GLOBALS,
    banner: buildBanner,
    sourcemap
  },
  esm: {
    format: 'es',
    file: 'dist/main.esm.js',
    banner: buildBanner,
    sourcemap
  }
}

export default [
  buildSettings('umd'),
  buildSettings('esm')
]

function buildSettings(format) {
  let external = Object.keys(EXTERNAL_BROWSER_GLOBALS)
  let plugins = []

  if (format === 'esm') {
    external = external.concat(ESM_EXTERNALS)
    plugins.push(
      nodeResolve({ jail: 'src' }) // any files outside of here are considered external libs
    )
  } else {
    plugins.push(
      nodeResolve()
    )
  }

  plugins.push(
    commonjs(), // allows importing of external cjs modules
    typescript() // will use tsconfig.json
  )

  if (isDev) {
    plugins.push(sourcemaps())
  }

  return {
    input: 'src/FullCalendar.tsx',
    output: OUTPUT_SETTINGS[format],
    external,
    plugins
  }
}

function buildBanner() {
  return '/*\n' +
    packageConfig.title + ' v' + packageConfig.version + '\n' +
    'Docs: ' + packageConfig.docs + '\n' +
    'License: ' + packageConfig.license + '\n' +
    '*/'
}
