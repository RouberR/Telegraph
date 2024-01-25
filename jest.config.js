/** @type {import('jest').Config} */
const config = {
  verbose: true,
  preset: '@testing-library/react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-native-community' +
      '|@react-navigation' +
      '|react-navigation-tabs' +
      '|react-native-splash-screen' +
      '|react-native-screens' +
      '|react-native-reanimated' +
      '|react-native-confirmation-code-field' +
      '|ky' +
      '|react-native-keyboard-aware-scroll-view' +
      '|react-native-iphone-x-helper' +
      '|react-native-modal' +
      '|react-native-animatable' +
      '|react-native-gifted-chat' +
      '|react-native-parsed-text' +
      '|react-native-lightbox-v2' +
      '|react-native-typing-animation' +
      '|react-native-image-picker' +
      ')/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest/setup.js', '<rootDir>/jest-setup.js'],
};

module.exports = config;
