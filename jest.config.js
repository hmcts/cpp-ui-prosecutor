if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'test';
}

module.exports = {
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testRunner: 'jest-jasmine2',
  moduleDirectories: ['node_modules', '.'],
  testEnvironmentOptions: {
    url: 'http://localhost/'
  },
  moduleNameMapper: {
    '^lodash-es$': 'lodash'
  },
  testPathIgnorePatterns: ['<rootDir>/src/test.ts'],
  coverageDirectory: '<rootDir>/build/coverage/jest',
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
