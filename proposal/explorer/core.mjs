// Pure functions shared by the CSV workspace and its tests. No network or storage.
export const LIMITS = { bytes: 10 * 1024 * 1024, rows: 30000, columns: 100 };
export const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export function parseCSV(text, delimiter = '') {
  text = text.replace(/^\uFEFF/, '');
  if (!delimiter) {
    const line = text.split(/\r?\n/)[0];
    delimiter = [',', ';', '\t'].sort((a, b) => countOutsideQuotes(line, b) - countOutsideQuotes(line, a))[0];
  }
  const matrix = [];
  let row = [], cell = '', quoted = false, closed = false;
  const pushCell = () => { row.push(cell); cell = ''; closed = false; };
  const pushRow = () => {
    pushCell();
    if (row.some(value => value.trim())) matrix.push(row);
    row = [];
    if (matrix.length > LIMITS.rows + 1) throw new Error(`Massimo ${LIMITS.rows} righe.`);
  };
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') { quoted = false; closed = true; }
      else cell += c;
    } else if (c === delimiter) pushCell();
    else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; pushRow(); }
    else if (c === '"' && !cell && !closed) quoted = true;
    else if (closed || c === '"') throw new Error('Virgolette non valide nel CSV. Controlla separatore e formato.');
    else cell += c;
    if (row.length > LIMITS.columns) throw new Error(`Massimo ${LIMITS.columns} colonne.`);
  }
  if (quoted) throw new Error('Una cella tra virgolette non è stata chiusa.');
  if (cell || row.length || closed) pushRow();
  if (matrix.length < 2) throw new Error('Servono una riga di intestazione e almeno una riga di dati.');
  const headers = matrix.shift().map(x => x.trim());
  if (headers.length > LIMITS.columns || headers.some(x => !x) || new Set(headers).size !== headers.length) throw new Error('Le intestazioni devono essere presenti, univoche e al massimo 100.');
  const bad = matrix.findIndex(r => r.length !== headers.length);
  if (bad !== -1) throw new Error(`La riga dati ${bad + 1} ha un numero di celle diverso dalle intestazioni. Controlla il separatore.`);
  return { headers, rows: matrix, delimiter };
}
function countOutsideQuotes(line, separator) {
  let quotes = false, count = 0;
  for (const c of line) { if (c === '"') quotes = !quotes; else if (c === separator && !quotes) count++; }
  return count;
}
export function numberValue(value, decimal = '.') {
  let text = String(value ?? '').trim();
  if (!text) return null;
  if (decimal === ',') {
    if (!/^[+-]?(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d+)?(?:e[+-]?\d+)?$/i.test(text)) return null;
    text = text.replace(/\./g, '').replace(',', '.');
  }
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(text)) return null;
  const result = Number(text);
  return Number.isFinite(result) && (!Number.isInteger(result) || Number.isSafeInteger(result)) ? result : null;
}
export function dateValue(value) {
  const text = String(value).trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return null;
  const date = new Date(`${text}T00:00:00Z`);
  return Number.isFinite(+date) && date.toISOString().slice(0, 10) === text ? text : null;
}
export function inferType(values, decimal = '.') {
  const filled = values.filter(x => String(x).trim());
  if (!filled.length) return 'category';
  if (filled.every(x => numberValue(x, decimal) !== null)) return 'number';
  if (filled.every(x => dateValue(x))) return 'date';
  return 'category';
}
export function transform(data, action) {
  let headers = [...data.headers], rows = data.rows.map(row => [...row]), affected = 0;
  const col = action.column;
  if (action.kind === 'rename') {
    const name = action.value.trim();
    if (!name || headers.some((h, i) => i !== col && h === name)) throw new Error('Scegli un nome di colonna non vuoto e univoco.');
    headers[col] = name; affected = data.rows.length;
  } else if (action.kind === 'duplicates') {
    const seen = new Set();
    rows = rows.filter(row => { const key = JSON.stringify(row); if (seen.has(key)) { affected++; return false; } seen.add(key); return true; });
  } else if (action.kind === 'dropMissing' || action.kind === 'filter') {
    rows = rows.filter(row => {
      const keep = action.kind === 'dropMissing' ? row[col].trim() !== '' : row[col].toLocaleLowerCase('it').includes(action.value.toLocaleLowerCase('it'));
      if (!keep) affected++;
      return keep;
    });
  } else {
    for (const row of rows) {
      const before = row[col];
      if (action.kind === 'trim') row[col] = before.trim().replace(/\s+/g, ' ');
      if (action.kind === 'lowercase') row[col] = before.trim().toLocaleLowerCase('it');
      if (action.kind === 'fill' && !before.trim()) row[col] = action.value;
      if (action.kind === 'missing' && before.trim().toLowerCase() === action.value.trim().toLowerCase()) row[col] = '';
      if (action.kind === 'dateDMY' && before.trim()) {
        const parts=before.trim().match(/^(\d{2})[\/.-](\d{2})[\/.-](\d{4})$/);
        const iso=parts ? `${parts[3]}-${parts[2]}-${parts[1]}` : before.trim();
        if (!dateValue(iso)) throw new Error(`Data non valida: ${before}. Nessuna modifica applicata. Usa GG/MM/AAAA o correggi la cella nel CSV.`);
        row[col]=iso;
      }
      if (row[col] !== before) affected++;
    }
  }
  return { headers, rows, affected };
}
export function toCSV(headers, rows) {
  const cell = value => {
    let text = String(value ?? '');
    if (/^[\s\u0000-\u001f]*[=+@-]/.test(text) && !/^-?\d+(?:[.,]\d+)?$/.test(text)) text = `'${text}`;
    return `"${text.replaceAll('"', '""')}"`;
  };
  return '\uFEFF' + [headers, ...rows].map(row => row.map(cell).join(';')).join('\r\n');
}
export function quantile(values, q) {
  const sorted = values.filter(Number.isFinite).sort((a, b) => a - b);
  if (!sorted.length) return null;
  const index = (sorted.length - 1) * q, lo = Math.floor(index);
  return sorted[lo] + (sorted[Math.ceil(index)] - sorted[lo]) * (index - lo);
}
export function histogram(values, bins = 15) {
  const data = values.filter(Number.isFinite);
  if (!data.length) return { x: [], y: [] };
  const min = Math.min(...data), max = Math.max(...data), width = max === min ? 1 : (max - min) / bins;
  const count = max === min ? 1 : bins, y = Array(count).fill(0);
  for (const n of data) y[Math.min(count - 1, Math.floor((n - min) / width))]++;
  return { x: y.map((_, i) => min + (i + 0.5) * width), y, width };
}
