# v2.4

Versione con tree view anche nella sezione profilo.

## Cambiamenti principali rispetto a v2.3

### 1. Sezione profilo trasformata in tree view
La sezione profilo ora mostra la struttura ad albero:

```
profilo/
├── cv.html
└── #esperienze #formazione #competenze #lingue
```

### 2. Stili aggiornati
- Aggiunti stili per `.compact-tree`, `.tree-hashtags`
- Adattati per integrate la tree view nella sezione profilo

### 3. Contenuto mantenuto
- La mappa e la sezione luoghi rimangono invariati sotto la tree view
- Il link "Apri ↗" per cv.html è stato rimosso (sostituito dal link diretto in cv.html)

## Struttura
- `dist/`: File buildati pronti per la distribuzione
- `src/`: File sorgente (proposal/)
- `tests/`: Test aggiornati

## Prossime versioni
- v2.5: ulteriori ottimizzazioni e refinements

## Nota
Questa versione applica la struttura ad albero sia al menu (premendo su `~$ tree`) che alla sezione profilo della landing page.
