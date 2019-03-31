const path = require('path')

module.exports = {
  // Tells jest to only look in the src folder for test
  rootDir: '../src',

  // This matches the resolve.module array from webpack configs. Without this,
  // Jest will think some of our imports are node_modules
  moduleDirectories: [
    path.resolve('./node_modules'),
    path.resolve('./jest/globals')
  ],

  // Runs after Jest is loaded but before each test
  setupTestFrameworkScriptFile: require.resolve('./globals.js')
}
