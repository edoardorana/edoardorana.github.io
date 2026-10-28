import { LIMITS, parseCSV, inferType, numberValue, dateValue, transform, escapeHTML as esc } from './core.mjs';
import { chartData, chartLayout } from './charts.mjs';
import { loadPlotly } from '../lab/charts.mjs';
import { downloadCSV } from './download.mjs';
const types=[['number','Numero'],['category','Categoria / booleano'],['date','Data ISO (AAAA-MM-GG)']];
const names={histogram:'Distribuzione',bar:'Confronto tra categorie',scatter:'Relazione tra numeri',box:'Quartili per categoria',time:'Andamento nel tempo'};
export function mountExplorer(container, {navigationHTML='', isCurrent=()=>true}={}) {
  container.innerHTML=`<section class="page data-workspace"><a class="back-link" href="#/progetti">← Tutti i progetti</a><header class="page-heading"><p class="eyebrow">~/progetti/csv-explorer</p><h1>CSV Explorer</h1><p class="page-intro">Da una tabella a cinque viste: importa un CSV, controlla le colonne e costruisci la tua lettura dei dati.</p></header>
  <p class="lab-disclaimer">Il file resta nel tuo browser. Nessun caricamento su server, nessun salvataggio automatico. Esporta il risultato prima di lasciare la pagina.</p>
  <section class="data-panel"><h2>1. Apri una tabella</h2><p>Intestazioni univoche nella prima riga; massimo 10 MB, 30.000 righe e 100 colonne. Le date devono essere nel formato AAAA-MM-GG. I codici numerici possono essere impostati come categorie.</p><div class="data-controls"><label>File CSV<input type="file" accept=".csv,text/csv" id="csv-file"></label><label>Separatore<select id="csv-delimiter"><option value="">Automatico</option><option value=";">Punto e virgola</option><option value=",">Virgola</option><option value="tab">Tabulazione</option></select></label><label>Codifica<select id="csv-encoding"><option value="utf-8">UTF-8</option><option value="windows-1252">Windows-1252</option></select></label><label>Separatore decimale<select id="csv-decimal"><option value=".">Punto · 1234.56</option><option value=",">Virgola · 1.234,56</option></select></label></div><button type="button" id="csv-open">Importa file</button> <button type="button" id="csv-example">Prova con un esempio</button></section>
  <p id="csv-status" role="status" aria-live="polite"></p><div id="csv-body" hidden><section class="data-panel"><h2>2. Controlla e prepara</h2><p id="csv-summary"></p><div id="csv-schema" class="data-schema"></div><form id="csv-transform" class="data-controls"><label>Colonna<select name="column"></select></label><label>Operazione<select name="kind"><option value="trim">Rimuovi spazi superflui</option><option value="lowercase">Uniforma in minuscolo</option><option value="rename">Rinomina colonna</option><option value="fill">Sostituisci celle vuote</option><option value="dropMissing">Elimina righe con cella vuota</option><option value="filter">Mantieni righe che contengono…</option><option value="duplicates">Elimina righe duplicate</option></select></label><label>Valore (per rinomina, sostituzione o filtro)<input name="value" maxlength="200"></label><button>Applica</button></form><p>Le celle vuote sono valori mancanti. Testi come “NA” restano categorie; nessuna imputazione automatica. Il filtro cerca testo, senza distinguere maiuscole e minuscole.</p><button type="button" id="csv-undo">Annulla ultima operazione</button> <button type="button" id="csv-reset">Ripristina originale</button> <button type="button" id="csv-export">Scarica CSV pulito</button><ol id="csv-log"></ol><div class="lab-table-scroll" id="csv-preview"></div></section><section><h2>3. Esplora i dati</h2><p>I grafici usano tutte le righe rimaste. Valori mancanti o incompatibili vengono esclusi dal singolo grafico, con conteggio esplicito. Al massimo 40 categorie (20 per il colore).</p><div class="lab-charts" id="csv-charts"></div></section></div>${navigationHTML}</section>`;
  const $=s=>container.querySelector(s), status=$('#csv-status');
  let original, data, columnTypes=[], actions=[], logs=[], disposed=false, generation=0, importVersion=0;
  const specs=Object.keys(names).map(kind=>({kind,x:0,y:0,color:-1,aggregate:kind==='bar'?'count':'mean'}));
  const decimal=()=>$('#csv-decimal').value;
  const options=(selected, predicate=()=>true, empty=false)=>`${empty?'<option value="-1">Nessuna</option>':''}${data.headers.map((h,i)=>predicate(i)?`<option value="${i}" ${i===selected?'selected':''}>${esc(h)}</option>`:'').join('')}`;
  function preview() {
    $('#csv-body').hidden=false;
    $('#csv-summary').textContent=`${data.rows.length.toLocaleString('it')} righe · ${data.headers.length} colonne · anteprima delle prime 15 righe.`;
    $('#csv-schema').innerHTML=data.headers.map((h,i)=>`<label>${esc(h)}<select data-type="${i}">${types.map(([v,l])=>`<option value="${v}" ${columnTypes[i]===v?'selected':''}>${l}</option>`).join('')}</select></label>`).join('');
    $('#csv-transform select[name="column"]').innerHTML=options(0);
    $('#csv-preview').innerHTML=`<table><caption>Anteprima dei dati preparati</caption><thead><tr>${data.headers.map(h=>`<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${data.rows.slice(0,15).map(row=>`<tr>${row.map(v=>`<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    $('#csv-log').innerHTML=logs.map(log=>`<li>${esc(log)}</li>`).join('');
    $('#csv-undo').disabled=!actions.length; $('#csv-reset').disabled=!actions.length;
    $('#csv-export').disabled=!data.rows.length;
    drawControls();
  }
  function drawControls() {
    for(const node of container.querySelectorAll('.explorer-plot')) window.Plotly?.purge(node);
    $('#csv-charts').innerHTML=specs.map((s,i)=>{
      const numeric=j=>columnTypes[j]==='number', category=j=>columnTypes[j]==='category', date=j=>columnTypes[j]==='date';
      const allowedX=s.kind==='time'?date:['bar','box'].includes(s.kind)?category:numeric;
      if(!allowedX(s.x)) s.x=columnTypes.findIndex((_,j)=>allowedX(j));
      if(!numeric(s.y)) s.y=columnTypes.findIndex((_,j)=>numeric(j));
      if(s.color>=0&&!category(s.color))s.color=-1;
      return `<figure class="lab-chart" data-chart="${i}"><figcaption><h3>${names[s.kind]}</h3></figcaption><div class="data-controls"><label>${s.kind==='time'?'Data':s.kind==='histogram'?'Valore':'Asse X / categoria'}<select data-spec="x">${options(s.x,allowedX)}</select></label>${s.kind!=='histogram'?`<label>Valore / asse Y<select data-spec="y">${options(s.y,numeric)}</select></label>`:''}${['bar','time'].includes(s.kind)?`<label>Aggregazione<select data-spec="aggregate">${[['count','Conteggio'],['mean','Media'],['median','Mediana'],['sum','Somma']].filter(([v])=>s.kind!=='time'||v!=='count').map(([v,l])=>`<option value="${v}" ${s.aggregate===v?'selected':''}>${l}</option>`).join('')}</select></label>`:''}${s.kind==='scatter'?`<label>Colore<select data-spec="color">${options(s.color,category,true)}</select></label>`:''}</div><p class="chart-message" role="status"></p><div class="explorer-plot lab-plot" aria-label="${names[s.kind]}"></div>${s.kind==='box'?'<p>Riquadro: dal primo al terzo quartile; linea: mediana; baffi: minimo e massimo (non regola di Tukey).</p>':''}</figure>`;
    }).join('');
    renderCharts();
  }
  async function renderCharts() {
    const version=++generation;
    let plotly;
    try {plotly=await loadPlotly();} catch {if(!disposed)status.textContent='Grafici non disponibili. I dati restano consultabili ed esportabili; modifica una selezione per riprovare.';return;}
    if(disposed||!isCurrent()||version!==generation)return;
    for(let i=0;i<specs.length;i++) {
      const s={...specs[i],decimal:decimal()}, card=$(`[data-chart="${i}"]`), plot=card.querySelector('.explorer-plot'), message=card.querySelector('.chart-message');
      try {
        if(s.x<0||(s.kind!=='histogram'&&!(s.kind==='bar'&&s.aggregate==='count')&&s.y<0))throw new Error('Scegli colonne compatibili: numeri, categorie o date secondo il grafico.');
        const valid=data.rows.filter(r=>{
          const goodX=['histogram','scatter'].includes(s.kind)?numberValue(r[s.x],decimal())!==null:s.kind==='time'?dateValue(r[s.x])!==null:true;
          return goodX && (s.kind==='histogram'||s.kind==='bar'&&s.aggregate==='count'||numberValue(r[s.y],decimal())!==null);
        });
        if(!valid.length)throw new Error('Nessun valore compatibile con questa selezione.');
        const traces=chartData(valid,s,decimal());
        message.textContent=`${valid.length.toLocaleString('it')} righe utilizzate · ${(data.rows.length-valid.length).toLocaleString('it')} escluse.`;
        await plotly.react(plot,traces,chartLayout(data.headers,valid,s),{responsive:true,displayModeBar:false});
        if(disposed||version!==generation){if(disposed||!plot.isConnected)plotly.purge(plot);return;}
      }catch(error){plotly.purge(plot);plot.textContent='';message.textContent=error.message;}
    }
  }
  function accept(parsed, label) {
    original=parsed; data=parsed;actions=[];logs=[];
    columnTypes=data.headers.map((_,i)=>inferType(data.rows.map(r=>r[i]),decimal()));
    const numeric=columnTypes.map((type,i)=>type==='number'?i:-1).filter(i=>i>=0);
    for(const spec of specs){spec.x=-1;spec.y=numeric[0]??-1;spec.color=-1;}
    const scatter=specs.find(s=>s.kind==='scatter');scatter.y=numeric[1]??numeric[0]??-1;
    status.textContent=`${label}: importazione riuscita. Verifica i tipi prima di interpretare i grafici.`;preview();
  }
  $('#csv-open').addEventListener('click',async()=>{
    const version=++importVersion;
    try {
      const file=$('#csv-file').files[0]; if(!file)throw new Error('Seleziona un file CSV.'); if(file.size>LIMITS.bytes)throw new Error('Il file supera il limite di 10 MB.');
      const buffer=await file.arrayBuffer(); if(disposed||version!==importVersion)return;
      const text=new TextDecoder($('#csv-encoding').value,{fatal:true}).decode(buffer), delimiter=$('#csv-delimiter').value;
      accept(parseCSV(text,delimiter==='tab'?'\t':delimiter),file.name);
    }catch(error){status.textContent=error instanceof TypeError?'Codifica non valida: prova Windows-1252.':error.message;}
  });
  $('#csv-example').addEventListener('click',()=>{importVersion++;$('#csv-decimal').value='.';accept(parseCSV('data;reparto;unita;ore\n2026-01-01;Supporto;12;4.5\n2026-01-02;Sistemi;8;6\n2026-01-03;Supporto;15;5\n2026-01-04;Sistemi;10;7\n2026-01-05;Supporto;9;3\n2026-01-06;Sistemi;11;6'), 'Esempio sintetico');});
  $('#csv-decimal').addEventListener('change',()=>{if(data)renderCharts();});
  $('#csv-schema').addEventListener('change',event=>{if(event.target.dataset.type!==undefined){columnTypes[+event.target.dataset.type]=event.target.value;drawControls();}});
  $('#csv-charts').addEventListener('change',event=>{if(event.target.dataset.spec){const spec=specs[+event.target.closest('[data-chart]').dataset.chart],key=event.target.dataset.spec; spec[key]=key==='aggregate'?event.target.value:+event.target.value;renderCharts();}});
  $('#csv-transform').addEventListener('submit',event=>{
    event.preventDefault();try{
      if(actions.length>=30)throw new Error('Massimo 30 operazioni: esporta il risultato per continuare.');
      const form=new FormData(event.target),action={kind:form.get('kind'),column:+form.get('column'),value:form.get('value')};
      const next=transform(data,action); actions.push(action);logs.push(`${event.target.elements.kind.selectedOptions[0].textContent} · ${data.headers[action.column]} · ${next.affected} righe interessate`);data=next;preview();status.textContent='Operazione applicata. Puoi annullarla.';
    }catch(error){status.textContent=error.message;}
  });
  $('#csv-undo').addEventListener('click',()=>{actions.pop();logs.pop();data=actions.reduce((d,a)=>transform(d,a),original);preview();status.textContent='Ultima operazione annullata.';});
  $('#csv-reset').addEventListener('click',()=>{actions=[];logs=[];data=original;preview();status.textContent='Dati originali ripristinati.';});
  $('#csv-export').addEventListener('click',()=>downloadCSV(data.headers,data.rows,'dati-puliti.csv'));
  return ()=>{disposed=true;generation++;importVersion++;for(const node of container.querySelectorAll('.explorer-plot'))window.Plotly?.purge(node);};
}
