import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";

export default tseslint.config({
  ignores: ["dist"],
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parserOptions: {
      // [from project] If you are developing a production application, we recommend updating the configuration to enable type aware lint rules
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
  plugins: {
    react,
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
  },

  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-console": "warn",
    "no-var": "error",
    "@typescript-eslint/no-unused-vars": "warn",
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});

// TODO:

// "eslintConfig": {
//     "root": true,
//     "env": {
//       "browser": true,
//       "node": true,
//       "es2021": true
//     },
//     "extends": [
//       "react-app",
//       "react-app/jest",
//       "eslint:recommended",
//       "plugin:react/recommended",
//       "plugin:react/jsx-runtime",
//       "plugin:@typescript-eslint/recommended",
//       "plugin:react-hooks/recommended"
//     ],
//     "rules": {
//       "react/prop-types": "off"
//     },

//     "parser": "@typescript-eslint/parser",
//     "parserOptions": {
//       "project": "./tsconfig.json",
//       "ecmaVersion": 2021,
//       "sourceType": "module"
//     },
//     "plugins": [
//       "react",
//       "jsx-a11y",
//       "react-hooks",
//       "@typescript-eslint"
//     ]
//   },
