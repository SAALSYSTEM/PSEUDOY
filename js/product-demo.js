(() => {
  const section = document.querySelector('[data-product-preview]');
  if (!section) return;

  if (!document.querySelector('link[data-landing-v16]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/landing-v16.css?v=1';
    link.dataset.landingV16 = '';
    document.head.appendChild(link);
  }

  /* Product chapter = one static table mockup + one CTA. */
  section.classList.add('product-preview--mockup');
  section.removeAttribute('data-product-preview');
  section.querySelector('.product-preview-head')?.remove();
  section.querySelector('.product-trustline')?.remove();
  section.querySelector('.product-rail')?.remove();
  section.querySelector('.rule-panel')?.remove();
  section.querySelector('.product-window-actions')?.remove();

  section.querySelectorAll('.demo-head button').forEach(button => {
    button.removeAttribute('data-column');
    button.setAttribute('tabindex', '-1');
    button.setAttribute('aria-hidden', 'true');
  });
  section.querySelectorAll('.selected-cell,.is-selected').forEach(el => el.classList.remove('selected-cell','is-selected'));

  const demoFooter = section.querySelector('.demo-footer');
  if (demoFooter) {
    demoFooter.innerHTML = '<span>Beispielansicht · 7 Zeilen</span><span>Tabellen lokal vorbereiten</span><div class="demo-pages"><span class="demo-page">‹</span><span class="demo-page is-current">1</span><span class="demo-page">›</span></div>';
  }

  const shell = section.querySelector('.product-shell');
  shell?.setAttribute('aria-label', 'Statische Produktvorschau des Tabellen-Tools');
  if (shell && !section.querySelector('.mockup-cta-wrap')) {
    shell.insertAdjacentHTML('afterend', `
      <div class="mockup-cta-wrap">
        <a class="mockup-cta" href="app.html">PSEUDO Y starten <span aria-hidden="true">→</span></a>
      </div>`);
  }

  if (!document.querySelector('.trust-chapter')) {
    section.insertAdjacentHTML('afterend', `
      <section class="trust-chapter" aria-labelledby="trustTitle">
        <div class="trust-inner">
          <div class="trust-copy">
            <div class="section-kicker">Local-first</div>
            <h2 id="trustTitle">Ihre Daten bleiben <em>unter Ihrer Kontrolle.</em></h2>
            <p>PSEUDO Y bereitet Tabellen im Browser vor. Es gibt keine automatische Weitergabe Ihrer Datei an ChatGPT, Claude, Gemini oder andere KI-Dienste. Erst Sie entscheiden, was Sie anschließend exportieren und weiterverwenden.</p>
            <div class="trust-points">
              <div class="trust-point"><strong>Im Browser</strong>Die Verarbeitung der Tabelleninhalte findet lokal in der Anwendung statt.</div>
              <div class="trust-point"><strong>Keine automatische KI-Weitergabe</strong>PSEUDO Y bereitet Daten vor – es analysiert sie nicht bei einem KI-Anbieter.</div>
              <div class="trust-point"><strong>Mapping separat</strong>Originalwert und Pseudonym bleiben als eigener Mapping-Bereich getrennt vom Export.</div>
              <div class="trust-point"><strong>Export unter Ihrer Kontrolle</strong>Sie bestimmen, welche vorbereiteten Daten danach weiterverwendet werden.</div>
            </div>
          </div>

          <div class="local-flow" aria-label="Datenfluss von der lokalen Datei zum kontrollierten Export">
            <div class="local-flow-main">
              <div class="local-node"><strong>Ihre Datei</strong><small>CSV / XLSX<br>mit sensiblen Werten</small></div>
              <div class="local-arrow" aria-hidden="true">→</div>
              <div class="local-node is-core"><strong>PSEUDO Y</strong><small>Regeln anwenden<br>im Browser</small></div>
              <div class="local-arrow" aria-hidden="true">→</div>
              <div class="local-node"><strong>Ihr Export</strong><small>pseudonymisiert,<br>maskiert oder generalisiert</small></div>
            </div>
            <div class="local-branch">
              <div class="local-branch-card"><strong>Mapping separat</strong>Originalwert ↔ Pseudonym bleibt ein eigener, getrennter Bereich.</div>
            </div>
            <p class="local-caption">PSEUDO Y sendet den Export nicht automatisch an einen KI-Dienst.</p>
          </div>
        </div>
      </section>

      <section class="usecases" aria-labelledby="usecasesTitle">
        <div class="usecases-inner">
          <div class="usecases-head">
            <div>
              <div class="section-kicker">Für Finance & Controlling</div>
              <h2 id="usecasesTitle">Mit echten Arbeitsdaten arbeiten. <em>Ohne Klarnamen mitzuschicken.</em></h2>
            </div>
            <p class="usecases-intro">Nicht jede Analyse braucht die echten Namen hinter einer Zahl. PSEUDO Y schafft eine kontrollierte Zwischenschicht für typische Daten aus Controlling, Finance und Reporting.</p>
          </div>

          <div class="usecase-grid">
            <article class="usecase-card">
              <span class="usecase-num">01</span>
              <h3>Kunden- &amp; Vertriebsanalysen</h3>
              <p>Kunden, Ansprechpartner und E-Mail-Adressen ersetzen, während Umsatz, Segment oder Marge für die Analyse nutzbar bleiben.</p>
              <div class="usecase-example"><span>Anna Müller</span><span class="usecase-arrow">→</span><span>Kunde_001Y</span><span>Umsatz bleibt analysierbar</span></div>
            </article>

            <article class="usecase-card">
              <span class="usecase-num">02</span>
              <h3>Planung, Forecast &amp; Szenarien</h3>
              <p>Standorte, Projekte, Kostenstellen oder Produktgruppen neutralisieren, bevor Daten in ein externes Analyse- oder KI-Tool gehen.</p>
              <div class="usecase-example"><span>Werk Köln</span><span class="usecase-arrow">→</span><span>Standort_03Y</span><span>Forecast</span></div>
            </article>

            <article class="usecase-card">
              <span class="usecase-num">03</span>
              <h3>Personal- &amp; Headcount-Daten</h3>
              <p>Namen und E-Mails pseudonymisieren, Geburtsdaten generalisieren und Beträge bei Bedarf skalieren – für Auswertungen ohne direkte Identität.</p>
              <div class="usecase-example"><span>03.06.1990</span><span class="usecase-arrow">→</span><span>30–39 Jahre</span><span>Gehalt skalieren</span></div>
            </article>

            <article class="usecase-card is-prompt">
              <span class="usecase-num">04</span>
              <h3>Prompts &amp; Management-Kommentare</h3>
              <p>Auch Freitext soll lokal vorbereitet werden können: Namen oder interne Begriffe markieren, maskieren und erst danach kontrolliert weiterverwenden.</p>
              <div class="usecase-example"><span>Projekt Phoenix</span><span class="usecase-arrow">→</span><span>Projekt_01Y</span><span>Prompt vorbereiten</span></div>
            </article>
          </div>
        </div>
      </section>`);
  }
})();
