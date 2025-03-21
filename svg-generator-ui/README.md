# Ekubo Position SVG Generator UI

This is a simple React UI that demonstrates the SVG generation from the main `@ekubo/position-svg-generator` package.

## Features

- Live preview of generated SVGs
- Select from different position examples
- Generate SVGs with random IDs to see variations
- Hot Module Reloading to see changes in the SVG generator immediately

## Setup

1. First, build the main package:
   ```
   cd ..
   npm install
   npm run build
   npm link
   ```

2. Then set up the UI app:
   ```
   cd svg-generator-ui
   npm install
   npm link @ekubo/position-svg-generator
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Development Workflow

1. Make changes to the main package's `generateSvg` function (in `../src/index.ts`)
2. The package will automatically rebuild when in watch mode (`npm run dev` in the root directory)
3. The UI will automatically update to display the new SVG output

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
