document.addEventListener('DOMContentLoaded', function() {
let modal  = document.getElementById('modal')
let form = document.getElementById('modalWindows')
const input_value = document.querySelectorAll('.input_value')
let modalError = document.getElementById('.error')
modal.onclick = function(){
      form.style.display ='flex'
  }
const closeModal = document.getElementById('close')
closeModal.onclick = function(){
  form.style.display ='none'
}  
let send = document.getElementById('send')
send.onclick = function(){
  form.style.display ='none'
  
}

ymaps.ready(function () { 
  let Map = new ymaps.Map("YMapsID", {
      center: [35.782081, 139.898528],
      zoom: 13,
  });
  let myPlacemark = new ymaps.Placemark([35.782081, 139.898528], {
     content: 'Токио',
  });

  Map.geoObjects.add(myPlacemark);
});
});