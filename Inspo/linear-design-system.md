# The Linear Design System

*A reverse-engineered breakdown of linear.app — what the system is, and how to think about building one like it.*

Every value below was pulled from Linear's live production CSS and brand guidelines, not from memory. The point isn't to copy their hex codes — it's to see the *reasoning* underneath them, because that reasoning is portable to any product.

---

## 1. The thesis (read this first)

Most design systems start with components. Linear's starts with a **feeling**: their own brand page says the quality of a product comes from "how [the creators] feel while they're crafting it." The whole system is engineered to produce one sensation — **calm, fast, focused** — and every token is downstream of that.

Three principles drive every decision:

1. **Restraint as a feature.** One accent color. One typeface. A tiny fixed set of sizes, radii, and speeds. Constraint is what makes it feel coherent — you literally cannot make an inconsistent screen because the raw materials don't exist.
2. **Density without clutter.** It's an information-dense tool (issue trackers are basically spreadsheets), so the system leans on a fine-grained gray hierarchy and tight typography to pack information in while keeping it legible.
3. **Speed is a design value.** Fast transitions, no decorative animation. The motion system is tuned so the UI never makes you wait on it.

Everything that follows is the mechanical expression of those three ideas.

---

## 2. Color — the crown jewel

This is the most teachable part of Linear's system, because it solves the single hardest problem in dark UI design.

### The problem with dark mode

In a *light* UI, you show that something floats above the page with a **drop shadow**. In a *dark* UI, shadows are nearly invisible (dark on dark), so you can't use them. Linear's answer:

> **Elevation is expressed through lightness, not shadow.** Surfaces that are "higher" are slightly lighter.

This is why every shadow token in their system literally resolves to nothing:

```
--shadow-none:   0px 0px 0px transparent
--shadow-tiny:   var(--shadow-none)
--shadow-low:    var(--shadow-none)
--shadow-medium: var(--shadow-none)
--shadow-high:   var(--shadow-none)
```

They keep the *names* (so component code can ask for "high elevation") but the *value* is a lighter background instead of a shadow. That's a two-tier token system at work — more on that in §8.

### The background ladder

Instead of one "dark background," there's a stepped ramp. Each step up is a few points lighter:

| Token | Value | Role |
|---|---|---|
| `--color-bg-marketing` | `#010102` | Near-pure black, used only on marketing hero sections for drama |
| `--color-bg-level-0` / `--color-bg-primary` | `#08090a` | The base app canvas |
| `--color-bg-level-1` / `--color-bg-panel` | `#0f1011` | Panels, sidebars |
| `--color-bg-level-2` / `--color-bg-tint` | `#141516` | Cards, raised surfaces |
| `--color-bg-level-3` | `#191a1b` | Highest standard surface |
| `--color-bg-secondary` | `#1c1c1f` | Hover/selected rows |
| `--color-bg-tertiary` | `#232326` | Inputs, deeper wells |
| `--color-bg-quaternary` | `#28282c` | Highest-contrast fills |

**Two lessons here:**

- **It's near-black, never pure black.** `#08090a` instead of `#000000`. Pure black on OLED screens creates harsh, fatiguing contrast and "black smearing" during scroll. A few points of warmth makes it sit comfortably for hours. (Notice the base is `08 09 0a` — R<G<B by one step each, a barely-perceptible cool tint.)
- **The steps are small and many.** The gap between levels is tiny (~5–10 in hex). Subtlety is the point: you should *feel* the layering without consciously seeing it.

### The text ladder (foreground)

Linear uses **solid colors for text hierarchy, not opacity**. This is a deliberate, sophisticated choice.

| Token | Value | Use |
|---|---|---|
| `--color-text-primary` / `--color-fg-primary` | `#f7f8f8` | Headings, primary content (note: *not* pure white) |
| `--color-text-secondary` / `--color-fg-secondary` | `#d0d6e0` | Body text, secondary content |
| `--color-text-tertiary` / `--color-fg-tertiary` | `#8a8f98` | Labels, metadata, placeholders |
| `--color-text-quaternary` / `--color-fg-quaternary` | `#62666d` | Disabled, faintest hints |

**Why solid colors beat opacity:** if you do `rgba(255,255,255,0.5)` for muted text, the actual color it renders depends on whatever is behind it — so the same "muted" text looks different on a card vs. the canvas. By baking in solid values, tertiary gray is *always* `#8a8f98` everywhere, which is what makes the whole UI feel consistent. (They keep a few translucent tokens — `--color-bg-translucent: rgba(255,255,255,0.05)` — but reserve them for fills like hover states where blending is actually desirable.)

Same principle for **borders/lines**, which also come in a graded set: `--color-border-primary: #23252a`, `secondary: #34343a`, `tertiary: #3e3e44`, plus translucent variants for subtle dividers.

### Accent & brand

Restraint is the whole story:

| Token | Value | Notes |
|---|---|---|
| `--color-brand-bg` | `#5e6ad2` | The famous "Linear Indigo." Per their brand guide, reserved mostly for **backgrounds and selection**, not sprayed everywhere |
| `--color-accent` | `#7170ff` | Interactive accent (links, focus) |
| `--color-accent-hover` | `#828fff` | |
| `--color-accent-tint` | `#18182f` | A very dark indigo for subtle accent backgrounds |

Selection states are computed, not hand-picked — a nice craft detail:
```
--color-selection-bg: color-mix(in lch, var(--color-brand-bg), black 10%)
```
`color-mix(in lch, ...)` blends in a *perceptually uniform* color space (LCH), so the darkened indigo stays the same hue rather than drifting muddy. This is the modern, correct way to derive color variants.

### Semantic & sub-brand colors

Status colors are intentionally **desaturated** — informative, never garish:

`red #eb5757` · `green #27a644` · `blue #4ea7fc` · `orange #fc7840` · `yellow #f0bf00` · `teal #00b8cc` · `indigo #5e6ad2`

And each product line gets a signature hue: `plan #68cc58` (green), `build #d4b144` (gold), `security #7a7fad` (slate). This lets marketing sections feel distinct while staying in-family.

---

## 3. Typography

### The typefaces

```
--font-regular:       "Inter Variable", "SF Pro Display", -apple-system, BlinkMacSystemFont, ...
--font-monospace:     "Berkeley Mono", ui-monospace, "SF Mono", "Menlo", monospace
--font-serif-display: "Tiempos Headline", ui-serif, Georgia, ...
--font-emoji:         "Apple Color Emoji", "Segoe UI Emoji", ...
```

- **Inter Variable** for everything UI — chosen because it's a neutral, screen-optimized workhorse with a true variable axis (which they exploit below).
- **Berkeley Mono** for code — a paid, characterful mono that signals "this is a developer tool."
- **Tiempos Headline** (a serif) appears only for editorial display moments. The contrast of a serif against the geometric UI is a deliberate flourish.
- Each `--font-*` is a full **fallback stack** ending in system fonts and `-apple-system`, so the page is readable before the web font loads.

### Custom font weights — a real craft signal

Linear does *not* use the default 400/500/600/700:

```
--font-weight-normal:   400
--font-weight-medium:   510   ← not 500
--font-weight-semibold: 590   ← not 600
--font-weight-bold:     680   ← not 700
```

Because Inter is a *variable* font, you can request any weight on a continuous axis. Linear nudged each weight a little heavier to optically balance against their near-black backgrounds (light text on dark backgrounds appears thinner than it is — a phenomenon called *irradiation*). Dialing medium to 510 and bold to 680 corrects for that. This is the kind of detail nobody notices but everybody feels.

### Two parallel type scales

There's a **body scale** (`--text-*`) and a **heading scale** (`--title-*`), each bundling size + line-height + tracking into one shorthand token.

Body scale (rem-based, so it respects the user's browser font-size setting — an accessibility win):

| Token | Size | Line-height | Letter-spacing |
|---|---|---|---|
| `--text-micro` | 0.75rem (12px) | 1.4 | 0 |
| `--text-tiny` | 0.625rem (10px) | 1.5 | — |
| `--text-mini` | 0.8125rem (13px) | 1.5 | -0.01em |
| `--text-small` | 0.875rem (14px) | 21/14 ≈ 1.5 | -0.013em |
| `--text-regular` | 0.9375rem (15px) | 1.6 | -0.011em |
| `--text-large` | 1.0625rem (17px) | 1.6 | 0 |

Display/title scale runs `--title-1` through `--title-9`, from 1.0625rem up to 4.5rem, all at `--font-weight-semibold`.

**The optical letter-spacing system is the lesson here.** Watch what happens to tracking across sizes:

- Small body text: **near-zero or slightly negative** tracking.
- Regular body: **-0.011em** (slightly tight).
- Large display titles: **-0.022em** (tighter still).

This is intentional optical correction: **big text needs tighter tracking** (letters look too loose when scaled up) and **tiny text needs looser tracking** (letters collide when scaled down). A naive system uses one letter-spacing everywhere; a crafted one varies it by size. Line-height moves the opposite way — looser for reading sizes (1.6), tighter for big display (1.0–1.1).

---

## 4. Spacing & layout

Spacing is **px-based** (deliberately *not* rem — UI chrome shouldn't reflow when a user bumps their font size, only content should):

```
--page-padding-inline:   24px
--page-padding-block:     64px
--page-padding-y:         48px
--homepage-outer-padding: 46px
--homepage-max-width:     calc(1344px + outer-padding * 2)
--grid-columns:           12
```

- A **12-column grid** with a **1344px max content width** — generous but bounded, so lines never get unreadably long on big monitors.
- Padding respects device safe areas: `max(env(safe-area-inset-left), var(--page-padding-inline))` — it grows to clear notches/rounded corners on mobile but never shrinks below the design minimum.
- Spacing values cluster around multiples of 4/8 (a 4px base unit), the near-universal convention that keeps everything aligning to an invisible grid.

---

## 5. Radii

A small fixed ladder, named by their pixel value (refreshingly literal):

```
--radius-4: 4px      --radius-16: 16px     --radius-circle:  50%
--radius-6: 6px      --radius-24: 24px     --radius-rounded: 9999px (pills)
--radius-8: 8px      --radius-32: 32px     --rounded-full:   9999px
--radius-12: 12px
```

Small elements (buttons, inputs, code blocks) use 4–8px; cards and panels use 12–24px; the 9999px tokens make perfect pills and circular avatars. The principle: **a closed set, not arbitrary values.** You pick from the ladder, you never type `border-radius: 7px`.

---

## 6. Motion

### Two speeds

```
--speed-quickTransition:   0.1s    (100ms — direct feedback: hovers, taps, toggles)
--speed-regularTransition: 0.25s   (250ms — larger moves: panels, modals, page state)
--speed-highlightFadeOut:  0.15s
--speed-highlightFadeIn:   0s      (highlights appear instantly, fade out gently)
```

The logic: **anything responding to your direct input must feel instant** (≤100ms reads as "immediate" to the human nervous system), while **larger spatial changes get a touch more time** so you can track what moved. Note the asymmetry on highlights — they appear in 0s (instant acknowledgment) but fade in 0.15s (graceful exit). Appearing fast feels responsive; disappearing fast feels jarring.

### A full easing library

Linear ships the complete Penner easing set as tokens — `--ease-out-quint: cubic-bezier(0.23,1,0.32,1)`, `--ease-in-out-expo: cubic-bezier(1,0,0,1)`, and ~20 others spanning quad → circ → expo, in in/out/in-out variants. Having the whole library as named tokens means a designer picks "ease-out-quint" by name instead of pasting magic bezier numbers — the curve becomes part of the shared vocabulary. In practice, UI overwhelmingly uses **ease-out** curves (fast start, gentle landing), which feel responsive because the motion commits immediately.

---

## 7. Other systematized details

- **Hairline borders:** `--border-hairline: 1px` — one token for the universal thin divider.
- **Focus ring:** a 1px solid ring with a 2px offset (`--focus-ring-width`, `--focus-ring-offset`) — consistent keyboard-accessibility affordance everywhere.
- **Z-index as a named scale:** `--layer-header: 100`, `--layer-command-menu: 650`, `--layer-dialog: 700`, `--layer-context-menu: 1200`, `--layer-debug: 5100`. Stacking order is *designed*, not a pile of `z-index: 9999` hacks. Anyone can see that a context menu (1200) sits above a dialog (700).
- **Syntax-highlighting tokens:** `--token-keyword`, `--token-string`, `--token-comment`, etc. — even code rendering is themed through the system.
- **Scrollbars:** themed at three states (`rgba(255,255,255,0.1 / 0.2 / 0.4)` for rest/hover/active).

---

## 8. The architecture — *how* the system is built

This is the part worth internalizing, because it's the structure that makes everything above maintainable.

### Two-tier tokens (primitive → semantic)

There are **two layers** of variables:

1. **Primitives** — raw, meaningless values: `--color-black: #000`, `--color-indigo: #5e6ad2`, `--radius-8: 8px`.
2. **Semantics** — role-based tokens that *reference* primitives: `--color-bg-primary`, `--color-text-tertiary`, `--shadow-high`.

Components only ever consume **semantic** tokens. They ask for "the primary background," never "near-black." The payoff:

- **Theming is trivial.** A light theme just re-points `--color-bg-primary` from `#08090a` to white; every component updates for free because none of them hardcoded the dark value.
- **Names encode intent.** `--shadow-high` can resolve to a lighter background in dark mode and an actual shadow in light mode — same semantic name, different mechanics per theme.

### Bundled composite tokens

Type tokens bundle three properties into one:
```
--text-regular: var(--text-regular-size)/var(--text-regular-line-height) var(--font-regular)
```
So a component writes `font: var(--text-regular)` and gets size, line-height, *and* family in one shot — impossible to apply a size without its matching line-height. The system makes the correct thing the easy thing.

### Closed sets over open values

Notice there's no `--radius-7`, no `--speed-0.18s`. Every dimension is a **small, closed ladder**. This is the core philosophy: **a design system is a set of constraints, not a set of options.** The constraints are what guarantee consistency — you can't drift if there's nowhere to drift to.

---

## 9. How to think about building your own

Distilled into a process you can actually follow:

1. **Start from a feeling, not a component.** Write one sentence: "Using this should feel ___." Linear's is calm/fast/focused. Every later decision gets checked against that sentence.

2. **Build primitives first, then semantics.** Define your raw palette and scales, then a *separate* layer of role-named tokens pointing at them. Components touch only the role layer. This one move is what makes a system themeable and durable.

3. **Make every scale a closed ladder.** Pick ~4–6 background levels, ~4 text levels, ~6 radii, 2 speeds. Resist "just one more value." Fewer choices = more consistency.

4. **Solve dark mode with lightness, not shadow.** If you go dark: near-black base (not `#000`), a stepped ladder of lighter surfaces for elevation, and solid-color text hierarchy instead of opacity.

5. **Add optical corrections once the basics work.** Tighten letter-spacing as type grows, loosen it as type shrinks; nudge font weights to compensate for light-on-dark thinning. These are the details that separate "fine" from "feels expensive."

6. **Treat motion as vocabulary.** Two speeds (instant feedback vs. spatial transition) and a named easing set. Name your curves so they're shared, not pasted.

7. **Performance is part of the aesthetic.** A 100ms cap on feedback, no gratuitous animation. The system should never be the reason the UI feels slow.

---

## 10. The one-screen cheat sheet

| Dimension | Linear's choice | The principle |
|---|---|---|
| **Base bg** | `#08090a` (near-black) | Never pure black; reduce eye strain |
| **Elevation** | Lighter surfaces, shadows = none | In dark UI, light = up |
| **Text** | 4 solid grays, not opacity | Consistency across backgrounds |
| **Accent** | One indigo, used sparingly | Restraint reads as confidence |
| **Type** | Inter Variable, custom weights (510/590/680) | Optical tuning for dark bg |
| **Tracking** | Tightens as size grows | Optical correction |
| **Spacing** | px, 4/8 base, 12-col, 1344px max | Stable chrome, readable measure |
| **Radii** | Closed ladder 4→32 + pill | No arbitrary values |
| **Motion** | 100ms feedback / 250ms transition | Instant where it counts |
| **Tokens** | Primitive → semantic, two tiers | Themeable, intent-encoded |
| **Overall** | Constraints, not options | Can't drift if you can't choose wrong |

---

*Sources: linear.app production CSS (token definitions), linear.app/brand (naming, brand colors), linear.app/method (product philosophy). Hex values and token names are quoted directly from the live stylesheet as of this analysis.*
