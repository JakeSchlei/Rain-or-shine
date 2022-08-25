const apiKey = `c2f95353b2d0391fb3a27563cb3c086f`;
const searchBtn = document.querySelector('#search-btn');
const citySearch = document.querySelector('#city');
const currentWeather = document.querySelector('#current-weather');


searchBtn.addEventListener('click', () => findCity(citySearch.value))
function findCity(city) {
    const cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
    fetch(cityUrl)
    .then(res => res.json())
    .then(data => {
        console.log(`findCity data: ${JSON.stringify(data)}`);
        return getCurrentWeather({lat: data[0].lat, lon: data[0].lon, city: data[0].name});
    
    });

}

function getCurrentWeather({lat, lon, city}) {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    fetch(currentWeatherUrl)
    .then(res => res.json())
    .then(data => {
        console.log(`getCurrentWeather data: ${JSON.stringify(data)}`);
        const createDate = new Date(data.dt * 1000).toString().split(' ').slice(0, 4).join(' ');

        currentWeather.innerHTML =
        `<h3>${city} (${createDate})</h3>
        <div class='weather-details'>
            <p>Temperature: ${parseInt(data.main.temp)}°</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind: ${parseInt(data.wind.speed)} MPH</p>

        `
        
        // to do: update DOM
        return getForecast({lat, lon, city}) ;

        
    });

}

function getForecast({lat, lon, city}) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    fetch(forecastUrl)
    .then(res => res.json())
    .then(data => {
        console.log(`getForecast data: ${JSON.stringify(data)}`);
    });


}

findCity("Portland");


