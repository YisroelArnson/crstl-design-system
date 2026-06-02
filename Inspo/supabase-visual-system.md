# The Supabase Visual System — Graphics, Components & Visual Language

*A deep dive into the **visual layer** that sits on top of the design tokens: the illustrations, the grid motifs, the glows, the icons, the framing, and the motion. Everything below was pulled from Supabase's live HTML and their actual SVG assets — the path data, colors, and class names are quoted from production, not reconstructed from memory.*

---

## 0. The thesis: "technical sublime"

Before any individual element, understand the **single idea** the whole visual system serves. Supabase sells a database — an abstract, invisible thing — to developers. Their visual language makes that abstraction feel like **precision engineering glowing in the dark**: a blueprint/graph-paper grid, thin diagrammatic line-art, dotted data-flow connectors, and a single green light source, all dissolving into a near-black void.

Three rules generate almost every graphic on the site:

1. **Draw in monochrome line-art on a grid.** (the "blueprint")
2. **Add exactly one color — the brand green — and only as light/accent.** (the "signal")
3. **Dissolve every edge into the background with a gradient.** (the "void")

Once you see those three moves, the entire site reads as variations on one theme. Let's take them apart.

---

## 1. The substrate: a graph-paper grid

The foundational layer under the product graphics is a literal **grid of fine lines**. The `realtime` illustration, stripped down, is nothing but this:

```xml
<!-- realtime-dark.svg (actual path data) -->
<path stroke="#282828" stroke-width=".5"
      d="M-16.5 -9.6 v457 m14 -457 v457 m14 -457 v457 …   <!-- vertical rules every 14px -->
         M440 .6 H-16 m457 14 H-16 m457 14 H-16 …" />     <!-- horizontal rules every 14px -->
```

A **14px square grid**, drawn at **0.5px** stroke in **`#282828`** — which is exactly their `--border` neutral (a ~16% lightness gray). So the grid isn't a decorative texture bolted on; it's drawn from the *same neutral ramp* as every border in the UI. The graphics and the chrome share a palette.

**Why a grid?** It signals *measurement, structure, schema* — the emotional register of a database. It also gives every other element something to align to, so illustrations feel placed, not floated. **Teaching point:** a faint structural background is the cheapest way to make abstract tech feel rigorous. Pick a grid unit (theirs is 14px), draw it in your border color at sub-pixel weight, fade it out (next section), done.

---

## 2. Connection & flow: the dotted line

The second motif is the **dashed connector**, used to imply data moving between things:

```xml
<!-- data-apis-lines-dark.svg (actual) -->
<path stroke="#707070" stroke-dasharray="1 4" stroke-linecap="round"
      d="M3 393h325 M3 350h325 M3 307h325 …" />   <!-- horizontal dotted rails -->
```

`stroke-dasharray="1 4"` = a 1px dash with a 4px gap → reads as a **dotted line**, in a mid-gray (`#707070`). These are almost always **animated** (their token sheet defines `--animate-line-loading` and marquee/slide keyframes): the dashes travel along the path so the line looks like it's *carrying packets*. Static, it's a wire; animated, it's a live connection.

**Teaching point:** monochrome + motion beats color + static. A gray dotted line that *moves* communicates "realtime data" more honestly than a bright static arrow. Reserve the expensive trick (animation) for the concept you most want to sell.

---

## 3. Monochrome-first art + single-accent color

This is the most important — and most disciplined — rule. The product illustrations (`auth.svg`, `vector.svg`, `edge-functions.svg`, etc.) are drawn entirely in a **tight grayscale ramp**:

| Color | Role in the art |
|-------|-----------------|
| `#171717` | darkest fills (panels, recesses) |
| `#212121` | raised fills |
| `#2e2e2e` | strokes / outlines |
| `#454545` | secondary strokes |
| `#707070` | mid-tone detail |
| `#898989` | lightest fills / labels |
| `#ffffff` | the single highlight |

Notice what's **absent**: green. The brand color is *not in the illustration files*. Instead, green is applied **in the markup, sparingly, as an accent** — across the whole homepage it appears as `bg-brand` (34×), `border-brand` (21×), `text-brand` (15×). Color is a **spotlight**, not a paint job.

You can even watch this discipline in their **state-driven illustrations**. Each interactive product card ships two SVGs — a resting `auth.svg` and an `auth-active.svg`. Diffing them:

- Inactive `auth.svg`: ~6 filled elements.
- Active `auth-active.svg`: ~18 filled elements — **3× more detail revealed**, but *still grayscale*.

So "activation" means *more of the diagram lights up*, not *the diagram turns green*. The green glow that makes it feel alive is a **separate overlay layer**, not part of the art. (See §4.)

**Teaching point — the discipline that makes brands look expensive:** decide that your illustrations are *colorless infrastructure* and your brand color is *energy applied on top*. This is why Supabase can use one green everywhere without it ever feeling garish — 90% of every graphic is gray, so the 10% of green reads as meaningful.

---

## 4. The void: dissolving edges with gradient masks

Supabase graphics almost never have a hard rectangular edge. They **fade into the canvas** using gradient overlays. Two real examples from the homepage, verbatim:

```html
<!-- radial vignette: graphic fades to background at its top -->
class="… bg-[radial-gradient(50%_100%_at_50%_0, transparent 0%, transparent 50%,
                             hsl(var(--background-default)) 100%)]"

<!-- linear fade: bottom of a section melts into the surface color -->
class="visual-overlay … bg-[linear-gradient(to_top, transparent 0%, transparent 50%,
                                            hsl(var(--background-surface-75)) 85%)]"
```

The pattern: an absolutely-positioned, `pointer-events-none` overlay whose gradient goes **transparent → the exact background token**. Because it resolves to `hsl(var(--background-default))`, the fade is *perfect in both themes* — it always melts into whatever the real background is.

Stacked on top of (or beneath) the grayscale art is the **green light source** — a radial "lamp" glow (their markup literally has a `lamp` class) plus `blur` layers. The art is dimmed in dark mode too: the logo/graphic wrappers carry `opacity-90 dark:opacity-70`, so graphics sit *behind* the content rather than competing with it.

**Teaching point:** hard edges make a composite of graphic-on-page look like two separate things glued together. A transparent-to-background gradient makes the graphic feel *emitted by* the page. The trick only works if the gradient's end color is literally your background token — never a hardcoded black.

---

## 5. Theme-paired assets (the asset-naming system)

Every illustration ships as a **`-dark` / `-light` pair**:

```
auth.svg            auth-light.svg
auth-active.svg     auth-active-light.svg
data-apis-dark.svg  data-apis-light.svg
data-apis-lines-dark.svg   data-apis-lines-light.svg
realtime-dark.svg   realtime-light.svg
vector-dark.svg     vector-light.svg
edge-functions-dark.svg    edge-functions-light.svg
```

Because the art is hand-tuned grayscale, they can't just CSS-invert it — dark-mode and light-mode each get a purpose-drawn file, swapped by the theme. This is the **asset-layer cost of supporting two themes well**: tokens flip automatically, but bespoke illustrations must be authored twice. Supabase chose quality over the cheap auto-invert. The consistent `{name}-{state}-{theme}.svg` naming convention is itself part of the system — predictable filenames let the components swap assets declaratively.

---

## 6. The icon system

193 inline SVGs on the homepage resolve to a **single, consistent line-icon set** (Lucide):

| Property | Value | Count (evidence) |
|----------|-------|------------------|
| Grid / viewBox | **24 × 24** | 83 icons at `width="24"` |
| Stroke width | **2px** (a few at 1.5) | 87 at `stroke-width="2"` |
| Style | outline / stroked, `currentColor` | — |

Uniform 24px, 2px-stroke, outline icons are the visual sibling of the thin line-art illustrations — same "drawn with a fine technical pen" feel. Because they're stroked in `currentColor`, an icon inherits whatever text color its container uses (gray by default, green when it's an accent). **Teaching point:** one icon set, one grid size, one stroke weight. Mixing icon styles (filled + outline + different weights) is one of the fastest ways to make a UI look amateur. Pick a set and never deviate.

---

## 7. Framing & elevation

For UI-screenshot-style graphics and cards, the system uses **soft frames and shadow/ring elevation** rather than the flat-illustration treatment:

- `rounded-lg border` (≈60×) — the standard card/panel frame: 8px radius + a 1px border in the border token.
- `shadow-*` (≈128×) and `ring-*` (≈40×) — layered elevation; rings give a crisp 1px halo, shadows give depth.
- `backdrop-blur-xs` on the sticky nav and `backdrop-blur-md` on the announcement pill — **frosted glass** over content scrolling beneath. The announcement pill also uses a hover-reveal gradient: `from-background-surface-100 to-background-surface-300 … opacity-70 group-hover:opacity-100`.

So there are really **two graphic registers** coexisting: (a) **diagrammatic line-art** for explaining concepts, and (b) **framed, elevated, glassy UI** for showing the actual product. Both share the neutral palette and the green accent, which is what keeps them feeling like one family.

---

## 8. Motion as a graphic element

Several "graphics" are really **animations**:

- **The logo wall (marquee).** Customer logos (1Password, Mozilla, GitHub, LangChain, PwC…) — all **SVG, monochromed** — scroll horizontally (`--animate-marquee: marquee 35s linear infinite`). The strip is edge-masked so logos fade in/out at the sides rather than popping:
  ```html
  before:bg-[linear-gradient(to_right, hsl(var(--background-default)) 0%,
             transparent 10%, transparent 90%, hsl(var(--background-default)) 100%)]
  ```
  Same fade-into-the-void rule from §4, applied to motion.
- **Traveling dashes** on the connector lines (§2).
- **Tokenized easing.** Two curves do the work everywhere: `cubic-bezier(.87,0,.13,1)` (decisive, for panels) and `cubic-bezier(.16,1,.3,1)` (soft ease-out, for overlays), at 0.1–0.3s. Consistent timing is what makes the motion feel like one hand drew it.

**Teaching point:** motion is part of the visual system, not garnish. Standardize a couple of easing curves and a duration band, then apply them everywhere — the same way you standardize color.

---

## 9. The layout grid as a visual element

The page itself is built on a **12-column grid** (`grid grid-cols-12`, with responsive `grid-cols-2 → md:grid-cols-12`, and feature grids at `grid-cols-2 md:grid-cols-3 xl:grid-cols-6`). This is invisible but it's the macro-scale version of the 14px micro-grid in the illustrations: **everything snaps to a column rhythm.** The visual order you feel on the page is the layout grid doing its job. Gaps come from the spacing tokens (`gap-4`, `gap-8` = 16/32px), so even whitespace is on-system.

---

## 10. Code as hero imagery

Supabase is a developer product, so **code itself is treated as a first-class graphic**. They use CodeHike (`ch-` classed elements, ≈10× on the homepage) to render syntax-highlighted, window-framed code blocks with their own color tokens (`--code-block-1…5`, `--ch-*`). The code window gets the same `rounded` frame + border + dark surface treatment as other UI graphics. The message: *the product is something you talk to in code*, so code is shown as beautifully as a photograph would be on a consumer site.

---

## 11. The system, distilled (what to steal)

The graphics aren't a pile of one-off illustrations — they're outputs of a small rulebook. If you want a comparably coherent visual language (e.g. for your "Dark Minimal Flat" app or the AI-orb concept), these are the transferable rules, in priority order:

1. **Pick one emotional thesis and let it generate everything.** Theirs is "precision engineering glowing in the dark." Every choice (grid, line-art, single green, void) serves it. A thesis is what turns assets into a *system*.
2. **Draw structure in your border color.** A faint grid/graph-paper layer (their 14px @ `#282828`) makes abstract tech feel measured. Fade it out so it whispers.
3. **Monochrome the art; spotlight with one accent.** Keep illustrations colorless and apply the brand color sparingly *on top* (their 90% gray / 10% green ratio). This is the single biggest lever for looking expensive.
4. **Dissolve edges into the real background token**, never a hardcoded color — so it works in both themes and feels emitted by the page.
5. **State = more detail revealed, not a different color.** Their active illustrations light up *more lines*, staying grayscale.
6. **Author theme variants deliberately.** Tokens auto-flip; bespoke art is drawn twice (`-dark`/`-light`). Predictable filenames make the swap declarative.
7. **One icon set, one size (24px), one stroke (2px), `currentColor`.** Matches the line-art and inherits accent color for free.
8. **Two graphic registers, one palette.** Diagrammatic line-art for *explaining*; framed/glassy UI for *showing*. Shared neutrals + accent keep them a family.
9. **Treat motion and layout as visual elements**, governed by the same kind of tokens as color: 2 easing curves, a 0.1–0.3s band, a 12-col grid, edge-masked marquees.

The deepest lesson is the same one as the token system: **a great visual identity is a small set of constraints, ruthlessly applied.** Supabase could redraw their entire illustration library tomorrow and it would still look unmistakably like Supabase — because the *rules*, not the individual pictures, are the brand.
