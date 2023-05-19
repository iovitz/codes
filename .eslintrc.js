module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'google'],
  globals: {
    NodeJS: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  ignorePatterns: ['node_modules/', 'build/', 'dist/', 'e2e/'],
  plugins: ['@typescript-eslint'],
  rules: {
    // 函数最大深度
    'max-depth': ['error', 4],
    // 函数最大行数
    'max-lines-per-function': ['error', 5000],
    'no-undef': 'off',
    // 文件最大行数
    'max-lines': ['error', 5000],
    'max-len': ['error', 300],
    'semi': [2, 'never'],
    // 函数定义的时候函数名后加个空格
    'space-before-function-paren': ['error', 'always'],
    'no-unused-vars': 'off',
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
    'no-dupe-class-members': 'off',
    'guard-for-in': 'off',
  },
}
