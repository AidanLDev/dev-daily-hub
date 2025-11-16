import astroParser from 'astro-eslint-parser'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import astroPlugin from 'eslint-plugin-astro'

const config = [
  // global ignores
  {
    ignores: ['.sst/**', 'cdk.out/**', '.astro/**', 'node_modules/**', 'dist/**'],
  },

  // base settings for JS/TS
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // prefer the TypeScript-specific rule over the base rule
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },

  // .astro files: use astro parser and plugin
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
    plugins: {
      astro: astroPlugin,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // add any Astro-specific rules you want enabled; keep minimal for now
    },
  },

  // explicit JS/TS file globs (if you want different rules per file types later)
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
]

export default config
