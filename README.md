# Edoardo Rana — portfolio a mappa

Sito personale per raccontare profilo, percorso, approccio e progetti, e aprire nuove collaborazioni.

**Per iniziare su Windows / Visual Studio Code:** [guida passo passo](docs/SETUP_VSCODE.md).

## Avvio rapido

Node.js 22 o superiore. Nessuna dipendenza da installare.

```sh
npm run dev
npm run check
npm run build
```

Apri http://127.0.0.1:4173. In PowerShell puoi usare `npm.cmd` se `npm.ps1` è bloccato. Apri `portfolio.code-workspace` e premi F5 per l'avvio guidato.

## Struttura

- `proposal/`: sorgenti della nuova versione (HTML, CSS, JavaScript).
- `dist/`: output generato per la pubblicazione, escluso da Git.
- `scripts/`: server locale e build senza dipendenze.
- `tests/`: controlli essenziali con il test runner di Node.
- `.vscode/`: avvio, task ed estensioni consigliate.
- `AGENTS.md`: istruzioni condivise per gli assistenti.
- `docs/PROJECT_CONTEXT.md`: obiettivi, contenuti verificati e decisioni.
- `docs/STATUS.md`: stato corrente e prossimi passi.

## Navigazione

La mappa collega cinque aree con URL dedicati: `#/profilo`, `#/approccio`, `#/percorso`, `#/progetti` e `#/contatti`. I progetti hanno un ulteriore livello `#/progetti/<id>`. Le route hash funzionano su hosting statico senza rewrite.

Il contatto usa il programma di posta del visitatore. La mappa geografica è un SVG locale, senza servizi cartografici caricati a runtime. Il portfolio non contiene API AI, analytics o un backend.

## Versioni e pubblicazione

Sito pubblico: https://edoardorana.github.io/ . I sorgenti sono in `proposal/`; il workflow [Portfolio checks and Pages](.github/workflows/portfolio-checks.yml) esegue i controlli, genera `dist/` e pubblica la build su GitHub Pages quando il codice viene integrato in `main`. La vecchia pagina alla radice non è più la sorgente del sito.

Anteprima privata: https://edo-data-studio.loyalsage32.chatgpt.site

Il push al branch di lavoro aggiorna il codice e i controlli GitHub; il deploy pubblico avviene solo da `main`. La preview Sites non viene sincronizzata automaticamente e va aggiornata separatamente.

Il sito è pubblicato come versione in evoluzione. La [revisione critica](docs/FREELANCE_REVIEW.md) raccoglie le priorità di miglioramento; continuare a verificare le route e la resa sui dispositivi prima delle modifiche future.
