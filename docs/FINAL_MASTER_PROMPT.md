# PSEUDO Y — Canonical Landingpage Brief

**Status: authoritative source of truth for the landing-page project.**

## Product
PSEUDO Y is a local-first table transformation tool for Senior Controllers, Heads of Controlling, and small Finance teams in German mid-sized companies.

PSEUDO Y prepares CSV/XLSX data locally in the browser, lets users select transformation rules per column, previews the result, and exports a transformed dataset.

**MVP boundary:** PSEUDO Y does not automatically send data to ChatGPT, Claude, Gemini, Copilot, or any other AI provider. The user decides what happens after export.

## Positioning
**Die lokale Schutzschicht zwischen Excel und KI.**

Primary visitor belief:
> I can prepare Excel/CSV data locally, change sensitive original values, inspect the result, export it, and decide myself where it is used next.

## Primary persona
- Senior Controller
- Leiter Controlling
- small Finance / Controlling teams

Secondary stakeholders: CFO, IT, data protection.

## CTA
Primary: **Lokal ausprobieren**  
Secondary: **So funktioniert’s**  
Enterprise: **Kontakt aufnehmen**

## Pricing
- **Pro · Beta:** €19.99/month, 1 licence
- Annual Pro: €191.90/year (effective €15.99/month; 20% discount vs monthly billing)
- **Team · 5 licences:** €79/month
- Each additional Team licence: €9.99/month
- Team is initially a multi-licence package, not a promise of central administration, shared mappings, SSO, audit logs, or roles.
- **On-Premise:** contact; no public fixed price
- B2B display: prices plus statutory VAT
- No free plan; free synthetic-data demo is allowed

## Page grammar
**Chaptered editorial with live surface.**

The page is not a generic SaaS card stack and not a continuous cinematic world. It uses distinct chapters, a real interactive demo surface, one bespoke Y signature move, separate mobile art direction, and quiet conversion sections.

## Scroll Craft rules
- Scroll is treated as a timeline.
- At least four device families; no same device twice in a row.
- No global `scrollY` percentage choreography. Each scrolly section computes its own local progress.
- Motion must explain content, never merely decorate.
- Every motion state needs a static fallback.
- `prefers-reduced-motion` must be fully supported.

## Feeling curve
1. Hero — calm relevance
2. Problem — light tension
3. Live demo — curiosity and control
4. Y dataflow — peak / aha
5. Transformations — competence
6. Local-first — trust
7. Use cases — recognition
8. Pricing — clarity
9. Footer — closure

## Peak
> **Jetzt verstehe ich, was mit meinen Originalwerten passiert.**

## Signature move
During the Y sequence the transformed working value continues toward export while the original↔pseudonym relationship visibly branches into a separate mapping area. The two routes remain visually distinct.

For the visitor the Y sequence has three chapters:
1. **Eingang:** Originaldaten → P|Y
2. **Trennung:** transformed working data continues; mapping branches separately
3. **Export:** transformed dataset → export on the user's device

The mapping path must never visually flow to an AI provider.

## Landing-page order
1. Hero
2. Controller problem
3. Live demo / product surface
4. Y signature flow
5. Transformations
6. Datatypes
7. Local-first
8. Controller use cases
9. Pricing
10. FAQ
11. On-Premise
12. Footer

## Hero
Static first line: **Sensible Controlling-Daten.**

Typewriter second line starts with: **Lokal vorbereitet für KI.**

Additional short phrases:
- Originalwerte schützen.
- Excel lokal vorbereiten.
- Kontrolliert exportieren.

Trust line: **CSV & XLSX · lokale Verarbeitung · keine automatische KI-Weitergabe**

## Demo
Use synthetic data by default. The user can select a column, choose a rule, and see the result update live.

Demo is free. Productive export requires account/licence.

## Transformation groups
**Identität schützen:** pseudonymise, mask, remove.

**Analysefähigkeit erhalten:** cluster/generalise, scale, randomise only for test/example data.

**Unverändert:** explicit keep decision.

## Examples
- `Anna Müller → PERSON_Y_001`
- `anna@firma.de → MAIL_Y_001@example.invalid`
- `03.06.1990 → 30–39 Jahre`
- `10.000 € → Umsatzindex 20,0`

## Mapping
The landing page may explain the mapping principle, but must not claim encrypted storage, export, persistence, or re-identification as finished functions until technically implemented and tested.

## Local-first
Communicate only verifiable properties:
- supported table content processed locally in browser
- no automatic original-file upload to PSEUDO-Y servers
- no automatic AI-provider transfer
- user controls export

Do not claim universal GDPR compliance, 100% security, risk-free use, or automatic anonymisation.

## XLSX
Do not promise every workbook works. Complex formulas, hidden sheets, macros, external links, metadata, pivots, embedded objects, etc. need explicit implementation and product limits.

## Use cases
Prioritise:
- Umsatz & Marge
- Kundenprofitabilität
- Forecast & Budget
- Kostenstellen
- Filialvergleich
- Power BI / SQL exports

## Resources
- Blog
- Docs
- Datenfluss & Sicherheit

Affiliate belongs in footer/company area, not primary navigation.

## Visual direction
Premium-minimal, editorial B2B software; lots of whitespace, large serif headlines, restrained sans-serif UI, cool blue accent, warm off-white background, subtle olive accents, dark premium footer.

Use existing PSEUDO-Y product/datatype/on-premise assets as brand anchors. Do not replace them with stock imagery or generic AI 3D art.

## Mobile
Mobile is separately art-directed, not desktop squeezed down. No long forced horizontal rails; Y becomes vertical; touch scroll stays native.

## Runtime
Production page should remain framework-light / framework-free where reasonable: HTML + CSS + Vanilla JS. Scroll Craft is the methodology; development QA tooling must not bloat runtime.

## GitHub
The canonical repository is **`SAALSYSTEM/PSEUDOY`**, branch **`main`**. GitHub is the technical source of truth for the landing page from now on.

## Final implementation locks
- Hero typewriter visibly starts from an empty second line with JavaScript; the complete first phrase remains the no-JS/reduced-motion fallback.
- Y flow presents only **Originaldaten → Trennung → Export** as user-facing states.
- Mobile Y is separately art-directed and non-sticky.
- Y orientation uses descriptive labels, not generic counters.
- Every animated chapter remains understandable as a static state.
- Blog stays under Resources; Datenfluss & Sicherheit is more prominent than Affiliate.
