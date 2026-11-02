import { quantile } from '../explorer/core.mjs';
export const pricePerSqm = r => r.price !== null && r.area !== null && r.area > 0 ? r.price / r.area : null;
export function selectRecords(records, filters) {
  return records.filter(r => {
    if (!filters.includeFlagged && r.flagged) return false;
    if (filters.ids && !filters.ids.includes(r.id)) return false;
    if (filters.present && r[filters.present] === null) return false;
    const sqm = pricePerSqm(r);
    for (const [key,compare] of [['minSqm',(a,b)=>a<b],['maxSqm',(a,b)=>a>b]]) {
      if (filters[key] !== '' && filters[key] !== undefined && (sqm === null || compare(sqm,Number(filters[key])))) return false;
    }
    if (filters.range) {
      const {field,min,max,includeMax=true}=filters.range;
      const value=field==='sqm'?sqm:r[field];
      if(value===null||value<min||(includeMax?value>max:value>=max))return false;
    }
    for (const field of ['zone','type','condition','rooms','energy']) if(filters[field] && (filters[field]==='__missing' ? r[field]!==null : r[field]!==filters[field]))return false;
    for (const [field, low, high] of [['area','minArea','maxArea'],['price','minPrice','maxPrice']]) {
      if(filters[low]!=='' && filters[low]!==undefined && (r[field]===null||r[field]<Number(filters[low])))return false;
      if(filters[high]!=='' && filters[high]!==undefined && (r[field]===null||r[field]>Number(filters[high])))return false;
    }
    return true;
  });
}
export function summarize(records) {
  const result={count:records.length};
  for(const [key,access] of [['price',r=>r.price],['area',r=>r.area],['sqm',pricePerSqm]]) {
    const values=records.map(access).filter(Number.isFinite);
    result[key]={value:quantile(values,.5),count:values.length};
  }
  return result;
}

export const zoneKey = record => record.zone ?? '__missing';
export const zoneLabel = key => key === '__missing' ? 'Non disponibile' : key;
export const categoryKey = (record, field) => record[field] ?? '__missing';
export const categoryLabel = key => key === '__missing' ? 'Non disponibile' : key;
export const numericValue = (record, metric) => metric === 'sqm' ? pricePerSqm(record) : record[metric];

const smoothCounts = counts => counts.map((_, index) => {
  const weights = [1, 4, 6, 4, 1];
  return weights.reduce((sum, weight, offset) => sum + (counts[index + offset - 2] ?? 0) * weight, 0) / 16;
});

export function sharedPriceDistribution(records, categoryKeys, binCount = 36, categoryField = 'zone') {
  const valid = records.filter(record => Number.isFinite(record.price));
  const prices = valid.map(record => record.price);
  const cap = quantile(prices, .99) ?? 1;
  const width = Math.max(1, cap / binCount);
  const centers = Array.from({length: binCount}, (_, index) => (index + .5) * width);
  const count = rows => {
    const result = Array(binCount).fill(0);
    for (const record of rows) result[Math.min(binCount - 1, Math.floor(record.price / width))]++;
    return result;
  };
  const totalCounts = count(valid);
  const byCategory = new Map();
  for (const key of categoryKeys) byCategory.set(key, smoothCounts(count(valid.filter(record => categoryKey(record, categoryField) === key))));
  return {
    centers,
    width,
    cap,
    validCount: valid.length,
    overflowCount: prices.filter(price => price >= cap).length,
    total: smoothCounts(totalCounts),
    byZone: byCategory,
    byCategory
  };
}

export function comparisonPriceDistribution(records, filteredRecords, binCount = 36) {
  const overall = records.filter(record => Number.isFinite(record.price));
  const filtered = filteredRecords.filter(record => Number.isFinite(record.price));
  const prices = overall.map(record => record.price);
  const cap = quantile(prices, .99) ?? 1;
  const width = Math.max(1, cap / binCount);
  const centers = Array.from({length: binCount}, (_, index) => (index + .5) * width);
  const count = rows => {
    const result = Array(binCount).fill(0);
    for (const record of rows) result[Math.min(binCount - 1, Math.floor(record.price / width))]++;
    return smoothCounts(result);
  };
  return {
    centers,
    width,
    cap,
    overall: count(overall),
    filtered: count(filtered),
    validCount: overall.length,
    filteredValidCount: filtered.length,
    overflowCount: prices.filter(price => price >= cap).length
  };
}

export function categoryMetricRows(records, categoryField, keys, metric = 'sqm', aggregate = 'median') {
  return keys.map(key => {
    const rows = records.filter(record => categoryKey(record, categoryField) === key);
    const values = metric === 'count' ? [] : rows.map(record => numericValue(record, metric)).filter(Number.isFinite);
    const summary = metric === 'count' ? rows.length : aggregate === 'mean' ? values.reduce((sum, value) => sum + value, 0) / values.length : quantile(values, .5);
    return {key, label: categoryLabel(key), count: rows.length, value: Number.isFinite(summary) ? summary : null, valid: metric === 'count' ? rows.length : values.length};
  });
}

export function representativeCategoryKeys(rows) {
  const ranked = rows.filter(row => Number.isFinite(row.value)).sort((a, b) => a.value - b.value || a.label.localeCompare(b.label, 'it'));
  if (ranked.length <= 5) return ranked.map(row => row.key);
  const indexes = [0, .25, .5, .75, 1].map(position => Math.round((ranked.length - 1) * position));
  return [...new Set(indexes.map(index => ranked[index].key))];
}

export function categoryBoxStatistics(records, categoryField, keys, metric = 'price', comparisonRecords = records) {
  const filteredValidCount=records.map(record=>numericValue(record,metric)).filter(Number.isFinite).length;
  const totalValidCount=comparisonRecords.map(record=>numericValue(record,metric)).filter(Number.isFinite).length;
  return keys.map(key => {
    const observations = records.filter(record => categoryKey(record, categoryField) === key).map(record => ({id: record.id, value: numericValue(record, metric)})).filter(item => Number.isFinite(item.value)).sort((a, b) => a.value - b.value);
    const totalCount=comparisonRecords.filter(record=>categoryKey(record,categoryField)===key&&Number.isFinite(numericValue(record,metric))).length;
    const values = observations.map(item => item.value);
    const shares={totalCount,totalValidCount,filteredValidCount,totalShare:totalCount/(totalValidCount||1),filteredShare:values.length/(filteredValidCount||1)};
    if (!values.length) return {key, label: categoryLabel(key), values, observations, outliers: [], count: 0, ...shares, min: null, q1: null, median: null, mean: null, q3: null, max: null, whiskerLow: null, whiskerHigh: null};
    const q1=quantile(values,.25),q3=quantile(values,.75),spread=q3-q1,lowFence=q1-1.5*spread,highFence=q3+1.5*spread;
    const inliers=observations.filter(item=>item.value>=lowFence&&item.value<=highFence),outliers=observations.filter(item=>item.value<lowFence||item.value>highFence);
    return {
      key,
      label: categoryLabel(key),
      values,
      observations,
      outliers,
      count: values.length,
      ...shares,
      min: values[0],
      q1,
      median: quantile(values, .5),
      mean: values.reduce((sum, value) => sum + value, 0) / values.length,
      q3,
      max: values.at(-1),
      whiskerLow: inliers[0]?.value ?? values[0],
      whiskerHigh: inliers.at(-1)?.value ?? values.at(-1)
    };
  });
}
export const zoneMetricRows = (records, zoneKeys, metric = 'sqm') => categoryMetricRows(records, 'zone', zoneKeys, metric, 'median');
export const zonePriceStatistics = (records, zoneKeys) => categoryBoxStatistics(records, 'zone', zoneKeys, 'price');
export function validateDataset(data) {
  const fields=['id','zone','type','condition','area','price','rooms','energy','flagged'];
  if(!data?.metadata||!Array.isArray(data.records)||data.records.length!==data.metadata.published_rows)throw new Error('Dataset storico non valido.');
  const ids=new Set();
  for(const r of data.records){
    if(Object.keys(r).length!==fields.length||fields.some(k=>!(k in r))||!/^MI21-\d{5}$/.test(r.id)||ids.has(r.id)||typeof r.flagged!=='boolean')throw new Error('Schema del dataset storico non valido.');
    for(const k of ['area','price'])if(r[k]!==null&&(!Number.isFinite(r[k])||r[k]<=0))throw new Error('Misura non valida nel dataset.');
    for(const k of ['zone','type','condition','rooms','energy'])if(r[k]!==null&&typeof r[k]!=='string')throw new Error('Categoria non valida nel dataset.');
    ids.add(r.id);
  }
  return data;
}
