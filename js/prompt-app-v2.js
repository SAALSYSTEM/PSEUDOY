(() => {
  const LIMIT=2;
  const input=document.getElementById('promptInput');
  const mapping=document.getElementById('mappingList');
  const counter=document.getElementById('promptCounter');
  const markBtn=document.getElementById('markSelection');
  const maskBtn=document.getElementById('maskPrompt');
  const unmaskBtn=document.getElementById('unmaskPrompt');
  const copyBtn=document.getElementById('copyPrompt');
  const resetBtn=document.getElementById('resetPrompt');
  const toast=document.getElementById('toast');
  const pairs=[];
  let original=input?.value||'';
  const esc=s=>String(s??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]||m));
  const showToast=msg=>{if(!toast)return;toast.textContent=msg;toast.classList.add('is-visible');clearTimeout(showToast.t);showToast.t=setTimeout(()=>toast.classList.remove('is-visible'),2200)};
  const render=()=>{
    counter.textContent=`${pairs.length} / ${LIMIT} Maskierungen`;
    if(!pairs.length){mapping.innerHTML='<div class="mapping-empty">Noch kein Mapping. Markiere Text oder nutze die automatische Erkennung.</div>';return;}
    mapping.innerHTML=pairs.map(p=>`<div class="mapping-row"><span>${esc(p.original)}</span><b>→</b><strong>${esc(p.pseudo)}</strong></div>`).join('');
  };
  const addPair=(value,prefix='WERT')=>{
    const existing=pairs.find(p=>p.original===value);if(existing)return existing.pseudo;
    if(pairs.length>=LIMIT)return null;
    const pseudo=`${prefix}_Y_${String(pairs.length+1).padStart(3,'0')}`;
    pairs.push({original:value,pseudo});return pseudo;
  };
  markBtn?.addEventListener('click',()=>{
    const start=input.selectionStart,end=input.selectionEnd;if(start===end){showToast('Markiere zuerst einen Textbereich.');return}
    const selected=input.value.slice(start,end);const pseudo=addPair(selected,'MARK');if(!pseudo){showToast('Demo-Limit erreicht: maximal 2 Maskierungen.');return}
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
    let hitLimit=false;
    rules.forEach(rule=>{text=text.replace(rule.re,m=>{const pseudo=addPair(m,rule.p);if(!pseudo){hitLimit=true;return m}return pseudo})});
    input.value=text;render();if(hitLimit)showToast('Demo-Limit erreicht. Weitere Werte bleiben unverändert.');
  });
  unmaskBtn?.addEventListener('click',()=>{
    let text=input.value;[...pairs].reverse().forEach(p=>{text=text.split(p.pseudo).join(p.original)});input.value=text;showToast('Originalwerte in den Text zurückgesetzt.');
  });
  copyBtn?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(input.value);showToast('Vorbereiteter Prompt kopiert.')}catch{input.select();document.execCommand('copy');showToast('Vorbereiteter Prompt kopiert.')}});
  resetBtn?.addEventListener('click',()=>{input.value=original;pairs.splice(0,pairs.length);render();showToast('Prompt-Session zurückgesetzt.');});
  render();
})();
