import { person, mailto } from './data.mjs';
import { escapeHTML } from './explorer/core.mjs';
let subject = '', message = '';
export function contactHTML() {
  return `<div class="terminal-heading"><h1 class="visually-hidden">Collaborazioni</h1>
  <p class="readme-command"><b>~/contatti</b>$ <strong>cat readme.md</strong></p>
  <div class="readme-output"><dl class="readme-sections"><div><dt>generale/</dt><dd>Scrivimi per parlare di un problema tecnico o di una collaborazione.</dd></div><div><dt>contatti/</dt><dd><a href="mailto:${person.email}">${person.email}</a> · <a href="${person.github}" target="_blank" rel="noopener">github.com/edoardorana</a></dd></div></dl></div>
  <p class="readme-command mail-command"><b>~/contatti</b>$ <strong>mail --new</strong></p>
  <form id="contact-form"><label for="subject"><b>~/contatti</b>$ oggetto:</label><input id="subject" maxlength="160" required placeholder=" " value="${escapeHTML(subject)}">
  <div id="mail-body"><label for="message"><b>~/contatti</b>$ messaggio:</label><textarea id="message" rows="6" maxlength="4000" required placeholder=" ">${escapeHTML(message)}</textarea>
  <p class="form-note">Invio sull’oggetto apre il messaggio. Nel messaggio: Invio va a capo, Ctrl+Invio prepara la bozza.</p><button type="submit">Prepara bozza ↗</button></div></form>
  <p id="contact-status" role="status"></p><p class="form-note">Si apre il tuo programma di posta: l’invio avviene da lì.</p></div>`;
}
export function bindContact(root) {
  const $ = s => root.querySelector(s), form = $('#contact-form');
  $('#subject').oninput = e => { subject = e.target.value; };
  $('#subject').onkeydown = e => { if(e.key==='Enter') { e.preventDefault(); $('#message').focus(); } };
  $('#message').oninput = e => { message=e.target.value; };
  $('#message').onkeydown = e => { if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)) { e.preventDefault(); form.requestSubmit(); } };
  form.onsubmit = e => { e.preventDefault(); if(!subject.trim()||!message.trim()) { $('#contact-status').textContent='Compila oggetto e messaggio.'; return; } location.href=mailto(subject.trim(),message); $('#contact-status').innerHTML='bozza preparata<br><b>~/contatti</b>$'; };
}
