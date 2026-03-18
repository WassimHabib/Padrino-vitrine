# Padrino Pizzeria Website Modernization - Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Padrino pizzeria website with Tailwind CSS, vanilla JS, and GSAP animations while preserving all SEO rankings.

**Architecture:** Full rebuild from scratch into `Padrino/` folder. Static HTML pages with Tailwind CSS for styling, GSAP for animations, vanilla JS for interactivity. Same file names as production site to preserve URLs. Common header/footer template replicated across all 13 pages.

**Tech Stack:** Tailwind CSS 3 (CLI), GSAP 3 + ScrollTrigger (CDN), vanilla ES6+, Font Awesome 6 (CDN), Poppins (Google Fonts CDN)

**Spec:** `docs/superpowers/specs/2026-03-17-padrino-modernization-design.md`

**Reference site:** `Site_old/` contains the current production site with all content, images, and SEO data.

---

## File Map

| File | Responsibility |
|------|---------------|
| `package.json` | Dev dependencies: Tailwind CLI |
| `tailwind.config.js` | Color palette, fonts, custom config |
| `Padrino/css/input.css` | Tailwind directives, font-face, base styles, component classes |
| `Padrino/css/output.css` | Compiled Tailwind output (build artifact, committed for no-build deploy) |
| `Padrino/js/main.js` | Sticky header, mobile menu, phone modal, scroll behavior |
| `Padrino/js/animations.js` | All GSAP: page load, scroll triggers, floating elements, hover |
| `Padrino/index.html` | Homepage (Le Blanc-Mesnil main location) |
| `Padrino/pizza.html` | Pizza menu page |
| `Padrino/pasta.html` | Pasta & panini menu page |
| `Padrino/texmex.html` | Tex-mex menu page |
| `Padrino/salades.html` | Salads & gratins menu page |
| `Padrino/dessert.html` | Desserts & drinks menu page |
| `Padrino/offres.html` | Promotions page |
| `Padrino/commande.html` | Order page (links to Dishop) |
| `Padrino/mention-legale.html` | Legal notice page |
| `Padrino/pizzeria-villepinte.html` | Villepinte location page |
| `Padrino/pizzeria-drancy.html` | Drancy location page |
| `Padrino/pizzeria-aulnay-sous-bois.html` | Aulnay-sous-Bois location page |
| `Padrino/pizzeria-Sevran.html` | Sevran location page (capital S intentional) |
| `Padrino/sitemap.xml` | Updated sitemap with all pages |
| `Padrino/robots.txt` | Robots file |
| `Padrino/img/` | Images copied from `Site_old/img/` |
| `Padrino/img/floating/` | New SVG decorative elements for animations |
| `Padrino/fonts/` | Fonts copied from `Site_old/fonts/` (KGHAPPY, Appleberry) |
| `Padrino/fav/` | Favicons copied from `Site_old/fav/` |

---

## Chunk 1: Project Setup & Common Template

### Task 1: Initialize project and Tailwind

**Files:**
- Create: `package.json`
- Create: `tailwind.config.js`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "padrino-site-vitrine",
  "version": "1.0.0",
  "scripts": {
    "dev": "npx tailwindcss -i ./Padrino/css/input.css -o ./Padrino/css/output.css --watch",
    "build": "npx tailwindcss -i ./Padrino/css/input.css -o ./Padrino/css/output.css --minify"
  },
  "devDependencies": {
    "tailwindcss": "^3.4"
  }
}
```

- [ ] **Step 2: Create Tailwind config**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./Padrino/**/*.html"],
  theme: {
    extend: {
      colors: {
        'padrino-red': '#ed1c24',
        'padrino-green': '#5abc71',
        'padrino-orange': '#ff6b35',
        'padrino-yellow': '#ffc107',
        'padrino-brown': '#5b1212',
        'padrino-cream': '#fff8f0',
        'padrino-dark': '#1a1a1a',
      },
      fontFamily: {
        'kghappy': ['KGHAPPY', 'cursive'],
        'appleberry': ['Appleberry', 'cursive'],
        'body': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 3: Create Tailwind input CSS**

Create `Padrino/css/input.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@font-face {
  font-family: 'KGHAPPY';
  src: url('../fonts/KGHAPPY.ttf') format('truetype');
  font-display: swap;
}

@font-face {
  font-family: 'Appleberry';
  src: url('../fonts/appleberry.ttf') format('truetype');
  font-display: swap;
}

@layer base {
  body {
    @apply font-body bg-padrino-cream text-padrino-brown;
  }
  h1, h2, h3 {
    @apply font-kghappy;
  }
}

@layer components {
  .btn-commander {
    @apply bg-padrino-red text-white font-bold py-3 px-6 rounded-full
           hover:bg-padrino-orange hover:scale-105 transition-all duration-300;
  }
  .btn-appeler {
    @apply bg-padrino-green text-white font-bold py-3 px-6 rounded-full
           hover:bg-green-600 hover:scale-105 transition-all duration-300;
  }
  .product-card {
    @apply bg-white rounded-2xl shadow-md overflow-hidden
           hover:shadow-xl transition-all duration-300;
  }
}
```

- [ ] **Step 4: Install dependencies and compile**

Run: `npm install`
Run: `npm run build`
Expected: `Padrino/css/output.css` generated with Tailwind classes.

- [ ] **Step 5: Commit**

```bash
git add package.json tailwind.config.js Padrino/css/input.css Padrino/css/output.css
git commit -m "feat: initialize project with Tailwind CSS config and Padrino color palette"
```

---

### Task 2: Copy static assets from old site

**Files:**
- Copy: `Site_old/img/` → `Padrino/img/`
- Copy: `Site_old/fonts/KGHAPPY.ttf`, `Site_old/fonts/appleberry.ttf` → `Padrino/fonts/`
- Copy: `Site_old/fav/` → `Padrino/fav/`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p Padrino/img Padrino/fonts Padrino/fav Padrino/js Padrino/img/floating
```

- [ ] **Step 2: Copy images**

```bash
cp -r Site_old/img/* Padrino/img/
```

- [ ] **Step 3: Copy required fonts only**

```bash
cp Site_old/fonts/KGHAPPY.ttf Padrino/fonts/
cp Site_old/fonts/appleberry.ttf Padrino/fonts/
```

Note: Font Awesome is loaded via CDN. Other old fonts are not needed.

- [ ] **Step 4: Copy favicons**

```bash
cp -r Site_old/fav/* Padrino/fav/
```

- [ ] **Step 5: Commit**

```bash
git add Padrino/fonts/ Padrino/fav/
git commit -m "feat: copy fonts and favicons from old site"
```

Note: Images are too large for git tracking — add to `.gitignore` or commit selectively. For now, add only fonts and favicons.

---

### Task 3: Create floating decorative SVG assets

**Files:**
- Create: `Padrino/img/floating/pizza-slice.svg`
- Create: `Padrino/img/floating/basil-leaf.svg`
- Create: `Padrino/img/floating/tomato.svg`
- Create: `Padrino/img/floating/mushroom.svg`
- Create: `Padrino/img/floating/cheese.svg`

- [ ] **Step 1: Create pizza slice SVG**

Create `Padrino/img/floating/pizza-slice.svg` — a simple flat-design pizza slice icon. Triangular shape with yellow/orange crust, red sauce, and white cheese dots. Viewbox 100x100, lightweight (<2KB).

- [ ] **Step 2: Create basil leaf SVG**

Create `Padrino/img/floating/basil-leaf.svg` — a simple green basil leaf shape. Single path, green fill (#5abc71). Viewbox 60x80, lightweight.

- [ ] **Step 3: Create tomato SVG**

Create `Padrino/img/floating/tomato.svg` — a round red tomato with small green stem. Two paths max. Viewbox 60x60.

- [ ] **Step 4: Create mushroom SVG**

Create `Padrino/img/floating/mushroom.svg` — a simple mushroom silhouette. Beige/tan color. Viewbox 60x70.

- [ ] **Step 5: Create cheese SVG**

Create `Padrino/img/floating/cheese.svg` — a triangular cheese wedge with holes. Yellow (#ffc107). Viewbox 60x50.

- [ ] **Step 6: Commit**

```bash
git add Padrino/img/floating/
git commit -m "feat: add floating decorative SVG assets for animations"
```

---

### Task 4: Build common HTML head template

This task creates a reference `<head>` block that will be used as a template for all pages. Each page will have its own SEO-specific values inserted.

**Files:**
- Create: `Padrino/index.html` (initial shell only — will be completed in Task 7)

- [ ] **Step 1: Create index.html with full head**

The `<head>` block for every page follows this pattern. Values in `{{BRACKETS}}` are replaced per-page.

```html
<!DOCTYPE html>
<html class="no-js" lang="fr">
<head>
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-TLC6SN4');</script>
    <!-- End Google Tag Manager -->
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-PMLY65YTLL"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-PMLY65YTLL');
    </script>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>{{PAGE_TITLE}}</title>
    <meta name="description" content="{{PAGE_DESCRIPTION}}">
    <meta name="keywords" content="{{PAGE_KEYWORDS}}">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- SEO: Canonical + Open Graph -->
    <link rel="canonical" href="https://www.lepadrino.fr/{{PAGE_FILE}}">
    <meta property="og:title" content="{{PAGE_TITLE}}">
    <meta property="og:description" content="{{OG_DESCRIPTION}}">
    <meta property="og:image" content="https://www.lepadrino.fr/img/logo.png">
    <meta property="og:url" content="https://www.lepadrino.fr/{{PAGE_FILE}}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="fr_FR">

    <!-- Favicons -->
    <link rel="apple-touch-icon" sizes="57x57" href="fav/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="fav/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="fav/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="fav/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="fav/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="fav/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="fav/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="fav/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="fav/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="fav/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="fav/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="fav/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="fav/favicon-16x16.png">
    <link rel="manifest" href="fav/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="fav/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">

    <!-- CSS -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer">
    <link rel="stylesheet" href="css/output.css">

    <!-- Structured Data -->
    {{STRUCTURED_DATA_JSON_LD}}
</head>
```

Write the full `index.html` using this template with the actual SEO values from `Site_old/index.html`. For the body, add only placeholder comments for now — the body will be built in Task 5 and Task 7.

```html
<body class="bg-padrino-cream font-body">
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TLC6SN4"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

    <!-- HEADER (Task 5) -->
    <!-- MAIN CONTENT (Task 7) -->
    <!-- FOOTER (Task 5) -->

    <!-- JS -->
    <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
    <script src="js/main.js"></script>
    <script src="js/animations.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify SEO parity**

Open `Site_old/index.html` and compare:
- Title tag: must match exactly
- Meta description: must match exactly
- Meta keywords: must match exactly
- JSON-LD BreadcrumbList: must match structure
- GTM snippet: must match
- GA4 snippet: must match
- Favicon links: must match

- [ ] **Step 3: Commit**

```bash
git add Padrino/index.html
git commit -m "feat: create index.html shell with SEO-preserved head and GSAP CDN"
```

---

### Task 5: Build header, footer, and phone modal

**Files:**
- Modify: `Padrino/index.html` (add header + footer HTML)
- Create: `Padrino/js/main.js`

- [ ] **Step 1: Add top info bar and header to index.html**

Insert after the `<noscript>` GTM tag:

```html
<!-- Top Info Bar -->
<div class="bg-padrino-brown text-white text-center py-2 text-sm font-body">
    <p>
        <i class="fas fa-phone-alt"></i> Le Blanc-Mesnil <a href="tel:0145912593" class="underline hover:text-padrino-yellow">01 45 91 25 93</a>
        <span class="mx-2">|</span>
        Villepinte <a href="tel:0143836407" class="underline hover:text-padrino-yellow">01 43 83 64 07</a>
        <span class="mx-2">|</span>
        <i class="fas fa-clock"></i> Ouvert 7J/7 de 11H30 a 15H et de 18H a 23H
    </p>
</div>

<!-- Header -->
<header id="main-header" class="bg-white shadow-md sticky top-0 z-50 transition-shadow duration-300">
    <div class="container mx-auto px-4 flex items-center justify-between h-20">
        <!-- Logo -->
        <a href="index.html" class="flex-shrink-0">
            <img src="img/logo.webp" alt="Padrino Pizza" class="h-14" loading="eager">
        </a>

        <!-- Desktop Nav -->
        <nav class="hidden lg:flex items-center gap-8 font-body font-medium text-padrino-brown">
            <a href="index.html" class="hover:text-padrino-red transition-colors">Accueil</a>
            <a href="pizza.html" class="hover:text-padrino-red transition-colors">Pizzas</a>
            <a href="pasta.html" class="hover:text-padrino-red transition-colors">Pastas</a>
            <a href="texmex.html" class="hover:text-padrino-red transition-colors">Tex-Mex</a>
            <a href="salades.html" class="hover:text-padrino-red transition-colors">Salades</a>
            <a href="dessert.html" class="hover:text-padrino-red transition-colors">Desserts</a>
            <a href="offres.html" class="hover:text-padrino-red transition-colors">Offres</a>
        </nav>

        <!-- CTA Buttons -->
        <div class="hidden lg:flex items-center gap-3">
            <a href="https://lepadrino.dishop.co" target="_blank" rel="noopener" class="btn-commander">
                <i class="fas fa-shopping-bag mr-2"></i>Commander
            </a>
            <button id="btn-appeler-desktop" class="btn-appeler" type="button">
                <i class="fas fa-phone-alt mr-2"></i>Appeler
            </button>
        </div>

        <!-- Mobile Hamburger -->
        <button id="mobile-menu-btn" class="lg:hidden text-padrino-brown text-2xl" type="button" aria-label="Menu">
            <i class="fas fa-bars"></i>
        </button>
    </div>
</header>

<!-- Mobile Slide-in Menu -->
<div id="mobile-menu" class="fixed inset-0 z-[60] pointer-events-none">
    <div id="mobile-menu-backdrop" class="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300"></div>
    <div id="mobile-menu-panel" class="absolute right-0 top-0 h-full w-72 bg-white shadow-2xl translate-x-full transition-transform duration-300 flex flex-col">
        <div class="flex items-center justify-between p-4 border-b">
            <img src="img/logo.webp" alt="Padrino" class="h-10">
            <button id="mobile-menu-close" class="text-2xl text-padrino-brown" type="button" aria-label="Fermer">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <nav class="flex flex-col gap-1 p-4 font-body font-medium text-padrino-brown">
            <a href="index.html" class="py-3 px-4 rounded-lg hover:bg-padrino-cream transition-colors">Accueil</a>
            <a href="pizza.html" class="py-3 px-4 rounded-lg hover:bg-padrino-cream transition-colors">Pizzas</a>
            <a href="pasta.html" class="py-3 px-4 rounded-lg hover:bg-padrino-cream transition-colors">Pastas</a>
            <a href="texmex.html" class="py-3 px-4 rounded-lg hover:bg-padrino-cream transition-colors">Tex-Mex</a>
            <a href="salades.html" class="py-3 px-4 rounded-lg hover:bg-padrino-cream transition-colors">Salades</a>
            <a href="dessert.html" class="py-3 px-4 rounded-lg hover:bg-padrino-cream transition-colors">Desserts</a>
            <a href="offres.html" class="py-3 px-4 rounded-lg hover:bg-padrino-cream transition-colors">Offres</a>
        </nav>
    </div>
</div>

<!-- Phone Modal -->
<div id="phone-modal" class="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-300">
    <div class="absolute inset-0 bg-black/50"></div>
    <div class="relative bg-white rounded-2xl shadow-2xl p-8 mx-4 max-w-sm w-full transform scale-95 transition-transform duration-300">
        <button id="phone-modal-close" class="absolute top-3 right-3 text-gray-400 hover:text-padrino-brown text-xl" type="button" aria-label="Fermer">
            <i class="fas fa-times"></i>
        </button>
        <h3 class="font-kghappy text-2xl text-padrino-brown text-center mb-6">Appelez-nous !</h3>
        <div class="flex flex-col gap-4">
            <a href="tel:0145912593" class="flex items-center justify-between bg-padrino-green text-white rounded-xl py-4 px-6 hover:bg-green-600 transition-colors">
                <span class="font-semibold">Le Blanc-Mesnil</span>
                <span>01 45 91 25 93</span>
            </a>
            <a href="tel:0143836407" class="flex items-center justify-between bg-padrino-green text-white rounded-xl py-4 px-6 hover:bg-green-600 transition-colors">
                <span class="font-semibold">Villepinte</span>
                <span>01 43 83 64 07</span>
            </a>
        </div>
    </div>
</div>

<!-- Mobile Fixed Bottom Bar -->
<div class="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex">
    <a href="https://lepadrino.dishop.co" target="_blank" rel="noopener"
       class="flex-1 flex items-center justify-center gap-2 py-4 bg-padrino-red text-white font-bold text-sm">
        <i class="fas fa-shopping-bag"></i> COMMANDER
    </a>
    <button id="btn-appeler-mobile" type="button"
            class="flex-1 flex items-center justify-center gap-2 py-4 bg-padrino-green text-white font-bold text-sm">
        <i class="fas fa-phone-alt"></i> APPELER
    </button>
</div>
```

- [ ] **Step 2: Add footer to index.html**

Insert before the `<script>` tags at the bottom:

```html
<!-- Delivery Platforms -->
<section class="py-12 bg-white">
    <div class="container mx-auto px-4 text-center">
        <h2 class="font-kghappy text-3xl text-padrino-brown mb-8">Retrouvez-nous aussi sur</h2>
        <div class="flex flex-wrap items-center justify-center gap-8">
            <a href="https://www.just-eat.fr/menu/le-padrino" target="_blank" rel="noopener">
                <img src="img/comment/justeat.png" alt="Just Eat" class="h-16 hover:scale-110 transition-transform" loading="lazy">
            </a>
            <a href="https://deliveroo.fr/fr/menu/le-blanc-mesnil/le-padrino" target="_blank" rel="noopener">
                <img src="img/comment/deliveroo.png" alt="Deliveroo" class="h-16 hover:scale-110 transition-transform" loading="lazy">
            </a>
            <a href="https://www.ubereats.com/fr/store/le-padrino" target="_blank" rel="noopener">
                <img src="img/comment/ubereats.png" alt="Uber Eats" class="h-16 hover:scale-110 transition-transform" loading="lazy">
            </a>
        </div>
    </div>
</section>

<!-- Footer -->
<footer class="bg-padrino-dark text-white py-12 pb-24 lg:pb-12">
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <!-- Logo & About -->
            <div>
                <img src="img/logo.webp" alt="Padrino Pizza" class="h-12 mb-4 brightness-0 invert">
                <p class="text-gray-400 text-sm">Pizzeria artisanale, fast-casual. Des pizzas fraiches preparees avec des ingredients de qualite.</p>
            </div>
            <!-- Le Blanc-Mesnil -->
            <div>
                <h4 class="font-kghappy text-lg text-padrino-yellow mb-3">Le Blanc-Mesnil</h4>
                <p class="text-gray-400 text-sm mb-1"><i class="fas fa-map-marker-alt mr-2"></i>Le Blanc-Mesnil, 93150</p>
                <p class="text-gray-400 text-sm mb-1"><i class="fas fa-phone-alt mr-2"></i><a href="tel:0145912593" class="hover:text-white">01 45 91 25 93</a></p>
                <p class="text-gray-400 text-sm"><i class="fas fa-clock mr-2"></i>7J/7 11H30-15H / 18H-23H</p>
            </div>
            <!-- Villepinte -->
            <div>
                <h4 class="font-kghappy text-lg text-padrino-yellow mb-3">Villepinte</h4>
                <p class="text-gray-400 text-sm mb-1"><i class="fas fa-map-marker-alt mr-2"></i>Villepinte, 93420</p>
                <p class="text-gray-400 text-sm mb-1"><i class="fas fa-phone-alt mr-2"></i><a href="tel:0143836407" class="hover:text-white">01 43 83 64 07</a></p>
                <p class="text-gray-400 text-sm"><i class="fas fa-clock mr-2"></i>7J/7 11H30-15H / 18H-23H</p>
            </div>
            <!-- Links & Delivery Zones -->
            <div>
                <h4 class="font-kghappy text-lg text-padrino-yellow mb-3">Zones de livraison</h4>
                <ul class="text-gray-400 text-sm space-y-1">
                    <li><a href="pizzeria-drancy.html" class="hover:text-white">Drancy</a></li>
                    <li><a href="pizzeria-aulnay-sous-bois.html" class="hover:text-white">Aulnay-sous-Bois</a></li>
                    <li><a href="pizzeria-Sevran.html" class="hover:text-white">Sevran</a></li>
                </ul>
                <h4 class="font-kghappy text-lg text-padrino-yellow mt-6 mb-3">Suivez-nous</h4>
                <div class="flex gap-4 text-xl">
                    <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-instagram"></i></a>
                    <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-tiktok"></i></a>
                </div>
                <div class="mt-4">
                    <a href="mention-legale.html" class="text-gray-500 text-xs hover:text-white">Mentions legales</a>
                </div>
            </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-xs">
            <p>&copy; 2026 Padrino Pizza. Tous droits reserves.</p>
        </div>
    </div>
</footer>
```

- [ ] **Step 3: Create main.js with header, mobile menu, and modal logic**

Create `Padrino/js/main.js`:

```js
document.addEventListener('DOMContentLoaded', () => {
  // --- Sticky header shadow on scroll ---
  const header = document.getElementById('main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('shadow-lg', window.scrollY > 50);
    });
  }

  // --- Mobile menu ---
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuBackdrop = document.getElementById('mobile-menu-backdrop');
  const menuPanel = document.getElementById('mobile-menu-panel');

  function openMenu() {
    mobileMenu.classList.remove('pointer-events-none');
    menuBackdrop.classList.add('opacity-100');
    menuPanel.classList.remove('translate-x-full');
  }

  function closeMenu() {
    menuBackdrop.classList.remove('opacity-100');
    menuPanel.classList.add('translate-x-full');
    setTimeout(() => mobileMenu.classList.add('pointer-events-none'), 300);
  }

  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  if (menuClose) menuClose.addEventListener('click', closeMenu);
  if (menuBackdrop) menuBackdrop.addEventListener('click', closeMenu);

  // --- Phone modal ---
  const phoneModal = document.getElementById('phone-modal');
  const phoneClose = document.getElementById('phone-modal-close');
  const appelBtns = document.querySelectorAll('#btn-appeler-desktop, #btn-appeler-mobile');

  function openPhoneModal() {
    phoneModal.classList.remove('pointer-events-none', 'opacity-0');
    phoneModal.querySelector('.relative').classList.remove('scale-95');
  }

  function closePhoneModal() {
    phoneModal.classList.add('opacity-0');
    phoneModal.querySelector('.relative').classList.add('scale-95');
    setTimeout(() => phoneModal.classList.add('pointer-events-none'), 300);
  }

  appelBtns.forEach(btn => btn.addEventListener('click', openPhoneModal));
  if (phoneClose) phoneClose.addEventListener('click', closePhoneModal);
  if (phoneModal) {
    phoneModal.addEventListener('click', (e) => {
      if (e.target === phoneModal || e.target.classList.contains('bg-black/50')) {
        closePhoneModal();
      }
    });
  }
});
```

- [ ] **Step 4: Rebuild Tailwind and open in browser**

Run: `npm run build`
Open `Padrino/index.html` in browser. Verify:
- Top info bar shows with phone numbers and hours
- Header is sticky with logo, nav links, and CTA buttons
- Mobile hamburger menu opens/closes correctly
- Phone modal opens when clicking "Appeler" and shows both numbers
- Mobile bottom bar is visible on small screens
- Footer displays correctly with all 4 columns

- [ ] **Step 5: Commit**

```bash
git add Padrino/index.html Padrino/js/main.js
git commit -m "feat: add header, footer, mobile menu, phone modal, and bottom bar"
```

---

### Task 6: Create animations.js with GSAP

**Files:**
- Create: `Padrino/js/animations.js`

- [ ] **Step 1: Create animations.js**

```js
// Respect reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  gsap.registerPlugin(ScrollTrigger);

  // --- Page load animations ---
  function initPageLoadAnimations() {
    // Logo rotation
    gsap.from('#main-header img', {
      rotation: -15,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
    });

    // Header nav links stagger
    gsap.from('#main-header nav a', {
      y: -20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
    });

    // Hero section
    gsap.from('.hero-section', {
      scale: 0.95,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });
  }

  // --- Scroll-triggered animations ---
  function initScrollAnimations() {
    // Section titles bounce in
    gsap.utils.toArray('.section-title').forEach(title => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.4)',
      });
    });

    // Product cards staggered fade-up
    gsap.utils.toArray('.cards-grid').forEach(grid => {
      gsap.from(grid.querySelectorAll('.product-card'), {
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 60,
        opacity: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: 'power2.out',
      });
    });

    // Sections alternate slide in
    gsap.utils.toArray('.animate-section').forEach((section, i) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        x: i % 2 === 0 ? -60 : 60,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
      });
    });

    // Count-up numbers
    gsap.utils.toArray('.count-up').forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        textContent: 0,
        duration: 1.5,
        ease: 'power1.out',
        snap: { textContent: 1 },
        onUpdate: function() {
          el.textContent = Math.ceil(this.targets()[0].textContent);
        },
      });
    });
  }

  // --- Floating decorative elements ---
  function initFloatingElements() {
    const container = document.getElementById('floating-elements');
    if (!container) return;

    const isMobile = window.innerWidth < 640;
    const maxElements = isMobile ? 3 : 6;
    const assets = [
      'img/floating/pizza-slice.svg',
      'img/floating/basil-leaf.svg',
      'img/floating/tomato.svg',
      'img/floating/mushroom.svg',
      'img/floating/cheese.svg',
    ];

    for (let i = 0; i < maxElements; i++) {
      const img = document.createElement('img');
      img.src = assets[i % assets.length];
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      img.className = 'floating-item absolute pointer-events-none';
      img.style.width = `${30 + Math.random() * 30}px`;
      img.style.opacity = `${0.15 + Math.random() * 0.15}`;
      img.style.left = `${Math.random() * 100}%`;
      img.style.top = `${Math.random() * 100}%`;
      container.appendChild(img);

      // Animate float
      gsap.to(img, {
        y: `random(-80, 80)`,
        x: `random(-40, 40)`,
        rotation: `random(-30, 30)`,
        duration: `random(6, 12)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 3,
      });
    }
  }

  // --- Product card hover animation ---
  function initCardHoverAnimations() {
    document.querySelectorAll('.product-card').forEach(card => {
      const img = card.querySelector('img');
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { rotation: 2, scale: 1.03, duration: 0.3, ease: 'power2.out' });
        if (img) gsap.to(img, { scale: 1.1, duration: 0.3, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotation: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
        if (img) gsap.to(img, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    });
  }

  // --- Commander click: pizza flies toward button ---
  function initCommanderClickAnimation() {
    document.querySelectorAll('.btn-commander').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        const pizza = document.createElement('img');
        pizza.src = 'img/floating/pizza-slice.svg';
        pizza.alt = '';
        pizza.setAttribute('aria-hidden', 'true');
        pizza.style.cssText = `position:fixed;z-index:9999;width:40px;pointer-events:none;left:${e.clientX - 20}px;top:${e.clientY - 20}px;`;
        document.body.appendChild(pizza);
        gsap.to(pizza, {
          x: rect.left + rect.width / 2 - e.clientX,
          y: rect.top + rect.height / 2 - e.clientY,
          scale: 0.3,
          opacity: 0,
          rotation: 360,
          duration: 0.6,
          ease: 'power2.in',
          onComplete: () => pizza.remove(),
        });
      });
    });
  }

  // --- Initialize all ---
  document.addEventListener('DOMContentLoaded', () => {
    initPageLoadAnimations();
    initScrollAnimations();
    initFloatingElements();
    initCardHoverAnimations();
    initCommanderClickAnimation();
  });
}
```

- [ ] **Step 2: Add floating elements container to index.html**

Add this right after the opening `<body>` tag (after the GTM noscript):

```html
<!-- Floating Decorative Elements -->
<div id="floating-elements" class="fixed inset-0 z-0 overflow-hidden pointer-events-none"></div>
```

And wrap all content (header through footer) in a `<div class="relative z-10">` to ensure content sits above floating elements.

- [ ] **Step 3: Rebuild Tailwind and test in browser**

Run: `npm run build`
Open `Padrino/index.html`. Verify:
- Floating pizza/basil/tomato elements drift in background
- Header logo rotates in on load
- Nav links stagger in
- Scroll down to see section animations trigger
- On mobile (responsive mode): only 3 floating elements appear

- [ ] **Step 4: Commit**

```bash
git add Padrino/js/animations.js Padrino/index.html
git commit -m "feat: add GSAP animations - page load, scroll triggers, floating elements, card hover"
```

---

## Chunk 2: Homepage

### Task 7: Build homepage main content

**Files:**
- Modify: `Padrino/index.html`

Reference: `Site_old/index.html` for all content (text, images, links, promo details).

- [ ] **Step 1: Add hero slider section**

Insert after the header in `index.html`. Use the banner images from `Site_old/img/banner/`. This is a simple auto-rotating hero with promotion text overlay.

```html
<!-- Hero Section -->
<section class="hero-section relative overflow-hidden">
    <div id="hero-slider" class="relative h-[60vh] md:h-[70vh]">
        <!-- Slide 1 -->
        <div class="hero-slide absolute inset-0 transition-opacity duration-700" data-slide="0">
            <img src="img/banner/banner-1.jpg" alt="Padrino Pizza - 1 achetee 1 offerte" class="w-full h-full object-cover" loading="eager">
            <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                <div class="container mx-auto px-4">
                    <h1 class="font-kghappy text-4xl md:text-6xl text-white mb-4">1 Pizza Achetee<br>= 1 Pizza Offerte</h1>
                    <p class="text-white text-lg md:text-xl mb-6">A emporter dans nos restaurants</p>
                    <a href="https://lepadrino.dishop.co" target="_blank" rel="noopener" class="btn-commander text-lg">
                        Commander maintenant <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>
        </div>
        <!-- Additional slides follow the same pattern with different images/text from Site_old -->
    </div>
    <!-- Slider dots -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10" id="hero-dots"></div>
</section>
```

Add slider logic to `main.js`:

```js
// --- Hero slider ---
const slides = document.querySelectorAll('.hero-slide');
const dotsContainer = document.getElementById('hero-dots');
let currentSlide = 0;
let slideInterval;

if (slides.length > 0 && dotsContainer) {
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `w-3 h-3 rounded-full transition-colors ${i === 0 ? 'bg-padrino-red' : 'bg-white/50'}`;
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function goToSlide(n) {
    slides[currentSlide].classList.add('opacity-0');
    dotsContainer.children[currentSlide].className = 'w-3 h-3 rounded-full transition-colors bg-white/50';
    currentSlide = n;
    slides[currentSlide].classList.remove('opacity-0');
    dotsContainer.children[currentSlide].className = 'w-3 h-3 rounded-full transition-colors bg-padrino-red';
  }

  slideInterval = setInterval(() => goToSlide((currentSlide + 1) % slides.length), 5000);
}
```

- [ ] **Step 2: Add signature specialties section**

Copy the 3 signature pizza names, descriptions, and images from `Site_old/index.html` (Tartufo, Pesto-Saumon, Di-Buffala). Present as a 3-column grid of product cards.

```html
<!-- Signature Specialties -->
<section class="py-16 animate-section">
    <div class="container mx-auto px-4">
        <h2 class="section-title font-kghappy text-3xl md:text-4xl text-center text-padrino-brown mb-12">Nos Specialites Signatures</h2>
        <div class="cards-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Card pattern: product-card with image, name, description, price -->
            <!-- Content from Site_old/index.html signature items -->
        </div>
    </div>
</section>
```

- [ ] **Step 3: Add menu categories grid**

8 categories in a 4x2 grid (desktop) / 2x4 (mobile): Solo Pizza, Senior Pizza, Mega Pizza, Pasta, Tex-Mex, Panini, Salade, Kids Menu. Each links to the relevant page. Use the images from `Site_old/img/Menu/`.

```html
<!-- Menu Categories -->
<section class="py-16 bg-white animate-section">
    <div class="container mx-auto px-4">
        <h2 class="section-title font-kghappy text-3xl md:text-4xl text-center text-padrino-brown mb-12">Notre Carte</h2>
        <div class="cards-grid grid grid-cols-2 md:grid-cols-4 gap-6">
            <!-- Each category: image + title + link -->
        </div>
    </div>
</section>
```

- [ ] **Step 4: Add promo banner and about section**

Build from `Site_old/index.html`:
- Mobile app promo banner with BIENV10 code and app store links
- About section describing the fast-casual concept
- Integrate the hidden `.notVisible` SEO content from old site as visible, well-designed text within the about section (the old site hid keyword-rich content — we make it visible and natural)

Each section uses `animate-section` class for GSAP scroll triggers and `section-title` class for title animations.

- [ ] **Step 5: Add testimonials, reservations, and restaurants sections**

Build from `Site_old/index.html`:
- Customer testimonials (3 testimonials from Site_old)
- Reservations section with click-to-call buttons for both locations
- "Our restaurants" section listing all 5 locations with links to their pages

- [ ] **Step 6: Rebuild and verify in browser**

Run: `npm run build`
Open `Padrino/index.html`. Verify:
- Hero slider rotates automatically
- All sections display correctly with content from old site
- Animations trigger on scroll
- Responsive layout works on mobile
- All links point to correct pages

- [ ] **Step 7: SEO verification**

Compare `Padrino/index.html` against `Site_old/index.html`:
- Title tag matches
- Meta description matches
- Meta keywords match
- JSON-LD BreadcrumbList present
- GTM + GA4 present
- Canonical URL added
- Open Graph tags added
- Old `.notVisible` content now visible in about section

- [ ] **Step 8: Commit**

```bash
git add Padrino/index.html Padrino/js/main.js
git commit -m "feat: build complete homepage with all sections and hero slider"
```

---

## Chunk 3: Menu Pages

### Task 8: Build pizza.html

**Files:**
- Create: `Padrino/pizza.html`

Reference: `Site_old/pizza.html` for all product names, descriptions, prices, and images.

- [ ] **Step 1: Create pizza.html with full head (SEO preserved)**

Copy the HTML structure from `Padrino/index.html`. Replace:
- Title: `Pizzas Menu - Padrino Pizza le Blanc-Mesnil`
- Meta description: exact value from `Site_old/pizza.html`
- Meta keywords: exact value from `Site_old/pizza.html`
- Canonical: `https://www.lepadrino.fr/pizza.html`
- OG tags: updated for pizza page

Keep: same header, footer, phone modal, mobile bottom bar, floating elements, GSAP scripts.

- [ ] **Step 2: Add title banner**

```html
<section class="hero-section relative h-[40vh] overflow-hidden">
    <img src="img/banner/pizza-banner.jpg" alt="Nos Pizzas" class="w-full h-full object-cover">
    <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 class="font-kghappy text-5xl md:text-6xl text-white text-center">Nos Pizzas</h1>
    </div>
</section>
```

- [ ] **Step 3: Add product cards grid**

Extract all pizza products from `Site_old/pizza.html`. Each pizza gets a `product-card`:

```html
<section class="py-16">
    <div class="container mx-auto px-4">
        <h2 class="section-title font-kghappy text-3xl text-center text-padrino-brown mb-12">Decouvrez nos pizzas</h2>
        <div class="cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="product-card">
                <div class="overflow-hidden">
                    <img src="img/pizza/{{image}}" alt="{{pizza_name}}" class="w-full h-56 object-cover" loading="lazy">
                </div>
                <div class="p-5">
                    <h3 class="font-kghappy text-xl text-padrino-brown mb-2">{{pizza_name}}</h3>
                    <p class="text-gray-600 text-sm mb-3">{{description}}</p>
                    <p class="font-bold text-padrino-red text-lg">{{price}}</p>
                </div>
            </div>
            <!-- Repeat for each pizza -->
        </div>
    </div>
</section>
```

- [ ] **Step 4: Add CTA banner and menu category links**

```html
<!-- CTA Banner -->
<section class="py-12 bg-padrino-red text-white text-center animate-section">
    <div class="container mx-auto px-4">
        <h2 class="font-kghappy text-3xl mb-4">Envie d'une pizza ?</h2>
        <a href="https://lepadrino.dishop.co" target="_blank" rel="noopener"
           class="inline-block bg-white text-padrino-red font-bold py-3 px-8 rounded-full hover:bg-padrino-cream hover:scale-105 transition-all duration-300">
            Commander maintenant <i class="fas fa-arrow-right ml-2"></i>
        </a>
    </div>
</section>

<!-- Other Categories -->
<section class="py-12 animate-section">
    <div class="container mx-auto px-4 text-center">
        <h2 class="section-title font-kghappy text-2xl text-padrino-brown mb-8">Decouvrez aussi</h2>
        <div class="flex flex-wrap justify-center gap-4">
            <a href="pasta.html" class="px-6 py-3 border-2 border-padrino-brown rounded-full hover:bg-padrino-brown hover:text-white transition-all">Pastas</a>
            <a href="texmex.html" class="px-6 py-3 border-2 border-padrino-brown rounded-full hover:bg-padrino-brown hover:text-white transition-all">Tex-Mex</a>
            <a href="salades.html" class="px-6 py-3 border-2 border-padrino-brown rounded-full hover:bg-padrino-brown hover:text-white transition-all">Salades</a>
            <a href="dessert.html" class="px-6 py-3 border-2 border-padrino-brown rounded-full hover:bg-padrino-brown hover:text-white transition-all">Desserts</a>
        </div>
    </div>
</section>
```

- [ ] **Step 5: Verify in browser and SEO check**

Run: `npm run build`
Verify: layout, product cards, animations, responsive, SEO tags.

- [ ] **Step 6: Commit**

```bash
git add Padrino/pizza.html
git commit -m "feat: build pizza menu page with product cards and SEO"
```

---

### Task 9: Build pasta.html

**Files:**
- Create: `Padrino/pasta.html`

- [ ] **Step 1: Create pasta.html**

Same structure as `pizza.html` (Task 8). Replace:
- SEO values from `Site_old/pasta.html` (title: "Tex-mex Menus - Padrino Pizza le Blanc-Mesnil" — note: the old title is incorrect but must be preserved for SEO)
- Canonical: `https://www.lepadrino.fr/pasta.html`
- Product content: extract all pasta/panini products from `Site_old/pasta.html`
- Banner image: pasta-themed image from `Site_old/img/Pasta/`
- "Decouvrez aussi" links: exclude Pastas, include Pizzas
- Integrate visible `.notVisible` SEO content from old page into the design

- [ ] **Step 2: Verify in browser and SEO check**

Compare title, description, keywords against `Site_old/pasta.html`. Verify all products are present.

- [ ] **Step 3: Commit**

```bash
git add Padrino/pasta.html
git commit -m "feat: build pasta menu page"
```

---

### Task 10: Build texmex.html

**Files:**
- Create: `Padrino/texmex.html`

- [ ] **Step 1: Create texmex.html**

Same structure as `pizza.html` (Task 8). Replace:
- SEO values from `Site_old/texmex.html`
- Canonical: `https://www.lepadrino.fr/texmex.html`
- Product content: extract all tex-mex products from `Site_old/texmex.html`
- Banner image: tex-mex themed
- "Decouvrez aussi" links: exclude Tex-Mex, include Pizzas
- Integrate visible `.notVisible` SEO content from old page

- [ ] **Step 2: Verify in browser and SEO check**

Compare title, description, keywords against `Site_old/texmex.html`. Verify all products present.

- [ ] **Step 3: Commit**

```bash
git add Padrino/texmex.html
git commit -m "feat: build tex-mex menu page"
```

---

### Task 11: Build salades.html

**Files:**
- Create: `Padrino/salades.html`

- [ ] **Step 1: Create salades.html**

Same structure as `pizza.html` (Task 8). Replace:
- SEO values from `Site_old/salades.html`
- Canonical: `https://www.lepadrino.fr/salades.html`
- Product content: extract all salad/gratin products from `Site_old/salades.html`
- Banner image: salad themed from `Site_old/img/salades/`
- "Decouvrez aussi" links: exclude Salades, include Pizzas
- Integrate visible `.notVisible` SEO content from old page

- [ ] **Step 2: Verify in browser and SEO check**

Compare title, description, keywords against `Site_old/salades.html`. Verify all products present.

- [ ] **Step 3: Commit**

```bash
git add Padrino/salades.html
git commit -m "feat: build salades menu page"
```

---

### Task 12: Build dessert.html

**Files:**
- Create: `Padrino/dessert.html`

- [ ] **Step 1: Create dessert.html**

Same structure as `pizza.html` (Task 8). Replace:
- SEO values from `Site_old/dessert.html`
- Canonical: `https://www.lepadrino.fr/dessert.html`
- Product content: extract all dessert/drink products from `Site_old/dessert.html`
- Banner image: dessert themed
- "Decouvrez aussi" links: exclude Desserts, include Pizzas
- Integrate visible `.notVisible` SEO content from old page

- [ ] **Step 2: Verify in browser and SEO check**

Compare title, description, keywords against `Site_old/dessert.html`. Verify all products present.

- [ ] **Step 3: Commit**

```bash
git add Padrino/dessert.html
git commit -m "feat: build dessert menu page"
```

---

## Chunk 4: Location Pages

### Task 13: Build pizzeria-villepinte.html

**Files:**
- Create: `Padrino/pizzeria-villepinte.html`

Reference: `Site_old/pizzeria-villepinte.html` for SEO values and content.

- [ ] **Step 1: Create location page structure**

Location pages share a common pattern:

```html
<!-- Same head template with page-specific SEO -->
<!-- Same header/footer/modals -->

<!-- Title Banner -->
<section class="hero-section relative h-[40vh] overflow-hidden">
    <img src="img/{{location-image}}" alt="Padrino Pizza {{city}}" class="w-full h-full object-cover">
    <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 class="font-kghappy text-5xl md:text-6xl text-white text-center">Padrino {{city}}</h1>
    </div>
</section>

<!-- Location Info -->
<section class="py-16 animate-section">
    <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto text-center">
            <h2 class="section-title font-kghappy text-3xl text-padrino-brown mb-8">Informations</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white rounded-2xl shadow-md p-6">
                    <i class="fas fa-map-marker-alt text-padrino-red text-3xl mb-3"></i>
                    <p class="font-medium">{{address}}</p>
                </div>
                <div class="bg-white rounded-2xl shadow-md p-6">
                    <i class="fas fa-phone-alt text-padrino-green text-3xl mb-3"></i>
                    <p class="font-medium"><a href="tel:{{phone}}">{{phone_display}}</a></p>
                </div>
                <div class="bg-white rounded-2xl shadow-md p-6">
                    <i class="fas fa-clock text-padrino-orange text-3xl mb-3"></i>
                    <p class="font-medium">7J/7<br>11H30-15H / 18H-23H</p>
                </div>
            </div>
            <!-- Itineraire button -->
            <a href="https://www.google.com/maps/dir/?api=1&destination={{lat}},{{lng}}" target="_blank" rel="noopener"
               class="inline-block bg-padrino-brown text-white font-bold py-3 px-8 rounded-full hover:bg-padrino-red transition-all">
                <i class="fas fa-directions mr-2"></i>Itineraire
            </a>
        </div>
    </div>
</section>

<!-- Menu Links -->
<section class="py-12 bg-white animate-section">
    <div class="container mx-auto px-4 text-center">
        <h2 class="section-title font-kghappy text-3xl text-padrino-brown mb-8">Decouvrez notre carte</h2>
        <div class="flex flex-wrap justify-center gap-4">
            <a href="pizza.html" class="px-6 py-3 bg-padrino-red text-white rounded-full hover:bg-padrino-orange transition-all">Pizzas</a>
            <a href="pasta.html" class="px-6 py-3 bg-padrino-red text-white rounded-full hover:bg-padrino-orange transition-all">Pastas</a>
            <a href="texmex.html" class="px-6 py-3 bg-padrino-red text-white rounded-full hover:bg-padrino-orange transition-all">Tex-Mex</a>
            <a href="salades.html" class="px-6 py-3 bg-padrino-red text-white rounded-full hover:bg-padrino-orange transition-all">Salades</a>
            <a href="dessert.html" class="px-6 py-3 bg-padrino-red text-white rounded-full hover:bg-padrino-orange transition-all">Desserts</a>
        </div>
    </div>
</section>

<!-- Order CTA -->
<section class="py-12 bg-padrino-red text-white text-center animate-section">
    <div class="container mx-auto px-4">
        <h2 class="font-kghappy text-3xl mb-4">Commandez a {{city}}</h2>
        <a href="https://lepadrino.dishop.co" target="_blank" rel="noopener"
           class="inline-block bg-white text-padrino-red font-bold py-3 px-8 rounded-full hover:bg-padrino-cream hover:scale-105 transition-all duration-300">
            Commander maintenant <i class="fas fa-arrow-right ml-2"></i>
        </a>
    </div>
</section>
```

Also add `LocalBusiness` schema.org JSON-LD in the head:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Padrino Pizza Villepinte",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Villepinte",
    "postalCode": "93420",
    "addressCountry": "FR"
  },
  "telephone": "+33143836407",
  "openingHours": "Mo-Su 11:30-15:00, Mo-Su 18:00-23:00",
  "servesCuisine": "Pizza",
  "url": "https://www.lepadrino.fr/pizzeria-villepinte.html"
}
</script>
```

- [ ] **Step 2: Fill with Villepinte-specific content**

Use SEO values from `Site_old/pizzeria-villepinte.html` and Villepinte-specific address/phone.

- [ ] **Step 3: Verify and commit**

```bash
git add Padrino/pizzeria-villepinte.html
git commit -m "feat: build Villepinte location page with LocalBusiness schema"
```

---

### Task 14: Build pizzeria-drancy.html

**Files:**
- Create: `Padrino/pizzeria-drancy.html`

- [ ] **Step 1: Create using location page template from Task 13**

Use same structure as `pizzeria-villepinte.html`. Replace with Drancy-specific content:
- SEO values (title, description, keywords) from `Site_old/pizzeria-drancy.html`
- Canonical: `https://www.lepadrino.fr/pizzeria-drancy.html`
- Location info: Drancy address and phone (01 45 91 25 93 — Le Blanc-Mesnil number serves Drancy as a delivery zone)
- Google Maps direction link with Drancy coordinates
- LocalBusiness/Restaurant JSON-LD schema with Drancy-specific data

- [ ] **Step 2: Verify in browser and SEO check**

Compare SEO tags against `Site_old/pizzeria-drancy.html`. Verify LocalBusiness JSON-LD is present.

- [ ] **Step 3: Commit**

```bash
git add Padrino/pizzeria-drancy.html
git commit -m "feat: build Drancy location page with LocalBusiness schema"
```

---

### Task 15: Build pizzeria-aulnay-sous-bois.html

**Files:**
- Create: `Padrino/pizzeria-aulnay-sous-bois.html`

- [ ] **Step 1: Create using location page template from Task 13**

Use same structure. Replace with Aulnay-specific content:
- SEO values from `Site_old/pizzeria-aulnay-sous-bois.html`
- Canonical: `https://www.lepadrino.fr/pizzeria-aulnay-sous-bois.html`
- Location info: Aulnay-sous-Bois address and phone
- Google Maps direction link with Aulnay coordinates
- LocalBusiness/Restaurant JSON-LD schema

- [ ] **Step 2: Verify in browser and SEO check**

Compare SEO tags against `Site_old/pizzeria-aulnay-sous-bois.html`. Verify LocalBusiness JSON-LD.

- [ ] **Step 3: Commit**

```bash
git add Padrino/pizzeria-aulnay-sous-bois.html
git commit -m "feat: build Aulnay-sous-Bois location page with LocalBusiness schema"
```

---

### Task 16: Build pizzeria-Sevran.html

Note: Capital "S" in filename — intentional, matches production URL.

**Files:**
- Create: `Padrino/pizzeria-Sevran.html`

- [ ] **Step 1: Create using location page template from Task 13**

Use same structure. Replace with Sevran-specific content:
- SEO values from `Site_old/pizzeria-Sevran.html`
- Canonical: `https://www.lepadrino.fr/pizzeria-Sevran.html`
- Location info: Sevran address and phone
- Google Maps direction link with Sevran coordinates
- LocalBusiness/Restaurant JSON-LD schema

- [ ] **Step 2: Verify in browser and SEO check**

Compare SEO tags against `Site_old/pizzeria-Sevran.html`. Verify LocalBusiness JSON-LD.

- [ ] **Step 3: Commit**

```bash
git add Padrino/pizzeria-Sevran.html
git commit -m "feat: build Sevran location page with LocalBusiness schema"
```

---

## Chunk 5: Utility Pages & SEO Files

### Task 17: Build offres.html

**Files:**
- Create: `Padrino/offres.html`

- [ ] **Step 1: Create offres.html with SEO-preserved head**

Use common head template. Replace:
- Title: `Padrino - Nos Offres Pizzeria le blanc Mesnil - Aulnay - Drancy - Bourget`
- Meta description: exact value from `Site_old/offres.html`
- Meta keywords: exact value from `Site_old/offres.html`
- Canonical: `https://www.lepadrino.fr/offres.html`

- [ ] **Step 2: Build promotions grid content**

Structure: title banner + responsive grid of promotion cards. Each card contains:
- Promo image (from `Site_old/img/` promo assets)
- Offer title (e.g., "1 Pizza Achetee = 1 Pizza Offerte")
- Short description of conditions
- CTA button linking to Dishop

Extract all current offers from `Site_old/offres.html`.

```html
<section class="py-16">
    <div class="container mx-auto px-4">
        <h2 class="section-title font-kghappy text-3xl text-center text-padrino-brown mb-12">Nos Offres du Moment</h2>
        <div class="cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Promo card: image, title, description, CTA -->
        </div>
    </div>
</section>
```

- [ ] **Step 3: Verify in browser and SEO check**

Compare SEO tags against `Site_old/offres.html`.

- [ ] **Step 4: Commit**

```bash
git add Padrino/offres.html
git commit -m "feat: build offers/promotions page"
```

---

### Task 18: Build commande.html

**Files:**
- Create: `Padrino/commande.html`

- [ ] **Step 1: Create commande.html with SEO-preserved head**

Use common head template. Replace:
- Title: `Padrino - Pizzeria le blanc Mesnil - Aulnay - Drancy - Bourget`
- Meta description: (empty on old site, keep empty)
- Canonical: `https://www.lepadrino.fr/commande.html`
- Use `lang="fr"` (old site had `lang="zxx"` — we fix this)
- Add GTM + GA4 (missing on old version — improvement)

- [ ] **Step 2: Build order page content**

Full page (not a redirect) with Padrino branding. Structure:

```html
<section class="py-20 text-center">
    <div class="container mx-auto px-4 max-w-2xl">
        <h1 class="font-kghappy text-4xl md:text-5xl text-padrino-brown mb-6">Commandez en ligne</h1>
        <p class="text-lg text-gray-600 mb-8">Passez votre commande en livraison ou a emporter via notre plateforme</p>
        <a href="https://lepadrino.dishop.co" target="_blank" rel="noopener"
           class="btn-commander text-xl py-4 px-10 inline-block mb-8">
            <i class="fas fa-shopping-bag mr-2"></i>Commander sur Dishop
        </a>
        <div class="mt-8">
            <p class="text-gray-500 mb-4">Ou commandez via nos partenaires :</p>
            <div class="flex flex-wrap items-center justify-center gap-6">
                <a href="#" target="_blank"><img src="img/comment/justeat.png" alt="Just Eat" class="h-12" loading="lazy"></a>
                <a href="#" target="_blank"><img src="img/comment/deliveroo.png" alt="Deliveroo" class="h-12" loading="lazy"></a>
                <a href="#" target="_blank"><img src="img/comment/ubereats.png" alt="Uber Eats" class="h-12" loading="lazy"></a>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 3: Verify in browser and SEO check**

- [ ] **Step 4: Commit**

```bash
git add Padrino/commande.html
git commit -m "feat: build order page with Dishop links"
```

---

### Task 19: Build mention-legale.html

**Files:**
- Create: `Padrino/mention-legale.html`

- [ ] **Step 1: Create mention-legale.html with SEO-preserved head**

Use common head template. Replace:
- Title: `Tex-mex Menu - Padrino Pizza le Blanc-Mesnil` (incorrect but must be preserved for SEO)
- Canonical: `https://www.lepadrino.fr/mention-legale.html`

- [ ] **Step 2: Build legal content page**

Extract all legal text from `Site_old/mention-legale.html`. Minimal, clean design:

```html
<section class="py-16">
    <div class="container mx-auto px-4 max-w-3xl">
        <h1 class="font-kghappy text-4xl text-padrino-brown mb-8">Mentions Legales</h1>
        <div class="prose prose-lg text-gray-700 space-y-6">
            <!-- Legal text from Site_old/mention-legale.html -->
        </div>
    </div>
</section>
```

- [ ] **Step 3: Verify in browser and SEO check**

- [ ] **Step 4: Commit**

```bash
git add Padrino/mention-legale.html
git commit -m "feat: build legal notice page"
```

---

### Task 20: Create sitemap.xml and robots.txt

**Files:**
- Create: `Padrino/sitemap.xml`
- Create: `Padrino/robots.txt`

- [ ] **Step 1: Create updated sitemap.xml**

Include ALL pages (the old sitemap was missing location pages and utility pages):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.lepadrino.fr/</loc><lastmod>2026-03-17</lastmod><changefreq>daily</changefreq><priority>1.00</priority></url>
  <url><loc>https://www.lepadrino.fr/index.html</loc><lastmod>2026-03-17</lastmod><changefreq>daily</changefreq><priority>1.00</priority></url>
  <url><loc>https://www.lepadrino.fr/pizza.html</loc><lastmod>2026-03-17</lastmod><changefreq>daily</changefreq><priority>0.80</priority></url>
  <url><loc>https://www.lepadrino.fr/pasta.html</loc><lastmod>2026-03-17</lastmod><changefreq>daily</changefreq><priority>0.80</priority></url>
  <url><loc>https://www.lepadrino.fr/texmex.html</loc><lastmod>2026-03-17</lastmod><changefreq>daily</changefreq><priority>0.80</priority></url>
  <url><loc>https://www.lepadrino.fr/salades.html</loc><lastmod>2026-03-17</lastmod><changefreq>daily</changefreq><priority>0.80</priority></url>
  <url><loc>https://www.lepadrino.fr/dessert.html</loc><lastmod>2026-03-17</lastmod><changefreq>daily</changefreq><priority>0.80</priority></url>
  <url><loc>https://www.lepadrino.fr/offres.html</loc><lastmod>2026-03-17</lastmod><changefreq>weekly</changefreq><priority>0.70</priority></url>
  <url><loc>https://www.lepadrino.fr/commande.html</loc><lastmod>2026-03-17</lastmod><changefreq>monthly</changefreq><priority>0.60</priority></url>
  <url><loc>https://www.lepadrino.fr/pizzeria-villepinte.html</loc><lastmod>2026-03-17</lastmod><changefreq>monthly</changefreq><priority>0.70</priority></url>
  <url><loc>https://www.lepadrino.fr/pizzeria-drancy.html</loc><lastmod>2026-03-17</lastmod><changefreq>monthly</changefreq><priority>0.70</priority></url>
  <url><loc>https://www.lepadrino.fr/pizzeria-aulnay-sous-bois.html</loc><lastmod>2026-03-17</lastmod><changefreq>monthly</changefreq><priority>0.70</priority></url>
  <url><loc>https://www.lepadrino.fr/pizzeria-Sevran.html</loc><lastmod>2026-03-17</lastmod><changefreq>monthly</changefreq><priority>0.70</priority></url>
  <url><loc>https://www.lepadrino.fr/mention-legale.html</loc><lastmod>2026-03-17</lastmod><changefreq>yearly</changefreq><priority>0.30</priority></url>
</urlset>
```

- [ ] **Step 2: Create robots.txt**

```
User-agent: *
Allow: /
Sitemap: https://www.lepadrino.fr/sitemap.xml
```

- [ ] **Step 3: Commit**

```bash
git add Padrino/sitemap.xml Padrino/robots.txt
git commit -m "feat: create updated sitemap with all pages and robots.txt"
```

---

## Chunk 6: Final Polish & SEO Verification

### Task 21: Full SEO audit — page-by-page comparison

**Files:**
- All 13 HTML pages in `Padrino/`

- [ ] **Step 1: Compare every page's SEO elements**

For each of the 13 HTML files, compare old vs new:

| Element | Check |
|---------|-------|
| `<title>` | Exact match with `Site_old/` |
| `<meta description>` | Exact match |
| `<meta keywords>` | Exact match |
| `lang="fr"` | Present |
| GTM script | Present with GTM-TLC6SN4 |
| GA4 script | Present with G-PMLY65YTLL |
| JSON-LD BreadcrumbList | Present on all content pages |
| `<link rel="canonical">` | Present (new improvement) |
| Open Graph tags | Present (new improvement) |
| Favicon links | All present |

- [ ] **Step 2: Fix any discrepancies found**

- [ ] **Step 3: Commit fixes**

```bash
git add Padrino/
git commit -m "fix: SEO audit corrections across all pages"
```

---

### Task 22: Responsive testing and final adjustments

- [ ] **Step 1: Test all pages at mobile (375px), tablet (768px), desktop (1280px)**

Check per page:
- Layout doesn't break
- Product cards grid adapts
- Images don't overflow
- Text is readable
- Bottom bar visible on mobile
- Hamburger menu works
- All animations work

- [ ] **Step 2: Fix any responsive issues found**

- [ ] **Step 3: Run Tailwind production build**

```bash
npm run build
```

Verify `Padrino/css/output.css` is minified.

- [ ] **Step 4: Final commit**

```bash
git add Padrino/
git commit -m "fix: responsive adjustments and production CSS build"
```

---

### Task 23: Verify deployment readiness

- [ ] **Step 1: Verify `Padrino/` folder is self-contained**

Check that all assets referenced in HTML files exist in `Padrino/`:
- All images in `img/` that are referenced in HTML
- Fonts in `fonts/`
- Favicons in `fav/`
- JS files in `js/`
- CSS in `css/`
- `sitemap.xml` and `robots.txt` at root

- [ ] **Step 2: Test with a local HTTP server**

```bash
cd Padrino && python3 -m http.server 8000
```

Open `http://localhost:8000` and click through every page. Verify no 404s in browser console.

- [ ] **Step 3: Commit if any fixes needed**

```bash
git add Padrino/
git commit -m "fix: deployment readiness fixes"
```
