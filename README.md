# Project: ⭕️❌ Enhanced Tic-Tac-Toe

## 🙊 Description

This is an UI/UX-enhanced version of the tic-tac-toe game presented in ReactJS's doc. I used this project to practice using **TailwindCSS** to add personal styles and animations to the game, and using **Vite** to scaffold a React+TS project.

## 🏃‍➡️ How to Run

- Use `npm install` to install required packages.
- Use `npm run dev` to start the game.

## 🥞 Tech Stack

- **Bundler**: Vite
- **CSS**: Tailwind, PostCSS, Headless UI
- **JS Framework**: ReactJS
- **Type Check**: TypeSript

## 🦄 Unique Features

- Support five different board sizes: from 3\*3 to 7\*7.
- Use a dynammic algorithm accepting any board size to calculate the winning conditions. The calculation is memoized by `React.useMemo()` to prevent unncessary calculation on every re-render.
- Minimal state values, an improvement from ReactJS' official approach.
- Use different cursor status to indicate clickable and unclickable squares in the board.
- Each player is assigned with a theme color (using Tailwind's `theme.extend.colors`). The background gradient of the screen reflects the current player, and smooth transition is applied at the time of player swap.
- Add animations to user interactions with the board, making the game experience more engaging.
- When a player wins, highlight the winner and the winning moves using bouncy animations.
- When the game ends without a winner, display draw-game message, and change background gradient to grayish.

## 📋 Coming Next

- [ ] Attach current player's icon to the cursor.
- [ ] When player wins, show some flying player icons in the background.
- [ ] When moves are reversed, apply the reverse animation onto the squares.
