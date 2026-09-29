# SPRINT 9 — Clearance, speed, loops, typefaces

Branch `cpkc-rewrite`. Run `npm run build`, do not commit.

Sections 1 to 4 touch `app/projects/cpkc/page.tsx` and `components/cpkc/` only.
Section 5 is site-wide and is the only part allowed outside those files.

---

## 1. Clearance — measure at 1440 × 820, not 900

The previous report passed at 1440 × 900, but real laptop viewports are shorter
and the page fails there. **All clearance checks in this sprint are at
1440 × 820.** Report every measurement at that size.

At scroll 0, at 1440 × 820, all three must hold:

- the rail box bottom is at least 24px above the train's top edge
- the hero's last line of text is at least 24px above the train's top edge
- the confidentiality block's first line begins **below the bottom of the
  viewport**, so nothing from it is visible behind the train at scroll 0

### To fix the rail

Merge PROGRAM into the ROLE block so there is one label instead of two:

```
ROLE
Researcher, Innovation Program
Mitacs Business Strategy Internship

TIMELINE
July 2025 – Present
```

The two role lines sit directly under one another, the second at
`--color-text-secondary`. Then tighten: metadata block gap 20px → 14px,
label-to-value gap → 2px, anchor row gap → 2px.

If that still does not clear at 820, reduce the rail's padding from 20px to
16px and report the remaining shortfall rather than guessing further.

### To fix the hero

Hero section: `min-height: calc(100vh - HEADER_H)`, content top-aligned, and
`padding-bottom: 224px` so the confidentiality block starts below the fold at
scroll 0.

Remove any `justify-content: center` on the hero. Top-aligned only.

---

## 2. Train speed

The train currently completes its travel over the first 70% of hero scroll
progress, which reads as too fast. Change the mapping to the full range:

```tsx
const trainX      = useTransform(scrollYProgress, [0, 1], [0, finalX])
const wheelRotate = useTransform(scrollYProgress, [0, 1], [0, 180])
```

Wheels must use the same range as the translation so they stop when the train
stops. Report the range values in use afterwards.

---

## 3. Looping visuals

Add a per-section `loop` flag so this is adjustable without code changes:

```tsx
const SECTIONS = [
  { slug: 'section1', loop: true  },
  { slug: 'section2', loop: false },
  { slug: 'section3', loop: false },
  { slug: 'section4', loop: true  },
]
```

- `loop: true` → set the `loop` attribute; the video runs continuously while its
  section is in view, and pauses and resets when the section leaves
- `loop: false` → current behaviour, plays once from frame 0 on each arrival,
  then holds the last frame
- Reduced motion: unchanged for both, static JPG, no video loaded

---

## 4. Button

Replace the current square black button with the **same component and styling
used for "Visit website" on `app/projects/form/page.tsx`**. Report which
component that is.

Label: `Get in touch`. Target: `mailto:ahluwaliagovindsingh@gmail.com`.

Delete the custom button styles added in the previous sprint.

---

## 5. Typefaces — site-wide

This replaces Helvetica Neue, Fragment Mono and Space Mono everywhere.

### Load

Both are on Google Fonts. Add to `app/layout.tsx` using `next/font/google`:

```tsx
import { Cardo, Hind } from 'next/font/google'

const cardo = Cardo({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-cardo',
  display: 'swap',
})

const hind = Hind({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-hind',
  display: 'swap',
})
```

Add both to the `<body>` className alongside the existing variables. **Do not
remove the existing font imports yet** — leave them loaded so nothing breaks
while the swap is verified.

Cardo only ships 400 and 700. There is no medium weight. Anywhere the site
currently uses weight 500 or 600 on a heading, it will need to resolve to 400 or
700; report every place that happens.

### Map

In `app/globals.css`:

```css
--font-display: var(--font-cardo), Georgia, serif;
--font-body:    var(--font-hind), system-ui, sans-serif;

/* keep existing names working so nothing breaks */
--font-helvetica-neue: var(--font-hind), system-ui, sans-serif;
--font-fragment-mono:  var(--font-hind), system-ui, sans-serif;
--font-space-mono:     var(--font-hind), system-ui, sans-serif;
```

Set `body { font-family: var(--font-body); }`.

Headings, meaning every `<h1>` and `<h2>` and the CPKC section headings and
statement lines, use `var(--font-display)`.

Everything else, including rail labels, metadata, pointers, buttons and body
copy, uses `var(--font-body)`.

### Then check

Line lengths change with the typeface, so after the swap re-measure the §1
clearance at 1440 × 820 and report it again. If the headline now runs to three
lines, adjust its `max-width` so it breaks at two.

Report on each page (`/`, `/about`, `/experience`, `/projects/cpkc`,
`/projects/falcon`, `/projects/form`): any text that now overflows its
container, wraps differently in a way that breaks layout, or sits at a weight
Cardo does not have.

---

## Verify, at 1440 × 820

1. Rail bottom, hero last line bottom, confidentiality first line top, train top
2. Headline line count
3. `trainX` and `wheelRotate` range values
4. Sections 1 and 4 loop; 2 and 3 play once and hold
5. The button component name
6. Per-page report from §5
7. `npm run build` output
