import { loadPlotly } from '../charts/plotly.mjs';
import { histogram, quantile, escapeHTML as esc } from '../explorer/core.mjs';
import { downloadCSV } from '../explorer/download.mjs';
import { selectRecords, summarize, pricePerSqm, validateDataset } from './metrics.mjs';
import { terminalHeader } from '../terminal-header.mjs';
const labels={zone:'Zona',type:'Tipologia',condition:'Stato',rooms:'Locali',energy:'Classe energetica',price:'Prezzo (€)',area:'Superficie (m²)',sqm:'Prezzo al m²',id:'ID',flagged:'Anomalia'};
const cats=['zone','type','condition','rooms','energy'], nums=['price','area','sqm'];
const fmt=n=>n===null?'—':new Intl.NumberFormat('it-IT',{maximumFractionDigits:0}).format(n);
const value=(r,key)=>key==='sqm'?pricePerSqm(r):r[key];
const aggregates={median:'Mediana',mean:'Media',count:'Conteggio'};
export function mountHousing(container,{signal,isCurrent=()=>true,navigationHTML=''}={}) {
 const specs=[
 {kind:'histogram',title:'Distribuzione',x:'sqm'},
 {kind:'bar',title:'Confronto tra categorie',x:'zone',y:'sqm',aggregate:'median'},
 {kind:'scatter',title:'Relazione',x:'area',y:'price'},
 {kind:'bar',title:'Composizione',x:'type',y:'price',aggregate:'count'},
 {kind:'missing',title:'Completezza',x:'energy'}
 ];
 const options=(keys,current,map=labels)=>keys.map(k=>'<option value="'+k+'" '+(k===current?'selected':'')+'>'+map[k]+'</option>').join('');
 const controls=(s,i)=>'<details class="chart-settings"><summary>Personalizza grafico</summary><div class="data-controls"><label>'+(['bar','missing'].includes(s.kind)?'Categoria / campo':'Asse X')+'<select data-chart="'+i+'" data-key="x">'+options(s.kind==='missing'?[...cats,...nums.filter(k=>k!=='sqm')]:s.kind==='bar'?cats:nums,s.x)+'</select></label>'+(['bar','scatter'].includes(s.kind)?'<label>Misura<select data-chart="'+i+'" data-key="y">'+options(nums,s.y)+'</select></label>':'')+(s.kind==='bar'?'<label>Calcolo<select data-chart="'+i+'" data-key="aggregate">'+options(Object.keys(aggregates),s.aggregate,aggregates)+'</select></label>':'')+'</div></details>';
 const bounds=[['minArea','Superficie minima'],['maxArea','Superficie massima'],['minPrice','Prezzo minimo (€)'],['maxPrice','Prezzo massimo (€)'],['minSqm','Minimo €/m²'],['maxSqm','Massimo €/m²']];
 container.innerHTML='<section class="page data-workspace">'+terminalHeader({path:'~/progetti/immobiliare-data',title:'Dashboard immobiliare',summary:'Milano, archivio 2021. Esplora gli annunci della tesi: clicca sui grafici per filtrare tutta la dashboard.'})+
 '<p>Prezzi richiesti negli annunci, non prezzi di compravendita. Dati storici: questa demo non descrive il mercato attuale.</p><p id="housing-load" role="status">Caricamento…</p><button id="housing-retry" hidden>Riprova</button><div id="housing-body" hidden><details class="data-panel" open><summary>Filtra gli annunci</summary><form id="housing-filters"><div class="data-controls">'+cats.map(k=>'<label>'+labels[k]+'<select name="'+k+'"><option value="">Tutti</option></select></label>').join('')+bounds.map(([k,l])=>'<label>'+l+'<input name="'+k+'" type="number" min="0" step="any" placeholder="Nessun limite"></label>').join('')+'</div><label class="data-checkbox"><input type="checkbox" name="includeFlagged"> Includi le anomalie segnalate</label><button type="reset">Azzera filtri</button></form></details><div id="housing-active" class="active-filters" aria-label="Filtri attivi"></div><p id="housing-status" role="status"></p><div id="housing-kpis" class="lab-kpis"></div><div class="lab-charts">'+specs.map((s,i)=>'<figure class="lab-chart"><h2>'+s.title+'</h2>'+controls(s,i)+'<p data-note="'+i+'"></p><div id="housing-plot-'+i+'" class="lab-plot" aria-label="'+s.title+'"></div></figure>').join('')+'</div><p id="housing-chart-status" role="status"></p><section class="data-panel"><div class="lab-records-heading"><h2>Dati della selezione</h2><button id="housing-export">Scarica CSV filtrato</button></div><div id="housing-table" class="lab-table-scroll"></div><div class="lab-pagination"><button id="housing-prev">← Precedente</button><span id="housing-page"></span><button id="housing-next">Successiva →</button></div></section><details class="lab-methodology"><summary>Il dataset in breve</summary><p id="housing-method"></p></details></div>'+navigationHTML+'</section>';
 const $=q=>container.querySelector(q),form=$('#housing-filters');
 let records=[],selected=[],page=0,disposed=false,generation=0,extra={};
 const setExtra=(key,val)=>{if(JSON.stringify(extra[key])===JSON.stringify(val))delete extra[key];else extra[key]=val;update();};
 function table(){
 const fields=['zone','type','price','area','sqm'];
 $('#housing-table').innerHTML='<table><caption>Annunci filtrati · 20 righe per pagina</caption><thead><tr>'+fields.map(k=>'<th>'+labels[k]+'</th>').join('')+'</tr></thead><tbody>'+selected.slice(page*20,page*20+20).map(r=>'<tr>'+fields.map(k=>'<td>'+esc(typeof value(r,k)==='number'?fmt(value(r,k)):value(r,k)??'—')+'</td>').join('')+'</tr>').join('')+'</tbody></table>';
 const total=Math.max(1,Math.ceil(selected.length/20));$('#housing-page').textContent='Pagina '+(page+1)+' di '+total;$('#housing-prev').disabled=page===0;$('#housing-next').disabled=page>=total-1;$('#housing-export').disabled=!selected.length;
 }
 function filterClick(d){
 if(!d)return;
 if(d.kind==='category'){const el=form.elements[d.field];el.value=el.value===d.value?'':d.value;update();}
 else if(d.kind==='range')setExtra('range',d.value);
 else if(d.kind==='ids')setExtra('ids',d.value);
 else if(d.kind==='presence')setExtra('present',d.value);
 else if(d.kind==='absent'){const el=form.elements[d.value]; if(el){el.value=el.value==='__missing'?'':'__missing';update();}else setExtra('ids',records.filter(r=>r[d.value]===null).map(r=>r.id));}
 }
 async function update(){
 const filters={...Object.fromEntries(new FormData(form)),...extra,includeFlagged:form.elements.includeFlagged.checked};
 for(const [a,b] of [['minArea','maxArea'],['minPrice','maxPrice'],['minSqm','maxSqm']])if(filters[a]!==''&&filters[b]!==''&&Number(filters[a])>Number(filters[b])){$('#housing-status').textContent='Il minimo non può superare il massimo. Correggi l’intervallo.';return;}
 const version=++generation;selected=selectRecords(records,filters);page=0;table();
 $('#housing-status').textContent=fmt(selected.length)+' annunci su '+fmt(records.length)+'. Clicca di nuovo una selezione o rimuovi il filtro per tornare indietro.';
 const active=Object.entries(filters).filter(([k,v])=>v!==''&&v!==false&&v!==undefined);
 $('#housing-active').innerHTML=active.map(([k,v])=>'<button type="button" data-remove="'+k+'">'+esc(k==='range'?labels[v.field]+': '+fmt(v.min)+'–'+fmt(v.max):k==='ids'?v.length+' annunci selezionati':k==='present'?'Valori presenti: '+labels[v]:k==='includeFlagged'?'Anomalie incluse':(labels[k]||bounds.find(b=>b[0]===k)?.[1]||k)+': '+(v==='__missing'?'Non disponibile':v))+' ×</button>').join('');
 const summary=summarize(selected);
 $('#housing-kpis').innerHTML='<article><span>ANNUNCI</span><strong>'+fmt(summary.count)+'</strong></article>'+[['price','PREZZO MEDIANO',' €'],['sqm','MEDIANA €/m²',' €/m²'],['area','SUPERFICIE MEDIANA',' m²']].map(([k,l,u])=>'<article><span>'+l+'</span><strong>'+fmt(summary[k].value)+(summary[k].value===null?'':u)+'</strong><small>'+fmt(summary[k].count)+' valori disponibili</small></article>').join('');
 try{
 const plotly=await loadPlotly();if(disposed||!isCurrent()||version!==generation)return;
 for(let i=0;i<specs.length;i++){
 const s=specs[i],node=$('#housing-plot-'+i);let trace,xtitle=labels[s.x],ytitle='Annunci',note='';
 if(s.kind==='histogram'){
 const vals=selected.map(r=>value(r,s.x)).filter(Number.isFinite),h=histogram(vals,20);
 trace={type:'bar',...h,customdata:h.x.map((x,j)=>({kind:'range',value:{field:s.x,min:Math.min(...vals)+j*h.width,max:j===h.x.length-1?Math.max(...vals):Math.min(...vals)+(j+1)*h.width,includeMax:j===h.x.length-1}}))};
 note=fmt(vals.length)+' valori disponibili. Clic su una fascia: filtro globale.';
 }else if(s.kind==='bar'){
 const groups=new Map();for(const r of selected){const k=r[s.x]??'__missing',v=s.aggregate==='count'?1:value(r,s.y);if(v===null)continue;if(!groups.has(k))groups.set(k,[]);groups.get(k).push(v);}
 const entries=[...groups].map(([k,v])=>({k,n:v.length,v:s.aggregate==='count'?v.length:s.aggregate==='mean'?v.reduce((a,b)=>a+b,0)/v.length:quantile(v,.5)})).sort((a,b)=>b.v-a.v).slice(0,20);
 trace={type:'bar',orientation:'h',y:entries.map(e=>esc(e.k==='__missing'?'Non disponibile':e.k)),x:entries.map(e=>e.v),customdata:entries.map(e=>({kind:'category',field:s.x,value:e.k})),text:entries.map(e=>'n='+e.n)};
 xtitle=s.aggregate==='count'?'Annunci':aggregates[s.aggregate]+' · '+labels[s.y];ytitle=labels[s.x];note='Fino a 20 categorie ordinate per valore. Clicca una barra per filtrare.';
 }else if(s.kind==='scatter'){
 const valid=selected.filter(r=>Number.isFinite(value(r,s.x))&&Number.isFinite(value(r,s.y))),shown=valid.filter((_,j)=>j%Math.max(1,Math.ceil(valid.length/4000))===0);
 trace={type:'scatter',mode:'markers',x:shown.map(r=>value(r,s.x)),y:shown.map(r=>value(r,s.y)),customdata:shown.map(r=>({kind:'ids',value:[r.id]})),marker:{size:5,opacity:.5,color:'#87515d'}};
 ytitle=labels[s.y];note=fmt(shown.length)+' punti su '+fmt(valid.length)+' coppie. Clic per un annuncio; trascina per selezionare i punti mostrati.';
 }else{
 const present=selected.filter(r=>r[s.x]!==null).length;
 trace={type:'bar',x:['Presenti','Mancanti'],y:[present,selected.length-present],customdata:[{kind:'presence',value:s.x},{kind:'absent',value:s.x}]};
 note='Clicca per filtrare gli annunci con o senza '+labels[s.x].toLowerCase()+'.';
 }
 $('[data-note="'+i+'"]').textContent=note;
 if(!selected.length){plotly.purge(node);node.textContent='Nessun dato. Rimuovi un filtro per riprendere.';continue;}
 if(s.kind==='bar')node.style.height=Math.max(360,trace.y.length*24+100)+'px';
 const measure=container.querySelector('[data-chart="'+i+'"][data-key=y]');if(measure)measure.disabled=s.kind==='bar'&&s.aggregate==='count';
 await plotly.react(node,[trace],{paper_bgcolor:'rgba(0,0,0,0)',plot_bgcolor:'rgba(0,0,0,0)',colorway:['#476753'],font:{size:11,color:'#3d4640'},margin:{l:s.kind==='bar'?125:65,r:20,t:15,b:65},xaxis:{title:{text:xtitle},automargin:true},yaxis:{title:{text:ytitle},automargin:true,...(s.kind==='bar'?{autorange:'reversed',type:'category'}:{})},showlegend:false,dragmode:s.kind==='scatter'?'select':false},{responsive:true,displayModeBar:false});
 if(disposed||version!==generation){if(disposed)plotly.purge(node);return;}
 node.removeAllListeners('plotly_click');node.on('plotly_click',e=>filterClick(e.points?.[0]?.customdata));
 node.removeAllListeners('plotly_selected');if(s.kind==='scatter')node.on('plotly_selected',e=>{if(e?.points?.length)setExtra('ids',e.points.flatMap(p=>p.customdata?.value||[]));});
 }
 $('#housing-chart-status').textContent='';
 }catch{if(!disposed)$('#housing-chart-status').textContent='Grafici non disponibili. Tabella e CSV restano utilizzabili; cambia un filtro per riprovare.';}
 }
 async function load(){ $('#housing-retry').hidden=true;try{
 const response=await fetch(new URL('./milano-2021.json',import.meta.url),{signal});if(!response.ok)throw Error();const data=validateDataset(await response.json());if(disposed||!isCurrent())return;records=data.records;
 for(const k of cats)form.elements[k].innerHTML='<option value="">Tutti</option>'+[...new Set(records.map(r=>r[k]).filter(v=>v!==null))].sort((a,b)=>a.localeCompare(b,'it')).map(v=>'<option value="'+esc(v)+'">'+esc(v)+'</option>').join('')+'<option value="__missing">Non disponibile</option>';
 const m=data.metadata;$('#housing-method').textContent='Archivio 2021 raccolto con uno scraper R per la tesi. '+fmt(m.published_rows)+' annunci pubblicati dopo l’esclusione di '+fmt(m.excluded.auction)+' aste e '+fmt(m.excluded.not_residential_or_unknown_type)+' tipologie fuori perimetro. '+m.flagged_rows+' anomalie segnalate sono escluse inizialmente dalle viste. Indirizzi e riferimenti originali non sono pubblicati; i valori mancanti restano tali.';
 $('#housing-load').textContent='';$('#housing-body').hidden=false;update();
 }catch(e){if(disposed||e.name==='AbortError')return;$('#housing-load').textContent='Archivio non disponibile. Riprova.';$('#housing-retry').hidden=false;}}
 form.onchange=update;form.onsubmit=e=>{e.preventDefault();update();};form.onreset=()=>{extra={};setTimeout(()=>{if(!disposed)update();},0);};
 $('#housing-active').onclick=e=>{const k=e.target.closest('[data-remove]')?.dataset.remove;if(!k)return;if(k in extra)delete extra[k];else if(k==='includeFlagged')form.elements[k].checked=false;else form.elements[k].value='';update();};
 container.addEventListener('change',e=>{const i=e.target.dataset.chart;if(i===undefined)return;specs[+i][e.target.dataset.key]=e.target.value;update();});
 $('#housing-prev').onclick=()=>{page--;table();};$('#housing-next').onclick=()=>{page++;table();};
 $('#housing-export').onclick=()=>{const fields=['id',...cats,'price','area','sqm','flagged'];downloadCSV(fields,selected.map(r=>fields.map(k=>value(r,k))),'milano-2021-selezione.csv');};
 $('#housing-retry').onclick=load;load();
 return()=>{disposed=true;generation++;for(let i=0;i<specs.length;i++)window.Plotly?.purge($('#housing-plot-'+i));};
}
