# Challenge06
The sixth challenge of the bootcamp

In this activity, we created a weather dashboard web application that allows users to search for a city and view both current and future weather conditions. This project demonstrates how to use a third-party API, handle user input, store data in the browser, and update the webpage dynamically.

Key Features
Search for a City: Users can enter the name of a city to get the current weather and a 5-day forecast.
Current Weather Conditions: Displays the city name, date, weather icon, temperature, humidity, and wind speed.
5-Day Forecast: Shows the date, weather icon, temperature, humidity, and wind speed for the next five days.
Search History: Saves the user's searched cities in local storage and displays them on the page for quick access.
How It Works
HTML Structure
The HTML file (index.html) includes:
A header with a search form.
A main content area divided into sections for current weather and the 5-day forecast.
An aside for displaying the search history.
JavaScript Functionality
The JavaScript file (script.js) includes functions to:
Handle form submission and fetch weather data from the OpenWeather API.
Display the current weather and 5-day forecast on the page.
Save searched cities to local storage.
Load and display search history from local storage.
CSS Styling
The CSS file (style.css) includes styles to:
Layout the page with a header, main content area, and aside for search history.
Style the weather information and forecast cards.
Ensure a responsive design that looks good on different screen sizes.
Steps Followed
Set Up HTML:

Created the structure of the webpage with sections for the search form, current weather, forecast, and search history.
Fetch Weather Data:

Used the OpenWeather API to get weather data based on the city input.
Constructed the API URL with the city name, API key, and other parameters like units and language.
Display Weather Data:

Created functions to update the HTML content with the fetched weather data.
Used JavaScript to dynamically generate HTML elements for the weather information.
Store and Retrieve Data:

Implemented local storage to save the user's searched cities.
Loaded the search history from local storage when the page loads and updated it when new cities are searched.
Style the Page:

Added CSS to style the webpage, including the layout and design of the weather cards and search history.
