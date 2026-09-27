(() => {
  const clamp=(n,min=0,max=1)=>Math.min(max,Math.max(min,n));
  const lerp=(a,b,t)=>a+(b-a)*t;
  const ease=t=>1-Math.pow(1-clamp(t),3);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

  const menuButton=document.getElementById('menuButton');
  const menuOverlay=document.getElementById('menuOverlay');
  const setMenu=(open)=>{
    menuButton?.setAttribute('aria-expanded',String(open));
    menuOverlay?.setAttribute('aria-hidden',String(!open));
    menuOverlay?.classList.toggle('is-open',open);
    document.body.classList.toggle('menu-open',open);
  };
  menuButton?.addEventListener('click',()=>setMenu(menuButton.getAttribute('aria-expanded')!=='true'));
  menuOverlay?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});

  const typed=document.getElementById('heroTyped');
  const phrases=['Kontrolliert vorbereitet.','Lokal transformiert.','Für KI vorbereitet.'];
  if(typed){
    if(reduced){typed.textContent=phrases[0];}
    else{
      let pi=0,ci=phrases[0].length,deleting=true,hold=1100;
      const tick=()=>{
        const phrase=phrases[pi];
        if(hold>0){hold-=55;setTimeout(tick,55);return;}
        ci+=deleting?-1:1;
        typed.textContent=phrase.slice(0,Math.max(0,ci));
        if(deleting&&ci<=0){deleting=false;pi=(pi+1)%phrases.length;hold=180;}
        else if(!deleting&&ci>=phrases[pi].length){deleting=true;hold=1500;}
        setTimeout(tick,deleting?34:60);
      };
      setTimeout(tick,1000);
    }
  }

  const yStory=document.getElementById('yStory');
  const yStage=document.getElementById('yStage');

  function setYProgress(p){
    if(!yStage)return;
    p=clamp(p);

    const draw=ease(clamp((p-.00)/.16));
    const focus=ease(clamp((p-.04)/.18));
    const yShrink=ease(clamp((p-.16)/.22));
    const desktop=innerWidth>900;
    const yScale=lerp(desktop?1.72:1.86,desktop?.82:.88,yShrink);

    const sourceIn=ease(clamp((p-.28)/.13));
    const sourceDock=ease(clamp((p-.47)/.17));
    const sourceScale=lerp(1,desktop?.56:.54,sourceDock);
    const sourceX=desktop?lerp(0,-innerWidth*.28,sourceDock):lerp(0,-innerWidth*.20,sourceDock);
    const sourceY=desktop?lerp(0,-innerHeight*.24,sourceDock):lerp(0,-innerHeight*.29,sourceDock);

    const mapIn=ease(clamp((p-.63)/.12));
    const exportIn=ease(clamp((p-.76)/.12));
    const titleIn=ease(clamp((p-.72)/.12));
    const captionIn=ease(clamp((p-.88)/.09));

    yStage.style.setProperty('--y-title',titleIn.toFixed(4));
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
    yStage.dataset.scVerifyState=`${p.toFixed(2)}-${draw.toFixed(2)}-${sourceIn.toFixed(2)}-${sourceDock.toFixed(2)}-${mapIn.toFixed(2)}-${exportIn.toFixed(2)}`;
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
  const states=[
    {col:'Kundenname',method:'Pseudonymisieren',before:'Anna Müller',after:'PERSON_Y_001'},
    {col:'Umsatz',method:'Skalieren',before:'10.000 €',after:'Index 20,0'},
    {col:'Exportprüfung',method:'Vorschau final',before:'Originalwerte geschützt',after:'Export bereit'}
  ];
  function renderDemo(i){
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
    }else if(reduced){setYProgress(1);}
  }
  function request(){if(!raf)raf=requestAnimationFrame(update)}
  addEventListener('scroll',request,{passive:true});
  addEventListener('resize',request);
  update();
})();
