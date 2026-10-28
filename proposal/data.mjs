// Contenuti professionali dal CV 2026 e dal brief di Edoardo.
export const person = {
  email: 'edoardorana@outlook.com',
  github: 'https://github.com/edoardorana',
};
export const areas = [
  { id: 'profilo', title: 'Profilo', preview: 'Dalla statistica al lavoro su database e infrastrutture Linux: il mio percorso professionale.' },
  { id: 'approccio', title: 'Approccio', preview: 'Parto dal problema, verifico le informazioni e scelgo strumenti adatti al contesto.' },
  { id: 'progetti', title: 'Progetti', preview: 'Esperienze selezionate, dati della tesi e strumenti per esplorare le tue tabelle.' },
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
  { id: 'immobiliare-data', kind: 'ANNUNCI IMMOBILIARI · MILANO, 2021', title: 'Dashboard interattiva su dati immobiliari', subtitle: 'Dati raccolti tramite script di scraping e utilizzati per la mia tesi di laurea.', tags: ['R', 'Python', 'Dati reali'] },
  { id: 'dashboard-generator', kind: 'STRUMENTO · DATI LOCALI', title: 'Dashboard generator', subtitle: 'Carica un CSV e genera viste interattive, scegliendo colonne e grafici adatti ai tuoi dati.', tags: ['CSV', 'JavaScript', 'Dashboard'] },
  { id: 'production-databases', kind: 'IN CORSO · NETBOX / IPAM', title: 'Gestione degli indirizzi IP con NetBox', subtitle: 'Sto lavorando alla configurazione di NetBox per implementare un IPAM.', context: 'Sto lavorando all’implementazione di un IPAM con NetBox, per organizzare la gestione degli indirizzi IP.', contribution: 'La configurazione è in corso. Documenterò qui i passaggi verificati e le scelte tecniche, usando esempi privi di dati operativi riservati.', output: 'Il prossimo sviluppo che vorrei affrontare è un’infrastruttura locale con Proxmox, come laboratorio personale. È un progetto futuro: al momento non sono disponibili configurazioni o risultati da consultare.', tags: ['NetBox', 'IPAM', 'In corso'] },
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
  if (path === 'home') return { page: 'mappa' };
  if (path === 'laboratorio') return { page: 'progetti' };
  if (path === 'progetti/business-intelligence' || path === 'progetti/sb-italia') return { page: 'profilo' };
  const aliases = { 'progetti/market-data': 'immobiliare-data', 'progetti/csv-explorer': 'dashboard-generator' };
  if (aliases[path]) return { page: 'progetti', item: aliases[path] };
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
