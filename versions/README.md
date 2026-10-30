# Versions — Cronologia Sviluppo Portfolio

Questa cartella contiene la **cronologia delle versioni** del portfolio Edoardo Rana.

## 📁 Struttura

```
versions/
├── README.md           # Questo file
├── v2.edo.dot          # Documentazione versione v2
└── v2/                 # File della versione v2
    ├── data.mjs.v2
    ├── script.js.v2
    ├── index.html.v2
    ├── style.css.v2
    └── contact.mjs.v2
```

## 🎯 Versioni

### V2 (30 Ottobre 2026) — Base Landing Page
- **File**: `v2.edo.dot` + `v2/`
- **Status**: BASE PER LANDING PAGE (con errori da correggere)
- **Commit**: c6adf16
- **Prossime**: v2.1, v2.2

**Cosa è stato aggiunto**:
- Sezione Servizi con 6 offerte freelance
- SEO (OpenGraph, Twitter Cards, schema.org)
- Immagine OG SVG
- Sitemap XML
- Case study per progetti
- Email templates

**Problemi noti**:
- Non testato su mobile reale
- Non testato con screen reader
- Immagine OG in SVG (non PNG)
- Alcuni test potrebbero avere regressioni

### Roadmap

| Versione | Data | Obiettivi | Status |
|----------|------|-----------|--------|
| v1.x | Sett-Ott 2026 | Landing originale | 📦 Archived |
| **v2** | **30 Ott 2026** | **Base Landing Page** | ✅ **Current** |
| v2.1 | Nov 2026 | Correzioni errori, test | 🔄 Planned |
| v2.2 | Dic 2026 | i18n, Analytics, Blog | 📅 Planned |

## 📌 Come usare

1. **Consultare la documentazione**: Leggi `v2.edo.dot` per i dettagli
2. **Confrontare versioni**: Usa `diff` per confrontare file tra versioni
3. **Recuperare vecchie versioni**: Copia i file da `v2/` per ripristinare

## 🔍 Note

- Le versioni sono **cumulative**: ogni versione include tutte le modifiche precedenti
- I file con estensione `.v2` sono **snapshots** della versione v2
- Il file `.edo.dot` contiene **metadata e documentazione**

## 📊 Statistiche Versione v2

- File modificati: 8
- File creati: 2
- Righe codice: +750
- Test: 26/26 ✅
- Build: ✅

---
*Ultimo aggiornamento: 30 Ottobre 2026*
