# High-End Design Technologist Portfolio — Next.js & shadcn/ui

An award-winning developer & designer portfolio frontend engineered with Next.js App Router, Tailwind CSS v4, shadcn/ui, and interaction systems aligned with world-class design technologist monographs (Rauno Freiberg, Paco Coursey, Linear, Stripe).

---

## 🚀 International-Standard Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16 (App Router)** | High-performance React framework with React 19, Server Components, and Turbopack. |
| **Tailwind CSS v4** | Next-generation utility CSS engine with OKLCH dynamic color spaces and `@theme`. |
| **shadcn/ui** | Accessible, headless UI foundation powered by `@base-ui/react`. |
| **Web Audio API Engine** | Native zero-asset audio synthesizer providing tactile sinusoidal feedback on clicks & switches. |
| **Framer Motion** | Spring physics, layout transitions, micro-interactions, and draggable canvas components. |
| **Lenis Smooth Scroll** | Inertial smooth scrolling used across modern creative engineering portfolios. |
| **next-themes** | Dark / Light / System theme switching with zero layout shift or flash. |
| **Sonner** | Minimalist stacked toast notifications by Emil Kowalski. |
| **Canvas Confetti** | Celebratory micro-feedback on milestone actions. |
| **React Hook Form + Zod** | Type-safe form validation for the contact section. |

---

## ✨ Groundbreaking Features & Architecture

1. **Expansive Typographic Hero & Kinetic HUD**:
   - Decompressed multi-scale typography pairing condensed display (`Bebas Neue`), fluid italic serif (`Playfair Display`), and clean sans (`Geist`).
   - Natural editorial line flow eliminating cramped vertical stacking and asymmetrical open voids.
   - Live UTC clock, native Web Audio toggle (`SOUND: ON/OFF`), and location telemetry.

2. **X-Ray / Blueprint Engineering Mode**:
   - Global toggle via HUD or `⌘K` that reveals dashed bounding box geometry, layout dimensions, and architectural telemetry across the viewport.

3. **Asymmetrical Playable Bento Grid & Public Images**:
   - Each project card displays images placed in the `public/` directory (e.g., `public/projects/*.png`, `.svg`, `.jpg`, `.webp`), configured directly in `projects.json`.
   - Clickable cards navigate directly to individual project case study pages with sound haptics.

4. **Dedicated Project Detail Case Study Pages (`/projects/[id]`)**:
   - Each project has its own dedicated JSON data source in `src/data/content/project-details/[id].json`.
   - Displays executive overview, technical challenge, architectural strategy, topology data flow, verified telemetry metrics, deployed tech badges, and direct live/repo links.

5. **Bi-Directional Systems Cross-Inspection**:
   - Hovering any capability in the Systems Matrix dynamically illuminates all production projects built with it.
   - Hovering any project card cross-highlights corresponding skills in the matrix.

7. **Multi-Channel Contact Command Center**:
   - Dual-tab interface: Direct Message form (validated with Zod and confetti) and Developer CLI Fast-Connect (`cURL` terminal command with one-click copy, PGP key, and timezone status).

8. **Global Command Palette (`⌘K` / `Ctrl+K`)**:
   - Spotlight-style keyboard navigation for quick jumping, toggling audio haptics, toggling X-Ray blueprint mode, copying emails, and theme switching.

---

## 📁 Project Architecture

```
src/
├── app/
│   ├── globals.css              # Tailwind v4 theme, OKLCH tokens, X-Ray blueprint styles, noise overlay
│   ├── layout.tsx               # Root layout, Google Fonts, SEO metadata, RootProviders
│   ├── page.tsx                 # Composed single-page portfolio view
│   └── projects/
│       └── [id]/
│           └── page.tsx         # Dedicated project case study detail route
├── components/
│   ├── icons.tsx                # Brand vector icons (GitHub, LinkedIn, Twitter/X)
│   ├── theme-toggle.tsx         # Dark/Light/System theme switcher
│   ├── providers/
│   │   ├── root-providers.tsx   # Aggregated app providers
│   │   ├── audio-provider.tsx   # Web Audio API synthesized haptic sound engine
│   │   ├── xray-provider.tsx    # X-Ray blueprint debugging overlay
│   │   ├── highlight-provider.tsx # Bi-directional cross-inspection state
│   │   ├── smooth-scroll.tsx    # Lenis inertial scrolling wrapper
│   │   └── theme-provider.tsx   # next-themes wrapper
│   └── portfolio/
│       ├── navbar.tsx           # Floating responsive navbar & mobile drawer
│       ├── hero.tsx             # Typographic hero, telemetry HUD & actions
│       ├── bento-grid.tsx       # Asymmetric showcase with image previews & routing
│       ├── project-previews.tsx # Vector previews fallback & benchmark simulator
│       ├── experience.tsx       # Career milestones with expandable architectural notes
│       ├── tech-stack.tsx       # Interactive systems matrix with hover cross-linking
│       ├── contact.tsx          # Dual-tab contact & CLI fast-connect
│       ├── footer.tsx           # Live clock, socials, back-to-top
│       └── command-menu.tsx     # ⌘K power console
├── data/
│   ├── content/
│   │   ├── personalInformation.json  # Identity, bio, headlines, stats, phone, location
│   │   ├── projects.json             # Works, case studies, topology, metrics, image paths
│   │   ├── project-details/          # Dedicated JSON data sources per project
│   │   │   ├── nebula-ai.json
│   │   │   ├── chronos-db.json
│   │   │   ├── strata-design.json
│   │   │   └── flow-craft.json
│   │   ├── experience.json           # Career milestones & highlights
│   │   ├── skills.json               # Capabilities & categorized tech stack
│   │   └── socials.json              # Platform URLs & iconography mappings
│   ├── types.ts                      # Strict TypeScript data schemas
│   └── portfolio-data.ts             # Unified portfolio export bridge
├── lib/
│   ├── content.ts                    # Type-safe JSON retrieval engine & fallbacks
│   └── utils.ts                      # Tailwind cn helper
└── hooks/
    └── use-clipboard.ts         # Clipboard copy with toast & confetti
```

---

## 🛠️ Verification & Build Commands

```bash
# Development server (Turbopack)
npm run dev

# ESLint audit (0 errors, 0 warnings)
npm run lint

# Production build
npm run build
```
