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

function backLink(href = '#/', text = 'Torna alla Home') {
  return `<a class="back-link" href="${href}"><span aria-hidden="true">←</span> ${text}</a>`;
}
function projectNav() {
  return '<nav class="section-nav project-nav" aria-label="Navigazione del progetto"><a href="#/progetti"><span aria-hidden="true">←</span><code>~/progetti</code></a><a href="#/" aria-label="Home"><code>~/home</code></a></nav>';
}
function home() {
  return `<section class="home hero" id="home" aria-labelledby="home-title">
    <div class="hero-identity"><h1 id="home-title" aria-label="edo dot, Edoardo Rana"><span>edo</span><i aria-hidden="true">.</i><span>dot</span></h1><p>Edoardo Rana · sistemi e dati</p></div>
    <p class="hero-kicker"><span aria-hidden="true"></span> infrastrutture / dati / automazione</p>
    <p class="hero-lead">Metto ordine nei problemi tecnici, collego sistemi e dati e lascio strumenti che si possono capire, verificare e continuare a usare.</p>
    <div class="hero-actions"><a class="button hero-primary" href="cv.html">Apri il CV <span aria-hidden="true">↗</span></a><a class="hero-link" href="#/progetti">Esplora i progetti <span aria-hidden="true">↓</span></a></div>
    <nav class="landing-index" aria-label="Sezioni della pagina">${areas.map((area, index) => `<a href="#/${area.id}"><span>.0${index + 1}</span>${area.title}</a>`).join('')}</nav>
  </section>`;
}
function profile() {
  return `<section class="page profile-section landing-section" id="profilo" aria-labelledby="profilo-title">
    <header class="section-heading"><p class="section-number">.01 Profilo</p><h2 id="profilo-title">Il percorso completo è nel CV.</h2><p>Esperienze, formazione, competenze e lingue sono raccolte in una pagina dedicata, leggibile online e pronta da stampare.</p><a class="cv-callout" href="cv.html"><span><strong>Curriculum vitae</strong><small>Esperienze · formazione · skills · lingue</small></span><span aria-hidden="true">Apri ↗</span></a></header>
    <div class="profile-map"><div class="profile-map-copy"><p class="section-label">Luoghi</p><h3>Quattro tappe, un percorso.</h3><p>Milano, Tromsø, Zugo e Stoccarda raccontano studi, lavoro da remoto e periodi personali. Seleziona una città per leggere il contesto.</p><div class="place-picker" aria-label="Seleziona un luogo">${Object.entries(places).map(([id,p])=>`<button data-place="${id}" aria-pressed="${id===selectedPlace}">${p.name}</button>`).join('')}</div><div id="place-info" aria-live="polite"></div></div><div class="geo-wrap">${europeMap()}<span class="map-attribution">I punti indicano città, non indirizzi precisi. Zugo si riferisce all’azienda con cui lavoro da remoto. Cartografia: Natural Earth.</span></div></div>
  </section>`;
}
function approach() {
  const documents = ['capire', 'raccogliere', 'custodire', 'leggere', 'evolvere'];
  return `<section class="page approach-section landing-section" id="approccio" aria-labelledby="approccio-title"><header class="section-heading"><p class="section-number">.03 Approccio</p><h2 id="approccio-title">Dal problema a una soluzione verificabile.</h2><p>Cinque fasi concrete per capire il contesto, organizzare i dati e lasciare documentazione utile.</p></header>
  <div class="method" aria-label="Il percorso del dato">${steps.map((s,i) => `<article class="method-step" aria-labelledby="method-${i}"><span class="method-big" aria-hidden="true">0${i+1}</span><p class="eyebrow">FASE 0${i+1} / 05</p><h3 id="method-${i}">${s.title}</h3><p class="method-short">${s.short}</p><p>${s.text}</p><div class="method-output"><span>DOCUMENTAZIONE</span><p>${s.result}</p></div>${chips(s.tags)}<a class="button method-document" href="/approccio/${documents[i]}.html">Apri la scheda operativa ↗</a></article>`).join('')}</div>
  </section>`;
}
function projectList() {
  return `<section class="page projects-section landing-section" id="progetti" aria-labelledby="progetti-title"><header class="section-heading"><p class="section-number">.02 Progetti</p><h2 id="progetti-title">Dati da esplorare, strumenti da provare.</h2><p>Due dashboard interattive e un progetto infrastrutturale in corso. Ogni scheda resta una pagina autonoma.</p></header>
  <div class="project-list">${projects.map((p,index) => `<a class="project-row" href="#/progetti/${p.id}"><span class="project-index" aria-hidden="true">.0${index + 1}</span><div><p class="eyebrow">${p.kind}</p><h3>${p.title}</h3><p>${p.subtitle}</p>${chips(p.tags)}</div><span class="project-arrow" aria-hidden="true">↗</span></a>`).join('')}</div></section>`;
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
function contact() {
  return `<section class="page contact-page landing-section" id="contatti" aria-labelledby="contatti-title"><header class="section-heading"><p class="section-number">.04 Collaborazioni</p><h2 id="contatti-title">Parliamo del problema, prima degli strumenti.</h2><p>Raccontami il contesto, il vincolo o l’idea su cui vuoi lavorare.</p></header>${contactHTML({ headingLevel: 2, titleId: 'contact-form-title', showReadme: false })}</section>`;
}
function landing() {
  return `${home()}${profile()}${projectList()}${approach()}${contact()}`;
}
function setPlace(root, key) {
  selectedPlace = key;
  const p = places[key];
  root.querySelectorAll('[data-place]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.place===key)));
  root.querySelector('#place-info').innerHTML = `<p class="eyebrow">${p.label}</p><h3>${p.name}</h3><p class="place-dates">${p.dates.replaceAll('\n','<br>')}</p><p>${p.text}</p>${chips(p.skills)}`;
  root.querySelectorAll('[data-map-place]').forEach(group => group.classList.toggle('is-selected',group.dataset.mapPlace===key));
}
function bindProfile(root) {
  setPlace(root, selectedPlace);
  root.querySelectorAll('[data-place]').forEach(button => button.addEventListener('click', () => setPlace(root, button.dataset.place)));
}
function bindLanding(root = main) {
  bindProfile(root);
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
  document.title = isLanding && section === 'home'
    ? 'edo.dot — Sistemi, database e analisi'
    : `${title} — edo.dot · Edoardo Rana`;

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
      main.innerHTML = projectDetail(view.item);
    }
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  } else {
    if (mountedView === 'landing') {
      mountedView = null;
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
