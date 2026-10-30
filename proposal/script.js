import { contactHTML, bindContact } from './contact.mjs';
import { areas, steps, projects, places, parseRoute, mapPoint } from './data.mjs';
import { terminalHeader } from './terminal-header.mjs';

const main = document.querySelector('#main');
const index = document.querySelector('#site-index');
const indexToggle = document.querySelector('.index-toggle');
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const chips = tags => `<div class="chips">${tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}</div>`;
let previousRoute = { page: 'mappa' };
let selectedPlace = 'milano';
let renderVersion = 0;
let pageController;
let pageCleanup;

function backLink(href = '#/', text = 'Torna alla Home') {
  return `<a class="back-link" href="${href}"><span aria-hidden="true">←</span> ${text}</a>`;
}
function pageHeader(id, text, { embedded = false } = {}) {
  const area = areas.find(area => area.id === id);
  return terminalHeader({ path: `~/${id}`, title: area.title, summary: text, headingLevel: embedded ? 2 : 1, titleId: embedded ? `${id}-title` : undefined });
}
function sectionNav(id) {
  const position = areas.findIndex(area => area.id === id);
  const previous = areas[position - 1];
  const next = areas[position + 1];
  const link = (area, direction, symbol) => `<a href="#/${area.id}" aria-label="${direction}: ${area.title}"><span aria-hidden="true">${symbol}</span><code>~/${area.id}</code></a>`;
  return `<nav class="section-nav" aria-label="Navigazione tra le sezioni"><div class="section-nav-prev">${previous ? link(previous, 'Sezione precedente', '←') : ''}</div><a class="section-nav-home" href="#/" aria-label="Home"><code>~/home</code></a><div class="section-nav-next">${next ? link(next, 'Sezione successiva', '→') : ''}</div></nav>`;
}
function projectNav() {
  return '<nav class="section-nav project-nav" aria-label="Navigazione del progetto"><a href="#/progetti"><span aria-hidden="true">←</span><code>~/progetti</code></a><a href="#/" aria-label="Home"><code>~/home</code></a></nav>';
}
function home({ embedded = false } = {}) {
  return `<section class="home"${embedded ? ' id="home"' : ''}>${terminalHeader({ path: '~/home', title: 'Sistemi Linux, database e analisi.', summary: 'Benvenuto nel mio sito. Scegli un’area da esplorare.' })}
  <div class="atlas" aria-label="Le quattro aree del portfolio">
  ${areas.map(area => `<a class="area area-${area.id}" href="#/${area.id}" data-node="${area.id}"><strong class="area-title">${area.title}</strong><span class="area-details"><span class="area-terminal"><span class="area-command-line" aria-hidden="true"><span class="area-path">~/${area.id}</span><span class="area-prompt-static">$</span> <span class="area-command-name">cat readme.md</span></span></span></span></a>`).join('')}</div></section>`;
}
function profile({ embedded = false } = {}) {
  const subsectionHeading = embedded ? 'h3' : 'h2';
  const itemHeading = embedded ? 'h4' : 'h3';
  return `<section class="page${embedded ? ' landing-section' : ''}"${embedded ? ' id="profilo" aria-labelledby="profilo-title"' : ''}>${terminalHeader({ path: '~/profilo', title: 'Profilo', summary: 'Qui trovi formazione, esperienze e luoghi del mio percorso.', sections: [{ label: 'generale/', text: 'Lavoro su infrastrutture Linux, database e automazione, partendo da log, dati e contesto operativo.' }], action: { href: 'cv.html', command: 'xdg-open cv.html', label: 'Apri il CV sintetico' }, headingLevel: embedded ? 2 : 1, titleId: embedded ? 'profilo-title' : undefined })}
  ${journeyContent({ embedded })}
  <section class="skills-terminal" aria-labelledby="skills-title"><${subsectionHeading} class="visually-hidden" id="skills-title">Competenze, lingue e interessi</${subsectionHeading}><div class="terminal-screen"><p class="terminal-command"><b>~/profilo</b>$ skills --overview</p><div class="skills-grid"><article><p class="terminal-path">consulenza/</p><${itemHeading}>Supporto e metodo</${itemHeading}><p>Requisiti · Diagnosi delle cause · Documentazione · Processi</p></article><article><p class="terminal-path">infrastruttura/</p><${itemHeading}>Sistemi Linux</${itemHeading}><p>Debian · Proxmox VE / PBS · checkmk · Storage S3 · Backup</p></article><article><p class="terminal-path">database_automazione/</p><${itemHeading}>Dati e automazione</${itemHeading}><p>Oracle · PostgreSQL · MariaDB / MySQL · SQL · Bash · Python</p></article><article><p class="terminal-path">analisi_bi/</p><${itemHeading}>Business Intelligence</${itemHeading}><p>KPI · Power BI · Qlik Sense · Tableau · R · KNIME · Orange</p></article></div><div class="terminal-extra"><p class="terminal-command"><b>~/profilo</b>$ languages --list</p><p>Italiano madrelingua · Inglese C1 · Spagnolo B2</p><p class="terminal-command"><b>~/profilo</b>$ interests --list</p><p>Judo · Ju jitsu · Arti marziali · Skateboard · Moto · Auto</p></div></div></section>
  ${embedded ? '' : sectionNav('profilo')}</section>`;
}
function approach({ embedded = false } = {}) {
  const documents = ['capire', 'raccogliere', 'custodire', 'leggere', 'evolvere'];
  const phaseHeading = embedded ? 'h3' : 'h2';
  return `<section class="page${embedded ? ' landing-section' : ''}"${embedded ? ' id="approccio" aria-labelledby="approccio-title"' : ''}>${pageHeader('approccio','Cinque fasi da leggere in sequenza: capire, raccogliere, custodire, leggere ed evolvere. Ogni fase include una scheda operativa separata.', { embedded })}
  <div class="method" aria-label="Il percorso del dato">${steps.map((s,i) => `<article class="method-step" aria-labelledby="method-${i}"><span class="method-big" aria-hidden="true">0${i+1}</span><p class="eyebrow">FASE 0${i+1} / 05</p><${phaseHeading} id="method-${i}">${s.title}</${phaseHeading}><p class="method-short">${s.short}</p><p>${s.text}</p><div class="method-output"><span>DOCUMENTAZIONE</span><p>${s.result}</p></div>${chips(s.tags)}<a class="button method-document" href="/approccio/${documents[i]}.html">Apri la scheda operativa ↗</a></article>`).join('')}</div>
  ${embedded ? '' : sectionNav('approccio')}</section>`;
}
function projectList({ embedded = false } = {}) {
  const projectHeading = embedded ? 'h3' : 'h2';
  return `<section class="page${embedded ? ' landing-section' : ''}"${embedded ? ' id="progetti" aria-labelledby="progetti-title"' : ''}>${pageHeader('progetti','Dashboard da provare e un progetto in corso. Seleziona una scheda per leggere il contesto.', { embedded })}
  <div class="project-list">${projects.map(p => `<a class="project-row" href="#/progetti/${p.id}"><div><p class="eyebrow">${p.kind}</p><${projectHeading}>${p.title}</${projectHeading}><p>${p.subtitle}</p>${chips(p.tags)}</div><span class="project-arrow" aria-hidden="true">↗</span></a>`).join('')}</div>${embedded ? '' : sectionNav('progetti')}</section>`;
}
function projectDetail(id) {
  const p = projects.find(p => p.id === id);
  return `<article class="page project-detail">${terminalHeader({ path: `~/progetti/${p.id}`, title: p.title, summary: 'NetBox per organizzare gli indirizzi IP. Qui raccolgo il contesto del lavoro in corso e i prossimi sviluppi.' })}${chips(p.tags)}<div class="project-story"><section><h2>Il progetto</h2><p>${p.context}</p></section><section><h2>Lavoro in corso</h2><p>${p.contribution}</p></section><section><h2>Sviluppi futuri</h2><p>${p.output}</p></section></div>${projectNav()}</article>`;
}
function europeMap() {
  const entries = Object.entries(places);
  return `<div class="europe-map" aria-label="Mappa interattiva delle tappe in Europa"><img src="europe.svg" alt="" class="europe-base"><svg viewBox="0 0 600 650" aria-hidden="true" class="europe-overlay">${entries.map(([id,p]) => {
    const [x,y] = mapPoint(p.coordinates); const [lx,ly] = p.mapLabel;
    return `<g data-map-place="${id}"><path d="M${x},${y} L${lx},${ly}"/><circle cx="${x}" cy="${y}" r="5"/></g>`;
  }).join('')}</svg><span class="europe-caption">QUATTRO TAPPE, UN PERCORSO</span>${entries.map(([id,p],i) => {
    const [x,y] = mapPoint(p.coordinates);
    return `<button class="map-point" data-place="${id}" aria-label="Seleziona ${p.name}" aria-controls="place-info" aria-pressed="${id===selectedPlace}" style="left:${x/6}%;top:${y/6.5}%"></button><button class="map-label" data-place="${id}" aria-controls="place-info" aria-pressed="${id===selectedPlace}" style="left:${p.mapLabel[0]/6}%;top:${p.mapLabel[1]/6.5}%"><span>0${i+1}</span> ${p.name}</button>`;
  }).join('')}</div>`;
}
function journeyContent({ embedded = false } = {}) {
  const subsectionHeading = embedded ? 'h3' : 'h2';
  const itemHeading = embedded ? 'h4' : 'h3';
  return `<section class="profile-journey" aria-labelledby="journey-title"><header><${subsectionHeading} class="journey-title" id="journey-title">Formazione ed esperienze</${subsectionHeading}><p>Seleziona una città per conoscerne il ruolo nel mio percorso. La cronologia riunisce studi ed esperienze professionali.</p></header>
  <div class="journey-layout"><div><div class="place-picker" aria-label="Seleziona un luogo">${Object.entries(places).map(([id,p])=>`<button data-place="${id}" aria-pressed="${id===selectedPlace}">${p.name}</button>`).join('')}</div><div id="place-info" aria-live="polite"></div></div><div class="geo-wrap">${europeMap()}<span class="map-attribution">I punti indicano città, non indirizzi precisi. Zugo si riferisce all’azienda con cui lavoro da remoto, non a una mia sede. Cartografia: Natural Earth.</span></div></div>
  <div class="timeline"><${subsectionHeading} class="timeline-title">Cronologia</${subsectionHeading}><ol><li><span>DAL 2025</span><div><${itemHeading}>Linux Administrator · Broway SA</${itemHeading}><p>Maggio 2025 – oggi. Infrastrutture Proxmox VE e Backup Server, monitoraggio con checkmk, analisi dei log, script SQL e shell. Attività su Debian, MariaDB, storage S3-compatibile, documentazione tecnica e sicurezza operativa.</p></div></li><li><span>2024 — 2025</span><div><${itemHeading}>Database Administrator · Broway SA</${itemHeading}><p>Ottobre 2024 – maggio 2025. Oracle e PostgreSQL: monitoraggio, diagnosi di errori SQL e batch, backup e ripristino, gestione degli schemi e supporto ai rilasci.</p></div></li><li><span>2024 — 2026</span><div><${itemHeading}>Collaboratore operativo · Hubita APS</${itemHeading}><p>Gennaio 2024 – gennaio 2026. Coordinamento di attività per progetti sociali e culturali, eventi e amministrazione di Google Workspace.</p></div></li><li><span>2023</span><div><${itemHeading}>Business Unit Intern · SB Italia</${itemHeading}><p>Gennaio – novembre 2023. Ho analizzato dataset aziendali e lavorato su metodi di classificazione. Ho inoltre creato report e dashboard con Qlik, Power BI e Tableau.</p></div></li><li><span>2021 — 2022</span><div><${itemHeading}>Erasmus · UiT The Arctic University of Norway</${itemHeading}><p>Agosto 2021 – agosto 2022. Un anno di studio a Tromsø, in Norvegia.</p></div></li><li><span>DAL 2021</span><div><${itemHeading}>Magistrale in Data Science · Milano-Bicocca</${itemHeading}><p>In corso. Statistica avanzata, machine learning, modelli predittivi e big data.</p></div></li><li><span>2017 — 2021</span><div><${itemHeading}>Laurea in Statistica e Gestione delle Informazioni</${itemHeading}><p>Milano-Bicocca. Statistica, sistemi informativi e programmazione; tesi sul web scraping di annunci immobiliari.</p></div></li><li><span>2015 — 2016</span><div><${itemHeading}>Prime esperienze in amministrazione</${itemHeading}><p>Stage in contabilità e supporto alla consulenza presso LTA Advisory (2016). Stage in contabilità presso TaxiBlu (2015), con Zucchetti e manutenzione di database.</p></div></li><li><span>2012 — 2017</span><div><${itemHeading}>Diploma in Amministrazione, Finanza e Marketing</${itemHeading}><p>Istituto San Vincenzo / Regina Mundi. Materie economico-aziendali, contabilità e marketing.</p></div></li></ol></div></section>`;
}
function contact({ embedded = false } = {}) { return `<section class="page contact-page${embedded ? ' landing-section' : ''}"${embedded ? ' id="contatti" aria-labelledby="contatti-title"' : ''}>${contactHTML({ headingLevel: embedded ? 2 : 1, titleId: embedded ? 'contatti-title' : undefined })}${embedded ? '' : sectionNav('contatti')}</section>`; }
function landing() {
  return `${home({ embedded: true })}${profile({ embedded: true })}${projectList({ embedded: true })}${approach({ embedded: true })}${contact({ embedded: true })}`;
}
function setPlace(root, key, { embedded = false } = {}) {
  selectedPlace = key;
  const p = places[key];
  const placeHeading = embedded ? 'h3' : 'h2';
  root.querySelectorAll('[data-place]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.place===key)));
  root.querySelector('#place-info').innerHTML = `<p class="eyebrow">${p.label}</p><${placeHeading}>${p.name}</${placeHeading}><p class="place-dates">${p.dates.replaceAll('\n','<br>')}</p><p>${p.text}</p>${chips(p.skills)}`;
  root.querySelectorAll('[data-map-place]').forEach(group => group.classList.toggle('is-selected',group.dataset.mapPlace===key));
}
function bindProfile(root, { embedded = false } = {}) {
  setPlace(root, selectedPlace, { embedded });
  root.querySelectorAll('[data-place]').forEach(button => button.addEventListener('click', () => setPlace(root, button.dataset.place, { embedded })));
}
function bindLanding(root = main) {
  bindProfile(root, { embedded: true });
  bindContact(root);
}
function bindPage(route) {
  if(route.page==='profilo'||route.page==='percorso'){
    bindProfile(main);
  }
  if(route.page==='contatti') bindContact(main);
}
function render() {
  const route=parseRoute(location.hash);
  const version=++renderVersion;
  pageController?.abort();
  pageCleanup?.();
  pageController=undefined;
  pageCleanup=undefined;
  document.body.dataset.page=route.page;
  const visiblePage=route.page==='percorso'?'profilo':route.page;
  const area=areas.find(a=>a.id===visiblePage);
  document.title=`${route.item?projects.find(p=>p.id===route.item).title:area?.title||'Sistemi, database e analisi'} — Edoardo Rana`;
  setIndexOpen(false);
  document.querySelectorAll('#site-index a').forEach(a=>{a.removeAttribute('aria-current');if(a.hash===(route.page==='mappa'?'#/':`#/${visiblePage}${route.item?`/${route.item}`:''}`))a.setAttribute('aria-current','page');});
  if(route.page==='progetti'&&['immobiliare-data','dashboard-generator'].includes(route.item)){
    const controller=new AbortController();pageController=controller;
    main.innerHTML='<section class="page"><p role="status">Caricamento del progetto…</p></section>';
    const module=route.item==='immobiliare-data'?import('./housing/page.mjs'):import('./explorer/page.mjs');
    module.then(exports=>{
      if(version!==renderVersion||controller.signal.aborted)return;
      const mount=exports.mountHousing||exports.mountExplorer;
      pageCleanup=mount(main,{signal:controller.signal,isCurrent:()=>version===renderVersion,navigationHTML:projectNav()});
    }).catch(()=>{
      if(version!==renderVersion||controller.signal.aborted)return;
      main.innerHTML=`<section class="page">${backLink('#/progetti','Torna ai progetti')}${terminalHeader({ path: `~/progetti/${route.item}`, title: 'Progetto non disponibile', summary: 'Ricarica la pagina per riprovare.' })}</section>`;
    });
  }else{
    const renderers={mappa:home,profilo:profile,approccio:approach,percorso:profile,progetti:()=>route.item?projectDetail(route.item):projectList(),contatti:contact,'not-found':()=>`<section class="page">${backLink()}${terminalHeader({ path: '~/404', title: 'Pagina non trovata', summary: 'Controlla l’indirizzo oppure torna alla Home.' })}</section>`};
    main.innerHTML=renderers[route.page]();
    bindPage(route);
  }
  if(route.page==='mappa'&&previousRoute.page!=='mappa')document.querySelector(`[data-node="${previousRoute.page==='percorso'?'profilo':previousRoute.page}"]`)?.focus({preventScroll:true});
  else main.focus({preventScroll:true});
  previousRoute=route;
}
function navigate() {
  render();
  window.scrollTo(0,0);
}
function setIndexOpen(open) {
  index.hidden=!open;
  indexToggle.setAttribute('aria-expanded',String(open));
  indexToggle.setAttribute('aria-label',open?'Chiudi indice del sito':'Apri indice del sito');
}
indexToggle.addEventListener('click',()=>setIndexOpen(index.hidden));
document.addEventListener('pointerdown',event=>{if(!index.hidden&&!index.contains(event.target)&&!indexToggle.contains(event.target))setIndexOpen(false);});
document.addEventListener('focusin',event=>{if(!index.hidden&&!index.contains(event.target)&&!indexToggle.contains(event.target))setIndexOpen(false);});
index.addEventListener('click',event=>{const link=event.target.closest('a');if(!link)return;setIndexOpen(false);if(link.hash===location.hash)main.focus({preventScroll:true});});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!index.hidden){setIndexOpen(false);indexToggle.focus();}});
document.querySelector('.skip').addEventListener('click',e=>{e.preventDefault();main.focus();});
window.addEventListener('hashchange',()=>{if(location.hash==='#main'){main.focus();return;}navigate();});
render();
