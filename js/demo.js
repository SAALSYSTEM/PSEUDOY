(() => {
  const rows = [
    { customer:'Anna Müller', region:'NRW', revenue:'10.000 €', margin:'18,4 %' },
    { customer:'Max Schmidt', region:'Nord', revenue:'25.450 €', margin:'21,1 %' },
    { customer:'Lisa Wagner', region:'Süd', revenue:'7.500 €', margin:'16,8 %' },
    { customer:'Jonas Becker', region:'West', revenue:'18.300 €', margin:'19,6 %' }
  ];
  const state = { column:'customer', method:'pseudo' };
  const body = document.getElementById('demoBody');
  const preview = document.getElementById('previewCard');
  if (!body || !preview) return;

  const pseudo = i => `PERSON_Y_${String(i+1).padStart(3,'0')}`;
  const revenueIndex = i => ['20,0','50,0','10,0','30,0'][i];
  const transform = (row, i, key) => {
    if (key !== state.column || state.method === 'keep') return row[key];
    if (key === 'customer' && state.method === 'pseudo') return pseudo(i);
    if (key === 'revenue' && state.method === 'scale') return `Umsatzindex ${revenueIndex(i)}`;
    if (key === 'customer' && state.method === 'scale') return row[key];
    if (key === 'revenue' && state.method === 'pseudo') return `VALUE_Y_${String(i+1).padStart(3,'0')}`;
    return row[key];
  };

  function render() {
    body.innerHTML = rows.map((row,i) => `<tr>${['customer','region','revenue','margin'].map(k => {
      const v = transform(row,i,k); const changed = v !== row[k];
      return `<td class="${changed?'changed':''}">${v}</td>`;
    }).join('')}</tr>`).join('');
    document.querySelectorAll('#demoTable th').forEach(th => th.classList.toggle('active', th.dataset.col === state.column));
    document.querySelectorAll('[data-column]').forEach(btn => btn.classList.toggle('active', btn.dataset.column === state.column));
    document.querySelectorAll('[data-method]').forEach(btn => btn.classList.toggle('active', btn.dataset.method === state.method));
    const before = rows[0][state.column]; const after = transform(rows[0],0,state.column);
    preview.innerHTML = `<strong>${before}</strong><br>→ ${after}`;
  }

  document.querySelectorAll('[data-column]').forEach(btn => btn.addEventListener('click', () => {
    state.column = btn.dataset.column;
    state.method = state.column === 'revenue' ? 'scale' : 'pseudo';
    render();
  }));
  document.querySelectorAll('[data-method]').forEach(btn => btn.addEventListener('click', () => { state.method = btn.dataset.method; render(); }));
  document.querySelectorAll('#demoTable th[data-col]').forEach(th => th.addEventListener('click', () => {
    if (!['customer','revenue'].includes(th.dataset.col)) return;
    state.column = th.dataset.col; state.method = state.column === 'revenue' ? 'scale' : 'pseudo'; render();
  }));

  window.PYDemo = {
    set(stage) {
      if (stage <= 0) { state.column='customer'; state.method='keep'; }
      if (stage === 1) { state.column='customer'; state.method='keep'; }
      if (stage === 2) { state.column='customer'; state.method='pseudo'; }
      if (stage >= 3) { state.column='revenue'; state.method='scale'; }
      render();
    }
  };
  render();
})();
