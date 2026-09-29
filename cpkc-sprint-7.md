# SPRINT 7 — Wheels, hero, visuals, fades

Branch `cpkc-rewrite`. No new dependencies, changes limited to
`app/projects/cpkc/page.tsx` and `components/cpkc/`, values from `globals.css`,
run `npm run build`, do not commit.

Priority order. Do §1 first and report it before continuing.

---

## 1. Wheels — the centring transform is being overwritten

Each wheel needs `translate(-50%, -50%)` so `left`/`top` mark the axle centre.
The wheels also receive a Framer Motion `rotate`. Framer Motion builds its own
`transform` string from its motion values and **replaces** any `transform` set
by hand in `style` or via a class. So the translate is being discarded and each
wheel's top-left corner sits where its centre should be. That shifts every wheel
right and down by half its size.

**First, confirm.** Report exactly how the wheel's translate and rotate are
currently applied.

**Then fix** by giving the offset to Framer as motion values so it composes with
the rotation:

```tsx
<motion.img
  src={WHEEL.src}
  style={{
    position: 'absolute',
    left: `${parseFloat(w.left) + WHEEL_X_OFFSET}%`,
    top:  w.top,
    width:  WHEEL.size,
    height: WHEEL.size,
    x: '-50%',
    y: '-50%',
    rotate: wheelRotate,
    transformBox: 'fill-box',
    transformOrigin: 'center',
  }}
/>
```

Remove any `transform:` string and any class that sets `transform` on the wheel.
Keep `WHEEL_X_OFFSET = 0`.

Report: a screenshot of the train at scroll 0, and whether the wheels now sit
under the car bodies.

---

## 2. Hero

### Headline size

Find the `<h1>` on `app/projects/falcon/page.tsx`. Report its font size, weight,
letter-spacing and line-height, then apply the same values to this page's
headline. Keep `max-width: 24ch`.

### Copy — verbatim

> I joined CPKC in July 2025 with a brief to democratize design at a
> twenty-thousand-person freight company that had no designers.

> We work alongside change management and business transformation, the teams
> already responsible for how work gets done. What was missing was anyone asking
> how it felt to use.

> Four kinds of work came out of it. A tool, a practice, a method, and the ground
> they all stand on.

Paragraphs 1 and 2: `--text-base`, `--color-text-secondary`, max-width 560px,
16px between them. Paragraph 3: `--text-base`, `--color-text-primary`, 24px top
margin.

### The gap below the hero

The hero currently has both a `min-height` and `paddingBottom: 200px`. The
`min-height` alone already clears the train band. **Remove the `paddingBottom`.**
Report the hero's rendered height before and after, and confirm at 1440 × 900
that no hero text sits behind the train at scroll 0.

---

## 3. Context block and CTA

**Delete** the paragraph beginning "Fourteen months in there's a community of
practice…". It must not appear anywhere.

Replace the confidentiality text with, verbatim:

> Most of this work lives inside CPKC systems and is confidential. What's here is
> how it was structured and what changed. Happy to talk through any of it in more
> detail.

Replace the "Get in touch ↗" text link with the same button component and
styling used for the primary call to action on `app/projects/falcon/page.tsx`.
Report which component that is. Label: **Get in touch**. Target:
`mailto:ahluwaliagovindsingh@gmail.com`. 24px top margin.

The context block sits directly after the hero with 48px between them. No
divider line.

---

## 4. Rail

Add a third metadata row between ROLE and TIMELINE:

```
ROLE       Researcher, Innovation Program
PROGRAM    Mitacs Business Strategy Internship
TIMELINE   July 2025 – Present
```

Same styling as the existing rows.

---

## 5. Section layout — wide visual, pointers beneath

The visuals have been re-exported as wide strips at a **4.5 : 1** ratio, either
1800 × 400 or 1350 × 300. Check the actual dimensions of the files in
`public/projects/cpkc/sections/` and report them. Either size is correct; only
the ratio matters to the layout. Each third of the frame corresponds to one of
the three pointers below it. Filenames are unchanged.

### Height budget

The pinned frame is `calc(100vh - HEADER_H - 200px)`. At 1440 × 900 that is about
516px. The layout below targets roughly 490px.

### Layout inside each section layer

```
Heading                                      (--text-xl)
Statement line                               (--text-md, 1 to 2 lines)

[ ─────────── wide visual, full content width ─────────── ]

Sub one            Sub two            Sub three
two lines          two lines          two lines
```

- Heading and statement: single column, full width
- Visual: `width: 100%`, `aspect-ratio: 1800 / 400`, `object-fit: contain`,
  20px top margin. No max-width
- Three pointers: `repeat(3, 1fr)`, gap 32px, 20px top margin. Each column sits
  directly under the third of the visual it describes
- Statement line drops from `--text-lg` to `--text-md`

Remove the two-column top row from Sprint 6. The visual is no longer beside the
heading.

### Viewport height fallback

At viewport heights below 860px the content cannot fit the pinned frame. Add:

```css
@media (max-height: 859px) { /* no pinning, normal vertical flow */ }
```

Same fallback as mobile and reduced motion: sections stack in normal flow.

Report the rendered height of each section's content at 1440 × 900 and whether
any exceeds the frame.

---

## 6. Fix the watermark

Two bugs.

### Overlapping fades

Current windows let the outgoing and incoming sections overlap for roughly 4% of
scroll, so both are partly visible on top of each other. Make them sequential,
never overlapping:

```tsx
const start = i / 4
const end   = (i + 1) / 4
const F = 0.03   // fade width

// out completes before the next begins
fadeOut: [end - F, end]
fadeIn:  [start, start + F]
```

At every boundary, the outgoing section reaches opacity 0 at exactly the point
the incoming one begins rising from 0. There must be no scroll position where two
sections both have opacity above 0.05.

### Section 1 never fading out

At progress near 1, section 1 is still at full opacity. Its opacity mapping is
wrong. Every section, including the first, must be at opacity 0 outside its own
range. Only the special cases below are allowed:

- Section 1: opacity 1 from progress 0 (no fade-in at the top)
- Section 4: opacity 1 through progress 1 (no fade-out at the bottom)

Report the opacity of all four sections at progress 0, 0.125, 0.25, 0.375, 0.5,
0.625, 0.75, 0.875 and 1. Exactly one value per row should be above 0.05.

---

## Verify, with numbers

1. How the wheel transform was applied before the fix, and a screenshot after
2. Falcon's h1 values and confirmation they are applied here
3. Hero rendered height before and after removing `paddingBottom`
4. The CTA component name used
5. Rendered content height per section vs. frame height
6. The opacity table from §6
7. `npm run build` output
