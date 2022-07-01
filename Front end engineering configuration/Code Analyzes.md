# Code Analyzes

## EditorConfig

文档: [EditorConfig](https://editorconfig.org/)

```shell
root = true

# 所有文件适用
[*]
# 设置文件字符集为 utf-8
charset = utf-8
# 缩进风格（tab | space）
indent_style = space
# 缩进大小
indent_size = 2
# 控制换行类型(lf | cr | crlf)
end_of_line = lf
# 去除行首的任意空白字符
trim_trailing_whitespace = true
# 始终在文件末尾插入一个新行
insert_final_newline = true

# 表示仅 md 文件适用以下规则
[*.md]
max_line_length = off
trim_trailing_whitespace = false
```

## StyleLint

> npm install stylelint stylelint-config-standard-scss -D

在`.stylelintrc.json`中定义规则

```JSON
{
  "extends": "stylelint-config-standard-scss"
}
```

## Prettier

在`.prettierrc.js`定义格式化规则

```js
module.exports = {
  // 一行最多 100 字符
  printWidth: 100,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾不需要逗号
  trailingComma: 'all',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 lf
  endOfLine: 'auto',
}
```

使用`.prettierignore`对指定文件进行忽略

```
# .gitignore content

# Log Files
pnpm-lock.yaml
yarn.lock
yarn-error.log
package-lock.json
shrinkwrap.json

# Folds
build
dist
lib

# File Extension
*.md
```

## Eslint

```js
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
    ecmaVersion: 'next',
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
```
