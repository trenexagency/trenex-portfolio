---
name: Official brand logo icon sourcing
description: How to get real official app/brand icons (Photoshop, Illustrator, CapCut, etc.) when react-icons/simple-icons lacks them due to trademark takedowns.
---

`react-icons` (si package, and the standalone `simple-icons` npm package) no longer includes Adobe Creative Cloud app icons (Photoshop, Illustrator, InDesign, Premiere Pro, After Effects) or CapCut — these were removed from simple-icons due to trademark/legal takedown requests from the brand owners. Generic dev-tool brand icons (Figma, DaVinci Resolve, HTML5, CSS ("CSS3", exported as `SiCss` not `SiCss3`), JavaScript, React, Node.js, GitHub) are still present and fine to use directly.

**Why:** Silently falling back to generic/unrelated icons (e.g. a paintbrush for Photoshop) fails "use official brand marks" requirements, and doesn't become obvious until manual visual review.

**How to apply:** For any icon missing from react-icons/simple-icons, search Wikimedia Commons for the official app icon SVG (e.g. "Adobe Photoshop CC icon svg wikimedia"), download it, then extract just the foreground glyph path(s) — discard the colored background badge/rounded-square path — and re-export as a `fill="currentColor"` SVG sized to the glyph's own viewBox. This yields a clean monochrome mark consistent with line-icon styling (white by default, tintable via CSS on hover), matching how the other brand icons already render. Multi-layer SVGs typically have a background class/path (large rect or rounded square, first in document order) and a distinct foreground class for the letter glyph — inspect `class="..."` / fill attributes per path to tell them apart before extracting.
