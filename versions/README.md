# Versions — cronologia del portfolio

Questa cartella conserva soltanto gli snapshot storici `v2` e `v2.1`. Non è la fonte della versione pubblicata e non va usata per sovrascrivere direttamente `proposal/`.

## Produzione corrente

- Sorgente autorevole: `proposal/` su `main`.
- Pubblicazione: branch `main` tramite GitHub Actions.
- Tag `v2.6`: base della release corrente.
- Tag `v2.6.1-backup`: punto di recupero precedente alle ultime rifiniture; non indica una release successiva da pubblicare.

Non è prevista una `v2.2` locale: quella roadmap è stata superata dalle versioni già registrate in Git. Al 31 ottobre 2026 non risultano task di implementazione pendenti.

## Snapshot disponibili

```text
versions/
├── README.md
├── v2.edo.dot
├── v2/
├── v2.1.edo.dot
└── v2.1/
```

- `v2` — base storica del 30 ottobre 2026, commit `c6adf16`.
- `v2.1` — iterazione storica approvata nei contenuti, commit `86625c3`.

Le evoluzioni successive (`v2.5.1`, `v2.6` e le rifiniture correnti) si consultano tramite tag e commit Git, senza duplicarle in questa cartella.

## Consultazione e recupero

```bash
git show v2.6:proposal/index.html
git diff v2.6..main -- proposal/
```

Prima di recuperare un file storico, confrontarlo con `main`: gli snapshot possono contenere scelte poi superate. Per lo stato corrente consultare [`docs/VERSION_ANALYSIS.md`](../docs/VERSION_ANALYSIS.md) e [`docs/STATUS.md`](../docs/STATUS.md).

*Ultimo aggiornamento: 31 ottobre 2026.*
