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
const pageSize=10;
export function mountHousing(container,{signal,isCurrent=()=>true,navigationHTML=''}={}) {
 const events=new AbortController();
 const specs=[
 {kind:'distribution',title:'Fasce di valore',x:'sqm'},
 {kind:'lollipop',title:'Zone a confronto',x:'zone',y:'sqm',aggregate:'median'},
 {kind:'density',title:'Superficie e prezzo',x:'area',y:'price'},
 {kind:'radial',title:'Composizione dell’offerta',x:'condition'},
 {kind:'heatmap',title:'Zone × tipologie',x:'type',y:'zone'}
 ];
 const options=(keys,current,map=labels)=>keys.map(k=>'<option value="'+k+'" '+(k===current?'selected':'')+'>'+map[k]+'</option>').join('');
 const controls=(s,i)=>{
   const select=(label,key,keys)=>'<label>'+label+'<select data-chart="'+i+'" data-key="'+key+'">'+options(keys,s[key])+'</select></label>';
   const fields=s.kind==='distribution'?select('Misura','x',nums)
     :s.kind==='lollipop'?select('Categoria','x',cats)+select('Misura','y',nums)+'<label>Calcolo<select data-chart="'+i+'" data-key="aggregate">'+options(Object.keys(aggregates),s.aggregate,aggregates)+'</select></label>'
     :s.kind==='density'?select('Asse X','x',nums)+select('Asse Y','y',nums)
     :s.kind==='radial'?select('Categoria','x',cats)
     :select('Colonne','x',cats)+select('Righe','y',cats);
   return '<details class="chart-settings"><summary>configura/</summary><div class="data-controls">'+fields+'</div></details>';
 };
 const bounds=[['minArea','Superficie minima'],['maxArea','Superficie massima'],['minPrice','Prezzo minimo (€)'],['maxPrice','Prezzo massimo (€)'],['minSqm','Minimo €/m²'],['maxSqm','Massimo €/m²']];
 container.innerHTML='<section class="page data-workspace housing-workspace">'+terminalHeader({path:'~/progetti/immobiliare-data',title:'Dashboard immobiliare',summary:'Un archivio storico della tesi diventa uno spazio di esplorazione: filtra gli annunci, confronta le zone e osserva come cambiano prezzi e offerta.',sections:[{label:'dataset/',text:'14.731 annunci pubblicati a Milano nel 2021, ripuliti per la consultazione.'},{label:'lettura/',text:'Indicatori, cinque viste coordinate, dettaglio tabellare ed export della selezione.'},{label:'attenzione/',text:'Sono prezzi richiesti, non compravendite; indirizzi esclusi e 11 anomalie nascoste in partenza.'}]})+
 '<p id="housing-load" role="status">Caricamento…</p><button id="housing-retry" hidden>Riprova</button><div id="housing-body" hidden><details class="data-panel housing-filter-panel"><summary><span>filtri/</span><small>restringi la selezione</small></summary><form id="housing-filters"><div class="data-controls">'+cats.map(k=>'<label>'+labels[k]+'<select name="'+k+'"><option value="">Tutti</option></select></label>').join('')+bounds.map(([k,l])=>'<label>'+l+'<input name="'+k+'" type="number" min="0" step="any" placeholder="Nessun limite"></label>').join('')+'</div><div class="housing-filter-actions"><label class="data-checkbox"><input type="checkbox" name="includeFlagged"> Includi le anomalie segnalate</label><button type="reset">Azzera filtri</button></div></form></details><div id="housing-active" class="active-filters" aria-label="Filtri attivi"></div><p id="housing-status" role="status"></p><div id="housing-kpis" class="lab-kpis"></div><div class="lab-charts">'+specs.map((s,i)=>'<figure class="lab-chart lab-chart-'+s.kind+'"><header class="lab-chart-heading"><p>0'+(i+1)+'/05</p><h2>'+s.title+'</h2></header>'+controls(s,i)+'<p data-note="'+i+'"></p><div id="housing-plot-'+i+'" class="lab-plot" aria-label="'+s.title+'"></div></figure>').join('')+'</div><p id="housing-chart-status" role="status"></p><section class="data-panel"><div class="lab-records-heading"><h2>Dati della selezione</h2><button id="housing-export">Scarica CSV filtrato</button></div><div id="housing-table" class="lab-table-scroll"></div><div class="lab-pagination"><button id="housing-prev">← Precedente</button><span id="housing-page"></span><button id="housing-next">Successiva →</button></div></section></div>'+navigationHTML+'</section>';
 const $=q=>container.querySelector(q),form=$('#housing-filters');
 let records=[],selected=[],page=0,disposed=false,generation=0,extra={};
 const setExtra=(key,val)=>{if(JSON.stringify(extra[key])===JSON.stringify(val))delete extra[key];else extra[key]=val;update();};
 function table(){
 const fields=['zone','type','price','area','sqm'];
 $('#housing-table').innerHTML='<table><caption>Annunci filtrati · '+pageSize+' righe per pagina</caption><thead><tr>'+fields.map(k=>'<th>'+labels[k]+'</th>').join('')+'</tr></thead><tbody>'+selected.slice(page*pageSize,page*pageSize+pageSize).map(r=>'<tr>'+fields.map(k=>'<td>'+esc(typeof value(r,k)==='number'?fmt(value(r,k)):value(r,k)??'—')+'</td>').join('')+'</tr>').join('')+'</tbody></table>';
 const total=Math.max(1,Math.ceil(selected.length/pageSize));$('#housing-page').textContent='Pagina '+(page+1)+' di '+total;$('#housing-prev').disabled=page===0;$('#housing-next').disabled=page>=total-1;$('#housing-export').disabled=!selected.length||!form.checkValidity();
 }
 function filterClick(d){
 if(!d)return;
 if(d.kind==='category'){const el=form.elements[d.field];el.value=el.value===d.value?'':d.value;update();}
 else if(d.kind==='categories'){for(const [field,next] of Object.entries(d.value)){const el=form.elements[field];if(el)el.value=el.value===next?'':next;}update();}
 else if(d.kind==='range')setExtra('range',d.value);
 else if(d.kind==='ids')setExtra('ids',d.value);
 else if(d.kind==='presence')setExtra('present',d.value);
 else if(d.kind==='absent'){const el=form.elements[d.value]; if(el){el.value=el.value==='__missing'?'':'__missing';update();}else setExtra('ids',records.filter(r=>r[d.value]===null).map(r=>r.id));}
 }
 async function update(){
 if(disposed||!isCurrent())return;
 const filters={...Object.fromEntries(new FormData(form)),...extra,includeFlagged:form.elements.includeFlagged.checked};
 for(const [name] of bounds)form.elements[name].setCustomValidity('');
 for(const [a,b] of [['minArea','maxArea'],['minPrice','maxPrice'],['minSqm','maxSqm']])if(filters[a]!==''&&filters[b]!==''&&Number(filters[a])>Number(filters[b]))form.elements[b].setCustomValidity('Il massimo deve essere maggiore o uguale al minimo.');
 if(!form.checkValidity()){
   $('#housing-status').textContent='Filtro non applicato: usa valori positivi e un minimo non superiore al massimo. I risultati mostrano l’ultima selezione valida; correggi i campi per esportare.';
   $('#housing-export').disabled=true;
   for(const [name] of bounds)form.elements[name].setAttribute('aria-invalid',String(!form.elements[name].validity.valid));
   return;
 }
 for(const [name] of bounds)form.elements[name].removeAttribute('aria-invalid');
 const version=++generation;selected=selectRecords(records,filters);page=0;table();
 $('#housing-status').textContent=fmt(selected.length)+' annunci su '+fmt(records.length)+'. Clicca di nuovo una selezione o rimuovi il filtro per tornare indietro.';
 const active=Object.entries(filters).filter(([k,v])=>v!==''&&v!==false&&v!==undefined);
 $('#housing-active').innerHTML=active.map(([k,v])=>'<button type="button" data-remove="'+k+'">'+esc(k==='range'?labels[v.field]+': '+fmt(v.min)+'–'+fmt(v.max):k==='ids'?v.length+' annunci selezionati':k==='present'?'Valori presenti: '+labels[v]:k==='includeFlagged'?'Anomalie incluse':(labels[k]||bounds.find(b=>b[0]===k)?.[1]||k)+': '+(v==='__missing'?'Non disponibile':v))+' ×</button>').join('');
 const summary=summarize(selected);
 $('#housing-kpis').innerHTML='<article><span>ANNUNCI</span><strong>'+fmt(summary.count)+'</strong></article>'+[['price','PREZZO MEDIANO',' €'],['sqm','MEDIANA €/m²',' €/m²'],['area','SUPERFICIE MEDIANA',' m²']].map(([k,l,u])=>'<article><span>'+l+'</span><strong>'+fmt(summary[k].value)+(summary[k].value===null?'':u)+'</strong><small>'+fmt(summary[k].count)+' valori disponibili</small></article>').join('');
 try{
 const plotly=await loadPlotly();if(disposed||!isCurrent()||version!==generation)return;
 for(let i=0;i<specs.length;i++){
 const s=specs[i],node=$('#housing-plot-'+i);let traces=[],xtitle=labels[s.x],ytitle='Annunci',note='',layoutExtra={};
 if(s.kind==='distribution'){
 const vals=selected.map(r=>value(r,s.x)).filter(Number.isFinite),cap=quantile(vals,.99),shown=vals.filter(v=>v<=cap),h=histogram(shown,22),median=quantile(vals,.5),minimum=Math.min(...shown),maximum=Math.max(...shown);
 traces=[{type:'bar',...h,marker:{color:'#7898ad',line:{color:'#f7f8fa',width:1}},hovertemplate:'%{x:,.0f}<br>%{y} annunci<extra></extra>',customdata:h.x.map((x,j)=>({kind:'range',value:{field:s.x,min:minimum+j*h.width,max:j===h.x.length-1?maximum:minimum+(j+1)*h.width,includeMax:j===h.x.length-1}}))}];
 layoutExtra={shapes:[{type:'line',x0:median,x1:median,y0:0,y1:1,yref:'paper',line:{color:'#7b507d',width:2,dash:'dot'}}],annotations:[{x:median,y:1,xref:'x',yref:'paper',text:'mediana '+fmt(median),showarrow:false,yanchor:'bottom',font:{size:10,color:'#7b507d'}}]};
 note=fmt(vals.length)+' valori; vista limitata al 99° percentile per leggere la forma. La linea indica la mediana.';
 }else if(s.kind==='lollipop'){
 const groups=new Map();for(const r of selected){const k=r[s.x]??'__missing',v=s.aggregate==='count'?1:value(r,s.y);if(v===null)continue;if(!groups.has(k))groups.set(k,[]);groups.get(k).push(v);}
 const entries=[...groups].map(([k,v])=>({k,n:v.length,v:s.aggregate==='count'?v.length:s.aggregate==='mean'?v.reduce((a,b)=>a+b,0)/v.length:quantile(v,.5)})).sort((a,b)=>b.v-a.v).slice(0,14).reverse();
 const names=entries.map(e=>esc(e.k==='__missing'?'Non disponibile':e.k)),values=entries.map(e=>e.v),custom=entries.map(e=>({kind:'category',field:s.x,value:e.k}));
 traces=[{type:'bar',orientation:'h',y:names,x:values,width:.08,marker:{color:'#a9bbc7'},customdata:custom,hoverinfo:'skip'},
   {type:'scatter',mode:'markers+text',y:names,x:values,text:entries.map(e=>fmt(e.v)),textposition:'middle right',cliponaxis:false,marker:{size:10,color:'#2f6f9f',line:{color:'#fff',width:1}},customdata:custom,hovertemplate:'%{y}<br>%{x:,.0f} · n=%{meta}<extra></extra>',meta:entries.map(e=>e.n)}];
 xtitle=s.aggregate==='count'?'Annunci':aggregates[s.aggregate]+' · '+labels[s.y];ytitle='';note='Prime '+entries.length+' categorie. Il punto è il valore, la linea facilita il confronto; clicca per filtrare.';
 }else if(s.kind==='density'){
 const allValid=selected.filter(r=>Number.isFinite(value(r,s.x))&&Number.isFinite(value(r,s.y))),xCap=quantile(allValid.map(r=>value(r,s.x)),.99),yCap=quantile(allValid.map(r=>value(r,s.y)),.99),valid=allValid.filter(r=>value(r,s.x)<=xCap&&value(r,s.y)<=yCap),xValues=valid.map(r=>value(r,s.x)),logY=valid.map(r=>Math.log10(value(r,s.y))),xMin=Math.min(...xValues),xMax=Math.max(...xValues),yMin=Math.min(...logY),yMax=Math.max(...logY),bins=new Map();
 for(const r of valid){const x=value(r,s.x),y=value(r,s.y),xb=Math.min(19,Math.floor((x-xMin)/(xMax-xMin||1)*20)),yb=Math.min(15,Math.floor((Math.log10(y)-yMin)/(yMax-yMin||1)*16)),key=xb+':'+yb;if(!bins.has(key))bins.set(key,{xb,yb,ids:[]});bins.get(key).ids.push(r.id);}
 const cells=[...bins.values()],counts=cells.map(cell=>cell.ids.length),maxCount=Math.max(...counts,1);
 traces=[{type:'scatter',mode:'markers',x:cells.map(cell=>xMin+(cell.xb+.5)*(xMax-xMin)/20),y:cells.map(cell=>10**(yMin+(cell.yb+.5)*(yMax-yMin)/16)),customdata:cells.map(cell=>({kind:'ids',value:cell.ids})),text:counts.map(count=>fmt(count)+' annunci'),marker:{symbol:'square',size:counts.map(count=>8+20*Math.sqrt(count/maxCount)),color:counts,colorscale:[[0,'#dfe9ef'],[.45,'#7898ad'],[1,'#7b507d']],showscale:false,opacity:.84,line:{color:'#f7f8fa',width:1}},hovertemplate:'%{text}<br>'+labels[s.x]+': %{x:,.0f}<br>'+labels[s.y]+': %{y:,.0f}<extra></extra>'}];
 ytitle=labels[s.y]+' · scala log';layoutExtra={yaxis:{type:'log'}};note='Densità centrale di '+fmt(allValid.length)+' coppie; assi limitati al 99° percentile. Clicca una cella per filtrare.';
 }else if(s.kind==='radial'){
 const groups=new Map();for(const r of selected){const k=r[s.x]??'__missing';groups.set(k,(groups.get(k)||0)+1);}
 const entries=[...groups].map(([k,v])=>({k,v})).sort((a,b)=>b.v-a.v).slice(0,12);
 const radialLabel=key=>key==='__missing'?'Non disponibile':key.replace('Ottimo / Ristrutturato','Ottimo / ristrutt.').replace('Nuovo / In costruzione','Nuovo / costruzione');
 traces=[{type:'barpolar',theta:entries.map(e=>radialLabel(e.k)),r:entries.map(e=>e.v),text:entries.map(e=>e.k==='__missing'?'Non disponibile':e.k),customdata:entries.map(e=>({kind:'category',field:s.x,value:e.k})),marker:{color:entries.map((_,j)=>j),colorscale:[[0,'#2f6f9f'],[.55,'#7898ad'],[1,'#7b507d']],line:{color:'#f7f8fa',width:1}},opacity:.9,hovertemplate:'%{text}<br>%{r} annunci<extra></extra>'}];
 xtitle='';ytitle='';layoutExtra={polar:{bgcolor:'rgba(0,0,0,0)',radialaxis:{showticklabels:false,ticks:'',gridcolor:'#d9dee3'},angularaxis:{gridcolor:'#e8ebee',tickfont:{size:10}}}};note='Le categorie più presenti. La lunghezza radiale comunica il peso; il tooltip conserva il valore esatto.';
 }else{
 const countBy=field=>{const m=new Map();for(const r of selected){const k=r[field]??'__missing';m.set(k,(m.get(k)||0)+1);}return [...m].sort((a,b)=>b[1]-a[1]).slice(0,9).map(([k])=>k);};
 if(s.x===s.y){s.y=cats.find(k=>k!==s.x);const rowSelect=container.querySelector('[data-chart="'+i+'"][data-key="y"]');if(rowSelect)rowSelect.value=s.y;}
 const columns=countBy(s.x),rows=countBy(s.y);
 const matrix=rows.map(row=>columns.map(column=>selected.filter(r=>(r[s.y]??'__missing')===row&&(r[s.x]??'__missing')===column).length));
 const custom=rows.map(row=>columns.map(column=>({kind:'categories',value:{[s.x]:column,[s.y]:row}})));
 traces=[{type:'heatmap',x:columns.map(k=>k==='__missing'?'Non disponibile':k),y:rows.map(k=>k==='__missing'?'Non disponibile':k),z:matrix.map(row=>row.map(Math.sqrt)),text:matrix,customdata:custom,colorscale:[[0,'#f0f2f4'],[.35,'#bed0db'],[1,'#2f6f9f']],showscale:false,hovertemplate:'%{y} × %{x}<br>%{text} annunci<extra></extra>'}];
 xtitle=labels[s.x];ytitle=labels[s.y];note='Incrocio delle categorie più frequenti; la scala √ rende visibili anche i gruppi piccoli. Clicca una cella per filtrare.';
 }
 $('[data-note="'+i+'"]').textContent=note;
 if(!selected.length){plotly.purge(node);node.textContent='Nessun dato. Rimuovi un filtro per riprendere.';node.dataset.empty='true';continue;}
 if(node.dataset.empty){node.replaceChildren();delete node.dataset.empty;}
 node.style.height=s.kind==='lollipop'?Math.max(360,traces[0].y.length*25+100)+'px':'';
 const measure=container.querySelector('[data-chart="'+i+'"][data-key=y]');if(measure)measure.disabled=s.kind==='lollipop'&&s.aggregate==='count';
 const margin={l:s.kind==='radial'?82:['lollipop','heatmap'].includes(s.kind)?125:55,r:s.kind==='radial'?82:s.kind==='lollipop'?64:24,t:s.kind==='radial'?32:18,b:58};
 const xaxis={title:{text:xtitle},automargin:true,gridcolor:'#e8ebee',zeroline:false};
 const yaxis={title:{text:ytitle},automargin:true,gridcolor:'#e8ebee',zeroline:false,...(s.kind==='lollipop'?{type:'category'}:{})};
 if(layoutExtra.yaxis){Object.assign(yaxis,layoutExtra.yaxis);delete layoutExtra.yaxis;}
 await plotly.react(node,traces,{paper_bgcolor:'rgba(0,0,0,0)',plot_bgcolor:'rgba(0,0,0,0)',font:{size:11,color:'#3d4640'},margin,xaxis,yaxis,showlegend:false,dragmode:s.kind==='density'?'select':false,...layoutExtra},{responsive:true,displayModeBar:false});
 if(disposed||version!==generation){if(disposed)plotly.purge(node);return;}
 node.removeAllListeners('plotly_click');node.on('plotly_click',e=>filterClick(e.points?.[0]?.customdata));
 node.removeAllListeners('plotly_selected');if(s.kind==='density')node.on('plotly_selected',e=>{if(e?.points?.length)setExtra('ids',e.points.flatMap(p=>p.customdata?.value||[]));});
 }
 $('#housing-chart-status').textContent='';
 }catch{if(!disposed)$('#housing-chart-status').textContent='Grafici non disponibili. Tabella e CSV restano utilizzabili; cambia un filtro per riprovare.';}
 }
 async function load(){ $('#housing-retry').hidden=true;try{
 const response=await fetch(new URL('./milano-2021.json',import.meta.url),{signal});if(!response.ok)throw Error();const data=validateDataset(await response.json());if(disposed||!isCurrent())return;records=data.records;
 for(const k of cats)form.elements[k].innerHTML='<option value="">Tutti</option>'+[...new Set(records.map(r=>r[k]).filter(v=>v!==null))].sort((a,b)=>a.localeCompare(b,'it')).map(v=>'<option value="'+esc(v)+'">'+esc(v)+'</option>').join('')+'<option value="__missing">Non disponibile</option>';
 $('#housing-load').textContent='';$('#housing-body').hidden=false;update();
 }catch(e){if(disposed||e.name==='AbortError')return;$('#housing-load').textContent='Archivio non disponibile. Riprova.';$('#housing-retry').hidden=false;}}
 form.onchange=update;form.onsubmit=e=>{e.preventDefault();update();};form.onreset=()=>{extra={};setTimeout(()=>{if(!disposed)update();},0);};
 $('#housing-active').onclick=e=>{const k=e.target.closest('[data-remove]')?.dataset.remove;if(!k)return;if(k in extra)delete extra[k];else if(k==='includeFlagged')form.elements[k].checked=false;else form.elements[k].value='';update();};
 container.addEventListener('change',e=>{const i=e.target.dataset.chart;if(i===undefined)return;specs[+i][e.target.dataset.key]=e.target.value;update();},{signal:events.signal});
 $('#housing-prev').onclick=()=>{page--;table();};$('#housing-next').onclick=()=>{page++;table();};
 $('#housing-export').onclick=()=>{const fields=['id',...cats,'price','area','sqm','flagged'];downloadCSV(fields,selected.map(r=>fields.map(k=>value(r,k))),'milano-2021-selezione.csv');};
 $('#housing-retry').onclick=load;load();
 return()=>{disposed=true;events.abort();generation++;for(let i=0;i<specs.length;i++)window.Plotly?.purge($('#housing-plot-'+i));};
}
