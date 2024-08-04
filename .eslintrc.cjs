/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['next/core-web-vitals'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    "react/no-unescaped-entities": 0,
    "react-hooks/exhaustive-deps": 0,
    '@next/next/no-sync-scripts': 'off',
  }
}
