# WEB-CV — istruzioni condivise

Leggi `docs/PROJECT_CONTEXT.md` e `docs/STATUS.md` prima di cambiare il progetto.

- La versione attiva è in `proposal/`. Il sito legacy alla radice è stato rimosso; il workflow GitHub Pages pubblica `dist/` dopo i controlli su `main`. Non spostare i sorgenti alla radice.
- `dist/` è generato con `npm run build`. Non modificarlo direttamente.
- HTML, CSS e JavaScript ES modules, senza dipendenze npm. I progetti dati condividono Plotly locale in `proposal/charts/`. La vecchia demo sintetica è stata rimossa. Dev server locale: `npm run dev`. Node 22 o superiore.
- Mantieni la Home a quattro colonne su desktop e in griglia 2 × 2 su mobile: Profilo, Progetti, Approccio e Collaborazioni. Con mouse a riposo ogni colonna mostra solo il titolo; hover e focus rivelano solo `~/area$ cat readme.md`. Sui dispositivi senza hover il comando non appare mai; un tocco apre subito la sezione. Non aggiungere output o prompt finali nelle box. Non tornare a una lunga landing page e non reintrodurre box centrale, rami, sottotitoli o l'etichetta `Esplora` senza una richiesta esplicita.
- Le intestazioni sono README terminali statici e sempre visibili, a tutta larghezza: comando `~/percorso$ cat readme.md` e frase riepilogativa, senza grande titolo visibile. Il menu usa un albero terminale compatto (`~$ tree`) con etichette relative e annidate, senza ripetere i percorsi. Le schede progetto tornano a Progetti o Home, senza sezione successiva.
- Il prompt di attesa `~/contatti$ ▋` appartiene al compositore email: `mail --new`, oggetto, messaggio, bozza via mailto. Non dichiarare un invio. I documenti Approccio sono HTML autonomi stampabili; Evolvere resta una proposta.
- Le route `#/profilo`, `#/approccio`, `#/progetti`, `#/progetti/<id>` e `#/contatti` devono funzionare con refresh e pulsanti Indietro/Avanti. La route storica `#/percorso` resta un alias compatibile di Profilo.
- Tono personale, italiano, leggibile anche per clienti non tecnici. Non inventare clienti, date, metriche o risultati. Il percorso magistrale è in corso.
- La mappa geografica è contenuta nel Profilo ed è distinta dalla griglia di navigazione della Home. Zugo indica il riferimento dell'azienda svizzera con cui si lavora da remoto, non una sede fisica personale. Tromsø indica la città del periodo Erasmus, non un campus o indirizzo preciso.
- Non includere credenziali, log di produzione, dati dei clienti, chat grezze, telefono o data di nascita nel sito. Email pubblica concordata tramite CV: edoardorana@outlook.com.
- Le AI aiutano lo sviluppo nell'editor. Il frontend non contiene API key né chiama modelli.
- Prima di concludere: `npm run check` e `npm run build`; verifica mobile, tastiera e navigazione nel browser quando disponibile. Dichiarare i limiti di verifica.
- Aggiorna `docs/STATUS.md` con modifiche, verifiche e prossimi passi. Mantieni le modifiche piccole e revisionabili.
- Se più assistenti lavorano al progetto, evita scritture simultanee sugli stessi file: usa branch o worktree separati e una revisione prima dell'integrazione.
