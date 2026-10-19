import { loadDataset } from './data.mjs';
import { filterRecords, medianByZone, PAGE_SIZE, sortRecords, summarize, toCSV } from './metrics.mjs';
import { loadPlotly, purgeCharts, renderCharts } from './charts.mjs';

const integer = new Intl.NumberFormat('it-IT', { maximumFractionDigits: 0 });
const euro = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
const decimal = new Intl.NumberFormat('it-IT', { maximumFractionDigits: 1 });
const readableDate = value => new Intl.DateTimeFormat('it-IT', { timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`));

const template = (backHref, backText) => `
  <section class="page lab-page">
    <a class="back-link" href="${backHref}"><span aria-hidden="true">←</span> ${backText}</a>
    <header class="page-heading lab-heading">
      <p class="eyebrow">~/laboratorio</p>
      <h1>Laboratorio dati</h1>
      <p class="page-intro">Esplora annunci di vendita simulati: filtri, indicatori, grafici e tabella si aggiornano insieme.</p>
    </header>
    <div class="lab-disclaimer"><strong>Demo · dati sintetici</strong><span>Annunci generati per questa demo, distinti dalla mia tesi. Le statistiche non descrivono il mercato reale.</span></div>
    <p class="lab-load-status" role="status" aria-live="polite">Caricamento del dataset…</p>
    <div class="lab-load-error" role="alert" hidden><p></p><button type="button" class="lab-retry">Riprova</button></div>
    <div class="lab-content" hidden>
      <form class="lab-filters" aria-label="Filtri degli annunci">
        <div class="lab-filters-heading"><div><p class="eyebrow">SELEZIONE</p><h2>Filtra gli annunci</h2></div><button type="button" class="lab-reset">Azzera filtri</button></div>
        <div class="lab-filter-grid">
          <label>Zona<select name="zone"><option value="">Tutte le zone</option></select></label>
          <label>Tipologia<select name="type"><option value="">Tutte le tipologie</option></select></label>
          <label>Superficie minima (m²)<input name="minArea" type="number" inputmode="numeric" min="1" step="1" placeholder="Nessun minimo"></label>
          <label>Superficie massima (m²)<input name="maxArea" type="number" inputmode="numeric" min="1" step="1" placeholder="Nessun massimo"></label>
        </div>
        <p class="lab-filter-error" role="alert" hidden>La superficie minima non può superare la massima.</p>
      </form>
      <div class="lab-selection" role="status" aria-live="polite"></div>
      <div class="lab-kpis" aria-label="Indicatori degli annunci selezionati">
        <article><span>01 / ANNUNCI SELEZIONATI</span><strong data-kpi="count">—</strong><small data-sample="count"></small></article>
        <article><span>02 / PREZZO MEDIANO RICHIESTO</span><strong data-kpi="price">—</strong><small data-sample="price"></small></article>
        <article><span>03 / SUPERFICIE MEDIANA</span><strong data-kpi="area">—</strong><small data-sample="area"></small></article>
        <article><span>04 / MEDIANA PREZZO AL M²</span><strong data-kpi="sqm">—</strong><small data-sample="sqm"></small></article>
      </div>
      <p class="lab-small-sample" hidden></p>
      <p class="lab-empty" role="status" hidden>Nessun annuncio corrisponde ai filtri. Modifica la selezione o azzera i filtri.</p>
      <div class="lab-charts">
        <figure class="lab-chart lab-chart-wide"><figcaption><span>01 / CONFRONTO</span><h2>Prezzo mediano al m² per zona</h2><p>Mediana dei rapporti individuali, con numero di annunci per zona.</p></figcaption><div id="lab-chart-zones" class="lab-plot" aria-label="Grafico a barre del prezzo mediano al metro quadro per zona"></div><ul class="lab-zone-summary" aria-label="Valori del grafico per zona"></ul></figure>
        <figure class="lab-chart"><figcaption><span>02 / RELAZIONE</span><h2>Superficie e prezzo richiesto</h2><p>Ogni punto rappresenta un annuncio. I dettagli sono anche nella tabella.</p></figcaption><div id="lab-chart-scatter" class="lab-plot" aria-label="Grafico superficie e prezzo richiesto"></div></figure>
        <figure class="lab-chart"><figcaption><span>03 / DISTRIBUZIONE</span><h2>Annunci per fascia di €/m²</h2><p>Fasce calcolate sugli annunci selezionati; l'altezza indica il numero di annunci in ciascuna fascia.</p></figcaption><div id="lab-chart-distribution" class="lab-plot" aria-label="Distribuzione del prezzo richiesto al metro quadro"></div></figure>
      </div>
      <p class="lab-chart-status" role="status" aria-live="polite">Caricamento grafici…</p>
      <button type="button" class="lab-retry-charts" hidden>Riprova a caricare i grafici</button>
      <section class="lab-records" aria-labelledby="lab-records-title">
        <div class="lab-records-heading"><div><p class="eyebrow">DATI CONSULTABILI</p><h2 id="lab-records-title">Annunci selezionati</h2><p>Tutti i record filtrati sono esportabili; la tabella ne mostra 15 per pagina.</p></div><button type="button" class="lab-export">Esporta CSV filtrato ↓</button></div>
        <div class="lab-table-scroll"><table><caption class="visually-hidden">Annunci di vendita sintetici filtrati e ordinabili</caption><thead><tr>
          <th scope="col"><button type="button" data-sort="id">ID</button></th>
          <th scope="col"><button type="button" data-sort="zone">Zona</button></th>
          <th scope="col"><button type="button" data-sort="type">Tipologia</button></th>
          <th scope="col"><button type="button" data-sort="surface_sqm">Superficie (m²)</button></th>
          <th scope="col"><button type="button" data-sort="asking_price_eur">Prezzo (€)</button></th>
          <th scope="col"><button type="button" data-sort="listed_at">Data</button></th>
          <th scope="col">€/m²</th>
        </tr></thead><tbody></tbody></table></div>
        <div class="lab-pagination"><button type="button" class="lab-prev">← Precedente</button><span class="lab-page-info"></span><button type="button" class="lab-next">Successiva →</button></div>
      </section>
      <details class="lab-methodology"><summary>Come leggere questa demo</summary><div class="lab-method-copy"></div></details>
      <p class="lab-attribution">Grafici interattivi: <a href="https://plotly.com/javascript/" target="_blank" rel="noopener noreferrer">Plotly.js</a> (MIT).</p>
    </div>
  </section>`;

function fillOptions(select, values) {
  for (const value of [...new Set(values)].sort((a, b) => a.localeCompare(b, 'it'))) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.append(option);
  }
}

function tableCell(value) {
  const cell = document.createElement('td');
  cell.textContent = value;
  return cell;
}

export function mountLab(container, { backHref = '#/progetti', backText = 'Torna ai progetti', signal, isCurrent = () => true, fetcher = fetch } = {}) {
  container.innerHTML = template(backHref, backText);
  const section = container.querySelector('.lab-page');
  const content = section.querySelector('.lab-content');
  const form = section.querySelector('.lab-filters');
  const status = section.querySelector('.lab-load-status');
  const error = section.querySelector('.lab-load-error');
  const chartStatus = section.querySelector('.lab-chart-status');
  const retryCharts = section.querySelector('.lab-retry-charts');
  const nodes = {
    zones: section.querySelector('#lab-chart-zones'),
    scatter: section.querySelector('#lab-chart-scatter'),
    distribution: section.querySelector('#lab-chart-distribution'),
  };
  let disposed = false;
  let records = [];
  let invalidCount = 0;
  let filtered = [];
  let ordered = [];
  let plotlyReady = false;
  let chartVersion = 0;
  let chartQueue = Promise.resolve();
  const state = { sortKey: 'listed_at', direction: 'desc', page: 1 };

  const active = () => !disposed && !signal?.aborted && isCurrent();
  const kpi = (key, value) => { section.querySelector(`[data-kpi="${key}"]`).textContent = value; };

  function scheduleCharts() {
    const version = ++chartVersion;
    if (!plotlyReady) return;
    const current = filtered;
    chartQueue = chartQueue.catch(() => {}).then(async () => {
      if (!active() || version !== chartVersion) return;
      try {
        await renderCharts(nodes, current);
        if (active() && version === chartVersion) chartStatus.textContent = current.length ? 'Grafici aggiornati con gli annunci selezionati.' : 'Nessun dato per i grafici.';
      } catch {
        if (active()) {
          chartStatus.textContent = 'Grafici non disponibili. Gli indicatori e la tabella restano consultabili.';
          retryCharts.hidden = false;
        }
      }
    });
  }

  function renderTable() {
    ordered = sortRecords(filtered, state.sortKey, state.direction);
    const pages = Math.max(1, Math.ceil(ordered.length / PAGE_SIZE));
    state.page = Math.min(state.page, pages);
    const rows = ordered.slice((state.page - 1) * PAGE_SIZE, state.page * PAGE_SIZE);
    const body = section.querySelector('tbody');
    body.replaceChildren(...rows.map(record => {
      const row = document.createElement('tr');
      row.append(
        tableCell(record.id), tableCell(record.zone), tableCell(record.type),
        tableCell(decimal.format(record.surface_sqm)), tableCell(euro.format(record.asking_price_eur)),
        tableCell(readableDate(record.listed_at)), tableCell(euro.format(record.asking_price_eur / record.surface_sqm)),
      );
      return row;
    }));
    section.querySelector('.lab-page-info').textContent = `${state.page} / ${pages} · ${integer.format(ordered.length)} record`;
    section.querySelector('.lab-prev').disabled = state.page <= 1;
    section.querySelector('.lab-next').disabled = state.page >= pages;
    section.querySelector('.lab-export').disabled = ordered.length === 0;
    for (const button of section.querySelectorAll('[data-sort]')) {
      button.closest('th').setAttribute('aria-sort', button.dataset.sort === state.sortKey ? state.direction === 'asc' ? 'ascending' : 'descending' : 'none');
    }
  }

  function update() {
    const minValue = form.elements.minArea.value;
    const maxValue = form.elements.maxArea.value;
    const minArea = minValue === '' ? null : Number(minValue);
    const maxArea = maxValue === '' ? null : Number(maxValue);
    const invalidRange = minArea !== null && maxArea !== null && minArea > maxArea;
    section.querySelector('.lab-filter-error').hidden = !invalidRange;
    form.elements.minArea.setAttribute('aria-invalid', String(invalidRange));
    form.elements.maxArea.setAttribute('aria-invalid', String(invalidRange));
    filtered = invalidRange ? [] : filterRecords(records, { zone: form.elements.zone.value, type: form.elements.type.value, minArea, maxArea });
    const summary = summarize(filtered);
    kpi('count', integer.format(summary.count));
    kpi('price', summary.medianPrice === null ? '—' : euro.format(summary.medianPrice));
    kpi('area', summary.medianArea === null ? '—' : `${decimal.format(summary.medianArea)} m²`);
    kpi('sqm', summary.medianPricePerSqm === null ? '—' : `${euro.format(summary.medianPricePerSqm)} / m²`);
    for (const sample of section.querySelectorAll('[data-sample]')) sample.textContent = `n = ${integer.format(summary.count)}`;
    section.querySelector('.lab-selection').textContent = `${integer.format(summary.count)} annunci selezionati su ${integer.format(records.length)} validi${invalidCount ? ` · ${invalidCount} record non validi esclusi` : ''}.`;
    section.querySelector('.lab-empty').hidden = summary.count !== 0 || invalidRange;
    const smallSample = section.querySelector('.lab-small-sample');
    smallSample.hidden = summary.count === 0 || summary.count >= 10;
    smallSample.textContent = `Campione ristretto: ${summary.count} osservazioni. Le mediane vanno lette con cautela.`;
    const zoneList = section.querySelector('.lab-zone-summary');
    zoneList.replaceChildren(...medianByZone(filtered).map(row => {
      const item = document.createElement('li');
      item.textContent = `${row.zone}: ${euro.format(row.medianPricePerSqm)} / m² · n = ${row.count}`;
      return item;
    }));
    renderTable();
    scheduleCharts();
  }

  function bind() {
    form.addEventListener('input', () => { state.page = 1; update(); });
    form.addEventListener('change', () => { state.page = 1; update(); });
    section.querySelector('.lab-reset').addEventListener('click', () => { form.reset(); state.page = 1; update(); });
    section.querySelectorAll('[data-sort]').forEach(button => button.addEventListener('click', () => {
      if (state.sortKey === button.dataset.sort) state.direction = state.direction === 'asc' ? 'desc' : 'asc';
      else { state.sortKey = button.dataset.sort; state.direction = 'asc'; }
      state.page = 1;
      renderTable();
    }));
    section.querySelector('.lab-prev').addEventListener('click', () => { state.page--; renderTable(); });
    section.querySelector('.lab-next').addEventListener('click', () => { state.page++; renderTable(); });
    section.querySelector('.lab-export').addEventListener('click', () => {
      const blob = new Blob(['\uFEFF', toCSV(ordered)], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'annunci-demo-filtrati.csv';
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
    retryCharts.addEventListener('click', startCharts);
    section.querySelector('.lab-retry').addEventListener('click', load);
  }

  async function startCharts() {
    retryCharts.hidden = true;
    chartStatus.textContent = 'Caricamento grafici…';
    try {
      await loadPlotly();
      if (!active()) return;
      plotlyReady = true;
      scheduleCharts();
    } catch {
      if (!active()) return;
      chartStatus.textContent = 'Grafici non disponibili. Gli indicatori e la tabella restano consultabili.';
      retryCharts.hidden = false;
    }
  }

  async function load() {
    if (!active()) return;
    status.hidden = false;
    status.textContent = 'Caricamento del dataset…';
    error.hidden = true;
    try {
      const dataset = await loadDataset(new URL('./annunci-demo.json', import.meta.url), { signal, fetcher });
      if (!active()) return;
      records = dataset.records;
      invalidCount = dataset.invalidCount;
      if (!dataset.metadata.synthetic) {
        section.querySelector('.lab-disclaimer strong').textContent = 'Dati pubblici · fonte documentata';
        section.querySelector('.lab-disclaimer span').textContent = 'Prezzi richiesti, non transazioni concluse. Verifica origine, copertura e limiti nella nota metodologica.';
        section.querySelector('.lab-heading .page-intro').textContent = 'Una dashboard per esplorare annunci di vendita dalla fonte indicata nella nota metodologica.';
      }
      fillOptions(form.elements.zone, records.map(record => record.zone));
      fillOptions(form.elements.type, records.map(record => record.type));
      const method = section.querySelector('.lab-method-copy');
      method.textContent = `Origine: ${dataset.metadata.origin}. Generato il ${new Intl.DateTimeFormat('it-IT', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(dataset.metadata.generatedAt))}. ${integer.format(records.length)} record validi${dataset.invalidCount ? `; ${dataset.invalidCount} esclusi perché incompleti o non validi` : ''}. ${dataset.metadata.synthetic ? 'Solo annunci di vendita simulati.' : 'Annunci di vendita dalla fonte dichiarata; prezzi richiesti, non transazioni concluse.'} Prezzo al m² = prezzo richiesto / superficie di ciascun annuncio; la mediana del prezzo al m² è la mediana di questi rapporti, non il rapporto tra due mediane. Le fasce della distribuzione sono ricalcolate sui record selezionati. ${dataset.metadata.synthetic ? 'Nessuna statistica descrive il mercato reale.' : 'Interpretare i risultati in base a copertura e limiti della fonte.'}`;
      status.hidden = true;
      content.hidden = false;
      update();
      if (records.length) startCharts();
      else chartStatus.textContent = 'Dataset vuoto: nessun grafico da visualizzare.';
    } catch (failure) {
      if (!active()) return;
      status.hidden = true;
      error.hidden = false;
      error.querySelector('p').textContent = failure.message || 'Impossibile caricare i dati.';
    }
  }

  bind();
  load();
  return () => { disposed = true; purgeCharts(nodes); };
}
