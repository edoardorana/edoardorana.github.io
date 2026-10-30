# Stato del progetto

Aggiornato il 30 ottobre 2026. Le note precedenti sono state condensate; i commit già pubblicati restano nella cronologia Git.

## Piano per gli assistenti — 30 ottobre 2026

- Edoardo ha confermato la struttura: box compatte come indice, lettura continua Profilo → Progetti → Approccio → Collaborazioni, cinque fasi del metodo in sequenza e menu `tree`. CV, due dashboard, scheda NetBox e cinque documenti operativi rimangono pagine separate.
- Preparati il [piano operativo con prompt](LANDING_AI_PLAN.md), [nove incarichi sequenziali](landing-tasks/) e [registro di avanzamento](LANDING_PROGRESS.md). L'[analisi](LANDING_PAGE_PROPOSAL.md) riflette la decisione confermata; non restano alternative da scegliere sull'incorporamento delle dashboard.
- Allineati AGENTS, istruzioni Claude/Gemini/Copilot, contesto, guida VS Code e rimandi dei README/piani. Le vecchie note sotto sono cronologia, non istruzioni che prevalgono sulla decisione corrente.
- Base locale: `main` al commit `31bf4867902916fbf0f4137e12a38a77674cccca`, inizialmente senza modifiche. Sintassi e 20 test Node superati; build completata. Otto viste aperte nel browser a 1280/390 px senza overflow; verificati menu Invio/Escape e Indietro/Avanti/refresh fra Home e Profilo. Limiti dettagliati nella proposta. Compito 00: base salvata con tag `backup/pre-landing-2026-10-30` e branch `feat/landing-page` creati sul commit base; controlli npm check/build e git diff --check eseguiti.
- Verifica del pacchetto operativo: 105 collegamenti locali controllati in 21 documenti, senza destinazioni mancanti; ripetuti con successo sintassi, 20 test Node e build. Nessun errore di whitespace nel diff. In questa fase solo documentale non sono state ripetute le prove browser della versione di partenza e non è stata testata una landing ancora inesistente.
- Verifiche del compito 00: `npm.cmd run check` superato (20 test Node, 0 fail); `npm.cmd run build` superato (Build ready: dist/); `git diff --check` senza errori di whitespace (solo warning preesistente LF→CRLF su STATUS.md). Branch e tag verificabili con Git.
- Modificate soltanto documentazione e istruzioni per gli assistenti. Sito invariato. Compito 00 eseguito sul branch `feat/landing-page` e revisionato da Codex: commit `538c1cb3d224b07d16345b19dadc53bdf326c2f6` approvato senza problemi bloccanti. Il tag `backup/pre-landing-2026-10-30` conserva la base `31bf4867902916fbf0f4137e12a38a77674cccca`. Prossimo passo autorizzato: incarico 01.
- Compito 01 eseguito e revisionato sul branch di prova: `terminalHeader` e il compositore Collaborazioni accettano un livello semantico `h1`/`h2` e un ID facoltativo codificato, conservando `h1` e il markup visivo esistente per tutte le chiamate correnti. Aggiunti test mirati per default, sezione, escaping e modulo sempre aperto: `npm.cmd run check` superato (22 test), build e diagnostica completate. Profilo e Collaborazioni verificati a 1280/390 px: nessun overflow, campi visibili e struttura preesistente invariata. Prossimo incarico autorizzato: 02.
- Compito 02 eseguito e revisionato: Approccio mostra le cinque fasi in sequenza, con titolo, sintesi, testo, documentazione, tag e collegamento alla scheda separata; rimossi stato, binding e CSS dei tab e delle frecce. `npm.cmd run check` superato (22 test), build, diagnostica e `git diff --check` completati. Browser verificato a 1280 e 390 px: cinque articoli, un solo `h1`, nessun controllo residuo e nessun overflow orizzontale. Le cinque schede rispondono e tornano ad Approccio; Evolvere resta una bozza. Prossimo incarico autorizzato: 03.
- Compito 03 eseguito e revisionato: i quattro renderer accettano la modalità incorporata, `landing()` concatena Home/indice e le quattro sezioni con ID e gerarchia dei titoli coerenti, mentre `bindLanding(root)` riusa i binding di Profilo e Contatti. Il router resta invariato fino al compito 05. Superati 22 test, build, diagnostica e `git diff --check`; la prova DOM della composizione è intenzionalmente rinviata al compito 05. Prossimo incarico autorizzato: 04.
- Compito 04 eseguito e revisionato: `resolveView(hash)` traduce le route esistenti in destinazioni landing, progetto separato o not-found senza accedere al DOM. Coperti URL canonici, alias storici, input vuoto, percorsi sconosciuti, segmenti extra e input malformati; il router resta invariato fino al compito 05. Superati 26 test, diagnostica, controllo sintattico, build e `git diff --check`. Prossimo incarico autorizzato: 05.
- Compito 05 eseguito: render riscritto con `resolveView`, montaggio unico della landing, scroll per sezione, clic sulla stessa voce del tree, ritorno da progetto, `body.dataset.page='landing'`. 26 test, build e diff superati. Prove browser in attesa (nessun browser disponibile nella sessione); non passare alla rifinitura senza verifica. Prossimo incarico autorizzato: 06 (dopo verifica browser).
- Compito 06 eseguito: box compatte (min-height 240px), testata sticky, offset scroll-margin 84px, distanze uniformate, scorrimento fluido per clic volontari. 26 test, build e diff superati. Prove browser in attesa (nessun browser disponibile). Prossimo incarico autorizzato: 07 (dopo verifica browser).
- Compito 07 eseguito: controlli automatici (check 26 test, build, diff) superati; rapporto QA in docs/LANDING_QA.md. Prove browser NON VERIFICATO (nessun browser). Prossimo incarico autorizzato: 08 (revisione finale).

## Armonia visiva e revisione tecnica — 29 ottobre 2026

- Revisione di tutte le pagine e di tutti gli script applicativi/offline: [rapporto con problemi, interventi, copertura e limiti](REVIEW_2026-10-29.md).
- Approccio mobile più leggibile, schede autonome allineate al CV, Contatti integrato nel banner con campi sempre aperti e senza prompt finale. README e istruzioni accorciati; menu compatto mantenuto, con chiusura anche all'esterno.
- Dashboard: rimossi eventi persistenti dopo la navigazione; filtri invalidi segnalati e export bloccato; messaggi di selezione vuota rimossi al ripristino. Filtri immobiliari inizialmente chiusi, titoli grafici uniformati. Corretti istogrammi costanti e importazioni CSV superate da una nuova scelta.
- Pulizia di CSS, stato e aggregazioni senza utilizzo; conversione numerica Python più rigorosa. Nessuna nuova dipendenza e dataset pubblico invariato.
- Verifiche locali: 20 test Node, 2 test Python, build e diagnostica editor superati. Otto viste a 1280/390/320 px, CV e cinque documenti a 390 px; flussi dashboard, touch emulato, menu da tastiera e Indietro/Avanti verificati. Limiti e prossimi passi nel rapporto.
- Integrata la [PR #13](https://github.com/edoardorana/edoardorana.github.io/pull/13) in `main`, merge `5ac365e`, dopo il successo dei controlli remoti. Pubblicazione Pages: [run 40876483516](https://github.com/edoardorana/edoardorana.github.io/actions/runs/40876483516).
- Run Pages completato con successo. Verificata la corrispondenza di nove asset pubblici con i sorgenti e aperta Collaborazioni online a 390 px: campi visibili e nessun overflow.

## README, tree e contatti — 29 ottobre 2026

- I banner `cat readme.md` ora descrivono in modo conciso il contenuto della pagina e l’azione successiva: Home, Profilo, Approccio, Progetti e dashboard.
- Il menu `tree` è tornato alla versione compatta precedente: annidamento con linea verticale, senza connettori testuali, permessi o percorsi ripetuti.
- Le cinque schede dell’Approccio sono pagine autonome in stile CV, senza intestazione `cat readme.md`, con stampa/PDF, campi compilabili e collegamento di ritorno funzionante.
- Collaborazioni: `mail --new`, oggetto e messaggio sono sempre visibili nello stesso banner; rimossi cursore d’attesa e pulsante di copia. La bozza usa `mailto:` e non dichiara l’invio.
- Verifica locale: 20 test Node, build e diagnostica superati; cinque schede aperte direttamente a 390 px senza overflow. Pubblicata su `main` con commit `b30bae4`; il workflow [40847668031](https://github.com/edoardorana/edoardorana.github.io/actions/runs/40847668031) ha completato check e deploy con successo. Verificati online banner Home/Contatti, tree e i cinque documenti.

## Iterazione guidata — 29 ottobre 2026

- Implementato il [piano concordato](NEXT_ITERATION_PLAN.md): prompt senza host, Home con solo comando su hover/focus desktop e nessun comando touch; README Profilo e testi dei luoghi rivisti; eliminati badge sulla mappa e prompt finali decorativi.
- Approccio mantiene cinque fasi e collega cinque documenti HTML autonomi, compilabili e stampabili: questionario, flusso dati, accessi/backup/ripristino, progetto di dashboard e piano di revisione. Evolvere resta esplicitamente una bozza da affinare con Edoardo.
- Collaborazioni integra email/GitHub e compositore terminale. Invio sull’oggetto passa al messaggio; Ctrl/Command+Invio prepara il mailto. Conferma “bozza preparata”, mai “inviato”; copia indirizzo e istruzioni di fallback.
- Immobiliare: intervallo €/m², clic sui grafici e selezione punti coordinati con KPI, filtri, tabella ed export; campi/aggregazioni configurabili, filtri rimovibili e nota sul dataset abbreviata. Dataset originale pubblico invariato: 11 anomalie segnalate e inizialmente escluse, non eliminate.
- Generator ricostruito in cinque passaggi, con drag and drop, schema, tipi, anteprima delle trasformazioni, annulla/ripristina, date GG/MM/AAAA e marcatori mancanti espliciti. Fino a cinque grafici scelti da sei famiglie compatibili. Elaborazione locale, cronologia delle operazioni senza copie integrali cumulative.
- Ripuliti contenuti/CSS esclusivi dei blocchi rimossi. Nessuna dipendenza npm o servizio remoto aggiunto.
- Verifiche locali: 18 test Node, sintassi, build, diagnostica editor. Browser integrato a 320/390/1280 px senza overflow sulle sei viste principali; touch emulato nasconde tutti i comandi Home, focus desktop li rivela, Escape richiude il menu e restituisce il focus.
- Verificati clic reale sulla barra San Babila (45 annunci); selezione Città Studi + 3.000–6.000 €/m² (363 record, stesso conteggio in KPI/export); import CSV, errore di righe incoerenti con conservazione del dataset, duplicati/annulla, conversione date e gestione NA; cinque famiglie di grafici renderizzate. I cinque documenti aprono direttamente, senza overflow a 390 px; stampa nasconde i controlli e conserva le note.
- Bozza email verificata fino all’URL mailto codificato: nessuna email inviata e client esterno non verificato. Nessun test su telefono fisico, Safari o Firefox. Prova con CSV reali dell’utente ancora utile per affinare il flusso.
- Pubblicata tramite [PR #12](https://github.com/edoardorana/edoardorana.github.io/pull/12), merge `65bffc3`. [Run Pages 40831164419](https://github.com/edoardorana/edoardorana.github.io/actions/runs/40831164419) completato con successo. Verificata corrispondenza tra sorgenti e 17 asset pubblici (moduli, stile e documenti), normalizzando CRLF/LF. Verificati anche refresh/Indietro/Avanti e font dei comandi Profilo in browser locale.

## Piano della prossima iterazione — 28 ottobre 2026

- Raccolte e ordinate le decisioni per semplificazione dei prompt, Home, riscrittura Profilo, documenti operativi dell’Approccio, cross-filter immobiliare, ricostruzione Dashboard generator e compositore email in stile terminale.
- Nessuna modifica al sito o ai dati in questa fase. Mappa tecnica, sequenza, criteri di accettazione e decisione ancora aperta su `05 Evolvere` sono in [NEXT_ITERATION_PLAN.md](NEXT_ITERATION_PLAN.md).

## Intestazioni `cat readme.md` — 28 ottobre 2026

- Semplificato il menu in un albero `~$ tree`: le voci figlie mostrano solo il nome relativo (`cv.html`, `dashboard-generator`, `immobiliare-data`, `netbox-ipam`), senza percorsi ripetuti né slash finali. Il pulsante usa lo stesso linguaggio visivo dei prompt del sito.
- Rimossi i grandi titoli visibili da Home, sezioni, schede progetto, dashboard e pagina 404. Ogni vista usa un banner chiaro in stile CLI con `edo@debian:~/percorso$ cat readme.md`.
- Il README è statico, sempre visibile e largo quanto il contenuto della pagina. I titoli `h1` restano disponibili ai lettori di schermo e alla struttura del documento.
- Nel Profilo il banner riordina attività e percorso e offre `xdg-open cv.html` come collegamento da tastiera al CV. Rimossi il vecchio riquadro con il nome e il pulsante CV separato.
- Il terminale del Profilo usa cartelle senza numeri e aggiunge `languages --list` e `interests --list`; tra gli interessi compare anche Ju jitsu. I tre comandi hanno la stessa dimensione tipografica. Rimosso il blocco separato “Lingue e interessi”.
- Invertiti Progetti e Approccio in Home, menu e navigazione tra sezioni: l’ordine è Profilo, Progetti, Approccio, Collaborazioni.
- Creato un componente condiviso anche dalle dashboard caricate in modo differito; i percorsi lunghi possono andare a capo sui telefoni senza produrre scorrimento orizzontale.
- Verifiche: `npm.cmd run check` (16 test) e `npm.cmd run build` riusciti. Browser locale a 1280 e 390 px: i prompt `skills`, `languages` e `interests` risultano tutti a 12 px; il menu `~$ tree` non produce overflow, si apre con Invio, si chiude con Escape restituendo il focus e chiude il pannello dopo la navigazione. Nessun test su telefono fisico.

## Progetti essenziali e menu a cartelle — 28 ottobre 2026

- Introduzione abbreviata in “Esplora alcuni dei miei progetti.”; eliminati numeri nell'elenco e nelle sezioni della scheda progetto.
- Nuovi titoli e percorsi: Dashboard interattiva su dati immobiliari (`immobiliare-data`) e Dashboard generator (`dashboard-generator`). Vecchi URL mantenuti come alias.
- Rimossa la scheda BI: nel Profilo, alla voce SB Italia, esplicitata la creazione di report e dashboard Qlik, Power BI e Tableau. Il vecchio link BI apre il Profilo.
- Sostituita la scheda generica sulle infrastrutture con IPAM/NetBox in corso, come confermato dall'utente; Proxmox locale indicato soltanto come progetto futuro.
- Menu in stile `ls -l`, cartelle annidate, CV sotto Profilo, progetti sotto Progetti. Su mobile le colonne decorative dei permessi sono nascoste. Chiusura con Escape e ritorno del focus al pulsante; selezionare una voce chiude il menu.
- Footer delle tre schede limitato a Progetti e Home. Eliminata la demo sintetica con dataset, generatore, moduli, sei test esclusivi e CSS inutilizzato. Plotly/licenza spostati nel modulo condiviso `proposal/charts/`.
- Verifiche: `npm.cmd run check` (14 test), `npm.cmd run build`, diagnostica editor e `git diff --check` riusciti. Edge headless a 1280/390/320 px: nuove route, vecchi alias, cinque grafici per dashboard, menu e footer senza overflow o errori JavaScript nel run finale; verificati Escape e ripristino focus. Nessun test su telefoni fisici.
- Pubblicata tramite [PR #8](https://github.com/edoardorana/edoardorana.github.io/pull/8), merge `c6cef8d`. [Run 40711368841](https://github.com/edoardorana/edoardorana.github.io/actions/runs/40711368841): `check` e `deploy` riusciti. Verificati Progetti e menu sul sito pubblico, corrispondenza dei sette asset principali con i sorgenti e risposta 404 del dataset sintetico eliminato. Prossimi contenuti: documentazione tecnica di NetBox quando disponibile; laboratorio Proxmox da progettare.

## Dashboard tesi e CSV Explorer — 28 ottobre 2026

- Aggiunte due pagine lazy ai Progetti: `#/progetti/market-data` e `#/progetti/csv-explorer`. Conservata la demo sintetica originale a `#/laboratorio`, con collegamento secondario e distinzione esplicita.
- Confrontati i due RData locali: 15.308 × 213 e 13.139 × 24; solo 8.757 identificativi comuni. Nuova preparazione Python dall'archivio iniziale: 14.731 righe pubbliche, 501 aste e 76 tipologie escluse, 11 anomalie selezionabili. Archivi originali, indirizzi, titoli, contatti e link non pubblicati.
- Dashboard storica: sette dimensioni di filtro (zona, tipologia, stato, locali, energia, superficie e prezzo), quattro indicatori con denominatori, cinque grafici, tabella paginata ed export CSV filtrato. Filtri in un pannello richiudibile per dare spazio ai risultati anche su mobile.
- Explorer: importazione locale con separatore/codifica/decimali, anteprima, tipi modificabili, sette operazioni di preparazione, annulla/ripristino, cinque grafici configurabili, export protetto da formule. File fino a 10 MB / 30.000 righe / 100 colonne. Nessuna richiesta di rete osservata durante l'importazione e la pulizia del CSV di prova.
- Verificati 20 test Node e 2 test Python, build e sintassi. Edge headless a 1280, 390 e 320 px: nuove dashboard, Home, Profilo, Approccio, Progetti, Contatti e vecchio Laboratorio senza overflow orizzontale o eccezioni JavaScript. Browser integrato: filtri storici, selezione vuota, anomalie, importazione multilinea, duplicati, annulla/ripristino, protezione formule e HTML in celle.
- Dettagli, schema, riproducibilità, soglie e limiti: [DATA_PROJECTS.md](DATA_PROJECTS.md); conteggi verificabili: [housing-quality.json](housing-quality.json).
- Pubblicata tramite [PR #7](https://github.com/edoardorana/edoardorana.github.io/pull/7), merge `a0ec565`. Nel [run 40676388368](https://github.com/edoardorana/edoardorana.github.io/actions/runs/40676388368) i job `check` e `deploy` sono riusciti. Verificati sul sito pubblico entrambi i progetti con cinque grafici ciascuno; JSON e moduli pubblici corrispondono ai sorgenti (normalizzando CRLF/LF). Verificati anche tastiera, refresh/Indietro, export storico di tutte le 529 righe selezionate e recupero da un errore di rete simulato.
- Prossimo passo: prova dell'Explorer con CSV reali dell'utente. Excel, nuove raccolte e modelli predittivi restano fuori da questa versione. QA svolta su Edge desktop con viewport mobile emulata, non su telefoni fisici né su Safari/Firefox.

## Pulizia del progetto e terminale competenze — 19 ottobre 2026

- Rimossa dalla testata la ripetizione visibile di `Edoardo Rana`: la firma mostra `Edo.` e la sola descrizione `SISTEMI E DATI`.
- La sintesi delle competenze nel Profilo mantiene comando `skills --overview`, output monospaziato in quattro gruppi e prompt finale lampeggiante, ma non simula più la barra di una finestra. Lo sfondo usa il grigio chiaro del sito e le linee della stessa palette; su mobile i gruppi scorrono in una sola colonna e con movimento ridotto il cursore resta statico.
- La navigazione inferiore usa percorsi terminale (`~/profilo`, `~/home`, `~/progetti` e così via) mantenendo frecce direzionali e nomi completi accessibili. Lo stesso componente è presente nel Laboratorio e nelle schede progetto.
- Controllati tutti i file tracciati, riferimenti agli asset, moduli esportati, variabili e classi CSS. Plotly Basic, dataset sintetico, generatore, mappa, CV e documentazione sono tutti referenziati o necessari al flusso di sviluppo; non sono stati eliminati. Rimossi il markup e sei regole CSS della barra del terminale; resa interna una funzione del server locale che non costituisce API pubblica.
- Browser locale a 1280, 390 e 320 px: tutte le route, alias, tre schede progetto, Laboratorio, pagina 404 e CV senza overflow o errori JavaScript. Verificata anche la navigazione inferiore da tastiera. `npm.cmd run check` superato (11 test), `npm.cmd run build` superato e `git diff --check` senza errori.
- La PR #6 è stata integrata in `main` (commit `3473377`); nel run GitHub Actions `39286786908` i job `check` e `deploy` sono riusciti. Sugli asset pubblici verificati assenza della barra e uso dello sfondo chiaro; una scheda già aperta può mostrare temporaneamente gli asset precedenti finché la cache non viene aggiornata.

## Percorsi nelle intestazioni — 19 ottobre 2026

- Sostituita l'etichetta della Home con `~/home`; le pagine interne mostrano `~/profilo`, `~/approccio`, `~/progetti`, `~/contatti` e `~/laboratorio` sopra il titolo. Le schede progetto usano il percorso completo; l'alias `#/percorso` mostra `~/profilo`.
- La descrizione introduttiva rimane sotto il titolo. I percorsi condividono colore, carattere e spaziatura delle altre etichette in stile terminale.
- Browser locale a 1280, 390 e 320 px: percorsi e disposizione verificati su tutte le route, comprese le schede e la pagina non trovata; nessun overflow orizzontale o errore JavaScript.
- Verificati apertura con Tab/Invio, Indietro e tocco singolo su Progetti. `npm.cmd run check` superato (11 test), `npm.cmd run build` superato e `git diff --check` senza errori.
- La PR #4 è stata integrata in `main` (commit `185d0f5`); nel run GitHub Actions `39266696646` i job `check` e `deploy` sono riusciti. Sul sito pubblico verificati i percorsi di Home, sezioni, scheda progetto e Laboratorio a larghezza mobile.

## Revisione Home e testi introduttivi — 19 ottobre 2026

- Titolo della Home sostituito con `Sistemi Linux, database e analisi.`. Le descrizioni introduttive di Home, Profilo, Approccio, Progetti, schede, Laboratorio e Collaborazioni condividono la stessa tipografia: 13 px, peso 400 e interlinea 1,65.
- Sui dispositivi senza hover le quattro box mostrano sempre comando, descrizione e prompt finale statico; il primo tocco apre la sezione. Desktop mantiene rivelazione su hover o focus da tastiera, con prompt finale lampeggiante.
- Browser locale a 1280, 390 e 320 px: tutte le route e il CV senza overflow orizzontale né errori JavaScript; testi introduttivi con valori CSS identici. A 390 e 320 px i quattro terminali rientrano nelle box e il primo tocco apre Profilo.
- Verificati anche i quattro collegamenti con tocco singolo e il prompt su hover/focus desktop. `npm.cmd run check` superato (11 test), `npm.cmd run build` superato e `git diff --check` senza errori.
- La PR #3 è stata integrata in `main` (commit `90bf59a`); nel run GitHub Actions `39260926282` i job `check` e `deploy` sono riusciti. Sul sito pubblico verificati titolo Home, tipografia del Profilo, quattro prompt touch e apertura di Approccio al primo tocco.

## Sito e pubblicazione

- Sorgenti attivi in `proposal/`; `npm run build` genera `dist/`, escluso da Git. Il sito legacy alla radice è stato rimosso.
- Il workflow GitHub Actions esegue controlli e build sulle pull request; pubblica GitHub Pages dai push su `main` all'indirizzo https://edoardorana.github.io/.
- La PR #2 è stata integrata in `main` il 19 ottobre 2026 (commit `c460e09`). Nel run GitHub Actions `39244002565`, i job `check` e `deploy` sono terminati con successo.
- La preview Sites è separata e non si aggiorna con il push GitHub.

## Contenuto attuale

- Home: Profilo, Approccio, Progetti e Collaborazioni in quattro colonne desktop o griglia 2 × 2 mobile. Hover e focus da tastiera rivelano il terminale con `cat readme.md`; sui dispositivi senza hover i quattro terminali sono visibili a riposo e un tocco apre la pagina.
- Profilo include sintesi professionale, cronologia, competenze, lingue e interessi. La mappa europea locale distingue Milano, Tromsø (Erasmus), Zugo (azienda con lavoro da remoto) e Stoccarda (soggiorno). `#/percorso` resta un alias di Profilo.
- Approccio presenta esempi di un possibile metodo, distinti dalle attività già svolte. Progetti contiene tre schede professionali e un laboratorio con 720 annunci di vendita sintetici, filtri, indicatori, grafici, tabella ed esportazione CSV.
- Collaborazioni offre email diretta, GitHub e un modulo che apre il programma di posta. Il CV HTML è una sintesi stampabile; il PDF originale non è pubblicato.

## Revisione del 19 ottobre

- Rimossi sottotitoli e campi non utilizzati delle aree; riscritte le quattro descrizioni e alcune frasi ripetitive o poco precise.
- Rimosso dal Profilo un riepilogo della formazione già presente nella cronologia e nel CV. Le etichette della tesi non attribuiscono più tecnologie non documentate come specifiche del progetto.
- Riequilibrata l'altezza delle colonne desktop; sui telefoni stretti il prompt rimane leggibile su una riga. Il terminale resta allineato a sinistra nella colonna.
- Corretta la navigazione al primo tocco sulle aree della Home. Uniformati i testi del laboratorio e il carattere dei grafici; le date degli annunci usano UTC per evitare cambi di giorno tra fusi orari.
- Aggiornati workflow, task VS Code, guida di avvio e revisione editoriale per riflettere il flusso di pubblicazione attuale.

## Verifiche

- Browser locale a 1280, 390 e 320 px: tutte le route, incluse tre schede progetto, laboratorio, alias `#/percorso` e CV, senza overflow orizzontale o errori JavaScript. Verificato anche il punto di passaggio delle quattro colonne a 821–900 px.
- Verificati hover, focus, apertura con Invio, Indietro/Avanti, menu con Escape, primo tocco mobile, selezione della mappa e passaggio tra le fasi dell'Approccio.
- Laboratorio: 720 annunci e tre grafici caricati; filtri, intervallo non valido, azzeramento e paginazione verificati.
- Controlli finali: `npm.cmd run check` superato (11 test) e `npm.cmd run build` superato; `git diff --check` senza errori.
- Sito pubblico aperto dopo il deploy: nuova Home visibile; Laboratorio caricato con 720 annunci, tre grafici e avviso sui dati sintetici.

## Prossimi passi

1. Provare anche Safari e un dispositivo fisico; le verifiche sopra usano il browser locale con viewport ed emulazione touch.
2. Concordare disponibilità e tipi di incarico prima di aggiungere offerte; pubblicare in futuro una prova di lavoro consultabile. Dettagli in `docs/FREELANCE_REVIEW.md`.
3. Decidere separatamente se aggiornare la preview Sites. Riesaminare la descrizione del soggiorno a Stoccarda dopo il 2026.
