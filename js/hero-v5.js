(() => {
  const lineOne = document.getElementById('heroLineOne');
  const lineTwoA = document.getElementById('heroLineTwoA');
  const lineTwoB = document.getElementById('heroLineTwoB');
  const hero = document.querySelector('.hero');
  const arrowWrap = document.querySelector('.particle-arrow-wrap');
  const canvas = document.getElementById('particleArrow');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const menuButton = document.getElementById('menuButton');
  const menuOverlay = document.getElementById('menuOverlay');

  const textOne = 'Sensible Daten.';
  const textTwoA = 'Lokal vorbereitet';
  const textTwoB = 'für KI.';

  function setMenu(open){
    menuButton?.setAttribute('aria-expanded', String(open));
    menuButton?.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    menuOverlay?.setAttribute('aria-hidden', String(!open));
    menuOverlay?.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  }

  menuButton?.addEventListener('click', () => {
    setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
  });
  menuOverlay?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', event => {
    if(event.key === 'Escape') setMenu(false);
  });

  const typeInto = (node, text, delay = 62) => new Promise((resolve) => {
    if (!node) return resolve();
    node.textContent = '';
    let i = 0;
    const tick = () => {
      i += 1;
      node.textContent = text.slice(0, i);
      if (i < text.length) setTimeout(tick, delay);
      else resolve();
    };
    tick();
  });

  async function runHero(){
    if(reduced){
      if(lineOne) lineOne.textContent = textOne;
      if(lineTwoA) lineTwoA.textContent = textTwoA;
      if(lineTwoB) lineTwoB.textContent = textTwoB;
      hero?.classList.add('second-line-active','typing-complete');
      showArrow(true);
      return;
    }

    if(lineOne) lineOne.textContent = '';
    if(lineTwoA) lineTwoA.textContent = '';
    if(lineTwoB) lineTwoB.textContent = '';

    await new Promise(r => setTimeout(r, 420));
    await typeInto(lineOne, textOne, 78);
    await new Promise(r => setTimeout(r, 250));
    hero?.classList.add('second-line-active');
    await typeInto(lineTwoA, textTwoA, 64);
    await new Promise(r => setTimeout(r, 90));
    await typeInto(lineTwoB, textTwoB, 64);
    hero?.classList.add('typing-complete');
    await new Promise(r => setTimeout(r, 320));
    showArrow(false);
  }

  function showArrow(instant){
    arrowWrap?.classList.add('is-visible');
    buildArrow(instant);
  }

  function buildArrow(instant = false){
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const cssW = canvas.clientWidth || 136;
    const cssH = canvas.clientHeight || 202;
    const dpr = Math.min(devicePixelRatio || 1, 2);

    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);

    const count = 1000;
    const center = cssW / 2;
    const stemTop = cssH * .06;
    const stemBottom = cssH * .60;
    const tipY = cssH * .93;
    const shoulderY = cssH * .65;
    const halfWing = cssW * .36;
    const points = [];

    for(let i=0;i<count;i++){
      let tx,ty;
      if(i < 620){
        ty = stemTop + Math.random() * (stemBottom - stemTop);
        tx = center + (Math.random() - .5) * (4 + Math.random() * 6);
      } else {
        const side = Math.random() < .5 ? -1 : 1;
        const t = Math.random();
        tx = center + side * halfWing * t + (Math.random()-.5)*4;
        ty = tipY - (tipY - shoulderY) * t + (Math.random()-.5)*4;
      }

      points.push({
        sx: Math.random() * cssW,
        sy: Math.random() * cssH,
        tx, ty,
        delay: Math.random() * .48,
        size: .65 + Math.random() * 1.45,
        alpha: .46 + Math.random() * .54
      });
    }

    function draw(progress){
      ctx.clearRect(0,0,cssW,cssH);
      ctx.fillStyle = '#2F6BFF';
      for(const p of points){
        const local = Math.max(0, Math.min(1, (progress - p.delay) / (1 - p.delay)));
        const e = 1 - Math.pow(1-local, 3);
        const x = p.sx + (p.tx-p.sx) * e;
        const y = p.sy + (p.ty-p.sy) * e;
        ctx.globalAlpha = p.alpha * (.18 + .82*e);
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI*2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    if(instant || reduced){ draw(1); return; }

    let start = 0;
    const animate = (now) => {
      if(!start) start = now;
      const t = Math.min(1, (now-start) / 1500);
      draw(t);
      if(t < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  runHero();

  let resizeTimer;
  addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if(arrowWrap?.classList.contains('is-visible')) buildArrow(true);
    }, 120);
  }, {passive:true});
})();
