# SPRINT 25 — Pre-merge audit, then push to main

Branch `site-refresh`. This sprint **does** commit and push. Read §3 before
running anything in it.

Two halves. §1 and §2 are an audit that must pass first. §3 is the merge.

---

# §1 AUDIT, REPORT ONLY, FIX NOTHING YET

Answer all of these before touching git. Several have been reported as done in
earlier sprints and never confirmed.

## 1.1 Content that must not ship

1. **Grep the whole repo** for each of these strings, case-insensitive, and
   report every hit with file and line. All must return zero:
   - `first design thinking framework`
   - `CIO`
   - `AI-native`
   - `co-owned`
   - `months to weeks`
   - `Schneider`
   - `community of practice`
   - `Innovation Catalyst`
2. **Grep for `govindsinghahluwalia`.** Must be zero. The live LinkedIn is
   `linkedin.com/in/govind-ahluwalia`.
3. **Every external link in the repo.** List each URL and the file it is in.
   Flag any that is a placeholder, a `#`, or an empty `href`.
4. **The resume PDF.** Report the exact path of the file the Experience page
   links to, and its last modified date. **Do not open or edit it.** See §2.1.

## 1.2 Routes and dead files

5. Do `/falcon` and `/projects/falcon` both exist? The last build output listed
   both. Report what is in each, which one the home page links to, and which one
   the Experience page links to.
6. Do these still exist? Yes or no each, with `git status` or `ls` evidence:
   - `app/cpkc/page.tsx`
   - `public/about/Painting_1.png`, `Painting_2.jpg`, `Painting_3.jpg`
   - `public/projects/cpkc/cpkc-cover.svg`
   - `components/CPKCTimeline.tsx` and `Phase1-4.svg`
7. Report the total size of `public/`. If any single asset is over 5MB, name it.

## 1.3 Rendering

8. At 1440px and 390px, on `/`, `/?tab=work`, `/about`, `/experience`,
   `/projects/cpkc`, `/projects/falcon`, `/projects/form`, run:

   ```js
   [...document.querySelectorAll('*')]
     .map(el => { const r = el.getBoundingClientRect()
       return { el: el.tagName + '.' + (el.className||'').toString().slice(0,40),
                left: Math.round(r.left), right: Math.round(r.right) } })
     .filter(o => o.left < -1 || o.right > window.innerWidth + 1)
   ```

   Report the array per route per width. All must be empty.
9. Click through every navigation path: All, Work, About, Experience and Go back,
   from every one of those seven routes. Report where each lands. That is 35
   checks; report failures individually and state the total that passed.
10. The CPKC section headings behind the fixed train band. Report the band's
    `z-index`, the headings' `z-index`, and the overlap in px. Do not fix.
11. Count of `—` across the whole repo, not just touched files.
12. `npm run build`, full output.

## 1.4 The hydration warning

13. A console error reports a hydration mismatch on `<html>` caused by the
    attribute `xk-pk-bridge="true"`. That attribute comes from a browser
    extension, not from this codebase. **Confirm it** by grepping the repo for
    `xk-pk-bridge` (expect zero hits) and by loading the site in a clean browser
    context with extensions disabled. Report both results. Do not add
    `suppressHydrationWarning` to work around it.

---

# §2 THE TWO THINGS THAT BLOCK A MERGE

## 2.1 The resume PDF

The Experience page links to a resume PDF that was found to contain four claims
that do not survive the source-of-truth check. Until it is replaced, that link
publishes them.

**Report only:** does the current PDF at the path from §1.1.4 still contain any
of the §1.1.1 strings? Extract its text and grep it.

If it does, **stop and tell me.** Do not merge. The options are to replace the
PDF or to remove the link, and that is my call, not yours.

## 2.2 Unlinked organisations

`DesignWith Lab` and `Samdisha Bagga` on the Experience page still have no URL.
Confirm they render as plain text with no broken link. That is acceptable to
ship; a broken link is not.

---

# §3 THE MERGE

**Only run this section if §1 and §2 come back clean, and after I say go.**

Nothing in this sprint has been committed yet across sprints 12 to 24. That is a
lot of work sitting in a dirty working tree.

```bash
# 1. Confirm where we are and what is uncommitted
git branch --show-current          # expect: site-refresh
git status

# 2. Stage and commit everything on site-refresh
git add -A
git commit -m "Rebuild CPKC case study, About, Experience, home and footer

CPKC case study restructured as four workstreams with a scroll-linked
hand-drawn train. About, Experience, home grid and footer rebuilt.
Footer gains a colour-it-in canvas over the cityscape sketch.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01PFfWRqXwEtm54fuMxvPvt9"

# 3. Bring main up to date and merge
git checkout main
git pull origin main
git merge site-refresh --no-ff -m "Merge site-refresh into main

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01PFfWRqXwEtm54fuMxvPvt9"

# 4. Build from main before pushing
npm run build

# 5. Push
git push origin main
```

**If the merge reports conflicts, stop and report them. Do not resolve them.**
`main` has not moved much, but `cpkc-rewrite` sits between `main` and
`site-refresh` and may complicate it.

**If `npm run build` fails at step 4, stop.** Do not push. Report the error.

After pushing, report the commit SHA on `main` and confirm Vercel picked it up.

---

# §4 AFTER THE PUSH, REPORT ONLY

Things known outstanding that are not blocking. List their current status so I
know what is live:

1. `/falcon` vs `/projects/falcon` duplicate
2. CPKC rail reads `July 2025 - Present`; LinkedIn shows the current term
   starting August 2026
3. Section headings behind the train band
4. `DesignWith Lab` and `Samdisha Bagga` unlinked
5. Anything from §1 that came back non-empty
