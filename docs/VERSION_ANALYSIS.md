# Produzione corrente — 31 ottobre 2026

- **Fonte pubblicata**: branch `main` tramite il workflow GitHub Pages.
- **Sorgenti**: `proposal/`; `dist/` è generato dalla build e non va modificato direttamente.
- **Riferimenti Git**: `v2.6` è la release di base; `v2.6.1-backup` è un punto di recupero, non il nome della produzione corrente. Le rifiniture successive sono già in `main`.

## Stato funzionale

- **Landing**: quattro capitoli — Profilo, Progetti, Approccio, Collaborazioni — in un indice compatto. Non esiste un menu duplicato.
- **Profilo**: collega il CV e la pagina Luoghi. La mappa vive interamente in `luoghi.html`.
- **CV**: contenuto a piena larghezza con `profilo/`, `esperienze/`, `formazione/`, `competenze/`; nessun pulsante dedicato alla stampa.
- **Progetti**: Immobiliare-data e Dashboard generator restano pagine separate. Immobiliare-data usa `dataset/`, `lettura/` e `attenzione/`, filtri compatti e cinque viste coordinate — distribuzione annotata, lollipop, densità, radiale e heatmap. Il riepilogo “Il dataset in breve” è stato rimosso.
- **Approccio**: cinque documenti separati, collegati da uno stepper orizzontale; `Salva PDF` resta in fondo a ciascun documento.
- **Collaborazioni**: Contatti usa `~/collaborazioni$ contatti --list` e `~/collaborazioni$ mail --new`, con campi oggetto e messaggio immediatamente disponibili.
- **Navigazione**: il marchio `edo.dot` porta alla Home. Tutte le pagine usano il solo footer `© 2026 edo.dot`; non sono presenti pulsanti di ritorno duplicati né menu nei footer.

## Chiusura attività

Non risultano task di implementazione pendenti rispetto alla produzione. Le verifiche su telefono fisico, Safari/Firefox e screen reader restano miglioramenti di QA, non blocchi di release.
