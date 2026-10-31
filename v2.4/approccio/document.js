const resize = field => { field.style.height = 'auto'; field.style.height = Math.max(65,field.scrollHeight) + 'px'; };
document.querySelectorAll('textarea').forEach(field => field.addEventListener('input',()=>resize(field)));
window.addEventListener('beforeprint',()=>document.querySelectorAll('textarea').forEach(resize));
document.querySelector('#print').addEventListener('click',()=>window.print());
