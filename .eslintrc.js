module.exports = {
  root: true,
  extends: [
    '@react-native',
    'airbnb',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    'react',
    'react-native',
    'jsx-a11y',
    'import',
    '@typescript-eslint',
  ],
  rules: {
    'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx']}],
    'import/extensions': ['error', 'never', {js: 'never', jsx: 'never'}],
    'import/no-extraneous-dependencies': ['error', {devDependencies: true}],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-vars': 'off',
  },
};
