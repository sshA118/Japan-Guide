let input = document.getElementById('input')
function button (){
    button_sudmit.addEventListener("click",() =>{
        if(button_sudmit != 0 && input.value != ''){
            document.getElementById('button_sudmit').innerText = 'Отправлено!';
        }
    })
}
function buttonrev (){ 
    if(button_sudmit != 0 && input.value != ''){
        document.getElementById('button_sudmit').innerText = 'Подписаться';  
    }
}
button()
setInterval(buttonrev,4000)

document.getElementById('burger-icon').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
});
document.getElementById('close-icon').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    menu.classList.remove('active');
});

window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
      document.body.classList.add('loaded');
      document.body.classList.remove('loaded_hiding');
    },500);
}