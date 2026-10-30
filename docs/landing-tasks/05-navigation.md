# 05 — Attivare la landing e la navigazione interna

**Dipendenza:** 04 revisionato. Leggere [piano](../LANDING_AI_PLAN.md), [registro](../LANDING_PROGRESS.md) e il codice prodotto nei compiti 03/04.

## Obiettivo

Attivare la pagina unica preservando i progetti separati. Questo è il passaggio principale; non includere anche un ridisegno del sito.

## File consentiti

[script.js](../../proposal/script.js), [index.html](../../proposal/index.html), [style.css](../../proposal/style.css) solo per scorrimento e vincoli incompatibili, [portfolio.test.mjs](../../tests/portfolio.test.mjs), registro e STATUS.

## Sequenza suggerita

1. Usare `resolveView(location.hash)`. Registrare la vista montata separatamente dalla sezione richiesta.
2. Se la destinazione è landing e la landing è già montata, **non** assegnare `main.innerHTML`, non incrementare una versione di montaggio e non ripetere `bindLanding`: aggiornare titolo, menu, posizione e focus.
3. Se cambia vista, eseguire abort e cleanup della precedente, incrementare la versione, quindi montare la landing con il suo binding oppure la vista progetto/404 esistente. Conservare controlli di versione, gestione degli errori e invalidazione degli import asincroni delle dashboard.
4. Sulla landing impostare `body.dataset.page = 'landing'`. Rimuovere il vecchio vincolo Home a 100dvh/overflow hidden soltanto dove necessario; la pagina deve poter scorrere.
5. Unificare entrata iniziale, cambio hash e salti interni. Dopo il montaggio raggiungere il riferimento richiesto; eliminare lo `scrollTo(0,0)` indiscriminato. Il ritorno da progetto deve atterrare su Progetti o sulla sezione presente nella cronologia.
6. Gestire anche i clic interni con hash già selezionato: manca un nuovo evento hashchange, ma lo scorrimento deve comunque avvenire. Non intercettare Ctrl/Command+clic, clic centrale, link esterni, CV o documenti HTML.
7. Mantenere `#main` e il link salta-contenuto funzionanti. Chiudere il tree su navigazione e trasferire il focus alla destinazione, senza lasciare il focus su un link nascosto.
8. Conservare `#/home` come alias; la voce home torna all'inizio. I link progetto già esistenti restano separati. Adattare soltanto i testi che descrivono il comportamento della Home e gli eventuali test pertinenti.

## Prove indispensabili

- Apertura diretta e refresh di `#/contatti`: tutte le sezioni presenti, contatto raggiunto.
- Scrivere una bozza, selezionare Tromsø, saltare fra sezioni: conservati testo e selezione, nessun montaggio ripetuto.
- Scorrere lontano dalla destinazione e cliccare la stessa voce nel tree: ritorno corretto.
- Aprire NetBox, poi tornare a Progetti; provare Indietro/Avanti.
- Passare rapidamente da una dashboard alla landing durante il caricamento: nessun contenuto tardivo sostituisce la landing.
- Nella landing un solo h1, ID unici, niente navigazioni fra sezioni residue.
- Network su caricamento fresco della landing: nessun dataset immobiliare, bundle Plotly o modulo pagina delle dashboard. L'import del solo helper CSV usato dal contatto non costituisce caricamento della dashboard.

Eseguire check, build e diff. Se il browser non è disponibile, lasciare queste prove in attesa per il revisore: non passare alla rifinitura su una navigazione non verificata.

**Consegna:** descrivere come si distinguono salto e cambio vista. Prossimo incarico: 06.
