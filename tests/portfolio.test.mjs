import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { areas, projects, parseRoute, mailto, mapPoint, places } from '../proposal/data.mjs';
import { resolveAsset } from '../scripts/dev.mjs';
import { terminalHeader } from '../proposal/terminal-header.mjs';

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
  for (const name of ['index.html', 'cv.html', ...['capire','raccogliere','custodire','leggere','evolvere'].map(n=>'approccio/'+n+'.html')]) {
    const html = await readFile(new URL('../proposal/' + name, import.meta.url), 'utf8');
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length);
    for (const [, asset] of html.matchAll(/(?:src|href)="([^"#:]+\.(?:css|js|mjs|svg))(?:\?[^\"]*)?"/g)) await readFile(new URL(asset, new URL('../proposal/' + name, import.meta.url)));
  }
});
test('terminal headings keep the title semantic and the readme always visible', () => {
  const html = terminalHeader({ path: '~/progetti/demo', title: 'Titolo <demo>', summary: 'Sintesi & dettagli', sections: [{ label: 'voce/', text: 'Contenuto ordinato' }], action: { href: 'cv.html', command: 'xdg-open cv.html', label: 'Apri il CV' } });
  assert.match(html, /<h1 class="visually-hidden">Titolo &lt;demo&gt;<\/h1>/);
  assert.doesNotMatch(html, /edo@debian/);
  assert.match(html, /~\/progetti\/demo/);
  assert.match(html, /cat readme\.md/);
  assert.doesNotMatch(html, /\shidden(?:\s|>)|aria-expanded/);
  assert.match(html, /Sintesi &amp; dettagli/);
  assert.match(html, /voce\//);
  assert.match(html, /xdg-open cv\.html/);
  assert.match(html, /href="cv\.html"/);
});
test('README summaries explain the page and the next user action', async () => {
  const source = await readFile(new URL('../proposal/script.js', import.meta.url), 'utf8');
  assert.match(source, /Benvenuto nel mio sito/);
  assert.match(source, /Qui trovi formazione, esperienze e luoghi del mio percorso/);
  assert.match(source, /Seleziona una fase e apri la scheda operativa/);
  assert.match(source, /Seleziona una scheda per leggere il contesto/);
  const contact = await readFile(new URL('../proposal/contact.mjs', import.meta.url), 'utf8');
  assert.match(contact, /mail --new/);
  assert.doesNotMatch(contact, /mail-start|copy-email|wait-cursor|<form id="contact-form" hidden/);
});
test('Approach documents are direct CV-style pages without terminal headers', async () => {
  for (const name of ['capire', 'raccogliere', 'custodire', 'leggere', 'evolvere']) {
    const html = await readFile(new URL(`../proposal/approccio/${name}.html`, import.meta.url), 'utf8');
    assert.doesNotMatch(html, /cat readme\.md/);
    assert.match(html, /<main>/);
    assert.match(html, /Stampa \/ salva PDF/);
  }
});
test('site menu uses a compact terminal tree without repeated paths or file modes', async () => {
  const html = await readFile(new URL('../proposal/index.html', import.meta.url), 'utf8');
  assert.doesNotMatch(html, /drwx|rw-r|directory-mode/);
  assert.match(html, /<span class="menu-prompt"[^>]*>.*<strong>tree<\/strong>/);
  for (const label of ['home', 'profilo', 'cv.html', 'progetti', 'dashboard-generator', 'immobiliare-data', 'netbox-ipam', 'approccio', 'contatti']) assert.match(html, new RegExp(`>${label.replace('.', '\\.')}<`));
  assert.doesNotMatch(html, />\s*~\/(?:home|profilo|progetti|approccio|contatti)|>\s*progetti\/(?:dashboard-generator|immobiliare-data)/);
  assert.ok(html.indexOf('aria-label="Progetti"') < html.indexOf('aria-label="Approccio"'));
});
