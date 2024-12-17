    document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(document.location.search);
    const legal = urlParams.get('id');
    if (!legal) {
        console.error('ID не найден в URL');
        return;
    }

    const urlMoc = `https://672a07666d5fa4901b6f7076.mockapi.io/card/?id=${legal}`;

    const dataLoader = new DataLoader(urlMoc);
    const imageGallery = new ImageGallery();
    const modal = new Modal();
    // const mapManager = new MapManager();

    dataLoader.loadData()
        .then(data => {
            if (!data || !data.length) {
                console.error('Данные не найдены');
                return;
            }

            const item = data[0];


            imageGallery.displayImages(item);
            imageGallery.setupThumbnails(item);
            imageGallery.updateText(item.title, item.detail);

            // mapManager.saveMapData(item.maps);
            // mapManager.initMap();

            modal.init();
        })
        .catch(error => {
            console.error('Ошибка запроса детальной карточки:', error);
        });
        
        });
        class DataLoader {
        constructor(url) {
            this.url = url;
        }
    
        loadData() {
            return fetch(this.url)
                .then(response => response.json())
                .catch(error => {
                    console.error('Ошибка загрузки данных:', error);
                    throw error;
                });
        }
    }

    class ImageGallery {
        constructor() {
            this.blockText = document.querySelector('h3');
            this.img1 = document.querySelector('.block__img__1');
            this.img2 = document.querySelector('.block__img__2');
            this.img3 = document.querySelector('.block__img__3');
            this.img11 = document.querySelector('.block__img1');
            this.img22 = document.querySelector('.block__img2');
            this.img33 = document.querySelector('.block__img3');
            this.pText = document.querySelector('.block__text-p');
            this.thumbnails = document.querySelectorAll('.thumbnail');
        }

        displayImages(item) {
            this.img1.src = item.image1;
            this.img2.src = item.image2;
            this.img3.src = item.image3;
            this.img11.src = item.image1;
            this.img22.src = item.image2;
            this.img33.src = item.image3;
        }

        setupThumbnails(item) {
            this.thumbnails.forEach((thumbnail, index) => {
                thumbnail.setAttribute('data-full', item[`image${index + 1}`]);
            });
        }

        updateText(title, detail) {
            this.blockText.innerHTML = title;
            this.pText.innerHTML = detail;
        }
    }
    class Modal {
    constructor() {
        this.modal = document.getElementById('modal');
        this.fullImage = document.getElementById('fullImage');
        this.closeBtn = document.getElementById('close');
        this.prevBtn = document.getElementById('prev');
        this.nextBtn = document.getElementById('next');
        this.thumbnails = document.querySelectorAll('.thumbnail');
        this.currentIndex = 0;
    }

    init() {
        this.thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                this.openModal(thumbnail, index);
            });
        });

        this.closeBtn.addEventListener('click', () => {
            this.closeModal();
        });

        this.prevBtn.addEventListener('click', () => {
            this.showPrevImage();
        });

        this.nextBtn.addEventListener('click', () => {
            this.showNextImage();
        });

        this.modal.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                this.closeModal();
            }
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.modal.style.display === 'flex') {
                this.closeModal();
            }
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight' && this.modal.style.display === 'flex') {
                this.showNextImage();
            }
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft' && this.modal.style.display === 'flex') {
            this.showPrevImage();
            }
        });
    }

    openModal(thumbnail, index) {
        this.modal.style.display = 'flex';
        this.fullImage.src = thumbnail.getAttribute('data-full');
        this.currentIndex = index;
    }

    closeModal() {
        this.modal.style.display = 'none';
    }

    showPrevImage() {
        this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.thumbnails.length - 1;
        this.fullImage.src = this.thumbnails[this.currentIndex].getAttribute('data-full');
    }

    showNextImage() {
        this.currentIndex = (this.currentIndex < this.thumbnails.length - 1) ? this.currentIndex + 1 : 0;
        this.fullImage.src = this.thumbnails[this.currentIndex].getAttribute('data-full');
    }
    }
    // class MapManager {
    // constructor() {
    //     this.mapElement = document.getElementById('YMapsID');
    // }

    // saveMapData(mapData) {
    //     localStorage.setItem('map', JSON.stringify(mapData));
    // }
    // initMap() {
    //     const map = localStorage.getItem('map');
    //     console.log(map);
        
    //     ymaps.ready(() => {
    //         const parsedMap = JSON.parse(map);
    //         const Map = new ymaps.Map(this.mapElement, {
    //             center: parsedMap,
    //             zoom: 11,
    //         });
    //         const myPlacemark = new ymaps.Placemark(parsedMap, {
    //             content: 'Токио',
    //         });
    //         Map.geoObjects.add(myPlacemark);
    //     });
    // }

    // }
        const commentForm = document.getElementById('commentForm');
        const commentsList = document.querySelector('.comments-list');

        function loadComments() {
            fetch('https://672a07666d5fa4901b6f7076.mockapi.io/comments')
                .then(response => response.json())
                .then(data => {
                    renderComments(data);
                })
                .catch(error => {
                    console.error('Ошибка загрузки комментариев:', error);
                });
        }

        function renderComments(comments) {
            commentsList.innerHTML = '';
            comments.forEach(comment => {
                const commentItem = document.createElement('div');
                commentItem.classList.add('comment-item');
                commentItem.innerHTML = `
                    <p><strong>Имя:</strong> ${comment.name}</p>
                    <p><strong>Достопримечательность:</strong> ${comment.age || 'Не указан'}</p>
                    <p><strong>Комментарий:</strong> ${comment.text}</p>
                    <button data-id="${comment.id}">Удалить</button>
                `;
                commentsList.appendChild(commentItem);
            });

            const deleteButtons = document.querySelectorAll('.comment-item button');
            deleteButtons.forEach(button => {
                button.addEventListener('click', deleteComment);
            });
        }

        function deleteComment(event) {
            const commentId = event.target.getAttribute('data-id');
            fetch(`https://672a07666d5fa4901b6f7076.mockapi.io/comments/${commentId}`, {
                method: 'DELETE'
            })
                .then(() => {
                    loadComments();
                })
                .catch(error => {
                    console.error('Ошибка удаления комментария:', error);
                });
        }

        commentForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const age = document.getElementById('age').value;
            const commentText = document.getElementById('commentText').value;

            if (!name || !commentText) {
                alert('заполните имя и текст комментария.');
                return;
            }

            fetch('https://672a07666d5fa4901b6f7076.mockapi.io/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    age: age,
                    text: commentText
                })
            })
                .then(() => {
                    commentForm.reset(); 
                    loadComments();
                })
                .catch(error => {
                    console.error('Ошибка отправки комментария:', error);
                });
        });

        loadComments();
