# 01 — Rendere riutilizzabili le intestazioni

**Dipendenza:** 00 revisionato. Leggere [piano](../LANDING_AI_PLAN.md) e [registro](../LANDING_PROGRESS.md).

## Obiettivo

Preparare le intestazioni per una pagina unica, conservando il comportamento delle pagine attuali.

## File consentiti

[terminal-header.mjs](../../proposal/terminal-header.mjs), [contact.mjs](../../proposal/contact.mjs), [portfolio.test.mjs](../../tests/portfolio.test.mjs), registro e STATUS.

## Azioni

1. Aggiungere a `terminalHeader` opzioni `headingLevel = 1` e `titleId` facoltativo. Sono ammessi soltanto livelli 1 e 2; non interpolare un tag arbitrario. Conservare escaping, classi e struttura visiva.
2. Aggiungere le stesse opzioni a `contactHTML({ headingLevel = 1, titleId } = {})`. Non cambiare campi, valori conservati, binding o logica mailto.
3. Le chiamate esistenti senza opzioni devono produrre ancora un `h1`. Le chiamate con livello 2 devono produrre un `h2`, nascosto visivamente come prima. L'eventuale ID deve essere codificato in sicurezza.
4. Aggiungere casi mirati ai test per default, livello 2, ID ed escaping. Conservare i test del contatto sempre aperto.

## Verifica

Eseguire check, build e controllo del diff. Nel browser aprire Profilo e Collaborazioni: aspetto e campi invariati. I test dei componenti verificano la variante di sezione, che sarà collegata nel compito 03.

Non cambiare route, layout o dashboard. Non convertire ancora tutte le chiamate.

**Consegna:** resoconto e registro aggiornato. Prossimo incarico: 02.
