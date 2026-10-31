import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCSV, numberValue, dateValue, inferType, transform, toCSV, histogram, quantile } from '../proposal/explorer/core.mjs';
import { chartData } from '../proposal/explorer/charts.mjs';

test('CSV parses BOM, separators, quoted newlines, escaped quotes and trailing empty cells',()=>{
  const parsed=parseCSV('\uFEFFname;value;note\r\n"a;b";"2,5";"line1\nline2"\r\n"""quote""";3;');
  assert.deepEqual(parsed.headers,['name','value','note']);
  assert.deepEqual(parsed.rows,[['a;b','2,5','line1\nline2'],['"quote"','3','']]);
  assert.equal(parseCSV('a,b\n1,2').delimiter,',');
  assert.equal(parseCSV('a\tb\n1\t2').delimiter,'\t');
  assert.deepEqual(parseCSV('one\n""\nhello').rows,[['hello']]);
});
test('CSV rejects broken rows, ambiguous headers and row/column limits',()=>{
  for(const text of ['a;a\n1;2','a;\n1;2','a;b\n1','a;b\n"open;2','a;b\n"x"oops;2']) assert.throws(()=>parseCSV(text));
  assert.throws(()=>parseCSV('x\n'+'1\n'.repeat(30001)),/30000/);
  assert.throws(()=>parseCSV(Array.from({length:101},(_,i)=>`c${i}`).join(';')+'\n'+'1;'.repeat(100)+'1'),/100/);
});
test('numeric and date conversion never silently coerces missing or malformed values',()=>{
  assert.equal(numberValue(''),null);assert.equal(numberValue('Infinity'),null);assert.equal(numberValue('12x'),null);
  assert.equal(numberValue('1.234,50',','),1234.5);assert.equal(numberValue('12.34',','),null);
  assert.equal(numberValue('-1.5'),-1.5);assert.equal(numberValue('1e3'),1000);
  assert.equal(numberValue('9007199254740993'),null);
  assert.equal(dateValue('2024-02-29'),'2024-02-29');assert.equal(dateValue('2025-02-29'),null);
  assert.equal(dateValue('01/02/2021'),null);
  assert.equal(inferType(['','0','1']),'number');assert.equal(inferType(['true','false']),'category');
  assert.equal(inferType(['2021-01-01','']),'date');
});
test('transforms are immutable, count affected rows and replay reversibly',()=>{
  const original={headers:['label','amount'],rows:[[' A  B ','2'],['a b',''],['a b','']]};
  const normalized=transform(original,{kind:'lowercase',column:0});
  assert.equal(normalized.affected,1);assert.equal(original.rows[0][0],' A  B ');
  const dedup=transform(normalized,{kind:'duplicates'});assert.equal(dedup.affected,1);
  const filled=transform(dedup,{kind:'fill',column:1,value:'0'});assert.equal(filled.affected,1);
  assert.equal(transform(original,{kind:'dropMissing',column:1}).rows.length,1);
  assert.equal(transform(original,{kind:'filter',column:0,value:'A'}).rows.length,3);
  assert.throws(()=>transform(original,{kind:'rename',column:0,value:'amount'}));
});
test('CSV export quotes newlines and neutralizes spreadsheet formulas in headers and data',()=>{
  const csv=toCSV(['=HEAD','v'],[['=HYPERLINK("x")','text;line\nnew'],['\t@SUM(1)','-10']]);
  const roundtrip=parseCSV(csv,';');
  assert.equal(roundtrip.headers[0],"'=HEAD");assert.ok(roundtrip.rows[0][0].startsWith("'="));
  assert.equal(roundtrip.rows[1][0],"'\t@SUM(1)");assert.equal(roundtrip.rows[1][1],'-10');
});
test('histograms preserve observations and quartiles use linear interpolation',()=>{
  assert.equal(histogram([1,2,3,4,null]).y.reduce((a,b)=>a+b,0),4);
  assert.deepEqual(histogram([5,5]).y,[2]);assert.deepEqual(histogram([]).y,[]);
  assert.deepEqual(histogram([5,5]).x,[5]);
  assert.equal(quantile([10,20,30,40],.25),17.5);assert.equal(quantile([], .5),null);
});
test('charts aggregate only compatible values and reject excessive categories',()=>{
  const rows=[['B','2'],['A','4'],['A',''],['A','8']];
  assert.deepEqual(chartData(rows,{kind:'bar',x:0,y:1,aggregate:'mean'})[0].y,[6,2]);
  assert.deepEqual(chartData(rows,{kind:'bar',x:0,y:1,aggregate:'count'})[0].y,[3,1]);
  const series=chartData([['2021-01-02','3'],['2021-01-01','1'],['bad','100']],{kind:'time',x:0,y:1,aggregate:'sum'})[0];
  assert.deepEqual(series.x,['2021-01-01','2021-01-02']);
  assert.throws(()=>chartData(Array.from({length:41},(_,i)=>[String(i),'1']),{kind:'bar',x:0,y:1,aggregate:'count'}));
  const box=chartData(rows,{kind:'box',x:0,y:1});assert.equal(box.length,6);
});

test('explicit date conversion and missing markers preserve the input and reject invalid dates',()=>{
  const data={headers:['date','value'],rows:[['29/02/2024','NA'],['01/03/2024','0']]};
  const normalized=transform(data,{kind:'dateDMY',column:0});
  assert.deepEqual(normalized.rows.map(r=>r[0]),['2024-02-29','2024-03-01']);
  assert.equal(data.rows[0][0],'29/02/2024');
  const missing=transform(data,{kind:'missing',column:1,value:'NA'});
  assert.deepEqual(missing.rows.map(r=>r[1]),['','0']);
  assert.throws(()=>transform({headers:['date'],rows:[['31/02/2024']]},{kind:'dateDMY',column:0}),/Data non valida/);
});
