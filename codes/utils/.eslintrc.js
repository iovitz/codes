module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['standard'],
  globals: {
    NodeJS: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // 函数最大深度
    'max-depth': ['error', 4],
    // 函数最大行数
    'max-lines-per-function': ['error', 1500],
    // 'function-paren-newline': ['error', { minItems: 5 }],
    'function-paren-newline': ['error', 'consistent'],
    // 文件最大行数
    'max-lines': ['error', 5000],
    'max-len': ['error', 300],
    // 是否允许debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/comment-directive': 'off',
    'vue/no-unused-vars': 'off',
    'no-unused-vars': [
      'off',
      {
        ignorePattern: '^_'
      }
    ],
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
