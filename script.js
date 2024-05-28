const apiKey = '80653f3da405c892b2ea36122fdeff57';
const baseURL = 'https://api.openweathermap.org/data/2.5/forecast';

document.getElementById('city-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeatherData(city);
    }
});

function fetchWeatherData(city) {
    const url = `${baseURL}?q=${city}&appid=${apiKey}&units=metric&lang=es`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            displayForecast(data);
            saveToLocalStorage(city);
        })
        .catch(error => console.error('Error:', error));
}

function displayCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('current-weather-details');
    const weather = data.list[0];
    const city = data.city.name;
    const date = new Date(weather.dt * 1000).toLocaleDateString('es-ES');
    const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    const temp = weather.main.temp;
    const humidity = weather.main.humidity;
    const windSpeed = weather.wind.speed;

    currentWeatherDiv.innerHTML = `
        <h3>${city} (${date})</h3>
        <img src="${icon}" alt="${weather.weather[0].description}">
        <p>Temperatura: ${temp}°C</p>
        <p>Humedad: ${humidity}%</p>
        <p>Velocidad del viento: ${windSpeed} m/s</p>
    `;
}

function displayForecast(data) {
    const forecastDiv = document.getElementById('forecast-details');
    forecastDiv.innerHTML = '';

    for (let i = 1; i < data.list.length; i += 8) {
        const weather = data.list[i];
        const date = new Date(weather.dt * 1000).toLocaleDateString('es-ES');
        const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
        const temp = weather.main.temp;
        const humidity = weather.main.humidity;
        const windSpeed = weather.wind.speed;

        forecastDiv.innerHTML += `
            <div class="forecast-day">
                <h4>${date}</h4>
                <img src="${icon}" alt="${weather.weather[0].description}">
                <p>Temp: ${temp}°C</p>
                <p>Humedad: ${humidity}%</p>
                <p>Viento: ${windSpeed} m/s</p>
            </div>
        `;
    }
}

function saveToLocalStorage(city) {
    let cities = JSON.parse(localStorage.getItem('cities')) || [];
    if (!cities.includes(city)) {
        cities.push(city);
        localStorage.setItem('cities', JSON.stringify(cities));
    }
    displaySearchHistory();
}

function displaySearchHistory() {
    const historyDiv = document.getElementById('search-history');
    if (!historyDiv) {
        console.error('No se encontró el contenedor del historial de búsqueda.');
        return;
    }

    let cities = JSON.parse(localStorage.getItem('cities')) || [];
    historyDiv.innerHTML = ''; // Limpia el contenedor antes de llenarlo

    cities.forEach(city => {
        const cityButton = document.createElement('button');
        cityButton.textContent = city;
        cityButton.addEventListener('click', () => fetchWeatherData(city));
        historyDiv.appendChild(cityButton);
    });
}