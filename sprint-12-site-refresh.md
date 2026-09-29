# SPRINT 12 — About page, Experience page, home card, live fixes

Branch: create `site-refresh` off `cpkc-rewrite`. Run `npm run build` at the end.
Do not commit. No new dependencies.

Files this sprint may touch:
`app/about/page.tsx`, `app/experience/page.tsx`, `app/page.tsx`,
`components/AboutGallery.tsx` (new), `components/SiteHeader.tsx` and the footer
component (LinkedIn URLs only), plus the deletions in §5.

Do not touch: `app/projects/cpkc/page.tsx`, `components/cpkc/*`,
`app/projects/falcon/page.tsx`, `app/projects/form/page.tsx`, `app/globals.css`.

Every colour, radius, size and font from an existing variable in `globals.css`.
No em dashes anywhere; grep for `—` at the end and report the count.

---

# §1 ABOUT PAGE

Full rebuild of `app/about/page.tsx`. Keep `SiteHeader`, `FileContainer` and the
folder tab row exactly as they are.

## 1.1 Layout

Inside the file container (1320px max, 32px padding, so 1256px of content):

```
Header line

┌────────────────────────────┐  ┌──────────────────┐
│  intro copy                │  │  FOR/M photo     │
│  (1fr, max-width 560px)    │  │  (480px)         │
└────────────────────────────┘  └──────────────────┘

┌──── card 1 (616px) ────┐  ┌──── card 2 (616px) ────┐
│  Working it out by hand │  │  Observer by nature    │
└─────────────────────────┘  └────────────────────────┘
```

- Intro row: `display: grid`, `grid-template-columns: 1fr 480px`, gap 48px,
  `align-items: start`
- Card row: `grid-template-columns: repeat(2, 1fr)`, gap 24px, 64px top margin
- Below 1024px: both rows collapse to one column, photo above the intro, cards
  stacked

## 1.2 Header line

`--text-xl`, `var(--font-display)`, weight 400, max-width 20ch, 48px bottom margin:

> I like knowing how things actually work.

## 1.3 Intro copy

Four paragraphs, `--text-base`, `var(--font-body)`, line-height 1.65,
`--color-text-secondary`, 16px between them. Para 4 uses
`--color-text-primary` and gets 28px top margin.

> I've always wanted to know how things actually work. A railway, a hiring
> process, the thing your bank does between tapping a card and the money moving.
> Where it starts, where it ends, and who it passes through on the way.

> Design is how I go about it. Most of what I do starts as a question and ends as
> something built, with a lot of paper in between.

> Away from that: cooking, biking, and painting, usually in Toronto.

> Curious about how people, systems, and ideas fit together. Always happy to
> chat, so feel free to drop a message.

Then the same CTA button component used on `app/projects/form/page.tsx`
("Visit website"), labelled **Get in touch**, linking to
`mailto:ahluwaliagovindsingh@gmail.com`. Left-aligned, 24px top margin.

## 1.4 FOR/M photo

A photo of Govind speaking at the FOR/M exhibition.

**Search `public/` for it first** and report what you find. Likely candidates are
under `public/projects/form/` or `public/about/`. If it is not in the repo,
render a placeholder div at the same dimensions with a background of
`var(--color-accent-subtle)` and the text "FOR/M photo", and report that it is
missing so it can be added.

When present: `width: 480px`, `aspect-ratio: 4 / 3`, `object-fit: cover`,
`border-radius: var(--radius-card)`.

## 1.5 Card shell

Both cards share one local component:

```
padding: 40px
border: 1px solid var(--color-border)
border-radius: var(--radius-card)
background: transparent
```

Card title: `--text-md`, `var(--font-display)`, weight 400,
`--color-text-primary`, 12px bottom margin.
Card body: `--text-base`, `var(--font-body)`, `--color-text-secondary`,
line-height 1.65.

## 1.6 Card 1 — Working it out by hand

Body:

> I've been drawing since I was a kid, across whatever medium was around. It
> never became the job, but it became how I think.
>
> Now the same habit goes into tracing a causal chain or mapping how a service
> actually works. What comes out might be a screen, a roadmap, or just a clearer
> way of seeing what was already there.

Below it, two images stacked vertically, 12px apart, 28px below the body:

1. `public/about/Penpaperphoto.png` — full card width, `aspect-ratio: 3 / 2`,
   `object-fit: cover`, `border-radius: var(--radius-sm)`
2. A second, tighter crop. **This file does not exist yet.** Render a placeholder
   at the same width with `aspect-ratio: 16 / 9` and report it as needed.

## 1.7 Card 2 — Observer by nature

Body, one line:

> I draw and paint. Some of it has been commissioned for homes and offices.

Below it, a 3 × 2 grid, 12px gap, 28px top margin. Each tile is square,
`object-fit: cover`, `border-radius: var(--radius-sm)`, `cursor: pointer`.

Artwork lives in `public/about/paintings/`. Each piece has two files: a
`-thumb.webp` (400px, for the grid) and a full `.webp` (1400px, for the modal).

```tsx
const PAINTINGS = [
  { slug: 'install-01-hospitality', alt: 'Painted mural in a café interior' },
  { slug: 'install-03-residential', alt: 'Canvases installed on a wall' },
  { slug: 'cityscape',              alt: 'Pen drawing of a city skyline' },
  { slug: 'install-02-lounge',      alt: 'Three abstract canvases in a lounge' },
  { slug: 'goldfish',               alt: 'Watercolour and ink goldfish' },
  { slug: 'portrait-fragments',     alt: 'Portrait in fragmented hatching' },
  { slug: 'portrait-teal',          alt: 'Portrait in a teal circle' },
  { slug: 'hand-study',             alt: 'Pen study of a hand' },
  { slug: 'building',               alt: 'Architectural pen drawing' },
  { slug: 'eagle',                  alt: 'Pen drawing of an eagle' },
  { slug: 'elephant',               alt: 'Painted ornamental elephant' },
  { slug: 'sketchbook-page',        alt: 'Mixed media sketchbook page' },
  { slug: 'stipple-triangle',       alt: 'Stippled ink portrait' },
  { slug: 'stipple-portrait',       alt: 'Stippled portrait of an older man' },
] as const
```

The first five render as tiles. The sixth tile is a **counter**, not an image:
`var(--color-accent-subtle)` background, centred `+9` at `--text-md` in
`--color-text-primary`. Clicking any of the six opens the modal.

Do not hardcode `9`. Compute it: `PAINTINGS.length - 5`.

## 1.8 Modal

New component `components/AboutGallery.tsx`.

- Fixed full-screen overlay, `rgba(0,0,0,0.88)`, `z-index: 100`
- One image centred, `max-width: 90vw`, `max-height: 85vh`, `object-fit: contain`,
  loading the full `.webp` (not the thumb)
- Left and right arrow buttons, and `ArrowLeft` / `ArrowRight` keys, cycling
  through all 14
- Close on the `×` button, on `Escape`, and on a backdrop click. Clicks on the
  image itself must not close it
- A counter in the corner: `3 / 14`, `--text-xs`, `--color-text-muted`
- `document.body.style.overflow = 'hidden'` while open; restore on close
- Focus the close button on open; restore focus to the clicked tile on close
- `useReducedMotion`: skip the fade transition, show and hide instantly

Preload only the image currently shown plus its two neighbours. Do not load all
14 on mount.

---

# §2 EXPERIENCE PAGE

Restructure the rows in `app/experience/page.tsx`. Keep the page title, the
"View Resume PDF" button and the filter pills at the top. Only the rows change.

## 2.1 Row format

```
Researcher, Innovation Program                   Figma · Miro · Claude   ›
CPKC · July 2025 – Present
```

- Line 1 left: the **role**, `--text-base`, weight 500, `--color-text-primary`
- Line 1 right: tools, `--text-sm`, `--color-text-muted`, separated by ` · `
- Line 2: `Organisation · Dates`, `--text-sm`, `--color-text-secondary`, 2px below
- Chevron `›` at the far right, `--color-text-muted`

Row: 20px vertical padding, `border-bottom: 1px solid var(--color-border)`, no
border on the last. No card, no box, no background fill. The list sits flat on
the page.

**Delete the coloured category pills from inside the rows.** The filter pills at
the top stay and keep filtering by the same categories; the category just no
longer renders inside each row.

**The chevron renders only when the row links somewhere.** CPKC, FOR/M and Falcon
have case studies. The others do not, so they get no chevron and no hover state.
A chevron that goes nowhere is the one thing that breaks this pattern.

Below 768px: tools move under the org line, chevron stays right.

## 2.2 Row content — use verbatim

All titles, organisations and dates below are taken from the master resume and
are correct. Do not alter them.

| Role | Org · Dates | Tools | Links to |
|---|---|---|---|
| Researcher, Innovation Program | CPKC · July 2025 – Present | Figma · Miro · Claude | `/projects/cpkc` |
| Exhibition Director | OCAD University · January 2026 – May 2026 | Figma · HTML/CSS · Notion | `/projects/form` |
| Independent Researcher and Builder | Falcon · May 2026 | React · TypeScript · Claude API | `/projects/falcon` |
| Service Design Lead | Cadillac Fairview × OCAD · September 2024 – January 2025 | Figma · Miro | none |
| Design Research Intern | DesignWith Lab · July 2024 – November 2024 | Figma · Miro | none |
| Co-Design Student | OCAD CO · January 2024 – April 2024 | Miro · Figma | none |

Filter categories: CPKC Strategy, FOR/M Design, Falcon Research, Cadillac
Fairview Strategy, DesignWith Lab Research, OCAD CO Research. Update the
"All (6)" count if it currently says something else.

The tool assignments above are my suggestions, not from the resume. Keep them
unless they look wrong.

## 2.3 Retired claims — remove

The current page carries claims that are contradicted by the evidence record.
Grep `app/experience/page.tsx` and report every match, then remove:

- `adopted at the CIO level` / `CIO`
- `the company's first AI-native chatbot` / `AI-native`
- `3 enterprise frameworks built`
- `co-owned` / `co-ownership`
- any date reading `2024–2025` or `2024-2025` against CPKC

If an expanded summary exists per row, replace CPKC's with:

> Built the UX and interface for a market intelligence tool now in production,
> and grew a cross-departmental community of practice to 105+ members.

## 2.4 Report, do not fix

The current page may include a **Samdisha Bagga** row and a **DesignX Community**
row. Neither appears in the master resume. Report whether they are present and
leave them in place for now.

---

# §3 HOME PAGE CARD

In `app/page.tsx`, replace the ASCII terminal card (dark background, monospace,
`>` prompts, "Thinks in systems. Builds from zero.") with:

```
Hi, I am Govind.
Design researcher. Currently at CPKC.

[email icon]  [linkedin icon]
```

- Card background: the page background, not dark. Remove the terminal chrome,
  the traffic-light dots and the ASCII portrait entirely
- Line 1: `--text-lg`, `var(--font-display)`, weight 400, `--color-text-primary`
- Line 2: `--text-base`, `var(--font-body)`, `--color-text-secondary`, 8px below
- Icons: keep the existing circular icon buttons, 20px below
- No monospace anywhere in this card

**Leave a commented slot at the bottom of the card** for a train animation to be
added in a later sprint. Render nothing there now.

---

# §4 LINKEDIN URLS — live error

Three different LinkedIn URLs are in use across the site and at least two are
dead. The correct one, per the master resume, is:

```
https://linkedin.com/in/govind-ahluwalia
```

Grep the whole repo for `linkedin.com/in/` and replace every occurrence.
Report each file and the old value it had. Known bad values:
`/in/govind-singh-ahluwalia` and `/in/govindsinghahluwalia`.

---

# §5 DELETIONS

## 5.1 Stale route

Delete `app/cpkc/page.tsx` and its directory. It is a dead prototype carrying
retired claims and it is reachable at `/cpkc` in production. The live case study
is `/projects/cpkc`.

Check nothing links to `/cpkc` before deleting; report if anything does.

## 5.2 Heavy orphaned images

Delete, and report each file's size first:

- `public/about/Painting_1.png`
- `public/about/Painting_2.jpg`
- `public/about/Painting_3.jpg`
- `public/projects/cpkc/cpkc-cover.svg`

The three paintings are replaced by `public/about/paintings/`. Confirm nothing
references them after §1 is done.

## 5.3 Filename casing collision

`public/projects/cpkc/` tracks both `Phase1.svg`–`Phase4.svg` and
`phase-1.svg`–`phase-4.svg`. Windows treats these as the same file; Vercel's
Linux build does not, which can break the image in production.

- `components/CuriousCanvas.tsx` references the lowercase form and is live on the
  home page
- `components/CPKCTimeline.tsx` references the PascalCase form and is unreferenced

Delete `components/CPKCTimeline.tsx` and the four `Phase*.svg` files. Keep the
lowercase set. Report the git status of all eight files before and after.

---

# §6 REPORT ONLY, DO NOT FIX

1. Routes `/falcon` and `/projects/falcon` both exist. Report what is in each and
   whether `/falcon` is another stale duplicate.
2. `app/api/sketch-count` — report what uses it.
3. Confirm no `--font-helvetica-neue`, `--font-fragment-mono` or
   `--font-space-mono` remains in use anywhere outside `globals.css`.

---

# VERIFY — measured values, not checkmarks

At 1440 × 820 and at 390px:

1. About: rendered width of each card, and of the intro and photo columns
2. About: whether the FOR/M photo and the second pen-and-paper image resolved to
   real files or placeholders
3. About: the computed `+N` on the sixth tile (must be 9)
4. Modal: opens, arrows cycle, Escape closes, background does not scroll
5. Experience: which rows render a chevron
6. Every `linkedin.com/in/` URL now in the repo
7. Sizes of the four deleted assets
8. Count of `—` across all touched files
9. At 390px, no horizontal scroll on `/about`, `/experience` or `/`
10. `npm run build` output
