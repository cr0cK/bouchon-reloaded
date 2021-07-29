const isCI = process.env.CI === '1'

module.exports = {
  roots: [
    '<rootDir>/src'
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  moduleNameMapper: {
    '@libs/(.*)$': '<rootDir>/src/libs/$1',
    '@@types/(.*)$': '<rootDir>/src/types/$1'
  },
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**'
  ],
  coverageDirectory: 'reports/coverage',
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  testEnvironment: 'node',
  bail: false,
  verbose: true,
  preset: 'ts-jest',
  testMatch: null
}
