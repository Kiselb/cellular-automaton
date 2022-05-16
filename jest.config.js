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
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest",
  },
  collectCoverage: true,
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "^.+\\.module\\.css$": "identity-obj-proxy",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
  },
  testPathIgnorePatterns: ["<rootDir>/strykerTmp/", "<rootDir>/build/"],
};
