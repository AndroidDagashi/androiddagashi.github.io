# Code Style and Conventions

## TypeScript
- Strict mode enabled (`"strict": true`)
- Target: ESNext
- Consistent type imports enforced (`@typescript-eslint/consistent-type-imports`: error)

## Formatting (Prettier)
- No semicolons (`"semi": false`)
- Single quotes (`"singleQuote": true`)
- Print width: 80
- Tab width: 2 (spaces)
- Trailing commas: ES5 style
- Arrow parens: always
- Bracket spacing: true
- Vue: no indent for script and style blocks

## EditorConfig
- Indent: 2 spaces (except Makefile: tabs)
- Line ending: LF
- Charset: UTF-8
- Trim trailing whitespace (except .md)
- Insert final newline

## ESLint
- Parser: @typescript-eslint/parser
- Extends: eslint:recommended, @typescript-eslint/recommended, prettier
- Key rules: consistent-type-imports (error)

## General Patterns
- Static generation with pre-rendered routes based on issue IDs
- Custom OGP meta tag generation for social sharing
- All API data must be generated before running dev server or building
