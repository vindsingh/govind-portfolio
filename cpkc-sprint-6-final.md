# SPRINT 6 — FINAL. Pinned sections, content, wheels

Branch `cpkc-rewrite`. Last sprint on this page. Constraints: no new
dependencies, changes limited to `app/projects/cpkc/page.tsx` and
`components/cpkc/`, values from `globals.css`, run `npm run build`, do not
commit.

---

## 1. Wheels — the box is the wrong height

Your Sprint 5 report measured the artboard box at **1027.08 × 200px**. It must
be **1027.08 × 299.6px** (width ÷ 3.4286). The box is being clamped to the band
height, which squashes the whole train to two-thirds its height. That is what
makes the wheels look wrong against the bodies.

Fix element 3 in `TrainBand.tsx`:

```tsx
const ART_RATIO = 2400 / 700
const boxHeight = boxWidth / ART_RATIO     // 299.6 at boxWidth 1027.08

style={{
  position: 'absolute',
  bottom: 0,
  left: 0,
  width:  `${boxWidth}px`,
  height: `${boxHeight}px`,     // explicit pixels
  x: trainX,
}}
```

Element 3 must be **taller than the band**. It overflows upward, and element 1's
`overflow: hidden` clips the empty top portion. Do not set `height: 100%`,
`maxHeight`, or anything that lets the 200px band constrain it.

Then set:

```tsx
const WHEEL_X_OFFSET = 0
```

The measured positions show that without the offset, wheel 1 sits 5.51% right of
the bodies' left edge, which matches the verified composite exactly. The −0.6
was compensating for a vertical problem with a horizontal nudge.

**Report after fixing:** element 3 rendered width and height, and a screenshot
of the train at scroll 0.

---

## 2. One section per screen — pinned, fading in place

**No cards.** No tinted backgrounds, no shadows, no rounded panels, no borders
around sections. Everything stays on the existing white inside `FileContainer`.
The page must look like the same file it is now; only the scroll behaviour
changes.

The behaviour: the four sections share one pinned frame. As the user scrolls,
the current section fades and lifts slightly while the next fades in, so each
scroll step reveals one whole section.

Build it in `components/cpkc/SectionStack.tsx`. Use the scroll logic from
`components/ZoneCardStack.tsx` as the reference (`useScroll`, `useTransform`,
a tall scroll container with a sticky child). Do not modify
`ZoneCardStack.tsx`.

### Structure

```tsx
<div ref={containerRef} style={{ height: '400vh', position: 'relative' }}>
  <div style={{
    position: 'sticky',
    top: `${HEADER_H}px`,
    height: FRAME_H,
  }}>
    {sections.map((s, i) => <SectionLayer key={s.id} ... />)}
  </div>
</div>
```

```tsx
const HEADER_H = /* measured header + tab row */
const FRAME_H  = `calc(100vh - ${HEADER_H}px - 200px)`
```

The frame pins below the header and ends above the 200px train band. All four
section layers sit absolutely positioned inside it, `inset: 0`, on top of each
other.

### Per-layer transition

`scrollYProgress` from the container, 0 to 1 across four sections. Each section
`i` owns the range `[i/4, (i+1)/4]`.

```tsx
const start = i / 4
const end   = (i + 1) / 4
const fadeIn  = [start - 0.04, start + 0.02]
const fadeOut = [end - 0.02, end + 0.04]

opacity:  in over fadeIn, 1 through the middle, out over fadeOut
y:        24px → 0 on the way in, 0 → -24px on the way out
```

Section 0 starts fully visible at progress 0 (no fade-in). Section 3 stays
fully visible at progress 1 (no fade-out).

Only the active layer receives pointer events: `pointerEvents: opacity > 0.5 ?
'auto' : 'none'`.

**Nothing inside a layer may scroll.** If a section's content doesn't fit
`FRAME_H`, report it rather than adding internal scroll.

### Layer layout

```
Heading                              ┌─────────────┐
Statement line                       │   visual    │
                                     │  360 × 360  │
                                     └─────────────┘

Sub one          Sub two          Sub three
two lines        two lines        two lines
```

**Top row:** grid `1fr 360px`, gap 48px, `align-items: center`. Heading and
statement left, visual right, vertically centred together.

**Bottom row:** `repeat(3, 1fr)`, gap 32px, 40px top margin.

Layer padding: 48px vertical, 0 horizontal (the file container already provides
side padding).

### Visuals

Assets are 600 × 600. Render at `width: 100%; max-width: 360px; aspect-ratio: 1`.
Remove `position: sticky` from the visual; the frame is already pinned.

The play-once-and-hold behaviour must trigger when a layer **becomes active**
(opacity crosses 0.5), not on IntersectionObserver, since all four layers are
always technically in the viewport. Play once, hold last frame, no replay.
Reduced-motion fallback from Sprint 4 unchanged.

### Anchor links

Rail clicks must scroll to the correct point in the container:
`containerTop + (i / 4) * containerHeight + 1`. Active rail item =
`Math.min(3, Math.floor(scrollYProgress * 4))`, and none while the hero is in
view. Replace the IntersectionObserver scroll-spy with this.

### Reduced motion

If `useReducedMotion()` is true: no pinning, no fading. Render the four sections
as a normal vertical flow, one after another.

### Mobile, below 1024px

Same as reduced motion: normal vertical flow, single column, visual above the
text at `max-width: 300px`, three blocks stacked.

---

## 3. Content

Each section: heading, statement line, three short blocks. **No "Where it
stands" line on any section** — delete the element and its label entirely.

Block subhead: `--text-sm`, weight 500, `--color-text-primary`, 8px bottom
margin. Block body: `--text-sm`, line-height 1.55, `--color-text-secondary`.

Statement line: `--text-lg`, weight 400, `--color-text-primary`,
`line-height: 1.3`, 12px top margin.

Use verbatim. No em dashes.

### Something people use · id `people-use` · visual `section1`

**Statement:** Sales teams were losing hours in spreadsheets to find leads.

| Six use cases | Two directions | Shipped rough |
|---|---|---|
| Discovery across the lines of business ranked six AI opportunities. This was the one that got built. | Spreadsheet-shaped or conversational. Familiar would have rebuilt the constraint the tool existed to remove. | In front of users before it was easy to understand. Now in production, and they run it themselves. |

### Something that persists · id `persists` · visual `section2`

**Statement:** There was no design function, and no vocabulary for the work.

| People already doing it | A group, not a document | 105 members |
|---|---|---|
| Across departments, people were already testing ideas before committing to them. They had no name for it and no way to find each other. | Frameworks and decks go unopened. So we found those people and gave them somewhere to do it in public. | A community of practice across Information Services by Q1 2026. A membership count, not a measure of practice. |

### Something that shows shape · id `shows-shape` · visual `section3`

**Statement:** Almost everything in this practice starts with a journey.

| No map existed | Mapping what happens | Mapping backwards |
|---|---|---|
| Freight moves through more hands than anyone can see. Nobody had drawn how the work actually flowed. | Journey mapping for an external logistics partner, then current-state mapping for a customer portal, from a blank start. | With an internal engineering team, we started from a future state and mapped back. Forward gets complaints. Backward gets a position. |

### Something underneath · id `underneath` · visual `section4`

**Statement:** The next practice is being built on research that already exists.

| What's already there | Rebuilt on it | What the next practice looks like |
|---|---|---|
| A body of customer research sits in a governed repository. A new customer portal is being specified on top of it. I'm not leading that work. | An early prototype used invented customers and fake locations. I rebuilt it from the real research. | A repository whose rules agree, so future research lands on solid ground. The fix is drafted and in review. |

Grep `page.tsx` and `SectionStack.tsx` for `—` after editing. Must be zero.

---

## 4. Spacing and dividers

- **Remove every hairline divider** between sections, between the hero and the
  context block, and between context and section 1.
- Paragraph gap in the hero and context block: `margin-bottom: 16px`, down from
  the current value.
- Hero bottom margin before the section stack: 64px.

## 5. Remove the click highlight

Delete the `.section-highlight` class, its CSS, and the `setTimeout` pair that
adds and removes it in `handleAnchorClick`. Anchor clicks just scroll.

The rail underline stays, driven by `scrollYProgress` as specified in §2.

## 6. Unchanged — do not touch

Hero content, rail labels, ROLE and TIMELINE, the confidentiality note, the
train's scroll behaviour and clamp, the fixed band, the container-radius clip.

---

## Verify, with numbers

1. Element 3 rendered width and height (height must be ~299.6)
2. FRAME_H at 1440 × 900, and whether any section's content overflows it
3. Rendered visual size inside a section
4. Which rail item is active at the midpoint of each of the four sections, and that exactly one layer has opacity 1 at each midpoint
5. Count of `—` in both files
6. `npm run build` output
