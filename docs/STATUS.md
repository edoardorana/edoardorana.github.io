# Stato del progetto

Aggiornato il 19 ottobre 2026. Le note precedenti sono state condensate; i commit già pubblicati restano nella cronologia Git.

## Percorsi nelle intestazioni — 19 ottobre 2026

- Sostituita l'etichetta della Home con `~/home`; le pagine interne mostrano `~/profilo`, `~/approccio`, `~/progetti`, `~/contatti` e `~/laboratorio` sopra il titolo. Le schede progetto usano il percorso completo; l'alias `#/percorso` mostra `~/profilo`.
- La descrizione introduttiva rimane sotto il titolo. I percorsi condividono colore, carattere e spaziatura delle altre etichette in stile terminale.
- Browser locale a 1280, 390 e 320 px: percorsi e disposizione verificati su tutte le route, comprese le schede e la pagina non trovata; nessun overflow orizzontale o errore JavaScript.
- Verificati apertura con Tab/Invio, Indietro e tocco singolo su Progetti. `npm.cmd run check` superato (11 test), `npm.cmd run build` superato e `git diff --check` senza errori.

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
