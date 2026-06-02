# Design System Template

*A reusable framework for building a high-quality, token-driven design system from scratch — distilled from teardowns of Linear, Mastra, and Supabase.*

This is not a finished design system. It is the **skeleton** of one: every core module every serious system needs, in the order you should build them. Each module has two halves:

1. **The thinking** — what the module is, the pro tips pulled from the reference systems, what to know, what to watch for, and how to plan it well.
2. **The boilerplate** — a templated version of the code with *variable names and structure only*. There are no real color values, sizes, or curves. The placeholders show you the *shape* of the system (the ladders, the tiers, the naming); you supply the values.

> **The one rule that governs everything below:** a design system is **a set of constraints, not a set of options.** Every module is really an exercise in deciding *what you are not allowed to do*. The constraints are what guarantee consistency — you can't drift if there's nowhere to drift to.

Build the modules roughly in this order: **Thesis → Architecture → Color → Typography → Spacing → Radii → Motion → Systematized details → Component recipe.** Architecture comes before color because the *structure* of your tokens matters more than any single value.

---

## Module 0 — The Thesis

### What this module is

One sentence that every later decision gets checked against. Before a single token exists, you name the **feeling** the product should produce. Linear's is "calm, fast, focused." Mastra's is "precise, modern infrastructure for developers." Supabase's is "precision engineering glowing in the dark." The entire token system is downstream of that sentence.

### Pro tips from the reference systems

- **Start from a feeling, not a component.** All three systems are mechanical expressions of one emotional thesis. The thesis is what turns a pile of tokens into a system.
- **Let the thesis dictate the obvious choices for free.** "Developer infrastructure" → dark default, monospace labels, snappy motion. Decide the feeling and half the token decisions make themselves.
- **Restraint is itself a thesis.** "One accent, one typeface, a tiny fixed set of sizes" reads as confidence. A big palette is a smell, not a flex.

### Things to know

- The thesis is a *decision-making tool*, not marketing copy. Its job is to resolve future arguments ("does a second accent color serve calm/fast/focused? no → cut it").
- A good thesis is falsifiable: you can look at a proposed token and say "that violates it."

### Things to keep in mind

- If you can't check a token against your thesis, the thesis is too vague. Tighten it until it bites.
- Three supporting principles (Linear's "restraint / density / speed") are enough. More than three and none of them drive anything.

### How to develop & plan it

Write one sentence: *"Using this should feel ___."* Then write three principles that operationalize it. Pin them at the top of the system. Every later module opens by asking "what does the thesis demand here?"

### Boilerplate

```
THESIS:    "Using this should feel ______________________."

PRINCIPLE 1 — ______________  (e.g. restraint / one of everything)
PRINCIPLE 2 — ______________  (e.g. density / clarity)
PRINCIPLE 3 — ______________  (e.g. speed / responsiveness)

DEFAULT THEME:   [ dark | light ]   ← decided here, not later
PURE BLACK/WHITE: never — floor and ceiling are nudged toward middle gray
```

---

## Module 1 — Token Architecture

### What this module is

The structural backbone: a **multi-tier token system** where each layer may only reference the layer below it. This is the single highest-leverage decision in the whole system. All three reference systems use it; Supabase calls it "the whole game."

```
COMPONENT tokens   →   SEMANTIC tokens   →   PRIMITIVE tokens
(optional knobs)       (roles/intent)        (raw values live ONLY here)
        └── reference downward only, never upward or sideways ──┘
```

- **Primitives** — the "crayon box." Raw, meaningless values (`--color-<hue>-<step>`, `--radius-<n>`). No meaning attached.
- **Semantics** — role-based tokens that *reference* primitives (`--bg-default`, `--text-tertiary`, `--border-strong`). Components speak only in roles.
- **Component tokens** — an optional top layer for parts that need their own knob (buttons, controls) without polluting the global semantic set.

### Pro tips from the reference systems

- **Components consume only semantic/component tokens — never raw hex.** They ask for "the primary background," never "near-black." This is what makes theming trivial: a light theme just re-points the semantic layer; every component updates for free.
- **Store colors as channels, not finished colors** (Supabase: `153deg 60% 53%`, not `hsl(...)`). Consume with `hsl(var(--token) / <alpha>)`. This lets *any* color be used at *any* opacity with zero extra tokens — it roughly halves your color count.
- **Bundle composite tokens** (Linear): a type token can pack size + line-height + family into one value, so a component writes `font: var(--text-regular)` and can't apply a size without its matching line-height. *Make the correct thing the easy thing.*
- **Name semantic tokens as a scale of intensity** (Supabase: `muted → default → strong → stronger`), not a thesaurus. Picking becomes mechanical, not creative.
- **Build both themes even if you ship one** (Mastra ships dark but the full light theme exists). Every semantic token is defined twice. The second theme is proof the architecture is right — and costs almost nothing once it is.

### Things to know

- Two tiers (primitive → semantic) is the minimum. Add the third (component) only where a part genuinely needs its own knob.
- "Semantic names encode intent": `--shadow-high` can resolve to a lighter background in dark mode and a real shadow in light mode — same name, different mechanics per theme.
- Make the human-edited source small and machine-readable. You maintain a few hundred tokens; the build maintains the CSS.

### Things to keep in mind

- The cardinal sin is a component referencing a primitive directly. Police this in review — one leak and the theming guarantee is gone.
- Resist inventing new semantic tokens casually. Each one is a promise you maintain in every theme.

### How to develop & plan it

Define the primitive palette and scales first (Module 2+). *Then*, as a separate layer, write role-named tokens pointing at them. Only build component tokens when you hit a part that needs independent control. Mirror your light/dark primitive ramps so one semantic token reads correctly in both themes.

### Boilerplate

```css
/* ───────── TIER 1 · PRIMITIVES (raw values live ONLY here) ───────── */
:root {
  /* neutrals — store as channels, not finished colors */
  --neutral-100: /* channels */;
  --neutral-200: /* channels */;
  /* … through --neutral-1200 (see Color module for the ladder) */

  --brand-100: /* channels */;
  --brand-default: /* channels */;

  --radius-1: /* value */;   /* see Radii module */
  --space-1:  /* value */;   /* see Spacing module */
}

/* ───────── TIER 2 · SEMANTICS (roles → reference primitives) ─────── */
:root { /* default theme */
  --bg-default:      var(--neutral-100);
  --bg-elevated:     var(--neutral-200);
  --text-primary:    var(--neutral-1200);
  --text-secondary:  var(--neutral-1100);
  --border-default:  var(--neutral-700);
  --brand:           var(--brand-default);
}

/* alternate theme = re-point the SAME semantic names */
[data-theme="alt"] {
  --bg-default:      var(--neutral-100-alt);
  --text-primary:    var(--neutral-1200-alt);
  /* …components never change; only these mappings do */
}

/* ───────── TIER 3 · COMPONENT (optional knobs → reference roles) ─── */
:root {
  --button-bg-default:    var(--bg-elevated);
  --button-border:        var(--border-default);
  --button-text:          var(--text-primary);
}

/* consumption — note: not a single literal in the component */
.component {
  background: hsl(var(--bg-default));
  color:      hsl(var(--text-secondary) / 0.5);   /* any opacity, one token */
}
```

---

## Module 2 — Color

### What this module is

The crown-jewel module. It has four sub-parts that recur in every system: a **surface/elevation ladder**, a **text (foreground) ladder**, a **border ladder**, and a **restrained accent set** — plus a **theming mechanism**.

### Pro tips from the reference systems

- **Never pure black or pure white.** Floors are `near-black` (Linear `#08090a`, Mastra `#080808`); text tops out at `near-white`, not `#fff`. Pure black/white on screen is harsh, fatiguing, and bands on cheap/OLED screens. Nudge both toward the middle.
- **In dark UI, elevation = lightness, not shadow.** Shadows are nearly invisible on dark, so "higher" surfaces are *lighter*. Keep shadow tokens by name but resolve them to nothing (or to a lighter bg). This is the single most important technical decision in dark-UI design.
- **Use solid colors for text hierarchy, not opacity.** `rgba(white, 0.5)` renders differently depending on what's behind it; a solid `--text-tertiary` is the same everywhere. Reserve translucent tokens for *fills* (hover states) where blending is actually wanted.
- **Consider the Radix 12-step model** (Supabase): each step has a designated job (app bg, subtle bg, UI element, hovered UI, border, solid bg, text…). Designers pick "step 6," not "that medium gray." Define the dark and light ramps as *mirror images* so one semantic token works in both.
- **Restrain the accent palette ruthlessly.** One brand color doing double duty (brand = success) beats six accent families. Status colors should be **desaturated** — informative, never garish.
- **Derive variants perceptually.** `color-mix(in lch, …)` / `oklch` blends keep hue stable instead of drifting muddy. Don't hand-pick a darker accent; compute it.

### Things to know

- Surface steps should be *small and many* — the gap between levels is tiny (~5–10 in hex). You should *feel* the layering without consciously seeing it.
- Borders live just 2–3 steps of lightness above the floor: structure without competing with content.
- The brand color is a *signal*, not decoration. It earns meaning by being rare.

### Things to keep in mind

- A big palette is the most common way a system looks amateur. Every accent family you add is one you must theme, document, and defend.
- Don't skip the desaturation step on status colors — saturated reds/greens "vibrate" on dark backgrounds.

### How to develop & plan it

Decide the floor color (near-black or near-white per thesis). Build a stepped neutral ramp (8–12 steps) as primitives. Map semantic roles onto it (bg ladder, text ladder, border ladder). Pick **one** brand hue and 3–5 desaturated status hues. Define the second theme as a mirrored ramp. Wire theming to a single ancestor attribute.

### Boilerplate

```css
/* ── PRIMITIVES · neutral ramp (12-step, channels only) ───────────── */
/* each step has a designated job — fill in lightness per step          */
--neutral-100:  /* app background        */;
--neutral-200:  /* subtle background     */;
--neutral-300:  /* UI element background */;
--neutral-400:  /* hovered UI background */;
--neutral-500:  /* active/selected UI    */;
--neutral-600:  /* subtle border         */;
--neutral-700:  /* UI element border     */;
--neutral-800:  /* hovered border        */;
--neutral-900:  /* solid background      */;
--neutral-1000: /* hovered solid bg      */;
--neutral-1100: /* low-contrast text     */;
--neutral-1200: /* high-contrast text    */;

/* ── PRIMITIVES · brand + status (each a small ramp, desaturated) ─── */
--brand-200: ; --brand-400: ; --brand-default: ; --brand-600: ;
--status-success:     ;
--status-destructive: ;
--status-warning:     ;
--status-info:        ;

/* ── SEMANTICS · surface / elevation ladder (lighter = higher) ────── */
--bg-base:        var(--neutral-100);
--bg-level-1:     var(--neutral-200);   /* panels, sidebars   */
--bg-level-2:     var(--neutral-300);   /* cards, raised       */
--bg-level-3:     var(--neutral-400);   /* highest standard    */
--bg-hover:       var(--neutral-500);
--bg-input:       var(--neutral-600);

/* ── SEMANTICS · text ladder (solid, not opacity) ─────────────────── */
--text-primary:    var(--neutral-1200);
--text-secondary:  var(--neutral-1100);
--text-tertiary:   var(--neutral-900);   /* labels, metadata    */
--text-disabled:   var(--neutral-800);

/* ── SEMANTICS · border ladder (named by intensity) ───────────────── */
--border-muted:    var(--neutral-600);
--border-default:  var(--neutral-700);
--border-strong:   var(--neutral-800);

/* ── SEMANTICS · accent (used sparingly) ──────────────────────────── */
--accent:          var(--brand-default);
--accent-hover:    /* color-mix(in oklch, var(--accent), white <n>%) */;
--accent-tint:     /* very dark/very light accent for subtle fills    */;
--selection-bg:    /* color-mix(in lch, var(--accent), black <n>%)    */;

/* ── SHADOWS · keep names, resolve to nothing in dark mode ────────── */
--shadow-none:   0 0 0 transparent;
--shadow-low:    var(--shadow-none);   /* dark mode: elevation = lightness */
--shadow-high:   var(--shadow-none);   /* light mode: re-point to a real shadow */

/* ── THEMING · flip on one ancestor; primitives & components stay ─── */
:root             { /* default-theme semantic mappings */ }
[data-theme="alt"]{ /* alternate-theme semantic mappings (mirrored ramp) */ }
```

---

## Module 3 — Typography

### What this module is

The type system: **typeface roles**, **custom weights**, and **parallel size scales** (one for UI, one for display), each scale bundling size + line-height + tracking.

### Pro tips from the reference systems

- **Pair a character font with a quiet one.** Distinctive display face for identity (Linear's serif moments; Mastra's width-stretched "Greed"); neutral workhorse (Inter) for all running text; a mono for code/labels/metadata — which doubles as "dev-tool texture." Three fonts, three non-overlapping jobs.
- **Reject the default weights.** Linear uses 510/590/680 instead of 500/600/700; Mastra uses 520. On variable fonts you can request any weight on a continuous axis — nudge weights heavier to correct for *irradiation* (light text on dark looks thinner than it is). Nobody notices; everybody feels it.
- **Run two parallel scales** — a UI/body scale and a display/heading scale — so the same tokens power both product and marketing.
- **Bake the size↔line-height↔tracking relationship into the token.** Line-height *loosens* for reading sizes (~1.5–1.6) and *tightens* for big display (~1.0–1.1). Tracking does the opposite: **tighten as size grows, loosen as size shrinks** (optical correction). A naive system uses one letter-spacing everywhere; a crafted one varies it by size.
- **Use rem for content type** (respects the user's browser font-size — an accessibility win). Consider fluid `clamp()` for hero headlines so they scale smoothly across the viewport with no breakpoint jump.
- **Always end every font stack in system fonts** so the page is readable before the web font loads. Ship a matched fallback to prevent layout shift.

### Things to know

- A custom display face at a non-standard width/weight is identity you literally can't get from a default font menu — it's unreplicable.
- Variable fonts let one file serve every width/weight; set the axis in CSS, not separate files.

### Things to keep in mind

- Don't let the three fonts blur into each other — the discipline is in never using the display face for body, or the mono for prose.
- Display weights (700/800) are for headlines only; UI text lives at 400–600.

### How to develop & plan it

Assign one font to each of three jobs (display / body / mono). Pick custom weights tuned to your background. Build a UI scale and a display scale as composite tokens (size/line-height/family bundled). Add per-size tracking. Use rem for content, optionally `clamp()` for heroes.

### Boilerplate

```css
/* ── FONT ROLES (each a full fallback stack ending in system fonts) ─ */
--font-display:  "<DisplayFace>", ui-serif|ui-sans, <system-fallbacks>;
--font-body:     "<BodyFace>",    -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono:     "<MonoFace>",    ui-monospace, "SF Mono", Menlo, monospace;

/* ── CUSTOM WEIGHTS (tune off the 400/500/600/700 defaults) ───────── */
--weight-normal:    /* e.g. 400 */;
--weight-medium:    /* e.g. 5xx — nudged for irradiation */;
--weight-semibold:  /* e.g. 5xx */;
--weight-bold:      /* e.g. 6xx */;

/* optional variable-axis tell (e.g. width-stretch on headlines) */
--display-stretch:  /* e.g. 1xx% */;

/* ── BODY / UI SCALE (rem-based; bundle size + line-height + track) ─ */
--text-xs:   /* size */ / /* line-height */  /* tracking: looser */;
--text-sm:   /* size */ / /* line-height */  /* tracking */;
--text-md:   /* size */ / /* line-height */  /* tracking: ~0 */;
--text-lg:   /* size */ / /* line-height */  /* tracking */;

/* ── DISPLAY / HEADING SCALE (line-height tightens, tracking tightens) */
--title-1:   /* small display */ / /* ~1.3 */  /* tracking: slightly tight */;
--title-2:   /* … */;
--title-n:   /* large display */ / /* ~1.0–1.1 */ /* tracking: tightest */;

/* ── FLUID HEADLINES (smooth scaling, no breakpoint jump) ─────────── */
--headline-xl: clamp( /* min */ , /* min + slope·(100vw − floor)/range */ , /* max */ );
```

---

## Module 4 — Spacing & Layout

### What this module is

A spacing scale built on one atomic base unit, plus a defined set of content widths and a grid.

### Pro tips from the reference systems

- **Pick a 4px base unit and make everything a multiple.** A shared rhythm means unrelated components auto-align to the same invisible grid — the UI feels engineered, not hand-placed.
- **A doubling named scale** (4 → 8 → 16 → 32 → 64) keeps adjacent sizes visibly distinct, so there's no agonizing over 13 vs 14px.
- **Use px for chrome, rem for content.** UI chrome shouldn't reflow when a user bumps their font size — only content should. (Linear deliberately uses px for spacing.)
- **Name component-specific recurring sizes** (Mastra: `height-avatar-md`, table-row, nav-height). "What is a medium avatar" is decided *once*; change the token, every avatar updates.
- **Pick a small fixed set of content widths**, not "whatever looks right per section" (Mastra ships exactly two: 1120/1328px). This is what makes pages feel like one product. Bound the max width so lines never get unreadably long on big monitors.
- **Respect device safe areas:** `max(env(safe-area-inset-*), <design-min>)` so padding grows to clear notches but never shrinks below the minimum.

### Things to know

- Spacing values should cluster around multiples of 4/8 — the near-universal convention.
- A 12-column grid is the default macro-structure; gaps come from the spacing tokens so even whitespace is on-system.

### Things to keep in mind

- Don't push responsiveness into every component — push it *down into the tokens* (Mastra changes `corner`, `padding`, `width` tokens at one breakpoint, so components adapt without their own media queries).

### How to develop & plan it

Define the 4px base and a doubling named scale. Name the recurring component sizes (icon/avatar/control/row/header heights). Choose 1–2 content widths and a column count. Decide which tokens are responsive (change at a breakpoint).

### Boilerplate

```css
/* ── BASE UNIT + DOUBLING SCALE ───────────────────────────────────── */
--space-unit: /* 4px atomic base */;
--space-xs:   /* 1× unit  */;
--space-sm:   /* 2× unit  */;
--space-md:   /* 4× unit  */;
--space-lg:   /* 8× unit  */;
--space-xl:   /* 16× unit */;

/* ── NAMED COMPONENT SIZES (decided once, reused everywhere) ───────── */
--size-icon-sm:    ;  --size-icon-md:    ;  --size-icon-lg:    ;
--size-avatar-sm:  ;  --size-avatar-md:  ;  --size-avatar-lg:  ;
--size-control-sm: ;  --size-control-md: ;  --size-control-lg: ;
--size-row:        ;  --size-header:     ;  --size-nav:        ;

/* ── LAYOUT (px chrome; bounded content widths; grid) ─────────────── */
--page-padding-inline: max(env(safe-area-inset-left), /* design min */);
--page-padding-block:  /* value */;
--content-width-1:     /* primary max width  */;
--content-width-2:     /* wide max width      */;
--grid-columns:        /* e.g. 12 */;

/* ── RESPONSIVE TOKENS (change at one breakpoint, not per component) ─ */
@media (min-width: /* breakpoint */) {
  :root { --page-padding-inline: /* larger */; }
}
```

---

## Module 5 — Radii

### What this module is

A small, closed ladder of corner radii, named literally and chosen from — never typed arbitrarily.

### Pro tips from the reference systems

- **A closed set, not arbitrary values.** You pick from the ladder; you never type `border-radius: 7px`. Small elements (buttons, inputs) use the small end; cards and panels the middle; a `9999px` pill token makes perfect pills and circular avatars.
- **Optically tune radii per size where it matters** (Linear badges: the radius isn't proportional to height — it's adjusted so each size looks *equally* rounded to the eye).
- **A big "stage" radius can be a brand device** (Mastra's 30–38px section shells read friendly and modern against sharp technical content). Decide whether your system has an oversized container radius on top of the component ladder.

### Things to know

- Naming radii by their pixel value is refreshingly literal and unambiguous.
- Too many radii makes a UI look inconsistent; keep the ladder tight.

### Things to keep in mind

- Mild rounding (6–8px on most cards/buttons) reads friendly but not bubbly. Match the radius personality to the thesis.

### How to develop & plan it

Define a 5–7 step ladder from small to large, plus a pill/full token and a circle token. Optionally add an oversized "stage" radius as a brand device.

### Boilerplate

```css
/* ── CLOSED RADIUS LADDER (pick from these; never type a raw value) ─ */
--radius-xs:    /* tiny — code chips        */;
--radius-sm:    /* buttons, inputs          */;
--radius-md:    /* default component        */;
--radius-lg:    /* cards                    */;
--radius-xl:    /* panels                   */;
--radius-2xl:   /* large containers         */;
--radius-pill:  9999px;     /* pills, buttons        */;
--radius-circle: 50%;       /* avatars, dots         */;

/* optional oversized brand "stage" radius */
--radius-stage: /* e.g. 30–38px, responsive */;
```

---

## Module 6 — Motion

### What this module is

Motion as a vocabulary: a small set of **named durations** and a **named easing library**, so curves are picked by name, not pasted as magic numbers.

### Pro tips from the reference systems

- **Two speeds carry most of the work.** A fast one for *direct feedback* (hovers, taps, toggles — ≤100–150ms reads as "instant" to the nervous system) and a slower one for *larger spatial moves* (panels, modals — a touch more time so the eye can track what moved).
- **Name your easing curves as tokens** so the curve becomes shared vocabulary ("ease-out-quint") instead of a pasted bezier. Tokenizing easing means every animation shares the same "physics" — motion feels like it came from one hand.
- **UI overwhelmingly wants ease-out** (fast start, gentle landing) — it feels responsive because the motion commits immediately. Two or three named curves is plenty.
- **Mind the asymmetry** (Linear): highlights can appear in 0s (instant acknowledgment) but fade out gently. Appearing fast feels responsive; disappearing fast feels jarring.
- **Performance is part of the aesthetic.** Cap feedback at ~100ms, no gratuitous animation. Use `will-change` to pre-warm the GPU on press animations. The system should never be the reason the UI feels slow.
- **Respect `prefers-reduced-motion`** on anything that loops or travels.

### Things to know

- Durations should cluster in a tight band (≈0.1–0.3s). If every component picks its own timing, the product feels twitchy.
- You can ship a full Penner easing set as tokens, but in practice a handful (one decisive, one soft ease-out) does everything.

### Things to keep in mind

- Motion is vocabulary, not decoration. Sort animations into honest jobs (UI state vs. brand moments) — slow, showy animation contradicts a "fast" thesis.

### How to develop & plan it

Define two durations (feedback / transition) and 2–3 named easing curves (one decisive, one soft ease-out). Pick a default duration. Decide the handful of brand-moment animations separately from the UI-state plumbing.

### Boilerplate

```css
/* ── DURATIONS (tight band; feedback fast, transitions slower) ────── */
--speed-instant:    /* ~0s   — highlight appear        */;
--speed-feedback:   /* ~100–150ms — hovers, taps        */;
--speed-transition: /* ~250–300ms — panels, modals      */;
--speed-default:    var(--speed-feedback);

/* ── NAMED EASING (pick by name, never paste a raw bezier) ────────── */
--ease-out:        cubic-bezier( /* soft landing      */ );
--ease-out-expo:   cubic-bezier( /* gentle overlay     */ );
--ease-decisive:   cubic-bezier( /* sharp panel slide  */ );

/* ── USAGE ────────────────────────────────────────────────────────── */
.control { transition: all var(--speed-feedback) var(--ease-out); }
.control:active { will-change: transform; }   /* pre-warm GPU */

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

---

## Module 7 — Systematized Details

### What this module is

The small fixed scales that are easy to forget but separate "fine" from "feels expensive": borders, focus rings, z-index layers, scrollbars, and (for dev tools) syntax-highlighting tokens.

### Pro tips from the reference systems

- **One hairline border token** for the universal thin divider.
- **A z-index *named scale*, not `z-index: 9999` hacks.** Stacking order is *designed*: header < command-menu < dialog < context-menu < debug. Anyone can see that a context menu sits above a dialog.
- **A consistent focus ring** (width + offset tokens) gives the same keyboard-accessibility affordance everywhere.
- **Theme even the scrollbars** (three states: rest/hover/active) and, for a developer product, **the syntax-highlighting palette** — even code rendering goes through the system.
- **Define border widths and blur scales** as small ladders too (for glass/backdrop effects).

### Things to know

- These details are individually trivial and collectively what makes a system feel complete. The eye catches a mismatched focus ring or a random z-index instantly.

### Things to keep in mind

- Don't let z-index be invented ad hoc — every new layer must slot into the named scale.

### How to develop & plan it

List every "stacking context" your product has and assign each a named layer with deliberate gaps. Define a hairline, a focus ring (width + offset), border-width and blur ladders, scrollbar states, and (if relevant) syntax tokens.

### Boilerplate

```css
/* ── BORDERS & RINGS ──────────────────────────────────────────────── */
--border-hairline:    1px;
--focus-ring-width:   /* value */;
--focus-ring-offset:  /* value */;
--focus-ring-color:   var(--accent);

--borderwidth-sm: ; --borderwidth-md: ; --borderwidth-lg: ;

/* ── BLUR LADDER (glass / backdrop) ───────────────────────────────── */
--blur-sm: ; --blur-md: ; --blur-lg: ; --blur-xl: ;

/* ── Z-INDEX · a DESIGNED named scale (deliberate gaps) ───────────── */
--layer-base:          0;
--layer-header:        /* e.g. 100  */;
--layer-command-menu:  /* e.g. 650  */;
--layer-dialog:        /* e.g. 700  */;
--layer-context-menu:  /* e.g. 1200 */;
--layer-debug:         /* e.g. 5100 */;

/* ── SCROLLBARS (themed at three states) ──────────────────────────── */
--scrollbar-rest:   /* low-opacity  */;
--scrollbar-hover:  /* mid-opacity  */;
--scrollbar-active: /* high-opacity */;

/* ── SYNTAX TOKENS (developer products) ───────────────────────────── */
--token-keyword: ; --token-string: ; --token-comment: ; --token-function: ;
```

---

## Module 8 — The Component Recipe

### What this module is

Proof the system works: a single component (a button is the canonical choice) where every value is a token and there is *not one literal*. This is the deliverable — components become declarative descriptions of intent.

### Pro tips from the reference systems

- **Build each size as a coordinated bundle**, not just a height. A button "size" is height + icon size + font size + padding + gap + (optionally) a keyboard-chip size, all moving together (Linear).
- **Bake product philosophy into the component.** Linear's button has a built-in `<kbd>` slot because the product is keyboard-first. Let the component encode what the product values.
- **Namespace components** with a prefix (`ds-`) and a strict BEM-style block/element/modifier naming (Mastra). When you see the prefix, you know it's vetted, reusable, and governed — a social contract encoded in a string.
- **Make interaction feedback content-agnostic** (Linear): `filter: brightness(110%)` for hover and `transform: scale(.99)` for press work on *any* component regardless of contents — one rule, infinite reuse.
- **Every value is a token.** Swap the theme → the component reskins. Rebrand → edit primitives → the component follows. No re-render of styles needed.

### Things to know

- A new engineer should read a class name (`ds-pricing-card--column-heading`) and know exactly what it is and where it lives.
- The same component must appear identically across marketing, docs, and product — one source of truth.

### Things to keep in mind

- If a component needs a literal value, that's a missing token — add it to the right tier, don't hardcode.

### How to develop & plan it

Pick the button first; it's where every layer converges. Define a coordinated size bundle. Wire every property to a semantic/component token. Add content-agnostic hover/press. Establish the naming convention and prefix before building the second component.

### Boilerplate

```css
/* ── COORDINATED SIZE BUNDLES (height + icon + font + padding + gap) ─ */
--btn-sm-height: ;  --btn-sm-icon: ;  --btn-sm-font: ;  --btn-sm-pad: ;
--btn-md-height: ;  --btn-md-icon: ;  --btn-md-font: ;  --btn-md-pad: ;
--btn-lg-height: ;  --btn-lg-icon: ;  --btn-lg-font: ;  --btn-lg-pad: ;

/* ── THE COMPONENT (not a single literal value) ───────────────────── */
.ds-button {
  height:        var(--btn-md-height);
  padding:       var(--btn-md-pad);
  gap:           var(--space-sm);
  background:    hsl(var(--button-bg-default));
  border:        var(--borderwidth-sm) solid hsl(var(--button-border));
  color:         hsl(var(--button-text));
  border-radius: var(--radius-pill);          /* or --radius-md */
  font:          var(--text-sm);
  font-weight:   var(--weight-medium);
  transition:    all var(--speed-feedback) var(--ease-out);
}

/* content-agnostic feedback — works on any contents */
.ds-button:hover  { filter: brightness(110%); }
.ds-button:active { transform: scale(0.99); will-change: transform; }

/* BEM-style element + modifier */
.ds-button--primary { background: hsl(var(--accent)); }
.ds-button__kbd     { /* optional keyboard-shortcut chip slot */ }
```

---

## The build process, in order

1. **Write the thesis** — one sentence + three principles. Pick the default theme.
2. **Lay the architecture** — primitive → semantic (→ component) tiers; channels-not-colors; reference downward only.
3. **Build color** — neutral ramp, surface/text/border ladders, one brand + few desaturated status hues, mirrored second theme.
4. **Build typography** — three font roles, custom weights, parallel UI + display scales with baked-in line-height/tracking relationships.
5. **Build spacing** — 4px base, doubling scale, named component sizes, 1–2 content widths.
6. **Build radii** — one closed ladder + pill + circle (+ optional stage radius).
7. **Build motion** — two durations, 2–3 named curves, reduced-motion handling.
8. **Systematize the details** — hairline, focus ring, z-index scale, scrollbars, syntax tokens.
9. **Prove it with a component** — a fully-tokenized button with coordinated size bundles and content-agnostic feedback.

---

## The one-screen checklist

| Module | The constraint to impose | The principle |
|---|---|---|
| **Thesis** | One sentence + 3 principles | Start from a feeling, not a component |
| **Architecture** | Primitive → semantic → component, reference downward | Indirection buys theming for free |
| **Color** | Near-black/white floor; lighter = higher; solid text grays; 1 accent | Restraint reads as confidence |
| **Type** | 3 font roles, custom weights, UI + display scales | Optical tuning separates fine from expensive |
| **Spacing** | 4px base, doubling scale, named sizes, 1–2 widths | Shared rhythm = "engineered" feel |
| **Radii** | One closed ladder + pill + circle | No arbitrary values |
| **Motion** | 2 durations, 2–3 named curves | Motion is vocabulary, not decoration |
| **Details** | Named z-index scale, focus ring, hairline | Completeness is felt |
| **Component** | Zero literals; tokens only; coordinated sizes | Components become declarative intent |
| **Overall** | Closed sets everywhere | Can't drift if you can't choose wrong |

---

*This template is a framework, not a finished system. Fill the placeholders with values your thesis demands, keep every scale a closed ladder, and let the architecture — not any individual value — be the thing that makes it feel like one product.*
