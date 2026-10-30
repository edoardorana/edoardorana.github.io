import { contactHTML, bindContact } from './contact.mjs';
import { areas, steps, projects, places, mapPoint } from './data.mjs';
import { terminalHeader } from './terminal-header.mjs';
import { resolveView } from './navigation.mjs';

const main = document.querySelector('#main');
const index = document.querySelector('#site-index');
const indexToggle = document.querySelector('.index-toggle');
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const chips = tags => `<div class="chips">${tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}</div>`;
let selectedPlace = 'milano';
let renderVersion = 0;
let pageController;
let pageCleanup;
let mountedView = null;
let mountedSection = null;

function backLink(href = '#/', text = 'Torna alla Home') {
  return `<a class="back-link" href="${href}"><span aria-hidden="true">←</span> ${text}</a>`;
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
  return `<section class="home hero"${embedded ? ' id="home"' : ''} aria-labelledby="home-title">
    <p class="hero-kicker">Infrastrutture · dati · automazione</p>
    <h1 id="home-title">Edoardo Rana</h1>
    <p class="hero-lead">Lavoro tra sistemi Linux, database e analisi dei dati. Metto ordine nei problemi tecnici, documento le scelte e costruisco strumenti che aiutano a decidere.</p>
    <div class="hero-actions"><a class="button hero-primary" href="cv.html">Apri il CV <span aria-hidden="true">↗</span></a><a class="hero-link" href="#/progetti">Esplora i progetti <span aria-hidden="true">↓</span></a></div>
    <nav class="landing-index" aria-label="Sezioni della pagina">${areas.map((area, index) => `<a href="#/${area.id}"><span>0${index + 1}</span>${area.title}</a>`).join('')}</nav>
  </section>`;
}
function profile({ embedded = false } = {}) {
  const heading = embedded ? 'h2' : 'h1';
  return `<section class="page profile-section${embedded ? ' landing-section' : ''}"${embedded ? ' id="profilo" aria-labelledby="profilo-title"' : ''}>
    <header class="section-heading"><p class="section-number">01 / Profilo</p><${heading} id="profilo-title">Il percorso completo è nel CV.</${heading}><p>Esperienze, formazione, competenze e lingue sono raccolte in una pagina dedicata, leggibile online e pronta da stampare.</p><a class="cv-callout" href="cv.html"><span><strong>Curriculum vitae</strong><small>Esperienze · formazione · skills · lingue</small></span><span aria-hidden="true">Apri ↗</span></a></header>
    <div class="profile-map"><div class="profile-map-copy"><p class="section-label">Luoghi</p><h3>Quattro tappe, un percorso.</h3><p>Milano, Tromsø, Zugo e Stoccarda raccontano studi, lavoro da remoto e periodi personali. Seleziona una città per leggere il contesto.</p><div class="place-picker" aria-label="Seleziona un luogo">${Object.entries(places).map(([id,p])=>`<button data-place="${id}" aria-pressed="${id===selectedPlace}">${p.name}</button>`).join('')}</div><div id="place-info" aria-live="polite"></div></div><div class="geo-wrap">${europeMap()}<span class="map-attribution">I punti indicano città, non indirizzi precisi. Zugo si riferisce all’azienda con cui lavoro da remoto. Cartografia: Natural Earth.</span></div></div>
    ${embedded ? '' : sectionNav('profilo')}</section>`;
}
function approach({ embedded = false } = {}) {
  const documents = ['capire', 'raccogliere', 'custodire', 'leggere', 'evolvere'];
  const phaseHeading = embedded ? 'h3' : 'h2';
  const heading = embedded ? 'h2' : 'h1';
  return `<section class="page approach-section${embedded ? ' landing-section' : ''}"${embedded ? ' id="approccio" aria-labelledby="approccio-title"' : ''}><header class="section-heading"><p class="section-number">03 / Approccio</p><${heading} id="approccio-title">Dal problema a una soluzione verificabile.</${heading}><p>Cinque fasi concrete per capire il contesto, organizzare i dati e lasciare documentazione utile.</p></header>
  <div class="method" aria-label="Il percorso del dato">${steps.map((s,i) => `<article class="method-step" aria-labelledby="method-${i}"><span class="method-big" aria-hidden="true">0${i+1}</span><p class="eyebrow">FASE 0${i+1} / 05</p><${phaseHeading} id="method-${i}">${s.title}</${phaseHeading}><p class="method-short">${s.short}</p><p>${s.text}</p><div class="method-output"><span>DOCUMENTAZIONE</span><p>${s.result}</p></div>${chips(s.tags)}<a class="button method-document" href="/approccio/${documents[i]}.html">Apri la scheda operativa ↗</a></article>`).join('')}</div>
  ${embedded ? '' : sectionNav('approccio')}</section>`;
}
function projectList({ embedded = false } = {}) {
  const projectHeading = embedded ? 'h3' : 'h2';
  const heading = embedded ? 'h2' : 'h1';
  return `<section class="page projects-section${embedded ? ' landing-section' : ''}"${embedded ? ' id="progetti" aria-labelledby="progetti-title"' : ''}><header class="section-heading"><p class="section-number">02 / Progetti</p><${heading} id="progetti-title">Dati da esplorare, strumenti da provare.</${heading}><p>Due dashboard interattive e un progetto infrastrutturale in corso. Ogni scheda resta una pagina autonoma.</p></header>
  <div class="project-list">${projects.map((p,index) => `<a class="project-row" href="#/progetti/${p.id}"><span class="project-index" aria-hidden="true">0${index + 1}</span><div><p class="eyebrow">${p.kind}</p><${projectHeading}>${p.title}</${projectHeading}><p>${p.subtitle}</p>${chips(p.tags)}</div><span class="project-arrow" aria-hidden="true">↗</span></a>`).join('')}</div>${embedded ? '' : sectionNav('progetti')}</section>`;
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
function contact({ embedded = false } = {}) { const heading = embedded ? 'h2' : 'h1'; return `<section class="page contact-page${embedded ? ' landing-section' : ''}"${embedded ? ' id="contatti" aria-labelledby="contatti-title"' : ''}><header class="section-heading"><p class="section-number">04 / Collaborazioni</p><${heading} id="contatti-title">Parliamo del problema, prima degli strumenti.</${heading}><p>Raccontami il contesto, il vincolo o l’idea su cui vuoi lavorare.</p></header>${contactHTML({ headingLevel: embedded ? 2 : 1, titleId: embedded ? 'contact-form-title' : undefined, showReadme: !embedded })}${embedded ? '' : sectionNav('contatti')}</section>`; }
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
  root.querySelectorAll('.landing-section').forEach(section => section.setAttribute('tabindex', '-1'));
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
          entry.target.animate([{ opacity: .65, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 300, easing: 'ease-out' });
        }
        observer.unobserve(entry.target);
      });
    }, { threshold: .08 });
    root.querySelectorAll('.project-row, .method-step').forEach(item => observer.observe(item));
    pageCleanup = () => observer.disconnect();
  }
}
function bindPage(route) {
  if(route.page==='profilo'||route.page==='percorso'){
    bindProfile(main);
  }
  if(route.page==='contatti') bindContact(main);
}
function render({ behavior = 'auto' } = {}) {
  const view = resolveView(location.hash);
  const isLanding = view.kind === 'landing';
  const section = isLanding ? view.section : null;
  const sameLanding = isLanding && mountedView === 'landing';

  if (!sameLanding) {
    pageController?.abort();
    pageController = undefined;
    pageCleanup?.();
    pageCleanup = undefined;
    renderVersion++;
  }
  const version = renderVersion;

  let title = 'Sistemi, database e analisi';
  if (view.kind === 'project') {
    const project = projects.find(p => p.id === view.item);
    title = project ? project.title : title;
  } else if (isLanding && section && section !== 'home') {
    const area = areas.find(a => a.id === section);
    title = area ? area.title : title;
  } else if (view.kind === 'not-found') {
    title = 'Pagina non trovata';
  }
  document.title = `${title} — Edoardo Rana`;

  setIndexOpen(false);
  document.querySelectorAll('#site-index a').forEach(a => {
    a.removeAttribute('aria-current');
    let targetHash = '#/';
    if (view.kind === 'project') targetHash = `#/progetti/${view.item}`;
    else if (isLanding && section && section !== 'home') targetHash = `#/${section}`;
    if (a.hash === targetHash) a.setAttribute('aria-current', 'page');
  });

  if (isLanding) {
    document.body.dataset.page = 'landing';
    if (!sameLanding) {
      main.innerHTML = landing();
      bindLanding(main);
      mountedView = 'landing';
    }
    mountedSection = section;
    if (section && section !== 'home') {
      const target = document.getElementById(section);
      if (target) target.scrollIntoView({ behavior, block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior });
    }
    if (section && section !== 'home') {
      const target = document.getElementById(section);
      if (target) target.focus({ preventScroll: true });
    } else {
      main.focus({ preventScroll: true });
    }
  } else if (view.kind === 'project') {
    if (mountedView === 'landing') {
      mountedView = null;
      mountedSection = null;
    }
    document.body.dataset.page = 'progetto';
    if (['immobiliare-data', 'dashboard-generator'].includes(view.item)) {
      const controller = new AbortController();
      pageController = controller;
      main.innerHTML = '<section class="page"><p role="status">Caricamento del progetto…</p></section>';
      const module = view.item === 'immobiliare-data' ? import('./housing/page.mjs') : import('./explorer/page.mjs');
      module.then(exports => {
        if (version !== renderVersion || controller.signal.aborted) return;
        const mount = exports.mountHousing || exports.mountExplorer;
        pageCleanup = mount(main, { signal: controller.signal, isCurrent: () => version === renderVersion, navigationHTML: projectNav() });
      }).catch(() => {
        if (version !== renderVersion || controller.signal.aborted) return;
        main.innerHTML = `<section class="page">${backLink('#/progetti', 'Torna ai progetti')}${terminalHeader({ path: `~/progetti/${view.item}`, title: 'Progetto non disponibile', summary: 'Ricarica la pagina per riprovare.' })}</section>`;
      });
    } else {
      main.innerHTML = view.item ? projectDetail(view.item) : projectList();
      bindPage({ page: 'progetti', item: view.item });
    }
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  } else {
    if (mountedView === 'landing') {
      mountedView = null;
      mountedSection = null;
    }
    document.body.dataset.page = 'not-found';
    main.innerHTML = `<section class="page">${backLink()}${terminalHeader({ path: '~/404', title: 'Pagina non trovata', summary: 'Controlla l’indirizzo oppure torna alla Home.' })}</section>`;
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }

}
function navigate() {
  render();
}
function setIndexOpen(open) {
  index.hidden=!open;
  indexToggle.setAttribute('aria-expanded',String(open));
  indexToggle.setAttribute('aria-label',open?'Chiudi indice del sito':'Apri indice del sito');
}
indexToggle.addEventListener('click',()=>setIndexOpen(index.hidden));
indexToggle.addEventListener('keydown',event=>{
  if(event.key!=='Enter'&&event.key!==' ')return;
  event.preventDefault();
  setIndexOpen(index.hidden);
});
document.addEventListener('pointerdown',event=>{if(!index.hidden&&!index.contains(event.target)&&!indexToggle.contains(event.target))setIndexOpen(false);});
document.addEventListener('focusin',event=>{if(!index.hidden&&!index.contains(event.target)&&!indexToggle.contains(event.target))setIndexOpen(false);});
index.addEventListener('click',event=>{const link=event.target.closest('a');if(!link)return;setIndexOpen(false);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!index.hidden){setIndexOpen(false);indexToggle.focus();}});
document.querySelector('.skip').addEventListener('click',e=>{e.preventDefault();main.focus();});
window.addEventListener('hashchange',()=>{if(location.hash==='#main'){main.focus();return;}navigate();});
document.addEventListener('click',event=>{
  if(event.defaultPrevented)return;
  if(event.button!==0)return;
  if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  const link=event.target.closest('a');
  if(!link)return;
  const href=link.getAttribute('href');
  if(!href||!href.startsWith('#'))return;
  if(href.endsWith('.html'))return;
  const destination=resolveView(href);
  if(destination.kind==='landing' && mountedView==='landing' && href!==location.hash){
    event.preventDefault();
    history.pushState(null,'',href);
    render({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    return;
  }
  if(href!==location.hash)return;
  event.preventDefault();
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior=reduceMotion?'auto':'smooth';
  const view=resolveView(href);
  if(view.kind==='landing'){
    if(view.section&&view.section!=='home'){
      const target=document.getElementById(view.section);
      if(target){target.scrollIntoView({behavior,block:'start'});target.focus({preventScroll:true});}
      else window.scrollTo({top:0,behavior});
    }else{
      window.scrollTo({top:0,behavior});
      main.focus({preventScroll:true});
    }
  }else{
    window.scrollTo({top:0,behavior});
    main.focus({preventScroll:true});
  }
  setIndexOpen(false);
});
render();
