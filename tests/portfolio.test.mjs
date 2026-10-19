import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { areas, projects, parseRoute, mailto, mapPoint, places } from '../proposal/data.mjs';
import { resolveAsset } from '../scripts/dev.mjs';

test('all areas and project deep links resolve; missing content gets a not-found route', () => {
  assert.deepEqual(parseRoute(''), { page: 'mappa' });
  assert.deepEqual(parseRoute('#/'), { page: 'mappa' });
  for (const area of areas) assert.deepEqual(parseRoute('#/' + area.id), { page: area.id });
  assert.equal(areas.length, 4);
  assert.deepEqual(parseRoute('#/percorso'), { page: 'percorso' });
  assert.deepEqual(parseRoute('#/laboratorio'), { page: 'laboratorio' });
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
  assert.match(resolveAsset('/lab/vendor/PLOTLY-LICENSE.txt').type, /text\/plain/);
  for (const path of ['/../README.md','/%2e%2e/private.html','/.env','/file.txt','/%00.html','/..%5csecret.html','/%zz','/.git/config','/folder/.secret.html']) assert.equal(resolveAsset(path), null, path);
});
test('entry and CV use local assets and contain no duplicate HTML ids', async () => {
  for (const name of ['index.html', 'cv.html']) {
    const html = await readFile(new URL('../proposal/' + name, import.meta.url), 'utf8');
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length);
    for (const [, asset] of html.matchAll(/(?:src|href)="([^"#:]+\.(?:css|js|mjs|svg))(?:\?[^\"]*)?"/g)) await readFile(new URL('../proposal/' + asset, import.meta.url));
  }
});
