# v2.3

Versione aggiornata del menu con struttura ad albero.

## Cambiamenti principali rispetto a v2.1

### 1. Menu trasformato in tree view
Il menu (che si apre cliccando su `~$ tree`) ora mostra la struttura ad albero completa:

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

### 2. Stili aggiornati
- Stili specifici per `#site-index .tree-root`, `#site-index .tree`, `#site-index .tree-folder`
- Rimossi i riferimenti alla tree view dalla landing page (ora solo nel menu)

### 3. Link aggiornati
- `cv.html` e `luoghi` sono ora diretti sotto `profilo/`
- Nomi dei progetti aggiornati: `scraper immobiliare.it` e `dashboard generator`

### 4. Tree view rimossa dalla landing page
La tree view è ora **esclusivamente nel menu**, non più nella landing page.

## Struttura
- `dist/`: File buildati pronti per la distribuzione
- `src/`: File sorgente (proposal/)
- `tests/`: Test aggiornati

## Prossime versioni
- v2.4: ulteriori ottimizzazioni e refinements

## Nota
Questa versione risponde alla richiesta di avere il menu con la struttura ad albero esattamente come specificato, utilizzando i simboli ├── e └──.
