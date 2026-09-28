(() => {
  const section = document.querySelector('[data-product-preview]');
  if (!section) return;

  section.classList.add('is-static-mockup');

  /* The landing page only previews the product here. The real interaction starts in the app. */
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
    primary.textContent = 'PSEUDO Y starten';
    const arrow = document.createElement('span');
    arrow.textContent = '→';
    primary.appendChild(arrow);
  }

  /* Freeze one convincing example state; no landing-page mini app. */
  section.querySelectorAll('button').forEach(button => {
    button.tabIndex = -1;
    button.setAttribute('aria-disabled', 'true');
  });
  shell?.setAttribute('aria-label', 'Produktvorschau des Tabellen-Tools');

  const style = document.createElement('style');
  style.textContent = `
    .product-preview.is-static-mockup{padding-top:clamp(64px,7vw,92px);padding-bottom:clamp(96px,10vw,140px)}
    .product-preview.is-static-mockup .product-preview-inner{display:flex;flex-direction:column}
    .product-preview.is-static-mockup .product-shell{order:1;pointer-events:none}
    .product-preview.is-static-mockup .product-preview-head{order:2;display:block;margin:28px 0 0;text-align:center}
    .product-preview.is-static-mockup .product-preview-copy{padding:0;max-width:none}
    .product-preview.is-static-mockup .product-preview-actions{justify-content:center}
    .product-preview.is-static-mockup .product-btn-primary{min-height:52px;padding:0 24px;font-size:15px;box-shadow:0 16px 32px rgba(47,107,255,.18)}
    .product-preview.is-static-mockup [hidden]{display:none!important}
    @media(max-width:700px){
      .product-preview.is-static-mockup{padding-top:44px;padding-bottom:96px}
      .product-preview.is-static-mockup .product-preview-head{margin-top:22px}
      .product-preview.is-static-mockup .product-btn-primary{width:min(100%,340px);min-height:50px}
    }
  `;
  document.head.appendChild(style);
})();
