import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { loadDataset, validateDataset } from '../proposal/lab/data.mjs';
import { filterRecords, median, medianByZone, priceDistribution, pricePerSqm, sortRecords, summarize, toCSV } from '../proposal/lab/metrics.mjs';
import { resolveAsset } from '../scripts/dev.mjs';

const listing = (id, zone, type, area, price, date = '2026-10-01') => ({
  id, zone, type, surface_sqm: area, asking_price_eur: price, listed_at: date,
});
const payload = records => ({
  schema_version: '1.0', origin: 'Test sintetico', synthetic: true,
  transaction: 'sale', generated_at: '2026-10-18T12:00:00Z', seed: 7, records,
});

test('checked-in demo is a valid, reproducible sales-only dataset', async () => {
  const json = JSON.parse(await readFile(new URL('../proposal/lab/annunci-demo.json', import.meta.url), 'utf8'));
  const result = validateDataset(json);
  assert.equal(result.records.length, 720);
  assert.equal(result.invalidCount, 0);
  assert.equal(result.metadata.synthetic, true);
  assert.equal(result.metadata.transaction, 'sale');
  assert.deepEqual(new Set(result.records.map(row => row.id)).size, 720);
  assert.match(resolveAsset('/lab/annunci-demo.json').type, /application\/json/);
});

test('invalid metadata fails; invalid or duplicate records are counted and ignored', () => {
  assert.throws(() => validateDataset({ ...payload([]), schema_version: '2.0' }), /schema/);
  assert.throws(() => validateDataset({ ...payload([]), transaction: 'rent' }), /vendita/);
  assert.throws(() => validateDataset({ ...payload([]), records: null }), /annunci/);
  const valid = listing('A', 'Zona A', 'Bilocale', 50, 150000);
  const result = validateDataset(payload([
    valid, { ...valid }, listing('B', 'Zona B', 'Loft', 0, 150000),
    listing('C', 'Zona B', 'Loft', 50, NaN), listing('D', 'Zona B', 'Loft', 50, 150000, '2026-02-31'),
    { ...valid, id: 'E', zone: '' },
  ]));
  assert.deepEqual(result.records.map(row => row.id), ['A']);
  assert.equal(result.invalidCount, 5);
  assert.deepEqual(validateDataset(payload([])).records, []);
});

test('combined filters and empty selection use the same records for every metric', () => {
  const records = [
    listing('A', 'Zona A', 'Bilocale', 50, 150000),
    listing('B', 'Zona A', 'Bilocale', 80, 280000),
    listing('C', 'Zona A', 'Loft', 70, 210000),
    listing('D', 'Zona B', 'Bilocale', 60, 120000),
  ];
  const selected = filterRecords(records, { zone: 'Zona A', type: 'Bilocale', minArea: 60, maxArea: 90 });
  assert.deepEqual(selected.map(row => row.id), ['B']);
  assert.equal(summarize(selected).count, 1);
  assert.deepEqual(medianByZone(selected).map(group => [group.zone, group.count]), [['Zona A', 1]]);
  assert.equal(priceDistribution(selected).reduce((sum, bin) => sum + bin.count, 0), 1);
  const empty = filterRecords(records, { zone: 'Zona B', minArea: 100 });
  assert.deepEqual(summarize(empty), { count: 0, medianPrice: null, medianArea: null, medianPricePerSqm: null });
  assert.deepEqual(priceDistribution(empty), []);
});

test('median €/m² is computed from individual ratios, not aggregate medians', () => {
  const records = [listing('A', 'A', 'X', 10, 100), listing('B', 'A', 'X', 20, 1000), listing('C', 'B', 'X', 100, 1000)];
  const result = summarize(records);
  assert.equal(result.medianPricePerSqm, 10);
  assert.equal(result.medianPrice / result.medianArea, 50);
  assert.equal(median([10, 50, 10, 100]), 30);
  assert.equal(pricePerSqm(records[1]), 50);
});

test('CSV exports exactly the selected and sorted records, not just a table page', () => {
  const records = [listing('A', 'Zona A', 'Bilocale', 50, 150000), listing('B', 'Zona B', 'Loft', 60, 180000), listing('C', 'Zona A', 'Loft', 90, 270000)];
  const selected = filterRecords(records, { zone: 'Zona A' });
  const ordered = sortRecords(selected, 'surface_sqm', 'desc');
  const csv = toCSV(ordered);
  const lines = csv.trim().split('\r\n');
  assert.deepEqual(lines.slice(1).map(line => line.split(';')[0]), ordered.map(row => row.id));
  assert.equal(lines.length, selected.length + 1);
  assert.ok(!csv.includes('Zona B'));
  assert.match(lines[0], /price_per_sqm/);
});

test('dataset retrieval failure is reported without inventing values', async () => {
  await assert.rejects(loadDataset('missing.json', { fetcher: async () => { throw new TypeError('offline'); } }), /Impossibile recuperare/);
  await assert.rejects(loadDataset('missing.json', { fetcher: async () => ({ ok: false, status: 404 }) }), /HTTP 404/);
});
