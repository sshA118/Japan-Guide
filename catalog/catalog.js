document.addEventListener('DOMContentLoaded',function(){
    const catalogCard = document.querySelector('.catalog__card');
    const urlMoc = 'https://672a07666d5fa4901b6f7076.mockapi.io/card/';

    fetch(urlMoc)
        .then(response => {
            if (!response.ok) {
                throw new Error('Всё гудд');
            }
            return response.json();
        })
        .then(data => {
            data.forEach((item, index) => {
                const { img, title, text, adress, category } = item;
                const card = document.createElement('div');
                card.classList.add('catalog__card-1');
                card.id = index;
                card.setAttribute('data-category', category);

                const cardTitle = document.createElement('div');
                cardTitle.classList.add('catalog__card-1-title');

                const imgElement = document.createElement('img');
                imgElement.alt = 'hram';
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

                document.querySelectorAll('.catalog__card-1').forEach(el =>el.addEventListener('click',()=>{
                    window.location.href = `./card.html?id=${el.id}`
                })) 
            });
        })
        .catch(error => {
            console.error('Хуйня переделывай', error);
        });
    
    document.getElementById('search').addEventListener('input',function () {
    const search_value =  this.value.toLowerCase();
        fetch(`https://672a07666d5fa4901b6f7076.mockapi.io/card?title=${search_value}`)
            .then(response => response.json())
            .then(data => {
                const card = document.querySelector('.catalog__card')
                card.innerHTML = ''

                data.forEach((item, index) => {
                    const { img, title, text, adress, category } = item;

                    const card = document.createElement('div');
                    card.classList.add('catalog__card-1');
                    card.id = index;
                    card.setAttribute('data-category', category);
    
                    const cardTitle = document.createElement('div');
                    cardTitle.classList.add('catalog__card-1-title');
    
                    const imgElement = document.createElement('img');
                    imgElement.alt = 'hram';
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
                })
            })
            .catch(error => console.error('Error:', error));
        })
        
    })  


        document.querySelectorAll('.filter__1').forEach(el => {
            el.addEventListener('click', (event) => {
                event.preventDefault(); 
                const text = el.textContent.trim();
                if (text !== 'Убрать все') {
                    if (el.classList.contains('checked')) {
                        el.classList.remove('checked');
                    } else {
                        el.classList.add('checked');
                    }
                } else {
                    document.querySelectorAll('.filter__1').forEach(item => {
                        item.classList.remove('checked');
                    });
                }
            });
        });
        
        document.querySelectorAll('.filter__2').forEach(el => {
            el.addEventListener('click', (event) => {
                event.preventDefault();
                const text = el.textContent.trim();
                if (text !== 'Убрать все') {
                    if (el.classList.contains('checked')) {
                        el.classList.remove('checked');
                    } else {
                        el.classList.add('checked'); 
                    }
                } else {
                    document.querySelectorAll('.filter__2').forEach(item => {
                        item.classList.remove('checked');
                    });
                }
            });
        });  



    // document.getElementById('search').addEventListener('input', function() {
    //     const searchTerm = this.value.toLowerCase();
    //     const cards = document.querySelectorAll('.catalog__card-1');
    //     cards.forEach(card => {
    //         const title = card.querySelector('h3').textContent.toLowerCase();
    //         if (title.includes(searchTerm)) {
    //             card.style.display = 'flex';
    //         } else {
    //             card.style.display = 'none';
    //         }
    //     });
    // });



//фильтрация по названию достропримечательности
// const catalog = document.querySelector('.catalog');
// const filterItems = document.querySelectorAll('#filter');
// const resetFilters= document.querySelector('#reset-filters');
// filterItems.forEach(item => {
//     item.addEventListener('click', () => {
//         const category = item.getAttribute('onclick').match(/'([^']+)'/)[1];
//         filterCatalog(category);
//     });
// });

// function filterCatalog(category) {
//     const cards = catalog.querySelectorAll('.catalog__card-1');
//     cards.forEach(card => {
//         if (category === 'all' || card.dataset.category === category) {
//             card.style.display = 'flex';
//         } else {
//             card.style.display = 'none';
//         }
//     });
// }
// resetFilters.addEventListener('click', () => {
//     filterCatalog('all');
// });