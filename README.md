# Edoardo Rana — portfolio

Portfolio statico dedicato a infrastrutture, dati e automazione. La landing raccoglie Profilo, Progetti, Approccio e Collaborazioni; CV, luoghi, contatti, dashboard e documenti operativi restano pagine separate.

## Avvio locale

Richiede Node.js 22 o superiore. Non ci sono dipendenze npm da installare.

```sh
npm run dev
npm run check
npm run build
```

Il server locale risponde su `http://127.0.0.1:4173`. In PowerShell è possibile usare `npm.cmd`.

## Struttura

- `proposal/`: sorgenti pubblici HTML, CSS, JavaScript e dati.
- `scripts/`: server locale, build e preparazione offline dei dati.
- `tests/`: controlli Node e test di regressione.
- `docs/`: contesto corrente e documentazione dei progetti dati.
- `dist/`: output generato da `npm run build`, escluso da Git.

## Navigazione

Le route principali sono `#/profilo`, `#/progetti`, `#/approccio` e `#/contatti`. `#/home` apre l’inizio della landing e `#/percorso` resta un alias compatibile di Profilo. I progetti usano `#/progetti/<id>`.

Il sito non contiene backend, analytics, API key o chiamate a modelli AI. Il modulo contatti prepara una bozza nel programma di posta del visitatore.

## Dati e pubblicazione

La documentazione delle dashboard è in [`docs/DATA_PROJECTS.md`](docs/DATA_PROJECTS.md). Plotly è incluso localmente; i CSV caricati nel Dashboard generator restano nel browser.

Il workflow [`portfolio-checks.yml`](.github/workflows/portfolio-checks.yml) esegue controlli e build e può pubblicare `dist/` su GitHub Pages dal branch `main`.

## Ambienti locali

- `mywebsite`: archivio congelato della versione precedente; non viene modificato.
- `mywebsite-staging`: area di lavoro attiva per modifiche, test e nuove versioni.
- `mywebsite-production`: contiene esclusivamente la versione approvata destinata alla pubblicazione.

Le modifiche nascono nello staging. Production non viene corretta manualmente: riceve soltanto una versione verificata e approvata.
