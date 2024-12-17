document.addEventListener('DOMContentLoaded', function () {
    class BackgroundSlider {
        constructor(mainElement, leftButton, rightButton, images) {
            this.mainElement = mainElement;
            this.leftButton = leftButton;
            this.rightButton = rightButton;
            this.images = images;
            this.count = 0;

            this.init();
        }

        init() {
            this.updateBackground();
            this.leftButton.addEventListener('click', () => this.handleLeftClick());
            this.rightButton.addEventListener('click', () => this.handleRightClick());
        }

        updateBackground() {
            this.mainElement.style.background = `url(${this.images[this.count]}) no-repeat center center/cover`;
        }

        handleLeftClick() {
            this.count = (this.count - 1 + this.images.length) % this.images.length;
            this.updateBackground();
        }

        handleRightClick() {
            this.count = (this.count + 1) % this.images.length;
            this.updateBackground();
        }
    }

    class MapInitializer {
        constructor(mapId, center, zoom, placemarkContent) {
            this.mapId = mapId;
            this.center = center;
            this.zoom = zoom;
            this.placemarkContent = placemarkContent;
        }

        init() {
            ymaps.ready(() => this.createMap());
        }

        createMap() {
            const map = new ymaps.Map(this.mapId, {
                center: this.center,
                zoom: this.zoom,
            });

            const placemark = new ymaps.Placemark(this.center, {
                content: this.placemarkContent,
            });

            map.geoObjects.add(placemark);
        }
    }

    const url_image = [
        './index/image/tokio_noch.jpg',
        './index/image/jij.png',
        './index/image/Rainbow.jpg',
        './index/image/Building-Japan-Wallpaper.png',
        './index/image/fon.png',
        './index/image/fonstola.jpg',
        './index/image/fonstola.ru_167395.jpg',
        './index/image/tokyo-goroda.jpg',
    ];

    const main = document.getElementById('main');
    const left = document.getElementById("left");
    const right = document.getElementById("right");

    const slider = new BackgroundSlider(main, left, right, url_image);

    const mapInitializer = new MapInitializer(
        "YMapsID",
        [35.688366, 139.753915],
        7,
        'Токио'
    );

    mapInitializer.init();
});