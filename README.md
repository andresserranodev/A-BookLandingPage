<div align="center">

[![Deploy Status](https://github.com/andresserranodev/A-BookLandingPage/actions/workflows/deploy.yml/badge.svg)](https://github.com/andresserranodev/A-BookLandingPage/actions/workflows/deploy.yml)
[![CodeFactor](https://www.codefactor.io/repository/github/andresserranodev/booklanding/badge)](https://www.codefactor.io/repository/github/andresserranodev/booklanding)
[![codecov](https://codecov.io/gh/andresserranodev/A-BookLandingPage/graph/badge.svg?token=EFQ1WK1I5S)](https://codecov.io/gh/andresserranodev/A-BookLandingPage)
[![npm version](https://img.shields.io/badge/npm-1.0.0-blue.svg)](package.json)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/withastro/astro/blob/main/LICENSE)

</div>

# Patagonia Pages - Astro

This project has been migrated from React to Astro. It is a multi-page application (MPA) that supports English and Spanish localization.

This landing page was created to promote a self-published book about a motorcycle journey from Colombia to Patagonia. The project was developed using an AI-augmented development approach with **Claude Code** and **Google's AI development tools**

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

- **Spanish(Default)**: `https://andresserranodev.github.io/A-BookLandingPage/`
- **English**: `https://andresserranodev.github.io/A-BookLandingPage/en`

## Deployment

The project is configured for GitHub Pages with the base URL `/A-BookLandingPage`. If deploying to a different environment, update the `base` property in `astro.config.mjs`.
