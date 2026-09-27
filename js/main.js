(() => {
  const header = document.getElementById('siteHeader');
  const btn = document.getElementById('menuBtn');
  const panel = document.getElementById('menuPanel');
  const setMenu = open => {
    btn?.setAttribute('aria-expanded', String(open));
    btn?.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    panel?.classList.toggle('open', open);
  };
  btn?.addEventListener('click', () => setMenu(btn.getAttribute('aria-expanded') !== 'true'));
  panel?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  document.addEventListener('click', e => { if (!panel?.contains(e.target) && !btn?.contains(e.target)) setMenu(false); });
  addEventListener('scroll', () => header?.classList.toggle('is-scrolled', scrollY > 24), {passive:true});

  if (!document.querySelector('link[href="css/premium.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/premium.css';
    document.head.append(link);
  }

  const brand = document.querySelector('.brand');
  if (brand) brand.innerHTML = '<span class="brand-icon brand-icon-inline" aria-hidden="true">P|Y</span><span class="brand-wordmark brand-wordmark-inline">PSEUDO Y</span>';

  const productAsset = document.querySelector('.product-asset');
  if (productAsset) productAsset.outerHTML = '<div class="product-proof reveal" aria-label="Produktprinzipien"><span><b>01</b> Spaltenweise Regeln</span><span><b>02</b> Live-Vorschau</span><span><b>03</b> Export erst nach Prüfung</span></div>';

  const datatypeData = [['Aa'],['123'],['28'],['@']];
  document.querySelectorAll('.datatype-card').forEach((card,i) => {
    const img = card.querySelector('img');
    if (img) img.outerHTML = `<div class="datatype-visual"><span class="datatype-icon">${datatypeData[i]?.[0] || 'Y'}</span></div>`;
  });

  const yStage = document.getElementById('yStage');
  if (yStage && !yStage.querySelector('.y-aura')) yStage.insertAdjacentHTML('afterbegin','<div class="y-aura" aria-hidden="true"></div>');
  const yHeading = document.getElementById('y-heading');
  if (yHeading) yHeading.innerHTML = 'Originalwerte rein.<br><span>Kontrolle bleibt bei Ihnen.</span>';
  const yNode = document.querySelector('.y-node');
  if (yNode) yNode.innerHTML = '<span>P</span><i aria-hidden="true"></i><span>Y</span>';
  const yInputTitle = document.querySelector('.y-input h3'); if (yInputTitle) yInputTitle.textContent = 'Sensible Daten';
  const yMapTitle = document.querySelector('.y-map h3'); if (yMapTitle) yMapTitle.textContent = 'Mapping';
  const yOutputTitle = document.querySelector('.y-output h3'); if (yOutputTitle) yOutputTitle.textContent = 'Transformierter Export';

  const priceCards = [...document.querySelectorAll('.price-card')];
  if (priceCards[0]) {
    priceCards[0].classList.add('featured');
    if (!priceCards[0].querySelector('.price-badge')) priceCards[0].insertAdjacentHTML('afterbegin','<div class="price-badge">Beta-Preis</div>');
  }
  if (priceCards[1]) {
    priceCards[1].classList.remove('featured');
    priceCards[1].classList.add('team-card');
    const h3 = priceCards[1].querySelector('h3'); if (h3) h3.textContent = 'Team';
    if (!priceCards[1].querySelector('.price-badge')) priceCards[1].insertAdjacentHTML('afterbegin','<div class="price-badge light">5 Lizenzen</div>');
  }

  const onpremise = document.querySelector('.onpremise-box img');
  if (onpremise) onpremise.outerHTML = '<div class="onpremise-visual" aria-label="Schematische On-Premise-Architektur"><div class="premise-cloud">Ihre Infrastruktur</div><div class="premise-line"></div><div class="premise-nodes"><span>Browser</span><span>PSEUDO Y</span><span>Export</span></div><small>Deployment in Ihrer Umgebung · Anforderungen individuell</small></div>';

  const io = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  }), {threshold:.12, rootMargin:'0px 0px -4%'});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
