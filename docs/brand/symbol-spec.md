# FlyttGo Infrastructure Symbol — Master Specification

Production-grade construction rules for the FlyttGo brand mark. This
document is the single source of truth for the symbol. Anyone shipping
the mark — to a dashboard, a regulator brief, a launcher icon, a
keynote slide — must follow this spec.

Status: v1.0 · Authoritative
Owner: Brand Systems
Surfaces in scope: dashboard UI, developer portals, government
capability briefs, ecosystem orbit diagrams, deployment architecture
maps, mobile launcher icons.

---

## 0. Quick reference

| Property            | Value                                                 |
| ------------------- | ----------------------------------------------------- |
| Canonical viewBox   | `0 0 24 24`                                           |
| Major grid          | 4 px × 4 px (6 × 6 cells)                             |
| Sub-grid            | 1 px × 1 px (24 × 24 cells)                           |
| Stroke @ 24 px      | 2.0 px, `round` cap + `round` join                    |
| Stroke scaling      | linear from 1.5 px (16) → 4.0 px (96+, capped)        |
| Corner radius (chrome shape) | 4 px @ 24 (16.67%); squircle ≥ 32 px         |
| Default gradient    | `linear-gradient(135deg, #0A3A6B 0%, #1E6FD9 100%)`   |
| Echo stroke opacity | 0.55 (color), 0.60 (mono)                             |
| Safe-area clearance | 0.25 × mark height                                    |
| Min standalone size | 16 px (favicon-class only — see §8)                   |
| Min legible size    | 20 px (UI), 32 px (print)                             |

---

## 1. Construction grid

The symbol is constructed against a 24 × 24 pixel canvas. Every
control point on every path snaps to either the major grid (4 px
intervals) or the sub-grid (1 px intervals). No half-pixel control
points are permitted on the canonical mark — this is what guarantees
crisp rendering at integer multiples (32, 48, 96 px) without
sub-pixel aliasing.

```
0   4   8  12  16  20  24
┌───┬───┬───┬───┬───┬───┐  0
│   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┤  4
│   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┤  8
│   │   │   │   │   │   │
├───┼───┼───●───┼───┼───┤ 12   ← upper stroke vertex (10,6)→(14,10)
│   │   │   │   │   │   │
├───┼───●───┼───●───┼───┤ 16
│   │   │   │   │   │   │
├───●───┼───●───┼───●───┤ 20   ← lower stroke vertex
│   │   │   │   │   │   │
└───┴───┴───┴───┴───┴───┘ 24
```

Path data (canonical):

```
M  4 12  L 10  6  L 14 10  L 20  4    ← upper stroke (foreground)
M  4 18  L 10 12  L 14 16  L 20 10    ← lower stroke (echo)
```

Both strokes span the full 16 px horizontal range (x ∈ [4, 20]) inside
the 24 × 24 canvas, leaving 4 px of left/right safe area baked into
the viewBox. Vertical separation between the two strokes is 6 px at
every control point.

### 1.1 Sub-pixel rules at runtime

| Render size    | Permitted control-point precision     |
| -------------- | ------------------------------------- |
| ≤ 16 px        | Integer only (use the simplified mark, §8) |
| 24 px          | Integer only (canonical)              |
| 32, 48, 64 px  | Integer (3:1 mathematical multiple)   |
| Non-integer multiples | Fall back to next integer multiple, scale via `transform` |

Never permit fractional translations on the SVG root when rendering at
≤ 32 px — this creates one-pixel anti-alias bleed on Windows DirectWrite.

---

## 2. Stroke geometry

The symbol is **stroke-only**. There are no filled shapes on the mark
itself (chrome / containment shapes are separate — see §3).

### 2.1 Width band (size-responsive)

| Render size  | Stroke width | Notes                                 |
| ------------ | ------------ | ------------------------------------- |
| 16 px        | 1.5 px       | Snapped — use simplified mark (§8)    |
| 20 px        | 1.75 px      | Sub-pixel; renders OK on Retina       |
| 24 px        | 2.0 px       | **Canonical**                         |
| 32 px        | 2.5 px       |                                       |
| 48 px        | 3.5 px       |                                       |
| 64 px        | 4.0 px       |                                       |
| ≥ 96 px      | 4.0 px       | **Capped.** Above 96 the mark reads as form, not weight. |

Implementation hint — use the spec-driven `strokeWidth` derived from
the rendered height:

```ts
const strokeWidthForSize = (px: number): number => {
  if (px <= 16) return 1.5;
  if (px <= 24) return 1.75 + (px - 16) * (2.0 - 1.75) / 8;
  if (px <= 64) return 2.0 + (px - 24) * (4.0 - 2.0) / 40;
  return 4.0;
};
```

### 2.2 Caps + joins

- `stroke-linecap="round"` — every cap. No `butt` or `square`.
- `stroke-linejoin="round"` — every join. No `miter`.
- `stroke-miterlimit="4"` — fallback if a renderer overrides joins.

### 2.3 Echo stroke (the platform-underneath line)

The lower stroke is a literal echo of the upper stroke, offset
+6 px on Y. It carries narrative weight: *"the platform replicates
underneath."* Rendering rules:

| Variant     | Echo stroke opacity | Echo color       |
| ----------- | ------------------- | ---------------- |
| Color       | 0.55                | Same as upper    |
| Monochrome  | 0.60                | Same as upper    |
| Reverse (white-on-dark) | 0.60    | White            |
| Print B&W   | 0.65                | Black            |

The echo is **never** a different hue. It is always the upper stroke
at reduced opacity. Color-shifting the echo breaks the platform
metaphor.

---

## 3. Corner radius — chrome / containment shapes

The mark itself has no corners (it's stroke-only). When the mark sits
inside a containing shape (badge, button, card chrome), use these
radii:

| Containing shape size | Outer radius | Inner radius (notches) | Style             |
| --------------------- | ------------ | ---------------------- | ----------------- |
| 16 × 16 px            | 3 px         | 1.5 px                 | Circular arc      |
| 24 × 24 px            | 4 px         | 2 px                   | Circular arc      |
| 32 × 32 px            | 6 px         | 3 px                   | Circular arc      |
| 48 × 48 px            | 10 px        | 5 px                   | Squircle (Bezier) |
| 64 × 64 px            | 14 px        | 7 px                   | Squircle (Bezier) |
| 1024 × 1024 px (iOS)  | 229 px       | 114 px                 | iOS squircle      |
| 192 × 192 px (Android adaptive) | 0 (let OS mask) | 0 | Provided by mask  |

Outer radius is always **2 × inner radius** — concentric continuity
when the mark is layered (badge inside badge).

Squircle (Bezier-tangent) is used at 48 px and above. The cubic Bézier
control-point ratio is the iOS standard: control-point distance from
corner = `radius × 1.528665`. At small sizes (≤ 32 px) circular arcs
look correct because the eye can't resolve squircle subtlety.

---

## 4. Gradient direction logic

The mark uses one gradient family across all variants. Consistency of
**angle and structure** across the system is more important than
slavish color matching — module variants (§9) shift hue but preserve
geometry.

### 4.1 Canonical gradient

```svg
<linearGradient id="flytt-grad" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%"   stop-color="#0A3A6B" />  <!-- Stop A — deep -->
  <stop offset="100%" stop-color="#1E6FD9" />  <!-- Stop B — bright -->
</linearGradient>
```

- Angle: **135°** (top-left → bottom-right, in CSS terms; `(x1=0,
  y1=0) → (x2=1, y2=1)` in SVG `objectBoundingBox` units).
- Stops: **two only.** Three-stop gradients are forbidden on the
  symbol itself (they read as decoration). Stops live at 0% and
  100% — no intermediate stops.
- Stop A is always the deeper tone (lower L\* in LCh space). Stop B is
  always the brighter tone. Reversing this order is forbidden — the
  light source comes from upper-left across the entire system.
- Color space: stops authored in sRGB, but renderers may interpolate
  in linear-light. The 135° angle is chosen so the perceived light
  direction reads correctly across sRGB and DCI-P3 surfaces.

### 4.2 Surface-specific direction

| Surface                       | Angle | Reason                              |
| ----------------------------- | ----- | ----------------------------------- |
| Dashboard UI                  | 135°  | Default                             |
| Developer portals             | 135°  | Default                             |
| Government capability briefs  | n/a   | Mono only — see §7                  |
| Ecosystem orbit diagrams      | radial — center of orbit | Reads as a pulse outward |
| Deployment architecture maps  | 90° (top → bottom) | Aligns with the layered-stack vertical metaphor |
| Mobile launcher icons         | 135°  | Default — Apple HIG-aligned         |

### 4.3 Gradient on the echo stroke

The echo stroke does **not** receive its own gradient. It inherits the
gradient of the upper stroke at reduced opacity (0.55). This is what
makes the two strokes read as one platform with one light source,
not two unrelated marks.

---

## 5. Safe-area spacing rules

Around every instance of the mark, a clearspace margin must be
preserved. Nothing — text, other marks, image content, decorative
chrome — may enter this region.

```
        S
   ┌────────────┐
   │            │
 S │   ◢◤◢◤    │ S      S = 0.25 × mark height
   │   ◢◤◢◤    │
   │            │
   └────────────┘
        S
```

| Mark height | Minimum clearspace (S) |
| ----------- | ---------------------- |
| 16 px       | 4 px                   |
| 24 px       | 6 px                   |
| 32 px       | 8 px                   |
| 48 px       | 12 px                  |
| 64 px       | 16 px                  |
| ≥ 96 px     | 24 px                  |

For lockups (mark + wordmark), the clearspace is calculated against
the **mark only**, not the lockup.

### 5.1 Adjacencies

- **Adjacent to other logos:** S × 2 (i.e., 0.5 × mark height).
- **Adjacent to text:** S (standard).
- **Adjacent to a hard frame edge:** S (standard).
- **Inside a badge / colored chip:** S/2 (allowed — chip is the chrome).

### 5.2 Forbidden encroachments

- Drop shadows that bleed into S.
- Decorative arrows / dingbats inside S.
- Sticker / certification marks within S.
- Background image content where any pixel exceeds 30% luminance
  contrast against the mark fill (S becomes optical, not geometric — extend until satisfied).

---

## 6. Dark-mode variant

The default gradient (`#0A3A6B → #1E6FD9`) renders correctly on light
surfaces. On dark surfaces the same gradient sinks into the
background. Use the dark-mode token swap below.

### 6.1 Token swap

| Token             | Light (canonical) | Dark               |
| ----------------- | ----------------- | ------------------ |
| `--mark-stop-a`   | `#0A3A6B`         | `#6FAEFF`          |
| `--mark-stop-b`   | `#1E6FD9`         | `#9ED0F9`          |
| `--mark-echo`     | inherits, 0.55 α  | inherits, 0.60 α   |
| `--mark-bg`       | (transparent)     | (transparent)      |

The dark variant lifts both stops one luminance step (+12 L\* in LCh)
while preserving hue. This is what keeps the mark recognisable as
"the same mark, after dark" rather than reading as a recolor.

### 6.2 When to swap

Trigger | Action
--- | ---
`prefers-color-scheme: dark` | Swap automatically
Surface lightness < 30% | Swap manually (declare via prop)
Surface is a brand-color flood (sovereign violet, etc.) | **Do not swap.** Use monochrome white (§7).

### 6.3 Implementation pattern

```svg
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="flytt-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="var(--mark-stop-a, #0A3A6B)" />
      <stop offset="100%" stop-color="var(--mark-stop-b, #1E6FD9)" />
    </linearGradient>
  </defs>
  <g stroke="url(#flytt-grad)" stroke-width="2" fill="none"
     stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 12 L10 6 L14 10 L20 4" />
    <path d="M4 18 L10 12 L14 16 L20 10" opacity="0.55" />
  </g>
</svg>
```

Hosting page declares the tokens — no per-mark recoloring in code.

---

## 7. Monochrome variant

Single-color rendering for surfaces that forbid gradients (regulator
PDFs, fax, embroidery, carved signage, single-channel print).

### 7.1 Color values

Surface | Stroke color | Echo opacity
--- | --- | ---
White / cream | `#0A1F3D` (near-black, hint of warmth) | 0.60
Black / charcoal | `#FFFFFF` | 0.60
Brand-color flood | `#FFFFFF` | 0.65
Single-channel print (CMYK K-only) | `100% K` | 65% K (screened)
Pantone (spot) | `Black 7 C` | use 65% screen
Embroidery | thread RGB closest match — **no echo** (drop the lower stroke entirely; embroidery cannot resolve 0.6 α) | n/a

### 7.2 Geometry

Identical path data to canonical. **Echo opacity raised to 0.60** (was
0.55 in color) because mono surfaces lose the gradient depth that
helped the echo read against the upper stroke.

### 7.3 Forbidden monochrome treatments

- Outline-only (drop strokes, fill the negative space) — breaks the
  motion metaphor.
- Drop shadow added to compensate for missing gradient — adds noise,
  defeats the purpose of a mono variant.
- Gradient mock via two solid greys — use one color or the gradient,
  not a fake middle.

---

## 8. Favicon scaling rules

Favicons live at sizes where the canonical mark would alias. Use this
ladder.

### 8.1 Size ladder

| Size       | Geometry              | Stroke | Background          | Notes                         |
| ---------- | --------------------- | ------ | ------------------- | ----------------------------- |
| 16 × 16    | **Simplified** — one stroke only (drop echo) | 2 px (snapped) | Solid `#0A3A6B` | Browser tab. Pixel-snapped. |
| 32 × 32    | Full canonical mark   | 2.5 px | Solid `#0A3A6B`     | Standard favicon              |
| 48 × 48    | Full canonical mark   | 3.5 px | Solid `#0A3A6B`     | High-DPI tab                  |
| 96 × 96    | Full canonical mark   | 4.0 px | Solid `#0A3A6B`     | Pinned site                   |
| 180 × 180  | Full canonical, with iOS squircle chrome | 4.0 px | Solid `#0A3A6B` | apple-touch-icon |
| 192 × 192  | Full canonical, transparent (Android masks) | 4.0 px | (transparent) | Android adaptive |
| 512 × 512  | Full canonical, transparent | 4.0 px | (transparent) | PWA install               |

### 8.2 Pixel-snap rules at 16 px

The 16 × 16 favicon is the only size where the canonical mark is
**redrawn**, not scaled. Use:

```
Path: M3 6 L7 2 L10 5 L13 1
(single stroke, 2 px wide, no echo, solid color, on solid bg)
```

This is the **only** sanctioned simplification. At any other size the
canonical path is mandatory.

### 8.3 Forbidden favicon treatments

- Echo stroke at 16 px (renders as a 1 px line — illegible).
- Gradient at 16 px (browsers downsample the alpha channel and the
  gradient becomes mud).
- Transparent background on `<link rel="icon">` (browser tab bars
  vary; solid background guarantees contrast).

---

## 9. Module-color inheritance system

The mark is the FlyttGo platform's symbol. Each module (Transify,
Workverge, Civitas, EduPro, Identra, Payvera, Ledgera, FlyttGo
Marketplace) **does not** receive its own mark — instead, the FlyttGo
mark inherits the module's gradient pair when rendered inside that
module's surface.

### 9.1 Module gradient pairs

| Module                | Stop A (deep) | Stop B (bright) | Hue family            |
| --------------------- | ------------- | --------------- | --------------------- |
| **FlyttGo (canonical)** | `#0A3A6B`   | `#1E6FD9`       | Platform blue         |
| Transify (mobility)   | `#0A3A6B`     | `#1E6FD9`       | Platform blue         |
| Workverge (workforce) | `#0A3A2A`     | `#0FB5A6`       | Workforce teal        |
| Civitas (government)  | `#2A1B47`     | `#7C5CE6`       | Government violet     |
| EduPro (education)    | `#5C4A24`     | `#D6B575`       | Education brass       |
| Identra (identity)    | `#1B2D4D`     | `#5B7FBF`       | Identity steel        |
| Payvera (payments)    | `#143E2A`     | `#2BA876`       | Payments emerald      |
| Ledgera (financial)   | `#4D2818`     | `#B85C3E`       | Financial terracotta  |
| FlyttGo Marketplace   | `#6B3D0A`     | `#D9A21E`       | Marketplace amber     |

Each pair satisfies the canonical rule: Stop A is the deeper tone,
Stop B is the brighter tone. Hue is module-specific; geometry,
stroke, echo opacity, and corner radii are unchanged.

### 9.2 Inheritance API

In code, the host surface declares the active module via a CSS
custom property:

```css
.module-workverge {
  --mark-stop-a: #0A3A2A;
  --mark-stop-b: #0FB5A6;
}
```

The mark itself never knows which module it's in — it only consumes
`--mark-stop-a` and `--mark-stop-b`. This is what allows a single
SVG asset to serve eight modules + the canonical platform mark.

### 9.3 Tier coloring (for deployment maps)

Deployment-mode mark instances are tier-coded, **not** module-coded:

| Tier        | Stop A     | Stop B     |
| ----------- | ---------- | ---------- |
| Primary     | `#0A3A6B`  | `#1E6FD9`  |
| Secondary   | `#073E3A`  | `#0FB5A6`  |
| Sovereign   | `#3A2A66`  | `#7C5CE6`  |

Deployment-mode coloring **overrides** module coloring on
deployment-architecture maps and the deployment-comparison matrix.

---

## 10. Surface validation matrix

Every surface in scope has been validated against the spec. The table
below is normative — if a surface is missing, propose an addition via
PR.

| Surface                       | Mark size | Stroke | Corner radius | Gradient | Safe area | Notes |
| ----------------------------- | --------- | ------ | ------------- | -------- | --------- | ----- |
| Dashboard UI (workspace nav)  | 20 px     | 1.75   | 3 px (chrome) | yes — module-tinted | 5 px | Tints by active module |
| Developer portals (sidebar)   | 24 px     | 2.0    | 4 px          | yes — canonical    | 6 px | Inherits API tier color |
| Government capability briefs  | 32 px+    | 2.5    | 5 px          | **no — mono** (§7) | 8 px | Print-safe; mono-only |
| Ecosystem orbit diagrams      | 16 px     | 1.5    | n/a           | yes — radial       | radial spacing | Each orbit ring inherits the module gradient |
| Deployment architecture maps  | 24 px     | 2.0    | 4 px          | yes — tier-coded   | 6 px | Tier overrides module |
| Mobile launcher icons (iOS)   | 1024 px   | 64 px (proportional) | 229 px (squircle) | yes — canonical | 12% margin | Solid `#0A3A6B` bg |
| Mobile launcher icons (Android) | 192/512 | 16/40 (proportional) | 0 — masked by OS | yes — canonical | 12% margin | Transparent; OS supplies shape |

---

## 11. Source files

| File                                    | Purpose                              |
| --------------------------------------- | ------------------------------------ |
| `docs/brand/symbol-construction.svg`    | Reference build with grid overlay    |
| `docs/brand/symbol-canonical.svg`       | Canonical 24 × 24 mark               |
| `docs/brand/symbol-monochrome.svg`      | §7 monochrome variant                |
| `docs/brand/symbol-favicon-16.svg`      | §8 simplified 16 × 16 favicon        |
| `src/components/flytt/BrandLogo.tsx`    | React consumer of the asset family   |

---

## 12. Versioning

| Version | Date     | Change                          |
| ------- | -------- | ------------------------------- |
| 1.0     | 2026-04  | Initial production specification |

Spec changes require a brand-systems sign-off and a corresponding
update to all surface validations in §10.
