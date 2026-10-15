# WEB-CV — contesto condiviso

## Obiettivo

Portfolio personale di Edoardo Rana per presentarsi, proporre collaborazioni e sviluppare un'attività freelance. In seguito: brochure da distribuire a Milano e in altre città europee, con QR verso un URL pubblico stabile.

## Decisioni prese con Edoardo l'11 ottobre 2026

La prima landing page è stata valutata circa 6–6,5/10: messaggio e struttura dei contenuti corretti, forma troppo standard. Il concept interattivo successivo è stato apprezzato. La direzione scelta è **una mappa con aree da esplorare**, sobria e minimale, con sezioni in cui entrare e collegamenti significativi.

- Cinque aree: Profilo, Approccio, Percorso, Progetti, Collaboriamo.
- La rete di navigazione è distinta dalla mappa geografica nel Percorso.
- Ogni sezione ha un URL condivisibile e un ritorno alla mappa.
- Tono personale in prima persona, comprensibile a potenziali clienti non tecnici.
- Riferimento editoriale: https://www.michelesaba.dev/ — chiarezza, sobrietà e presenza della persona. Non copiarne testi, identità o promesse.
- Evitare reti instabili con molti pallini in movimento, ambienti 3D pesanti e animazioni decorative continue.
- Contatti sempre raggiungibili. Chi riceve una brochure deve capire rapidamente chi è Edoardo e come scrivergli.

## Posizionamento

Il filo conduttore è il percorso completo del dato: analisi dei processi, raccolta/automation/scraping dove consentito, database e protezione, dashboard e infografiche, eventuale valutazione di modelli predittivi e integrazioni AI. Non promettere risultati o prestazioni senza evidenza. Gli ambiti da esplorare non vanno presentati come progetti già consegnati.

## Fonte professionale

CV_RANA_2026_ENG.pdf, fornito dall'utente. Il file completo non è incluso nel repository pubblico: il sito contiene una sintesi professionale. Evitare copie grezze della conversazione, data di nascita, telefono e dettagli dei clienti.

- Broway SA: Linux Administrator da maggio 2025, infrastruttura Proxmox, checkmk, Debian 13, MariaDB, MultiPortal, Cubbit, script SQL/shell e aggiornamenti. Database Administrator, ottobre 2024 – maggio 2025. Oracle/PostgreSQL, checkmk, OEM, SQL/batch, backup/recovery, schemi e remap, rilasci su Linux.
- Hubita APS: collaboratore, gennaio 2024 – gennaio 2026. Progetti sociali/culturali e Google Workspace.
- SB Italia: stage, gennaio 2023 – novembre 2023. Analisi dati, classificazione, Qlik/Power BI/Tableau.
- Milano-Bicocca: laurea in Statistica e Gestione delle Informazioni 2017–2021; magistrale Data Science dal 2021, in corso.
- Erasmus Arctic University of Norway: agosto 2021 – agosto 2022. Campus esatto non confermato; non inventare coordinate puntuali.
- EDB Postgres Essentials v17, 2025.
- Italiano madrelingua; inglese C1; spagnolo B2.
- Email: edoardorana@outlook.com. GitHub: https://github.com/edoardorana.
- Il dettaglio della tesi sugli annunci immobiliari deriva dal precedente CV nel repository. Metriche, codice e dataset del progetto non sono disponibili.

## Architettura

Sorgenti in `proposal/`, sito statico HTML/CSS/JavaScript con moduli ES. `data.mjs` contiene contenuti, parsing route, email e coordinate della mappa. `script.js` gestisce viste e interazioni; `style.css` definisce responsive e movimento ridotto. `cv.html` è una sintesi stampabile. Il server in `scripts/dev.mjs` serve solo file pubblici da `proposal/`, su localhost. `scripts/build.mjs` genera `dist/`.

La versione GitHub precedente resta alla radice. La versione nuova è sul branch `feat/freelance-portfolio`, PR #1. Non modificare `main` durante l'iterazione. La preview privata Sites è un secondo ambiente di pubblicazione, aggiornato esplicitamente: non esiste una sincronizzazione automatica GitHub → Sites configurata in questo repository.

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
