# SPRINT 27 — Train band on iPad and phone, footer order, then push

Branch `site-refresh`. §4 commits and pushes. Fast sprint. No em dashes.

The laptop rendering is correct. iPad and phone are wrong in the same way, so
this is one fix, not two.

---

# §1 REPORT FIRST

On `/projects/cpkc`, at **1440px**, **1024px** and **390px**, report:

1. `TrainBand`'s computed `position`, `left`, `right`, `width`, `bottom`,
   `height`, and its parent's `overflow`
2. The file container's `getBoundingClientRect()`: `left`, `right`, `width`
3. Whether the band's `left` and `width` match the container's at each width

At 1440 they will match. At 1024 and 390 the band spans the viewport while the
container is inset, which is why the track and grass run past the card's edges
into the page background.

4. Also at 390px: the band's `bottom` offset. In the screenshot it is sitting
   mid-content rather than pinned to the bottom of the viewport. Report what is
   positioning it there. Sprint 22 set `BAND_H_MOBILE = 67px`; report whether
   that is still in play and what else changed.

---

# §2 CONSTRAIN THE BAND TO THE CONTAINER

The band stays `position: fixed` and pinned to the bottom of the viewport, as it
is on laptop. What changes is that its horizontal box is taken from the file
container instead of the viewport, at every width.

```tsx
// containerRef is the file container the case study sits in
useEffect(() => {
  const el = containerRef.current
  const band = bandRef.current
  if (!el || !band) return

  const sync = () => {
    const r = el.getBoundingClientRect()
    band.style.left = `${r.left}px`
    band.style.width = `${r.width}px`
  }

  sync()
  const ro = new ResizeObserver(sync)
  ro.observe(el)
  window.addEventListener('resize', sync)
  window.addEventListener('scroll', sync, { passive: true })
  return () => {
    ro.disconnect()
    window.removeEventListener('resize', sync)
    window.removeEventListener('scroll', sync)
  }
}, [])
```

The band's own wrapper keeps `overflow: hidden` so the train clips at the
container's edges exactly as it does on laptop.

**Do not change the wheel constants.** `WHEELS`, `ART_W`, `ART_H`,
`VISIBLE_FRAC`, `BOXCAR_FRAC` are correct and were verified against the
reference export. Only the band's `left` and `width` change.

## 2.1 Height and scale

The band height scales with the container width so the train reads at the same
proportion on all three. Keep whatever ratio produces the laptop result and
derive the smaller sizes from it rather than hardcoding a mobile value.

`boxWidth` must recompute from the band height per the existing formula. Report
the computed `BAND_H` and `boxWidth` at all three widths.

## 2.2 Pinned to the bottom

At 390px the band must sit at the bottom of the viewport, not part way up the
page. Same `bottom` behaviour as laptop.

## 2.3 Verify

At 1440, 1024 and 390:

- the band's `left` and `width` equal the container's, within 1px
- no track or grass pixel renders outside the container's left or right edge
- the band's bottom edge is at the viewport bottom
- the wheels still sit on the rail

Report all four per width. Screenshot-level description, not checkmarks.

---

# §3 FOOTER

## 3.1 The attribution line

Replace verbatim:

> Built by Govind. 2026.

`Drawn and` comes off.

## 3.2 Order on phone

Below 768px, the attribution line renders **after** the drawing block, not
before it. Everything else in the left column keeps its current order:

```
Still building.
Always thinking.

Toronto, EST H:MM p.m.

[✉] [in]

Work  About  Experience

Drawn in 2020. Colour it in.
[controls]
[counter]
[sketch frame]

Built by Govind. 2026.
```

Desktop layout does not change. The attribution stays where it is in the left
column at 768px and above.

**Report the rendered vertical order at 390px.**

---

# §4 THE MERGE

Only if §2 and §3 verify clean and `npm run build` passes.

```bash
git branch --show-current          # expect site-refresh
git status

git add -A
git commit -m "Rebuild CPKC case study, About, Experience, home and footer

CPKC case study restructured as four workstreams with a scroll-linked
hand-drawn train, now constrained to the file container at every width.
About, Experience, home grid and footer rebuilt. Footer gains a
colour-it-in canvas over the cityscape sketch. Removes retired claims
from CuriousCanvas, Experience and BentoGrid.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01PFfWRqXwEtm54fuMxvPvt9"

git checkout main
git pull origin main
git merge site-refresh --no-ff -m "Merge site-refresh into main

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01PFfWRqXwEtm54fuMxvPvt9"

npm run build
git push origin main
```

**Stop and report on a merge conflict. Do not resolve it.**
**Stop if the build fails. Do not push.**

Report the commit SHA and confirm Vercel picked it up.

---

# VERIFY

1. The four §1 answers at three widths
2. §2.3, all four checks at three widths
3. `BAND_H` and `boxWidth` at three widths
4. Footer line reads `Built by Govind. 2026.`
5. Rendered vertical order of the footer at 390px
6. `npm run build` output
7. Commit SHA on `main`
