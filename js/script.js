
const weatherBlock = document.querySelector('#weather');

const form = document.querySelector('.form');
const input = document.querySelector('#city');

form.addEventListener('submit', getData);

function getData(e) {
    e.preventDefault();
    return loadWeather(input.value);
}

async function loadWeather(e) {
    console.log(input.value);
    weatherBlock.innerHTML = `
        <div class="weather__loading">
            <img src="./image/loading-icon.gif" alt="Loading...">
        </div>
    `;

    const serverUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${e}&appid=4c58af12ccc3bace42a8d7f400f03270`;
    const response = await fetch(serverUrl, { method: 'GET', });
    const responseResult = await response.json();

    if (response.ok) {
        getWeather(responseResult);
    } else {
        weatherBlock.innerHTML = responseResult.message;
    }
}

function getWeather(data) {
    // console.log(data);

    const location = data.name;
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const weatherStatus = data.weather[0].main;
    const weatherIcon = data.weather[0].icon;

    const template = `
        <div class="weather__header">
            <div class="weather__main">
                <div class="weather__city">${location}</div>
                <div class="weather__status">${weatherStatus}</div>
            </div>
            <div class="weather__icon">
                <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
            </div>
        </div>
        <div class="weather__temp">${temp}</div>
        <div class="weather__feels-like">Feels like: ${feelsLike}</div>
    `;
    weatherBlock.innerHTML = template;
}

if (weatherBlock && input.value == '') {
    loadWeather('Kyiv');
}