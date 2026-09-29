# SPRINT 22 — Footer polish, About copy, mobile shift, card fade

Branch `site-refresh`. Run `npm run build`. Do not commit. No new dependencies.

Short sprint. Light verification except §3, which needs a real answer.

No em dashes.

---

# §1 FOOTER

## 1.1 Reorder and darken

Current order is: controls, counter, image, `Colour it in.`

New order:

```
Colour it in.
[palette] [sizes] Eraser Save Reset
You're the 92nd person to draw here.

┌──────────────────────┐
│   cityscape sketch   │
└──────────────────────┘
Drawn in 2020.
```

- `Colour it in.` moves to the top of the block, above the controls. Colour goes
  from muted to `var(--color-text-primary)`. Size unchanged.
- The counter line stays directly under the controls, unchanged.
- A new credit line sits under the image: `Drawn in 2020.` at `--text-xs`,
  `--color-text-muted`, centred to the frame.

**Confirm the year for this sketch before shipping.** I used 2020 from an earlier
message; if the cityscape is from a different year, change the number.

## 1.2 Smaller frame, cropped right and bottom

The sketch is close to square, so it takes far more vertical space than it needs,
and the drawing table shows along the right edge and the bottom.

```
max-width: 560px
aspect-ratio: 3 / 2
margin: 0 auto
overflow: hidden
border-radius: var(--radius-sm)
```

The image inside:

```
width: 100%
height: 100%
object-fit: cover
object-position: left top
```

`left top` anchors the crop so the excess comes off the right and the bottom,
which is where the table is. The city itself sits centre-left in the drawing, so
it survives the crop.

Report the frame's rendered dimensions and confirm no table edge is visible.

The paint canvas resizes to the new frame. The expanded view is unchanged.

---

# §2 ABOUT, THE OBSERVER CARD

Replace the line under `Observer by nature`, verbatim:

> Some of it has been commissioned for homes and offices. The rest are my
> versions of paintings I liked.

The old line, `I draw and paint. Some of it has been commissioned for homes and
offices.`, goes. Nothing else in the card changes.

---

# §3 THE PAGE SHIFTS SIDEWAYS ON MOBILE, EVERY PAGE

At 390px the whole page renders shifted left with an empty strip on the right.
It is not only the CPKC case study; the home page does it too. So it is not the
train band alone.

## 3.1 Find it properly

`document.documentElement.scrollWidth` does not catch this. Run this at 390px on
**every** route and report the output for each:

```js
[...document.querySelectorAll('*')]
  .map(el => {
    const r = el.getBoundingClientRect()
    return { el: el.tagName + '.' + (el.className || '').toString().slice(0,40),
             left: Math.round(r.left), right: Math.round(r.right) }
  })
  .filter(o => o.left < -1 || o.right > 391)
```

Routes: `/`, `/?tab=work`, `/about`, `/experience`, `/projects/cpkc`,
`/projects/falcon`, `/projects/form`.

Report the offenders per route. Do not fix before reporting.

## 3.2 Fix at the root and at the source

Both, not one or the other.

**At the root**, on the layout's outermost wrapper:

```
overflow-x: clip
max-width: 100vw
```

`clip`, not `hidden`, so `position: sticky` descendants keep working.

**At the source**, for each offender found in §3.1, remove the cause. The usual
ones are a fixed pixel width wider than the viewport, a negative margin, a
`100vw` width on an element inside a padded container, or a transform pushing an
element past the edge. Fix the element, do not just rely on the root clip.

Report what each offender was and what you changed.

## 3.3 Confirm

Re-run the §3.1 snippet on all seven routes at 390px and at 360px. Report the
result per route. It must be an empty array everywhere.

---

# §4 CPKC HOME CARD, SOFTEN THE EDGE

There is a hard horizontal line where the video meets the text block. It used to
fade out.

Add a gradient overlay at the bottom of the media container:

```tsx
<div
  aria-hidden
  style={{
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    height: '64px',
    background: 'linear-gradient(to bottom, transparent, var(--color-card-bg))',
    pointerEvents: 'none',
  }}
/>
```

Use whatever variable actually holds the card's background; if the card's
background is not a variable, read its computed value and use that, and say so.

This sits on top of the video inside the existing container, so **the media's
size, aspect ratio, `object-fit` and playback all stay exactly as they are.**
Nothing about the animation changes.

If 64px reads as too much fade over the locomotive, drop to 48px. Report which
you used.

---

# VERIFY

Light, except §3.

1. Footer: the new order renders, `Colour it in.` is primary colour, the credit
   line is present
2. Footer: frame dimensions, and that no table edge shows
3. About: the new line renders, the old one is gone
4. §3.1 offender lists per route, what you changed, and the §3.3 re-run showing
   empty arrays at 390px and 360px
5. CPKC card: the fade renders, and the video's rendered size is unchanged from
   before this sprint
6. `npm run build` output
