import { toCSV } from './core.mjs';

export function downloadCSV(headers, rows, filename) {
  const url = URL.createObjectURL(new Blob([toCSV(headers, rows)], {type:'text/csv;charset=utf-8'}));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
