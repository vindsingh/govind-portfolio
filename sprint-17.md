# SPRINT 17 — Nine fixes: About, footer, Experience, nav, home card, case studies

Branch `site-refresh`. Run `npm run build`. Do not commit. No new dependencies.

Files: `app/page.tsx`, `app/about/page.tsx`, `app/experience/page.tsx`,
`app/projects/falcon/page.tsx`, `app/projects/form/page.tsx`, the footer
component, and whichever component renders the tab row.

All values from existing variables in `globals.css`. No em dashes; grep and
report the count.

---

# §0 REPORT FIRST

Eight answers. Five of them decide what gets built. Measured values only, no
checkmarks.

1. **The About headline.** Print its exact string, the element it lives in, its
   parent grid or flex container, its rendered width, and how many lines it wraps
   to at 1440px.
2. **The footer canvas sizing code.** Print every line that sets
   `canvas.width`, `canvas.height`, `canvas.style.width`, `canvas.style.height`,
   any `ctx.scale` or `ctx.setTransform` call, and the pointer-to-canvas
   coordinate conversion. Then report, at 1440px:
   - `canvas.width` and `canvas.height` (backing store)
   - `getBoundingClientRect().width` and `.height` (CSS box)
   - `devicePixelRatio`
3. **`public/about/paintings/`.** List every file with its pixel dimensions and
   aspect ratio. Name the landscape piece nearest `16 / 10`. Do not pick one
   silently; §2.2 needs this confirmed.
4. **The CPKC home card video.** Report the intrinsic `videoWidth` and
   `videoHeight` of `/home/cpkc-card.webm`, the rendered width and height of the
   media area inside the card, and the current `object-fit` and `object-position`.
5. **The tab row.** Name the component. Report whether it renders on `/about` and
   `/experience`, and what each tab does on those routes. Report the state
   variable on the home page and whether anything initialises it from the URL.
6. **The mobile nav tab shape.** At 390px, report the computed `clip-path` and
   `border-radius` of one tab, and the computed `border-radius` and `overflow` of
   its parent. Do the same at 1440px. The two sets will differ; say where.
7. **`.section-highlight`.** Report every file that defines or applies it, and
   every `setTimeout` that adds or removes it.
8. **The icon set.** Name the library or file the footer icons come from, and
   whether it has an expand or maximise glyph. §2.2 needs one.

---

# §1 ABOUT — headline becomes one centred line

Per §0.1. The headline currently wraps because it is constrained by its column,
not the page.

Move it **out of the intro grid**, directly above it, as its own block:

```
text-align: center
max-width: none
margin: 0 auto 48px
```

It must render on **one line** at 1440px. If it does not, reduce its size one
step (`--text-3xl` to `--text-2xl`, or whatever the ladder is) rather than
letting it wrap or adding `white-space: nowrap`, which would overflow on mobile.

Below 768px it may wrap to two lines, still centred. That is fine.

The intro grid below it is unchanged: photo right, paragraphs left, both
left-aligned, `align-items: center`.

**Report the rendered line count and font size at 1440px and at 390px.**

---

# §2 FOOTER

## 2.1 Fix the paint offset

Per §0.2. The cause is almost certainly this: the backing store is set from
`clientWidth * devicePixelRatio` but the element has `width: 100%` and **no CSS
height**, so the CSS height falls back to the backing pixel height. The
horizontal scale resolves and the vertical one does not, which is why the offset
grows as you move down the canvas.

Pin both axes explicitly and derive coordinates from the rect:

```js
function sizeCanvas(canvas, cssW, cssH) {
  const dpr = window.devicePixelRatio || 1
  canvas.style.width  = cssW + 'px'
  canvas.style.height = cssH + 'px'
  canvas.width  = Math.round(cssW * dpr)
  canvas.height = Math.round(cssH * dpr)
  const ctx = canvas.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)   // not ctx.scale, which compounds
  return ctx
}

function pointerToCanvas(canvas, e) {
  const r = canvas.getBoundingClientRect()
  return {
    x: (e.clientX - r.left) * (canvas.clientWidth  / r.width),
    y: (e.clientY - r.top)  * (canvas.clientHeight / r.height),
  }
}
```

`setTransform` rather than `scale` because `scale` accumulates on every resize
and re-init. The rect scale in `pointerToCanvas` is belt and braces; with the
sizing fixed both ratios are 1, and it stays correct if a future layout change
scales the element.

Re-run `sizeCanvas` on resize, preserving the existing paint by copying the old
canvas into the new one via an offscreen canvas. If that is more work than it is
worth, clear on resize and say so.

**Verify by measurement, not by eye:** stamp at four known canvas coordinates
(10,10), (canvas centre), (right edge minus 10, 10), (right edge minus 10, bottom
minus 10), read back the pixel at each with `getImageData`, and report whether
the painted pixel is within 2px of the requested point.

## 2.2 The frame shrinks and shows a painting

The footer is far taller than it needs to be and the canvas area is mostly void.

**Replace the cityscape sketch with a piece** from `public/about/paintings/`. The
caption in this sprint dates it to 2020, so it has to be the right piece, not
whichever one fits best.

**List every file in that folder with its dimensions and aspect ratio first, and
stop there.** Use the landscape-orientation piece nearest `16 / 10` as the
default, name it in your report, and flag that it needs confirming rather than
treating the choice as settled.

### Frame

```
max-width: 520px
aspect-ratio: 16 / 10
margin: 0 auto
border-radius: var(--radius-sm)
overflow: hidden
position: relative
```

The painting fills it:

```
width: 100%
height: 100%
object-fit: cover
object-position: top center
```

Top-aligned deliberately. The bottom of the piece can crop; the top is what
reads.

### Layer order stays as built in sprint 16

Paint canvas underneath, image on top at `mix-blend-mode: multiply`,
`pointer-events: none`. Multiply over a watercolour still lets added colour show
through the lighter passages, so `Colour it in.` remains true.

The canvas is sized to the **frame**, 520 × 325 at the default, not to the
image's own pixel dimensions. Re-measure on resize.

Palette, brush sizes, eraser, Reset and Save all keep working unchanged. Save
still exports the composite, now at the frame's dimensions.

### Expand button, top right of the frame

520px is small for actually painting in, so the frame gets an expand control that
opens the same thing large.

**The button.** Absolutely positioned inside the frame, 12px from the top and
right edges, above the image layer:

```
width: 32px; height: 32px
border-radius: 999px
background: rgba(255,255,255,0.82)
backdrop-filter: blur(12px) saturate(140%)
-webkit-backdrop-filter: blur(12px) saturate(140%)
border: 1px solid var(--color-border)
display: grid; place-items: center
z-index: 2
```

Frost reads here because there is a real painting behind it, same as the gallery
tile. Glyph is the existing expand or maximise icon from the icon set already in
use, 16px, `--color-text-secondary`. `aria-label="Open larger"`.

`opacity: 0` at rest, `1` on hover or focus of the frame, `transition: opacity
var(--transition-base)`. On touch, always visible: gate the hover rule behind
`@media (hover: hover)`.

**The overlay.** Reuse the backdrop and panel treatment from
`components/AboutGallery.tsx` so it matches the paintings modal rather than
inventing a second dialog language. Inside the panel, the same frame at
`width: min(1000px, 88vw)`, same `16 / 10` ratio, same layer order, with the full
palette and controls below it.

**Carrying the paint across.** One paint bitmap, two sizes. On open, size the
large canvas per §2.1, then `drawImage(smallCanvas, 0, 0, largeW, largeH)`. On
close, `drawImage(largeCanvas, 0, 0, smallW, smallH)` back down. Scaling a
watercolour wash up loses no meaningful detail, so this is fine; do not try to
keep a vector stroke history.

Escape and backdrop click close it. `document.body.style.overflow = 'hidden'`
while open, restored on close. Focus moves to the close button on open and
returns to the expand button on close.

**Report:** the large canvas backing store and CSS box, and confirm the
four-point `getImageData` check from §2.1 passes in the expanded view too. The
offset bug will reappear there if the sizing is duplicated rather than shared, so
both views must call the same `sizeCanvas`.

### Caption under the frame

Below the frame, above or beside the existing palette depending on what fits,
at `--text-sm`, `--color-text-muted`, centred to the frame:

> Colour it in. Sketched in 2020.

**Confirm the year before this ships.** If the piece is from 2021, change the
number and nothing else.

This replaces the standalone `Colour it in.` line from sprint 16. There is one
caption, not a line plus a caption.

### Everything else in the footer

Unchanged from sprint 16: no GA logo, 44 × 44 icons, clock without seconds,
`Designed, drawn and built by Govind. 2026.`, `Still building. Always thinking.`

**Report the footer's total rendered height before and after.**

---

# §3 EXPERIENCE

## 3.1 Delete the Exploring row

Remove the `Exploring` label and its empty value entirely. Three rows remain:
Design, Build, AI.

## 3.2 Replace the Tools lead-in

Delete *"Tools are just how the thinking gets shown. Sometimes that's a slide
deck. Lately it's mostly been AI-assisted coding and this stack."*

Use this, verbatim:

> This changes with the work. Lately it has mostly been AI-assisted coding, and
> this is the stack.

Same position and styling as the line it replaces.

---

# §4 HOME PAGE

## 4.1 Remove "View all experience →"

Delete the line from the Experience card. The card as a whole still links to
`/experience`. Nothing replaces it, and the padding below the last entry matches
the padding above the first.

## 4.2 CPKC card video, stop the crop

Per §0.4. The card is not running the live `TrainBand`; it is playing the
exported video, so no train constant is involved. `object-fit: cover` is cropping
a wide video into a shorter box, which is why the locomotive is cut.

Set the media area's `aspect-ratio` to the video's **own intrinsic ratio** from
§0.4, and change the video to:

```
width: 100%
height: 100%
object-fit: contain
object-position: center
```

With the container matching the source ratio, `contain` and `cover` resolve
identically and nothing crops. Do not hardcode a ratio; compute it from the
reported dimensions and write it as a comment with the source numbers.

If the resulting media area is taller than the card allows, reduce its width and
centre it rather than reintroducing a crop.

**Verify:** report the media area's rendered width and height, the video's
intrinsic ratio, the container's ratio, and confirm the full locomotive and the
last boxcar are both inside the frame. State the pixel gap from the locomotive's
leading edge to the right edge of the frame.

Playback wiring from sprint 15 is unchanged: `preload="auto"`, plays once on
entering view, holds the last frame, JPG under reduced motion.

---

# §5 NAVIGATION

## 5.1 About and Experience can reach Work

Per §0.5. `All` and `Work` are local state on the home page; About and Experience
are routes. From those routes the tabs have nothing to call.

Two changes:

**On `/about` and `/experience`**, the `All` and `Work` tabs become links:

```
All  → /
Work → /?tab=work
```

**On the home page**, initialise `activeTab` from the URL:

```tsx
const params = useSearchParams()
const [activeTab, setActiveTab] = useState<Tab>(
  params.get('tab') === 'work' ? 'work' : 'all'
)
```

Clicking a tab on the home page still only sets state; it does not push a URL.
The param is an entry point, not a synced route.

`useSearchParams` needs a Suspense boundary in the App Router. If the build
complains, wrap the consuming component, do not switch to `window.location`.

The `Go back` tab is unchanged.

## 5.2 Mobile tab corners

Per §0.6. At 390px the parallelogram is rounding. Two candidate causes; report
which it was:

- The mobile branch drops `clip-path` and falls back to `border-radius`
- A parent has `overflow: hidden` plus a `border-radius`, clipping the children

Fix so the **same `clip-path` polygon and `border-radius: 0`** apply at every
width. The tab geometry is identical on mobile and desktop; only the type size
and padding scale.

**Report the computed `clip-path` at 1440px and at 390px. They must match.**

---

# §6 FALCON AND FOR/M — remove the section highlight

Per §0.7. Clicking a rail section tints the content panel and boxes the active
heading. This was removed from the CPKC page in sprint 6 and still exists on
these two.

Delete, in both files:

- the `.section-highlight` class and all its CSS
- every `setTimeout` pair that adds and removes it
- any `useState` or ref that exists only to track it

The anchor click keeps doing exactly one thing: scroll to the section. No tint,
no box, no flash.

Nothing else on either page changes in this sprint.

---

# §7 STILL OUTSTANDING, REPORT ONLY

Report status, do not act:

1. Do `app/cpkc/page.tsx`, `public/about/Painting_1.png`, `Painting_2.jpg`,
   `Painting_3.jpg`, `public/projects/cpkc/cpkc-cover.svg`,
   `components/CPKCTimeline.tsx` and `Phase1-4.svg` still exist? Yes or no each,
   with `git status` evidence.
2. Do `/falcon` and `/projects/falcon` both still exist? What is in each?
3. CPKC section headings passing behind the fixed train band: report the band's
   `z-index`, the headings' `z-index`, and the vertical overlap in px.

---

# VERIFY — numbers, not checkmarks

At 1440 × 820 and 390px:

1. All eight §0 answers
2. About: headline line count and font size at both widths, and that it is
   centred and outside the intro grid
3. Footer: the four-point `getImageData` readback from §2.1, with the offset in px
   at each point
4. Footer: which painting was used, the frame's rendered dimensions, the canvas
   backing store and CSS box, and the footer's total height before and after
5. Footer: Save still exports the composite
6. Footer: the expand button's rendered size and position relative to the frame's
   top right corner; that it is hidden at rest and visible on hover at 1440px, and
   always visible at 390px
7. Footer: opening the expanded view carries the existing paint across, closing
   carries it back, and the four-point `getImageData` check passes in the expanded
   view as well as the small one
8. Footer: the caption renders with the year as written, and `The bottom half is
   yours.` is gone
9. Experience: Exploring gone, three rows remain, new lead-in present, old string
   gone
10. Home: `View all experience` gone; the CPKC card measurements from §4.2
11. Nav: from `/about`, clicking `Work` lands on the home page with the Work
    filter active
12. Nav: computed `clip-path` at both widths, matching
13. Falcon and FOR/M: clicking a rail section scrolls only, no tint or box
14. §7 report
15. At 390px, no horizontal scroll on `/`, `/about`, `/experience`,
    `/projects/cpkc`, `/projects/falcon`, `/projects/form`
16. At 390px, painting in the footer does not scroll the page, in both the small
    frame and the expanded view
17. Count of `—` across touched files
18. `npm run build` output
