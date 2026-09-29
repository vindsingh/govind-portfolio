# SPRINT 20 — Home card, footer image, buttons back, Work tab

**This replaces `sprint-19-footer-revert.md`. Do not run sprint 19.**

Sprint 19 reverted the footer to `main`. That is no longer wanted. The footer as
it stands now is the base; only the image, the palette and three sizes change.

Branch `site-refresh`. Run `npm run build`. Do not commit. No new dependencies.

Files: `app/page.tsx`, `app/experience/page.tsx`, `app/projects/cpkc/page.tsx`,
`app/projects/falcon/page.tsx`, `app/projects/form/page.tsx`, the footer
component, the tab row component.

All values from existing variables in `globals.css`. No em dashes; grep and
report the count.

---

# §0 REPORT FIRST

Seven answers. Five decide what gets built.

1. **The CPKC home card.** Print the card's JSX and the styles on its media
   container. Report at 1440px, on both the All and Work tabs:
   - the card's rendered width and height
   - the media container's rendered width, height, and its offsets from the
     card's top, left and right edges
   - the video's intrinsic `videoWidth` and `videoHeight`
   - the current `object-fit`, `object-position` and `loop`
   There is cream showing above the video on Work and down both sides on All.
   Report what produces each: card padding, a `max-width`, a `margin`, or a
   mismatched `aspect-ratio`.
2. **The `VIEW CASE STUDY` pill.** Report its positioned ancestor and its
   computed `top`/`right`/`left`. On the All tab it renders outside the media
   area, clipped at the card's left edge.
3. **The centred name block.** Report the rendered centre x of each of these
   three, relative to their shared container: `Hi, I am Govind.`, the subtitle
   line, and the icon row. Also report each one's `max-width`, `margin`,
   `padding`, `text-align` and `letter-spacing`.
4. **The cityscape sketch.** Exact path and pixel dimensions.
5. **The tab row and Work navigation.** Did sprint 17 §5.1 land? Print the tab
   row component, the home page's `activeTab` declaration, and any
   `useSearchParams` usage. Report what the tab row does on `/about`,
   `/experience`, `/projects/cpkc`, `/projects/falcon`, `/projects/form`. Then
   click `Work` from each of those five and report exactly what happens.
6. **The button component sprint 18 removed.** Sprint 18 §2.3 replaced pill
   buttons in the Falcon and FOR/M rails with plain links. Find that component in
   git history: `git log -p -- <rail file>` around the sprint 18 change. Print its
   name, its props and its animation. It is being restored.
7. **The Falcon rail `STATUS` block.** Print it, including the
   `Research complete · Product in development` string and its colour.

---

# §1 HOME PAGE, CPKC CARD

## 1.1 The media fills the card

Per §0.1. The video currently floats inside the card with cream around it. It
should run edge to edge across the top of the card, from the card's left edge to
its right edge, down to where the `ENTERPRISE DESIGN & AI` eyebrow begins.

```
┌──────────────────────────────┐
│                              │  ← video, full bleed, no gap above or beside
│         train video          │
│                              │
├──────────────────────────────┤
│  ENTERPRISE DESIGN & AI      │  ← text block keeps the card's normal padding
│  Design thinking inside...   │
└──────────────────────────────┘
```

- Media container: full card width, **no padding, no margin, no max-width**,
  flush to the card's top, left and right edges.
- Top corners rounded to match the card's radius; bottom corners square.
- `aspect-ratio` set from the video's own intrinsic ratio per §0.1, so
  `object-fit: cover` and `contain` resolve identically and nothing crops.
  Write the source dimensions in a comment.
- The card needs `overflow: hidden` for the corners to clip.

This applies on **both** the All and Work tabs. If the card renders through one
component with a variant prop, fix it once. If there are two, fix both and say so.

**Report the media container's four offsets from the card edges. Three of them
must be 0.**

## 1.2 The animation loops

Change the video to `loop`, playing continuously rather than once. Keep
`muted`, `playsInline`, `autoPlay` and `preload="auto"`.

Under `prefers-reduced-motion`, still render the JPG only. Nothing loops.

## 1.3 The pill sits inside the media

Per §0.2. `VIEW CASE STUDY` is positioned against the wrong ancestor on the All
tab.

Give the media container `position: relative` and position the pill against it:
`position: absolute; top: 16px; right: 16px`. With the container's
`overflow: hidden` it can no longer escape the card.

**Report its computed position on both tabs. It must be inside the media area on
both.**

---

# §2 HOME PAGE, THE CENTRED BLOCK

Per §0.3. `Researching and designing at CPKC, through Mitacs.` reads as slightly
off-axis against the name above it.

Fix whichever of the three the report shows is off. The likely causes, in order:

- The heading carries a negative `letter-spacing`, which removes space after its
  final character and shifts its optical centre left while its box centre stays
  put. If so, the fix is on the heading, not the subtitle.
- One of the three has a `max-width` the others do not, so they centre inside
  different boxes.
- The subtitle has asymmetric padding.

Do not "fix" it by nudging a margin. Find which element is off, correct the cause,
and **report the three centre x values again afterwards. They must be within 1px
of each other.**

---

# §3 FOOTER

The layout, the frame, the caption, the controls and the paint interaction all
stay exactly as they are. Four changes.

## 3.1 The cityscape replaces the goldfish

Per §0.4. Swap the image in the frame to the cityscape sketch. Nothing about the
frame, its size, its `object-fit` or its `mix-blend-mode: multiply` changes.

## 3.2 The palette suits the new image

The six swatches are currently pulled from the goldfish. The cityscape is ink on
paper, so use the set that was on `main`:

```
#1A1A1A   near black
#9C4A2F   rust
#2F5D3A   green
#1E3A5F   navy
#D4A017   gold
#6B6B6B   grey
```

If those exact values are in git history on the `main` footer, take them from
there instead and report which you used.

## 3.3 The caption

`Colour it in. Sketched in 2020.` was written for the goldfish. With the
cityscape in the frame, drop the year:

> Colour it in.

## 3.4 Remove the status dot, and three size bumps

- **Delete the green dot** beside the clock. The line reads
  `Toronto, EST 1:44 p.m.` with nothing before it. Keep it in its current
  position under the tagline. Minutes only, no seconds.
- **`Work` `About` `Experience`**: up one step on the type scale.
- **The email and LinkedIn icons**: up to 44 × 44, glyph 20px, gap 12px.
- **`Designed, drawn and built by Govind. 2026.`**: up one step, from
  `--text-sm` to `--text-base`. Colour unchanged.

Nothing else in the footer moves.

---

# §4 EXPERIENCE PAGE

`VIEW RESUME PDF →` loses the arrow. It reads `VIEW RESUME PDF`. Same button,
same size, same position.

---

# §5 FALCON AND FOR/M

## 5.1 Put the buttons back

Per §0.6. Sprint 18 §2.3 was wrong. Restore the original button component,
with its animation, for every rail link on both pages:

| Page | Buttons |
|---|---|
| Falcon | Watch the Intro, Behind the Idea, Try the Demo |
| FOR/M | Visit website, Instagram |

Same component, same props, same animation, same position in the rail as before
sprint 18. Delete the `LINKS` label and the plain-link styling sprint 18 added.

Everything else sprint 18 did to these pages stays: sentence-case rail items, the
underline active state, no monospace, tokenised colours.

## 5.2 Remove the Falcon STATUS block

Per §0.7. Delete the `STATUS` label and the
`Research complete · Product in development` line from the Falcon rail entirely.
`ROLE`, `CATEGORY` and the buttons stay.

If that string also renders in the page body, leave the body copy alone. Only the
rail block goes.

---

# §6 CONTACT LINES, ADD LINKEDIN

Both pages currently end with a `message me` link. Add LinkedIn using the same
construction the About page already uses, so all three read alike.

**CPKC**, replacing the current line verbatim:

> Most of this work is confidential, but **message me** or find me on
> **LinkedIn** if you want to talk through any of it.

**Falcon**, replacing the current line verbatim:

> If you are working on venture intelligence, founder-investor communication, or
> performance data, **message me** or find me on **LinkedIn**.

- `message me` → `mailto:ahluwaliagovindsingh@gmail.com`
- `LinkedIn` → `https://linkedin.com/in/govind-ahluwalia`, `target="_blank"`,
  `rel="noopener noreferrer"`

Style both exactly as the About page styles its two. On CPKC the sentence sits
inside a `Highlighter` underline, so neither link takes an underline of its own
there; keep whatever rule already handles that for `message me` and apply it to
`LinkedIn` too.

**Grep for `govindsinghahluwalia` across the repo and report every hit.** That
LinkedIn URL is dead and may still be in the footer or elsewhere.

---

# §7 THE WORK TAB, MAKE THE URL THE SOURCE OF TRUTH

Per §0.5. Clicking `Work` from About, from a case study, or sometimes from the
home page itself does not land. The cause is that the tab has two sources of
truth: local state on the home page, and a `?tab=` param that only some routes
set. They drift.

Collapse it to one. **The URL is the only state.**

On the home page, derive rather than store:

```tsx
const params = useSearchParams()
const tab: Tab = params.get('tab') === 'work' ? 'work' : 'all'
```

No `useState`, no `useEffect` sync. Delete `activeTab` and its setter.

Every tab, on every route, becomes a plain link:

| Tab | href |
|---|---|
| All | `/` |
| Work | `/?tab=work` |
| About | `/about` |
| Experience | `/experience` |

On the home page use `router.replace(href, { scroll: false })` so switching tabs
does not add history entries or jump the scroll position. Everywhere else, a
normal `Link`.

The active tab is computed from the current pathname and param, so it is correct
on first paint on every route with no client-side reconciliation.

`useSearchParams` needs a Suspense boundary in the App Router. If the build
complains, wrap the consuming component. Do not switch to `window.location`.

**Verify by walking it.** From each of `/about`, `/experience`,
`/projects/cpkc`, `/projects/falcon`, `/projects/form`, and from `/` itself on
both tabs, click `Work` and report where you land and which tab renders active.
That is eleven checks. Report all eleven, not a summary.

---

# VERIFY — numbers, not checkmarks

At 1440 × 820 and 390px:

1. All seven §0 answers
2. CPKC card: the four offsets on both tabs, three of them 0; the media and video
   ratios; that the full locomotive and last boxcar are both visible
3. CPKC card: the video loops and does not stop
4. CPKC card: the pill's computed position on both tabs, inside the media area
5. Home: the three centre x values, within 1px, and what the cause was
6. Footer: cityscape renders, palette values used, caption reads `Colour it in.`
7. Footer: no green dot; rendered sizes of the nav links, the icons and the
   attribution line, before and after
8. Footer: painting, Eraser, Save and Reset all still work
9. Experience: no arrow on the resume button
10. Falcon and FOR/M: the buttons render with their animation; no `LINKS` label;
    rail items still sentence case with the underline active state
11. Falcon: no `STATUS` block in the rail
12. CPKC and Falcon: the new contact lines render, both links resolve, the
    Highlighter still draws on CPKC
13. Every repo hit for `govindsinghahluwalia`
14. The eleven Work-tab checks from §7, listed individually
15. At 390px, no horizontal scroll on `/`, `/about`, `/experience`, and all three
    case studies
16. Count of `—` across touched files
17. `npm run build` output
