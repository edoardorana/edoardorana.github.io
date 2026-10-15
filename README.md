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

Il contatto usa il programma di posta del visitatore. La mappa geografica richiede OpenStreetMap e viene caricata con un pulsante; le descrizioni restano leggibili senza il servizio esterno. Il portfolio non contiene API AI, analytics o un backend.

## Versioni e pubblicazione

La nuova proposta è sul branch `feat/freelance-portfolio`, PR #1. Nel repository GitHub i vecchi file alla radice restano disponibili; l'home precedente non viene sostituita automaticamente.

Anteprima privata: https://edo-data-studio.loyalsage32.chatgpt.site

Il push al branch aggiorna il codice e i controlli GitHub, non la preview Sites. La sincronizzazione con Sites è esplicita. Per un futuro lancio con GitHub Pages, pubblicare `dist/` con un workflow dedicato; non è stato attivato in questa iterazione.

Il sito è una versione di lavoro: prima del lancio pubblico verificare la checklist browser in `docs/SETUP_VSCODE.md` e rimuovere `noindex` quando la pubblicazione pubblica è intenzionale.
