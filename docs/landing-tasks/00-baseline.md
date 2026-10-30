# 00 — Salvare la base e preparare la prova

**Dipendenze:** nessuna. Leggere il [piano comune](../LANDING_AI_PLAN.md) e il [registro](../LANDING_PROGRESS.md). Eseguire solo questo incarico.

## Obiettivo

Conservare la versione attuale prima di modificare il sito. Questo incarico non cambia HTML, CSS, JavaScript o dati.

## File consentiti

[Registro](../LANDING_PROGRESS.md) e [STATUS](../STATUS.md). I documenti del piano e le istruzioni già modificati possono essere inclusi nel checkpoint dopo averne verificato il diff; non riscriverli per questo incarico.

## Azioni

1. Eseguire `git status --short --branch`, `git rev-parse HEAD` e leggere il diff, inclusi i file nuovi. Il riferimento osservato preparando il piano era `31bf4867902916fbf0f4137e12a38a77674cccca`; verificarlo, non forzare un ritorno a quel commit.
2. Distinguere le modifiche preparatorie da eventuale lavoro aggiunto da Edoardo. Se esistono modifiche al sito non ancora registrate, conservarle e segnalare che il checkpoint deve includerle esplicitamente prima di proseguire.
3. Creare il branch locale `feat/landing-page` e il tag locale `backup/pre-landing-2026-10-30` sul commit di partenza verificato. Controllare prima se esistono: in una ripresa usarli soltanto se corrispondono alla prova; non sovrascrivere un tag o un branch esistente. Non fare pull o cambiare la base automaticamente.
4. Portare con sé le modifiche documentali preparatorie, senza cancellarle. Registrare nel registro branch, hash completo e tag realmente creati.
5. Eseguire `npm.cmd run check`, poi `npm.cmd run build` e `git diff --check`. Dopo revisione, creare un commit locale dei soli documenti preparatori verificati; nessun `git add .`.

I file preparatori attesi sono AGENTS, CLAUDE, GEMINI, README, istruzioni Copilot, contesto, stato, guida VS Code, proposta landing, piano AI, registro, schede in questa cartella e avviso storico nel vecchio piano. L'elenco non autorizza a includere altre modifiche trovate nello stesso file senza leggerle.

## Accettazione

Branch e tag sono verificabili con Git, il registro indica una base reale e il codice del sito non è cambiato. I controlli passano, oppure gli errori sono riportati fedelmente come problemi preesistenti. Non iniziare 01 finché questi problemi non sono risolti o valutati.

**Consegna:** resoconto del piano comune. Prossimo incarico: 01.
