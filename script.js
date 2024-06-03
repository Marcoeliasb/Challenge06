const apiKey = '80653f3da405c892b2ea36122fdeff57';//Api Key
const baseURL = 'https://api.openweathermap.org/data/2.5/forecast';// URL of the API

document.getElementById('city-form').addEventListener('submit', function(event) {
    event.preventDefault();// Stop the default
    const city = document.getElementById('city-input').value;// Obtain the value of the entrance field
    if (city) {
        fetchWeatherData(city);// Calls the function to obtain the weather data
    }
});

function fetchWeatherData(city) {
    const url = `${baseURL}?q=${city}&appid=${apiKey}&units=metric&lang=es`;//

    fetch(url)// Make the request to the API
        .then(response => response.json())//Convert the response into JSON
        .then(data => {
            displayCurrentWeather(data);// Show the actual Weather
            displayForecast(data);// Show the 5 days forecast
            saveToLocalStorage(city);//Store the info in the local storage
        })
        .catch(error => console.error('Error:', error));// Shows an error in the console if the request fails
}

function displayCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('current-weather-details');// Obtain the container of the details of current weather
    const weather = data.list[0];//Obtain the data of the current weather
    const city = data.city.name;// Obtain the name of the city
    const date = new Date(weather.dt * 1000).toLocaleDateString('es-ES');// Transform the date into a new format
    const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    const temp = weather.main.temp;// Obtain the temperature
    const humidity = weather.main.humidity;// Obtain the himidity
    const windSpeed = weather.wind.speed;//Obtain the wind speed

    currentWeatherDiv.innerHTML = `
        <h3>${city} (${date})</h3>
        <img src="${icon}" alt="${weather.weather[0].description}">
        <p>Temperatura: ${temp}°C</p>
        <p>Humedad: ${humidity}%</p>
        <p>Velocidad del viento: ${windSpeed} m/s</p>
    `;// Update the html with the data of the current weather
}

function displayForecast(data) {
    const forecastDiv = document.getElementById('forecast-details');
    forecastDiv.innerHTML = '';

    for (let i = 1; i < data.list.length; i += 8) {//Obtain data every 8 entries of information
        const weather = data.list[i];// Obtain the data of an specific day
        const date = new Date(weather.dt * 1000).toLocaleDateString('es-ES');
        const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
        const temp = weather.main.temp;// Obtain the temperature
        const humidity = weather.main.humidity;// Obtain the himidity
        const windSpeed = weather.wind.speed;// Obtain the wind speed

        forecastDiv.innerHTML += `
            <div class="forecast-day">
                <h4>${date}</h4>
                <img src="${icon}" alt="${weather.weather[0].description}">
                <p>Temp: ${temp}°C</p>
                <p>Humedad: ${humidity}%</p>
                <p>Viento: ${windSpeed} m/s</p>
            </div> 
        `;// Add the data in the container
    }
}

function saveToLocalStorage(city) {
    let cities = JSON.parse(localStorage.getItem('cities')) || [];// Obtain the list of the cities in the local storage or iniciates an empty list
    if (!cities.includes(city)) {// Check if the city is already in the list
        cities.push(city);// Add the city in the list
        localStorage.setItem('cities', JSON.stringify(cities));// Save the list in the local storage
    }
    displaySearchHistory();// Updates the search history
}

function displaySearchHistory() {
    const historyDiv = document.getElementById('search-history');// Obtain the container of the search history
    if (!historyDiv) {
        console.error('No se encontró el contenedor del historial de búsqueda.');
        return;
    }

    let cities = JSON.parse(localStorage.getItem('cities')) || [];
    historyDiv.innerHTML = ''; // Limpia el contenedor antes de llenarlo

    cities.forEach(city => {
        const cityButton = document.createElement('button');// Creates a button for each city
        cityButton.textContent = city;// The name of the button is the city
        cityButton.addEventListener('click', () => fetchWeatherData(city));// do a fetch to request the info of the city that you click on
        historyDiv.appendChild(cityButton);
    });
}