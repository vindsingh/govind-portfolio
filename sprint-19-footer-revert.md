# SPRINT 19 — Revert the footer, then five changes

Branch `site-refresh`. Run `npm run build`. Do not commit. No new dependencies.

**This sprint is a revert followed by a short list. It is not a rebuild.**

Sprints 16 and 17 restyled the whole footer. That was not what was asked for. The
footer on `main` is the correct starting point. Everything in §2 is a small edit
to that, and nothing outside §2 changes.

No em dashes; grep and report the count.

---

# §0 REPORT FIRST, CHANGE NOTHING

1. **Every file sprint 16 or 17 touched for the footer.** Run
   `git diff main...HEAD --stat` and list the footer-related files: the footer
   component, any new component it imports, any CSS, any asset. This is the exact
   revert set for §1.
2. **Print `git show main:<footer component path>`** in full. This is the target
   state.
3. **The cityscape sketch.** Find it. Report its exact path and pixel dimensions.
   It is said to be in the footer folder already.
4. **The clock on `main`.** In the `main` version, where does `Toronto, EST` and
   the time render, what wraps it, and is there a coloured status dot next to it?
   Print that block.
5. **Does the paint offset bug exist on `main`?** Load the `main` footer, paint a
   stroke near the bottom of the canvas, and report whether the colour lands
   under the pointer. The bug I diagnosed in sprint 17 may have been introduced
   by sprint 16's own resizing code, in which case the revert fixes it and §2.5
   is unnecessary.

---

# §1 REVERT

Per §0.1. For each footer file in that list:

```
git checkout main -- <path>
```

For a file that sprint 16 or 17 created and `main` does not have, delete it.

For `globals.css` and any other shared file, **do not revert the whole file.**
Other sprints' work lives there. Remove only the rules that sprints 16 and 17
added for the footer, and list each one you removed.

**Report the full diff of §1 before moving on.** If reverting a file would undo
work from sprints 12 to 15 that is not footer-related, stop and say so rather
than reverting it.

After §1 the footer should render exactly as it does on the live site:

```
GA          Toronto, EST 12:57 p.m.          The bottom half is yours.
                                             [palette] [sizes] Eraser Save Reset
Still building.
Always thinking.                             ┌──────────────────────────┐
                                             │  cityscape sketch        │
[✉] [in]                                     │                          │
                                             │  (blank space to paint)  │
Work  About  Experience                      └──────────────────────────┘

Govind Singh Ahluwalia © 2026
```

Controls above the canvas. Sketch at the top of the panel, blank below it. The
original six swatches, not the goldfish palette.

---

# §2 THE CHANGES, ALL OF THEM

Five. Nothing else.

## 2.1 Delete the GA logo

Per §0.4. Remove it. `Toronto, EST` and the time stay exactly where they are, in
the same slot, at the same size. The logo's space closes up; the clock does not
move to a new position or a new line.

## 2.2 Remove the status dot

Delete the coloured dot rendered beside the time. Nothing replaces it. The line
reads:

> Toronto, EST 12:57 p.m.

Also drop the seconds if they are shown. Minutes only.

## 2.3 Replace the copyright line

Delete `Govind Singh Ahluwalia © 2026`. In its place, same position, same size,
same colour:

> Designed, drawn and built by Govind. 2026.

## 2.4 Fix the LinkedIn URL

**This is why the revert needs care.** The `main` footer links to
`https://linkedin.com/in/govindsinghahluwalia`, which is dead. Reverting puts the
broken link back.

After the revert, set it to:

```
https://linkedin.com/in/govind-ahluwalia
```

`target="_blank"`, `rel="noopener noreferrer"`.

**Grep the whole repo for `govindsinghahluwalia` and report every hit.** There may
be more than one dead link.

## 2.5 Paint offset, only if it is broken on main

Per §0.5. If painting on the reverted footer already lands under the pointer, do
nothing and say so.

If it is genuinely off on `main` too, fix it by pinning both CSS axes and
deriving coordinates from the rect:

```js
function sizeCanvas(canvas, cssW, cssH) {
  const dpr = window.devicePixelRatio || 1
  canvas.style.width  = cssW + 'px'
  canvas.style.height = cssH + 'px'
  canvas.width  = Math.round(cssW * dpr)
  canvas.height = Math.round(cssH * dpr)
  const ctx = canvas.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
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

`setTransform` not `scale`, because `scale` accumulates across re-inits.

**Verify by measurement:** stamp at four known canvas coordinates, read each back
with `getImageData`, and report the offset in px at each point. Do not report
that it looks right.

---

# §3 EXPLICITLY DO NOT

Everything on this list was built or specced in sprints 16 and 17 and is being
dropped. If the revert in §1 is done properly none of it will exist, but do not
reintroduce any of it:

- Do **not** change `Still building. Always thinking.` It stays, in its current
  size, weight and two-line layout.
- Do **not** add a serif `Govind Singh Ahluwalia` heading to the footer.
- Do **not** swap the cityscape for a painting. The cityscape is correct.
- Do **not** move the palette or controls below the canvas.
- Do **not** change the six swatch colours.
- Do **not** shrink the canvas to a small framed rectangle.
- Do **not** add a caption under the canvas.
- Do **not** add an expand or fullscreen button.
- Do **not** change `The bottom half is yours.` It describes the reverted layout
  correctly, because the sketch sits at the top of the panel and the space below
  it is empty.
- Do **not** resize the email and LinkedIn icons.
- Do **not** touch anything outside the footer.

---

# VERIFY — numbers, not checkmarks

At 1440 × 820 and 390px:

1. The five §0 answers
2. The §1 diff: every file reverted, every CSS rule removed, and confirmation
   that no non-footer work was undone
3. A description of the rendered footer, top to bottom, left to right, confirming
   it matches the live site apart from the five changes in §2
4. No `GA` logo anywhere in the footer
5. No status dot; the clock reads `Toronto, EST H:MM a.m./p.m.` with no seconds,
   in the same position it occupies on `main`
6. The attribution line renders; `Govind Singh Ahluwalia © 2026` is gone
7. Every repo hit for `govindsinghahluwalia`, and confirmation the footer
   LinkedIn now resolves
8. The §2.5 answer: was the offset present on `main`, and if so the four-point
   `getImageData` result
9. Painting still works: stroke, eraser, Reset, Save
10. At 390px, painting does not scroll the page
11. Count of `—` across touched files
12. `npm run build` output
