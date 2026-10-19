import { medianByZone, priceDistribution, pricePerSqm } from './metrics.mjs';

const money = new Intl.NumberFormat('it-IT', { maximumFractionDigits: 0 });
const escaped = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const green = '#476753';
const burgundy = '#87515d';
let plotlyPromise;

export function loadPlotly() {
  if (window.Plotly) return Promise.resolve(window.Plotly);
  if (!plotlyPromise) {
    plotlyPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = new URL('./vendor/plotly-basic-4.1.2.min.js', import.meta.url).href;
      script.async = true;
      script.onload = () => window.Plotly ? resolve(window.Plotly) : reject(new Error('Plotly non disponibile.'));
      script.onerror = () => { script.remove(); reject(new Error('Impossibile caricare i grafici.')); };
      document.head.append(script);
    }).catch(error => { plotlyPromise = undefined; throw error; });
  }
  return plotlyPromise;
}

const chartLayout = (bottom = 48) => ({
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(0,0,0,0)',
  font: { family: 'Avenir Next, Avenir, Trebuchet MS, Ubuntu, sans-serif', size: 11, color: '#3d4640' },
  margin: { l: 58, r: 14, t: 15, b: bottom },
  showlegend: false,
  hoverlabel: { bgcolor: '#ffffff', bordercolor: '#d2d8d0', font: { color: '#242b26' } },
  xaxis: { automargin: true, gridcolor: '#e6e9e3', zeroline: false },
  yaxis: { automargin: true, gridcolor: '#e6e9e3', zeroline: false },
});
const config = { responsive: true, displayModeBar: false, scrollZoom: false };

export async function renderCharts(nodes, records) {
  const Plotly = await loadPlotly();
  if (!records.length) {
    for (const node of Object.values(nodes)) {
      Plotly.purge(node);
      node.textContent = 'Nessun dato da visualizzare con questi filtri.';
    }
    return;
  }

  const byZone = medianByZone(records);
  const distribution = priceDistribution(records);
  await Promise.all([
    Plotly.react(nodes.zones, [{
      type: 'bar', x: byZone.map(row => row.zone), y: byZone.map(row => row.medianPricePerSqm),
      customdata: byZone.map(row => row.count),
      marker: { color: green },
      hovertemplate: '%{x}<br>Mediana: %{y:,.0f} €/m²<br>Annunci: %{customdata}<extra></extra>',
    }], { ...chartLayout(), yaxis: { ...chartLayout().yaxis, title: '€/m²' } }, config),
    Plotly.react(nodes.scatter, [{
      type: 'scatter', mode: 'markers',
      x: records.map(record => record.surface_sqm),
      y: records.map(record => record.asking_price_eur),
      customdata: records.map(record => [escaped(record.id), escaped(record.zone), escaped(record.type), pricePerSqm(record), escaped(record.listed_at)]),
      marker: { color: burgundy, opacity: 0.68, size: 7 },
      hovertemplate: '<b>%{customdata[0]}</b> · %{customdata[1]}<br>%{customdata[2]} · %{x} m²<br>Prezzo richiesto: %{y:,.0f} €<br>%{customdata[3]:,.0f} €/m² · %{customdata[4]}<extra></extra>',
    }], {
      ...chartLayout(55),
      xaxis: { ...chartLayout().xaxis, title: 'Superficie (m²)' },
      yaxis: { ...chartLayout().yaxis, title: 'Prezzo richiesto (€)', tickformat: '~s' },
    }, config),
    Plotly.react(nodes.distribution, [{
      type: 'bar',
      x: distribution.map(bin => `${money.format(Math.round(bin.minimum))}–${money.format(Math.round(bin.maximum))}`),
      y: distribution.map(bin => bin.count),
      marker: { color: green },
      hovertemplate: '%{x} €/m²<br>%{y} annunci<extra></extra>',
    }], { ...chartLayout(75), xaxis: { ...chartLayout().xaxis, tickangle: -30 }, yaxis: { ...chartLayout().yaxis, title: 'Annunci', ...(Math.max(...distribution.map(bin => bin.count)) <= 8 ? { dtick: 1 } : {}) } }, config),
  ]);
}

export function purgeCharts(nodes) {
  if (!window.Plotly) return;
  for (const node of Object.values(nodes)) if (node?.isConnected) window.Plotly.purge(node);
}
