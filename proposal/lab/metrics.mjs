export const PAGE_SIZE = 15;

export const pricePerSqm = record => record.asking_price_eur / record.surface_sqm;

export function median(values) {
  const ordered = values.filter(Number.isFinite).sort((a, b) => a - b);
  if (!ordered.length) return null;
  const middle = Math.floor(ordered.length / 2);
  return ordered.length % 2 ? ordered[middle] : (ordered[middle - 1] + ordered[middle]) / 2;
}

export function filterRecords(records, { zone = '', type = '', minArea = null, maxArea = null } = {}) {
  return records.filter(record =>
    (!zone || record.zone === zone) &&
    (!type || record.type === type) &&
    (minArea === null || record.surface_sqm >= minArea) &&
    (maxArea === null || record.surface_sqm <= maxArea)
  );
}

export function summarize(records) {
  return {
    count: records.length,
    medianPrice: median(records.map(record => record.asking_price_eur)),
    medianArea: median(records.map(record => record.surface_sqm)),
    // Median of each listing's ratio, never a ratio of two aggregate medians.
    medianPricePerSqm: median(records.map(pricePerSqm)),
  };
}

export function medianByZone(records) {
  const groups = new Map();
  for (const record of records) {
    if (!groups.has(record.zone)) groups.set(record.zone, []);
    groups.get(record.zone).push(pricePerSqm(record));
  }
  return [...groups].map(([zone, prices]) => ({ zone, count: prices.length, medianPricePerSqm: median(prices) }))
    .sort((a, b) => a.zone.localeCompare(b.zone, 'it'));
}

export function priceDistribution(records, binCount = 8) {
  const values = records.map(pricePerSqm);
  if (!values.length) return [];
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  if (minimum === maximum) return [{ minimum, maximum, count: values.length }];
  const width = (maximum - minimum) / binCount;
  const bins = Array.from({ length: binCount }, (_, index) => ({
    minimum: minimum + width * index,
    maximum: index === binCount - 1 ? maximum : minimum + width * (index + 1),
    count: 0,
  }));
  for (const value of values) bins[Math.min(binCount - 1, Math.floor((value - minimum) / width))].count++;
  return bins;
}

const SORT_KEYS = new Set(['id', 'zone', 'type', 'surface_sqm', 'asking_price_eur', 'listed_at']);

export function sortRecords(records, key = 'listed_at', direction = 'desc') {
  if (!SORT_KEYS.has(key)) throw new Error('Colonna di ordinamento non valida.');
  const sign = direction === 'asc' ? 1 : -1;
  return [...records].sort((a, b) => {
    const comparison = typeof a[key] === 'number' ? a[key] - b[key] : String(a[key]).localeCompare(String(b[key]), 'it');
    return (comparison || a.id.localeCompare(b.id)) * sign;
  });
}

const CSV_FIELDS = ['id', 'zone', 'type', 'surface_sqm', 'asking_price_eur', 'listed_at', 'price_per_sqm'];
const csvCell = value => {
  // Avoid spreadsheet formula execution when a future public source supplies text.
  const raw = String(value);
  const text = /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw;
  return /[;"\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};

export function toCSV(records) {
  const rows = records.map(record => [
    record.id, record.zone, record.type, record.surface_sqm,
    record.asking_price_eur, record.listed_at,
    pricePerSqm(record).toFixed(2).replace('.', ','),
  ].map(csvCell).join(';'));
  return [CSV_FIELDS.join(';'), ...rows].join('\r\n') + '\r\n';
}
