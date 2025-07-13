module.exports = {
  preset: "jest-expo",

  setupFiles: ["<rootDir>/jest.setup.js"],
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/__mocks__/"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)",
  ],
};
