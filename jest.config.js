module.exports = {
  roots: [
    '<rootDir>/src'
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
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
