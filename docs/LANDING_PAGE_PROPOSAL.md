# Pagina unica — analisi e direzione approvata

30 ottobre 2026. **Struttura concordata e piano per gli altri assistenti richiesto da Edoardo.** Questo documento conserva l'analisi. Per eseguire il lavoro usare il [piano operativo](LANDING_AI_PLAN.md) e il [registro](LANDING_PROGRESS.md). Il sito non è ancora stato trasformato e nessuna pubblicazione è inclusa.

## Obiettivo

Conservare contenuti e identità visiva del portfolio, permettendo di leggere Profilo, Progetti, Approccio e Collaborazioni scorrendo un'unica pagina. Le quattro box diventano scorciatoie alle sezioni. Il menu `tree` resta disponibile.

La richiesta supera la precedente preferenza per sezioni separate. La prova sarà reversibile e verrà confrontata con la versione attuale prima di scegliere cosa pubblicare.

## Cosa emerge dall'analisi

- Il sito usa già un solo ingresso HTML, ma mostra una vista per volta: in [script.js](../proposal/script.js) ogni cambio di route sostituisce il contenuto principale e riporta lo scorrimento in cima. Le barre precedente/Home/successiva aggiungono passaggi alla lettura.
- Le box iniziali occupano molto spazio: su desktop la Home viene vincolata all'altezza dello schermo con scorrimento bloccato. Una landing richiederà di rimuovere quel vincolo, non soltanto aggiungere sezioni sotto le box.
- L'Approccio nasconde quattro delle cinque fasi dietro tab e frecce. Una sequenza verticale renderebbe leggibile l'intero metodo senza ulteriori cambi di pannello.
- Profilo è già lungo: circa 3.936 px a larghezza 390 px nel browser usato oggi. La dashboard immobiliare arriva a circa 5.583 px, a caricamento completato dei dati. Sono misure indicative dell'attuale layout, non obiettivi per la nuova pagina.
- Le dashboard sono moduli caricati su richiesta, con propri eventi, dati e pulizia delle risorse. Incorporarle tutte e subito nella landing aumenterebbe sia la lunghezza sia il lavoro iniziale del browser.
- Palette, font, bordi, comandi terminale e componenti esistono già. La trasformazione non richiede un nuovo framework o nuove dipendenze.

## Struttura concordata

1. **Testata compatta:** firma `Edo.`, descrizione attuale e `~$ tree`. La testata resta raggiungibile durante lo scorrimento, senza coprire il contenuto.
2. **Introduzione e indice:** README breve e quattro box più basse; quattro colonne desktop e griglia 2 × 2 mobile. Ogni box scorre alla sezione corrispondente. Il contenuto seguente deve essere percepibile fin dalla prima schermata.
3. **Profilo:** stessi contenuti professionali, mappa, luoghi, cronologia, competenze, lingue, interessi e collegamento al CV. Prima prova senza eliminare o riassumere informazioni; la lunghezza si valuta nel confronto.
4. **Progetti:** elenco e descrizioni dei due strumenti e di NetBox, con collegamenti alle rispettive pagine separate. Anche NetBox resta una scheda autonoma; si conserva la distinzione tra lavoro in corso e sviluppi futuri.
5. **Approccio:** cinque fasi in sequenza, con testi, risultati attesi e collegamenti alle schede operative. I documenti compilabili e stampabili restano autonomi; Evolvere resta una proposta.
6. **Collaborazioni:** email, GitHub e compositore esistenti, con oggetto e messaggio subito utilizzabili. L'azione prepara una bozza nel client email.

Le intestazioni mantengono i README terminali, i colori sobri, la tipografia e i bordi attuali. Si eliminano le barre di navigazione precedente/successiva tra i capitoli della landing. La voce Home, se mantenuta nel `tree`, significa soltanto inizio pagina.

## Decisione sugli approfondimenti

**Decisione confermata:** soltanto le quattro sezioni principali compongono la landing. Dashboard immobiliare, Dashboard generator e scheda NetBox restano pagine dedicate, aperte da Progetti e dal `tree`. Il ritorno porta alla sezione Progetti. CV e documenti operativi restano autonomi, con ritorno rispettivamente a Profilo e Approccio.

Questa soluzione permette di valutare subito la nuova lettura usando le dashboard già funzionanti. Il browser carica grafici e archivio immobiliare soltanto quando si apre lo strumento.

L'incorporamento degli strumenti dentro la landing è fuori da questa iterazione. Uscendo dalle dashboard resta il loro comportamento attuale: nessuna nuova conservazione persistente di CSV, filtri o configurazioni.

## Mappa del progetto e impatto previsto

| Parte | Riferimenti | Impatto della trasformazione |
| --- | --- | --- |
| Ingresso e menu | [index.html](../proposal/index.html) | `tree`, collegamenti, accessibilità e descrizione iniziale. |
| Viste e navigazione | [script.js](../proposal/script.js), [data.mjs](../proposal/data.mjs) | Comporre le sezioni; distinguere salti nella pagina e apertura degli strumenti; mantenere gli alias. |
| Aspetto | [style.css](../proposal/style.css) | Ridurre altezza delle box, rimuovere il blocco dello scorrimento della Home, regolare distanze e testata. Riutilizzare palette e font. |
| Intestazioni e contatto | [terminal-header.mjs](../proposal/terminal-header.mjs), [contact.mjs](../proposal/contact.mjs) | Gerarchia dei titoli adatta a una pagina unica; compositore montato una sola volta, bozza conservata durante i salti. |
| Strumenti dati | [housing/](../proposal/housing/), [explorer/](../proposal/explorer/), [charts/](../proposal/charts/) | Preservare logica e caricamento su richiesta; adattare i collegamenti di ritorno. |
| Documenti | [cv.html](../proposal/cv.html), [approccio/](../proposal/approccio/) | Conservare documenti e stampa; verificare che i ritorni aprano la sezione corretta. |
| Verifiche e pubblicazione | [tests/](../tests/), [package.json](../package.json), [scripts/](../scripts/), [workflow](../.github/workflows/portfolio-checks.yml) | Adeguare i test di navigazione e struttura; conservare test dei dati e flusso di build. Nessuna rigenerazione dei dati necessaria. |
| Contesto degli assistenti | [AGENTS.md](../AGENTS.md), [CLAUDE.md](../CLAUDE.md), [GEMINI.md](../GEMINI.md), [istruzioni Copilot](../.github/copilot-instructions.md), [contesto](PROJECT_CONTEXT.md), [stato](STATUS.md), [guida VS Code](SETUP_VSCODE.md) | Regole allineate durante la preparazione del piano; mantenere distinta la specifica dallo stato implementato. |

## Riepilogo del piano

1. **Struttura concordata:** box come indice, quattro sezioni in sequenza, tutti gli approfondimenti separati.
2. **Fissare il punto di ritorno:** registrare il commit della versione corrente e creare un branch per la prova. Conservare la versione corrente su `main`; nessuna pubblicazione automatica dell'esperimento.
3. **Contesto preparato:** specifica, istruzioni aggiornate, prompt e nove incarichi piccoli e sequenziali sono nel piano operativo.
4. **Comporre la pagina:** riutilizzare i blocchi e i testi esistenti, mostrare le cinque fasi dell'Approccio e conservare tutti i collegamenti alle schede, compresa NetBox.
5. **Adattare la navigazione:** box e `tree` diventano scorciatoie; gestire URL, focus e cronologia senza ricostruire la pagina a ogni salto. Collegare gli strumenti secondo la scelta approvata.
6. **Rifinire e verificare:** spaziatura, mobile, tastiera, movimento ridotto, collegamenti storici e controlli automatici. Confrontare la prova locale con la versione attuale su compiti concreti.
7. **Valutare insieme:** scegliere se mantenere, correggere o scartare l'esperimento. Tornare alla versione precedente significa riaprire il riferimento salvato, dopo aver conservato il lavoro della prova; non cancellare modifiche o riscrivere la storia Git.

## Criteri per valutare la prova

- Si possono leggere le quattro sezioni principali senza cambiare vista.
- Le box e il `tree` raggiungono la destinazione con una sola azione; nessuna intestazione resta nascosta dietro la testata.
- Il `tree` mantiene annidamento compatto, chiusura con Escape e uso da tastiera. La sezione corrente può essere evidenziata senza spostare il focus durante lo scorrimento manuale.
- Il contenuto professionale resta completo e fedele; mappa e selezione dei luoghi funzionano; una bozza email non si perde spostandosi fra sezioni.
- Gli URL esistenti continuano a raggiungere contenuti equivalenti, inclusi `#/home`, `#/percorso`, gli alias dei progetti e i ritorni da CV e schede operative. Refresh e Indietro/Avanti restano coerenti.
- Si conserva una gerarchia corretta dei titoli e degli identificativi: i componenti oggi pensati come pagine autonome non vanno semplicemente concatenati con più titoli principali.
- Dashboard, CSV, filtri ed esportazioni continuano a funzionare. Nessun caricamento anticipato dell'archivio immobiliare o dei grafici nella landing iniziale.
- Nessuno scorrimento orizzontale indesiderato a 320/390 px e desktop; le tabelle possono mantenere il proprio scorrimento interno. Lo scorrimento animato rispetta la preferenza di movimento ridotto.
- `npm.cmd run check` e build superati. Le verifiche browser completano i test automatici.

Compiti per il confronto: arrivare dal primo schermo a una descrizione del lavoro; trovare un progetto; leggere tutte le fasi del metodo; raggiungere e compilare il contatto; aprire uno strumento e tornare al suo contesto. Osservare continuità, chiarezza e lunghezza, senza attribuire miglioramenti misurati prima della prova.

## Coordinamento degli altri assistenti

Il [piano operativo](LANDING_AI_PLAN.md) è il riferimento per tutte le estensioni. Ogni incarico ha un solo obiettivo, pochi file indicati, comportamento atteso, verifica concreta e formato di resoconto. Un assistente modifica; la revisione avviene sul diff prima dell'incarico successivo. Nessuna scrittura simultanea sugli stessi file.

I prompt sono pronti da copiare. Allegare esplicitamente piano, registro e singola scheda anche agli strumenti che non caricano automaticamente i documenti del repository. Tutti gli incarichi risultano ancora da iniziare nel registro.

## Verifiche della versione di partenza

- Branch locale `main`, commit `31bf486`; al principio dell'analisi nessuna modifica locale. Non è stato eseguito un aggiornamento dal remoto.
- Task `Portfolio: controlli`: sintassi e 20 test Node superati.
- Task `Portfolio: build`: build completata tramite lo script di progetto. L'output generato non è stato modificato manualmente.
- Browser integrato: Home, quattro sezioni principali e tre progetti aperti a 1280 e 390 px; nessun overflow orizzontale della pagina rilevato.
- Menu aperto con Invio e chiuso con Escape, con focus restituito al pulsante. Verificati Indietro/Avanti e refresh nel passaggio Home/Profilo.
- Nessuna modifica ai sorgenti del sito o pubblicazione. Questo controllo serve come base per il piano: non è un nuovo audit completo di tutti i flussi delle dashboard, della libreria Plotly o della pipeline offline. Non ripetuti test Python; nessuna prova su telefono fisico, Safari, Firefox o lettore di schermo.
