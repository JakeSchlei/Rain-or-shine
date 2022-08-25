const apiKey = `c2f95353b2d0391fb3a27563cb3c086f`;
const searchBtn = document.querySelector('#search-btn');
const citySearch = document.querySelector('#city');


searchBtn.addEventListener('click', findCity)
function findCity() {
    const cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearch.value}&limit=5&appid=${apiKey}`;
    fetch(cityUrl)
    .then(res => res.json())
    .then(data => {
        console.log(data);
    });

}

