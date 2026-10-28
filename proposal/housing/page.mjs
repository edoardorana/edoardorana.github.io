import { loadPlotly } from '../charts/plotly.mjs';
import { histogram, escapeHTML as esc } from '../explorer/core.mjs';
import { downloadCSV } from '../explorer/download.mjs';
import { selectRecords, summarize, zonesSummary, pricePerSqm, validateDataset } from './metrics.mjs';

const fmt=(n,digits=0)=>n===null?'—':new Intl.NumberFormat('it-IT',{maximumFractionDigits:digits}).format(n);
const labels={zone:'Zona',type:'Tipologia',condition:'Stato',rooms:'Locali',energy:'Classe energetica',price:'Prezzo richiesto (€)',area:'Superficie (m²)'};
export function mountHousing(container,{signal,isCurrent=()=>true,navigationHTML=''}={}) {
  container.innerHTML=`<section class="page data-workspace"><a class="back-link" href="#/progetti">← Tutti i progetti</a><header class="page-heading"><p class="eyebrow">~/progetti/immobiliare-data</p><h1>Dashboard interattiva su dati immobiliari</h1><p class="page-intro">Annunci immobiliari di Milano, archivio 2021. I dati sono stati raccolti tramite script di scraping e utilizzati per la mia tesi di laurea.</p></header><div class="lab-disclaimer"><strong>Archivio storico · dati reali</strong><span>Prezzi richiesti negli annunci, non prezzi di compravendita. Un campione di un portale, non una stima del mercato attuale né un censimento di Milano.</span></div><p id="housing-load" role="status">Caricamento dell’archivio…</p><button id="housing-retry" type="button" hidden>Riprova</button><div id="housing-body" hidden>
  <details class="data-panel housing-filter-panel"><summary>Filtra gli annunci</summary><form id="housing-filters"><div class="data-controls">${['zone','type','condition','rooms','energy'].map(k=>`<label>${labels[k]}<select name="${k}"><option value="">Tutti</option></select></label>`).join('')}${[['minArea','Superficie minima (m²)'],['maxArea','Superficie massima (m²)'],['minPrice','Prezzo minimo (€)'],['maxPrice','Prezzo massimo (€)']].map(([k,l])=>`<label>${l}<input type="number" name="${k}" min="0" step="any" placeholder="Nessun limite"></label>`).join('')}</div><label class="data-checkbox"><input type="checkbox" name="includeFlagged"> Includi valori segnalati come anomali</label><p id="housing-flags"></p><button type="reset">Azzera filtri</button></form></details><p id="housing-status" role="status" aria-live="polite"></p><div id="housing-kpis" class="lab-kpis"></div><div class="lab-charts">${[['distribution','Distribuzione dei prezzi al m²'],['zones','Prezzo mediano al m² per zona'],['scatter','Superficie e prezzo richiesto'],['types','Tipologie nel campione'],['missing','Completezza delle informazioni']].map(([id,title])=>`<figure class="lab-chart"><figcaption><h2>${title}</h2><p data-note="${id}"></p></figcaption><div class="lab-plot" id="housing-${id}" aria-label="${title}"></div></figure>`).join('')}</div><p id="housing-chart-status" role="status"></p>
  <section class="data-panel"><div class="lab-records-heading"><h2>Dati della selezione</h2><button id="housing-export" type="button">Scarica CSV filtrato</button></div><p>Identificativi nuovi, senza collegamenti agli annunci, titoli o indirizzi. I valori mancanti restano vuoti. La tabella mostra 20 righe per pagina.</p><div class="lab-table-scroll" id="housing-table"></div><div class="lab-pagination"><button id="housing-prev" type="button">← Precedente</button><span id="housing-page"></span><button id="housing-next" type="button">Successiva →</button></div></section>
  <details class="lab-methodology" open><summary>Fonte, pulizia e limiti</summary><div id="housing-method"></div></details><p class="lab-attribution">Grafici: Plotly.js (MIT). <a href="#/progetti/dashboard-generator">Apri Dashboard generator per analizzare una tua tabella →</a></p></div>${navigationHTML}</section>`;
  const $=s=>container.querySelector(s), form=$('#housing-filters');
  let records=[],selected=[],page=0,disposed=false,generation=0;
  const chartIds=['distribution','zones','scatter','types','missing'];
  function table() {
    const keys=['id','zone','type','condition','area','price','rooms','energy','flagged'];
    $('#housing-table').innerHTML=`<table><caption>Annunci storici filtrati</caption><thead><tr>${keys.map(k=>`<th scope="col">${labels[k]||({id:'ID',flagged:'Anomalia'})[k]}</th>`).join('')}<th scope="col">€/m²</th></tr></thead><tbody>${selected.slice(page*20,page*20+20).map(r=>`<tr>${keys.map(k=>`<td>${k==='flagged'?(r[k]?'Sì':'No'):typeof r[k]==='number'?fmt(r[k]):esc(r[k]??'—')}</td>`).join('')}<td>${fmt(pricePerSqm(r))}</td></tr>`).join('')}</tbody></table>`;
    const pages=Math.max(1,Math.ceil(selected.length/20));$('#housing-page').textContent=`Pagina ${page+1} di ${pages}`;$('#housing-prev').disabled=page===0;$('#housing-next').disabled=page>=pages-1;$('#housing-export').disabled=!selected.length;
  }
  async function update() {
    const filters=Object.fromEntries(new FormData(form));filters.includeFlagged=form.elements.includeFlagged.checked;
    for(const [a,b] of [['minArea','maxArea'],['minPrice','maxPrice']])if(filters[a]!==''&&filters[b]!==''&&Number(filters[a])>Number(filters[b])){$('#housing-status').textContent='Il minimo non può superare il massimo. Restano visualizzati i risultati dell’ultima selezione valida.';return;}
    selected=selectRecords(records,filters);page=0;table();
    const summary=summarize(selected), version=++generation;
    $('#housing-status').textContent=`${fmt(selected.length)} annunci su ${fmt(records.length)}. ${selected.length<30?'Campione piccolo: interpreta i confronti con cautela.':''}`;
    $('#housing-kpis').innerHTML=`<article><span>ANNUNCI</span><strong>${fmt(summary.count)}</strong><small>Righe selezionate</small></article>${[['price','PREZZO MEDIANO',' €'],['sqm','MEDIANA €/m²',' €/m²'],['area','SUPERFICIE MEDIANA',' m²']].map(([k,l,u])=>`<article><span>${l}</span><strong>${fmt(summary[k].value)}${summary[k].value===null?'':u}</strong><small>${fmt(summary[k].count)} valori disponibili</small></article>`).join('')}`;
    const zoneStats=zonesSummary(selected).filter(z=>z.count>=5).slice(0,20), valid=selected.filter(r=>pricePerSqm(r)!==null);
    const scatter=valid.filter((_,i)=>i%Math.max(1,Math.ceil(valid.length/4000))===0);
    const counts=new Map();for(const r of selected)counts.set(r.type,(counts.get(r.type)||0)+1);
    const cats=[...counts].sort((a,b)=>b[1]-a[1]);
    const fields=['zone','price','area','condition','rooms','energy'];
    const complete=fields.map(k=>selected.filter(r=>r[k]!==null).length);
    $('[data-note="distribution"]').textContent=`${fmt(valid.length)} annunci con prezzo e superficie disponibili. Fasce di uguale ampiezza.`;
    $('[data-note="zones"]').textContent=`Fino a 20 zone con più osservazioni e almeno 5 rapporti validi. ${zoneStats.map(z=>`${z.zone}: ${fmt(z.median)} €/m² (n=${z.count})`).join(' · ')||'Nessuna zona raggiunge 5 osservazioni.'}`;
    $('[data-note="scatter"]').textContent=`${fmt(scatter.length)} punti su ${fmt(valid.length)} coppie valide; oltre 4.000 coppie si mostra un sottoinsieme deterministico. Indicatori e CSV usano tutti i dati.`;
    $('[data-note="types"]').textContent=cats.map(([k,v])=>`${k}: ${fmt(v)}`).join(' · ');
    $('[data-note="missing"]').textContent=fields.map((k,i)=>`${labels[k]}: ${fmt(complete[i])}/${fmt(selected.length)}`).join(' · ');
    try {
      const plotly=await loadPlotly();if(disposed||!isCurrent()||version!==generation)return;
      const traces={distribution:[{type:'bar',...histogram(valid.map(pricePerSqm),20)}],zones:[{type:'bar',x:zoneStats.map(z=>esc(z.zone)),y:zoneStats.map(z=>z.median)}],scatter:[{type:'scatter',mode:'markers',x:scatter.map(r=>r.area),y:scatter.map(r=>r.price),marker:{size:5,opacity:.5,color:'#87515d'}}],types:[{type:'bar',x:cats.map(([k])=>esc(k)),y:cats.map(([,v])=>v)}],missing:[{type:'bar',x:fields.map(k=>labels[k]),y:complete.map(n=>selected.length?100*n/selected.length:0)}]};
      const axis={distribution:['€/m²','Annunci'],zones:['Zona','Mediana €/m²'],scatter:['Superficie (m²)','Prezzo richiesto (€)'],types:['Tipologia','Annunci'],missing:['Campo','Valori presenti (%)']};
      for(const id of chartIds){const node=$(`#housing-${id}`);if(!selected.length){plotly.purge(node);node.textContent='Nessun dato per questa selezione.';continue;}await plotly.react(node,traces[id],{paper_bgcolor:'rgba(0,0,0,0)',plot_bgcolor:'rgba(0,0,0,0)',colorway:['#476753'],font:{size:11,color:'#3d4640'},margin:{l:65,r:15,t:15,b:75},xaxis:{title:{text:axis[id][0]},automargin:true},yaxis:{title:{text:axis[id][1]},automargin:true,...(id==='missing'?{range:[0,100]}:{})},showlegend:false},{responsive:true,displayModeBar:false});if(disposed||version!==generation){if(disposed||!node.isConnected)plotly.purge(node);return;}}
      $('#housing-chart-status').textContent='';
    }catch{if(!disposed)$('#housing-chart-status').textContent='Grafici non disponibili. Tabella e CSV restano utilizzabili; modifica un filtro per riprovare.';}
  }
  async function load() {
    $('#housing-retry').hidden=true;
    try{
      const response=await fetch(new URL('./milano-2021.json',import.meta.url),{signal});if(!response.ok)throw new Error();
      const data=validateDataset(await response.json());if(disposed||!isCurrent())return;records=data.records;
      for(const k of ['zone','type','condition','rooms','energy'])form.elements[k].innerHTML='<option value="">Tutti</option>'+[...new Set(records.map(r=>r[k]).filter(x=>x!==null))].sort((a,b)=>a.localeCompare(b,'it')).map(v=>`<option value="${esc(v)}">${esc(v)}</option>`).join('')+'<option value="__missing">Non disponibile</option>';
      const m=data.metadata;
      $('#housing-flags').textContent=`${m.flagged_rows} righe segnalate, escluse inizialmente. Le soglie sono controlli tecnici, non giudizi sul valore dell’immobile.`;
      $('#housing-method').innerHTML=`<p>La tesi triennale ha utilizzato uno scraper R per raccogliere annunci di vendita a Milano da Immobiliare.it. Questa pagina rielabora l’archivio del 2021 fornito dall’autore; non esegue nuove raccolte.</p><p>Fonte iniziale: ${fmt(m.source_rows)} righe, ${m.source_columns} colonne. Pubblicate ${fmt(m.published_rows)} righe: escluse ${fmt(m.excluded.auction||0)} aste e ${fmt(m.excluded.not_residential_or_unknown_type||0)} righe con tipologia non residenziale o non riconosciuta. Deduplicazione sull’identificativo originario; annunci diversi dello stesso immobile possono restare nel campione.</p><p>L’archivio “finale” (${fmt(m.comparison?.rows||0)} righe) condivide solo ${fmt(m.comparison?.shared_identifiers||0)} identificativi con quello iniziale: non è stato accodato né usato per riempire celle. Nessuna classificazione automatica “buono/cattivo”.</p><p>Conversioni esplicite di prezzo e superficie; intervalli e valori non interpretabili restano mancanti. Locali e camere da letto non sono intercambiabili. Zone ammesse da un elenco controllato: gli indirizzi finiti nel campo zona sono rimossi. Sono omessi URL, titoli, indirizzi, riferimenti, nomi e testi liberi. Gli ID pubblici sono nuovi.</p><p>Anomalie: prezzo fuori da 5.000–50.000.000 €, superficie fuori da 10–2.000 m² o rapporto fuori da 200–50.000 €/m². Le righe restano disponibili attivando il filtro. Nessuna correzione o imputazione silenziosa.</p><p>Le mediane usano i valori disponibili; la mediana €/m² è calcolata sui rapporti individuali. Il campione può essere influenzato dalla copertura del portale, dagli annunci ripetuti e da errori dello scraper originale. Il 2021 identifica l’archivio, non una data di rilevazione certificata per ogni riga.</p>`;
      $('#housing-load').textContent='';$('#housing-body').hidden=false;update();
    }catch(error){if(disposed||error.name==='AbortError')return;$('#housing-load').textContent='Non riesco a caricare l’archivio. Riprova.';$('#housing-retry').hidden=false;}
  }
  form.addEventListener('submit',e=>{e.preventDefault();update();});form.addEventListener('change',update);form.addEventListener('reset',()=>setTimeout(()=>{if(!disposed)update();},0));
  $('#housing-prev').addEventListener('click',()=>{page--;table();});$('#housing-next').addEventListener('click',()=>{page++;table();});
  $('#housing-export').addEventListener('click',()=>{const fields=['id','zone','type','condition','area','price','rooms','energy','flagged'];downloadCSV([...fields,'price_per_sqm'],selected.map(r=>[...fields.map(k=>r[k]),pricePerSqm(r)]),'milano-2021-selezione.csv');});
  $('#housing-retry').addEventListener('click',load);load();
  return ()=>{disposed=true;generation++;for(const id of chartIds)window.Plotly?.purge($(`#housing-${id}`));};
}
