import { person, mailto, services } from './data.mjs';
import { escapeHTML } from './explorer/core.mjs';
let subject = '', message = '';

// Email templates for different use cases
const emailTemplates = {
  general: {
    subject: 'Richiedo informazioni sui tuoi servizi',
    message: `Ciao Edoardo,

mi chiamo [NOME] e lavoro per [AZIENDA/SETTORE].

Ho trovato il tuo portfolio e vorrei capire se puoi aiutarmi con [DESCRIVI BREVEMENTE IL PROBLEMA O L'OBIETTIVO].

In particolare:
- Quali servizi offri in quest'ambito?
- Hai esperienza con [TECNOLOGIE SPECIFICHE]?
- Quali sono i tuoi tempi e tariffe?

Grazie,
[NOME]`
  },
  database: {
    subject: 'Supporto gestione database',
    message: `Ciao Edoardo,

ho bisogno di supporto per [Oracle/PostgreSQL/MySQL/MariaDB] in particolare per:
- [ ] Monitoraggio e manutenzione
- [ ] Ottimizzazione query
- [ ] Backup e ripristino
- [ ] Migrazione dati
- [ ] Altro: [SPECIFICA]

Contesto: [DESCRIVI BREVEMENTE L'AMBIENTE]

Tempi: [URGENTE/ENTRO X SETTIMANE/FLESSIBILE]

Grazie,
[NOME]`
  },
  infrastructure: {
    subject: 'Configurazione infrastruttura Linux',
    message: `Ciao Edoardo,

ho bisogno di supporto per la configurazione di:
- [ ] Server Linux (Debian)
- [ ] Proxmox VE
- [ ] Monitoraggio (checkmk)
- [ ] Storage S3-compatibile
- [ ] Altro: [SPECIFICA]

Numero di server/macchine: [ ]
Remoto o on-site: [ ]

Tempi: [URGENTE/ENTRO X SETTIMANE/FLESSIBILE]

Grazie,
[NOME]`
  },
  dashboard: {
    subject: 'Sviluppo dashboard interattiva',
    message: `Ciao Edoardo,

vorrei sviluppare una dashboard per visualizzare:
- [ ] Dati aziendali (specifica fonte: [ ])
- [ ] Metriche di performance
- [ ] Analisi di mercato
- [ ] Altro: [SPECIFICA]

Formato dati: [CSV/API/Database/Altro]
Frequenza aggiornamento: [ ]
Utenti finali: [ ]

Tecnologie preferite: [ ]

Grazie,
[NOME]`
  }
};

// Pre-filled subject based on services
const serviceSubjects = services.offerings.reduce((acc, s) => {
  acc[s.id] = `Richiedo informazioni: ${s.title}`;
  return acc;
}, {});

const serviceMessages = services.offerings.reduce((acc, s) => {
  acc[s.id] = `Ciao Edoardo,

mi interessa il servizio "${s.title}" che offri.

Contesto: [DESCRIVI BREVEMENTE]

Domande specifiche:
- [ ]
- [ ]
- [ ]

Tempi e budget: [ ]

Grazie,
[NOME]`;
  return acc;
}, {});
export function contactHTML({ headingLevel = 1, titleId, showReadme = true } = {}) {
  const headingTag = headingLevel === 2 ? 'h2' : 'h1';
  const headingId = titleId == null ? '' : ` id="${escapeHTML(titleId)}"`;
  const templateButtons = showReadme ? `
    <div class="email-templates" aria-label="Modelli di email predefiniti">
      <p class="template-label"><b>~/contatti</b>$ <strong>mail --template</strong></p>
      <div class="template-buttons">
        <button type="button" class="template-btn" data-template="general">Generale</button>
        <button type="button" class="template-btn" data-template="database">Database</button>
        <button type="button" class="template-btn" data-template="infrastructure">Infrastruttura</button>
        <button type="button" class="template-btn" data-template="dashboard">Dashboard</button>
        <button type="button" class="template-btn dropdown-toggle" aria-expanded="false" aria-controls="service-templates">Servizi <span aria-hidden="true">v</span></button>
        <div id="service-templates" class="service-templates-dropdown" hidden>
          ${services.offerings.map(s => `<button type="button" class="template-btn" data-template="service-${s.id}">${s.title}</button>`).join('')}
        </div>
      </div>
    </div>
  ` : '';
  
  return `<div class="terminal-heading contact-composer"><${headingTag} class="visually-hidden"${headingId}>Componi una email</${headingTag}>
  ${showReadme ? `<p class="readme-command"><b>~/contatti</b>$ <strong>cat readme.md</strong></p><div class="readme-output"><dl class="readme-sections"><div><dt>generale/</dt><dd>Scrivimi per parlare di un problema tecnico o di una collaborazione.</dd></div><div><dt>contatti/</dt><dd><a href="mailto:${person.email}">${person.email}</a> · <a href="${person.github}" target="_blank" rel="noopener">github.com/edoardorana</a></dd></div></dl></div>` : `<div class="contact-links"><a href="mailto:${person.email}">${person.email}</a><a href="${person.github}" target="_blank" rel="noopener">GitHub ↗</a></div>`}
  ${templateButtons}
  <p class="readme-command mail-command"><b>~/contatti</b>$ <strong>mail --new</strong></p>
  <form id="contact-form"><div class="mail-subject"><label for="subject">oggetto:</label><input id="subject" name="subject" maxlength="160" required placeholder="Di cosa parliamo?" value="${escapeHTML(subject)}"></div>
  <label for="message">messaggio:</label><textarea id="message" name="message" rows="5" maxlength="4000" required placeholder="Scrivi qui il tuo messaggio…" aria-describedby="mail-help">${escapeHTML(message)}</textarea>
  <p class="form-note" id="mail-help">Invio nell’oggetto passa al messaggio. Ctrl/⌘ + Invio prepara la bozza.</p>
  <div class="mail-actions"><button class="button" type="submit">Prepara bozza ↗</button><p class="form-note">Si apre il tuo programma di posta, da cui potrai inviarla.</p></div>
  <p id="contact-status" role="status"></p></form></div>`;
}
export function bindContact(root) {
  const $ = s => root.querySelector(s), form = $('#contact-form');
  const subjectEl = $('#subject'), messageEl = $('#message');
  const statusEl = $('#contact-status');
  const templateDropdown = $('#service-templates');
  const dropdownToggle = root.querySelector('.dropdown-toggle');
  
  // Update global state on input
  subjectEl.oninput = e => { subject = e.target.value; statusEl.textContent=''; };
  subjectEl.onkeydown = e => { if(e.key==='Enter') { e.preventDefault(); messageEl.focus(); } };
  messageEl.oninput = e => { message=e.target.value; statusEl.textContent=''; };
  messageEl.onkeydown = e => { if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)) { e.preventDefault(); form.requestSubmit(); } };
  
  // Apply template
  function applyTemplate(templateName) {
    const parts = templateName.split('-');
    const isService = parts[0] === 'service' && parts.length > 1;
    
    let template;
    if (isService) {
      const serviceId = parts.slice(1).join('-');
      template = {
        subject: serviceSubjects[serviceId] || emailTemplates.general.subject,
        message: serviceMessages[serviceId] || emailTemplates.general.message
      };
    } else {
      template = emailTemplates[templateName] || emailTemplates.general;
    }
    
    subjectEl.value = template.subject;
    messageEl.value = template.message;
    subject = template.subject;
    message = template.message;
    statusEl.textContent = `Template "${templateName}" applicato. Personalizza il testo.`;
    
    // Close dropdown if open
    if (templateDropdown && !templateDropdown.hidden) {
      templateDropdown.hidden = true;
      if (dropdownToggle) {
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    }
    
    subjectEl.focus();
  }
  
  // Bind template buttons
  root.querySelectorAll('.template-btn').forEach(btn => {
    btn.addEventListener('click', () => applyTemplate(btn.dataset.template));
  });
  
  // Dropdown toggle
  if (dropdownToggle && templateDropdown) {
    dropdownToggle.addEventListener('click', () => {
      const isOpen = templateDropdown.hidden;
      templateDropdown.hidden = !isOpen;
      dropdownToggle.setAttribute('aria-expanded', String(!isOpen));
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('pointerdown', (e) => {
      if (!templateDropdown.hidden && !templateDropdown.contains(e.target) && !dropdownToggle.contains(e.target)) {
        templateDropdown.hidden = true;
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // Form submit
  form.onsubmit = e => { 
    e.preventDefault(); 
    if(!subject.trim()||!message.trim()) { 
      statusEl.textContent='Compila oggetto e messaggio.'; 
      return; 
    } 
    location.href=mailto(subject.trim(), message); 
    statusEl.textContent='Bozza preparata. Se il programma di posta non si apre, usa l’indirizzo email qui sopra.'; 
  };
}
