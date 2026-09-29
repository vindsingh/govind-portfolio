# SPRINT 16 — Footer rebuild, About copy, Experience links

Branch `site-refresh`. Run `npm run build`. Do not commit. No new dependencies.

Files: the footer component, `app/about/page.tsx`, `app/experience/page.tsx`.

All values from existing variables in `globals.css`. No em dashes; grep and
report the count.

---

# §0 REPORT FIRST

1. **Name the footer component** and print its current structure.
2. **Find the cityscape sketch** currently rendered in the footer canvas area.
   Report its exact path and pixel dimensions.
3. **How does the current Save button work?** Print the function. It needs to
   keep working after the rebuild.
4. **Did these deletions from an earlier sprint actually land?** Report yes or no
   for each, with `git status` evidence:
   - `app/cpkc/page.tsx` deleted
   - `public/about/Painting_1.png`, `Painting_2.jpg`, `Painting_3.jpg` deleted
   - `public/projects/cpkc/cpkc-cover.svg` deleted
   - `components/CPKCTimeline.tsx` and `Phase1-4.svg` deleted
5. **Do `/falcon` and `/projects/falcon` both still exist?** Report what is in
   each.

---

# §1 ABOUT PAGE

## 1.1 Photo alignment

Change the intro grid from `align-items: start` to **`align-items: center`**.

The photo is 315px against a 221px text block, so it currently hangs 94px below.
Centred, the overhang splits evenly and reads as deliberate.

## 1.2 Copy — replace all four paragraphs, verbatim

> I've always wanted to know how things actually work. So far that's meant a
> freight railway, an exhibition six thousand people walked through, and the gap
> between what founders say and what investors hear.

> Design is how I go about it. Most of what I do starts as a question and ends as
> something built, with a lot of talking and drawing in between.

> Outside that, I cook, bike, and paint. Usually in Toronto.

> Curious about how people, systems, and ideas fit together. If you are too,
> message me or find me on LinkedIn.

`message me` and `LinkedIn` keep their existing links and styling.

---

# §2 EXPERIENCE PAGE

## 2.1 Tools lead-in

Above the four labelled tool rows, add one paragraph. `--text-base`,
`--color-text-secondary`, max-width 620px, 20px below the section header and
28px above the first row:

> Tools are just how the thinking gets shown. Sometimes that's a slide deck.
> Lately it's mostly been AI-assisted coding and this stack.

## 2.2 Three more org links

Add these, styled like the existing org links:

| Org | URL |
|---|---|
| DesignX Community | `https://designx.community` |
| OCAD CO | `https://www.ocadu.co/` |
| Cadillac Fairview × OCAD | `https://www.cadillacfairview.com` |

Still unlinked, leave as plain text: **DesignWith Lab**, **Samdisha Bagga**.

---

# §3 FOOTER

## 3.1 Remove and resize

- **Delete the GA logo** entirely
- **Email and LinkedIn icons to 44 × 44**, glyph 20px, gap 12px, matching the
  home page exactly
- **Clock drops the seconds.** `Toronto, EST 10:02 p.m.` not `10:02:40 p.m.`
- **Replace the copyright line.** Delete `Govind Singh Ahluwalia © 2026` and
  render, at `--text-sm`, `--color-text-muted`:

  > Designed, drawn and built by Govind. 2026.

Leave `Still building. Always thinking.` as it is.

## 3.2 The canvas becomes a colouring sheet

Currently a blank canvas people draw on, with the sketch shown behind. Invert it:
the sketch goes **on top**, people paint **underneath**.

### Structure

Two stacked layers in a relatively-positioned container:

```tsx
<div style={{ position: 'relative' }}>
  <canvas ref={canvasRef} style={{ display: 'block', width: '100%' }} />
  <img
    src={SKETCH_SRC}
    aria-hidden
    style={{
      position: 'absolute', inset: 0,
      width: '100%', height: '100%',
      objectFit: 'contain',
      mixBlendMode: 'multiply',
      pointerEvents: 'none',
      userSelect: 'none',
    }}
  />
</div>
```

Multiply keeps the ink lines dark over whatever colour is underneath, which is
how watercolour under pen actually behaves. Nothing needs to be painted
accurately.

### Canvas size

Size the container to the **sketch's own aspect ratio** (per §0.2). Right now the
canvas is much taller than the artwork, leaving a large cream void below it.

```
aspectRatio: `${sketchWidth} / ${sketchHeight}`
```

Set the canvas backing store to `clientWidth * devicePixelRatio` and scale the
context, so strokes are sharp on retina.

### The brush

Not a hard circle. Build strokes from soft radial stamps at low alpha so colour
builds where the pointer passes twice:

```js
const STROKE_ALPHA = 0.12
const RADIUS = 14          // CSS px at the default size

function stamp(ctx, x, y, hex) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, RADIUS)
  g.addColorStop(0,   hexToRgba(hex, 1))
  g.addColorStop(0.55, hexToRgba(hex, 1))
  g.addColorStop(1,   hexToRgba(hex, 0))
  ctx.globalAlpha = STROKE_ALPHA
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(x, y, RADIUS, 0, Math.PI * 2)
  ctx.fill()
}
```

Interpolate between the previous and current pointer position, stamping every
~4px, so fast strokes do not leave gaps.

Add a small hue jitter per stamp: convert the swatch hex to HSL, vary H by ±4
degrees, convert back. It stops large areas going flat.

### Palette

Replace the six generic RGB swatches with colours taken from the goldfish
painting, so the paintbox matches the drawing:

```
#E4682C   orange
#F0A02E   warm yellow
#3B5EA6   deep blue
#7FB2DA   sky blue
#6C9C55   leaf green
#A9714A   earth
```

Keep the existing three brush-size buttons. Their sizes multiply `RADIUS`.

### Eraser, Save, Reset

- **Eraser** clears the paint canvas only, never the sketch. Use
  `globalCompositeOperation = 'destination-out'` with the same soft stamp.
- **Save** keeps working (per §0.3), but must export the **composite**: paint
  layer plus the ink lines on top, on a white background. Draw the sketch into an
  offscreen canvas over the paint layer before exporting, rather than exporting
  the paint canvas alone.
- **Reset** clears the paint layer only.

### Copy

`The bottom half is yours.` no longer describes it. Replace with:

> Colour it in.

Same position and styling as the current line.

### Reduced motion and touch

- Touch and pen events as well as mouse. `touch-action: none` on the canvas so
  painting does not scroll the page on mobile.
- No `prefers-reduced-motion` behaviour needed; nothing animates.

---

# §4 REPORT ONLY

Per §0.4 and §0.5, report the deletion status and the `/falcon` duplicate. Do not
act on either.

---

# VERIFY — numbers, not checkmarks

At 1440 × 820 and 390px:

1. The five §0 answers
2. About: intro grid `align-items`, and the rendered top and bottom offsets of
   both columns
3. About: all four paragraphs present, old strings gone
4. Experience: tools lead-in renders; which org names are now linked
5. Footer: GA logo gone, icon size, clock format, attribution line text
6. Footer: canvas aspect ratio vs the sketch's own
7. Footer: painting a stroke leaves colour **under** the ink lines, not over them
8. Footer: Save exports paint plus lines, not paint alone
9. At 390px, painting on the canvas does not scroll the page
10. Count of `—` across touched files
11. `npm run build` output
