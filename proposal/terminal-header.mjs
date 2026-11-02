const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[character]));

const prompt = (path, command, className = 'readme-command') => `<span class="${className}"><b>${escapeHTML(path)}</b>$ <strong>${escapeHTML(command)}</strong></span>`;

export function terminalHeader({ path, title, summary, sections = [], details, action, headingLevel = 1, titleId }) {
  const headingTag = headingLevel === 2 ? 'h2' : 'h1';
  const headingId = titleId == null ? '' : ` id="${escapeHTML(titleId)}"`;
  const sectionList = sections.length ? `<dl class="readme-sections">${sections.map(section => `<div><dt>${escapeHTML(section.label)}</dt><dd>${escapeHTML(section.text)}</dd></div>`).join('')}</dl>` : '';
  const detailBlock = details ? `<div class="readme-more" id="${escapeHTML(details.id)}" hidden>${details.paragraphs.map(paragraph => `<p>${escapeHTML(paragraph)}</p>`).join('')}</div><button class="readme-toggle" type="button" aria-expanded="false" aria-controls="${escapeHTML(details.id)}" data-open-label="${escapeHTML(details.openLabel ?? '+ dettagli')}" data-close-label="${escapeHTML(details.closeLabel ?? '− riduci')}">${escapeHTML(details.openLabel ?? '+ dettagli')}</button>` : '';
  const actionLine = action ? `<a class="readme-action" href="${escapeHTML(action.href)}" target="_blank" rel="noopener" aria-label="${escapeHTML(action.label)}">${prompt(path, action.command, 'readme-action-command')}</a>` : '';
  return `<header class="terminal-heading"><${headingTag} class="visually-hidden"${headingId}>${escapeHTML(title)}</${headingTag}><p class="readme-command"><b>${escapeHTML(path)}</b>$ <strong>cat readme.md</strong></p><div class="readme-output"><p>${escapeHTML(summary)}</p>${sectionList}${detailBlock}${actionLine}</div></header>`;
}
