# v2.1

Versione aggiornata della landing page per edo.dot.

## Cambiamenti principali rispetto a v2.0

### 1. Numerazioni rimosse
- Rimossi tutti i numeri (.01, .02, .03, .04) dai titoli delle sezioni
- Rimossi i numeri dai passaggi del metodo (01/05, 02/05, ecc.)
- Rimossi gli indici dai progetti (.01, .02)
- Rimossi i numeri dalla mappa dei luoghi (01 Milano, 02 Tromsø, ecc.)

### 2. Struttura ad albero
- Aggiunta una sezione tree view all'inizio della landing page
- La struttura riflette il menu tree del sito:
  ```
  edo.dot/
  ├── profilo/
  │   ├── cv.html
  │   └── luoghi
  ├── progetti/
  │   ├── scraper immobiliare.it
  │   └── dashboard generator
  ├── approccio/
  └── collaborazioni/
  ```

### 3. Titoli aggiornati
- profilo (era .01 profilo)
- progetti (era .02 Progetti)
- approccio (era .03 Approccio)
- collaborazioni (era .04 Collaborazioni)
- luoghi (era Luoghi)

## Struttura
- `dist/`: File buildati pronti per la distribuzione
- `src/`: File sorgente (proposal/)
- `tests/`: Test aggiornati

## Prossime versioni
- v2.2: ulteriori ottimizzazioni

## Nota
Questa versione mantiene il contenuto completo delle sezioni, ma introduce una navigazione visiva ad albero all'inizio della pagina.
