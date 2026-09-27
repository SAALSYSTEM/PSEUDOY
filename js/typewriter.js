(() => {
  if (!document.querySelector('link[href^="css/white-refresh.css"]')) {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'css/white-refresh.css?v=20260927-1746';
    document.head.appendChild(style);
  }

  const title = document.getElementById('hero-title');
  if (title && title.firstChild && title.firstChild.nodeType === Node.TEXT_NODE) {
    title.firstChild.nodeValue = '\n        Sensible Daten.\n        ';
  }

  const node = document.getElementById('typedText');
  if (!node) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const phrases = ['Lokal für KI vorbereitet.','Originalwerte schützen.','Excel lokal vorbereiten.','Kontrolliert exportieren.'];
  if (reduced) { node.textContent = phrases[0]; return; }

  let i = 0, c = 0, deleting = false;
  node.textContent = '';

  const tick = () => {
    const phrase = phrases[i];
    node.textContent = phrase.slice(0, c);
    if (!deleting) {
      if (c < phrase.length) { c++; setTimeout(tick, 70); }
      else { deleting = true; setTimeout(tick, 1750); }
    } else {
      if (c > 0) { c--; setTimeout(tick, 32); }
      else { deleting = false; i = (i + 1) % phrases.length; setTimeout(tick, 340); }
    }
  };

  setTimeout(tick, 520);
})();
