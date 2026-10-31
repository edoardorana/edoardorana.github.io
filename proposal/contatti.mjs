import { contactHTML, bindContact } from './contact.mjs';

const root = document.querySelector('#contact-root');
root.innerHTML = contactHTML({ headingLevel: 2, titleId: 'contact-form-title', showReadme: false });
bindContact(root);
