# Landing page — piano operativo per gli assistenti

## Stato e uso

Direzione approvata da Edoardo il 30 ottobre 2026. Questo pacchetto prepara il lavoro per le altre AI; **la landing non è ancora implementata**. Eseguire soltanto l'incarico assegnato. Il primo è **00**. Nessuna pubblicazione è inclusa.

La [proposta](LANDING_PAGE_PROPOSAL.md) contiene l'analisi; questo documento contiene le decisioni operative. Il [registro](LANDING_PROGRESS.md) indica cosa è stato realmente eseguito. Le vecchie note descrivono la storia del progetto, non istruzioni per ripristinare il vecchio design.

Per ogni nuova chat: allegare questo file, [AGENTS.md](../AGENTS.md), il registro e **una sola scheda** della tabella. Leggere inoltre la decisione corrente in testa a [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) e [STATUS.md](STATUS.md). Consultare il resto solo se necessario. Se l'estensione non può leggere i file, incollare i contenuti: non presumere che condivida la memoria di altre chat.

## Specifica comune

- La landing contiene, nell'ordine, introduzione/box, Profilo, Progetti, Approccio, Collaborazioni. Nessuna barra precedente/Home/successiva fra queste sezioni.
- Le quattro box diventano un indice compatto: quattro colonne desktop, 2 × 2 mobile. Solo titolo a riposo; comando `cat readme.md` su hover/focus desktop, mai su touch. Un tocco porta alla sezione.
- Conservare `Edo.`, palette, font, bordi e README terminali. Nessuno slogan, nuova grafica, framework o dipendenza. Tutti i contenuti professionali restano disponibili; adattare soltanto istruzioni di navigazione divenute inesatte.
- Il `tree` mantiene etichette e annidamento compatto, senza connettori testuali. Testata raggiungibile durante lo scorrimento; chiusura con Escape, clic esterno e selezione di un collegamento.
- Profilo conserva mappa, cronologia, competenze, lingue, interessi e CV. Le cinque fasi Approccio sono tutte leggibili in sequenza, con testi, tag e link alle schede.
- **CV, dashboard, scheda NetBox e cinque documenti Approccio restano separati.** Nessun iframe o dashboard incorporata nella landing. Le schede progetto tornano alla sezione Progetti; CV torna a Profilo; documenti tornano ad Approccio.
- I campi del contatto sono sempre visibili. `mailto:` prepara una bozza, non invia posta. Conservare la bozza nei salti interni e nel ritorno da una scheda progetto nella stessa sessione; non introdurre salvataggi persistenti.
- Non cambiare dati immobiliari, parser CSV, calcoli, grafici o documenti stampabili. Conservare caricamenti differiti e pulizia delle dashboard. Uscire da una dashboard mantiene l'attuale comportamento: la sua sessione non viene conservata; non promettere persistenza del CSV.
- Sorgenti in [proposal/](../proposal/); output generato in `dist/`. Nessuna modifica manuale all'output, a credenziali o file privati.

## Contratto di navigazione

Conservare gli URL hash esistenti: non introdurre in parallelo un secondo schema `#profilo`. Il parser attuale continua a risolvere alias e URL sconosciuti; un piccolo adattatore distingue la vista dalla sezione.

| URL | Destinazione |
| --- | --- |
| vuoto, `#/`, `#/home`, `#/mappa` | Landing, inizio |
| `#/profilo`, `#/percorso` | Landing, Profilo |
| `#/progetti`, `#/laboratorio` | Landing, Progetti |
| `#/approccio` | Landing, Approccio |
| `#/contatti` | Landing, Collaborazioni |
| `#/progetti/production-databases` | Scheda NetBox separata |
| `#/progetti/immobiliare-data`, `#/progetti/market-data` | Dashboard immobiliare separata |
| `#/progetti/dashboard-generator`, `#/progetti/csv-explorer` | Dashboard generator separata |
| `#/progetti/business-intelligence`, `#/progetti/sb-italia` | Landing, Profilo |
| URL non riconosciuto | Pagina 404 esistente |

- Una sola landing montata: cambiare hash fra le sezioni non sostituisce il DOM e non riassocia gli eventi. Mappa e modulo conservano lo stato.
- Un clic aggiorna l'hash e raggiunge la sezione; cliccare di nuovo la stessa destinazione deve funzionare anche senza `hashchange`.
- L'apertura diretta e il refresh raggiungono la sezione dopo il rendering. Indietro/Avanti rispettano la destinazione nella cronologia; tornando da un progetto si ritrova la sezione precedente, non la cima per errore.
- Scorrimento manuale: nessuna modifica automatica dell'hash o della cronologia, nessuno spostamento del focus. L'evidenziazione basata sulla posizione di scorrimento è fuori da questa prima prova; il `tree` indica la destinazione selezionata.
- Focus sul titolo/contenitore della sezione soltanto durante una navigazione esplicita o iniziale, con `preventScroll` e offset coerente. Il link «Vai al contenuto» e `#main` restano un caso separato dal parser.
- Nella landing un solo `h1`, sezioni principali `h2`, sottosezioni `h3` e figli `h4` quando necessario. Gli approfondimenti mantengono il proprio `h1`.
- Lo scorrimento fluido riguarda i clic interni; movimento ridotto, apertura iniziale e cronologia usano scorrimento immediato. Non usare View Transitions o scorrimento a scatti obbligati.

## Incarichi, da eseguire in ordine

| ID | Scheda | Risultato |
| --- | --- | --- |
| 00 | [Punto di ritorno](landing-tasks/00-baseline.md) | Branch di prova e base salvata |
| 01 | [Titoli riutilizzabili](landing-tasks/01-headings.md) | Componenti compatibili con pagine e sezioni |
| 02 | [Approccio in sequenza](landing-tasks/02-approach.md) | Cinque fasi visibili senza tab |
| 03 | [Composizione della landing](landing-tasks/03-composition.md) | Rendering e binding pronti, ancora non attivati |
| 04 | [Destinazioni e alias](landing-tasks/04-routes.md) | Adattatore puro e test |
| 05 | [Navigazione nella pagina](landing-tasks/05-navigation.md) | Landing attiva e approfondimenti separati |
| 06 | [Layout e tree](landing-tasks/06-layout.md) | Box compatte e testata accessibile su mobile |
| 07 | [Verifica completa](landing-tasks/07-verification.md) | Checklist con evidenze e problemi riproducibili |
| 08 | [Revisione e confronto](landing-tasks/08-review.md) | Esito finale e prova reversibile per Edoardo |

Gli incarichi 03 e 04 sono preparatori: non introdurre route di anteprima, opzioni nascoste o duplicati permanenti del sito. Il comportamento completo diventa osservabile nel 05. Il 05 è il passaggio più delicato: se emergono errori, correggere quello prima di rifinire l'aspetto.

## Regole di esecuzione e passaggio di consegne

1. Un solo assistente scrive nel checkout. Passare a un altro modello solo dopo aver letto il resoconto; non distribuire i numeri in parallelo.
2. Controllare stato Git, branch, registro e dipendenze della scheda. Preservare modifiche preesistenti. Nessun `reset --hard`, `clean`, push forzato o cancellazione per ripartire.
3. Modificare soltanto i file consentiti dalla scheda, oltre al registro e a una breve nota in STATUS. Se serve altro, spiegare il problema e proporre un incarico correttivo circoscritto; non allargare da soli la riscrittura.
4. Dopo una modifica al codice: `npm.cmd run check`, poi `npm.cmd run build`, poi `git diff --check`; eseguire anche la prova specifica della scheda. Nessuna installazione npm necessaria. Python non serve a questa migrazione.
5. Aggiornare il registro con risultati reali e limiti. Non spuntare una verifica browser perché i test Node passano. Se manca il browser, fornire una procedura manuale e lasciare quella verifica in attesa.
6. Terminare con il formato qui sotto. Un revisore controlla il diff prima del compito successivo: può essere lo stesso modello in una nuova chat o un altro. Revisioni in sola lettura, senza due scrittori contemporanei.
7. Dopo esito positivo, registrare un commit locale selezionando i soli file del compito. Se manca la configurazione Git, segnalare il limite senza inventare identità. Non includere lavoro di altri. Non fare push, merge o deploy in questi incarichi.

Formato del resoconto:

```text
Incarico: NN — titolo
Branch e commit di partenza:
Modifiche preesistenti preservate:
File modificati e motivo:
Verifiche eseguite ed esito:
Verifiche non eseguite e motivo:
Problemi ancora aperti:
Stato: pronto per revisione / da correggere / verifica manuale necessaria
Prossimo incarico previsto (non avviato):
```

Il registro ha due campi distinti: esecuzione e revisione. L'autore può indicare «pronto», ma non attribuire a un altro assistente una revisione mai avvenuta. Dopo una revisione pulita, chi registra il commit può riportarne hash ed esito nel registro prima di iniziare il nuovo incarico.

## Prompt pronti da copiare

### Primo avvio

```text
Lavora nel repository corrente. Rispondi in italiano.
Leggi AGENTS.md, la decisione corrente in testa a docs/PROJECT_CONTEXT.md
e docs/STATUS.md, poi docs/LANDING_AI_PLAN.md e docs/LANDING_PROGRESS.md.
Esegui soltanto docs/landing-tasks/00-baseline.md.
Conserva tutte le modifiche preesistenti. Non implementare ancora la landing.
Aggiorna il registro con risultati reali e termina con il resoconto previsto.
Non passare all'incarico successivo e non pubblicare.
```

### Incarichi successivi

```text
Leggi AGENTS.md, la decisione corrente di PROJECT_CONTEXT e STATUS,
docs/LANDING_AI_PLAN.md e docs/LANDING_PROGRESS.md.
Esegui soltanto la scheda che allego, verificando prima che il precedente
incarico risulti revisionato. Non eseguire l'intero piano.
Rispetta file consentiti, comportamento atteso e verifiche della scheda.
Conserva lo stile e tutti i contenuti. Aggiorna registro e STATUS.
Fermati con il resoconto previsto, senza push o deploy.
```

### Revisione del singolo incarico

```text
Revisiona soltanto l'incarico indicato nel registro, in sola lettura.
Leggi la relativa scheda e il diff rispetto al commit di partenza registrato;
considera anche i nuovi file non tracciati, senza includere modifiche estranee.
Controlla rispetto dello scopo, regressioni, URL, accessibilità e prove dichiarate.
Riporta problemi concreti con file e righe, oppure "nessun problema rilevato",
specificando i limiti della revisione. Non correggere file e non avviare altro.
```

### Ripresa dopo interruzione

```text
Leggi il piano, il registro e la scheda in corso. Controlla git status e diff.
Riprendi solo ciò che manca: non ricreare branch, tag o codice già presenti.
Non eliminare modifiche per ripartire. Se il registro e il codice divergono,
riporta la differenza e ricostruisci lo stato prima di modificare altro.
```

## Ritorno alla versione precedente

Il compito 00 registra base e tag reali prima dei cambiamenti al sito. Per un confronto, usare un worktree di sola consultazione del tag oppure cambiare branch solo dopo aver salvato il lavoro della prova e verificato che il checkout sia pulito. Usare porte diverse per due server locali.

Scartare la prova non richiede cancellare il branch: conservarlo e tornare alla base. Se nel frattempo `main` è avanzato, il tag identifica comunque la versione esatta di partenza. Un eventuale ritorno indietro dopo una futura pubblicazione richiederà un commit di revert revisionato, non una riscrittura forzata della storia.
