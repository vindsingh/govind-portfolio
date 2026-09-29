# SPRINT 13 — Home card, Experience rows, About polish

Branch `site-refresh`. Run `npm run build`. Do not commit. No new dependencies.

Files: `app/page.tsx`, `app/experience/page.tsx`, `app/about/page.tsx`,
`components/AboutGallery.tsx`.

Every value from an existing variable in `globals.css`. No em dashes; grep at the
end and report the count.

---

# §0 REPORT FIRST, BEFORE ANY EDITS

Answer these three and include them at the top of your report. Two of them decide
what you build.

1. **What hover treatment do the project cards on the home page currently have?**
   Print the relevant styles: transform, shadow, border, cursor, transition. The
   intro card must match whatever they do.
2. **What is the value of `--shadow-card` in `globals.css`?**
3. **Search `public/` for two images** and report exactly what you find:
   - a photo of Govind speaking at FOR/M
   - a second pen-and-paper or sketch photo, distinct from `Penpaperphoto.png`

   List every image file under `public/about/` and `public/projects/form/` with
   its size. If either image is missing, leave the placeholder and say so.

---

# §1 HOME PAGE — intro card

## 1.1 Type

Line 1 goes up in size and weight:

```
"Hi, I am Govind."
--text-2xl, var(--font-display), weight 700
letter-spacing: -0.01em
```

Cardo only ships 400 and 700. If 700 looks too heavy at that size, drop to
`--text-xl` at 700 rather than staying at 400. Report which you used.

## 1.2 Line 2 — replace the text, add two links

Replace *"Design researcher. Currently at CPKC."* with:

> Design research under Mitacs BSI at CPKC.

`--text-md`, `var(--font-body)`, `--color-text-secondary`, 12px below line 1.

Two inline links inside it:

- **Mitacs BSI** → `https://www.mitacs.ca`
- **CPKC** → `https://www.cpkcr.com`

Both `target="_blank"`, `rel="noopener noreferrer"`. Style: inherit the
paragraph's size and colour, `text-decoration: underline`,
`text-underline-offset: 3px`, `text-decoration-color: var(--color-border)`. On
hover the text goes to `--color-text-primary` and the underline to
`currentColor`. No arrows, no external-link icons.

If `mitacs.ca` should point at the BSI programme page specifically, swap it; I
used the root because I could not verify the deeper URL.

## 1.3 Icons

Current circular email and LinkedIn buttons go from their present size to
**44 × 44px**, icon glyph 20px, gap 12px between them, 28px below line 2.

44px is also the minimum comfortable tap target, so this fixes mobile at the same
time.

## 1.4 Card behaviour

The intro card now has a border like its siblings, so give it **the same hover
treatment the project cards have** (from §0.1). Same transform, same shadow, same
transition, same cursor.

If the project cards use a custom cursor or a canvas effect, apply it here too.
Report what you matched.

## 1.5 Alignment

The card is currently about 60% empty with the text floating near the middle.
Change the content block to **top-aligned**: `justify-content: flex-start`, with
48px of padding from the top of the card.

## 1.6 CPKC card — train video, only if the files exist

Check for `public/home/cpkc-card.webm`, `.mp4` and `.jpg`.

**If all three are present**, wire them into the CPKC × Mitacs card on the home
page, using the same `<video>` pattern as `components/cpkc/SectionVisual.tsx`:

```tsx
<video muted playsInline preload="none"
       poster="/home/cpkc-card.jpg">
  <source src="/home/cpkc-card.webm" type="video/webm" />
  <source src="/home/cpkc-card.mp4"  type="video/mp4" />
</video>
```

Full card width, anchored to the bottom of the card, `object-fit: cover`. Plays
once when the card enters the viewport, then holds the last frame. No loop.
Reduced motion: render the JPG only, never load the video.

**If the files are not there**, change nothing and report it.

---

# §2 EXPERIENCE PAGE

## 2.1 Remove the tools column

Delete the tools from every row and remove the right-hand column entirely. The
row becomes:

```
Researcher, Innovation Program                                        ›
CPKC · July 2025 – Present
```

Role on line 1, `Organisation · Dates` on line 2, chevron far right. Nothing else.

## 2.2 Two links per row, doing different jobs

**The organisation name in line 2** becomes an outbound link to the company's own
site. Style it like the inline links in §1.2. The dates stay plain text.

**The chevron** keeps linking to the case study, for the three rows that have one.
The whole row stays clickable for those three.

URLs I can confirm:

| Org | URL |
|---|---|
| CPKC | `https://www.cpkcr.com` |
| Falcon | `https://falcondemo.vercel.app` |
| OCAD University *(FOR/M row)* | `https://formgradex.vercel.app` |

For **Cadillac Fairview × OCAD**, **DesignWith Lab**, **OCAD CO**, **Samdisha
Bagga** and **DesignX Community**: I could not verify URLs. Leave those org names
as plain text and list them in your report so they can be filled in.

Note on the FOR/M row: the org reads "OCAD University" but the link points at the
exhibition site, which is the thing he actually directed. Flag it if that reads
oddly on the page.

## 2.3 Chevron rule, unchanged

Chevron renders only where a case study exists: CPKC, FOR/M, Falcon. The other
five rows get no chevron and no row hover state. Their org link still works.

## 2.4 Keep all 8 rows

Samdisha Bagga and DesignX Community stay. No change to the filter counts.

---

# §3 ABOUT PAGE

## 3.1 Card elevation, not frost

`backdrop-filter` does nothing over a white page, so the two cards get shadow and
lift instead.

Rest state:
```
border: 1px solid var(--color-border)
box-shadow: var(--shadow-card)
transition: transform var(--transition-base), box-shadow var(--transition-base)
```

Hover:
```
transform: translateY(-2px)
box-shadow: 0 2px 4px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.10)
```

If `--shadow-card` is heavier than `0 1px 2px rgba(0,0,0,0.04), 0 8px 24px
rgba(0,0,0,0.06)`, use that lighter pair as the rest state instead and report it.

`useReducedMotion`: keep the shadow change, drop the transform.

## 3.2 Painting tiles — hover

Each of the five image tiles in card 2:

```
overflow: hidden
transition: transform var(--transition-base)
```
and on hover the `<img>` inside scales to `1.04`. The tile itself does not move;
only the image inside it grows, clipped by the tile. Cursor `pointer`.

Reduced motion: no scale.

## 3.3 The sixth tile — real image under a frost

Replace the beige `+9` box. The sixth tile shows a **real thumbnail** with a
frosted overlay on top:

```tsx
// tile 6 renders PAINTINGS[5] as its image, plus:
position: absolute; inset: 0;
background: rgba(255,255,255,0.55);
backdrop-filter: blur(8px) saturate(140%);
-webkit-backdrop-filter: blur(8px) saturate(140%);
display: grid; place-items: center;
```

Centred inside it: `+9` at `--text-md`, `--color-text-primary`, weight 500.

Compute the number as `PAINTINGS.length - 5`. Do not hardcode it.

This is the one place on the page where frost reads, because there is a real
image behind it.

Tile 6 is still `PAINTINGS[5]`, so `portrait-fragments` now appears under the
overlay rather than being hidden. That is intended.

## 3.4 Modal — rebuild as a gallery, two levels

Rewrite `components/AboutGallery.tsx`. It has two views.

### Backdrop

```
position: fixed; inset: 0; z-index: 100;
background: rgba(20,18,16,0.45);
backdrop-filter: blur(24px) saturate(140%);
-webkit-backdrop-filter: blur(24px) saturate(140%);
```

Not the current 88% black. The page should be legible through it. This is the
second place frost belongs.

### Panel

```
max-width: min(1100px, 92vw);
max-height: 88vh;
margin: auto;
background: rgba(255,255,255,0.86);
backdrop-filter: blur(30px) saturate(180%);
border-radius: var(--radius-card);
box-shadow: 0 24px 80px rgba(0,0,0,0.24);
overflow: hidden;
```

### View 1 — grid (opens here)

- A short header inside the panel: `Paintings and drawings` at `--text-base`,
  `--color-text-secondary`, left; close `×` right. 24px padding.
- Below it, a scrollable grid of **all 14** thumbs.
  `grid-template-columns: repeat(4, 1fr)`, gap 12px, 24px padding, square tiles,
  `object-fit: cover`, `--radius-sm`.
- Loads the `-thumb.webp` files, not the full ones.
- Same hover as §3.2.
- Clicking a tile goes to view 2.
- Below 768px: `repeat(2, 1fr)`.

### View 2 — single image

- The full `.webp` for that piece, `max-width: 100%`,
  `max-height: calc(88vh - 120px)`, `object-fit: contain`, centred.
- Header changes: a `‹ Back` button on the left replaces the title; the counter
  `3 / 14` sits centre at `--text-xs` `--color-text-muted`; close `×` stays right.
- Left and right arrow buttons over the image, plus `ArrowLeft` / `ArrowRight`.
- Preload only the current image and its two neighbours.

### Keys and dismissal

- `Escape` in view 2 returns to view 1. `Escape` in view 1 closes the modal.
- Backdrop click closes from either view. Clicks inside the panel do not.
- `document.body.style.overflow = 'hidden'` while open; restore on close.
- Focus moves to the close button on open, and returns to the tile that was
  clicked on close.
- Opening from any of the six tiles opens **view 1**, not that image. The grid is
  the entry point.

### Reduced motion

No fade or scale transitions. Show and hide instantly. Backdrop blur stays.

## 3.5 Images

Per §0.3, fill the two placeholder slots if the files exist. If they do not,
leave the placeholders and report the exact paths they should be dropped at.

---

# VERIFY — numbers, not checkmarks

At 1440 × 820 and 390px:

1. The three §0 answers
2. Rendered font size and weight of "Hi, I am Govind."
3. Rendered size of the email and LinkedIn buttons (must be 44 × 44)
4. Which hover treatment you matched on the intro card
5. Whether the three `public/home/cpkc-card.*` files exist, and whether the video
   is wired
6. Which Experience rows render a chevron, and which org names are linked
7. The computed `+N` on tile 6 (must be 9)
8. Modal: opens to the grid, all 14 render, clicking one goes to view 2, Back
   returns, Escape behaves per §3.4
9. At 390px, no horizontal scroll on `/`, `/about` or `/experience`
10. Count of `—` across touched files
11. `npm run build` output
