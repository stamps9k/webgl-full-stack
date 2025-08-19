module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests'],
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
};
