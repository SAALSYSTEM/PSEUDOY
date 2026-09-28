(() => {
  const DEMO_EXPORT_LIMIT = 200;
  const PAGE_SIZE = 25;
  const state = {
    filename: '', delimiter: ';', headers: [], rows: [], rules: [], activeCol: -1,
    page: 0, search: '', previewTransformed: true, mappings: new Map()
  };

  const $ = sel => document.querySelector(sel);
  const fileInput = $('#tableFile');
  const dropScreen = $('#dropScreen');
  const dropCard = $('#dropCard');
  const appWorkspace = $('#appWorkspace');
  const fileName = $('#fileName');
  const fileMeta = $('#fileMeta');
  const tableHead = $('#tableHead');
  const tableBody = $('#tableBody');
  const rowCount = $('#rowCount');
  const pageLabel = $('#pageLabel');
  const searchInput = $('#tableSearch');
  const configPanel = $('#configPanel');
  const configEmpty = $('#configEmpty');
  const configContent = $('#configContent');
  const activeColumn = $('#activeColumn');
  const typeGrid = $('#typeGrid');
  const transformGrid = $('#transformGrid');
  const presetStack = $('#presetStack');
  const roleBlock = $('#roleBlock');
  const roleSelect = $('#roleSelect');
  const previewBefore = $('#previewBefore');
  const previewAfter = $('#previewAfter');
  const exportBtn = $('#exportBtn');
  const mappingBtn = $('#mappingBtn');
  const previewBtn = $('#previewBtn');
  const prevPage = $('#prevPage');
  const nextPage = $('#nextPage');
  const newFileBtn = $('#newFileBtn');
  const resetRuleBtn = $('#resetRuleBtn');
  const applyRuleBtn = $('#applyRuleBtn');
  const toast = $('#toast');

  const esc = s => String(s ?? '').replace(/[&<>\"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m] || m));
  const showToast = msg => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(showToast.t);
    showToast.t = setTimeout(() => toast.classList.remove('is-visible'), 2400);
  };

  function detectDelimiter(line) {
    const candidates = [';', ',', '\t'];
    return candidates.map(d => ({d, n: (line.split(d).length - 1)})).sort((a,b) => b.n - a.n)[0].d;
  }

  function parseCsv(text) {
    const src = text.replace(/^\uFEFF/, '');
    state.delimiter = detectDelimiter(src.split(/\r?\n/,1)[0] || '');
    const rows = [];
    let row = [], cell = '', quoted = false;
    for (let i = 0; i < src.length; i++) {
      const c = src[i];
      if (c === '"') {
        if (quoted && src[i+1] === '"') { cell += '"'; i++; }
        else quoted = !quoted;
      } else if (c === state.delimiter && !quoted) {
        row.push(cell); cell = '';
      } else if ((c === '\n' || c === '\r') && !quoted) {
        if (c === '\r' && src[i+1] === '\n') i++;
        row.push(cell); cell = '';
        if (row.some(v => v !== '')) rows.push(row);
        row = [];
      } else cell += c;
    }
    if (cell.length || row.length) { row.push(cell); if (row.some(v => v !== '')) rows.push(row); }
    if (!rows.length) throw new Error('Keine Tabellenzeilen gefunden.');
    state.headers = rows.shift().map((h,i) => (h || `Spalte ${i+1}`).trim());
    state.rows = rows.map(r => state.headers.map((_,i) => r[i] ?? ''));
    state.rules = state.headers.map((h,i) => ({ type: inferType(h, state.rows.map(r => r[i]).slice(0,40)), mode: 'keep', preset: 'standard', role: 'Person' }));
    state.activeCol = state.headers.length ? 0 : -1;
    state.page = 0; state.search = ''; state.mappings.clear();
  }

  function inferType(header, values) {
    const h = header.toLowerCase();
    const sample = values.filter(Boolean).slice(0,20);
    if (/mail|e-mail|email/.test(h) || sample.filter(v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)).length > sample.length/2) return 'email';
    if (/geburt|datum|date/.test(h) || sample.filter(v => /^\d{1,2}[.\/-]\d{1,2}[.\/-]\d{2,4}$/.test(v)).length > sample.length/2) return 'date';
    if (/name|person|mitarbeiter|kunde|ansprech/.test(h)) return 'person';
    if (/id|nr\.?|nummer|schlüssel|key/.test(h)) return 'key';
    if (/umsatz|betrag|preis|kosten|menge|zahl|wert|salary|gehalt/.test(h) || sample.filter(v => parseNumber(v) !== null).length > sample.length/2) return 'number';
    return 'text';
  }

  function parseNumber(v) {
    let s = String(v ?? '').replace(/\s|€|%/g,'');
    if (!s) return null;
    if (s.includes(',') && s.includes('.')) s = s.replace(/\./g,'').replace(',','.');
    else if (s.includes(',')) s = s.replace(',','.');
    else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g,'');
    const n = Number(s);
    return Number.isFinite(n) ? n : null;
  }

  const prefixFor = (rule, header) => {
    if (rule.type === 'person' && rule.role && rule.role !== 'Person') return rule.role.toUpperCase().replace(/[^A-Z0-9ÄÖÜ]+/g,'_') + '_Y';
    return ({person:'PERSON_Y',email:'MAIL_Y',date:'DATUM_Y',number:'WERT_Y',key:'ID_Y',text:'TEXT_Y'})[rule.type] || header.toUpperCase().replace(/[^A-Z0-9ÄÖÜ]+/g,'_') + '_Y';
  };

  function pseudoValue(col, value, rule) {
    const raw = String(value ?? '');
    if (!raw) return raw;
    const key = `${col}\u0000${raw}`;
    if (!state.mappings.has(key)) {
      const sameCol = [...state.mappings.keys()].filter(k => k.startsWith(`${col}\u0000`)).length + 1;
      state.mappings.set(key, `${prefixFor(rule, state.headers[col])}_${String(sameCol).padStart(3,'0')}`);
    }
    return state.mappings.get(key);
  }

  function maskValue(value, rule) {
    const v = String(value ?? ''); if (!v) return v;
    if (rule.type === 'email' && v.includes('@')) {
      const [left, domain=''] = v.split('@');
      const [host, ...rest] = domain.split('.');
      return `${left.slice(0,1)}${'•'.repeat(Math.max(3,left.length-1))}@${host.slice(0,1)}${'•'.repeat(Math.max(2,host.length-1))}${rest.length?'.'+rest.join('.'):''}`;
    }
    if (rule.type === 'date' && /^\d{1,2}[.\/-]\d{1,2}[.\/-]\d{2,4}$/.test(v)) return v.replace(/^\d{1,2}([.\/-])\d{1,2}/, `••$1••`);
    const keep = Math.min(3, Math.max(1, Math.floor(v.length/4)));
    return '•'.repeat(Math.max(3,v.length-keep)) + v.slice(-keep);
  }

  function generalizeValue(value, rule) {
    const v = String(value ?? ''); if (!v) return v;
    if (rule.type === 'date') {
      const m = v.match(/^(\d{1,2})[.\/-](\d{1,2})[.\/-](\d{2,4})$/);
      if (m) {
        let year = Number(m[3]); if (year < 100) year += year > 30 ? 1900 : 2000;
        const age = new Date().getFullYear() - year;
        const lo = Math.max(0, Math.floor(age/10)*10); return `${lo}–${lo+9} Jahre`;
      }
    }
    if (rule.type === 'number') {
      const n = parseNumber(v); if (n !== null) {
        const a = Math.abs(n);
        if (a < 1000) return '< 1.000';
        if (a < 10000) return '1.000–9.999';
        if (a < 50000) return '10.000–49.999';
        if (a < 100000) return '50.000–99.999';
        return '100.000+';
      }
    }
    if (rule.type === 'email' && v.includes('@')) return `***@${v.split('@')[1]}`;
    return v.length > 12 ? `${v.slice(0,3)}…` : v;
  }

  function transformValue(col, value) {
    const rule = state.rules[col]; if (!rule) return value;
    if (rule.mode === 'pseudo') return pseudoValue(col,value,rule);
    if (rule.mode === 'mask') return maskValue(value,rule);
    if (rule.mode === 'generalize') return generalizeValue(value,rule);
    return value;
  }

  function visibleColumns() { return state.headers.map((h,i)=>({h,i})).filter(x => state.rules[x.i]?.mode !== 'remove'); }
  function filteredRows() {
    const q = state.search.trim().toLowerCase();
    if (!q) return state.rows.map((r,i)=>({r,i}));
    return state.rows.map((r,i)=>({r,i})).filter(x => x.r.some(v => String(v).toLowerCase().includes(q)) || state.headers.some(h=>h.toLowerCase().includes(q)));
  }

  function renderTable() {
    const cols = visibleColumns();
    const list = filteredRows();
    const pages = Math.max(1, Math.ceil(list.length/PAGE_SIZE));
    if (state.page >= pages) state.page = pages-1;
    const slice = list.slice(state.page*PAGE_SIZE, (state.page+1)*PAGE_SIZE);
    tableHead.innerHTML = `<tr><th class="col-check"></th>${cols.map(({h,i})=>`<th data-col="${i}" class="${i===state.activeCol?'is-selected':''}">${esc(h)} <span class="th-tag">${typeLabel(state.rules[i].type)}</span></th>`).join('')}</tr>`;
    tableBody.innerHTML = slice.map(({r,i:ri}) => `<tr><td>${ri+1}</td>${cols.map(({i})=>{const val=state.previewTransformed?transformValue(i,r[i]):r[i];const cls=i===state.activeCol?'is-selected':'';return `<td class="${cls}">${esc(val)}</td>`}).join('')}</tr>`).join('');
    tableHead.querySelectorAll('[data-col]').forEach(th => th.addEventListener('click',()=>{state.activeCol=Number(th.dataset.col);renderAll()}));
    rowCount.textContent = `${list.length.toLocaleString('de-DE')} von ${state.rows.length.toLocaleString('de-DE')} Zeilen`;
    pageLabel.textContent = `Seite ${state.page+1} / ${pages}`;
    prevPage.disabled = state.page <= 0; nextPage.disabled = state.page >= pages-1;
    previewBtn.textContent = state.previewTransformed ? 'Original ansehen' : 'Transformation ansehen';
  }

  function typeLabel(t){return ({text:'Text',key:'Schlüssel',date:'Datum',number:'Zahl',email:'E-Mail',person:'Person'})[t]||'Text'}
  function renderConfig() {
    if (state.activeCol < 0) { configEmpty.classList.remove('hidden'); configContent.classList.add('hidden'); return; }
    configEmpty.classList.add('hidden'); configContent.classList.remove('hidden');
    const rule = state.rules[state.activeCol]; activeColumn.textContent = state.headers[state.activeCol];
    typeGrid.innerHTML = ['text','key','date','number','email','person'].map(t=>`<button type="button" class="type-btn ${rule.type===t?'is-active':''}" data-type="${t}">${typeLabel(t)}</button>`).join('');
    transformGrid.querySelectorAll('[data-mode]').forEach(b=>b.classList.toggle('is-active',b.dataset.mode===rule.mode));
    presetStack.classList.toggle('hidden', !['pseudo','mask'].includes(rule.mode));
    roleBlock.classList.toggle('hidden', rule.type !== 'person'); roleSelect.value = rule.role || 'Person';
    const sample = state.rows.find(r=>String(r[state.activeCol]??'').length)?.[state.activeCol] ?? '';
    previewBefore.textContent = sample || '—'; previewAfter.textContent = rule.mode==='remove'?'Spalte entfernt':transformValue(state.activeCol,sample) || '—';
    typeGrid.querySelectorAll('[data-type]').forEach(b=>b.addEventListener('click',()=>{rule.type=b.dataset.type; if(rule.mode==='keep') rule.mode = rule.type==='person'?'pseudo':'keep'; clearColumnMapping(state.activeCol); renderAll()}));
  }

  function clearColumnMapping(col){ for(const k of [...state.mappings.keys()]) if(k.startsWith(`${col}\u0000`)) state.mappings.delete(k); }
  function renderAll(){ renderTable(); renderConfig(); }

  function csvCell(v){const s=String(v??''); return /["\n\r;,\t]/.test(s)?`"${s.replace(/"/g,'""')}"`:s}
  function download(name, content, type='text/csv;charset=utf-8') {
    const blob = new Blob([content],{type}); const url = URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=name; a.click(); setTimeout(()=>URL.revokeObjectURL(url),700);
  }
  function exportCsv() {
    const cols = visibleColumns(); const limited = state.rows.slice(0,DEMO_EXPORT_LIMIT);
    const lines = [cols.map(c=>c.h), ...limited.map(r=>cols.map(c=>transformValue(c.i,r[c.i])))].map(r=>r.map(csvCell).join(state.delimiter));
    const base=(state.filename||'tabelle').replace(/\.[^.]+$/,''); download(`${base}-pseudoy.csv`, '\uFEFF'+lines.join('\r\n'));
    if(state.rows.length>DEMO_EXPORT_LIMIT) showToast(`Demo: Export auf ${DEMO_EXPORT_LIMIT} Zeilen begrenzt. Mit Free Account sind bis zu 2.000 Zeilen je Tabelle möglich.`); else showToast('Export erstellt – lokal im Browser.');
  }
  function exportMapping() {
    const entries=[...state.mappings.entries()].map(([key,pseudo])=>{const [col,original]=key.split('\u0000');return [state.headers[Number(col)],original,pseudo]});
    if(!entries.length){showToast('Noch kein Mapping vorhanden. Wähle für mindestens eine Spalte „Pseudonymisieren“.');return}
    const lines=[['Spalte','Originalwert','Pseudowert'],...entries].map(r=>r.map(csvCell).join(';'));
    download(`${(state.filename||'tabelle').replace(/\.[^.]+$/,'')}-mapping.csv`,'\uFEFF'+lines.join('\r\n')); showToast('Separates Mapping exportiert.');
  }

  async function loadFile(file) {
    if (!file) return;
    if (!/\.csv$/i.test(file.name)) { showToast('Aktuell ist CSV funktional. XLSX folgt als nächster Parser.'); return; }
    try {
      const text=await file.text(); state.filename=file.name; parseCsv(text);
      fileName.textContent=file.name; fileMeta.textContent=`${state.rows.length.toLocaleString('de-DE')} Zeilen · ${state.headers.length} Spalten · lokal geladen`;
      dropScreen.classList.add('hidden'); appWorkspace.classList.remove('hidden'); searchInput.value=''; renderAll(); showToast('CSV lokal geladen. Es wurde nichts hochgeladen.');
    } catch(e){ showToast(e.message || 'Datei konnte nicht gelesen werden.'); }
  }

  fileInput?.addEventListener('change',e=>loadFile(e.target.files?.[0]));
  ['dragenter','dragover'].forEach(evt=>dropCard?.addEventListener(evt,e=>{e.preventDefault();dropCard.classList.add('is-over')}));
  ['dragleave','drop'].forEach(evt=>dropCard?.addEventListener(evt,e=>{e.preventDefault();dropCard.classList.remove('is-over')}));
  dropCard?.addEventListener('drop',e=>loadFile(e.dataTransfer?.files?.[0]));
  searchInput?.addEventListener('input',()=>{state.search=searchInput.value;state.page=0;renderTable()});
  prevPage?.addEventListener('click',()=>{if(state.page>0){state.page--;renderTable()}});
  nextPage?.addEventListener('click',()=>{state.page++;renderTable()});
  previewBtn?.addEventListener('click',()=>{state.previewTransformed=!state.previewTransformed;renderTable()});
  exportBtn?.addEventListener('click',exportCsv); mappingBtn?.addEventListener('click',exportMapping);
  newFileBtn?.addEventListener('click',()=>fileInput?.click());
  transformGrid?.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{if(state.activeCol<0)return;state.rules[state.activeCol].mode=b.dataset.mode;clearColumnMapping(state.activeCol);renderAll()}));
  roleSelect?.addEventListener('change',()=>{if(state.activeCol<0)return;state.rules[state.activeCol].role=roleSelect.value;clearColumnMapping(state.activeCol);renderAll()});
  resetRuleBtn?.addEventListener('click',()=>{if(state.activeCol<0)return;const h=state.headers[state.activeCol];state.rules[state.activeCol]={type:inferType(h,state.rows.map(r=>r[state.activeCol]).slice(0,40)),mode:'keep',preset:'standard',role:'Person'};clearColumnMapping(state.activeCol);renderAll();showToast('Spaltenregel zurückgesetzt.')});
  applyRuleBtn?.addEventListener('click',()=>showToast('Regel übernommen. Die Vorschau ist aktualisiert.'));
})();
