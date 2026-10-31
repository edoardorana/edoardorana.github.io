# 08 — Revisione finale e confronto reversibile

**Dipendenza:** 07 completato, problemi bloccanti risolti. Leggere [piano](../LANDING_AI_PLAN.md), [registro](../LANDING_PROGRESS.md) e rapporto QA prodotto nel 07.

## Obiettivo e file consentiti

Valutare la prova contro la base salvata nel compito 00, senza modificare l'applicazione. Scrivere soltanto registro, STATUS e conclusioni del rapporto QA. Nessun merge, push o deploy.

## Azioni

1. Confrontare il diff completo con il tag reale della base: controllare che siano cambiati navigazione/composizione e gli stili necessari, non fatti professionali, dataset o logiche delle dashboard.
2. Cercare duplicazioni di contenuti, renderer ormai inutilizzati, vecchi binding ai tab, più inizializzazioni degli eventi e regole CSS del blocco Home a schermo intero. Segnalare eventuali pulizie come correzioni circoscritte, non eseguirle in una revisione in sola lettura del codice.
3. Confermare che CV, due dashboard, scheda NetBox e cinque documenti siano ancora pagine separate e raggiungibili.
4. Confrontare vecchio e nuovo sui compiti: leggere il profilo, trovare un progetto, leggere tutte le cinque fasi, raggiungere il contatto, aprire un approfondimento e tornare al contesto.
5. Se occorre una preview simultanea, creare un worktree del tag solo per consultazione e usare una porta differente. Non cambiare checkout con lavoro non salvato, non cancellare la prova e non duplicare il sito nella sorgente pubblica.
6. Restituire a Edoardo un giudizio concreto su continuità, lunghezza, leggibilità e fedeltà allo stile, con problemi residui e limiti delle prove. Non inventare percentuali di miglioramento.
7. Aggiornare STATUS con implementazione effettiva e prossimo passo: valutazione visiva di Edoardo. Segnalare il riferimento esatto da cui ripristinare la vecchia versione.

## Accettazione

Esiste una versione locale confrontabile, con test e prove documentati, e un riferimento Git per ritrovare l'originale. L'eventuale scelta di pubblicazione avviene dopo la valutazione della prova.

**Consegna:** resoconto finale e collegamenti al rapporto e ai riferimenti Git reali. Nessun incarico successivo avviato automaticamente.
