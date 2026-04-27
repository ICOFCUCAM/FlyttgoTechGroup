# FlyttGo Logo System

Production-ready SVG asset family for the FlyttGo Technologies Group
F-symbol. Tone reference: Palantir, Databricks, Stripe, ServiceNow.

All assets share **identical geometry** — a single closed path with
hard right-angle corners on a 24 × 24 viewBox:

```
M 4 2 H 22 V 7 H 9 V 10 H 18 V 15 H 9 V 22 H 4 Z
```

Variants differ only in fill (gradient stops, currentColor, or solid
hex). Anyone shipping the mark must keep the path data invariant —
modifications require a brand-systems sign-off and a spec version
bump (see `../symbol-spec.md` §12).

## Asset index

### Core

| File | Purpose | Use when |
|---|---|---|
| `primary-lockup.svg` | Horizontal mark + wordmark, light surfaces | Marketing pages, navbars, email signatures, business cards |
| `primary-lockup-dark.svg` | Horizontal mark + wordmark, dark surfaces | Dark navbars, footers, hero panels |
| `symbol-mark.svg` | F-symbol only, gradient | Tight spaces where the wordmark already appears nearby |
| `symbol-mark-mono.svg` | F-symbol only, `currentColor` | Regulator PDFs, single-channel print, fax, embroidery |
| `favicon-16.svg` | Pixel-snapped 16 × 16 | Browser tab. The only sanctioned simplification. |

### Module variants

Eight platform modules, each inheriting the canonical F geometry with
a module-specific gradient pair. Use these where the surface is
scoped to a single module (a Workverge dashboard, a Payvera
checkout, a Civitas residents portal, etc.).

| File | Module | Stop A (deep) | Stop B (bright) | Hue family |
|---|---|---|---|---|
| `module-transify.svg` | Transify (mobility) | `#0A3A6B` | `#1E6FD9` | Platform blue |
| `module-workverge.svg` | Workverge (workforce) | `#0A3A2A` | `#0FB5A6` | Workforce teal |
| `module-civitas.svg` | Civitas (government) | `#2A1B47` | `#7C5CE6` | Government violet |
| `module-edupro.svg` | EduPro (education) | `#5C4A24` | `#D6B575` | Education brass |
| `module-identra.svg` | Identra (identity) | `#1B2D4D` | `#5B7FBF` | Identity steel |
| `module-payvera.svg` | Payvera (payments) | `#143E2A` | `#2BA876` | Payments emerald |
| `module-ledgera.svg` | Ledgera (financial ops) | `#4D2818` | `#B85C3E` | Financial terracotta |
| `module-flyttgo-marketplace.svg` | FlyttGo Marketplace | `#6B3D0A` | `#D9A21E` | Marketplace amber |

## Master spec

Geometry, stroke rules, gradient logic, safe-area, dark-mode tokens,
favicon scaling, module-color inheritance and the surface-validation
matrix all live in [`../symbol-spec.md`](../symbol-spec.md). That
document is normative; this directory is a curated export for
distribution to design partners, regulators, app stores and
co-marketing teams.

## Surface coverage

The asset set has been validated against the six in-scope surfaces:

- Dashboard UI (workspace nav)
- Developer portals
- Government capability briefs
- Ecosystem orbit diagrams
- Deployment architecture maps
- Mobile launcher icons (iOS + Android)

See `../symbol-spec.md` §10 for per-surface stroke, radius, gradient
and safe-area requirements.

## Implementation notes

- The wordmark in `primary-lockup.svg` uses Inter via `font-family`
  fallback. For print export, outline the text in your design tool
  before delivery — system-rendered fonts will not match the on-screen
  spacing exactly.
- Module variants and the canonical mark all use SVG linear gradients
  in `objectBoundingBox` units. They scale without distortion to any
  size between the favicon ladder (§8) and 1024 × 1024 launcher
  icons.
- The R2D2-style "currentColor" binding on `symbol-mark-mono.svg`
  means the host can set ink via CSS `color`. No re-export needed
  for new ink colors — change the host stylesheet.

## Spec changes

Every asset here is a snapshot of `../symbol-spec.md`. If the spec
changes, regenerate every file in this directory. The path data is
the contract; if it diverges between files, the system is broken.
