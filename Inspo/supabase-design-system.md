# The Supabase Design System — A Teardown & Field Guide

*Reverse-engineered directly from Supabase's shipped CSS bundle (the same one served across every page on supabase.com). Every token below is taken from their production stylesheet, not from memory. The goal of this document is twofold: (1) document **what** their system is, and (2) teach the **reasoning** that produces a system like this so you can build your own.*

---

## 0. The 30-second summary

Supabase runs a **token-driven, three-tier design system** built on **Tailwind CSS v4** with a **Radix-style 12-step color architecture**. Colors are stored as raw HSL channels (not finished colors) so opacity can be composed on the fly. Everything is themed light/dark by swapping one layer of variables. The brand is anchored on a single green — `#3ECF8E` — against near-black/near-white neutrals, with a deliberately tiny accent palette. The same compiled stylesheet ships on every sub-page, which tells you the entire marketing site, docs, and dashboard are driven from one shared source of truth.

If you remember one idea: **they almost never reference a raw color in a component. Components reference *roles*, roles reference *primitives*, and only primitives hold actual color values.**

---

## 1. The mental model: why tiers exist

This is the single most important concept, so it comes first.

A naive design system says `button background = #3ECF8E`. That works until you have dark mode, a hover state, a disabled state, three button variants, and a rebrand. Then `#3ECF8E` is hard-coded in 400 places.

Supabase uses **three layers**, each only allowed to reference the layer below it:

```
Layer 3 — COMPONENT tokens   --background-button-default
              │ references
Layer 2 — SEMANTIC tokens    --background-default, --brand-default, --border-strong
              │ references
Layer 1 — PRIMITIVE tokens   --colors-gray-dark-500, --color-amber-1000
              (raw HSL values live ONLY here)
```

Example chain pulled straight from their CSS:

```css
--background-button-default: var(--colors-gray-light-100);   /* component → primitive */
--background-default:        var(--colors-gray-light-100);   /* semantic  → primitive */
--colors-gray-light-100:     0deg 0% 98.8%;                  /* primitive → raw value  */
```

**Why this matters / the thought process:**

- **Primitives** are the "crayon box" — every color you're *allowed* to use. They carry no meaning.
- **Semantic tokens** assign *meaning/role*: "this is the default background," "this is a strong border," "this is the brand." Components speak only in these roles.
- **Component tokens** are an optional top layer for things that need their own knob (buttons, controls) without polluting the global semantic set.
- A rebrand or a theme change edits **one layer**. Components never change.

This indirection is the whole game. The rest of the document is just *what they put in each layer.*

---

## 2. Color system

### 2.1 The storage trick — HSL channels, not colors

Notice the format of a primitive:

```css
--colors-gray-dark-500: 0deg 0% 18%;     /* NOT hsl(0 0% 18%) — just the channels */
--brand-default:        153.1deg 60.2% 52.7%;
```

They store the **HSL components without the `hsl()` wrapper**. Consumption looks like:

```css
color: hsl(var(--brand-default));              /* solid */
color: hsl(var(--brand-default) / 0.5);        /* 50% opacity, same token */
background: hsl(var(--foreground-default) / 0.08);  /* subtle tint */
```

**The reasoning:** if you store a finished `#3ECF8E`, you cannot derive a 50%-opacity version without a second token. By storing channels, *every* color in the system can be used at *any* opacity with zero extra tokens. This is the modern (post-2021) convention and it's why Tailwind/shadcn/Radix all adopted it. It roughly halves the number of color tokens you need.

### 2.2 Primitives — the neutral scales (Radix 12-step model)

Neutrals are a **12-step scale**, defined twice (a `dark` ramp and a `light` ramp). The 12-step idea comes from Radix Colors: each step has a *designated job*, so designers pick "step 6" not "that medium gray."


| Step | Conventional role (Radix model) | `gray-dark` (L%) | `gray-light` (L%) |
| ---- | ------------------------------- | ---------------- | ----------------- |
| 100  | App background                  | 8.6%             | 98.8%             |
| 200  | Subtle background               | 11%              | 97.3%             |
| 300  | UI element background           | 13.7%            | 95.3%             |
| 400  | Hovered UI background           | 15.7%            | 92.9%             |
| 500  | Active/selected UI background   | 18%              | 91%               |
| 600  | Subtle borders & separators     | 20.4%            | 88.6%             |
| 700  | UI element border               | 24.3%            | 85.9%             |
| 800  | Hovered UI border               | 31.4%            | 78%               |
| 900  | Solid backgrounds               | 43.9%            | 56.1%             |
| 1000 | Hovered solid backgrounds       | 49.4%            | 52.2%             |
| 1100 | Low-contrast text               | 62.7%            | 43.5%             |
| 1200 | High-contrast text              | 92.9%            | 9%                |


All neutrals are `0deg 0% X%` — **pure, hueless gray**. That's a deliberate choice (see §2.6). Notice the dark and light ramps are *mirror images*: step 100 is darkest-bg in dark mode and lightest-bg in light mode. That mirroring is what makes a single semantic token work in both themes.

### 2.3 Primitives — brand & accents

The brand green is a 6-stop ramp plus a default and a link variant:


| Token                         | Light-theme value   | Dark-theme value    | Hex (default theme) |
| ----------------------------- | ------------------- | ------------------- | ------------------- |
| `--brand-200` … `--brand-600` | low→high green ramp | mirrored ramp       | —                   |
| `--brand-default`             | `152.9 60% 52.9%`   | `153.1 60.2% 52.7%` | **#3ECF8E**         |
| `--brand-link`                | `153.4 100% 36.7%`  | `155 100% 38.6%`    | **#00C573**         |
| `--brand-500`                 | —                   | `155.3 78.4% 40%`   | #16B674             |


Accent/state palettes are intentionally **few**, each its own 200→600 ramp:


| Family                           | Role                              | Default hex |
| -------------------------------- | --------------------------------- | ----------- |
| `brand` (green)                  | primary action, success, identity | #3ECF8E     |
| `destructive` (red)              | errors, delete                    | #E54D2E     |
| `warning` (amber)                | caution                           | #DB8E00     |
| `amber`, plus code-syntax colors | docs/code highlighting            | various     |


**Thought process:** notice there's no separate "info blue" or "success green" cluttering the core. The brand green *is* the success color. Restraint in the accent palette is a feature — fewer colors means a more coherent, more obviously-Supabase product. A big palette is a smell, not a flex.

### 2.4 Semantic layer — backgrounds

This is the vocabulary components actually use. Each is defined for both themes (dark value / light value shown):


| Semantic token                            | Job                 | Dark           | Light          |
| ----------------------------------------- | ------------------- | -------------- | -------------- |
| `--background-default`                    | page background     | #121212 (7.1%) | #FCFCFC        |
| `--background-alternative-default`        | alt section bg      | 5.9%           | 99.2%          |
| `--background-muted`                      | muted panels        | 14.1%          | 96.9%          |
| `--background-surface-75/100/200/300/400` | **elevation scale** | 9% → 16.1%     | 100% → 89.8%   |
| `--background-control`                    | inputs/controls     | 14.1%          | gray-light-300 |
| `--background-overlay-default/-hover`     | popovers, menus     | 14.1% / 18%    | —              |
| `--background-selection`                  | text/row selection  | 19.2%          | gray-light-400 |
| `--background-dash-canvas` / `-sidebar`   | dashboard chrome    | 7.1% / 9%      | —              |


The `surface-75 → 400` ramp is an **elevation system**: higher number = more "raised" surface. In dark mode raised surfaces get *lighter* (mimicking light hitting a closer object); in light mode they get *darker/greyer*. That's how they fake depth on a flat, shadow-light UI.

### 2.5 Semantic layer — foreground (text) & borders


| Text token              | Job                   | Dark          | Light                |
| ----------------------- | --------------------- | ------------- | -------------------- |
| `--foreground-default`  | primary text          | #FAFAFA (98%) | gray-light-1200 (9%) |
| `--foreground-light`    | secondary text        | 70.6%         | 32.2%                |
| `--foreground-lighter`  | tertiary/hint text    | 53.7%         | 43.9%                |
| `--foreground-muted`    | disabled/placeholder  | 69.8%         | 30.2%                |
| `--foreground-contrast` | text on colored fills | 98.4%         | 8.6%                 |



| Border token                                                  | Job                       |
| ------------------------------------------------------------- | ------------------------- |
| `--border-muted`                                              | barely-there separators   |
| `--border-secondary`                                          | secondary dividers        |
| `--border-default`                                            | standard component border |
| `--border-strong`                                             | emphasized border         |
| `--border-stronger`                                           | highest-contrast border   |
| `--border-control` / `--border-overlay` / `--border-button-`* | context-specific          |


**Thought process:** the naming is a *ramp of intensity* (`muted → secondary → default → strong → stronger`), not a list of arbitrary names. A developer never wonders "which border?" — they pick by how loud they want it. **Good semantic names encode a scale, not a thesaurus.**

### 2.6 Theming mechanism

Light/dark is implemented by **redefining the semantic layer** under a selector, while primitives + components stay put:

```css
:root            { --background-default: 0deg 0% 7.1%;  /* dark is the default */ }
.light,
[data-theme=light] { --background-default: 0deg 0% 99.2%; }
```

Because every component reads `hsl(var(--background-default))`, flipping the `data-theme` attribute on a single ancestor reskins the entire app. No component re-renders its styles; the variables under it simply resolve differently. This is the pure payoff of the tiered architecture.

Also note `--helpers-os-appearance: Light` — they expose the active theme *as a token*, so even content/logic can branch on it.

---

## 3. Typography

```css
--font-family-body: Inter;                                   /* UI + prose */
--font-source-code-pro: Source Code Pro, Office Code Pro, Menlo, monospace;  /* code */
--font-custom: Circular, custom-font, Helvetica Neue, Arial, sans-serif;     /* display */
```

- **Inter** is the workhorse — chosen because it's a neutral, highly legible UI grotesque designed for screens at small sizes (tall x-height, open apertures).
- **Source Code Pro** for all code/terminal contexts (Supabase is a developer product, so code typography is first-class, not an afterthought — they even have a dedicated `.ch-terminal` treatment at 14px).
- A `Circular`-based **display** stack for big marketing headlines.

### Type scale (modular, rem-based)


| Token         | Size     | ~px | Line-height |
| ------------- | -------- | --- | ----------- |
| `--text-sm`   | .875rem  | 14  | 1.43        |
| `--text-base` | 1rem     | 16  | 1.5         |
| `--text-lg`   | 1.125rem | 18  | 1.56        |
| `--text-2xl`  | 1.5rem   | 24  | 1.33        |
| `--text-3xl`  | 1.875rem | 30  | 1.2         |
| `--text-4xl`  | 2.25rem  | 36  | 1.11        |
| `--text-5xl`  | 3rem     | 48  | 1.0         |
| `--text-6xl`  | 3.75rem  | 60  | 1.0         |
| `--text-7xl`  | 4.5rem   | 72  | 1.0         |
| `--text-8xl`  | 6rem     | 96  | 1.0         |


**Two teaching points here:**

1. **Line-height shrinks as size grows.** Body text gets 1.5 for readability; a 96px hero gets 1.0 because generous leading on huge type looks broken. The scale bakes this relationship in so nobody has to think about it.
2. **rem, not px**, so the whole system scales with the user's root font-size (accessibility + responsive).

Weights: `300 / 400 / 500 / 600 / 700 / 800` (light → extrabold). In practice UI lives at 400–600; 700/800 are reserved for display.

---

## 4. Spacing, radius, and the geometry of the UI

### Spacing

```css
--spacing: .25rem;     /* the atomic 4px unit — everything is a multiple */
--spacing-xs: 4px;  --spacing-sm: 8px;  --spacing-md: 16px;
--spacing-lg: 32px; --spacing-xl: 64px;
```

The base unit is **4px**, and the named scale roughly **doubles** at each step (4 → 8 → 16 → 32 → 64). **Why a base unit at all?** A shared rhythm. When every margin/padding is a multiple of 4, unrelated components automatically align to the same grid and the UI feels engineered rather than hand-placed. The doubling scale means adjacent sizes are visibly distinct — no agonizing over 13px vs 14px.

### Radius

```css
--radius-xs: .125rem(2px)  --radius-sm: .25rem(4px)  --radius-md: .375rem(6px)
--radius-lg: .5rem(8px)    --radius-xl: .75rem(12px)
```

A small, consistent radius family. Supabase's UI is **mildly rounded** (6–8px on most cards/buttons) — friendly but not bubbly. The radius scale is tight on purpose: too many radii makes a UI look inconsistent.

### Border widths & blur

```css
--borderwidth-xs: 1px (default) … sm 2px, md 4px, lg 8px
--blur-xs: 4px … md 12px, lg 16px, xl 24px, 2xl 40px   /* for glass/backdrop effects */
```

### Breakpoints (Tailwind-style)

```css
--breakpoint-lg: 64rem;   --breakpoint-2xl: 96rem;
```

---

## 5. Motion

Supabase treats animation as a tokenized part of the system, not ad-hoc CSS. A sample:

```css
--animate-fade-in:        fadeIn .3s both;
--animate-slide-up:       slideUp .3s cubic-bezier(.87,0,.13,1);
--animate-overlay-show:   overlayContentShow .3s cubic-bezier(.16,1,.3,1);
--animate-accordion-down: accordion-down .15s ease-out;
--animate-marquee:        marquee 35s linear infinite;
```

**Two curves do most of the work:**

- `cubic-bezier(.87,0,.13,1)` — a sharp, decisive ease for panels/slides (fast middle, soft ends).
- `cubic-bezier(.16,1,.3,1)` — a gentle "ease-out-expo" for overlays/popovers appearing.

**Durations cluster at .1s–.3s** — fast enough to feel responsive, slow enough to be perceived. **Teaching point:** standardizing easing + duration is what makes an app feel *cohesive in motion*. If every component picks its own timing, the product feels twitchy. Two or three named curves is plenty.

---

## 6. A component recipe (putting it all together)

A button is where all the layers converge. Conceptually:

```css
.btn-default {
  background: hsl(var(--background-button-default));  /* component token  */
  border: var(--borderwidth-xs) solid
          hsl(var(--border-button-default));          /* component token  */
  color: hsl(var(--foreground-default));              /* semantic token   */
  border-radius: var(--radius-md);                    /* 6px              */
  padding: var(--spacing-sm) var(--spacing-md);       /* 8px / 16px       */
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);             /* 500              */
  transition: all .15s ease-out;
}
.btn-default:hover { border-color: hsl(var(--border-button-hover)); }
```

Every value is a token. There is **not a single literal** in the component. Swap the theme → the button reskins. Rebrand → edit primitives → the button follows. *That* is the deliverable of a design system: components become declarative descriptions of intent.

---

## 7. The stack & build pipeline (how this is actually produced)

Signals in the CSS tell you the toolchain:

- `--default-font-family`, `--text-`*, `--spacing`, `--breakpoint-*`, `--color-*` with `@layer base/theme` → **Tailwind CSS v4** (which compiles its theme into CSS custom properties).
- The 12-step `dark`/`light` ramps and the channel-storage format → **Radix Colors** conventions, almost certainly fed through a **shadcn/ui-style** component layer.
- The site is **Next.js** (`_next/static/css/...`), and **the same hashed CSS bundle is linked from every page** — so marketing, blog, and docs all consume one published token set. Supabase open-sources this as their `ui` library and design tokens.

The lesson: the *visible* design system (this document) is generated from a *machine-readable* token source. Designers edit tokens; the build turns them into Tailwind theme vars + CSS variables; components consume them. Humans never hand-maintain 450KB of CSS — they maintain a few hundred tokens.

---

## 8. The principles, distilled (what to steal)

If you're building your own system (e.g. your "Dark Minimal Flat" aesthetic), these are the transferable lessons, in priority order:

1. **Three tiers, one direction of reference.** Primitives hold values; semantics hold roles; components hold knobs. Reference downward only. This single rule buys you theming, rebrand-ability, and consistency for free.
2. **Store colors as HSL channels, consume with `hsl(var(--x) / a)`.** Halves your color tokens and unlocks any-opacity-anywhere.
3. **Name semantic tokens as a *scale of intensity*** (`muted → default → strong → stronger`), so picking is mechanical, not creative.
4. **Theme by swapping the semantic layer only.** Mirror your light/dark neutral ramps so one token reads correctly in both.
5. **Restrain the palette.** One brand color doing double duty (brand = success) beats six accent families. Coherence > variety.
6. **Bake relationships into the scale.** Line-height that tightens as type grows; an elevation ramp where dark surfaces lighten. The system should encode design judgment so consumers can't get it wrong.
7. **Pick a base unit (4px) and a couple of motion curves, then never deviate.** Rhythm and timing consistency are most of what "polish" actually is.
8. **Make the human-edited source small and machine-readable.** You maintain tokens; the build maintains the CSS.

A design system isn't a color palette and a font. It's a **set of constraints that make the right thing easy and the wrong thing hard** — and Supabase's is a clean, modern textbook example of exactly that.