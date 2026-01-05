# Patagonia Pages - Astro Migration

This project has been migrated from React to Astro. It is a multi-page application (MPA) that supports English and Spanish localization.

## Project Structure

- `src/pages/index.astro`: Entry point for the English version (`/`).
- `src/pages/es/index.astro`: Entry point for the Spanish version (`/es`).
- `src/components/`: Shared React components.
- `src/layouts/`: Astro layout definitions.
- `src/assets/`: Static assets (images).

## Getting Started

### Prerequisites

Ensure you have Node.js installed on your machine.

### Installation

Install the dependencies:

```bash
npm install
```

### Development

To start the local development server:

```bash
npm run dev
# or
npm start
```

The site will be available at `http://localhost:4321`.

### Production Build

To build the project for production:

```bash
npm run build
```

The output will be in the `dist/` directory.

### Local Preview

To preview the production build locally:

```bash
npm run preview
```

## Localization

The site uses URL-based localization:
- **English (Default)**: `http://localhost:4321/`
- **Spanish**: `http://localhost:4321/es`

## Deployment

The project is configured for GitHub Pages with the base URL `/A-BookLandingPage`. If deploying to a different environment, update the `base` property in `astro.config.mjs`.
