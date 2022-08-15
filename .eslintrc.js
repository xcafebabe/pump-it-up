module.exports = {
  extends: ['airbnb-base', 'prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 'latest',
  },
  env: {
    es2022: true,
    jest: true,
    node: true,
  },
  plugins: ['prettier'],
  rules: {
    'no-console': 0,
    'no-process-env': 'off',
    'no-process-exit': 'off',
    'no-param-reassign': 0,
    'import/no-extraneous-dependencies': 0,
    'global-require': 0,
    'import/prefer-default-export': 0,
    'max-len': 0,
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    'arrow-body-style': ['error', 'always'],
    'prettier/prettier': ['error'],
  },
};
