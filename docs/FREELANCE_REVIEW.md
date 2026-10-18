# Revisione critica del portfolio per il mercato freelance

18 ottobre 2026. Valutazione della versione pubblicata come punto di partenza, non giudizio sull'esperienza professionale di Edoardo.

## Sintesi

Il sito è curato e racconta fatti verificati, ma oggi funziona più come **CV interattivo** che come strumento per scegliere un consulente. Un cliente capisce i ruoli e gli strumenti; fatica a capire subito quale problema concreto può affidare a Edoardo, quale prova osservare e quale sia il primo passo per contattarlo. La mappa è una buona identità di navigazione e va mantenuta: il lavoro principale è editoriale e di prova, non un nuovo redesign.

## Cosa funziona già

- Identità sobria, cinque aree chiare e URL condivisibili. La navigazione da tastiera, il ritorno alla mappa e il CV stampabile sono una buona base.
- Informazioni professionali specifiche e prudenti: ruoli, periodi, attività e limiti dei materiali pubblici sono distinti. Non si attribuiscono risultati non documentati.
- Contatto diretto visibile anche nel footer, senza backend o falsa promessa di invio tramite il sito.

## Criticità e interventi consigliati

| Priorità | Osservazione verificabile | Effetto per un possibile cliente | Intervento |
| --- | --- | --- | --- |
| Alta | La [home](../proposal/script.js) apre con «Sistemi, database, analisi» e una breve biografia, ma non indica un destinatario né un problema-tipo. | Il visitatore deve esplorare più pagine per capire se il proprio incarico è pertinente. | Definire con Edoardo 1–2 ambiti iniziali e riscrivere titolo e sottotitolo in termini di attività concrete, senza promettere esiti non dimostrati. |
| Alta | Le [tre schede](../proposal/data.mjs) descrivono tesi e ruoli; nessuna mostra un artefatto pubblico o un risultato verificabile. | «Progetti» rischia di sembrare un'altra sezione Esperienza, non una prova del lavoro. | Pubblicare prima un esempio personale riproducibile o un caso anonimizzato autorizzato: problema, ruolo, vincoli, scelta tecnica, output osservabile e limiti. Non inventare clienti o metriche. |
| Alta | Il sito parla di collaborazioni mentre il [Percorso](../proposal/script.js) descrive un ruolo lavorativo in corso; non chiarisce quali incarichi autonomi Edoardo intenda accettare adesso. | Una persona interessata non sa se la proposta è pertinente o quando aprire il contatto. | Chiarire con Edoardo disponibilità e modalità di collaborazione prima di aggiungere offerte, prezzi o tempi; pubblicare solo ciò che conferma. |
| Alta | [Profilo](../proposal/script.js), [Percorso](../proposal/script.js), [Progetti](../proposal/script.js) e [CV](../proposal/cv.html) ripetono Broway, SB Italia, date e stack. | Cresce il tempo di lettura, ma poco l'informazione nuova. | Dare una funzione unica a ogni area: Profilo = posizionamento; Approccio = decisioni e metodo; Percorso = cronologia; Progetti = prove; CV = dettaglio completo. Tagliare le ripetizioni dopo aver scelto le offerte. |
| Media | Molte sigle in [Profilo](../proposal/script.js) e [Percorso](../proposal/script.js) (checkmk, OEM, S3, Proxmox) sono utili a tecnici, ma non spiegano il problema a un cliente non tecnico. | La competenza è visibile, il suo uso pratico meno. | Aprire con l'attività comprensibile (diagnosi, continuità operativa, gestione dati) e lasciare lo stack come dettaglio o prova. |
| Media | [Approccio](../proposal/data.mjs) presenta cinque fasi generiche e «esiti attesi». | Descrive un metodo plausibile, ma non ancora come viene applicato a un incarico reale. | Collegare 2–3 fasi a esempi pubblicabili e distinguere con precisione esperienza svolta da capacità da esplorare (soprattutto AI e modelli predittivi). |
| Media | La pagina [Collaborazioni](../proposal/script.js) offre email e un modulo che apre il programma di posta, senza indicare quali richieste siano più pertinenti. | Chi usa webmail può trovare il modulo scomodo; manca un invito concreto ma sobrio. | Mantenere l'email principale, spiegare il comportamento del modulo e aggiungere 2–3 esempi di richieste valutabili e le informazioni utili nel primo messaggio. |
| Media | La mappa rende il sito riconoscibile, ma la home non espone subito un esempio di lavoro né un percorso rapido verso prove e contatto. | L'esplorazione è gradevole, meno efficiente per chi valuta più fornitori. | Lasciare le cinque aree e aggiungere un richiamo breve a una prova reale e al contatto, senza trasformare la home in una landing page lunga. |
| Media | Il blocco `noindex` è stato rimosso per il lancio, ma le sezioni sono route hash renderizzate da JavaScript e l'[HTML iniziale](../proposal/index.html) contiene solo un fallback essenziale. | Ricerca e anteprime dei link possono mostrare meno contenuto di quanto vede un visitatore. | Dopo le correzioni editoriali, curare titolo/descrizione e anteprime social; valutare pagine statiche o prerender per i contenuti principali, mantenendo la navigazione a mappa. |

La richiesta di campioni concreti è coerente con la [guida portfolio di Upwork](https://www.upwork.com/resources/portfolio-guide), che insiste su problema, ruolo, output ed evidenze; è un riferimento pratico, non una regola universale. Per la visibilità organica, [Google Search Central](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) segnala i limiti possibili del contenuto generato via JavaScript e l'effetto di `noindex`.

## Sequenza di miglioramento

1. **Scegliere il focus.** Edoardo identifica il tipo di interlocutore e i primi 1–2 problemi per cui vuole essere contattato. Da questa scelta derivano titolo della home, testo del Profilo e indicazioni nella pagina Collaborazioni.
2. **Produrre una prova.** Scegliere un caso divulgabile con autorizzazione, oppure costruire un progetto personale esplicitamente tale. Pubblicare repository o materiale osservabile; spiegare contributo, limiti e output senza metriche inventate.
3. **Ridurre il doppione CV/sito.** Rivedere le quattro aree interne con ruoli editoriali diversi. Il CV può rimanere completo; il sito deve permettere una lettura più rapida.
4. **Migliorare la scoperta.** Quando i testi sono stabili, ottimizzare anteprime dei link, metadati e accessibilità dei contenuti senza JavaScript. Valutare poi una versione inglese se l'obiettivo commerciale include davvero interlocutori internazionali.

## Come valutare se la revisione funziona

Mostrare la home e una scheda a tre persone che non conoscono già il percorso professionale. Chiedere: «Che cosa offre? Per chi? Quale prova hai visto? Come lo contatteresti?». Annotare dove si fermano o interpretano male i contenuti, poi correggere il testo prima di aggiungere nuove sezioni o effetti grafici.
