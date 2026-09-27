(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (n, a=0, b=1) => Math.min(b, Math.max(a, n));
  const range = (p,a,b) => clamp((p-a)/(b-a));
  const localProgress = el => {
    const r = el.getBoundingClientRect();
    const span = Math.max(1, el.offsetHeight - innerHeight);
    return clamp((-r.top) / span);
  };

  // Keep the canonical HTML compact; load the visual asset layer here.
  if (!document.querySelector('link[href="css/brand-assets.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/brand-assets.css';
    document.head.appendChild(link);
  }

  const problem = document.getElementById('problemCard');
  const demoScene = document.getElementById('demoScene');
  const demoSection = document.getElementById('demo');
  const yScene = document.getElementById('yScene');
  const yStage = document.getElementById('yStage');
  const statuses = [...document.querySelectorAll('[data-demo-status]')];
  const ySubtitle = document.getElementById('ySubtitle');

  // Move the existing product artwork out of the sticky demo so it can breathe.
  const productAsset = document.querySelector('.product-asset');
  if (demoSection && productAsset && !document.querySelector('.product-showcase')) {
    const section = document.createElement('section');
    section.className = 'section product-showcase';
    section.innerHTML = '<div class="wrap product-showcase-shell"><div class="product-showcase-copy reveal"><div class="eyebrow">Produktansicht</div><h2>Der Workflow bleibt sichtbar.</h2><p>Original, Vorschau und Spaltenregel liegen in einem Arbeitsbereich. So sehen Controller vor dem Export, was verändert wurde.</p></div><div class="product-showcase-asset"></div></div>';
    section.querySelector('.product-showcase-asset').appendChild(productAsset);
    demoSection.insertAdjacentElement('afterend', section);
  }

  // Replace the static Y cards with the branded three-state signature move.
  const oldGrid = document.querySelector('.y-simple-grid');
  if (oldGrid && yStage && !document.querySelector('.y-flow-svg')) {
    const template = document.createElement('template');
    template.innerHTML = `
      <svg class="y-flow-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs><linearGradient id="yBlue" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9cc8ff"/><stop offset="1" stop-color="#1f63e9"/></linearGradient></defs>
        <path class="y-base" d="M18,18 C31,29 39,38 50,50 C62,38 71,29 82,18"/><path class="y-base" d="M50,50 C50,65 50,76 50,92"/>
        <path class="y-main-flow" pathLength="1" d="M18,18 C31,29 39,38 50,50 C50,65 50,76 50,92"/><path class="y-map-flow" pathLength="1" d="M50,50 C62,38 71,29 82,18"/>
      </svg>
      <article class="y-data-card y-source-card" aria-label="Originaldaten"><span class="tag">Originaldaten</span><h3>Sensible Daten</h3><table class="y-data-table"><thead><tr><th>Name</th><th>Umsatz</th></tr></thead><tbody><tr><td>Anna Müller</td><td>10.000 €</td></tr><tr><td>Max Schmidt</td><td>25.450 €</td></tr></tbody></table></article>
      <div class="y-node" aria-label="PSEUDO Y Knoten">P|Y</div>
      <article class="y-mapping-card" aria-label="Separates Mapping"><span class="tag">Mapping · separat</span><h3>Original ↔ Pseudonym</h3><table class="mapping-mini"><tbody><tr><td>Anna Müller</td><td>PERSON_Y_001</td></tr><tr><td>Max Schmidt</td><td>PERSON_Y_002</td></tr></tbody></table><p>Nicht Teil des Arbeitsdatensatzes. Keine automatische Weitergabe an externe Systeme.</p></article>
      <article class="y-data-card y-output-card" aria-label="Transformierter Export"><span class="tag">Export</span><h3>Transformierter Datensatz</h3><table class="y-data-table"><thead><tr><th>Name</th><th>Umsatz</th></tr></thead><tbody><tr><td>PERSON_Y_001</td><td>Index 20,0</td></tr><tr><td>PERSON_Y_002</td><td>Index 50,0</td></tr></tbody></table></article>`;
    oldGrid.replaceWith(template.content);
  }

  // Re-introduce the existing PSEUDO Y datatype artwork as a compact visual chapter.
  const localFirst = document.getElementById('local-first');
  if (localFirst && !document.getElementById('datentypen')) {
    localFirst.insertAdjacentHTML('beforebegin', `
      <section class="section asset-story" id="datentypen"><div class="wrap">
        <div class="section-head center reveal"><div class="eyebrow">Datentypen</div><h2>Unterschiedliche Daten.<br>Unterschiedliche Regeln.</h2><p class="section-lede">PSEUDO Y behandelt Namen anders als Zahlen, Datumswerte oder E-Mail-Adressen.</p></div>
        <div class="datatypes-grid">
          <article class="datatype-card reveal"><img src="assets/datatypes/text.webp" loading="lazy" alt="Grafik für Textfelder"><div><b>Textfelder</b><span>z. B. Namen, interne Bezeichnungen</span></div></article>
          <article class="datatype-card reveal"><img src="assets/datatypes/numbers.webp" loading="lazy" alt="Grafik für Zahlen"><div><b>Zahlen</b><span>z. B. Alter, Umsatz</span></div></article>
          <article class="datatype-card reveal"><img src="assets/datatypes/dates.webp" loading="lazy" alt="Grafik für Datumswerte"><div><b>Datumswerte</b><span>z. B. Geburtsdatum</span></div></article>
          <article class="datatype-card reveal"><img src="assets/datatypes/email.webp" loading="lazy" alt="Grafik für E-Mail-Adressen"><div><b>E-Mail-Adressen</b><span>z. B. kunden@…</span></div></article>
        </div>
        <div class="transform-groups reveal" aria-label="Transformationsgruppen"><article><span class="eyebrow">Identität schützen</span><h3>Pseudonymisieren · Maskieren · Entfernen</h3><p>Direkte Werte gezielt verändern oder aus dem Export entfernen.</p></article><article><span class="eyebrow">Analysefähigkeit erhalten</span><h3>Clustern · Skalieren</h3><p>Strukturen erhalten, ohne den Originalwert direkt weiterzugeben.</p></article><article><span class="eyebrow">Bewusste Entscheidung</span><h3>Unverändert lassen</h3><p>Analytisch notwendige Felder können bewusst bestehen bleiben.</p></article></div>
      </div></section>`);
  }

  const yDots = [...document.querySelectorAll('.y-chapters span')];
  function setStatus(stage) { statuses.forEach((s,i) => s.classList.toggle('active', i === stage)); window.PYDemo?.set(stage); }

  function draw() {
    if (problem && !reduced) {
      const r = problem.getBoundingClientRect();
      const p = clamp(1 - Math.abs((r.top + r.height*.5) - innerHeight*.58) / (innerHeight*.72));
      problem.querySelectorAll('[data-sensitive]').forEach((td,i) => td.style.setProperty('--sens', clamp(p - i*.07)));
    }
    if (demoScene) { const p = reduced ? 1 : localProgress(demoScene); setStatus(p < .22 ? 0 : p < .45 ? 1 : p < .72 ? 2 : 3); }
    if (yScene && yStage) {
      const mobile = innerWidth <= 980;
      const p = (reduced || mobile) ? 1 : localProgress(yScene);
      const chapter = p < .34 ? 0 : p < .68 ? 1 : 2;
      const main = range(p,.05,.9), map = range(p,.31,.62), mapCard = range(p,.38,.61), out = range(p,.63,.88), nodeScale = .88 + range(p,.08,.26)*.12;
      yStage.style.setProperty('--y-main-off', (1-main).toFixed(4)); yStage.style.setProperty('--y-map-off', (1-map).toFixed(4)); yStage.style.setProperty('--y-map-card', mapCard.toFixed(4)); yStage.style.setProperty('--y-map-x', `${((1-mapCard)*30).toFixed(1)}px`); yStage.style.setProperty('--y-out', out.toFixed(4)); yStage.style.setProperty('--y-output-y', `${((1-out)*28).toFixed(1)}px`); yStage.style.setProperty('--y-node-scale', nodeScale.toFixed(3));
      yDots.forEach((d,i) => d.classList.toggle('active', i === chapter));
      if (ySubtitle) ySubtitle.textContent = chapter === 0 ? 'Originaldaten hinein. Transformation lokal.' : chapter === 1 ? 'Der Arbeitsdatensatz läuft weiter. Das Mapping zweigt separat ab.' : 'Der transformierte Datensatz geht zum Export. Sie entscheiden, was danach passiert.';
    }
  }

  let raf = 0; const schedule = () => { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; draw(); }); };
  addEventListener('scroll', schedule, {passive:true}); addEventListener('resize', schedule, {passive:true}); draw();
})();
