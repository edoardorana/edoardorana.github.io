// Contenuti professionali dal CV 2026 e dal brief di Edoardo.
export const person = {
  name: 'Edoardo Rana', email: 'edoardorana@outlook.com',
  github: 'https://github.com/edoardorana',
  title: 'Linux Administrator · Data Analyst',
};
export const areas = [
  { id: 'profilo', number: '01', title: 'Profilo', note: 'La persona dietro i dati', word: 'CONOSCIAMOCI' },
  { id: 'approccio', number: '02', title: 'Approccio', note: 'Dal problema alla soluzione', word: 'COME LAVORO' },
  { id: 'percorso', number: '03', title: 'Percorso', note: 'Luoghi, incontri, competenze', word: 'LE MIE COORDINATE' },
  { id: 'progetti', number: '04', title: 'Progetti', note: 'Le idee messe in pratica', word: 'DENTRO IL LAVORO' },
  { id: 'contatti', number: '05', title: 'Collaboriamo', note: 'La prossima connessione', word: 'PARTIAMO DA QUI' },
];
export const steps = [
  { title: 'Capire', short: 'Il problema prima dello strumento.', text: 'Parto da chi usa i dati, dalle attività ripetitive e dalle decisioni da prendere. Un confronto iniziale serve a delimitare il problema e scegliere un primo intervento utile.', result: 'Una domanda precisa, fonti individuate e un obiettivo condiviso.', tags: ['Processi', 'Domande', 'Priorità'] },
  { title: 'Raccogliere', short: 'Mettere le fonti in comunicazione.', text: 'API, script e scraping dove consentito per raccogliere informazioni. Controlli su formato, completezza e duplicati, con automatismi che riducano i passaggi manuali.', result: 'Dati organizzati e un flusso ripetibile.', tags: ['Python', 'SQL', 'Automazioni'] },
  { title: 'Custodire', short: 'Dare continuità al dato.', text: 'Database, accessi controllati, monitoraggio e strategie di backup e ripristino proporzionate al contesto. È il punto in cui analisi e infrastruttura si incontrano.', result: 'Una base gestibile, con controlli e procedure documentate.', tags: ['PostgreSQL', 'Linux', 'Backup'] },
  { title: 'Leggere', short: 'Rendere visibile ciò che conta.', text: 'Indicatori, dashboard e grafici costruiti sulle domande del cliente. Python, R o strumenti BI per rendere esplorabili andamenti e differenze.', result: 'Una lettura chiara dei dati e dei loro limiti.', tags: ['Python / R', 'Dashboard', 'BI'] },
  { title: 'Evolvere', short: 'Sperimentare con un obiettivo.', text: 'Quando i dati lo permettono, valutiamo modelli predittivi e integrazioni AI. Si parte da una soluzione di base e si misura se un prototipo aggiunge valore.', result: 'Una verifica di fattibilità, prima di investire in complessità.', tags: ['Machine learning', 'AI', 'Valutazione'] },
];
export const projects = [
  { id: 'market-data', kind: 'TESI · RACCOLTA DATI', title: 'Dal web a un dataset.', subtitle: 'Web scraping per analisi di mercato', context: 'La tesi di laurea in Statistica e Gestione delle Informazioni ha affrontato la raccolta di dati per analisi di mercato.', contribution: 'Sviluppo di un programma di web scraping di annunci immobiliari, raccontato nel precedente CV, con Python, R e SQL indicati nel CV aggiornato.', output: 'Un lavoro di tesi che collega raccolta ed elaborazione dei dati. Dataset, codice e risultati quantitativi non sono ancora pubblicati qui.', tags: ['Python', 'R', 'SQL'], number: '01' },
  { id: 'business-intelligence', kind: 'SB ITALIA · 2023', title: 'Dai numeri a una vista utile.', subtitle: 'Analisi dati e Business Intelligence', context: 'Durante lo stage in SB Italia, da gennaio a novembre 2023, ho lavorato su analisi dei dati e algoritmi di classificazione.', contribution: 'Analisi dei dati e sviluppo di dashboard con Qlik, Power BI e Tableau.', output: 'Esperienza nella costruzione di viste BI e nell’utilizzo di metodi di classificazione. I dettagli dei progetti aziendali non sono pubblicati.', tags: ['Qlik', 'Power BI', 'Tableau'], number: '02' },
  { id: 'production-databases', kind: 'BROWAY SA · DAL 2024', title: 'Il dato, ogni giorno.', subtitle: 'Database e continuità operativa', context: 'Da ottobre 2024 a maggio 2025 ho lavorato come Database Administrator in Broway SA, su ambienti di produzione Oracle e PostgreSQL. Da maggio 2025 ricopro il ruolo di Linux Administrator.', contribution: 'Manutenzione, monitoraggio con checkmk e OEM, diagnosi di script SQL e processi batch. Attività di backup, recovery, gestione schemi e supporto ai rilasci su Linux.', output: 'Attività continuativa in ambienti di produzione. Questa scheda descrive il mio ruolo senza esporre configurazioni o dati dei clienti.', tags: ['Oracle', 'PostgreSQL', 'Linux'], number: '03' },
];
export const places = {
  milano: { name: 'Milano', label: 'FORMAZIONE & PRIME ESPERIENZE', coordinates: [9.19,45.4642], mapLabel: [420,590], locationType: 'city', text: 'La formazione in Statistica e il percorso in Data Science a Milano-Bicocca. Il punto di partenza del mio interesse per il dato e per il suo utilizzo.', skills: ['Statistica', 'Python / R', 'Analisi'], dates: '2017–2021 · Laurea triennale\nDal 2021 · Magistrale in corso' },
  norvegia: { name: 'Norvegia', label: 'UN ANNO DI ERASMUS', coordinates: [12,65], mapLabel: [395,225], locationType: 'country', text: 'Da agosto 2021 ad agosto 2022, Erasmus presso l’Arctic University of Norway. Studio, vita all’estero e confronto con persone e contesti diversi.', skills: ['Autonomia', 'Inglese', 'Adattabilità'], dates: 'Agosto 2021 – agosto 2022' },
  svizzera: { name: 'Svizzera', label: 'DATABASE & INFRASTRUTTURE', coordinates: [8.23,46.82], mapLabel: [120,525], locationType: 'remote', text: 'La collaborazione con Broway SA, svolta da remoto, aggiunge al percorso l’esperienza nella gestione dei sistemi che ospitano i dati. Il punto indica il paese dell’azienda, non una sede fisica di lavoro.', skills: ['Database', 'Monitoraggio', 'Recovery'], dates: 'Ottobre 2024 – oggi · da remoto' },
  stoccarda: { name: 'Stoccarda', label: 'GERMANIA · VITA ALL’ESTERO', coordinates: [9.1829,48.7758], mapLabel: [420,455], locationType: 'stay', text: 'Da inizio ottobre 2026 vivo a Stoccarda, in Germania. Una nuova tappa di vita all’estero, con permanenza prevista fino alla fine dell’anno. Il punto racconta dove vivo, non una nuova posizione lavorativa.', skills: ['Vita all’estero', 'Contesto internazionale'], dates: 'Ottobre 2026 – in corso\nFine soggiorno prevista: circa 31 dicembre 2026' },
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
