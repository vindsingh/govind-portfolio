# SPRINT 15 — Home, About, gallery, CPKC copy

Branch `site-refresh`. Run `npm run build`. Do not commit. No new dependencies.

**The footer rebuild is NOT in this sprint.** It is the biggest single piece of
work left and the most likely to fight. Land these first.

Files: `app/page.tsx`, `app/about/page.tsx`, `app/projects/cpkc/page.tsx`,
`components/AboutGallery.tsx`, `components/SiteHeader.tsx`, and whichever
component renders the "Go back" tab.

All values from existing variables in `globals.css`. No em dashes; grep and
report the count.

---

# §0 REPORT FIRST

1. **Is the CPKC card's video wired on the home page?** Print the rendered
   `<video>` element, its `src` values, and whether the IntersectionObserver that
   triggers playback is attached. The card currently shows a static frame.
2. **Does the tab row filter the home grid?** Name the state variable and where
   it lives.
3. There is a stray **"VIEW CASE STUDY"** button rendering over the Falcon card,
   cut off at its left edge. Report what produces it and where it is positioned.

---

# §1 HOME PAGE

## 1.1 Title line

Replace *"Design research under Mitacs BSI at CPKC."* with:

> Researching and designing at CPKC, through Mitacs.

**CPKC** and **Mitacs** stay linked exactly as they are now.

## 1.2 Name block only on the All tab

When the **Work** tab is selected, the centred name block (caricature slot, "Hi,
I am Govind.", the title line, and the two icons) does not render at all. Work is
a filtered project view and should open straight into the cards.

It renders on **All**. If About and Experience are separate routes rather than
tab states, this only affects All and Work.

## 1.3 Swap two cards

Card order becomes:

```
CPKC (full width or first slot, unchanged)
FOR/M            Falcon
Experience
```

FOR/M moves into Falcon's current position; Falcon takes FOR/M's. Nothing else
about the grid changes.

## 1.4 CPKC video

Per §0.1. Fix whatever is stopping it. The likely causes, in order:

- The IntersectionObserver never fires because the card is above the fold on load
  and `threshold` is never crossed. If so, also play when the element is already
  intersecting at mount.
- `preload="none"` plus an immediate `.play()` call racing the metadata load. If
  so, set `preload="auto"` and play on `loadeddata`.
- The `poster` is set and playback silently fails, leaving the poster visible.

Report which it was, with evidence, not a guess.

## 1.5 Fix the stray button

Per §0.3. The "VIEW CASE STUDY" overlay is rendering at the wrong position and
clipping. Fix its positioning so it sits within its own card.

---

# §2 SITE HEADER

## 2.1 Remove contact icons, move CURIOUS MODE

Delete the email and LinkedIn circular buttons from the top-right of
`SiteHeader`. Move the **CURIOUS MODE** button into that position.

Contact remains in the footer on every page, and in the home page's centred
block.

## 2.2 "Go back" loses its arrow

The tab reads `← Go back`. Remove the arrow; it repeats what the words say.
The tab reads **Go back**.

---

# §3 ABOUT PAGE

## 3.1 Photo and column balance

The photo currently renders about 125px taller than the text block, and the gap
between columns is wide enough to read as a hole.

```
grid-template-columns: 1fr 420px;
gap: 64px;
align-items: start;
```

Photo: `width: 420px`, `aspect-ratio: 4 / 3` (so 315px tall),
`object-fit: cover`, `object-position: center 30%`,
`border-radius: var(--radius-card)`.

Text column: `max-width: 560px`. **Report its currently rendered width** — it may
be wider than the spec.

**Report both column heights after the change.**

## 3.2 Swap the card order

**"Observer by nature" comes first**, "Working it out by hand" second. The
paintings grid is the stronger opening and it should lead.

Nothing inside either card changes.

---

# §4 GALLERY MODAL

## 4.1 Arrow buttons

The chevron glyphs are sitting off-centre inside their circular buttons, and the
right button is clipped by the panel edge.

```
display: grid;
place-items: center;
line-height: 1;
```

on each button, and inset both from the panel edges by 24px rather than letting
them sit flush.

**Report the rendered position of each button relative to the panel.**

## 4.2 Remove "‹ Back"

Delete the Back button from the detail view. Returning to the grid happens by:

- `Escape` (already built)
- clicking the panel background around the image, but **not** the image itself

The `×` continues to close the modal entirely from either view.

The counter (`5 / 14`) stays where it is.

---

# §5 CPKC CASE STUDY

## 5.1 Replace the Get in touch button

Delete the pill button. The confidentiality line becomes, verbatim:

> Most of this work is confidential, but **message me** if you want to talk
> through any of it.

`message me` → `mailto:ahluwaliagovindsingh@gmail.com`.

Keep the `Highlighter` underline on the whole sentence. Because that underline is
already there, the link inside it takes **no underline of its own** — style it
`font-weight: 500`, `color: var(--color-text-primary)`, with a hover to
`var(--color-accent-cpkc)`.

## 5.2 Copy rewrites

Six changes. Everything not listed here stays exactly as it is.

### Section 1 — "Shipped rough"

Replace with:

> Internal tools here were built on default templates. We gave this one a look of
> its own, then showed it to people while it was still rough. It is in use now,
> and they run it themselves.

*("designed this one properly" was reading as self-congratulation.)*

### Section 3 — "Mapping what happens"

Replace with:

> We mapped how work moved through an external trucking partner, and later
> through a customer portal. Both started from a blank page.

*(It opened with "that flow", referring back to a pointer in a different column.)*

### Section 4 — statement line, both halves

| | |
|---|---|
| Line 1 | The research all lives in one place, but the rules for filing it no longer agree. |
| Line 2 | So that gets fixed before anything else is built on top. |

### Section 4 — "What's already there"

Replace with:

> Years of customer research already sit in one place, and a new customer portal
> is being designed on top of it. I am not leading that work. My part was
> interviewing the internal teams the portal affects.

### Section 4 — "What comes next"

Replace with:

> Three documents set the rules for how research gets filed, and they had stopped
> matching each other. I wrote up a fix and put it in for review.

*("The files that decide how research gets filed" was a knot. "Three documents"
is concrete and lands immediately.)*

---

# §6 REPORT ONLY, DO NOT FIX

Section headings on the CPKC case study pass behind the fixed train band as they
scroll. "Something people use" is partly hidden by the locomotive mid-scroll.

Report the band's `z-index`, the section headings' `z-index`, and how much
vertical overlap occurs. Do not change it; it may be intentional.

---

# VERIFY — numbers, not checkmarks

At 1440 × 820 and 390px:

1. The three §0 answers
2. Home: title line renders correctly with both links live
3. Home: name block absent on Work, present on All
4. Home: card order, and what fixed the video
5. Header: CURIOUS MODE top right, no contact icons, "Go back" without an arrow
6. About: rendered width and height of both columns, and of both cards
7. About: paintings card renders first
8. Modal: arrow button positions relative to the panel; no Back button; Escape
   and background click both return to the grid
9. CPKC: no pill button, inline link works, Highlighter still draws
10. CPKC: all six copy changes present, old strings gone
11. §6 measurements
12. At 390px, no horizontal scroll on `/`, `/about`, `/projects/cpkc`
13. Count of `—` across touched files
14. `npm run build` output
