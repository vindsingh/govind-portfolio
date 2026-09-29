# SPRINT 18 — Falcon and FOR/M brought in line with CPKC

Branch `site-refresh`. Run `npm run build`. Do not commit. No new dependencies.

**Run sprint 17 first.** §6 of that sprint removes `.section-highlight` from both
of these pages. This sprint assumes it is gone.

Files: `app/projects/falcon/page.tsx`, `app/projects/form/page.tsx`, whichever
component renders the case study side rail, `app/globals.css`.

All values from existing variables in `globals.css`. No em dashes; grep and
report the count.

The CPKC case study is the reference for everything in §2 and §3. Read
`app/projects/cpkc/page.tsx` and its `CPKCIndexBox` before changing anything, and
match it rather than reinventing it.

---

# §0 REPORT FIRST

Eight answers. Five of them decide what gets built.

1. **The side rails.** Are Falcon, FOR/M and CPKC using the same component, three
   copies of one component, or three separate implementations? Print each one's
   file path and the styles it applies to a nav item in its rest and active
   states: font family, size, weight, letter-spacing, text-transform, colour,
   border, background.
2. **Monospace.** Grep the whole repo for `font-mono`, `monospace`, `--font-mono`,
   and any `next/font` mono import. Report every file and line. State which of
   them render on `/projects/falcon` and `/projects/form`.
3. **Colours.** List every colour value used on those two pages that is **not**
   a `var(--color-*)` token. Hex, rgb, hsl, and Tailwind colour utilities
   (`text-blue-600` and so on) all count. Report file, line and value.
4. **The role string.** Grep for `Independent Researcher` across the repo. Report
   every file, line and exact string, including the ampersand variants. There are
   at least two spellings in use.
5. **Section headings on Falcon.** The rendered page shows `THE PROBLEM`,
   `THE ECOSYSTEM`, `ONBOARDING`, `SIGNAL CARD`, `SHARE TO INVESTOR`,
   `OPEN CANVAS`, `CURRENT STATE` in uppercase, and one lowercase `features`.
   Report, for each: is it an `<h2>` section heading or a small eyebrow label?
   Print its element and classes. Do not change anything yet.
6. **The Falcon CTA.** Print the full paragraph and the button markup at the end
   of the page, including the component the button comes from.
7. **A stray `message me` on the CPKC page.** At the top of
   `/projects/cpkc`, a bordered box containing the text `message me` renders
   over the train artwork, clipped, roughly level with the first illustration and
   nowhere near the confidentiality line it belongs to at the foot of the page.

   Report what produces it: print the element, its parent, its computed
   `position`, `top`, `left`, `transform` and `z-index`, and whether the
   `Highlighter` component is involved. **Do not fix it in this sprint.** I want
   the cause before the change, and it may be the same clipping bug that produced
   the stray `VIEW CASE STUDY` pill on the home page.

8. **The rail's secondary block.** CPKC's rail carries `ROLE` and `TIMELINE`
   meta. Falcon and FOR/M carry pill buttons (`Visit website`, `Instagram`).
   Print all three so §2.3 can be specced against what is actually there.

---

# §1 CONTENT FIXES

## 1.1 Falcon role string

Per §0.4. Everywhere it appears, the role is, verbatim:

> Independent Researcher and Builder

Not `&`. Not `Designer`. This is the string on the Experience page and it is the
one that is correct; the others get changed to match.

**Report every location you changed and the string it had before.**

## 1.2 FOR/M, one verb

In the My Role paragraph, change exactly one word:

| From | To |
|---|---|
| I developed the curatorial framework | **We** developed the curatorial framework |

Everything else in that paragraph stays in the first person. `I came in as
Exhibition Director` does not change. The point of the edit is that he set the
direction and the committee built the framework, so that one clause is the only
one that moves.

Do not touch any other paragraph on the page.

## 1.3 CPKC rail, link the Mitacs line

**The only change to the CPKC page in this sprint.** Do not touch anything else
on it.

In the rail's `ROLE` block, the second line currently reads
`Mitacs Business Strategy Internship` as plain text. It becomes a link to:

```
https://www.mitacs.ca/our-projects/democratize-human-centered-design-to-accelerate-innovation-at-canadian-pacific-rail/
```

`target="_blank"`, `rel="noopener noreferrer"`. Same inline link style as §1.4.

The string does not change. That page names the program as
`Business Strategy Internship`, so the label and the destination agree.

## 1.4 Falcon CTA becomes an inline link

Per §0.6. Delete the `Get in touch →` button, and its import if now unused.

The paragraph currently reads:

> If you are working in this space: venture intelligence, founder-investor
> communication, or performance data, I would like to hear from you.
> [Get in touch →]

Replace the whole thing with, verbatim:

> If you are working on venture intelligence, founder-investor communication, or
> performance data, **message me**.

`message me` links to `mailto:ahluwaliagovindsingh@gmail.com`.

This is the style §1.3 refers to.

Style it exactly like the inline links on the home page and About page: inherits
size and colour, `text-decoration: underline`, `text-underline-offset: 3px`,
`text-decoration-color: var(--color-border)`, hover to
`var(--color-text-primary)` with the underline at `currentColor`.

No arrow. The link is the call to action; an arrow after it repeats itself.

If the sentence sits inside a `Highlighter` underline as CPKC's does, the inline
link takes **no underline of its own** there. Match whatever CPKC does, per §5.1
of sprint 15.

---

# §2 THE SIDE RAIL

Per §0.1 and §0.8. Falcon and FOR/M adopt the CPKC rail exactly. CPKC does not
change.

## 2.1 Nav items

| | CPKC now | Falcon and FOR/M now | Target |
|---|---|---|---|
| Case | `The practice` | `THE PROBLEM` | CPKC's |
| Transform | none | uppercase | none |
| Font | body | monospace or tracked | body |
| Letter-spacing | normal | wide | normal |
| Rest colour | `--color-text-muted` | blue-tinted | `--color-text-muted` |
| Active colour | `--color-text-primary` | same as rest | `--color-text-primary` |
| Active mark | underline | black box plus a coloured bar | underline |

So on both pages:

- **Sentence case labels.** `My role`, `The problem`, `Key decision`,
  `Execution`, `Impact`, `Reflection` on FOR/M. Use the equivalent for Falcon,
  taken from its own section headings, sentence case.
- `text-transform: none`, `letter-spacing: normal`, body font.
- Rest: `--color-text-muted`. Active: `--color-text-primary` with the same
  underline CPKC draws, same offset, same thickness, same colour.
- **No box, no bracket, no left bar, no background tint** in any state.
- Hover on an inactive item goes to `--color-text-secondary` only.

**Print the exact CPKC active-state rule you copied, and confirm the same rule
now applies on all three pages.**

## 2.2 If there are three implementations

Per §0.1. If the rails are three separate implementations, do **not** refactor
them into one shared component in this sprint. Make Falcon and FOR/M match CPKC's
rendered output and note in your report that consolidating them is outstanding.
A refactor here would touch the CPKC page, which is the one page that is right.

## 2.3 The secondary block

Keep the `Visit website` and `Instagram` links on the pages that have them, but
they stop being pill buttons. Render them the same way CPKC renders its rail
meta, per §0.8: a small uppercase `--text-xs` `--color-text-muted` label, then
the link beneath it in the inline link style from §1.3.

```
LINKS
Visit website
Instagram
```

If CPKC's rail card has a border, radius, padding or background, Falcon's and
FOR/M's match it to the pixel.

---

# §3 TYPE AND COLOUR CONSISTENCY

## 3.1 Remove the remaining monospace

Per §0.2. Monospace was supposed to come off the site. It is still rendering on
the two old case studies.

Replace every monospace declaration that renders on `/projects/falcon` or
`/projects/form` with the body font. Small uppercase labels keep their size,
weight and letter-spacing; only the family changes.

If a mono font is still being loaded via `next/font` and nothing uses it after
this, remove the import and report the bundle size difference.

## 3.2 Bring colours onto tokens

Per §0.3. Every non-token colour on those two pages is replaced by the nearest
`var(--color-*)`.

The blue on the rail items and on the scope-table text is the obvious one. There
is no blue in the CPKC page's palette, so there should be none on these.

Where a colour genuinely has no token equivalent, do not invent one and do not
add a new variable. Leave it, and list it in your report with what it is used for
so it can be decided on deliberately.

**Report a before and after table: file, line, old value, new token.**

## 3.3 Section headings on Falcon

Per §0.5. Decide by what they are, not by how they look now:

- Anything that is a real `<h2>` section heading becomes sentence case in the
  display font, matching CPKC.
- Anything that is a small eyebrow label above a block stays uppercase and
  tracked, matching the eyebrows CPKC already uses.

The lowercase `features` is wrong either way. If it is a heading it becomes
`Features`; if it is an eyebrow it becomes `FEATURES`.

**Report which bucket each of the nine landed in.**

---

# §4 REPORT ONLY

1. Do `/falcon` and `/projects/falcon` both still exist? What is in each, and
   which one is linked from the home page and the Experience page?
2. After §2, how much of the three rails is duplicated code? One line on what a
   consolidation would involve. Do not do it.

---

# VERIFY — numbers, not checkmarks

At 1440 × 820 and 390px, on `/projects/falcon`, `/projects/form` and
`/projects/cpkc`:

1. All eight §0 answers
2. The role string now reads `Independent Researcher and Builder` everywhere, with
   the list of locations changed
3. FOR/M: `We developed the curatorial framework` renders; `I developed` is gone;
   the rest of the paragraph is unchanged
4. Falcon: no `Get in touch` button anywhere in the repo for that page; the new
   sentence renders; the mailto link works
5. CPKC: the Mitacs line is linked, the string is unchanged, the link opens the
   Mitacs project page
6. The §0.7 report on the stray `message me`, with the computed values. Not fixed.
7. Rail: a screenshot-level description of the active item on each of the three
   pages, and confirmation the rendered font family, size, letter-spacing,
   transform, colour and active underline are identical across all three
8. Rail: no box, bracket, bar or background tint in any state on any page
9. The monospace table from §3.1, and whether a mono font is still loaded
10. The colour before and after table from §3.2
11. The nine Falcon headings, bucketed
12. Clicking a rail item scrolls only, with no tint or box (confirms sprint 17 §6
    landed)
13. §4 report
14. At 390px, no horizontal scroll on any of the three pages
15. Count of `—` across touched files
16. `npm run build` output
