(() => {
  const section = document.querySelector('[data-product-preview]');
  if (!section) return;

  section.classList.add('is-static-mockup');

  /* Landing page = product preview only. Real interaction starts in the app. */
  const shell = section.querySelector('.product-shell');
  const head = section.querySelector('.product-preview-head');
  const intro = head?.querySelector(':scope > div:first-child');
  const copy = section.querySelector('.product-preview-copy p');
  const actions = section.querySelector('.product-preview-actions');
  const primary = actions?.querySelector('.product-btn-primary');
  const secondary = actions?.querySelector('.product-btn:not(.product-btn-primary)');
  const trustline = section.querySelector('.product-trustline');

  intro?.setAttribute('hidden', '');
  copy?.setAttribute('hidden', '');
  secondary?.setAttribute('hidden', '');
  trustline?.setAttribute('hidden', '');

  if (primary) {
    primary.innerHTML = 'PSEUDO Y starten <span>→</span>';
  }

  section.querySelectorAll('button').forEach(button => {
    button.tabIndex = -1;
    button.setAttribute('aria-disabled', 'true');
  });
  shell?.setAttribute('aria-label', 'Produktvorschau des Tabellen-Tools');

  /* Next chapter: calm trust section, no additional ScrollCraft gimmick. */
  const trust = document.createElement('section');
  trust.className = 'local-first-chapter';
  trust.setAttribute('aria-labelledby', 'localFirstTitle');
  trust.innerHTML = `
    <div class="local-first-inner">
      <div class="local-first-copy">
        <div class="local-first-kicker">LOCAL-FIRST</div>
        <h2 id="localFirstTitle">Ihre Daten bleiben<br><em>Ihre Daten.</em></h2>
        <p>PSEUDO Y bereitet Tabellen direkt im Browser vor. Kein automatischer Datei-Upload zu einem KI-Anbieter. Sie prüfen das Ergebnis und entscheiden selbst, was Sie exportieren und anschließend verwenden.</p>
      </div>

      <div class="local-first-visual" aria-label="Lokaler Datenfluss">
        <div class="local-device">
          <div class="local-device-top"><span></span><span></span><span></span></div>
          <div class="local-device-body">
            <div class="local-file-badge">XLSX</div>
            <div><strong>Ihre Tabelle</strong><small>bleibt im Browser</small></div>
          </div>
        </div>
        <div class="local-flow-arrow" aria-hidden="true">→</div>
        <div class="local-py-node"><strong>P|Y</strong><small>lokale Verarbeitung</small></div>
        <div class="local-flow-arrow" aria-hidden="true">→</div>
        <div class="local-export-node"><strong>Export</strong><small>Sie entscheiden weiter</small></div>
        <div class="local-map-branch">
          <span class="local-branch-line" aria-hidden="true"></span>
          <div class="local-map-card"><strong>Mapping</strong><small>separat behandeln</small></div>
        </div>
      </div>

      <div class="local-first-facts">
        <article><span>01</span><strong>Im Browser verarbeitet</strong><p>Die Tabelleninhalte werden lokal in der Browser-Sitzung verarbeitet.</p></article>
        <article><span>02</span><strong>Keine automatische KI-Weitergabe</strong><p>PSEUDO Y sendet Ihre Tabelle nicht automatisch an ChatGPT, Claude oder andere KI-Dienste.</p></article>
        <article><span>03</span><strong>Mapping getrennt</strong><p>Originalwert und Pseudonym bleiben als eigener, sensibler Mapping-Bereich getrennt vom Export.</p></article>
      </div>
    </div>`;
  section.insertAdjacentElement('afterend', trust);

  const style = document.createElement('style');
  style.textContent = `
    .product-preview.is-static-mockup{padding-top:clamp(54px,6vw,82px);padding-bottom:clamp(96px,10vw,136px)}
    .product-preview.is-static-mockup .product-preview-inner{display:flex;flex-direction:column}
    .product-preview.is-static-mockup .product-shell{order:1;pointer-events:none}
    .product-preview.is-static-mockup .product-preview-head{order:2;display:block;margin:28px 0 0;text-align:center}
    .product-preview.is-static-mockup .product-preview-copy{padding:0;max-width:none}
    .product-preview.is-static-mockup .product-preview-actions{justify-content:center}
    .product-preview.is-static-mockup .product-btn-primary{min-height:54px;padding:0 26px;font-size:15px;box-shadow:0 16px 32px rgba(47,107,255,.18)}
    .product-preview.is-static-mockup [hidden]{display:none!important}

    .local-first-chapter{background:#F7F5F0;padding:clamp(104px,12vw,168px) 18px}
    .local-first-inner{width:min(1160px,100%);margin:0 auto}
    .local-first-copy{max-width:880px;margin-bottom:clamp(46px,6vw,72px)}
    .local-first-kicker{display:flex;align-items:center;gap:10px;margin-bottom:17px;color:#6E7688;font-size:11px;font-weight:850;letter-spacing:.16em}
    .local-first-kicker:before{content:"";width:26px;height:1px;background:#2F6BFF}
    .local-first-copy h2{margin:0;font-family:"Iowan Old Style","Palatino Linotype","Book Antiqua",Georgia,serif;font-size:clamp(54px,7.2vw,94px);line-height:.94;letter-spacing:-.06em;font-weight:400;color:#0D1530}
    .local-first-copy h2 em{font-style:normal;color:#2F6BFF}
    .local-first-copy p{max-width:720px;margin:28px 0 0;color:#5F687A;font-size:16px;line-height:1.7}

    .local-first-visual{position:relative;display:grid;grid-template-columns:1fr auto 1fr auto 1fr;align-items:center;gap:18px;padding:36px;border:1px solid #E3E0DA;border-radius:30px;background:#FFFDFC;box-shadow:0 24px 64px rgba(13,21,48,.06)}
    .local-device,.local-py-node,.local-export-node,.local-map-card{border:1px solid #E4E6EC;border-radius:18px;background:#fff}
    .local-device{overflow:hidden}.local-device-top{height:28px;display:flex;align-items:center;gap:5px;padding:0 10px;border-bottom:1px solid #ECEEF2;background:#FAFAFB}.local-device-top span{width:6px;height:6px;border-radius:50%;background:#CFD4DC}.local-device-body{display:flex;align-items:center;gap:12px;padding:20px}.local-file-badge{display:grid;place-items:center;width:42px;height:42px;border-radius:11px;background:#E8F5ED;color:#107C41;font-size:10px;font-weight:900}.local-device strong,.local-py-node strong,.local-export-node strong,.local-map-card strong{display:block;color:#111A31;font-size:14px}.local-device small,.local-py-node small,.local-export-node small,.local-map-card small{display:block;margin-top:3px;color:#7D8595;font-size:10px}
    .local-py-node,.local-export-node{padding:22px;text-align:center}.local-py-node{border-color:#CFE0FF;background:#F3F7FF}.local-py-node strong{font-size:22px;letter-spacing:-.06em;color:#2F6BFF}.local-flow-arrow{color:#2F6BFF;font-size:25px;font-weight:700}
    .local-map-branch{position:absolute;left:50%;top:100%;transform:translate(-50%,-2px);display:grid;justify-items:center}.local-branch-line{width:1px;height:34px;background:#B8CFFF}.local-map-card{min-width:180px;padding:13px 16px;text-align:center;border-color:#D7E4FB;background:#F7FAFF}
    .local-first-facts{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:76px}.local-first-facts article{padding:24px 22px;border-top:1px solid #D9D6D0}.local-first-facts article>span{display:block;margin-bottom:25px;color:#2F6BFF;font-size:11px;font-weight:850;letter-spacing:.12em}.local-first-facts strong{display:block;margin-bottom:10px;color:#10182C;font-size:17px}.local-first-facts p{margin:0;color:#697284;font-size:13px;line-height:1.6}

    @media(max-width:700px){
      .product-preview.is-static-mockup{padding-top:36px;padding-bottom:92px}
      .product-preview.is-static-mockup .product-preview-head{margin-top:22px}
      .product-preview.is-static-mockup .product-btn-primary{width:min(100%,340px);min-height:50px}
      .local-first-chapter{padding:96px 14px 112px}
      .local-first-copy h2{font-size:clamp(50px,13vw,64px)}
      .local-first-copy p{font-size:14px;margin-top:22px}
      .local-first-visual{grid-template-columns:1fr;gap:10px;padding:18px;border-radius:24px}
      .local-flow-arrow{transform:rotate(90deg);justify-self:center;font-size:20px}
      .local-device,.local-py-node,.local-export-node{width:100%}
      .local-map-branch{position:relative;left:auto;top:auto;transform:none;margin-top:4px}.local-branch-line{height:20px}.local-map-card{width:100%;min-width:0}
      .local-first-facts{grid-template-columns:1fr;margin-top:52px;gap:0}.local-first-facts article{padding:22px 4px}.local-first-facts article>span{margin-bottom:14px}
    }
  `;
  document.head.appendChild(style);
})();
