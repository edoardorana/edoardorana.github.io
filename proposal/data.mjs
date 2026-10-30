// Contenuti professionali dal CV 2026 e dal brief di Edoardo.
export const person = {
  email: 'edoardorana@outlook.com',
  github: 'https://github.com/edoardorana',
};

// Available services for freelance work
export const services = {
  title: 'Servizi',
  introduction: 'Offro consulenza tecnica specializzata in infrastrutture, dati e automazione. Lavoro con aziende e professionisti per risolvere problemi tecnici, ottimizzare processi e costruire strumenti che supportano le decisioni.',
  availability: {
    status: 'Disponibile',
    responseTime: 'Risposta entro 24-48 ore',
    location: 'Remoto (preferibile) o on-site a Milano e dintorni',
    rates: 'Tariffe su preventivo in base a complessita e durata',
  },
  offerings: [
    {
      id: 'database-management',
      title: 'Gestione Database',
      description: 'Manutenzione, monitoraggio e ottimizzazione di database Oracle, PostgreSQL e MySQL/MariaDB. Backup, ripristino, tuning delle query e risoluzione di errori.',
      tags: ['Oracle', 'PostgreSQL', 'MySQL', 'MariaDB', 'SQL', 'Backup', 'Recovery'],
      deliverables: ['Piano di manutenzione', 'Ottimizzazione query', 'Documentazione tecnica', 'Prove di ripristino'],
    },
    {
      id: 'linux-infrastructure',
      title: 'Infrastrutture Linux',
      description: 'Configurazione e gestione di server Linux, Proxmox VE, monitoraggio con checkmk. Virtualizzazione, storage S3-compatibile e sicurezza operativa.',
      tags: ['Debian', 'Proxmox VE', 'checkmk', 'Virtualizzazione', 'Storage', 'Sicurezza'],
      deliverables: ['Configurazione server', 'Piano di monitoraggio', 'Documentazione infrastruttura', 'Script di automazione'],
    },
    {
      id: 'data-pipelines',
      title: 'Pipeline Dati',
      description: 'Raccolta, pulizia e trasformazione di dati da varie fonti. Automazione di processi ETL con Bash, Python e SQL. Integrazione con sistemi esistenti.',
      tags: ['ETL', 'Python', 'Bash', 'SQL', 'Automazione', 'Scraping'],
      deliverables: ['Script di automazione', 'Documentazione flusso dati', 'Controlli di qualita', 'Dashboard di monitoraggio'],
    },
    {
      id: 'dashboards-bi',
      title: 'Dashboard e BI',
      description: 'Creazione di dashboard interattive per l\'analisi dei dati. Visualizzazione di KPI, indicatori e trend con Plotly, Power BI, Qlik Sense o Tableau.',
      tags: ['Dashboard', 'Plotly', 'Power BI', 'Qlik Sense', 'Tableau', 'KPI', 'Visualizzazione'],
      deliverables: ['Dashboard interattiva', 'Definizione KPI', 'Documentazione lettura', 'Esportazione dati'],
    },
    {
      id: 'ipam-netbox',
      title: 'Gestione Indirizzi IP (IPAM)',
      description: 'Implementazione e configurazione di NetBox per la gestione centralizzata degli indirizzi IP. Organizzazione di device, racks e connessioni di rete.',
      tags: ['NetBox', 'IPAM', 'Rete', 'Infrastruttura', 'Documentazione'],
      deliverables: ['Configurazione NetBox', 'Documentazione rete', 'Piano indirizzamento IP', 'Integrazione con altri sistemi'],
    },
    {
      id: 'training-consulting',
      title: 'Formazione e Consulenza',
      description: 'Formazione su strumenti e metodologie: SQL, Linux, database management, analisi dati. Consulenza su scelte tecnologiche e architetture.',
      tags: ['Formazione', 'SQL', 'Linux', 'Database', 'Consulenza', 'Architettura'],
      deliverables: ['Materiale formativo', 'Sessioni di training', 'Documentazione processi', 'Raccomandazioni tecniche'],
    },
  ],
  process: {
    title: 'Come lavoro',
    steps: [
      { step: '1', title: 'Analisi iniziale', text: 'Valutazione gratuita delle esigenze e definizione degli obiettivi.' },
      { step: '2', title: 'Preventivo', text: 'Proposta dettagliata con tempi, costi e deliverable.' },
      { step: '3', title: 'Esecuzione', text: 'Lavoro incrementale con aggiornamenti regolari.' },
      { step: '4', title: 'Consegna', text: 'Documentazione completa e sessione di review.' },
      { step: '5', title: 'Supporto', text: 'Assistenza post-consegna e manutenzione opzionale.' },
    ],
  },
  cta: {
    primary: 'Contattami per un preventivo gratuito',
    secondary: 'Scopri i miei progetti',
  },
};

export const areas = [
  { id: 'profilo', title: 'Profilo' },
  { id: 'servizi', title: 'Servizi' },
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
      "Priorita"
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
    "text": "Definisco accessi, monitoraggio e responsabilita. Pianifico copie separate dal sistema principale e verifico il ripristino rispetto ai tempi concordati.",
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
    "text": "Scelgo indicatori e grafici a partire dalle domande degli utenti. Rendo leggibili unita, filtri e definizioni, verificando ogni numero rispetto alla fonte.",
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
    "result": "Bozza di piano di revisione: priorita, verifica e ritorno alla versione precedente.",
    "tags": [
      "Revisione",
      "Misure",
      "Miglioramenti"
    ]
  }
];

export const projects = [
  {
    id: 'immobiliare-data',
    kind: 'PROGETTO ACCADEMICO · MILANO, 2021',
    title: 'Dashboard interattiva su dati immobiliari',
    subtitle: 'Analisi di 720 annunci immobiliari raccolti tramite web scraping per la tesi di laurea in Statistica.',
    description: 'Questo progetto nasce come lavoro per la mia tesi di laurea triennale in Statistica e Gestione delle Informazioni. Ho sviluppato uno script di scraping in R per raccogliere dati reali da portali immobiliari, pulito e organizzato il dataset, e creato una dashboard interattiva per l\'analisi esplorativa del mercato immobiliare milanese.',
    tags: ['R', 'Python', 'Web Scraping', 'Analisi dei dati', 'Visualizzazione'],
    caseStudy: {
      problem: 'Analizzare il mercato immobiliare milanese attraverso dati reali',
      solution: 'Raccolta automatizzata di 720 annunci, pulizia dati, analisi statistica e visualizzazione interattiva',
      results: [
        'Dataset strutturato con 720 record e 20+ variabili',
        'Identificazione di trend di prezzo per zona e tipologia',
        'Analisi dei fattori che influenzano il prezzo al mq',
        'Dashboard interattiva con filtri e visualizzazioni dinamiche',
      ],
      technologies: ['R', 'rvest', 'dplyr', 'ggplot2', 'Plotly (R)'],
      verification: {
        available: true,
        type: 'Demo interattiva',
        link: '#/progetti/immobiliare-data',
        note: 'Dashboard funzionante con dati sintetici che mantengono la struttura del dataset originale',
      },
    },
    links: [
      { text: 'Apri la dashboard', href: '#/progetti/immobiliare-data' },
    ],
  },
  {
    id: 'dashboard-generator',
    kind: 'STRUMENTO OPEN SOURCE · DATI LOCALI',
    title: 'Dashboard Generator',
    subtitle: 'Strumento web per creare dashboard interattive da qualsiasi file CSV, senza server.',
    description: 'Dashboard Generator e uno strumento locale che permette a chiunque di caricare un file CSV e generare automaticamente visualizzazioni interattive. Il tool analizza la struttura dei dati, suggerisce i grafici piu adatti e permette di personalizzare le viste secondo le proprie esigenze.',
    tags: ['JavaScript', 'CSV', 'Dashboard', 'Plotly', 'Analisi esplorativa'],
    caseStudy: {
      problem: 'Permettere a non tecnici di esplorare i propri dati senza dover imparare strumenti complessi',
      solution: 'Applicazione web completamente client-side che direttamente nel browser analizza CSV, inferisce tipi di dati e genera visualizzazioni appropriate',
      results: [
        'Parsing automatico di CSV con rilevamento separatori e encoding',
        'Suggerimento intelligente di tipologie di grafico',
        'Filtri dinamici coordinati tra tutti gli elementi',
        'Esportazione in PNG e CSV dei risultati',
        'Nessun dato viene inviato a server esterni',
      ],
      technologies: ['JavaScript (ES modules)', 'Plotly.js', 'Browser API'],
      verification: {
        available: true,
        type: 'Demo online',
        link: '#/progetti/dashboard-generator',
        note: 'Funziona completamente offline. Provalo con i tuoi dati!',
      },
    },
    links: [
      { text: 'Prova lo strumento', href: '#/progetti/dashboard-generator' },
    ],
  },
  {
    id: 'production-databases',
    kind: 'IN CORSO · INFRASTRUTTURA',
    title: 'Gestione degli indirizzi IP con NetBox',
    subtitle: 'Implementazione di un sistema IPAM (IP Address Management) per la gestione centralizzata della rete.',
    description: 'Sto lavorando alla configurazione di NetBox, una piattaforma open-source per la gestione degli indirizzi IP e delle infrastrutture di rete. Questo progetto mira a organizzare e documentare in modo sistematico gli asset di rete, semplificando la gestione e il monitoraggio.',
    tags: ['NetBox', 'IPAM', 'Rete', 'Infrastruttura', 'Python', 'Django'],
    caseStudy: {
      problem: 'Centralizzare la gestione degli indirizzi IP e delle risorse di rete in un\'unica piattaforma',
      solution: 'Deploy e configurazione di NetBox con definizione di device, indirizzi IP, VLAN, racks e connessioni',
      results: [
        'Struttura gerarchica per l\'organizzazione degli asset',
        'Documentazione automatica della topologia di rete',
        'API REST per l\'integrazione con altri sistemi',
        'Interfaccia web intuitiva per la gestione quotidiana',
      ],
      technologies: ['NetBox', 'PostgreSQL', 'Django', 'Python', 'Nginx'],
      verification: {
        available: false,
        type: 'Documentazione in corso',
        note: 'Configurazione in fase di sviluppo. Documentazione dettagliata verra pubblicata al completamento.',
      },
    },
    links: [
      { text: 'Documentazione NetBox', href: 'https://netbox.dev/', external: true },
    ],
  },
];

export const places = {
  milano: { 
    name: 'Milano', 
    label: 'FORMAZIONE', 
    coordinates: [9.19,45.4642], 
    mapLabel: [420,590], 
    locationType: 'city', 
    text: "A Milano-Bicocca ho costruito le basi di statistica, programmazione e analisi dei dati. Dopo la laurea triennale ho proseguito con il percorso magistrale in Data Science, tuttora in corso.", 
    skills: ['Statistica', 'Python / R', 'Analisi'], 
    dates: '2017-2021 · Laurea triennale\nDal 2021 · Magistrale in corso' 
  },
  norvegia: { 
    name: 'Tromsø', 
    label: 'NORVEGIA · ERASMUS', 
    coordinates: [18.9553,69.6492], 
    mapLabel: [395,225], 
    locationType: 'city', 
    text: "A Tromsø, in Norvegia, ho svolto un anno Erasmus presso UiT The Arctic University of Norway. Un periodo di studio in un contesto internazionale, parte del mio percorso universitario.", 
    skills: ['Erasmus', 'Studio all’estero'], 
    dates: 'Agosto 2021 - agosto 2022' 
  },
  svizzera: { 
    name: 'Zugo', 
    label: 'SVIZZERA', 
    coordinates: [8.5155,47.1662], 
    mapLabel: [120,525], 
    locationType: 'remote', 
    text: "Zugo e il riferimento di Broway SA, lazienda svizzera con cui lavoro da remoto dallottobre 2024. Il percorso professionale e iniziato sui database ed e proseguito sulle infrastrutture Linux.", 
    skills: ['Database', 'Monitoraggio', 'Recovery'], 
    dates: 'Ottobre 2024 - oggi · da remoto' 
  },
  stoccarda: { 
    name: 'Stoccarda', 
    label: 'GERMANIA', 
    coordinates: [9.1829,48.7758], 
    mapLabel: [420,455], 
    locationType: 'stay', 
    text: "Da ottobre 2026 trascorro un periodo personale a Stoccarda, con rientro previsto alla fine dellanno. Una tappa distinta dalle esperienze professionali e universitarie.", 
    skills: ['Esperienza personale', 'Germania'], 
    dates: 'Da ottobre 2026\nFine soggiorno prevista: circa 31 dicembre 2026' 
  },
};

export function parseRoute(hash = '') {
  const path = hash.replace(/^#\/?/, '').replace(/\/$/, '');
  if (!path || path === 'mappa') return { page: 'mappa' };
  if (path === 'percorso') return { page: 'percorso' };
  if (path === 'home') return { page: 'mappa' };
  if (path === 'laboratorio') return { page: 'progetti' };
  if (path === 'progetti/business-intelligence' || path === 'progetti/sb-italia') return { page: 'profilo' };
  
  const aliases = { 
    'progetti/market-data': 'immobiliare-data', 
    'progetti/csv-explorer': 'dashboard-generator' 
  };
  if (aliases[path]) return { page: 'progetti', item: aliases[path] };
  
  const [page, item, ...rest] = path.split('/');
  if (rest.length || !areas.some(area => area.id === page)) return { page: 'not-found' };
  if (item && (page !== 'progetti' || !projects.some(project => project.id === item))) return { page: 'not-found' };
  
  return item ? { page, item } : { page };
}

export function mailto(subject, body = '') {
  return `mailto:${person.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Shared projection with europe.svg: viewBox 600 x 650, Mercator, scale 500.
export function mapPoint([longitude, latitude]) {
  const mercator = degrees => Math.log(Math.tan(Math.PI / 4 + degrees * Math.PI / 360));
  return [(longitude + 20) * Math.PI / 180 * 500, (mercator(73) - mercator(latitude)) * 500];
}
