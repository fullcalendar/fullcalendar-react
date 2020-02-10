
// NOTE: will automatically detect babel config

module.exports = {
  rootDir: 'src',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/_styleMock.js'
  }
}
