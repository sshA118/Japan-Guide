document.addEventListener('DOMContentLoaded', function() {
    let legal = localStorage.getItem('id');
    let urlMoc = 'https://672a07666d5fa4901b6f7076.mockapi.io/card/';
    let blockText = document.querySelector('h3');
    let request = new XMLHttpRequest();
    let img1 = document.querySelector('.block__img__1')
    let img2 = document.querySelector('.block__img__2')
    let img3 = document.querySelector('.block__img__3')
    const pText  = document.querySelector('.block__text-p')
    request.open("GET", urlMoc);
    request.responseType = "json";
    request.onload = function() {
        if (request.status === 200) {
            let jsin = request.response;
            blockText.textContent = jsin[legal].title;
            img1.src= jsin[legal].image1
            img2.src = jsin[legal].image2
            img3.src = jsin[legal].image3
            
            
            pText.textContent = jsin[legal].detail
            localStorage.setItem('map', jsin[legal].maps);
            initMap();
        } else {
            console.error('Ошибка загрузки данных:', request.statusText);
        }
    };
    request.onerror = function() {
        console.error('Ошибка запроса');
    };
    request.send();
});
let text_p = document.getElementById('text__P').onclick = textPshow;
let text_block = document.querySelector('.block__text__text')
function textPshow(){
      
}



function initMap() {
    let map = localStorage.getItem('map');

    ymaps.ready(function () {
        let Map = new ymaps.Map("YMapsID", {
            center: JSON.parse(map),
            zoom: 11,
        });
        let myPlacemark = new ymaps.Placemark(JSON.parse(map), {
            content: 'Токио',
        });
        Map.geoObjects.add(myPlacemark);
    });
}
