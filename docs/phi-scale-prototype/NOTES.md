# Golden-ratio scale — prototype notes (2026-06-08)

Status: **PROTOTYPE / experiment.** Nothing here is imported by `theme.css` or shipped to any
consumer. This folder exists so the idea + visual proof are sitting next to the real tokens for
when we next touch the marketing site or the PDF templates.

Origin: teardown of *"LiftKit Spacing Explained"* (Chainlift, https://www.youtube.com/watch?v=r1DANFZYJDw).
Skip the framework itself (Webflow-origin; we're Tailwind v4) — borrow the design math.

## Files
- `scale-phi.css` — proposed `@theme` tokens (φ type + spacing scale, plus an optical-padding helper).
- `prototype.html` — same Pai Dai section rendered with Tailwind's linear scale vs the φ scale.
- `preview.png` — side-by-side screenshot (the before/after).

## The three ideas (in priority order)

**1. Golden-ratio modular scale (the main bet).** Tailwind's default type + spacing scales are linear
and generic — every template site uses them. A φ-based modular scale makes harmonious proportions the
default and "makes it hard to look bad," which fits a premium brand whose deliverables are often built
by non-designers. Math: type ratio √φ ≈ 1.272 (two steps = one φ), spacing ratio φ ≈ 1.618, 16px base.
In the preview the φ side reads more editorial/premium with no extra effort.

**2. Optical corrections (free polish worth stealing directly).** Asymmetric card padding — the eye
weights the top-left heading, so symmetric padding reads as too much room up top; trim the top by the
heading's line-height (`padding-top = X / lineHeight`). Also proper icon centering in buttons. These are
the small details that separate premium deliverables from generic ones. See `.lk-card-optical`.

**3. `em`-relative spacing inside text components (accessibility + proportion).** Inside cards / list
items / PDF text blocks, define spacing in `em` (relative to the element's font size) rather than fixed
px, so proportions hold across zoom and reader font-size settings. Best applied in the quote/proposal
PDF templates where block proportions should stay constant regardless of content length.

## Honest caveats
- This is one design-opinion video, not a proven pattern for us. The φ scale is an aesthetic bet — it can
  feel elegant or fussy depending on application. Do NOT codify into the design skills off one experiment.
- The big jumps at the top of the φ spacing scale (xl→2xl→3xl) are coarse; half-steps are provided.
- Thai/Arabic line-heights are already tuned in `theme.css` — a type-scale promotion must re-check those
  locales (stacked vowels/tone marks, connected scripts) before shipping.

## To promote (if approved on real pages)
1. Move the `@theme` blocks from `scale-phi.css` into `theme.css`, bump the token version + CHANGELOG.
2. Refactor one real page/section (or one PDF template) to the new `text-*` / `p-*`/`gap-*` tokens.
3. Re-verify the three locales (en / th / ar) and the dark `nocturne` theme.
4. Only then roll across the site / templates.

See vault: `Work/Pai Dai/Brand/Golden-Ratio Scale — Design System Idea.md`
