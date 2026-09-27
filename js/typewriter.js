(() => {
  const title = document.getElementById('hero-title');
  if (title?.firstChild?.nodeType === Node.TEXT_NODE) {
    title.firstChild.nodeValue = '\n        Sensible Daten.\n        ';
  }

  const node = document.getElementById('typedText');
  if (!node) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const phrases = [
    'Lokal für KI vorbereitet.',
    'Originalwerte schützen.',
    'Kontrolliert exportieren.'
  ];

  if (reduced) {
    node.textContent = phrases[0];
    return;
  }

  let i = 0;
  let c = 0;
  let deleting = false;
  node.textContent = '';

  const tick = () => {
    const phrase = phrases[i];
    node.textContent = phrase.slice(0, c);

    if (!deleting) {
      if (c < phrase.length) {
        c += 1;
        setTimeout(tick, 76);
      } else {
        deleting = true;
        setTimeout(tick, 1750);
      }
    } else if (c > 0) {
      c -= 1;
      setTimeout(tick, 34);
    } else {
      deleting = false;
      i = (i + 1) % phrases.length;
      setTimeout(tick, 360);
    }
  };

  setTimeout(tick, 650);
})();
