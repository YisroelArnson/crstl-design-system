# Linear's Visual System — Components & Graphics

*Part 2: how Linear turns raw tokens into components, mockups, and graphics — and the "system" that keeps a marketing page and the actual product feeling like the same object.*

The previous document covered the **materials** (color, type, spacing, motion tokens). This one covers what gets **built** out of them. Every class name, value, and technique below was pulled from Linear's live production CSS.

The single most important idea up front:

> **Linear has no separate "marketing design language." The graphics on the website are the product, rendered in the product's own design system.** The same tokens, the same components, the same fonts power both. That's why the site feels like a tool and not an ad for one.

---

## 1. The "live UI" technique — the trick behind the mockups

Most SaaS sites show **screenshots** of their app. Linear almost never does. Instead they **rebuild the product interface in live HTML/CSS** and shrink it. The key component is named `Frame`:

```
.Frame_frame {
  min-width: 1200px;              /* built at real desktop size */
  transform-origin: left top;
  transform: scale(.5);           /* then optically halved */
  border-radius: var(--app-radius);
}
.Frame_frameBackground {
  background: #101112;
  border: 1px solid rgba(255,255,255,.08);
}
.Frame_frameWrapper::after {     /* fades the frame edge into the page */
  background: linear-gradient(90deg, rgba(8,9,10,0), rgba(8,9,10,.8));
}
```

**Why build the UI at 1200px and then `scale(.5)` it instead of just designing it small?**

- **Crispness.** A scaled-down real interface renders at effectively 2× density — every line stays razor-sharp on Retina screens, where a screenshot would look soft.
- **It's the real component library.** The classes I found — `IssueView`, `DashboardView`, `ProjectsView`, `InitiativesView`, `CommandMenu`, `Sidebar`, `WorkflowCard`, `SlackIssue` — are recreations (or direct reuse) of actual app components. Build once, use in both places.
- **It can move.** Because it's DOM, not a JPG, those mockups animate: issues reorder, the Codex agent "types," diffs reveal line by line. A screenshot can't do that.
- **It re-themes for free.** Since it's built on the same `--color-*` tokens, the mockup updates automatically when the design system changes. No re-exporting 200 screenshots.

The edge-fade (`frameWrapper::after`) is doing quiet work: it dissolves the bounded 1200px frame into the infinite page background so the UI feels like it extends beyond the viewport rather than sitting in a box.

**Takeaway:** treat your real components as your best marketing assets. Rendering live UI beats screenshots on fidelity, maintainability, and motion.

---

## 2. The component kit

These are the atoms. Notice that every one is **fully tokenized** — sizes are sets of coordinated variables, not one-off values.

### Button — a coordinated size system

Each size isn't just a height; it's a bundle of height + icon size + font size + padding + gap + keyboard-chip size, all moving together:

| Size | Height | Icon | Font | Padding |
|---|---|---|---|---|
| mini | 24px | 12px | 12px | 0 10px |
| small | 32px | 16px | 13px | 0 12px |
| medium | 40px | 16px | 13px | 0 14px |
| default | 40px | 18px | 15px | 0 16px |
| large | 44px | 18px | 16px | 0 20px |

Other details worth stealing:
- **Default radius is `--radius-rounded` (9999px)** — buttons are fully pill-shaped.
- **Built-in `<kbd>` slot.** Buttons can render a keyboard shortcut chip inside them (`--kbd-bg`, `--kbd-size`). The keyboard-first product philosophy is baked into the button component itself.
- **`will-change: transform`** on the active state — they pre-warm the GPU so the press animation never stutters. Performance treated as craft.

### Badge — optical radius scaling

Four sizes, and look at the radii: small **4px**, regular **7px**, large **6px**, xxx-large **12px**. The radius isn't proportional to height — it's *optically* tuned per size so each badge looks equally rounded to the eye. Variants run from `regular` (filled brand indigo) through `secondary`/`tertiary`/`basic` (outline-only, using the graded text + border tokens), up to `business` and enterprise variants that get **colored gradient borders** (more on that next).

### WorkflowCard — content-agnostic interaction

```
.WorkflowCard_card:hover { filter: brightness(110%); }   /* lighten on hover */
.WorkflowCard_card:active { transform: scale(.99); }      /* press down */
.WorkflowCard_card::after {                               /* border drawn on top */
  inset: 0; border: 1px solid var(--color-border-translucent);
}
```

Three lessons in four lines:
- **`brightness(110%)` as a universal hover.** Instead of writing a specific hover color for every card type, one filter brightens whatever is there — works on any background, any content. Trivial to maintain.
- **`scale(.99)` as a universal press.** A tiny shrink reads as a physical button-press regardless of what's inside.
- **Border as `::after` pseudo-element.** Drawing the border in a layer *above* the content lets it use a translucent color and sit cleanly over images/gradients without affecting layout.

### FeatureBento — the grid

The marketing feature sections are a "bento box" grid: a container with an 8px radius and a 1px `--color-border-translucent-strong` border, `overflow: hidden`, subdivided into cards by hairline borders. The hero cell gets the gradient-border treatment. It's the same visual logic as the app's panels — bordered, layered, restrained.

---

## 3. The visual-effect layer — six reusable techniques

This is the "system behind the graphics" you asked about. Linear doesn't hand-paint effects per page; they have a small set of **named, reusable effect primitives** applied everywhere.

### a. Film grain (`GrainCanvas` / `Grain`)

```
.Grain_grain {
  background-image: url(/static/grain-default.png);
  background-size: 256px 256px;     /* a small tile, repeated */
  opacity: .9;
  mix-blend-mode: overlay;          /* blends with whatever's beneath */
}
.GrainCanvas_root {
  animation: fadeIn 2s ease-out 1s both;   /* eases in after load */
  pointer-events: none;
}
```

A 256px noise texture is tiled across surfaces at `mix-blend-mode: overlay` and faded in a second after load. **Why:** pure flat dark gradients can look sterile and show visible color "banding" on cheap screens. A whisper of grain adds analog warmth and hides the banding — the same reason film photographers don't mind grain. It's the one "imperfection" in an otherwise mathematically clean UI, and it's what stops the dark surfaces from feeling like dead pixels.

### b. Edge-fade masks (`mask-image`) — used ~90 times

The most-used technique on the entire site. A CSS mask makes the *edges* of an element fade to transparent:

```
mask-image: linear-gradient(180deg, transparent, black calc(25%), black calc(75%), transparent);
mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
```

Applied to scrolling marquees (logos fade out at both ends), long lists (content dissolves at top/bottom instead of hard-cutting), and the product frames. **Why it matters:** a hard edge says "this content is clipped." A faded edge says "this continues beyond what you can see." It's the difference between a window and a box, and it makes bounded sections feel like glimpses into something larger.

### c. Glass / backdrop blur

```
backdrop-filter: blur(20px);                    /* the sticky header */
backdrop-filter: blur(12px) saturate(180%);     /* frosted panels */
```

The header and floating panels blur whatever scrolls behind them. The `saturate(180%)` is the connoisseur's touch — frosted glass naturally desaturates color, so they over-saturate to compensate, keeping color vivid through the blur. Real frosted glass, simulated correctly.

### d. Gradient borders (`utils_gradientBorder`)

A border that's a gradient instead of a flat color, built with a masked `::before`:

```
--gradientBorder-gradient: linear-gradient(to bottom right, rgba(255,255,255,0.12), rgba(255,255,255,0.04));
--gradientBorder-size: 1px;
```

The default is a **lit top-left edge** (brighter white at top-left, fading to nearly nothing bottom-right) — it simulates a soft light source catching the upper edge of a raised surface. This is the dark-mode equivalent of a highlight; combined with the lighter-background elevation trick from Part 1, it's how a flat dark card reads as a physical object. Premium tiers swap in **colored** gradients (e.g. a purple `#be05ff → #a771ff` for enterprise badges) to signal status.

### e. Shimmer text (`Hero_shine`)

```
@keyframes Hero_shine { 0% { background-position: 0 } to { background-position: 300% } }
/* applied to gradient-clipped text via background-clip: text, 1.8s linear infinite */
```

A gradient is clipped to the shape of the text (`background-clip: text` + transparent fill), then its position animates across — a band of light sweeps through the headline. Used sparingly on a single hero phrase, never everywhere.

### f. Surface micro-gradients

Even "solid" panels often aren't flat:
```
background: linear-gradient(180deg, rgba(255,255,255,.01), transparent), var(--color-bg-level-2);
```
A 1%-opacity white wash over the base color gives a near-imperceptible top-down sheen, like light falling on a surface. You'd never consciously notice it; you'd notice its absence as "flatness."

**The meta-point:** none of these are decorative flourishes invented per page. They're six primitives, each solving a specific perceptual problem (banding, clipping, depth, flatness), reused systematically.

---

## 4. The illustration system

Beyond recreated UI, Linear has **bespoke animated scenes** for specific concepts. In the CSS they're discrete, namespaced modules:

`DiffsIllustration` · `GitHubSyncIllustration` · `SlackCommandIllustration` · `ReviewNotificationsIllustration` · `GitAutomationsIllustration` · `AgentsCmdkIllustration` · `AutopilotIllustration` · `FeatureBentoIllustration` · `DocumentationIllustration`

Each is a self-contained component that builds a little diagram (a Slack message turning into an issue, a GitHub branch syncing, a code diff resolving) out of the **same tokens and components** as everything else. They're not stock illustrations or one-off Figma exports — they're coded scenes, which is why they can animate on scroll and never clash with the UI around them. Partner/agent logos (OpenAI Codex, Cursor, Copilot) appear as **rounded "chips"** — a white logo on a small rounded-square, exactly as the brand guide prescribes for chip contexts.

The throughline: **the illustration style is "the product, slightly abstracted."** There's no separate cute mascot-y illustration world; the graphics are made of issues, panels, avatars, and diffs.

---

## 5. The brand-motif layer — the "technical manual" framing

This is the most distinctive *conceptual* choice on the site, and it's pure system. Linear labels its sections like an **engineering blueprint or scientific figure**:

- Feature pillars are numbered `1.0 Intake`, `2.0 Plan`, `3.0 Build`, `4.0 Diffs`, `5.0 Monitor`, with sub-features `1.1`, `1.2`, `2.1`…
- Diagrams carry `FIG 0.2`, `FIG 0.3` captions, like a textbook.

**Why this works as a system:** the numbering frames the product as something *precise, engineered, and complete* — a system with parts that fit together, not a grab-bag of features. It flatters the audience (developers, who think in versioned, numbered, structured terms) and it gives the design team a rigid, repeatable scaffold: every feature page inherits the same `X.0 / X.1` skeleton. Brand personality and layout structure are the same decision. The monospace font (`Berkeley Mono`) and the grain reinforce the same "precision instrument" feeling.

---

## 6. The architecture that makes it cohere

Three layers stack to produce all of the above:

```
Design tokens          →  Atomic utilities        →  Named component modules
(--color-bg-level-2,      (one class = one CSS        (Button_root, Frame_frame,
 --radius-8, --speed-…)    property, via StyleX)        DiffsIllustration_…)
```

- **Tokens** (Part 1) are the vocabulary.
- **Atomic CSS** — the thousands of `.x6s0dn4`-style classes with the tell-tale `:not(#\#)` specificity hack are **StyleX** (Meta's atomic styling system). Every utility class sets exactly one property (`align-items: center`, `aspect-ratio: 1/1`). This guarantees that two components styling the same property produce the *same* class — zero drift, tiny CSS, and styles that compose predictably.
- **Component modules** (`Button_*`, `Frame_*`, `WorkflowCard_*`) compose atomics and tokens into reusable parts, scoped by hashed class names so nothing leaks.

This is *why* the marketing site and the app are indistinguishable in feel: they're literally drawing from the same token vocabulary and, in many cases, the same components. There is no translation layer where consistency could leak out.

---

## 7. How to think about it / what to steal

1. **Make your real UI your marketing graphic.** Build product mockups as live, scaled DOM (`transform: scale()` a real component), not screenshots. Sharper, animatable, and they never go stale.
2. **Build a small library of effect primitives, not per-page effects.** Linear's entire shimmering, glassy, grainy site runs on ~6 reusable techniques. Name them, tokenize them, apply them everywhere.
3. **Use grain to humanize dark UIs.** A tiled 256px noise PNG at low opacity + `mix-blend-mode: overlay` kills color banding and adds warmth. One of the highest-impact, lowest-effort moves for a dark theme.
4. **Fade edges, don't clip them.** A `mask-image` linear-gradient at the boundary of any scrolling or bounded region makes content feel like it continues. Cheap, and it transforms the felt quality.
5. **Express depth with light, not shadow.** Gradient borders (lit top-left) + a 1% white surface wash + lighter-elevation backgrounds together replace drop shadows entirely in dark mode.
6. **Make interaction feedback content-agnostic.** `filter: brightness(110%)` for hover and `transform: scale(.99)` for press work on *any* component regardless of its contents — one rule, infinite reuse.
7. **Let brand and structure be the same decision.** Linear's `FIG / X.0` numbering is simultaneously a personality and a reusable page skeleton. Find a framing device that doubles as a layout system.
8. **Tokens → atomics → components.** The three-layer architecture is what makes consistency the *default* instead of something you police in review.

---

## Cheat sheet

| Element | Technique | The problem it solves |
|---|---|---|
| Product mockups | Live DOM at 1200px, `scale(.5)` | Crispness + animation + never-stale |
| Cards | `brightness(110%)` hover, `scale(.99)` press | Content-agnostic feedback |
| Borders | `::after`/`::before` pseudo, translucent | Overlay content, use see-through colors |
| Depth | Gradient border (lit top-left) + surface wash | Elevation without shadows in dark mode |
| Dark surfaces | Tiled grain, `mix-blend-mode: overlay` | Kills banding, adds warmth |
| Bounded regions | `mask-image` edge fade | "Continues beyond view" vs. "clipped" |
| Sticky header/panels | `backdrop-filter: blur() saturate(180%)` | Frosted glass with vivid color |
| Hero text | `background-clip: text` + position sweep | Tasteful motion accent |
| Logo carousels | `Marquee` duplicate-content loop, 30s | Seamless infinite scroll |
| Section identity | `FIG / X.0` numbered labels | Brand personality = layout scaffold |
| Whole system | Tokens → StyleX atomics → modules | Consistency by construction |

---

*Sources: linear.app production CSS (component classes, keyframes, effect definitions), linear.app homepage DOM, linear.app/brand. Class names and values quoted directly from the live stylesheet.*
