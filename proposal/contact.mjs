import { person, mailto } from './data.mjs';
import { escapeHTML } from './explorer/core.mjs';
let subject = '', message = '';
export function contactHTML({ headingLevel = 1, titleId, showReadme = true } = {}) {
  const headingTag = headingLevel === 2 ? 'h2' : 'h1';
  const headingId = titleId == null ? '' : ` id="${escapeHTML(titleId)}"`;
  return `<div class="terminal-heading contact-composer"><${headingTag} class="visually-hidden"${headingId}>Componi una email</${headingTag}>
  ${showReadme ? `<p class="readme-command"><b>~/collaborazioni/contatti</b>$ <strong>cat readme.md</strong></p><div class="readme-output"><dl class="readme-sections"><div><dt>generale/</dt><dd>Scrivimi per parlare di un problema tecnico o di una collaborazione.</dd></div><div><dt>contatti/</dt><dd><a href="mailto:${person.email}">${person.email}</a> · <a href="${person.github}" target="_blank" rel="noopener">github.com/edoardorana</a></dd></div></dl></div>` : `<div class="contact-links"><a href="mailto:${person.email}">${person.email}</a><a href="${person.github}" target="_blank" rel="noopener">GitHub ↗</a></div>`}
  <p class="readme-command mail-command"><b>~/collaborazioni/contatti</b>$ <strong>mail --new</strong></p>
  <form id="contact-form"><div class="mail-subject"><label for="subject">oggetto:</label><input id="subject" name="subject" maxlength="160" required placeholder="Di cosa parliamo?" value="${escapeHTML(subject)}"></div>
  <label for="message">messaggio:</label><textarea id="message" name="message" rows="5" maxlength="4000" required placeholder="Scrivi qui il tuo messaggio…" aria-describedby="mail-help">${escapeHTML(message)}</textarea>
  <p class="form-note" id="mail-help">Invio nell’oggetto passa al messaggio. Ctrl/⌘ + Invio prepara la bozza.</p>
  <div class="mail-actions"><button class="button" type="submit">Prepara bozza ↗</button><p class="form-note">Si apre il tuo programma di posta, da cui potrai inviarla.</p></div>
  <p id="contact-status" role="status"></p></form></div>`;
}
export function bindContact(root) {
  const $ = s => root.querySelector(s), form = $('#contact-form');
  $('#subject').oninput = e => { subject = e.target.value; $('#contact-status').textContent=''; };
  $('#subject').onkeydown = e => { if(e.key==='Enter') { e.preventDefault(); $('#message').focus(); } };
  $('#message').oninput = e => { message=e.target.value; $('#contact-status').textContent=''; };
  $('#message').onkeydown = e => { if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)) { e.preventDefault(); form.requestSubmit(); } };
  form.onsubmit = e => { e.preventDefault(); if(!subject.trim()||!message.trim()) { $('#contact-status').textContent='Compila oggetto e messaggio.'; return; } location.href=mailto(subject.trim(),message); $('#contact-status').textContent='Bozza preparata. Se il programma di posta non si apre, usa l’indirizzo email qui sopra.'; };
}
