import { numberValue, dateValue, histogram, quantile, escapeHTML } from './core.mjs';

export function chartData(rows, spec, decimal = '.') {
  const { kind, x, y, color = -1, aggregate = 'mean' } = spec;
  const n = value => numberValue(value, decimal);
  const label = value => escapeHTML(String(value || '(mancante)').slice(0, 80));
  if (kind === 'histogram') return [{ type: 'bar', ...histogram(rows.map(r => n(r[x]))), marker: { color: '#476753' } }];
  if (kind === 'scatter') {
    const valid = rows.filter(r => n(r[x]) !== null && n(r[y]) !== null);
    const groups = color < 0 ? ['Dati'] : [...new Set(valid.map(r => r[color] || '(mancante)'))];
    if (groups.length > 20) throw new Error('La colonna colore deve avere al massimo 20 categorie.');
    return groups.map(group => { const data = color < 0 ? valid : valid.filter(r => (r[color] || '(mancante)') === group); return { type: 'scatter', mode: 'markers', name: label(group), x: data.map(r => n(r[x])), y: data.map(r => n(r[y])), marker: { size: 6, opacity: 0.6 } }; });
  }
  const groups = new Map();
  for (const row of rows) {
    const key = kind === 'time' ? dateValue(row[x]) : row[x] || '(mancante)';
    if (!key) continue;
    const value = kind === 'bar' && aggregate === 'count' ? 1 : n(row[y]);
    if (value === null) continue;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(value);
  }
  if (kind !== 'time' && groups.size > 40) throw new Error('Troppe categorie (massimo 40): filtra i dati o scegli un’altra colonna.');
  const entries = [...groups].sort(([a], [b]) => a.localeCompare(b));
  if (kind === 'box') {
    // Basic Plotly has no box trace: draw explicit quartiles and min/max whiskers.
    return entries.flatMap(([key, values], i) => {
      const min = Math.min(...values), max = Math.max(...values), q1 = quantile(values, .25), q3 = quantile(values, .75), med = quantile(values, .5);
      return [
        { type: 'scatter', mode: 'lines', x: [i,i,null,i-.15,i+.15,null,i-.15,i+.15], y: [min,max,null,min,min,null,max,max], line: {color:'#476753'}, hoverinfo:'skip', showlegend:false },
        { type:'scatter', mode:'lines', x:[i-.3,i+.3,i+.3,i-.3,i-.3], y:[q1,q1,q3,q3,q1], fill:'toself', fillcolor:'rgba(71,103,83,.18)', line:{color:'#476753'}, name:label(key), text:`n=${values.length}; mediana=${med}`, hoverinfo:'text+name', showlegend:false },
        { type:'scatter', mode:'lines', x:[i-.3,i+.3], y:[med,med], line:{color:'#87515d',width:3}, hoverinfo:'skip', showlegend:false },
      ];
    });
  }
  return [{ type: kind === 'time' ? 'scatter' : 'bar', mode:'lines+markers', x: entries.map(([key]) => label(key)), y: entries.map(([, v]) => aggregate === 'count' ? v.length : aggregate === 'sum' ? v.reduce((a,b)=>a+b,0) : aggregate === 'median' ? quantile(v,.5) : v.reduce((a,b)=>a+b,0)/v.length), marker:{color:'#476753'} }];
}
export function chartLayout(headers, rows, spec) {
  const layout = { paper_bgcolor:'rgba(0,0,0,0)', plot_bgcolor:'rgba(0,0,0,0)', font:{family:'inherit',size:12,color:'#3d4640'}, margin:{l:65,r:20,t:20,b:80}, showlegend:spec.color>=0, xaxis:{title:{text:escapeHTML(headers[spec.x])},automargin:true}, yaxis:{title:{text:spec.kind==='histogram'||spec.aggregate==='count'?'Frequenza':escapeHTML(headers[spec.y])},automargin:true} };
  if(spec.kind==='bar')layout.xaxis.type='category';
  if(spec.kind==='box') {
    const keys=[...new Set(rows.filter(r=>numberValue(r[spec.y],spec.decimal)!==null).map(r=>r[spec.x]||'(mancante)'))].sort((a,b)=>a.localeCompare(b));
    layout.xaxis.tickvals=keys.map((_,i)=>i); layout.xaxis.ticktext=keys.map(escapeHTML); layout.xaxis.type='linear';
  }
  if(spec.kind==='time') {
    layout.xaxis.type='date';layout.xaxis.tickformat='%d/%m/%Y';
    const days=[...new Set(rows.map(r=>dateValue(r[spec.x])).filter(Boolean))];
    if(days.length===1) { const center=Date.parse(days[0]+'T00:00:00Z'); layout.xaxis.range=[center-86400000,center+86400000];layout.xaxis.dtick=86400000; }
  }
  return layout;
}
