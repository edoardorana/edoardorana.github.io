import { person, areas, steps, projects, places, parseRoute, mailto, mapPoint } from './data.mjs';

const main = document.querySelector('#main');
const index = document.querySelector('#site-index');
const indexToggle = document.querySelector('.index-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const chips = tags => `<div class="chips">${tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}</div>`;
const arrow = '<span aria-hidden="true">↗</span>';
let previousRoute = { page: 'mappa' };
let mapObserver;
let selectedStep = 0;
let selectedPlace = 'milano';
let contactDraft = '';
let transitionBusy = false;

function backLink(href = '#/', text = 'Torna alla mappa') {
  return `<a class="back-link" href="${href}"><span aria-hidden="true">←</span> ${text}</a>`;
}
function pageHeader(id, title, text) {
  const area = areas.find(area => area.id === id);
  return `<div class="page-bar">${backLink()}<span>${area.number} / ${area.title.toUpperCase()}</span></div><header class="page-heading"><p class="eyebrow">${area.word}</p><h1>${title}</h1><p class="page-intro">${text}</p></header>`;
}
function related(ids) {
  return `<nav class="related" aria-label="Altre sezioni"><span>Altre sezioni</span>${ids.map(id => { const area = areas.find(a => a.id === id); return `<a href="#/${id}">${area.title} ${arrow}</a>`; }).join('')}</nav>`;
}
function home() {
  const first = areas[0];
  return `<section class="home"><div class="home-intro"><h1>Sistemi, database, analisi.</h1><p>Lavoro come Linux Administrator, dopo un’esperienza come Database Administrator su Oracle e PostgreSQL. Ho una formazione in statistica e frequento la magistrale in Data Science.</p></div>
  <div class="atlas" aria-label="Esplora le cinque aree del portfolio"><svg class="connections" aria-hidden="true"></svg><div class="map-preview" aria-live="polite"><span class="preview-index">${first.number} / ${first.word}</span><h2 class="preview-title">${first.title}</h2><p class="preview-copy">${first.preview}</p></div>
  ${areas.map(area => `<a class="area area-${area.id}" href="#/${area.id}" data-node="${area.id}"><span class="area-number">${area.number}</span><span class="area-content"><strong>${area.title}</strong><small>${area.note}</small></span><span class="area-arrow" aria-hidden="true">↗</span></a>`).join('')}</div></section>`;
}
function profile() {
  return `<section class="page">${pageHeader('profilo', 'La curiosità è<br>il mio <em>punto di partenza.</em>', 'Sono Edoardo Rana. Mi interessa il percorso completo del dato: dove nasce, come viene custodito e cosa ci permette di capire.')}
  <div class="profile-layout"><div class="portrait-type" aria-label="Monogramma Edoardo Rana"><span>ER</span><small>STATISTICA ↔ SISTEMI</small><p>Una base analitica.<br>Un approccio pratico.</p></div><div class="prose"><h2>Fra analisi e infrastruttura.</h2><p>Ho studiato Statistica e Gestione delle Informazioni a Milano-Bicocca e sto proseguendo il percorso magistrale in Data Science. Oggi lavoro come Linux Administrator in Broway SA, dopo un’esperienza come Database Administrator nella stessa azienda.</p><p>Passo dalle query SQL ai processi batch, dal monitoraggio ai backup. L’esperienza nell’analisi dati e nella Business Intelligence mi aiuta a guardare anche a ciò che succede dopo: come le informazioni vengono lette e utilizzate.</p><p>Sto costruendo uno spazio per nuove collaborazioni su dati, automazioni e strumenti utili al lavoro quotidiano.</p><a class="button" href="cv.html" target="_blank" rel="noopener">Leggi il CV ${arrow}</a></div></div>
  <div class="skills-grid"><article><span class="eyebrow">CUSTODIRE</span><h3>Database & sistemi</h3>${chips(['Oracle','PostgreSQL','MySQL','Linux','checkmk','OEM'])}</article><article><span class="eyebrow">COMPRENDERE</span><h3>Analisi & visualizzazione</h3>${chips(['Python','R','SQL','Power BI','Tableau','Qlik'])}</article><article><span class="eyebrow">ESPLORARE</span><h3>Modelli & possibilità</h3>${chips(['Statistica','Machine learning','Knime','Orange'])}</article></div>
  <div class="human-note"><div><p class="eyebrow">FUORI DALLO SCHERMO</p><h2>Equilibrio, movimento,<br><em>un po’ di strada.</em></h2></div><p>Judo e arti marziali, skateboard, moto e auto. Interessi diversi, che fanno parte della persona con cui lavorerai. Parlo italiano, inglese e spagnolo.</p></div>${related(['percorso','progetti','contatti'])}</section>`;
}
function approach() {
  return `<section class="page">${pageHeader('approccio','Prima il problema.<br>Poi <em>gli strumenti.</em>','Possiamo iniziare da un’attività da automatizzare, un archivio da organizzare o una domanda ancora senza risposta.')}
  <div class="method"><div class="method-steps" role="tablist" aria-label="Il percorso del dato">${steps.map((s,i) => `<button role="tab" id="method-${i}" aria-controls="method-panel" aria-selected="${i === selectedStep}" tabindex="${i === selectedStep ? 0 : -1}" data-step="${i}"><span>0${i+1}</span>${s.title}</button>`).join('')}</div><article id="method-panel" role="tabpanel" aria-labelledby="method-${selectedStep}"></article></div>
  <div class="principles"><article><span>01</span><h3>Un primo passo concreto.</h3><p>Definire un ambito piccolo e verificabile permette di capire presto se stiamo risolvendo il problema giusto.</p></article><article><span>02</span><h3>Strumenti proporzionati.</h3><p>Uno script può bastare. Un database può essere necessario. La scelta dipende dal processo e da chi lo utilizzerà.</p></article><article><span>03</span><h3>Continuità dopo il rilascio.</h3><p>Controlli, documentazione e passaggio di conoscenze fanno parte del lavoro.</p></article></div>${related(['progetti','contatti'])}</section>`;
}
function projectList() {
  return `<section class="page">${pageHeader('progetti','Dalle idee<br>al <em>lavoro concreto.</em>','Una selezione di esperienze, dalla raccolta dei dati alla loro gestione in produzione. Ogni scheda racconta il contesto e il mio contributo.')}
  <div class="project-list">${projects.map(p => `<a class="project-row" href="#/progetti/${p.id}"><div class="project-number">${p.number}</div><div><p class="eyebrow">${p.kind}</p><h2>${p.title}</h2><p>${p.subtitle}</p>${chips(p.tags)}</div><span class="project-arrow" aria-hidden="true">↗</span></a>`).join('')}</div>${related(['approccio','percorso','contatti'])}</section>`;
}
function projectDetail(id) {
  const p = projects.find(p => p.id === id);
  return `<article class="page project-detail"><div class="page-bar">${backLink('#/progetti','Tutti i progetti')}<span>PROGETTO / ${p.number}</span></div><header class="page-heading"><p class="eyebrow">${p.kind}</p><h1>${p.title}</h1><p class="page-intro">${p.subtitle}</p>${chips(p.tags)}</header><div class="project-story"><section><span>01 / CONTESTO</span><h2>Da dove si parte.</h2><p>${p.context}</p></section><section><span>02 / CONTRIBUTO</span><h2>Il mio lavoro.</h2><p>${p.contribution}</p></section><section><span>03 / COSA RACCONTA</span><h2>Il punto di arrivo.</h2><p>${p.output}</p></section></div>${related(['approccio','contatti'])}</article>`;
}
function europeMap() {
  const entries = Object.entries(places);
  return `<div class="europe-map" aria-label="Mappa interattiva delle tappe in Europa"><img src="europe.svg" alt="" class="europe-base"><svg viewBox="0 0 600 650" aria-hidden="true" class="europe-overlay">${entries.map(([id,p]) => {
    const [x,y] = mapPoint(p.coordinates); const [lx,ly] = p.mapLabel;
    return `<g data-map-place="${id}"><path d="M${x},${y} L${lx},${ly}"/><circle cx="${x}" cy="${y}" r="5"/></g>`;
  }).join('')}</svg><span class="europe-caption">QUATTRO TAPPE, UN PERCORSO</span>${entries.map(([id,p],i) => {
    const [x,y] = mapPoint(p.coordinates);
    return `<button class="map-point" data-place="${id}" aria-label="Esplora ${p.name}" aria-controls="place-info" aria-pressed="${id===selectedPlace}" style="left:${x/6}%;top:${y/6.5}%"></button><button class="map-label" data-place="${id}" aria-controls="place-info" aria-pressed="${id===selectedPlace}" style="left:${p.mapLabel[0]/6}%;top:${p.mapLabel[1]/6.5}%"><span>0${i+1}</span> ${p.name}${id==='stoccarda'?'<small>ORA QUI</small>':''}${id==='svizzera'?'<small>DA REMOTO</small>':''}</button>`;
  }).join('')}</div>`;
}
function journey() {
  return `<section class="page">${pageHeader('percorso','I luoghi cambiano.<br>Le connessioni <em>restano.</em>','Formazione, esperienze e persone hanno aggiunto prospettive diverse al mio modo di lavorare.')}
  <div class="journey-layout"><div><div class="place-picker" aria-label="Seleziona un luogo">${Object.entries(places).map(([id,p])=>`<button data-place="${id}" aria-pressed="${id===selectedPlace}">${p.name}</button>`).join('')}</div><div id="place-info" aria-live="polite"></div></div><div class="geo-wrap">${europeMap()}<span class="map-attribution">Seleziona un punto o il suo nome per esplorare la tappa. Norvegia e Svizzera: posizioni indicative del paese. Cartografia: Natural Earth.</span></div></div>
  <div class="timeline"><h2>Le esperienze, in sequenza.</h2><ol><li><span>DAL 2025</span><div><h3>Linux Administrator · Broway SA</h3><p>Maggio 2025 – oggi. Infrastrutture Proxmox, monitoraggio con checkmk, script SQL e shell, aggiornamenti di sistema. Debian 13, MariaDB, MultiPortal e Cubbit.</p></div></li><li><span>2024 — 2025</span><div><h3>Database Administrator · Broway SA</h3><p>Ottobre 2024 – maggio 2025. Oracle, PostgreSQL, monitoraggio e processi operativi su Linux.</p></div></li><li><span>2024 — 2026</span><div><h3>Collaboratore · Hubita APS</h3><p>Gennaio 2024 – gennaio 2026. Progetti sociali e culturali, organizzazione di attività e amministrazione Google Workspace.</p></div></li><li><span>2023</span><div><h3>Business Unit Intern · SB Italia</h3><p>Gennaio – novembre 2023. Analisi dati, classificazione e dashboard BI.</p></div></li><li><span>2021 — 2022</span><div><h3>Erasmus · Arctic University of Norway</h3><p>Agosto 2021 – agosto 2022. Un anno di formazione e vita in Norvegia.</p></div></li><li><span>DAL 2021</span><div><h3>Magistrale in Data Science · Milano-Bicocca</h3><p>Percorso in corso, con focus su machine learning, big data e modelli predittivi.</p></div></li><li><span>2017 — 2021</span><div><h3>Laurea in Statistica e Gestione delle Informazioni</h3><p>Milano-Bicocca. Tesi sul web scraping per analisi di mercato.</p></div></li></ol></div>${related(['profilo','progetti'])}</section>`;
}
function contact() {
  return `<section class="page contact-page">${pageHeader('contatti','Contatti e collaborazioni.','Per una proposta o una domanda, puoi scrivermi direttamente via email.')}
  <div class="contact-layout"><div><a class="email-link" href="mailto:${person.email}">${person.email} ${arrow}</a><p class="muted">Per informazioni sul mio lavoro o proposte di collaborazione.</p><div class="contact-topics"><span>Automazioni</span><span>Database</span><span>Analisi e dashboard</span><span>Collaborazioni</span></div><a class="text-link" href="${person.github}" target="_blank" rel="noopener noreferrer">GitHub ${arrow}</a></div><form id="contact-form"><label for="message">Messaggio (facoltativo)</label><textarea id="message" rows="5" placeholder="Descrivi in breve il contesto o la domanda…">${escapeHTML(contactDraft)}</textarea><button class="button" type="submit">Apri email ${arrow}</button><p class="form-note">Si apre il tuo programma di posta. Nulla viene inviato dal sito.</p><button class="copy-email" type="button">Copia indirizzo email</button><p id="contact-status" role="status"></p></form></div>${related(['approccio','progetti'])}</section>`;
}
function setStep(i, focus = false) {
  selectedStep = i;
  const s = steps[i];
  const panel = document.querySelector('#method-panel');
  document.querySelectorAll('[data-step]').forEach((b,n)=>{b.setAttribute('aria-selected',String(i===n));b.tabIndex=i===n?0:-1;if(focus&&i===n)b.focus();});
  panel.setAttribute('aria-labelledby',`method-${i}`);
  panel.innerHTML = `<span class="method-big" aria-hidden="true">0${i+1}</span><p class="eyebrow">IL PERCORSO DEL DATO / 0${i+1}</p><h2>${s.short}</h2><p>${s.text}</p><div class="method-output"><span>A COSA PUNTIAMO</span><p>${s.result}</p></div>${chips(s.tags)}`;
}
function setPlace(key) {
  selectedPlace = key;
  const p = places[key];
  document.querySelectorAll('[data-place]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.place===key)));
  document.querySelector('#place-info').innerHTML = `<p class="eyebrow">${p.label}</p><h2>${p.name}</h2><p class="place-dates">${p.dates.replaceAll('\n','<br>')}</p><p>${p.text}</p>${chips(p.skills)}`;
  document.querySelectorAll('[data-map-place]').forEach(group => group.classList.toggle('is-selected',group.dataset.mapPlace===key));
}
function drawConnections() {
  const atlas=document.querySelector('.atlas');
  if(!atlas)return;
  const rect=atlas.getBoundingClientRect();
  const svg=atlas.querySelector('.connections');
  svg.setAttribute('viewBox',`0 0 ${rect.width} ${rect.height}`);
  const positions={};
  atlas.querySelectorAll('[data-node], .map-preview').forEach(el=>{const r=el.getBoundingClientRect();positions[el.dataset.node||'core']=[r.x-rect.x+r.width/2,r.y-rect.y+r.height/2];});
  const links=areas.map(a=>['core',a.id]);
  svg.replaceChildren(...links.map(([a,b])=>{const path=document.createElementNS('http://www.w3.org/2000/svg','path');const [x,y]=positions[a];const [tx,ty]=positions[b];path.setAttribute('d',`M${x},${y} C${x},${(y+ty)/2} ${tx},${(y+ty)/2} ${tx},${ty}`);return path;}));
}
function setMapPreview(id = 'profilo') {
  const area = areas.find(entry => entry.id === id);
  if (!area) return;
  const atlas = document.querySelector('.atlas');
  atlas.querySelector('.preview-index').textContent = `${area.number} / ${area.word}`;
  atlas.querySelector('.preview-title').textContent = area.title;
  atlas.querySelector('.preview-copy').textContent = area.preview;
  atlas.querySelectorAll('[data-node]').forEach(node => node.classList.toggle('is-active', node.dataset.node === id));
}
function bindPage(route) {
  if(route.page==='mappa'){
    const atlas = document.querySelector('.atlas');
    mapObserver = new ResizeObserver(drawConnections);
    mapObserver.observe(atlas);
    drawConnections();
    setMapPreview();
    atlas.addEventListener('pointerover', e => { const node = e.target.closest('[data-node]'); if(node) setMapPreview(node.dataset.node); });
    atlas.addEventListener('pointerleave', () => setMapPreview());
    atlas.addEventListener('focusin', e => { const node = e.target.closest('[data-node]'); if(node) setMapPreview(node.dataset.node); });
    atlas.addEventListener('focusout', e => { if(!e.relatedTarget?.closest?.('[data-node]')) setMapPreview(); });
  }
  if(route.page==='approccio'){
    setStep(selectedStep);
    document.querySelectorAll('[data-step]').forEach((b,i)=>{b.addEventListener('click',()=>setStep(i));b.addEventListener('keydown',e=>{let next=i;if(['ArrowRight','ArrowDown'].includes(e.key))next=(i+1)%steps.length;else if(['ArrowLeft','ArrowUp'].includes(e.key))next=(i+steps.length-1)%steps.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=steps.length-1;else return;e.preventDefault();setStep(next,true);});});
  }
  if(route.page==='percorso'){
    setPlace(selectedPlace);
    document.querySelectorAll('[data-place]').forEach(b=>b.addEventListener('click',()=>setPlace(b.dataset.place)));
  }
  if(route.page==='contatti'){
    document.querySelector('#message').addEventListener('input',e=>contactDraft=e.target.value);
    document.querySelector('#contact-form').addEventListener('submit',e=>{e.preventDefault();location.href=mailto('Una possibile collaborazione',contactDraft);document.querySelector('#contact-status').textContent='Se la posta non si apre, copia l’indirizzo e scrivi dal tuo servizio email.';});
    document.querySelector('.copy-email').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(person.email);document.querySelector('#contact-status').textContent='Indirizzo copiato.';}catch{document.querySelector('#contact-status').textContent='Puoi copiare manualmente: '+person.email;}});
  }
}
function render() {
  const route=parseRoute(location.hash);
  mapObserver?.disconnect();
  const renderers={mappa:home,profilo:profile,approccio:approach,percorso:journey,progetti:()=>route.item?projectDetail(route.item):projectList(),contatti:contact,'not-found':()=>`<section class="page">${backLink()}<h1>Questa connessione<br>non esiste ancora.</h1><p>Torna alla mappa per riprendere il percorso.</p></section>`};
  main.innerHTML=renderers[route.page]();
  document.body.dataset.page=route.page;
  const area=areas.find(a=>a.id===route.page);
  document.title=`${route.item?projects.find(p=>p.id===route.item).subtitle:area?.title||'Sistemi, database e analisi'} — Edoardo Rana`;
  index.hidden=true;indexToggle.setAttribute('aria-expanded','false');
  document.querySelectorAll('#site-index a').forEach(a=>{a.removeAttribute('aria-current');if(a.hash===location.hash)a.setAttribute('aria-current','page');});
  bindPage(route);
  if(route.page==='mappa'&&previousRoute.page!=='mappa')document.querySelector(`[data-node="${previousRoute.page}"]`)?.focus({preventScroll:true});
  else main.focus({preventScroll:true});
  previousRoute=route;
}
async function navigate() {
  if(transitionBusy)return;
  transitionBusy=true;
  if(!reducedMotion.matches&&document.startViewTransition){const transition=document.startViewTransition(()=>{render();window.scrollTo(0,0);});try{await transition.finished;}catch{/* navigation still completed */}}
  else {render();window.scrollTo(0,0);}
  transitionBusy=false;
  // A fast Back/Forward during a transition must still reach the latest hash.
  const current=parseRoute(location.hash);
  if(current.page!==previousRoute.page||current.item!==previousRoute.item)navigate();
}
indexToggle.addEventListener('click',()=>{index.hidden=!index.hidden;indexToggle.setAttribute('aria-expanded',String(!index.hidden));});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!index.hidden){index.hidden=true;indexToggle.setAttribute('aria-expanded','false');indexToggle.focus();}});
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#/"]');if(a){const card=a.closest('.area');if(card){const r=card.getBoundingClientRect();const mr=main.getBoundingClientRect();document.documentElement.style.setProperty('--entry-x',`${r.x+r.width/2-mr.x}px`);document.documentElement.style.setProperty('--entry-y',`${r.y+r.height/2-mr.y}px`);}}});
document.querySelector('.skip').addEventListener('click',e=>{e.preventDefault();main.focus();});
window.addEventListener('hashchange',()=>{if(location.hash==='#main'){main.focus();return;}navigate();});
render();
