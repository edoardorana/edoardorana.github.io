# Progetti dati — prima versione pubblica

## Due percorsi distinti

- `#/progetti/immobiliare-data`: dashboard della tesi su annunci storici di Milano (archivio 2021); il vecchio `market-data` resta un alias.
- `#/progetti/dashboard-generator`: importazione e analisi locale di CSV generici; il vecchio `csv-explorer` resta un alias.
- La demo sintetica precedente è stata eliminata, insieme a dataset, generatore e moduli dedicati. `#/laboratorio` rimanda all'elenco Progetti.

Il frontend resta statico, senza API, backend, analytics o dipendenze npm. Tutti i grafici usano la copia locale di Plotly Basic già presente. Gli istogrammi sono calcolati esplicitamente; i riquadri dei quartili sono tracciati con primitive scatter (baffi minimo/massimo, non Tukey). Nessun nuovo scraping, OMI o modello predittivo.

## Archivio della tesi

La fonte è `frame.RData`, oggetto `frame`: 15.308 righe e 213 colonne. Il confronto con `immobiliare_finale.RData`, oggetto `data3`, restituisce 13.139 righe, 24 colonne e 8.757 identificativi in comune. Non sono versioni semplicemente concatenabili: si usa solo l'archivio iniziale, ricostruendo la pulizia. Gli originali restano esterni al repository e sono esclusi da Git.

La pipeline [prepare_housing.py](../scripts/prepare_housing.py):

1. legge gli archivi R con pyreadr, senza eseguire codice R;
2. verifica gli identificativi e deduplica senza usare il vecchio `merge`;
3. esclude 501 aste e 76 righe con tipologia non residenziale/non riconosciuta;
4. converte solo importi e superfici interpretabili senza ambiguità; rimuove il suffisso di interfaccia `- Vedi dettaglio`, ma non trasforma intervalli in valori puntuali;
5. mantiene mancanti e distingue locali da camere da letto;
6. seleziona le zone tramite [elenco controllato](../scripts/housing-zones.json), eliminando indirizzi confluiti nel campo zona;
7. pubblica soltanto nove campi: ID nuovo, zona, tipologia, stato, superficie, prezzo richiesto, locali, classe energetica e segnalazione anomalia;
8. genera il [rapporto di qualità](housing-quality.json) e il dataset statico.

Risultato: **14.731 righe**, 11 segnalate come anomale e inizialmente escluse dalle viste. Mancano 321 superfici, 1.462 prezzi, 874 locali, 2.081 classi energetiche, 763 stati e 20 zone. Non si imputano valori. Soglie tecniche di anomalia: prezzo fuori da 5.000–50.000.000 €, superficie fuori da 10–2.000 m² o rapporto fuori da 200–50.000 €/m². Le righe restano selezionabili ed esportabili.

I campi omessi includono URL, identificativi originali, titoli, indirizzi, descrizioni, riferimenti catastali e contatti. Questa riduzione non è una dichiarazione di anonimizzazione formale o di licenza generale sui dati originali. L'anno identifica l'archivio fornito dall'autore: non viene inventata una data di raccolta per ciascuna riga.

Le mediane usano soltanto valori disponibili e riportano il denominatore. La mediana €/m² è la mediana dei rapporti, non il rapporto fra due mediane. I confronti mostrano fino a 20 categorie ordinate per valore, con numerosità esplicita e misura/aggregazione configurabili. Lo scatter mostra al massimo 4.000 osservazioni tramite passo deterministico; KPI, filtri, istogramma ed export usano tutte le righe. Non c'è una pretesa di rappresentatività del mercato, né una stima del valore attuale. Annunci distinti dello stesso immobile possono ancora essere presenti.

### Riprodurre la preparazione

Solo per rigenerare il dataset serve Python (sviluppo verificato con 3.12). Il sito e la build non lo richiedono.

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r scripts/requirements-data.txt
.\.venv\Scripts\python.exe scripts/prepare_housing.py <frame.RData> --comparison <immobiliare_finale.RData>
.\.venv\Scripts\python.exe -m unittest discover -s tests -p 'test_*.py'
```

La build pubblica soltanto `proposal/`; script Python, archivi privati e report di sviluppo non vengono copiati in `dist/`. Il JSON pubblico è scaricabile come ogni asset statico; il pulsante della dashboard esporta la selezione in CSV.

## Dashboard generator

- UTF-8 o Windows-1252; separatore rilevato dalla prima riga o scelto manualmente (virgola, punto e virgola, tab).
- Virgolette, delimitatori nelle celle e celle multilinea; intestazioni obbligatorie/univoche, righe coerenti. Righe completamente vuote ignorate.
- Limiti: 10 MB, 30.000 righe, 100 colonne, 30 trasformazioni. Nessuna promessa di gestione di dataset illimitati.
- Inferenza prudente: numero, data ISO valida, altrimenti categoria. Booleani e codici si possono trattare come categorie. Tipi e convenzione decimale guidano i grafici; non riscrivono le celle esportate.
- Pulizia: spazi, minuscole, rinomina, riempimento esplicito delle celle vuote, rimozione di righe con celle vuote, filtro testuale, duplicati esatti, marcatori mancanti espliciti e conversione GG/MM/AAAA → ISO. Annulla tramite riproduzione delle operazioni; ripristino integrale.
- Fino a cinque viste da sei famiglie: istogramma, barre (conteggio/media/mediana/somma), scatter con colore opzionale, quartili per categoria, serie temporale aggregata per giorno e composizione percentuale per categoria.
- Massimo 40 categorie, 20 per il colore. Conversioni incompatibili escluse con conteggio per grafico. Nessuna conversione automatica di date ambigue come `01/02/21`.
- CSV esportato con BOM UTF-8, punto e virgola, escape delle virgolette e protezione delle celle testuali che possono essere interpretate come formule. Numeri negativi semplici restano numeri.
- Nessun invio del file, `localStorage` o salvataggio automatico. Cambiare pagina/rinnovare la scheda elimina la sessione: il testo dell'interfaccia invita a esportare prima.

## Verifiche e limiti

Test Node per parser, conversioni, trasformazioni, sicurezza export, aggregazioni e schema pubblico; test Python per conversione delle superfici, aste, duplicati e selezione dei campi. Browser: importazione CSV multilinea, rimozione duplicati, filtro vuoto/annulla/ripristino, tipi, grafici, filtri immobiliari e nessuna richiesta di rete durante importazione ed elaborazione CSV.

Non inclusi: Excel, conservazione delle configurazioni, filtri numerici generici nell'Explorer, altri formati data, mappe geografiche o modelli predittivi. Possibili iterazioni successive, dopo prova della prima versione con file reali dell'utente. Le prestazioni dipendono dal dispositivo; i limiti sono un tetto, non una garanzia su ogni telefono.

## Revisione dell’interazione — 28 ottobre 2026

- Dashboard immobiliare: minimo/massimo €/m²; clic su categoria, fascia istogramma o presenza/mancanza; selezione di punti dello scatter. Filtri rimovibili e azzerabili, applicati agli stessi record di KPI, tabella ed export. La selezione dello scatter comprende soltanto i punti effettivamente mostrati.
- Generator: Carica → Controlla → Prepara → Scegli la domanda → Costruisci; drag and drop, impostazioni di lettura, tipi modificabili, anteprima dell’effetto e annulla. La cronologia conserva operazioni e tipi, senza accumulare copie integrali del dataset.
- Anomalie IQR soltanto segnalate. La scelta del grafico segue domanda e tipi delle colonne, ispirandosi a [From Data to Viz](https://www.data-to-viz.com/); nessun codice esterno copiato e nessuna nuova libreria.
