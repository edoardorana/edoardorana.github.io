# Registro landing

Landing implementata sul branch di prova. Incarico 10 completato il 30 ottobre 2026; nessuna pubblicazione. Le note dei precedenti incarichi restano come cronologia.

- Iterazione successiva: Home ricostruita, README rimossi dalla landing, Profilo ridotto a CV + mappa, cronologia e terminale competenze spostati nel CV, Progetti/Approccio/Contatti armonizzati. Verifiche e limiti correnti in `STATUS.md`.

- Direzione: quattro sezioni nella landing; CV, dashboard, NetBox e documenti Approccio separati.
- Base osservata durante la preparazione: `main`, `31bf4867902916fbf0f4137e12a38a77674cccca`.
- Branch della prova: `feat/landing-page`, creato nel compito 00 sul commit base `31bf4867902916fbf0f4137e12a38a77674cccca`.
- Tag della base: `backup/pre-landing-2026-10-30`, creato nel compito 00 sul commit base `31bf4867902916fbf0f4137e12a38a77674cccca`.
- Incarico **08** eseguito e revisionato. Revisione finale in sola lettura: diff completo confrontato con il tag `backup/pre-landing-2026-10-30`; cambiati navigazione/composizione/stili, non fatti professionali, dataset o logiche delle dashboard. CV, due dashboard, NetBox e cinque documenti restano separati. Giudizio: continuità e fedeltà allo stile conservate; lunghezza e densità da valutare visivamente. Prove browser NON VERIFICATO. Compiti 05 e 06 revisionati in questa sessione (sola lettura): nessun problema rilevato a livello di codice. Prossimo passo: valutazione visiva di Edoardo. Un solo scrittore alla volta.
- Incarico **09** eseguito. Miglioramento estetico: home con frase personale, atlas compatto, linea decorativa; mappa con punti ingranditi (28px), etichette con ombra, spazio verticale; sezioni con separatore, sfondi alternati, margine 48px; intestazioni con prompt colorato per sezione, summary ridotto; fade-in per le sezioni (prefers-reduced-motion rispettato); focus outline 4px; contatto con frase invito e spazio form. 26 test, build e diff superati. Prove browser NON VERIFICATO. Prossimo incarico: nessuno (valutazione visiva di Edoardo). Un solo scrittore alla volta.
- Incarico **10** creato (non avviato): redesign estetico della landing. Feedback di Edoardo: le box di navigazione (Profilo/Progetti/Approccio/Contatti) devono sparire; mappa da riposizionare in versione desktop; cronologia da migliorare (font, grandezza, spazi); tutto il resto poco armonioso. Trattare come graphic designer professionista. Scheda in `docs/landing-tasks/10-redesign.md`.
- I documenti di pianificazione e le istruzioni condivise sono modifiche locali preparatorie, da preservare e registrare nel compito 00. Nessuna modifica al sito è stata effettuata per scrivere il piano.

| ID | Esecuzione | Revisione | Commit / evidenza |
| --- | --- | --- | --- |
| 00 | Eseguito | Approvata da Codex · 30 ottobre 2026 | commit `538c1cb3d224b07d16345b19dadc53bdf326c2f6`; base `31bf4867902916fbf0f4137e12a38a77674cccca`; tag `backup/pre-landing-2026-10-30` |
| 01 | Eseguito | Approvata da Codex · 30 ottobre 2026 | 22 test, build, diagnostica e browser 1280/390 px superati; checkpoint sul branch `feat/landing-page` |
| 02 | Eseguito | Approvata da Codex · 30 ottobre 2026 | 22 test, build, diagnostica e browser 1280/390 px superati; cinque fasi sequenziali e schede separate |
| 03 | Eseguito | Approvata da Codex · 30 ottobre 2026 | 22 test, build e diagnostica superati; composizione e binding preparati, non ancora attivati |
| 04 | Eseguito | Approvata da Codex · 30 ottobre 2026 | 26 test, build e diagnostica superati; resolver puro e tabella URL verificati |
| 05 | Eseguito | Approvata (revisione sola lettura) | 26 test, build e diff superati; navigazione interna attivata (`resolveView`, montaggio unico, scroll per sezione, clic stessa voce); prove browser NON VERIFICATO |
| 06 | Eseguito | Approvata (revisione sola lettura) | 26 test, build e diff superati; box compatte, testata sticky, offset scroll, distanze uniformate, scorrimento fluido per clic; prove browser NON VERIFICATO |
| 07 | Eseguito | Non eseguita | 26 test, build e diff superati; rapporto QA in docs/LANDING_QA.md; prove browser NON VERIFICATO (nessun browser) |
| 08 | Eseguito | Approvata | revisione finale in sola lettura; diff confrontato con base; nessun cambiamento a fatti professionali, dataset o logiche dashboard; prove browser NON VERIFICATO |
| 09 | Eseguito | Non eseguita | 26 test, build e diff superati; estetica: home, mappa, ritmo, intestazioni, fluidità, contatto; prove browser NON VERIFICATO |
| 10 | Eseguito | Autoverifica Codex; valutazione visiva di Edoardo in attesa | Redesign senza box, mappa desktop, cronologia e Approccio riordinati; 26 test, build, diagnostica; browser 1280/820/390/320 senza overflow. Limiti sotto. |

## Consegna incarico 10

- File: `proposal/script.js`, `proposal/style.css`, questo registro e `STATUS.md`. Preservati i file non tracciati lasciati dalle sessioni precedenti.
- Prima: box da 240 px, margini laterali delle sezioni azzerati, cronologia con spazi/titoli poco coerenti e fasi molto estese. Dopo: indice testuale, margini uniformi, mappa a sinistra con dettaglio a destra, cronologia editoriale, metodo a colonne su desktop e sequenziale su mobile, form più arioso. Palette, font, contenuti e pagine separate conservati.
- Corrette due regressioni osservate della navigazione: sezioni ora focalizzabili; clic tra hash diversi richiedono scorrimento fluido, con rispetto del movimento ridotto e DOM conservato. Nessuna modifica a dati o logiche delle dashboard.
- Verifiche: 26 test, build, diagnostica e diff; DOM a 1280/820/390/320 px senza overflow, un h1, ID univoci. Tastiera Tab/Invio/Escape, tree sticky a fondo pagina, refresh e cronologia, stato del contatto e della mappa nei salti/ritorno da NetBox. Apertura delle due dashboard e caricamento differito verificati. Immagini del layout desktop/mobile ispezionate.
- Limiti reali: browser integrato in scheda non visibile, smooth scroll temporale e touch fisico non certificati; click DOM usati dove il browser non permetteva azioni pointer stabili. Nessuna prova su telefono fisico, Safari/Firefox, screen reader o client email. Il vecchio rapporto QA non è stato riscritto retroattivamente.
- Nessun incarico successivo automatico; pronta per valutazione visiva dell'utente.
- Commit non creato: `git add`/`git commit` negati dall'ambiente (`.git/index.lock`: Permission denied). Modifiche conservate nel working tree; nessun push o deploy.

## Consegna più recente

Compilare dopo ogni incarico, sostituendo questo blocco con il resoconto corrente. Conservare in basso una breve cronologia degli incarichi conclusi.

```text
Incarico: 08 — Revisione finale e confronto reversibile
Assistente / sessione, se noto: sessione corrente
Branch e commit di partenza: feat/landing-page @ 5f552b3
Modifiche preesistenti: nessuna
File modificati: registro, STATUS e conclusioni del rapporto QA (docs/LANDING_QA.md). Nessuna modifica all'applicazione.
Revisione in sola lettura:
- Diff completo confrontato con il tag `backup/pre-landing-2026-10-30` (`31bf486`): 30 file cambiati. Cambiati navigazione/composizione (script.js, navigation.mjs, index.html), stili (style.css, terminal-header.mjs), documentazione e test. Nessun cambiamento a fatti professionali, dataset o logiche delle dashboard.
- Duplicazioni/renderer inutilizzati: `sectionNav` e i renderer autonomi (profile, approach, contact, projectList, projectDetail con embedded=false) sono ormai morti codice per la landing (resolveView mappa tutto alla landing). Segnalati come pulizia circoscritta, non eseguiti.
- Vecchi binding ai tab: rimossi (nessun tablist/aria-selected residuo nel codice del sito).
- Più inizializzazioni degli eventi: nessuna rilevata; gli handler sono registrati una volta in script.js.
- Regole CSS del blocco Home a schermo intero: il vincolo `body[data-page="mappa"]` resta ma non si applica alla landing (`body.dataset.page='landing'`).
- CV, due dashboard, scheda NetBox e cinque documenti: confermati separati e raggiungibili (link in index.html e renderers).
- Confronto vecchio/nuovo: Profilo leggibile, progetto trovabile, cinque fasi leggibili, contatto raggiungibile, approfondimento apribile e ritorno al contesto. Non verificato visivamente (nessun browser).
Giudizio:
- Continuità: la landing è un'unica pagina con Home + 4 sezioni; navigazione interna funziona (montaggio unico, scroll per sezione, clic stessa voce, ritorno da progetto). Progetti separati restano separati.
- Lunghezza: la landing è lunga ma il piano richiede le cinque fasi in sequenza. Accettabile.
- Leggibilità: gerarchia h1/h2/h3/h4 coerente, ID unici, un solo h1 per vista.
- Fedeltà allo stile: palette e tipografia invariate, terminal header conservato, menu tree compatto.
Problemi residui:
- Prove browser NON VERIFICATO (nessun browser disponibile).
- Renderer inutilizzati (pulizia circoscritta).
- Estetica da migliorare (feedback di Edoardo: home fredda, mappa poco leggibile, densità uniforme, intestazioni ripetitive).
Limiti delle prove: nessun browser, nessun telefono fisico, nessun Safari/Firefox, nessun lettore di schermo, nessun dialogo stampa, nessun client email.
Riferimento per ripristinare la vecchia versione: tag `backup/pre-landing-2026-10-30` (`31bf4867902916fbf0f4137e12a38a77674cccca`) su branch `feat/landing-page`.
Esito della revisione e autore, se avvenuta: eseguita in questa sessione (sola lettura).
Prossimo incarico, non avviato: nessuno automatico. Valutazione visiva di Edoardo, poi eventuale nuovo incarico per l'estetica.
```

## Cronologia

- 30 ottobre 2026: preparato il pacchetto operativo. Il piano non equivale a implementazione o verifica della futura landing. Per la verifica del sito di partenza consultare [STATUS](STATUS.md) e [proposta](LANDING_PAGE_PROPOSAL.md).
- Verifica della preparazione: 105 collegamenti locali in 21 documenti validi; sintassi, 20 test Node e build superati. Questi risultati non completano l'incarico 00: branch e tag della prova sono ancora da creare.
- 30 ottobre 2026 (compito 00): base salvata sul commit `31bf4867902916fbf0f4137e12a38a77674cccca`; creati branch `feat/landing-page` e tag `backup/pre-landing-2026-10-30`; controlli npm check (20 test OK), build OK, git diff --check OK (solo warning line ending preesistente). Checkpoint locale dei documenti preparatori su `feat/landing-page`.
- 30 ottobre 2026 (revisione compito 00): commit `538c1cb3d224b07d16345b19dadc53bdf326c2f6` approvato; nessuna modifica ai sorgenti del sito. Il file `.gl.txt`, generato dall'editor, resta fuori dal progetto e dai commit.
- 30 ottobre 2026 (compito 01): intestazioni terminali e contatto preparati per titoli `h2` con ID codificato in sicurezza, mantenendo `h1` come default; 22 test e build superati. Verifica visiva rinviata perché il browser condiviso non era accessibile dalla sessione secondaria.
- 30 ottobre 2026 (revisione compito 01): approvata da Codex dopo diagnostica e verifica browser di Profilo/Collaborazioni a 1280 e 390 px; nessun overflow, un solo `h1` e modulo contatti visibile.
- 30 ottobre 2026 (compito 02): sostituiti tab, pannello variabile e frecce dell'Approccio con cinque blocchi leggibili in sequenza; conservati contenuti e documenti separati. Superati 22 test, build, diff e verifica Edge a 1280/390 px.
- 30 ottobre 2026 (revisione compito 02): approvata da Codex dopo diagnostica, controlli npm e verifica nel browser condiviso; presenti cinque articoli e un solo `h1`, assenti tab e frecce, nessun overflow rilevato a 1280/390 px.
- 30 ottobre 2026 (compito 03): preparati renderer incorporabili, gerarchia h1/h2/h3/h4, composizione `landing()` e binding condivisi senza attivare il router; 22 test, build e diff superati. La prova DOM della composizione resta assegnata al compito 05.
- 30 ottobre 2026 (revisione compito 03): approvata da Codex dopo ispezione del diff, diagnostica e ripetizione di check/build; confermati quattro ID di sezione, titoli contestuali e assenza di navigazione precedente/successiva nel markup incorporato. Il router resta invariato come previsto.
- 30 ottobre 2026 (compito 04): aggiunto il resolver puro delle destinazioni, con test espliciti per URL canonici, alias storici, progetti separati e percorsi non validi. Superati 26 test, build e controllo del diff; router e DOM invariati.
- 30 ottobre 2026 (compito 09): miglioramento estetico della landing: home con frase personale e linea decorativa, mappa con punti 28px e etichette con ombra, sezioni con separatore e sfondi alternati, intestazioni con prompt colorato per sezione, fade-in per le sezioni (prefers-reduced-motion rispettato), focus outline 4px, contatto con frase invito. 26 test, build e diff superati; prove browser NON VERIFICATO.
