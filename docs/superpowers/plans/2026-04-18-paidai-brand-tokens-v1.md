# `paidai-brand-tokens` v1.0 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a shared design-tokens CSS package (`paidai-brand-tokens`) consumed by all three Pai Dai Next.js properties, eliminating color/font drift at the source.

**Architecture:** A single `theme.css` file in a new public GitHub repo. Distributed via git-based `npm install github:Ryan-NH776/paidai-brand-tokens#v1.0.0`. Each consumer `@import`s it in `src/app/globals.css` and keeps only repo-specific tokens (surface variations, status colors, radius, animations) local. Tokens-only scope — no React components, no shadcn fork, no CSS-in-JS.

**Tech Stack:** Tailwind CSS v4 (`@theme inline` + `@import`), Next.js 16.2.x (all three consumers), npm (all three consumers), git + GitHub for distribution.

**Spec:** `~/projects/paidai-brand-tokens/docs/superpowers/specs/2026-04-18-paidai-ui-tokens-design.md` (commit `556929c`)

---

## Phase 1 — Create the shared package

### Task 1: Author `paidai-brand-tokens/package.json`

**Files:**
- Create: `~/projects/paidai-brand-tokens/package.json`

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "paidai-brand-tokens",
  "version": "1.0.0",
  "description": "Shared design tokens for Pai Dai DMC — colors, fonts, easing, locale font behavior. Consumed by paidaidmc-website, paidai-partner-portal, and paidai-command-center.",
  "type": "module",
  "main": "./theme.css",
  "exports": {
    ".": "./theme.css",
    "./theme.css": "./theme.css"
  },
  "files": [
    "theme.css",
    "README.md",
    "CHANGELOG.md",
    "LICENSE"
  ],
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Ryan-NH776/paidai-brand-tokens.git"
  },
  "keywords": [
    "pai-dai",
    "design-tokens",
    "tailwind",
    "brand"
  ],
  "author": "Ryan (Pai Dai DMC)"
}
```

- [ ] **Step 2: Verify valid JSON**

Run: `cd ~/projects/paidai-brand-tokens && python3 -m json.tool package.json > /dev/null && echo OK`
Expected: `OK`

---

### Task 2: Write `theme.css`

**Files:**
- Create: `~/projects/paidai-brand-tokens/theme.css`

- [ ] **Step 1: Write `theme.css`**

```css
/* paidai-brand-tokens v1.0 — 2026-04-18
 * Single source of truth for Pai Dai brand tokens.
 * Imported by: paidaidmc-website, paidai-partner-portal, paidai-command-center.
 * Canonical values from Pai Dai Brand Identity Guidelines v2.0.
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

- [ ] **Step 2: Verify the file is readable CSS**

Run: `cd ~/projects/paidai-brand-tokens && wc -l theme.css && head -3 theme.css`
Expected: ~80 lines; header comment visible.

---

### Task 3: Write README, CHANGELOG, LICENSE, .gitignore

**Files:**
- Create: `~/projects/paidai-brand-tokens/README.md`
- Create: `~/projects/paidai-brand-tokens/CHANGELOG.md`
- Create: `~/projects/paidai-brand-tokens/LICENSE`
- Create: `~/projects/paidai-brand-tokens/.gitignore`

- [ ] **Step 1: Write `README.md`**

````markdown
# paidai-brand-tokens

Shared design tokens for Pai Dai DMC Next.js properties.

- `paidaidmc.com` (marketing site)
- `portal.paidaidmc.com` (partner portal)
- `ops.paidaidmc.com` (internal Command Center)

Ships one CSS file (`theme.css`) containing Tailwind v4 `@theme inline` token declarations plus locale-scoped CSS rules for Thai / Arabic / RTL typography.

## Install

```bash
npm install github:Ryan-NH776/paidai-brand-tokens#v1.0.0
```

## Use

In your app's `src/app/globals.css`:

```css
@import "tailwindcss";
@import "paidai-brand-tokens/theme.css";

/* Your local overrides / additions below */
@theme inline {
  /* e.g. navy-deep, status colors, radius tokens */
}
```

Each consumer is responsible for loading the referenced fonts via `next/font/google`:

- `--font-playfair` (Playfair Display) — required
- `--font-inter` (Inter) — required
- `--font-thai` (Noto Sans Thai) — only if the app serves Thai content
- `--font-arabic` (Noto Sans Arabic) — only if the app serves Arabic content

## Token reference

### Colors

| Token | Hex | Use |
|---|---|---|
| `navy` | `#1C2B4A` | Logo, headlines, backgrounds |
| `gold` | `#C5973E` | Logo accents, CTAs |
| `paper-white` | `#F7F6F3` | Primary background (warm alternative to pure white) |
| `warm-gray` | `#9B9590` | Supporting text, captions |
| `deep-teal` | `#1A6B5A` | Success states, Thailand accent |
| `mekong-blue` | `#3B6F99` | Links, secondary CTA |
| `sand` | `#E8DFD1` | Warm background, cards |
| `terracotta` | `#B5634B` | Alert, warm accent |
| `charcoal` | `#2D2D2D` | Body text, data |
| `ivory` | `#FAF8F5` | Light background variant |
| `light-gold` | `#D4AF61` | Hover states |
| `slate` | `#5A6775` | Secondary text, borders |

### Typography

- `font-heading` — Playfair Display, Georgia fallback
- `font-body` — Inter, system fallback

### Motion

- `ease-pai-dai` — `cubic-bezier(0.32, 0.72, 0, 1)`

## Versioning

Semver. Breaking = token rename/remove (major). Additive = new token (minor). Hex correction = patch.

Consumers pin a version tag in `package.json`; updates don't auto-propagate — each consumer bumps deliberately via `npm install`.

## License

MIT
````

- [ ] **Step 2: Write `CHANGELOG.md`**

```markdown
# Changelog

## 1.0.0 — 2026-04-18

Initial release. Single source of truth for Pai Dai brand tokens.

### Tokens
- 4 primary palette colors: navy, gold, paper-white, warm-gray
- 8 extended palette colors: deep-teal, mekong-blue, sand, terracotta, charcoal, ivory, light-gold, slate
- 2 font-family declarations: heading (Playfair) + body (Inter)
- 1 motion easing: `--ease-pai-dai`

### Locale rules
- Thai font scoping with `line-height: 1.6` (headings) / `1.9` (body), `letter-spacing: 0`
- Arabic font scoping with `line-height: 1.4` (headings) / `1.75` (body)
- RTL `letter-spacing: 0` on headings + body

### Corrections from prior per-repo values
- `light-gold` canonicalised to `#D4AF61` (was `#D4AD5C` in portal + command-center; brand guide says `#D4AF61`)
- `paper-white` now the canonical name for `#F7F6F3` (was variously `paper`, `paper-white`, or `ivory` across repos)
- `ivory` reclaimed for its brand-guide value `#FAF8F5` (command-center previously used `ivory` as an alias for `#F7F6F3` — that's `paper-white` now)
```

- [ ] **Step 3: Write `LICENSE`**

```text
MIT License

Copyright (c) 2026 Pai Dai DMC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

- [ ] **Step 4: Write `.gitignore`**

```gitignore
node_modules/
.DS_Store
*.log
.env.local
```

- [ ] **Step 5: Verify all files present**

Run: `cd ~/projects/paidai-brand-tokens && ls -1 package.json theme.css README.md CHANGELOG.md LICENSE .gitignore`
Expected: all 6 files listed.

---

### Task 4: Commit the package + create GitHub repo + tag v1.0.0

**Files:**
- Modify: local git history (new commit + tag)
- Create: `https://github.com/Ryan-NH776/paidai-brand-tokens` (public repo)

- [ ] **Step 1: Commit the package files (spec already committed at 556929c)**

Run:
```bash
cd ~/projects/paidai-brand-tokens && \
  git add package.json theme.css README.md CHANGELOG.md LICENSE .gitignore && \
  git -c user.email="ryan@paidaitravel.com" -c user.name="Ryan" commit -m "$(cat <<'EOF'
feat: v1.0.0 package — theme.css + metadata

Ships the shared design tokens package: 12 colors, Playfair/Inter
font declarations, --ease-pai-dai, and Thai/Arabic/RTL locale rules.

See spec 2026-04-18-paidai-ui-tokens-design.md for rationale.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

Expected: commit created. `git log --oneline` shows two commits (spec + package).

- [ ] **Step 2: Create public GitHub repo**

Run:
```bash
cd ~/projects/paidai-brand-tokens && \
  gh repo create paidai-brand-tokens --public --source=. --remote=origin \
    --description="Shared design tokens for Pai Dai DMC Next.js properties" \
    --push
```

Expected: repo created at `https://github.com/Ryan-NH776/paidai-brand-tokens`, branch `main` pushed, confirmation output.

- [ ] **Step 3: Tag v1.0.0 and push the tag**

Run:
```bash
cd ~/projects/paidai-brand-tokens && \
  git tag -a v1.0.0 -m "v1.0.0 — initial release" && \
  git push origin v1.0.0
```

Expected: tag pushed, visible on GitHub releases page.

- [ ] **Step 4: Verify the package is installable**

Run (in a throwaway tmp dir):
```bash
cd /tmp && rm -rf tokens-install-test && mkdir tokens-install-test && cd tokens-install-test && \
  npm init -y > /dev/null && \
  npm install github:Ryan-NH776/paidai-brand-tokens#v1.0.0 2>&1 | tail -3 && \
  ls node_modules/paidai-brand-tokens/theme.css && \
  head -3 node_modules/paidai-brand-tokens/theme.css && \
  cd .. && rm -rf tokens-install-test
```

Expected: `theme.css` present in `node_modules/paidai-brand-tokens/`; first 3 lines show the header comment.

---

## Phase 2 — Command Center migration (riskiest — has the rename)

### Task 5: Install the shared package in Command Center

**Files:**
- Modify: `~/projects/paidai-command-center/package.json`
- Modify: `~/projects/paidai-command-center/package-lock.json`

- [ ] **Step 1: Pre-flight check — ensure clean working tree**

Run:
```bash
cd ~/projects/paidai-command-center && git status
```

Expected: working tree clean OR user has confirmed pending work is safe to branch from. If dirty with unrelated changes, abort and surface to Ryan.

- [ ] **Step 2: Create a feature branch**

Run:
```bash
cd ~/projects/paidai-command-center && \
  git checkout -b feat/paidai-brand-tokens
```

Expected: switched to new branch.

- [ ] **Step 3: Install the package**

Run:
```bash
cd ~/projects/paidai-command-center && \
  npm install github:Ryan-NH776/paidai-brand-tokens#v1.0.0
```

Expected: installed successfully. `package.json` now has `"paidai-brand-tokens": "github:Ryan-NH776/paidai-brand-tokens#v1.0.0"` in dependencies. `node_modules/paidai-brand-tokens/theme.css` exists.

- [ ] **Step 4: Verify the install**

Run:
```bash
cd ~/projects/paidai-command-center && \
  ls node_modules/paidai-brand-tokens/theme.css && \
  grep '"paidai-brand-tokens"' package.json
```

Expected: file exists, package.json entry confirmed.

---

### Task 6: Rewrite Command Center `globals.css` to use the shared import

**Files:**
- Modify: `~/projects/paidai-command-center/src/app/globals.css`

- [ ] **Step 1: Replace the file contents**

Write the full new content:

```css
@import "tailwindcss";
@import "paidai-brand-tokens/theme.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  /* Local surface variation — dark-mode lighter navy for hover states */
  --color-navy-light: #2A3D5E;

  --radius-lg: 0.5rem;
  --radius-md: calc(var(--radius-lg) - 2px);
  --radius-sm: calc(var(--radius-lg) - 4px);
}

/* Dark mode defaults for dashboard */
:root {
  color-scheme: dark;
  /* Triage component CSS custom properties (used by legacy triage views) */
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

Note: the `body` `@apply` changes `text-ivory` → `text-paper-white` because `ivory` now means `#FAF8F5` per the shared tokens; CC's old `ivory` was actually `paper-white`.

- [ ] **Step 2: Verify the file**

Run:
```bash
cd ~/projects/paidai-command-center && \
  head -5 src/app/globals.css && \
  grep -c "text-paper-white" src/app/globals.css
```

Expected: header shows `@import "tailwindcss";` and `@import "paidai-brand-tokens/theme.css";`. `grep -c` returns `1` (the `@apply` line).

---

### Task 7: Sed-rename all `ivory` → `paper-white` across Command Center source

**Files:**
- Modify: ~55 `.tsx` / `.ts` files under `~/projects/paidai-command-center/src/`

- [ ] **Step 1: Count current `\bivory\b` occurrences for baseline**

Run:
```bash
cd ~/projects/paidai-command-center && \
  grep -rn '\bivory\b' src --include='*.tsx' --include='*.ts' | wc -l
```

Expected: **55** (matches the audit count). If different, investigate before proceeding.

- [ ] **Step 2: Run the sed rename**

Run:
```bash
cd ~/projects/paidai-command-center && \
  find src -type f \( -name '*.tsx' -o -name '*.ts' \) \
    -exec perl -i -pe 's/\bivory\b/paper-white/g' {} +
# Note: BSD sed on macOS does NOT support \b word boundaries.
# Use perl -i -pe instead. Original plan used sed but it silently matched nothing.
```

Expected: no output (sed `-i ''` is quiet on macOS).

- [ ] **Step 3: Verify zero remaining `\bivory\b` in source**

Run:
```bash
cd ~/projects/paidai-command-center && \
  grep -rn '\bivory\b' src --include='*.tsx' --include='*.ts' | wc -l
```

Expected: **0**.

- [ ] **Step 4: Verify 55 new `\bpaper-white\b` occurrences (sanity check — matches rename count)**

Run:
```bash
cd ~/projects/paidai-command-center && \
  grep -rn '\bpaper-white\b' src --include='*.tsx' --include='*.ts' | wc -l
```

Expected: **≥ 55** (may exceed if any `paper-white` already existed; any large discrepancy means sed misfired).

- [ ] **Step 5: Human diff review**

Run:
```bash
cd ~/projects/paidai-command-center && \
  git diff --stat src/
```

Expected: ~30–35 files modified with small per-file diffs. Scroll a sample with `git diff src/app/(app)/dashboard` — confirm all changes are `text-ivory` / `hover:text-ivory` / `bg-ivory` etc., NOT variable names, comments, or unrelated text.

---

### Task 8: Build + dev smoke-test Command Center

**Files:** (none modified — verification only)

- [ ] **Step 1: Build**

Run:
```bash
cd ~/projects/paidai-command-center && \
  npm run build 2>&1 | tail -20
```

Expected: build completes successfully. No Tailwind or TypeScript errors. If there's a build error, read it — typically an unresolved `ivory` reference elsewhere (e.g., in a MDX file or another extension the sed skipped).

- [ ] **Step 2: Run typecheck**

Run:
```bash
cd ~/projects/paidai-command-center && \
  npx tsc --noEmit 2>&1 | tail -5
```

Expected: no errors.

- [ ] **Step 3: Dev-server smoke test (ops.paidaidmc.com equivalent)**

Run:
```bash
cd ~/projects/paidai-command-center && npm run dev
```

Visit in browser (or via Puppeteer screenshot tool if Claude is executing unattended):
- `http://localhost:3000/dashboard`
- `http://localhost:3000/tours`
- `http://localhost:3000/analytics`

Expected: pages render; text is visible (not invisible-on-invisible); buttons/links/tables look unchanged visually from prior to migration.

If using Claude unattended, use `~/.agents/scripts/portal-screenshot.mjs` equivalent for command-center (if one exists) or take manual screenshots via Puppeteer.

- [ ] **Step 4: Stop dev server**

Run: Ctrl+C in the dev-server terminal.

---

### Task 9: Commit CC changes + deploy preview + compare

**Files:**
- Modify: local git history (new commit)

- [ ] **Step 1: Commit the migration**

Run:
```bash
cd ~/projects/paidai-command-center && \
  git add package.json package-lock.json src/app/globals.css src/ && \
  git -c user.email="ryan@paidaitravel.com" -c user.name="Ryan" commit -m "$(cat <<'EOF'
feat: migrate to paidai-brand-tokens v1.0.0

- Import shared tokens from paidai-brand-tokens package
- Rename ivory → paper-white (55 call sites) because the local
  'ivory' alias was really paper-white (#F7F6F3); 'ivory' now means
  its brand-guide value #FAF8F5
- Keep navy-light, radius tokens, and triage :root vars local

See spec: ~/projects/paidai-brand-tokens/docs/superpowers/specs/
  2026-04-18-paidai-ui-tokens-design.md

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

Expected: commit created.

- [ ] **Step 2: Deploy to Vercel preview**

Run:
```bash
cd ~/projects/paidai-command-center && \
  vercel 2>&1 | tail -5
```

Expected: preview URL printed (e.g., `paidai-command-center-xxxx.vercel.app`).

- [ ] **Step 3: Compare preview vs prod visually**

Open both in the browser (or via screenshot tool):
- Preview URL (from step 2) — `/dashboard`, `/tours`, `/analytics`
- Prod URL — `ops.paidaidmc.com/dashboard`, `/tours`, `/analytics`

Expected: visually identical except possibly a slightly different gold shade on hover (the `#D4AD5C` → `#D4AF61` correction). No invisible text, no broken layout, no missing background colors.

- [ ] **Step 4: Deploy to production**

Run:
```bash
cd ~/projects/paidai-command-center && \
  vercel --prod 2>&1 | tail -5
```

Expected: prod URL printed. `ops.paidaidmc.com` now serves the migrated build.

- [ ] **Step 5: Post-deploy verification**

Run:
```bash
curl -sI https://ops.paidaidmc.com/sign-in | head -3
```

Expected: `HTTP/2 200` response.

---

## Phase 3 — Portal migration

### Task 10: Install + rewrite portal `globals.css`

**Files:**
- Modify: `~/projects/paidai-partner-portal/package.json`
- Modify: `~/projects/paidai-partner-portal/src/app/globals.css`

- [ ] **Step 1: Create feature branch + install**

Run:
```bash
cd ~/projects/paidai-partner-portal && \
  git status && \
  git checkout -b feat/paidai-brand-tokens && \
  npm install github:Ryan-NH776/paidai-brand-tokens#v1.0.0
```

Expected: branch created, package installed. Working tree should be clean before branch creation.

- [ ] **Step 2: Replace `src/app/globals.css` contents**

Write the full new content:

```css
@import "tailwindcss";
@import "paidai-brand-tokens/theme.css";

@theme inline {
  /* Local surface variations for portal dark mode */
  --color-navy-deep: #0D1929;
  --color-navy-mid: #162238;

  /* Semi-transparent gold tints used in badges and borders */
  --color-gold-dim: rgba(197, 151, 62, 0.08);
  --color-gold-border: rgba(197, 151, 62, 0.2);

  /* Semantic status colors — not brand, UI-only */
  --color-status-red: #dc2626;
  --color-status-orange: #f59e0b;
  --color-status-yellow: #ca8a04;
  --color-status-green: #22c55e;
  --color-status-blue: #2563eb;
  --color-status-gray: #666666;

  /* Portal-specific font aliases (used by existing components) */
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}

html {
  color-scheme: dark;
}

body {
  background-color: var(--color-navy-deep);
  color: var(--color-paper-white);
  font-family: var(--font-sans);
}

/* Locale-scoped font families — override Inter for scripts where it's not ideal.
   Unlayered CSS wins over @layer utilities from Tailwind v4 @theme inline. */
html[lang="th"] body,
html[lang="th"] .font-sans {
  font-family: var(--font-thai), "Inter", ui-sans-serif, system-ui, sans-serif;
}

html[lang="ar"] body,
html[lang="ar"] .font-sans {
  font-family: var(--font-arabic), "Inter", ui-sans-serif, system-ui, sans-serif;
}

/* RTL tweaks: flip the default dropdown chevron spacing where we can't easily
   replace mr-/ml- utilities. Explicit cases are handled per-component. */
html[dir="rtl"] {
  --dir: rtl;
}
```

Note: `body` color changes from `var(--color-paper)` (old local name) to `var(--color-paper-white)` (shared canonical name). Same hex `#F7F6F3`, identical render.

- [ ] **Step 3: Check for stale `--color-paper` references**

Run:
```bash
cd ~/projects/paidai-partner-portal && \
  grep -rn 'var(--color-paper)\|bg-paper\b\|text-paper\b' src --include='*.tsx' --include='*.ts' --include='*.css'
```

Expected: zero matches (or only the body line we just fixed). If matches exist, they're tailwind classes that need rename: `bg-paper` → `bg-paper-white`, `text-paper` → `text-paper-white`.

- [ ] **Step 4: If any `\bpaper\b` tailwind utility references exist, sed them**

Run (conditional on Step 3 finding matches):
```bash
cd ~/projects/paidai-partner-portal && \
  find src -type f \( -name '*.tsx' -o -name '*.ts' \) \
    -exec perl -i -pe 's/\b(bg|text|border|hover:bg|hover:text|hover:border|ring)-paper\b/$1-paper-white/g' {} +
# Note: use perl (not BSD sed) for \b regex portability on macOS.
```

Run the check from Step 3 again — expected: zero matches.

---

### Task 11: Build + smoke Portal

**Files:** (verification only)

- [ ] **Step 1: Build**

Run:
```bash
cd ~/projects/paidai-partner-portal && \
  npm run build 2>&1 | tail -10
```

Expected: build succeeds.

- [ ] **Step 2: Run existing tests**

Run:
```bash
cd ~/projects/paidai-partner-portal && \
  npm test 2>&1 | tail -5
```

Expected: all 114 tests pass (baseline from portal CLAUDE.md).

- [ ] **Step 3: Dev-server smoke**

Run: `cd ~/projects/paidai-partner-portal && npm run dev`

Visit:
- `http://localhost:3000/sign-in` (gold hover on the primary button)
- `http://localhost:3000/dashboard` (requires auth — skip if no test Clerk session)
- `http://localhost:3000/ar/sign-in` (RTL, gold hover)

Expected: gold hover renders at `#D4AF61` (slightly different from previous `#D4AD5C`, intentional correction). Layout unchanged.

- [ ] **Step 4: Stop dev server**

Ctrl+C.

---

### Task 12: Commit + deploy Portal

**Files:**
- Modify: local git history (new commit)

- [ ] **Step 1: Commit the migration**

Run:
```bash
cd ~/projects/paidai-partner-portal && \
  git add package.json package-lock.json src/app/globals.css src/ && \
  git -c user.email="ryan@paidaitravel.com" -c user.name="Ryan" commit -m "$(cat <<'EOF'
feat: migrate to paidai-brand-tokens v1.0.0

- Import shared tokens from paidai-brand-tokens package
- light-gold hex corrected to brand-guide value #D4AF61
  (was #D4AD5C locally)
- Keep navy-deep, navy-mid, gold-dim/border, status colors local

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

Expected: commit created.

- [ ] **Step 2: Deploy preview**

Run: `cd ~/projects/paidai-partner-portal && vercel 2>&1 | tail -5`
Expected: preview URL printed.

- [ ] **Step 3: Visual compare preview vs portal.paidaidmc.com**

Open preview sign-in and `/ar/sign-in` side-by-side with prod. Gold hover may look slightly different (brand-guide correction).

- [ ] **Step 4: Deploy prod**

Run: `cd ~/projects/paidai-partner-portal && vercel --prod 2>&1 | tail -5`
Expected: deployed successfully.

- [ ] **Step 5: Post-deploy verification**

Run: `curl -sI https://portal.paidaidmc.com/sign-in | head -3`
Expected: `HTTP/2 200`.

---

## Phase 4 — Website migration

### Task 13: Install + rewrite website `globals.css`

**Files:**
- Modify: `~/projects/paidaidmc-website/package.json`
- Modify: `~/projects/paidaidmc-website/src/app/globals.css`

- [ ] **Step 1: Create feature branch + install**

Run:
```bash
cd ~/projects/paidaidmc-website && \
  git status && \
  git checkout -b feat/paidai-brand-tokens && \
  npm install github:Ryan-NH776/paidai-brand-tokens#v1.0.0
```

Expected: branch created, package installed.

- [ ] **Step 2: Replace `src/app/globals.css` contents**

Write the full new content (keeps all website-specific CSS: `underline-slide`, `kenBurns`, `chevronPulse`, `::selection`, stats RTL column flip, lucide arrow flip, scroll-progress RTL flip):

```css
@import "tailwindcss";
@import "paidai-brand-tokens/theme.css";

/* Lenis smooth scroll */
html.lenis,
html.lenis body {
  height: auto;
}

/* Underline slide-in animation */
.underline-slide {
  position: relative;
}
.underline-slide::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--color-gold);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s var(--ease-pai-dai);
}
.underline-slide:hover::after {
  transform: scaleX(1);
}

/* Selection colors */
::selection {
  background: rgba(197, 151, 62, 0.2);
  color: #1C2B4A;
}

body {
  background: var(--color-ivory);
  color: var(--color-charcoal);
  font-family: var(--font-body), system-ui, sans-serif;
}

/* Scroll indicator pulse */
@keyframes chevronPulse {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(8px); opacity: 0.4; }
}

/* Ken Burns for destination cards */
@keyframes kenBurns {
  from { transform: scale(1); }
  to { transform: scale(1.05); }
}

/* RTL: flip underline animation origin */
[dir="rtl"] .underline-slide::after {
  transform-origin: right;
}

/* RTL: flip scroll progress bar origin */
[dir="rtl"] .scroll-progress {
  left: auto;
  right: 0;
}

/* RTL: Stats — force LTR rendering on number values (contain LTR symbols: +, %, <) */
[dir="rtl"] [data-stat] .font-heading {
  direction: ltr;
  unicode-bidi: embed;
  text-align: right;
}

/* RTL: Stats — right-align the label text */
[dir="rtl"] [data-stat] {
  text-align: right;
}

/* RTL: Stats — flip column separator divider from left edge to right edge */
[dir="rtl"] [data-stat] .absolute {
  left: auto;
  right: 0;
}

/* RTL: flip ArrowUpRight icons to match reading direction */
[dir="rtl"] .lucide-arrow-up-right {
  transform: scaleX(-1);
}
```

Note: website's body uses `var(--color-ivory)` (= `#FAF8F5`, brand-guide ivory) as background — same as before. `var(--color-charcoal)` (= `#2D2D2D`) for body text — same as before. No visual shift for the website.

- [ ] **Step 3: Verify `--ease-pai-dai` references resolve**

Run:
```bash
cd ~/projects/paidaidmc-website && \
  grep -rn 'ease-pai-dai\|var(--ease-pai-dai)' src --include='*.tsx' --include='*.ts' --include='*.css' | head -5
```

Expected: references exist and all use the same `--ease-pai-dai` custom property that the shared `theme.css` now defines.

---

### Task 14: Build + smoke Website (including RTL + Thai pages)

**Files:** (verification only)

- [ ] **Step 1: Build**

Run:
```bash
cd ~/projects/paidaidmc-website && \
  npm run build 2>&1 | tail -10
```

Expected: build succeeds; all 87 static pages generated.

- [ ] **Step 2: Dev-server smoke**

Run: `cd ~/projects/paidaidmc-website && npm run dev` (port 3003 per memory)

Visit:
- `http://localhost:3003/` — home
- `http://localhost:3003/experiences` — filterable grid
- `http://localhost:3003/ar` — Arabic RTL
- `http://localhost:3003/th` — Thai

Expected: all pages render. Arabic page shows RTL layout, Arabic font, correct line-heights. Thai page shows Thai font, generous line-height. Gold underline animations work (powered by `--ease-pai-dai`, now sourced from shared tokens).

- [ ] **Step 3: Stop dev server**

Ctrl+C.

---

### Task 15: Commit + deploy Website

**Files:**
- Modify: local git history (new commit)

- [ ] **Step 1: Commit**

Run:
```bash
cd ~/projects/paidaidmc-website && \
  git add package.json package-lock.json src/app/globals.css && \
  git -c user.email="ryan@paidaitravel.com" -c user.name="Ryan" commit -m "$(cat <<'EOF'
feat: migrate to paidai-brand-tokens v1.0.0

- Import shared tokens (identical values to prior local declarations)
- Keep underline-slide, kenBurns, stats RTL, lucide arrow flip,
  scroll-progress RTL, ::selection, body defaults local

Zero visual change expected.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

Expected: commit created.

- [ ] **Step 2: Deploy preview**

Run: `cd ~/projects/paidaidmc-website && vercel 2>&1 | tail -5`
Expected: preview URL.

- [ ] **Step 3: Visual compare**

Open preview vs `paidaidmc.com` side-by-side:
- `/` (home)
- `/experiences`
- `/ar`
- `/th`

Expected: visually identical. Website already used brand-guide values; this is essentially a code-organisation change with no rendered-output difference.

- [ ] **Step 4: Deploy prod**

Run: `cd ~/projects/paidaidmc-website && vercel --prod 2>&1 | tail -5`
Expected: deployed.

- [ ] **Step 5: Post-deploy verification**

Run: `curl -sI https://paidaidmc.com/ | head -3`
Expected: `HTTP/2 200`.

---

## Phase 5 — Cross-cutting verification + wrap

### Task 16: End-to-end verification across all 3 properties

**Files:** (verification only)

- [ ] **Step 1: Confirm shared-tokens repo has tag + README + theme.css live**

Run:
```bash
curl -sI https://raw.githubusercontent.com/Ryan-NH776/paidai-brand-tokens/v1.0.0/theme.css | head -3
```

Expected: `HTTP/2 200`.

- [ ] **Step 2: Confirm each consumer's `package.json` pins the shared package**

Run:
```bash
for d in paidaidmc-website paidai-partner-portal paidai-command-center; do \
  echo "=== $d ==="; \
  grep '"paidai-brand-tokens"' ~/projects/$d/package.json || echo "MISSING"; \
done
```

Expected: all three print `"paidai-brand-tokens": "github:Ryan-NH776/paidai-brand-tokens#v1.0.0"`.

- [ ] **Step 3: Confirm zero drift in each consumer's globals.css (colors come from shared import only)**

Run:
```bash
for d in paidaidmc-website paidai-partner-portal paidai-command-center; do \
  echo "=== $d globals.css ==="; \
  grep -E '^\s*--color-(navy|gold|paper-white|warm-gray):' ~/projects/$d/src/app/globals.css || echo "(none — inherited from shared import ✓)"; \
done
```

Expected: each repo prints `(none — inherited from shared import ✓)`. If any repo still defines `--color-navy` / `--color-gold` / `--color-paper-white` / `--color-warm-gray` locally, that's drift — the shared import is already defining them.

- [ ] **Step 4: Confirm all three prod URLs responding**

Run:
```bash
for url in https://paidaidmc.com/ https://portal.paidaidmc.com/sign-in https://ops.paidaidmc.com/sign-in; do \
  echo "$url → $(curl -sI $url | head -1)"; \
done
```

Expected: each returns `HTTP/2 200` (or `HTTP/2 307` for portal if there's an intermediate redirect, followed by 200 on the redirect target).

- [ ] **Step 5: Update the related vault note with the shipped outcome**

Modify `/Users/macbook/Documents/Obsidian Vault/Library/Business Research/Website & Digital/Partner Portal Design + Brand Unification + Mobile App Feasibility — April 2026.md` — append a `## Shipped` section at the bottom:

```markdown
---

## Shipped (2026-04-18)

`paidai-brand-tokens` v1.0.0 released at https://github.com/Ryan-NH776/paidai-brand-tokens — 12 colors, Playfair/Inter, `--ease-pai-dai`, Thai/Arabic/RTL rules. All 3 properties migrated the same day:
- `ops.paidaidmc.com` (Command Center) — `ivory` → `paper-white` rename across 55 call sites; no visual change.
- `portal.paidaidmc.com` (Portal) — `light-gold` hex corrected to `#D4AF61` (brand-guide value).
- `paidaidmc.com` (Website) — import-only refactor, zero visual change.

All three now share one canonical source for brand tokens.
```

Expected: file updated, heading visible.

- [ ] **Step 6: Delete feature branches after prod verification holds for 24 hours**

(Not executed in this plan — Ryan's judgement call. Note in session handoff.)

---

## Self-review

**Spec coverage:**
- Package architecture (spec §Architecture) → Task 1–4 ✓
- Token inventory (spec §Token inventory) → Task 2 ✓
- Command Center migration (spec §Step 1) → Task 5–9 ✓
- Portal migration (spec §Step 2) → Task 10–12 ✓
- Website migration (spec §Step 3) → Task 13–15 ✓
- Rollback path (spec §Rollback) → covered by feature-branch + revert pattern in each phase
- Versioning (spec §Versioning) → README §Versioning + Task 4 Step 3 ✓
- Verification (spec §Verification) → Task 8, 11, 14, 16 ✓

**Placeholder scan:** No TBD, TODO, "implement later," "similar to" — all code is concrete, all commands are real.

**Type consistency:** Token names used throughout (`--color-navy`, `--color-paper-white`, `--color-ivory`, `--color-light-gold`) are consistent with the `theme.css` definitions.

**Open item flagged for Ryan:** CC body `@apply` changed `text-ivory` → `text-paper-white` because the old `ivory` alias was really paper-white. Dashboard pages were dark-mode with light text on navy bg — the new `text-paper-white` hex (`#F7F6F3`) equals CC's old `ivory` value. Zero visual change, just renaming. Flagged in Task 6 Step 1.
