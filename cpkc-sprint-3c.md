# SPRINT 3c — Clamp, hero spacing, rail

Same branch `cpkc-rewrite`. Four changes. Do not alter the train's size, the
asset offsets, or the wheel positions — those are correct.

---

## 1. Fix the clamped rest position

The train currently stops with the boxcar half outside the right edge of the
file container. The final translation is being computed against the wrong
element.

The geometry is three nested elements:

- **Element 2** — container-width wrapper, `maxWidth: 1320px`, `overflow: hidden`
- **Element 3** — the artboard box, `width: boxWidth` (≈1027px at BAND_H 200),
  `overflow` visible, carries the `x` transform

`finalX` must be measured against **element 2's rendered width**, not element 3's
and not the viewport:

```tsx
const el2Width   = /* measured width of element 2, via ref */
const boxcarW    = boxWidth * 0.165   // boxcar is the leftmost ~16.5% of the art
const RIGHT_PAD  = 32

const finalX = el2Width - boxcarW - RIGHT_PAD
```

At rest, the boxcar's right edge must sit `RIGHT_PAD` inside element 2's right
edge, fully visible, nothing clipped. Everything to the right of the boxcar —
flatcar, container, locomotive — translates past element 2's right edge and is
clipped by its `overflow: hidden`.

Measure `el2Width` with a ref and `ResizeObserver`; do not hardcode 1320, since
the container is narrower at smaller viewports.

Verify: scroll past the hero, then take a screenshot. The boxcar must be
**entirely** visible with clear space between it and the container border.

## 2. Fix the hero void, by moving content not by resizing

Do not change `min-height`. Instead move one paragraph back into the hero.

**Hero row 1 now contains, in order:**

1. Headline — "Building a human-centred practice inside a freight railway."
2. "I joined CPKC in July 2025, on the first of three Mitacs terms. The brief was
   to democratize design — inside a twenty-thousand-person freight railway with
   no designer in it."
3. "Working alongside change management and business transformation — the teams
   already responsible for how work gets done, just without anyone asking what
   any of it felt like to use."
4. "Four kinds of work came out of it. A tool, a practice, a method, and the
   ground they all stand on."

Paragraphs 2 and 3 take `--text-md`, `--color-text-secondary`, max-width 560px.
Paragraph 4 keeps `--text-base`, `--color-text-primary`, 32px top margin.

**The context block below the hero now contains only:**

> Fourteen months in there's a community of practice with 105+ members, a market
> intelligence tool in production, and a way of working that got considerably
> faster once AI became part of how we built rather than only what we built. It's
> still running.

followed by the confidentiality note and its mailto link, unchanged.

Then add `justify-content: center` to hero row 1 so any remaining slack is
distributed above and below the text rather than collected underneath it.

## 3. Rail labels

Replace the four anchor labels. The `id` values stay the same.

```tsx
const ANCHORS = [
  { num: '01', label: 'The tool',     id: 'people-use' },
  { num: '02', label: 'The practice', id: 'persists' },
  { num: '03', label: 'The method',   id: 'shows-shape' },
  { num: '04', label: 'The ground',   id: 'underneath' },
] as const
```

Render as `01  The tool` — number at `--text-xs` in `--color-text-muted`, label
at `--text-sm`. Single line each, no wrapping. Section titles on the page are
unchanged ("Something people use", etc.).

## 4. Rail active state

Replace the left-border treatment with an underline, and add scroll-spy.

**Inactive:** `--color-text-muted`, no underline.
**Hover:** `--color-text-secondary`, no underline.
**Active:** `--color-text-primary`, `border-bottom: 1.5px solid var(--color-accent-cpkc)`, `padding-bottom: 3px`.

Remove the `border-left` entirely, including the `#D3A122` hover border.

Track the active section with an `IntersectionObserver` over the four section
elements, `rootMargin: '-40% 0px -55% 0px'` so a section becomes active when it
crosses the upper-middle of the viewport. Store the active id in state. Exactly
one anchor is active at a time; when the hero is in view, none are.

Transition colour and border with `--transition-base`.

---

## Verify

1. Boxcar fully visible at rest, clear of the container's right edge.
2. No large empty gap between the hero text and the context block.
3. Rail reads `01 The tool` … `04 The ground`, one line each.
4. Scrolling through sections moves the underline; at the top, nothing is
   underlined.
5. Train size unchanged throughout — this must not regress.

Report with `npm run build` output.
