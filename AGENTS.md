# AGENTS.md

## Project Overview

This project is a high-fidelity local recreation of the MiMo Code landing page using Vite, React, and Tailwind CSS.

The page keeps the original visual language, local image/font assets, canvas hero reveal effect, typewriter animations, copy command interaction, and Chinese/English language switching.

## Tech Stack

- Vite 8
- React 19
- Tailwind CSS 4 via `@tailwindcss/vite`
- Playwright for e2e verification

## Commands

Run these from the project root:

```bash
npm run dev
npm run build
npm run test:e2e
```

Use `npm run dev -- --port 4173` when matching the current local preview URL.

## Source Layout

- `index.html`: React mount shell only.
- `src/main.jsx`: React entrypoint.
- `src/App.jsx`: Top-level app composition and language/link state.
- `src/i18n.js`: Chinese/English copy and feature-card data.
- `src/components/`: Page sections and reusable UI components.
- `src/hooks/`: Browser effects and interactive behavior.
- `src/styles.css`: Tailwind import plus the pixel-sensitive cloned styles.
- `public/coder/assets/`: Locally mirrored fonts, images, logo, and icons.
- `tests/mimocode.spec.ts`: Playwright coverage for rendering, assets, copy, and language switching.

## Development Notes

- Preserve the visual fidelity of the cloned page. Avoid casual spacing, font, color, or animation changes unless the user asks for them.
- Prefer React state and hooks for new behavior. Do not add new global DOM scripts.
- Tailwind is available for new layout and utility styling, but keep complex clone-specific selectors, pseudo-elements, font faces, and canvas-related styling in `src/styles.css`.
- Keep components focused. If a component grows large, split by page responsibility rather than by arbitrary technical layers.
- Keep assets under `public/coder/assets/` when they are referenced by stable `/coder/assets/...` URLs.
- For language-aware UI, update `src/i18n.js` first, then consume the copy through props.

## Verification

Before claiming changes are complete, run:

```bash
npm run test:e2e
npm run build
```

For visual or interaction changes, also open the local app and verify:

- The hero renders with the local background asset.
- All feature images load.
- Copy command writes `curl -fsSL https://mimo.xiaomi.com/install | bash`.
- Language switching updates visible text and links.
- Browser console has no errors.

## Git Hygiene

- Do not commit `node_modules/`, `dist/`, Playwright reports, screenshots, or temporary preview images.
- Do not revert user changes unless explicitly asked.
- Keep unrelated refactors out of focused requests.
