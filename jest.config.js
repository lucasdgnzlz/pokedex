module.exports = {
  setupFiles: ["jest-localstorage-mock"],
  testEnvironment: 'node, jsdom',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};
