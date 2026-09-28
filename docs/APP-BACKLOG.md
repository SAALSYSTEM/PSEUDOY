# PSEUDO Y – App Backlog

## Personen-Rollen

Bei personenbezogenen Spalten soll optional eine fachliche Rolle hinterlegt werden können, z. B. Geschäftsführer, Controller, Mitarbeiter, Kunde oder frei definierte Rolle. Die Rolle ist Metadaten-Kontext und darf nicht automatisch als Klarnamen-Ersatz missverstanden werden.

## 4. Reiter: Prompt-Vorlage

Nach Tabellen-Regeln, Vorschau und Mapping soll ein vierter Reiter **Prompt-Vorlage** ergänzt werden.

Ziel: PSEUDO Y erzeugt automatisch einen kurzen Kontextbaustein, der einer nachgelagerten KI erklärt, welche Transformationen vorgenommen wurden und welche fachlichen Einschränkungen daraus entstehen.

Beispiel:

> Wichtig: Das Alter wurde als Cluster ausgegeben. Das exakte Geburtsdatum liegt im Original vor. Berücksichtige diese eingeschränkte Genauigkeit in deiner Ausarbeitung und leite daraus keine exakten Alterswerte ab.

Weitere automatische Bausteine sollen u. a. erklären können:
- skalierte Beträge
- generalisierte Datums-/Alterswerte
- pseudonymisierte Personen und Rollen
- entfernte Spalten
- maskierte E-Mail-/Kontaktwerte
- neutralisierte Standorte, Projekte oder Kostenstellen

## ZIP-Export

Beim späteren ZIP-Export soll der generierte Kontext zusätzlich als `.md`-Datei enthalten sein, z. B. `PSEUDOY_CONTEXT.md` oder `PROMPT_CONTEXT.md`.

Der ZIP-Ordner kann perspektivisch enthalten:
- pseudonymisierte Exportdatei
- separates Mapping, sofern vom Nutzer gewählt
- Prompt-/Kontextdatei als Markdown
- optionale Transformations-Metadaten

## Noch offen

- genaue Benennung und Reihenfolge der vier Reiter
- welche Rollen vordefiniert angeboten werden
- welche Transformationen automatisch einen Prompt-Baustein erzeugen
- ob Nutzer Bausteine an-/abwählen und editieren können
- ob der Prompt-Kontext zusätzlich als JSON-Metadaten exportiert wird
