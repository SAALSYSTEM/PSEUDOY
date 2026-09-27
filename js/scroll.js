(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (n, a=0, b=1) => Math.min(b, Math.max(a, n));
  const localProgress = el => {
    const r = el.getBoundingClientRect();
    const span = Math.max(1, el.offsetHeight - innerHeight);
    return clamp((-r.top) / span);
  };

  const problem = document.getElementById('problemCard');
  const demoScene = document.getElementById('demoScene');
  const yScene = document.getElementById('yScene');
  const statuses = [...document.querySelectorAll('[data-demo-status]')];
  const yDots = [...document.querySelectorAll('.y-chapters span')];
  const ySubtitle = document.getElementById('ySubtitle');

  function setStatus(stage) {
    statuses.forEach((s,i) => s.classList.toggle('active', i === stage));
    window.PYDemo?.set(stage);
  }

  function draw() {
    if (problem && !reduced) {
      const r = problem.getBoundingClientRect();
      const p = clamp(1 - Math.abs((r.top + r.height*.5) - innerHeight*.58) / (innerHeight*.72));
      problem.querySelectorAll('[data-sensitive]').forEach((td,i) => td.style.setProperty('--sens', clamp(p - i*.07)));
    }

    if (demoScene) {
      const p = reduced ? 1 : localProgress(demoScene);
      const stage = p < .22 ? 0 : p < .45 ? 1 : p < .72 ? 2 : 3;
      setStatus(stage);
    }

    if (yScene) {
      const p = (reduced || innerWidth <= 760) ? 1 : localProgress(yScene);
      const chapter = p < .34 ? 0 : p < .68 ? 1 : 2;
      yDots.forEach((d,i) => d.classList.toggle('active', i === chapter));
      if (ySubtitle) ySubtitle.textContent = chapter === 0
        ? 'Originaldaten hinein. Transformation lokal.'
        : chapter === 1
          ? 'Arbeitsdatensatz und Mapping werden sichtbar getrennt.'
          : 'Der transformierte Datensatz geht zum Export. Sie entscheiden, was danach passiert.';
    }
  }

  let raf = 0;
  const schedule = () => { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; draw(); }); };
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', schedule, {passive:true});
  draw();
})();
