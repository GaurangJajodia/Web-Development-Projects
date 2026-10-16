document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-wtr-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temp");
    const descriptionDisplay = document.getElementById("desc");
    const errorMessage = document.getElementById("error-msg");

    const API_KEY = "d49312b0414bbb21af12f2879b92ab52";

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) return;

        // it may throw an error
        // server/database is from another continent so it takes some time
        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        }
        catch (error) {
            showError();
        }
    });

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error occurred');
        }
        const data = await response.json();
        return data;
    }

    function displayWeatherData(data) {
        console.log(data);
        const { name, main, weather } = data;
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature: ${main.temp}°C`;
        descriptionDisplay.textContent = weather[0].description;
        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    }

    function showError() {
        weatherInfo.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }
});