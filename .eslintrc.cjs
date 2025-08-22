module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'solid',
    'prettier'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:solid/recommended',
    'prettier'
  ],
  rules: {
    // Add custom rules here if needed
    'prettier/prettier': 'error',
  },
  env: {
    browser: true,
    node: true
  }
};