import { person, mailto } from './data.mjs';
import { escapeHTML } from './explorer/core.mjs';
let subject = '', message = '';
export function contactHTML() {
  return `<div class="terminal-heading"><h1 class="visually-hidden">Collaborazioni</h1>
  <p class="readme-command"><b>~/contatti</b>$ <strong>cat readme.md</strong></p>
  <p>Per parlare di un problema tecnico o di una collaborazione, scrivimi.</p>
  <dl class="contact-links"><dt>email</dt><dd><a href="mailto:${person.email}">${person.email}</a></dd><dt>github</dt><dd><a href="${person.github}" target="_blank" rel="noopener">github.com/edoardorana</a></dd></dl>
  <button type="button" id="mail-start" class="terminal-start"><b>~/contatti</b>$ <strong>mail --new</strong> <span class="wait-cursor" aria-hidden="true">▋</span></button>
  <form id="contact-form" hidden><label for="subject">oggetto: <span class="wait-cursor" aria-hidden="true">▋</span></label><input id="subject" maxlength="160" required placeholder=" " value="${escapeHTML(subject)}">
  <div id="mail-body" hidden><label for="message">messaggio: <span class="wait-cursor" aria-hidden="true">▋</span></label><textarea id="message" rows="6" maxlength="4000" required placeholder=" ">${escapeHTML(message)}</textarea>
  <p class="form-note">Invio sull’oggetto apre il messaggio. Nel messaggio: Invio va a capo, Ctrl+Invio prepara la bozza.</p><button type="submit">Prepara bozza ↗</button></div></form>
  <p id="contact-status" role="status"></p><p class="form-note">Si apre il tuo programma di posta: l’invio avviene da lì. Se non si apre, copia l’indirizzo e il testo.</p><button id="copy-email" type="button">Copia email</button></div>`;
}
export function bindContact(root) {
  const $ = s => root.querySelector(s), form = $('#contact-form');
  $('#mail-start').onclick = () => { form.hidden = false; $('#subject').focus(); };
  $('#subject').oninput = e => { subject = e.target.value; };
  $('#subject').onkeydown = e => { if(e.key==='Enter') { e.preventDefault(); $('#mail-body').hidden=false; $('#message').focus(); } };
  $('#subject').onchange = () => { $('#mail-body').hidden=false; };
  $('#message').oninput = e => { message=e.target.value; };
  $('#message').onkeydown = e => { if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)) { e.preventDefault(); form.requestSubmit(); } };
  form.onsubmit = e => { e.preventDefault(); if(!subject.trim()||!message.trim()) { $('#contact-status').textContent='Compila oggetto e messaggio.'; return; } location.href=mailto(subject.trim(),message); $('#contact-status').innerHTML='bozza preparata<br><b>~/contatti</b>$ <span class="wait-cursor" aria-hidden="true">▋</span>'; };
  $('#copy-email').onclick = async () => { try { await navigator.clipboard.writeText(person.email); $('#contact-status').textContent='Indirizzo copiato.'; } catch { $('#contact-status').textContent='Copia questo indirizzo: '+person.email; } };
}
