const dialog=document.querySelector('#image-dialog');
const image=document.querySelector('#dialog-image');
const caption=document.querySelector('#dialog-caption');
let opener;
document.querySelectorAll('[data-zoom]').forEach(button=>button.addEventListener('click',()=>{
  opener=button;
  image.src=button.dataset.zoom;
  image.alt=button.querySelector('img').alt;
  caption.textContent=button.dataset.caption;
  dialog.showModal();
}));
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
dialog.addEventListener('close',()=>opener?.focus({preventScroll:true}));
