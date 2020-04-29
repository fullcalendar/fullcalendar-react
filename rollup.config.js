import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourcemaps from 'rollup-plugin-sourcemaps'
import packageConfig from './package.json'


let isDev
if (!/^(development|production)$/.test(process.env.BUILD)) {
  console.warn('BUILD environment not specified. Assuming \'development\'')
  isDev = true
} else {
  isDev = process.env.BUILD === 'development'
}


const BROWSER_GLOBAL = 'FullCalendarReact'
const EXTERNAL_BROWSER_GLOBALS = {
  'react': 'React',
  'react-dom': 'ReactDOM',
  '@fullcalendar/common': 'FullCalendar'
}
const OTHER_EXTERNAL = [ 'tslib' ]


let sourcemap = isDev ? 'inline' : false
let plugins = [
  nodeResolve({ jail: 'src' }), // any files outside of here are considered external libs
  commonjs() // allows importing of external cjs modules
]
if (isDev) {
  plugins.push(sourcemaps())
}


export default {
  input: 'tmp/tsc-output/FullCalendar.js',
  output: {
    format: 'es',
    file: 'dist/main.js',
    banner: buildBanner,
    sourcemap
  },
  external: Object.keys(EXTERNAL_BROWSER_GLOBALS).concat(OTHER_EXTERNAL),
  plugins
}


function buildBanner() {
  return '/*\n' +
    packageConfig.title + ' v' + packageConfig.version + '\n' +
    'Docs: ' + packageConfig.docs + '\n' +
    'License: ' + packageConfig.license + '\n' +
    '*/'
}
