# 06 — Rendere compatte le box e mantenere tree raggiungibile

**Dipendenza:** 05 revisionato e verificato nel browser. Leggere [piano](../LANDING_AI_PLAN.md) e [registro](../LANDING_PROGRESS.md).

## Obiettivo

Rifinire la pagina unica mantenendo lo stile approvato.

## File consentiti

[style.css](../../proposal/style.css), [script.js](../../proposal/script.js) soltanto per offset di scorrimento e preferenza di movimento, [index.html](../../proposal/index.html) soltanto per classi/attributi della testata, registro e STATUS.

## Azioni

1. Ridurre altezza e padding delle box sulla landing. Conservare quattro colonne desktop e 2 × 2 sotto 820 px, bordi, hover/focus verde e comandi nascosti su touch. Evitare che l'indice occupi tutta la prima schermata a 1280 × 900 e 390 × 844.
2. Rendere la testata sticky sulla landing, con sfondo leggibile. Il tree mantiene annidamento e altezza massima scorrevole; il pannello aperto non deve uscire dalla viewport.
3. Definire un offset condiviso per le sezioni tramite scroll-margin/scroll-padding o misura equivalente. Verificare che intestazione e focus non finiscano sotto la testata.
4. Uniformare distanze fra i capitoli e le cinque fasi senza sommare padding annidati. Non ridurre i testi per accorciare la pagina.
5. Scorrimento fluido solo per clic volontari; immediato con movimento ridotto e per entrata iniziale/cronologia. Non animare lo scroll manuale.
6. Limitare le regole nuove alla landing dove serve: dashboard e documenti devono conservare il loro layout. Nessuna nuova palette, font o libreria.

## Verifica

Viewport 1280 × 900, 820 px, 390 × 844 e 320 px: griglia corretta, testo leggibile, nessun overflow della pagina. Toccare le quattro box una volta; provare Tab/Invio e focus visibile. Aprire il tree in fondo alla landing, selezionare una sezione, provare Escape e ritorno del focus. Provare movimento ridotto.

Eseguire check, build e diff. Annotare le dimensioni effettivamente provate; se non si dispone di touch fisico, indicare l'emulazione.

**Consegna:** resoconto con confronto dello stile prima/dopo. Prossimo incarico: 07.
