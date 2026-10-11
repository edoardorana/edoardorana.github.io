# Edoardo Rana — WEB-CV

Prima proposta di portfolio freelance, realizzata dal brief dell'11 ottobre 2026.

## Direzione

**Dai dati grezzi a decisioni utili.** Un sito per spiegare problemi risolvibili e modalità di collaborazione, con il CV come supporto alla credibilità.

- Linguaggio orientato al cliente: meno lavoro ripetitivo, dati organizzati, informazioni leggibili.
- Percorso interattivo: raccolta → automazione → database e protezione → dashboard → valutazione di ML e AI.
- Mappa schematica accessibile con pulsanti alternativi: Milano, Norvegia, Svizzera/remoto. Le posizioni indicano aree, non sedi aziendali. Gli spunti sulle competenze sono sintesi editoriali da confermare.
- Esempi illustrativi di interventi; nessun risultato quantitativo o cliente inventato.
- Stile minimale, avorio/verde/arancio, adattamento mobile, navigazione da tastiera e riduzione del movimento.

## File e anteprima

I file pubblicabili sono in `dist/`: HTML, CSS e JavaScript senza dipendenze. Per GitHub Pages possono essere copiati nella radice del repository oppure distribuiti con un workflow che carichi `dist/`.

La proposta è separata dal vecchio sito. Non modifica `index.html` o la pubblicazione attuale del repository GitHub. L'anteprima Sites usa una configurazione distinta e rimane privata.

## Prima del lancio pubblico

1. Confermare email professionale, eventuale LinkedIn e canali da pubblicare. Il sito NON usa email reperite dai commit GitHub.
2. Aggiornare CV: stato del percorso Data Science, date, ruolo ed esperienze dal 2023, località esatte per la mappa.
3. Confermare le competenze e distinguere servizi già erogabili da ambiti di sviluppo. AI e ML sono presentati come fattibilità e prototipi da valutare.
4. Inserire 1–2 progetti raccontabili senza informazioni riservate: problema, intervento, risultato verificabile.
5. Sostituire il blocco appunti con contatti reali, rimuovere banner di bozza e `noindex` solo al lancio.
6. Verificare visivamente su desktop e mobile. In questa sessione non era disponibile la QA browser supportata.
7. Scegliere dominio e hosting definitivo; poi realizzare brochure e QR usando l'URL pubblico stabile.

## Fonti dei contenuti

- CV già presente in `edoardorana/edoardorana.github.io`, commit `a6599f6981006fba94280e3a88267152795a92b1`: Statistica 2021, percorso Data Science, M9 e tesi di scraping, SB Italia 2023, TaxiBlu settembre–dicembre 2022, Egon Yekta gennaio–luglio 2022 ed Erasmus in Norvegia.
- Brief attuale: servizi sul ciclo del dato, open source, sicurezza, automazioni, dashboard e sviluppi predittivi/AI.
- Informazioni fornite dall'utente sul lavoro attuale: consulenza IT da remoto per azienda svizzera, Linux, Proxmox, SQL, storage e backup. Nessuna azienda cliente o dettaglio infrastrutturale è pubblicato.

## Brochure: proposta editoriale per la fase successiva

Formato A6 fronte/retro, coerente con il sito. Fronte: “Meno copia-incolla. Più tempo per il tuo lavoro.” e tre problemi concreti (Excel ripetitivi, dati dispersi, report difficili da leggere). Retro: presentazione breve, percorso raccolta/automazione/dashboard, contatto e QR al sito pubblico. Evitare una lista iniziale di tecnologie: il primo obiettivo è rendere comprensibile il problema su cui si può collaborare.

## Verifiche

- JavaScript: controllo sintassi Node.
- HTML: ID univoci, ancore interne e risorse locali.
- Interazioni: nessun invio di dati. L'appunto non è salvato su server né nel localStorage; il pulsante usa la clipboard con selezione manuale di riserva.
