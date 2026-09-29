# SPRINT 3 — Track band, parked railcar, and cleanup

Continue on branch `cpkc-rewrite`. Same constraints as before: no new
dependencies, no changes outside `app/projects/cpkc/page.tsx` and
`components/cpkc/TrainBand.tsx`, every value from an existing variable in
`globals.css`, run `npm run build` when done, do not commit.

---

## 0. Asset constants — verified, use exactly as given

These offsets have been checked by compositing the three assets together. Do not
recalculate them.

```tsx
// Source artboard is 2400 × 700. The assets are trimmed to content, so each
// carries its own top/left offset within that frame.
const ART_W = 2400
const ART_H = 700

const TRACK  = { src: '/projects/cpkc/train/track.webp',
                 w: 2393, h: 136, top: 564.62, left: 3.5 }
const BODIES = { src: '/projects/cpkc/train/bodies.webp',
                 w: 2360, h: 322, top: 232.67, left: 20 }
const WHEEL  = { src: '/projects/cpkc/train/wheel-1.webp', size: '3.276%' }

// Axle centres as % of the 2400 × 700 artboard.
// Pair with transform: translate(-50%, -50%) rotate(...)
const WHEELS = [
  { left: '6.345%',  top: '79.837%' }, { left: '10.248%', top: '79.837%' },
  { left: '19.846%', top: '79.837%' }, { left: '23.700%', top: '79.837%' },
  { left: '34.086%', top: '79.837%' }, { left: '37.989%', top: '79.837%' },
  { left: '42.095%', top: '79.837%' }, { left: '50.767%', top: '79.837%' },
  { left: '54.670%', top: '79.837%' }, { left: '58.524%', top: '79.837%' },
  { left: '71.326%', top: '79.837%' }, { left: '75.229%', top: '79.837%' },
  { left: '88.007%', top: '79.837%' }, { left: '91.910%', top: '79.837%' },
  { left: '95.764%', top: '79.837%' },
] as const
```

### Placement

Every asset sits inside one relatively-positioned box with a 2400:700 aspect
ratio. Each is absolutely positioned as a percentage of that box:

```
left:   (asset.left / ART_W * 100)%
top:    (asset.top  / ART_H * 100)%
width:  (asset.w    / ART_W * 100)%
height: (asset.h    / ART_H * 100)%
```

Which resolves to:

| asset  | left    | top     | width   | height  |
|--------|---------|---------|---------|---------|
| track  | 0.146%  | 80.660% | 99.708% | 19.429% |
| bodies | 0.833%  | 33.238% | 98.333% | 46.000% |

Wheels use the `WHEELS` array above: `left`/`top` are axle centres, paired with
`transform: translate(-50%, -50%) rotate(...)` and a width and height both set to
`WHEEL.size`. Set both explicitly — the source file is 233 × 238, so letting
height auto-size makes the wheel slightly oval.

Note: the track's lower edge lands flush with the bottom of the 700px frame. Do
not add padding beneath the band or the grass will be visibly cut off.

---

## 1. Removals

Delete from `app/projects/cpkc/page.tsx`:

- The entire stats block in the rail (105+, 0 → 1, Foundation)
- The `TEAM` and `TYPE` metadata rows — rail keeps only `ROLE` and `TIMELINE`
- The `InteractiveHoverButton` linking to cpkcr.com, and its import if now unused
- The status pills (`SHIPPED`, `ONGOING`, `METHOD`, `IN REVIEW`) and the `status`
  prop on `CaseSection`
- The `--color-accent-subtle` background and border on the confidentiality note
  card — keep the text and the mailto link, plain on the page background
- The closing line "The tool is in production…" and the `← Back to overview`
  button

Keep: the four anchors, ROLE, TIMELINE, the four sections, the "Where it stands"
lines, and the top folder tab row.

## 2. Headline

Change from `--text-2xl` to `--text-xl`, and `max-width` from 16ch to 24ch. It
currently runs four lines and consumes the first screen; target is two lines at
1440px.

## 3. The track band — the main change

The band is no longer a row inside the hero grid. It becomes a **fixed element
pinned to the bottom of the viewport**, present for the whole case study.

### 3.1 Geometry

```tsx
position: fixed;
bottom: 0;
left: 0;
right: 0;
z-index: 5;          // above page background, below the rail (z-index 10)
pointer-events: none;
overflow: hidden;
```

Height is scroll-dependent:
- While the hero is in view: **200px**
- After the hero scrolls out: **120px**

Interpolate between the two with `useTransform` on hero scroll progress so it
shrinks smoothly rather than snapping.

### 3.2 Horizontal extent

The track must span the **full viewport width** and visibly pass beyond the left
and right edges of the `FileContainer`. It is not clipped by the container. The
`FileContainer` has `overflow: hidden`, so the band must be rendered as a sibling
of `DesktopSurface`'s children, outside the container — not nested inside it.

### 3.3 Vertical end point

The band stops where the case study content ends, so the footer sits clean below
it. Implement with an IntersectionObserver or `useScroll` on a sentinel element
placed immediately after the closing content: once the sentinel enters the
viewport, the band's `position` switches from `fixed` to `absolute` at that
point, so it scrolls away with the content rather than floating over the footer.

### 3.4 Layer order, back to front

```
track.webp (includes grass)  →  wheels  →  bodies.webp
```

Wheels sit above the track and below the bodies. The bodies' lower edge overlaps
the wheel tops, which is what makes them read as seated on axles.

### 3.5 Bottom padding

Add `padding-bottom: 200px` to the main content wrapper so the last section's
text is never hidden behind the fixed band. On mobile, 120px.

## 4. Motion

### 4.1 Going down — scroll-linked

`useScroll({ target: heroRef, offset: ['start start', 'end start'] })`

One `translateX` on a single wrapper containing bodies + wheels (**not** the
track — the track stays still). Train moves from its parked position rightward
and off-screen as the hero scrolls out.

Wheels: one shared `rotate`, `0 → 180deg` across the same range. Each wheel
element carries `transform-box: fill-box; transform-origin: center`, and
`transform: translate(-50%, -50%) rotate(...)`.

The train must drift while the wheels turn. Wheels rotating on a stationary train
reads as broken.

### 4.2 Coming back up — one-shot re-entry

Do **not** reverse the scroll-linked transform. The train always travels
rightward.

Fire a one-shot when the page returns to scroll position 0 (`window.scrollY === 0`
after having been past the hero): train animates from off-screen left to its
parked position over ~900ms, `ease: [0.16, 1, 0.3, 1]`. Wheels rotate forward
during it.

Guard with a ref so it cannot re-fire while already playing. Trigger only at
scroll-top, never at a mid-page boundary — a mid-range trigger conflicts with the
scroll-linked value and causes a visible jump.

### 4.3 The parked railcar

Once the hero has scrolled out, one railcar remains, parked at the **bottom-right
of the illustration column** (see §5), sitting on the track. Static. It stays for
the rest of the page.

Implement as a separate element, cropped from the bodies art or given its own
file later. It fades in as the train exits and fades out as the train re-enters.

## 5. Three-column layout

Change the content area from two columns to three:

```
[ rail 220px ] [ prose, flex 1, max-width 620px ] [ illustration column, 340px ]
```

The illustration column is empty for now. Add an `illustration?: React.ReactNode`
prop to `CaseSection` that renders into it, and a commented placeholder marking
where the sub-visual will go.

Below 1024px: illustration column drops below the prose. Below 768px: rail goes
static above everything, as it does now.

## 6. Reduced motion and mobile

`useReducedMotion`: train renders parked, no translation, no wheel rotation, no
one-shot. Track band still renders, still fixed.

Below 768px: band is 120px throughout, train static and scaled to fit, no
movement. `overflow-x: hidden` on the band. Verify at 390px that the page does
not scroll sideways.

---

## Report

1. Whether you used the real `TRACK.top` / `BODIES.top` values or the placeholders.
2. Build output.
3. A note on whether the fixed band caused any stacking-context conflicts with
   the sticky rail or the folder tab row.
