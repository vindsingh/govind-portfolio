# SPRINT 29 — Revert the train band, then contain it properly

Branch `site-refresh`. **§1 first. Do not start §2 until §1 is verified.**

Sprint 27 changed `TrainBand` and made it worse. Undo that, confirm the laptop
rendering is back, then fix the real problem.

No em dashes.

---

# §1 REVERT SPRINT 27'S TRAIN CHANGE

## 1.1 Find it

```bash
git log --oneline -- components/cpkc/TrainBand.tsx
git diff HEAD -- components/cpkc/TrainBand.tsx
```

Sprint 27 added a `ResizeObserver` that writes `left` and `width` onto the band
from the file container. Print that diff.

Also check `app/projects/cpkc/page.tsx` and any CSS sprint 27 touched for the
band. Print those diffs too.

## 1.2 Undo

Restore `TrainBand.tsx` and anything else sprint 27 changed for the band to their
state **before** sprint 27. If the work is uncommitted, revert the hunks. If it
was committed, `git checkout <sha>^ -- <path>`.

**Do not revert anything else from sprint 27.** The footer attribution line
(`Built by Govind. 2026.`) and the mobile footer order stay.

**Report the diff of what you reverted.**

## 1.3 Confirm

At 1440px on `/projects/cpkc`, scroll from top to bottom and report:

- the band's computed `position`, `left`, `width`, `bottom`
- whether track or grass renders outside the file container's left or right edge
- whether track or grass renders below the container's bottom edge at the end of
  the page

Report the state. Do not fix it yet. §1 is done when the laptop rendering matches
how it was before sprint 27.

---

# §2 THE ACTUAL FIX, ONLY AFTER §1 IS CONFIRMED

The band is `position: fixed`, so its box is the viewport in both axes. Syncing
the horizontal axis to the container, as sprint 27 did, left the vertical axis
pinned to the viewport. At the end of the page the card ends and the band keeps
going below it. That is the bug in the screenshot, and it was latent before
sprint 27 too; sprint 27 just made it visible.

Fix both axes at once by putting the band **inside** the container and using
sticky positioning instead of fixed:

```
position: sticky;
bottom: 0;
```

Sticky solves both problems with no JavaScript:

- horizontally, the band is a normal child of the container, so it is bounded by
  the container's width automatically
- vertically, it pins to the bottom of the viewport while the container is in
  view, and stops at the container's bottom edge when you scroll past it

## 2.1 Requirements

- The band is a direct child of the file container, last in the flow.
- The container must **not** have `overflow: hidden` on any ancestor between it
  and the band, or sticky silently stops working. `overflow-x: clip` is fine;
  `hidden` is not. Report what the ancestors have.
- The band's own wrapper keeps `overflow: hidden` so the train clips at its
  edges.
- **Do not change the wheel constants.** `WHEELS`, `ART_W`, `ART_H`,
  `VISIBLE_FRAC`, `BOXCAR_FRAC` are correct. Only positioning changes.
- The scroll-linked motion keeps working. If the scroll progress calculation
  depended on the band being fixed, report that before changing anything.

## 2.2 If sticky does not work

If an ancestor's `overflow` cannot be changed without breaking something else,
stop and report it rather than reintroducing the JavaScript sync. Say which
ancestor and what it needs `overflow` for.

## 2.3 Verify at three widths

At **1440**, **1024** and **390**, scrolling from the top of the case study to
the bottom of the page:

1. no track or grass pixel outside the container's left or right edge
2. no track or grass pixel below the container's bottom edge, at any scroll
   position including the very end
3. the band pins to the viewport bottom while the case study is in view
4. the train still moves with scroll
5. the wheels still sit on the rail

Report all five at all three widths, described, not ticked.

---

# §3 DO NOT PUSH

Stop after §2 and report. I want to look at it before it goes to main.
