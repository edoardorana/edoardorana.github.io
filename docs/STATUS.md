# Stato del progetto

## Versione 0.5 — 16 ottobre 2026

- Ripensata la grafica del sito attivo in chiave minimale: testata `Edo.`, menu a linee, palette quasi monocromatica e tipografia coerente con il CV web.
- Home: eliminati slogan, etichette ridondanti e decorazioni delle card. La mappa ha cinque nodi essenziali e un'anteprima centrale che cambia con hover e focus da tastiera. Intro riscritta con informazioni professionali concrete.
- Quinta area rinominata `Collaborazioni`; route `#/contatti` invariata. Eliminati il pulsante `Parliamone` in testata e la CTA forzata nelle schede progetto. Email diretta nel footer.
- Mobile: nodi in griglia, con scorrimento naturale quando necessario. Desktop: home contenuta nella viewport da 680 px di altezza in su; finestre più basse scorrono per non tagliare contenuti.
- Verifiche: `npm.cmd run check` e `npm.cmd run build` superati; browser integrato a 320, 390, 768, 1002 e 1280 px senza overflow orizzontale o sovrapposizioni dei nodi; hover/focus, menu da tastiera, refresh delle route e Indietro verificati. Nessun controllo su dispositivi fisici o Safari.
- Prossimo passo: valutare insieme la resa visiva e, se approvata, affinare i testi delle sezioni interne. Preview Sites non aggiornata in questa sessione.

## Versione 0.4 — 15 ottobre 2026

- Stile globale riallineato alla sintesi minimale del CV: titoli serif, gerarchie più compatte, bordi e superfici più leggeri.
- Home desktop adattata alla viewport: la mappa occupa lo spazio disponibile tra testata e footer e non introduce scroll verticale; telefono e tablet mantengono lo scrolling naturale.
- Ridotti gli spazi verticali e le dimensioni delle card senza modificare le cinque aree, le route o le interazioni.
- Verifiche: `npm.cmd run check` e `npm.cmd run build` superati; preview locale verificata a 1280×720 senza overflow verticale e a 390×844 con scroll mobile attivo.
- Limite: la verifica visiva è stata fatta nel browser integrato con viewport rappresentative; non sono stati verificati dispositivi fisici o Safari.

## Versione 0.3 — 15 ottobre 2026

- Percorso con mappa europea locale e quattro tappe cliccabili: Milano, Norvegia, Svizzera, Stoccarda. Pulsanti accessibili da tastiera, selezione sincronizzata e scheda annunciata con aria-live.
- Stoccarda in corso da ottobre 2026, termine previsto circa 31 dicembre; soggiorno distinto da impiego. Svizzera resta lavoro da remoto.
- Profilo e cronologia web distinguono Linux Administrator da maggio 2025 e DBA ottobre 2024–maggio 2025. CV Word: testo fornito in chat; CV web stampabile da rivedere successivamente.
- Approccio da riscrivere con calma; Progetti destinato ai repository futuri. Ecosistema email/LinkedIn/ricerca opportunità ancora in discussione.
- Verifiche: sintassi, test automatici e build statica. Browser QA non disponibile in questa sessione: resa desktop/mobile da validare con Edoardo.

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

Controlli automatici su routing, deep link, encoding email, coordinate e semantica della mappa, limiti del server locale e riferimenti HTML. Build statica e controlli sintassi eseguiti nella sessione di preparazione; risultati riportati nella conversazione.

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
