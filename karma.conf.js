
module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: [ 'jasmine' ],
    files: [
      'tmp/tests.js',
    ],
    preprocessors: {
      '**/*.+(js|css)': [ 'sourcemap' ]
    },
    logLevel: config.LOG_INFO,
    reporters: [ 'spec' ]
  })
}
