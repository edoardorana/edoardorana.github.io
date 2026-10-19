// Contenuti professionali dal CV 2026 e dal brief di Edoardo.
export const person = {
  email: 'edoardorana@outlook.com',
  github: 'https://github.com/edoardorana',
};
export const areas = [
  { id: 'profilo', title: 'Profilo', preview: 'Dalla statistica al lavoro su database e infrastrutture Linux: il mio percorso professionale.' },
  { id: 'approccio', title: 'Approccio', preview: 'Parto dal problema, verifico le informazioni e scelgo strumenti adatti al contesto.' },
  { id: 'progetti', title: 'Progetti', preview: 'Esperienze selezionate e un laboratorio interattivo per esplorare dati sintetici.' },
  { id: 'contatti', title: 'Collaborazioni', preview: 'Dove scrivermi per parlare di un problema tecnico o di una possibile collaborazione.' },
];
export const steps = [
  { title: 'Capire', short: 'Definire il problema.', text: 'Se una dashboard mostra numeri discordanti, partirei da chi li usa, da come sono definiti gli indicatori e dalle fonti. Prima degli strumenti serve una domanda precisa.', result: 'Una scheda breve con domanda, fonti disponibili e vincoli.', tags: ['Processi', 'Requisiti', 'Priorità'] },
  { title: 'Raccogliere', short: 'Verificare le fonti.', text: 'Per dati da file o API, confronterei formati, valori mancanti e duplicati prima di automatizzare. Lo scraping è un’opzione solo quando consentita e pertinente.', result: 'Tracciato dei dati e controlli di qualità da ripetere.', tags: ['Python', 'SQL', 'Automazioni'] },
  { title: 'Custodire', short: 'Preparare la continuità.', text: 'Per un database o un servizio da mantenere, valuterei permessi, monitoraggio e possibilità di ripristino insieme ai vincoli operativi di chi lo usa.', result: 'Checklist documentata di accessi, controlli e backup.', tags: ['PostgreSQL', 'Linux', 'Backup'] },
  { title: 'Leggere', short: 'Rendere chiari i risultati.', text: 'In una dashboard partirei dalle decisioni da supportare, non dal numero di grafici. Ogni indicatore richiede una definizione e una nota sui limiti dei dati.', result: 'Una vista leggibile con definizioni e limiti annotati.', tags: ['Python / R', 'Dashboard', 'BI'] },
  { title: 'Evolvere', short: 'Provare solo se serve.', text: 'Un modello predittivo o un’integrazione AI sarebbero da valutare solo dopo una soluzione di base verificabile. Questa fase è una possibilità, non un progetto già consegnato.', result: 'Confronto documentato con la soluzione di base, se la prova è utile.', tags: ['Machine learning', 'AI', 'Valutazione'] },
];
export const projects = [
  { id: 'market-data', kind: 'TESI · RACCOLTA DATI', title: 'Tesi sugli annunci immobiliari', subtitle: 'Web scraping per analisi di mercato', context: 'La tesi di laurea in Statistica e Gestione delle Informazioni ha riguardato la raccolta di annunci immobiliari per un’analisi di mercato.', contribution: 'Sviluppo di un programma di web scraping per la raccolta degli annunci nell’ambito della tesi di laurea.', output: 'Dataset, codice e risultati quantitativi della tesi non sono attualmente pubblicati sul sito.', tags: ['Tesi', 'Web scraping'], number: '01' },
  { id: 'business-intelligence', kind: 'SB ITALIA · 2023', title: 'Analisi e dashboard BI', subtitle: 'Business Intelligence e classificazione', context: 'Durante lo stage in SB Italia, da gennaio a novembre 2023, ho lavorato su dataset aziendali e metodi di classificazione.', contribution: 'Analisi dei dati e sviluppo di report e dashboard con Qlik, Power BI e Tableau.', output: 'I dettagli dei progetti aziendali e i relativi dati non sono pubblicati.', tags: ['Qlik', 'Power BI', 'Tableau'], number: '02' },
  { id: 'production-databases', kind: 'BROWAY SA · DAL 2024', title: 'Database e infrastrutture in produzione', subtitle: 'Oracle, PostgreSQL e sistemi Linux', context: 'Da ottobre 2024 a maggio 2025 ho lavorato come Database Administrator su Oracle e PostgreSQL. Da maggio 2025 lavoro come Linux Administrator su infrastrutture e servizi di produzione.', contribution: 'Monitoraggio con checkmk e OEM, diagnosi di anomalie SQL e processi batch, backup e ripristino, gestione degli schemi e supporto ai rilasci. Nel ruolo attuale seguo anche Proxmox VE e Backup Server, script SQL e shell, documentazione tecnica e attività di hardening.', output: 'Configurazioni e dati dei clienti non sono pubblici.', tags: ['Oracle', 'PostgreSQL', 'Proxmox'], number: '03' },
];
export const places = {
  milano: { name: 'Milano', label: 'FORMAZIONE', coordinates: [9.19,45.4642], mapLabel: [420,590], locationType: 'city', text: 'Laurea in Statistica e Gestione delle Informazioni a Milano-Bicocca. Il percorso magistrale in Data Science è in corso.', skills: ['Statistica', 'Python / R', 'Analisi'], dates: '2017–2021 · Laurea triennale\nDal 2021 · Magistrale in corso' },
  norvegia: { name: 'Tromsø', label: 'NORVEGIA · ERASMUS', coordinates: [18.9553,69.6492], mapLabel: [395,225], locationType: 'city', text: 'Ho svolto il periodo Erasmus a Tromsø, in Norvegia, presso UiT The Arctic University of Norway. Il punto indica la città, non il campus o un indirizzo preciso.', skills: ['Erasmus', 'Studio all’estero'], dates: 'Agosto 2021 – agosto 2022' },
  svizzera: { name: 'Zugo', label: 'SVIZZERA · DA REMOTO', coordinates: [8.5155,47.1662], mapLabel: [120,525], locationType: 'remote', text: 'Zugo è il riferimento geografico dell’azienda svizzera Broway SA, con cui lavoro da remoto dall’ottobre 2024. Il punto non indica una mia sede di lavoro.', skills: ['Database', 'Monitoraggio', 'Recovery'], dates: 'Ottobre 2024 – oggi · da remoto' },
  stoccarda: { name: 'Stoccarda', label: 'SOGGIORNO IN GERMANIA', coordinates: [9.1829,48.7758], mapLabel: [420,455], locationType: 'stay', text: 'Il soggiorno a Stoccarda è iniziato a ottobre 2026, con conclusione prevista alla fine dell’anno. Questa tappa non indica un nuovo impiego.', skills: ['Soggiorno', 'Germania'], dates: 'Da ottobre 2026\nFine soggiorno prevista: circa 31 dicembre 2026' },
};
export function parseRoute(hash = '') {
  const path = hash.replace(/^#\/?/, '').replace(/\/$/, '');
  if (!path || path === 'mappa') return { page: 'mappa' };
  if (path === 'percorso') return { page: 'percorso' };
  if (path === 'laboratorio') return { page: 'laboratorio' };
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
