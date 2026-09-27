(() => {
  const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const header = document.getElementById('siteHeader');
  const menuButton = document.getElementById('menuButton');
  const mobileMenu = document.getElementById('mobileMenu');

  const setMenu = (open) => {
    menuButton?.setAttribute('aria-expanded', String(open));
    mobileMenu?.classList.toggle('is-open', open);
  };

  menuButton?.addEventListener('click', () => {
    setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
  });
  mobileMenu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  const typed = document.getElementById('heroTyped');
  const phrases = [
    'Lokal vorbereitet.',
    'Originalwerte schützen.',
    'Kontrolliert exportieren.',
    'Für KI vorbereiten.'
  ];

  if (typed && !reduced) {
    let phrase = 0;
    let char = phrases[0].length;
    let deleting = true;
    let hold = 900;

    const tick = () => {
      const target = phrases[phrase];
      if (hold > 0) {
        hold -= 55;
        window.setTimeout(tick, 55);
        return;
      }

      char += deleting ? -1 : 1;
      typed.textContent = target.slice(0, Math.max(0, char));

      if (deleting && char <= 0) {
        deleting = false;
        phrase = (phrase + 1) % phrases.length;
        hold = 140;
      } else if (!deleting && char >= phrases[phrase].length) {
        deleting = true;
        hold = 1450;
      }

      window.setTimeout(tick, deleting ? 34 : 58);
    };

    window.setTimeout(tick, 1100);
  }

  const heroScene = document.querySelector('.data-scene');
  const ySection = document.querySelector('[data-y-section]');
  const yStage = document.querySelector('[data-y-stage] .y-system');
  const demoSection = document.getElementById('demo');

  const rows = [
    { name: 'Anna Müller', region: 'NRW', revenue: '10.000 €', margin: '18,4 %' },
    { name: 'Max Schmidt', region: 'Nord', revenue: '25.450 €', margin: '21,1 %' },
    { name: 'Lisa Wagner', region: 'Süd', revenue: '7.500 €', margin: '16,8 %' },
    { name: 'Tom Becker', region: 'West', revenue: '14.200 €', margin: '19,6 %' }
  ];
  const pseudoNames = ['PERSON_Y_001', 'PERSON_Y_002', 'PERSON_Y_003', 'PERSON_Y_004'];
  const revenueIndex = ['Index 20,0', 'Index 50,9', 'Index 15,0', 'Index 28,4'];
  const demoBody = document.getElementById('previewDemoBody');
  const activeColumn = document.getElementById('activeColumn');
  const ruleSelect = document.getElementById('ruleSelect');
  const ruleBefore = document.getElementById('ruleBefore');
  const ruleAfter = document.getElementById('ruleAfter');
  const stepButtons = [...document.querySelectorAll('[data-demo-step]')];
  let activeStep = -1;
  let manualStep = null;

  const demoStates = [
    {
      column: 'Kundenname',
      rule: 'Pseudonymisieren',
      before: 'Anna Müller',
      after: 'PERSON_Y_001',
      map: (r, i) => ({ ...r, name: pseudoNames[i], changed: 'name' })
    },
    {
      column: 'Umsatz',
      rule: 'Skalieren',
      before: '10.000 €',
      after: 'Index 20,0',
      map: (r, i) => ({ ...r, revenue: revenueIndex[i], changed: 'revenue' })
    },
    {
      column: 'Exportprüfung',
      rule: 'Vorschau final',
      before: 'Originalwerte',
      after: 'Export bereit',
      map: (r, i) => ({ ...r, name: pseudoNames[i], revenue: revenueIndex[i], changed: 'both' })
    }
  ];

  function renderDemo(step) {
    step = Math.max(0, Math.min(demoStates.length - 1, step));
    if (step === activeStep && manualStep === null) return;
    activeStep = step;
    const state = demoStates[step];

    stepButtons.forEach((button, i) => button.classList.toggle('is-active', i === step));
    if (activeColumn) activeColumn.textContent = state.column;
    if (ruleSelect) ruleSelect.innerHTML = `${state.rule} <span>⌄</span>`;
    if (ruleBefore) ruleBefore.textContent = state.before;
    if (ruleAfter) ruleAfter.textContent = state.after;

    if (demoBody) {
      demoBody.innerHTML = rows.map((row, i) => {
        const transformed = state.map(row, i);
        const nameChanged = transformed.changed === 'name' || transformed.changed === 'both';
        const revenueChanged = transformed.changed === 'revenue' || transformed.changed === 'both';
        return `<tr>
          <td class="${nameChanged ? 'is-changed' : ''}">${transformed.name}</td>
          <td>${transformed.region}</td>
          <td class="${revenueChanged ? 'is-changed' : ''}">${transformed.revenue}</td>
          <td>${transformed.margin}</td>
        </tr>`;
      }).join('');
    }
  }

  stepButtons.forEach((button) => {
    button.addEventListener('click', () => {
      manualStep = Number(button.dataset.demoStep || 0);
      renderDemo(manualStep);
      window.setTimeout(() => { manualStep = null; }, 1800);
    });
  });

  renderDemo(0);

  let raf = 0;
  const update = () => {
    raf = 0;
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    header?.classList.toggle('is-scrolled', scrollY > 12);

    if (heroScene) {
      const hero = document.querySelector('[data-hero]');
      const rect = hero?.getBoundingClientRect();
      const travel = Math.max(1, (hero?.offsetHeight || window.innerHeight) * .72);
      const progress = rect ? clamp(-rect.top / travel) : 0;
      heroScene.style.setProperty('--hero-p', reduced ? 0 : progress.toFixed(4));
    }

    if (demoSection && window.innerWidth > 760 && manualStep === null) {
      const rect = demoSection.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp(-rect.top / travel);
      const step = progress < .34 ? 0 : progress < .68 ? 1 : 2;
      renderDemo(step);
    }

    if (ySection && yStage && window.innerWidth > 760 && !reduced) {
      const rect = ySection.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp(-rect.top / travel);
      const main = clamp(progress / .72);
      const mapping = clamp((progress - .26) / .34);
      const exportProgress = clamp((progress - .58) / .26);
      yStage.style.setProperty('--y-p', main.toFixed(4));
      yStage.style.setProperty('--y-map', mapping.toFixed(4));
      yStage.style.setProperty('--y-export', exportProgress.toFixed(4));
      yStage.closest('[data-y-stage]')?.setAttribute('data-sc-verify-state', `${main.toFixed(2)}-${mapping.toFixed(2)}-${exportProgress.toFixed(2)}`);
    }
  };

  const requestUpdate = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };

  addEventListener('scroll', requestUpdate, { passive: true });
  addEventListener('resize', requestUpdate);
  update();
})();
