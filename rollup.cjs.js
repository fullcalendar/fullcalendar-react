
export default {
  input: {
    main: 'dist/main.js'
  },
  output: {
    format: 'cjs',
    dir: 'dist',
    entryFileNames: '[name].cjs.js',
    exports: 'named'
  }
}
