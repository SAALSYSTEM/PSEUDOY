(() => {
  const node = document.getElementById('typedText');
  if (!node) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const phrases = ['Lokal vorbereitet für KI.','Originalwerte schützen.','Excel lokal vorbereiten.','Kontrolliert exportieren.'];
  if (reduced) { node.textContent = phrases[0]; return; }

  let i = 0, c = 0, deleting = false;
  node.textContent = '';

  const tick = () => {
    const phrase = phrases[i];
    node.textContent = phrase.slice(0, c);
    if (!deleting) {
      if (c < phrase.length) { c++; setTimeout(tick, 72); }
      else { deleting = true; setTimeout(tick, 1750); }
    } else {
      if (c > 0) { c--; setTimeout(tick, 34); }
      else { deleting = false; i = (i + 1) % phrases.length; setTimeout(tick, 340); }
    }
  };

  setTimeout(tick, 520);
})();
