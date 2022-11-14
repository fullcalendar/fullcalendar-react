
export default {
  input: {
    main: 'dist/main.js'
  },
  output: {
    format: 'cjs',
    dir: 'dist',
    entryFileNames: '[name].cjs',
    exports: 'named'
  },
  external: [
    '@fullcalendar/core',
    '@fullcalendar/core/internal',
    'tslib',
    'react',
    'react-dom',
  ]
}
