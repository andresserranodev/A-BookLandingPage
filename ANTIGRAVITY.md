# ANTIGRAVITY.md

This file provides guidance to Antigravity when working with code in this repository.

## Project Overview

"Patagonia Pages" (formerly "Un Andrés Más") - A bilingual (Spanish/English) landing page for a travel memoir about a motorcycle journey from Colombia to Patagonia. Rebuilt with **Astro** and **React**.

## Development Commands

### Running the Application

```bash
npm run dev          # Start development server
npm run build        # Type check and build for production
npm run preview      # Preview the production build locally
npm run check        # TypeScript type checking
```

### Code Quality

This project uses ESLint 9 and Prettier for code quality:

```bash
npm run lint          # Check for linting errors
npm run lint:fix      # Auto-fix linting errors
npm run format        # Format all files with Prettier
npm run format:check  # Verify formatting
npm run validate      # Run all checks (TS + Lint + Format + Tests)
```

**Pre-commit Hooks**: husky + lint-staged automatically lint and format staged files.

## Development Principles

### Core Principles

- **DRY**: Extract common logic into reusable components or hooks.
- **YAGNI**: Implement only what is required. Avoid speculative features.
- **SOLID**: Keep components focused and modular.

### Astro & Islands Architecture

- **Static First**: By default, pages are static HTML. minimal JS is shipped to the client.
- **Islands**: Use `client:*` directives (e.g., `client:load`, `client:visible`) ONLY for interactive components (React).
- **Keep it Light**: Static content should remain static ( `.astro` components). Do not hydrate simple UI elements that don't need state.

## Performance & Optimization

### Bundle Size & Dependencies

- **Core**: `astro`, `react`, `react-dom`, `tailwindcss`
- **UI**: `@radix-ui/*`, `embla-carousel-react` (Carousels)
- **Icons**: `lucide-react` (Import specific icons to allow tree-shaking)

**Guidelines:**

1. **Prefer Astro**: Use `.astro` components for layout and static UI.
2. **Lazy Loading**: Use `client:visible` for heavy interactive components below the fold.
3. **Icons**: Use `lucide-react` imports individually (e.g., `import { Menu } from 'lucide-react'`).

### Image Optimization

- Use standard HTML `<img>` or Astro's optimized image handling if configured.
- **Alt Text (SEO)**: All `alt` attributes must be in **Spanish** and contextual to the book/journey (e.g., "Andrés viajando en moto por la Patagonia").
- **LCP**: Ensure hero images have `loading="eager"` (or default behavior) and high priority.
- **Lazy**: Secondary images should be `loading="lazy"`.

## Architecture

### Project Structure

```
src/
├── components/  # reusable UI components (React & Astro)
│   ├── ui/      # shadcn/ui primitives
│   └── ...      # Feature components
├── layouts/     # Astro layouts (HTML shell, common head)
├── pages/       # Astro file-based routing
├── env.d.ts     # TypeScript environment types
└── ...
public/          # Static assets (favicon, robots.txt)
```

### Key Patterns

- **Styling**: Tailwind CSS for all styling.
- **UI Library**: shadcn/ui (Radix Primitives + Tailwind).
- **Deployment**: Static Site Generation (SSG) deployed to GitHub Pages.

## Working with this Repo

- **Config**: `astro.config.mjs`, `tailwind.config.ts`.
- **Package Manager**: NPM.
- **Linting**: ESLint + Prettier.
