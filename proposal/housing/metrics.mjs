import { quantile } from '../explorer/core.mjs';
export const pricePerSqm = r => r.price !== null && r.area !== null && r.area > 0 ? r.price / r.area : null;
export function selectRecords(records, filters) {
  return records.filter(r => {
    if (!filters.includeFlagged && r.flagged) return false;
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
export function zonesSummary(records) {
  const groups=new Map();
  for(const r of records)if(r.zone&&pricePerSqm(r)!==null){if(!groups.has(r.zone))groups.set(r.zone,[]);groups.get(r.zone).push(pricePerSqm(r));}
  return [...groups].map(([zone,v])=>({zone,count:v.length,median:quantile(v,.5)})).sort((a,b)=>b.count-a.count||a.zone.localeCompare(b.zone));
}
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
