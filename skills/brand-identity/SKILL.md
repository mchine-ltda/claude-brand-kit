---
name: brand-identity
description: "Build a brand from nothing: interview the person with strategic questions about their vision, goals, audience and personality, write the brand strategy, propose visual directions and logo concepts for them to choose, then generate the whole identity — logo files, moodboard, brand strategy PDF, brand guidelines PDF and design tokens — with the brand-kit skill. Use when someone types /brand-identity, or says they want a brand, a logo or an identity but don't have one yet."
argument-hint: "[what the brand is for, if you already know]"
---

# brand-identity

From "I have an idea" to a finished identity, in five stages. The person
makes every real decision; Claude asks, proposes, renders, and builds.

```
1 Interview → 2 Strategy → 3 Visual direction → 4 Logo → 5 Applications → the kit
  questions    brief, ok?    pick 1 of 3          pick 1 of 4   what it appears on
```

Everything is drawn in HTML/CSS/SVG and rendered with the local Chrome by the
**brand-kit** skill's scripts (`~/.claude/skills/brand-kit/`); read its
`SKILL.md` before stage 3. No image generator is used, so every file is the
person's to use.

If the person **already has a brand** (a name, a logo, colours), say so and
use `/brand-kit` instead — this skill is for brands that don't exist yet. A
person with only a name still belongs here.

## Ground rules

- **Ask, don't assume.** Use the `AskUserQuestion` tool for every round of
  questions: at most 4 questions per round, 2–4 options each, the first option
  your recommendation when you have one, "Other" is always available. Free
  answers (a name, a story) can be asked in plain text instead.
- **Short rounds, then a summary.** After each round, reflect back in 2–3
  lines what you heard before the next round, so the person can correct you.
- **Never invent facts** about the business: no made-up clients, numbers,
  awards or history. The strategy states intentions ("we want to…"), not
  achievements.
- **Their words win.** When the person's own phrasing is good, use it in the
  strategy and headlines.
- **One decision at a time.** Show rendered images (Read the PNG, then send it
  with `SendUserFile`) before asking someone to choose between visuals.
- Keep a running `brand-brief.md` in the output folder so a stopped session
  can resume where it left off.

Output folder: `<cwd>/<slug>-brand/` (ask before writing into an existing
folder).

## Stage 1 · Interview (3–4 rounds)

Adapt the wording to the person; skip questions already answered.

**Round 1 · The idea**
- What is it? (a service business · a product · a shop or venue · a personal/creator brand)
- Who is it for, first? (ask them to describe the one customer they most want)
- Where does it live? (a city/region · a country · online, anywhere)
- What stage is it at? (just an idea · launching soon · running, needs a brand · rebranding)

**Round 2 · Vision and goals**
- If this works, what does it look like in 3 years? (one place people love · several locations · a known name in its niche · a product sold widely)
- What problem does it solve for that customer, in their words?
- Why you — what will you do differently from the alternatives they use today?
- What must the brand achieve first? (get found and get the first customers · look premium and justify the price · be trusted fast · stand out in a crowded market)

**Round 3 · Personality**
- Pick 3 words for how it should feel (multiSelect: bold · calm · playful · premium · warm · technical · rebellious · honest · elegant · energetic · local · minimal)
- How should it talk? (straight and plain · warm and friendly · confident and sharp · quiet and refined)
- Brands they admire, in any industry, and one they would never want to look like (plain text)
- Light or dark at heart? (dark and dramatic · light and airy · bold colour-blocked · no preference)

**Round 4 · Specifics**
- The name: do they have one? If not, offer to propose 6–8 (short, sayable, spellable; say what each means; never claim a domain or trademark is free — tell them to check).
- Colours they love or must avoid (plain text, or "no preference")
- Where the brand will be seen most (multiSelect: website · social media · packaging/products · signage/shopfront · uniforms/merch · print)
- Any story, symbol or place that should be in it (plain text, optional)

## Stage 2 · Strategy

Write `brand-strategy.md` in the folder:

- **Purpose** (why it exists, one sentence) · **Vision** (the 3-year picture) · **Mission** (what it does every day)
- **Audience**: the first customer as a short persona — who, what they need, what they use now, what they worry about
- **Positioning statement**: *For [audience] who [need], [Brand] is the [category] that [benefit], because [reason to believe].*
- **Brand promise** (one line) and **three values**, each with what it means in practice
- **Personality** (the three words) and **voice**: 4 "say it like this" / 4 "not like this"
- **Messaging pillars** (3) and **headline options** (3–5): each says who it's for and the outcome — never an empty slogan
- **The name** (chosen, or the shortlist with meanings if still open)

Show a short summary in chat and ask (`AskUserQuestion`): *Approve the strategy · Change something*. Loop until approved.

## Stage 3 · Visual direction

Propose **three distinct directions** that fit the strategy. Each has: a
2–4 word name, one line on the idea, a palette in this pattern — a quiet
**base**, a **light** that is never pure white, an **ink** that is never pure
black, and **one loud accent** (plus the accent darkened to read on the
light) — a type pair (a Google Fonts display sans or serif + an accent face +
a mono), and 3 mood words. Make them genuinely different (e.g. dark and
dramatic / light and editorial / bold colour-blocked).

Fill `~/.claude/skills/brand-kit/templates/directions.html` (its
placeholders are listed at the top of the file) with `scripts/fill.mjs`,
render `#board=directions.png`, Read it, send it, and ask which direction
(options: A, B, C, "mix"). Adjust once if they ask; check every text/background
pair with `scripts/palette.mjs` (aim for 4.5:1 on body text).

## Stage 4 · Logo concepts

Design **four concepts** in the chosen direction, all drawn as SVG/HTML:

1. **Wordmark** — the name in the display face with one distinctive detail (a cut, a joined letter, the accent as a dot or bar)
2. **Monogram** — the initial(s) built from simple geometry, readable at 16 px
3. **Symbol + wordmark** — a mark drawn from the story/place/product in Round 4, beside the name
4. **Emblem/badge** — the name in a shape (good for signage, packaging, stamps)

Every mark is built in a 32 × 32 viewBox with `currentColor` for the main
form and `var(--accent)` for the accent detail, so the kit templates can use
it directly. Keep shapes few and bold; test it at 16 px and at billboard size.

Fill `templates/concepts.html`, render `#board=logo-concepts.png`, Read,
send, and ask which concept (options: 1, 2, 3, 4) and whether to refine
anything. One refinement round, then lock it.

## Stage 5 · The kit

1. Write `brand.json` for the brand-kit templates (copy
   `~/.claude/skills/brand-kit/examples/kiln/brand.json` as the model): the
   chosen palette, fonts (Google Fonts links in `FONT_LINKS`, empty
   `FONT_FACES` unless they have licensed files), the chosen mark as
   `MARK_SVG`, the wordmark as `WORDMARK_HTML`, the headline, and the brand
   book words from the approved strategy (positioning, values, voice).
2. Fill `templates/strategy.html` from `brand-strategy.md` and render
   `<slug>-brand-strategy.pdf` (5 pages).
3. **Applications** — do brand-kit's "Step 2 · Applications": propose what
   the brand appears on from the business (the product itself first, its
   packaging, bag, shop, signage, stationery, uniform…) using the answers to
   "where will the brand be seen most"; the person keeps, removes or adds
   items, or asks for the visual menu; then, if an image tool is connected,
   recommend photo-real (people wearing and using the brand, real places) —
   coded drawings are the fallback. Nothing is drawn until the list is agreed.
4. Run the full **/brand-kit** flow from `brand-kit/SKILL.md` in the same
   folder: logo files, moodboard (slots from the agreed list; no live site
   yet → the drawn phone/laptop screens), brand guidelines PDF with its "In
   use" pages, cover, tokens, README.
5. Check every rendered image before sending (overlaps, clipped words,
   contrast). Then send the strategy PDF, the guidelines PDF and the
   moodboard, and list the folder's files.
6. End with what is still the person's to do: check the name's domain and
   trademark, licence any paid font they chose to swap in, and real photos
   when they have them. Offer `/merch-mockup` if they'll want merch.
