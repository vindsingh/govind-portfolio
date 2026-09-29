# SPRINT 4 — FINAL. Outstanding fixes plus sub-visuals

Branch `cpkc-rewrite`. This merges everything from Sprint 3d (which was never
run) with the sub-visual integration. Intended as the last sprint on this page.

Constraints unchanged: no new dependencies, changes limited to
`app/projects/cpkc/page.tsx` and `components/cpkc/`, every value from an
existing variable in `globals.css`, run `npm run build`, do not commit.

---

## 0. Asset placement

The files are already in `public/projects/cpkc/sections/`. Twelve files, three
per section:

```
section1-subvisual.webm   section1-subvisual.mp4   section1-subvisual.jpg
section2-subvisual.webm   section2-subvisual.mp4   section2-subvisual.jpg
section3-subvisual.webm   section3-subvisual.mp4   section3-subvisual.jpg
section4-subvisual.webm   section4-subvisual.mp4   section4-subvisual.jpg
```

Videos are 600 × 800, VP9 / H.264, 2.0 seconds, **no alpha channel** — the white
background is baked in. The JPG is the animation's last frame and serves two
purposes: the video's `poster`, and the static fallback when reduced motion is
preferred.

If any file in that folder still has a space in its name rather than a hyphen,
stop and report it. Spaces break URL paths on deployment.

Train assets stay in `public/projects/cpkc/train/`.

---

## 1. Wheel alignment — make it tunable

Add one offset constant applied to every wheel. Do not edit the `WHEELS` array.

```tsx
// Tune by hand in the browser. Negative moves wheels left.
const WHEEL_X_OFFSET = -0.6   // percentage points
```

```tsx
left: `${parseFloat(w.left) + WHEEL_X_OFFSET}%`
```

Put it at the top of `TrainBand.tsx` with that comment.

## 2. The train must respond to the first scroll

It currently sits still through the early scroll, which reads as broken.

Report the current `useScroll` offset config **before** changing it. Then:

- Offset should be `['start start', 'end start']`. Verify `scrollYProgress`
  moves off 0 within the first 100px of scroll.
- Map the translation over the **first 70%** of progress so the train arrives
  before the hero is fully gone:

```tsx
const trainX = useTransform(scrollYProgress, [0, 0.7], [0, finalX])
```

- **Remove any `useSpring`, damping or stiffness wrapper on `trainX`.** Springs
  lag behind scroll and are the usual cause of this exact symptom. If one
  exists, say so in your report.
- Wheel rotation uses the same `[0, 0.7]` range so wheels stop when the train
  does.

## 3. Remove numbering from the rail

```tsx
const ANCHORS = [
  { label: 'The tool',     id: 'people-use' },
  { label: 'The practice', id: 'persists' },
  { label: 'The method',   id: 'shows-shape' },
  { label: 'The ground',   id: 'underneath' },
] as const
```

Delete the `num` field and its rendering. Keep the underline active state and
scroll-spy exactly as they are.

## 4. Remove numbering from section headings

Delete the `01`–`04` prefixes from `CaseSection` and the `number` prop. Headings
become just "Something people use", "Something that persists", "Something that
shows shape", "Something underneath".

## 5. Copy — no em dashes anywhere

**No em dash (—) may appear on this page.** Use these verbatim.

### Hero paragraphs 2 and 3 — change both from `--text-md` to `--text-base`

> I joined CPKC in July 2025, on the first of three Mitacs terms. The brief was
> to democratize design. In practice that meant a twenty-thousand-person freight
> railway with no designer in it.

> We worked alongside change management and business transformation, the teams
> already responsible for how work gets done. Nobody there was asking what any of
> it felt like to use.

### Section 01

> Discovery across the lines of business surfaced six AI opportunities and ranked
> them. I was part of that work rather than running it. This was the one that got
> built.
>
> Two directions went to subject-matter experts. One kept the spreadsheet shape
> people already knew. The other was conversational. Familiar is safer, and it's
> what you pick if you want the demo to go well. But it would have rebuilt the
> constraint the tool existed to remove.
>
> Internal products at CPKC had no visual identity. Everything sat on a
> provider's default presets, which is how internal tools end up feeling like
> someone's side project. We piloted one here: interaction and prompt screens,
> and the system underneath them, built by hand from a standing start.
>
> The longest stretch wasn't the interface. It was working out when the tool
> should open and when it shouldn't. Surface it at the wrong moment and people
> close it. Close it twice and they stop opening it at all.
>
> We showed it rough and early, before it was easy to understand. That's
> uncomfortable, because people outside design read rough as broken. It shipped.
> After launch we sat with users on a timed task and watched them run it
> themselves. People said they found leads faster. Nobody measured it, so that's
> the whole claim.

### Section 02

> The second part turned out to matter more. People across the departments were
> already doing pieces of it: talking to whoever would use a thing before
> building it, writing down what the problem actually was before proposing a fix,
> trying something small before committing budget. What they didn't have was a
> name for any of it, or a way to find each other.
>
> The obvious move is to write it down. A framework, a deck, a set of principles.
> Enough of those go unopened that the format seems like the failure. What worked
> was finding the people already inclined this way, naming what they were doing,
> and giving them somewhere to do it in public. That became a community of
> practice on leadership-nominated cohorts. It reached 105+ members of
> Information Services by Q1 2026, and gave people somewhere to try things that
> weren't yet anyone's job.
>
> 105 is a membership count, not a measure of how many people changed how they
> work. It's the number we have.
>
> Around it: a leadership pitch for a design-centric innovation program, an
> AI-ethics card toolkit for workshops and decision sessions, and the
> service-design content in the shared training material. The same argument,
> compressed into half a day, ran with an internal quality-engineering team. AI
> went into their hands as a tool inside their own ideation rather than as a
> topic to discuss, then a future-scenario journey map they worked backward from.
> Forward from current pain gets you complaints. Backward from a target state
> gets you a position.

### Section 03

> Not as a deliverable, but as the thing you do before you're allowed an opinion.
> Freight moves through more hands than anyone in any one of those hands can see,
> so the first question is always the same: what actually happens, in order, to
> whom.
>
> It started with journey mapping for an engagement with an external trucking and
> logistics partner, following how work really moved through a business that had
> never written it down. The same method later at a different scale:
> current-state process mapping for a customer portal, from a blank start with no
> existing map.
>
> Current-state maps get treated as documentation, produced so the real work can
> begin. They're usually the first honest description anyone has had of what the
> business does, and they tend to disagree with what people believe it does.

### Section 04

> With a practice running and a tool shipped, the current term is about the base
> everything else gets built on. A customer research effort is specifying a
> portal for customers moving freight across the bulk and merchandise lines of
> business. I'm not leading it. The team runs the enterprise shipper sessions. My
> own interviews were with the internal teams whose processes the portal touches,
> and I helped shape how those were structured rather than executing a method
> handed to me.
>
> An early prototype looked finished. The customers in it were invented and the
> location data was fabricated: placeholder content that had quietly stopped
> being placeholder. It demoed well and nobody was asking. I rebuilt it from the
> real research. A prototype that impresses on invented data teaches everyone who
> sees it to trust something that isn't there, and every decision after it
> inherits that.
>
> Then the repository. Three documents were meant to be the source of truth for
> its taxonomy and they disagreed. Three different class counts, one class
> documented but not enforced, two enforced but never declared. Each internally
> consistent, which is why nobody notices. The reconciliation is drafted as a
> decision record with an acceptance test, so it can be argued with rather than
> just applied. It's proposed, not merged. It matters because the portal branches
> off this base, and whatever the taxonomy says is what the next several years of
> customer research gets filed against.

### Confidentiality note

> Most of this work lives inside CPKC systems and I can't show it. What's here is
> how it was structured and what changed. Happy to talk through any of it in more
> detail. Get in touch.

After editing, grep for `—` and confirm zero matches.

## 6. Fix the corner mismatch at the container edge

On the container-width wrapper (element 2) in `TrainBand.tsx`:

```tsx
borderBottomLeftRadius: 'var(--radius-file)',
borderBottomRightRadius: 'var(--radius-file)',
overflow: 'hidden',
```

So the track and grass clip to the same curve as `FileContainer`.

## 7. Sub-visuals

Create `components/cpkc/SectionVisual.tsx`.

```tsx
interface SectionVisualProps {
  slug: string   // 'section1' … 'section4'
  alt: string
}
```

### Markup

```tsx
<video
  ref={videoRef}
  muted
  playsInline
  preload="none"
  poster={`/projects/cpkc/sections/${slug}-subvisual.jpg`}
  aria-label={alt}
  style={{ width: '100%', height: 'auto', display: 'block' }}
>
  <source src={`/projects/cpkc/sections/${slug}-subvisual.webm`} type="video/webm" />
  <source src={`/projects/cpkc/sections/${slug}-subvisual.mp4`}  type="video/mp4"  />
</video>
```

`muted` and `playsInline` are both required or iOS will not play inline.

Note: the poster is the animation's **last** frame, so the finished diagram
shows before playback starts and the video then plays from the beginning. That
brief jump is intentional and preferred over a blank box.

### Behaviour

**Play once, then hold.** Do not loop. These are 2 seconds long and sit next to
text people are reading; a 2-second loop beside prose is distracting.

- `IntersectionObserver` on the video element, `threshold: 0.4`
- On first intersection, call `.play()`
- When it ends, leave it on the last frame. Do not reset, do not replay
- If the user scrolls back up and returns to the section, do **not** replay
- Use a ref flag so play is called at most once per video per page load

**Reduced motion.** If `useReducedMotion()` returns true, render a static
`<img src={/projects/cpkc/sections/${slug}-subvisual.jpg}>` instead of the video
and never load the video files at all. That JPG is the last frame, so the reader
gets the completed diagram.

### Placement

Render into the illustration column via `CaseSection`'s existing `illustration`
prop:

```tsx
width: '100%',
maxWidth: '300px',
position: 'sticky',
top: '120px',
```

Wire each section:

| section | id | slug |
|---|---|---|
| Something people use | `people-use` | `section1` |
| Something that persists | `persists` | `section2` |
| Something that shows shape | `shows-shape` | `section3` |
| Something underneath | `underneath` | `section4` |

`alt` text, one per section:

- section1 — "Six ranked use cases lead to rough prototypes, then a tool in production."
- section2 — "Existing practices adapted and tailored, growing to 105+ members."
- section3 — "Mapping backward from a target state rather than forward from today."
- section4 — "A practice built to keep changing on work already done."

### Mobile

Below 1024px the illustration column drops below the prose; the video goes with
it, `position: static`, `maxWidth: 300px`, centred. Same play-once behaviour.

---

## Verify, with measured values not checkmarks

1. `scrollYProgress` after 100px of scroll, and whether a spring existed on `trainX`
2. `finalX`, and the boxcar's left and right edges at rest relative to element 2's width
3. Count of `—` remaining in `page.tsx` (must be 0)
4. Train size identical at scroll 0 and after the hero has left
5. All four videos play once on entering view and hold their last frame
6. No video replays on scrolling back
7. At 390px the page does not scroll sideways
8. `npm run build` output
