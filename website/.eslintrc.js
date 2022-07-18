module.exports = {
  root: true,
  extends: ['next', 'next/core-web-vitals', 'prettier'],
  plugins: ['strict-dependencies', 'unused-imports'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: [
    'src/styles/**/*.d.ts',
    '.eslintrc.js',
    'stylelint.config.js',
    'babel.config.js',
    'next.config.js',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-unused-vars': 'off',
    'no-console': 'warn',
    'no-restricted-syntax': ['error', 'TSEnumDeclaration', 'WithStatement'],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
}
