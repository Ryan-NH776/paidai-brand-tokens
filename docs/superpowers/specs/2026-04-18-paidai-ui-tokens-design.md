# Pai Dai Brand Tokens — Shared Design Tokens Package (v1.0)

**Date:** 2026-04-18
**Author:** Ryan (with Claude)
**Status:** Design approved, ready for implementation planning
**Repo:** `paidai-brand-tokens` (to be created on GitHub)
**Origin:** [[Partner Portal Design + Brand Unification + Mobile App Feasibility — April 2026]] research panel finding — "brand cohesion belongs at the token layer, not the surface layer"

---

## Problem

Pai Dai DMC operates three production Next.js properties that are supposed to look like one company but have drifted:

- `paidaidmc.com` (marketing site) — `~/projects/paidaidmc-website/`
- `portal.paidaidmc.com` (partner portal) — `~/projects/paidai-partner-portal/`
- `ops.paidaidmc.com` (internal Command Center) — `~/projects/paidai-command-center/`

All three are on identical stacks (Next.js 16.2.x, React 19.2.4, Tailwind CSS v4, npm). But each owns its own color/font token declarations in `src/app/globals.css`, and drift has accumulated:

| Symptom | Evidence |
|---|---|
| Same name, different color | `--color-ivory` = `#FAF8F5` in website, but `#F7F6F3` in Command Center. Two different colors wearing the same label. |
| Drifted hex from brand guide | `--color-gold-light` = `#D4AD5C` in portal + CC, but brand guide v2.0 says `#D4AF61`. |
| Inconsistent naming | `#F7F6F3` is `--color-paper-white` in website, `--color-paper` in portal, `--color-ivory` in CC — three names for the same color across three repos. |
| Extended palette only in one repo | Brand guide's deep-teal, mekong-blue, sand, terracotta, slate, charcoal only live in the website; portal and CC have none of them. |

This design fixes drift at the source by creating a single authoritative source for brand tokens, consumed by all three repos via `npm install`.

---

## Goals

1. Single source of truth for Pai Dai brand design tokens (colors, fonts, easing).
2. Canonical names matching Brand Guide v2.0.
3. Each consumer repo imports one file; updates propagate via `npm update` on version bump.
4. Locale font behavior (RTL, Thai, Arabic) shared where relevant; no-ops in English-only apps.
5. Shipped in ≤4 hours of focused work.

## Non-goals (explicitly out of scope)

- **No shared React components.** Button/Card/Badge stay per-repo. Research panel's finding: density/interaction model should diverge; only tokens should unify. Tokens-only scope locks in ~95% of the brand cohesion at <10% of the cost of a full design system.
- **No shared Nav/Footer/AppShell.** Marketing site, portal, and Command Center have fundamentally different navigation models.
- **No shadcn/ui fork or override.** Command Center continues to use shadcn primitives directly.
- **No CSS-in-JS runtime.** Just a static `.css` file imported at build time.
- **No npm publish.** Distributed via git-based `npm install github:…` — zero new account/registry setup.
- **No breaking changes to end-user UI.** CC will rename `ivory` → `paper-white` internally but users see identical colors (same hex, canonical name).

---

## Architecture

### Package structure

```
paidai-brand-tokens/
├── package.json          → name: "paidai-brand-tokens", main: "./theme.css"
├── theme.css             → the single shipped artifact (~80 lines)
├── README.md             → usage + token reference
├── CHANGELOG.md          → version history
├── LICENSE               → MIT
└── docs/superpowers/specs/
    └── 2026-04-18-paidai-ui-tokens-design.md   ← this document
```

### Distribution mechanism

Git-based npm install from the `paidai-brand-tokens` public GitHub repo. Each consumer repo's `package.json`:

```json
"dependencies": {
  "paidai-brand-tokens": "github:Ryan-NH776/paidai-brand-tokens#v1.0.0"
}
```

Consumers get the package via `npm install`. To update: bump the version tag in `package.json`, run `npm install`.

### Consumer integration

Each consumer repo's `src/app/globals.css`:

```css
@import "tailwindcss";
@import "paidai-brand-tokens/theme.css";

/* Local-only: repo-specific theming (surface variations, status colors, radius tokens) */
@theme inline {
  /* Command Center example: */
  --color-navy-light: #2A3D5E;
  --radius-lg: 0.5rem;
}

/* Local-only: repo-specific CSS (animations, component tweaks) */
/* … underline-slide, kenBurns, scroll-progress RTL flip, etc. … */
```

Tailwind v4 resolves `@theme` blocks from imports and local files together — no conflict, local declarations override shared if both define the same key.

---

## Token inventory (`theme.css`)

```css
/* paidai-brand-tokens v1.0 — 2026-04-18
 * Single source of truth for Pai Dai brand tokens.
 * Imported by: paidaidmc-website, paidai-partner-portal, paidai-command-center.
 */

@theme inline {
  /* Primary palette (Brand Guide v2.0 §4.1) */
  --color-navy:        #1C2B4A;
  --color-gold:        #C5973E;
  --color-paper-white: #F7F6F3;
  --color-warm-gray:   #9B9590;

  /* Extended palette (Brand Guide v2.0 §4.2) */
  --color-deep-teal:   #1A6B5A;
  --color-mekong-blue: #3B6F99;
  --color-sand:        #E8DFD1;
  --color-terracotta:  #B5634B;
  --color-charcoal:    #2D2D2D;
  --color-ivory:       #FAF8F5;
  --color-light-gold:  #D4AF61;
  --color-slate:       #5A6775;

  /* Typography
   * Consumers must load Playfair Display and Inter via next/font/google
   * and expose them as CSS custom properties --font-playfair / --font-inter
   * on the document root. Websites with Thai/Arabic content must also
   * load Noto Sans Thai / Noto Sans Arabic as --font-thai / --font-arabic. */
  --font-heading: var(--font-playfair), Georgia, serif;
  --font-body:    var(--font-inter), system-ui, sans-serif;

  /* Brand motion */
  --ease-pai-dai: cubic-bezier(0.32, 0.72, 0, 1);
}

/* Thai locale — font + typography adjustments
 * Noto Sans Thai; generous leading for stacked vowel/tone marks;
 * zero letter-spacing (tracking-tight inappropriate for abugida scripts). */
[lang="th"] {
  --font-body: var(--font-thai), var(--font-inter), system-ui, sans-serif;
}
[lang="th"] .font-heading,
[lang="th"] h1, [lang="th"] h2, [lang="th"] h3,
[lang="th"] h4, [lang="th"] h5, [lang="th"] h6 {
  font-family: var(--font-thai), system-ui, sans-serif;
  line-height: 1.6;
  letter-spacing: 0;
}
[lang="th"] .font-body,
[lang="th"] p,
[lang="th"] li {
  font-family: var(--font-thai), var(--font-inter), system-ui, sans-serif;
  line-height: 1.9;
}

/* Arabic locale — font + typography adjustments
 * Noto Sans Arabic denser than Playfair; tight line-height clips glyphs.
 * Connected script benefits from generous body leading. */
[lang="ar"] {
  --font-heading: var(--font-arabic), var(--font-playfair), serif;
  --font-body:    var(--font-arabic), var(--font-inter), system-ui, sans-serif;
}
[lang="ar"] .font-heading,
[lang="ar"] h1, [lang="ar"] h2, [lang="ar"] h3,
[lang="ar"] h4, [lang="ar"] h5, [lang="ar"] h6 {
  font-family: var(--font-arabic), var(--font-playfair), serif;
  line-height: 1.4;
}
[lang="ar"] .font-body,
[lang="ar"] p,
[lang="ar"] li {
  font-family: var(--font-arabic), var(--font-inter), system-ui, sans-serif;
  line-height: 1.75;
}

/* RTL — zero letter-spacing on headings and body
 * Connected-script languages (Arabic) shouldn't be tracked. */
[dir="rtl"] h1, [dir="rtl"] h2, [dir="rtl"] h3,
[dir="rtl"] h4, [dir="rtl"] h5, [dir="rtl"] h6,
[dir="rtl"] p {
  letter-spacing: 0;
}
```

### What stays LOCAL to each consumer

| Category | Rationale |
|---|---|
| Navy surface variations (`navy-deep`, `navy-mid`, `navy-light`) | Dark-mode composition, not brand identity |
| Status / semantic colors (red/orange/yellow/green/blue) | UI semantics, not brand |
| Radius tokens (shadcn conventions) | Per-app design decisions |
| Mode defaults (dark body bg in portal/CC, light in website) | Each app's choice |
| Custom CSS animations (`underline-slide`, `kenBurns`) | App-specific creative |
| RTL component tweaks (`lucide-arrow-up-right` flip, stats column flip, scroll-progress flip) | App-specific DOM |

---

## Migration plan

**Order: Command Center → Portal → Website.** Riskiest first so issues surface early; website last because it already matches Brand Guide v2.0 values.

### Step 0: Create the shared repo

1. `gh repo create paidai-brand-tokens --public` on GitHub
2. Clone to `~/projects/paidai-brand-tokens/`
3. Author `theme.css`, `package.json`, `README.md`, `CHANGELOG.md`, `LICENSE`
4. Commit, push, tag `v1.0.0`, push tag

### Step 1: Command Center migration (riskiest — has the rename)

**Why first:** 55 call sites of `ivory` need to rename to `paper-white`. Catches any unexpected issues before portal/website adoption.

1. `npm install github:Ryan-NH776/paidai-brand-tokens#v1.0.0`
2. Replace the `@theme inline` block in `src/app/globals.css` with:
   ```css
   @import "tailwindcss";
   @import "paidai-brand-tokens/theme.css";
   @custom-variant dark (&:is(.dark *));

   @theme inline {
     --color-navy-light: #2A3D5E;  /* local surface variation */
     --radius-lg: 0.5rem;
     --radius-md: calc(var(--radius-lg) - 2px);
     --radius-sm: calc(var(--radius-lg) - 4px);
   }

   :root {
     color-scheme: dark;
     /* Triage custom properties kept local */
     --pd-navy: #1C2B4A;
     --pd-navy-deep: #0D1929;
     --pd-navy-mid: #162238;
     --pd-gold: #C5973E;
     --pd-gold-border: rgba(197, 151, 62, 0.2);
     --pd-gold-dim: rgba(197, 151, 62, 0.08);
     --pd-paper: #F7F6F3;
     --pd-warm-gray: #9B9590;
   }

   body {
     @apply bg-navy text-paper-white antialiased;
     font-family: var(--font-sans);
   }
   ```
3. Rename `ivory` → `paper-white`:
   ```bash
   find src -type f \( -name "*.tsx" -o -name "*.ts" \) \
     -exec sed -i '' 's/\bivory\b/paper-white/g' {} +
   ```
4. Diff review — confirm no false positives in comments / variable names
5. `npm run dev` → visual smoke test dashboard, tours page, analytics page
6. `npm run build` → zero errors
7. `vercel --prod` → visual regression check against current prod
8. Commit: "migrate to paidai-brand-tokens v1.0.0"

### Step 2: Portal migration (~30 min)

1. `npm install github:Ryan-NH776/paidai-brand-tokens#v1.0.0`
2. Replace the `@theme inline` color declarations with the `@import`; keep local:
   ```css
   @theme inline {
     --color-navy-deep: #0D1929;
     --color-navy-mid: #162238;
     --color-gold-dim: rgba(197, 151, 62, 0.08);
     --color-gold-border: rgba(197, 151, 62, 0.2);

     --color-status-red: #dc2626;
     --color-status-orange: #f59e0b;
     --color-status-yellow: #ca8a04;
     --color-status-green: #22c55e;
     --color-status-blue: #2563eb;
     --color-status-gray: #666666;
   }
   ```
3. `--color-gold-light` now auto-resolves to `#D4AF61` (brand-correct). Existing `hover:text-gold-light` classes keep working — just with slightly corrected hex. 4 call sites get a trivial shade shift; no source change.
4. `npm run dev` → smoke test sign-in page (gold hover), dashboard, groups
5. `vercel --prod` → visual regression
6. Commit.

### Step 3: Website migration (~30 min)

1. `npm install github:Ryan-NH776/paidai-brand-tokens#v1.0.0`
2. Replace the `@theme inline` colors + the locale font CSS with the `@import`; keep local:
   - `underline-slide` animation + `::after` pseudo-element
   - `kenBurns` keyframe
   - `chevronPulse` keyframe
   - `scroll-progress` RTL flip
   - Stats RTL column flip (`[dir="rtl"] [data-stat] .absolute`)
   - `.lucide-arrow-up-right` RTL flip
   - `::selection` colors
3. `npm run dev` → smoke test home + `/experiences` + `/ar` (Arabic RTL)
4. `vercel --prod` → visual regression
5. Commit.

---

## Rollback

Each repo's adoption is a single commit. Rollback = `git revert <commit>` + `vercel --prod`. Shared repo is pinned to `v1.0.0` in each consumer's `package.json` — future updates to the shared repo don't auto-propagate; each consumer bumps deliberately.

---

## Versioning

Semver applied to the shared repo:
- **Major** (v2.0.0) — renaming a token, removing a color. Requires coordinated consumer updates.
- **Minor** (v1.1.0) — adding a new token. Non-breaking; consumers pick up at next bump.
- **Patch** (v1.0.1) — hex value correction. Non-breaking in name; may cause minor visual shift.

Each consumer upgrades by editing the pinned version in `package.json` and running `npm install`.

---

## Verification

- **No unit tests needed** — CSS-only artifact, no JS logic.
- **Build smoke** — each consumer's `npm run build` must succeed post-migration.
- **Visual smoke** — human walk-through of:
  - Command Center: dashboard, tours, analytics (light + dark if applicable)
  - Portal: sign-in (gold hover), dashboard, groups, Arabic `/ar` page
  - Website: `/` home, `/experiences`, `/ar` Arabic RTL

---

## Timeline

| Phase | Estimate |
|---|---|
| Shared repo creation + `theme.css` authoring | 1 hr |
| Command Center migration (with `ivory` rename) | 1–1.5 hr |
| Portal migration | 30 min |
| Website migration | 30 min |
| **Total** | **3–4 hr of focused work** |

Comfortably within the "~1 day" scope.

---

## Open questions / future work

- **Is `paidai-brand-tokens` the right name?** Alternatives considered: `@paidai/ui`, `paidai-tokens`, `paidai-design-tokens`. Went with `paidai-brand-tokens` because it signals scope (tokens, not components) and ownership (brand, not engineering).
- **Should `light-gold` drift correction trigger a visual design review?** The current (drifted) `#D4AD5C` is slightly warmer/darker than the brand-guide `#D4AF61`. Tiny visible difference. Flag: ask Sally/Kinan whether they want to see the before/after or trust the brand guide.
- **Future v1.1**: Could add brand gradient variables (hero overlays) and standard drop-shadow tokens. Not in scope for v1.0.
- **Future v2**: If Pai Dai eventually wants shared React components (Button, Card, Badge), the package evolves from CSS-only to a proper npm package with JSX exports. Not on the roadmap.

---

## Related

- [[Partner Portal Design + Brand Unification + Mobile App Feasibility — April 2026]] — origin research panel
- [[Brand Identity Guidelines]] — v2.0 canonical values
- [[DMC Website Competitive Research]]
- `~/projects/paidaidmc-website/src/app/globals.css` — current website tokens (richest)
- `~/projects/paidai-partner-portal/src/app/globals.css` — current portal tokens (has navy surface variations)
- `~/projects/paidai-command-center/src/app/globals.css` — current CC tokens (has `ivory` mislabel)
