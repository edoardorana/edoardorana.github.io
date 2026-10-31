import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { areas, projects, parseRoute, mailto, mapPoint, places } from '../proposal/data.mjs';
import { resolveAsset } from '../scripts/dev.mjs';
import { terminalHeader } from '../proposal/terminal-header.mjs';
import { contactHTML } from '../proposal/contact.mjs';

test('all areas and project deep links resolve; missing content gets a not-found route', () => {
  assert.deepEqual(parseRoute(''), { page: 'mappa' });
  assert.deepEqual(parseRoute('#/'), { page: 'mappa' });
  for (const area of areas) assert.deepEqual(parseRoute('#/' + area.id), { page: area.id });
  assert.equal(areas.length, 4);
  assert.deepEqual(areas.map(area => area.id), ['profilo', 'progetti', 'approccio', 'contatti']);
  assert.deepEqual(parseRoute('#/percorso'), { page: 'percorso' });
  assert.deepEqual(parseRoute('#/laboratorio'), { page: 'progetti' });
  assert.deepEqual(parseRoute('#/home'), { page: 'mappa' });
  assert.deepEqual(parseRoute('#/progetti/market-data'), { page: 'progetti', item: 'immobiliare-data' });
  assert.deepEqual(parseRoute('#/progetti/csv-explorer'), { page: 'progetti', item: 'dashboard-generator' });
  assert.deepEqual(parseRoute('#/progetti/business-intelligence'), { page: 'profilo' });
  for (const project of projects) assert.deepEqual(parseRoute('#/progetti/' + project.id), { page: 'progetti', item: project.id });
  for (const invalid of ['#/profilo/extra', '#/laboratorio/extra', '#/progetti/missing', '#/missing', '#/progetti/market-data/extra', '#/%3Cscript%3E']) assert.deepEqual(parseRoute(invalid), { page: 'not-found' });
});
test('email content remains encoded, including special characters and new lines', () => {
  const url = new URL(mailto('Dati & AI?', 'Ciao\nParliamo di A+B e costi 10%?'));
  assert.equal(url.protocol, 'mailto:');
  assert.equal(url.searchParams.get('subject'), 'Dati & AI?');
  assert.equal(url.searchParams.get('body'), 'Ciao\nParliamo di A+B e costi 10%?');
});
test('Europe markers stay inside the map and distinguish stays from remote work', () => {
  assert.deepEqual(Object.keys(places), ['milano','norvegia','svizzera','stoccarda']);
  for (const place of Object.values(places)) {
    const [x,y] = mapPoint(place.coordinates);
    assert.ok(x > 0 && x < 600 && y > 0 && y < 650);
  }
  assert.ok(mapPoint(places.stoccarda.coordinates)[1] < mapPoint(places.milano.coordinates)[1]);
  assert.equal(places.svizzera.locationType, 'remote');
  assert.equal(places.norvegia.locationType, 'city');
  assert.match(places.norvegia.text, /Tromsø.*Norvegia/);
  assert.match(places.svizzera.text, /Zugo.*da remoto/);
  assert.equal(places.stoccarda.locationType, 'stay');
  assert.match(places.stoccarda.dates, /prevista.*31 dicembre 2026/);
});
test('local preview limits assets to public files and rejects path escape attempts', () => {
  assert.match(resolveAsset('/').file, /index\.html$/);
  assert.match(resolveAsset('/data.mjs').type, /javascript/);
  assert.match(resolveAsset('/charts/vendor/PLOTLY-LICENSE.txt').type, /text\/plain/);
  for (const path of ['/../README.md','/%2e%2e/private.html','/.env','/file.txt','/%00.html','/..%5csecret.html','/%zz','/.git/config','/folder/.secret.html']) assert.equal(resolveAsset(path), null, path);
});
test('entry and CV use local assets and contain no duplicate HTML ids', async () => {
  for (const name of ['index.html', 'cv.html', 'luoghi.html', 'contatti.html', ...['capire','raccogliere','custodire','leggere','evolvere'].map(n=>'approccio/'+n+'.html')]) {
    const html = await readFile(new URL('../proposal/' + name, import.meta.url), 'utf8');
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length);
    for (const [, asset] of html.matchAll(/(?:src|href)="([^"#:]+\.(?:css|js|mjs|svg))(?:\?[^\"]*)?"/g)) await readFile(new URL(asset, new URL('../proposal/' + name, import.meta.url)));
  }
  const cv = await readFile(new URL('../proposal/cv.html', import.meta.url), 'utf8');
  for (const section of ['profilo', 'esperienze', 'formazione', 'competenze']) assert.match(cv, new RegExp(`<section id="${section}"[^>]*><h2>${section}/<\\/h2>`));
  assert.match(cv, /class="cv-save"[^>]*>Salva PDF<\/button>/);
  assert.doesNotMatch(cv, /Stampa \/ salva PDF/);
});
test('terminal headings keep the title semantic and the readme always visible', () => {
  const html = terminalHeader({ path: '~/PROGETTI/demo', title: 'Titolo <demo>', summary: 'Sintesi & dettagli', sections: [{ label: 'voce/', text: 'Contenuto ordinato' }], action: { href: 'cv.html', command: 'xdg-open cv.html', label: 'Apri il CV' } });
  assert.match(html, /<h1 class="visually-hidden">Titolo &lt;demo&gt;<\/h1>/);
  assert.doesNotMatch(html, /edo@debian/);
  assert.match(html, /~\/PROGETTI\/demo/);
  assert.match(html, /cat readme\.md/);
  assert.doesNotMatch(html, /\shidden(?:\s|>)|aria-expanded/);
  assert.match(html, /Sintesi &amp; dettagli/);
  assert.match(html, /voce\//);
  assert.match(html, /xdg-open cv\.html/);
  assert.match(html, /href="cv\.html"/);
});
test('terminal headings support safe section titles without changing the default level', () => {
  const defaults = terminalHeader({ path: '~/profilo', title: 'Profilo', summary: 'Sintesi' });
  const section = terminalHeader({ path: '~/profilo', title: 'Profilo <dati>', summary: 'Sintesi', headingLevel: 2, titleId: 'profilo" onclick="alert(1)' });
  const unsupported = terminalHeader({ path: '~/profilo', title: 'Profilo', summary: 'Sintesi', headingLevel: 3 });
  assert.match(defaults, /<h1 class="visually-hidden">Profilo<\/h1>/);
  assert.match(section, /<h2 class="visually-hidden" id="profilo&quot; onclick=&quot;alert\(1\)">Profilo &lt;dati&gt;<\/h2>/);
  assert.doesNotMatch(section, /<h1|onclick="alert/);
  assert.match(unsupported, /<h1 class="visually-hidden">Profilo<\/h1>/);
  assert.doesNotMatch(unsupported, /<h3/);
});
test('contact headings support safe section titles and keep the open composer', () => {
  const defaults = contactHTML();
  const section = contactHTML({ headingLevel: 2, titleId: 'COLLABORAZIONI"><script>' });
  const landing = contactHTML({ headingLevel: 2, titleId: 'contact-form-title', showReadme: false });
  assert.match(defaults, /<h1 class="visually-hidden">Componi una email<\/h1>/);
  assert.match(section, /<h2 class="visually-hidden" id="COLLABORAZIONI&quot;&gt;&lt;script&gt;">Componi una email<\/h2>/);
  for (const html of [defaults, section]) {
    assert.match(html, /mail --new/);
    assert.match(html, /<form id="contact-form">/);
    assert.match(html, /id="subject"/);
    assert.match(html, /id="message"/);
    assert.doesNotMatch(html, /<form id="contact-form" hidden/);
  }
  assert.doesNotMatch(landing, /cat readme\.md/);
  assert.match(landing, /class="contact-links"/);
  assert.match(landing, /mail --new/);
});
test('landing copy presents one narrative and keeps terminal language for actions', async () => {
  const source = await readFile(new URL('../proposal/script.js', import.meta.url), 'utf8');
  const entry = await readFile(new URL('../proposal/index.html', import.meta.url), 'utf8');
  assert.match(entry, /edo<span>\.<\/span>dot/);
  assert.doesNotMatch(entry, /brand-name|netbox-ipam/);
  assert.match(source, /La complessità non scompare/);
  assert.match(source, /<h2 class="compact-title" id="profilo-title">PROFILO\/<\/h2>/);
  assert.match(source, /href: 'luoghi\.html', label: 'luoghi'/);
  assert.match(source, /href: 'contatti\.html', label: 'contatti'/);
  for (const label of ['PROFILO/', 'PROGETTI/', 'APPROCCIO/', 'COLLABORAZIONI/']) assert.match(source, new RegExp(label.replace('/', '\\/')));
  assert.match(source, /class="landing-tree-name"/);
  assert.match(source, /label: project\.id/);
  assert.match(source, /label: documents\[index\]/);
  assert.doesNotMatch(source, /├──|└──|project-row|method-step/);
  assert.doesNotMatch(source, /profile-map|europeMap|bindProfile/);
  assert.doesNotMatch(source, /Esplora i PROGETTI|Il percorso completo è nel CV|production-databases/);
  assert.doesNotMatch(source, /journeyContent|renderServices|sectionNav/);
  assert.doesNotMatch(source, /contactHTML|bindContact|site-index|index-toggle/);
  const contact = await readFile(new URL('../proposal/contact.mjs', import.meta.url), 'utf8');
  const contactPage = await readFile(new URL('../proposal/contatti.mjs', import.meta.url), 'utf8');
  assert.match(contact, /mail --new/);
  assert.match(contact, /~\/collaborazioni\/contatti/);
  assert.doesNotMatch(contact, /<b>~\/contatti<\/b>/);
  assert.match(contactPage, /contactHTML/);
  assert.match(contactPage, /bindContact/);
  assert.doesNotMatch(contact, /mail-start|copy-email|wait-cursor|<form id="contact-form" hidden/);
});
test('Approach documents are direct CV-style pages without terminal headers', async () => {
  for (const name of ['capire', 'raccogliere', 'custodire', 'leggere', 'evolvere']) {
    const html = await readFile(new URL(`../proposal/approccio/${name}.html`, import.meta.url), 'utf8');
    assert.doesNotMatch(html, /cat readme\.md/);
    assert.match(html, /<main>/);
    assert.match(html, /class="document-brand"/);
    assert.doesNotMatch(html, /Torna alla Home/);
    assert.match(html, /class="document-save"[^>]*>Salva PDF<\/button>/);
    assert.doesNotMatch(html, /Stampa \/ salva PDF|← Approccio/);
  }
});
test('the landing is the only site index and the duplicate header menu is absent', async () => {
  const html = await readFile(new URL('../proposal/index.html', import.meta.url), 'utf8');
  assert.match(html, /class="site-header"/);
  assert.match(html, /class="brand"/);
  assert.doesNotMatch(html, /site-index|index-toggle|menu-prompt|menu-lines|tree-root|tree-folder/);
});
test('separate pages return to Home without duplicate project footers', async () => {
  for (const name of ['cv.html', 'luoghi.html', 'contatti.html']) {
    const html = await readFile(new URL('../proposal/' + name, import.meta.url), 'utf8');
    assert.match(html, /class="brand"/);
    assert.doesNotMatch(html, /Torna alla Home/);
    assert.doesNotMatch(html, /Torna al Profilo|Torna alla landing/);
  }
  const source = await readFile(new URL('../proposal/script.js', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /projectNav|navigationHTML:/);
  for (const name of ['housing/page.mjs', 'explorer/page.mjs']) {
    const module = await readFile(new URL('../proposal/' + name, import.meta.url), 'utf8');
    assert.doesNotMatch(module, /Torna alla Home/);
  }
  const housing = await readFile(new URL('../proposal/housing/page.mjs', import.meta.url), 'utf8');
  for (const label of ['contenuto/', 'strumenti/', 'limiti/']) assert.match(housing, new RegExp(label.replace('/', '\\/')));
  assert.match(housing, /14\.731 annunci/);
  assert.doesNotMatch(housing, /Il dataset in breve|housing-method|lab-methodology/);
});


