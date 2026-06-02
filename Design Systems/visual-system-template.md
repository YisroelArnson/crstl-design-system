# Visual System Template

*A reusable framework for building a high-quality visual language — the graphics, illustrations, icons, effects, and framing that sit on top of your design tokens — distilled from teardowns of Linear, Mastra, and Supabase.*

The design-system template covered the **materials** (color, type, spacing, motion tokens). This one covers what gets **built** out of them: hero imagery, product illustrations, icons, effect primitives, framing devices, and motion-as-graphic.

This is not a finished visual system. It is the skeleton of one. Each module has two halves:

1. **The thinking** — what the module is, the pro tips from the reference systems, what to know, what to watch for, and how to plan it.
2. **The boilerplate** — templated code with *structure and names only* (class names, the shape of a mask, the parameters of a frame). No real colors, sizes, or path data — you supply those from your design tokens.

> **The deepest lesson, up front:** a great visual identity is **a small set of constraints, ruthlessly applied** — not a pile of one-off illustrations. Supabase could redraw their entire illustration library tomorrow and it would still look unmistakably like Supabase, because the *rules*, not the pictures, are the brand. And the single highest-leverage rule of all: **graphics are drawn from the UI's own design tokens, never a separate art palette.**

Build the modules roughly in this order: **Thesis → Tier map → Token-sharing rule → the specific tiers (hero / illustrations / icons / logo wall / framing) → Effect primitives → Motion → Architecture.**

---

## Module 0 — The Visual Thesis

### What this module is

One emotional sentence that generates every graphic, exactly like the design-system thesis generates every token. Supabase's is "precision engineering glowing in the dark"; from it fall three generative rules — *draw in monochrome line-art on a grid, add exactly one accent color as light, dissolve every edge into the background.* Once you see the thesis, the whole site reads as variations on one theme.

### Pro tips from the reference systems

- **Pick one emotional thesis and let it generate everything.** A thesis is what turns assets into a *system*. Each reference site has exactly one.
- **Reduce the thesis to ~3 generative rules** you can apply to any new graphic ("monochrome / one accent / dissolved edges"). New graphic? Run it through the three rules.
- **The visual thesis should rhyme with the product's nature.** A database → blueprint/grid/schema feeling. An agent framework → organic, neural, "alive" connectors. Decide what the abstraction *feels* like.

### Things to know

- The visual thesis and the design-system thesis are siblings — they should agree, not just coexist.
- The thesis is most powerful when it doubles as a layout and color rule, not just a mood.

### How to develop & plan it

Write one sentence for how the product's abstraction should *feel*. Reduce it to three generative rules covering structure, color, and edges. Pin them above every visual module.

### Boilerplate

```
VISUAL THESIS:  "The product should feel like ____________________."

GENERATIVE RULE 1 — STRUCTURE:  ______________  (e.g. line-art on a grid)
GENERATIVE RULE 2 — COLOR:      ______________  (e.g. mono art, one accent as light)
GENERATIVE RULE 3 — EDGES:      ______________  (e.g. dissolve every edge to bg)
```

---

## Module 1 — The Tier Map

### What this module is

A ranking of every kind of graphic you make, ordered by how much attention it's allowed to claim — and the rule that **color intensity decreases as you go down the tiers.** Most inconsistency comes from treating every graphic as a one-off; the tier map prevents that.

### Pro tips from the reference systems

- **Define 4–5 tiers and give each explicit rules** (Mastra): hero → product illustrations → icons → logo wall → framing. Each tier has its own color behavior and constraints.
- **Spend color like a budget.** Let exactly one element (the hero) be loud; ration intensity downward. Spectrum-rich hero → single-accent illustrations → mostly-gray icons → monochrome logos → colorless framing. The accents stay meaningful because they're spent so carefully.
- **The lowest tier (framing) is never allowed to use color** — it's always the quietest thing on screen, so the content inside it can carry the meaning.

### Things to know

- Recognizing the tiers is the key to the whole system: each tier has different rules, and knowing which tier a graphic is in tells you how much color and detail it gets.
- Attention is rationed exactly like accent color is — they're the same budget.

### How to develop & plan it

List your categories of visual. Rank them by attention. Assign each a color behavior (full spectrum → none) and a detail budget. Write the rules down; treat them as law.

### Boilerplate

```
TIER 1 · HERO          → role: sell the whole product   → color: full accent spectrum
TIER 2 · ILLUSTRATIONS → role: show individual features  → color: tokens + ONE accent
TIER 3 · ICONS         → role: label & navigate          → color: single gray / one accent
TIER 4 · LOGO WALL     → role: social proof              → color: muted monochrome → hover
TIER 5 · FRAMING       → role: hold everything together  → color: structural grays ONLY

RULE: color intensity strictly decreases tier 1 → tier 5.
```

---

## Module 2 — The Token-Sharing Rule

### What this module is

The single most important structural decision in a visual system: **illustrations and graphics share the UI's design tokens — there is no separate art palette.** The green in a chart bar is the *same* token as the UI's brand green; the card surfaces are the *same* elevation tokens.

### Pro tips from the reference systems

- **Pull every fill and stroke from the same variables the interface uses.** This is the single highest-leverage decision for coherence. A site full of varied graphics still feels unified because there's one vocabulary and the illustrations speak it too.
- **Draw structure in your border color.** A faint grid drawn at sub-pixel weight in your *border* token makes abstract tech feel measured — the grid isn't bolted on, it's the same neutral as every UI border.
- **If a token changes, the art changes with it.** Because graphics reference tokens, the illustration library auto-matches a rebrand for free.

### Things to know

- This is more work than dropping in stock art or screenshots, but it's the difference between graphics that feel bolted-on and ones that feel like an extension of the app.
- It applies to *everything drawn*: hero, illustrations, icons, grids, even the syntax colors in code screenshots.

### Things to keep in mind

- The temptation is to let a designer pick "nicer" colors for an illustration. Resist it — every off-token color is a coherence leak.

### How to develop & plan it

Before drawing anything, expose your design tokens to the drawing environment (CSS variables, an exported palette file, or a Figma library). Forbid raw hex in any asset. Audit finished assets against the token list.

### Boilerplate

```
ART PALETTE = DESIGN-SYSTEM PALETTE. (no separate set.)

structural strokes  →  var(--border-*)      (the grid, outlines)
art surfaces        →  var(--bg-level-*)     (panels, recesses, raised fills)
art text/labels     →  var(--text-*)         (the same gray ladder as UI)
the one signal      →  var(--accent)         (applied sparingly, on top)

FORBIDDEN in any asset: a literal hex that isn't a token.
```

---

## Module 3 — Tier 1: The Hero

### What this module is

The single most important graphic — the one image that *is* your product, abstracted. Not a screenshot: an abstraction that shows your whole surface area at once and never goes out of date.

### Pro tips from the reference systems

- **Find one master image that *is* your product** (Mastra's "capability constellation" maps the whole framework in one picture). Ask: "what single image shows everything we do at once?" — and avoid the default screenshot. A screenshot ages, is hard to read at a glance, and shows only one feature.
- **Make color the information architecture.** Each feature node gets a *different* accent from your named palette, and those same colors reappear next to those same features throughout the site — so color quietly teaches the taxonomy. The hero becomes a legend.
- **Match the connector metaphor to the product.** Gooey/metaball connectors read "organic, alive, neural" (an agent network); a grid reads "measured, schema" (a database). Straight flowchart lines read "boring." Choose deliberately.
- **Light with one soft source, not hard shadows.** A single off-center radial gradient gives the whole composition depth — the same lightness-as-depth logic as the dark UI.
- **Keep path counts low.** A rich hero built from few, large, smooth shapes (not fussy detail) stays crisp and light to ship.

### Things to know

- The hero is the one place full-spectrum color is allowed. It earns it by being singular.
- Animation can live here (an animated agent figure, a breathing logo) while the rest of the page stays calm.

### Things to keep in mind

- The hero must still be drawn from tokens — its accents are your *named* palette doing double duty as a legend, not free-chosen colors.

### How to develop & plan it

Decide the one abstraction that captures your whole product. Lay out its parts (nodes/regions). Assign each part a named accent that will recur beside that feature elsewhere. Pick a connector metaphor that matches the product's nature. Light with one soft radial source. Keep the geometry to few large shapes.

### Boilerplate

```svg
<!-- HERO · the master abstraction of the whole product -->
<svg viewBox="0 0 <W> 0 <H>" fill="none">

  <!-- ONE soft light source: lightness = depth, no hard shadow -->
  <radialGradient id="hero-light"> <!-- off-center, fades to transparent --> </radialGradient>

  <!-- central hub -->
  <g id="hub"> <!-- few large smooth shapes --> </g>

  <!-- connectors: choose metaphor (gooey/metaball = alive | grid = schema) -->
  <g id="connectors" stroke="var(--border-default)"> ... </g>

  <!-- feature nodes: each carries a DIFFERENT named accent = a legend -->
  <g id="node-A" data-feature="..." > <!-- icon in var(--accent-1) --> </g>
  <g id="node-B" data-feature="..." > <!-- icon in var(--accent-2) --> </g>
  <!-- …color = information architecture; reused beside each feature elsewhere -->

</svg>
<!-- optional: an animated figure on top (own keyframe), rest of page stays calm -->
```

---

## Module 4 — Tier 2: Product Illustrations

### What this module is

Stylized, hand-built SVG fragments of your own product UI — "re-draw your product in your own tokens" — following one strict repeatable recipe so a set of different screens still feels like a set.

### Pro tips from the reference systems

- **"Illustration" = re-drawing your product in your own design tokens**, not exporting a screenshot. SVG built from tokens is resolution-independent, tiny to ship, auto-matches the brand, and can show *idealized demo data* (clean names, believable latencies, realistic commit hashes) a screenshot could never guarantee.
- **Pick one unifying technique and apply it to every illustration** (Mastra's fade-to-bottom mask + top-left anchor; Supabase's dissolve-to-background). One repeated move turns separate drawings into a set.
- **Anchor content top-left, bleed off the right and bottom.** This implies "there's more here than we're showing" and lets the illustration sit in a frame without fake browser chrome.
- **Tokens for everything structural; one accent for the "signal."** The chrome (text, labels, surfaces, borders) is pure gray ladder; one feature-appropriate accent carries the meaning (a green progress bar, a status pill).
- **State = more detail revealed, not a different color** (Supabase). An "active" illustration lights up *more lines*, staying grayscale; the colored glow is a separate overlay layer, not part of the art.
- **Two graphic registers, one palette:** diagrammatic line-art for *explaining* concepts, and framed/glassy UI for *showing* the real product. Shared neutrals + one accent keep them a family.

### Things to know

- Each illustration is "a cropped window into a fake-but-believable product UI" — real-looking but pixel-perfect because it's hand-built.
- Theme support is an asset-layer cost: hand-tuned grayscale art can't just be CSS-inverted, so dark and light each get a purpose-drawn file, swapped by theme via a predictable filename convention.

### Things to keep in mind

- The unifying technique is what makes the set cohere — don't let one illustration skip it.

### How to develop & plan it

Define the one recipe (anchor + bleed + unifying edge treatment + token chrome + single accent). Choose your unifying technique. Decide the demo data conventions. Author dark/light pairs with a predictable `{name}-{state}-{theme}` filename scheme. Pick which features are line-art vs. framed-UI register.

### Boilerplate

```svg
<!-- PRODUCT ILLUSTRATION · re-drawn UI fragment, one strict recipe -->
<svg viewBox="0 0 <W> <H>" fill="none">

  <!-- 1. content anchored top-left, bleeding off right + bottom -->
  <g id="ui-fragment">
    <!-- chrome = pure token grays -->
    <rect fill="var(--bg-level-2)"  /> <!-- surface -->
    <text fill="var(--text-secondary)">…</text>
    <line stroke="var(--border-muted)" /> <!-- structural hairline -->

    <!-- 2. exactly ONE accent carries the signal -->
    <rect fill="var(--accent)" />   <!-- e.g. progress bar / status pill -->
  </g>

  <!-- 3. the UNIFYING technique: fade content into bg at the edge -->
  <mask id="fade-bottom"> <!-- transparent → opaque gradient --> </mask>
</svg>

<!-- STATE = more detail, not more color: ship a second file -->
<!--   {name}.svg            (resting,  ~few elements)            -->
<!--   {name}-active.svg     (active,   ~3× elements, STILL gray) -->
<!-- THEME pairs, drawn (not inverted):                          -->
<!--   {name}-{state}-dark.svg   /   {name}-{state}-light.svg     -->
```

---

## Module 5 — Tier 3: The Icon System

### What this module is

The strictest module, because icons appear most often and the eye catches a mismatched stroke weight instantly. It's a set of constraints you *never* break: one grid, one stroke weight, one cap style, one color at a time.

### Pro tips from the reference systems

- **One grid, one stroke weight, one cap style, one color at a time** — never deviate. Icon consistency is read as overall product quality; mixing filled + outline + different weights is one of the fastest ways to look amateur.
- **Outline / stroked, not filled**, with rounded caps and joins, `fill: none`. Same "drawn with a fine technical pen" feel as the line-art illustrations.
- **Stroke in `currentColor`** so an icon inherits whatever text color its container uses — gray by default, accent when it's an accent — for free.
- **No fixed size or color baked into the file** beyond the viewBox. It's "just geometry and a stroke."
- **The hero's feature-node icons are the same icon language, just colored** — even the showpiece is built from the humble icon system.

### Things to know

- Common choices: a 18×18 or 24×24 viewBox, 1.5–2px stroke. Pick one grid and one weight and hold them across the entire set.
- Adopting an existing set (Lucide) is fine — the discipline is in not mixing it with anything else.

### How to develop & plan it

Fix the viewBox, stroke width, cap/join style, and the "single color via currentColor" rule. Either draw to those constraints or adopt one set that already meets them. Audit every icon against the four constraints before shipping.

### Boilerplate

```svg
<!-- ICON · constraints you never break -->
<svg viewBox="0 0 <GRID> <GRID>" fill="none">    <!-- ONE grid size      -->
  <path
    stroke="currentColor"                        <!-- inherits text color -->
    stroke-width="<W>"                            <!-- ONE weight everywhere-->
    stroke-linecap="round"                        <!-- ONE cap style       -->
    stroke-linejoin="round"                       <!-- ONE join style      -->
    d="…" />                                      <!-- just geometry       -->
</svg>

<!-- RULES (never violate): one grid · one stroke · round caps · fill none -->
<!-- color comes from context (gray at rest, accent when accented)         -->
```

---

## Module 6 — Tier 4: The Logo Wall

### What this module is

Social proof engineered to be *calm* — height-normalized, muted, hover-revealed customer logos that read as one texture rather than a ransom note of mismatched marks.

### Pro tips from the reference systems

- **Size-normalize to a fixed render *height*, width auto.** Real logos come in wildly different proportions; forcing a common height (not width) is the trick that makes a row look balanced.
- **Render muted/monochrome at rest, brighten on hover.** At rest the wall is quiet; interaction reveals it. No single brand shouts.
- **If it scrolls (marquee), pause on hover/focus and respect `prefers-reduced-motion`.** The reduced-motion handling is the kind of craft that signals the whole site was built by people who care.
- **Edge-mask the strip** so logos fade in/out at the sides rather than popping (same dissolve-to-background rule as everywhere else).

### Things to know

- Social proof works best when it's calm. Desaturating and height-normalizing makes the wall read as one texture.
- All logos should be SVG and monochromed to a single neutral token.

### How to develop & plan it

Normalize all marks to one render height. Set a muted monochrome rest state and a brighten-on-hover. If scrolling, add pause-on-hover, reduced-motion fallback, and side edge-masks.

### Boilerplate

```html
<!-- LOGO WALL · calm social proof -->
<div class="logo-wall"
     style="mask-image: linear-gradient(to right,
            transparent, black 10%, black 90%, transparent);"> <!-- edge fade -->
  <div class="logo-track">  <!-- duplicate content for seamless loop -->
    <img class="logo" src="brand.svg"/>   <!-- SVG, monochromed -->
    <!-- … -->
  </div>
</div>

<style>
  .logo        { height: var(--logo-height); width: auto;          /* normalize HEIGHT */
                 color: var(--text-tertiary); opacity: <muted>; }  /* muted rest state  */
  .logo:hover  { opacity: 1; }                                     /* brighten on hover */
  .logo-track  { animation: marquee <dur> linear infinite; }
  .logo-wall:hover .logo-track { animation-play-state: paused; }   /* pause on hover    */
  @media (prefers-reduced-motion: reduce) { .logo-track { animation: none; } }
</style>
```

---

## Module 7 — Tier 5: Framing & Grid

### What this module is

The connective tissue — a visible grid and section frames that make a scrolling page feel like one designed object rather than a stack of sections. The lowest tier: it uses structural grays only, never color.

### Pro tips from the reference systems

- **A page needs "a grid you can see" to feel intentional.** A faint structural grid (drawn in your border color at sub-pixel weight) signals measurement and gives every element something to align to. Fade it out so it whispers.
- **The frame is never allowed to use color** — it's always the quietest thing on screen, which is what lets the content inside carry the color.
- **Consider a parametric framing motif as a signature** (Mastra's "antigrid" stage shells with `+` corner marks). Owning one memorable, repeatable structural motif is how a site becomes recognizable — and it pays off most when it's *parametric* (driven by a handful of variables with mobile→desktop pairs), so it scales responsively for free.
- **Draw frames as SVG paths, not CSS borders**, when corners must be mathematically exact or do tricks a border can't (an inverse-overhang where one section's frame bleeds into the next).
- **Two graphic registers can coexist:** flat illustration framing for concepts, and soft `rounded + border + shadow/ring` elevation for product screenshots. Both share the neutral palette.
- **The macro grid is the same idea as the micro grid:** a 12-column layout grid is the page-scale version of the 14px grid inside the illustrations. Everything snaps to a column rhythm; gaps come from spacing tokens so even whitespace is on-system.

### Things to know

- Corner marks (`+` / curves) are purely decorative and structurally meaningless — but essential to the brand feeling. They're the "blueprint / circuit-board" tell.
- Framing in structural grays is what keeps it recessive.

### How to develop & plan it

Pick a micro-grid unit and draw it in your border token at sub-pixel weight, faded. Decide whether you have a signature parametric frame; if so, define its driving variables with responsive pairs. Choose SVG-path frames where corners must be exact. Define the macro column grid and tie gaps to spacing tokens.

### Boilerplate

```css
/* ── PARAMETRIC FRAME (a signature motif, driven by a few vars) ───── */
:root {
  --frame-corner-radius:  /* base corner radius            */;
  --frame-corner-joint:   /* rounded joint where edges meet*/;
  --frame-grid-gap:       /* gap between grid cells         */;
  --frame-inset:          /* inset of the frame             */;
  --frame-shell-radius:   /* outer shell radius             */;
}
@media (min-width: /* breakpoint */) {        /* responsive pairs */
  :root { --frame-corner-radius: /* larger */; --frame-inset: /* larger */; }
}
```

```svg
<!-- micro-grid substrate: structural color, sub-pixel, faded out -->
<svg><path stroke="var(--border-default)" stroke-width="0.5"
           d="<vertical+horizontal rules every N px>"/></svg>

<!-- stage shell: SVG path so corners are exact; grays ONLY, never accent -->
<svg><path fill="var(--bg-level-1)" stroke="var(--border-muted)" d="<shell path>"/>
     <!-- decorative + corner marks, offset by --frame-grid-gap --> </svg>
```

```html
<!-- macro grid: everything snaps to columns; gaps from spacing tokens -->
<div class="grid grid-cols-12" style="gap: var(--space-md);"> … </div>
```

---

## Module 8 — Effect Primitives

### What this module is

A small library of named, reusable effect techniques applied everywhere — *not* hand-painted per page. Linear's entire shimmering, glassy, grainy site runs on ~6 reusable primitives, each solving a specific perceptual problem (banding, clipping, flatness, depth).

### Pro tips from the reference systems

- **Build a small library of effect primitives, not per-page effects.** Name them, tokenize them, apply them everywhere. This is "the system behind the graphics."
- **Edge-fade masks, don't clip** (the most-used technique on the reference sites — ~90×). A `mask-image` linear-gradient fading edges to transparent makes content feel like it *continues beyond view* rather than being clipped. The difference between a window and a box.
- **Film grain to humanize dark UIs.** A tiled small noise PNG at low opacity + `mix-blend-mode: overlay`, faded in after load, kills color banding on cheap/OLED screens and adds analog warmth. One of the highest-impact, lowest-effort moves for a dark theme.
- **Express depth with light, not shadow.** Gradient borders (lit top-left, simulating a soft light catching a raised edge) + a ~1% white surface wash + lighter-elevation backgrounds together replace drop shadows entirely in dark mode.
- **Glass / backdrop blur with over-saturation.** `backdrop-filter: blur() saturate(180%)` — frosted glass naturally desaturates, so you over-saturate to compensate, keeping color vivid through the blur.
- **Dissolve edges into the *real background token*, never a hardcoded color** (Supabase) — so the fade is perfect in both themes and the graphic feels *emitted by* the page.
- **Shimmer/sweep sparingly** — a gradient clipped to text (`background-clip: text`) with an animated position, on a single hero phrase, never everywhere.

### Things to know

- Each primitive solves a named perceptual problem: masks→clipping, grain→banding, gradient borders/washes→flatness & depth, blur→layering.
- The meta-point: none of these are invented per page. They're a handful of primitives, reused systematically.

### How to develop & plan it

List the perceptual problems your aesthetic has (banding on dark, hard clipped edges, flat panels, layering). Build one named primitive per problem. Tokenize their parameters. Apply them by class everywhere; never re-invent per section.

### Boilerplate

```css
/* a. EDGE-FADE MASK — "continues beyond view," not "clipped" -------- */
.fade-y { mask-image: linear-gradient(180deg, transparent, black 15%,
                                       black 85%, transparent); }
.fade-x { mask-image: linear-gradient(90deg, transparent, black 10%,
                                       black 90%, transparent); }

/* b. FILM GRAIN — kills banding, adds warmth on dark ---------------- */
.grain { background-image: url(<noise-tile.png>); background-size: <N> <N>;
         opacity: <low>; mix-blend-mode: overlay; pointer-events: none;
         animation: fade-in <dur> ease-out <delay> both; }

/* c. GLASS — frosted, over-saturated to keep color vivid ------------ */
.glass { backdrop-filter: blur(var(--blur-lg)) saturate(180%); }

/* d. GRADIENT BORDER — lit top-left = depth without shadow ---------- */
.gradient-border::before {
  content:""; position:absolute; inset:0; padding:1px; border-radius:inherit;
  background: linear-gradient(to bottom right, var(--edge-lit), var(--edge-dim));
  -webkit-mask: <fill-then-cutout mask to leave only the border>;
}

/* e. SURFACE MICRO-GRADIENT — ~1% wash kills "flatness" ------------- */
.surface { background: linear-gradient(180deg, var(--sheen-1pct), transparent),
                       var(--bg-level-2); }

/* f. SHIMMER TEXT — sparing hero accent ---------------------------- */
.shimmer { background: <gradient>; background-clip: text; color: transparent;
           animation: sweep <dur> linear infinite; }

/* DISSOLVE always ends on the REAL bg token, never a hardcoded color: */
.dissolve { background: linear-gradient(to top, transparent, hsl(var(--bg-base))); }
```

---

## Module 9 — Motion & Code-as-Imagery

### What this module is

Two finishing modules. **Motion** treated as a visual element governed by tokens (not garnish). And, for developer products, **code shown as hero imagery** — syntax-highlighted, window-framed, given the same care as a photograph.

### Pro tips from the reference systems

- **Motion is part of the visual system, not garnish.** Standardize a couple of easing curves and a 0.1–0.3s duration band, then apply them everywhere — the same way you standardize color. Consistent timing is what makes motion "feel like one hand drew it."
- **Monochrome + motion beats color + static.** A gray dotted line that *travels* (a `stroke-dasharray` animated along a path) communicates "realtime data" more honestly than a bright static arrow. Reserve the expensive trick (animation) for the concept you most want to sell.
- **Live in the showpiece, calm elsewhere.** Animate the hero (a moving agent figure, a breathing logo); keep the rest of the page still.
- **Treat code as a first-class graphic** for dev products. Render syntax-highlighted, window-framed code with its own color tokens, same `rounded + border + dark surface` treatment as other UI graphics. The message: the product is something you talk to in code, so code is shown as beautifully as a photo on a consumer site.

### Things to know

- The same two-or-three named easing curves from your motion tokens drive both UI transitions and graphic animation — one source of timing.
- Code-block coloring is itself a token set (`--code-*` / syntax tokens) — even code rendering goes through the system.

### How to develop & plan it

Reuse the design system's motion tokens for all graphic animation. Pick the one concept worth animating (data flow, the hero figure) and reserve motion for it. For dev products, build a window-framed code block with tokenized syntax colors.

### Boilerplate

```css
/* MOTION as a graphic — reuse the SAME tokens as UI motion --------- */
.flow-line { stroke: var(--text-tertiary); stroke-dasharray: <dash gap>;
             animation: travel <dur> linear infinite; }   /* dashes carry "packets" */
.marquee   { animation: marquee <dur> linear infinite var(--ease-out); }
@media (prefers-reduced-motion: reduce) { * { animation: none; } }
```

```html
<!-- CODE AS HERO IMAGERY (developer products) -->
<figure class="code-window"   <!-- rounded + border + dark surface, like other graphics -->
        style="border-radius: var(--radius-lg);
               border: 1px solid hsl(var(--border-default));
               background: hsl(var(--bg-level-1));">
  <pre><code><!-- syntax colored via --token-* / --code-* tokens --></code></pre>
</figure>
```

---

## Module 10 — The Architecture That Makes It Cohere

### What this module is

The structural reason the marketing site and the product feel like the same object: three layers stacking from tokens to components, with no translation layer where consistency could leak.

### Pro tips from the reference systems

- **Tokens → atomic utilities → named component modules.** Tokens are the vocabulary; atomic CSS guarantees two components styling the same property produce the same output (zero drift); component modules compose them into reusable, namespaced parts.
- **There is no separate "marketing design language."** The graphics on the website *are* the product, rendered in the product's own design system — same tokens, same components, same fonts. That's why the site feels like a tool, not an ad for one. The throughline of every illustration style is "the product, slightly abstracted."
- **Let brand and structure be the same decision** (Linear's `FIG / X.0` numbered section labels are simultaneously a personality *and* a reusable page skeleton). Find a framing device that doubles as a layout system.
- **Treat your real UI as your best marketing asset.** Build product mockups as live, scaled DOM (a real component at full size, `transform: scale()`-ed down), not screenshots — sharper on Retina, animatable, re-themes for free, and never goes stale.

### Things to know

- The "live UI" mockup technique (build at full desktop width, scale down) renders at effectively 2× density, so lines stay razor-sharp where a screenshot would look soft — and because it's DOM, it animates and re-themes automatically.
- Consistency becomes the *default* (by construction) instead of something policed in review.

### How to develop & plan it

Layer your system: tokens → atomic utilities → namespaced component modules. Render product mockups as live scaled DOM. Pick a brand framing device (numbered figures, blueprint labels) that doubles as a page skeleton. Ensure marketing and product draw from one token source — no translation layer.

### Boilerplate

```
LAYER 1 · TOKENS              the vocabulary  (--color-*, --radius-*, --speed-*)
            ↓ composed by
LAYER 2 · ATOMIC UTILITIES    one class = one property  (zero drift by construction)
            ↓ composed into
LAYER 3 · COMPONENT MODULES   namespaced, reusable parts ({Block}_{element})

ONE source of truth → marketing + product draw from the same tokens & components.
```

```css
/* LIVE-UI MOCKUP — real component as marketing asset (not a screenshot) */
.mockup-frame {
  min-width: <real-desktop-width>;        /* built at true size  */
  transform-origin: left top;
  transform: scale(<0.5>);                /* then optically scaled down → 2× crisp */
  border-radius: var(--radius-lg);
  border: 1px solid hsl(var(--border-default));
}
.mockup-frame::after {                    /* dissolve the frame edge into the page */
  content:""; position:absolute; inset:0; pointer-events:none;
  background: linear-gradient(90deg, transparent, hsl(var(--bg-base)) 90%);
}

/* BRAND = STRUCTURE: a framing device that doubles as a layout scaffold */
.section-label::before { content: "FIG " counter(fig);  /* or "X.0" numbering */
                         font-family: var(--font-mono); color: var(--text-tertiary); }
```

---

## The build process, in order

1. **Write the visual thesis** — one sentence + three generative rules (structure / color / edges).
2. **Draw the tier map** — rank graphics by attention; color intensity decreases down the tiers.
3. **Lock the token-sharing rule** — art palette = design-system palette; no separate art colors.
4. **Build the hero** — the one image that *is* your product; color as legend; one soft light.
5. **Build the illustration recipe** — re-drawn UI fragments, one unifying edge technique, token chrome + one accent, state = more detail.
6. **Constrain the icons** — one grid, one stroke, one cap, `currentColor`. Never deviate.
7. **Engineer the logo wall** — height-normalized, muted, hover-reveal, reduced-motion aware.
8. **Build the framing** — visible grid in border color, color-free frames, optional parametric signature motif.
9. **Assemble the effect primitives** — masks, grain, glass, gradient borders, surface wash, shimmer — named and reused.
10. **Tokenize motion & code-imagery** — reuse UI motion tokens; window-frame code for dev products.
11. **Layer the architecture** — tokens → atomics → modules; live-UI mockups; brand-as-structure.

---

## The one-screen checklist

| Module | The constraint to impose | The principle |
|---|---|---|
| **Visual thesis** | 1 sentence + 3 generative rules | A thesis turns assets into a system |
| **Tier map** | 4–5 tiers, intensity drops down | Color is an attention budget |
| **Token sharing** | Art palette = UI palette | The #1 lever for coherence |
| **Hero** | One image = the whole product | Abstract it; color = legend |
| **Illustrations** | Re-drawn UI, one unifying technique | State = more detail, not more color |
| **Icons** | One grid / stroke / cap / color | Constraints you never break |
| **Logo wall** | Height-normalized, muted, calm | Social proof should be quiet |
| **Framing** | Visible grid, color-free frames | A grid you can see feels intentional |
| **Effect primitives** | ~6 named, reusable techniques | Not per-page effects |
| **Motion & code** | Reuse motion tokens; frame code | Motion is a visual element |
| **Architecture** | Tokens → atomics → modules | No translation layer to leak through |
| **Overall** | Rules, not pictures, are the brand | A small set of constraints, ruthlessly applied |

---

*This template is a framework, not a finished visual system. Fill the placeholders with assets drawn from your own design tokens, apply each module's rules ruthlessly, and let the constraints — not any individual illustration — be the thing that makes the whole product unmistakably yours.*
