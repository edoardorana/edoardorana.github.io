import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveView } from '../proposal/navigation.mjs';

test('home URLs resolve to the beginning of the landing', () => {
  for (const hash of ['', '#/', '#/home', '#/mappa']) {
    assert.deepEqual(resolveView(hash), { kind: 'landing', section: 'home' }, hash || 'empty URL');
  }
});

test('section URLs and historical aliases resolve inside the landing', () => {
  const cases = [
    ['#/profilo', 'profilo'],
    ['#/percorso', 'profilo'],
    ['#/progetti', 'progetti'],
    ['#/laboratorio', 'progetti'],
    ['#/approccio', 'approccio'],
    ['#/contatti', 'contatti'],
    ['#/progetti/business-intelligence', 'profilo'],
    ['#/progetti/sb-italia', 'profilo'],
  ];

  for (const [hash, section] of cases) {
    assert.deepEqual(resolveView(hash), { kind: 'landing', section }, hash);
  }
});

test('canonical project URLs and historical aliases resolve to separate project views', () => {
  const cases = [
    ['#/progetti/production-databases', 'production-databases'],
    ['#/progetti/immobiliare-data', 'immobiliare-data'],
    ['#/progetti/market-data', 'immobiliare-data'],
    ['#/progetti/dashboard-generator', 'dashboard-generator'],
    ['#/progetti/csv-explorer', 'dashboard-generator'],
  ];

  for (const [hash, item] of cases) {
    assert.deepEqual(resolveView(hash), { kind: 'project', item }, hash);
  }
});

test('unknown, extra and malformed paths resolve to not-found', () => {
  const invalid = [
    '#/missing',
    '#/profilo/extra',
    '#/laboratorio/extra',
    '#/progetti/missing',
    '#/progetti/market-data/extra',
    '#/%3Cscript%3E',
    '#//profilo',
    '#/progetti//immobiliare-data',
  ];

  for (const hash of invalid) {
    assert.deepEqual(resolveView(hash), { kind: 'not-found' }, hash);
  }
});
