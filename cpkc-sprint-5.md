# SPRINT 5 — Content density, visual scale, outstanding bugs

Branch `cpkc-rewrite`. Same constraints: no new dependencies, changes limited to
`app/projects/cpkc/page.tsx` and `components/cpkc/`, values from `globals.css`,
run `npm run build`, do not commit.

---

## 1. Wheels — check the constant exists before anything else

Sprint 4 asked for `WHEEL_X_OFFSET` in `TrainBand.tsx`. **Report whether it is
actually in the file.** If it is not, add it:

```tsx
// Tune by hand. Negative moves wheels left.
const WHEEL_X_OFFSET = -0.6
```

```tsx
left: `${parseFloat(w.left) + WHEEL_X_OFFSET}%`
```

Then report the rendered pixel x-position of wheel 1 and wheel 15, and the
rendered left and right edges of the bodies image, all relative to the artboard
box. I need the numbers to work out the correct offset.

## 2. Hero — text is behind the train again

At scroll 0 the line "Four kinds of work came out of it…" sits underneath the
locomotive. The hero is not reserving enough height above the band.

Report `heroRenderedHeight`, `heroContentHeight`, and the applied `min-height`
string. Then fix so that at 1440 × 900 nothing in the hero overlaps the 200px
band. Add bottom padding to hero row 1 equal to the band height rather than
relying on `min-height` alone.

## 3. Section layout — bigger visual, one screen per section

Current: prose column wide, visual 300px, large empty space. Invert that balance.

```
prose column:  minmax(0, 1fr)   max-width 560px
gap:           64px
visual column: 440px            (below 1280px: 360px)
```

The visual:
```tsx
width: '100%',
maxWidth: '440px',
position: 'sticky',
top: '50%',
transform: 'translateY(-50%)',
```

Sticky and vertically centred, so it holds beside its prose rather than sitting
at the top with emptiness below it.

Each section gets `min-height: 80vh` so sections read as discrete screens rather
than one continuous scroll. Keep the hairline `border-top` between them.

Below 1024px: single column, visual below the prose, `position: static`,
`maxWidth: 360px`, centred.

## 4. Content — three blocks per section

Every section becomes: heading, statement line, then **three short blocks**, then
"Where it stands". Each block is a small subhead plus two or three sentences.
Target 110 to 130 words of body per section, down from about 250.

**Block subhead styling:** `--text-sm`, weight 500, `--color-text-primary`,
uppercase off, 28px top margin, 6px bottom margin. Not bold inline in the
paragraph — its own line.

Use this copy verbatim. No em dashes anywhere.

---

### Something people use · id `people-use`

**Statement:** Sales teams were losing hours in spreadsheets to find leads.

**Six use cases, ranked**
> Discovery across the lines of business surfaced six AI opportunities. I was
> part of that work rather than running it. This was the one that got built.

**Two directions, one fork**
> One kept the spreadsheet shape people already knew. The other was
> conversational. Familiar is safer, but it would have rebuilt the constraint the
> tool existed to remove.

**Rough, early, in their hands**
> Internal products had no visual identity here, so we piloted one: interaction
> and prompt screens built by hand from a standing start. We put it in front of
> users before it was easy to understand, which is uncomfortable, because people
> outside design read rough as broken.

**Where it stands** — In production. After launch we watched users run it on a
timed task. They said they found leads faster. Nobody measured it, so that's the
whole claim.

---

### Something that persists · id `persists`

**Statement:** There was no design function, and no vocabulary for the work.

**It was already happening**
> People across the departments were doing pieces of it. Talking to whoever
> would use a thing before building it. Writing the problem down before
> proposing a fix. What they lacked was a name for it, or a way to find each
> other.

**Not a document**
> The obvious move is to write the methodology down. Enough frameworks and decks
> go unopened that the format seems like the failure. What worked was finding the
> people already inclined this way and giving them somewhere to do it in public.

**105 who stayed**
> A community of practice on leadership-nominated cohorts, reaching 105+ members
> of Information Services by Q1 2026. That is a membership count, not a measure
> of how many changed how they work. It's the number we have.

**Where it stands** — Still meeting. Alongside it: a leadership pitch for a
design-centric innovation program, an AI-ethics card toolkit, and the
service-design content in the shared training material.

---

### Something that shows shape · id `shows-shape`

**Statement:** Almost everything in this practice starts with a journey.

**Nobody had drawn it**
> Not as a deliverable, but as the thing you do before you're allowed an opinion.
> Freight moves through more hands than anyone in any one of those hands can see.

**What actually happens**
> Journey mapping for an external trucking and logistics partner, following how
> work really moved through a business that had never written it down. Later the
> same method at a different scale: current-state process mapping for a customer
> portal, from a blank start.

**Backward, not forward**
> The other direction, run with an internal quality-engineering team: put the
> room in a future where the function already works differently, then map back.
> Forward from current pain gets you complaints. Backward from a target state
> gets you a position.

**Where it stands** — The method the rest of the work runs on.

---

### Something underneath · id `underneath`

**Statement:** The evidence everyone was building on had holes in it.

**The base everything lands on**
> A customer research effort is specifying a portal for customers moving freight
> across the bulk and merchandise lines of business. I'm not leading it. My own
> interviews were with the internal teams whose processes the portal touches.

**A prototype on invented data**
> An early one looked finished. The customers in it were invented and the
> location data fabricated, placeholder content that had quietly stopped being
> placeholder. I rebuilt it from the real research. A prototype that impresses on
> invented data teaches everyone who sees it to trust something that isn't there.

**Three documents, three counts**
> They were meant to be the source of truth for the repository's taxonomy and
> they disagreed. One class documented but never enforced, two enforced but never
> declared. Each internally consistent, which is why nobody notices.

**Where it stands** — Drafted as a decision record with an acceptance test, so it
can be argued with rather than just applied. Proposed, not merged.

---

## 5. Remove

The following paragraphs are cut entirely and must not appear anywhere:

- "Two directions went to subject-matter experts…" (full original version)
- "Internal products at CPKC had no visual identity. Everything sat on a
  provider's default presets, which is how internal tools end up feeling like
  someone's side project…" (full original version)
- "The longest stretch wasn't the interface…" as its own paragraph
- "Around it: a leadership pitch…" as its own paragraph (now folded into Where
  it stands)
- "Current-state maps get treated as documentation…"
- "It matters because the portal branches off this base…"

## 6. Confirm still done from Sprint 4

Report yes or no on each, with the evidence:

- Zero `—` characters in `page.tsx`
- No `01`–`04` numbering on rail or section headings
- Rail underline active state with scroll-spy
- Container-radius clip on the track band wrapper
- Videos play once on entering view and hold the last frame
- No spring on `trainX`; translation mapped over `[0, 0.7]`

---

## Verify, with numbers

1. Wheel 1 and wheel 15 rendered x-positions, plus bodies image left and right
   edges, all relative to the artboard box
2. `heroRenderedHeight`, `heroContentHeight`, applied `min-height`
3. Word count of body prose per section (target 110 to 130)
4. Rendered width of the visual column at 1440px
5. `npm run build` output
