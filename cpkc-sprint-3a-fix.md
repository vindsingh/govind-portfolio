# SPRINT 3a — FIX: train band scaling and width

Same branch `cpkc-rewrite`. This corrects three errors in Sprint 3. Two of them
came from the previous spec, not from your implementation.

Only `components/cpkc/TrainBand.tsx` and the band-related code in
`app/projects/cpkc/page.tsx` should change. Do not touch the content, the rail,
or anything else from Sprint 3.

---

## What is wrong now

1. **The band shrinks from 200px to 120px on scroll.** Its contents are
   positioned as percentages of an aspect-locked box, so shrinking the band
   scales the entire train down. The train must stay a constant size at all
   times.

2. **The artboard box is not holding its 2400:700 ratio.** It is stretched to
   full viewport width against a fixed height, roughly 2.8× too wide. The bodies
   stretch to fill it while the wheels are sized off a different axis, which is
   why the wheels appear tiny relative to the cars.

3. **The band spans the full viewport and bleeds past the FileContainer.** It
   should sit inside the container's width instead.

---

## 1. Remove the shrink entirely

Delete the `useTransform` that interpolates band height on scroll. The band is a
single constant height:

```tsx
const BAND_H = 200   // desktop
const BAND_H_MOBILE = 140
```

No interpolation, no scroll-dependent sizing, ever. If the band should feel
lighter after the hero, that is done by fading the bodies out — never by scaling.

## 2. Correct geometry

Three nested elements. The maths matters; do not substitute your own.

```tsx
// The artboard is 2400 × 700, but only its lower portion carries artwork.
// Bodies begin at 33.238% down, so the visible fraction is 0.66762.
// boxWidth = BAND_H / 0.66762 × (2400/700) = BAND_H × 5.1354
const ART_RATIO    = 2400 / 700       // 3.42857
const VISIBLE_FRAC = 0.66762
const boxWidth     = BAND_H / VISIBLE_FRAC * ART_RATIO   // 200 → 1027.1px
```

```tsx
{/* 1. Pinned strip — fixed height, full width, clips everything */}
<div style={{
  position: 'fixed', bottom: 0, left: 0, right: 0,
  height: isMobile ? BAND_H_MOBILE : BAND_H,
  overflow: 'hidden',
  pointerEvents: 'none',
  zIndex: 5,
}}>

  {/* 2. Container-width track — matches FileContainer's 1320px max */}
  <div style={{
    position: 'relative',
    width: '100%', maxWidth: '1320px',
    marginInline: 'auto', height: '100%',
    overflow: 'hidden',
  }}>

    {/* 3. The artboard box — aspect locked, anchored to the bottom.
           The empty upper region of the artboard is clipped by the strip. */}
    <motion.div style={{
      position: 'absolute',
      bottom: 0, left: 0,
      width: `${boxWidth}px`,
      height: `${boxWidth / ART_RATIO}px`,
      x: trainX,                       // the scroll-linked transform
    }}>
      {/* track, bodies, wheels at their existing % positions */}
    </motion.div>
  </div>
</div>
```

The percentage positions from Sprint 3 §0 are correct and unchanged. They only
misbehaved because the box they sat in was the wrong shape.

**Set width and height on element 3 explicitly in pixels.** Do not use
`aspectRatio`, `width: 100%`, or `inset: 0` — each of those lets the box be
resized by its parent, which is what broke it.

## 3. The track must repeat, not stretch

The track art is 2393px wide in artboard units. Inside a 1027px box it is scaled
down, and when the train translates rightward, track runs out at the edges.

Render the track as a **repeating background** on element 2 rather than as a
child of element 3:

```tsx
backgroundImage: `url(${TRACK.src})`,
backgroundRepeat: 'repeat-x',
backgroundPosition: 'left bottom',
backgroundSize: `${boxWidth * 0.99708}px auto`,
```

This keeps the track still while the train moves over it, ties it to the
container width, and stops it running out. Remove the track `<img>` from element
3 — element 3 now holds only bodies and wheels.

## 4. Wheels

Width and height both set to `WHEEL.size`, explicitly. The source is 233 × 238;
letting height auto-size makes them oval. Positions are percentages of element 3,
which is now the correct shape, so they will land correctly without changes.

Confirm each wheel still carries:
```css
transform: translate(-50%, -50%) rotate(...);
transform-box: fill-box;
transform-origin: center;
```

## 5. The parked railcar

Same sizing rules. It is a crop of the bodies art at the same scale as the train,
positioned at the right edge of element 2, sitting on the track. It must be
visually identical in size to the railcars in the moving train — if it looks
bigger or smaller, the scale is wrong.

---

## Verify before reporting

At 1440 × 900, check each of these:

1. The train is the same size in the hero and after scrolling. Scroll up and
   down and watch for any size change at all.
2. Wheels are in proportion to the cars — roughly as wide as one car is tall,
   divided by four. They should look like the wheels in the source art.
3. Neither the train nor the track extends past the left or right edge of the
   file container.
4. Wheels turn in place rather than orbiting.
5. The track does not run out or show a seam as the train moves.
6. At 390px width the page does not scroll sideways.

Report with `npm run build` output and a note on which of the six pass.
