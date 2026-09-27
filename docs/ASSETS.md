# Asset Audit

Core runtime assets live under `assets/` and are versioned with the landing page.

## Production assets

- `assets/logo/py-icon.webp` — brand icon
- `assets/logo/pseudo-y-wordmark.webp` — brand wordmark
- `assets/product/product-ui.webp` — product workflow visual
- `assets/datatypes/text.webp` — text fields
- `assets/datatypes/numbers.webp` — numeric values
- `assets/datatypes/dates.webp` — date values
- `assets/datatypes/email.webp` — email values
- `assets/onpremise/onpremise.webp` — On-Premise visual

The production landing page now uses the product visual, the four datatype cards and the On-Premise artwork as part of the scroll story.

## Y signature flow

The central Y flow is deliberately implemented as semantic HTML + SVG instead of a flat raster image. This allows the three user-facing states to remain distinct and accessible:

1. Originaldaten enter P|Y.
2. The working dataset continues while the Original ↔ Pseudonym mapping branches off separately.
3. Only the transformed dataset moves to Export.

This also prevents a misleading visual connection from the mapping to ChatGPT, Claude, Gemini or another AI provider.

## Reference artwork not used as a production claim

Futuristic/cinematic Y artwork and earlier mapping mockups remain design references only. They are intentionally not part of the production landing page when they contain claims such as `DSGVO-konform`, imply guaranteed secure storage, use ambiguous pseudo-domains, or visually suggest automatic forwarding to AI providers.

Rule: production visuals must match the actual MVP data flow and product capabilities.
