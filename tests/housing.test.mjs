import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { validateDataset, selectRecords, summarize, pricePerSqm, zonesSummary } from '../proposal/housing/metrics.mjs';
const dataset=JSON.parse(await readFile(new URL('../proposal/housing/milano-2021.json',import.meta.url),'utf8'));
test('historical public dataset has an allowlisted schema, reconciled exclusions and no raw identifiers',async()=>{
  validateDataset(dataset);
  const m=dataset.metadata;
  assert.equal(m.source_rows,m.published_rows+Object.values(m.excluded).reduce((a,b)=>a+b,0));
  assert.equal(m.flagged_rows,dataset.records.filter(r=>r.flagged).length);
  assert.equal(m.comparison.used_for_publication,false);
  for(const [key,count] of Object.entries(m.missing))assert.equal(dataset.records.filter(r=>r[key]===null).length,count);
  const zones=JSON.parse(await readFile(new URL('../scripts/housing-zones.json',import.meta.url),'utf8'));
  for(const r of dataset.records){assert.ok(r.zone===null||zones.includes(r.zone));assert.ok(!JSON.stringify(r).includes('http'));}
});
test('historical filtering excludes anomalies by default and preserves missing values until constrained',()=>{
  const rows=[{zone:'A',type:'T',area:10,price:100,flagged:false},{zone:'B',type:'T',area:null,price:null,flagged:false},{zone:null,type:'T',area:1,price:1,flagged:true}];
  assert.equal(selectRecords(rows,{}).length,2);
  assert.equal(selectRecords(rows,{includeFlagged:true}).length,3);
  assert.equal(selectRecords(rows,{minArea:'0'}).length,1);
  assert.equal(selectRecords(rows,{zone:'__missing',includeFlagged:true}).length,1);
  const result=summarize(rows);assert.equal(result.price.count,2);assert.equal(result.area.value,5.5);
  assert.equal(pricePerSqm(rows[1]),null);assert.equal(zonesSummary(rows)[0].median,10);
  assert.equal(summarize([]).sqm.value,null);
});
