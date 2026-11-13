# Contesto del progetto

## Obiettivo

Portfolio personale di Edoardo Rana, con un posizionamento centrato su infrastrutture Linux, database, dati e automazione. Il tono è diretto, personale e comprensibile anche a interlocutori non tecnici; non vanno inventati clienti, metriche o risultati.

## Struttura approvata

- Landing continua con Profilo, Progetti, Approccio e Collaborazioni.
- Hero compatto e un solo indice editoriale; nessun menu duplicato.
- CV, luoghi, contatti, dashboard, schede progetto e cinque documenti dell’Approccio sono pagine separate.
- Le route storiche utili restano compatibili; `#/percorso` apre Profilo e `#/home` l’inizio.
- Stile sobrio e compatto, ispirato a un editor leggero senza simulare un IDE completo.

## Architettura

Il sorgente attivo è `proposal/`. Il sito usa HTML, CSS e moduli JavaScript senza dipendenze npm. `scripts/build.mjs` genera `dist/`; `scripts/dev.mjs` serve soltanto i file pubblici. Le dashboard condividono Plotly locale in `proposal/charts/`.

Il frontend non contiene API key, backend, analytics o chiamate a servizi AI. Il contatto genera esclusivamente un URL `mailto:`.

## Contenuti e riservatezza

- Email pubblica: `edoardorana@outlook.com`.
- Il percorso magistrale è in corso.
- Tromsø indica la città del periodo Erasmus.
- Zugo indica il riferimento dell’azienda svizzera con cui si lavora da remoto, non una sede personale.
- Non pubblicare telefono, data di nascita, credenziali, dati dei clienti, conversazioni grezze o documenti originali privati.
- Il PDF originale del CV e gli archivi sorgente dei dati restano fuori dal repository pubblico.

## Progetti dati

La dashboard immobiliare usa una selezione ripulita degli annunci raccolti nel 2021 per la tesi, con limiti e anomalie dichiarati. Dashboard generator elabora file CSV localmente nel browser. Schema, soglie e riproducibilità sono descritti in `DATA_PROJECTS.md`.

## Processo di rilascio

`mywebsite` è un archivio congelato della versione precedente. `mywebsite-staging` è l’unica area di lavoro attiva e ospita modifiche, test e nuove versioni. `mywebsite-production` contiene esclusivamente ciò che è stato approvato per la pubblicazione.

Production non viene modificata direttamente. Prima di promuovere una versione dallo staging eseguire almeno `npm run check`, `npm run build`, controllo privacy e QA desktop/mobile/tastiera.
