/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  "transform": {
    "^.+\\.svg$": "jest-transform-stub",
  }
};
