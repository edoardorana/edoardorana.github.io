const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[character]));

const prompt = (path, command, className = 'readme-command') => `<span class="${className}"><b>${escapeHTML(path)}</b>$ <strong>${escapeHTML(command)}</strong></span>`;

export function terminalHeader({ path, title, summary, sections = [], action }) {
  const sectionList = sections.length ? `<dl class="readme-sections">${sections.map(section => `<div><dt>${escapeHTML(section.label)}</dt><dd>${escapeHTML(section.text)}</dd></div>`).join('')}</dl>` : '';
  const actionLine = action ? `<a class="readme-action" href="${escapeHTML(action.href)}" target="_blank" rel="noopener" aria-label="${escapeHTML(action.label)}">${prompt(path, action.command, 'readme-action-command')}</a>` : '';
  return `<header class="terminal-heading"><h1 class="visually-hidden">${escapeHTML(title)}</h1><p class="readme-command"><b>${escapeHTML(path)}</b>$ <strong>cat readme.md</strong></p><div class="readme-output"><p>${escapeHTML(summary)}</p>${sectionList}${actionLine}</div></header>`;
}
