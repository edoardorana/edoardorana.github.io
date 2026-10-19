# Aprire il portfolio in Visual Studio Code

Questa guida prepara il progetto sul tuo computer. Le configurazioni sono già nel repository; installazioni, accesso GitHub e accesso AI vanno completati sul PC. Non sono stati eseguiti a distanza.

## 1. Prerequisiti

Installa Visual Studio Code, Git e Node.js (versione 22 o superiore, preferibilmente una LTS supportata) dai rispettivi siti ufficiali:

- https://code.visualstudio.com/
- https://git-scm.com/downloads
- https://nodejs.org/en/download

Apri un nuovo terminale PowerShell dopo l'installazione e controlla:

```powershell
git --version
node --version
npm.cmd --version
code --version
```

Se `code` non viene riconosciuto, usa File → Apri cartella in VS Code. Non serve modificare l'ExecutionPolicy di PowerShell: se `npm` viene bloccato, usa `npm.cmd`.

## 2. Clona il repository

Esegui i comandi dalla cartella in cui tieni i progetti. Se hai già un clone, passa alla sezione successiva.

```powershell
git clone https://github.com/edoardorana/edoardorana.github.io.git
cd edoardorana.github.io
code portfolio.code-workspace
```

Alternativa visuale: `Ctrl+Shift+P` → `Git: Clone`, inserisci l'URL, apri la cartella e poi `portfolio.code-workspace`.

Se il repository è già sul computer, aprilo e controlla prima eventuali modifiche locali:

```powershell
git status
git fetch origin
git switch main
git pull --ff-only
```

Non forzare checkout o reset per eliminare modifiche locali. Per push e pull request, accedi al tuo account GitHub quando VS Code lo richiede. Il clone di un repository pubblico normalmente non richiede login.

## 3. Avvia e controlla

Non ci sono pacchetti da installare. Dal terminale integrato nella radice del repository:

```powershell
npm.cmd run dev
```

Apri `http://127.0.0.1:4173`. Aggiorna il browser dopo aver salvato un file. Ferma il server con `Ctrl+C`.

Oppure seleziona **Portfolio: avvia e apri nel browser** in Esegui e debug e premi F5: il server si avvia e VS Code apre il browser predefinito. Non avviare due server contemporaneamente sulla stessa porta.

```powershell
npm.cmd run check
npm.cmd run build
```

`build` genera `dist/`; la cartella viene esclusa da Git. Modifica sempre `proposal/`. I comandi funzionano anche come `npm` su macOS/Linux.

## 4. Codex nell'editor

Apri Estensioni e installa l'estensione ufficiale Codex di OpenAI. È inclusa fra le estensioni consigliate del workspace, insieme a GitHub Pull Requests and Issues. Completa il login richiesto dall'estensione con il tuo account.

Apri la barra laterale Codex; se non è visibile, nella palette cerca `Codex: Open Codex Sidebar`. Apri il repository e parti con questo messaggio:

> Leggi AGENTS.md, docs/PROJECT_CONTEXT.md e docs/STATUS.md. Riassumi lo stato del portfolio, controlla il branch e proponi il prossimo piccolo miglioramento. Mantieni la navigazione a mappa. Prima di modificare i file, verifica che non ci siano modifiche locali da preservare.

La configurazione passa all'assistente codice, istruzioni e stato del progetto. Non importa automaticamente tutte le chat del progetto ChatGPT. I file AGENTS/CONTEXT/STATUS sono il riferimento portabile; aggiornarli evita di dipendere dalla memoria di un solo strumento.

## 5. Altre AI, quando servono

Nelle versioni di VS Code che espongono la funzione, apri la palette e cerca `Chat: Manage Language Models` → `Add Models`. Scegli un provider disponibile (per esempio Anthropic o Gemini) e segui la richiesta di API key. Modelli e disponibilità dipendono da versione, account e policy. Se il comando non appare, verifica aggiornamenti e documentazione della tua installazione.

Questa è la configurazione della chat di VS Code, distinta dalla barra laterale dell'estensione Codex. Selezionare un provider lì non cambia il modello di Codex.

Usa il campo credenziali previsto dal provider nell'editor. Non inserire chiavi in `proposal/`, nel repository, nei prompt di progetto o in chat. Non sono state create chiavi né attivati account o consumi API in questa configurazione. Verifica la fatturazione del provider prima dell'uso.

Un flusso semplice: un assistente implementa una modifica; un secondo legge il diff e cerca problemi di leggibilità, accessibilità e navigazione senza cambiare i file. Poi riesamini e decidi cosa integrare. Il contesto deve essere lo stesso; per strumenti che non leggono automaticamente i file di istruzioni, allegali esplicitamente.

## 6. Riprendere il lavoro e salvare

Prima di iniziare: `git status`, poi `git pull --ff-only` con working tree pulito. Dopo una modifica: controlli, prova in browser, revisione del diff, commit e push.

```powershell
npm.cmd run check
npm.cmd run build
git diff
```

Usa il pannello Controllo codice sorgente per selezionare esattamente i file da includere e poi crea un commit. Non usare stage indiscriminato se nel progetto hai aggiunto documenti privati. Fai push del branch di lavoro, apri una pull request verso `main` e integra solo dopo i controlli. Il workflow pubblica GitHub Pages dai push su `main`.

La preview Sites si aggiorna separatamente, su richiesta dalla conversazione. Il push GitHub non aggiorna quella preview.

## Verifica manuale consigliata

- Apri ogni area; usa Indietro, Avanti e refresh su un link di progetto.
- Verifica 320, 390, 768 e 1440 px; nessun testo tagliato o scorrimento orizzontale.
- Usa Tab/Invio; prova le frecce nelle fasi dell'approccio e Escape nell'indice.
- Prova movimento ridotto e JavaScript disattivato (rimangono CV e email).
- Cambia luogo nella mappa europea locale e verifica che testo, punto e selezione restino sincronizzati.
- Prepara una email senza inviarla; verifica indirizzo e testo nel client.

## Riferimenti ufficiali verificati l'11 ottobre 2026

- Codex IDE: https://learn.chatgpt.com/docs/codex/ide
- GitHub in VS Code: https://code.visualstudio.com/docs/sourcecontrol/github
- Modelli/API key: https://code.visualstudio.com/docs/agent-customization/language-models
- Debug: https://code.visualstudio.com/docs/debugtest/debugging-configuration
