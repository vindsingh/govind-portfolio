# SPRINT 24 — Mobile footer, card text alignment

Branch `site-refresh`. `npm run build`. Do not commit. No new dependencies.
Short sprint. No em dashes.

---

# §1 MOBILE FOOTER

Below 768px the drawing block is wider than the container and overflows to the
right. Four symptoms, one cause: the right column keeps its desktop widths when
it stacks.

Visible now at 390px:

- the caption and the counter are pushed right, not centred
- the controls row does not wrap, so `Save` and `Reset` are cut off and `Eraser`
  is clipped mid-word
- the sketch frame runs past the container's right edge

## 1.1 Below 768px

The footer becomes one column. The drawing block is full width inside the
container's padding.

```
/* drawing block wrapper */
width: 100%;
max-width: 100%;

/* frame */
width: 100%;
max-width: min(560px, 100%);
margin: 0 auto;
/* aspect-ratio, overflow and the 110% image crop all unchanged */
```

**Controls row:**

```
display: flex;
flex-wrap: wrap;
justify-content: center;
gap: 8px;
row-gap: 10px;
```

Every control must be fully visible. No clipping, no horizontal scroll inside
the row.

**Caption and counter:** `text-align: center` at this width, centred to the
frame. They are currently pushed right.

The left column (heading, clock, icons, nav, attribution) stays left-aligned and
does not change.

## 1.2 Check it

At 390px and 360px, report:

- the frame's rendered width and its `right` edge, against the container's
  `right` edge
- the controls row's rendered height, and whether any child's `right` exceeds
  the row's `right`
- the caption and counter `text-align`

The paint canvas resizes with the frame. Painting must still land under the
pointer at mobile width; test one stroke and say so.

---

# §1B THE FOOTER CROP DID NOT APPLY ON THE WIDTH

Sprint 23 reported the image rendering at **560 × 410.66px** inside a 560px
frame. The height is 110% of 373.33, so `height: 110%` took effect. The width is
560, which is 100%, not 110%. So `width: 110%` was overridden and there is still
no horizontal overflow to crop. The table is still on the right edge.

The cause is almost certainly a global `img { max-width: 100% }` in
`globals.css` or a Tailwind preflight rule, which clamps the image back to the
frame width.

Fix by overriding it on this image specifically:

```
position: absolute;
top: 0;
left: 0;
width: 110%;
max-width: none;     /* this is the line that was missing */
height: 110%;
object-fit: cover;
object-position: left top;
```

**Report the image's rendered width. It must be 616px against a 560px frame at
1440px.** If it is 560 again, find what else is clamping it and say what.

Then look at the result and tune the percentage until no paper edge or table
shows. Report the final value.

---

# §2 CARD TEXT ALIGNMENT

The CPKC and FOR/M cards sit in the same row but their eyebrow and title start
at different heights, because their media blocks are different heights.

Anchor both text blocks to the bottom of the card instead:

```
/* card */
display: flex;
flex-direction: column;

/* text block */
margin-top: auto;
```

The media keeps its own aspect ratio at the top, the text sits at the bottom, and
the two cards' text lines up because the cards are already equal height in the
grid row. Any leftover space becomes card background between the media and the
text, which reads as padding.

Apply to every card in the grid, not just these two, so a third card added later
behaves the same.

**Report the rendered `top` of the eyebrow on all four cards. The two in each row
must match.**

If this leaves an awkward gap under the CPKC media because of its gradient fade,
move the fade so it sits at the bottom of the **media** element rather than the
bottom of the space above the text. Report which you did.

---

# §3 COPY, ONE PHRASE USED TWICE

The home card reads `Design thinking inside a freight railway.` The case study
heading reads `Building a human-centred practice inside a freight railway.` Same
construction, and the card is the first thing seen before clicking into the
heading.

Keep the heading. Change the card title to:

> Bringing design into a company that had none.

It sets up the case study rather than previewing its heading, and it is the more
interesting claim of the two.

`ENTERPRISE DESIGN & AI` above it does not change.

*If that reads as too blunt, the alternate is* `Design practice in a company of
twenty thousand.` *Pick one; do not build both.*

**`railway` stays everywhere. Do not change it to `railroad`.**

---

# VERIFY

1. §1.2: the measurements at 390px and 360px, and the paint test
2. §1B: the image's rendered width at 1440px, which must exceed the frame width,
   and the final percentage
3. §2: the eyebrow `top` on all four cards
4. §3: the card title renders, the case study heading is unchanged
5. `npm run build` output
