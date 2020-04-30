
// NOTE: will automatically detect babel config

module.exports = {
  rootDir: 'tests',
  testRegex: '(^|/)[A-Za-z0-9][^/]*.jsx?$', // non-underscore filenames

  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/_styleMock.js'
  },

  // HACK
  // this normally excludes node_modules.
  // resetting it causes babel to transform the @fullcalendar packages.
  // we need this because Jest can't handle ES modules.
  // TODO: remove once fullcalendar packages restore support for CJS modules.
  transformIgnorePatterns: []
}
