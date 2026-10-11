# Stato del progetto

## Versione 0.2 — 11 ottobre 2026

- Nuova home a mappa con cinque aree esplorabili e collegamenti contestuali.
- Route hash condivisibili, schede progetto e navigazione Indietro/Avanti.
- Profilo e cronologia aggiornati al CV 2026; CV web stampabile con dati professionali essenziali.
- Percorso con mappa OpenStreetMap caricata solo su richiesta; paese e area indicativi, senza inventare sedi dei clienti.
- Contatti tramite mailto e copia email; nessun backend, invio o salvataggio dei messaggi.
- Configurazione VS Code, server Node locale, build e controlli senza dipendenze.
- Contesto condiviso in PROJECT_CONTEXT e istruzioni per assistenti; nessuna importazione automatica della chat.

## Pubblicazione

- Repository: edoardorana/edoardorana.github.io.
- Branch: feat/freelance-portfolio; PR #1.
- Sorgenti attivi: proposal/. Il sito legacy alla radice resta invariato.
- Preview privata: https://edo-data-studio.loyalsage32.chatgpt.site
- GitHub e Sites sono due destinazioni aggiornate esplicitamente. Nessun deploy GitHub Pages automatico configurato.

## Verifiche

Controlli automatici su routing, deep link, encoding email, URL mappa, limiti del server locale e riferimenti HTML. Build statica e controlli sintassi eseguiti nella sessione di preparazione; risultati riportati nella conversazione.

Limite: QA visiva/interattiva in browser e avvio sul PC Windows dell'utente ancora da eseguire. Seguire la checklist in SETUP_VSCODE. Le transizioni spaziali sono una prima implementazione da calibrare visivamente con Edoardo.

## Prossimi passi

1. Aprire il workspace sul PC e completare login GitHub/Codex.
2. Verificare resa desktop/mobile, interazioni e sensazione di ingresso nelle aree.
3. Raccogliere screenshot pubblicabili e risultati verificabili per le schede progetto.
4. Confermare eventuali link LinkedIn e canali di contatto aggiuntivi.
5. Versione inglese e localizzazione della navigazione.
6. Definire URL pubblico definitivo e lancio; poi brochure e QR.

## Regola di continuità

Dopo una sessione, annotare qui cosa è cambiato, verifiche fatte e cosa rimane. Includere nel commit. Il successivo assistente parte da questi documenti e dal Git diff, non da supposizioni sul contenuto di chat precedenti.
