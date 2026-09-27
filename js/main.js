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

  const io = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  }), {threshold:.12, rootMargin:'0px 0px -4%'});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
