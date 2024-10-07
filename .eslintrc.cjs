// module.exports = {
//   root: true,
//   env: { browser: true, es2020: true },
//   extends: [
//     "eslint:recommended",
//     "plugin:@typescript-eslint/recommended",
//     "plugin:react-hooks/recommended",
//   ],
//   ignorePatterns: ["dist", ".eslintrc.cjs"],
//   parser: "@typescript-eslint/parser",
//   plugins: ["react-refresh", "simple-import-sort"],
//   rules: {
//     "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
//     "simple-import-sort/imports": "error",
//     "simple-import-sort/exports": "error",
//   },
//   parserOptions: {
//     sourceType: "module",
//     ecmaVersion: "latest",
//   },
// };

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Prettier integration
  ],
  plugins: ['react', '@typescript-eslint', 'simple-import-sort'],
  rules: {
    'prettier/prettier': 'error', // Treat prettier errors as ESLint errors
    'react/react-in-jsx-scope': 'off', // Not needed with React 17+
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'simple-import-sort/imports': 'error', // Sort imports
    'simple-import-sort/exports': 'error', // Sort exports
  },
};
