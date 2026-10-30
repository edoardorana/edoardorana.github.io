# Rapporto QA landing

Data: 30 ottobre 2026. Branch: `feat/landing-page`. HEAD: `c0b97a8` (compito 06). Base: tag `backup/pre-landing-2026-10-30` (`31bf486`).

## Controlli automatici

| Controllo | Esito |
| --- | --- |
| `npm.cmd run check` | PASS — 26 test Node, 0 fail; tutti i `node --check` superati |
| `npm.cmd run build` | PASS — `Build ready: dist/` |
| `git diff --check` | PASS — nessun errore di whitespace (solo warning LF→CRLF preesistente) |

## Checklist browser

Nessun browser disponibile in questa sessione. Tutte le prove browser sono NON VERIFICATO. Le prove automatiche non sostituiscono la checklist browser.

| Prova | Esito | Viewport / azione |
| --- | --- | --- |
| Tutti gli URL del piano, apertura diretta e refresh | NON VERIFICATO | Richiede browser |
| Salti box/tree, stesso hash, Indietro/Avanti | NON VERIFICATO | Richiede browser |
| Scorrimento manuale | NON VERIFICATO | Richiede browser |
| Header a 1280/820/390/320 px | NON VERIFICATO | Richiede browser |
| Tastiera, Escape, link salta-contenuto | NON VERIFICATO | Richiede browser |
| Movimento ridotto | NON VERIFICATO | Richiede browser |
| Titoli e ID | NON VERIFICATO | Richiede browser (verificabile anche via DOM inspection) |
| Mappa e contatto | NON VERIFICATO | Richiede browser |
| Profilo e Progetti | NON VERIFICATO | Richiede browser |
| Approccio | NON VERIFICATO | Richiede browser |
| CV e documenti | NON VERIFICATO | Richiede browser |
| Prima apertura landing con cache nuova | NON VERIFICATO | Richiede browser (network panel) |
| Apertura/uscita ripetuta dalle dashboard | NON VERIFICATO | Richiede browser |
| Dashboard immobiliare | NON VERIFICATO | Richiede browser |
| Generator | NON VERIFICATO | Richiede browser |
| Contatto | NON VERIFICATO | Richiede browser |

## Limiti

- Nessun browser disponibile in questa sessione; nessuna prova visiva eseguita.
- Non provati: telefono fisico, Safari, Firefox, lettore di schermo, dialogo stampa, client email.
- I risultati delle verifiche del vecchio sito (STATUS) non sono attribuiti alla nuova landing.
- Il compito 05 e 06 hanno prove browser in attesa; la navigazione DOM e il layout non sono stati verificati visualmente.

## Difetti bloccanti

Nessuno rilevato a livello automatico. I difetti visivi, se presenti, saranno individuati dal revisore o in una sessione con browser.

## Conclusioni della revisione finale (compito 08)

Revisione in sola lettura. Diff completo confrontato con il tag `backup/pre-landing-2026-10-30` (`31bf486`): 30 file cambiati. Cambiati navigazione/composizione (script.js, navigation.mjs, index.html), stili (style.css, terminal-header.mjs), documentazione e test. Nessun cambiamento a fatti professionali, dataset o logiche delle dashboard.

Duplicazioni/renderer inutilizzati: `sectionNav` e i renderer autonomi (profile, approach, contact, projectList, projectDetail con embedded=false) sono ormai morti codice per la landing (resolveView mappa tutto alla landing). Segnalati come pulizia circoscritta, non eseguiti. Vecchi binding ai tab: rimossi. Più inizializzazioni degli eventi: nessuna rilevata. Regole CSS del blocco Home a schermo intero: il vincolo `body[data-page="mappa"]` resta ma non si applica alla landing.

CV, due dashboard, scheda NetBox e cinque documenti: confermati separati e raggiungibili.

Giudizio: continuità e fedeltà allo stile conservate; lunghezza e densità da valutare visivamente. Prove browser NON VERIFICATO.

Riferimento per ripristinare la vecchia versione: tag `backup/pre-landing-2026-10-30` (`31bf4867902916fbf0f4137e12a38a77674cccca`).

## Prossimo passo

Eseguire le prove browser (preferibilmente da Edoardo o dal revisore) prima di pubblicare. Il compito 08 può valutare la prova con i difetti bloccanti risolti e le verifiche essenziali completate.