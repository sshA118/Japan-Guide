document.addEventListener('DOMContentLoaded', function() {
    const url_image = [
        './index/image/tokio_noch.jpg',
        './index/image/jij.png',
        './index/image/Rainbow.jpg',
        './index/image/Building-Japan-Wallpaper.png',
        './index/image/fon.png',
        './index/image/fonstola.jpg',
        './index/image/fonstola.ru_167395.jpg',
        './index/image/tokyo-goroda.jpg',
    ]
    const main = document.getElementById('main')
    const left = document.getElementById("left")
    const right = document.getElementById("right")
    let count = 0;
    function updateBackground() {
    main.style.background = `url(${url_image[count]}) no-repeat center center/cover`;
    }
    left.addEventListener('click', () => {
    count = (count - 1 + url_image.length) % url_image.length;
    updateBackground();
    });
    right.addEventListener('click', () => {
    count = (count + 1) % url_image.length;
    updateBackground();
    });
    updateBackground();


    
    ymaps.ready(function () { 
    let Map = new ymaps.Map("YMapsID", {
        center: [35.688366, 139.753915],
        zoom: 7,
    });
    let myPlacemark = new ymaps.Placemark([35.688366, 139.753915], {
       content: 'Токио',
    });
    Map.geoObjects.add(myPlacemark);
});
});