import { person, areas, steps, projects, places, parseRoute, mailto, mapPoint } from './data.mjs';
import { terminalHeader } from './terminal-header.mjs';

const main = document.querySelector('#main');
const index = document.querySelector('#site-index');
const indexToggle = document.querySelector('.index-toggle');
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const chips = tags => `<div class="chips">${tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}</div>`;
const arrow = '<span aria-hidden="true">↗</span>';
let previousRoute = { page: 'mappa' };
let selectedStep = 0;
let selectedPlace = 'milano';
let contactDraft = '';
let renderVersion = 0;
let pageController;
let pageCleanup;

function backLink(href = '#/', text = 'Torna alla Home') {
  return `<a class="back-link" href="${href}"><span aria-hidden="true">←</span> ${text}</a>`;
}
function pageHeader(id, text) {
  const area = areas.find(area => area.id === id);
  return terminalHeader({ path: `~/${id}`, title: area.title, summary: text });
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
function home() {
  return `<section class="home">${terminalHeader({ path: '~/home', title: 'Sistemi Linux, database e analisi.', summary: 'Lavoro su infrastrutture Linux e database. Analizzo problemi tecnici, dati e processi tenendo conto delle persone che usano i sistemi.' })}
  <div class="atlas" aria-label="Le quattro aree del portfolio">
  ${areas.map(area => `<a class="area area-${area.id}" href="#/${area.id}" data-node="${area.id}"><strong class="area-title">${area.title}</strong><span class="area-details"><span class="area-terminal"><span class="area-command-line" aria-hidden="true"><span class="area-path">~/${area.id}</span><span class="area-prompt-static">&gt;</span> <span class="area-command-name">cat readme.md</span></span><span class="area-command-copy">${area.preview}</span><span class="area-command-line area-command-wait" aria-hidden="true"><span class="area-path">~/${area.id}</span><span class="area-prompt-cursor">&gt;</span></span></span></span></a>`).join('')}</div></section>`;
}
function profile() {
  return `<section class="page">${terminalHeader({ path: '~/profilo', title: 'Profilo', summary: 'Lavoro su infrastrutture Linux, database e automazione, collegando i problemi tecnici al contesto in cui vengono usati i sistemi.', sections: [{ label: 'attività/', text: 'Esamino log e anomalie, condivido le evidenze con gli altri referenti tecnici e documento gli interventi.' }, { label: 'percorso/', text: 'La formazione in statistica e le esperienze in Business Intelligence, amministrazione, database e sistemi mi aiutano a verificare origine, significato e vincoli dei dati.' }], action: { href: 'cv.html', command: 'xdg-open cv.html', label: 'Apri il CV sintetico' } })}
  ${journeyContent()}
  <section class="skills-terminal" aria-labelledby="skills-title"><h2 class="visually-hidden" id="skills-title">Competenze, lingue e interessi</h2><div class="terminal-screen"><p class="terminal-command"><span>edo@debian</span>:<b>~/profilo</b>$ skills --overview</p><div class="skills-grid"><article><p class="terminal-path">consulenza/</p><h3>Supporto e metodo</h3><p>Requisiti · Diagnosi delle cause · Documentazione · Processi</p></article><article><p class="terminal-path">infrastruttura/</p><h3>Sistemi Linux</h3><p>Debian · Proxmox VE / PBS · checkmk · Storage S3 · Backup</p></article><article><p class="terminal-path">database_automazione/</p><h3>Dati e automazione</h3><p>Oracle · PostgreSQL · MariaDB / MySQL · SQL · Bash · Python</p></article><article><p class="terminal-path">analisi_bi/</p><h3>Business Intelligence</h3><p>KPI · Power BI · Qlik Sense · Tableau · R · KNIME · Orange</p></article></div><div class="terminal-extra"><p class="terminal-command"><span>edo@debian</span>:<b>~/profilo</b>$ languages --list</p><p>Italiano madrelingua · Inglese C1 · Spagnolo B2</p><p class="terminal-command"><span>edo@debian</span>:<b>~/profilo</b>$ interests --list</p><p>Judo · Ju jitsu · Arti marziali · Skateboard · Moto · Auto</p></div><p class="terminal-command terminal-command-final" aria-hidden="true"><span>edo@debian</span>:<b>~/profilo</b>$ <i></i></p></div></section>
  ${sectionNav('profilo')}</section>`;
}
function approach() {
  return `<section class="page">${pageHeader('approccio','Parto dal problema e dai vincoli prima degli strumenti. Gli esempi qui sotto mostrano un possibile percorso, non incarichi già consegnati.')}
  <div class="method"><div class="method-steps" role="tablist" aria-label="Il percorso del dato">${steps.map((s,i) => `<button role="tab" id="method-${i}" aria-controls="method-panel" aria-selected="${i === selectedStep}" tabindex="${i === selectedStep ? 0 : -1}" data-step="${i}"><span>0${i+1}</span>${s.title}</button>`).join('')}</div><article id="method-panel" role="tabpanel" aria-labelledby="method-${selectedStep}"></article></div>
  <div class="principles"><article><span>01</span><h3>Ambito definito</h3><p>Un intervento circoscritto permette di verificare presto se la soluzione risponde al problema.</p></article><article><span>02</span><h3>Strumenti proporzionati</h3><p>Uno script può bastare; in altri casi servono un database o una dashboard. La scelta dipende dal contesto.</p></article><article><span>03</span><h3>Continuità operativa</h3><p>Controlli, documentazione e trasferimento delle informazioni rendono il lavoro gestibile anche dopo il rilascio.</p></article></div>${sectionNav('approccio')}</section>`;
}
function projectList() {
  return `<section class="page">${pageHeader('progetti','Esplora alcuni dei miei progetti.')}
  <div class="project-list">${projects.map(p => `<a class="project-row" href="#/progetti/${p.id}"><div><p class="eyebrow">${p.kind}</p><h2>${p.title}</h2><p>${p.subtitle}</p>${chips(p.tags)}</div><span class="project-arrow" aria-hidden="true">↗</span></a>`).join('')}</div>${sectionNav('progetti')}</section>`;
}
function projectDetail(id) {
  const p = projects.find(p => p.id === id);
  return `<article class="page project-detail">${backLink('#/progetti','Tutti i progetti')}${terminalHeader({ path: `~/progetti/${p.id}`, title: p.title, summary: p.subtitle })}${chips(p.tags)}<div class="project-story"><section><h2>Il progetto</h2><p>${p.context}</p></section><section><h2>Lavoro in corso</h2><p>${p.contribution}</p></section><section><h2>Sviluppi futuri</h2><p>${p.output}</p></section></div>${projectNav()}</article>`;
}
function europeMap() {
  const entries = Object.entries(places);
  return `<div class="europe-map" aria-label="Mappa interattiva delle tappe in Europa"><img src="europe.svg" alt="" class="europe-base"><svg viewBox="0 0 600 650" aria-hidden="true" class="europe-overlay">${entries.map(([id,p]) => {
    const [x,y] = mapPoint(p.coordinates); const [lx,ly] = p.mapLabel;
    return `<g data-map-place="${id}"><path d="M${x},${y} L${lx},${ly}"/><circle cx="${x}" cy="${y}" r="5"/></g>`;
  }).join('')}</svg><span class="europe-caption">QUATTRO TAPPE, UN PERCORSO</span>${entries.map(([id,p],i) => {
    const [x,y] = mapPoint(p.coordinates);
    return `<button class="map-point" data-place="${id}" aria-label="Seleziona ${p.name}" aria-controls="place-info" aria-pressed="${id===selectedPlace}" style="left:${x/6}%;top:${y/6.5}%"></button><button class="map-label" data-place="${id}" aria-controls="place-info" aria-pressed="${id===selectedPlace}" style="left:${p.mapLabel[0]/6}%;top:${p.mapLabel[1]/6.5}%"><span>0${i+1}</span> ${p.name}${id==='stoccarda'?'<small>SOGGIORNO</small>':''}${id==='svizzera'?'<small>DA REMOTO</small>':''}</button>`;
  }).join('')}</div>`;
}
function journeyContent() {
  return `<section class="profile-journey" aria-labelledby="journey-title"><header><p class="eyebrow">LUOGHI E CRONOLOGIA</p><h2 id="journey-title">Formazione ed esperienze</h2><p>Quattro tappe: Milano, Tromsø, Zugo e Stoccarda. Gli studi in Norvegia, il lavoro da remoto con un’azienda svizzera e il soggiorno in Germania sono esperienze distinte.</p></header>
  <div class="journey-layout"><div><div class="place-picker" aria-label="Seleziona un luogo">${Object.entries(places).map(([id,p])=>`<button data-place="${id}" aria-pressed="${id===selectedPlace}">${p.name}</button>`).join('')}</div><div id="place-info" aria-live="polite"></div></div><div class="geo-wrap">${europeMap()}<span class="map-attribution">I punti indicano città, non indirizzi precisi. Zugo si riferisce all’azienda con cui lavoro da remoto, non a una mia sede. Cartografia: Natural Earth.</span></div></div>
  <div class="timeline"><h2>Cronologia</h2><ol><li><span>DAL 2025</span><div><h3>Linux Administrator · Broway SA</h3><p>Maggio 2025 – oggi. Infrastrutture Proxmox VE e Backup Server, monitoraggio con checkmk, analisi dei log, script SQL e shell. Attività su Debian, MariaDB, storage S3-compatibile, documentazione tecnica e sicurezza operativa.</p></div></li><li><span>2024 — 2025</span><div><h3>Database Administrator · Broway SA</h3><p>Ottobre 2024 – maggio 2025. Oracle e PostgreSQL: monitoraggio, diagnosi di errori SQL e batch, backup e ripristino, gestione degli schemi e supporto ai rilasci.</p></div></li><li><span>2024 — 2026</span><div><h3>Collaboratore operativo · Hubita APS</h3><p>Gennaio 2024 – gennaio 2026. Coordinamento di attività per progetti sociali e culturali, eventi e amministrazione di Google Workspace.</p></div></li><li><span>2023</span><div><h3>Business Unit Intern · SB Italia</h3><p>Gennaio – novembre 2023. Ho analizzato dataset aziendali e lavorato su metodi di classificazione. Ho inoltre creato report e dashboard con Qlik, Power BI e Tableau.</p></div></li><li><span>2021 — 2022</span><div><h3>Erasmus · UiT The Arctic University of Norway</h3><p>Agosto 2021 – agosto 2022. Un anno di studio a Tromsø, in Norvegia.</p></div></li><li><span>DAL 2021</span><div><h3>Magistrale in Data Science · Milano-Bicocca</h3><p>In corso. Statistica avanzata, machine learning, modelli predittivi e big data.</p></div></li><li><span>2017 — 2021</span><div><h3>Laurea in Statistica e Gestione delle Informazioni</h3><p>Milano-Bicocca. Statistica, sistemi informativi e programmazione; tesi sul web scraping di annunci immobiliari.</p></div></li><li><span>2015 — 2016</span><div><h3>Prime esperienze in amministrazione</h3><p>Stage in contabilità e supporto alla consulenza presso LTA Advisory (2016). Stage in contabilità presso TaxiBlu (2015), con Zucchetti e manutenzione di database.</p></div></li><li><span>2012 — 2017</span><div><h3>Diploma in Amministrazione, Finanza e Marketing</h3><p>Istituto San Vincenzo / Regina Mundi. Materie economico-aziendali, contabilità e marketing.</p></div></li></ol></div></section>`;
}
function contact() {
  return `<section class="page contact-page">${pageHeader('contatti','Per informazioni sul mio lavoro o proposte di collaborazione, puoi scrivermi via email.')}
  <div class="contact-layout"><div><a class="email-link" href="mailto:${person.email}">${person.email} ${arrow}</a><p><a class="text-link" href="${person.github}" target="_blank" rel="noopener noreferrer">Profilo GitHub ${arrow}</a></p></div><form id="contact-form"><label for="message">Messaggio (facoltativo)</label><textarea id="message" rows="5" placeholder="Descrivi in breve il contesto o la domanda…">${escapeHTML(contactDraft)}</textarea><button class="button" type="submit">Apri email ${arrow}</button><p class="form-note">Si apre il tuo programma di posta. Nulla viene inviato dal sito.</p><button class="copy-email" type="button">Copia indirizzo email</button><p id="contact-status" role="status"></p></form></div>${sectionNav('contatti')}</section>`;
}
function setStep(i, focus = false) {
  selectedStep = i;
  const s = steps[i];
  const panel = document.querySelector('#method-panel');
  document.querySelectorAll('[data-step]').forEach((b,n)=>{b.setAttribute('aria-selected',String(i===n));b.tabIndex=i===n?0:-1;if(focus&&i===n)b.focus();});
  panel.setAttribute('aria-labelledby',`method-${i}`);
  const previous = i > 0 ? `<button class="method-arrow method-arrow-prev" type="button" data-method-target="${i-1}" aria-label="Fase precedente: ${steps[i-1].title}"><span aria-hidden="true">‹</span></button>` : '';
  const next = i < steps.length - 1 ? `<button class="method-arrow method-arrow-next" type="button" data-method-target="${i+1}" aria-label="Fase successiva: ${steps[i+1].title}"><span aria-hidden="true">›</span></button>` : '';
  panel.innerHTML = `${previous}${next}<span class="method-big" aria-hidden="true">0${i+1}</span><p class="eyebrow">FASE 0${i+1} / 05</p><h2>${s.short}</h2><p>${s.text}</p><div class="method-output"><span>POSSIBILE OUTPUT</span><p>${s.result}</p></div>${chips(s.tags)}`;
}
function setPlace(key) {
  selectedPlace = key;
  const p = places[key];
  document.querySelectorAll('[data-place]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.place===key)));
  document.querySelector('#place-info').innerHTML = `<p class="eyebrow">${p.label}</p><h2>${p.name}</h2><p class="place-dates">${p.dates.replaceAll('\n','<br>')}</p><p>${p.text}</p>${chips(p.skills)}`;
  document.querySelectorAll('[data-map-place]').forEach(group => group.classList.toggle('is-selected',group.dataset.mapPlace===key));
}
function bindPage(route) {
  if(route.page==='approccio'){
    setStep(selectedStep);
    document.querySelectorAll('[data-step]').forEach((b,i)=>{b.addEventListener('click',()=>setStep(i));b.addEventListener('keydown',e=>{let next=i;if(['ArrowRight','ArrowDown'].includes(e.key))next=(i+1)%steps.length;else if(['ArrowLeft','ArrowUp'].includes(e.key))next=(i+steps.length-1)%steps.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=steps.length-1;else return;e.preventDefault();setStep(next,true);});});
    document.querySelector('.method').addEventListener('click',e=>{const control=e.target.closest('[data-method-target]');if(control)setStep(Number(control.dataset.methodTarget),true);});
  }
  if(route.page==='profilo'||route.page==='percorso'){
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
index.addEventListener('click',event=>{const link=event.target.closest('a');if(!link)return;setIndexOpen(false);if(link.hash===location.hash)main.focus({preventScroll:true});});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!index.hidden){setIndexOpen(false);indexToggle.focus();}});
document.querySelector('.skip').addEventListener('click',e=>{e.preventDefault();main.focus();});
window.addEventListener('hashchange',()=>{if(location.hash==='#main'){main.focus();return;}navigate();});
render();
