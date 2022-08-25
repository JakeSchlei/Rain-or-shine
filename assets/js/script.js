const apiKey = `c2f95353b2d0391fb3a27563cb3c086f`;
const searchBtn = document.querySelector('#search-btn');
const citySearch = document.querySelector('#city');


searchBtn.addEventListener('click', findCity)
function findCity() {
    const cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearch.value}&limit=5&appid=${apiKey}`;
    fetch(cityUrl)
    .then(res => res.json())
    .then(data => {
        console.log(`findCity data: ${JSON.stringify(data)}`);
        return getCurrentWeather({lat: data[0].lat, lon: data[0].lon, city: data[0].name});
    
    });

}

function getCurrentWeather({lat, lon, city}) {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(currentWeatherUrl)
    .then(res => res.json())
    .then(data => {
        console.log(`getCurrentWeather data: ${JSON.stringify(data)}`);
        // to do: update DOM
        return getForecast({lat, lon, city}) ;
    });

}

function getForecast({lat, lon, city}) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(forecastUrl)
    .then(res => res.json())
    .then(data => {
        console.log(`getForecast data: ${JSON.stringify(data)}`);
    });


}


