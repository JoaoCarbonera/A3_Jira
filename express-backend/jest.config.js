
module.exports = {
  clearMocks: true,

  testEnvironment: 'node',

  reporters: ['default', 'jest-html-reporters'],

  setupFiles: ['./jest.setup.js'],
};