(() => {
  const input=document.getElementById('promptInput');
  const mapping=document.getElementById('mappingList');
  const markBtn=document.getElementById('markSelection');
  const maskBtn=document.getElementById('maskPrompt');
  const unmaskBtn=document.getElementById('unmaskPrompt');
  const copyBtn=document.getElementById('copyPrompt');
  let pairs=[];
  let original=input?.value||'';
  const esc=s=>String(s).replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]||m));
  const render=()=>{
    if(!mapping)return;
    if(!pairs.length){mapping.innerHTML='<p>Noch keine Werte markiert.</p>';return;}
    mapping.innerHTML=pairs.map(p=>`<div style="display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center;padding:12px 0;border-bottom:1px solid #E9E5DE"><span style="overflow-wrap:anywhere">${esc(p.original)}</span><strong style="color:#2F6BFF">→</strong><strong style="overflow-wrap:anywhere">${esc(p.pseudo)}</strong></div>`).join('');
  };
  const addPair=(value,prefix='WERT')=>{
    const existing=pairs.find(p=>p.original===value);if(existing)return existing.pseudo;
    const pseudo=`${prefix}_${String(pairs.length+1).padStart(3,'0')}`;
    pairs.push({original:value,pseudo});return pseudo;
  };
  markBtn?.addEventListener('click',()=>{
    const start=input.selectionStart,end=input.selectionEnd;
    if(start===end)return;
    const selected=input.value.slice(start,end);
    const pseudo=addPair(selected,'MARK');
    input.setRangeText(pseudo,start,end,'end');render();
  });
  maskBtn?.addEventListener('click',()=>{
    original=input.value;
    let text=input.value;
    const rules=[
      {re:/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,p:'MAIL'},
      {re:/\b\d{2}\.\d{2}\.\d{4}\b/g,p:'DATUM'},
      {re:/\b\d{1,3}(?:\.\d{3})*(?:,\d{2})?\s?€\b/g,p:'BETRAG'}
    ];
    rules.forEach(rule=>{text=text.replace(rule.re,m=>addPair(m,rule.p))});
    input.value=text;render();
  });
  unmaskBtn?.addEventListener('click',()=>{
    let text=input.value;
    [...pairs].reverse().forEach(p=>{text=text.split(p.pseudo).join(p.original)});
    input.value=text;
  });
  copyBtn?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(input.value);copyBtn.textContent='KOPIERT';setTimeout(()=>copyBtn.textContent='KOPIEREN',1200)}catch{input.select();document.execCommand('copy')}});
  render();
})();
