import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { validateDataset, selectRecords, summarize, pricePerSqm, sharedPriceDistribution, comparisonPriceDistribution, zoneKey, zoneMetricRows, zonePriceStatistics, categoryMetricRows, representativeCategoryKeys, categoryBoxStatistics } from '../proposal/housing/metrics.mjs';
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
  assert.equal(pricePerSqm(rows[1]),null);assert.equal(pricePerSqm(rows[0]),10);
  assert.equal(summarize([]).sqm.value,null);
});

test('cross filters share exact range, category, presence and record selection semantics',()=>{
  const rows=[{id:'a',zone:'A',area:10,price:100,energy:null,flagged:false},{id:'b',zone:'A',area:20,price:400,energy:'C',flagged:false},{id:'c',zone:'B',area:null,price:100,energy:'D',flagged:false}];
  assert.deepEqual(selectRecords(rows,{minSqm:10,maxSqm:20}).map(r=>r.id),['a','b']);
  assert.deepEqual(selectRecords(rows,{zone:'A',minSqm:11}).map(r=>r.id),['b']);
  assert.deepEqual(selectRecords(rows,{range:{field:'sqm',min:10,max:20,includeMax:false}}).map(r=>r.id),['a']);
  assert.deepEqual(selectRecords(rows,{ids:['a','b'],present:'energy'}).map(r=>r.id),['b']);
  assert.equal(selectRecords(rows,{minSqm:21}).length,0);
  assert.equal(selectRecords(rows,{}).length,3);
});

test('shared price bins preserve additive zone masses after smoothing',()=>{
  const rows=[
    {zone:'A',price:100,area:10},
    {zone:'A',price:200,area:10},
    {zone:'B',price:300,area:10},
    {zone:null,price:400,area:10}
  ];
  const keys=[...new Set(rows.map(zoneKey))];
  const result=sharedPriceDistribution(rows,keys,8);
  const stacked=result.total.map((_,index)=>keys.reduce((sum,key)=>sum+result.byZone.get(key)[index],0));
  assert.deepEqual(stacked,result.total);
  assert.equal(result.validCount,4);
});

test('zone metrics calculate ratios before medians and expose real five-number summaries',()=>{
  const rows=[
    {zone:'A',price:100,area:10},
    {zone:'A',price:900,area:30},
    {zone:'A',price:500,area:20},
    {zone:'B',price:null,area:10}
  ];
  assert.equal(zoneMetricRows(rows,['A'],'sqm')[0].value,25);
  assert.equal(zoneMetricRows(rows,['A'],'count')[0].value,3);
  const stats=zonePriceStatistics(rows,['A','B']);
  assert.deepEqual([stats[0].min,stats[0].median,stats[0].max],[100,500,900]);
  assert.equal(stats[0].mean,500);
  assert.equal(stats[1].count,0);
});

test('category metrics support every grouping, aggregate and representative quartile role',()=>{
  const rows=Array.from({length:9},(_,index)=>({id:String(index),type:'T'+index,price:(index+1)*100,area:10,flagged:false}));
  assert.deepEqual(representativeCategoryKeys(categoryMetricRows(rows,'type',rows.map(row=>row.type),'price','median')),['T0','T2','T4','T6','T8']);
  const repeated=[{type:'A',price:100,area:10},{type:'A',price:300,area:10},{type:'B',price:800,area:20}];
  assert.equal(categoryMetricRows(repeated,'type',['A'],'price','mean')[0].value,200);
  assert.equal(categoryMetricRows(repeated,'type',['A'],'price','median')[0].value,200);
  assert.equal(categoryMetricRows(repeated,'type',['A'],'count')[0].value,2);
});

test('Tukey box statistics identify outliers and keep whiskers on inliers',()=>{
  const rows=[1,2,2,3,3,4,100].map((price,index)=>({id:'r'+index,type:'A',price,area:1}));
  const stats=categoryBoxStatistics(rows,'type',['A'],'price')[0];
  assert.deepEqual(stats.outliers.map(item=>item.id),['r6']);
  assert.equal(stats.whiskerLow,1);
  assert.equal(stats.whiskerHigh,4);
});

test('box statistics expose valid observation counts and shares against filtered and total universes',()=>{
  const total=[
    {id:'a1',type:'A',price:100,area:10},
    {id:'a2',type:'A',price:200,area:10},
    {id:'a3',type:'A',price:300,area:10},
    {id:'b1',type:'B',price:400,area:10},
    {id:'b2',type:'B',price:null,area:10}
  ];
  const filtered=[total[0],total[1],total[3]];
  const stats=categoryBoxStatistics(filtered,'type',['A','B'],'price',total);
  assert.equal(stats[0].count,2);
  assert.equal(stats[0].totalCount,3);
  assert.equal(stats[0].filteredShare,2/3);
  assert.equal(stats[0].totalShare,3/4);
  assert.equal(stats[1].filteredShare,1/3);
  assert.equal(stats[1].totalShare,1/4);
});

test('shared price bins generalize additive masses to non-zone categories',()=>{
  const rows=[{type:'A',price:100},{type:'A',price:200},{type:'B',price:300}];
  const keys=['A','B'],result=sharedPriceDistribution(rows,keys,8,'type');
  const stacked=result.total.map((_,index)=>keys.reduce((sum,key)=>sum+result.byCategory.get(key)[index],0));
  assert.deepEqual(stacked,result.total);
});

test('comparison distribution keeps one shared scale for overall and filtered records',()=>{
  const rows=[{id:'a',price:100},{id:'b',price:200},{id:'c',price:300},{id:'d',price:10000}],filtered=[rows[1],rows[2]];
  const result=comparisonPriceDistribution(rows,filtered,8);
  assert.equal(result.validCount,4);
  assert.equal(result.filteredValidCount,2);
  assert.equal(result.overall.length,8);
  assert.equal(result.filtered.length,8);
  assert.ok(result.overall.some(value=>value>0));
  assert.ok(result.filtered.some(value=>value>0));
});
