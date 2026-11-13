# Stato del progetto

## Stato corrente — 13 novembre 2026

- La landing e le pagine separate sono implementate nei sorgenti `proposal/`.
- Sono disponibili due progetti dati: dashboard immobiliare e Dashboard generator.
- Il progetto usa 35 test Node e una build statica senza dipendenze npm.
- `mywebsite` resta un archivio congelato; `mywebsite-staging` è l’area di lavoro attiva; production è ancora vuota.

## Pulizia staging

Rimossi profili QA, ambiente virtuale Python, dati privati, build generata, snapshot storici, configurazioni editor locali, PDF CV originale, log diagnostici, istruzioni AI superate e piani di migrazione conclusi. Eliminati inoltre l’immagine social non referenziata e i selettori CSS senza corrispondenza nel sito attivo. README, contesto e stato contengono soltanto informazioni correnti. Il materiale precedente resta conservato nell’archivio `mywebsite`.

Materiale mantenuto:

- sorgenti `proposal/`;
- script e test;
- workflow GitHub Pages;
- documentazione dei progetti dati e report di qualità;
- repository Git locale dello staging, inizializzato sulla nuova baseline pulita.

## Verifiche

- `npm run check`: 35 test Node superati.
- Test Python della preparazione dati: 2 test superati usando l’ambiente conservato nell’archivio, senza ricreare `.venv` nello staging.
- `npm run build`: artefatto generato correttamente con 32 file e poi rimosso dallo staging.
- `git diff --check`: superato.
- Link Markdown locali, residui temporanei, riferimenti ai file eliminati e marcatori di dati sensibili: controllati.
- Il sito completo è stato provato manualmente prima dell’ultima rimozione di CSS orfano. Limite: QA browser desktop, 390 px e tastiera da ripetere sulla baseline finale prima della production.

## Prossimi passi

1. Usare staging come unica area di lavoro per le prossime modifiche.
2. Eseguire check, build e QA browser prima di ogni promozione.
3. Popolare production soltanto dopo approvazione esplicita.
