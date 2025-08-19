module.exports = {
  testEnvironment: 'jsdom',
  //setupFiles: ['<rootDir>/jest.setup.cjs'],
  //setupFilesAfterEnv: ['<rootDir>/jest.setupAfterEnv.cjs'],
  roots: ['<rootDir>/tests'],
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
};
