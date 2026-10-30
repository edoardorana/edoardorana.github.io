# 02 — Mostrare le cinque fasi dell'Approccio

**Dipendenza:** 01 revisionato. Leggere [piano](../LANDING_AI_PLAN.md) e [registro](../LANDING_PROGRESS.md).

## Obiettivo

Rendere tutte le fasi leggibili in sequenza nella vista Approccio esistente. La landing non viene ancora attivata.

## File consentiti

[script.js](../../proposal/script.js), [style.css](../../proposal/style.css), [portfolio.test.mjs](../../tests/portfolio.test.mjs), registro e STATUS.

## Azioni

1. In `approach()`, sostituire tab, pannello variabile e frecce con cinque blocchi derivati dall'array `steps` esistente. Preservare titolo della fase, frase breve, testo, documentazione prevista, tag e link.
2. Conservare il collegamento corretto per ogni fase: capire, raccogliere, custodire, leggere, evolvere. I documenti rimangono file separati e invariati.
3. Eliminare `selectedStep`, `setStep` e i soli binding diventati inutili. Non toccare mappa, contatto o navigazione globale.
4. Usare la palette e la tipografia attuali, con separatori leggeri. Rimuovere soltanto CSS esclusivo dei tab/frecce eliminati dopo averne cercato gli utilizzi.
5. Adattare la frase che chiede di selezionare una fase, ora inesatta. Aggiornare soltanto l'asserzione di testo pertinente nel test; non indebolire i controlli sugli altri contenuti.

## Verifica

Aprire `#/approccio` a 1280 e 390 px: tutte e cinque le fasi si leggono scorrendo, nessun tab/freccia residuo o overflow. Aprire i cinque link e controllare il ritorno ad Approccio. Evolvere resta una bozza. Eseguire check, build e controllo del diff.

La vecchia barra fra sezioni rimane fino alla composizione della landing.

**Consegna:** resoconto e registro aggiornato. Prossimo incarico: 03.
