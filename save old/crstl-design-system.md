# The Crstl Design System — v2

*A token-driven design system for crstl.ai — the agentic B2B commerce network. Light theme default; dark theme fully specified. Built on principles distilled from Linear, Mastra, and Supabase, anchored on Crstl's brand.*

> **What changed from v1 (token-level changes live here):** the crystalline motif is now a **foundational corner-geometry system** (§5), status colors are fixed to meet AA and gain **tint backgrounds** (§2), card/canvas separation is corrected (§2), the **dark theme is fully specified** (§2), the **spacing scale is unified** to one naming system (§4), the **focus ring is two-tone** and survives any surface (§7), and the Button recipe drops `transition: all` and adopts the crystalline corner (§8). Graphics-level changes (data-viz, effect kit, hero, component visuals) live in the **Visual System v2**.
>
> **Note on color values:** brand colors are matched/approximated from Crstl's identity and isolated in the primitive layer — swap in exact hexes and the whole system updates with zero component edits.

---

## 0. The Thesis

**Crstl should feel like calm, automated order inside a chaotic supply chain — precise, organized, and effortless.**

EDI is historically slow, opaque, and stodgy. The system is the visible opposite: bright, clear, fast, engineered. Where dev-tools ship dark, Crstl goes **light** — the audience is operations and commerce teams, and a clean light canvas reads as *open, transparent, modern* (the antithesis of "legacy black-box EDI").

Four principles drive every decision:

1. **Clarity.** A light, generous, legible surface. Information-dense but never cluttered. Nothing competes with the data.
2. **Precision.** Geometric, grid-aligned, crystalline. The name is *Crstl* — the system is built from a faceted geometric grammar (§5), not just decorated with one.
3. **Momentum.** Fast feedback, flowing transitions. The UI must feel as quick as the product claims.

Default theme: **light**. Dark theme: fully defined as the alternate (§2e).

---

## 1. Token Architecture

Three tiers, referencing downward only: **primitives → semantics → component tokens**. Components never touch raw color. Colors are stored as **HSL channels** (not finished colors) so any token works at any opacity. Theming = re-point the semantic layer under one attribute.

```css
/* TIER 1 · PRIMITIVES — raw values live ONLY here (HSL channels) */
/* TIER 2 · SEMANTICS  — roles → reference primitives             */
/* TIER 3 · COMPONENT  — knobs → reference semantics              */

/* consumption is always: hsl(var(--token))  or  hsl(var(--token) / <alpha>) */
```

The light theme is the default `:root`; the dark theme re-points the same semantic names under `[data-theme="dark"]`.

---

## 2. Color

**Principles:** never pure black/white, one brand color doing the heavy lifting, solid grays for text hierarchy (not opacity), a mirrored neutral ramp so one semantic token works in both themes. **Crstl twist:** neutrals carry a faint navy tint (hue ~222°) so the greyscale feels related to the brand, and shadows are navy-tinted rather than black.

### Brand & accent


| Token                          | Value                      | Role                                           |
| ------------------------------ | -------------------------- | ---------------------------------------------- |
| Crstl Navy (`--brand-ink`)     | `#0C1734` · `222 62% 12%`  | Primary text, dark UI, logo, footer            |
| Crstl Cobalt (`--brand`)       | `#2E5BFF` · `225 100% 59%` | The signal: primary CTAs, links, focus, active |
| Cobalt Hover (`--brand-hover`) | `#1E48F0` · `227 88% 53%`  | Hover (light theme = *darken*)                 |
| Cobalt Tint (`--brand-tint`)   | `#EAF0FF` · `222 100% 96%` | Selected rows, subtle accent fills             |


One brand hue + one ink. Cobalt is **rationed** — it marks the one thing on a screen that matters most.

### Neutral ramp (light, navy-tinted) — 12 steps


| Token         | Value     | Job                                 |
| ------------- | --------- | ----------------------------------- |
| `--gray-50`   | `#FCFCFD` | (reserved — see canvas note below)  |
| `--gray-100`  | `#F6F7F9` | **App canvas** (page background)    |
| `--gray-200`  | `#EFF1F5` | UI element background, muted panels |
| `--gray-300`  | `#E4E7EE` | Hovered UI background               |
| `--gray-400`  | `#D5DAE3` | **Default borders**, dividers       |
| `--gray-500`  | `#BFC6D2` | Strong borders                      |
| `--gray-600`  | `#A4ADBD` | Disabled fills                      |
| `--gray-700`  | `#7E8799` | Placeholder / disabled text         |
| `--gray-800`  | `#5A6376` | Tertiary text, metadata, captions   |
| `--gray-900`  | `#3C4456` | Secondary / body text               |
| `--gray-1000` | `#252C3B` | Emphasized text                     |
| `--gray-1100` | `#0C1734` | Primary text (= Crstl Navy)         |


```css
--shadow-sm: 0 1px 2px hsl(222 62% 12% / 0.06);
--shadow-md: 0 4px 12px hsl(222 62% 12% / 0.08);
--shadow-lg: 0 12px 32px hsl(222 62% 12% / 0.12);

/* the elevation rule: surface = border + shadow, both required */
.crstl-surface {
  background: hsl(var(--bg-surface));
  border: 1px solid hsl(var(--border-muted));
  box-shadow: var(--shadow-sm);
  border-radius: var(--radius-lg);
}
```

### Status colors

v1's success/warning **failed AA on white** (4.39 / 4.17). Corrected, and paired with **tint backgrounds** for pills/badges. All values verified ≥4.5 for their stated use.


| Role        | Foreground (AA on white)         | Tint background (light)   |
| ----------- | -------------------------------- | ------------------------- |
| success     | `#18864F` · `150 70% 31%` (4.60) | `#EFFBF5` · `150 60% 96%` |
| warning     | `#A36700` · `38 100% 32%` (4.67) | `#FEF7EC` · `38 90% 96%`  |
| destructive | `#CE3B2B` · `6 65% 49%` (4.90)   | `#FAF0EF` · `6 55% 96%`   |
| info        | = Crstl Cobalt                   | `#ECF0FE` · `225 90% 96%` |


Cobalt doubles as "info," so there's no extra blue cluttering the core. (Color must never be the *only* status signal — the Visual System pairs each with a facet marker.)

### Category palette (primitives for data-viz & indexing — used sparingly)

A small set of desaturated hues that act as a *legend*, never sprayed across chrome. The Visual System maps these to chart series (light + dark).

`teal 174 68% 33%` · `violet 252 90% 64%` · `amber 36 80% 40%` · `green 150 55% 38%` · `magenta 317 60% 52%`

### The tokens

```css
/* ── PRIMITIVES (channels only) ───────────────────────────────────── */
:root {
  /* neutrals — navy-tinted, light ramp */
  --gray-50:   210 20% 99%;   --gray-100: 220 20% 97%;
  --gray-200:  222 22% 95%;   --gray-300: 222 22% 91%;
  --gray-400:  222 20% 86%;   --gray-500: 220 18% 79%;
  --gray-600:  220 14% 69%;   --gray-700: 220 12% 55%;
  --gray-800:  222 14% 41%;   --gray-900: 222 18% 29%;
  --gray-1000: 222 24% 19%;   --gray-1100: 222 62% 12%;

  /* brand */
  --brand:        225 100% 59%;   --brand-hover: 227 88% 53%;
  --brand-tint:   222 100% 96%;   --brand-ink:   222 62% 12%;

  /* status (AA-fixed) + tints */
  --status-success:     150 70% 31%;   --success-tint:     150 60% 96%;
  --status-warning:      38 100% 32%;  --warning-tint:      38 90% 96%;
  --status-destructive:   6 65% 49%;   --destructive-tint:   6 55% 96%;
  --status-info:        225 100% 59%;  --info-tint:        225 90% 96%;

  /* category primitives (viz legend) */
  --cat-teal: 174 68% 33%; --cat-violet: 252 90% 64%; --cat-amber: 36 80% 40%;
  --cat-green: 150 55% 38%; --cat-magenta: 317 60% 52%;
}

/* ── SEMANTICS · LIGHT (default) ──────────────────────────────────── */
:root {
  --bg-base:        var(--gray-100);    /* canvas (darkened from v1)     */
  --bg-subtle:      var(--gray-200);    /* alt sections                  */
  --bg-muted:       var(--gray-300);    /* muted panels                  */
  --bg-surface:     0 0% 100%;          /* cards = pure white            */
  --bg-hover:       var(--gray-200);
  --bg-selected:    var(--brand-tint);

  --text-primary:   var(--gray-1100);
  --text-secondary: var(--gray-900);
  --text-tertiary:  var(--gray-800);
  --text-disabled:  var(--gray-700);
  --text-on-accent: 0 0% 100%;

  --border-muted:   var(--gray-300);
  --border-default: var(--gray-400);    /* up one step — was invisible   */
  --border-strong:  var(--gray-500);

  --accent:         var(--brand);
  --accent-hover:   var(--brand-hover);
  --accent-tint:    var(--brand-tint);
  --focus-ring:     var(--brand);
}
```

### 2e. Dark theme — fully specified (fix #6 — every semantic re-pointed, verified)

v1 re-pointed only ~6 of ~20 tokens; the rest broke on navy (cobalt links 3.43, surfaces 1.12, borders 1.61 — all failing). Below: the **complete** map, contrast-checked against navy `#0C1734` and surface `#1E2638`.

```css
[data-theme="dark"] {
  /* surfaces — elevation by lighter step (paired with a border, see note) */
  --bg-base:     222 62% 12%;   /* navy #0C1734                          */
  --bg-subtle:   222 40% 14%;   /* #151E32                               */
  --bg-surface:  222 30% 17%;   /* #1E2638  raised card                  */
  --bg-muted:    222 30% 20%;   /* #242D42                               */
  --bg-hover:    222 28% 22%;   /* #283248                               */
  --bg-selected: 225 60% 22%;   /* cobalt-tinted row                     */

  /* text — all AA+ on navy & surface */
  --text-primary:   210 20% 98%;  /* #F9FAFB  16.97 / 14.46 AAA          */
  --text-secondary: 220 16% 80%;  /* #C4C9D4  10.68 / 9.11  AAA          */
  --text-tertiary:  220 14% 64%;  /* #969FB0   6.66 / 5.67  AA           */
  --text-disabled:  220 12% 48%;  /* #6C7689  (disabled, exempt)         */
  --text-on-accent: 0 0% 100%;

  /* borders — lightened to actually be visible */
  --border-muted:   222 20% 24%;  /* #313849                            */
  --border-default: 222 20% 30%;  /* #3D465C  1.88 vs navy              */
  --border-strong:  220 18% 40%;  /* #546078  2.8  vs navy              */

  /* accent — lightened so links pass; hover LIGHTENS in dark */
  --accent:       225 100% 65%;   /* #4D79FF  4.64 on navy AA            */
  --accent-hover: 222 100% 74%;   /* #7AA2FF  7.13 AAA                   */
  --accent-tint:  225 60% 22%;
  --focus-ring:   225 100% 65%;

  /* status — lightened for dark; all AA+ ; tints become dark fills */
  --status-success:     150 55% 52%;  /* #41C885  8.30 AAA              */
  --status-warning:      40 90% 58%;  /* #F4B434  9.65 AAA              */
  --status-destructive:   6 85% 64%;  /* #F16555  5.69 AA               */
  --status-info:        225 100% 65%;
  --success-tint:       150 45% 18%;  --warning-tint:      40 60% 18%;
  --destructive-tint:     6 55% 20%;  --info-tint:        225 60% 22%;

  /* category (lightened for dark viz) */
  --cat-teal: 174 60% 55%; --cat-violet: 252 90% 72%; --cat-amber: 40 85% 60%;
  --cat-green: 150 55% 55%; --cat-magenta: 317 70% 66%;

  /* elevation: shadows barely register on navy → switch to border + level */
  --shadow-sm: 0 0 0 1px hsl(222 30% 8% / 0.6);   /* dark "contact" line       */
  --shadow-md: 0 8px 24px hsl(222 40% 4% / 0.5);  /* keep for floating overlays */
  --shadow-lg: 0 16px 40px hsl(222 40% 3% / 0.6);
}
```

**Dark elevation rule:** raised surfaces rely on the lighter `--bg-surface` step **+ a border** (the inverse of light mode, which relies on shadow + border). Reserve real shadows for genuinely floating layers (dropdowns, dialogs, tooltips). Because `.crstl-surface` reads only tokens, switching `[data-theme]` re-skins every card automatically.

---

## 3. Typography

Pair a character display face, a quiet body, and a mono with three non-overlapping jobs. The **mono does double duty** in an EDI/commerce product: document numbers (`PO# 58392017466`), transaction codes (`850/856/810`), latencies (`0.3s`) all render in mono, reinforcing "precise infrastructure."

```css
--font-display: "Geist", "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
--font-body:    "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono:    "Geist Mono", ui-monospace, "SF Mono", Menlo, monospace;
```

- **Geist** — headlines/display: modern, technical, geometric. *(For a stronger brand tell later, a distinctive display face or a custom variable-axis weight + tight tracking would differentiate from the common Geist+Inter pairing — optional, deferred.)*
- **Inter** — all running text. The legible workhorse.
- **Geist Mono** — EDI numbers, codes, timestamps, metadata, eyebrow labels.

### Weights

Light theme = dark-on-light, so irradiation runs opposite to dark systems (dark-on-light reads slightly heavier). Standard weights work:

```css
--weight-normal:   400;   /* body                          */
--weight-medium:   500;   /* UI labels, buttons            */
--weight-semibold: 600;   /* subheads, emphasized UI       */
--weight-bold:     680;   /* display headlines (Geist variable axis) */
```

### Scales (rem-based; tracking tightens as size grows)

**Body / UI**


| Token         | Size            | Line-height | Tracking |
| ------------- | --------------- | ----------- | -------- |
| `--text-xs`   | 0.75rem (12px)  | 1.5         | 0        |
| `--text-sm`   | 0.875rem (14px) | 1.5         | -0.006em |
| `--text-base` | 1rem (16px)     | 1.55        | -0.009em |
| `--text-lg`   | 1.125rem (18px) | 1.55        | -0.011em |


**Display** (line-height tightens, tracking tightens)


| Token       | Size                                  | Line-height | Tracking |
| ----------- | ------------------------------------- | ----------- | -------- |
| `--title-1` | 1.5rem (24px)                         | 1.3         | -0.015em |
| `--title-2` | 1.875rem (30px)                       | 1.25        | -0.018em |
| `--title-3` | 2.25rem (36px)                        | 1.15        | -0.02em  |
| `--title-4` | `clamp(2.5rem, 2.5rem + 2vw, 3.5rem)` | 1.08        | -0.022em |
| `--title-5` | `clamp(3rem, 3rem + 3vw, 4.5rem)`     | 1.0         | -0.024em |


```css
/* composite tokens — size + line-height + family in one shot */
--text-base: 1rem/1.55 var(--font-body);
--title-3:   2.25rem/1.15 var(--font-display);
```

---

## 4. Spacing & Layout


```css
/* one scale (4px base, predictable doubling + intermediate steps) */
--space-1: 4px;   --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
--space-5: 20px;  --space-6: 24px;  --space-8: 32px;  --space-10: 40px;
--space-12: 48px; --space-16: 64px; --space-20: 80px;
/* optional aliases */
--space-sm: var(--space-2); --space-md: var(--space-4); --space-lg: var(--space-8);

/* named component sizes (decided once) */
--size-icon-sm: 16px;   --size-icon-md: 20px;   --size-icon-lg: 24px;
--size-avatar-sm: 24px; --size-avatar-md: 32px; --size-avatar-lg: 40px;
--size-control-sm: 32px;--size-control-md: 36px;--size-control-lg: 40px;
--size-row: 48px;       --size-row-lg: 56px;    --size-row-dense: 40px;
--size-nav: 64px;       --size-header: 48px;

/* layout (px chrome; bounded content; 12-col grid) */
--content-width:    1120px;   --content-width-xl: 1280px;
--page-padding-inline: max(env(safe-area-inset-left), 24px);
--page-padding-block:  var(--space-20);
--grid-columns: 12;
```

---

## 5. Radii & the Crstl Cut — the crystalline corner geometry (fix #1, token level)

This is where "crystalline" becomes **foundational** rather than decorative. 

```css
/* the radius ladder (kept — soft base) */
--radius-xs:    4px;    /* chips, code, tags        */
--radius-sm:    6px;    /* inputs, small buttons    */
--radius-md:    8px;    /* buttons, default         */
--radius-lg:    12px;   /* cards                    */
--radius-xl:    16px;   /* panels, modals           */
--radius-2xl:   20px;   /* large containers         */
--radius-pill:  9999px; /* pills, toggles           */
--radius-circle: 50%;   /* (avatars; status dots use the facet — see Visual) */

/* THE CRYSTALLINE GEOMETRY (the unit cell, used system-wide) */
--facet-angle:     30deg;   /* lattice construction unit (0/30/60/90/120/150) */
--facet-cut:       10px;    /* signature cut on small/medium surfaces          */
--facet-cut-lg:    18px;    /* panels, modals                                  */
--facet-cut-stage: 28px;    /* marketing "stage" shells (replaces v1 radius-stage) */
--facet-stroke:    1px;     /* lattice line weight (= --border-hairline)       */

/* THE CUT: flat top-right facet (for hard-cut, clip-path elements) */
--clip-facet: polygon(
  0 0, calc(100% - var(--facet-cut)) 0, 100% var(--facet-cut), 100% 100%, 0 100%
);
```

Two implementations, no ambiguity:

```css
/* hard-faceted elements (chips, tags, status pills, image/viz masks) */
.crstl-facet { clip-path: var(--clip-facet); }

/* soft elements (cards, modals) keep radius + wear the cut as a hairline corner MARK */
.crstl-corner-mark { position: relative; }
.crstl-corner-mark::after {
  content: ""; position: absolute; top: 0; right: 0;
  width: var(--facet-cut); height: var(--facet-cut);
  border-top: var(--facet-stroke) solid hsl(var(--border-strong));
  transform-origin: top right; transform: rotate(-45deg) translateY(-50%);
  pointer-events: none;
}
```
---

## 6. Motion

Two speeds (instant feedback vs. spatial transition), a small set of *named* easing curves, ease-out dominant, reduced-motion respected. Momentum is a brand principle, so defaults are snappy. **Transitions are always property-targeted — never `transition: all`.**

```css
/* durations — tight band */
--speed-instant:    0s;       /* highlight appear            */
--speed-feedback:   120ms;    /* hovers, taps, toggles       */
--speed-transition: 240ms;    /* panels, modals, page state  */
--speed-default:    var(--speed-feedback);

/* named easing (pick by name) */
--ease-standard: cubic-bezier(0.2, 0, 0.2, 1);   /* general UI         */
--ease-out:      cubic-bezier(0.16, 1, 0.3, 1);  /* soft overlay/enter */
--ease-decisive: cubic-bezier(0.87, 0, 0.13, 1); /* panel slides       */

/* the reusable targeted-transition pattern (name properties, never `all`) */
--transition-interactive:
  background-color var(--speed-feedback) var(--ease-standard),
  border-color     var(--speed-feedback) var(--ease-standard),
  box-shadow       var(--speed-feedback) var(--ease-standard),
  transform        var(--speed-feedback) var(--ease-standard);

@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after { animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
}
```

---

## 7. Systematized Details

A *designed* z-index scale, a **two-tone focus ring** (fix #11), hairline + blur ladders. Accessibility matters more in a light B2B product where ops teams live in the UI all day.

```css
--border-hairline:   1px;
--borderwidth-sm: 1px; --borderwidth-md: 2px; --borderwidth-lg: 4px;
--blur-sm: 4px; --blur-md: 12px; --blur-lg: 20px;

/* FOCUS — two-tone so it survives ANY surface (incl. cobalt buttons & tinted rows) */
--focus-ring-width:  2px;
--focus-ring-offset: 2px;
.crstl-focus-visible:focus-visible {
  outline: var(--focus-ring-width) solid hsl(var(--focus-ring));
  outline-offset: var(--focus-ring-offset);
  box-shadow: 0 0 0 var(--focus-ring-offset) hsl(var(--bg-base)); /* gap halo */
}
/* on cobalt / dark surfaces the ring inverts to light so it never disappears */
.on-accent:focus-visible,
[data-theme="dark"] .crstl-focus-visible:focus-visible { outline-color: hsl(var(--bg-surface)); }

/* z-index — a designed, named scale (deliberate gaps) */
--layer-base: 0;        --layer-sticky: 100;   /* sticky table headers */
--layer-header: 200;    --layer-dropdown: 600; --layer-dialog: 700;
--layer-toast: 900;     --layer-context-menu: 1200; --layer-tooltip: 1300;

/* code / EDI document syntax tokens */
--token-keyword: hsl(var(--brand));
--token-string:  hsl(var(--status-success));
--token-number:  hsl(var(--status-warning));
--token-comment: hsl(var(--text-tertiary));
```

---

## 8. The Component Recipe — Button

Every size is a *coordinated bundle* (height + icon + font + padding); feedback is content-agnostic; **not one literal** in the component — only tokens. Namespaced `crstl-`. v2 fixes: **targeted transitions (no `all`)**, the **two-tone focus ring**, and the **crystalline corner mark**.

```css
/* coordinated size bundles */
--btn-sm: 32px;  --btn-sm-font: var(--text-sm);  --btn-sm-pad: 0 12px;
--btn-md: 40px;  --btn-md-font: var(--text-sm);  --btn-md-pad: 0 16px;
--btn-lg: 48px;  --btn-lg-font: var(--text-base);--btn-lg-pad: 0 24px;

.crstl-button {
  display: inline-flex; align-items: center; gap: var(--space-2);
  height: var(--btn-md); padding: var(--btn-md-pad);
  font: var(--weight-medium) var(--btn-md-font);
  border-radius: var(--radius-md);
  transition: var(--transition-interactive);   /* targeted, never `all` (fix #9) */
  cursor: pointer;
}

/* primary = the cobalt signal */
.crstl-button--primary {
  background: hsl(var(--accent)); color: hsl(var(--text-on-accent));
  border: none; box-shadow: var(--shadow-sm);
}
.crstl-button--primary:hover  { background: hsl(var(--accent-hover)); }
.crstl-button--primary:active { transform: scale(0.99); }

/* secondary = quiet, bordered */
.crstl-button--secondary {
  background: hsl(var(--bg-surface)); color: hsl(var(--text-primary));
  border: var(--borderwidth-sm) solid hsl(var(--border-default));
}
.crstl-button--secondary:hover { background: hsl(var(--bg-hover)); }

/* focus — the two-tone ring; primary buttons add .on-accent so the ring inverts */
.crstl-button { /* … */ }
.crstl-button:focus-visible {
  outline: var(--focus-ring-width) solid hsl(var(--focus-ring));
  outline-offset: var(--focus-ring-offset);
  box-shadow: 0 0 0 var(--focus-ring-offset) hsl(var(--bg-base));
}
.crstl-button--primary.on-accent:focus-visible { outline-color: hsl(var(--bg-surface)); }
```

