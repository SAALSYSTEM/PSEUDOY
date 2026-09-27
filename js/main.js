(() => {
  const header = document.getElementById('siteHeader');
  const btn = document.getElementById('menuBtn');
  const panel = document.getElementById('menuPanel');

  // Load the final bright visual layer last. This intentionally replaces the
  // previous experimental premium layer instead of stacking another theme on top.
  if (!document.querySelector('link[data-py-theme="white"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/white-refresh.css?v=3';
    link.dataset.pyTheme = 'white';
    document.head.appendChild(link);
  }

  // Keep the brand single and simple. The canonical P|Y / PSEUDO Y wordmark is
  // supplied by layout CSS; do not inject a second icon or wordmark here.
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle?.firstChild) heroTitle.firstChild.nodeValue = '\n        Sensible Daten.\n        ';

  const kicker = document.querySelector('.hero-kicker');
  if (kicker) kicker.textContent = 'Local-first für Controlling';

  const heroSub = document.querySelector('.hero-sub');
  if (heroSub) heroSub.textContent = 'CSV- und Excel-Daten lokal im Browser transformieren. Prüfen, exportieren und anschließend selbst entscheiden, wo Sie den Datensatz weiterverwenden.';

  const setMenu = open => {
    btn?.setAttribute('aria-expanded', String(open));
    btn?.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    panel?.classList.toggle('open', open);
  };

  btn?.addEventListener('click', () => setMenu(btn.getAttribute('aria-expanded') !== 'true'));
  panel?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  document.addEventListener('click', e => {
    if (!panel?.contains(e.target) && !btn?.contains(e.target)) setMenu(false);
  });
  addEventListener('scroll', () => header?.classList.toggle('is-scrolled', scrollY > 24), { passive: true });

  const io = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  }), { threshold: .12, rootMargin: '0px 0px -4%' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
