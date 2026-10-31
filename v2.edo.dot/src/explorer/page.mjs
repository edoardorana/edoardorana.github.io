import { LIMITS, parseCSV, inferType, numberValue, dateValue, transform, quantile, escapeHTML as esc } from './core.mjs';
import { chartData, chartLayout } from './charts.mjs';
import { loadPlotly } from '../charts/plotly.mjs';
import { downloadCSV } from './download.mjs';
import { terminalHeader } from '../terminal-header.mjs';
const stages=['Carica','Controlla','Prepara','Scegli la domanda','Costruisci'];
const types={number:'Numero',category:'Categoria / testo',date:'Data ISO'};
const names={histogram:'Distribuzione',bar:'Confronto',scatter:'Relazione',box:'Distribuzioni per categoria',time:'Evoluzione temporale',composition:'Composizione'};
const hints={histogram:'Una colonna numerica: come sono distribuiti i valori?',bar:'Una categoria: quante osservazioni o quale valore per gruppo?',scatter:'Due colonne numeriche: come variano insieme?',box:'Una categoria e una misura: come cambia la distribuzione tra gruppi?',time:'Una data e una misura: come evolve nel tempo?',composition:'Una categoria: quale quota delle osservazioni appartiene a ogni gruppo?'};
const operations={trim:'Rimuovi spazi superflui',lowercase:'Uniforma in minuscolo',rename:'Rinomina colonna',fill:'Sostituisci celle vuote',missing:'Tratta un valore come mancante',dropMissing:'Elimina righe con cella vuota',filter:'Mantieni righe che contengono…',duplicates:'Elimina righe duplicate',dateDMY:'Converti date GG/MM/AAAA in ISO'};
export function mountExplorer(container,{navigationHTML='',isCurrent=()=>true}={}){
 const $=q=>container.querySelector(q);
 const events=new AbortController();
 let file,original,data,columnTypes=[],history=[],specs=[],disposed=false,generation=0,importVersion=0,pending;
 container.innerHTML='<section class="page data-workspace">'+terminalHeader({path:'~/progetti/dashboard-generator',title:'Dashboard generator',summary:'Carica un CSV, controlla i dati, prepara ciò che serve e scegli i grafici adatti alle tue domande.'})+
 '<p>Il CSV resta nel browser. Esporta i dati prima di chiudere la pagina.</p><nav class="workflow-nav" aria-label="Fasi del lavoro">'+stages.map((s,i)=>'<button type="button" data-stage="'+i+'" '+(i?'disabled':'')+'>'+String(i+1).padStart(2,'0')+' '+s+'</button>').join('')+'</nav><p id="csv-status" class="data-feedback" role="status"></p>'+
 '<section data-panel="0" class="data-panel"><h2>Carica una tabella</h2><div id="csv-drop" class="drop-zone"><label for="csv-file">Trascina qui un CSV oppure scegli un file</label><input id="csv-file" type="file" accept=".csv,text/csv"><p id="csv-filename">Nessun file selezionato</p></div><p>Prima riga con nomi delle colonne. Fino a 10 MB, 30.000 righe e 100 colonne.</p><details><summary>Impostazioni di lettura</summary><div class="data-controls"><label>Separatore<select id="csv-delimiter"><option value="">Rileva automaticamente</option><option value=";">Punto e virgola</option><option value=",">Virgola</option><option value="tab">Tabulazione</option></select></label><label>Codifica<select id="csv-encoding"><option value="utf-8">UTF-8</option><option value="windows-1252">Windows-1252 (Excel)</option></select></label><label>Numeri<select id="csv-decimal"><option value=",">Italiano: 1.234,56</option><option value=".">Punto decimale: 1234.56</option></select></label></div><p>Se un numero come 1.234 è ambiguo, scegli esplicitamente il formato della fonte.</p></details><div class="workflow-actions"><button id="csv-open">Leggi il CSV</button><button id="csv-example">Prova un esempio</button></div></section>'+
 '<section data-panel="1" class="data-panel" hidden><h2>Controlla prima di proseguire</h2><p id="csv-summary"></p><p>Verifica anteprima e tipi. Codici, CAP e identificativi possono restare categorie anche se contengono cifre.</p><div id="csv-schema" class="data-schema"></div><div id="csv-preview" class="lab-table-scroll"></div><div class="workflow-actions"><button data-goto="0">Cambia lettura</button><button data-goto="2">Continua: prepara</button></div></section>'+
 '<section data-panel="2" class="data-panel" hidden><h2>Prepara solo ciò che serve</h2><p>Ogni operazione mostra l’effetto prima di applicarla. Puoi annullare le modifiche.</p><form id="csv-transform" class="data-controls"><label>Colonna<select name="column"></select></label><label>Operazione<select name="kind">'+Object.entries(operations).map(([k,l])=>'<option value="'+k+'">'+l+'</option>').join('')+'</select></label><label id="csv-value-label">Valore<input name="value" maxlength="200"></label><button>Mostra effetto</button></form><p id="csv-operation-help"></p><p id="csv-effect" role="status"></p><button id="csv-apply" hidden>Applica questa modifica</button><div class="workflow-actions"><button id="csv-undo">Annulla ultima modifica</button><button id="csv-reset">Ripristina originale</button><button id="csv-export">Scarica CSV pulito</button></div><ol id="csv-log"></ol><div id="csv-prepared-preview" class="lab-table-scroll"></div><button data-goto="3">Continua: scegli la domanda</button></section>'+
 '<section data-panel="3" class="data-panel" hidden><h2>Che cosa vuoi capire?</h2><p>Le opzioni disponibili dipendono dai tipi di colonna. Puoi aggiungere fino a cinque grafici.</p><div id="csv-questions" class="question-list"></div><p id="csv-choice-status" role="status"></p><div class="workflow-actions"><button data-goto="1">Rivedi i tipi</button><button data-goto="4">Apri la dashboard</button></div></section>'+
 '<section data-panel="4" hidden><h2>La tua dashboard</h2><p>Ogni grafico indica righe utilizzate ed escluse. Puoi cambiare le colonne e il calcolo.</p><div class="workflow-actions"><button data-goto="3">Aggiungi un grafico</button><button id="csv-export-dashboard">Scarica i dati</button></div><div class="lab-charts" id="csv-charts"></div></section>'+navigationHTML+'</section>';
 const status=$('#csv-status'),decimal=()=>$('#csv-decimal').value;
 const options=(selected,predicate=()=>true,empty=false)=>(empty?'<option value="-1">Nessuna</option>':'')+data.headers.map((h,i)=>predicate(i)?'<option value="'+i+'" '+(i===selected?'selected':'')+'>'+esc(h)+'</option>':'').join('');
 function show(n){
 if(n&&!data)return;for(const p of container.querySelectorAll('[data-panel]'))p.hidden=+p.dataset.panel!==n;
 for(const b of container.querySelectorAll('[data-stage]')){b.disabled=+b.dataset.stage>0&&!data;b.toggleAttribute('aria-current',+b.dataset.stage===n);if(+b.dataset.stage===n)b.setAttribute('aria-current','step');}
 if(n===3)questions();if(n===4)drawControls();
 const heading=$('[data-panel="'+n+'"] h2');heading.tabIndex=-1;heading.focus({preventScroll:true});
 }
 function sample(target){$(target).innerHTML='<table><caption>Anteprima · prime 15 righe'+'</caption><thead><tr>'+data.headers.map(h=>'<th>'+esc(h)+'</th>').join('')+'</tr></thead><tbody>'+data.rows.slice(0,15).map(r=>'<tr>'+r.map(v=>'<td>'+esc(v||'—')+'</td>').join('')+'</tr>').join('')+'</tbody></table>';}
 function stats(i){
 const raw=data.rows.map(r=>r[i]),filled=raw.filter(v=>v.trim()),kind=columnTypes[i],valid=filled.filter(v=>kind==='number'?numberValue(v,decimal())!==null:kind==='date'?dateValue(v)!==null:true);
 let outliers=0;if(kind==='number'){const values=valid.map(v=>numberValue(v,decimal())),q1=quantile(values,.25),q3=quantile(values,.75),iqr=q3-q1;if(iqr>0)outliers=values.filter(v=>v<q1-1.5*iqr||v>q3+1.5*iqr).length;}
 return {missing:raw.length-filled.length,invalid:filled.length-valid.length,outliers};
 }
 function refresh(){
 $('#csv-summary').textContent=data.rows.length.toLocaleString('it')+' righe · '+data.headers.length+' colonne. '+(original.delimiter===';'?'Separatore: punto e virgola.':original.delimiter===','?'Separatore: virgola.':'Separatore: tabulazione.');
 $('#csv-schema').innerHTML=data.headers.map((h,i)=>{const st=stats(i);return '<label>'+esc(h)+'<select data-type="'+i+'">'+Object.entries(types).map(([k,l])=>'<option value="'+k+'" '+(columnTypes[i]===k?'selected':'')+'>'+l+'</option>').join('')+'</select><small>'+st.missing+' vuoti · '+st.invalid+' incompatibili'+(st.outliers?' · '+st.outliers+' valori fuori dai limiti IQR (solo segnalati)':'')+'</small></label>';}).join('');
 $('#csv-transform select[name=column]').innerHTML=options(Math.min(+$('#csv-transform select[name=column]').value,data.headers.length-1));sample('#csv-preview');sample('#csv-prepared-preview');
 $('#csv-log').innerHTML=history.map(h=>'<li>'+esc(h.label)+'</li>').join('');
 $('#csv-undo').disabled=!history.length;$('#csv-reset').disabled=!history.length;$('#csv-export').disabled=!data.rows.length;operationHelp();
 }
 function operationHelp(){const f=$('#csv-transform'),kind=f.elements.kind.value;const needs=['rename','fill','missing','filter'].includes(kind);$('#csv-value-label').hidden=!needs;f.elements.value.required=needs;f.elements.column.disabled=kind==='duplicates';$('#csv-operation-help').textContent=kind==='duplicates'?'Confronta l’intera riga: conserva la prima copia.':kind==='dateDMY'?'Conversione esplicita GG/MM/AAAA → AAAA-MM-GG. Una data non valida interrompe l’operazione senza modificare la tabella.':kind==='missing'?'Indica il testo da trattare come vuoto, per esempio NA. Nessuna sostituzione automatica.':'Controlla il numero di righe interessate prima di applicare.';pending=undefined;$('#csv-apply').hidden=true;$('#csv-effect').textContent='';}
 function supported(kind){const n=columnTypes.filter(t=>t==='number').length,c=columnTypes.includes('category'),d=columnTypes.includes('date');return kind==='histogram'?n>0:kind==='scatter'?n>=2:kind==='box'?c&&n>0:kind==='time'?d&&n>0:c;}
 function questions(){$('#csv-questions').innerHTML=Object.entries(names).map(([k,l])=>'<button data-kind="'+k+'" '+(!supported(k)||specs.length>=5?'disabled':'')+'><strong>'+l+'</strong><br>'+hints[k]+(!supported(k)?'<br><small>Servono colonne compatibili: rivedi i tipi.</small>':'')+'</button>').join('');$('#csv-choice-status').textContent='Grafici scelti: '+specs.length+' su 5.';}
 function drawControls(){
 for(const p of container.querySelectorAll('.explorer-plot'))window.Plotly?.purge(p);
 $('#csv-charts').innerHTML=specs.length?specs.map((s,i)=>{
 const numeric=j=>columnTypes[j]==='number',cat=j=>columnTypes[j]==='category',date=j=>columnTypes[j]==='date',allowedX=s.kind==='time'?date:['bar','box','composition'].includes(s.kind)?cat:numeric;
 if(!allowedX(s.x))s.x=columnTypes.findIndex((_,j)=>allowedX(j));if(!numeric(s.y))s.y=columnTypes.findIndex((_,j)=>numeric(j));if(s.color>=0&&!cat(s.color))s.color=-1;
 return '<figure class="lab-chart" data-chart="'+i+'"><h3>'+names[s.kind]+'</h3><div class="data-controls"><label>'+(['bar','box','composition'].includes(s.kind)?'Categoria':'Asse X')+'<select data-spec="x">'+options(s.x,allowedX)+'</select></label>'+(!['histogram','composition'].includes(s.kind)&&!(s.kind==='bar'&&s.aggregate==='count')?'<label>Misura / asse Y<select data-spec="y">'+options(s.y,numeric)+'</select></label>':'')+(['bar','time'].includes(s.kind)?'<label>Calcolo<select data-spec="aggregate">'+Object.entries({count:'Conteggio',mean:'Media',median:'Mediana',sum:'Somma'}).filter(([k])=>s.kind==='bar'||k!=='count').map(([k,l])=>'<option value="'+k+'" '+(s.aggregate===k?'selected':'')+'>'+l+'</option>').join('')+'</select></label>':'')+(s.kind==='scatter'?'<label>Colore<select data-spec="color">'+options(s.color,cat,true)+'</select></label>':'')+'</div><p class="chart-message" role="status"></p><div class="explorer-plot lab-plot" aria-label="'+names[s.kind]+'"></div>'+(s.kind==='box'?'<p>Riquadro: quartili 1–3; linea: mediana; baffi: minimo e massimo.</p>':'')+'<button type="button" data-remove-chart="'+i+'">Rimuovi grafico</button></figure>';
 }).join(''):'<p>Non hai ancora scelto un grafico. Torna a “Scegli la domanda” per iniziare.</p>';
 renderCharts();
 }
 async function renderCharts(){
 const version=++generation;let plotly;try{plotly=await loadPlotly();}catch{if(!disposed&&version===generation)status.textContent='Grafici non disponibili. I dati restano esportabili.';return;}if(disposed||!isCurrent()||version!==generation)return;
 for(let i=0;i<specs.length;i++){
 const originalSpec=specs[i],s={...originalSpec,decimal:decimal()},card=$('[data-chart="'+i+'"]'),plot=card.querySelector('.explorer-plot'),msg=card.querySelector('.chart-message');
 if(s.kind==='composition'){s.kind='bar';s.aggregate='count';}
 try{
 if(s.x<0||(!['histogram'].includes(s.kind)&&!(s.kind==='bar'&&s.aggregate==='count')&&s.y<0))throw Error('Mancano colonne compatibili. Rivedi i tipi nel passaggio Controlla.');
 const valid=data.rows.filter(r=>(['histogram','scatter'].includes(s.kind)?numberValue(r[s.x],decimal())!==null:s.kind==='time'?dateValue(r[s.x])!==null:true)&&(s.kind==='histogram'||s.kind==='bar'&&s.aggregate==='count'||numberValue(r[s.y],decimal())!==null));
 if(!valid.length)throw Error('Nessun valore valido. Controlla tipo, formato numerico e celle vuote.');
 const traces=chartData(valid,s,decimal()),layout=chartLayout(data.headers,valid,s);
 if(originalSpec.kind==='composition'){const total=traces[0].y.reduce((a,b)=>a+b,0);traces[0].y=traces[0].y.map(n=>100*n/total);layout.yaxis.title.text='Quota delle righe (%)';}
 msg.textContent=valid.length.toLocaleString('it')+' righe utilizzate · '+(data.rows.length-valid.length).toLocaleString('it')+' escluse.';
 await plotly.react(plot,traces,layout,{responsive:true,displayModeBar:false});if(disposed||version!==generation){if(disposed||!plot.isConnected)plotly.purge(plot);return;}
 }catch(e){plotly.purge(plot);msg.textContent=e.message;}
 }
 }
 function accept(parsed,label){
 original=parsed;data=parsed;history=[];specs=[];pending=undefined;
 columnTypes=data.headers.map((_,i)=>inferType(data.rows.map(r=>r[i]),decimal()));
 status.textContent=label+': lettura riuscita. Verifica che le colonne e i valori siano corretti.';refresh();show(1);
 }
 async function readFile(){
 const version=++importVersion;try{
 if(!file)throw Error('Scegli un CSV o trascinalo nel riquadro. Puoi anche provare l’esempio.');
 if(file.size>LIMITS.bytes)throw Error('Il file supera 10 MB. Esporta una selezione più piccola.');
 const buffer=await file.arrayBuffer();if(disposed||version!==importVersion)return;
 const text=new TextDecoder($('#csv-encoding').value,{fatal:true}).decode(buffer),delimiter=$('#csv-delimiter').value;
 accept(parseCSV(text,delimiter==='tab'?'\t':delimiter),file.name);
 }catch(e){status.textContent=(e instanceof TypeError?'La codifica non è UTF-8: apri le impostazioni di lettura e prova Windows-1252.':e.message)+' I dati già caricati restano disponibili.';}
 }
 const choose=f=>{importVersion++;file=f;$('#csv-filename').textContent=f?f.name+' · '+Math.ceil(f.size/1024)+' KB':'Nessun file selezionato';};
 $('#csv-file').onchange=e=>choose(e.target.files[0]);const drop=$('#csv-drop');
 drop.ondragover=e=>{e.preventDefault();drop.classList.add('dragging');};drop.ondragleave=()=>drop.classList.remove('dragging');drop.ondrop=e=>{e.preventDefault();drop.classList.remove('dragging');choose(e.dataTransfer.files[0]);};
 $('#csv-open').onclick=readFile;
 $('#csv-example').onclick=()=>{importVersion++;$('#csv-decimal').value='.';accept(parseCSV('data;reparto;unita;ore\n2026-01-01;Supporto;12;4.5\n2026-01-02;Sistemi;8;6\n2026-01-03;Supporto;15;5\n2026-01-04;Sistemi;10;7\n2026-01-05;Supporto;9;3\n2026-01-06;Sistemi;11;6'),'Esempio dimostrativo');};
 $('#csv-decimal').onchange=()=>{if(data){columnTypes=data.headers.map((_,i)=>inferType(data.rows.map(r=>r[i]),decimal()));refresh();status.textContent='Formato numerico aggiornato. Ricontrolla i tipi suggeriti.';}};
 $('#csv-schema').onchange=e=>{if(e.target.dataset.type!==undefined){columnTypes[+e.target.dataset.type]=e.target.value;refresh();}};
 $('#csv-transform').onchange=operationHelp;
 $('#csv-transform').onsubmit=e=>{e.preventDefault();try{
 if(history.length>=30)throw Error('Hai raggiunto 30 modifiche. Esporta il risultato prima di continuare.');
 const f=e.target,action={kind:f.elements.kind.value,column:+f.elements.column.value,value:f.elements.value.value};
 const next=transform(data,action);pending={next,action};$('#csv-effect').textContent='Righe interessate: '+next.affected+'. Totale prima: '+data.rows.length+'; dopo: '+next.rows.length+'. Puoi annullare la modifica dopo averla applicata.';$('#csv-apply').hidden=false;
 }catch(e){pending=undefined;$('#csv-apply').hidden=true;$('#csv-effect').textContent=e.message;}};
 $('#csv-apply').onclick=()=>{if(!pending)return;const {next,action}=pending;history.push({action,types:[...columnTypes],label:operations[action.kind]+' · '+next.affected+' righe'});data=next;if(action.kind==='dateDMY')columnTypes[action.column]='date';pending=undefined;refresh();status.textContent='Modifica applicata. Puoi annullarla.';};
 $('#csv-undo').onclick=()=>{const h=history.pop();if(!h)return;data=history.reduce((current,item)=>transform(current,item.action),original);columnTypes=h.types;refresh();status.textContent='Ultima modifica annullata.';};
 $('#csv-reset').onclick=()=>{data=original;history=[];columnTypes=data.headers.map((_,i)=>inferType(data.rows.map(r=>r[i]),decimal()));refresh();status.textContent='Dati originali ripristinati.';};
 const exportData=()=>{if(data)downloadCSV(data.headers,data.rows,'dati-puliti.csv');};$('#csv-export').onclick=exportData;$('#csv-export-dashboard').onclick=exportData;
 container.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.dataset.stage!==undefined)show(+b.dataset.stage);if(b.dataset.goto!==undefined)show(+b.dataset.goto);
 if(b.dataset.kind){const kind=b.dataset.kind;if(!supported(kind)||specs.length>=5)return;const n=columnTypes.map((t,i)=>t==='number'?i:-1).filter(i=>i>=0),c=columnTypes.indexOf('category'),d=columnTypes.indexOf('date');specs.push({kind,x:kind==='time'?d:['bar','box','composition'].includes(kind)?c:n[0],y:kind==='scatter'?n[1]:n[0],color:-1,aggregate:kind==='bar'?'count':'mean'});questions();status.textContent=names[kind]+' aggiunto.';}
 if(b.dataset.removeChart!==undefined){specs.splice(+b.dataset.removeChart,1);drawControls();}
 },{signal:events.signal});
 $('#csv-charts').onchange=e=>{if(!e.target.dataset.spec)return;const s=specs[+e.target.closest('[data-chart]').dataset.chart],k=e.target.dataset.spec;s[k]=k==='aggregate'?e.target.value:+e.target.value;drawControls();};
 show(0);
 return()=>{disposed=true;events.abort();generation++;importVersion++;for(const p of container.querySelectorAll('.explorer-plot'))window.Plotly?.purge(p);};
}
