# SPRINT 11 — Copy pass and two small fixes

Branch `cpkc-rewrite`. `app/projects/cpkc/page.tsx` and `components/cpkc/` only.
Run `npm run build`, do not commit. No em dashes anywhere; grep after editing.

---

## 1. Button

Revert the centring from Sprint 10. The button is **left-aligned** with the text
column again. Label stays centred inside the button itself.

## 2. Underline animation on the confidentiality line

Wrap the confidentiality sentence in the existing `Highlighter` component from
`components/ui/Highlighter.tsx`, the same one used elsewhere on this page and on
`app/projects/form/page.tsx`.

```tsx
<Highlighter action="underline" color="#1A1A1A" strokeWidth={1.5} isView>
  Most of this work is confidential, but I am happy to talk through any of it.
</Highlighter>
```

`isView` so it draws when scrolled into view rather than on load. Dark rather
than the component's sand default, so it reads as a pen mark against the
hand-drawn visuals.

## 3. Statement lines — two changed

| section | line 1 | line 2 |
|---|---|---|
| people-use | Sales teams were losing hours in spreadsheets to find leads. | So we built a tool they could just ask. |
| persists | *unchanged* | *unchanged* |
| shows-shape | *unchanged* | *unchanged* |
| underneath | The research is all in one place, but its own rules had stopped agreeing. | So the base gets fixed before anything else is built on it. |

## 4. Pointer copy — six rewritten, six unchanged

Use verbatim. Unchanged ones are listed so nothing gets lost.

### Something people use

**Six use cases** *(lightly trimmed)*
> We talked to people across every line of business. Six ideas for AI came out of
> it, ranked. This was the one that got built.

**Two directions** *(rewritten)*
> One version looked like the spreadsheet people already used. The other let them
> ask a question. The familiar one would have kept them in the spreadsheet.

**Shipped rough** *(rewritten)*
> Internal tools here were built on default templates. We designed this one
> properly, then showed it to people while it was still rough. It is in use now,
> and they run it themselves.

### Something that persists

**People already doing it** *(unchanged)*
> People in other teams were already talking to users and testing things before
> spending money. They just had no name for it, and no way to find each other.

**A group, not a document** *(lightly trimmed)*
> We could have written a framework. Most go unread. So we found those people and
> gave them somewhere to meet.

**105 members** *(unchanged)*
> A group that grew to 105+ people across Information Services by early 2026.
> That is how many joined, not how many changed the way they work.

### Something that shows shape

**No map existed** *(unchanged)*
> Freight passes through more hands than any one person can see. Nobody had
> written down how the work actually moves.

**Mapping what happens** *(rewritten)*
> We mapped that flow for an external trucking partner, and later for a customer
> portal, both starting from a blank page.

**Mapping backwards** *(rewritten)*
> We asked an engineering team to picture their job a few years out, working the
> way they wanted to, then traced the steps back from there. Asking what hurts
> gets you complaints. Starting from the end gets you a plan.

### Something underneath

**What's already there** *(rewritten)*
> A lot of customer research already sits in one place, and a new customer portal
> is being designed on top of it. I am not leading that. I interviewed the
> internal teams it affects.

**Rebuilt on it** *(unchanged)*
> One early prototype looked finished, but the customers and locations in it were
> made up. It demoed well. I rebuilt it from the real research.

**What comes next** *(heading and body both rewritten)*
> The files that decide how research gets filed had stopped agreeing with each
> other. I wrote up a fix and put it up for review.

Note: this pointer's heading changes from "What the next practice looks like" to
**"What comes next"**. The other eleven headings are unchanged.

---

## Verify

1. Button is left-aligned, label centred within it
2. The underline draws on scroll into view, dark, and follows the sentence
   across both lines if it wraps
3. Count of `—` in both files
4. `npm run build` output
