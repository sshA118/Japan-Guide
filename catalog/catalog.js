document.addEventListener('DOMContentLoaded', function () {
    const catalogCard = document.querySelector('.catalog__card');
    const urlMoc = 'https://672a07666d5fa4901b6f7076.mockapi.io/card/';
    let allData = [];
    let filteredData = [];
    let currentCategory = null;
    let currentSort = null;
    let currentSearch = '';
    let page = 1;
    const limit = 10;
    let isLoading = false;

    function createElement(data) {
        catalogCard.innerHTML = '';
        data.forEach((item, index) => {
            const { img, title, text, adress, category } = item;
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
                    try {
                        const response = await fetch(`${urlMoc}?title=${encodeURIComponent(title)}`, {
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

    function filterByCategory(category) {
        currentCategory = category;
        applyFilters();
    }


    function sortAttractions(sortField, order = 'asc') {
        currentSort = { field: sortField, order: order };
        applyFilters();
    }


    function searchData(query) {
        currentSearch = query.toLowerCase();
        applyFilters();
    }

    function applyFilters() {
        filteredData = currentCategory
            ? allData.filter(item => item.category === currentCategory)
            : allData;

        if (currentSearch) {
            filteredData = filteredData.filter(item =>
                item.title.toLowerCase().includes(currentSearch)
            );
        }

        if (currentSort) {
            filteredData.sort((a, b) => {
                if (currentSort.order === 'asc') {
                    return a[currentSort.field] - b[currentSort.field];
                } else {
                    return b[currentSort.field] - a[currentSort.field];
                }
            });
        }

        createElement(filteredData);
        selectCard();
    }

    function loadData() {
        fetch(urlMoc)
            .then(response => response.json())
            .then(data => {
                allData = data;
                filteredData = data;
                applyFilters();
            })
            .catch(error => {
                console.error('Ошибка загрузки данных:', error);
            });
    }

    function loadMoreData() {
        if (isLoading) return;
        isLoading = true;

        const loader = document.getElementById('infinity__scroll');
        loader.style.display = 'flex';
        const url = `${urlMoc}?page=${page}&limit=${limit}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    loader.childNodes[1].textContent = 'Больше ничего нет :(';
                } else {
                    allData = allData.concat(data);
                    applyFilters();
                    loader.style.display = 'none';
                    page++;
                    isLoading = false;
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
            loadMoreData();
        }
    });

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
                currentCategory = null;
                applyFilters();
            }
        });
    });

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
                currentSort = null;
                applyFilters();
            }
        });
    });

    document.getElementById('search').addEventListener('input', function () {
        searchData(this.value);
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

    loadData();
});
    