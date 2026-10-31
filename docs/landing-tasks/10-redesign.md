# 10 — Redesign estetico della landing (graphic designer)

**Dipendenza:** 09 eseguito. Leggere [piano](../LANDING_AI_PLAN.md), [registro](../LANDING_PROGRESS.md), [rapporto QA](../LANDING_QA.md) e il feedback di Edoardo.

## Feedback di Edoardo (da rispettare)

Le box di navigazione (Profilo / Progetti / Approccio / Contatti) **devono sparire**. L'impaginazione attuale è poco armoniosa. La mappa va riposizionata in versione desktop. La cronologia va migliorata (font, grandezza, spazi). Tutto il resto della landing page ha un aspetto poco armonioso.

## Obiettivo

Ricreare la landing page riordinando gli elementi con un approccio da graphic designer professionista specializzato in siti web. Basare il grosso del contenuto e l'estetica sul modello già alla base (palette, tipografia, terminal header) e renderlo **stupendo**. Non cambiare contenuti professionali, dati o logiche.

## File consentiti

[style.css](../../proposal/style.css), [script.js](../../proposal/script.js) per struttura e classi, [index.html](../../proposal/index.html) per classi/attributi, registro e STATUS. Nessuna modifica a dati, logiche o documenti.

## Istruzioni per l'assistente

Trattare la pagina come se fosse un professionista graphic designer specializzato in siti web. Basare il grosso del contenuto e l'estetica sul modello che c'è già alla base e renderlo stupendo. Non inventare nuovi contenuti, clienti, date, metriche o risultati. Conservare palette (verde #365a45, vino #794957, carta #f8f8f6) e tipografia (Avenir Next). Nessuna nuova dipendenza o framework.

## Azioni

1. **Rimuovere le box di navigazione** (Profilo / Progetti / Approccio / Contatti) dall'impaginazione. L'indice compatto (home) resta come entry point, ma le quattro box non devono dominare la prima schermata. Ridurre o eliminare l'atlas se necessario, mantenendo i link alle sezioni.

2. **Riposizionare la mappa in versione desktop.** La mappa europea (Milano, Tromsø, Zugo, Stoccarda) deve avere un layout dedicato e leggibile: punti più grandi, etichette ben spaziate, attribuzione chiara. Considerare un layout a due colonne (mappa a sinistra, dettaglio luogo a destra) su desktop.

3. **Migliorare la cronologia.** Rivedere font, grandezza, spaziatura e allineamento della timeline. Usare una gerarchia tipografica più marcata (titolo ruolo, periodo, descrizione). Aggiungere respiro verticale tra le voci.

4. **Riordinare gli elementi della landing.** La sequenza attuale (Home → Profilo → Progetti → Approccio → Contatto) va mantenuta, ma ogni sezione deve avere un ritmo visivo proprio: separatori, sfondi alternati, margini coerenti. Eliminare padding annidati e spaziature incoerenti.

5. **Armonizzare le intestazioni.** Il pattern terminale (`~/path$ cat readme.md`) resta, ma variare il colore del prompt per sezione e ridurre la ripetitività. Ogni sezione deve avere un'identità visiva riconoscibile.

6. **Fluidità e ordine.** Aggiungere animazioni leggere (fade-in, slide-up) per le sezioni in entrata nel viewport (con `prefers-reduced-motion` rispettato). Migliorare il focus outline. Rendere il menu tree più fluido.

7. **Contatto.** Rendere il form più invitante: frase di invito, spazio tra i campi, layout più arioso.

## Vincoli

- Palette invariata (verde #365a45, vino #794957, carta #f8f8f6).
- Tipografia invariata (Avenir Next).
- Nessuna nuova dipendenza o framework.
- Contenuti professionali invariati.
- Nessun slogan o nuova grafica pesante.
- Le regole nuove limitate alla landing dove serve; dashboard e documenti conservano il loro layout.

## Verifica

Viewport 1280 × 900, 820 px, 390 × 844 e 320 px: griglia corretta, testo leggibile, nessun overflow. Toccare le quattro box una volta; provare Tab/Invio e focus visibile. Aprire il tree in fondo alla landing, selezionare una sezione, provare Escape e ritorno del focus. Provare movimento ridotto. Confronto prima/dopo con descrizione.

Eseguire check, build e diff.

**Consegna:** resoconto con confronto dello stile prima/dopo. Prossimo incarico: nessuno automatico.