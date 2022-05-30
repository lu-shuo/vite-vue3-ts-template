// @ts-check
const { defineConfig } = require('eslint-define-config')
// auto-suggestions
// type checking (Use // @ts-check at the first line in your .eslintrc.js)
// documentation
// deprecation warnings
module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true, // 启用compiler-macros such as defineProps and defineEmits
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', // 防止prettier冲突
    'plugin:prettier/recommended', // 添加 prettier 插件
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    jsx: true, // 启用jsx
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
})
