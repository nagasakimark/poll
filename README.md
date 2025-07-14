# Fruit Poll

A fun, visually appealing React web app for young children to vote for their favorite fruit.

## Features
- Sidebar with fruit names (English + Katakana) and icons
- "I like ____" prompt with furigana, cycling fruits
- Live bar/pie chart of votes with fruit icons
- Flying fruit animation (fruit-ninja style)
- Fullscreen results with reset
- Playful, colorful, accessible design

## Deploying to GitHub Pages
1. Commit your changes:
   ```sh
   git add .
   git commit -m "Prepare for GitHub Pages deployment"
   ```
2. Push to your repo:
   ```sh
   git remote add origin https://github.com/nagasakimark/fruitpoll.git
   git branch -M main
   git push -u origin main
   ```
3. Build for production:
   ```sh
   npm run build
   ```
4. Deploy the `dist` folder to GitHub Pages:
   ```sh
   npx gh-pages -d dist
   ```
   (If you don't have `gh-pages`, install it: `npm install --save-dev gh-pages`)

Your app will be live at: https://nagasakimark.github.io/fruitpoll/
