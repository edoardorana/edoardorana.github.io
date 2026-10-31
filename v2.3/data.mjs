// Contenuti professionali dal CV 2026 e dal brief di Edoardo.
export const person = {
  email: 'edoardorana@outlook.com',
  github: 'https://github.com/edoardorana',
};
export const areas = [
  { id: 'profilo', title: 'Profilo' },
  { id: 'progetti', title: 'Progetti' },
  { id: 'approccio', title: 'Approccio' },
  { id: 'contatti', title: 'Collaborazioni' },
];
export const steps = [
  {
    "title": "Capire",
    "short": "Definire il problema.",
    "text": "Chiarisco chi usa il sistema, quale decisione deve prendere e cosa impedisce di farlo. Concordo obiettivo, vincoli e criteri di verifica prima di scegliere gli strumenti.",
    "result": "Questionario e scheda di avvio con obiettivo, responsabili e criteri di accettazione.",
    "tags": [
      "Requisiti",
      "Processi",
      "Priorità"
    ]
  },
  {
    "title": "Raccogliere",
    "short": "Tracciare il percorso dei dati.",
    "text": "Identifico fonti, formati e responsabili. Documento accessi, trasformazioni e destinazioni; verifico completezza, duplicati e frequenza di aggiornamento.",
    "result": "Mappa del flusso dati e registro dei controlli.",
    "tags": [
      "Fonti",
      "SQL",
      "Automazione"
    ]
  },
  {
    "title": "Custodire",
    "short": "Preparare il ripristino.",
    "text": "Definisco accessi, monitoraggio e responsabilità. Pianifico copie separate dal sistema principale e verifico il ripristino rispetto ai tempi concordati.",
    "result": "Matrice degli accessi, piano backup e verbale della prova di ripristino.",
    "tags": [
      "Accessi",
      "Backup",
      "Continuità"
    ]
  },
  {
    "title": "Leggere",
    "short": "Collegare dati e decisioni.",
    "text": "Scelgo indicatori e grafici a partire dalle domande degli utenti. Rendo leggibili unità, filtri e definizioni, verificando ogni numero rispetto alla fonte.",
    "result": "Bozza di dashboard con indicatori, filtri e criteri di lettura.",
    "tags": [
      "Dashboard",
      "Indicatori",
      "BI"
    ]
  },
  {
    "title": "Evolvere",
    "short": "Verificare il passo successivo.",
    "text": "Raccolgo osservazioni dopo il rilascio e confronto le modifiche con una base misurabile. La scheda propone una traccia di revisione da affinare.",
    "result": "Bozza di piano di revisione: priorità, verifica e ritorno alla versione precedente.",
    "tags": [
      "Revisione",
      "Misure",
      "Miglioramenti"
    ]
  }
];
export const projects = [
  { id: 'immobiliare-data', kind: 'ANNUNCI IMMOBILIARI · MILANO, 2021', title: 'Dashboard interattiva su dati immobiliari', subtitle: 'Dati raccolti tramite script di scraping e utilizzati per la mia tesi di laurea.', tags: ['R', 'Python', 'Dati reali'] },
  { id: 'dashboard-generator', kind: 'STRUMENTO · DATI LOCALI', title: 'Dashboard generator', subtitle: 'Carica un CSV e genera viste interattive, scegliendo colonne e grafici adatti ai tuoi dati.', tags: ['CSV', 'JavaScript', 'Dashboard'] },
];

export const services = {
  offerings: [
    { title: 'Infrastrutture', description: 'Progettazione e gestione di server Linux, monitoraggio e recovery.', tags: ['Linux', 'Backup', 'Monitoraggio'] },
    { title: 'Database', description: 'Modellazione, ottimizzazione e migrazione di basi dati SQL.', tags: ['SQL', 'Ottimizzazione', 'Migrazione'] },
    { title: 'Automazione', description: 'Script Python e Bash per pipeline di dati e processi ripetibili.', tags: ['Python', 'Bash', 'Pipeline'] },
    { title: 'Analisi dati', description: 'Raccolta, pulizia e analisi dati con R, Python e dashboard interattive.', tags: ['R', 'Python', 'Dashboard'] },
  ]
};
export const places = {
  milano: { name: 'Milano', label: 'FORMAZIONE', coordinates: [9.19,45.4642], mapLabel: [420,590], locationType: 'city', text: "A Milano-Bicocca ho costruito le basi di statistica, programmazione e analisi dei dati. Dopo la laurea triennale ho proseguito con il percorso magistrale in Data Science, tuttora in corso.", skills: ['Statistica', 'Python / R', 'Analisi'], dates: '2017–2021 · Laurea triennale\nDal 2021 · Magistrale in corso' },
  norvegia: { name: 'Tromsø', label: 'NORVEGIA · ERASMUS', coordinates: [18.9553,69.6492], mapLabel: [395,225], locationType: 'city', text: "A Tromsø, in Norvegia, ho svolto un anno Erasmus presso UiT The Arctic University of Norway. Un periodo di studio in un contesto internazionale, parte del mio percorso universitario.", skills: ['Erasmus', 'Studio all’estero'], dates: 'Agosto 2021 – agosto 2022' },
  svizzera: { name: 'Zugo', label: 'SVIZZERA', coordinates: [8.5155,47.1662], mapLabel: [120,525], locationType: 'remote', text: "Zugo è il riferimento di Broway SA, l’azienda svizzera con cui lavoro da remoto dall’ottobre 2024. Il percorso professionale è iniziato sui database ed è proseguito sulle infrastrutture Linux.", skills: ['Database', 'Monitoraggio', 'Recovery'], dates: 'Ottobre 2024 – oggi · da remoto' },
  stoccarda: { name: 'Stoccarda', label: 'GERMANIA', coordinates: [9.1829,48.7758], mapLabel: [420,455], locationType: 'stay', text: "Da ottobre 2026 trascorro un periodo personale a Stoccarda, con rientro previsto alla fine dell’anno. Una tappa distinta dalle esperienze professionali e universitarie.", skills: ['Esperienza personale', 'Germania'], dates: 'Da ottobre 2026\nFine soggiorno prevista: circa 31 dicembre 2026' },
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
