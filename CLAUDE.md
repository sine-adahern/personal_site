# Personal Site — Project Specification
**Owner:** Sinéad Ahern  
**Field:** Cybersecurity & IT Management  
**Purpose:** Personal portfolio and blog site showcasing  cybersecurity work, and personal projects

---

## Tech Stack
- **Framework:** Astro
- **Language:** TypeScript
- **Styling:** Vanilla CSS (no Tailwind, no CSS-in-JS)
- **Animations:** GSAP (GreenSock) with ScrollTrigger plugin
- **Hosting:** Netlify (auto-deploy from GitHub main branch)
- **Version control:** Git / GitHub

---

## Design System

### Vibe
Clean and minimal. Let whitespace do the work. No clutter, no decorative excess. Typography and colour carry the personality.

### Typography
- **Font:** Lato (Google Fonts) — use Regular (400) and Bold (700) only
- **Scale:** establish a consistent type scale in CSS custom properties
- **Hierarchy:** clear distinction between headings, body, and labels

### Colour Palette
All colours are warm earth tones — apply consistently via CSS custom properties.

```css
:root {
  --color-background: #FFFFFF;
  --color-text-primary:   #7B3F00;  
  --color-text-secondary: #6F4E37;  
  --color-accent-mid:     #C07C3F;  
  --color-accent-light:   #C88C56;  
  --color-accent-dark:    #AC601C;  
}
```

### Spacing
- Base unit: 4px
- All spacing, padding, and margin values must be multiples of 4px
- Define as CSS custom properties (--space-1: 4px, --space-2: 8px, etc.)

### Border radius
- Default: 8px for cards and containers
- Buttons: 4px

---

## Pages (6 total)

### 1. Home / Landing
- this page will have 6 screens on it that rotate in a 3d circular pattern. each screen will show the top of each page. on click, each page will transtion to that page. the user can navitgate through these pages by scrolling horizontally, which will rotate the pages in the circular pattern, like a wheel rotating on its side. 

### 2. About Me
- Extended biography and background
- Skills or areas of interest
- Link to CV or downloadable resume (optional)

### 3. Portfolio / Projects
- Grid or card layout showcasing technical projects
- Each card: project title, short description, tech stack tags, link (GitHub or live)
- Filter or category tags optional

### 4. Trips
- Travel blog / log
- Each entry: destination, date, short write-up, photos (optional)
- Chronological or card-based layout

### 5. Cyber SOC
- Cybersecurity-focused page
- Content: CTF writeups, security projects, homelab work, tools built or used
- Technical in tone — this is a showcase for cybersecurity skills

### 6. Patch
- Personal project page (pet or individual side project)
- Informal, personal tone relative to other pages
- Photos and write-ups as appropriate

---

## Navigation
- Persistent top navigation bar across all pages, in the form of a sidebar on the right hand side. this will display a portrait shaped image of each page as well as the name of the page. these pages can be nagitvaged through by scrolling vertically, and will open each page on click. 
- Links to all 6 pages
- Active state uses `--color-accent-dark` underline or highlight
- Mobile: hamburger menu with slide-in drawer

---

## Animations
All animations via GSAP. No CSS keyframe animations except for minor utility effects (e.g. focus rings).

- **Page transitions:** smooth fade or slide between routes using GSAP + Astro view transitions
- **Scroll-triggered:** elements fade/slide up as they enter the viewport (ScrollTrigger plugin)
- **Rotating/carousel:** rotating element on applicable pages (clarify per page during build)
- **Hover effects:** subtle scale or colour shift on cards and buttons — CSS transitions only (no GSAP needed for hover)
- **Respect reduced motion:** wrap all GSAP animations in a `prefers-reduced-motion` check

```ts
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  // GSAP animations here
}
```

---

## File Structure
```
personal_site/
├── src/
│   ├── components/       # reusable Astro/TS components
│   ├── layouts/          # base layout (nav, footer, page wrapper)
│   ├── pages/            # one .astro file per route
│   │   ├── index.astro       # Home
│   │   ├── about.astro       # About Me
│   │   ├── projects.astro    # Portfolio / Projects
│   │   ├── trips.astro       # Trips
│   │   ├── cybersoc.astro    # Cyber SOC
│   │   └── patch.astro       # Patch
│   ├── styles/
│   │   ├── global.css        # resets, custom properties, base styles
│   │   └── tokens.css        # design tokens (colours, spacing, type scale)
│   └── types/            # TypeScript interfaces and type definitions
├── public/               # static assets (images, favicon)
├── CLAUDE.md             # Claude Code project context (see below)
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

---

## Conventions & Rules
- **Mobile-first CSS** — base styles target mobile, `min-width` media queries for larger screens
- **No inline styles** ever — all styles via CSS classes or custom properties
- **TypeScript strict mode** — no `any` types
- **Semantic HTML** — use correct elements (`<article>`, `<nav>`, `<section>`, `<main>`, etc.)
- **Accessibility** — all images have alt text, all interactive elements are keyboard accessible, colour contrast meets WCAG AA
- **Component naming** — PascalCase for component files (e.g. `ProjectCard.astro`)
- **One component per file**
- **Git commits** — commit after each completed component or feature, not in bulk

---

## CLAUDE.md (paste into project root)
```markdown
# personal_site — Sinéad Ahern

## About this project
Personal portfolio and blog for Sinéad Ahern, a Cybersecurity & IT Management student.
Astro + TypeScript + vanilla CSS + GSAP. Hosted on Netlify.

## Design system
- Font: Lato (400, 700 only)
- Background: #FFFFFF
- Spacing: multiples of 4px via CSS custom properties
- Border radius: 8px cards, 4px buttons
- Vibe: clean and minimal

## Pages
1. index.astro — Home / landing
2. about.astro — About Me
3. projects.astro — Portfolio / Projects
4. trips.astro — Travel blog/log
5. cybersoc.astro — Cybersecurity work (CTFs, tools, projects)
6. patch.astro — Personal project / pet page

## Animations
- All animations via GSAP (ScrollTrigger for scroll, GSAP for page transitions and hero)
- Always wrap in prefers-reduced-motion check
- Hover effects via CSS transitions only

## Conventions
- Mobile-first CSS
- TypeScript strict mode, no `any`
- No inline styles
- Semantic HTML throughout
- Accessibility: alt text, keyboard navigation, WCAG AA contrast
- Component files: PascalCase in src/components/
- Commit after each completed component or feature

## Commands
- Dev server: npm run dev
- Build: npm run build
- Preview build: npm run preview
```

---

## Deployment
- **Host:** Netlify
- Connect GitHub repo to Netlify — auto-deploys on every push to `main`
- Build command: `npm run build`
- Publish directory: `dist`
- Set up a custom domain once the site is ready