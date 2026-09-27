(() => {
  const typed = document.getElementById('heroTyped');
  const arrowWrap = document.querySelector('.particle-arrow-wrap');
  const canvas = document.getElementById('particleArrow');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const phrase = 'Lokal vorbereitet für KI.';

  function showArrow(){
    arrowWrap?.classList.add('is-visible');
    buildArrow();
  }

  function typeLine(){
    if(!typed) return showArrow();
    if(reduced){ typed.textContent = phrase; return showArrow(); }
    typed.textContent = '';
    let i = 0;
    const tick = () => {
      typed.textContent = phrase.slice(0, i++);
      if(i <= phrase.length){
        setTimeout(tick, i < 7 ? 78 : 62);
      } else {
        setTimeout(showArrow, 350);
      }
    };
    setTimeout(tick, 420);
  }

  function buildArrow(){
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const cssW = canvas.clientWidth || 100;
    const cssH = canvas.clientHeight || 170;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);

    const count = 1000;
    const points = [];
    const center = cssW/2;
    const stemTop = cssH * .08;
    const stemBottom = cssH * .68;
    const arrowTipY = cssH * .92;
    const wingY = cssH * .72;
    const wingSpan = cssW * .33;

    for(let i=0;i<count;i++){
      let tx,ty;
      const r = Math.random();
      if(r < .58){
        ty = stemTop + Math.random()*(stemBottom-stemTop);
        tx = center + (Math.random()-.5) * (3 + Math.random()*5);
      } else {
        const side = Math.random() < .5 ? -1 : 1;
        const t = Math.random();
        tx = center + side * wingSpan * t;
        ty = arrowTipY - (arrowTipY-wingY) * t;
        tx += (Math.random()-.5)*4;
        ty += (Math.random()-.5)*4;
      }
      const angle = Math.random()*Math.PI*2;
      const radius = cssW*(.45 + Math.random()*.55);
      points.push({
        x:center + Math.cos(angle)*radius,
        y:cssH*.5 + Math.sin(angle)*radius,
        tx,ty,
        delay:Math.random()*.58,
        size:.7 + Math.random()*1.25,
        alpha:.35 + Math.random()*.65
      });
    }

    if(reduced){
      draw(1); return;
    }

    let start;
    function frame(now){
      if(!start) start = now;
      const t = Math.min(1,(now-start)/1650);
      draw(t);
      if(t<1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    function draw(progress){
      ctx.clearRect(0,0,cssW,cssH);
      ctx.fillStyle = '#7f8752';
      for(const p of points){
        const local = Math.max(0,Math.min(1,(progress-p.delay)/(1-p.delay)));
        const e = 1-Math.pow(1-local,3);
        const x = p.x + (p.tx-p.x)*e;
        const y = p.y + (p.ty-p.y)*e;
        ctx.globalAlpha = p.alpha * Math.max(.12,e);
        ctx.beginPath();
        ctx.arc(x,y,p.size,0,Math.PI*2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
  }

  typeLine();
  addEventListener('resize', () => {
    if(arrowWrap?.classList.contains('is-visible')) buildArrow();
  }, {passive:true});
})();
