# The Mastra Visual System

*A deep dive into the graphics, illustrations, icons, and visual components on mastra.ai — and the "system" that makes them feel like one coherent thing.*

This is the companion to the design-system breakdown. That document covered the **tokens** (color, type, spacing). This one covers everything **drawn**: the hero centerpiece, the product illustrations, the icon set, the customer-logo wall, and the framing devices. Every asset here was downloaded from the live site and dissected — viewBoxes, path counts, gradients, masks, and the exact hex values inside each file.

The single most important finding up front: **the illustrations are not separate artwork.** They are built from the *same* token palette as the UI. The green in a chart bar is the same `#7AFF78` as the design-system's `--color-ds-green`. The card surfaces are the same `#171717` / `#1A1A1A` elevation tokens. This is the whole secret to why a site full of varied graphics still feels unified — there is one vocabulary, and the illustrations speak it too.

---

## 1. The visual hierarchy — five tiers of graphics

Mastra's visuals sort cleanly into five tiers, ordered from "most attention" to "least." Recognizing the tiers is the key to the system, because each tier has its own rules.

| Tier | What it is | Role | Color behavior |
| --- | --- | --- | --- |
| 1 · **Hero centerpiece** | The radial "capability constellation" | Sell the whole product in one image | Full accent spectrum, glowing |
| 2 · **Product illustrations** | Stylized UI fragments (traces, tables, lists) | Show individual features | Tokens + one feature accent |
| 3 · **Iconography** | 18×18 line icons | Label and navigate | Single gray, or one accent |
| 4 · **Logo wall** | Customer logos | Social proof | Muted monochrome → hover |
| 5 · **Framing devices** | The antigrid stage shells, corner marks | Hold everything together | Structural grays only |

The discipline: **color intensity decreases as you go down the tiers.** The hero is allowed to glow with the entire spectrum. By the time you reach icons and framing, color is nearly gone — just structural gray. Attention is rationed exactly like the accent colors are.

---

## 2. Tier 1 — The hero "capability constellation"

This is the most important graphic on the site, so it earns the most analysis.

**What it is:** a `977 × 834` SVG showing a central hub with organic, blob-like connectors reaching outward to **ten labeled feature nodes** arranged in a rough circle — MCP, RAG, Memory, Workflows, Networks, Observability, Evals, Deployments, Auth, Tools. Each node has its own small icon in its own accent color. A separate animated agent figure (a 590×549 indexed PNG, `hero-agent.png`) sits on top and moves via the `hero-agent` keyframe.

### The construction

- **viewBox `0 0 977 834`** — nearly square, large canvas.
- **34 paths, 5 groups, 4 clip-paths, 1 radial gradient.** The low path count for such a rich image tells you the blobs are few, large, smooth shapes — not fussy detail.
- **The "gooey" connectors** are the signature move. The hub and nodes are joined by metaball-style shapes (bulges that merge where they meet) rather than straight lines. This reads as *organic and alive* — like neurons or mycelium — which is exactly the metaphor for an agent network. Straight connector lines would have read as a boring flowchart.
- **One radial gradient** provides the lighting: `#d9d9d9` at 60% opacity fading to transparent `#737373`, transformed to sit off-center. This is a single soft "light source" that gives the whole constellation depth without any hard shadows — the same lightness-as-depth logic the dark UI uses.

### The color system *is* the information architecture

Here is the cleverest part. Each feature node gets a *different* accent, and those accents aren't random — they're the design-system's named palette doing double duty as a **legend**:

| Feature node | Accent | DS token |
| --- | --- | --- |
| RAG / Memory / MCP | green | `#8ffa78` ≈ `--color-ds-green` |
| Auth / Evals | purple/violet | `#b588fe` / `#cb7eee` = `--color-ds-purple` |
| Observability | pink | `#f56dd2` ≈ `--color-ds-pink` |
| Networks | orange | `#fdac53` = `--color-ds-orange` |
| Deployments | warm yellow | `#d1c760` ≈ `--color-ds-yellow` |

> **The lesson:** the hero isn't decoration, it's a *map of the product*, and color is the indexing system. A developer scanning it absorbs "there are ~10 capabilities, here's roughly how they relate" in one glance — and those same colors will reappear next to those same features throughout the site, so the color quietly teaches you the taxonomy.

### Why a constellation and not a dashboard screenshot

Most dev-tool heroes show a screenshot of the product. Mastra instead shows an *abstraction* of the product. A screenshot ages, is hard to read at a glance, and shows only one feature. The constellation shows the *entire surface area* of the framework, never goes out of date, and turns "we do a lot of things" into a single calm image instead of a wall of bullet points.

---

## 3. Tier 2 — Product illustrations as "stylized UI fragments"

Below the hero sit a series of feature illustrations: `observability.svg`, `deployment.svg`, `scorers.svg`, `datasets.svg`, `iterate-fast.svg`, `authentication.svg`. These follow one strict, repeatable recipe.

### The recipe (every illustration obeys it)

1. **It's a cropped window into a fake-but-believable product UI.** Observability is a trace-waterfall view. Deployment is a deployments list with commit hashes and status pills. Scorers/datasets are data tables with timestamps and JSON. They look like real screens, but they're hand-built SVG — so they're pixel-perfect, infinitely crisp, and contain exactly the right "demo data" to tell the story.
2. **Anchored top-left, bleeding off the right and bottom.** The content starts cleanly at the top-left and runs *off* the edges of the frame. This implies "there's more here than we're showing" and lets the illustration sit inside a stage shell without needing a fake browser chrome.
3. **The fade-to-bottom mask.** *Every single illustration* uses one `<mask>` that fades the content into the background at the bottom edge. The rows don't end — they dissolve. This is the unifying visual signature across all of them, and it's why they feel like a set even though they depict different screens.
4. **Tokens for everything structural, one accent for the "signal."** The chrome (text `#F0F0F0`, labels `#939393`, surfaces `#171717`/`#242424`, borders `#1A1A1A`) is pure design-system gray. Then *one* feature-appropriate accent carries the meaning: green progress bars in observability, green/orange status pills in deployment.

### What this buys them

Because the illustrations are SVG built from tokens (not exported screenshots):

- They're **resolution-independent** and tiny to ship relative to their crispness.
- They **auto-match the brand** — if the green token changed, the illustrations would change with it.
- They can show **idealized demo data** (clean names, realistic latencies like "0.14 ms", believable commit hashes) that a real screenshot could never guarantee.

> **The lesson:** "illustration" here means *re-drawing your own product in your own design tokens*. It's more work than a screenshot, but it's the difference between marketing graphics that feel bolted-on and ones that feel like an extension of the app itself.

---

## 4. Tier 3 — The icon system

Icons are where the system is strictest, because they appear most often.

### The fingerprint

- **viewBox `0 0 18 18`** is the standard UI icon. (On the homepage, 11 icons share this exact box.)
- **`stroke-width: 1.5`**, **`stroke-linecap: round`**, **`stroke-linejoin: round`**, **`fill: none`.** Outline style, not filled. Rounded joints.
- **Single color**, inherited from context — usually `#939393` (main-gray) at rest, brightening to white or an accent on interaction.

The clearest specimen is the tiny `redirect` glyph — the entire file is one path:

```svg
<svg viewBox="0 0 24 24" fill="none">
  <path stroke="#939393" stroke-width="2" stroke-linecap="round"
        stroke-linejoin="round" d="M6.7 17.3 17.3 6.7m0 0v8m0-8h-8"/>
</svg>
```

That's the "open external link" arrow — an arrow pointing to the upper-right. Notice it's *just geometry and a stroke*: no fill, no gradient, no fixed size baked in beyond the viewBox.

> **The lesson:** an icon system is a set of *constraints you never break* — one grid (18×18), one stroke weight (1.5), one cap style (round), one color at a time. Consistency at the icon level is felt as overall polish, because icons are everywhere and the eye catches a mismatched stroke weight instantly. The feature-node icons in the hero are the same line-icon language, just colored — so even the showpiece graphic is built from the humble icon system.

---

## 5. Tier 4 — The customer-logo wall

A subtle, high-craft component that most people never consciously notice.

### How it's engineered

- Logos are **size-normalized to a fixed render height** — `30px` in the static grid, `28px → 32px` (at xl) in the scrolling marquee — with `width: auto`. Real logos come in wildly different proportions; forcing a common *height* (not width) is the trick that makes a row of them look balanced.
- They render in a **muted/monochrome rest state** and **brighten on hover** (`opacity → 0.8`, label color `text-ds-dark-gray → text-ds-main-gray`). At rest the wall is quiet; interaction reveals it.
- The marquee **scrolls continuously** (`animate-logo-marquee`) and — a nice accessibility detail — **pauses on hover/focus** (`group-hover:[animation-play-state:paused]`) and **respects `prefers-reduced-motion`** (`motion-reduce:animate-none`).

> **The lesson:** social proof works best when it's *calm*. By desaturating logos and normalizing their height, no single brand shouts, the wall reads as one texture rather than a ransom note of mismatched marks, and the hover interaction rewards curiosity without demanding attention. The reduced-motion handling is the kind of craft that signals the whole site was built by people who care.

---

## 6. Tier 5 — The framing devices (the antigrid, revisited as visual)

The design-system doc covered the antigrid as *geometry*. As a *visual element*, it's the connective tissue that makes a scrolling page feel like a single designed object rather than a stack of sections.

- **Stage shells:** every major section sits inside an SVG-drawn frame (`.ds-section--stage-shell-path`) with a fill, a near-invisible hairline stroke, and the oversized 30–38px corner radius. Drawing the frame as an SVG path (instead of a CSS border) is what lets the corners be mathematically exact and lets the frame do tricks a border can't, like the inverse-overhang where one section's frame bleeds into the next.
- **Corner marks:** small `+` / curve elements (`anti-grid-curve-top-left`, etc.) sit at the frame corners, offset by exactly the antigrid gap. These are the "blueprint / circuit-board" tells — purely decorative, structurally meaningless, and *essential to the brand feeling*.
- **Color:** framing uses **only structural grays** (`border-antigrid #161616`, surfaces). No accents ever touch the frame. This is what keeps the framing recessive so the content inside it can carry the color.

> **The lesson:** a page needs a "grid you can see" to feel intentional. The antigrid frame is Mastra's, and the rule that keeps it working is that **the frame is never allowed to use color** — it's always the quietest thing on screen.

---

## 7. The four techniques that unify everything

Strip away the specific assets and four repeatable techniques are doing the unifying work. These are the portable part.

### Technique 1 — Draw graphics from UI tokens, not a separate art palette

The illustrations' dominant colors *are* the design tokens (`#7AFF78` appears 65 times across the illustration files; the surface grays dominate the rest). There is no "illustration palette" distinct from the "UI palette." One vocabulary, used everywhere.

### Technique 2 — The fade-to-bottom mask

A single `<mask>` that dissolves content into the background at the bottom edge, used on *every* product illustration. It's the visual rhyme that makes a set of different screens feel related, and it solves a real problem (how to end a cropped UI fragment gracefully without a hard edge).

### Technique 3 — Lightness as depth, even in graphics

The hero's single soft radial gradient, the elevation-by-surface-color in the illustrations — graphics use the same "light = up, no hard shadows" model as the dark UI. Depth is always implied by *value*, never by drop shadows.

### Technique 4 — Color intensity as an attention budget

Spectrum-rich hero → single-accent illustrations → mostly-gray icons → monochrome logos → colorless framing. Color literally fades out as importance decreases. The accents stay meaningful because they're spent so carefully.

---

## 8. How to think about building a visual system like this

A process you can actually follow, distilled from what Mastra did:

1. **Define the tiers first.** Decide your 4–5 categories of visual (hero / illustration / icon / proof / framing) and rank them by attention. Give each tier explicit rules. Most inconsistency comes from treating every graphic as a one-off.
2. **Make graphics share the UI's tokens.** Don't let illustrations have their own palette. Pull every fill and stroke from the same variables the interface uses. This is the single highest-leverage decision for coherence.
3. **Find one master image that *is* your product.** Mastra's constellation maps the whole framework in one abstract picture, and reuses its colors as a legend. Ask: "what single image shows everything we do at once?" — and avoid the default screenshot.
4. **Pick one unifying illustration technique and apply it everywhere.** For Mastra it's the fade-to-bottom mask + top-left anchoring. One repeated move turns separate drawings into a set.
5. **Constrain icons ruthlessly.** One grid, one stroke weight, one cap style, one color at a time. Never break these. Icon consistency is read as overall product quality.
6. **Spend color like a budget.** Let exactly one element (the hero) be loud, and ration intensity downward from there. Restraint is what keeps the loud thing loud.
7. **Put the craft in the small interactions.** Logos that pause on hover and respect reduced motion; frames drawn as exact SVG paths; gooey connectors instead of straight lines. None of it is necessary; all of it is felt.

---

## 9. The one-screen cheat sheet

| Element | Mastra's approach | The principle |
| --- | --- | --- |
| **Hero** | Radial capability constellation, gooey connectors, full spectrum | Abstract your whole product into one image; color = legend |
| **Illustrations** | Hand-built SVG UI fragments, not screenshots | Re-draw your product in your own tokens |
| **Unifying move** | Fade-to-bottom mask + top-left anchor | One repeated technique makes a set |
| **Icons** | 18×18, stroke 1.5, round caps, fill none, one color | Constraints you never break |
| **Logo wall** | Height-normalized, muted, hover-reveal, pause-on-hover | Social proof should be calm |
| **Framing** | SVG stage shells + `+` corner marks, grays only | A visible grid, never colored |
| **Depth** | Single soft gradient / lighter surfaces, no shadows | Lightness = up, even in art |
| **Color overall** | Spectrum → accent → gray → mono → none, by tier | Intensity is an attention budget |
| **Lighting** | One soft radial light source | Implied depth without hard shadows |
| **Motion** | Animated agent, scrolling logos, reduced-motion aware | Life in the showpiece, calm elsewhere |

---

*Sources: mastra.ai production assets — the hero base-layer and agent graphics, the observability / deployment / scorers / datasets / iterate-fast / authentication illustration SVGs, the inline icon set, and the logo-marquee component markup. viewBoxes, element counts, gradient/mask definitions, and hex values were read directly from the downloaded asset files and verified against the design-system tokens.*
