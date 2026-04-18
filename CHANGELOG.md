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
