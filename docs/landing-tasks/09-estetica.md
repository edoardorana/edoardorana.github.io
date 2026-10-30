# 09 — Migliorare la grafica della landing

**Dipendenza:** 08 completato. Leggere [piano](../LANDING_AI_PLAN.md), [registro](../LANDING_PROGRESS.md), [rapporto QA](../LANDING_QA.md) e il feedback di Edoardo.

## Obiettivo

Migliorare fluidità e ordine della landing, senza cambiare contenuti, palette, tipografia o dipendenze. Intervenire su home, mappa e ritmo visivo delle sezioni.

## File consentiti

[style.css](../../proposal/style.css), [script.js](../../proposal/script.js) solo per animazioni/focus, [index.html](../../proposal/index.html) solo per classi/attributi della testata, registro e STATUS. Nessuna modifica a dati, logiche o documenti.

## Azioni

1. **Home — più calore e orientamento**
   - Aggiungere una breve frase personale sotto il titolo (non slogan): es. "Lavoro su infrastrutture Linux, database e analisi dei dati. Qui trovi il mio percorso, i progetti e come contattarmi."
   - Migliorare l'atlas: aumentare leggermente il padding interno delle aree, migliorare il contrasto del comando su hover.
   - Aggiungere una linea decorativa sottile sotto la home per separarla dal Profilo.

2. **Mappa — più leggibilità**
   - Ingrandire i punti sulla mappa (da ~6px a ~10px).
   - Migliorare il contrasto delle etichette (sfondo leggermente più opaco).
   - Aggiungere più spazio verticale tra la mappa e il contenuto successivo.
   - Migliorare la legenda o l'indicazione visiva per il tipo di punto (città vs remoto vs soggiorno).

3. **Sezioni — più ritmo e respiro**
   - Aggiungere un separatore visivo sottile tra le sezioni.
   - Alternare leggermente lo sfondo delle sezioni (es. bianco puro per Profilo, carta per Progetti) per creare ritmo.
   - Aumentare il margine superiore di ogni sezione (da 27px a 40-48px).

4. **Intestazioni — più varietà**
   - Mantenere il pattern terminale ma variare il colore del prompt (es. verde per Profilo, vino per Collaborazioni) per dare identità visiva alle sezioni.
   - Ridurre leggermente la dimensione del summary per non competere con il contenuto.

5. **Generale — fluidità**
   - Aggiungere un'animazione di fade-in leggera (opacity + translateY) per le sezioni quando entrano nel viewport (con `prefers-reduced-motion` rispettato).
   - Migliorare il focus outline: usare un outline più sottile e con offset maggiore.
   - Migliorare la transizione del menu tree.

6. **Contatto — più invito**
   - Aggiungere una frase di invito prima del form (es. "Hai un problema tecnico o un'idea di collaborazione? Scrivimi.").
   - Migliorare il layout del form (più spazio tra i campi).

## Vincoli

- Palette invariata (verde #365a45, vino #794957, carta #f8f8f6).
- Tipografia invariata (Avenir Next).
- Nessuna nuova dipendenza o framework.
- Contenuti professionali invariati.
- Nessun slogan o nuova grafica pesante.
- Le regole nuove limitate alla landing dove serve.

## Verifica

Viewport 1280 × 900, 820 px, 390 × 844 e 320 px: griglia corretta, testo leggibile, nessun overflow. Toccare le quattro box una volta; provare Tab/Invio e focus visibile. Aprire il tree in fondo alla landing, selezionare una sezione, provare Escape e ritorno del focus. Provare movimento ridotto. Confronto prima/dopo con screenshot o descrizione.

Eseguire check, build e diff.

**Consegna:** resoconto con confronto dello stile prima/dopo. Prossimo incarico: nessuno automatico.