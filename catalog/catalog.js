document.addEventListener('DOMContentLoaded',function(){
    urlMoc = 'https://672a07666d5fa4901b6f7076.mockapi.io/card/?'
    let request = new XMLHttpRequest();
    request.open("GET", urlMoc);
    request.responseType = "json";
    request.onload = function() {
        let jsin = textContent = request.response;
        for(let j = 0;j < 10;j++){
            const h3 = document.getElementById(`h${j}`)
            const textp = document.getElementById(`textP${j}`)
            const img  = document.getElementById(`img${j}`)
            const p = document.getElementById(`p${j}`)
            img.src = jsin[j].img
            h3.innerText = jsin[j].title
            textp.innerHTML = jsin[j].text
            p.innerHTML = jsin[j].adress
        }   
    }
    request.send();
    
    document.querySelectorAll('.catalog__card-1').forEach(el =>el.addEventListener('click',()=>{
        window.open('./card.html');
        localStorage.setItem('id', el.id);
    })) 
    
  
    document.getElementById('search').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const cards = document.querySelectorAll('.catalog__card-1');
        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });



    

      const itemsPerPage = 6;
      const items = document.querySelectorAll('.catalog__card-1');
      const totalPages = Math.ceil(items.length / itemsPerPage);
      let currentPage = 1;
      
      function showPage(page) {
          items.forEach((item, index) => {
              item.style.display = (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) ? 'flex' : 'none';
          });
          updatePagination();
      }

      function updatePagination() {
          const pageNumbersContainer = document.getElementById('page-numbers');
          pageNumbersContainer.innerHTML = '';
      
          for (let i = 1; i <= totalPages; i++) {
              const pageNum = document.createElement('span');
              pageNum.textContent = i;
              pageNum.style.cursor = 'pointer';
      
              pageNum.addEventListener('click', () => {
                  currentPage = i;
                  showPage(currentPage);
              });
              if (i === currentPage) {
                  pageNum.style.fontWeight = 'bold'; 
                  pageNum.style.borderBottom = '3px solid White';
                  pageNum.style.borderTop = '3px solid White';
              }
              pageNumbersContainer.appendChild(pageNum);
          }
      
          document.getElementById('prev').disabled = currentPage === 1;
          document.getElementById('next').disabled = currentPage === totalPages;
      }
      
      showPage(currentPage);
      
      document.getElementById('prev').addEventListener('click', () => {
          if (currentPage > 1) {
              showPage(--currentPage);
          }
      });
      
      document.getElementById('next').addEventListener('click', () => {
          if (currentPage < totalPages) {
              showPage(++currentPage);
          }
      });

})


//фильтрация по названию достропримечательности
const catalog = document.querySelector('.catalog');
const filterItems = document.querySelectorAll('#filter');
const resetFilters= document.querySelector('#reset-filters');
filterItems.forEach(item => {
    item.addEventListener('click', () => {
        const category = item.getAttribute('onclick').match(/'([^']+)'/)[1];
        filterCatalog(category);
    });
});

function filterCatalog(category) {
    const cards = catalog.querySelectorAll('.catalog__card-1');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}
resetFilters.addEventListener('click', () => {
    filterCatalog('all');
});