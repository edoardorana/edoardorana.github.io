# WEB-CV — istruzioni condivise

Leggi `docs/PROJECT_CONTEXT.md` e `docs/STATUS.md` prima di cambiare il progetto.

Direzione approvata il 30 ottobre 2026: landing con le quattro sezioni principali; CV, dashboard e tutte le schede restano separati. Per questa migrazione leggi `docs/LANDING_AI_PLAN.md`, `docs/LANDING_PROGRESS.md` e soltanto la scheda assegnata in `docs/landing-tasks/`. Il piano descrive il risultato atteso: consulta il registro per sapere cosa è già implementato. Non avviare tutti gli incarichi automaticamente.

- La versione attiva è in `proposal/`. Il sito legacy alla radice è stato rimosso; il workflow GitHub Pages pubblica `dist/` dopo i controlli su `main`. Non spostare i sorgenti alla radice.
- `dist/` è generato con `npm run build`. Non modificarlo direttamente.
- HTML, CSS e JavaScript ES modules, senza dipendenze npm. I progetti dati condividono Plotly locale in `proposal/charts/`. La vecchia demo sintetica è stata rimossa. Dev server locale: `npm run dev`. Node 22 o superiore.
- Le box iniziali diventano un indice compatto della landing: quattro colonne su desktop e griglia 2 × 2 mobile, nell'ordine Profilo, Progetti, Approccio, Collaborazioni. Solo titolo a riposo; hover/focus rivelano solo `~/area$ cat readme.md`; nessun comando su touch. Un tocco scorre alla sezione. Niente output, prompt finali, box centrale, rami o etichetta `Esplora`. La precedente preferenza per sezioni separate è superata dalla richiesta del 30 ottobre.
- Le intestazioni sono README terminali statici, sempre visibili e a tutta larghezza, senza grande titolo visibile. Conserva palette e tipografia. Nella landing un solo h1 e capitoli h2. Il menu `~$ tree` resta compatto, annidato e raggiungibile durante lo scorrimento, senza connettori testuali o percorsi ripetuti. Le barre precedente/successiva scompaiono fra i capitoli; le schede progetto tornano alla sezione Progetti o all'inizio.
- CV, due dashboard, scheda NetBox e documenti Approccio rimangono pagine separate. Nella landing le cinque fasi del metodo sono leggibili in sequenza. Evolvere resta una proposta. Il contatto mostra subito `mail --new`, oggetto e messaggio: niente cursore d'attesa o pulsante di copia email. L'azione prepara una bozza via mailto; non dichiarare un invio.
- Conserva gli URL hash esistenti, refresh, Indietro/Avanti e alias storici. Le route delle sezioni raggiungono la landing senza ricrearla a ogni salto; `#/progetti/<id>` apre un approfondimento separato. `#/percorso` resta alias di Profilo e `#/home` dell'inizio. Nessuna modifica della cronologia durante lo scorrimento manuale. Mantieni bozza email e selezione della mappa nei salti interni.
- Tono personale, italiano, leggibile anche per clienti non tecnici. Non inventare clienti, date, metriche o risultati. Il percorso magistrale è in corso.
- La mappa geografica è contenuta nel Profilo ed è distinta dalla griglia di navigazione della Home. Zugo indica il riferimento dell'azienda svizzera con cui si lavora da remoto, non una sede fisica personale. Tromsø indica la città del periodo Erasmus, non un campus o indirizzo preciso.
- Non includere credenziali, log di produzione, dati dei clienti, chat grezze, telefono o data di nascita nel sito. Email pubblica concordata tramite CV: edoardorana@outlook.com.
- Le AI aiutano lo sviluppo nell'editor. Il frontend non contiene API key né chiama modelli.
- Prima di concludere: `npm run check` e `npm run build`; verifica mobile, tastiera e navigazione nel browser quando disponibile. Dichiarare i limiti di verifica.
- Aggiorna `docs/STATUS.md` con modifiche, verifiche e prossimi passi. Mantieni le modifiche piccole e revisionabili.
- Se più assistenti lavorano al progetto, evita scritture simultanee sugli stessi file: usa branch o worktree separati e una revisione prima dell'integrazione.
