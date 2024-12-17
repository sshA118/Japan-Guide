document.addEventListener('DOMContentLoaded', function() {
    const catalogCard = document.querySelector('.catalog__card');
    const urlMoc = 'https://672a07666d5fa4901b6f7076.mockapi.io/card/';

    function createElement(data){
                data.forEach((item, index) => {
                    const {img, title, text, adress, category} = item;
                    const card = document.createElement('div');
                    card.classList.add('catalog__card-1');
                    card.id = index;
                    card.setAttribute('data-category', category);

                    const cardTitle = document.createElement('div');
                    cardTitle.classList.add('catalog__card-1-title');

                    const imgElement = document.createElement('img');
                    imgElement.alt = 'img';
                    imgElement.src = img;

                    const h3 = document.createElement('h3');
                    h3.innerText = title;

                    const p = document.createElement('p');
                    p.innerHTML = text;

                    const h4 = document.createElement('h4');
                    h4.innerHTML = 'Адрес:';

                    const pLast = document.createElement('p');
                    pLast.innerHTML = adress;

                    cardTitle.append(imgElement, h3, p, h4, pLast);
                    card.append(cardTitle);
                    catalogCard.append(card);
                });
    }

    async function selectCard() {
        document.querySelectorAll('.catalog__card-1').forEach(el => {
            el.addEventListener('click', async () => {
                const h3 = el.querySelector('h3');
                if (h3) {
                    const title = h3.textContent.trim();
                    console.log(title);
                    try {
                        const response = await fetch(`https://672a07666d5fa4901b6f7076.mockapi.io/card?title=${encodeURIComponent(title)}`, {
                            method: 'GET'
                        });
                        const data = await response.json();
                        if (data && data.length > 0) {

                            const card = data[0];
                            window.location.href = `./card.html?id=${card.id}`;
                        } else {
                            console.error('Карточки нет');
                        }
                    } catch (error) {
                        console.error('Ошибка в запросе', error);
                    }
                } else {
                    console.error('Не найден элемент');
                }
            });
        });
    }

    document.getElementById('search').addEventListener('input', function () {
        const card = document.querySelector('.catalog__card');
        const search_value = this.value.toLowerCase();
        const catalog = document.querySelector('.catalog');
        const existingError = document.querySelector('.catalog__h2__error');
    
        fetch(`https://672a07666d5fa4901b6f7076.mockapi.io/card?title=${search_value}`)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        console.error('404');
                        if (catalog) {
                            if (!existingError) {
                                card.innerHTML = ''
                                const h2 = document.createElement('h2');
                                h2.classList.add('catalog__h2__error');
                                h2.innerText = 'Нечего не найдено :(';
                                catalog.append(h2);
                            }
                        }
                    }
                    throw new Error('Ошибка сети');
                }
                return response.json();
            })
            .then(data => {
                console.log('response:', data); 
                    if (existingError) {
                        existingError.remove();
                        console.log('Замененно');
                    }
                    if (card) {
                        card.innerHTML = '';
                        console.log('Очищено');
                    }
                    createElement(data);
                    selectCard();

            })
            .catch(error => {
                console.error('Ошибка введенных данных:', error);
            });
    });
    let page = 1;
    const limit = 10; 
    let isLoading = false;

    function loadData() {
        if (isLoading) return;
        isLoading = true;

        const loader = document.getElementById('infinity__scroll')
        loader.style.display = 'flex'

        const url = `https://672a07666d5fa4901b6f7076.mockapi.io/card?page=${page}&limit=${limit}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if(data.length === 0){
                    loader.childNodes[1].textContent = 'Больше ничего нет :('
                }else{
                    createElement(data);
                    selectCard();
                    loader.style.display =  'none'
                    page++;
                    isLoading = false;
                    console.log('рабатает');
                }
            })
            .catch(error => {
                console.error('Ошибка загрузки данных:', error);
                isLoading = false;
            });
    }

    window.addEventListener('scroll', () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 10) {
            loadData(); 
        }
    });

    loadData();


    document.querySelectorAll('.filter__1').forEach(el => {
        el.addEventListener('click', (event) => {
            event.preventDefault();
            const text = el.textContent.trim();
    
            document.querySelectorAll('.filter__1').forEach(item => {
                item.classList.remove('checked');
            });
    
            if (text !== 'Убрать все') {
                const category = getCategoryFromText(text);
                if (category) {
                    filterByCategory(category);
                    el.classList.add('checked');
                }
            } else {
                fetch(urlMoc)
                    .then(response => response.json())
                    .then(data => {
                        catalogCard.innerHTML = '';
                        createElement(data);
                        selectCard();
                    })
                    .catch(error => {
                        console.error('Ошибка при загрузке данных:', error);
                    });
            }
        });
    });
    
    function getCategoryFromText(text) {
        const categories = {
            'Парки': 'parks',
            'Музеи': 'museums',
            'Рестораны': 'restaurants',
            'Храмы': 'temples',
            'Торговые центры': 'malls',
            'Уличные рынки': 'markets'
        };
        return categories[text];
    }
    
    function filterByCategory(category) {
        const url = `${urlMoc}?category=${category}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                catalogCard.innerHTML = '';
                createElement(data);
                selectCard();
            })
            .catch(error => {
                console.error('Ошибка при фильтрации:', error);
            });
    }


    function sortAttractions(sortField, order = 'asc') {
        const url = `${urlMoc}?sortBy=${sortField}&order=${order}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                catalogCard.innerHTML = '';
                createElement(data);
                selectCard();
            })
            .catch(error => {
                console.error('Ошибка при сортировке:', error);
            });
    }
    
    document.querySelectorAll('.filter__2').forEach(el => {
        el.addEventListener('click', (event) => {
            event.preventDefault();
            const text = el.textContent.trim();
            document.querySelectorAll('.filter__2').forEach(item => {
                item.classList.remove('checked');
            });
    
            if (text === 'Популярное') {
                sortAttractions('count', 'desc');
                el.classList.add('checked');
            } else if (text === 'Не популярное') {
                sortAttractions('count', 'asc');
                el.classList.add('checked');
            } else if (text === 'Убрать все') {
                fetch(urlMoc)
                    .then(response => response.json())
                    .then(data => {
                        catalogCard.innerHTML = '';
                        createElement(data);
                        selectCard();
                    })
                    .catch(error => {
                        console.error('Ошибка при загрузке данных:', error);
                    });
            }
        });
    });
    
    
});
