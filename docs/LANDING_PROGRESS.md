# Registro landing

Preparazione del piano completata il 30 ottobre 2026. Compito 00 eseguito: base salvata; nessuna implementazione della landing.

- Direzione: quattro sezioni nella landing; CV, dashboard, NetBox e documenti Approccio separati.
- Base osservata durante la preparazione: `main`, `31bf4867902916fbf0f4137e12a38a77674cccca`.
- Branch della prova: `feat/landing-page`, creato nel compito 00 sul commit base `31bf4867902916fbf0f4137e12a38a77674cccca`.
- Tag della base: `backup/pre-landing-2026-10-30`, creato nel compito 00 sul commit base `31bf4867902916fbf0f4137e12a38a77674cccca`.
- Incarico **02** eseguito e revisionato. Prossimo incarico autorizzato: **03**. Un solo scrittore alla volta.
- I documenti di pianificazione e le istruzioni condivise sono modifiche locali preparatorie, da preservare e registrare nel compito 00. Nessuna modifica al sito è stata effettuata per scrivere il piano.

| ID | Esecuzione | Revisione | Commit / evidenza |
| --- | --- | --- | --- |
| 00 | Eseguito | Approvata da Codex · 30 ottobre 2026 | commit `538c1cb3d224b07d16345b19dadc53bdf326c2f6`; base `31bf4867902916fbf0f4137e12a38a77674cccca`; tag `backup/pre-landing-2026-10-30` |
| 01 | Eseguito | Approvata da Codex · 30 ottobre 2026 | 22 test, build, diagnostica e browser 1280/390 px superati; checkpoint sul branch `feat/landing-page` |
| 02 | Eseguito | Approvata da Codex · 30 ottobre 2026 | 22 test, build, diagnostica e browser 1280/390 px superati; cinque fasi sequenziali e schede separate |
| 03 | Da iniziare | Non eseguita | — |
| 04 | Da iniziare | Non eseguita | — |
| 05 | Da iniziare | Non eseguita | — |
| 06 | Da iniziare | Non eseguita | — |
| 07 | Da iniziare | Non eseguita | — |
| 08 | Da iniziare | Non eseguita | — |

## Consegna più recente

Compilare dopo ogni incarico, sostituendo questo blocco con il resoconto corrente. Conservare in basso una breve cronologia degli incarichi conclusi.

```text
Incarico: 02 — Mostrare le cinque fasi dell'Approccio
Assistente / sessione, se noto: Codex, sessione secondaria task02_approach
Branch e commit di partenza: feat/landing-page @ 637e8330634b06a342b9ef7190210f3f011c8931
Modifiche preesistenti: `.gl.txt` non tracciato, preservato e non modificato
File modificati: proposal/script.js per rendere statiche e sequenziali le cinque fasi e rimuovere stato/binding dei tab; proposal/style.css per il layout a blocchi e la rimozione del CSS esclusivo di tab/frecce; tests/portfolio.test.mjs per la nuova frase README; registro e STATUS per la consegna
Comandi eseguiti ed esiti: npm.cmd run check (22 test, 0 fail); npm.cmd run build (Build ready: dist/); git diff --check superato (solo warning LF→CRLF del checkout Windows)
Prove browser: Edge headless a 1280 e 390 px con emulazione CDP; cinque fasi in ordine, un solo h1, zero tab/frecce e nessun overflow orizzontale. Controllati i cinque URL delle schede (HTTP 200) e i relativi collegamenti di ritorno ad Approccio; Evolvere conserva titolo e nota di bozza.
Verifiche mancanti: nessun dispositivo fisico, Safari o Firefox; il browser condiviso della sessione principale non era direttamente accessibile dalla sessione secondaria, quindi la prova è stata eseguita con Edge locale.
Problemi / decisioni aperte: nessuno rilevato; il diff richiede la revisione prevista dal piano.
Esito della revisione e autore, se avvenuta: non eseguita
Prossimo incarico, non avviato: 03
```

## Cronologia

- 30 ottobre 2026: preparato il pacchetto operativo. Il piano non equivale a implementazione o verifica della futura landing. Per la verifica del sito di partenza consultare [STATUS](STATUS.md) e [proposta](LANDING_PAGE_PROPOSAL.md).
- Verifica della preparazione: 105 collegamenti locali in 21 documenti validi; sintassi, 20 test Node e build superati. Questi risultati non completano l'incarico 00: branch e tag della prova sono ancora da creare.
- 30 ottobre 2026 (compito 00): base salvata sul commit `31bf4867902916fbf0f4137e12a38a77674cccca`; creati branch `feat/landing-page` e tag `backup/pre-landing-2026-10-30`; controlli npm check (20 test OK), build OK, git diff --check OK (solo warning line ending preesistente). Checkpoint locale dei documenti preparatori su `feat/landing-page`.
- 30 ottobre 2026 (revisione compito 00): commit `538c1cb3d224b07d16345b19dadc53bdf326c2f6` approvato; nessuna modifica ai sorgenti del sito. Il file `.gl.txt`, generato dall'editor, resta fuori dal progetto e dai commit.
- 30 ottobre 2026 (compito 01): intestazioni terminali e contatto preparati per titoli `h2` con ID codificato in sicurezza, mantenendo `h1` come default; 22 test e build superati. Verifica visiva rinviata perché il browser condiviso non era accessibile dalla sessione secondaria.
- 30 ottobre 2026 (revisione compito 01): approvata da Codex dopo diagnostica e verifica browser di Profilo/Collaborazioni a 1280 e 390 px; nessun overflow, un solo `h1` e modulo contatti visibile.
- 30 ottobre 2026 (compito 02): sostituiti tab, pannello variabile e frecce dell'Approccio con cinque blocchi leggibili in sequenza; conservati contenuti e documenti separati. Superati 22 test, build, diff e verifica Edge a 1280/390 px.
- 30 ottobre 2026 (revisione compito 02): approvata da Codex dopo diagnostica, controlli npm e verifica nel browser condiviso; presenti cinque articoli e un solo `h1`, assenti tab e frecce, nessun overflow rilevato a 1280/390 px.
