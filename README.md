# Bridleen P — Portfolio

A world-class personal portfolio website built with React + Vite, Tailwind CSS, Framer Motion, and TypeScript. Dark mode by default. Fully frontend-only. Ready for Vercel deployment.

---

## Tech Stack

- **React 18** + **Vite 4** — fast dev & build
- **TypeScript** — fully typed
- **Tailwind CSS** — utility-first styling with custom theme
- **Framer Motion** — animations everywhere
- **Lucide React** + **React Icons** — icon libraries

---

## Features

- Premium dark-mode-first design
- Animated loading screen
- Custom cursor with trailing ring effect
- Scroll progress bar
- Glassmorphism cards and panels
- Interactive particle backgrounds (physics-based)
- Magnetic button effects
- Typing animation in hero
- Scroll-triggered section reveals
- Project filter + modal popup
- Animated achievement counters
- Fully responsive (mobile → desktop)
- SEO optimized (meta, og, twitter cards)
- Zero backend dependency — pure frontend

---

## Sections

1. **Hero** — Full-screen with typing effect, profile photo, CTA buttons, social links
2. **About** — Bio, education, trait highlights
3. **Experience** — Timeline of internships
4. **Resume** — Downloadable resume with inline preview
5. **Projects** — Filterable grid with modal details
6. **Skills** — Animated progress bars per category + tech badge cloud
7. **Achievements** — Animated counters + highlights
8. **Contact** — Form with mailto fallback + social links
9. **Footer** — Navigation, social, copyright

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Deployment on Vercel

1. Push the project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel auto-detects Vite — no configuration needed
4. Click **Deploy**

The `vercel.json` is already configured for SPA routing.

---

## Customization

All portfolio content lives in one file:

```
src/app/data/portfolio.ts
```

Update `OWNER`, `PROJECTS`, `SKILLS`, `EXPERIENCE`, and `ACHIEVEMENTS` there. Every component reads from this single source of truth.

---

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Resume.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Achievements.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── CursorTracker.tsx
│   │   ├── CursorLight.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── SectionReveal.tsx
│   │   ├── MotionBackground.tsx
│   │   ├── MagneticElement.tsx
│   │   └── figma/
│   │       └── ImageWithFallback.tsx
│   ├── data/
│   │   └── portfolio.ts        ← all content here
│   ├── styles/
│   │   ├── index.css
│   │   ├── theme.css
│   │   ├── tailwind.css
│   │   └── fonts.css
│   └── ui/
│       ├── ThemeProvider.tsx
│       ├── logger.ts
│       └── utils.ts
└── main.tsx
public/
├── My_image.jpeg               ← profile photo
└── Bridleen.resume.pdf         ← resume PDF
```

---

## License

MIT — Free to use and adapt.
