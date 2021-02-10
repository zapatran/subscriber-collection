module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  setupFilesAfterEnv: ['./jest.setup.js'],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
