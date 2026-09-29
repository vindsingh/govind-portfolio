# TRAIN ASSETS v2 — verified. Replaces all previous train constants.

Every value below has been checked by rebuilding the train from these exact files
and coordinates and overlaying it on the Figma reference export. All 13 wheels
land within 1px of their Figma positions. Do not recalculate any of these.

---

## 1. Files

Replace the contents of `public/projects/cpkc/train/` with:

```
track.webp     2400 × 700, transparent, track baked into its correct position
bodies.webp    2400 × 700, transparent, bodies baked into their correct position
wheel-1.webp   233 × 238
```

Delete any older train files in that folder. `track.webp` and `bodies.webp` are
**full-frame** now: they carry their own position, so they need no offsets.

## 2. Constants — replace all existing train constants in `TrainBand.tsx`

Delete the old `TRACK`, `BODIES`, `WHEELS`, `WHEEL`, `BOXCAR_FRAC`,
`VISIBLE_FRAC` and `WHEEL_X_OFFSET` definitions and use exactly these:

```tsx
const ART_W = 2400
const ART_H = 700
const ART_RATIO = ART_W / ART_H            // 3.428571

// Bodies start at y=252 on the 700px artboard. Everything above is empty
// and gets clipped by the band. Visible fraction = (700 - 252) / 700.
const VISIBLE_FRAC = 0.64

// Boxcar right edge is at x=659 on the 2400px artboard.
const BOXCAR_FRAC = 0.2746

const TRACK_SRC  = '/projects/cpkc/train/track.webp'
const BODIES_SRC = '/projects/cpkc/train/bodies.webp'
const WHEEL_SRC  = '/projects/cpkc/train/wheel-1.webp'

// Axle centres as % of the artboard box. Pair with x: '-50%', y: '-50%'.
const WHEELS = [
  { left: '5.412%',  top: '74.206%' },
  { left: '8.541%',  top: '74.206%' },
  { left: '21.315%', top: '74.206%' },
  { left: '24.444%', top: '74.206%' },
  { left: '36.359%', top: '74.206%' },
  { left: '39.488%', top: '74.206%' },
  { left: '52.262%', top: '74.206%' },
  { left: '55.391%', top: '74.206%' },
  { left: '68.165%', top: '74.206%' },
  { left: '71.294%', top: '74.206%' },
  { left: '81.897%', top: '74.206%' },
  { left: '85.026%', top: '74.206%' },
  { left: '88.155%', top: '74.206%' },
] as const

const WHEEL_W = '3.046%'    // of box width
const WHEEL_H = '10.683%'   // of box height  (wheel is 73.1 × 74.78, not square)
```

There are now **13** wheels, not 15. Remove `WHEEL_X_OFFSET` entirely.

## 3. Box size

```tsx
const boxWidth  = BAND_H / VISIBLE_FRAC * ART_RATIO   // 1071.43 at BAND_H 200
const boxHeight = boxWidth / ART_RATIO                // 312.50
```

Element 3 gets these as **explicit pixel values**, anchored `bottom: 0`, taller
than the band so it overflows upward and element 1 clips the empty top.

## 4. Layers inside element 3, back to front

```tsx
{/* bodies — full frame, no offsets */}
<img src={BODIES_SRC} style={{ position: 'absolute', inset: 0,
  width: '100%', height: '100%' }} />
```

Wheels go **behind** the bodies so each body's lower edge overlaps the top of its
wheels. Render order inside element 3:

1. wheels
2. bodies

Each wheel:

```tsx
<motion.img src={WHEEL_SRC} style={{
  position: 'absolute',
  left: w.left,
  top:  w.top,
  width:  WHEEL_W,
  height: WHEEL_H,
  x: '-50%',
  y: '-50%',
  rotate: wheelRotate,
  transformBox: 'fill-box',
  transformOrigin: 'center',
}} />
```

No `transform:` string and no class setting `transform` on the wheels. No
`initial` / `animate` props that set only `rotate` — those reset the translate.

## 5. Track

Keep the track as a repeating background on element 2, updated for the new file:

```tsx
backgroundImage: `url(${TRACK_SRC})`,
backgroundRepeat: 'repeat-x',
backgroundPosition: 'left bottom',
backgroundSize: `${boxWidth}px ${boxHeight}px`,
```

## 6. Clamp

Unchanged formula, new constant:

```tsx
const finalX = el2Width - (boxWidth * BOXCAR_FRAC) - RIGHT_PAD
```

---

## Verify

1. Element 3 rendered size: must be 1071.43 × 312.50 at 1440 × 900
2. Exactly 13 wheels rendered
3. Screenshot at scroll 0, full train visible. Wheels must sit under each car
   with the front and back trucks evenly spaced from the car ends
4. Screenshot after the hero: boxcar fully visible inside the right edge
