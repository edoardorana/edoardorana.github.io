import { areas, steps, projects } from './data.mjs';
import { terminalHeader } from './terminal-header.mjs';
import { resolveView } from './navigation.mjs';

const main = document.querySelector('#main');
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const hashtag = value => `#${String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '')}`;
const treeTags = tags => `<span class="tree-hashtags">${tags.map(tag => escapeHTML(hashtag(tag))).join(' ')}</span>`;
const treeNode = ({ href, label, tags = [] }) => `<li class="landing-tree-item"><a class="landing-tree-link" href="${href}"><span class="landing-tree-name">${escapeHTML(label)}</span>${treeTags(tags)}</a></li>`;
let renderVersion = 0;
let pageController;
let pageCleanup;
let mountedView = null;

function backLink(href = '#/', text = 'Torna alla Home') {
  return `<a class="back-link" href="${href}"><span aria-hidden="true">←</span> ${text}</a>`;
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
    <header class="section-heading compact-heading tree-section-heading">
      <h2 class="compact-title" id="profilo-title">PROFILO/</h2>
      <ul class="landing-tree" role="list" aria-label="Contenuti del Profilo">
        ${treeNode({ href: 'cv.html', label: 'cv', tags: ['esperienze', 'formazione', 'competenze', 'lingue'] })}
        ${treeNode({ href: 'luoghi.html', label: 'luoghi', tags: ['Milano', 'Tromsø', 'Zugo', 'Stoccarda'] })}
      </ul>
    </header>
  </section>`;
}
function approach() {
  const documents = ['capire', 'raccogliere', 'custodire', 'leggere', 'evolvere'];
  return `<section class="page approach-section landing-section" id="approccio" aria-labelledby="approccio-title"><header class="section-heading compact-heading tree-section-heading"><h2 class="compact-title" id="approccio-title">APPROCCIO/</h2>
  <ol class="landing-tree" role="list" aria-label="Le cinque fasi del metodo">${steps.map((step, index) => treeNode({ href: `approccio/${documents[index]}.html`, label: documents[index], tags: step.tags })).join('')}</ol></header>
  </section>`;
}
function projectList() {
  return `<section class="page projects-section landing-section" id="progetti" aria-labelledby="progetti-title"><header class="section-heading compact-heading tree-section-heading"><h2 class="compact-title" id="progetti-title">PROGETTI/</h2>
  <ul class="landing-tree" role="list" aria-label="Progetti">${projects.map(project => treeNode({ href: `#/progetti/${project.id}`, label: project.id, tags: project.tags })).join('')}</ul></header></section>`;
}
function contact() {
  return `<section class="page contact-page landing-section" id="contatti" aria-labelledby="contatti-title"><header class="section-heading compact-heading tree-section-heading"><h2 class="compact-title" id="contatti-title">COLLABORAZIONI/</h2>
  <ul class="landing-tree" role="list" aria-label="Collaborazioni">${treeNode({ href: 'contatti.html', label: 'contatti', tags: ['oggetto', 'messaggio', 'mailto'] })}</ul></header></section>`;
}
function landing() {
  return `${home()}${profile()}${projectList()}${approach()}${contact()}`;
}
function bindLanding(root = main) {
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
    root.querySelectorAll('.landing-tree-item').forEach(item => observer.observe(item));
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
        pageCleanup = mount(main, { signal: controller.signal, isCurrent: () => version === renderVersion });
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
});
render();
