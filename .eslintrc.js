module.exports = {
  settings: {
    react: {
      version: 'detect'
    }
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'prettier',
    'plugin:@next/next/recommended'
  ],
  env: { es6: true, browser: true },
  plugins: ['prettier', 'react'],
  rules: {
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0
  }
};
