# Piano di esecuzione — prossima iterazione

Preparato il 28 ottobre 2026. Questo documento raccoglie decisioni e attività concordate; non descrive funzionalità già pubblicate.

## Obiettivo

Rendere il portfolio più essenziale nel linguaggio terminale, più concreto nella sezione Approccio e realmente utilizzabile nei due progetti dati. La modifica deve conservare il sito statico, le route esistenti, l’accessibilità da tastiera e l’assenza di dipendenze npm.

## Decisioni consolidate

### Linguaggio terminale

- Rimuovere `edo@debian:` da tutto il sito.
- Il comando di pagina diventa `~/percorso$ cat readme.md`.
- Il **prompt di attesa** è `~/percorso$ ▋` e viene conservato per il compositore email di Collaborazioni.
- Eliminare i prompt finali decorativi dalle altre pagine.
- Il menu `~$ tree` resta invariato.

### Home

- Ogni area mostra normalmente soltanto il titolo.
- Su desktop con mouse, hover e focus da tastiera mostrano soltanto `~/area$ cat readme.md`.
- Non mostrare descrizione, output README o prompt finale.
- Sui dispositivi senza hover il comando non appare mai: il titolo resta visibile e un tocco apre subito la pagina.
- Conservare quattro colonne desktop e griglia 2 × 2 mobile nell’ordine Profilo, Progetti, Approccio, Collaborazioni.

### Profilo

- Riscrivere il README con tono diretto, collegando infrastrutture Linux, database, automazione, analisi di log e formazione statistica.
- Eliminare `LUOGHI E CRONOLOGIA`.
- Riscrivere introduzione e testi di Milano, Tromsø, Zugo e Stoccarda.
- Rimuovere dalla mappa le etichette visive `DA REMOTO` e `SOGGIORNO`.
- Conservare nei testi le precisazioni corrette: Zugo è il riferimento dell’azienda con cui si lavora da remoto; Stoccarda è un periodo personale in Germania.
- Rimuovere il prompt di attesa finale dal terminale delle competenze.

### Dashboard immobiliare

- Aggiungere filtri minimo/massimo per prezzo al metro quadro.
- Rendere i grafici coordinati: un’interazione aggiorna filtri, KPI, tutti i grafici, tabella ed esportazione.
- Mostrare i filtri applicati come elementi rimovibili e offrire un azzeramento globale.
- Consentire una personalizzazione guidata di dimensione, misura e aggregazione per ciascun grafico; mostrare soltanto combinazioni compatibili con i dati immobiliari.
- Ridurre `Fonte, pulizia e limiti` a una sintesi leggibile. Conservare conteggi verificati e indicare che il dataset è storico e dimostrativo.
- Non presentare l’archivio come fotografia del mercato attuale.

### Dashboard generator

- Ricostruire l’esperienza come percorso guidato: Carica → Controlla → Prepara → Scegli la domanda → Costruisci.
- Mantenere elaborazione interamente locale nel browser, esportazione CSV e Plotly locale.
- Rendere espliciti gli errori di separatore, codifica, intestazioni, righe incoerenti e tipi non compatibili.
- Aggiungere drag and drop e mantenere un dataset dimostrativo.
- Presentare schema e tipi suggeriti prima delle trasformazioni.
- Rendere le trasformazioni essenziali, reversibili e comprensibili: rinomina, spazi, maiuscole/minuscole, mancanti, duplicati, date e numeri.
- Segnalare i valori anomali senza eliminarli automaticamente.
- Guidare la scelta del grafico tramite la domanda: distribuzione, confronto, relazione, evoluzione temporale o composizione.
- Applicare la logica di compatibilità di From Data to Viz senza copiare codice esterno e senza aggiungere una libreria se Plotly copre la visualizzazione.

### Approccio

- Conservare i cinque blocchi nella pagina principale e rimuovere i tre blocchi `Ambito definito`, `Strumenti proporzionati` e `Continuità operativa`.
- Usare un tono sicuro e diretto; eliminare formule come “partirei”, “confronterei”, “valuterei” e l’etichetta `POSSIBILE OUTPUT`.
- Ogni fase deve collegare un documento HTML autonomo, sobrio e stampabile come `cv.html`, con un artefatto realmente consultabile.
- `01 Capire`: questionario operativo su problema, utenti, decisioni, fonti, vincoli, priorità e criterio di riuscita.
- `02 Raccogliere`: schema compilabile del flusso dati con origine, responsabile, accesso/protocollo, frequenza, trasformazioni, controlli e destinazione. Nessun IP reale.
- `03 Custodire`: matrice accessi e piano backup con responsabilità, retention, copia esterna, RPO/RTO e prova di ripristino.
- `04 Leggere`: wireframe commentato di una dashboard con indicatori, filtri, grafici, tabella e definizioni; collegamento agli esempi del portfolio.
- `05 Evolvere`: contenuto ancora da approvare. Direzione proposta: piano di esercizio e miglioramento con osservazioni post-rilascio, priorità, responsabili, verifica, rollback, registro modifiche e cadenza di revisione.

### Collaborazioni

- Inserire nel banner README email e GitHub. Non aggiungere LinkedIn.
- Sostituire il form attuale con un compositore terminale `mail --new`.
- Flusso: `oggetto: ▋`, poi `messaggio: ▋`.
- Invio sull’oggetto passa al messaggio; `Shift+Invio` crea una nuova riga; `Ctrl+Invio` prepara un URL `mailto:`.
- Dopo l’apertura del programma di posta mostrare `bozza preparata` e il prompt `~/contatti$ ▋`.
- Non mostrare “messaggio inviato”: il sito non può verificarlo.
- Conservare copia manuale dell’indirizzo e una spiegazione se il client email non si apre.

## Mappa tecnica

### Shell, Home, Profilo e Collaborazioni

- `proposal/terminal-header.mjs`: formato condiviso dei README.
- `proposal/script.js`: Home, Profilo, mappa, Approccio, Collaborazioni e binding delle interazioni.
- `proposal/data.mjs`: testi Home, fasi dell’Approccio e contenuti dei luoghi.
- `proposal/style.css`: reveal desktop, comportamento touch, prompt, documenti e compositore email.
- `tests/portfolio.test.mjs`: assenza globale di `edo@debian`, route, semantica e contenuti essenziali.

### Dashboard immobiliare

- `proposal/housing/metrics.mjs`: filtro €/m² e funzioni pure per cross-filter e aggregazioni.
- `proposal/housing/page.mjs`: stato condiviso, eventi Plotly, controlli dei grafici, filtri attivi e metodologia abbreviata.
- `tests/housing.test.mjs`: intervalli €/m², combinazione filtri, selezioni da grafico e reset.
- Il dataset `proposal/housing/milano-2021.json` non deve essere rigenerato senza una ragione verificata.

### Dashboard generator

- `proposal/explorer/core.mjs`: parsing e trasformazioni pure da conservare e ampliare solo dove necessario.
- `proposal/explorer/page.mjs`: principale area da ricostruire come procedura guidata.
- `proposal/explorer/charts.mjs`: matrice di compatibilità tra domanda, tipi di colonna e grafico.
- `tests/explorer.test.mjs`: errori di importazione, tipi, trasformazioni, compatibilità e aggregazioni.

### Documenti Approccio

- Prevedere una cartella `proposal/approccio/` con cinque pagine HTML e un foglio di stile condiviso.
- Le pagine devono funzionare direttamente, essere stampabili, non caricare risorse esterne e tornare a `#/approccio`.
- La build deve includerle senza modificare manualmente `dist/`.

## Sequenza di esecuzione

1. Registrare baseline: stato Git, `npm.cmd run check`, `npm.cmd run build` e screenshot desktop/mobile delle viste interessate.
2. Uniformare shell, Home, Profilo e Collaborazioni; aggiornare i test di struttura e tastiera.
3. Riscrivere testi Profilo e luoghi; verificare che le precisazioni geografiche restino corrette.
4. Rivedere Approccio e costruire i documenti 01–04. Definire e approvare il contenuto 05 prima della versione definitiva.
5. Estendere le funzioni pure della dashboard immobiliare, poi collegare cross-filter e configurazione dei grafici.
6. Ricostruire Dashboard generator mantenendo parsing ed export già verificati; sostituire progressivamente l’interfaccia.
7. Eseguire controlli automatici, build, diagnostica e `git diff --check`.
8. Verificare nel browser desktop e mobile emulato: Home, Profilo, cinque documenti, dashboard immobiliare, importazione CSV, grafici, Collaborazioni, refresh e Indietro/Avanti.
9. Creare una pull request con commit separati per shell/contenuti, Approccio, dashboard immobiliare, generator e Collaborazioni.
10. Integrare e verificare GitHub Pages solo dopo controlli riusciti.

## Criteri di accettazione

- Nessuna occorrenza visibile di `edo@debian:`.
- Home: comando visibile solo con hover/focus su dispositivi con hover; mai visibile su touch.
- Nessun prompt finale fuori dal compositore email.
- Tutte le route attuali, alias, refresh e Indietro/Avanti continuano a funzionare.
- I documenti Approccio sono leggibili, stampabili e accessibili da tastiera.
- Ogni filtro immobiliare produce gli stessi record in KPI, grafici, tabella ed export.
- Un filtro generato da un grafico è visibile, rimovibile e azzerabile.
- Il generatore spiega perché un file o una combinazione di colonne non è valida e propone soltanto grafici compatibili.
- `mail --new` non dichiara un invio che non può verificare.
- Nessun overflow orizzontale a 1280, 390 e 320 px.
- `npm.cmd run check`, `npm.cmd run build` e `git diff --check` riusciti.

## Decisione ancora aperta

Il documento `05 Evolvere` richiede un ultimo confronto prima dell’implementazione definitiva. La proposta corrente è un piano operativo post-rilascio, non una pagina dedicata genericamente a AI o machine learning.
