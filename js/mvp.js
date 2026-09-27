(() => {
  const menuBtn = document.getElementById('menuBtn');
  const menu = document.getElementById('menu');
  const setMenu = open => {
    menu?.classList.toggle('open', open);
    menuBtn?.setAttribute('aria-expanded', String(open));
  };
  menuBtn?.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  const rows = [
    {name:'Anna Müller', region:'NRW', revenue:'10.000 €', margin:'18,4 %'},
    {name:'Max Schmidt', region:'Nord', revenue:'25.450 €', margin:'21,1 %'},
    {name:'Lisa Wagner', region:'Süd', revenue:'7.500 €', margin:'16,8 %'}
  ];
  let column = 'name';
  let method = 'pseudo';
  const body = document.getElementById('demoBody');
  const preview = document.getElementById('preview');
  const nameMap = ['PERSON_Y_001','PERSON_Y_002','PERSON_Y_003'];
  const revenueMap = ['Index 20,0','Index 50,0','Index 15,0'];

  function render(){
    if(!body) return;
    body.innerHTML = rows.map((r,i) => {
      const name = column==='name' && method==='pseudo' ? nameMap[i] : r.name;
      const revenue = column==='revenue' && method==='scale' ? revenueMap[i] : r.revenue;
      return `<tr><td class="${name!==r.name?'changed':''}">${name}</td><td>${r.region}</td><td class="${revenue!==r.revenue?'changed':''}">${revenue}</td><td>${r.margin}</td></tr>`;
    }).join('');
    if(preview){
      if(column==='name' && method==='pseudo') preview.innerHTML='<strong>Anna Müller</strong><br>→ PERSON_Y_001';
      else if(column==='revenue' && method==='scale') preview.innerHTML='<strong>10.000 €</strong><br>→ Index 20,0';
      else preview.innerHTML='<strong>Wert bleibt unverändert</strong>';
    }
  }

  document.querySelectorAll('[data-column]').forEach(btn => btn.addEventListener('click', () => {
    column = btn.dataset.column;
    document.querySelectorAll('[data-column]').forEach(b => b.classList.toggle('active', b===btn));
    if(column==='name') method='pseudo'; else if(column==='revenue') method='scale';
    document.querySelectorAll('[data-method]').forEach(b => b.classList.toggle('active', b.dataset.method===method));
    render();
  }));
  document.querySelectorAll('[data-method]').forEach(btn => btn.addEventListener('click', () => {
    method = btn.dataset.method;
    document.querySelectorAll('[data-method]').forEach(b => b.classList.toggle('active', b===btn));
    render();
  }));
  render();
})();