# SPRINT 21 — Mobile CPKC, pill, footer restore

Branch `site-refresh`. Run `npm run build`. Do not commit. No new dependencies.

**Ordered by priority. §1 and §5 block shipping. §2, §3 and §6 are quick. §4 is
the longest and can be done last.**

No em dashes; grep and report the count.

---

# §1 CPKC CASE STUDY AT 390px, BLOCKING

The page renders horizontally scrolled with the content column clipped off the
left edge. The sprint 20 report said there was no overflow at 390px. That check
measured `document.documentElement.scrollWidth`, which does not detect overflow
caused by a `position: fixed` element. It is a false pass.

## 1.1 Measure it properly

Report, at 390px on `/projects/cpkc`:

- `document.documentElement.scrollWidth` and `window.innerWidth`
- `document.body.scrollWidth`
- For **every** element on the page: its `getBoundingClientRect().right` and
  `.left`. List every element whose `right > 390` or whose `left < 0`.
- The train band's computed `position`, `width`, `height`, `left`, `transform`
  and its parent's `overflow`

`TrainBand` computes `boxWidth = BAND_H / VISIBLE_FRAC * ART_RATIO`, which is
about 1071px at the desktop band height. On a 390px viewport that is nearly three
times the screen width. If nothing clips it, it drags the page sideways.

## 1.2 Contain it

The band must never contribute to page width.

- The band's immediate parent gets `overflow: hidden` and `width: 100%`.
- The page wrapper gets `overflow-x: clip`. Use `clip`, not `hidden`: `hidden`
  on an ancestor breaks `position: sticky` on descendants, and this page has
  sticky elements.
- The band itself keeps its pixel width. It is meant to overflow its container;
  it just must not overflow the page.

## 1.3 The rail and the content column at 390px

From the screenshot, the side rail is rendering as a floating card overlapping
the content, and the content column starts off-screen left.

Below 768px:

- The rail stacks **above** the content, full width, in normal flow. No
  `position: sticky`, no `position: absolute`, no negative margins.
- The content column is `width: 100%` with the page's standard mobile side
  padding on both sides. Its `left` must be greater than or equal to that
  padding, never negative.
- The layout is a single column. No grid columns, no side-by-side.

## 1.4 The train at 390px

Scale the band down rather than hiding it. Reduce `BAND_H` on mobile so
`boxWidth` comes out near the viewport width, and report the computed `boxWidth`
at 390px. If the wheels drift after scaling, keep the desktop `BAND_H` and let it
overflow the clipped container instead. **Do not recalculate the wheel constants.
They are correct and were verified against the reference export.**

## 1.5 Verify by walking, not by scrollWidth

At 390px, scroll `/projects/cpkc` from top to bottom in steps and report, at each
step, whether any element has `left < 0` or `right > 390`. Report the list of
offenders, or state that it is empty. Do the same at 360px.

---

# §2 CPKC HOME CARD

## 2.1 Delete the pill

Remove `VIEW CASE STUDY` from the CPKC card entirely. The whole card already
links to the case study. Delete the element, and the `CursorLabel` usage for this
card if nothing else needs it.

**Check the other cards.** If FOR/M, Falcon or Experience render the same pill,
remove it from those too and say which ones had it.

## 2.2 Faster

Speed the video up with `playbackRate`, set on the element once it can play:

```tsx
const onCanPlay = (e) => { e.currentTarget.playbackRate = 1.6 }
```

Start at `1.6`. Report how it reads. `loop` stays on.

---

# §3 FOOTER STRUCTURE, PUT BACK WHAT WAS NOT ASKED FOR

Three things changed that were never requested. Restore all three from `main`.

## 3.1 The divider line

The horizontal rule above the footer was deleted. Put it back, same colour, same
weight, same width, same spacing above and below as on `main`.

## 3.2 Delete the name heading

`Govind Singh Ahluwalia` in the serif display face was added to the footer. It
was not asked for. Delete it.

## 3.3 Restore the tagline to its old form

`Still building. Always thinking.` is currently one small line. On `main` it was
large and bold across two lines:

```
Still building.
Always thinking.
```

Take the exact font family, size, weight, line-height and colour from
`git show main:<footer path>` and restore them. Report the before and after
values.

`Toronto, EST H:MM p.m.` stays directly below it, where it is now. The green dot
stays removed.

---

# §4 THE DRAWING ELEMENT

## 4.1 Restore the counter

`main`'s footer had a count of how many people had drawn on it. That was the
point of the thing and it was dropped.

Find it: `git log -p -- <footer path>` and `git show main:<footer path>`. Report
what it was, where its data came from (localStorage, an API route, a hosted
store), and what it rendered.

Restore it exactly, in its original position and styling. If it depended on
something that no longer exists, report precisely what is missing rather than
inventing a replacement.

## 4.2 Controls go back above the canvas

The palette, brush sizes, Eraser, Save and Reset moved below the canvas. On
`main` they sat above it. Put them back above, in the original order and spacing.

## 4.3 Use the refreshed image, at its own ratio

The cityscape in `public/footer/` has been re-exported. Re-read it and report its
current path and pixel dimensions.

The frame is currently `16 / 10`. The image is close to square, so it is being
cropped hard. Set the frame's `aspect-ratio` from the image's **actual**
dimensions and use `object-fit: contain` so the whole drawing is visible. Report
both ratios.

## 4.4 The paint is far too dark

Over `mix-blend-mode: multiply`, a saturated colour at the current alpha goes
almost black where strokes overlap. Two changes:

**Lower the alpha:**

```js
const STROKE_ALPHA = 0.05   // was 0.12
```

**Lighten the swatches.** The painting colours should read as washes, not ink.
Keep the same six hues, lifted:

```
#3A3A3A   charcoal    (was #1A1A1A)
#C4785C   rust        (was #9C4A2F)
#6B9E78   green       (was #2F5D3A)
#5A7FA6   navy        (was #1E3A5F)
#E8C45C   gold        (was #D4A017)
#A3A3A3   grey        (was #6B6B6B)
```

The swatch buttons themselves still show the colour at full strength, so the
palette stays legible. Only what lands on the canvas is lighter.

Paint a test stroke, sample the resulting pixel where two strokes cross, and
report its RGB. If it is darker than roughly `#707070` for the grey swatch, drop
the alpha again and report the value you settled on.

## 4.5 The expanded view

Three faults: it scrolls, the backdrop is a heavy opaque grey, and the controls
are not reachable.

**No scrolling.** The image must fit entirely inside the panel:

```
max-width: 100%
max-height: calc(88vh - 160px)
object-fit: contain
```

The 160px reserves room for the header and the controls. Nothing inside the panel
scrolls; `overflow: hidden` on the panel.

**Lighter backdrop:**

```
background: rgba(20,18,16,0.45)
backdrop-filter: blur(24px) saturate(140%)
-webkit-backdrop-filter: blur(24px) saturate(140%)
```

Not the flat grey it uses now. The page should read through it.

**Controls below the image**, inside the panel, always visible without scrolling:
the same palette, brush sizes, Eraser, Save and Reset as the small view.

**Report:** the panel's rendered height, the image's rendered height, the
controls row's rendered height and its bottom offset from the panel's bottom
edge, and confirmation that `scrollHeight === clientHeight` on the panel.

---

# §5 WORK TAB, THE OTHER TWO CARDS COLLAPSED, BLOCKING

On the Work tab only the CPKC card has height. Below it are two thin horizontal
lines. Those are FOR/M and Falcon rendering at or near zero height: their borders
draw, their contents do not.

This is a regression from sprint 20. That sprint changed the grid's row tracks
to `'auto'` on Work and `'360px'` on All, and gave the CPKC card's media an
explicit `aspect-ratio`. The likely cause is that the row track list defines
fewer rows than there are cards, so every card past the first falls into an
implicit row that collapses. It may also be that the media `aspect-ratio` and
`overflow: hidden` were applied to all three cards while only CPKC has a video,
leaving the other two with no intrinsic height.

**Report before fixing:**

- the grid container's computed `grid-template-rows`, `grid-template-columns`,
  `grid-auto-rows` and `gap`, on both tabs
- the rendered width and height of all three cards on both tabs
- for FOR/M and Falcon: the rendered height of each child, to find which one has
  collapsed
- whether the three cards render through one component or three

**Then fix so that on the Work tab all three cards are full width, stacked, the
same height as each other, 24px apart.** Use `grid-auto-rows: auto` or drop the
explicit row track list entirely rather than enumerating rows. Do not give the
cards a fixed pixel height.

The CPKC card keeps its edge-to-edge media from sprint 20. FOR/M and Falcon keep
whatever media treatment they had before sprint 20; if sprint 20 applied CPKC's
`aspect-ratio` rule to them, scope it to CPKC only.

**Report all three cards' rendered heights on both tabs afterwards.**

---

# §6 ABOUT PAGE, THE HEADLINE AND THE OPENING

The headline reads `I like knowing how things actually work.` and the first
paragraph opens `I've always wanted to know how things actually work.` The same
sentence twice, eight words apart.

## 6.1 Recommended: keep the headline, cut the repeated sentence

The headline already sets it up, so the paragraph can start with the concrete
part. Replace paragraph one with, verbatim:

> So far that has meant a freight railway, an exhibition six thousand people
> walked through, and the gap between what founders say and what investors hear.

Headline unchanged. Paragraphs two, three and four unchanged.

## 6.2 Alternate, if the headline should change instead

Headline becomes a fragment and the paragraph completes it:

| | |
|---|---|
| Headline | How things actually work. |
| Paragraph 1 | I have always wanted to know. So far that has meant a freight railway, an exhibition six thousand people walked through, and the gap between what founders say and what investors hear. |

**Build 6.1 unless told otherwise.** Do not build both.

Either way the headline stays one centred line at 1440px, as specced in sprint
17 §1.

---

# VERIFY — numbers, not checkmarks

1. §1.1: the full list of elements with `left < 0` or `right > 390`
2. §1.5: the scroll walk at 390px and at 360px, listing offenders or stating the
   list is empty
3. §1.4: computed `boxWidth` at 390px, and whether the wheels still align
4. §2.1: no pill on the CPKC card; which other cards had one
5. §2.2: the `playbackRate` value in use
6. §3: divider restored, name heading gone, tagline before and after values
7. §4.1: what the counter was, where its data lived, and whether it is restored
   or what is missing
8. §4.2: controls are above the canvas
9. §4.3: the image's current path, dimensions, and the frame ratio now in use
10. §4.4: the sampled RGB where two strokes cross, and the final alpha
11. §4.5: the four panel measurements, and that the panel does not scroll
12. §5: the grid track values, and all three cards' rendered heights on both
    tabs, before and after
13. §6: the headline and paragraph one as rendered, with the duplicated sentence
    gone
14. At 390px, no horizontal overflow on `/`, `/about`, `/experience` and all
    three case studies, measured per §1.5, not by `scrollWidth`
15. Count of `—` across touched files
16. `npm run build` output
