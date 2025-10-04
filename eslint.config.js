import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import json from '@eslint/json'
import css from '@eslint/css'
import prettier from 'eslint-plugin-prettier' // ✅ 导入
import { defineConfig } from 'eslint/config'

export default defineConfig([
  // 通用 JS/TS/Vue 配置
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  // TypeScript 配置
  tseslint.configs.recommended,

  // Vue 配置
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'error',
      'vue/no-mutating-props': 'off',
      'vue/attribute-hyphenation': 'off',
    },
  },

  // JSON 文件配置
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended'],
  },

  // CSS 文件配置
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
  },

  // 自定义规则
  {
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-var': 'error',
      'no-multiple-empty-lines': ['warn', { max: 1 }],
      'no-unexpected-multiline': 'error',
      'no-useless-escape': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/prefer-ts-expect-error': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/semi': 'off',
    },
  },

  // ✅ 正确方式：使用 prettier 插件提供的规则
  {
    files: ['**/*.{js,ts,vue,css,json}'], // 指定需要格式化的文件
    rules: {
      'prettier/prettier': 'error',
    },
    plugins: {
      prettier: prettier,
    },
  },

  // 忽略文件
  {
    ignores: [
      'node_modules/',
      'dist/',
      'coverage/',
      '*.min.js',
      'build/',
      'public/',
    ],
  },
])
