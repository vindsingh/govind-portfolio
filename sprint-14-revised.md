# SPRINT 14 (REVISED) — Home, About, Experience

**This replaces `sprint-14-final.md`. Use this file instead.**

Branch `site-refresh`. Run `npm run build`. Do not commit. No new dependencies.

Files: `app/page.tsx`, `app/about/page.tsx`, `app/experience/page.tsx`,
`components/AboutGallery.tsx`, plus whichever component renders the Experience
block currently at the bottom of the home page.

All values from existing variables in `globals.css`. No em dashes; grep and
report the count.

---

# §0 REPORT FIRST

1. **List every file under `public/about/` and `public/home/`** with size and
   dimensions. A FOR/M photo has been added; report its exact filename.
2. **Which component renders the Experience block at the bottom of the home
   page?** It currently shows filter pills (`All (7)`) and an
   ORGANISATION / SUMMARY / TAG table. Name the file.
3. Confirm `public/home/cpkc-card.webm`, `.mp4` and `.jpg` all exist.

---

# §1 HOME PAGE

## 1.1 Name block moves out of the grid, centred

Delete the intro card. Its content becomes a centred block above the grid, with
no card, no border, no background.

```
                    Hi, I am Govind.
           Design research under Mitacs BSI at CPKC.

                      [✉]    [in]
```

- `text-align: center`, `max-width: 640px`, `margin: 0 auto`
- 72px above, 64px below
- Type, links and 44 × 44 icons keep their current styling, now centred

## 1.2 Caricature slot

Directly above "Hi, I am Govind.", inside the centred block, add a slot for a
hand-drawn character:

```tsx
{/* Caricature: /home/govind.webp — transparent, 720px tall source,
    renders at 240px. Not yet drawn. */}
```

Render nothing now. If `public/home/govind.webp` or `.png` already exists, use
it: `height: 240px`, `width: auto`, centred, 24px above the name.

## 1.3 Grid becomes four cards

The Experience block at the bottom of the page becomes the **fourth card** in the
grid. Two columns, two rows, equal width.

```
┌─────────────────┐  ┌─────────────────┐
│  CPKC           │  │  Falcon         │
└─────────────────┘  └─────────────────┘
┌─────────────────┐  ┌─────────────────┐
│  FOR/M          │  │  Experience     │
└─────────────────┘  └─────────────────┘
```

CPKC first because it carries the train video. Below 768px all four stack.

## 1.4 The Experience card

Delete the current full-width Experience block entirely, including its filter
pills, its `All (7)` count, and its ORGANISATION / SUMMARY / TAG table.

Replace with a card matching the other three in border, radius, padding and
hover. Contents:

```
EXPERIENCE                          ← eyebrow, --text-xs, uppercase,
                                      letter-spacing 0.08em, --color-text-muted

Researcher, Innovation Program
CPKC

Exhibition Director
OCAD University

Independent Researcher and Builder
Falcon

Service Design Lead
Cadillac Fairview × OCAD

View all experience →
```

- Role line: `--text-sm`, `--color-text-primary`
- Org line: `--text-sm`, `--color-text-secondary`, 2px below
- 16px between entries, no dividers
- `View all experience →` at the bottom, `--text-sm`, links to `/experience`
- The whole card links to `/experience`

Four entries only. Do not list all eight.

## 1.5 Work tab — full-width stacked

When the **Work** tab is selected, show only the three project cards (CPKC,
FOR/M, Falcon), each **full width, stacked vertically**, 24px apart. No
Experience card in that view, no two-column grid.

The **All** tab keeps the 2 × 2 from §1.3.

If the tab row does not currently filter the grid, report that and skip this
section rather than building tab logic from scratch.

## 1.6 CPKC card video

Per §0.3. If the three files exist, wire them into the bottom of the CPKC card
using the same `<video>` pattern as `components/cpkc/SectionVisual.tsx`: plays
once on entering view, holds the last frame, no loop, JPG only under reduced
motion. Full card width, `object-fit: cover`, anchored to the card's bottom edge.

---

# §2 ABOUT PAGE

## 2.1 Intro copy — replace, reordered and tightened

Four paragraphs. The fourth carries two inline links and replaces the button.

> I've always wanted to know how things actually work. A railway, a hiring
> process, the thing your bank does between tapping a card and the money moving.

> Design is how I go about it. Most of what I do starts as a question and ends as
> something built, with a lot of paper in between.

> Away from that: cooking, biking, and painting, usually in Toronto.

> Curious about how people, systems, and ideas fit together. **Message me** or
> find me on **LinkedIn**.

- `Message me` → `mailto:ahluwaliagovindsingh@gmail.com`
- `LinkedIn` → `https://linkedin.com/in/govind-ahluwalia`, `target="_blank"`,
  `rel="noopener noreferrer"`

Style both exactly like the Mitacs BSI and CPKC links on the home page.

The sentence *"Where it starts, where it ends, and who it passes through on the
way."* is cut.

## 2.2 Delete the Get in touch button

Remove it and its import if now unused. Nothing replaces it.

## 2.3 Spacing and the photo

- Header to intro row: **40px**
- Between all four paragraphs: **16px**, uniform
- Photo column: **420px**, `aspect-ratio: 4 / 3`, `object-fit: cover`,
  `border-radius: var(--radius-card)`

Use the FOR/M photo found in §0.1. The photo is portrait orientation, so set
`object-position: center 30%` so the crop keeps the face rather than the ceiling.
Report how it lands and adjust if the framing is wrong.

Header stays left-aligned.

## 2.4 Equal card heights

Both cards must render the same height at 1440px. Shorten card 1; do not pad
card 2.

Card 1's two images go **side by side**:

```
display: grid;
grid-template-columns: 1fr 1fr;
gap: 12px;
margin-top: 28px;
```

Each: `width: 100%`, `aspect-ratio: 1 / 1`, `object-fit: cover`,
`border-radius: var(--radius-sm)`. Not clickable, no hover.

Below 768px: stack them.

**Report both card heights.** If they differ by more than 24px, change card 1's
images to `aspect-ratio: 4 / 3` and report again.

## 2.5 Fix the +9 tile

```
position: absolute; inset: 0;
background: rgba(255,255,255,0.82);
backdrop-filter: blur(16px) saturate(140%);
-webkit-backdrop-filter: blur(16px) saturate(140%);
display: flex;
align-items: center;
justify-content: center;
line-height: 1;
```

Opacity up from 0.55, blur up from 8px, flex centring with `line-height: 1` so
the glyph sits on the true centre. Number stays computed as
`PAINTINGS.length - 5`.

---

# §3 EXPERIENCE PAGE — two sections

Model: Apple Notes. Flat on the page, hairline dividers between items, nothing
around them. No pills, no cards, no colour, no shadows.

**Two sections only: Experience and Tools. No Education section.**

## 3.1 Remove

- The filter pills and all filter state
- The `All (8)` count
- Any category tags

Keep the page title and the "View resume PDF" link at top right.

## 3.2 Section headers

```
--text-md, var(--font-display), weight 400, --color-text-primary
margin-top: 72px (0 on the first), margin-bottom: 20px
```

No divider under a header. No uppercase.

## 3.3 Experience — unchanged

The eight rows stay exactly as built: role on line 1, `Org · Dates` on line 2,
org linked where a URL exists, chevron on CPKC, FOR/M and Falcon only. Change
nothing here.

## 3.4 Tools

Four labelled rows, label in a fixed left column.

```
grid-template-columns: 120px 1fr;
row-gap: 16px;
```

Label: `--text-sm`, `--color-text-muted`.
Items: `--text-base`, `--color-text-secondary`, joined with ` · `.

| Label | Items |
|---|---|
| Design | Figma · Miro · Lottie |
| Build | React · Next.js · TypeScript · Tailwind · HTML/CSS |
| AI | Claude Code · Cursor · Kiro |
| Exploring | *(render the label, leave the value empty)* |

Add a comment on the Exploring row marking it to be filled in. Do not invent its
contents. No dividers in this section.

Below 768px: `grid-template-columns: 1fr`, labels above their items.

---

# VERIFY — numbers, not checkmarks

At 1440 × 820 and 390px:

1. The three §0 answers, including the FOR/M photo's exact filename
2. Home: rendered width of the centred block, and confirmation the grid is 2 × 2
3. Home: whether the CPKC video is wired, and whether a caricature file was found
4. Home: whether the Work tab filters the grid, and if so that it stacks full width
5. About: rendered height of card 1 and card 2, and the difference
6. About: whether the FOR/M photo renders, and how the crop lands
7. About: computed `+N` on tile 6, and whether the image under it is legible
8. Experience: no filter UI remains, two sections render, no Education
9. At 390px, no horizontal scroll on `/`, `/about`, `/experience`
10. Count of `—` across touched files
11. `npm run build` output
