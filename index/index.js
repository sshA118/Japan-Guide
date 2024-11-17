window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
      document.body.classList.add('loaded');
      document.body.classList.remove('loaded_hiding');
    },500);
}
/////////////////////////////////////////////////////SLAIDER
let url2 = ['0',
            './index/image/jij.png',
            './index/image/Rainbow.jpg',
            './index/image/Building-Japan-Wallpaper.png',
            './index/image/fon.png',
            './index/image/fonstola.jpg',
            './index/image/fonstola.ru_167395.jpg',
            './index/image/tokio_noch.jpg',
            './index/image/tokyo-goroda.jpg',
        ]
let btn = document.getElementById('btn')
let btn1 = document.getElementById('btn1')
let main = document.getElementById('main')
let math = 0
function per (click){
btn.addEventListener("click",() =>{
        if(btn = 1){    
            let i = 0;
            while (i < 1){
                math = Math.floor((Math.random() * 7) + 1);
                i++;
                main.style.background = `url(${url2[math]})no-repeat center center / cover`      
                console.log('levo');
                console.log(url2[math]);
}
        }
    })  
btn1.addEventListener("click",() =>{
        if(btn1 = 1){
            let i = 0;
            while (i < 1){
                math = Math.floor((Math.random() * 5) + 1);
                i++;
                console.log(math);
                main.style.background = `url(${url2[math]})no-repeat center center / cover`
                console.log('pravo');
                console.log(url2[math]); 

            }
        }
    })  
}
per()
document.getElementById('burger-icon').addEventListener('click', function() {
        const menu = document.getElementById('menu');
        menu.classList.toggle('active');
});
document.getElementById('close-icon').addEventListener('click', function() {
        const menu = document.getElementById('menu');
        menu.classList.remove('active');
});

///////////////////////////////////////////КНОПКА /ПОДПИСАТЬСЯ///////////////////////////////////////////
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

ymaps.ready(function () { 
    let Map = new ymaps.Map("YMapsID", {
        center: [35.688366, 139.753915],
        zoom: 7,
    });
    let myPlacemark = new ymaps.Placemark([35.688366, 139.753915], {
       content: 'Токио',
    });
    let myPlacemarkk = new ymaps.Placemark([35.526344, 140.086820], {
        content: 'Токио',
     });
    Map.geoObjects.add(myPlacemark);
});
function pustto(){
    
}