# SPRINT 23 — Fast: footer line, alignment, crop, card motion

Branch `site-refresh`. `npm run build`. Do not commit. No new dependencies.
Short sprint, light verification. No em dashes.

---

# §1 FOOTER, ONE CAPTION LINE

Merge the two lines into one, above the controls, where `Colour it in.` sits now.
Delete the `Drawn in 2020.` line under the frame.

> Drawn in 2020. Colour it in.

Chronological, and the instruction lands last.

Styling: `--text-base` (up from `--text-sm`), `var(--font-body)`,
`var(--color-text-primary)`, centred to the frame. 16px below it, then the
controls row, then the counter, then the frame.

---

# §2 FOOTER, LEFT COLUMN ALIGNMENT

`Still building. / Always thinking.`, the clock and the icons all start at the
same left edge. `Work About Experience` and `Drawn and built by Govind. 2026.`
sit about 15px further right.

Cause is a stray `paddingLeft: '12px'` on those two, added in an earlier sprint.
Remove it from both. Every element in the left column shares one left edge.

**Report the rendered `left` of all five: heading, clock, icon row, nav row,
attribution. They must match.**

---

# §3 FOOTER, ACTUALLY CROP THE RIGHT EDGE

The table is still visible down the right side. `object-fit: cover` with a source
taller than the frame only crops vertically, so `object-position: left top` never
touched the right edge. That was my mistake in sprint 22.

Crop by oversizing the image inside the clipped frame:

```
/* frame stays: max-width 560px, aspect-ratio 3 / 2, overflow hidden, position relative */

img {
  position: absolute;
  top: 0;
  left: 0;
  width: 110%;
  height: 110%;
  object-fit: cover;
  object-position: left top;
}
```

110% takes roughly 10% off the right and the bottom. **Look at the result and
tune the number** until no paper edge or table shows on either side. Report the
value you settled on.

The paint canvas stays sized to the **frame**, not the image. Do not resize it.

---

# §4 ATTRIBUTION LINE

Replace verbatim:

> Drawn and built by Govind. 2026.

`Designed,` comes off. The drawing above it makes the point.

---

# §5 CARD MOTION, NEW INSTRUCTION

This reverses the `loop` added in sprint 20. Two cards animating forever beside
each other is too much going on.

Applies to the **CPKC card and the FOR/M card** on the home page, on both tabs.

- Remove `loop`.
- Play once when the card enters the viewport, then hold the last frame.
- Replay from the start on hover, behind `@media (hover: hover)` so it does not
  fire on touch.
- Keep `playbackRate` as it is.
- Under `prefers-reduced-motion`, no playback at all: the still frame only.

If FOR/M's wordmark animation is CSS or JS rather than a video, apply the same
rule in whatever form fits: it runs once on entering view, holds its end state,
and restarts on hover. Report how it is built and what you did.

---

# VERIFY

1. The caption renders as one line; the old line under the frame is gone
2. §2: the five `left` values
3. §3: the percentage used, and that no table or paper edge shows
4. The attribution line reads `Drawn and built by Govind. 2026.`
5. Both cards play once, hold, and replay on hover; neither loops
6. `npm run build` output
