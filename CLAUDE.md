# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Un Andrés Más" - A bilingual (Spanish/English) landing page for a travel memoir about a motorcycle journey from Colombia to Patagonia. Built with React, Express, and PostgreSQL.

## Development Commands

### Running the Application

```bash
npm run dev          # Start development server (client + server on port 5000)
npm run build        # Build for production (client + server bundle)
npm start            # Start production server
npm run check        # TypeScript type checking
```

### Database

```bash
npm run db:push      # Push schema changes to PostgreSQL using Drizzle Kit
```

Database schema is defined in `shared/schema.ts` and managed via Drizzle ORM. Migrations are stored in `./migrations`.

### Code Quality

This project uses ESLint 9 (flat config) and Prettier for code quality and consistent formatting:

```bash
npm run lint          # Check for linting errors
npm run lint:fix      # Auto-fix linting errors
npm run format        # Format all files with Prettier
npm run format:check  # Verify formatting (CI)
npm run validate      # Run all checks (TypeScript + Lint + Format + Tests)
```

**Pre-commit Hooks**: husky + lint-staged automatically lint and format staged files before commits.

**Editor Integration**: VS Code users get automatic formatting on save (recommended extensions: ESLint, Prettier, Tailwind CSS IntelliSense).

**Configuration Files**:

- `eslint.config.js` - ESLint flat config with React/TypeScript/Node rules
- `.prettierrc.json` - Prettier formatting options (double quotes, semicolons, Tailwind sorting)
- `.prettierignore` - Files excluded from formatting
- `.husky/pre-commit` - Pre-commit hook configuration

**Path Aliases**: ESLint understands `@/*`, `@shared/*`, and `@assets/*` aliases via TypeScript resolver.

## Development Principles

All code generated for this project must adhere to these core software engineering principles:

### DRY (Don't Repeat Yourself)

- Avoid code duplication by extracting common logic into reusable functions, hooks, or components
- Use shared types and schemas from `shared/schema.ts`
- Leverage existing utility functions in `client/src/lib/utils.ts`
- Create custom hooks for repeated React patterns

### YAGNI (You Aren't Gonna Need It)

- Implement only what is explicitly required by the current task
- Avoid adding speculative features, extra configuration options, or "future-proofing"
- Don't create abstractions until there's a proven need (prefer 3+ uses before abstracting)
- Keep solutions simple and focused on immediate requirements

### SOLID Principles

- **Single Responsibility**: Each component, function, or module should have one clear purpose
- **Open/Closed**: Components should be open for extension (via props/composition) but closed for modification
- **Liskov Substitution**: Derived components should be substitutable for their base types
- **Interface Segregation**: Prefer multiple specific prop interfaces over large generic ones
- **Dependency Inversion**: Depend on abstractions (hooks, context) rather than concrete implementations

### Practical Application

- Before creating a new component, check if existing components can be composed or extended
- Before adding a prop/parameter, verify it's needed for the current task (not hypothetical future needs)
- Keep functions small and focused (ideally < 20 lines)
- Use TypeScript's type system to enforce contracts and prevent errors
- Favor composition over inheritance (React functional components + hooks)

## Bundle Optimization & Performance

This project has been optimized to minimize JavaScript bundle size for better PageSpeed scores and user experience. Follow these strict guidelines to maintain optimal bundle size:

### Dependency Management

**CRITICAL: Before adding ANY new dependency, ask yourself:**

1. **Is it absolutely necessary?** Can the functionality be implemented with existing dependencies or vanilla code?
2. **What's the bundle size impact?** Check the package size on [Bundlephobia](https://bundlephobia.com/)
3. **Is it tree-shakeable?** Modern ES modules that support tree-shaking are preferred
4. **Are there lighter alternatives?** Always prefer smaller, focused libraries over heavy monolithic ones

**Current optimized dependencies (20 packages):**

```
Core: react, react-dom, wouter, @tanstack/react-query
UI Primitives: @radix-ui/react-{avatar,slot,toast,tooltip}
Utilities: clsx, class-variance-authority, tailwind-merge, tailwindcss-animate
Icons: lucide-react (tree-shakeable, import only what you need)
Carousel: embla-carousel-react
Backend: express, pg, drizzle-orm, drizzle-zod, zod, zod-validation-error
```

**Previously removed heavy dependencies (never re-add unless absolutely necessary):**

- ❌ `framer-motion` (~30 KB) - Use CSS animations or Tailwind Animate instead
- ❌ `recharts` (~50 KB) - Use lightweight chart libraries or CSS-based charts
- ❌ `react-day-picker` (~15 KB) - Use native `<input type="date">` when possible
- ❌ `react-icons` - Replaced with inline SVG or lucide-react
- ❌ `react-hook-form` + `@hookform/resolvers` - Use native form handling for simple forms
- ❌ Form/chart/calendar component libraries - Only add if truly needed

### Icon Usage Guidelines

**Preferred approach: lucide-react (tree-shakeable)**

```tsx
// ✅ GOOD: Import only specific icons (tree-shakeable)
import { Menu, X, AlertCircle } from "lucide-react";

// ❌ BAD: Importing entire icon library
import * as Icons from "lucide-react";

// ❌ NEVER: Using react-icons or other heavy icon libraries
import { FaFacebook } from "react-icons/fa";
```

**For social media icons or SVG assets:**

```tsx
// ✅ GOOD: Inline SVG components (zero bundle impact)
// See: client/src/components/icons/SocialIcons.tsx
export function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props}>{/* SVG path */}</svg>;
}
```

### shadcn/ui Component Management

**IMPORTANT: Only keep components that are actively used in the codebase.**

**Currently used UI components (9 total):**

- `avatar.tsx` - Used in AboutAuthorSection
- `button.tsx` - Used throughout (Navigation, Hero, Footer, etc.)
- `card.tsx` - Used in NotFound page
- `carousel.tsx` - Used in AboutBookSection (BookPreviewCarousel)
- `input.tsx` - Used in PreOrderSection
- `section.tsx` - Custom component, used in multiple sections
- `toast.tsx` + `toaster.tsx` - Used for notifications
- `tooltip.tsx` - Used globally

**Before adding a new shadcn/ui component:**

1. Check if you can achieve the same UI with existing components
2. If you must add it, run: `npx shadcn@latest add <component-name>`
3. Document the usage in this file
4. NEVER add components "just in case" - follow YAGNI principle

**Audit UI components regularly:**

```bash
# Find unused UI components
for comp in client/src/components/ui/*.tsx; do
  name=$(basename "$comp" .tsx)
  if ! grep -rq "from \"@/components/ui/$name\"" client/src --exclude-dir=ui; then
    echo "UNUSED: $name"
  fi
done
```

### Build Configuration

**vite.config.ts optimizations (DO NOT REMOVE):**

```typescript
build: {
  minify: "terser",  // Terser produces smaller output than esbuild
  terserOptions: {
    compress: {
      drop_console: true,      // Remove console.log in production
      drop_debugger: true,
      pure_funcs: ["console.log", "console.info"],
    },
  },
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ["react", "react-dom"],      // Separate vendor chunk
        router: ["wouter"],                  // Small router chunk
        query: ["@tanstack/react-query"],   // React Query chunk
      },
    },
  },
  chunkSizeWarningLimit: 600,  // Warn if chunks exceed 600 KB
}
```

### Performance Monitoring

**After any dependency changes, verify bundle size:**

```bash
# Build and check bundle sizes
GITHUB_PAGES=true npm run build

# Look for these metrics in build output:
# - Main bundle (index-*.js) should be < 150 KB (< 50 KB gzipped)
# - Vendor chunk should be < 150 KB (< 50 KB gzipped)
# - Total initial load should be < 110 KB gzipped
```

**Test with PageSpeed Insights:**

```bash
# After deployment, test at:
https://pagespeed.web.dev/

# Target scores:
# - Performance: > 90
# - Unused JavaScript: < 50 KB
# - LCP (Largest Contentful Paint): < 2.5s
# - FCP (First Contentful Paint): < 1.8s
```

### Code Splitting Best Practices

**Lazy load routes when adding new pages:**

```tsx
// ✅ GOOD: Lazy-loaded routes
import { lazy, Suspense } from "react";
const AdminPage = lazy(() => import("@/pages/Admin"));

// In router:
<Suspense fallback={<div>Loading...</div>}>
  <Route path="/admin" component={AdminPage} />
</Suspense>;

// ❌ BAD: Eager loading all routes
import AdminPage from "@/pages/Admin";
```

**Dynamic imports for heavy features:**

```tsx
// ✅ GOOD: Load chart library only when needed
const loadChart = async () => {
  const { Chart } = await import("./Chart");
  return Chart;
};

// ❌ BAD: Import chart library at top level
import { Chart } from "./Chart";
```

### Bundle Size Targets

**Hard limits (fail build if exceeded):**

- Individual chunk: < 600 KB uncompressed
- Main bundle: < 150 KB uncompressed (< 50 KB gzipped)
- Initial load (sum of critical chunks): < 350 KB uncompressed (< 110 KB gzipped)

**If build size increases:**

1. Run bundle analysis: `npm run build -- --mode=analyze` (after adding vite-bundle-visualizer)
2. Identify the culprit dependency or component
3. Find lighter alternatives or implement custom solution
4. Never compromise bundle size for convenience

### Pre-deployment Checklist

Before merging any PR that modifies dependencies or adds components:

- [ ] Run `npm run build` and verify bundle sizes haven't increased significantly
- [ ] Check that only necessary dependencies are in `package.json`
- [ ] Verify all imported components/functions are actually used
- [ ] Test PageSpeed Insights score on preview deployment
- [ ] Document any new dependencies or UI components in this file

## Architecture

### Monorepo Structure

This is a **monolithic full-stack application** with client, server, and shared code in a single repository:

```
client/          # React SPA (Vite)
├── src/
│   ├── components/  # React components
│   ├── hooks/       # Custom React hooks
│   ├── lib/         # Utilities, context, translations
│   └── pages/       # Route pages
server/          # Express API server
├── index.ts     # Server entry point
├── routes.ts    # API routes (prefix with /api)
├── storage.ts   # Drizzle ORM storage interface
├── vite.ts      # Vite dev server integration
└── static.ts    # Static file serving (production)
shared/          # Shared TypeScript types/schemas
└── schema.ts    # Drizzle schema + Zod validation
attached_assets/ # Static assets (images)
```

### Key Architectural Patterns

**1. Dual-Mode Server**

- Development: Express serves API, Vite middleware serves client with HMR
- Production: Express serves both API and pre-built static client
- Single port (5000) serves everything to avoid firewall issues on Replit

**2. Path Aliases**

- `@/*` → `client/src/*` (client-side imports)
- `@shared/*` → `shared/*` (both client and server)
- `@assets/*` → `attached_assets/*` (static assets)
  1
  **3. Bilingual i18n**
- `lib/LanguageContext.tsx` provides global language state
- `lib/translations.ts` contains all UI text in English/Spanish
- Browser language auto-detection on first visit
- Language preference persisted in localStorage
- Access via `const { t, language, setLanguage } = useLanguage()`

**4. Database Layer**

- Drizzle ORM with PostgreSQL
- Schema defined in `shared/schema.ts` (shared between client/server)
- Storage interface in `server/storage.ts` wraps all database operations
- Zod schemas auto-generated from Drizzle schemas for validation

**5. Component Organization**

- `components/ui/` - shadcn/ui primitives (Radix UI + Tailwind)
- `components/*.tsx` - Page-specific sections (Hero, About, PreOrder, etc.)
- Each section component is self-contained with its own logic

**6. Design System**

- **Typography**: Playfair Display (headings) + Inter (body)
- **Colors**: Warm earth tones (see `design_guidelines.md`)
- **Layout**: Mobile-first with `md:` (768px) and `lg:` (1024px) breakpoints
- **Components**: Built on Radix UI primitives via shadcn/ui
- See `design_guidelines.md` for complete design specifications

## Image Optimization & SEO Guidelines

### 1. Alt Text Strategy (SEO & Marketing)

All `alt` attributes must be written in **Spanish** and follow these strict rules to maximize SEO for the book:

- **Contextual:** Describe the image connecting it to the narrative of the book _"Un Andrés Más"_.
- **Keywords:** Include terms like: _Viaje en moto por Sudamérica, Patagonia, Kawasaki Versys, Libro de viajes, Aventura en moto_.
- **Prohibitions:**
  - **DO NOT** include camera or drone brands (e.g., "DJI Mini", "GoPro", "Sony").
  - **DO NOT** use generic descriptions (e.g., "mountain", "view", "motorcycle").
  - **DO NOT** leave the `alt` tag empty if the image is part of the story.

**Correct Example:**
`alt="Andrés conduciendo su moto por el Salar de Uyuni - Escena del libro Un Andrés Más"`

**Incorrect Example:**
`alt="aerial shot dji mavic 2 salt desert"`

### 2. Performance & Core Web Vitals (Technical)

To ensure a PageSpeed score of 90-100, apply the following logic to all `<img>` tags:

- **Hero Image (Above the Fold):**
  - This applies to the first image the user sees without scrolling (e.g., cover or main background).
  - **Must include:** `loading="eager"`
  - **Must include:** `fetchPriority="high"`
  - **Goal:** Optimize LCP (Largest Contentful Paint).

- **Secondary Images (Below the Fold):**
  - Applies to any image that requires scrolling to be seen (e.g., author bio, gallery, footer).
  - **Must include:** `loading="lazy"`
  - **Forbidden:** Do NOT use `fetchPriority` on these images.
  - **Goal:** Save bandwidth and speed up initial rendering.

- **Formats & Responsiveness:**
  - Always prioritize modern formats (`.webp` or `.avif`) over `.jpg` or `.png`.
  - Use the `<picture>` tag (or Astro's `<Picture />` component) to serve distinct image sizes for Mobile vs. Desktop.

## Important Implementation Details

### Server Configuration

- Server uses `process.env.PORT || 5000` as the default port
- Server listens on `0.0.0.0` with `reusePort: true` for deployment
- In development, Vite middleware MUST be set up last (after API routes)
- Production mode serves static files from `dist/public`

### Build Process

- `script/build.ts` builds both client (Vite) and server (esbuild)
- Server is bundled to single file (`dist/index.cjs`) with selective dependency bundling
- Allowlist in `build.ts` controls which deps are bundled (reduces cold start time)
- Client output goes to `dist/public`

### API Routes

- Prefix all API routes with `/api` in `server/routes.ts`
- Use `storage` object for database operations (e.g., `storage.insertUser()`)
- Error handling middleware catches all errors and returns JSON

### State Management

- React Query for server state (`@tanstack/react-query`)
- React Context for global UI state (language, theme)
- Local state for component-specific UI

### Styling

- Tailwind CSS with custom config in `tailwind.config.ts`
- PostCSS for processing (config in `postcss.config.js`)
- shadcn/ui configuration in `components.json`
- Tailwind Animate for animations (CSS-based, zero JS overhead)

### Routing

- Client-side: Wouter (lightweight React router)
- Server-side: Express
- Single Page App with client-side routing, server handles all routes for SPA

## Working with Translations

To add new translatable text:

1. Add key to `Translations` interface in `lib/translations.ts`
2. Add values for both `en` and `es` in the `translations` object
3. Use in components: `const { t } = useLanguage()` then `t.nav.aboutBook`

Current translation sections: `nav`, `hero`, `aboutBook`, `aboutAuthor`, `preorder`, `footer`

## Database Workflow

1. Modify schema in `shared/schema.ts` (Drizzle tables + Zod schemas)
2. Run `npm run db:push` to apply changes to PostgreSQL
3. Update `server/storage.ts` to add/modify data access methods
4. Use storage interface in routes: `storage.getUserByUsername(username)`

Drizzle config is in `drizzle.config.ts` - requires `DATABASE_URL` env var.

## Constants and Configuration

Key configuration lives in `client/src/lib/constants.ts`:

- `SITE_CONFIG` - Site metadata (title, email)
- `SOCIAL_LINKS` - Social media links (Instagram, Facebook, X)
- `NAV_SECTIONS` - Navigation menu configuration
- `JOURNEY_STATS` - Journey statistics per language

Update these constants instead of hardcoding values in components.
