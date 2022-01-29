// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

//
// Original
//
//transform: {
//  "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
//},

module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest",
  },
  collectCoverage: true,
};
