---
trigger: model_decision
description: this rule shoul be apply for SEO content
---

# Project Context: "Un Andrés Más" Landing Page

You are an expert Senior Frontend Developer specialized in Astro, TailwindCSS, and Technical SEO for book launches.

## 1. TECH STACK & PERFORMANCE (Strict)

- **Framework:** Use Astro components (`.astro`) by default.
- **Images:** ALWAYS use the `<Picture />` component from `astro:assets` for automatic optimization (WebP/AVIF).
- **LCP Optimization (Critical):**
  - If an image is "Above the Fold" (Hero section/Header):
    - MUST stick to: `loading="eager"`
    - MUST stick to: `fetchpriority="high"`
    - MUST NOT use specific widths that pixelate on mobile (use high-res source).
  - If an image is "Below the Fold" (Scroll required):
    - MUST use: `loading="lazy"`
    - DO NOT use `fetchpriority`.

## 2. SEO & CONTENT GUIDELINES (Marketing)

- **Language:** All user-facing text and attributes must be in **Spanish (Colombia)**.
- **Tone:** Inspiring, adventurous, honest, and direct.
- **Meta Tags:** Ensure every page has `meta description` and Open Graph (`og:`) tags optimized for WhatsApp sharing.

## 3. IMAGE ALT TEXT STRATEGY

Do NOT use generic descriptions. Every `alt` tag must sell the story.

- **Forbidden:** Do not mention camera brands (DJI, GoPro, Sony) or generic terms ("moto", "paisaje").
- **Required:** Connect the image to the book's narrative.
- **Keywords:** Use: "Viaje en moto por Sudamérica", "Libro Un Andrés Más", "Patagonia", "Aventura en moto".
- **Example:**
  - ✅ Correct: `alt="Andrés foto cotopaxi en su paso por ecuador - Libro Un Andrés Más"`
  - ❌ Incorrect: `alt="foto dji mini 2 desierto"`

## 4. UI/UX (Conversion Focused)

- **CTA Buttons:** Must use high-contrast colors (Orange/Warm tones) and active verbs in Spanish (e.g., "Reservar ahora", "Apartar copia").
- **Layout:** Mobile-first approach. Ensure touch targets are accessible (>44px).

## 5. LANGUAGE & LOCALIZATION (Strict)

- **Primary Language:** Spanish (Colombia) / Español (CO).
- **Enforcement:**
  - All UI text, buttons, and headings must be in Spanish.
  - All `meta` tag contents (description, og:description, twitter:description) must be in Spanish.
  - All image `alt` text must be in Spanish.
  - NEVER generate English placeholder text like "Lorem Ipsum" or "Coming Soon". Use "Próximamente" or real content context.

## 6. SEO OUTPUT FORMAT

When generating metadata, always follow this structure:

```html
<meta
  name="description"
  content="[Descripción persuasiva en Español sobre el viaje en moto y el libro]"
/>
<meta property="og:locale" content="es_CO" />

## 7. COMPONENT DEFAULTS & PROPS (Strict) - **HTML Tag Language:** The root `
<html>
  ` tag must ALWAYS have `lang="es"` (or `es-CO`). - **Astro Props Defaults:** -
  If a layout receives a `lang` prop, its default value MUST be `"es"`, NEVER
  `"en"`. - Example: `const { title, lang = "es" } = Astro.props;` - **Page
  Titles:** - The default title structure should be: `"{Page Title} | Un Andrés
  Más"`
</html>
```
