# Stato del progetto

Aggiornato il 31 ottobre 2026. Le note precedenti sono state condensate; i commit già pubblicati restano nella cronologia Git.

## Landing compatta — 30 ottobre 2026

- Testata ridotta al solo marchio `edo.dot`; rimosse entrambe le ripetizioni visibili di Edoardo Rana. La Home ora contiene soltanto `Sistemi e dati`, `infrastrutture / dati / automazione` e lo slogan `La complessità non scompare. Si mette in ordine.`. Rimossi CTA e indice duplicato: la navigazione resta nel menu `tree`.
- Profilo ridotto a etichetta, titolo `CV` e collegamento compatto. La mappa resta nella landing; etichette città rese stabili e leggibili anche su hover/focus con ordine di sovrapposizione esplicito.
- Progetti ridotti alle due dashboard, affiancate su desktop e impilate su mobile. NetBox rimosso da dati, menu e route canoniche: il vecchio URL restituisce pagina non trovata.
- Approccio trasformato in una fascia orizzontale compatta e scorrevole con le cinque fasi; i testi completi restano nelle schede separate. Collaborazioni mantiene il compositore ma usa intestazione e caratteri più contenuti.
- Le quattro intestazioni della landing sono ora righe monospaziate da 11 px: `.01 Profilo ## CV`, `.02 Progetti`, `.03 Approccio` e `.04 Collaborazioni`. Dimensione, famiglia, interlinea e maiuscole restano identiche su desktop e mobile.
- Verifiche finali: `npm.cmd run check` (26/26), build e `git diff --check` superati. Browser a 1280/390/320 px senza overflow della pagina; due progetti, cinque fasi, nessun indice duplicato o NetBox. Verificati hover della mappa (testo bianco su fondo scuro), scorrimento orizzontale del metodo, vecchia route NetBox in 404 e apertura delle due dashboard. Rimosso anche il doppio handler da tastiera del pulsante `tree`, lasciando il comportamento nativo del `button`; il browser condiviso non ha prodotto eventi fisici da tastiera in modo affidabile. Nessun telefono fisico, Safari/Firefox o screen reader. Nessun push o deploy.

## Identità `edo.dot` e pulizia — 30 ottobre 2026

- Scelta una prima identità concreta: `edo.dot`. Il punto è usato come segno ricorrente nel marchio, nella numerazione della landing e nei piccoli elementi grafici; il nome completo resta visibile e il CV mantiene il tono formale.
- Rimossa la scritta gigante dalla Home. Il marchio ha dimensione contenuta, affiancato da `Edoardo Rana · sistemi e dati`; riscritta la frase introduttiva per esprimere metodo e continuità del lavoro senza formule commerciali.
- Annullato integralmente il commit successivo alla landing che aveva introdotto una quinta sezione Servizi, tariffe e tempi non concordati, template email, casi studio e numeri non verificati. Ripristinate le quattro sezioni approvate e il compositore essenziale.
- Ripulito `script.js`: eliminati cronologia non più renderizzata, navigazione precedente/successiva inutilizzata, parametri embedded ormai superflui, binding irraggiungibili e stato mai letto. Rimosso anche il vecchio blocco CSS della landing, ormai duplicato e sovrascritto.
- Verifiche automatiche: 26 test superati dopo aver aggiunto controlli sull'identità e sull'assenza del codice morto. Browser a 1280/390/320 px: un solo h1, cinque sezioni previste (Home più quattro capitoli), nessun overflow, nessun ID duplicato, nessuna sezione Servizi; `mail --new` resta l'unico comando visibile nella landing.
- Questa è una prima direzione visiva da valutare, non un'identità definitiva. Nessun push o deploy.

## Landing omogenea e CV centrale — 30 ottobre 2026

- Analizzato `https://www.alessiop.cc/` come riferimento di omogeneità: la qualità percepita deriva da una grammatica visiva costante, una Home con identità chiara e pochi elementi terminali usati con intenzione. Nessun testo, colore, componente o identità è stato copiato.
- Home ricostruita: nome e posizionamento in primo piano, CTA al CV e ai progetti, indice lineare delle quattro sezioni. Rimossi tutti i `cat readme.md` dalla landing; restano `tree`, `mail --new` e skills nel CV perché descrivono azioni o contenuti reali.
- Profilo ridotto a CV e mappa: eliminata la cronologia dalla landing, mappa limitata a 380 px desktop. CV riscritto come pagina editoriale completa con tutte le esperienze/formazione già presenti, riepilogo skills, lingue, interessi e certificazione. CTA al CV presente sia in Home sia nel Profilo.
- Progetti ripaginati come elenco editoriale numerato. Approccio su fondo unico, senza alternanza bianco/panna, con cinque fasi leggibili. Contatto allineato allo stesso sistema e compositore invariato nella logica.
- Verifiche: `npm.cmd run check` 26/26, build e `git diff --check`; browser a 1280/820/390/320 px senza overflow. Landing: un h1, ID univoci, nessuna timeline/skills duplicata e solo `mail --new` come comando visibile. CV verificato desktop/mobile, un h1, nessun overflow e blocchi skills/lingue/interessi presenti.
- Navigazione browser verificata: salti interni con focus e offset, refresh diretto su Approccio, ritorno dalla scheda NetBox, conservazione di luogo e bozza nei salti interni, Dashboard generator con input CSV e immobiliare con cinque grafici. La landing non carica moduli dashboard o Plotly all'avvio. Il menu `tree` ora gestisce esplicitamente Invio/Spazio, porta il Tab al primo link con focus visibile e si chiude con Escape restituendo il focus.
- Limiti: nessun telefono fisico, Safari/Firefox, screen reader o client email esterno. Nessun push, merge o deploy.

## Incarico 10 — redesign implementato e verificato

- Verificato il lavoro 05–09: landing e viste separate presenti, ma QA precedente solo automatico. Riscontrati margini laterali azzerati dal CSS 09, quattro box ancora dominanti, focus delle sezioni inefficace (contenitori non focalizzabili), smooth scroll limitato allo stesso hash.
- Sostituite le box con quattro link testuali; introduzione compatta, palette e font conservati. Un unico sistema di margini per tutte le sezioni, README con accenti verde/vino, alternanza carta/bianco. Mappa a sinistra e dettaglio a destra su desktop, disposizione verticale su mobile. Cronologia con date allineate, titoli 18px e descrizioni 14px/interlinea 1.8. Approccio in righe editoriali a tre colonne desktop, due su tablet e sequenza verticale mobile; tutti i contenuti conservati. Contatto più arioso.
- Correzioni circoscritte richieste dalla funzionalità: focus sulle sezioni, navigazione esplicita fluida anche verso hash diversi senza ricreare il DOM. Cronologia browser e movimento ridotto restano immediati. Animazioni leggere all'ingresso di progetti/fasi, contenuti sempre visibili e observer disconnesso all'uscita.
- Browser integrato: misure DOM a 1280/820/390/320 px senza overflow, un h1 e nessun ID duplicato; mappa a sinistra su desktop confermata. Ispezione immagini desktop, mappa, Approccio e mobile. Tab/Invio, Escape e focus del tree in fondo alla pagina verificati; refresh, Indietro/Avanti, conservazione bozza e città nei salti e ritorno da NetBox. Dashboard separate: immobiliare con cinque grafici, generator con input CSV; nessun caricamento dei loro moduli/Plotly all'apertura della landing.
- Limiti: browser condiviso non visibile (document.visibilityState = hidden), quindi animazione temporale dello smooth scroll e interazione fisica mouse/touch non certificabili; alcune attivazioni usano click DOM. Verificata tastiera e modalità movimento ridotto. Nessun telefono fisico, Safari/Firefox, screen reader, invio email o regressione completa dei filtri dashboard.
- `npm.cmd run check`: 26 test; build, diagnostica e diff superati. Nessuna pubblicazione. Prossimo passo: valutazione visiva di Edoardo nella scheda aperta; nessun incarico successivo automatico.
- Checkpoint Git tentato ma non creato: l'ambiente nega la scrittura di `.git/index.lock`. Le quattro modifiche restano nel working tree, pronte da revisionare e registrare; file estranei preservati.

## Piano per gli assistenti — 30 ottobre 2026

- Direzione: landing con quattro sezioni (Profilo, Progetti, Approccio, Collaborazioni); CV, dashboard, NetBox e documenti Approccio restano separati. Piano: `LANDING_AI_PLAN.md`. Registro: `LANDING_PROGRESS.md`. Schede: `landing-tasks/`.
- Base: `main` @ `31bf4867902916fbf0f4137e12a38a77674cccca`, tag `backup/pre-landing-2026-10-30`, branch `feat/landing-page`.
- Stato: 00–10 eseguiti; il rapporto `LANDING_QA.md` conserva il QA storico 07–08. Le verifiche correnti e i limiti dell'incarico 10 sono riportati sopra.
- Verifiche: check (26 test), build, diff superati. Prove browser in attesa.
- Modifiche: solo documentazione e sorgenti landing. Nessun push/merge/deploy. Un solo scrittore alla volta.
- Modificate soltanto documentazione e istruzioni per gli assistenti. Sito invariato. Compito 00 eseguito sul branch `feat/landing-page` e revisionato da Codex: commit `538c1cb3d224b07d16345b19dadc53bdf326c2f6` approvato senza problemi bloccanti. Il tag `backup/pre-landing-2026-10-30` conserva la base `31bf4867902916fbf0f4137e12a38a77674cccca`. Prossimo passo autorizzato: incarico 01.
- Compito 01 eseguito e revisionato sul branch di prova: `terminalHeader` e il compositore Collaborazioni accettano un livello semantico `h1`/`h2` e un ID facoltativo codificato, conservando `h1` e il markup visivo esistente per tutte le chiamate correnti. Aggiunti test mirati per default, sezione, escaping e modulo sempre aperto: `npm.cmd run check` superato (22 test), build e diagnostica completate. Profilo e Collaborazioni verificati a 1280/390 px: nessun overflow, campi visibili e struttura preesistente invariata. Prossimo incarico autorizzato: 02.
- Compito 02 eseguito e revisionato: Approccio mostra le cinque fasi in sequenza, con titolo, sintesi, testo, documentazione, tag e collegamento alla scheda separata; rimossi stato, binding e CSS dei tab e delle frecce. `npm.cmd run check` superato (22 test), build, diagnostica e `git diff --check` completati. Browser verificato a 1280 e 390 px: cinque articoli, un solo `h1`, nessun controllo residuo e nessun overflow orizzontale. Le cinque schede rispondono e tornano ad Approccio; Evolvere resta una bozza. Prossimo incarico autorizzato: 03.
- Compito 03 eseguito e revisionato: i quattro renderer accettano la modalità incorporata, `landing()` concatena Home/indice e le quattro sezioni con ID e gerarchia dei titoli coerenti, mentre `bindLanding(root)` riusa i binding di Profilo e Contatti. Il router resta invariato fino al compito 05. Superati 22 test, build, diagnostica e `git diff --check`; la prova DOM della composizione è intenzionalmente rinviata al compito 05. Prossimo incarico autorizzato: 04.
- Compito 04 eseguito e revisionato: `resolveView(hash)` traduce le route esistenti in destinazioni landing, progetto separato o not-found senza accedere al DOM. Coperti URL canonici, alias storici, input vuoto, percorsi sconosciuti, segmenti extra e input malformati; il router resta invariato fino al compito 05. Superati 26 test, diagnostica, controllo sintattico, build e `git diff --check`. Prossimo incarico autorizzato: 05.
- Compito 05 eseguito: render riscritto con `resolveView`, montaggio unico della landing, scroll per sezione, clic sulla stessa voce del tree, ritorno da progetto, `body.dataset.page='landing'`. 26 test, build e diff superati. Prove browser in attesa (nessun browser disponibile nella sessione); non passare alla rifinitura senza verifica. Prossimo incarico autorizzato: 06 (dopo verifica browser).
- Compito 06 eseguito: box compatte (min-height 240px), testata sticky, offset scroll-margin 84px, distanze uniformate, scorrimento fluido per clic volontari. 26 test, build e diff superati. Prove browser in attesa (nessun browser disponibile). Prossimo incarico autorizzato: 07 (dopo verifica browser).
- Compiti 05 e 06 revisionati in questa sessione (sola lettura): nessun problema rilevato a livello di codice. Diff coerenti con le schede. Prove browser restano NON VERIFICATO.
- Compito 07 eseguito: controlli automatici (check 26 test, build, diff) superati; rapporto QA in docs/LANDING_QA.md. Prove browser NON VERIFICATO (nessun browser). Prossimo incarico autorizzato: 08 (revisione finale).
- Compito 08 eseguito: revisione finale in sola lettura. Diff confrontato con base. CV, dashboard, NetBox e documenti separati confermati. Giudizio: continuità e fedeltà conservate; lunghezza/densità da valutare visivamente. Prove browser NON VERIFICATO. Prossimo passo: valutazione visiva di Edoardo.
- Compito 09 eseguito: miglioramento estetico della landing. Home con frase personale e linea decorativa, mappa con punti 28px e etichette con ombra, sezioni con separatore e sfondi alternati, intestazioni con prompt colorato per sezione, fade-in per le sezioni (prefers-reduced-motion rispettato), focus outline 4px, contatto con frase invito. 26 test, build e diff superati. Prove browser NON VERIFICATO. Prossimo passo: valutazione visiva di Edoardo.
- Compito 10 creato (non avviato): redesign estetico della landing. Feedback di Edoardo: le box di navigazione (Profilo/Progetti/Approccio/Contatti) devono sparire; mappa da riposizionare in versione desktop; cronologia da migliorare (font, grandezza, spazi); tutto il resto poco armonioso. Trattare come graphic designer professionista. Scheda in `docs/landing-tasks/10-redesign.md`. Prossimo passo autorizzato: 10 (dopo valutazione visiva di Edoardo).
- Compito 09 creato (non avviato): miglioramento estetico della landing. Scheda in `docs/landing-tasks/09-estetica.md`. File consentiti: style.css, script.js (solo animazioni/focus), index.html (solo classi/attributi), registro e STATUS. Prossimo passo autorizzato: 09 (dopo valutazione visiva di Edoardo).

## Sito e pubblicazione

- Sorgenti attivi in `proposal/`; `npm run build` genera `dist/`, escluso da Git. Il sito legacy alla radice è stato rimosso.
- Il workflow GitHub Actions esegue controlli e build sulle pull request; pubblica GitHub Pages dai push su `main` all'indirizzo https://edoardorana.github.io/.
- La PR #2 è stata integrata in `main` il 19 ottobre 2026 (commit `c460e09`). Nel run GitHub Actions `39244002565`, i job `check` e `deploy` sono riusciti.
- La preview Sites è separata e non si aggiorna con il push GitHub.
## Sito e pubblicazione

- Sorgenti attivi in `proposal/`; `npm run build` genera `dist/`, escluso da Git. Il sito legacy alla radice è stato rimosso.
- Il workflow GitHub Actions esegue controlli e build sulle pull request; pubblica GitHub Pages dai push su `main` all'indirizzo https://edoardorana.github.io/.
- La PR #2 è stata integrata in `main` il 19 ottobre 2026 (commit `c460e09`). Nel run GitHub Actions `39244002565`, i job `check` e `deploy` sono riusciti.
- La preview Sites è separata e non si aggiorna con il push GitHub.

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
