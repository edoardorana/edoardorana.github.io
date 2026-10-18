// Contenuti professionali dal CV 2026 e dal brief di Edoardo.
export const person = {
  name: 'Edoardo Rana', email: 'edoardorana@outlook.com',
  github: 'https://github.com/edoardorana',
  title: 'Consulente IT · Infrastrutture, dati e automazione',
};
export const areas = [
  { id: 'profilo', number: '01', title: 'Profilo', note: 'Esperienza e competenze', word: 'ESPERIENZA', preview: 'Infrastrutture Linux, database e analisi dati, con una precedente formazione in amministrazione e contabilità.' },
  { id: 'approccio', number: '02', title: 'Approccio', note: 'Metodo di lavoro', word: 'METODO', preview: 'Definizione del problema, verifica dei dati disponibili e scelta di strumenti proporzionati al contesto.' },
  { id: 'percorso', number: '03', title: 'Percorso', note: 'Formazione e lavoro', word: 'TAPPE', preview: 'Studi a Milano e in Norvegia, lavoro da remoto per un’azienda svizzera e soggiorno a Stoccarda.' },
  { id: 'progetti', number: '04', title: 'Progetti', note: 'Esperienze selezionate', word: 'SCHEDE', preview: 'Tre schede su raccolta dati, Business Intelligence e amministrazione di database.' },
  { id: 'contatti', number: '05', title: 'Collaborazioni', note: 'Contatti', word: 'CONTATTI', preview: 'Un indirizzo email diretto per proposte, domande e possibili collaborazioni.' },
];
export const steps = [
  { title: 'Capire', short: 'Definire il problema.', text: 'Identifico le attività coinvolte, chi utilizzerà il risultato e quali decisioni deve supportare. Questo permette di delimitare un primo intervento.', result: 'Obiettivo, vincoli e fonti individuati.', tags: ['Processi', 'Requisiti', 'Priorità'] },
  { title: 'Raccogliere', short: 'Acquisire e verificare i dati.', text: 'Valuto API, script o scraping dove consentito. Controllo formato, completezza e duplicati prima di automatizzare la raccolta.', result: 'Fonti verificate e processo di raccolta ripetibile.', tags: ['Python', 'SQL', 'Automazioni'] },
  { title: 'Custodire', short: 'Gestire dati e accessi.', text: 'Definisco struttura, permessi, monitoraggio e procedure di backup e ripristino in base al sistema e ai suoi vincoli operativi.', result: 'Procedure e controlli documentati.', tags: ['PostgreSQL', 'Linux', 'Backup'] },
  { title: 'Leggere', short: 'Presentare i risultati.', text: 'Organizzo indicatori e visualizzazioni attorno alle domande da risolvere. Esplicito anche i limiti dei dati e delle elaborazioni.', result: 'Una lettura dei risultati comprensibile e verificabile.', tags: ['Python / R', 'Dashboard', 'BI'] },
  { title: 'Evolvere', short: 'Valutare nuove soluzioni.', text: 'Se dati e problema lo giustificano, posso valutare un modello predittivo o un’integrazione AI. Un prototipo va confrontato con una soluzione di base prima di decidere.', result: 'Esito documentato della prova di fattibilità.', tags: ['Machine learning', 'AI', 'Valutazione'] },
];
export const projects = [
  { id: 'market-data', kind: 'TESI · RACCOLTA DATI', title: 'Tesi sugli annunci immobiliari', subtitle: 'Web scraping per analisi di mercato', context: 'La tesi di laurea in Statistica e Gestione delle Informazioni ha riguardato la raccolta di annunci immobiliari per un’analisi di mercato.', contribution: 'Sviluppo di un programma di web scraping per la raccolta degli annunci nell’ambito della tesi di laurea.', output: 'Dataset, codice e risultati quantitativi della tesi non sono attualmente pubblicati sul sito.', tags: ['Python', 'R', 'SQL'], number: '01' },
  { id: 'business-intelligence', kind: 'SB ITALIA · 2023', title: 'Analisi e dashboard BI', subtitle: 'Business Intelligence e classificazione', context: 'Durante lo stage in SB Italia, da gennaio a novembre 2023, ho lavorato su dataset aziendali e metodi di classificazione.', contribution: 'Analisi dei dati e sviluppo di report e dashboard con Qlik, Power BI e Tableau.', output: 'I dettagli dei progetti aziendali e i relativi dati non sono pubblicati.', tags: ['Qlik', 'Power BI', 'Tableau'], number: '02' },
  { id: 'production-databases', kind: 'BROWAY SA · DAL 2024', title: 'Database e infrastrutture in produzione', subtitle: 'Oracle, PostgreSQL e sistemi Linux', context: 'Da ottobre 2024 a maggio 2025 ho lavorato come Database Administrator su Oracle e PostgreSQL. Da maggio 2025 lavoro come Linux Administrator su infrastrutture e servizi di produzione.', contribution: 'Monitoraggio con checkmk e OEM, diagnosi di anomalie SQL e processi batch, backup e ripristino, gestione degli schemi e supporto ai rilasci. Nel ruolo attuale seguo anche Proxmox VE e Backup Server, script SQL e shell, documentazione tecnica e attività di hardening.', output: 'La scheda descrive le attività svolte senza pubblicare configurazioni o dati dei clienti.', tags: ['Oracle', 'PostgreSQL', 'Proxmox'], number: '03' },
];
export const places = {
  milano: { name: 'Milano', label: 'FORMAZIONE', coordinates: [9.19,45.4642], mapLabel: [420,590], locationType: 'city', text: 'Laurea in Statistica e Gestione delle Informazioni a Milano-Bicocca. Il percorso magistrale in Data Science è in corso.', skills: ['Statistica', 'Python / R', 'Analisi'], dates: '2017–2021 · Laurea triennale\nDal 2021 · Magistrale in corso' },
  norvegia: { name: 'Norvegia', label: 'ERASMUS', coordinates: [12,65], mapLabel: [395,225], locationType: 'country', text: 'Periodo Erasmus presso UiT The Arctic University of Norway, con un anno di studio all’estero.', skills: ['Erasmus', 'Studio all’estero'], dates: 'Agosto 2021 – agosto 2022' },
  svizzera: { name: 'Svizzera', label: 'LAVORO DA REMOTO', coordinates: [8.23,46.82], mapLabel: [120,525], locationType: 'remote', text: 'Broway SA è un’azienda svizzera per cui lavoro da remoto dall’ottobre 2024. Il punto sulla mappa indica il paese dell’azienda, non una sede di lavoro.', skills: ['Database', 'Monitoraggio', 'Recovery'], dates: 'Ottobre 2024 – oggi · da remoto' },
  stoccarda: { name: 'Stoccarda', label: 'SOGGIORNO IN GERMANIA', coordinates: [9.1829,48.7758], mapLabel: [420,455], locationType: 'stay', text: 'Vivo a Stoccarda da inizio ottobre 2026, con una permanenza prevista fino alla fine dell’anno. Questa tappa riguarda il soggiorno, non un nuovo impiego.', skills: ['Soggiorno', 'Germania'], dates: 'Ottobre 2026 – in corso\nFine soggiorno prevista: circa 31 dicembre 2026' },
};
export function parseRoute(hash = '') {
  const path = hash.replace(/^#\/?/, '').replace(/\/$/, '');
  if (!path || path === 'mappa') return { page: 'mappa' };
  const [page, item, ...rest] = path.split('/');
  if (rest.length || !areas.some(area => area.id === page)) return { page: 'not-found' };
  if (item && (page !== 'progetti' || !projects.some(project => project.id === item))) return { page: 'not-found' };
  return item ? { page, item } : { page };
}
export function mailto(subject, body = '') {
  return `mailto:${person.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
// Shared projection with europe.svg: viewBox 600 × 650, Mercator, scale 500.
export function mapPoint([longitude, latitude]) {
  const mercator = degrees => Math.log(Math.tan(Math.PI / 4 + degrees * Math.PI / 360));
  return [(longitude + 20) * Math.PI / 180 * 500, (mercator(73) - mercator(latitude)) * 500];
}
