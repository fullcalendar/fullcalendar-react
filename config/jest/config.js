const path = require('path');

module.exports = {
  // Tells jest to only look in the src folder for test
  rootDir: '../../src',

  // This matches the resolve.module array from webpack configs. Without this,
  // Jest will think some of our imports are node_modules
  moduleDirectories: [
    path.resolve('./src'),
    path.resolve('./node_modules'),
    path.resolve('./config/jest/modules'),
  ],

  // Any css files need to be mocked since jest treats css files like JS
  moduleNameMapper: {
    '\\.css$': require.resolve('./mocks/css.js'),
  },

  // Runs after Jest is loaded but before each test
  setupTestFrameworkScriptFile: require.resolve('./modules/globals.js'),

  transformIgnorePatterns: ['/node_modules/(?!(antd))'],
};
