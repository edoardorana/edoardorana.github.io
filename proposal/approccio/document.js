const resize = field => { field.style.height = 'auto'; field.style.height = Math.max(65,field.scrollHeight) + 'px'; };
document.querySelectorAll('textarea').forEach(field => field.addEventListener('input',()=>resize(field)));
document.querySelector('#print').addEventListener('click',()=>{document.querySelectorAll('textarea').forEach(resize);window.print();});
