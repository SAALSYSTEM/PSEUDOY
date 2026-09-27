(() => {
  const section = document.getElementById('yStory');
  if (!section) return;

  const y = section.querySelector('.story-y');
  const original = section.querySelector('.story-original');
  const pseudo = section.querySelector('.story-pseudo');
  const mapping = section.querySelector('.story-mapping');
  const flow = section.querySelector('.story-flow-transform');
  const node = section.querySelector('.story-node');
  const sources = section.querySelector('.story-sources');
  const targets = section.querySelector('.story-targets');
  const note = section.querySelector('.story-control-note');
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

  function render() {
    ticking = false;
    const rect = section.getBoundingClientRect();
    const vh = innerHeight || document.documentElement.clientHeight;
    const total = Math.max(1, rect.height - vh);
    const p = clamp((-rect.top) / total);
    const vw = innerWidth || document.documentElement.clientWidth;
    const mobile = vw <= 700;

    const yIn = phase(p, 0.00, 0.14);
    const yScale = mix(0.34, mobile ? 0.82 : 0.92, yIn);
    y.style.setProperty('--y-scale', yScale.toFixed(3));
    y.style.setProperty('--y-opacity', phase(p, 0.01, 0.08).toFixed(3));

    const originalIn = phase(p, 0.12, 0.25);
    const originalMove = phase(p, 0.36, 0.52);
    const ox = mix(0, mobile ? -0.27 * vw : -0.30 * vw, originalMove);
    const oy = mix(-10, mobile ? -0.29 * vh : -0.30 * vh, originalMove);
    const os = mix(1, mobile ? 0.57 : 0.53, originalMove);
    setCard(original, ox, oy, os, originalIn);

    const flowIn = phase(p, 0.23, 0.31) * (1 - phase(p, 0.38, 0.47));
    flow.style.setProperty('--flow-opacity', flowIn.toFixed(3));
    flow.style.setProperty('--flow-y', `${mix(70, 122, phase(p, 0.23, 0.34))}px`);

    const pseudoIn = phase(p, 0.27, 0.38);
    const pseudoMove = phase(p, 0.38, 0.53);
    const py = mix(118, mobile ? 0.27 * vh : 0.29 * vh, pseudoMove);
    const ps = mix(0.96, mobile ? 0.61 : 0.58, pseudoMove);
    setCard(pseudo, 0, py, ps, pseudoIn);

    const mappingIn = phase(p, 0.48, 0.60);
    const mappingMove = phase(p, 0.61, 0.74);
    const mx = mix(0, mobile ? 0.27 * vw : 0.30 * vw, mappingMove);
    const my = mix(5, mobile ? -0.28 * vh : -0.30 * vh, mappingMove);
    const ms = mix(1.02, mobile ? 0.55 : 0.52, mappingMove);
    setCard(mapping, mx, my, ms, mappingIn);

    const nodeIn = phase(p, 0.69, 0.80);
    node.style.setProperty('--node-opacity', nodeIn.toFixed(3));
    node.style.setProperty('--node-scale', mix(0.78, 1, nodeIn).toFixed(3));

    const contextIn = phase(p, 0.78, 0.92);
    [sources, targets, note].forEach(el => el.style.setProperty('--context-opacity', contextIn.toFixed(3)));

    if (p > 0.92) {
      const settle = phase(p, 0.92, 1);
      y.style.setProperty('--y-scale', mix(yScale, mobile ? 0.78 : 0.86, settle).toFixed(3));
    }
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
