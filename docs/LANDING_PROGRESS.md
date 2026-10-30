# Registro landing

Preparazione del piano completata il 30 ottobre 2026. Compito 00 eseguito: base salvata; nessuna implementazione della landing.

- Direzione: quattro sezioni nella landing; CV, dashboard, NetBox e documenti Approccio separati.
- Base osservata durante la preparazione: `main`, `31bf4867902916fbf0f4137e12a38a77674cccca`.
- Branch della prova: `feat/landing-page`, creato nel compito 00 sul commit base `31bf4867902916fbf0f4137e12a38a77674cccca`.
- Tag della base: `backup/pre-landing-2026-10-30`, creato nel compito 00 sul commit base `31bf4867902916fbf0f4137e12a38a77674cccca`.
- Incarico **03** eseguito e revisionato. Il router usa ancora le viste autonome; prossimo incarico autorizzato: **04**. Un solo scrittore alla volta.
- I documenti di pianificazione e le istruzioni condivise sono modifiche locali preparatorie, da preservare e registrare nel compito 00. Nessuna modifica al sito è stata effettuata per scrivere il piano.

| ID | Esecuzione | Revisione | Commit / evidenza |
| --- | --- | --- | --- |
| 00 | Eseguito | Approvata da Codex · 30 ottobre 2026 | commit `538c1cb3d224b07d16345b19dadc53bdf326c2f6`; base `31bf4867902916fbf0f4137e12a38a77674cccca`; tag `backup/pre-landing-2026-10-30` |
| 01 | Eseguito | Approvata da Codex · 30 ottobre 2026 | 22 test, build, diagnostica e browser 1280/390 px superati; checkpoint sul branch `feat/landing-page` |
| 02 | Eseguito | Approvata da Codex · 30 ottobre 2026 | 22 test, build, diagnostica e browser 1280/390 px superati; cinque fasi sequenziali e schede separate |
| 03 | Eseguito | Approvata da Codex · 30 ottobre 2026 | 22 test, build e diagnostica superati; composizione e binding preparati, non ancora attivati |
| 04 | Da iniziare | Non eseguita | — |
| 05 | Da iniziare | Non eseguita | — |
| 06 | Da iniziare | Non eseguita | — |
| 07 | Da iniziare | Non eseguita | — |
| 08 | Da iniziare | Non eseguita | — |

## Consegna più recente

Compilare dopo ogni incarico, sostituendo questo blocco con il resoconto corrente. Conservare in basso una breve cronologia degli incarichi conclusi.

```text
Incarico: 03 — Preparare la composizione della landing
Assistente / sessione, se noto: Codex, sessione secondaria task03_composition
Branch e commit di partenza: feat/landing-page @ 1b6d55e
Modifiche preesistenti: `.gl.txt` non tracciato, preservato e non modificato
File modificati: proposal/script.js per aggiungere la modalità `embedded`, comporre `landing()` e condividere i binding di Profilo/Contatti; proposal/style.css per conservare l'aspetto dei titoli h3/h4 nella gerarchia composta; registro e STATUS per la consegna
Helper introdotti: `home({ embedded = false })`, `profile({ embedded = false })`, `projectList({ embedded = false })`, `approach({ embedded = false })`, `contact({ embedded = false })`, `landing()`, `setPlace(root, key, { embedded = false })`, `bindProfile(root, { embedded = false })`, `bindLanding(root = main)`
Comandi eseguiti ed esiti: npm.cmd run check (22 test, 0 fail); npm.cmd run build (Build ready: dist/); git diff --check superato
Prove browser: non eseguite nella sessione secondaria; il router non monta ancora `landing()` come richiesto dalla scheda.
Verifiche mancanti: markup composto ispezionato nel codice, ma prova DOM effettiva rinviata all'incarico 05; il browser condiviso non è accessibile da questa sessione, nessun dispositivo fisico, Safari o Firefox.
Problemi / decisioni aperte: nessuno rilevato; il diff richiede la revisione prevista dal piano.
Esito della revisione e autore, se avvenuta: non eseguita
Prossimo incarico, non avviato: 04
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
- 30 ottobre 2026 (compito 03): preparati renderer incorporabili, gerarchia h1/h2/h3/h4, composizione `landing()` e binding condivisi senza attivare il router; 22 test, build e diff superati. La prova DOM della composizione resta assegnata al compito 05.
- 30 ottobre 2026 (revisione compito 03): approvata da Codex dopo ispezione del diff, diagnostica e ripetizione di check/build; confermati quattro ID di sezione, titoli contestuali e assenza di navigazione precedente/successiva nel markup incorporato. Il router resta invariato come previsto.
