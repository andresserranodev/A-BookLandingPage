# Design Guidelines for "Un Andrés Más" Landing Page

## Design Approach

**Reference-Based Approach**: Drawing inspiration from modern product landing pages like Stripe, Apple product pages, and Medium for clean, content-focused storytelling. The design emphasizes visual journey narrative with restrained elegance.

## Core Design Principles

1. **Journey-Driven Narrative**: Visual hierarchy guides users through the story
2. **Authentic Adventure Aesthetic**: Raw, honest imagery over polished perfection
3. **Breathing Room**: Generous whitespace lets content breathe
4. **Mobile-First Storytelling**: Experience optimized for on-the-go reading

## Typography System

**Font Stack**: Google Fonts via CDN

- **Display**: Playfair Display (900) for book title - literary, elegant
- **Headings**: Inter (700) for section titles - clean, modern
- **Body**: Inter (400, 500) for all body text - highly readable

**Scale**:

- Hero title: text-6xl md:text-8xl (dramatic impact)
- Section headings: text-3xl md:text-5xl
- Subheadings: text-xl md:text-2xl
- Body text: text-base md:text-lg (enhanced readability)
- Footer text: text-sm

## Layout System

**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16, 20, 24

- Section padding: py-16 md:py-24 (generous vertical rhythm)
- Container max-width: max-w-6xl
- Content max-width: max-w-3xl (optimal reading)
- Grid gaps: gap-8 md:gap-12

**Breakpoints**: Mobile-first with md: (768px) and lg: (1024px) refinements

## Section Specifications

### 1. Hero Section (80vh minimum)

- **Layout**: Full-width with centered content overlay
- **Image**: Large background image of motorcycle on open road through South American landscape - dramatic, cinematic composition
- **Content**:
  - Book title (Playfair Display, ultra-bold)
  - Subtitle: "A Motorcycle Journey from Colombia to Patagonia" (Inter medium)
  - Pre-order button with backdrop-blur-md background treatment
- **Mobile**: Stack vertically, reduce title size, maintain image impact

### 2. About the Book Section

- **Layout**: Two-column on desktop (lg:grid-cols-2), single column mobile
- **Left Column**:
  - Section heading
  - 2-3 paragraph summary (compelling narrative hook)
  - Key journey highlights in clean list format
- **Right Column**:
  - Placeholder for book cover image (aspect-ratio-[2/3])
  - "Available Spring 2024" text beneath
- **Spacing**: py-20 md:py-32

### 3. Journey Highlights Section (New Addition)

- **Layout**: Three-column grid (grid-cols-1 md:grid-cols-3)
- **Cards**:
  - Icon from Heroicons (map-pin, camera, heart)
  - Bold heading (e.g., "15,000 Miles", "7 Countries", "Countless Stories")
  - Brief descriptive text
- **Treatment**: Subtle borders, ample padding (p-8)

### 4. About the Author Section

- **Layout**: Single column, centered, max-w-3xl
- **Content**:
  - Section heading
  - Author photo (rounded-full, w-32 h-32 md:w-40 md:h-40, centered)
  - Author bio (2-3 paragraphs, first-person narrative voice)
  - "Follow the Journey" subheading with social preview

### 5. Pre-Order CTA Section

- **Layout**: Centered, max-w-2xl
- **Content**:
  - Bold headline: "Reserve Your Copy"
  - Supporting text about pre-order benefits
  - Prominent CTA button
  - Trust indicator: "Join 500+ readers on the waitlist"
- **Treatment**: py-24 md:py-32 for emphasis

### 6. Footer

- **Layout**: Three-section grid (grid-cols-1 md:grid-cols-3)
- **Left**: Book title and tagline
- **Center**: Social media icons (Instagram, Facebook, Twitter) using Heroicons with social-icon class
- **Right**: "© 2024 Un Andrés Más" and contact email
- **Spacing**: py-12, balanced padding

## Component Library

### Buttons

- **Primary CTA**: Large padding (px-8 py-4), bold text (font-semibold), rounded-lg
- **Hero button**: backdrop-blur-md for readability over images
- **Hover states**: Subtle scale and opacity transitions (transition-all duration-200)

### Cards (Journey Highlights)

- Border treatment with rounded-xl
- Padding: p-6 md:p-8
- Hover: subtle lift effect (hover:-translate-y-1)

### Images

- **Hero**: Full-width background (object-cover, object-center)
- **Book cover**: Drop shadow for depth (shadow-2xl)
- **Author photo**: Circular with subtle border

### Icons

- **Library**: Heroicons via CDN (outline style)
- **Size**: w-6 h-6 for social, w-8 h-8 for feature icons
- **Usage**: Journey stats, social media, decorative accents

## Images Required

1. **Hero Background**: Dramatic motorcycle on winding South American road - sunset/golden hour lighting, sense of adventure and open horizon
2. **Book Cover**: Placeholder for professional cover design (2:3 aspect ratio)
3. **Author Photo**: Authentic portrait, preferably from journey or with motorcycle

## Responsive Behavior

- **Hero**: Maintain image impact, reduce title from text-8xl to text-6xl on mobile
- **Grids**: All multi-column layouts collapse to single column on mobile
- **Typography**: Scale down by 1-2 sizes on mobile (text-5xl → text-3xl)
- **Spacing**: Reduce section padding from py-32 to py-16 on mobile
- **Images**: Maintain aspect ratios, use object-cover for cropping
- **Navigation**: Sticky header on scroll (optional smooth-scroll behavior)

## Accessibility

- Semantic HTML5 structure (header, main, section, footer)
- ARIA labels on icon-only buttons
- Focus states on all interactive elements (ring-2 ring-offset-2)
- Sufficient contrast ratios for all text
- Alt text for all images describing journey moments

## Performance Considerations

- Optimize hero image for web (compress, use appropriate format)
- Lazy load below-fold images
- Single font family loading (Inter with Playfair Display for title only)
- Minimal animation budget (subtle hover effects only)
