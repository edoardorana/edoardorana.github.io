# 04 — Definire destinazioni e alias senza DOM

**Dipendenza:** 03 revisionato. Leggere [piano](../LANDING_AI_PLAN.md) e [registro](../LANDING_PROGRESS.md).

## Obiettivo

Separare la decisione su quale vista mostrare dallo scorrimento a una sezione, con una funzione piccola verificabile.

## File consentiti

Nuovi file `proposal/navigation.mjs` e `tests/navigation.test.mjs`; [package.json](../../package.json) solo per aggiungere il controllo di sintassi del nuovo modulo; registro e STATUS.

## Contratto da implementare

Esportare `resolveView(hash = '')`, importando `parseRoute` da [data.mjs](../../proposal/data.mjs). Nessun accesso a DOM, window o history.

Restituire esattamente uno dei descrittori:

- `{ kind: 'landing', section: 'home' }` per pagina mappa/home.
- `{ kind: 'landing', section: 'profilo' }` per Profilo/Percorso.
- `{ kind: 'landing', section: 'progetti' | 'approccio' | 'contatti' }` per le altre sezioni.
- `{ kind: 'project', item: '<id canonico>' }` per un progetto riconosciuto.
- `{ kind: 'not-found' }` per tutti gli URL non riconosciuti.

In JavaScript la notazione con `|` sopra significa tre valori possibili, non codice da incollare.

## Verifica

Coprire tutta la tabella URL del piano comune con asserzioni esplicite, inclusi vecchi alias, URL vuoto e sconosciuti, segmenti extra e input malformati già gestiti dal parser. Non cambiare il contratto di `parseRoute` né i test esistenti per far passare quelli nuovi.

Eseguire check, build e controllo del diff. Il test nuovo viene incluso dal pattern esistente `tests/*.test.mjs`. Non modificare il router ancora e non installare librerie.

**Consegna:** contratto e casi verificati nel resoconto. Prossimo incarico: 05.
