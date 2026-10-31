# Versions — Cronologia Sviluppo Portfolio

Questa cartella contiene la **cronologia delle versioni** del portfolio Edoardo Rana.

## 📁 Struttura

```
versions/
├── README.md              # Questo file
├── v2.edo.dot             # Documentazione versione v2 (BASE)
├── v2/                    # File della versione v2
│   ├── data.mjs.v2
│   ├── script.js.v2
│   ├── index.html.v2
│   ├── style.css.v2
│   ├── contact.mjs.v2
│   ├── sitemap.xml.v2
│   └── og-image.svg.v2
├── v2.1.edo.dot           # Documentazione versione v2.1 (APPROVATA)
└── v2.1/                  # File della versione v2.1
    ├── data.mjs.v2.1
    ├── script.js.v2.1
    ├── index.html.v2.1
    ├── style.css.v2.1
    ├── contact.mjs.v2.1
    ├── sitemap.xml.v2.1
    ├── og-image.svg.v2.1
    └── portfolio.test.mjs.v2.1
```

## 🎯 Versioni

### V2 (30 Ottobre 2026) — Base Landing Page
- **File**: `v2.edo.dot` + `v2/`
- **Status**: BASE PER LANDING PAGE (con errori da correggere)
- **Commit**: c6adf16
- **Prossima**: v2.1

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

---

### V2.1 (30 Ottobre 2026) — Versione Approvata
- **File**: `v2.1.edo.dot` + `v2.1/`
- **Status**: **APPROVATA dall'utente** (graficamente da sistemare)
- **Commit**: 86625c3
- **Feedback**: "così com'è ora mi piace molto anche se graficamente dobbiamo ancora sistemarlo"
- **Prossima**: v2.2 (ottimizzazioni grafiche)

**Cosa è stato confermato**:
- ✅ Contenuti approvati
- ✅ Funzionalità approvate
- ✅ Struttura approvata
- ⚠️ Grafica da sistemare

**Cosa è stato implementato**:
- Tutte le funzionalità v2
- Test: 26/26 ✅
- Build: ✅

---

### Roadmap

| Versione | Data | Obiettivi | Status |
|----------|------|-----------|--------|
| v1.x | Sett-Ott 2026 | Landing originale | 📦 Archived |
| v2 | 30 Ott 2026 | Base Landing Page | ✅ Archived |
| **v2.1** | **30 Ott 2026** | **Approvata (grafica da sistemare)** | ✅ **Current** |
| v2.2 | Nov-Dic 2026 | Ottimizzazioni grafiche | 🔄 Planned |

## 📌 Come usare

1. **Consultare la documentazione**:
   - Leggi `v2.edo.dot` per la base
   - Leggi `v2.1.edo.dot` per la versione approvata

2. **Confrontare versioni**:
   ```bash
   # Confrontare v2 vs v2.1
   diff versions/v2/script.js.v2 versions/v2.1/script.js.v2.1
   ```

3. **Recuperare vecchie versioni**:
   ```bash
   # Ripristinare un file
   cp versions/v2.1/script.js.v2.1 proposal/script.js
   ```

4. **Creare nuove versioni**:
   - Creare `v2.2.edo.dot` con aggiornamenti
   - Salvare snapshot in `versions/v2.2/`
   - Aggiornare questo README

## 🔍 Note

- Le versioni sono **cumulative**: ogni versione include tutte le modifiche precedenti
- I file con estensione `.vX.Y` sono **snapshots** della versione specifica
- Il file `.edo.dot` contiene **metadata e documentazione**
- La **v2.1** è una versione storica approvata dall'utente; il riferimento Git più recente è **v2.5.1** (tag sul commit `b4c1617`), seguito da correzioni locali candidate alla prossima versione.
- Per l'analisi completa delle versioni e lo stato dei branch, consultare [`docs/VERSION_ANALYSIS.md`](../docs/VERSION_ANALYSIS.md).

## 📊 Statistiche

### V2 (Base)
- File modificati: 8
- File creati: 2
- Righe codice: +750
- Test: 26/26 ✅
- Build: ✅

### V2.1 (Approvata)
- File modificati: 8 (+1 test)
- File creati: 2
- Righe codice: +750
- Test: 26/26 ✅
- Build: ✅
- **Feedback**: APPROVATA

---
*Ultimo aggiornamento: 31 Ottobre 2026*

*Riferimento Git corrente: v2.5.1; correzioni successive non ancora versionate*

*Snapshot in questa cartella: v2, v2.1*
*Analisi dettagliata: `docs/VERSION_ANALYSIS.md`*
