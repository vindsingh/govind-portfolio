# BUILD TASK — Rewrite the CPKC case study page

## Scope and safety

**Target file:** `app/projects/cpkc/page.tsx` (657 lines, last modified 2026-07-21).
This is the route linked from `components/ProjectGrid.tsx` and `app/experience/page.tsx`.

**Do NOT touch:**
- `app/globals.css`
- `components/FileContainer.tsx`, `components/SiteHeader.tsx`
- `components/IndexBox.tsx` (hardcoded for FOR/M — leave it alone)
- `app/projects/falcon/page.tsx`, `app/projects/form/page.tsx`
- `app/cpkc/page.tsx` (stale route — leave it)
- `package.json` — add no dependencies

**Before starting:** create and switch to a branch `cpkc-rewrite`. Do not work on
`main`. Do not commit.

**Pattern reference:** `app/projects/form/page.tsx` — inline style objects plus
scoped `<style dangerouslySetInnerHTML>` blocks, `DesktopSurface` +
`FileContainer` + `SiteHeader`, `isMobile` state via `window.innerWidth < 768`.
Do not introduce a new styling approach.

**Two phases. Stop after Phase 1 and report before starting Phase 2.**

---

# PHASE 1 — Structure and content

## 1.1 Side rail

Rewrite the inline `CPKCIndexBox` (currently lines 17–198) in place. Keep its
mechanics: 220px wide, `position: sticky`, `top: 32px`, collapse past 220px
scroll, the `.section-highlight` anchor flash, the `@media (max-width: 767px)`
static override.

Anchors, 4 not 3:

```ts
const ANCHORS = [
  { label: 'Something people use',        id: 'people-use' },
  { label: 'Something that persists',     id: 'persists' },
  { label: 'Something that shows shape',  id: 'shows-shape' },
  { label: 'Something underneath',        id: 'underneath' },
] as const;
```

Metadata block — replace entirely:

```
ROLE       Researcher, Innovation Program
TIMELINE   July 2025 – Present
TEAM       Innovation team · change management · business transformation
TYPE       Mitacs BSI · Enterprise design & AI
```

Delete `PERIOD`, `STATUS` and `ORG`. The string "Innovation Catalyst" must not
appear anywhere on the page.

Stats block — add below the metadata, above the Visit-website button. Three
stacked, hairline divider between each:

```
105+         COMMUNITY OF PRACTICE
0 → 1        AI PRODUCT SHIPPED
Foundation   DESIGN SYSTEM, INTERNAL TOOLS
```

Value in Helvetica Neue ~20px weight 500; label below at `--text-xs`, uppercase,
`--color-text-muted`, letter-spacing 0.08em. Collapses with the metadata.

**Typography:** switch every `--font-fragment-mono` and `--font-space-mono` on
this page to `--font-helvetica-neue`. Keep uppercase and letter-spacing, drop
the monospace face. No monospace anywhere in the new CPKC page.

## 1.2 Hero — two-row grid, mandatory

```
grid-template-rows: 1fr 200px;
```

Row 1 is content. Row 2 is an empty band reserved for the train, `overflow:
hidden`. Nothing in row 1 may extend into row 2. Mobile: band drops to 120px.

Row 1 contains exactly three things.

Headline — `--text-2xl`, Helvetica Neue weight 500, `letter-spacing: -0.02em`,
max-width 16ch:

> Building a human-centred practice inside a freight railway.

Paragraph — `--text-md`, max-width 560px, `--color-text-secondary`:

> I joined CPKC in July 2025, on the first of three Mitacs terms. The brief was to
> democratize design — inside a twenty-thousand-person freight railway with no
> designer in it.

Closing line — `--text-base`, `--color-text-primary`, 32px top margin:

> Four kinds of work came out of it. A tool, a practice, a method, and the ground
> they all stand on.

## 1.3 Context block

Below the hero, before section 01. Two paragraphs at `--text-base`, max-width
620px:

> Working alongside change management and business transformation — the teams
> already responsible for how work gets done, just without anyone asking what any
> of it felt like to use.
>
> Fourteen months in there's a community of practice with 105+ members, a market
> intelligence tool in production, and a way of working that got considerably
> faster once AI became part of how we built rather than only what we built. It's
> still running.

Then a bordered note card — `--radius-card`, `1px solid var(--color-border)`,
24px padding, `--color-accent-subtle` background:

> Most of this work lives inside CPKC systems and I can't show it. What's here is
> how it was structured and what changed. Happy to talk through any of it in more
> detail — get in touch.

Mailto to `ahluwaliagovindsingh@gmail.com`, styled like existing CTA links.

## 1.4 Section component

One reusable local component, `CaseSection`, used four times:

```
[number] [title]                                    [status pill, right-aligned]
[statement line — one sentence, large]

[prose paragraphs]

[Where it stands — label + one line]
[illustration slot — Phase 2, renders nothing yet]
```

- Number: `01`–`04`, `--text-sm`, `--color-text-muted`
- Title: `--text-xl`, weight 500
- Status pill: uppercase `--text-xs`, 4px/10px padding, `--radius-sm`,
  `1px solid var(--color-border)`, `--color-text-secondary`
- **Statement line:** `--text-md`, weight 400, `--color-text-primary`,
  max-width 28ch, 20px top margin, `line-height: 1.35`. This is a pull quote,
  not a header — one per section, never more.
- Prose: `--text-base`, line-height 1.6, max-width 620px,
  `--color-text-secondary`, 32px top margin
- Where it stands: label uppercase `--text-xs` `--color-text-muted`, value
  `--text-sm` `--color-text-primary`, same line, 40px top margin

`id` matches the rail anchors. 96px vertical padding (56px mobile), hairline
`border-top` between sections.

## 1.5 Section content

Prose runs as continuous paragraphs. Do not bold lead-ins inside the prose, do
not add sub-headers, do not convert any of this to bullets.

---

### 01 · Something people use · SHIPPED · id `people-use`

**Statement:** Sales teams were losing hours in spreadsheets to find leads.

**Prose:**

> Discovery across the lines of business surfaced six AI opportunities and ranked
> them. I was part of that work rather than running it. This was the one that got
> built.
>
> Two directions went to subject-matter experts. One kept the spreadsheet shape
> people already knew. The other was conversational. Familiar is safer, and it's
> what you pick if you want the demo to go well — but it would have rebuilt the
> constraint the tool existed to remove.
>
> Internal products at CPKC had no visual identity. Everything sat on a
> provider's default presets, which is how internal tools end up feeling like
> someone's side project. We piloted one here — interaction and prompt screens,
> and the system underneath them, built by hand from a standing start.
>
> The longest stretch wasn't the interface. It was working out when the tool
> should open and when it shouldn't. Surface it at the wrong moment and people
> close it; close it twice and they stop opening it at all.
>
> We showed it rough, early, before it was easy to understand — uncomfortable,
> because people outside design read rough as broken. It shipped. After launch we
> sat with users on a timed task and watched them run it themselves. People said
> they found leads faster. Nobody measured it, so that's the whole claim.

**Where it stands:** In production, in use.

---

### 02 · Something that persists · ONGOING · id `persists`

**Statement:** There was no design function, and no vocabulary for the work.

**Prose:**

> The second part turned out to matter more. People across the departments were
> already doing pieces of it — talking to whoever would use a thing before
> building it, writing down what the problem actually was before proposing a fix,
> trying something small before committing budget. What they didn't have was a
> name for any of it, or a way to find each other.
>
> The obvious move is to write it down. A framework, a deck, a set of principles.
> Enough of those go unopened that the format seems like the failure. What worked
> was finding the people already inclined this way, naming what they were doing,
> and giving them somewhere to do it in public. That became a community of
> practice on leadership-nominated cohorts — 105+ members of Information Services
> by Q1 2026, and somewhere to try things that weren't yet anyone's job.
>
> 105 is a membership count, not a measure of how many people changed how they
> work. It's the number we have.
>
> Around it: a leadership pitch for a design-centric innovation program, an
> AI-ethics card toolkit for workshops and decision sessions, and the
> service-design content in the shared training material. The same argument,
> compressed into half a day, ran with an internal quality-engineering team — AI
> put in their hands as a tool inside their own ideation rather than as a topic,
> then a future-scenario journey map they worked backward from. Forward from
> current pain gets you complaints. Backward from a target state gets you a
> position.

**Where it stands:** Still meeting.

---

### 03 · Something that shows shape · METHOD · id `shows-shape`

**Statement:** Almost everything in this practice starts with a journey.

**Prose:**

> Not as a deliverable — as the thing you do before you're allowed an opinion.
> Freight moves through more hands than anyone in any one of those hands can see,
> so the first question is always the same: what actually happens, in order, to
> whom.
>
> It started with journey mapping for an engagement with an external trucking and
> logistics partner, following how work really moved through a business that had
> never written it down. The same method later at a different scale: current-state
> process mapping for a customer portal, from a blank start with no existing map.
>
> Current-state maps get treated as documentation, produced so the real work can
> begin. They're usually the first honest description anyone has had of what the
> business does, and they tend to disagree with what people believe it does.

**Where it stands:** The method the rest of the work runs on.

---

### 04 · Something underneath · IN REVIEW · id `underneath`

**Statement:** The evidence everyone was building on had holes in it.

**Prose:**

> With a practice running and a tool shipped, the current term is about the base
> everything else gets built on. A customer research effort is specifying a portal
> for customers moving freight across the bulk and merchandise lines of business.
> I'm not leading it. The team runs the enterprise shipper sessions; my own
> interviews were with the internal teams whose processes the portal touches, and
> I helped shape how those were structured rather than executing a method handed
> to me.
>
> An early prototype looked finished. The customers in it were invented and the
> location data was fabricated — placeholder content that had quietly stopped
> being placeholder. It demoed well and nobody was asking. I rebuilt it from the
> real research. A prototype that impresses on invented data teaches everyone who
> sees it to trust something that isn't there, and every decision after it
> inherits that.
>
> Then the repository. Three documents were meant to be the source of truth for
> its taxonomy and they disagreed — three different class counts, one class
> documented but not enforced, two enforced but never declared. Each internally
> consistent, which is why nobody notices. The reconciliation is drafted as a
> decision record with an acceptance test, so it can be argued with rather than
> just applied. It's proposed, not merged. It matters because the portal branches
> off this base, and whatever the taxonomy says is what the next several years of
> customer research gets filed against.

**Where it stands:** Proposed for taxonomy-owner review.

---

## 1.6 Closing

Below section 04:

> The tool is in production. The practice is still meeting. The portal work is
> ongoing and the reconciliation is in review.

Plus a back link to `/` matching `app/projects/form/page.tsx`.

## 1.7 Remove

Delete entirely: the `AnimatedCount` component and its uses, `phase-1.svg`
through `phase-4.svg`, `cpkc-cover.svg`, all phase-card markup, the
`Context / The Room / The Work` anchors.

Then search the file and confirm zero matches for: `design thinking framework`,
`CIO`, `AI-native`, `co-own`, `Innovation Catalyst`, `Phase`, `adopted`.

**STOP. Report and wait for confirmation.**

---

# PHASE 2 — The train

## 2.1 Assets

Artwork arrives as WebP files with transparency in
`public/projects/cpkc/train/`, in two forms:

**Full-bounds pieces** — each 2400×700, mostly transparent, drawn in place:
```
ties.webp  rail.webp  loco-body.webp
car-1.webp  car-2.webp  car-3.webp  car-4.webp
coupler-1.webp … container-1.webp …
```
These stack at `position: absolute; inset: 0` inside a 2400×700 relative
container. No offsets — they align by construction.

**Wheel pieces** — each trimmed square, axle at centre:
```
wheel-1.webp … wheel-n.webp
```
Positioned individually with `left`/`top` percentages, supplied as a constant
array at the top of the component.

Build now against grey placeholder `<div>`s of the same dimensions in the same
structure, with a clearly commented swap point so real files drop in by changing
one constant.

Create `components/cpkc/TrainBand.tsx`. Layer order, back to front:
`ties · rail · wheels · car bodies + loco body · couplers · containers`.

## 2.2 Motion

Use `framer-motion` `useScroll` / `useTransform`. Copy the pattern from
`components/ZoneCardStack.tsx` — the only existing scroll-linked animation here
and it works.

- `useScroll({ target: heroRef, offset: ['start start', 'end start'] })`
- **One** `translateX` on a single parent wrapper, moving the whole train left to
  right as the hero scrolls out. One transform on one wrapper — do not animate
  each piece separately.
- One shared `rotate`, 0 → 720deg, applied to every wheel across the same range.
- Each wheel element carries `transform-box: fill-box; transform-origin: center`.
- The train must drift while the wheels turn. Wheels rotating on a stationary
  train reads as broken.
- After the hero leaves the viewport, one railcar remains pinned at the left edge
  of the band, static, for the rest of the page. Separate element, fades in as
  the train exits.
- Scroll-linked, not triggered. Scrolling up reverses it. No keyframe loop, no
  timed animation.

## 2.3 Reduced motion

No `prefers-reduced-motion` handling exists anywhere in this codebase. Add it
here, scoped to this page:

```ts
import { useReducedMotion } from 'framer-motion'
```

When preferred: train renders static in its parked position. No translation, no
wheel rotation. Everything else unchanged.

## 2.4 Mobile

Below 768px: band is 120px, train static and scaled to fit, no movement, no
rotation. `overflow-x: hidden` on the band container. Verify at 390px that the
page does not scroll sideways.

## 2.5 Section illustrations

Add an `illustration?: React.ReactNode` prop to `CaseSection` with a commented
placeholder showing where it renders. Render nothing — the artwork isn't made.

---

# Constraints

- TypeScript strict, no `any`
- No new dependencies
- No changes outside `app/projects/cpkc/page.tsx` and `components/cpkc/TrainBand.tsx`
- Every colour, radius, spacing and type size from an existing variable in
  `globals.css`. No new hardcoded hex. `--color-accent-cpkc` (#D3A122) for the
  rail's active-anchor hover state.
- Run `npm run build` and report errors
- Do not commit

# Report but do not fix

1. `public/projects/cpkc/` tracks both `Phase1.svg` and `phase-1.svg` (and 2, 3,
   4). Same file on Windows, different on Vercel's Linux build. Report which
   casing each page references.
2. `cpkc-cover.svg` is 1.35MB. Report whether anything still references it after
   this rewrite.
