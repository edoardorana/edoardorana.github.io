# 03 — Preparare la composizione della landing

**Dipendenza:** 02 revisionato. Leggere [piano](../LANDING_AI_PLAN.md) e [registro](../LANDING_PROGRESS.md).

## Obiettivo

Preparare rendering e interazioni della pagina unica senza cambiare ancora la selezione delle viste nel router.

## File consentiti

[script.js](../../proposal/script.js), [style.css](../../proposal/style.css) soltanto per mantenere gli stili dei livelli di titolo cambiati, registro e STATUS.

## Azioni

1. Aggiungere una modalità di composizione ai renderer delle quattro sezioni, per esempio `{ embedded = false }`. Conservare il comportamento predefinito delle viste attuali.
2. In modalità composta assegnare ID univoci `profilo`, `progetti`, `approccio`, `contatti` e collegare ogni sezione al suo titolo con `aria-labelledby`. Usare intestazioni livello 2 e ID dei titoli univoci. Non emettere `sectionNav` dentro le sezioni composte.
3. Creare `landing()` che concatena introduzione e box, Profilo, elenco Progetti, Approccio e Collaborazioni. L'introduzione conserva l'unico `h1` e ha un riferimento `home` per tornare in cima.
4. Usare gli stessi dati e gli stessi renderer, senza duplicare biografia o cronologia. I tre link ai progetti rimangono link a viste separate; NetBox non viene incorporato. Non caricare né montare dashboard.
5. Adeguare i sottotitoli al contesto: sezioni principali h2, sottosezioni h3, voci subordinate h4 quando necessario. Mantenere l'aspetto usando classi o selettori equivalenti; anche il titolo dinamico del luogo deve rispettare la gerarchia. Le viste autonome mantengono una gerarchia valida.
6. Preparare `bindLanding()`: inizializzare luogo selezionato, collegare i controlli della mappa e chiamare `bindContact(main)` una sola volta per montaggio. Riutilizzare helper per evitare copie divergenti dei binding.

## Verifica

Check, build, diff e assenza di regressioni nelle viste attuali. Ispezionare il markup composto e gli ID nel codice: la prova DOM effettiva verrà eseguita nel 05. Non dichiararla già superata.

Non aggiungere URL di anteprima o switch temporanei. Il router continua a usare le viste esistenti fino al 05.

**Consegna:** indicare firme degli helper introdotti, così il prossimo assistente può usarli. Prossimo incarico: 04.
