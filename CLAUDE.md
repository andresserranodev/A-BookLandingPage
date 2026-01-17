# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

- **Static First**: By default, pages are static HTML. Minimal JS is shipped to the client.
- **Islands**: Use `client:*` directives (e.g., `client:load`, `client:visible`) ONLY for interactive components (React).
- **Keep it Light**: Static content should remain static (`.astro` components). Do not hydrate simple UI elements that don't need state.

### What NOT to Add

**Never add these to a static landing page:**

- ❌ Data fetching libraries (React Query, SWR, Apollo, tRPC)
- ❌ State management libraries (Redux, Zustand, Jotai) - use React Context if needed
- ❌ Backend/Database tools (Drizzle, Prisma, any ORM)
- ❌ Real-time libraries (Socket.io, Pusher)
- ❌ Server frameworks (Express, Fastify) - this is a static site
- ❌ Authentication libraries - no backend means no auth
- ❌ Unnecessary build tools (Vite uses esbuild internally, Astro handles minification)

## Performance & Optimization

### Static First Philosophy

This is a **static landing page** - the entire site is pre-rendered at build time with minimal JavaScript. Follow these principles:

1. **Default to Static**: Use `.astro` components by default. Only use React when you need client-side interactivity.
2. **No Runtime Data Fetching**: This site has no backend, no API calls, no database. All content is static.
3. **Avoid Unnecessary Dependencies**: Before adding any dependency, ask: "Does this static site really need this?" Prefer built-in solutions.
4. **Islands Architecture**: Only hydrate what needs interactivity. Most of the page should be plain HTML/CSS.

### Bundle Size & Dependencies

**Production Dependencies** (runtime):

- `@radix-ui/*` - UI primitives (Avatar, Toast, Tooltip, Slot)
- `embla-carousel-react` - Carousel for book previews
- `lucide-react` - Icon system
- `class-variance-authority`, `clsx`, `tailwind-merge` - Styling utilities
- `tailwindcss-animate` - CSS animations

**Dev Dependencies**:

- `astro`, `@astrojs/react`, `@astrojs/tailwind` - Framework
- `react`, `react-dom` - UI library (dev-only, tree-shaken)
- `tailwindcss` - CSS framework
- Testing: `jest`, `@testing-library/react`, `@testing-library/jest-dom`
- Linting: `eslint`, `prettier`, `husky`, `lint-staged`

**Guidelines:**

1. **Prefer Astro**: Use `.astro` components for layout and static UI. React is only for interactive islands.
2. **No Data Fetching Libraries**: Never add libraries like React Query, SWR, Apollo, etc. This is a static site.
3. **Lazy Loading**: Use `client:visible` for heavy interactive components below the fold.
4. **Icons**: Import individually from `lucide-react` (e.g., `import { Menu } from 'lucide-react'`) to allow tree-shaking.
5. **Challenge Every Dependency**: Before installing anything, verify it's absolutely necessary for a static landing page.

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

# Testing

- All new features and interactive components need tests
- Tests use React Testing Library (`@testing-library/react`)
- Run tests: `npm test` (watch mode: `npm run test:watch`)
- Run with coverage: `npm run test:coverage`
- The react-native-tests skill contains our testing guidelines
- Focus on testing interactive React components (islands), not static Astro components
