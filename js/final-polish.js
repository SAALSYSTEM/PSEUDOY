(() => {
  const stage = document.querySelector('.y-stage');
  if (!stage) return;

  /* Replace fragile remote format icons with crisp local SVG/CSS marks. */
  const sourceChips = stage.querySelectorAll('.source-strip .format-chip');
  if (sourceChips[0]) {
    sourceChips[0].innerHTML = `
      <span class="format-mark-local excel-local" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none">
          <rect x="10" y="5" width="16" height="22" rx="3" fill="currentColor" opacity=".18"/>
          <rect x="5" y="8" width="14" height="16" rx="2.5" fill="currentColor"/>
          <path d="M9 12.2 15.2 20M15.2 12.2 9 20" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>
          <path d="M20.5 10.5h3M20.5 14.5h3M20.5 18.5h3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
      </span><small>Excel</small>`;
  }
  if (sourceChips[1]) {
    sourceChips[1].innerHTML = `<span class="format-mark-local csv-local" aria-hidden="true">CSV</span><small>CSV</small>`;
  }
  if (sourceChips[2]) {
    sourceChips[2].innerHTML = `<span class="format-mark-local json-local" aria-hidden="true">{ }</span><small>JSON</small>`;
  }

  /* Provider icons: use Google's favicon service for the current official site icon;
     each has a visible fallback underneath so the layout never shows a broken-image glyph. */
  const providers = [
    ['ChatGPT', 'chatgpt.com', '◎', 'chatgpt-fallback'],
    ['Gemini', 'gemini.google.com', '✦', 'gemini-fallback'],
    ['Claude', 'claude.ai', '✳', 'claude-fallback'],
    ['Grok', 'grok.com', '╱×', 'grok-fallback']
  ];
  const targetChips = stage.querySelectorAll('.target-strip .target-chip');
  targetChips.forEach((chip, i) => {
    const [name, domain, fallback, fallbackClass] = providers[i] || providers[0];
    chip.innerHTML = `
      <span class="ai-logo-final" aria-hidden="true">
        <span class="brand-fallback ${fallbackClass}">${fallback}</span>
        <img src="https://www.google.com/s2/favicons?domain=${domain}&sz=128" alt="" decoding="async">
      </span>
      <small>${name}</small>`;
    const img = chip.querySelector('img');
    img?.addEventListener('error', () => img.remove(), { once:true });
  });

  /* Use proper SVG markers for arrowheads instead of hand-drawn chevrons. */
  const flowSvg = stage.querySelector('.story-flows');
  if (flowSvg) {
    let defs = flowSvg.querySelector('defs');
    if (!defs) {
      defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      flowSvg.prepend(defs);
    }
    defs.insertAdjacentHTML('beforeend', `
      <marker id="arrowRedFinal" markerWidth="8" markerHeight="8" refX="6.8" refY="4" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L8,4 L0,8 L2.4,4 Z" fill="#E6535B"/>
      </marker>
      <marker id="arrowBlueFinal" markerWidth="8" markerHeight="8" refX="6.8" refY="4" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L8,4 L0,8 L2.4,4 Z" fill="#316CFA"/>
      </marker>`);
    stage.querySelector('.flow-red')?.setAttribute('marker-end', 'url(#arrowRedFinal)');
    stage.querySelector('.flow-map')?.setAttribute('marker-end', 'url(#arrowBlueFinal)');
    stage.querySelector('.flow-output')?.setAttribute('marker-end', 'url(#arrowBlueFinal)');
  }
})();
