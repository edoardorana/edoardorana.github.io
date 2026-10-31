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
    <p class="hero-kicker"><span aria-hidden="true"></span> infrastrutture / dati / automazione</p>
    <h1 id="home-title">Sistemi e dati.</h1>
    <p class="hero-lead">La complessità non scompare.<br>Si mette in ordine.</p>
  </section>`;
}
function profile() {
  return `<section class="page profile-section landing-section" id="profilo" aria-labelledby="profilo-title">
    <header class="section-heading compact-heading"><h2 class="compact-title" id="profilo-title"><span>profilo</span> <span>CV</span> #esperienze #formazione #competenze #lingue</h2><a class="cv-callout" href="cv.html"><span aria-hidden="true">Apri ↗</span></a></header>
    <div class="profile-map"><div class="profile-map-copy"><p class="section-label">luoghi</p><h3>Quattro tappe, un percorso.</h3><p>Milano, Tromsø, Zugo e Stoccarda raccontano studi, lavoro da remoto e periodi personali. Seleziona una città per leggere il contesto.</p><div class="place-picker" aria-label="Seleziona un luogo">${Object.entries(places).map(([id,p])=>`<button data-place="${id}" aria-pressed="${id===selectedPlace}">${p.name}</button>`).join('')}</div><div id="place-info" aria-live="polite"></div></div><div class="geo-wrap">${europeMap()}<span class="map-attribution">I punti indicano città, non indirizzi precisi. Zugo si riferisce all’azienda con cui lavoro da remoto. Cartografia: Natural Earth.</span></div></div>
  </section>`;
}
function approach() {
  const documents = ['capire', 'raccogliere', 'custodire', 'leggere', 'evolvere'];
  return `<section class="page approach-section landing-section" id="approccio" aria-labelledby="approccio-title"><header class="section-heading compact-heading"><h2 class="compact-title" id="approccio-title">approccio</h2></header>
  <div class="method" aria-label="Le cinque fasi del metodo">${steps.map((s,i) => `<article class="method-step" aria-labelledby="method-${i}"><p class="eyebrow"></p><h3 id="method-${i}">${s.title}</h3><p class="method-short">${s.short}</p><a class="method-document" href="/approccio/${documents[i]}.html" aria-label="Apri la scheda ${s.title}">Apri ↗</a></article>`).join('')}</div>
  </section>`;
}
function projectList() {
  return `<section class="page projects-section landing-section" id="progetti" aria-labelledby="progetti-title"><header class="section-heading compact-heading"><h2 class="compact-title" id="progetti-title">progetti</h2></header>
  <div class="project-list">${projects.map((p,index) => `<a class="project-row" href="#/progetti/${p.id}"><div><p class="eyebrow">${p.kind}</p><h3>${p.title}</h3><p>${p.subtitle}</p>${chips(p.tags)}</div><span class="project-arrow" aria-hidden="true">↗</span></a>`).join('')}</div></section>`;
}
function europeMap() {
  const entries = Object.entries(places);
  return `<div class="europe-map" aria-label="Mappa interattiva delle tappe in Europa"><img src="europe.svg" alt="" class="europe-base"><svg viewBox="0 0 600 650" aria-hidden="true" class="europe-overlay">${entries.map(([id,p]) => {
    const [x,y] = mapPoint(p.coordinates); const [lx,ly] = p.mapLabel;
    return `<g data-map-place="${id}"><path d="M${x},${y} L${lx},${ly}"/><circle cx="${x}" cy="${y}" r="5"/></g>`;
  }).join('')}</svg><span class="europe-caption">QUATTRO TAPPE, UN PERCORSO</span>${entries.map(([id,p],i) => {
    const [x,y] = mapPoint(p.coordinates);
    return `<button class="map-point" data-place="${id}" aria-label="Seleziona ${p.name}" aria-controls="place-info" aria-pressed="${id===selectedPlace}" style="left:${x/6}%;top:${y/6.5}%"></button><button class="map-label" data-place="${id}" aria-controls="place-info" aria-pressed="${id===selectedPlace}" style="left:${p.mapLabel[0]/6}%;top:${p.mapLabel[1]/6.5}%">${p.name}</button>`;
  }).join('')}</div>`;
}
function contact() {
  return `<section class="page contact-page landing-section" id="contatti" aria-labelledby="contatti-title"><header class="section-heading compact-heading"><h2 class="compact-title" id="contatti-title">collaborazioni</h2><p>Parliamo del problema, prima degli strumenti.</p></header>${contactHTML({ headingLevel: 2, titleId: 'contact-form-title', showReadme: false })}</section>`;
}
function treeView() {
  return `<section class="page tree-section" id="tree" aria-labelledby="tree-title">
    <div class="tree-root">edo.dot/</div>
    <ul class="tree">
      <li>
        <a href="#/profilo"><span class="tree-folder">├── profilo/</span></a>
        <ul class="tree">
          <li><a href="cv.html">├── cv.html</a></li>
          <li><a href="#/profilo">└── luoghi</a></li>
        </ul>
      </li>
      <li>
        <a href="#/progetti"><span class="tree-folder">├── progetti/</span></a>
        <ul class="tree">
          <li><a href="#/progetti/immobiliare-data">├── scraper immobiliare.it</a></li>
          <li><a href="#/progetti/dashboard-generator">└── dashboard generator</a></li>
        </ul>
      </li>
      <li><a href="#/approccio"><span class="tree-folder">├── approccio/</span></a></li>
      <li><a href="#/contatti"><span class="tree-folder">└── collaborazioni/</span></a></li>
    </ul>
  </section>`;
}
function landing() {
  return `${home()}${treeView()}${profile()}${projectList()}${approach()}${contact()}`;
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
