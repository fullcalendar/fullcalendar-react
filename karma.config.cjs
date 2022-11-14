
module.exports = function(config) {
  config.set({
    basePath: '.',
    plugins: [
      require('karma-jasmine'),
      require('karma-sourcemap-loader'),
      require('karma-spec-reporter'),
      require('karma-chrome-launcher'),
    ],
    frameworks: ['jasmine'],
    files: [
      'tmp/tests.js',
    ],
    preprocessors: {
      '**/*.+(js|css)': ['sourcemap']
    },
    logLevel: config.LOG_INFO,
    reporters: [ 'spec' ]
  })
}
