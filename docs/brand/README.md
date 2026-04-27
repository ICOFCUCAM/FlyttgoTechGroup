# FlyttGo Brand Systems

This directory holds the production-grade specifications and source
files for the FlyttGo visual identity. Every file here is authoritative.

| File                          | Purpose                                                                                                |
| ----------------------------- | ------------------------------------------------------------------------------------------------------ |
| `symbol-spec.md`              | **Master specification.** Construction grid, stroke rules, gradient logic, safe-area, dark/mono variants, favicon scaling, module-color inheritance, surface validation matrix. |
| `symbol-construction.svg`     | Reference build with grid overlay + control points. Open in any SVG viewer to see how the mark is constructed. **Do not ship this file as the mark.** |
| `symbol-canonical.svg`        | Canonical 24 × 24 mark, gradient-bound, ready for production. Consumes `--mark-stop-a` / `--mark-stop-b` for module-color inheritance. |
| `symbol-monochrome.svg`       | §7 monochrome variant. Uses `currentColor` so the host surface controls the ink. |
| `symbol-favicon-16.svg`       | §8 pixel-snapped 16 × 16 favicon variant. One stroke, no echo, solid background. |

## Quick links into the spec

- [Construction grid](./symbol-spec.md#1-construction-grid)
- [Stroke geometry](./symbol-spec.md#2-stroke-geometry)
- [Corner radii](./symbol-spec.md#3-corner-radius--chrome--containment-shapes)
- [Gradient logic](./symbol-spec.md#4-gradient-direction-logic)
- [Safe-area rules](./symbol-spec.md#5-safe-area-spacing-rules)
- [Dark-mode variant](./symbol-spec.md#6-dark-mode-variant)
- [Monochrome variant](./symbol-spec.md#7-monochrome-variant)
- [Favicon scaling](./symbol-spec.md#8-favicon-scaling-rules)
- [Module-color inheritance](./symbol-spec.md#9-module-color-inheritance-system)
- [Surface validation](./symbol-spec.md#10-surface-validation-matrix)

## Implementation surface

The runtime React consumer of this asset family lives at:

`src/components/flytt/BrandLogo.tsx`

It picks the right artwork variant for the surface it renders on. The
SVG files in this directory are the source of truth; image assets
served from CDN should be regenerated from these whenever the spec
changes.

## Spec changes

Spec changes require:

1. A PR that updates `symbol-spec.md` with a new entry in §12
   (Versioning).
2. Regenerated source SVGs in this directory.
3. Re-validated entries in §10 (Surface validation matrix).
4. Brand-systems sign-off on the PR before merge.
