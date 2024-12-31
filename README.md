# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

# Project: ⭕️❌ Enhanced Tic-Tac-Toe

## 🙊 Description

This is an enhanced version of the tic-tac-toe game, which is used as the tutorial in ReactJS's docs.

## 🥞 Tech Stack

Vite, ReactJS, TypeSript, SASS, CSS Modules

## 🦄 Unique Features

- Different cursor status on clickable and unclickable square
- Support 5 different board sizes: 3\*3 to 7\*7
- Use dynammic algorithm to calculate all the winning conditions. The calculation is memoized to prevent unncessary calculation on every re-render.
- Minimal State values, an improvement from ReactJS' official approach

## 📋 TODOs

- [ ] Bouncy Effect
- [ ] Responsive UI
- [ ] Next Player's Name on CUrsor
- [ ] split code into sevearl files
- [ ] change board size options to cute buttons
- [ ] change background color depending on player, and set each player to a color theme
- [ ] wavy effect when change background theme
- [ ] some X and O floating in the background
- [ ] effect when winning
- [ ] square slightly enlarge when hovered on
- [ ] When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).

## 🏃‍➡️ How to Run
