# SPRINT 10 — Fit, copy, loop

Branch `cpkc-rewrite`. `app/projects/cpkc/page.tsx` and `components/cpkc/` only.
Run `npm run build`, do not commit.

**All measurements at 1440 × 820 and 1440 × 760.** Report both. The page has
passed at 900 twice and failed on a real screen both times.

---

## 1. Rail — a hard guarantee, not another adjustment

The rail must be structurally incapable of reaching the train.

```tsx
maxHeight: `calc(100vh - ${HEADER_H}px - 200px - 24px)`
```

If the rail's natural content height exceeds that, **hide the metadata block
entirely** rather than clipping or overflowing. Measure natural height against
available height with a ref and a resize listener, and set a boolean. Anchors
always render; metadata is the part that drops.

Also shrink it so it fits at 820 without hiding anything:

- rail width 220px → 250px
- delete the `<hr>` divider, replace with 24px of space
- anchor rows: `line-height: 1.4`, row gap 2px
- metadata block gap 20px → 12px, label-to-value gap → 2px
- rail padding 20px → 16px

**Report:** rail natural height, available height, and rail bottom vs train top
at both 820 and 760.

## 2. Hero must fit above the band

Everything in the hero, including the confidentiality note and the button, sits
**above the train** at scroll 0. No void, nothing behind the locomotive.

- Headline: 52px → **40px**. Keep two lines; widen `max-width` if needed
- Remove the hero's `padding-bottom: 224px` entirely
- Hero paragraph gaps: 16px. Before "Four kinds of work": 24px
- Confidentiality note to a **single sentence**, replacing the current three:

> Most of this work is confidential, but I am happy to talk through any of it.

- 24px above it, 16px above the button

**Report:** hero content bottom vs train top at 820 and 760. If it still does not
fit at 760, report the shortfall and stop rather than adjusting further.

## 3. Button

Keep the FOR/M component. Centre the label inside the button, and centre the
button itself within the text column.

## 4. Section 1 video is not looping

`section1` is set to `loop: true` but does not loop. Check that the `loop`
attribute actually reaches the `<video>` element, and that the leave handler is
not pausing a looping video. A looping video should run continuously the whole
time its section is in view.

**Report:** the rendered `loop` attribute value for all four videos.

## 5. Pointer text size

Body text in the three pointer columns: `--text-sm` → `--text-base`. Subheads
stay `--text-sm` weight 500. Line-height 1.6.

## 6. Statement lines — two lines, problem then answer

Each section's statement becomes two lines. First line `--color-text-primary`,
second line `--color-text-secondary`, same size, 4px apart.

| section | line 1 | line 2 |
|---|---|---|
| people-use | Sales teams were losing hours in spreadsheets to find leads. | So we built something they could just ask. |
| persists | There was no design function, and no word for the work. | So we built the group before the framework. |
| shows-shape | Nobody had drawn how the work actually flowed. | So we drew it, forwards and backwards. |
| underneath | A body of research sits in a repository whose own rules no longer agree. | Fixing that base is what the next practice gets built on. |

## 7. Pointer copy — simpler, verbatim, no em dashes

**Something people use**

| Six use cases | Two directions | Shipped rough |
|---|---|---|
| We talked to people across every line of business. Six ideas for AI came out of it, ranked in order. This was the one that got built. | One version looked like the spreadsheet people already used. The other let them ask a question. The familiar one would have kept the same problem in place. | Internal tools here had no look of their own, so we made one. We showed it to people while it was still rough. It is in use now, and they run it themselves. |

**Something that persists**

| People already doing it | A group, not a document | 105 members |
|---|---|---|
| People in other teams were already talking to users and testing things before spending money. They just had no name for it, and no way to find each other. | We could have written a framework. Most go unread. So we found those people and gave them a room to work in. | A group that grew to 105+ people across Information Services by early 2026. That is how many joined, not how many changed the way they work. |

**Something that shows shape**

| No map existed | Mapping what happens | Mapping backwards |
|---|---|---|
| Freight passes through more hands than any one person can see. Nobody had written down how the work actually moves. | We mapped it for an external trucking partner, and later for a customer portal, both starting from a blank page. | With an engineering team we started from a future where things already worked, then traced back. Asking what hurts gets you complaints. Starting from the end gets you a plan. |

**Something underneath**

| What's already there | Rebuilt on it | What the next practice looks like |
|---|---|---|
| A lot of customer research already sits in one place, and a new portal is being specified on top of it. I am not leading that. I interviewed the internal teams it affects. | One early prototype looked finished, but the customers and locations in it were made up. It demoed well. I rebuilt it from the real research. | The repository's own rules had stopped agreeing with each other. I wrote up a fix that can be argued with. It is in review. |

Grep both files for `—`. Must be zero.

---

## 8. Report only, do not fix

The parked boxcar sits over the bottom-right of every section, and the last line
of the third pointer column runs underneath it. Report the boxcar's rendered
bounds and the third column's bottom edge in each section at 1440 × 820.

---

## Verify

1. Rail natural height, available height, rail bottom vs train top, at 820 and 760
2. Hero content bottom vs train top, at 820 and 760
3. Headline line count at 40px
4. `loop` attribute on all four videos
5. Third pointer column bottom vs boxcar top (§8)
6. Count of `—`
7. `npm run build` output
