(() => {
  const section = document.querySelector('[data-product-preview]');
  if (!section) return;

  if (!document.querySelector('link[data-landing-v16]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/landing-v16.css?v=2';
    link.dataset.landingV16 = '';
    document.head.appendChild(link);
  }

  if (!document.querySelector('link[data-pricing-v18]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/pricing-v18.css?v=1';
    link.dataset.pricingV18 = '';
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
      </section>

      <section class="pricing-chapter" aria-labelledby="pricingTitle">
        <div class="pricing-inner">
          <div class="pricing-head">
            <div>
              <div class="section-kicker">Preise</div>
              <h2 id="pricingTitle">Erst ausprobieren.<br><em>Dann passend skalieren.</em></h2>
            </div>
            <p>Ohne Account starten, mit einem kostenlosen Konto weiterarbeiten und erst bei produktiver Nutzung auf Pro, Team oder Enterprise wechseln.</p>
          </div>

          <div class="pricing-starter-grid">
            <article class="price-card price-card--starter">
              <div class="price-card-top">
                <div><span class="price-eyebrow">DEMO</span><h3>Ohne Account testen</h3></div>
                <span class="price-badge">0 €</span>
              </div>
              <div class="price-main"><strong>Direkt</strong></div>
              <div class="price-alt">Ideal, um den Workflow einmal mit kleinen Beispieldaten auszuprobieren.</div>
              <div class="price-rule"></div>
              <div class="price-matrix">
                <div class="price-metric"><small>Tabellen</small><strong>max. 200 Zeilen je Export</strong></div>
                <div class="price-metric"><small>Prompt</small><strong>max. 2 Maskierungen</strong></div>
              </div>
              <a class="price-cta" href="app.html">Ohne Account starten <span>→</span></a>
            </article>

            <article class="price-card price-card--starter price-card--free">
              <div class="price-card-top">
                <div><span class="price-eyebrow">FREE ACCOUNT</span><h3>Für wiederkehrende Tests</h3></div>
                <span class="price-badge">kostenlos</span>
              </div>
              <div class="price-main"><strong>0 €</strong></div>
              <div class="price-alt">Mehr Raum für echte Testfälle – mit kostenlosem PSEUDO-Y-Konto.</div>
              <div class="price-rule"></div>
              <div class="price-matrix">
                <div class="price-metric"><small>Tabellen</small><strong>2.000 Zeilen je Tabelle<br>1 Export / Tag</strong></div>
                <div class="price-metric"><small>Prompt</small><strong>5 Maskierungen je Prompt<br>3 Vorgänge / Tag</strong></div>
              </div>
              <a class="price-cta" href="signup.html">Kostenlos registrieren <span>→</span></a>
            </article>
          </div>

          <div class="pricing-paid-grid">
            <article class="price-card price-card--paid price-card--pro">
              <div class="price-card-top">
                <div><span class="price-eyebrow">PRO · 1 LIZENZ</span><h3>Für produktive Einzelnutzer</h3></div>
                <span class="price-badge">1 Lizenz</span>
              </div>
              <div class="price-main"><strong>19,99 €</strong><span>/ Monat</span></div>
              <div class="price-alt"><strong>191,90 € / Jahr</strong> · 20 % günstiger als monatliche Zahlung</div>
              <div class="price-rule"></div>
              <div class="price-matrix">
                <div class="price-metric"><small>Tabellen</small><strong>10.000 Zeilen je Tabelle<br>10 Exporte / Tag</strong></div>
                <div class="price-metric"><small>Prompt</small><strong>50 Maskierungen je Prompt<br>25 Vorgänge / Tag</strong></div>
              </div>
              <div class="price-lines">
                <span>Lokale Tabellenverarbeitung</span>
                <span>Pseudonymisieren, maskieren und generalisieren</span>
                <span>Kontrollierter Export und Mapping</span>
              </div>
              <a class="price-cta price-cta--primary" href="signup.html">Pro starten <span>→</span></a>
            </article>

            <article class="price-card price-card--paid">
              <div class="price-card-top">
                <div><span class="price-eyebrow">TEAM · 5 LIZENZEN</span><h3>Für Finance-Teams</h3></div>
                <span class="price-badge">5 Lizenzen</span>
              </div>
              <div class="price-main"><strong>79 €</strong><span>/ Monat</span></div>
              <div class="price-alt">jede weitere Lizenz <strong>9,99 € / Monat</strong></div>
              <div class="price-rule"></div>
              <div class="price-matrix">
                <div class="price-metric"><small>Tabellen</small><strong>100.000 Zeilen je Tabelle<br>100 Exporte / Woche</strong></div>
                <div class="price-metric"><small>Prompt</small><strong>200 Maskierungen je Prompt<br>250 Vorgänge / Woche</strong></div>
              </div>
              <div class="price-lines">
                <span>+20 Tabellen-Exporte / Woche je Zusatzlizenz</span>
                <span>+50 Prompt-Vorgänge / Woche je Zusatzlizenz</span>
                <span>Gleicher lokaler Workflow für alle Lizenzen</span>
              </div>
              <a class="price-cta" href="preise.html">Team ansehen <span>→</span></a>
              <div class="price-note">Das Zeilenlimit gilt je Tabelle. Die praktische Verarbeitung großer Dateien hängt zusätzlich vom verwendeten Browser und Endgerät ab.</div>
            </article>

            <article class="price-card price-card--paid price-card--enterprise">
              <div class="price-card-top">
                <div><span class="price-eyebrow">ENTERPRISE</span><h3>Für eigene Infrastruktur &amp; Prozesse</h3></div>
                <span class="price-badge">individuell</span>
              </div>
              <div class="price-main price-main--text"><strong>Auf Anfrage</strong></div>
              <div class="price-alt">Für Unternehmen mit eigenen Betriebs-, Integrations- und Automatisierungsanforderungen.</div>
              <div class="price-rule"></div>
              <div class="price-matrix">
                <div class="price-metric"><small>Betrieb</small><strong>On-Premise</strong></div>
                <div class="price-metric"><small>Integration</small><strong>API &amp; Automation</strong></div>
              </div>
              <div class="price-lines">
                <span>Individuelle Volumen und Nutzungslimits</span>
                <span>Integration in bestehende Datenprozesse</span>
                <span>Bereitstellung nach Infrastrukturvorgaben</span>
              </div>
              <a class="price-cta" href="preise.html#kontakt">Kontakt aufnehmen <span>→</span></a>
            </article>
          </div>

          <div class="pricing-foot">
            <span>Alle Preise zzgl. gesetzlicher Umsatzsteuer. Demo und Free Account bleiben kostenlos.</span>
            <a href="preise.html">Alle Tarifdetails →</a>
          </div>
        </div>
      </section>`);
  }
})();
