# 07 — Verificare l'integrazione completa

**Dipendenza:** 06 revisionato. Leggere [piano](../LANDING_AI_PLAN.md) e [registro](../LANDING_PROGRESS.md).

## Obiettivo e perimetro

Eseguire verifiche e registrare evidenze, senza cambiare l'applicazione durante questo incarico. File scrivibili: [registro](../LANDING_PROGRESS.md), [STATUS](../STATUS.md) e nuovo rapporto `docs/LANDING_QA.md`.

Se si trova un difetto, indicare passi di riproduzione, risultato atteso/osservato e file probabili. Assegnare una correzione circoscritta al compito pertinente; ripetere poi la prova fallita. Non trasformare la verifica in un refactor generale.

## Checklist

| Prova | Risultato atteso |
| --- | --- |
| Tutti gli URL del piano, apertura diretta e refresh | Sezione o approfondimento corretto; gli sconosciuti restano 404 |
| Salti box/tree, stesso hash, Indietro/Avanti | Destinazione visibile, niente salto indesiderato in cima |
| Scorrimento manuale | Non aggiunge voci alla cronologia, non sottrae il focus |
| Header a 1280/820/390/320 px | Tree raggiungibile, nessun overflow o destinazione coperta |
| Tastiera, Escape, link salta-contenuto | Ordine sensato e focus visibile; nessun focus lasciato nel menu chiuso |
| Movimento ridotto | Nessuno scorrimento animato forzato |
| Titoli e ID | Un h1 per vista, h2 per capitoli, gerarchia coerente, ID unici |
| Mappa e contatto | Selezione e bozza conservate nei salti; testi geografici invariati |
| Profilo e Progetti | Contenuti completi; NetBox apre una scheda separata |
| Approccio | Cinque fasi complete e cinque documenti separati |
| CV e documenti | Link di ritorno corretti e stampa ancora utilizzabile |
| Prima apertura landing con cache nuova | Nessun dataset storico o Plotly richiesto |
| Apertura/uscita ripetuta dalle dashboard | Nessun errore tardivo o eventi duplicati sulla landing |
| Dashboard immobiliare | Filtri, selezione vuota/reset ed export coerenti |
| Generator | Esempio locale, preparazione, annulla e costruzione grafico funzionanti |
| Contatto | URL mailto corretto, nessuna dichiarazione di invio |

Non inviare email. Non caricare dati personali per la prova CSV. Usare l'esempio già incluso o un minuscolo CSV di prova pubblico.

Eseguire `npm.cmd run check`, `npm.cmd run build` e `git diff --check`. I test automatici non sostituiscono la checklist browser. Non aggiungere dipendenze per automatizzare queste prove.

## Rapporto

Per ogni riga usare PASS / FAIL / NON VERIFICATO, con viewport e azione eseguita. Separare test Node, prove browser e limiti. Segnalare se non provati telefono fisico, Safari, Firefox, lettore di schermo, dialogo stampa o client email. Non attribuire risultati delle verifiche del vecchio sito alla nuova landing.

**Consegna:** rapporto e registro. Il compito 08 può valutare la prova soltanto con difetti bloccanti risolti e verifiche essenziali completate.
