document.addEventListener('DOMContentLoaded',function(){
    const legal = localStorage.getItem('id')
    urlMoc = 'https://672a07666d5fa4901b6f7076.mockapi.io/card/'
    const blockText = document.querySelector('h3')


    let request = new XMLHttpRequest();
        request.open("GET", urlMoc);
        request.responseType = "json";
        request.onload = function() {
            let jsin = textContent = request.response;
            blockText.textContent = jsin[legal].title   
        }
    request.send();

})