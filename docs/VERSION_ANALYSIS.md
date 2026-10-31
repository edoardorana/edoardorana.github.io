# Versione v2.5.1 – Analisi rapida

- **Branch**: `align/v2.5.1` (basato su tag `v2.5.1`).
- **Sorgenti**: `proposal/` – HTML, CSS e JavaScript ES‑modules, nessuna dipendenza npm.
- **Landing**: 4 sezioni (Profilo, Progetti, Approccio, Collaborazioni) con layout 2×2 desktop / 2×2 mobile.
- **Font**: tutti gli `h2` usano la famiglia tipografica `var(--display)`, ora coerente tra le sezioni.
- **Profilo**: il tag `v2.5.1` aveva aggiunto gli hashtag ma non aveva ancora spostato la mappa, nonostante la nota precedente lo dichiarasse. Nel working tree successivo `PROFILO/` è stato uniformato tipograficamente agli altri capitoli, è stata aggiunta la riga `luoghi` e la mappa è stata realmente spostata in `luoghi.html`.
- **Tree della landing**: nel working tree successivo Profilo, Progetti e Approccio condividono righe compatte con nome e hashtag. I connettori testuali sono stati rimossi e sostituiti da rail, pallini e raccordi CSS, coerenti con il nome `edo.dot`.
- **Landing più compatta**: hero e sezioni sono stati ridotti; il menu di testata è stato eliminato perché la landing funge da indice. Collaborazioni apre la nuova pagina separata `contatti.html`.
- **Coerenza del sito**: CV e cinque documenti Approccio riprendono firma, palette, monospaziato e ritmo della landing; le intestazioni README delle dashboard usano lo stesso pallino e un trattamento più leggero.
- **CV**: nel working tree il documento usa la larghezza della testata, elimina la doppia colonna che comprimeva i testi a destra e presenta i capitoli `profilo/`, `esperienze/`, `formazione/`, `competenze/`. Il comando di stampa è esposto come `Salva PDF`.
- **Navigazione separata**: CV, Luoghi, Contatti, dashboard e documenti Approccio tornano alla Home dall'alto. I footer di navigazione delle dashboard sono stati eliminati; i cinque documenti usano `Salva PDF`.
- **Gerarchia Contatti**: la pagina appartiene al capitolo Collaborazioni e usa il percorso `~/collaborazioni/contatti$ mail --new`; rimossa la frase introduttiva ridondante.
- **Progetti**: elenco minimale – solo i nomi `immobiliare-data` e `dashboard-generator` con i rispettivi hashtag.
- **Immobiliare-data**: il README superiore descrive contenuto, strumenti e limiti della dashboard; eliminato il riepilogo duplicato “Il dataset in breve” in fondo alla pagina.
- **Approccio**: cinque fasi – *capire, raccogliere, custodire, leggere, evolvere*.
- **Collaborazioni**: rimosso il testo introduttivo, rimane solo il compositore email.
- **Testing**: `npm run check` (26 test) e `npm run build` superati.
- **Server di sviluppo**: attivo su `http://localhost:4173`.

> **Prossimo step**: revisionare e registrare le correzioni successive al tag `v2.5.1`; il push e la pubblicazione non sono stati eseguiti.
