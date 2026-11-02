import { escapeHTML as esc } from '../explorer/core.mjs';
import { downloadCSV } from '../explorer/download.mjs';
import { selectRecords, summarize, pricePerSqm, validateDataset, sharedPriceDistribution, comparisonPriceDistribution, categoryKey, categoryLabel, categoryMetricRows, representativeCategoryKeys, categoryBoxStatistics } from './metrics.mjs';
import { renderDistributionSVG, renderCategoryDistributionsSVG, renderBoxPlotSVG } from './charts.mjs';
import { terminalHeader } from '../terminal-header.mjs';

const labels={zone:'Zona',type:'Tipologia',condition:'Stato',rooms:'Locali',energy:'Classe energetica',price:'Prezzo (€)',area:'Superficie (m²)',sqm:'Prezzo al m²',count:'Conteggio',id:'ID',flagged:'Anomalia'};
const categoryFields=['zone','type','condition','rooms','energy'];
const filterCats=['type','condition','rooms','energy'];
const exportFields=['id','zone',...filterCats,'price','area','sqm','flagged'];
const pageSize=10;
const prototypeOrder=['Brera','Duomo','Porta Venezia','Porta Romana - Medaglie d\'Oro','Navigli - Darsena','Isola','Lambrate','Bicocca'];
const fmt=n=>n===null||n===undefined?'—':new Intl.NumberFormat('it-IT',{maximumFractionDigits:0}).format(n);
const value=(record,key)=>key==='sqm'?pricePerSqm(record):record[key];
const palette=['#269D83','#438EC1','#986FC4','#D99B48','#D26F83','#48A8AD','#8B9E51','#B37FA7'];
const prototypeColors=new Map([['Brera',palette[0]],['Duomo',palette[1]],['Porta Venezia',palette[2]],['Porta Romana - Medaglie d\'Oro',palette[3]],['Navigli - Darsena',palette[4]],['Isola',palette[5]],['Lambrate',palette[6]],['Bicocca',palette[7]]]);
const hashColor=key=>{if(prototypeColors.has(key))return prototypeColors.get(key);let hash=0;for(const char of key)hash=(hash*31+char.charCodeAt(0))>>>0;return palette[hash%palette.length];};

export function mountHousing(container,{signal,isCurrent=()=>true,navigationHTML=''}={}) {
  const events=new AbortController();
  const rangeSpecs=[
    {key:'area',low:'minArea',high:'maxArea',label:'Superficie',unit:'m²',step:1},
    {key:'price',low:'minPrice',high:'maxPrice',label:'Prezzo richiesto',unit:'€',step:10000},
    {key:'sqm',low:'minSqm',high:'maxSqm',label:'Prezzo al m²',unit:'€/m²',step:100}
  ];
  const rangeMarkup=rangeSpecs.map(spec=>`<div class="housing-range" data-range="${spec.key}"><div class="housing-range-heading"><strong>${spec.label}</strong><span><output data-range-output="min">MIN —</output><output data-range-output="max">MAX —</output></span></div><div class="housing-range-track"><span aria-hidden="true"></span><input type="range" min="0" max="1" value="0" step="${spec.step}" data-range-handle="min" aria-label="${spec.label} minima"><input type="range" min="0" max="1" value="1" step="${spec.step}" data-range-handle="max" aria-label="${spec.label} massima"></div></div>`).join('');
  const categoryOptions=categoryFields.map(key=>`<option value="${key}">${labels[key]}</option>`).join('');
  container.innerHTML=`<section class="page data-workspace housing-workspace project-readme-workspace">${terminalHeader({path:'~/progetti/immobiliare-data',title:'Dashboard immobiliare',summary:'Questo progetto nasce dalla mia tesi sull’analisi del mercato immobiliare. Nel 2021 ho raccolto gli annunci pubblicati su Immobiliare.it con uno script R di web scraping sviluppato per la ricerca.',details:{id:'housing-readme-more',openLabel:'+ dettagli',closeLabel:'− riduci',paragraphs:['Il lavoro originale comprendeva acquisizione, pulizia e analisi degli annunci. La versione pubblica conserva 14.731 record di Milano e rimuove indirizzi, contatti e altri identificativi.','I dati descrivono prezzi richiesti, non compravendite concluse. Filtri e grafici permettono di esplorare differenze tra zone e tipologie, distribuzioni e valori anomali.','Undici anomalie segnalate restano escluse in partenza, ma possono essere incluse esplicitamente dai filtri.']}})}
  <p id="housing-load" role="status">Caricamento…</p><button id="housing-retry" hidden>Riprova</button><div id="housing-body" hidden>
  <section class="data-panel housing-filter-panel" aria-labelledby="housing-filters-title"><form id="housing-filters"><header class="housing-filter-heading"><div><p>filtri/</p><h2 id="housing-filters-title">Restringi l’universo di confronto</h2></div><div class="housing-filter-actions"><span id="housing-active-count" role="status">Nessun filtro attivo</span><button type="reset">Azzera filtri</button></div></header><fieldset class="housing-filter-group"><legend>Variabili categoriche</legend><div class="housing-category-filters">${filterCats.map(key=>`<label>${labels[key]}<select name="${key}"><option value="">Tutti</option></select></label>`).join('')}</div></fieldset><fieldset class="housing-filter-group housing-numeric-filters"><legend>Variabili numeriche</legend><div class="housing-range-filters">${rangeMarkup}</div></fieldset><label class="data-checkbox housing-anomaly-filter"><input type="checkbox" name="includeFlagged"> Includi le anomalie segnalate</label></form><div class="housing-filter-summary"><p id="housing-status" role="status"></p><div id="housing-kpis" class="lab-kpis"></div></div></section>
  <div class="housing-charts"><figure class="housing-chart housing-zone-chart"><header class="housing-chart-heading"><div><h2><span>01 /</span> Confronta le categorie</h2><p>Cambia dimensione, misura e lettura. A riposo: MIN · Q1 · MEDIANA · Q3 · MAX.</p></div></header>
  <div class="housing-chart-controls"><label>Raggruppa per<select id="housing-group-field">${categoryOptions}</select></label><label>Misura<select id="housing-metric"><option value="sqm">Prezzo al m²</option><option value="price">Prezzo richiesto</option><option value="area">Superficie</option><option value="count">Conteggio</option></select></label><label>Calcolo<select id="housing-aggregate"><option value="median">Mediana</option><option value="mean">Media</option></select></label><div class="housing-view-switch" role="group" aria-label="Tipo di grafico"><button type="button" data-comparison-mode="bar" aria-pressed="true">Barre</button><button type="button" data-comparison-mode="box" aria-pressed="false">Distribuzione</button></div></div>
  <div class="housing-chart-toolbar"><button type="button" id="housing-toggle-all">Deseleziona tutte</button><button type="button" id="housing-show-all">Mostra tutto</button><button type="button" id="housing-exclude-outliers" hidden>Escludi estremi visibili</button><button type="button" id="housing-restore-excluded" hidden>Ripristina esclusi</button><span id="housing-box-disabled" class="housing-control-note" hidden>La distribuzione richiede una misura numerica.</span></div>
  <div id="housing-category-rows" class="housing-zone-rows" role="group" aria-label="Selezione multipla delle categorie"></div><div id="housing-box-scroll" class="housing-plot-scroll housing-box-scroll" hidden><div id="housing-box" class="housing-svg-chart" aria-label="Distribuzione con mezzo violin e box plot per categoria"></div></div><p id="housing-category-note" class="housing-chart-note"></p></figure>
  <figure class="housing-chart housing-distribution-chart"><header class="housing-chart-heading"><div><h2><span>02 /</span> Distribuzione prezzi</h2><p id="housing-distribution-description">Dataset complessivo e selezione corrente dopo filtri e categorie.</p></div><div class="housing-view-switch housing-distribution-switch" role="group" aria-label="Tipo di confronto"><button type="button" data-distribution-view="summary" aria-pressed="true">Totale / filtrato</button><button type="button" data-distribution-view="categories" aria-pressed="false">Confronto categorie</button></div></header><div class="housing-plot-scroll"><div id="housing-distribution" class="housing-svg-chart" aria-label="Distribuzioni dei prezzi"></div></div><div id="housing-distribution-legend" class="housing-distribution-legend" aria-label="Legenda delle distribuzioni"></div><p id="housing-distribution-note" class="housing-chart-note"></p></figure></div><p id="housing-chart-status" role="status"></p>
  <section class="housing-chart housing-records-panel"><div class="lab-records-heading"><h2>Dati della selezione</h2><button id="housing-export">Scarica CSV filtrato</button></div><div id="housing-table" class="lab-table-scroll"></div><div class="lab-pagination"><button id="housing-prev">← Precedente</button><span id="housing-page"></span><button id="housing-next">Successiva →</button></div></section></div>${navigationHTML}</section>`;

  const $=selector=>container.querySelector(selector),form=$('#housing-filters');
  let records=[],comparisonUniverse=[],baseUniverse=[],universe=[],selected=[],page=0,disposed=false,groupField='zone',metric='sqm',aggregate='median',comparisonMode='bar',distributionView='summary',showAll=false,visibleOutlierIds=[];
  const rangeState=new Map(),selectedByField=new Map(),excludedIds=new Set();
  const selectedKeys=()=>selectedByField.get(groupField)??new Set();
  const colorFor=key=>hashColor(groupField==='zone'?key:groupField+':'+key);
  const categoryOrder=(field,source=universe)=>{
    const keys=[...new Set(source.map(record=>categoryKey(record,field)))];
    if(field!=='zone')return keys.sort((a,b)=>categoryLabel(a).localeCompare(categoryLabel(b),'it'));
    const priority=new Map(prototypeOrder.map((key,index)=>[key,index]));
    return keys.sort((a,b)=>priority.has(a)&&priority.has(b)?priority.get(a)-priority.get(b):priority.has(a)?-1:priority.has(b)?1:categoryLabel(a).localeCompare(categoryLabel(b),'it'));
  };
  const allMetricRows=()=>categoryMetricRows(universe,groupField,categoryOrder(groupField),metric,aggregate);
  const representativeKeys=()=>representativeCategoryKeys(allMetricRows());
  const visibleKeys=()=>showAll?categoryOrder(groupField):representativeKeys();
  function ensureSelection(){if(!selectedByField.has(groupField))selectedByField.set(groupField,new Set(categoryOrder(groupField,records)));}

  function table(){
    const fields=['zone','type','price','area','sqm'];
    $('#housing-table').innerHTML='<table><caption>Annunci filtrati · '+pageSize+' righe per pagina</caption><thead><tr>'+fields.map(key=>'<th>'+labels[key]+'</th>').join('')+'</tr></thead><tbody>'+selected.slice(page*pageSize,page*pageSize+pageSize).map(record=>'<tr>'+fields.map(key=>'<td>'+esc(typeof value(record,key)==='number'?fmt(value(record,key)):value(record,key)??'—')+'</td>').join('')+'</tr>').join('')+'</tbody></table>';
    const total=Math.max(1,Math.ceil(selected.length/pageSize));
    $('#housing-page').textContent='Pagina '+(page+1)+' di '+total;$('#housing-prev').disabled=page===0;$('#housing-next').disabled=page>=total-1;$('#housing-export').disabled=!selected.length;
  }

  function metricSuffix(){return metric==='sqm'?' €/m²':metric==='price'?' €':metric==='area'?' m²':'';}
  function renderComparison(){
    const keys=visibleKeys(),rows=categoryMetricRows(universe,groupField,keys,metric,aggregate),chosen=selectedKeys(),selectedAvailable=categoryOrder(groupField).filter(key=>chosen.has(key)).length,boxAllowed=metric!=='count';let viewDetail='';
    if(!boxAllowed&&comparisonMode==='box')comparisonMode='bar';
    container.querySelectorAll('[data-comparison-mode]').forEach(button=>{const isBox=button.dataset.comparisonMode==='box';button.disabled=isBox&&!boxAllowed;button.setAttribute('aria-pressed',String(button.dataset.comparisonMode===comparisonMode));});
    $('#housing-box-disabled').hidden=boxAllowed;$('#housing-aggregate').disabled=metric==='count';
    $('#housing-category-rows').hidden=comparisonMode!=='bar';$('#housing-box-scroll').hidden=comparisonMode!=='box';$('#housing-exclude-outliers').hidden=comparisonMode!=='box';
    if(comparisonMode==='bar'){
      const max=Math.max(...rows.map(row=>row.value??0),1),suffix=metricSuffix();
      $('#housing-category-rows').innerHTML=rows.map(row=>{const active=chosen.has(row.key),width=Math.max(0,(row.value??0)/max*100);return `<button type="button" class="housing-zone-row" data-category-key="${esc(row.key)}" aria-pressed="${active}" title="${esc(row.label)}: ${row.value===null?'valore non disponibile':fmt(row.value)+suffix}. ${active?'Deseleziona':'Seleziona'}"><span class="housing-zone-name">${esc(row.label)}</span><span class="housing-zone-track"><span style="width:${width}%;background:${colorFor(row.key)}"></span></span><strong>${row.value===null?'—':fmt(row.value)+suffix}</strong><span class="housing-zone-check" aria-hidden="true">${active?'✓':'○'}</span></button>`;}).join('');
      visibleOutlierIds=[];
    }else{
      const boxRows=categoryBoxStatistics(universe,groupField,keys,metric,comparisonUniverse).filter(row=>row.count),result=renderBoxPlotSVG($('#housing-box'),{rows:boxRows,colorFor,selectedKeys:chosen,metricLabel:labels[metric]});
      visibleOutlierIds=result.outlierIds;
      viewDetail=` · area = peso nel filtrato; N e quote = valori validi della misura; box = Q1–Q3; linea bianca = mediana; punto scuro = media${result.smallCount?`; ${result.smallCount} gruppi sotto 10 valori senza densità`:''}.`;
    }
    $('#housing-show-all').textContent=showAll?'Riduci':'Mostra tutto';
    $('#housing-toggle-all').textContent=selectedAvailable===categoryOrder(groupField).length&&selectedAvailable?'Deseleziona tutte':'Seleziona tutte';
    $('#housing-restore-excluded').hidden=!excludedIds.size;$('#housing-restore-excluded').textContent=`Ripristina esclusi (${excludedIds.size})`;
    const roleNames=['MIN','Q1','MEDIANA','Q3','MAX'];
    $('#housing-category-note').textContent=(showAll?`${keys.length} categorie visibili · ${selectedAvailable} selezionate.`:`Campione rappresentativo: ${keys.map((key,index)=>`${roleNames[index]??''} ${categoryLabel(key)}`).join(' · ')} · ${selectedAvailable} categorie selezionate.`)+viewDetail;
  }

  function renderDistribution(){
    try{
      const active=categoryOrder(groupField).filter(key=>selectedKeys().has(key));
      if(distributionView==='summary'){
        const series=comparisonPriceDistribution(comparisonUniverse,selected,60);
        renderDistributionSVG($('#housing-distribution'),$('#housing-distribution-legend'),{series});
        $('#housing-distribution-description').textContent='Dataset complessivo e selezione corrente dopo filtri e categorie.';
        $('#housing-distribution-note').textContent=`${fmt(series.validCount)} prezzi complessivi · ${fmt(series.filteredValidCount)} dopo filtri e categorie · asse condiviso al 99° percentile; ${fmt(series.overflowCount)} valori complessivi nell’ultima fascia.`;
      }else if(!active.length||active.length>8){
        $('#housing-distribution').classList.add('is-empty');
        $('#housing-distribution').textContent=active.length?'Per confrontare le categorie, deseleziona tutte e scegline fino a 8.':'Seleziona da 1 a 8 categorie nel grafico 01.';
        $('#housing-distribution-legend').replaceChildren();
        $('#housing-distribution-description').textContent='Confronto diretto tra le distribuzioni delle categorie selezionate.';
        $('#housing-distribution-note').textContent=`Categorie selezionate: ${active.length}. Il confronto ammette da 1 a 8 curve.`;
      }else{
        const series=sharedPriceDistribution(universe,active,60,groupField);
        const comparisonColorFor=key=>palette[active.indexOf(key)%palette.length];
        renderCategoryDistributionsSVG($('#housing-distribution'),$('#housing-distribution-legend'),{series,categoryKeys:active,colorFor:comparisonColorFor,labelFor:categoryLabel});
        $('#housing-distribution-description').textContent='Confronto diretto tra le distribuzioni delle categorie selezionate.';
        $('#housing-distribution-note').textContent=`${active.length} categorie · ${fmt(selected.filter(record=>Number.isFinite(record.price)).length)} prezzi nelle curve · asse calibrato sull’universo filtrato con gli stessi bin.`;
      }
      $('#housing-chart-status').textContent='';
    }catch{$('#housing-chart-status').textContent='Grafici non disponibili. Filtri, tabella e CSV restano utilizzabili.';}
  }

  function syncRange(spec,changed){
    const control=container.querySelector(`[data-range="${spec.key}"]`),low=control.querySelector('[data-range-handle="min"]'),high=control.querySelector('[data-range-handle="max"]'),state=rangeState.get(spec.key);
    if(changed==='min'&&Number(low.value)>Number(high.value))low.value=high.value;if(changed==='max'&&Number(high.value)<Number(low.value))high.value=low.value;
    const span=Math.max(1,state.max-state.min),start=(Number(low.value)-state.min)/span*100,end=(Number(high.value)-state.min)/span*100;
    control.style.setProperty('--range-start',start+'%');control.style.setProperty('--range-end',end+'%');control.querySelector('[data-range-output="min"]').textContent=`MIN ${fmt(Number(low.value))} ${spec.unit}`;control.querySelector('[data-range-output="max"]').textContent=`MAX ${fmt(Number(high.value))} ${spec.unit}`;
  }
  function setupRanges(){
    const clean=records.filter(record=>!record.flagged);
    for(const spec of rangeSpecs){const values=clean.map(record=>value(record,spec.key)).filter(Number.isFinite),min=Math.floor(Math.min(...values)/spec.step)*spec.step,max=Math.ceil(Math.max(...values)/spec.step)*spec.step;rangeState.set(spec.key,{min,max});const control=container.querySelector(`[data-range="${spec.key}"]`),low=control.querySelector('[data-range-handle="min"]'),high=control.querySelector('[data-range-handle="max"]');for(const input of [low,high]){input.min=String(min);input.max=String(max);input.step=String(spec.step);}low.value=low.defaultValue=String(min);high.value=high.defaultValue=String(max);syncRange(spec);}
  }
  function filtersFromForm(){
    const filters={...Object.fromEntries(new FormData(form)),includeFlagged:form.elements.includeFlagged.checked};
    for(const spec of rangeSpecs){const control=container.querySelector(`[data-range="${spec.key}"]`),state=rangeState.get(spec.key),low=Number(control.querySelector('[data-range-handle="min"]').value),high=Number(control.querySelector('[data-range-handle="max"]').value);if(low>state.min)filters[spec.low]=low;if(high<state.max)filters[spec.high]=high;}
    return filters;
  }
  function update(){
    if(disposed||!isCurrent())return;const filters=filtersFromForm();comparisonUniverse=selectRecords(records,{includeFlagged:filters.includeFlagged});baseUniverse=selectRecords(records,filters);universe=baseUniverse.filter(record=>!excludedIds.has(record.id));ensureSelection();selected=universe.filter(record=>selectedKeys().has(categoryKey(record,groupField)));page=0;table();renderComparison();renderDistribution();
    const summary=summarize(selected),selectedAvailable=categoryOrder(groupField).filter(key=>selectedKeys().has(key)).length;$('#housing-status').textContent=`${fmt(selected.length)} annunci in ${selectedAvailable} categorie selezionate; universo di confronto: ${fmt(universe.length)}${excludedIds.size?`; esclusi: ${fmt(excludedIds.size)}`:''}.`;
    const activeFilterCount=filterCats.filter(key=>filters[key]).length+rangeSpecs.filter(spec=>filters[spec.low]!==undefined||filters[spec.high]!==undefined).length+(filters.includeFlagged?1:0);
    $('#housing-active-count').textContent=(activeFilterCount?`${activeFilterCount} ${activeFilterCount===1?'filtro attivo':'filtri attivi'}`:'Nessun filtro attivo')+(excludedIds.size?` · ${excludedIds.size} esclusi`:``);
    for(const key of filterCats)form.elements[key].closest('label').classList.toggle('is-active',Boolean(filters[key]));
    for(const spec of rangeSpecs)container.querySelector(`[data-range="${spec.key}"]`).classList.toggle('is-active',filters[spec.low]!==undefined||filters[spec.high]!==undefined);
    $('.housing-anomaly-filter').classList.toggle('is-active',filters.includeFlagged);
    $('#housing-kpis').innerHTML='<article><span>ANNUNCI SELEZIONATI</span><strong>'+fmt(summary.count)+'</strong></article>'+[['price','PREZZO MEDIANO',' €'],['sqm','MEDIANA €/m²',' €/m²'],['area','SUPERFICIE MEDIANA',' m²']].map(([key,label,suffix])=>`<article><span>${label}</span><strong>${fmt(summary[key].value)}${summary[key].value===null?'':suffix}</strong><small>${fmt(summary[key].count)} valori disponibili</small></article>`).join('');
  }

  async function load(){
    $('#housing-retry').hidden=true;
    try{const response=await fetch(new URL('./milano-2021.json',import.meta.url),{signal});if(!response.ok)throw Error();const data=validateDataset(await response.json());if(disposed||!isCurrent())return;records=data.records;for(const key of filterCats)form.elements[key].innerHTML='<option value="">Tutti</option>'+[...new Set(records.map(record=>record[key]).filter(item=>item!==null))].sort((a,b)=>a.localeCompare(b,'it')).map(item=>`<option value="${esc(item)}">${esc(item)}</option>`).join('')+'<option value="__missing">Non disponibile</option>';setupRanges();$('#housing-load').textContent='';$('#housing-body').hidden=false;update();}
    catch(error){if(disposed||error.name==='AbortError')return;$('#housing-load').textContent='Archivio non disponibile. Riprova.';$('#housing-retry').hidden=false;}
  }

  form.oninput=event=>{const handle=event.target.dataset.rangeHandle;if(!handle)return;syncRange(rangeSpecs.find(item=>item.key===event.target.closest('[data-range]').dataset.range),handle);};
  form.onchange=update;form.onsubmit=event=>{event.preventDefault();update();};form.onreset=()=>setTimeout(()=>{if(disposed)return;selectedByField.clear();excludedIds.clear();showAll=false;for(const spec of rangeSpecs)syncRange(spec);update();},0);
  $('#housing-group-field').onchange=event=>{groupField=event.target.value;showAll=false;ensureSelection();update();};
  $('#housing-metric').onchange=event=>{metric=event.target.value;update();};$('#housing-aggregate').onchange=event=>{aggregate=event.target.value;update();};
  $('#housing-show-all').onclick=()=>{showAll=!showAll;renderComparison();};
  $('#housing-toggle-all').onclick=()=>{const available=categoryOrder(groupField),chosen=selectedKeys(),allSelected=available.length&&available.every(key=>chosen.has(key));selectedByField.set(groupField,allSelected?new Set():new Set(categoryOrder(groupField,records)));update();};
  $('#housing-exclude-outliers').onclick=()=>{visibleOutlierIds.forEach(id=>excludedIds.add(id));update();};$('#housing-restore-excluded').onclick=()=>{excludedIds.clear();update();};
  function toggleCategory(key){const chosen=selectedKeys();if(chosen.has(key))chosen.delete(key);else chosen.add(key);update();}
  $('#housing-category-rows').onclick=event=>{const row=event.target.closest('[data-category-key]');if(row)toggleCategory(row.dataset.categoryKey);};
  $('#housing-box').onclick=event=>{const outlier=event.target.closest('[data-outlier-id]');if(outlier){excludedIds.add(outlier.dataset.outlierId);update();return;}const row=event.target.closest('[data-category-key]');if(row)toggleCategory(row.dataset.categoryKey);};
  $('#housing-box').onkeydown=event=>{if(!['Enter',' '].includes(event.key))return;const target=event.target.closest('[data-outlier-id],[data-category-key]');if(!target)return;event.preventDefault();if(target.dataset.outlierId){excludedIds.add(target.dataset.outlierId);update();}else toggleCategory(target.dataset.categoryKey);};
  container.addEventListener('click',event=>{const comparison=event.target.closest('[data-comparison-mode]')?.dataset.comparisonMode;if(comparison&&comparison!==comparisonMode){comparisonMode=comparison;renderComparison();return;}const view=event.target.closest('[data-distribution-view]')?.dataset.distributionView;if(view&&view!==distributionView){distributionView=view;container.querySelectorAll('[data-distribution-view]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.distributionView===view)));renderDistribution();}},{signal:events.signal});
  $('.readme-toggle').onclick=event=>{const button=event.currentTarget,details=$('#'+button.getAttribute('aria-controls')),expanded=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!expanded));button.textContent=expanded?button.dataset.openLabel:button.dataset.closeLabel;details.hidden=expanded;};
  $('#housing-prev').onclick=()=>{page--;table();};$('#housing-next').onclick=()=>{page++;table();};$('#housing-export').onclick=()=>downloadCSV(exportFields,selected.map(record=>exportFields.map(key=>value(record,key))),'milano-2021-selezione.csv');$('#housing-retry').onclick=load;load();
  return()=>{disposed=true;events.abort();};
}
