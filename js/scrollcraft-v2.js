(() => {
  const clamp=(n,min=0,max=1)=>Math.min(max,Math.max(min,n));
  const lerp=(a,b,t)=>a+(b-a)*t;
  const ease=t=>1-Math.pow(1-clamp(t),3);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

  const menuButton=document.getElementById('menuButton');
  const menuOverlay=document.getElementById('menuOverlay');
  const setMenu=(open)=>{
    menuButton?.setAttribute('aria-expanded',String(open));
    menuOverlay?.classList.toggle('is-open',open);
    document.body.classList.toggle('menu-open',open);
  };
  menuButton?.addEventListener('click',()=>setMenu(menuButton.getAttribute('aria-expanded')!=='true'));
  menuOverlay?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});

  const yStory=document.getElementById('yStory');
  const yStage=document.getElementById('yStage');

  function setYProgress(p){
    if(!yStage)return;
    p=clamp(p);
    const title=ease(clamp((p-.03)/.12));
    const draw=ease(clamp((p-.02)/.22));
    const focus=ease(clamp((p-.08)/.22));

    // Y dominates first, then settles back to make room for data.
    const yShrink=ease(clamp((p-.12)/.28));
    const yScale=lerp(1.58,.76,yShrink);

    // Source data enters large in the centre.
    const sourceIn=ease(clamp((p-.24)/.16));
    // Then shrinks and docks upper-left.
    const sourceDock=ease(clamp((p-.44)/.22));
    const desktop=innerWidth>900;
    const sourceScale=lerp(1,desktop?.58:.72,sourceDock);
    const sourceX=desktop?lerp(0,-innerWidth*.27,sourceDock):lerp(0,-innerWidth*.08,sourceDock);
    const sourceY=desktop?lerp(0,-innerHeight*.23,sourceDock):lerp(0,-innerHeight*.24,sourceDock);

    const mapIn=ease(clamp((p-.57)/.16));
    const exportIn=ease(clamp((p-.70)/.16));
    const captionIn=ease(clamp((p-.82)/.12));

    yStage.style.setProperty('--y-title',title.toFixed(4));
    yStage.style.setProperty('--y-draw',draw.toFixed(4));
    yStage.style.setProperty('--y-focus',focus.toFixed(4));
    yStage.style.setProperty('--y-scale',yScale.toFixed(4));
    yStage.style.setProperty('--source-o',sourceIn.toFixed(4));
    yStage.style.setProperty('--source-s',sourceScale.toFixed(4));
    yStage.style.setProperty('--source-x',`${sourceX.toFixed(1)}px`);
    yStage.style.setProperty('--source-y',`${sourceY.toFixed(1)}px`);
    yStage.style.setProperty('--map-o',mapIn.toFixed(4));
    yStage.style.setProperty('--map-note-o',mapIn.toFixed(4));
    yStage.style.setProperty('--export-o',exportIn.toFixed(4));
    yStage.style.setProperty('--caption-o',captionIn.toFixed(4));
    yStage.dataset.scVerifyState=`${p.toFixed(2)}-${draw.toFixed(2)}-${sourceDock.toFixed(2)}-${mapIn.toFixed(2)}-${exportIn.toFixed(2)}`;
  }

  const rows=[
    ['Anna Müller','NRW','10.000 €','18,4 %'],
    ['Max Schmidt','Nord','25.450 €','21,1 %'],
    ['Lisa Wagner','Süd','7.500 €','16,8 %'],
    ['Tom Becker','West','14.200 €','19,6 %']
  ];
  const pseudos=['PERSON_Y_001','PERSON_Y_002','PERSON_Y_003','PERSON_Y_004'];
  const indices=['Index 20,0','Index 50,9','Index 15,0','Index 28,4'];
  const body=document.getElementById('demoBody');
  const column=document.getElementById('demoColumn');
  const method=document.getElementById('demoMethod');
  const before=document.getElementById('demoBefore');
  const after=document.getElementById('demoAfter');
  const buttons=[...document.querySelectorAll('[data-demo]')];
  let demoState=0;
  const states=[
    {col:'Kundenname',method:'Pseudonymisieren',before:'Anna Müller',after:'PERSON_Y_001'},
    {col:'Umsatz',method:'Skalieren',before:'10.000 €',after:'Index 20,0'},
    {col:'Exportprüfung',method:'Vorschau final',before:'Originalwerte geschützt',after:'Export bereit'}
  ];
  function renderDemo(i){
    demoState=i;
    const s=states[i];
    buttons.forEach((b,n)=>b.classList.toggle('active',n===i));
    if(column)column.textContent=s.col;
    if(method)method.innerHTML=`${s.method}<span>⌄</span>`;
    if(before)before.textContent=s.before;
    if(after)after.textContent=s.after;
    if(body){
      body.innerHTML=rows.map((r,n)=>{
        const name=i===0||i===2?pseudos[n]:r[0];
        const rev=i===1||i===2?indices[n]:r[2];
        return `<tr><td class="${name!==r[0]?'changed':''}">${name}</td><td>${r[1]}</td><td class="${rev!==r[2]?'changed':''}">${rev}</td><td>${r[3]}</td></tr>`;
      }).join('');
    }
  }
  buttons.forEach((b,i)=>b.addEventListener('click',()=>renderDemo(i)));
  renderDemo(0);

  let raf=0;
  function update(){
    raf=0;
    if(yStory&&yStage&&!reduced){
      const rect=yStory.getBoundingClientRect();
      const travel=Math.max(1,rect.height-innerHeight);
      setYProgress(clamp(-rect.top/travel));
    }else if(reduced){
      setYProgress(1);
    }
  }
  function request(){if(!raf)raf=requestAnimationFrame(update)}
  addEventListener('scroll',request,{passive:true});
  addEventListener('resize',request);
  update();
})();
