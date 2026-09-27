(() => {
  const fileInput=document.getElementById('tableFile');
  const dropzone=document.getElementById('dropzone');
  const workspace=document.getElementById('tableWorkspace');
  const table=document.getElementById('previewTable');
  const fileStatus=document.getElementById('fileStatus');
  const activeText=document.getElementById('activeColumnText');
  const exportBtn=document.getElementById('exportCsv');
  const transformButtons=[...document.querySelectorAll('[data-transform]')];
  let headers=[];let rows=[];let activeCol=-1;let delimiter=';';let filename='export.csv';

  const escapeHtml=s=>String(s??'').replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
  function detectDelimiter(line){const semis=(line.match(/;/g)||[]).length;const commas=(line.match(/,/g)||[]).length;return semis>=commas?';':','}
  function splitLine(line,delim){const out=[];let cur='';let q=false;for(let i=0;i<line.length;i++){const c=line[i];if(c==='"'){if(q&&line[i+1]==='"'){cur+='"';i++;}else q=!q;}else if(c===delim&&!q){out.push(cur);cur='';}else cur+=c;}out.push(cur);return out}
  function parseCsv(text){const lines=text.replace(/^\uFEFF/,'').split(/\r?\n/).filter((l,i,a)=>l.length||i<a.length-1);if(!lines.length)return;delimiter=detectDelimiter(lines[0]);headers=splitLine(lines[0],delimiter);rows=lines.slice(1,51).map(l=>splitLine(l,delimiter));if(lines.length-1>50){fileStatus.textContent=`${filename} · 50 von ${lines.length-1} Zeilen geladen`; }else fileStatus.textContent=`${filename} · ${rows.length} Zeilen`}
  function render(){if(!headers.length)return;table.innerHTML=`<thead><tr>${headers.map((h,i)=>`<th data-col="${i}" style="text-align:left;padding:12px;border-bottom:1px solid #E9E5DE;background:${i===activeCol?'#DCEBFF':'#FAFBFD'};cursor:pointer;white-space:nowrap">${escapeHtml(h||`Spalte ${i+1}`)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${headers.map((_,i)=>`<td style="padding:12px;border-bottom:1px solid #F0EEE9;white-space:nowrap">${escapeHtml(r[i]??'')}</td>`).join('')}</tr>`).join('')}</tbody>`;table.querySelectorAll('th').forEach(th=>th.addEventListener('click',()=>{activeCol=Number(th.dataset.col);activeText.textContent=`${headers[activeCol]||`Spalte ${activeCol+1}`} ausgewählt`;render()}));}
  function transform(kind){if(activeCol<0)return;rows=rows.map((row,ri)=>{const next=[...row];const value=String(next[activeCol]??'');if(kind==='pseudo')next[activeCol]=`${(headers[activeCol]||'WERT').toUpperCase().replace(/[^A-Z0-9]+/g,'_')}_${String(ri+1).padStart(3,'0')}`;if(kind==='mask'){const visible=value.slice(-2);next[activeCol]=value.length>2?`${'•'.repeat(Math.min(8,value.length-2))}${visible}`:'••';}return next});render()}
  function csvCell(v){const s=String(v??'');return /["\n\r;,]/.test(s)?`"${s.replace(/"/g,'""')}"`:s}
  function exportCsv(){const lines=[headers,...rows].map(r=>r.map(csvCell).join(delimiter));const blob=new Blob([lines.join('\r\n')],{type:'text/csv;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename.replace(/\.csv$/i,'')+'-pseudoy.csv';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
  async function load(file){if(!file)return;filename=file.name||'tabelle.csv';const text=await file.text();parseCsv(text);dropzone.hidden=true;workspace.hidden=false;render()}
  fileInput?.addEventListener('change',e=>load(e.target.files?.[0]));
  transformButtons.forEach(b=>b.addEventListener('click',()=>transform(b.dataset.transform)));
  exportBtn?.addEventListener('click',exportCsv);
  ['dragenter','dragover'].forEach(evt=>dropzone?.addEventListener(evt,e=>{e.preventDefault();dropzone.style.borderColor='#2F6BFF'}));
  ['dragleave','drop'].forEach(evt=>dropzone?.addEventListener(evt,e=>{e.preventDefault();dropzone.style.borderColor=''}));
  dropzone?.addEventListener('drop',e=>load(e.dataTransfer?.files?.[0]));
})();
