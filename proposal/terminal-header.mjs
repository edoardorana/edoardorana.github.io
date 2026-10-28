const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[character]));

const outputId = path => `readme-${path.replace(/^~\//, '').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'home'}`;

export function terminalHeader({ path, title, summary }) {
  const id = outputId(path);
  return `<header class="terminal-heading"><h1 class="visually-hidden">${escapeHTML(title)}</h1><button class="readme-command" type="button" aria-expanded="false" aria-controls="${id}"><span>edo@debian</span>:<b>${escapeHTML(path)}</b>$ <strong>cat readme.md</strong></button><p class="readme-output" id="${id}" hidden>${escapeHTML(summary)}</p></header>`;
}

export function bindTerminalHeaders(container) {
  for (const button of container.querySelectorAll('.readme-command')) {
    button.addEventListener('click', () => {
      const output = container.querySelector(`#${button.getAttribute('aria-controls')}`);
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      output.hidden = expanded;
    });
  }
}
