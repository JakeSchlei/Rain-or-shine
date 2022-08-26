const apiKey = `c2f95353b2d0391fb3a27563cb3c086f`;
const searchBtn = document.querySelector("#search-btn");
const citySearch = document.querySelector("#city");
const currentWeather = document.querySelector("#current-weather");
const forecast = document.querySelector("#forecast");
const cityList = document.querySelector("#city-list");

searchBtn.addEventListener("click", () => findCity(citySearch.value));
function findCity(city) {
  const cityUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
  fetch(cityUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(`findCity data: ${JSON.stringify(data)}`);
      return getCurrentWeather({
        lat: data[0].lat,
        lon: data[0].lon,
        city: data[0].name,
      });
    });
}

function getCurrentWeather({ lat, lon, city }) {
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  fetch(currentWeatherUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(`getCurrentWeather data: ${JSON.stringify(data)}`);
      const createDate = new Date(data.dt * 1000)
        .toString()
        .split(" ")
        .slice(0, 4)
        .join(" ");
      const cityButton = buildButton(city);
      let searchHistory = localStorage.getItem("searchHistory");
      if (searchHistory) searchHistory = JSON.parse(searchHistory);
      else {
        searchHistory = [];
      }
      if (!searchHistory.includes(city)) {
        cityList.appendChild(cityButton);
        storeSearchHistory(city);
      }

      currentWeather.innerHTML = `<h3>${city} (${createDate})</h3>
        <img src=${`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} />
        <div class='weather-details'>
            <p>Temperature: ${parseInt(data.main.temp)}°</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind: ${parseInt(data.wind.speed)} MPH</p>

        `;

      // to do: update DOM
      return getForecast({ lat, lon, city });
    });
}

function getForecast({ lat, lon, city }) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  fetch(forecastUrl)
    .then((res) => res.json())
    .then((data) => {
      forecast.innerHTML = "";

      // Doing this because the api calls weather every 3 hours, this is the way I could get all 5 days to run
      for (let i = 0; i < 40; i += 8) {
        let forecastDate = new Date(data.list[i].dt_txt)
          .toString()
          .split(" ")
          .slice(0, 3)
          .join(" ");
        forecast.innerHTML += `
              <div class="forecast-weather">
              <h5>${forecastDate}</h5>
              <img src=${`https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`} />
              <p>Temp: ${parseInt(data.list[i].main.temp)}°</p>
              <p>Humidity: ${data.list[i].main.humidity}%</p>
              <p>Wind: ${parseInt(data.list[i].wind.speed)} MPH</p>
              </div>`;
      }
    });
}

function storeSearchHistory(city) {
  let searchHistory = localStorage.getItem("searchHistory");
  console.log(searchHistory);
  if (searchHistory) searchHistory = JSON.parse(searchHistory);
  else {
    searchHistory = [];
  }
  searchHistory.push(city);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

function buildButton(city) {
  let div = document.createElement("div");
  div.innerHTML = city;
  div.className = 'city-button'
  div.addEventListener("click", () => findCity(city));

  return div;
}

function buildSearchHistory() {
  let searchHistory = localStorage.getItem("searchHistory");
  if (!searchHistory) return;
  searchHistory = JSON.parse(searchHistory);
  for (let i = 0; i < searchHistory.length; i++) {
    const button = buildButton(searchHistory[i]);
    cityList.appendChild(button);
  }
}

findCity("Portland");
buildSearchHistory();
