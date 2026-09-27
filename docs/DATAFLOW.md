# Data Flow

## Communicated MVP flow

```text
CSV / XLSX
→ browser on the user's device
→ column transformation
→ preview
→ export to the user's device
```

## Explicit non-flow

```text
PSEUDO Y
≠ automatic transfer to ChatGPT / Claude / Gemini / other AI providers
```

## Mapping
The site explains the **principle** that original↔pseudonym information must stay separate from the working dataset. It does not claim encrypted persistence, re-identification, or mapping export until those capabilities are implemented and tested.

## License / telemetry
The landing page distinguishes content processing from any future technical account/license checks. Any production implementation must verify that license/telemetry paths do not include table contents before this is claimed publicly.
