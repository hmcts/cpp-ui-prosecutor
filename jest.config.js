if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'test';
}

module.exports = {
  testEnvironmentOptions: {
    url: 'http://localhost/'
  },
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testRunner: 'jest-jasmine2',
  roots: ['<rootDir>/src'],
  coverageDirectory: '<rootDir>/build/coverage/jest',
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },

  moduleNameMapper: {
    '^lodash-es$': 'lodash'
  }
};
