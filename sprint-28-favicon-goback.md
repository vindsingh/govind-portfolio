# SPRINT 28 — Favicon on iOS, the Go back arrow, then push

Branch `site-refresh`. §3 commits and pushes. Short sprint. No em dashes.

---

# §1 FAVICON

The icon differs between laptop and iOS because they read different files.
Desktop uses `favicon.ico` or the App Router's `icon` file. iOS Safari looks for
an `apple-touch-icon` at 180 × 180, and when it cannot find one it generates its
own from a screenshot of the page.

## 1.1 Report first

1. List every icon file in the repo: `app/favicon.ico`, `app/icon.*`,
   `app/apple-icon.*`, and anything under `public/` matching `*icon*` or
   `favicon*`. Report each one's path, pixel dimensions and file size.
2. Load `/` and print every `<link rel="icon">`, `<link rel="apple-touch-icon">`
   and `<link rel="shortcut icon">` tag Next.js generated, with its `href`,
   `sizes` and `type`.
3. Report whether `app/apple-icon.png` exists. It probably does not, and that is
   the cause.

## 1.2 The source is not square

The source is `public/favicon.svg`: a `GA` monogram, **650 × 392**, white fill
with a black stroke on a transparent background. Icons must be square, so right
now it is being letterboxed or squashed depending on which browser reads it.

Build a square master first, then export the sizes from it.

**The square master, 1024 × 1024:**

- Opaque background filling the whole canvas. Use the site's page background from
  `globals.css`. Report the hex you used. Not transparent: iOS composites the
  icon and an alpha channel renders badly, and a white-filled mark can vanish
  against a dark browser tab strip.
- The `GA` mark centred on both axes, scaled so its **width** is about 80% of the
  canvas, roughly 820px. Its height then lands near 494px, leaving generous space
  above and below. That is correct; do not scale to fill vertically, it would
  crop the letters.
- No rounded corners. iOS applies its own mask and a pre-rounded icon gets
  rounded twice.

## 1.3 Export

| File | Size | Used by |
|---|---|---|
| `app/favicon.ico` | 32 × 32 | the browser tab |
| `app/icon.png` | 512 × 512 | modern desktop browsers, PWA |
| `app/apple-icon.png` | 180 × 180 | iOS and iPadOS Safari |

All three from the same master, so they cannot drift apart again.

**The 32px one needs checking.** The SVG's `stroke-width` is 21 on a 650-wide
artboard, which is about 1px at 32px square, and the counters inside the `G` and
the `A` will start to fill in. Render it, look at it, and report whether the two
letters are still distinguishable. If they are not, thicken the stroke on the
32px export only and report the value you used. Do not change the SVG source.

## 1.4 Verify

- all three files exist at exactly the dimensions in §1.3, and all three are
  square
- all three `<link>` tags render with correct `href` and `sizes`
- none of the three has an alpha channel
- the background hex used

Report each.

---

# §2 THE GO BACK ARROW

Sprint 15 removed the arrow from the tab, but only on the CPKC page. Sprint 18
established that the case studies have separate implementations rather than one
shared component, so Falcon and FOR/M still render `← Go back`.

## 2.1 Report

Grep the repo for `Go back` and report every file and line, with whether an arrow
character precedes it. Include `←`, `<-`, `&larr;`, and any icon component.

## 2.2 Fix

Every occurrence reads **`Go back`** with no arrow, no icon, no glyph. Match the
CPKC page's rendering exactly: same font, size, weight, letter-spacing, padding
and tab shape.

Report the rendered text and computed styles of the tab on all three case study
pages. They must match.

## 2.3 While you are there

Report, do not fix: how much of the tab row is duplicated across the three case
studies, and whether it could be one component. I want to know the size of that
job, not have it done now.

---

# §3 THE MERGE

Only if §1 and §2 verify clean and `npm run build` passes.

```bash
git branch --show-current          # expect site-refresh
git status

git add -A
git commit -m "Add iOS app icon, remove Go back arrow from remaining case studies

Adds apple-icon.png at 180x180 so iOS and iPadOS stop generating their own
icon from a page screenshot. Removes the arrow from the Go back tab on the
Falcon and FOR/M case studies to match CPKC.

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

1. The three §1.1 answers
2. §1.4, all four checks, plus how the 32px version reads
3. Every `Go back` occurrence, before and after
4. Computed styles of the tab on all three case studies
5. §2.3 report
6. `npm run build` output
7. Commit SHA on `main`

---

# AFTER THE PUSH

The icon is cached hard on iOS. To see the change on your phone: close the tab,
clear Safari's website data for the site, and reopen it. If you added it to the
home screen, remove and re-add it. A hard refresh alone will not do it.
