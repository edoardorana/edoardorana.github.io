# WEB-CV — contesto condiviso

## Obiettivo

Portfolio personale di Edoardo Rana per presentarsi, proporre collaborazioni e sviluppare un'attività freelance. In seguito: brochure da distribuire a Milano e in altre città europee, con QR verso un URL pubblico stabile.

## Decisioni prese con Edoardo l'11 ottobre 2026

La prima landing page è stata valutata circa 6–6,5/10: messaggio e struttura dei contenuti corretti, forma troppo standard. Il concept interattivo successivo è stato apprezzato. La direzione scelta è **una mappa con aree da esplorare**, sobria e minimale, con sezioni in cui entrare e collegamenti significativi.

- Quattro aree visibili: Profilo, Approccio, Progetti, Collaborazioni. Profilo comprende anche luoghi, formazione e cronologia prima raccolti in Percorso.
- La griglia di navigazione è distinta dalla mappa geografica inclusa nel Profilo.
- Ogni sezione ha un URL condivisibile e un ritorno alla Home.
- Tono personale in prima persona, comprensibile a potenziali clienti non tecnici.
- Riferimento editoriale: https://www.michelesaba.dev/ — chiarezza, sobrietà e presenza della persona. Non copiarne testi, identità o promesse.
- Evitare reti instabili con molti pallini in movimento, ambienti 3D pesanti e animazioni decorative continue.
- Contatti sempre raggiungibili. Chi riceve una brochure deve capire rapidamente chi è Edoardo e come scrivergli.

## Posizionamento

Il filo conduttore è il percorso completo del dato: analisi dei processi, raccolta/automation/scraping dove consentito, database e protezione, dashboard e infografiche, eventuale valutazione di modelli predittivi e integrazioni AI. Non promettere risultati o prestazioni senza evidenza. Gli ambiti da esplorare non vanno presentati come progetti già consegnati.

## Fonte professionale

Fonte prioritaria dal 16 ottobre 2026: `Edoardo_Rana_CV_2026.pdf`, fornito dall'utente come versione più aggiornata. Il PDF completo è solo locale e non va incluso nel repository pubblico: il sito contiene una sintesi professionale. Evitare copie grezze della conversazione, data di nascita, telefono e nomi o dettagli dei clienti. In caso di divergenza con le note precedenti, prevale questo CV.

- Posizionamento nel CV: consulenza tecnica su infrastrutture, dati e automazione, con attenzione a requisiti, diagnosi delle cause, documentazione e processi aziendali. Non trasformare questa sintesi in risultati o servizi promessi senza evidenza.
- Broway SA: Linux Administrator da maggio 2025; infrastrutture Linux e Proxmox VE/Backup Server, checkmk, log e diagnostica, Debian, MariaDB, MultiPortal, script SQL/shell, storage S3-compatibile, guide operative e attività di hardening. Database Administrator, ottobre 2024 – maggio 2025; Oracle/PostgreSQL, checkmk, OEM, SQL/batch, backup/ripristino, schemi, remap e rilasci. Non pubblicare i nomi dei clienti riportati nel CV.
- Hubita APS: collaboratore operativo, gennaio 2024 – gennaio 2026. Coordinamento di iniziative sociali/culturali, eventi, interlocutori e Google Workspace.
- SB Italia: stage, gennaio 2023 – novembre 2023. Analisi di dataset aziendali, metodi di classificazione, report e dashboard Qlik/Power BI/Tableau.
- Esperienze iniziali: LTA Advisory, stage in contabilità e supporto alla consulenza (2016); TaxiBlu, stage in contabilità, Zucchetti e manutenzione database (2015). Omettere il numero incluso nel nome esteso dell'azienda, per non pubblicare un telefono.
- Diploma in Amministrazione, Finanza e Marketing, Istituto San Vincenzo / Regina Mundi, 2012–2017.
- Milano-Bicocca: laurea in Statistica e Gestione delle Informazioni 2017–2021; magistrale Data Science dal 2021, in corso.
- Erasmus UiT The Arctic University of Norway a Tromsø: agosto 2021 – agosto 2022. Città confermata da Edoardo il 18 ottobre 2026; campus e indirizzo esatti non confermati.
- EDB Postgres Essentials v17, 2025.
- Italiano madrelingua; inglese C1; spagnolo B2.
- Email: edoardorana@outlook.com. GitHub: https://github.com/edoardorana.
- La tesi riguarda web scraping di annunci immobiliari per analisi di mercato. Dal 28 ottobre 2026 sono disponibili gli archivi R originali del 2021: il sito ne espone una selezione ripulita di 14.731 annunci di Milano, con dashboard e limiti espliciti. Gli originali restano privati; non si pubblicano i vecchi modelli di classificazione. Decisioni e riproducibilità: [progetti dati](DATA_PROJECTS.md).

## Architettura

Sorgenti in `proposal/`, sito statico HTML/CSS/JavaScript con moduli ES. `data.mjs` contiene contenuti, parsing route, email e coordinate della mappa. `script.js` gestisce viste e interazioni; `style.css` definisce responsive e movimento ridotto. Il laboratorio in `proposal/lab/` usa dati sintetici e una copia locale di Plotly, condivisa dai nuovi moduli lazy `housing/` (tesi storica) ed `explorer/` (CSV locali). Nessuna dipendenza npm. La preparazione offline dei dati R usa Python; non è richiesta per la build o nel browser. `cv.html` è una sintesi stampabile. Il server in `scripts/dev.mjs` serve solo file pubblici da `proposal/`, su localhost. `scripts/build.mjs` genera `dist/`.

Il vecchio sito alla radice è stato rimosso su richiesta di Edoardo. Il portfolio a mappa è online su https://edoardorana.github.io/ dal 18 ottobre 2026: la PR #1 è stata integrata in `main` e la sorgente Pages è GitHub Actions. Il workflow esegue controlli, genera `dist/` da `proposal/` e pubblica l'artefatto dopo i push pertinenti su `main`. Per le prossime migliorie usare branch e revisione prima dell'integrazione. La preview privata Sites è un secondo ambiente di pubblicazione, aggiornato esplicitamente: non esiste una sincronizzazione automatica GitHub → Sites configurata in questo repository.

## Lavorare da VS Code e con più assistenti

GitHub è la fonte condivisa del codice. Questi documenti sono la memoria di progetto leggibile da qualunque assistente. Non costituiscono un'importazione completa o una sincronizzazione automatica della chat ChatGPT. Dopo ogni sessione aggiornare STATUS e fare un commit. Prima di riprendere altrove, controllare lo stato del branch e fare pull.

Le API AI servono agli strumenti di sviluppo nell'editor: il sito non dipende da esse. Partire con un assistente principale e usare un secondo per revisioni mirate. Collegare provider e credenziali soltanto nelle impostazioni personali dell'editor.

## Indicazioni del 15 ottobre 2026

- Percorso ordinato Milano, Norvegia, Svizzera, Stoccarda. Preferita una mappa europea subito visibile con punti cliccabili, non iframe OSM.
- Stoccarda: soggiorno da inizio ottobre 2026, in corso; termine previsto circa 31 dicembre 2026. Non implica un nuovo impiego in Germania.
- Approccio: il testo attuale è percepito come troppo marketing; rivederlo con calma a partire da problemi e attività concrete.
- Progetti: dovrà ospitare i repository GitHub costruiti progressivamente; le schede attuali sono provvisorie, non repository inventati.
- Nuova email professionale, LinkedIn e raccolta automatica di opportunità: fase di discussione, nessun account o automatismo da attivare per ora. Valutare un ambiente operativo privato, separato dal sito, con fonti consentite e revisione umana dei contatti.
- Testo inglese dei ruoli richiesto solo per copia/incolla in Word. Il CV web stampabile resta da riallineare nella futura revisione del CV.

Cartografia locale `proposal/europe.svg`: geometrie Natural Earth (pubblico dominio), tramite world-atlas 2.0.2, countries-110m.json. Proiezione Mercator, scala 500, origine longitudine -20°, limite superiore 73° N, viewBox 600 × 650; stessa formula in mapPoint. Fonti: https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json e https://www.naturalearthdata.com/about/terms-of-use/ . Nessun caricamento cartografico esterno a runtime.

## Direzione visiva del 16 ottobre 2026

- La versione a card colorate e slogan è stata scartata. Riferimento attuale: sobrietà tipografica del CV web, palette quasi monocromatica, bordi leggeri e spazi ben distribuiti.
- Firma in testata: `Edo.`; nome completo e descrizione sintetica `Sistemi e dati`. Menu con linee, senza pulsante di contatto separato.
- L'area `Collaborazioni` usa la route tecnica `#/contatti`. Tono di contatto neutro, niente inviti commerciali forzati. Email accessibile anche dal footer.
- Home con quattro colonne affiancate su desktop e griglia 2 × 2 su mobile. Nessuna anteprima centrale o linea di collegamento. Evitare di ripristinare slogan, grafiche decorative o istruzioni ridondanti senza confronto con Edoardo.

## Revisione editoriale del 16 ottobre 2026

- Evitare monogrammi `er`/`ER`: la firma in testata resta `Edo.`, l'icona della scheda usa `E.`, nel Profilo compare il nome completo.
- Preferire titoli descrittivi, fatti documentati e frasi dirette. Non ripetere il nome all'inizio della biografia, non usare slogan generici o inviti al contatto ridondanti.
- Navigazione di fondo: `00 Mappa`, sezione precedente e successiva secondo l'ordine `01 Profilo`, `02 Approccio`, `03 Percorso`, `04 Progetti`, `05 Collaborazioni`. Alla prima e all'ultima sezione non duplicare la mappa come link precedente/successivo. Le schede progetto mantengono il contesto della sezione 04 e un ritorno all'elenco.
- Il CV web deve distinguere Linux Administrator (da maggio 2025) da Database Administrator (ottobre 2024 – maggio 2025). La magistrale resta in corso. Non presentare la Svizzera come sede fisica né Stoccarda come nuovo impiego.

## Chiarimenti geografici del 18 ottobre 2026

- Norvegia: Tromsø è la città del periodo Erasmus. Il punto sulla mappa è rappresentativo della città, non del campus.
- Svizzera: Zugo è il riferimento geografico dell'azienda con cui Edoardo lavora da remoto; non indica una sua sede di lavoro. Il punto sulla mappa è rappresentativo della città.

## Revisione della navigazione del 18 ottobre 2026

- La pagina iniziale si chiama `Home` nell'interfaccia; la route tecnica interna può restare `mappa`.
- I quattro box della Home non mostrano numeri né frecce diagonali. La navigazione in fondo alle sezioni usa solo Home, precedente e successiva con il nome del capitolo, senza numerazione.
- Le pagine interne non mostrano più la barra `Sezione XX/05`: il titolo principale coincide con il nome del capitolo.
- In Approccio i cinque tab restano invariati e il pannello aggiunge frecce laterali cliccabili per rendere più evidente la sequenza.

## Accorpamento Profilo e Percorso del 18 ottobre 2026

- Percorso non è più una sezione visibile: mappa geografica, selettore dei luoghi e cronologia sono inclusi in Profilo.
- La Home e il menu espongono quattro sezioni. La vecchia route `#/percorso` resta disponibile come alias di Profilo per non interrompere link già condivisi.
- Home usa quattro colonne su desktop e una griglia 2 × 2 sotto gli 820 px, senza box centrale né rami.
- Nella navigazione a fondo pagina frecce, etichette e nomi delle sezioni usano la stessa famiglia e dimensione tipografica.

## Colonne della Home del 18 ottobre 2026

- Le quattro aree formano un'unica fascia editoriale: colonne senza spazio tra loro, separate da linee verticali sottili.
- Hover e focus usano il verde tenue già presente nel progetto e una linea superiore verde. Nessun numero o freccia diagonale.
- Sotto gli 820 px le colonne diventano una griglia 2 × 2 per preservare la leggibilità.

## Contenuto progressivo della Home del 19 ottobre 2026

- Con mouse a riposo ogni colonna mostra soltanto il titolo; non ci sono sottotitoli né l'etichetta `Esplora`.
- Al passaggio del mouse o con focus da tastiera compare una sessione terminale allineata a sinistra: `~/area > cat readme.md`, una breve descrizione e un nuovo `~/area >` con il solo cursore finale lampeggiante.
- Sui dispositivi senza hover tutte le sessioni sono visibili, con cursore finale statico: il primo tocco apre la sezione. Le descrizioni restano dentro le rispettive colonne anche a 320 px.
- Le intestazioni usano un percorso terminale sopra il titolo (`~/home`, `~/profilo` e così via), con la descrizione introduttiva sotto il titolo. Le schede progetto mostrano il percorso completo della route.
