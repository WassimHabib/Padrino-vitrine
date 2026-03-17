# Padrino Pizzeria - Website Modernization Design Spec

## Overview

Modernization of the existing Padrino pizzeria website (lepadrino.fr) from a static HTML/Bootstrap/jQuery site to a modern, animated, user-friendly site. The site serves 5 locations in Ile-de-France (Le Blanc-Mesnil, Villepinte, Drancy, Aulnay-sous-Bois, Sevran).

**Critical constraint:** Preserve all existing Google SEO rankings and indexed pages.

**Design inspiration:** [Pizza Cosy](https://www.pizzacosy.fr/) — clear navigation, product grids, visible CTAs. Adapted with a fun/energetic street food style and dynamic pizza animations.

---

## Architecture

### Approach: Full rebuild from scratch

Rebuild every page from zero with modern tooling while preserving all URLs, meta tags, and SEO elements. The old site (`Site_old/`) is kept as reference.

### File Structure

```
padrino-site-vitrine/
├── Site_old/                    # Current production site (reference)
├── Padrino/                     # New site (deploy-ready)
│   ├── index.html
│   ├── pizza.html
│   ├── pasta.html
│   ├── texmex.html
│   ├── salades.html
│   ├── dessert.html
│   ├── offres.html
│   ├── commande.html
│   ├── mention-legale.html
│   ├── pizzeria-villepinte.html
│   ├── pizzeria-drancy.html
│   ├── pizzeria-aulnay-sous-bois.html
│   ├── pizzeria-Sevran.html
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── css/
│   │   └── output.css           # Tailwind compiled
│   ├── js/
│   │   ├── main.js              # Navigation, scroll, UI logic
│   │   └── animations.js        # All GSAP animations
│   ├── img/                     # Images (reused + optimized)
│   ├── fonts/                   # Custom fonts (KGHAPPY, Appleberry)
│   └── fav/                     # Favicons and PWA assets
├── tailwind.config.js
└── package.json                 # Tailwind CLI + GSAP
```

**Deployment:** Copy the contents of `Padrino/` directly to the production server. No build step needed on the server.

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| CSS | Tailwind CSS 3 (CLI) | Compiled to single `output.css` |
| JS | Vanilla ES6+ | No jQuery, no framework |
| Animations | GSAP 3 + ScrollTrigger (CDN) | GPU-accelerated transforms |
| Fonts | KGHAPPY, Appleberry (local), Inter/Poppins (CDN) | Brand continuity + readability |
| Icons | Font Awesome 6 (CDN) | Same as current site |
| Analytics | GTM (GTM-TLC6SN4) + GA4 (G-PMLY65YTLL) | Unchanged |
| Ordering | Dishop (lepadrino.dishop.co) | External link, unchanged |
| Delivery | JustEat, Deliveroo, Uber Eats | External links, unchanged |

### Dev Workflow

- `npm run dev` — Tailwind watch mode for development
- `npm run build` — Tailwind minified output for production
- No bundler (no Vite, no Webpack). Just Tailwind CLI.

---

## SEO Preservation Strategy

### Preserved Identically

- All file names (= same URLs)
- `<title>` and `<meta name="description">` per page
- `<meta name="keywords">` per page
- Schema.org BreadcrumbList (JSON-LD)
- `sitemap.xml` (with updated `lastmod` dates)
- `robots.txt`
- `manifest.json` and all favicon assets
- GTM + GA4 scripts in `<head>`
- `lang="fr"` attribute on every page

### Improved

- Add `<link rel="canonical">` on every page (currently missing)
- Add Open Graph tags (`og:title`, `og:description`, `og:image`) for social sharing
- Replace hidden `.notVisible` div content with visible, well-designed content integrated into the layout (reduces risk of Google flagging as keyword stuffing)
- Update `lastmod` dates in sitemap
- Add Schema.org `Restaurant` and `LocalBusiness` structured data for each location page

### Per-Page Verification

Every page will be checked with a before/after comparison to ensure no SEO element is lost during the rebuild.

---

## Visual Design

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Rouge Padrino | `#ed1c24` | Primary, CTAs, buttons |
| Vert Padrino | `#5abc71` | Secondary, accents, trust elements |
| Orange | `#ff6b35` | Hover states, dynamic elements |
| Jaune | `#ffc107` | Highlights, stars, promo badges |
| Marron fonce | `#5b1212` | Text, header |
| Blanc casse | `#fff8f0` | Main background (warm, not pure white) |
| Noir | `#1a1a1a` | Footer, contrasts |

Red and green are the two dominant colors (matching the logo). Orange and yellow support the fun/energetic vibe.

### Typography

- **KGHAPPY** — Headings, catchphrases (brand identity, kept from current site)
- **Appleberry** — Decorative, subtitles
- **Inter or Poppins** — Body text, clean and readable

### Navigation (Pizza Cosy inspired)

- **Top info bar:** Opening hours + phone numbers
- **Sticky header:** Logo left, horizontal menu center, "Commander" + "Appeler" buttons right
- **Mobile:** Hamburger top-right, slide-in panel from the right, semi-transparent backdrop

### Product Cards (menu pages)

- Responsive grid of cards: product photo, name, short description, price
- Hover: slight rotation (5deg) + shadow + photo zoom
- Rounded corners, soft shadow, white card on cream background

### CTAs

- "Commander" button: red, rounded, always visible
- "Appeler" button: green, secondary
- Mobile: fixed bottom bar with both buttons (same as current site)

### Footer

- Dark brown/black background
- 5 location addresses with phone numbers
- Opening hours, useful links, social media
- Delivery platform logos (JustEat, Deliveroo, Uber Eats)

---

## GSAP Animations

### Page Load

- Logo: slight rotation on entry
- Header elements: staggered slide-in from top
- Hero slider: fade-in + scale

### Scroll-Triggered (ScrollTrigger)

- Product cards: staggered fade-up cascade
- Sections: alternate slide-in from left/right
- Numbers (ratings, prices): count-up animation
- Section titles: subtle bounce entrance

### Floating Decorative Elements (continuous)

- Small pizza slices drifting slowly in background
- Basil leaves, tomatoes, mushrooms floating gently
- Positioned absolute, SVG or transparent PNG
- Subtle opacity (0.15-0.3) to not interfere with content
- Max 5-8 elements per page on desktop, 3 on mobile

### Interaction

- Card hover: pizza rotates slightly (rotate 5deg) + photo zoom
- CTA hover: scale up + smooth color change
- "Commander" click: small pizza "flies" toward the button

### Performance

- All animations disabled when user has `prefers-reduced-motion` enabled
- GSAP uses GPU-accelerated transforms only (no layout shifts)
- Reduced animations on mobile (fewer particles, shorter durations)

---

## Page Structure

### Common Template (all pages)

1. Top info bar (hours + phone)
2. Sticky header (logo, nav, CTAs)
3. Page-specific content
4. Delivery platforms section
5. Footer
6. Floating pizza elements (background)

### Homepage (index.html)

1. Hero slider with promotions ("1 achetee = 1 offerte")
2. Signature specialties grid (Tartufo, Pesto-Saumon, Di-Buffala)
3. Menu categories grid (4x2 clickable: pizza, pasta, tex-mex, etc.)
4. Mobile app promo banner + promo code BIENV10
5. About section (fast-casual concept)
6. Customer testimonials
7. "Our restaurants" section with 5 locations

### Menu Pages (pizza.html, pasta.html, texmex.html, salades.html, dessert.html)

1. Title banner with themed background image
2. Product cards grid (photo, name, description, price)
3. CTA banner "Commander maintenant"
4. Links to other menu categories

### Location Pages (pizzeria-villepinte.html, etc.)

1. Title banner with city name
2. Address, phone, hours
3. Embedded Google Maps
4. Summary menu / links to full menus
5. Location-specific order CTA

### Utility Pages

- offres.html: Current promotions grid
- commande.html: Dishop redirect/integration
- mention-legale.html: Legal content, minimal design

---

## Responsive Design

### Breakpoints

- Mobile: < 640px (primary target — majority of pizzeria traffic)
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Mobile-First Approach

- Product grids: 3 columns (desktop) → 2 (tablet) → 1 (mobile)
- Images: lazy-loaded (`loading="lazy"`), WebP with JPG/PNG fallback
- Floating GSAP elements: reduced to 3 max on mobile
- GSAP animations: lighter on mobile (fewer particles, shorter durations)

### Mobile-Specific

- Fixed bottom action bar: "Commander" (red) + "Appeler" (green)
- Hamburger menu with slide-in panel
- Touch-optimized card sizes and tap targets

### Performance

- Images in WebP format with fallback
- Native lazy loading on all images
- CSS and JS minified for production
- GSAP animations use GPU transforms only
