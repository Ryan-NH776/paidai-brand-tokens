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
