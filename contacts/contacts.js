window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
      document.body.classList.add('loaded');
      document.body.classList.remove('loaded_hiding');
    }, 500);
  }
document.getElementById('burger-icon').addEventListener('click', function() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('active');
});

document.getElementById('close-icon').addEventListener('click', function() {
  const menu = document.getElementById('menu');
  menu.classList.remove('active');
  });
let modal  = document.getElementById('modal')
let form = document.getElementById('modalWindows')
modal.onclick = function(){
      form.style.display ='flex'
      console.log('ds');
  }

let closeModal = document.getElementById('close')
closeModal.onclick = function(){
    form.style.display ='none'
    console.log('dsadsadas');
    
}
let send = document.getElementById('send')
send.onclick = function(){
  alert("Отправлено")
  form.style.display ='none'
}