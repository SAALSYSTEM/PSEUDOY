(() => {
  const section = document.getElementById('yStory');
  if (!section) return;

  const y = section.querySelector('.story-y');
  const flows = section.querySelector('.story-flows');
  const flowRed = section.querySelector('.flow-red');
  const flowMap = section.querySelector('.flow-map');
  const flowOutput = section.querySelector('.flow-output');
  const original = section.querySelector('.original-card');
  const pseudo = section.querySelector('.pseudo-card');
  const mapping = section.querySelector('.mapping-card');
  const sources = section.querySelector('.source-strip');
  const mappingStore = section.querySelector('.mapping-store');
  const exportCluster = section.querySelector('.export-cluster');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const smooth = t => {
    t = clamp(t);
    return t * t * (3 - 2 * t);
  };
  const phase = (p, a, b) => smooth((p - a) / (b - a));
  const mix = (a, b, t) => a + (b - a) * t;

  let ticking = false;

  function setCard(el, x, yPos, scale, opacity) {
    el.style.setProperty('--tx', `${x}px`);
    el.style.setProperty('--ty', `${yPos}px`);
    el.style.setProperty('--card-scale', scale.toFixed(3));
    el.style.setProperty('--card-opacity', opacity.toFixed(3));
  }

  function drawPath(path, progress, length = 820) {
    if (!path) return;
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length * (1 - clamp(progress)));
  }

  function render() {
    ticking = false;
    const rect = section.getBoundingClientRect();
    const vh = innerHeight || document.documentElement.clientHeight;
    const vw = innerWidth || document.documentElement.clientWidth;
    const total = Math.max(1, rect.height - vh);
    const p = clamp((-rect.top) / total);
    const mobile = vw <= 700;

    const yIn = phase(p, 0.00, 0.13);
    const finalYScale = mobile ? 0.82 : 0.90;
    const peakYScale = mobile ? 1.03 : 1.08;
    const ySettle = phase(p, 0.70, 0.88);
    const yScale = mix(mix(0.36, peakYScale, yIn), finalYScale, ySettle);
    y.style.setProperty('--y-scale', yScale.toFixed(3));
    y.style.setProperty('--y-opacity', phase(p, 0.01, 0.07).toFixed(3));
    y.style.setProperty('--y-dark', mix(1, 0.11, phase(p, 0.72, 0.91)).toFixed(3));
    flows.style.setProperty('--y-scale', yScale.toFixed(3));

    const originalIn = phase(p, 0.13, 0.25);
    const originalMove = phase(p, 0.29, 0.43);
    const originalX = mix(0, mobile ? -0.245 * vw : -0.29 * vw, originalMove);
    const originalY = mix(-18, mobile ? -0.285 * vh : -0.29 * vh, originalMove);
    const originalScale = mix(0.98, mobile ? 0.52 : 0.69, originalMove);
    setCard(original, originalX, originalY, originalScale, originalIn);

    const pseudoIn = phase(p, 0.29, 0.40);
    const pseudoMove = phase(p, 0.43, 0.57);
    const pseudoSettle = phase(p, 0.73, 0.90);
    const pseudoYFocus = mix(112, mobile ? 0.19 * vh : 0.235 * vh, pseudoMove);
    const pseudoY = mix(pseudoYFocus, mobile ? 0.235 * vh : 0.255 * vh, pseudoSettle);
    const pseudoFocusScale = mix(0.96, mobile ? 0.93 : 0.86, pseudoMove);
    const pseudoScale = mix(pseudoFocusScale, mobile ? 0.72 : 0.76, pseudoSettle);
    setCard(pseudo, 0, pseudoY, pseudoScale, pseudoIn);

    const mappingIn = phase(p, 0.49, 0.61);
    const mappingMove = phase(p, 0.64, 0.78);
    const mappingX = mix(0, mobile ? 0.245 * vw : 0.29 * vw, mappingMove);
    const mappingY = mix(-12, mobile ? -0.285 * vh : -0.29 * vh, mappingMove);
    const mappingScale = mix(0.98, mobile ? 0.52 : 0.69, mappingMove);
    setCard(mapping, mappingX, mappingY, mappingScale, mappingIn);

    const redDraw = phase(p, 0.72, 0.82);
    const outDraw = phase(p, 0.77, 0.87);
    const mapDraw = phase(p, 0.81, 0.91);
    const flowOpacity = phase(p, 0.70, 0.78);
    flows.style.setProperty('--flow-opacity', flowOpacity.toFixed(3));
    drawPath(flowRed, redDraw);
    drawPath(flowOutput, outDraw, 520);
    drawPath(flowMap, mapDraw);
    flows.style.setProperty('--heads-opacity', phase(p, 0.86, 0.93).toFixed(3));

    const sourceIn = phase(p, 0.82, 0.91);
    const mappingStoreIn = phase(p, 0.84, 0.92);
    const exportIn = phase(p, 0.89, 0.97);
    sources.style.setProperty('--context-opacity', sourceIn.toFixed(3));
    mappingStore.style.setProperty('--context-opacity', mappingStoreIn.toFixed(3));
    exportCluster.style.setProperty('--context-opacity', exportIn.toFixed(3));
  }

  function requestRender() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(render);
  }

  addEventListener('scroll', requestRender, { passive: true });
  addEventListener('resize', requestRender, { passive: true });
  requestRender();
})();
