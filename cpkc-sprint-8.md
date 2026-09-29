# SPRINT 8 — Final refinement

Branch `cpkc-rewrite`. No new dependencies, changes limited to
`app/projects/cpkc/page.tsx` and `components/cpkc/`, values from `globals.css`,
run `npm run build`, do not commit. The train geometry from
`train-assets-v2.md` is correct; do not change it.

---

## 1. Drop the pinned section stack

The pinned layout needs about 580px of frame height but gets about 490px on
common laptop screens, so the short-screen fallback is active and the pinned
behaviour is never seen. Remove it.

- Remove the `400vh` scroll container, the sticky frame, the per-layer opacity
  and `y` transforms, and the `max-height: 859px` fallback
- Sections render in normal vertical flow, one after another
- Each section: `padding: 96px 0`, no borders, no dividers

### Entrance

When a section enters the viewport (`IntersectionObserver`, `threshold: 0.35`),
its content fades up once per entry:

```tsx
initial: { opacity: 0, y: 24 }
animate: { opacity: 1, y: 0 }
transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
```

Reset when the section fully leaves, so it plays again on return.

### Rail scroll-spy

Replace the `scrollYProgress` maths with an `IntersectionObserver` over the four
section elements, `rootMargin: '-40% 0px -55% 0px'`. Exactly one active at a
time; none while the hero is in view. The rail is currently one section behind;
verify it is fixed.

---

## 2. Visuals replay on every arrival

- Remove the `poster` attribute from the desktop `<video>`
- Set `preload="auto"` so the first frame is ready (files are 60 to 320KB)
- Each time a section becomes active: `video.currentTime = 0; video.play()`
- On end, hold the last frame. No loop
- When the section leaves, pause and reset to 0, so the next arrival plays from
  the start
- Reduced motion: unchanged, static `-subvisual.jpg`, no video loaded

---

## 3. Section layout

```
Heading
Statement line

[ ──────── wide visual, 100% width, aspect 1800/400 ──────── ]

Sub one             Sub two             Sub three
2 sentences         2 sentences         2 sentences
```

- Visual: `width: 100%`, `aspect-ratio: 1800 / 400`, `object-fit: contain`,
  24px top margin
- **Pointers are three columns, side by side**: `grid-template-columns:
  repeat(3, 1fr)`, gap 32px, 24px top margin. Each column sits under the third
  of the visual it describes. They are currently stacked vertically; fix that
- Below 1024px: pointers stack vertically

### Pointer copy — verbatim, no em dashes

**Something people use**

| Six use cases | Two directions | Shipped rough |
|---|---|---|
| Discovery ran across every line of business, from bulk and grain to intermodal. Six AI opportunities came out of it, ranked. I was part of that work rather than running it, and this was the one that got built. | One direction kept the spreadsheet shape people already knew. The other was a conversation. Familiar is the safer demo, but it would have rebuilt the exact constraint the tool existed to remove. | Internal tools had no visual identity here, so we built one by hand. We put it in front of users before it was easy to understand. It is in production now, and they run it themselves. |

**Something that persists**

| People already doing it | A group, not a document | 105 members |
|---|---|---|
| Across departments, people were already talking to users and testing ideas before committing budget. They were doing design without calling it that, and they had no way to find each other. | The obvious move was to write a framework. Enough of those go unopened. So we found the people already inclined this way and gave them somewhere to do it in public. | A community of practice on leadership-nominated cohorts, reaching 105+ members across Information Services by Q1 2026. That is a membership count, not a measure of how many changed how they work. |

**Something that shows shape**

| No map existed | Mapping what happens | Mapping backwards |
|---|---|---|
| Freight moves through more hands than anyone in any one of them can see. Nobody had drawn how the work actually flowed, so the first job was always to draw it. | Journey mapping for an external trucking and logistics partner, following work through a business that had never written it down. Later the same method for a customer portal, from a blank start. | With an internal engineering team, we started from a future where the function already worked differently and mapped back. Forward from pain gets you complaints. Backward from a target gets you a position. |

**Something underneath**

| What's already there | Rebuilt on it | What the next practice looks like |
|---|---|---|
| A body of customer research sits in a governed repository, and a new customer portal is being specified on top of it. I am not leading that work. My part was interviewing the internal teams it touches. | An early prototype looked finished, but its customers were invented and its locations fake. It demoed well. I rebuilt it from the real research, because a prototype on invented data teaches people to trust what is not there. | The repository's own rules had drifted apart. I drafted the fix as a decision record with an acceptance test, so it can be argued with. It is in review, so future research lands on solid ground. |

Subhead: `--text-sm`, weight 500, `--color-text-primary`, 8px bottom margin.
Body: `--text-sm`, line-height 1.6, `--color-text-secondary`.

Grep both files for `—` after editing. Must be zero.

---

## 4. Hero

### Nothing may overlap the train at scroll 0

At the dev viewport, and at 1440 × 900:

- the hero's last line of text, and
- the bottom edge of the rail box

must both end **at least 24px above the top of the train**. Measure the train's
rendered top edge, the hero content bottom, and the rail bottom, and report all
three.

To get there:
- Headline: widen `max-width` so it breaks onto **two lines** at 1440px. Keep the
  current size and weight
- Rail metadata: tighten the row gap from 20px to 12px and the label-to-value
  gap to 2px

### Spacing

- Between hero paragraphs: 16px
- Before "Four kinds of work came out of it": 28px
- Hero to the confidentiality block: 40px
- Confidentiality text to button: 20px

---

## 5. Button

Replace the current mustard uppercase button with a plain anchor:

```tsx
display: 'inline-flex',
alignItems: 'center',
gap: '8px',
background: 'var(--color-text-primary)',
color: '#FFFFFF',
fontFamily: 'var(--font-helvetica-neue), sans-serif',
fontSize: 'var(--text-sm)',
fontWeight: 600,
padding: '12px 22px',
borderRadius: 0,
textTransform: 'none',
letterSpacing: 'normal',
transition: 'background var(--transition-base)',
```

Label: `Get in touch →`. Hover: background `#333333`. Target:
`mailto:ahluwaliagovindsingh@gmail.com`.

---

## 6. Rail underline colour

Active state `border-bottom` changes from `var(--color-accent-cpkc)` to
`var(--color-text-primary)`. Nothing else in the rail changes.

---

## 7. Grass corners

The band's `borderBottomLeftRadius` / `borderBottomRightRadius` apply only once
the band has switched from `position: fixed` to its end-of-content `absolute`
state. While fixed to the viewport, radius is 0.

---

## 8. Report only, do not fix

Section 3's visual shows a document icon cut off at the right edge. Report the
rendered bounds of that video frame and whether the artwork itself extends past
the 1800 × 400 frame.

---

## Verify, with numbers

1. Train top, hero content bottom, rail bottom at scroll 0 (§4)
2. Headline line count at 1440px
3. Which rail item is active at the middle of each section
4. Each visual plays from frame 0 on first arrival, and again on return
5. Pointer columns render side by side at 1440px
6. Count of `—` in both files
7. `npm run build` output
