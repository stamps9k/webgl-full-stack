module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/tests"],
  transform: {
    "\\.m?[jt]sx?$": "babel-jest",
  },
};
