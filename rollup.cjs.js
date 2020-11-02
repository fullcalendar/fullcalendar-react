
export default {
  input: {
    main: 'dist/main.js',
    vdom: 'dist/vdom.js'
  },
  plugins: [
    {
      resolveId(id, importer) {
        if (importer) {
          if (id === './vdom') {
            return { id: './vdom.cjs', external: true }
          } else {
            return { id, external: true }
          }
        }
      }
    }
  ],
  output: {
    format: 'cjs',
    dir: 'dist',
    entryFileNames: '[name].cjs.js',
    exports: 'named'
  }
}
